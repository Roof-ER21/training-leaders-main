/**
 * Monitoring and Metrics Module for Ollama Backend
 *
 * Provides detailed metrics, logging, and health monitoring
 * for the Ollama backend service on Railway.
 */

const os = require('os');
const fs = require('fs');
const path = require('path');

class Monitor {
  constructor() {
    this.metrics = {
      requests: {
        total: 0,
        successful: 0,
        failed: 0,
        byModel: {},
        byEndpoint: {}
      },
      generation: {
        totalTokens: 0,
        totalTime: 0,
        averageTime: 0,
        byModel: {}
      },
      system: {
        startTime: Date.now(),
        lastHealthCheck: null
      }
    };
  }

  /**
   * Record an API request
   */
  recordRequest(endpoint, model, success = true, duration = 0) {
    this.metrics.requests.total++;

    if (success) {
      this.metrics.requests.successful++;
    } else {
      this.metrics.requests.failed++;
    }

    // Track by endpoint
    if (!this.metrics.requests.byEndpoint[endpoint]) {
      this.metrics.requests.byEndpoint[endpoint] = { count: 0, errors: 0 };
    }
    this.metrics.requests.byEndpoint[endpoint].count++;
    if (!success) {
      this.metrics.requests.byEndpoint[endpoint].errors++;
    }

    // Track by model
    if (model) {
      if (!this.metrics.requests.byModel[model]) {
        this.metrics.requests.byModel[model] = { count: 0, errors: 0 };
      }
      this.metrics.requests.byModel[model].count++;
      if (!success) {
        this.metrics.requests.byModel[model].errors++;
      }
    }
  }

  /**
   * Record a generation event
   */
  recordGeneration(model, tokens, duration) {
    this.metrics.generation.totalTokens += tokens || 0;
    this.metrics.generation.totalTime += duration || 0;

    // Update average
    const totalGenerations = Object.values(this.metrics.generation.byModel)
      .reduce((sum, m) => sum + m.count, 0);

    if (totalGenerations > 0) {
      this.metrics.generation.averageTime =
        this.metrics.generation.totalTime / totalGenerations;
    }

    // Track by model
    if (model) {
      if (!this.metrics.generation.byModel[model]) {
        this.metrics.generation.byModel[model] = {
          count: 0,
          totalTokens: 0,
          totalTime: 0,
          averageTime: 0
        };
      }

      const modelMetrics = this.metrics.generation.byModel[model];
      modelMetrics.count++;
      modelMetrics.totalTokens += tokens || 0;
      modelMetrics.totalTime += duration || 0;
      modelMetrics.averageTime = modelMetrics.totalTime / modelMetrics.count;
    }
  }

  /**
   * Get system metrics
   */
  getSystemMetrics() {
    const uptime = Date.now() - this.metrics.system.startTime;

    return {
      uptime: uptime,
      uptimeFormatted: this.formatUptime(uptime),
      memory: {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem(),
        usagePercent: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2)
      },
      cpu: {
        cores: os.cpus().length,
        model: os.cpus()[0]?.model || 'Unknown',
        load: os.loadavg()
      },
      platform: {
        type: os.platform(),
        release: os.release(),
        arch: os.arch()
      }
    };
  }

  /**
   * Format uptime in human-readable format
   */
  formatUptime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
    return `${seconds}s`;
  }

  /**
   * Get all metrics
   */
  getAllMetrics() {
    return {
      requests: this.metrics.requests,
      generation: this.metrics.generation,
      system: this.getSystemMetrics(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Update last health check time
   */
  updateHealthCheck() {
    this.metrics.system.lastHealthCheck = Date.now();
  }

  /**
   * Reset metrics
   */
  reset() {
    this.metrics.requests = {
      total: 0,
      successful: 0,
      failed: 0,
      byModel: {},
      byEndpoint: {}
    };
    this.metrics.generation = {
      totalTokens: 0,
      totalTime: 0,
      averageTime: 0,
      byModel: {}
    };
  }

  /**
   * Export metrics to JSON
   */
  exportMetrics() {
    return JSON.stringify(this.getAllMetrics(), null, 2);
  }
}

/**
 * Structured logger with levels
 */
class Logger {
  constructor(level = 'info') {
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };
    this.currentLevel = this.levels[level] || this.levels.info;
  }

  log(level, message, metadata = {}) {
    if (this.levels[level] >= this.currentLevel) {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level: level.toUpperCase(),
        message,
        ...metadata
      };

      const colorMap = {
        debug: '\x1b[36m', // Cyan
        info: '\x1b[32m',  // Green
        warn: '\x1b[33m',  // Yellow
        error: '\x1b[31m'  // Red
      };

      const color = colorMap[level] || '';
      const reset = '\x1b[0m';

      console.log(
        `${color}[${timestamp}] ${level.toUpperCase()}:${reset} ${message}`,
        Object.keys(metadata).length > 0 ? metadata : ''
      );
    }
  }

  debug(message, metadata) {
    this.log('debug', message, metadata);
  }

  info(message, metadata) {
    this.log('info', message, metadata);
  }

  warn(message, metadata) {
    this.log('warn', message, metadata);
  }

  error(message, metadata) {
    this.log('error', message, metadata);
  }
}

