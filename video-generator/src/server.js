// Video Generation Service for Training Leaders
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

const ScriptGenerator = require('./services/script-generator');
const DIDVideoService = require('./services/did-service');

const app = express();
const PORT = process.env.PORT || 3003;

// Initialize services
const scriptGenerator = new ScriptGenerator(process.env.GROQ_API_KEY);
const didService = new DIDVideoService(process.env.DID_API_KEY);

// Cache for generated scripts and video URLs (24 hour TTL)
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 3600 });

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});
app.use(limiter);

// Health check
app.get('/health', async (req, res) => {
  const health = {
    status: 'online',
    timestamp: new Date().toISOString(),
    services: {
      scriptGenerator: 'unknown',
      didService: 'unknown'
    },
    cache: {
      keys: cache.keys().length,
      hits: cache.getStats().hits,
      misses: cache.getStats().misses
    }
  };

  // Check Groq (script generator)
  try {
    await scriptGenerator.generateCustomScript('test', 'Say hello', 5);
    health.services.scriptGenerator = 'online';
  } catch (error) {
    health.services.scriptGenerator = 'offline: ' + error.message;
  }

  // Check D-ID (if API key provided)
  if (process.env.DID_API_KEY) {
    try {
      await didService.getCredits();
      health.services.didService = 'online';
    } catch (error) {
      health.services.didService = 'offline: ' + error.message;
    }
  } else {
    health.services.didService = 'not configured';
  }

  res.json(health);
});

// Generate module intro script
app.post('/api/script/intro', async (req, res) => {
  try {
    const { moduleNumber, moduleName, learningObjectives } = req.body;

    if (!moduleNumber || !moduleName || !learningObjectives) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: moduleNumber, moduleName, learningObjectives'
      });
    }

    // Check cache
    const cacheKey = `intro_${moduleNumber}_${moduleName}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        script: cached,
        cached: true
      });
    }

    // Generate new script
    const script = await scriptGenerator.generateModuleIntro(
      moduleNumber,
      moduleName,
      learningObjectives
    );

    cache.set(cacheKey, script);

    res.json({
      success: true,
      script,
      cached: false
    });
  } catch (error) {
    console.error('Intro script generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate concept explainer script
app.post('/api/script/explainer', async (req, res) => {
  try {
    const { concept, details, duration } = req.body;

    if (!concept || !details) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: concept, details'
      });
    }

    // Check cache
    const cacheKey = `explainer_${concept}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        script: cached,
        cached: true
      });
    }

    // Generate new script
    const script = await scriptGenerator.generateConceptExplainer(
      concept,
      details,
      duration || 90
    );

    cache.set(cacheKey, script);

    res.json({
      success: true,
      script,
      cached: false
    });
  } catch (error) {
    console.error('Explainer script generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate module summary script
app.post('/api/script/summary', async (req, res) => {
  try {
    const { moduleNumber, moduleName, keyTakeaways } = req.body;

    if (!moduleNumber || !moduleName || !keyTakeaways) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: moduleNumber, moduleName, keyTakeaways'
      });
    }

    // Check cache
    const cacheKey = `summary_${moduleNumber}_${moduleName}`;
    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        script: cached,
        cached: true
      });
    }

    // Generate new script
    const script = await scriptGenerator.generateModuleSummary(
      moduleNumber,
      moduleName,
      keyTakeaways
    );

    cache.set(cacheKey, script);

    res.json({
      success: true,
      script,
      cached: false
    });
  } catch (error) {
    console.error('Summary script generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate custom script
app.post('/api/script/custom', async (req, res) => {
  try {
    const { topic, instructions, duration } = req.body;

    if (!topic || !instructions) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: topic, instructions'
      });
    }

    const script = await scriptGenerator.generateCustomScript(
      topic,
      instructions,
      duration || 60
    );

    res.json({
      success: true,
      script
    });
  } catch (error) {
    console.error('Custom script generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Create video from script using D-ID
app.post('/api/video/create', async (req, res) => {
  try {
    const { script, avatarUrl, voiceId, presenterId } = req.body;

    if (!script) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: script'
      });
    }

    if (!process.env.DID_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'D-ID API key not configured'
      });
    }

    const options = {};
    if (voiceId) options.voiceId = voiceId;
    if (presenterId) options.presenterId = presenterId;

    const result = await didService.createVideo(script, avatarUrl, options);

    res.json(result);
  } catch (error) {
    console.error('Video creation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Check video status
app.get('/api/video/status/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!process.env.DID_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'D-ID API key not configured'
      });
    }

    const status = await didService.getVideoStatus(videoId);

    res.json(status);
  } catch (error) {
    console.error('Video status check error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Wait for video completion (long-polling endpoint)
app.post('/api/video/wait/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;
    const { maxWaitTime } = req.body;

    if (!process.env.DID_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'D-ID API key not configured'
      });
    }

    const videoUrl = await didService.waitForVideo(videoId, maxWaitTime || 300);

    res.json({
      success: true,
      videoUrl
    });
  } catch (error) {
    console.error('Video wait error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Generate script and create video in one call
app.post('/api/video/generate', async (req, res) => {
  try {
    const { type, ...params } = req.body;

    if (!type) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: type (intro, explainer, summary, custom)'
      });
    }

    // Step 1: Generate script
    let script;
    switch (type) {
      case 'intro':
        script = await scriptGenerator.generateModuleIntro(
          params.moduleNumber,
          params.moduleName,
          params.learningObjectives
        );
        break;
      case 'explainer':
        script = await scriptGenerator.generateConceptExplainer(
          params.concept,
          params.details,
          params.duration
        );
        break;
      case 'summary':
        script = await scriptGenerator.generateModuleSummary(
          params.moduleNumber,
          params.moduleName,
          params.keyTakeaways
        );
        break;
      case 'custom':
        script = await scriptGenerator.generateCustomScript(
          params.topic,
          params.instructions,
          params.duration
        );
        break;
      default:
        return res.status(400).json({
          success: false,
          error: 'Invalid type. Must be: intro, explainer, summary, or custom'
        });
    }

    // Step 2: Create video (if D-ID is configured)
    if (process.env.DID_API_KEY) {
      const options = {};
      if (params.voiceId) options.voiceId = params.voiceId;
      if (params.presenterId) options.presenterId = params.presenterId;

      const videoResult = await didService.createVideo(
        script,
        params.avatarUrl,
        options
      );

      res.json({
        success: true,
        script,
        video: videoResult
      });
    } else {
      // Return script only if D-ID not configured
      res.json({
        success: true,
        script,
        video: null,
        message: 'D-ID API not configured - script generated only'
      });
    }
  } catch (error) {
    console.error('Video generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get D-ID account credits
app.get('/api/did/credits', async (req, res) => {
  try {
    if (!process.env.DID_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'D-ID API key not configured'
      });
    }

    const credits = await didService.getCredits();

    res.json({
      success: true,
      credits
    });
  } catch (error) {
    console.error('Credits check error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get available voices
app.get('/api/did/voices', async (req, res) => {
  try {
    if (!process.env.DID_API_KEY) {
      return res.status(503).json({
        success: false,
        error: 'D-ID API key not configured'
      });
    }

    const voices = await didService.listVoices();

    res.json({
      success: true,
      voices
    });
  } catch (error) {
    console.error('Voices list error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎬 Video Generation Service running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`\n✅ Script Generator: ${process.env.GROQ_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`✅ D-ID Service: ${process.env.DID_API_KEY ? 'Configured' : 'NOT CONFIGURED'}`);
  console.log(`\n🚀 Ready to generate training videos!\n`);
});

module.exports = app;
