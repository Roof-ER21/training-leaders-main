/**
 * Team Service
 * Handles team creation, invitations, and member management
 */

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { Team, TeamInvitation } from '../types/user';
import authService from './authService';

class TeamService {
  /**
   * Create a new team
   */
  async createTeam(teamName: string, ownerId: string): Promise<Team> {
    const teamId = `team_${Date.now()}`;
    const user = authService.getCurrentUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const team: Team = {
      teamId,
      teamName,
      ownerId,
      ownerName: user.displayName,
      members: [ownerId],
      createdAt: Date.now(),
      settings: {
        allowInvites: true,
        notifyOnCompletion: true,
        notifyOnMilestone: true,
      },
    };

    if (isFirebaseConfigured && db) {
      await setDoc(doc(db, 'teams', teamId), team);
    } else {
      localStorage.setItem(`team_${teamId}`, JSON.stringify(team));
    }

    console.log('[TeamService] Team created:', teamId);
    return team;
  }

  /**
   * Generate invite code
   */
  private generateInviteCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Create team invitation
   */
  async createInvitation(
    teamId: string,
    invitedEmail: string
  ): Promise<TeamInvitation> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    // Get team details
    const team = await this.getTeam(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    const inviteId = `invite_${Date.now()}`;
    const inviteCode = this.generateInviteCode();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    const invitation: TeamInvitation = {
      inviteId,
      teamId,
      teamName: team.teamName,
      invitedEmail,
      invitedBy: user.uid,
      invitedByName: user.displayName,
      createdAt: Date.now(),
      expiresAt,
      status: 'pending',
      inviteCode,
    };

    if (isFirebaseConfigured && db) {
      await setDoc(doc(db, 'invitations', inviteId), invitation);
    } else {
      localStorage.setItem(`invite_${inviteId}`, JSON.stringify(invitation));
    }

    console.log('[TeamService] Invitation created:', inviteCode);
    return invitation;
  }

  /**
   * Get team by ID
   */
  async getTeam(teamId: string): Promise<Team | null> {
    if (isFirebaseConfigured && db) {
      const teamDoc = await getDoc(doc(db, 'teams', teamId));
      return teamDoc.exists() ? (teamDoc.data() as Team) : null;
    } else {
      const teamData = localStorage.getItem(`team_${teamId}`);
      return teamData ? JSON.parse(teamData) : null;
    }
  }

