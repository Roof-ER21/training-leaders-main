/**
 * Agnes AI Router - Main Entry Point
 * Intelligent routing service between Ollama and HuggingFace Pro
 */

import express from 'express';
import dotenv from 'dotenv';
import logger from './logger.js';
import routingService from './routingService.js';
import ollamaService from './ollamaService.js';
import huggingfaceService from './huggingfaceService.js';
import cache from './cache.js';
import { ollamaLimiter, huggingfaceLimiter } from './rateLimiter.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    logger.info('HTTP Request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip
    });
  });

  next();
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const health = await routingService.getHealth();
    const cacheHealth = cache.getHealth();

    const overallHealth = {
      status: health.status,
      timestamp: new Date().toISOString(),
      service: 'agnes-ai-router',
      version: '1.0.0',
      providers: health.providers,
      routing: health.routing,
      cache: cacheHealth,
      rateLimits: {
        ollama: ollamaLimiter.getHealth(),
        huggingface: huggingfaceLimiter.getHealth()
      }
    };

    res.status(health.status === 'healthy' ? 200 : 503).json(overallHealth);
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Statistics endpoint
app.get('/stats', (req, res) => {
  try {
    const stats = {
      routing: routingService.getStats(),
      ollama: ollamaService.getStats(),
      huggingface: huggingfaceService.getStats(),
      cache: cache.getStats(),
      rateLimits: {
        ollama: ollamaLimiter.getStats(),
        huggingface: huggingfaceLimiter.getStats()
      }
    };

    res.json(stats);
  } catch (error) {
    logger.error('Stats retrieval failed', { error: error.message });
    res.status(500).json({
      error: 'Failed to retrieve statistics',
      message: error.message
    });
  }
});

// Main completion endpoint
app.post('/v1/completions', async (req, res) => {
  try {
    const {
      prompt,
      temperature,
      max_tokens,
      provider,
      model,
      use_cache = true
    } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Missing required field: prompt'
      });
    }

    logger.info('Completion request received', {
      promptLength: prompt.length,
      provider,
      model
    });

    const result = await routingService.route({
      query: prompt,
      temperature,
      maxTokens: max_tokens,
      forceProvider: provider,
      forceModel: model,
      useCache: use_cache
    });

    res.json({
      id: `cmpl-${Date.now()}`,
      object: 'text_completion',
      created: Math.floor(Date.now() / 1000),
      model: result.model,
      provider: result.provider,
      choices: [{
        text: result.text,
        index: 0,
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: prompt.length,
        completion_tokens: result.text.length,
        total_tokens: prompt.length + result.text.length
      },
      metadata: {
        latency: result.latency,
        cached: false
      }
    });

  } catch (error) {
    logger.error('Completion request failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'Completion request failed',
      message: error.message
    });
  }
});

// Chat completion endpoint
app.post('/v1/chat/completions', async (req, res) => {
  try {
    const {
      messages,
      temperature,
      max_tokens,
      provider,
      model,
      use_cache = true
    } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'Missing or invalid required field: messages'
      });
    }

    logger.info('Chat completion request received', {
      messageCount: messages.length,
      provider,
      model
    });

    const result = await routingService.route({
      messages,
      temperature,
      maxTokens: max_tokens,
      forceProvider: provider,
      forceModel: model,
      useCache: use_cache
    });

    res.json({
      id: `chatcmpl-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      model: result.model,
      provider: result.provider,
      choices: [{
        index: 0,
        message: {
          role: 'assistant',
          content: result.text
        },
        finish_reason: 'stop'
      }],
      usage: {
        prompt_tokens: JSON.stringify(messages).length,
        completion_tokens: result.text.length,
        total_tokens: JSON.stringify(messages).length + result.text.length
      },
      metadata: {
        latency: result.latency,
        cached: false
      }
    });

  } catch (error) {
    logger.error('Chat completion request failed', {
      error: error.message,
      stack: error.stack
    });

    res.status(500).json({
      error: 'Chat completion request failed',
      message: error.message
    });
  }
});

// List available models endpoint
app.get('/v1/models', async (req, res) => {
  try {
    const ollamaModels = await ollamaService.listModels();
    const huggingfaceModels = huggingfaceService.getModels();

    res.json({
      object: 'list',
      data: [
        ...ollamaModels.map(m => ({
          id: m.name,
          object: 'model',
          created: m.modified_at,
          owned_by: 'ollama',
          provider: 'ollama',
          size: m.size
        })),
        ...Object.entries(huggingfaceModels).map(([key, config]) => ({
          id: config.id,
          object: 'model',
          created: Date.now(),
          owned_by: config.id.split('/')[0],
          provider: 'huggingface',
          description: config.description,
          cost_tier: config.costTier
        }))
      ]
    });

  } catch (error) {
    logger.error('Models list failed', { error: error.message });
    res.status(500).json({
      error: 'Failed to list models',
      message: error.message
    });
  }
});

// Cache management endpoints
app.post('/admin/cache/clear', (req, res) => {
  try {
    const keysCleared = cache.clear();
    res.json({
      message: 'Cache cleared successfully',
      keys_cleared: keysCleared
    });
  } catch (error) {
    logger.error('Cache clear failed', { error: error.message });
    res.status(500).json({
      error: 'Failed to clear cache',
      message: error.message
    });
  }
});

// Statistics reset endpoint
app.post('/admin/stats/reset', (req, res) => {
  try {
    routingService.resetStats();
    ollamaService.resetStats();
    huggingfaceService.resetStats();
    cache.resetStats();
    ollamaLimiter.resetStats();
    huggingfaceLimiter.resetStats();

    res.json({
      message: 'All statistics reset successfully'
    });
  } catch (error) {
    logger.error('Stats reset failed', { error: error.message });
    res.status(500).json({
      error: 'Failed to reset statistics',
      message: error.message
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    path: req.path
  });

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  logger.info('Agnes AI Router started', {
    port: PORT,
    env: process.env.NODE_ENV || 'development',
    ollamaURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    huggingfaceConfigured: !!process.env.HUGGINGFACE_API_KEY
  });

  // Initial health check
  routingService.getHealth().then(health => {
    logger.info('Initial health check', health);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

export default app;
