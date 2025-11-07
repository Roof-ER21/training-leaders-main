/**
 * Training Service
 * Handles training session tracking, time tracking, and progress monitoring
 */

import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import {
  TrainingSession,
  ActivitySession,
  UserProgress,
} from '../types/user';
import analytics from '../utils/analytics';

class TrainingService {
  private currentSession: TrainingSession | null = null;
  private sessionStartTime: number = 0;

  /**
   * Start a new training session
   */
  async startTrainingSession(
    userId: string,
    moduleId: number,
    moduleName: string
  ): Promise<TrainingSession> {
    const sessionId = `${userId}_${moduleId}_${Date.now()}`;
    const startTime = Date.now();

    const session: TrainingSession = {
      sessionId,
      userId,
      moduleId,
      moduleName,
      startTime,
      completed: false,
      activities: [],
    };

    // Store in Firestore
    if (isFirebaseConfigured && db) {
      await setDoc(doc(db, 'trainingSessions', sessionId), session);
    } else {
      // Store in localStorage as backup
      localStorage.setItem(`session_${sessionId}`, JSON.stringify(session));
    }

    // Track in analytics
    analytics.trackEvent('session_start', {
      sessionId,
      moduleId,
      moduleName,
      startTime,
    });

    this.currentSession = session;
    this.sessionStartTime = startTime;

    console.log('[TrainingService] Session started:', sessionId);
    return session;
  }

  /**
   * End current training session
   */
  async endTrainingSession(
    score?: number,
    completed: boolean = true
  ): Promise<void> {
    if (!this.currentSession) {
      console.warn('[TrainingService] No active session to end');
      return;
    }

    const endTime = Date.now();
    const duration = Math.floor((endTime - this.sessionStartTime) / 1000); // in seconds

    // Update session
    const updatedSession: TrainingSession = {
      ...this.currentSession,
      endTime,
      duration,
      score,
      completed,
    };

    // Store in Firestore
    if (isFirebaseConfigured && db) {
      await updateDoc(
        doc(db, 'trainingSessions', this.currentSession.sessionId),
        {
          endTime,
          duration,
          score,
          completed,
        }
      );
    } else {
      // Update in localStorage
      localStorage.setItem(
        `session_${this.currentSession.sessionId}`,
        JSON.stringify(updatedSession)
      );
    }

    // Track in analytics
    analytics.trackEvent('session_end', {
      sessionId: this.currentSession.sessionId,
      moduleId: this.currentSession.moduleId,
      duration,
      score,
      completed,
    });

    if (completed && score !== undefined) {
      analytics.trackModuleCompletion({
        moduleId: this.currentSession.moduleId,
        moduleName: this.currentSession.moduleName,
        score,
        completedAt: endTime,
        timeSpent: duration,
      });
    }

    console.log('[TrainingService] Session ended:', this.currentSession.sessionId);
    this.currentSession = null;
    this.sessionStartTime = 0;
  }

  /**
   * Start an activity within the current session
   */
  startActivity(activityId: string, activityType: string): void {
    if (!this.currentSession) {
      console.warn('[TrainingService] No active session for activity');
      return;
    }

    const activity: ActivitySession = {
      activityId,
      activityType,
      startTime: Date.now(),
      attempts: 0,
    };

    this.currentSession.activities.push(activity);

    analytics.trackEvent('activity_start', {
      sessionId: this.currentSession.sessionId,
      activityId,
      activityType,
    });
  }

  /**
   * Complete an activity within the current session
   */
  async completeActivity(
    activityId: string,
    score: number,
    totalPoints: number
  ): Promise<void> {
    if (!this.currentSession) {
      console.warn('[TrainingService] No active session for activity');
      return;
    }

    const activity = this.currentSession.activities.find(
      (a) => a.activityId === activityId
    );

    if (!activity) {
      console.warn('[TrainingService] Activity not found:', activityId);
      return;
    }

    const endTime = Date.now();
    const duration = Math.floor((endTime - activity.startTime) / 1000);

    activity.endTime = endTime;
    activity.duration = duration;
    activity.score = score;
    activity.totalPoints = totalPoints;
    activity.attempts += 1;

    // Update session in storage
    if (isFirebaseConfigured && db) {
      await updateDoc(
        doc(db, 'trainingSessions', this.currentSession.sessionId),
        {
          activities: this.currentSession.activities,
        }
      );
    } else {
      localStorage.setItem(
        `session_${this.currentSession.sessionId}`,
        JSON.stringify(this.currentSession)
      );
    }

    // Track in analytics
    analytics.trackActivityCompletion({
      activityId,
      activityType: activity.activityType,
      score,
      totalPoints,
      timeSpent: duration,
      attempts: activity.attempts,
    });
  }

  /**
   * Get current active session
   */
  getCurrentSession(): TrainingSession | null {
    return this.currentSession;
  }