  /**
   * Get all teams (admin only)
   */
  async getAllTeams(): Promise<Team[]> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    if (isFirebaseConfigured && db) {
      const teamsSnapshot = await getDocs(collection(db, 'teams'));
      return teamsSnapshot.docs.map((doc) => doc.data() as Team);
    } else {
      const teams: Team[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('team_')) {
          const teamData = localStorage.getItem(key);
          if (teamData) {
            teams.push(JSON.parse(teamData));
          }
        }
      }
      return teams;
    }
  }

  /**
   * Get pending invitations for team
   */
  async getTeamInvitations(teamId: string): Promise<TeamInvitation[]> {
    const user = authService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    if (isFirebaseConfigured && db) {
      const q = query(
        collection(db, 'invitations'),
        where('teamId', '==', teamId),
        where('status', '==', 'pending')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data() as TeamInvitation);
    } else {
      const invitations: TeamInvitation[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('invite_')) {
          const inviteData = localStorage.getItem(key);
          if (inviteData) {
            const invite = JSON.parse(inviteData) as TeamInvitation;
            if (invite.teamId === teamId && invite.status === 'pending') {
              invitations.push(invite);
            }
          }
        }
      }
      return invitations;
    }
  }

  /**
   * Accept invitation by code
   */
  async acceptInvitation(inviteCode: string, userId: string): Promise<Team> {
    // Find invitation by code
    let invitation: TeamInvitation | null = null;

    if (isFirebaseConfigured && db) {
      const q = query(
        collection(db, 'invitations'),
        where('inviteCode', '==', inviteCode)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        invitation = querySnapshot.docs[0].data() as TeamInvitation;
      }
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('invite_')) {
          const inviteData = localStorage.getItem(key);
          if (inviteData) {
            const invite = JSON.parse(inviteData) as TeamInvitation;
            if (invite.inviteCode === inviteCode) {
              invitation = invite;
              break;
            }
          }
        }
      }
    }

    if (!invitation) {
      throw new Error('Invalid invitation code');
    }

    if (invitation.status !== 'pending') {
      throw new Error('Invitation already used or expired');
    }

    if (Date.now() > invitation.expiresAt) {
      throw new Error('Invitation has expired');
    }

    // Update invitation status
    invitation.status = 'accepted';
    if (isFirebaseConfigured && db) {
      await updateDoc(doc(db, 'invitations', invitation.inviteId), {
        status: 'accepted',
      });
    } else {
      localStorage.setItem(
        `invite_${invitation.inviteId}`,
        JSON.stringify(invitation)
      );
    }

    // Add user to team
    const team = await this.getTeam(invitation.teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    if (!team.members.includes(userId)) {
      team.members.push(userId);
      if (isFirebaseConfigured && db) {
        await updateDoc(doc(db, 'teams', team.teamId), {
          members: team.members,
        });
      } else {
        localStorage.setItem(`team_${team.teamId}`, JSON.stringify(team));
      }
    }

    console.log('[TeamService] Invitation accepted:', inviteCode);
    return team;
  }

  /**
   * Generate invitation link
   */
  generateInvitationLink(inviteCode: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/join/${inviteCode}`;
  }

  /**
   * Send invitation email (mock implementation)
   */
  async sendInvitationEmail(invitation: TeamInvitation): Promise<void> {
    const inviteLink = this.generateInvitationLink(invitation.inviteCode);

    // In production, this would call a backend API to send actual emails
    // For now, we'll just log the invitation details
    console.log('[TeamService] Invitation email (mock):', {
      to: invitation.invitedEmail,
      from: invitation.invitedByName,
      teamName: invitation.teamName,
      inviteCode: invitation.inviteCode,
      inviteLink,
      expiresAt: new Date(invitation.expiresAt).toLocaleDateString(),
    });

    // Store notification in localStorage for demo
    const notification = {
      type: 'invitation',
      email: invitation.invitedEmail,
      teamName: invitation.teamName,
      inviteCode: invitation.inviteCode,
      inviteLink,
      sentAt: Date.now(),
    };

    const notifications = JSON.parse(
      localStorage.getItem('email_notifications') || '[]'
    );
    notifications.push(notification);
    localStorage.setItem('email_notifications', JSON.stringify(notifications));

    alert(
      `Invitation sent to ${invitation.invitedEmail}\n\nInvite Code: ${invitation.inviteCode}\nInvite Link: ${inviteLink}\n\n(Email notifications are mocked in development)`
    );
  }

  /**
   * Get all email notifications (for demo/testing)
   */
  getEmailNotifications(): any[] {
    return JSON.parse(localStorage.getItem('email_notifications') || '[]');
  }

  /**
   * Send completion notification to team admins
   */
  async notifyTeamOnCompletion(
    userId: string,
    moduleName: string,
    score: number
  ): Promise<void> {
    const user = authService.getCurrentUser();
    if (!user || !user.teamId) return;

    const team = await this.getTeam(user.teamId);
    if (!team || !team.settings.notifyOnCompletion) return;

    // In production, send actual email to team owner
    const notification = {
      type: 'module_completion',
      userName: user.displayName,
      moduleName,
      score,
      teamName: team.teamName,
      sentAt: Date.now(),
    };

    const notifications = JSON.parse(
      localStorage.getItem('email_notifications') || '[]'
    );
    notifications.push(notification);
    localStorage.setItem('email_notifications', JSON.stringify(notifications));

    console.log('[TeamService] Completion notification sent:', notification);
  }
}

// Export singleton instance
const teamService = new TeamService();
export default teamService;
