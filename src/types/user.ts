/**
 * User and Training Session Types
 */

export type UserRole = 'admin' | 'user';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  company?: string;
  teamId?: string;
  createdAt: number;
  lastActive: number;
}

export interface TrainingSession {
  sessionId: string;
  userId: string;
  moduleId: number;
  moduleName: string;
  startTime: number;
  endTime?: number;
  duration?: number; // in seconds
  completed: boolean;
  score?: number;
  activities: ActivitySession[];
}

export interface ActivitySession {
  activityId: string;
  activityType: string;
  startTime: number;
  endTime?: number;
  duration?: number; // in seconds
  score?: number;
  totalPoints?: number;
  attempts: number;
}

export interface UserProgress {
  userId: string;
  userName: string;
  email: string;
  currentModule: number;
  completionPercentage: number;
  totalTimeSpent: number; // in seconds
  lastActive: number;
  completedModules: number[];
  averageScore: number;
  sessionsCount: number;
  streak: number;
}

export interface TeamInvitation {
  inviteId: string;
  teamId: string;
  teamName: string;
  invitedEmail: string;
  invitedBy: string;
  invitedByName: string;
  createdAt: number;
  expiresAt: number;
  status: 'pending' | 'accepted' | 'expired';
  inviteCode: string;
}

export interface Team {
  teamId: string;
  teamName: string;
  ownerId: string;
  ownerName: string;
  members: string[]; // user IDs
  createdAt: number;
  settings: {
    allowInvites: boolean;
    notifyOnCompletion: boolean;
    notifyOnMilestone: boolean;
  };
}
