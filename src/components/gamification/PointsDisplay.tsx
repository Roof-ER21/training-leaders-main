import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, Award, Flame } from 'lucide-react';
import { usePoints } from '../../contexts/PointsContext';
import ProgressRing from './ProgressRing';

interface PointsDisplayProps {
  variant?: 'compact' | 'full' | 'mini';
  showLevel?: boolean;
  showStreak?: boolean;
  onClick?: () => void;
}

const PointsDisplay: React.FC<PointsDisplayProps> = ({
  variant = 'compact',
  showLevel = true,
  showStreak = true,
  onClick,
}) => {
  const { points } = usePoints();
  const [recentPoints, setRecentPoints] = useState<number>(0);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Listen for points earned events
    const handlePointsEarned = (event: CustomEvent) => {
      const { amount } = event.detail;
      setRecentPoints(amount);
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 2000);
    };

    window.addEventListener('points-earned', handlePointsEarned as EventListener);
    return () => {
      window.removeEventListener('points-earned', handlePointsEarned as EventListener);
    };
  }, []);

  if (variant === 'mini') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg"
      >
        <Zap className="w-4 h-4" />
        <span className="font-bold">{points.totalPoints.toLocaleString()}</span>

        {/* Points Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -30 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-green-500 font-bold text-lg"
            >
              +{recentPoints}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className="relative bg-white rounded-xl shadow-lg p-4 cursor-pointer border-2 border-gray-100 hover:border-blue-300 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">
                {points.totalPoints.toLocaleString()}
              </p>
            </div>
          </div>

          {showLevel && (
            <div className="text-right">
              <p className="text-sm text-gray-600">Level</p>
              <p className="text-2xl font-bold text-blue-600">{points.level}</p>
            </div>
          )}
        </div>

        {showStreak && points.streak > 0 && (
          <div className="mt-3 flex items-center space-x-2 pt-3 border-t border-gray-200">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-semibold text-gray-700">
              {points.streak} day streak!
            </span>
          </div>
        )}

        {/* Points Animation */}
        <AnimatePresence>
          {showAnimation && (
            <motion.div
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -50, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500 font-bold text-3xl pointer-events-none"
            >
              +{recentPoints}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Full variant
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-6 text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-blue-200 text-sm mb-1">Your Progress</p>
          <h3 className="text-3xl font-bold">{points.totalPoints.toLocaleString()}</h3>
          <p className="text-blue-200 text-sm mt-1">Total Points</p>
        </div>

        <div className="relative">
          <ProgressRing
            progress={(points.totalPoints % 1000) / 10}
            size={80}
            strokeWidth={6}
            color="#FFFFFF"
            backgroundColor="rgba(255,255,255,0.2)"
            showPercentage={false}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{points.level}</span>
            <span className="text-xs text-blue-200">Level</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-200" />
            <p className="text-xs text-blue-200">Daily</p>
          </div>
          <p className="text-xl font-bold">{points.dailyPoints}</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Award className="w-4 h-4 text-blue-200" />
            <p className="text-xs text-blue-200">Weekly</p>
          </div>
          <p className="text-xl font-bold">{points.weeklyPoints}</p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-1">
            <Flame className="w-4 h-4 text-orange-400" />
            <p className="text-xs text-blue-200">Streak</p>
          </div>
          <p className="text-xl font-bold">{points.streak}</p>
        </div>
      </div>

      {/* Next Level Progress */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-blue-200">Next Level</span>
          <span className="font-semibold">{points.pointsToNextLevel} points to go</span>
        </div>
        <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((1000 - points.pointsToNextLevel) / 1000) * 100}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-white rounded-full"
          />
        </div>
      </div>

      {/* Points Animation */}
      <AnimatePresence>
        {showAnimation && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 0, y: -50, scale: 1.5 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300 font-bold text-4xl pointer-events-none"
          >
            +{recentPoints}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PointsDisplay;
