/**
 * Admin Dashboard Component
 * Displays all users, their training progress, and admin controls
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  Download,
  RefreshCw,
  Search,
  UserPlus,
  Shield,
  Activity,
  AlertCircle,
} from 'lucide-react';
import authService from '../services/authService';
import trainingService from '../services/trainingService';
import { UserProgress, User } from '../types/user';

interface AdminDashboardProps {
  onNavigateHome: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateHome }) => {
  const [loading, setLoading] = useState(true);
  const [usersProgress, setUsersProgress] = useState<UserProgress[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadDashboardData();

    // Auto-refresh every 30 seconds if enabled
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        loadDashboardData();
      }, 30000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [progress, users] = await Promise.all([
        trainingService.getAllUsersProgress(),
        authService.getAllUsers(),
      ]);

      setUsersProgress(progress);
      setAllUsers(users);
    } catch (error) {
      console.error('[AdminDashboard] Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const csv = trainingService.exportProgressToCSV(filteredUsers);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `training-progress-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleMakeAdmin = async (userId: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to make this user an admin?')) {
      try {
        await authService.updateUserRole(userId, 'admin');
        await loadDashboardData();
        alert('User role updated successfully');
      } catch (error: any) {
        alert(`Error: ${error.message}`);
      }
    }
  };

  const filteredUsers = usersProgress.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.userName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  // Calculate summary stats
  const totalUsers = usersProgress.length;
  const averageCompletion =
    totalUsers > 0
      ? Math.round(
          usersProgress.reduce((sum, u) => sum + u.completionPercentage, 0) /
            totalUsers
        )
      : 0;
  const totalHours = Math.round(
    usersProgress.reduce((sum, u) => sum + u.totalTimeSpent, 0) / 3600
  );
  const activeToday = usersProgress.filter((u) => {
    const today = new Date().setHours(0, 0, 0, 0);
    return u.lastActive >= today;
  }).length;

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor team training progress and performance
              </p>
            </div>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </button>
          </div>

          {/* Admin Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Administrator Access</span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <span className="text-sm text-gray-500">Total Users</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalUsers}
            </div>
            <p className="text-sm text-gray-600">{activeToday} active today</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <span className="text-sm text-gray-500">Avg Completion</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {averageCompletion}%
            </div>
            <p className="text-sm text-gray-600">Across all modules</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-purple-600" />
              <span className="text-sm text-gray-500">Total Hours</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {totalHours}h
            </div>
            <p className="text-sm text-gray-600">Training time logged</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
              <span className="text-sm text-gray-500">Avg Score</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {Math.round(
                usersProgress.reduce((sum, u) => sum + u.averageScore, 0) /
                  (totalUsers || 1)
              )}
              %
            </div>
            <p className="text-sm text-gray-600">Performance metric</p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  autoRefresh
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}</span>
              </button>

              <button
                onClick={loadDashboardData}
                className="flex items-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Refresh</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="flex items-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Current Module
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Completion
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Time Spent
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Avg Score
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Last Active
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">No users found</p>
                      <p className="text-sm text-gray-500">
                        Try adjusting your search query
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const userAccount = allUsers.find((u) => u.uid === user.userId);
                    const isAdmin = userAccount?.role === 'admin';

                    return (
                      <motion.tr
                        key={user.userId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                              {user.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 flex items-center space-x-2">
                                <span>{user.userName}</span>
                                {isAdmin && (
                                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">
                                    Admin
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900 font-medium">
                            Module {user.currentModule}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                              <div
                                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${user.completionPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {user.completionPercentage}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-900">
                            {formatTime(user.totalTimeSpent)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`font-medium ${
                              user.averageScore >= 80
                                ? 'text-green-600'
                                : user.averageScore >= 60
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}
                          >
                            {user.averageScore}%
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600">
                            {formatDate(user.lastActive)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {!isAdmin && (
                            <button
                              onClick={() => handleMakeAdmin(user.userId)}
                              className="flex items-center space-x-1 px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                            >
                              <Shield className="w-4 h-4" />
                              <span>Make Admin</span>
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Showing {filteredUsers.length} of {totalUsers} users
          {searchQuery && ` matching "${searchQuery}"`}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