  /**
   * Get user's training sessions
   */
  async getUserSessions(
    userId: string,
    limitCount: number = 50
  ): Promise<TrainingSession[]> {
    if (isFirebaseConfigured && db) {
      const q = query(
        collection(db, 'trainingSessions'),
        where('userId', '==', userId),
        orderBy('startTime', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as TrainingSession);
    } else {
      // Load from localStorage
      const sessions: TrainingSession[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('session_')) {
          const sessionData = localStorage.getItem(key);
          if (sessionData) {
            const session = JSON.parse(sessionData) as TrainingSession;
            if (session.userId === userId) {
              sessions.push(session);
            }
          }
        }
      }
      return sessions.sort((a, b) => b.startTime - a.startTime).slice(0, limitCount);
    }
  }

  /**
   * Get all training sessions (admin only)
   */
  async getAllSessions(limitCount: number = 100): Promise<TrainingSession[]> {
    if (isFirebaseConfigured && db) {
      const q = query(
        collection(db, 'trainingSessions'),
        orderBy('startTime', 'desc'),
        limit(limitCount)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as TrainingSession);
    } else {
      // Load from localStorage
      const sessions: TrainingSession[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('session_')) {
          const sessionData = localStorage.getItem(key);
          if (sessionData) {
            sessions.push(JSON.parse(sessionData) as TrainingSession);
          }
        }
      }
      return sessions.sort((a, b) => b.startTime - a.startTime).slice(0, limitCount);
    }
  }

  /**
   * Calculate user progress
   */
  async getUserProgress(userId: string, userName: string, email: string): Promise<UserProgress> {
    const sessions = await this.getUserSessions(userId);
    const completedSessions = sessions.filter((s) => s.completed);

    const completedModules = Array.from(
      new Set(completedSessions.map((s) => s.moduleId))
    );

    const totalTimeSpent = sessions.reduce(
      (sum, s) => sum + (s.duration || 0),
      0
    );

    const averageScore =
      completedSessions.length > 0
        ? Math.round(
            completedSessions.reduce((sum, s) => sum + (s.score || 0), 0) /
              completedSessions.length
          )
        : 0;

    const totalModules = 9; // Total number of modules
    const completionPercentage = Math.round(
      (completedModules.length / totalModules) * 100
    );

    const lastSession = sessions[0];
    const lastActive = lastSession ? lastSession.startTime : 0;

    return {
      userId,
      userName,
      email,
      currentModule: lastSession ? lastSession.moduleId : 1,
      completionPercentage,
      totalTimeSpent,
      lastActive,
      completedModules,
      averageScore,
      sessionsCount: sessions.length,
      streak: analytics.getStreak(),
    };
  }

  /**
   * Get all users progress (admin only)
   */
  async getAllUsersProgress(): Promise<UserProgress[]> {
    const allSessions = await this.getAllSessions();

    // Group sessions by user
    const userSessionsMap = new Map<string, TrainingSession[]>();
    allSessions.forEach((session) => {
      const existing = userSessionsMap.get(session.userId) || [];
      existing.push(session);
      userSessionsMap.set(session.userId, existing);
    });

    // Calculate progress for each user
    const progressList: UserProgress[] = [];
    for (const [userId, sessions] of userSessionsMap.entries()) {
      const completedSessions = sessions.filter((s) => s.completed);
      const completedModules = Array.from(
        new Set(completedSessions.map((s) => s.moduleId))
      );

      const totalTimeSpent = sessions.reduce(
        (sum, s) => sum + (s.duration || 0),
        0
      );

      const averageScore =
        completedSessions.length > 0
          ? Math.round(
              completedSessions.reduce((sum, s) => sum + (s.score || 0), 0) /
                completedSessions.length
            )
          : 0;

      const totalModules = 9;
      const completionPercentage = Math.round(
        (completedModules.length / totalModules) * 100
      );

      const lastSession = sessions.sort((a, b) => b.startTime - a.startTime)[0];

      progressList.push({
        userId,
        userName: userId.split('_')[0] || 'User',
        email: `${userId}@example.com`,
        currentModule: lastSession ? lastSession.moduleId : 1,
        completionPercentage,
        totalTimeSpent,
        lastActive: lastSession.startTime,
        completedModules,
        averageScore,
        sessionsCount: sessions.length,
        streak: 0,
      });
    }

    return progressList.sort((a, b) => b.lastActive - a.lastActive);
  }

  /**
   * Export user progress as CSV
   */
  exportProgressToCSV(progressList: UserProgress[]): string {
    const headers = [
      'User Name',
      'Email',
      'Current Module',
      'Completion %',
      'Time Spent (hours)',
      'Last Active',
      'Avg Score',
      'Sessions',
      'Streak',
    ].join(',');

    const rows = progressList.map((p) => {
      const timeInHours = (p.totalTimeSpent / 3600).toFixed(2);
      const lastActive = new Date(p.lastActive).toLocaleDateString();
      return [
        p.userName,
        p.email,
        p.currentModule,
        p.completionPercentage,
        timeInHours,
        lastActive,
        p.averageScore,
        p.sessionsCount,
        p.streak,
      ].join(',');
    });

    return [headers, ...rows].join('\n');
  }
}

// Export singleton instance
const trainingService = new TrainingService();
export default trainingService;
