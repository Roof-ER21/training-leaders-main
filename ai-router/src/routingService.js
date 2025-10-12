/**
 * Intelligent Routing Service for Agnes AI Router
 * Routes queries to optimal AI provider based on complexity and availability
 */

import logger from './logger.js';
import ollamaService from './ollamaService.js';
import huggingfaceService from './huggingfaceService.js';
import cache from './cache.js';
import {
  OLLAMA_MODELS,
  HUGGINGFACE_MODELS,
  TASK_PATTERNS,
  COMPLEXITY_WEIGHTS
} from '../config/models.js';

class RoutingService {
  constructor() {
    this.useOllamaFirst = process.env.USE_OLLAMA_FIRST === 'true';
    this.fallbackEnabled = process.env.FALLBACK_ENABLED !== 'false';
    this.complexityThreshold = parseFloat(process.env.COMPLEXITY_THRESHOLD) || 0.7;

    this.stats = {
      totalRoutes: 0,
      ollamaRoutes: 0,
      huggingfaceRoutes: 0,
      cacheHits: 0,
      fallbacks: 0
    };
  }

  /**
   * Main routing function
   */
  async route(options) {
    const {
      query,
      messages = null,
      forceProvider = null,
      forceModel = null,
      temperature = 0.7,
      maxTokens = 4096,
      useCache = true
    } = options;

    this.stats.totalRoutes++;

    // Check cache first
    if (useCache) {
      const cached = cache.get({
        query: query || JSON.stringify(messages),
        model: forceModel || 'auto',
        temperature,
        maxTokens
      });

      if (cached) {
        this.stats.cacheHits++;
        logger.info('Returning cached response');
        return cached;
      }
    }

    // Determine task type and complexity
    const taskType = this.detectTaskType(query || this.messagesToQuery(messages));
    const complexity = this.calculateComplexity(query || this.messagesToQuery(messages));

    logger.info('Routing request', {
      taskType,
      complexity: complexity.toFixed(2),
      forceProvider,
      forceModel
    });

    let result;

    try {
      // Route based on provider preference or auto-routing
      if (forceProvider === 'ollama') {
        result = await this.routeToOllama(taskType, messages || query, { temperature, maxTokens });
      } else if (forceProvider === 'huggingface') {
        result = await this.routeToHuggingFace(taskType, messages || query, { temperature, maxTokens }, complexity);
      } else {
        result = await this.autoRoute(taskType, complexity, messages || query, { temperature, maxTokens });
      }

      // Cache successful result
      if (useCache && result) {
        cache.set({
          query: query || JSON.stringify(messages),
          model: result.model,
          temperature,
          maxTokens
        }, result);
      }

      return result;

    } catch (error) {
      logger.error('Routing error', {
        error: error.message,
        taskType,
        complexity
      });
      throw error;
    }
  }

  /**
   * Auto-route based on complexity and availability
   */
  async autoRoute(taskType, complexity, input, options) {
    const ollamaAvailable = await ollamaService.getAvailability();
    const huggingfaceAvailable = huggingfaceService.isAvailable;

    logger.debug('Auto-routing decision', {
      ollamaAvailable,
      huggingfaceAvailable,
      useOllamaFirst: this.useOllamaFirst,
      complexity
    });

    // Decision logic
    const shouldUseOllama =
      ollamaAvailable &&
      this.useOllamaFirst &&
      complexity < this.complexityThreshold;

    const shouldUseHuggingFace =
      huggingfaceAvailable &&
      (complexity >= this.complexityThreshold || !ollamaAvailable);

    // Route to preferred service
    if (shouldUseOllama) {
      try {
        return await this.routeToOllama(taskType, input, options);
      } catch (error) {
        logger.warn('Ollama failed, attempting fallback', { error: error.message });

        if (this.fallbackEnabled && huggingfaceAvailable) {
          this.stats.fallbacks++;
          return await this.routeToHuggingFace(taskType, input, options, complexity);
        }
        throw error;
      }
    } else if (shouldUseHuggingFace) {
      try {
        return await this.routeToHuggingFace(taskType, input, options, complexity);
      } catch (error) {
        logger.warn('HuggingFace failed, attempting fallback', { error: error.message });

        if (this.fallbackEnabled && ollamaAvailable) {
          this.stats.fallbacks++;
          return await this.routeToOllama(taskType, input, options);
        }
        throw error;
      }
    } else {
      throw new Error('No AI providers available');
    }
  }

