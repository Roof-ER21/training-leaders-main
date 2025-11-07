/**
 * Analytics Utility
 * Tracks user events, module completions, and activity performance
 * Stores data in localStorage for persistence
 */

interface AnalyticsEvent {
  eventName: string;
  timestamp: number;
  properties: Record<string, any>;
}

interface ModuleCompletionData {
  moduleId: number;
  moduleName: string;
  score: number;
  completedAt: number;
  timeSpent?: number;
}

interface ActivityCompletionData {
  activityId: string;
  activityType: string;
  score: number;
  totalPoints: number;
  timeSpent?: number;
  attempts?: number;
}

interface UserMetrics {
  totalEvents: number;
  moduleCompletions: number;
  activityCompletions: number;
  averageModuleScore: number;
  averageActivityScore: number;
  totalTimeSpent: number;
  learningStreak: number;
  lastActiveDate: string;
}

class Analytics {
  private storageKey = 'roofer_analytics_events';
  private streakKey = 'learning_streak';
  private lastActiveKey = 'last_active_date';

  /**
   * Track a generic event
   */
  trackEvent(eventName: string, properties: Record<string, any> = {}): void {
    try {
      const event: AnalyticsEvent = {
        eventName,
        timestamp: Date.now(),
        properties,
      };

      const events = this.getEvents();
      events.push(event);
      localStorage.setItem(this.storageKey, JSON.stringify(events));

      // Update streak
      this.updateStreak();

      console.log('[Analytics]', eventName, properties);
    } catch (error) {
      console.error('[Analytics] Error tracking event:', error);
    }
  }

  /**
   * Track module completion
   */
  trackModuleCompletion(data: ModuleCompletionData): void {
    const { moduleId, moduleName, score, completedAt, timeSpent } = data;

    // Track event
    this.trackEvent('module_completed', {
      moduleId,
      moduleName,
      score,
      completedAt,
      timeSpent,
    });

    // Store module-specific data
    localStorage.setItem(`module_${moduleId}_completed`, 'true');
    localStorage.setItem(`module_${moduleId}_score`, score.toString());
    localStorage.setItem(`module_${moduleId}_completed_at`, new Date(completedAt).toISOString());

    if (timeSpent !== undefined) {
      localStorage.setItem(`module_${moduleId}_time_spent`, timeSpent.toString());
    }

    console.log(`[Analytics] Module ${moduleId} completed with ${score}% score`);
  }

  /**
   * Track activity completion
   */
  trackActivityCompletion(data: ActivityCompletionData): void {
    const { activityId, activityType, score, totalPoints, timeSpent, attempts } = data;

    // Track event
    this.trackEvent('activity_completed', {
      activityId,
      activityType,
      score,
      totalPoints,
      timeSpent,
      attempts,
    });

    // Update activity-type statistics
    const typeKey = `activity_${activityType}`;
    const currentAttempts = parseInt(localStorage.getItem(`${typeKey}_attempts`) || '0', 10);
    const currentTotalScore = parseInt(localStorage.getItem(`${typeKey}_total_score`) || '0', 10);
    const currentBestScore = parseInt(localStorage.getItem(`${typeKey}_best_score`) || '0', 10);

    localStorage.setItem(`${typeKey}_attempts`, (currentAttempts + 1).toString());
    localStorage.setItem(`${typeKey}_total_score`, (currentTotalScore + score).toString());

    if (score > currentBestScore) {
      localStorage.setItem(`${typeKey}_best_score`, score.toString());
    }

    console.log(`[Analytics] Activity ${activityId} (${activityType}) completed: ${score}/${totalPoints}`);
  }

  /**
   * Track learning session start
   */
  trackSessionStart(): void {
    this.trackEvent('session_start', {
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
    });
  }

  /**
   * Track learning session end
   */
  trackSessionEnd(duration: number): void {
    this.trackEvent('session_end', {
      duration,
      timestamp: Date.now(),
    });
  }

  /**
   * Track Agnes AI interaction
   */
  trackAgnesInteraction(message: string, model: string, responseTime?: number): void {
    this.trackEvent('agnes_interaction', {
      messageLength: message.length,
      model,
      responseTime,
      timestamp: Date.now(),
    });
  }

  /**
   * Track video progress
   */
  trackVideoProgress(videoId: string, progress: number, duration: number): void {
    this.trackEvent('video_progress', {
      videoId,
      progress,
      duration,
      percentComplete: Math.round((progress / duration) * 100),
    });
  }

