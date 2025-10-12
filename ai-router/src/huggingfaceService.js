/**
 * HuggingFace Pro Service for Agnes AI Router
 * Handles HuggingFace Inference API interactions
 */

import { HfInference } from '@huggingface/inference';
import logger from './logger.js';
import { HUGGINGFACE_MODELS, RETRY_CONFIG } from '../config/models.js';
import { huggingfaceLimiter } from './rateLimiter.js';

class HuggingFaceService {
  constructor() {
    this.apiKey = process.env.HUGGINGFACE_API_KEY;

    if (!this.apiKey) {
      logger.warn('HuggingFace API key not provided. Service will be disabled.');
      this.isAvailable = false;
    } else {
      this.hf = new HfInference(this.apiKey);
      this.isAvailable = true;
    }

    this.stats = {
      requests: 0,
      successes: 0,
      failures: 0,
      totalLatency: 0,
      retries: 0
    };
  }

  /**
   * Generate text completion using HuggingFace model
   */
  async generate(options) {
    const {
      model,
      prompt,
      temperature = 0.7,
      maxTokens = 4096,
      systemPrompt = null
    } = options;

    if (!this.isAvailable) {
      throw new Error('HuggingFace service is not available. API key not configured.');
    }

    // Acquire rate limit token
    const release = await huggingfaceLimiter.acquire();
    const startTime = Date.now();

    try {
      this.stats.requests++;

      // Construct full prompt with system message if provided
      let fullPrompt = prompt;
      if (systemPrompt) {
        fullPrompt = `System: ${systemPrompt}\n\nUser: ${prompt}\n\nAssistant:`;
      }

      logger.debug('HuggingFace generate request', {
        model,
        promptLength: fullPrompt.length,
        temperature,
        maxTokens
      });

      const response = await this.retryWithBackoff(async () => {
        return await this.hf.textGeneration({
          model,
          inputs: fullPrompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature,
            return_full_text: false,
            do_sample: temperature > 0
          }
        });
      });

      const latency = Date.now() - startTime;
      this.stats.successes++;
      this.stats.totalLatency += latency;

      logger.info('HuggingFace generate success', {
        model,
        latency: `${latency}ms`,
        responseLength: response.generated_text?.length || 0
      });

      return {
        text: response.generated_text,
        model,
        provider: 'huggingface',
        latency
      };

    } catch (error) {
      this.stats.failures++;
      const latency = Date.now() - startTime;

      logger.error('HuggingFace generate error', {
        model,
        latency: `${latency}ms`,
        error: error.message
      });

      throw error;
    } finally {
      release();
    }
  }

  /**
   * Chat completion using HuggingFace model
   */
  async chat(options) {
    const {
      model,
      messages,
      temperature = 0.7,
      maxTokens = 4096
    } = options;

    if (!this.isAvailable) {
      throw new Error('HuggingFace service is not available. API key not configured.');
    }

    // Acquire rate limit token
    const release = await huggingfaceLimiter.acquire();
    const startTime = Date.now();

    try {
      this.stats.requests++;

      // Convert messages to prompt format
      const prompt = this.messagesToPrompt(messages);

      logger.debug('HuggingFace chat request', {
        model,
        messageCount: messages.length,
        promptLength: prompt.length,
        temperature,
        maxTokens
      });

      const response = await this.retryWithBackoff(async () => {
        // Use chatCompletion if available, otherwise fall back to textGeneration
        if (this.hf.chatCompletion) {
          return await this.hf.chatCompletion({
            model,
            messages,
            max_tokens: maxTokens,
            temperature
          });
        } else {
          return await this.hf.textGeneration({
            model,
            inputs: prompt,
            parameters: {
              max_new_tokens: maxTokens,
              temperature,
              return_full_text: false,
              do_sample: temperature > 0
            }
          });
        }
      });

      const latency = Date.now() - startTime;
      this.stats.successes++;
      this.stats.totalLatency += latency;

      // Extract text based on response format
      const text = response.choices?.[0]?.message?.content ||
                   response.generated_text ||
                   '';

      logger.info('HuggingFace chat success', {
        model,
        latency: `${latency}ms`,
        responseLength: text.length
      });

      return {
        text,
        model,
        provider: 'huggingface',
        latency
      };

    } catch (error) {
      this.stats.failures++;
      const latency = Date.now() - startTime;

      logger.error('HuggingFace chat error', {
        model,
        latency: `${latency}ms`,
        error: error.message
      });

      throw error;
    } finally {
      release();
    }
  }

  /**
   * Convert messages array to prompt string
   */
  messagesToPrompt(messages) {
    return messages.map(msg => {
      const role = msg.role === 'assistant' ? 'Assistant' :
                   msg.role === 'system' ? 'System' :
                   'User';
      return `${role}: ${msg.content}`;
    }).join('\n\n') + '\n\nAssistant:';
  }

  /**
   * Retry with exponential backoff
   */
  async retryWithBackoff(fn, retries = RETRY_CONFIG.maxRetries) {
    let lastError;

    for (let i = 0; i < retries; i++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        this.stats.retries++;

        // Don't retry on client errors (4xx)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          throw error;
        }

        if (i < retries - 1) {
          const delay = Math.min(
            RETRY_CONFIG.initialDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, i),
            RETRY_CONFIG.maxDelay
          );

          logger.warn('Retrying HuggingFace request', {
            attempt: i + 1,
            maxRetries: retries,
            delay: `${delay}ms`,
            error: error.message
          });

          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError;
  }

  /**
   * Get available models configuration
   */
  getModels() {
    return HUGGINGFACE_MODELS;
  }

  /**
   * Get service statistics
   */
  getStats() {
    return {
      ...this.stats,
      averageLatency: this.stats.requests === 0 ? 0 :
        (this.stats.totalLatency / this.stats.requests).toFixed(2),
      successRate: this.stats.requests === 0 ? 0 :
        (this.stats.successes / this.stats.requests * 100).toFixed(2),
      retryRate: this.stats.requests === 0 ? 0 :
        (this.stats.retries / this.stats.requests).toFixed(2)
    };
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      requests: 0,
      successes: 0,
      failures: 0,
      totalLatency: 0,
      retries: 0
    };
    logger.info('HuggingFace statistics reset');
  }

  /**
   * Get health status
   */
  getHealth() {
    const stats = this.getStats();

    return {
      status: this.isAvailable ? 'healthy' : 'unavailable',
      available: this.isAvailable,
      configured: !!this.apiKey,
      stats: {
        totalRequests: this.stats.requests,
        successRate: `${stats.successRate}%`,
        averageLatency: `${stats.averageLatency}ms`,
        retries: this.stats.retries
      }
    };
  }
}

// Export singleton instance
export default new HuggingFaceService();
