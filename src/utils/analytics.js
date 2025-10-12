// Advanced Analytics and Progress Tracking System for RoofER Training
// Comprehensive learning analytics with performance insights

class AdvancedAnalytics {
  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.events = [];
    this.metrics = {
      engagement: {},
      performance: {},
      learning: {},
      technical: {},
    };

    // Initialize localStorage tracking
    this.storageKey = 'roofer_analytics';
    this.loadExistingData();
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  loadExistingData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.metrics = { ...this.metrics, ...data.metrics };
        this.events = data.events || [];
      }
    } catch (error) {
      console.warn('Analytics: Failed to load stored data', error);
    }
  }

  saveToStorage() {
    try {
      const data = {
        sessionId: this.sessionId,
        metrics: this.metrics,
        events: this.events.slice(-1000), // Keep last 1000 events
        lastUpdated: Date.now(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Analytics: Failed to save data', error);
    }
  }

  // Event Tracking
  trackEvent(eventType, eventData = {}) {
    const event = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type: eventType,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      data: eventData,
    };

    this.events.push(event);
    this.updateMetrics(eventType, eventData);
    this.saveToStorage();

    // Real-time logging for development
    console.log('📊 Analytics Event:', eventType, eventData);
  }

  // General metrics update router - routes to specific metric update methods
  updateMetrics(eventType, eventData = {}) {
    try {
      switch (eventType) {
        case 'module_complete':
          if (
            eventData.moduleId &&
            eventData.score !== undefined &&
            eventData.timeSpent !== undefined
          ) {
            this.updateLearningProgress(
              eventData.moduleId,
              eventData.score,
              eventData.timeSpent
            );
          }
          break;

        case 'quiz_attempt':
          if (
            eventData.moduleId &&
            eventData.isCorrect !== undefined &&
            eventData.timeSpent !== undefined
          ) {
            this.updateQuizMetrics(
              eventData.moduleId,
              eventData.isCorrect,
              eventData.timeSpent
            );
          }
          break;

        case 'agnes_interaction':
          if (eventData.userInputLength !== undefined) {
            this.updateEngagementMetrics('agnes', eventData.userInputLength);
          }
          break;

        case 'vr_session':
          if (eventData.duration !== undefined) {
            this.updateEngagementMetrics('vr', eventData.duration);
          }
          break;

        case 'performance_metric':
          if (eventData.metricName && eventData.value !== undefined) {
            this.updateTechnicalMetrics(eventData.metricName, eventData.value);
          }
          break;

        case 'page_view':
          if (eventData.timeSpent !== undefined) {
            this.updateEngagementMetrics(
              'page_navigation',
              eventData.timeSpent
            );
          }
          break;

        case 'user_action':
          // Track general user engagement
          this.updateEngagementMetrics('user_actions', 1);
          break;

        case 'module_start':
          // Track module engagement
          this.updateEngagementMetrics('module_starts', 1);
          break;

        case 'error':
          // Track error metrics
          this.updateTechnicalMetrics('error_count', 1);
          break;

        default:
          // For any other event types, just update general engagement
          this.updateEngagementMetrics('general', 1);
          break;
      }
    } catch (error) {
      console.warn(
        'Analytics: Failed to update metrics for event:',
        eventType,
        error
      );
    }
  }

  // Module and Learning Progress
  trackModuleStart(moduleId, moduleName) {
    this.trackEvent('module_start', {
      moduleId,
      moduleName,
      userLevel: this.getCurrentUserLevel(),
    });
  }

  trackModuleComplete(moduleId, moduleName, score, timeSpent) {
    this.trackEvent('module_complete', {
      moduleId,
      moduleName,
      score,
      timeSpent,
      userLevel: this.getCurrentUserLevel(),
    });

    // Update learning metrics
    this.updateLearningProgress(moduleId, score, timeSpent);
  }

  trackQuizAttempt(moduleId, questionId, userAnswer, correctAnswer, timeSpent) {
    const isCorrect = userAnswer === correctAnswer;

    this.trackEvent('quiz_attempt', {
      moduleId,
      questionId,
      userAnswer,
      correctAnswer,
      isCorrect,
      timeSpent,
    });

    this.updateQuizMetrics(moduleId, isCorrect, timeSpent);
  }

  // Agnes AI Interactions
  trackAgnesInteraction(interactionType, userInput, agnesResponse, context) {
    this.trackEvent('agnes_interaction', {
      interactionType,
      userInputLength: userInput?.length || 0,
      agnesResponseLength: agnesResponse?.length || 0,
      context: {
        moduleId: context?.currentModule?.id,
        scenario: context?.scenario,
        hasConfusion: context?.hasConfusion,
      },
    });

    this.updateEngagementMetrics('agnes', userInput?.length || 0);
  }

  // VR Training Analytics
  trackVRSession(mode, lessonId, duration, performance) {
    this.trackEvent('vr_session', {
      mode,
      lessonId,
      duration,
      performance,
      completionRate: performance?.completionRate || 0,
    });
  }

  // User Engagement Metrics
  trackPageView(pageName, timeSpent = 0) {
    this.trackEvent('page_view', {
      pageName,
      timeSpent,
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    });
  }

  trackUserAction(action, target, context = {}) {
    this.trackEvent('user_action', {
      action,
      target,
      context,
      timestamp: Date.now(),
    });
  }

  // Performance and Technical Metrics
  trackPerformanceMetric(metricName, value, context = {}) {
    this.trackEvent('performance_metric', {
      metricName,
      value,
      context,
      userAgent: navigator.userAgent,
      connectionType: navigator.connection?.effectiveType || 'unknown',
    });

    this.updateTechnicalMetrics(metricName, value);
  }

  trackError(errorType, errorMessage, context = {}) {
    this.trackEvent('error', {
      errorType,
      errorMessage: errorMessage.substring(0, 500), // Limit error message length
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    });
  }

  // Learning Progress Analytics
  updateLearningProgress(moduleId, score, timeSpent) {
    if (!this.metrics.learning[moduleId]) {
      this.metrics.learning[moduleId] = {
        attempts: 0,
        totalScore: 0,
        totalTime: 0,
        bestScore: 0,
        averageScore: 0,
      };
    }

    const module = this.metrics.learning[moduleId];
    module.attempts += 1;
    module.totalScore += score;
    module.totalTime += timeSpent;
    module.bestScore = Math.max(module.bestScore, score);
    module.averageScore = module.totalScore / module.attempts;
  }

  updateQuizMetrics(moduleId, isCorrect, timeSpent) {
    if (!this.metrics.performance[moduleId]) {
      this.metrics.performance[moduleId] = {
        totalQuestions: 0,
        correctAnswers: 0,
        totalTime: 0,
        accuracy: 0,
        averageTime: 0,
      };
    }

    const quiz = this.metrics.performance[moduleId];
    quiz.totalQuestions += 1;
    if (isCorrect) quiz.correctAnswers += 1;
    quiz.totalTime += timeSpent;
    quiz.accuracy = (quiz.correctAnswers / quiz.totalQuestions) * 100;
    quiz.averageTime = quiz.totalTime / quiz.totalQuestions;
  }

  updateEngagementMetrics(feature, interactionLength) {
    if (!this.metrics.engagement[feature]) {
      this.metrics.engagement[feature] = {
        sessions: 0,
        totalInteractions: 0,
        totalTime: 0,
        averageInteractionLength: 0,
      };
    }

    const engagement = this.metrics.engagement[feature];
    engagement.totalInteractions += 1;
    engagement.totalTime += interactionLength;
    engagement.averageInteractionLength =
      engagement.totalTime / engagement.totalInteractions;
  }

  updateTechnicalMetrics(metricName, value) {
    if (!this.metrics.technical[metricName]) {
      this.metrics.technical[metricName] = {
        count: 0,
        total: 0,
        min: Infinity,
        max: -Infinity,
        average: 0,
      };
    }

    const metric = this.metrics.technical[metricName];
    metric.count += 1;
    metric.total += value;
    metric.min = Math.min(metric.min, value);
    metric.max = Math.max(metric.max, value);
    metric.average = metric.total / metric.count;
  }

  // Advanced Analytics Reports
  getEngagementReport() {
    const sessionDuration = Date.now() - this.startTime;

    return {
      sessionDuration: Math.round(sessionDuration / 1000), // seconds
      totalEvents: this.events.length,
      eventsPerMinute: (this.events.length / (sessionDuration / 60000)).toFixed(
        2
      ),
      topEventTypes: this.getTopEventTypes(),
      engagementByFeature: this.metrics.engagement,
      activeTimePercentage: this.calculateActiveTimePercentage(),
    };
  }

  getLearningProgressReport() {
    const completedModules = Object.keys(this.metrics.learning);
    const totalScore = Object.values(this.metrics.learning).reduce(
      (sum, module) => sum + module.totalScore,
      0
    );
    const totalAttempts = Object.values(this.metrics.learning).reduce(
      (sum, module) => sum + module.attempts,
      0
    );

    return {
      completedModules: completedModules.length,
      totalAttempts,
      overallAverageScore:
        totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(2) : 0,
      moduleProgress: this.metrics.learning,
      strongestAreas: this.getStrongestAreas(),
      improvementAreas: this.getImprovementAreas(),
      learningVelocity: this.calculateLearningVelocity(),
    };
  }

  getPerformanceReport() {
    const performanceData = this.metrics.performance;
    const technicalData = this.metrics.technical;

    return {
      quizPerformance: performanceData,
      technicalMetrics: technicalData,
      systemHealth: this.getSystemHealthScore(),
      userExperienceScore: this.calculateUXScore(),
      recommendations: this.generatePerformanceRecommendations(),
    };
  }

  // Helper Methods
  getCurrentUserLevel() {
    // This would typically come from the user state
    return this.getUserProgressFromStorage()?.level || 1;
  }

  getUserProgressFromStorage() {
    try {
      const stored = localStorage.getItem('roofer_user_progress');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  getTopEventTypes() {
    const eventCounts = {};
    this.events.forEach(event => {
      eventCounts[event.type] = (eventCounts[event.type] || 0) + 1;
    });

    return Object.entries(eventCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }

  calculateActiveTimePercentage() {
    const activeEvents = this.events.filter(event =>
      ['user_action', 'quiz_attempt', 'agnes_interaction'].includes(event.type)
    );

    if (activeEvents.length < 2) return 0;

    const sessionDuration = Date.now() - this.startTime;
    const activeSpan =
      activeEvents[activeEvents.length - 1].timestamp -
      activeEvents[0].timestamp;

    return Math.min(100, (activeSpan / sessionDuration) * 100).toFixed(2);
  }

  getStrongestAreas() {
    return Object.entries(this.metrics.learning)
      .sort(([, a], [, b]) => b.averageScore - a.averageScore)
      .slice(0, 3)
      .map(([moduleId, data]) => ({
        moduleId,
        averageScore: data.averageScore,
      }));
  }

  getImprovementAreas() {
    return Object.entries(this.metrics.learning)
      .sort(([, a], [, b]) => a.averageScore - b.averageScore)
      .slice(0, 3)
      .map(([moduleId, data]) => ({
        moduleId,
        averageScore: data.averageScore,
      }));
  }

  calculateLearningVelocity() {
    const completedModules = Object.values(this.metrics.learning);
    if (completedModules.length === 0) return 0;

    const totalTime = completedModules.reduce(
      (sum, module) => sum + module.totalTime,
      0
    );
    const averageTimePerModule = totalTime / completedModules.length;

    return {
      modulesPerHour: (3600000 / averageTimePerModule).toFixed(2), // Convert ms to hours
      averageModuleTime: Math.round(averageTimePerModule / 1000), // seconds
    };
  }

  getSystemHealthScore() {
    const errorEvents = this.events.filter(event => event.type === 'error');
    const totalEvents = this.events.length;

    if (totalEvents === 0) return 100;

    const errorRate = errorEvents.length / totalEvents;
    return Math.max(0, 100 - errorRate * 100).toFixed(2);
  }

  calculateUXScore() {
    const performanceMetrics = this.metrics.technical;
    const loadTime = performanceMetrics.page_load_time?.average || 0;
    const responseTime = performanceMetrics.ai_response_time?.average || 0;

    // Score based on performance thresholds
    let score = 100;
    if (loadTime > 3000) score -= 20; // Penalize slow load times
    if (loadTime > 5000) score -= 30;
    if (responseTime > 2000) score -= 15; // Penalize slow AI responses
    if (responseTime > 4000) score -= 25;

    return Math.max(0, score);
  }

  generatePerformanceRecommendations() {
    const recommendations = [];
    const tech = this.metrics.technical;

    if (tech.page_load_time?.average > 3000) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        message:
          'Page load times are slow. Consider optimizing assets and implementing caching.',
      });
    }

    if (tech.ai_response_time?.average > 2000) {
      recommendations.push({
        type: 'ai_performance',
        priority: 'medium',
        message:
          'AI response times could be improved with response caching and debouncing.',
      });
    }

    const errorEvents = this.events.filter(event => event.type === 'error');
    if (errorEvents.length > 5) {
      recommendations.push({
        type: 'stability',
        priority: 'high',
        message:
          'Multiple errors detected. Review error logs and implement better error handling.',
      });
    }

    return recommendations;
  }

  // Export and Data Management
  exportAnalytics() {
    return {
      sessionInfo: {
        sessionId: this.sessionId,
        startTime: this.startTime,
        duration: Date.now() - this.startTime,
      },
      events: this.events,
      metrics: this.metrics,
      reports: {
        engagement: this.getEngagementReport(),
        learning: this.getLearningProgressReport(),
        performance: this.getPerformanceReport(),
      },
      exportedAt: Date.now(),
    };
  }

  clearAnalytics() {
    this.events = [];
    this.metrics = {
      engagement: {},
      performance: {},
      learning: {},
      technical: {},
    };
    localStorage.removeItem(this.storageKey);
    console.log('📊 Analytics data cleared');
  }

  // Real-time Dashboard Data
  getDashboardData() {
    return {
      realTime: {
        activeSession: true,
        sessionDuration: Math.round((Date.now() - this.startTime) / 1000),
        eventsThisSession: this.events.length,
        currentLevel: this.getCurrentUserLevel(),
      },
      quickStats: {
        totalModulesCompleted: Object.keys(this.metrics.learning).length,
        averageScore: this.calculateOverallAverage(),
        totalAgnesInteractions: this.getAgnesInteractionCount(),
        systemHealth: this.getSystemHealthScore(),
      },
      recentActivity: this.events.slice(-10).reverse(), // Last 10 events
    };
  }

  calculateOverallAverage() {
    const modules = Object.values(this.metrics.learning);
    if (modules.length === 0) return 0;

    const totalScore = modules.reduce(
      (sum, module) => sum + module.totalScore,
      0
    );
    const totalAttempts = modules.reduce(
      (sum, module) => sum + module.attempts,
      0
    );

    return totalAttempts > 0 ? (totalScore / totalAttempts).toFixed(1) : 0;
  }

  getAgnesInteractionCount() {
    return this.events.filter(event => event.type === 'agnes_interaction')
      .length;
  }
}

// Global analytics instance
window.roofERAnalytics = new AdvancedAnalytics();

export default window.roofERAnalytics;
