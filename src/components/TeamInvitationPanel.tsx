/**
 * Team Invitation Panel Component
 * Allows admins to invite team members and manage invitations
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  Copy,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  Link as LinkIcon,
} from 'lucide-react';
import teamService from '../services/teamService';
import { TeamInvitation } from '../types/user';

interface TeamInvitationPanelProps {
  teamId: string;
  teamName: string;
}

const TeamInvitationPanel: React.FC<TeamInvitationPanelProps> = ({
  teamId,
  teamName,
}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [invitations, setInvitations] = useState<TeamInvitation[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    loadInvitations();
  }, [teamId]);

  const loadInvitations = async () => {
    try {
      const invites = await teamService.getTeamInvitations(teamId);
      setInvitations(invites);
    } catch (error) {
      console.error('[TeamInvitationPanel] Error loading invitations:', error);
    }
  };

  const handleSendInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    try {
      const invitation = await teamService.createInvitation(teamId, email);
      await teamService.sendInvitationEmail(invitation);
      setEmail('');
      await loadInvitations();
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCopyLink = (code: string) => {
    const link = teamService.generateInvitationLink(code);
    navigator.clipboard.writeText(link);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-gray-700 bg-gray-100';
      case 'accepted':
        return 'text-roofRed bg-gray-100';
      case 'expired':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4" />;
      case 'expired':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Invitation Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-roofRed" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Invite Team Members
            </h3>
            <p className="text-sm text-gray-600">
              Send invitations to join {teamName}
            </p>
          </div>
        </div>

        <form onSubmit={handleSendInvitation} className="space-y-4">
          <div>
            <label
              htmlFor="invite-email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="invite-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Invitation</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Pending Invitations */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Users className="w-5 h-5 text-roofRed" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Invitations
            </h3>
            <p className="text-sm text-gray-600">
              {invitations.length} active invitation
              {invitations.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {invitations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Mail className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No pending invitations</p>
            <p className="text-sm mt-1">
              Send an invitation to get started
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {invitations.map((invite) => (
                <motion.div
                  key={invite.inviteId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {invite.invitedEmail}
                        </span>
                        <span
                          className={`flex items-center space-x-1 px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                            invite.status
                          )}`}
                        >
                          {getStatusIcon(invite.status)}
                          <span className="capitalize">{invite.status}</span>
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Invited by {invite.invitedByName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Expires on{' '}
                        {new Date(invite.expiresAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-100 px-3 py-2 rounded-lg font-mono text-sm text-gray-900">
                      {invite.inviteCode}
                    </div>
                    <button
                      onClick={() => handleCopyCode(invite.inviteCode)}
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                      title="Copy code"
                    >
                      {copiedCode === invite.inviteCode ? (
                        <CheckCircle className="w-4 h-4 text-roofRed" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopyLink(invite.inviteCode)}
                      className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-blue-200 text-gray-700 rounded-lg transition-colors"
                      title="Copy link"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamInvitationPanel;