  /**
   * Route to Ollama
   */
  async routeToOllama(taskType, input, options) {
    this.stats.ollamaRoutes++;

    // Select appropriate Ollama model
    const modelConfig = this.selectOllamaModel(taskType);

    logger.info('Routing to Ollama', {
      model: modelConfig.name,
      taskType
    });

    // Determine if input is messages or simple prompt
    if (Array.isArray(input)) {
      return await ollamaService.chat({
        model: modelConfig.name,
        messages: input,
        temperature: options.temperature ?? modelConfig.temperature,
        maxTokens: options.maxTokens ?? modelConfig.maxTokens
      });
    } else {
      return await ollamaService.generate({
        model: modelConfig.name,
        prompt: input,
        temperature: options.temperature ?? modelConfig.temperature,
        maxTokens: options.maxTokens ?? modelConfig.maxTokens
      });
    }
  }

  /**
   * Route to HuggingFace
   */
  async routeToHuggingFace(taskType, input, options, complexity) {
    this.stats.huggingfaceRoutes++;

    // Select appropriate HuggingFace model
    const modelConfig = this.selectHuggingFaceModel(taskType, complexity);

    logger.info('Routing to HuggingFace', {
      model: modelConfig.id,
      taskType,
      complexity
    });

    // Determine if input is messages or simple prompt
    if (Array.isArray(input)) {
      return await huggingfaceService.chat({
        model: modelConfig.id,
        messages: input,
        temperature: options.temperature ?? modelConfig.temperature,
        maxTokens: options.maxTokens ?? modelConfig.maxTokens
      });
    } else {
      return await huggingfaceService.generate({
        model: modelConfig.id,
        prompt: input,
        temperature: options.temperature ?? modelConfig.temperature,
        maxTokens: options.maxTokens ?? modelConfig.maxTokens
      });
    }
  }

  /**
   * Detect task type from query
   */
  detectTaskType(query) {
    const lowerQuery = query.toLowerCase();

    // Check for code-related patterns
    if (TASK_PATTERNS.code.keywords.some(kw => lowerQuery.includes(kw)) ||
        TASK_PATTERNS.code.patterns.some(pattern => pattern.test(lowerQuery))) {
      return 'code';
    }

    // Check for reasoning patterns
    if (TASK_PATTERNS.reasoning.keywords.some(kw => lowerQuery.includes(kw)) ||
        TASK_PATTERNS.reasoning.patterns.some(pattern => pattern.test(lowerQuery))) {
      return 'reasoning';
    }

    // Check for simple patterns
    if (TASK_PATTERNS.simple.keywords.some(kw => lowerQuery.includes(kw)) ||
        TASK_PATTERNS.simple.patterns.some(pattern => pattern.test(lowerQuery))) {
      return 'simple';
    }

    // Check for complex patterns
    if (TASK_PATTERNS.complex.keywords.some(kw => lowerQuery.includes(kw)) ||
        TASK_PATTERNS.complex.patterns.some(pattern => pattern.test(lowerQuery))) {
      return 'complex';
    }

    // Default to conversational
    return 'conversational';
  }