/**
 * Request timing middleware
 */
function timingMiddleware(monitor, logger) {
  return (req, res, next) => {
    const start = Date.now();

    // Capture original end method
    const originalEnd = res.end;

    res.end = function (...args) {
      const duration = Date.now() - start;
      const success = res.statusCode < 400;

      // Extract model from request body if available
      const model = req.body?.model || null;

      // Record metrics
      monitor.recordRequest(req.path, model, success, duration);

      // Log request
      logger.info('Request completed', {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`,
        model
      });

      // Call original end method
      originalEnd.apply(res, args);
    };

    next();
  };
}

/**
 * Error tracking middleware
 */
function errorTrackingMiddleware(monitor, logger) {
  return (err, req, res, next) => {
    const model = req.body?.model || null;

    // Record error
    monitor.recordRequest(req.path, model, false);

    // Log error with stack trace
    logger.error('Request error', {
      method: req.method,
      path: req.path,
      error: err.message,
      stack: err.stack
    });

    // Send error response
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal server error',
      timestamp: new Date().toISOString()
    });
  };
}

/**
 * Health check function
 */
async function performHealthCheck(ollamaHost, monitor, logger) {
  const axios = require('axios');

  try {
    const response = await axios.get(`${ollamaHost}/api/tags`, { timeout: 5000 });
    const models = response.data.models || [];

    monitor.updateHealthCheck();

    logger.debug('Health check successful', {
      modelsAvailable: models.length
    });

    return {
      healthy: true,
      models: models.length,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Health check failed', {
      error: error.message
    });

    return {
      healthy: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Metrics snapshot for Railway
 */
function getMetricsSnapshot(monitor) {
  const metrics = monitor.getAllMetrics();

  return {
    // Railway-friendly metrics format
    service: 'ollama-backend-agnes-ai',
    version: '1.0.0',
    timestamp: metrics.timestamp,

    // Request metrics
    requests: {
      total: metrics.requests.total,
      successful: metrics.requests.successful,
      failed: metrics.requests.failed,
      errorRate: metrics.requests.total > 0
        ? ((metrics.requests.failed / metrics.requests.total) * 100).toFixed(2) + '%'
        : '0%'
    },

    // Generation metrics
    generation: {
      totalGenerations: Object.values(metrics.generation.byModel)
        .reduce((sum, m) => sum + m.count, 0),
      totalTokens: metrics.generation.totalTokens,
      averageResponseTime: metrics.generation.averageTime.toFixed(2) + 'ms'
    },

    // System metrics
    system: {
      uptime: metrics.system.uptimeFormatted,
      memoryUsage: metrics.system.memory.usagePercent + '%',
      cpuCores: metrics.system.cpu.cores,
      platform: metrics.system.platform.type
    },

    // Model usage breakdown
    modelUsage: Object.entries(metrics.requests.byModel).map(([model, stats]) => ({
      model,
      requests: stats.count,
      errors: stats.errors,
      errorRate: stats.count > 0
        ? ((stats.errors / stats.count) * 100).toFixed(2) + '%'
        : '0%'
    })),

    // Endpoint usage breakdown
    endpointUsage: Object.entries(metrics.requests.byEndpoint).map(([endpoint, stats]) => ({
      endpoint,
      requests: stats.count,
      errors: stats.errors
    }))
  };
}

// Export all monitoring utilities
module.exports = {
  Monitor,
  Logger,
  timingMiddleware,
  errorTrackingMiddleware,
  performHealthCheck,
  getMetricsSnapshot
};
