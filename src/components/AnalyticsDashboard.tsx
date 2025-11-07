import React, { useState, useMemo } from 'react';
import {
  X,
  TrendingUp,
  Award,
  Target,
  Calendar,
  Clock,
  CheckCircle,
  BarChart3,
  Activity,
  Zap,
  Star,
  Trophy,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsDashboardProps {
  analytics: any;
  userProgress: any;
  onClose: () => void;
}

interface ModuleProgress {
  moduleId: number;
  moduleName: string;
  completed: boolean;
  score: number;
  completedAt?: string;
}

interface ActivityMetrics {
  activityType: string;
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analytics,
  userProgress,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'activities' | 'streak'>(
    'overview'
  );

  // Parse user progress from localStorage
  const moduleProgress = useMemo<ModuleProgress[]>(() => {
    const progress: ModuleProgress[] = [];
    const modules = [
      'Welcome to RoofER Training',
      'The Agnes AI Advantage',
      'Code Identification Mastery',
      'Advanced Damage Assessment',
      'Ventilation Calculations',
      'Collateral Documentation',
      'Advanced Module 7',
      'Advanced Module 8',
      'Advanced Module 9',
    ];

    modules.forEach((name, index) => {
      const moduleId = index + 1;
      const completed = localStorage.getItem(`module_${moduleId}_completed`) === 'true';
      const score = parseInt(localStorage.getItem(`module_${moduleId}_score`) || '0', 10);
      const completedAt = localStorage.getItem(`module_${moduleId}_completed_at`) || undefined;

      progress.push({
        moduleId,
        moduleName: name,
        completed,
        score,
        completedAt,
      });
    });

    return progress;
  }, []);

  // Calculate activity metrics
  const activityMetrics = useMemo<ActivityMetrics[]>(() => {
    const metrics: Record<string, ActivityMetrics> = {};
    const activityTypes = [
      'drag-drop',
      'multiple-choice',
      'fill-blank',
      'scenario-tree',
      'calculation',
      'roleplay',
      'image-quiz',
      'branching-scenario',
      'timed-challenge',
      'calculator',
      'simulation',
    ];

    activityTypes.forEach((type) => {
      const attempts = parseInt(localStorage.getItem(`activity_${type}_attempts`) || '0', 10);
      const totalScore = parseInt(localStorage.getItem(`activity_${type}_total_score`) || '0', 10);
      const bestScore = parseInt(localStorage.getItem(`activity_${type}_best_score`) || '0', 10);

      metrics[type] = {
        activityType: type
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' '),
        totalAttempts: attempts,
        averageScore: attempts > 0 ? Math.round(totalScore / attempts) : 0,
        bestScore,
      };
    });

    return Object.values(metrics).filter((m) => m.totalAttempts > 0);
  }, []);

  // Calculate overall stats
  const overallStats = useMemo(() => {
    const totalModules = moduleProgress.length;
    const completedModules = moduleProgress.filter((m) => m.completed).length;
    const completionRate = Math.round((completedModules / totalModules) * 100);
    const averageScore = moduleProgress.length > 0
      ? Math.round(
          moduleProgress.reduce((sum, m) => sum + m.score, 0) / moduleProgress.length
        )
      : 0;
    const totalActivities = activityMetrics.reduce((sum, m) => sum + m.totalAttempts, 0);

    // Learning streak calculation
    const streak = parseInt(localStorage.getItem('learning_streak') || '0', 10);
    const lastActiveDate = localStorage.getItem('last_active_date');
    const today = new Date().toDateString();
    const isActiveToday = lastActiveDate === today;

    return {
      totalModules,
      completedModules,
      completionRate,
      averageScore,
      totalActivities,
      streak: isActiveToday ? streak : 0,
      lastActiveDate,
    };
  }, [moduleProgress, activityMetrics]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-black via-neutral-900 to-black px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">Your Learning Analytics</h2>
                  <p className="text-gray-300 mt-1">
                    Track your progress and celebrate your achievements
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-2 mt-6">
              {[
                { key: 'overview', label: 'Overview', icon: TrendingUp },
                { key: 'modules', label: 'Modules', icon: Target },
                { key: 'activities', label: 'Activities', icon: Activity },
                { key: 'streak', label: 'Streak', icon: Zap },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                      activeTab === tab.key
                        ? 'bg-white text-roofRed shadow-lg'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    icon={Target}
                    label="Completion Rate"
                    value={`${overallStats.completionRate}%`}
                    color="from-blue-500 to-blue-600"
                    subtext={`${overallStats.completedModules} of ${overallStats.totalModules} modules`}
                  />
                  <StatCard
                    icon={Award}
                    label="Average Score"
                    value={`${overallStats.averageScore}%`}
                    color="from-green-500 to-green-600"
                    subtext="Across all modules"
                  />
                  <StatCard
                    icon={Activity}
                    label="Activities Completed"
                    value={overallStats.totalActivities.toString()}
                    color="from-purple-500 to-purple-600"
                    subtext="Total attempts"
                  />
                  <StatCard
                    icon={Zap}
                    label="Learning Streak"
                    value={`${overallStats.streak} days`}
                    color="from-orange-500 to-orange-600"
                    subtext={overallStats.streak > 0 ? 'Keep it up!' : 'Start today!'}
                  />
                </div>

                {/* Recent Achievements */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-gray-700" />
                    <h3 className="text-xl font-bold text-gray-800">Recent Achievements</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moduleProgress
                      .filter((m) => m.completed)
                      .slice(-4)
                      .map((module) => (
                        <div
                          key={module.moduleId}
                          className="bg-white rounded-xl p-4 flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-800">{module.moduleName}</p>
                            <p className="text-sm text-gray-600">Score: {module.score}%</p>
                          </div>
                        </div>
                      ))}
                    {moduleProgress.filter((m) => m.completed).length === 0 && (
                      <p className="text-gray-600 col-span-2">
                        Complete your first module to see achievements here!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'modules' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Module Progress</h3>
                {moduleProgress.map((module) => (
                  <div
                    key={module.moduleId}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            module.completed
                              ? 'bg-gray-500 text-white'
                              : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {module.completed ? (
                            <CheckCircle className="w-6 h-6" />
                          ) : (
                            <span className="font-bold">{module.moduleId}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{module.moduleName}</h4>
                          <p className="text-sm text-gray-600">
                            {module.completed
                              ? `Completed with ${module.score}% score`
                              : 'Not yet started'}
                          </p>
                        </div>
                      </div>
                      {module.completed && module.score >= 80 && (
                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          module.completed
                            ? 'bg-gradient-to-r from-black to-neutral-900'
                            : 'bg-gradient-to-r from-black to-neutral-900'
                        }`}
                        style={{ width: `${module.completed ? 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Activity Performance</h3>
                {activityMetrics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activityMetrics.map((metric) => (
                      <div
                        key={metric.activityType}
                        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-gray-200"
                      >
                        <h4 className="font-bold text-gray-800 mb-3">{metric.activityType}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total Attempts:</span>
                            <span className="font-semibold text-gray-800">
                              {metric.totalAttempts}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Average Score:</span>
                            <span className="font-semibold text-gray-800">
                              {metric.averageScore}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Best Score:</span>
                            <span className="font-semibold text-roofRed">
                              {metric.bestScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-2xl">
                    <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">
                      No activities completed yet. Start learning to see your progress here!
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'streak' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-block bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-8 border-2 border-gray-300">
                    <Zap className="w-20 h-20 text-roofRed mx-auto mb-4" />
                    <h3 className="text-6xl font-bold text-gray-800 mb-2">
                      {overallStats.streak}
                    </h3>
                    <p className="text-xl text-gray-600">Day Streak</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-6 h-6 text-roofRed" />
                    <h3 className="text-xl font-bold text-gray-800">Keep Your Streak Alive!</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <p className="text-gray-700">
                        Last active:{' '}
                        {overallStats.lastActiveDate
                          ? new Date(overallStats.lastActiveDate).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </div>
                    <p className="text-gray-600">
                      {overallStats.streak === 0
                        ? 'Start your learning journey today to begin a new streak!'
                        : overallStats.streak < 7
                        ? 'Great start! Keep learning daily to build your streak.'
                        : overallStats.streak < 30
                        ? 'Amazing consistency! You\'re building a strong learning habit.'
                        : 'Incredible dedication! You\'re a true learning champion!'}
                    </p>
                  </div>
                </div>

                {/* Milestone rewards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { days: 7, label: '1 Week', unlocked: overallStats.streak >= 7 },
                    { days: 14, label: '2 Weeks', unlocked: overallStats.streak >= 14 },
                    { days: 30, label: '1 Month', unlocked: overallStats.streak >= 30 },
                    { days: 90, label: '3 Months', unlocked: overallStats.streak >= 90 },
                  ].map((milestone) => (
                    <div
                      key={milestone.days}
                      className={`text-center p-4 rounded-xl border-2 ${
                        milestone.unlocked
                          ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-yellow-400'
                          : 'bg-gray-100 border-gray-300'
                      }`}
                    >
                      <Trophy
                        className={`w-8 h-8 mx-auto mb-2 ${
                          milestone.unlocked ? 'text-gray-700' : 'text-gray-400'
                        }`}
                      />
                      <p className="font-bold text-gray-800">{milestone.label}</p>
                      <p className="text-sm text-gray-600">{milestone.days} days</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// StatCard Component
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color, subtext }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 shadow-sm hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium">{label}</p>
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{subtext}</p>
    </div>
  );
};

export default AnalyticsDashboard;