  /**
   * Calculate query complexity score (0-1)
   */
  calculateComplexity(query) {
    let score = 0;

    // Query length factor (normalized to 0-1)
    const lengthScore = Math.min(query.length / 500, 1);
    score += lengthScore * COMPLEXITY_WEIGHTS.queryLength;

    // Complex keywords factor
    const complexKeywords = TASK_PATTERNS.complex.keywords;
    const keywordMatches = complexKeywords.filter(kw =>
      query.toLowerCase().includes(kw)
    ).length;
    const keywordScore = Math.min(keywordMatches / 3, 1);
    score += keywordScore * COMPLEXITY_WEIGHTS.keywords;

    // Multi-part question factor
    const questionMarks = (query.match(/\?/g) || []).length;
    const multiPartScore = Math.min(questionMarks / 2, 1);
    score += multiPartScore * COMPLEXITY_WEIGHTS.multiPart;

    // Technical depth factor
    const technicalTerms = ['architecture', 'implementation', 'algorithm', 'optimization',
                           'framework', 'infrastructure', 'scalability', 'performance'];
    const technicalMatches = technicalTerms.filter(term =>
      query.toLowerCase().includes(term)
    ).length;
    const technicalScore = Math.min(technicalMatches / 3, 1);
    score += technicalScore * COMPLEXITY_WEIGHTS.technicalDepth;

    return Math.min(score, 1);
  }

  /**
   * Select appropriate Ollama model
   */
  selectOllamaModel(taskType) {
    switch (taskType) {
      case 'code':
        return OLLAMA_MODELS.code;
      case 'reasoning':
        return OLLAMA_MODELS.reasoning;
      default:
        return OLLAMA_MODELS.conversational;
    }
  }

  /**
   * Select appropriate HuggingFace model
   */
  selectHuggingFaceModel(taskType, complexity) {
    // For code tasks
    if (taskType === 'code') {
      return HUGGINGFACE_MODELS.code;
    }

    // For reasoning tasks
    if (taskType === 'reasoning') {
      return HUGGINGFACE_MODELS.reasoning;
    }

    // For simple queries, use fast model
    if (taskType === 'simple' || complexity < 0.3) {
      return HUGGINGFACE_MODELS.fast;
    }

    // For complex queries, use full conversational model
    return HUGGINGFACE_MODELS.conversational;
  }

  /**
   * Convert messages to query string for analysis
   */
  messagesToQuery(messages) {
    if (!messages || !Array.isArray(messages)) {
      return '';
    }
    return messages.map(m => m.content).join(' ');
  }

  /**
   * Get routing statistics
   */
  getStats() {
    return {
      ...this.stats,
      ollamaPercentage: this.stats.totalRoutes === 0 ? 0 :
        (this.stats.ollamaRoutes / this.stats.totalRoutes * 100).toFixed(2),
      huggingfacePercentage: this.stats.totalRoutes === 0 ? 0 :
        (this.stats.huggingfaceRoutes / this.stats.totalRoutes * 100).toFixed(2),
      cacheHitRate: this.stats.totalRoutes === 0 ? 0 :
        (this.stats.cacheHits / this.stats.totalRoutes * 100).toFixed(2),
      fallbackRate: this.stats.totalRoutes === 0 ? 0 :
        (this.stats.fallbacks / this.stats.totalRoutes * 100).toFixed(2)
    };
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      totalRoutes: 0,
      ollamaRoutes: 0,
      huggingfaceRoutes: 0,
      cacheHits: 0,
      fallbacks: 0
    };
    logger.info('Routing statistics reset');
  }

  /**
   * Get health status
   */
  async getHealth() {
    const ollamaHealth = await ollamaService.getHealth();
    const huggingfaceHealth = huggingfaceService.getHealth();
    const stats = this.getStats();

    return {
      status: (ollamaHealth.available || huggingfaceHealth.available) ? 'healthy' : 'degraded',
      providers: {
        ollama: ollamaHealth,
        huggingface: huggingfaceHealth
      },
      routing: {
        totalRoutes: this.stats.totalRoutes,
        ollamaUsage: `${stats.ollamaPercentage}%`,
        huggingfaceUsage: `${stats.huggingfacePercentage}%`,
        cacheHitRate: `${stats.cacheHitRate}%`,
        fallbacks: this.stats.fallbacks
      }
    };
  }
}

// Export singleton instance
export default new RoutingService();
