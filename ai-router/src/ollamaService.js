/**
 * Ollama Service for Agnes AI Router
 * Handles local Ollama model interactions
 */

import axios from 'axios';
import logger from './logger.js';
import { OLLAMA_MODELS } from '../config/models.js';
import { ollamaLimiter } from './rateLimiter.js';

class OllamaService {
  constructor() {
    this.baseURL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
    this.timeout = parseInt(process.env.OLLAMA_TIMEOUT) || 30000;
    this.isAvailable = false;
    this.lastCheck = null;
    this.checkInterval = 60000; // Check every minute

    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.stats = {
      requests: 0,
      successes: 0,
      failures: 0,
      totalLatency: 0
    };

    // Initial availability check
    this.checkAvailability();
  }

  /**
   * Check if Ollama service is available
   */
  async checkAvailability() {
    try {
      const response = await this.client.get('/api/tags', {
        timeout: 5000
      });

      this.isAvailable = response.status === 200;
      this.lastCheck = Date.now();

      logger.info('Ollama availability check', {
        available: this.isAvailable,
        models: response.data?.models?.map(m => m.name) || []
      });

      return this.isAvailable;
    } catch (error) {
      this.isAvailable = false;
      this.lastCheck = Date.now();

      logger.warn('Ollama service unavailable', {
        error: error.message,
        baseURL: this.baseURL
      });

      return false;
    }
  }

  /**
   * Get availability status (with cache)
   */
  async getAvailability() {
    if (!this.lastCheck || (Date.now() - this.lastCheck) > this.checkInterval) {
      await this.checkAvailability();
    }
    return this.isAvailable;
  }

  /**
   * Generate completion using Ollama
   */
  async generate(options) {
    const {
      model,
      prompt,
      system = null,
      temperature = 0.7,
      maxTokens = 4096,
      stream = false
    } = options;

    // Check availability
    const available = await this.getAvailability();
    if (!available) {
      throw new Error('Ollama service is not available');
    }

    // Acquire rate limit token
    const release = await ollamaLimiter.acquire();
    const startTime = Date.now();

    try {
      this.stats.requests++;

      const requestBody = {
        model,
        prompt,
        stream,
        options: {
          temperature,
          num_predict: maxTokens
        }
      };

      if (system) {
        requestBody.system = system;
      }

      logger.debug('Ollama generate request', {
        model,
        promptLength: prompt.length,
        temperature,
        maxTokens
      });

      const response = await this.client.post('/api/generate', requestBody);

      const latency = Date.now() - startTime;
      this.stats.successes++;
      this.stats.totalLatency += latency;

      logger.info('Ollama generate success', {
        model,
        latency: `${latency}ms`,
        responseLength: response.data.response?.length || 0
      });

      return {
        text: response.data.response,
        model,
        provider: 'ollama',
        latency,
        done: response.data.done
      };

    } catch (error) {
      this.stats.failures++;
      const latency = Date.now() - startTime;

      logger.error('Ollama generate error', {
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
   * Chat completion using Ollama
   */
  async chat(options) {
    const {
      model,
      messages,
      temperature = 0.7,
      maxTokens = 4096,
      stream = false
    } = options;

    // Check availability
    const available = await this.getAvailability();
    if (!available) {
      throw new Error('Ollama service is not available');
    }

    // Acquire rate limit token
    const release = await ollamaLimiter.acquire();
    const startTime = Date.now();

    try {
      this.stats.requests++;

      const requestBody = {
        model,
        messages,
        stream,
        options: {
          temperature,
          num_predict: maxTokens
        }
      };

      logger.debug('Ollama chat request', {
        model,
        messageCount: messages.length,
        temperature,
        maxTokens
      });

      const response = await this.client.post('/api/chat', requestBody);

      const latency = Date.now() - startTime;
      this.stats.successes++;
      this.stats.totalLatency += latency;

      logger.info('Ollama chat success', {
        model,
        latency: `${latency}ms`,
        responseLength: response.data.message?.content?.length || 0
      });

      return {
        text: response.data.message.content,
        model,
        provider: 'ollama',
        latency,
        done: response.data.done
      };

    } catch (error) {
      this.stats.failures++;
      const latency = Date.now() - startTime;

      logger.error('Ollama chat error', {
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
   * Get list of available models
   */
  async listModels() {
    try {
      const response = await this.client.get('/api/tags');
      return response.data.models || [];
    } catch (error) {
      logger.error('Failed to list Ollama models', { error: error.message });
      return [];
    }
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
        (this.stats.successes / this.stats.requests * 100).toFixed(2)
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
      totalLatency: 0
    };
    logger.info('Ollama statistics reset');
  }

  /**
   * Get health status
   */
  async getHealth() {
    const available = await this.getAvailability();
    const stats = this.getStats();

    return {
      status: available ? 'healthy' : 'unavailable',
      available,
      lastCheck: this.lastCheck ? new Date(this.lastCheck).toISOString() : null,
      baseURL: this.baseURL,
      stats: {
        totalRequests: this.stats.requests,
        successRate: `${stats.successRate}%`,
        averageLatency: `${stats.averageLatency}ms`
      }
    };
  }
}

// Export singleton instance
export default new OllamaService();
