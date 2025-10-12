/**
 * Response Caching Service for Agnes AI Router
 * Implements intelligent caching with TTL and size limits
 */

import NodeCache from 'node-cache';
import crypto from 'crypto';
import logger from './logger.js';

class CacheService {
  constructor(options = {}) {
    this.cache = new NodeCache({
      stdTTL: options.ttl || parseInt(process.env.CACHE_TTL_SECONDS) || 300,
      checkperiod: 60,
      maxKeys: options.maxSize || parseInt(process.env.CACHE_MAX_SIZE) || 1000,
      useClones: false
    });

    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0
    };

    // Log cache events
    this.cache.on('set', (key) => {
      this.stats.sets++;
      logger.debug('Cache set', { key: this._maskKey(key) });
    });

    this.cache.on('del', (key) => {
      this.stats.deletes++;
      logger.debug('Cache delete', { key: this._maskKey(key) });
    });

    this.cache.on('expired', (key) => {
      logger.debug('Cache expired', { key: this._maskKey(key) });
    });
  }

  /**
   * Generate cache key from query parameters
   */
  generateKey(params) {
    const { query, model, temperature, maxTokens } = params;
    const keyString = JSON.stringify({ query, model, temperature, maxTokens });
    return crypto.createHash('md5').update(keyString).digest('hex');
  }

  /**
   * Get cached response
   */
  get(params) {
    const key = this.generateKey(params);
    const value = this.cache.get(key);

    if (value) {
      this.stats.hits++;
      logger.debug('Cache hit', {
        key: this._maskKey(key),
        hitRate: this.getHitRate()
      });
      return value;
    }

    this.stats.misses++;
    logger.debug('Cache miss', {
      key: this._maskKey(key),
      hitRate: this.getHitRate()
    });
    return null;
  }

  /**
   * Set cached response
   */
  set(params, value, ttl = null) {
    const key = this.generateKey(params);
    const success = this.cache.set(key, value, ttl || undefined);

    if (success) {
      logger.debug('Cache stored', {
        key: this._maskKey(key),
        size: this.cache.keys().length
      });
    }

    return success;
  }

  /**
   * Delete specific cache entry
   */
  delete(params) {
    const key = this.generateKey(params);
    return this.cache.del(key);
  }

  /**
   * Clear all cache
   */
  clear() {
    const keyCount = this.cache.keys().length;
    this.cache.flushAll();
    logger.info('Cache cleared', { keysCleared: keyCount });
    return keyCount;
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      ...this.stats,
      size: this.cache.keys().length,
      hitRate: this.getHitRate(),
      missRate: this.getMissRate()
    };
  }

  /**
   * Calculate hit rate
   */
  getHitRate() {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : (this.stats.hits / total * 100).toFixed(2);
  }

  /**
   * Calculate miss rate
   */
  getMissRate() {
    const total = this.stats.hits + this.stats.misses;
    return total === 0 ? 0 : (this.stats.misses / total * 100).toFixed(2);
  }

  /**
   * Reset statistics
   */
  resetStats() {
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0
    };
    logger.info('Cache statistics reset');
  }

  /**
   * Mask cache key for logging (show only first 8 chars)
   */
  _maskKey(key) {
    return `${key.substring(0, 8)}...`;
  }

  /**
   * Get cache health status
   */
  getHealth() {
    const stats = this.getStats();
    return {
      status: 'healthy',
      size: stats.size,
      maxSize: this.cache.options.maxKeys,
      hitRate: `${stats.hitRate}%`,
      totalRequests: this.stats.hits + this.stats.misses
    };
  }
}

// Export singleton instance
export default new CacheService();
