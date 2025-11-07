/**
 * Rate Limiter for Agnes AI Router
 * Implements token bucket algorithm for rate limiting
 */

import logger from './logger.js';

class RateLimiter {
  constructor(options = {}) {
    this.maxRequestsPerMinute = options.maxRequestsPerMinute ||
      parseInt(process.env.MAX_REQUESTS_PER_MINUTE) || 60;
    this.maxConcurrentRequests = options.maxConcurrentRequests ||
      parseInt(process.env.MAX_CONCURRENT_REQUESTS) || 10;

    // Token bucket for rate limiting
    this.tokens = this.maxRequestsPerMinute;
    this.lastRefill = Date.now();

    // Concurrent request tracking
    this.activeRequests = 0;
    this.queuedRequests = [];

    // Statistics
    this.stats = {
      totalRequests: 0,
      rateLimited: 0,
      concurrencyLimited: 0,
      averageWaitTime: 0
    };

    // Start token refill interval
    this.startRefill();
  }

  /**
   * Start token refill process
   */
  startRefill() {
    this.refillInterval = setInterval(() => {
      this.refillTokens();
    }, 1000); // Refill every second
  }

  /**
   * Refill tokens based on time elapsed
   */
  refillTokens() {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // seconds
    const tokensToAdd = (this.maxRequestsPerMinute / 60) * timePassed;

    this.tokens = Math.min(
      this.maxRequestsPerMinute,
      this.tokens + tokensToAdd
    );

    this.lastRefill = now;

    // Process queued requests if tokens available
    this.processQueue();
  }

  /**
   * Acquire permission to make a request
   */
  async acquire() {
    this.stats.totalRequests++;
    const startTime = Date.now();

    // Check concurrent request limit
    if (this.activeRequests >= this.maxConcurrentRequests) {
      this.stats.concurrencyLimited++;
      logger.debug('Concurrent request limit reached', {
        active: this.activeRequests,
        max: this.maxConcurrentRequests
      });
      await this.waitForConcurrencySlot();
    }

    // Check rate limit (tokens)
    if (this.tokens < 1) {
      this.stats.rateLimited++;
      logger.debug('Rate limit reached', {
        tokens: this.tokens.toFixed(2),
        queueSize: this.queuedRequests.length
      });
      await this.waitForToken();
    }

    // Consume token and increment active requests
    this.tokens -= 1;
    this.activeRequests++;

    const waitTime = Date.now() - startTime;
    this.updateAverageWaitTime(waitTime);

    logger.debug('Request acquired', {
      tokens: this.tokens.toFixed(2),
      activeRequests: this.activeRequests,
      waitTime: `${waitTime}ms`
    });

    // Return release function
    return () => this.release();
  }

  /**
   * Wait for available token
   */
  waitForToken() {
    return new Promise((resolve) => {
      this.queuedRequests.push(resolve);
    });
  }

  /**
   * Wait for concurrency slot
   */
  waitForConcurrencySlot() {
    return new Promise((resolve) => {
      const checkSlot = setInterval(() => {
        if (this.activeRequests < this.maxConcurrentRequests) {
          clearInterval(checkSlot);
          resolve();
        }
      }, 100);
    });
  }

  /**
   * Process queued requests
   */
  processQueue() {
    while (this.queuedRequests.length > 0 && this.tokens >= 1) {
      const resolve = this.queuedRequests.shift();
      resolve();
    }
  }

  /**
   * Release a request slot
   */
  release() {
    this.activeRequests = Math.max(0, this.activeRequests - 1);
    logger.debug('Request released', {
      activeRequests: this.activeRequests,
      queueSize: this.queuedRequests.length
    });
  }

  /**
   * Update average wait time
   */
  updateAverageWaitTime(waitTime) {
    const totalRequests = this.stats.totalRequests;
    const currentAverage = this.stats.averageWaitTime;
    this.stats.averageWaitTime =
      ((currentAverage * (totalRequests - 1)) + waitTime) / totalRequests;
  }

  /**
   * Get current statistics
   */
  getStats() {
    return {
      ...this.stats,
      currentTokens: this.tokens.toFixed(2),
      activeRequests: this.activeRequests,
      queuedRequests: this.queuedRequests.length,
      rateLimitRate: this.stats.totalRequests === 0 ? 0 :
        (this.stats.rateLimited / this.stats.totalRequests * 100).toFixed(2),
      averageWaitTime: `${this.stats.averageWaitTime.toFixed(2)}ms`
    };
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      totalRequests: 0,
      rateLimited: 0,
      concurrencyLimited: 0,
      averageWaitTime: 0
    };
    logger.info('Rate limiter statistics reset');
  }

  /**
   * Get health status
   */
  getHealth() {
    const stats = this.getStats();
    return {
      status: this.activeRequests < this.maxConcurrentRequests ? 'healthy' : 'throttled',
      availableTokens: stats.currentTokens,
      activeRequests: this.activeRequests,
      maxConcurrent: this.maxConcurrentRequests,
      queuedRequests: this.queuedRequests.length
    };
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.refillInterval) {
      clearInterval(this.refillInterval);
    }
  }
}

// Export singleton instances for different services
export const ollamaLimiter = new RateLimiter({
  maxRequestsPerMinute: 100,
  maxConcurrentRequests: 5
});

export const huggingfaceLimiter = new RateLimiter({
  maxRequestsPerMinute: 60,
  maxConcurrentRequests: 10
});

export default RateLimiter;
