import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users, Calendar } from 'lucide-react';
import { usePoints } from '../../contexts/PointsContext';
import { useBadges } from '../../contexts/BadgeContext';

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  badges: number;
  level: number;
  avatar?: string;
  rank?: number;
  trend?: 'up' | 'down' | 'same';
}

interface LeaderboardProps {
  onClose?: () => void;
}

type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'allTime';

const Leaderboard: React.FC<LeaderboardProps> = ({ onClose }) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('weekly');
  const { points } = usePoints();
  const { unlockedBadges } = useBadges();

  // Mock data - In production, this would come from Firebase
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Generate mock leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        id: 'current-user',
        name: 'You',
        points: getPointsByTimeFrame(timeFrame),
        badges: unlockedBadges.length,
        level: points.level,
        trend: 'up',
      },
      {
        id: '1',
        name: 'Sarah Johnson',
        points: 3450,
        badges: 12,
        level: 8,
        trend: 'up',
      },
      {
        id: '2',
        name: 'Mike Rodriguez',
        points: 3200,
        badges: 10,
        level: 7,
        trend: 'same',
      },
      {
        id: '3',
        name: 'Emily Chen',
        points: 2980,
        badges: 11,
        level: 7,
        trend: 'up',
      },
      {
        id: '4',
        name: 'David Thompson',
        points: 2750,
        badges: 9,
        level: 6,
        trend: 'down',
      },
      {
        id: '5',
        name: 'Jessica Martinez',
        points: 2540,
        badges: 8,
        level: 6,
        trend: 'up',
      },
      {
        id: '6',
        name: 'Chris Anderson',
        points: 2320,
        badges: 7,
        level: 5,
        trend: 'same',
      },
      {
        id: '7',
        name: 'Amanda Wilson',
        points: 2100,
        badges: 8,
        level: 5,
        trend: 'up',
      },
      {
        id: '8',
        name: 'Ryan Taylor',
        points: 1890,
        badges: 6,
        level: 4,
        trend: 'down',
      },
      {
        id: '9',
        name: 'Lisa Brown',
        points: 1650,
        badges: 5,
        level: 4,
        trend: 'same',
      },
    ];

    // Sort by points and assign ranks
    const sorted = mockData.sort((a, b) => b.points - a.points);
    const withRanks = sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    setLeaderboardData(withRanks);
  }, [timeFrame, points, unlockedBadges]);

  const getPointsByTimeFrame = (frame: TimeFrame): number => {
    switch (frame) {
      case 'daily':
        return points.dailyPoints;
      case 'weekly':
        return points.weeklyPoints;
      case 'monthly':
        return points.monthlyPoints;
      case 'allTime':
      default:
        return points.totalPoints;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700';
      default:
        return 'bg-gray-100';
    }
  };

  const currentUser = leaderboardData.find(entry => entry.id === 'current-user');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25 }}
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-2xl"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Trophy className="w-8 h-8" />
                <h2 className="text-2xl font-bold">Leaderboard</h2>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  ×
                </button>
              )}
            </div>

            {/* Time Frame Selector */}
            <div className="flex space-x-2 bg-white bg-opacity-20 rounded-lg p-1">
              {(['daily', 'weekly', 'monthly', 'allTime'] as TimeFrame[]).map(frame => (
                <button
                  key={frame}
                  onClick={() => setTimeFrame(frame)}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    timeFrame === frame
                      ? 'bg-white text-blue-700'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {frame === 'allTime' ? 'All Time' : frame.charAt(0).toUpperCase() + frame.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Current User Stats */}
          {currentUser && (
            <div className="bg-blue-50 border-b-2 border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full ${getRankColor(currentUser.rank!)} flex items-center justify-center`}>
                    {currentUser.rank! <= 3 ? (
                      getRankIcon(currentUser.rank!)
                    ) : (
                      <span className="text-white font-bold">#{currentUser.rank}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Your Rank</p>
                    <p className="text-2xl font-bold text-blue-700">#{currentUser.rank}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Your Points</p>
                  <p className="text-2xl font-bold text-blue-700">{currentUser.points.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard List */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {leaderboardData.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`mb-3 rounded-lg overflow-hidden ${
                    entry.id === 'current-user'
                      ? 'bg-blue-50 border-2 border-blue-400'
                      : 'bg-white border border-gray-200'
                  } hover:shadow-md transition-shadow`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      {/* Rank & Name */}
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 flex items-center justify-center">
                          {getRankIcon(entry.rank!)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className={`font-semibold ${
                              entry.id === 'current-user' ? 'text-blue-700' : 'text-gray-900'
                            }`}>
                              {entry.name}
                            </p>
                            {entry.trend === 'up' && (
                              <TrendingUp className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-sm text-gray-600">
                              Level {entry.level}
                            </span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-600">
                              {entry.badges} badges
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <p className={`text-xl font-bold ${
                          entry.id === 'current-user' ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {entry.points.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  </div>

                  {/* Top 3 Highlight Bar */}
                  {entry.rank! <= 3 && (
                    <div className={`h-1 ${getRankColor(entry.rank!)}`} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer Info */}
          <div className="bg-gray-50 border-t border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{leaderboardData.length} learners competing</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Updates daily</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
