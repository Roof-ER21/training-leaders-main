/**
 * Enhanced Ollama Backend Server with Monitoring
 *
 * This version includes comprehensive monitoring, logging,
 * and metrics collection for production deployment.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const axios = require('axios');
require('dotenv').config();

const {
  Monitor,
  Logger,
  timingMiddleware,
  errorTrackingMiddleware,
  performHealthCheck,
  getMetricsSnapshot
} = require('./monitoring');

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

// Initialize monitoring and logging
const monitor = new Monitor();
const logger = new Logger(LOG_LEVEL);

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Timing middleware for all requests
app.use(timingMiddleware(monitor, logger));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
  handler: (req, res) => {
    logger.warn('Rate limit exceeded', {
      ip: req.ip,
      path: req.path
    });
    res.status(429).json({
      success: false,
      error: 'Too many requests, please try again later.'
    });
  }
});
app.use('/api/', limiter);

// Supported models configuration
const SUPPORTED_MODELS = {
  'susan-ai-21': {
    name: 'susan-ai-21',
    fallback: 'llama3.1',
    description: 'Custom Susan AI model with Agnes AI personality'
  },
  'llama3.1': {
    name: 'llama3.1',
    fallback: null,
    description: 'Meta Llama 3.1 - General purpose AI'
  },
  'qwen2.5-coder:7b': {
    name: 'qwen2.5-coder:7b',
    fallback: 'deepseek-coder:1.3b',
    description: 'Qwen 2.5 Coder 7B - Advanced code generation'
  },
  'deepseek-r1:1.5b': {
    name: 'deepseek-r1:1.5b',
    fallback: null,
    description: 'DeepSeek R1 - Advanced reasoning'
  },
  'deepseek-coder:1.3b': {
    name: 'deepseek-coder:1.3b',
    fallback: null,
    description: 'DeepSeek Coder - Code optimization'
  }
};

// Model cache
let modelCache = {
  lastUpdated: null,
  models: []
};

// Helper functions
async function isModelAvailable(modelName) {
  try {
    const response = await axios.get(`${OLLAMA_HOST}/api/tags`);
    const availableModels = response.data.models || [];
    return availableModels.some(m => m.name === modelName || m.name.startsWith(modelName));
  } catch (error) {
    logger.error('Error checking model availability', { error: error.message });
    return false;
  }
}

async function updateModelCache() {
  try {
    const response = await axios.get(`${OLLAMA_HOST}/api/tags`);
    modelCache = {
      lastUpdated: new Date(),
      models: response.data.models || []
    };
    logger.debug('Model cache updated', { modelCount: modelCache.models.length });
    return modelCache.models;
  } catch (error) {
    logger.error('Error updating model cache', { error: error.message });
    return [];
  }
}

async function selectModel(requestedModel) {
  const modelConfig = SUPPORTED_MODELS[requestedModel];

  if (!modelConfig) {
    throw new Error(`Unsupported model: ${requestedModel}`);
  }

  if (await isModelAvailable(modelConfig.name)) {
    logger.debug('Using requested model', { model: modelConfig.name });
    return modelConfig.name;
  }

  if (modelConfig.fallback && await isModelAvailable(modelConfig.fallback)) {
    logger.warn('Model unavailable, using fallback', {
      requested: modelConfig.name,
      fallback: modelConfig.fallback
    });
    return modelConfig.fallback;
  }

  const availableModels = await updateModelCache();
  if (availableModels.length > 0) {
    logger.warn('Using first available model', {
      requested: modelConfig.name,
      using: availableModels[0].name
    });
    return availableModels[0].name;
  }

  throw new Error('No models available');
}

// Routes

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Ollama Backend for Agnes AI',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      metrics: 'GET /metrics',
      models: 'GET /api/models',
      generate: 'POST /api/generate',
      chat: 'POST /api/chat',
      pull: 'POST /api/pull',
      show: 'GET /api/show/:model'
    },
    supportedModels: Object.keys(SUPPORTED_MODELS)
  });
});

// Health check endpoint with enhanced metrics
app.get('/health', async (req, res) => {
  try {
    const health = await performHealthCheck(OLLAMA_HOST, monitor, logger);
    const metrics = getMetricsSnapshot(monitor);

    res.json({
      status: health.healthy ? 'healthy' : 'unhealthy',
      service: 'ollama-backend-agnes-ai',
      timestamp: new Date().toISOString(),
      ollama: {
        connected: health.healthy,
        host: OLLAMA_HOST,
        modelsAvailable: health.models || 0
      },
      metrics: {
        uptime: metrics.system.uptime,
        requests: metrics.requests.total,
        errorRate: metrics.requests.errorRate,
        memoryUsage: metrics.system.memoryUsage
      },
      supportedModels: Object.keys(SUPPORTED_MODELS)
    });
  } catch (error) {
    logger.error('Health check error', { error: error.message });
    res.status(503).json({
      status: 'unhealthy',
      service: 'ollama-backend-agnes-ai',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = getMetricsSnapshot(monitor);
  res.json(metrics);
});

// Detailed metrics endpoint
app.get('/metrics/detailed', (req, res) => {
  res.json(monitor.getAllMetrics());
});

// List models
app.get('/api/models', async (req, res) => {
  try {
    const models = await updateModelCache();

    res.json({
      success: true,
      models: models.map(m => ({
        name: m.name,
        size: m.size,
        modified: m.modified_at,
        supported: Object.keys(SUPPORTED_MODELS).includes(m.name)
      })),
      supported: SUPPORTED_MODELS,
      lastUpdated: modelCache.lastUpdated
    });
  } catch (error) {
    logger.error('List models error', { error: error.message });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate completion
app.post('/api/generate', async (req, res) => {
  const startTime = Date.now();

  try {
    const { model, prompt, stream = false, options = {} } = req.body;

    if (!model || !prompt) {
      return res.status(400).json({
        success: false,
        error: 'Model and prompt are required'
      });
    }

    const selectedModel = await selectModel(model);

    const ollamaResponse = await axios.post(
      `${OLLAMA_HOST}/api/generate`,
      {
        model: selectedModel,
        prompt,
        stream,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
          ...options
        }
      },
      {
        responseType: stream ? 'stream' : 'json',
        timeout: 300000
      }
    );

    if (stream) {
      res.setHeader('Content-Type', 'application/x-ndjson');
      ollamaResponse.data.pipe(res);

      // Track completion on stream end
      ollamaResponse.data.on('end', () => {
        const duration = Date.now() - startTime;
        monitor.recordGeneration(selectedModel, null, duration);
      });
    } else {
      const duration = Date.now() - startTime;
      const responseData = ollamaResponse.data;

      // Record metrics
      monitor.recordGeneration(
        selectedModel,
        responseData.eval_count || 0,
        duration
      );

      logger.info('Generation completed', {
        model: selectedModel,
        tokens: responseData.eval_count || 0,
        duration: `${duration}ms`
      });

      res.json({
        success: true,
        model: selectedModel,
        response: responseData
      });
    }
  } catch (error) {
    logger.error('Generation error', {
      error: error.message,
      model: req.body?.model
    });
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || 'Unknown error'
    });
  }
});

// Chat completion
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();

  try {
    const { model, messages, stream = false, options = {} } = req.body;

    if (!model || !messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: 'Model and messages array are required'
      });
    }

    const selectedModel = await selectModel(model);

    const ollamaResponse = await axios.post(
      `${OLLAMA_HOST}/api/chat`,
      {
        model: selectedModel,
        messages,
        stream,
        options: {
          temperature: 0.7,
          top_p: 0.9,
          top_k: 40,
          ...options
        }
      },
      {
        responseType: stream ? 'stream' : 'json',
        timeout: 300000
      }
    );

    if (stream) {
      res.setHeader('Content-Type', 'application/x-ndjson');
      ollamaResponse.data.pipe(res);

      ollamaResponse.data.on('end', () => {
        const duration = Date.now() - startTime;
        monitor.recordGeneration(selectedModel, null, duration);
      });
    } else {
      const duration = Date.now() - startTime;
      const responseData = ollamaResponse.data;

      monitor.recordGeneration(
        selectedModel,
        responseData.eval_count || 0,
        duration
      );

      logger.info('Chat completed', {
        model: selectedModel,
        messages: messages.length,
        duration: `${duration}ms`
      });

      res.json({
        success: true,
        model: selectedModel,
        response: responseData
      });
    }
  } catch (error) {
    logger.error('Chat error', {
      error: error.message,
      model: req.body?.model
    });
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || 'Unknown error'
    });
  }
});

// Pull model
app.post('/api/pull', async (req, res) => {
  try {
    const { model } = req.body;

    if (!model) {
      return res.status(400).json({
        success: false,
        error: 'Model name is required'
      });
    }

    logger.info('Pulling model', { model });

    res.setHeader('Content-Type', 'application/x-ndjson');

    const ollamaResponse = await axios.post(
      `${OLLAMA_HOST}/api/pull`,
      { name: model },
      { responseType: 'stream' }
    );

    ollamaResponse.data.pipe(res);

    ollamaResponse.data.on('end', () => {
      updateModelCache();
      logger.info('Model pull completed', { model });
    });
  } catch (error) {
    logger.error('Pull error', {
      error: error.message,
      model: req.body?.model
    });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Model info
app.get('/api/show/:model', async (req, res) => {
  try {
    const { model } = req.params;

    const ollamaResponse = await axios.post(`${OLLAMA_HOST}/api/show`, {
      name: model
    });

    res.json({
      success: true,
      model: model,
      info: ollamaResponse.data
    });
  } catch (error) {
    logger.error('Show model error', {
      error: error.message,
      model: req.params.model
    });
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use(errorTrackingMiddleware(monitor, logger));

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  logger.info('Ollama Backend API started', {
    port: PORT,
    ollamaHost: OLLAMA_HOST,
    nodeEnv: process.env.NODE_ENV || 'development',
    logLevel: LOG_LEVEL
  });

  logger.info('Initializing model cache...');
  await updateModelCache();
  logger.info('Model cache initialized', {
    modelCount: modelCache.models.length
  });

  // Periodic health check (every 5 minutes)
  setInterval(async () => {
    await performHealthCheck(OLLAMA_HOST, monitor, logger);
  }, 5 * 60 * 1000);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  const metrics = monitor.exportMetrics();
  logger.info('Final metrics', { metrics });
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully...');
  const metrics = monitor.exportMetrics();
  logger.info('Final metrics', { metrics });
  process.exit(0);
});
