const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
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

// Model cache to track available models
let modelCache = {
  lastUpdated: null,
  models: []
};

// Function to check if model is available
async function isModelAvailable(modelName) {
  try {
    const response = await axios.get(`${OLLAMA_HOST}/api/tags`);
    const availableModels = response.data.models || [];
    return availableModels.some(m => m.name === modelName || m.name.startsWith(modelName));
  } catch (error) {
    console.error('Error checking model availability:', error.message);
    return false;
  }
}

// Function to update model cache
async function updateModelCache() {
  try {
    const response = await axios.get(`${OLLAMA_HOST}/api/tags`);
    modelCache = {
      lastUpdated: new Date(),
      models: response.data.models || []
    };
    return modelCache.models;
  } catch (error) {
    console.error('Error updating model cache:', error.message);
    return [];
  }
}

// Function to select best available model
async function selectModel(requestedModel) {
  const modelConfig = SUPPORTED_MODELS[requestedModel];

  if (!modelConfig) {
    throw new Error(`Unsupported model: ${requestedModel}`);
  }

  // Check if requested model is available
  if (await isModelAvailable(modelConfig.name)) {
    return modelConfig.name;
  }

  // Try fallback
  if (modelConfig.fallback && await isModelAvailable(modelConfig.fallback)) {
    console.log(`Model ${modelConfig.name} unavailable, using fallback: ${modelConfig.fallback}`);
    return modelConfig.fallback;
  }

  // Last resort: use any available model
  const availableModels = await updateModelCache();
  if (availableModels.length > 0) {
    console.log(`Using first available model: ${availableModels[0].name}`);
    return availableModels[0].name;
  }

  throw new Error('No models available');
}

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const ollamaResponse = await axios.get(`${OLLAMA_HOST}/api/tags`, { timeout: 5000 });
    const models = ollamaResponse.data.models || [];

    res.json({
      status: 'healthy',
      service: 'ollama-backend-agnes-ai',
      timestamp: new Date().toISOString(),
      ollama: {
        connected: true,
        host: OLLAMA_HOST,
        modelsAvailable: models.length
      },
      supportedModels: Object.keys(SUPPORTED_MODELS)
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      service: 'ollama-backend-agnes-ai',
      timestamp: new Date().toISOString(),
      error: error.message,
      ollama: {
        connected: false,
        host: OLLAMA_HOST
      }
    });
  }
});

// List available models
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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate completion endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { model, prompt, stream = false, options = {} } = req.body;

    if (!model || !prompt) {
      return res.status(400).json({
        success: false,
        error: 'Model and prompt are required'
      });
    }

    // Select best available model
    const selectedModel = await selectModel(model);

    // Forward request to Ollama
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
        timeout: 300000 // 5 minutes
      }
    );

    if (stream) {
      res.setHeader('Content-Type', 'application/x-ndjson');
      ollamaResponse.data.pipe(res);
    } else {
      res.json({
        success: true,
        model: selectedModel,
        response: ollamaResponse.data
      });
    }
  } catch (error) {
    console.error('Generation error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || 'Unknown error'
    });
  }
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { model, messages, stream = false, options = {} } = req.body;

    if (!model || !messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        error: 'Model and messages array are required'
      });
    }

    // Select best available model
    const selectedModel = await selectModel(model);

    // Forward request to Ollama
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
        timeout: 300000 // 5 minutes
      }
    );

    if (stream) {
      res.setHeader('Content-Type', 'application/x-ndjson');
      ollamaResponse.data.pipe(res);
    } else {
      res.json({
        success: true,
        model: selectedModel,
        response: ollamaResponse.data
      });
    }
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.response?.data || 'Unknown error'
    });
  }
});

// Pull model endpoint
app.post('/api/pull', async (req, res) => {
  try {
    const { model } = req.body;

    if (!model) {
      return res.status(400).json({
        success: false,
        error: 'Model name is required'
      });
    }

    // Stream the pull progress
    res.setHeader('Content-Type', 'application/x-ndjson');

    const ollamaResponse = await axios.post(
      `${OLLAMA_HOST}/api/pull`,
      { name: model },
      { responseType: 'stream' }
    );

    ollamaResponse.data.pipe(res);

    // Update cache after pull completes
    ollamaResponse.data.on('end', () => {
      updateModelCache();
    });
  } catch (error) {
    console.error('Pull error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Model info endpoint
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
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Ollama Backend for Agnes AI',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      models: 'GET /api/models',
      generate: 'POST /api/generate',
      chat: 'POST /api/chat',
      pull: 'POST /api/pull',
      show: 'GET /api/show/:model'
    },
    supportedModels: Object.keys(SUPPORTED_MODELS)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Ollama Backend API listening on port ${PORT}`);
  console.log(`Ollama host: ${OLLAMA_HOST}`);
  console.log('Updating model cache...');
  await updateModelCache();
  console.log(`Model cache initialized with ${modelCache.models.length} models`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});
