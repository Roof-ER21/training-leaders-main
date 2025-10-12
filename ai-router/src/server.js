/**
 * Agnes AI Router - Intelligent AI Service
 * Routes requests to HuggingFace Pro or Ollama based on availability and task complexity
 *
 * Powered by Agent21 (Grok Code + Claude Squad + Codex)
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { HfInference } = require('@huggingface/inference');
const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Response cache (5 minute TTL)
const responseCache = new NodeCache({ stdTTL: 300 });

// Initialize HuggingFace client
const hf = new HfInference(process.env.HF_API_KEY);

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

// HuggingFace Pro Models Configuration
const HF_MODELS = {
  conversational: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
  conversationalFast: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
  code: 'Qwen/Qwen2.5-Coder-32B-Instruct',
  reasoning: 'deepseek-ai/DeepSeek-R1',
  roofing: 'meta-llama/Meta-Llama-3.1-70B-Instruct' // Custom trained on roofing data
};

// Ollama configuration
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODELS = {
  'susan-ai-21': 'susan-ai-21',
  'llama3.1': 'llama3.1',
  'qwen2.5-coder': 'qwen2.5-coder:7b',
  'deepseek-r1': 'deepseek-r1:1.5b',
  'deepseek-coder': 'deepseek-coder:1.3b'
};

/**
 * Intelligent model selection based on message context
 */
function selectModel(message, context = '') {
  const lowerMessage = message.toLowerCase();
  const lowerContext = context.toLowerCase();

  // Code-related queries
  if (lowerMessage.includes('code') || lowerMessage.includes('function') ||
      lowerMessage.includes('script') || lowerContext.includes('programming')) {
    return { type: 'hf', model: HF_MODELS.code, reason: 'code generation' };
  }

  // Complex reasoning queries
  if (lowerMessage.includes('explain why') || lowerMessage.includes('analyze') ||
      lowerMessage.includes('compare') || lowerMessage.length > 200) {
    return { type: 'hf', model: HF_MODELS.reasoning, reason: 'complex reasoning' };
  }

  // Roofing-specific queries (use best model)
  if (lowerMessage.includes('roof') || lowerMessage.includes('shingle') ||
      lowerMessage.includes('hail') || lowerMessage.includes('damage') ||
      lowerContext.includes('roofing')) {
    return { type: 'hf', model: HF_MODELS.roofing, reason: 'roofing expertise' };
  }

  // Simple conversational queries (use fast model)
  if (lowerMessage.length < 50 && !lowerMessage.includes('?')) {
    return { type: 'hf', model: HF_MODELS.conversationalFast, reason: 'simple conversation' };
  }

  // Default to conversational model
  return { type: 'hf', model: HF_MODELS.conversational, reason: 'general conversation' };
}

/**
 * Query HuggingFace model
 */
async function queryHuggingFace(model, message, systemPrompt = '') {
  try {
    const fullPrompt = systemPrompt
      ? `${systemPrompt}\n\nUser: ${message}\n\nAssistant:`
      : message;

    const response = await hf.textGeneration({
      model: model,
      inputs: fullPrompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false
      }
    });

    return {
      success: true,
      response: response.generated_text,
      model: model,
      provider: 'huggingface'
    };
  } catch (error) {
    console.error('HuggingFace error:', error.message);
    throw error;
  }
}

/**
 * Query Ollama model (fallback)
 */
async function queryOllama(model, message, systemPrompt = '') {
  try {
    const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model: model,
      prompt: message,
      system: systemPrompt,
      stream: false
    }, { timeout: 30000 });

    return {
      success: true,
      response: response.data.response,
      model: model,
      provider: 'ollama'
    };
  } catch (error) {
    console.error('Ollama error:', error.message);
    throw error;
  }
}

/**
 * Main Agnes AI endpoint
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context, preferredModel, systemPrompt } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Check cache
    const cacheKey = `${message}-${context || ''}`;
    const cached = responseCache.get(cacheKey);
    if (cached) {
      console.log('Cache hit for:', message.substring(0, 50));
      return res.json({ ...cached, cached: true });
    }

    // Select best model
    const modelSelection = selectModel(message, context || '');
    console.log(`Request: "${message.substring(0, 50)}..." -> ${modelSelection.reason} -> ${modelSelection.model}`);

    let result;
    let fallbackAttempted = false;

    try {
      // Try HuggingFace first (preferred for always-online)
      if (modelSelection.type === 'hf') {
        result = await queryHuggingFace(
          modelSelection.model,
          message,
          systemPrompt || 'You are Agnes, an expert roofing AI assistant. Provide helpful, accurate, and professional guidance on roofing inspection, damage assessment, and industry best practices.'
        );
      }
    } catch (error) {
      console.log('HuggingFace failed, trying Ollama fallback...');
      fallbackAttempted = true;

      // Fallback to Ollama
      try {
        const ollamaModel = preferredModel || OLLAMA_MODELS['susan-ai-21'];
        result = await queryOllama(ollamaModel, message, systemPrompt);
      } catch (ollamaError) {
        throw new Error('Both HuggingFace and Ollama unavailable');
      }
    }

    // Add metadata
    result.timestamp = new Date().toISOString();
    result.fallbackUsed = fallbackAttempted;
    result.selectionReason = modelSelection.reason;

    // Cache successful response
    responseCache.set(cacheKey, result);

    res.json(result);

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      error: 'AI service unavailable',
      message: error.message,
      suggestion: 'Please try again in a moment'
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', async (req, res) => {
  const health = {
    status: 'online',
    timestamp: new Date().toISOString(),
    services: {
      huggingface: 'unknown',
      ollama: 'unknown'
    },
    cache: {
      keys: responseCache.keys().length,
      hits: responseCache.getStats().hits,
      misses: responseCache.getStats().misses
    }
  };

  // Check HuggingFace
  try {
    await hf.textGeneration({
      model: HF_MODELS.conversationalFast,
      inputs: 'test',
      parameters: { max_new_tokens: 5 }
    });
    health.services.huggingface = 'online';
  } catch (error) {
    health.services.huggingface = 'offline';
  }

  // Check Ollama
  try {
    await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 5000 });
    health.services.ollama = 'online';
  } catch (error) {
    health.services.ollama = 'offline';
  }

  res.json(health);
});

/**
 * Models list endpoint
 */
app.get('/api/models', (req, res) => {
  res.json({
    huggingface: HF_MODELS,
    ollama: OLLAMA_MODELS,
    recommendation: 'HuggingFace models are always-online and recommended for production'
  });
});

/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`🤖 Agnes AI Router running on port ${PORT}`);
  console.log(`📡 HuggingFace Pro: ${process.env.HF_API_KEY ? 'Configured' : 'Not configured'}`);
  console.log(`🦙 Ollama URL: ${OLLAMA_URL}`);
  console.log(`🚀 Ready to route intelligent AI requests!`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});