  /**
   * Update learning streak
   */
  private updateStreak(): void {
    const today = new Date().toDateString();
    const lastActiveDate = localStorage.getItem(this.lastActiveKey);
    const currentStreak = parseInt(localStorage.getItem(this.streakKey) || '0', 10);

    if (!lastActiveDate) {
      // First time using the app
      localStorage.setItem(this.streakKey, '1');
      localStorage.setItem(this.lastActiveKey, today);
      return;
    }

    const lastDate = new Date(lastActiveDate);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Same day, no change to streak
      return;
    } else if (diffDays === 1) {
      // Consecutive day, increment streak
      localStorage.setItem(this.streakKey, (currentStreak + 1).toString());
      localStorage.setItem(this.lastActiveKey, today);
    } else {
      // Streak broken, reset to 1
      localStorage.setItem(this.streakKey, '1');
      localStorage.setItem(this.lastActiveKey, today);
    }
  }

  /**
   * Get current learning streak
   */
  getStreak(): number {
    const today = new Date().toDateString();
    const lastActiveDate = localStorage.getItem(this.lastActiveKey);

    if (!lastActiveDate) {
      return 0;
    }

    const lastDate = new Date(lastActiveDate);
    const todayDate = new Date(today);
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // If last active was more than 1 day ago, streak is broken
    if (diffDays > 1) {
      return 0;
    }

    return parseInt(localStorage.getItem(this.streakKey) || '0', 10);
  }

  /**
   * Get all tracked events
   */
  private getEvents(): AnalyticsEvent[] {
    try {
      const eventsJson = localStorage.getItem(this.storageKey);
      return eventsJson ? JSON.parse(eventsJson) : [];
    } catch (error) {
      console.error('[Analytics] Error parsing events:', error);
      return [];
    }
  }

  /**
   * Get user metrics summary
   */
  getUserMetrics(): UserMetrics {
    const events = this.getEvents();

    const moduleCompletions = events.filter((e) => e.eventName === 'module_completed');
    const activityCompletions = events.filter((e) => e.eventName === 'activity_completed');

    const averageModuleScore =
      moduleCompletions.length > 0
        ? Math.round(
            moduleCompletions.reduce((sum, e) => sum + (e.properties.score || 0), 0) /
              moduleCompletions.length
          )
        : 0;

    const averageActivityScore =
      activityCompletions.length > 0
        ? Math.round(
            activityCompletions.reduce((sum, e) => sum + (e.properties.score || 0), 0) /
              activityCompletions.length
          )
        : 0;

    const totalTimeSpent = events.reduce((sum, e) => {
      return sum + (e.properties.timeSpent || e.properties.duration || 0);
    }, 0);

    return {
      totalEvents: events.length,
      moduleCompletions: moduleCompletions.length,
      activityCompletions: activityCompletions.length,
      averageModuleScore,
      averageActivityScore,
      totalTimeSpent,
      learningStreak: this.getStreak(),
      lastActiveDate: localStorage.getItem(this.lastActiveKey) || '',
    };
  }

  /**
   * Export all analytics data as JSON
   */
  exportAnalytics(): string {
    const events = this.getEvents();
    const metrics = this.getUserMetrics();

    const exportData = {
      exportDate: new Date().toISOString(),
      metrics,
      events,
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Clear all analytics data (for testing/reset)
   */
  clearAnalytics(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.streakKey);
    localStorage.removeItem(this.lastActiveKey);
    console.log('[Analytics] All analytics data cleared');
  }

  /**
   * Get events by type
   */
  getEventsByType(eventName: string): AnalyticsEvent[] {
    const events = this.getEvents();
    return events.filter((e) => e.eventName === eventName);
  }

  /**
   * Get events within date range
   */
  getEventsByDateRange(startDate: Date, endDate: Date): AnalyticsEvent[] {
    const events = this.getEvents();
    return events.filter((e) => {
      return e.timestamp >= startDate.getTime() && e.timestamp <= endDate.getTime();
    });
  }

  /**
   * Get total learning time in minutes
   */
  getTotalLearningTime(): number {
    const metrics = this.getUserMetrics();
    return Math.round(metrics.totalTimeSpent / 60); // Convert seconds to minutes
  }

  /**
   * Get completion rate
   */
  getCompletionRate(): number {
    const totalModules = 9; // Total number of modules
    const metrics = this.getUserMetrics();
    return Math.round((metrics.moduleCompletions / totalModules) * 100);
  }
}

// Export singleton instance
const analytics = new Analytics();
export default analytics;

// Export types for use in other components
export type { AnalyticsEvent, ModuleCompletionData, ActivityCompletionData, UserMetrics };
