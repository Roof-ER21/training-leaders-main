import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Star,
  Flame,
  Target,
  TrendingUp,
  Medal,
  Crown,
  Zap,
  CheckCircle,
  Download,
  FileText,
  Clipboard,
  ListChecks,
  BookOpen,
  Sparkles,
  Clock,
  Users,
  BarChart3,
} from 'lucide-react';

// ========================================
// GAMIFIED ACTIVITIES TYPES
// ========================================

export interface AchievementUnlockActivity {
  id: string;
  title: string;
  description: string;
  type: 'achievement-unlock';
  points: number;
  agnesTip?: string;
  data: {
    challenge: string;
    achievements: Array<{
      id: string;
      name: string;
      description: string;
      icon: string;
      rarity: 'common' | 'rare' | 'epic' | 'legendary';
      unlockCriteria: string;
      points: number;
    }>;
    tasks: Array<{
      id: string;
      task: string;
      completed?: boolean;
      achievementId?: string;
    }>;
  };
}

export interface LeaderboardChallengeActivity {
  id: string;
  title: string;
  description: string;
  type: 'leaderboard-challenge';
  points: number;
  agnesTip?: string;
  data: {
    challengeType: 'speed' | 'accuracy' | 'consistency' | 'mastery';
    timeLimit?: number;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
      options?: string[];
      difficulty: 'easy' | 'medium' | 'hard';
    }>;
    leaderboard: Array<{
      rank: number;
      name: string;
      score: number;
      time?: number;
      badge?: string;
    }>;
  };
}

export interface StreakTrackerActivity {
  id: string;
  title: string;
  description: string;
  type: 'streak-tracker';
  points: number;
  agnesTip?: string;
  data: {
    dailyChallenge: string;
    streakGoal: number;
    currentStreak: number;
    challenges: Array<{
      day: number;
      challenge: string;
      completed: boolean;
      reward?: string;
    }>;
  };
}

export interface BadgeCollectionActivity {
  id: string;
  title: string;
  description: string;
  type: 'badge-collection';
  points: number;
  agnesTip?: string;
  data: {
    categories: Array<{
      category: string;
      badges: Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        earned: boolean;
        criteria: string;
        level?: number;
      }>;
    }>;
    earnNewBadge: {
      challenge: string;
      criteria: Array<{
        requirement: string;
        completed: boolean;
      }>;
      rewardBadgeId: string;
    };
  };
}

// ========================================
// PRACTICAL ACTIVITIES TYPES
// ========================================

export interface WorksheetActivity {
  id: string;
  title: string;
  description: string;
  type: 'worksheet';
  points: number;
  agnesTip?: string;
  data: {
    instructions: string;
    sections: Array<{
      sectionTitle: string;
      questions: Array<{
        id: string;
        question: string;
        type: 'short-answer' | 'multiple-choice' | 'calculation' | 'essay';
        options?: string[];
        correctAnswer?: string;
        rubric?: string;
      }>;
    }>;
    downloadable?: boolean;
  };
}

export interface ChecklistExerciseActivity {
  id: string;
  title: string;
  description: string;
  type: 'checklist-exercise';
  points: number;
  agnesTip?: string;
  data: {
    scenario: string;
    checklist: Array<{
      id: string;
      item: string;
      category?: string;
      critical?: boolean;
      tips?: string;
    }>;
    minimumRequired?: number;
  };
}

export interface ResourceDownloadActivity {
  id: string;
  title: string;
  description: string;
  type: 'resource-download';
  points: number;
  agnesTip?: string;
  data: {
    resources: Array<{
      id: string;
      name: string;
      type: 'pdf' | 'template' | 'checklist' | 'guide';
      description: string;
      size?: string;
      pages?: number;
      downloadUrl: string;
      preview?: string;
    }>;
    completionCriteria: string;
  };
}

export type GamifiedOrPracticalActivity =
  | AchievementUnlockActivity
  | LeaderboardChallengeActivity
  | StreakTrackerActivity
  | BadgeCollectionActivity
  | WorksheetActivity
  | ChecklistExerciseActivity
  | ResourceDownloadActivity;

interface AgnesGamifiedAndPracticalProps {
  activity: GamifiedOrPracticalActivity;
  onComplete: (score: number, totalPoints: number) => void;
  onRetry?: () => void;
}

// ========================================
// MAIN COMPONENT
// ========================================

const AgnesGamifiedAndPractical: React.FC<AgnesGamifiedAndPracticalProps> = ({
  activity,
  onComplete,
  onRetry,
}) => {
  const isGamified = [
    'achievement-unlock',
    'leaderboard-challenge',
    'streak-tracker',
    'badge-collection',
  ].includes(activity.type);

  const renderActivity = () => {
    switch (activity.type) {
      case 'achievement-unlock':
        return (
          <AchievementUnlockComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'leaderboard-challenge':
        return (
          <LeaderboardChallengeComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'streak-tracker':
        return (
          <StreakTrackerComponent activity={activity} onComplete={onComplete} />
        );
      case 'badge-collection':
        return (
          <BadgeCollectionComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'worksheet':
        return (
          <WorksheetComponent activity={activity} onComplete={onComplete} />
        );
      case 'checklist-exercise':
        return (
          <ChecklistExerciseComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      case 'resource-download':
        return (
          <ResourceDownloadComponent
            activity={activity}
            onComplete={onComplete}
          />
        );
      default:
        return <div>Unknown activity type</div>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div
        className={`${
          isGamified
            ? 'bg-gradient-to-r from-amber-500 to-orange-500'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600'
        } p-6 text-white`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{activity.title}</h3>
            <p
              className={isGamified ? 'text-amber-100' : 'text-blue-100'}
            >
              {activity.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            {isGamified ? (
              <Trophy className="w-5 h-5" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
            <span className="font-semibold">{activity.points} pts</span>
          </div>
        </div>

        {/* Agnes Tip */}
        {activity.agnesTip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 bg-yellow-400 text-gray-900 rounded-lg p-4 flex items-start space-x-3"
          >
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm">Agnes says:</p>
              <p className="text-sm">{activity.agnesTip}</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Activity Content */}
      <div className="p-6">{renderActivity()}</div>
    </div>
  );
};

// ========================================
// ACHIEVEMENT UNLOCK COMPONENT
// ========================================

const AchievementUnlockComponent: React.FC<{
  activity: AchievementUnlockActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(
    new Set()
  );
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<string | null>(
    null
  );

  const handleTaskComplete = (taskId: string, achievementId?: string) => {
    setCompletedTasks(prev => new Set(prev).add(taskId));

    if (achievementId && !unlockedAchievements.has(achievementId)) {
      setUnlockedAchievements(prev => new Set(prev).add(achievementId));
      setShowUnlockAnimation(achievementId);
      setTimeout(() => setShowUnlockAnimation(null), 3000);
    }
  };

  const handleComplete = () => {
    const score = unlockedAchievements.size * (activity.points / activity.data.achievements.length);
    onComplete(Math.round(score), activity.points);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-400 to-orange-500';
      case 'epic':
        return 'from-purple-400 to-pink-500';
      case 'rare':
        return 'from-blue-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Challenge Description */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
        <h4 className="font-semibold text-amber-900 mb-2 flex items-center">
          <Target className="w-5 h-5 mr-2" />
          Challenge
        </h4>
        <p className="text-gray-800">{activity.data.challenge}</p>
      </div>

      {/* Tasks */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3">Complete Tasks</h4>
        <div className="space-y-3">
          {activity.data.tasks.map(task => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                completedTasks.has(task.id)
                  ? 'bg-green-50 border-green-400'
                  : 'bg-white border-gray-200'
              }`}
            >
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={completedTasks.has(task.id)}
                  onChange={() => handleTaskComplete(task.id, task.achievementId)}
                  className="w-5 h-5 text-green-600"
                />
                <span className="flex-1 font-medium text-gray-900">{task.task}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements Display */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Award className="w-5 h-5 mr-2" />
          Achievements ({unlockedAchievements.size} / {activity.data.achievements.length})
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activity.data.achievements.map(achievement => {
            const unlocked = unlockedAchievements.has(achievement.id);
            return (
              <motion.div
                key={achievement.id}
                className={`relative rounded-xl p-5 border-2 transition-all ${
                  unlocked
                    ? 'bg-gradient-to-br ' + getRarityColor(achievement.rarity)
                    : 'bg-gray-100 border-gray-300 grayscale opacity-60'
                }`}
                whileHover={unlocked ? { scale: 1.05 } : {}}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h5 className={`font-bold mb-1 ${unlocked ? 'text-white' : 'text-gray-600'}`}>
                      {achievement.name}
                    </h5>
                    <p className={`text-sm mb-2 ${unlocked ? 'text-white text-opacity-90' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        unlocked ? 'bg-white bg-opacity-30 text-white' : 'bg-gray-300 text-gray-600'
                      }`}>
                        {achievement.rarity.toUpperCase()}
                      </span>
                      <span className={`text-xs font-semibold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                        +{achievement.points} pts
                      </span>
                    </div>
                  </div>
                </div>

                {!unlocked && (
                  <div className="mt-3 text-xs text-gray-600 italic">
                    🔒 {achievement.unlockCriteria}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Unlock Animation */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[110]"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl"
            >
              <Trophy className="w-20 h-20 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Achievement Unlocked!</h2>
              <p className="text-white text-lg">
                {activity.data.achievements.find(a => a.id === showUnlockAnimation)?.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={unlockedAchievements.size === 0}
        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 rounded-xl transition-all"
      >
        Complete Challenge
      </button>
    </div>
  );
};

// ========================================
// LEADERBOARD CHALLENGE COMPONENT
// ========================================

const LeaderboardChallengeComponent: React.FC<{
  activity: LeaderboardChallengeActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [startTime] = useState(Date.now());
  const [timeLeft, setTimeLeft] = useState(activity.data.timeLimit || 300);
  const [finished, setFinished] = useState(false);
  const [userRank, setUserRank] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishChallenge();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const finishChallenge = () => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    let correct = 0;

    activity.data.questions.forEach(q => {
      if (answers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
        correct++;
      }
    });

    const accuracy = (correct / activity.data.questions.length) * 100;
    const score = Math.round((accuracy / 100) * activity.points);

    // Calculate rank based on score
    const userScore = score;
    const leaderboardScores = activity.data.leaderboard.map(l => l.score);
    const rank = leaderboardScores.filter(s => s > userScore).length + 1;

    setUserRank(rank);
    setFinished(true);
    onComplete(score, activity.points);
  };

  const currentQuestion = activity.data.questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {!finished ? (
        <>
          {/* Timer and Progress */}
          <div className="flex items-center justify-between bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-lg p-4">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQuestionIndex + 1} / {activity.data.questions.length}
            </span>
            <div className="flex items-center space-x-2 text-red-600 font-bold">
              <Clock className="w-5 h-5" />
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              currentQuestion.difficulty === 'hard'
                ? 'bg-red-100 text-red-700'
                : currentQuestion.difficulty === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
            }`}>
              {currentQuestion.difficulty.toUpperCase()}
            </div>
            <p className="text-xl font-semibold text-gray-900 mb-4">{currentQuestion.question}</p>

            {currentQuestion.options ? (
              <div className="space-y-3">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAnswers({ ...answers, [currentQuestion.id]: option });
                      if (currentQuestionIndex < activity.data.questions.length - 1) {
                        setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
                      } else {
                        setTimeout(() => finishChallenge(), 300);
                      }
                    }}
                    className="w-full text-left p-4 border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50 rounded-lg transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                placeholder="Type your answer..."
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    setAnswers({ ...answers, [currentQuestion.id]: (e.target as HTMLInputElement).value });
                    if (currentQuestionIndex < activity.data.questions.length - 1) {
                      setCurrentQuestionIndex(prev => prev + 1);
                    } else {
                      finishChallenge();
                    }
                  }
                }}
                className="w-full p-4 border-2 border-gray-200 focus:border-amber-400 rounded-lg"
              />
            )}
          </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* User Result */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-8 text-center">
            <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Challenge Complete!</h3>
            <p className="text-xl text-gray-700 mb-4">
              You ranked <span className="font-bold text-amber-600">#{userRank}</span> on the leaderboard!
            </p>
          </div>

          {/* Leaderboard */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Leaderboard
            </h4>
            <div className="space-y-3">
              {activity.data.leaderboard.slice(0, 10).map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    idx < 3
                      ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`font-bold text-lg ${idx < 3 ? 'text-amber-600' : 'text-gray-600'}`}>
                      #{entry.rank}
                    </span>
                    {idx === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                    {idx === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                    {idx === 2 && <Medal className="w-5 h-5 text-orange-600" />}
                    <span className="font-semibold text-gray-900">{entry.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-amber-600">{entry.score} pts</span>
                    {entry.time && (
                      <span className="text-sm text-gray-600">{entry.time}s</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ========================================
// STREAK TRACKER COMPONENT
// ========================================

const StreakTrackerComponent: React.FC<{
  activity: StreakTrackerActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [completedDays, setCompletedDays] = useState<Set<number>>(
    new Set(activity.data.challenges.filter(c => c.completed).map(c => c.day))
  );

  const handleDayComplete = (day: number) => {
    setCompletedDays(prev => new Set(prev).add(day));
  };

  const currentStreak = calculateStreak(completedDays);

  function calculateStreak(days: Set<number>): number {
    const sorted = Array.from(days).sort((a, b) => a - b);
    let streak = 0;
    for (let i = sorted.length - 1; i >= 0; i--) {
      if (i === sorted.length - 1 || sorted[i] === sorted[i + 1] - 1) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  return (
    <div className="space-y-6">
      {/* Streak Display */}
      <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl p-8 text-center">
        <Flame className="w-20 h-20 mx-auto mb-4" />
        <h3 className="text-5xl font-bold mb-2">{currentStreak}</h3>
        <p className="text-xl text-red-100">Day Streak!</p>
        <p className="text-sm text-red-100 mt-4">
          Goal: {activity.data.streakGoal} days
        </p>
        <div className="w-full bg-red-400 bg-opacity-30 rounded-full h-3 mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentStreak / activity.data.streakGoal) * 100}%` }}
            className="bg-white h-3 rounded-full"
          />
        </div>
      </div>

      {/* Challenge Calendar */}
      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Daily Challenges</h4>
        <div className="grid grid-cols-7 gap-3">
          {activity.data.challenges.map(challenge => {
            const completed = completedDays.has(challenge.day);
            return (
              <motion.div
                key={challenge.day}
                whileHover={{ scale: 1.05 }}
                className={`aspect-square rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition-all ${
                  completed
                    ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                onClick={() => !completed && handleDayComplete(challenge.day)}
              >
                <span className="text-2xl font-bold">{challenge.day}</span>
                {completed && <CheckCircle className="w-5 h-5 mt-1" />}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Complete Button */}
      {currentStreak >= activity.data.streakGoal && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onComplete(activity.points, activity.points)}
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 rounded-xl"
        >
          Claim Streak Reward!
        </motion.button>
      )}
    </div>
  );
};

// ========================================
// BADGE COLLECTION COMPONENT
// ========================================

const BadgeCollectionComponent: React.FC<{
  activity: BadgeCollectionActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [completedCriteria, setCompletedCriteria] = useState<Set<number>>(new Set());

  const allCriteriaMet = completedCriteria.size === activity.data.earnNewBadge.criteria.length;

  return (
    <div className="space-y-6">
      {/* Badge Collection */}
      {activity.data.categories.map(category => (
        <div key={category.category}>
          <h4 className="font-semibold text-gray-900 mb-3">{category.category}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.badges.map(badge => (
              <div
                key={badge.id}
                className={`rounded-xl p-4 text-center transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-300'
                    : 'bg-gray-100 border-2 border-gray-300 grayscale opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h5 className="font-bold text-sm text-gray-900 mb-1">{badge.name}</h5>
                {badge.level && (
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    Level {badge.level}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Earn New Badge Challenge */}
      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-6">
        <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
          <Star className="w-5 h-5 mr-2" />
          Earn New Badge: {activity.data.earnNewBadge.challenge}
        </h4>
        <div className="space-y-3">
          {activity.data.earnNewBadge.criteria.map((criterion, idx) => (
            <label
              key={idx}
              className="flex items-center space-x-3 p-3 bg-white rounded-lg cursor-pointer"
            >
              <input
                type="checkbox"
                checked={completedCriteria.has(idx)}
                onChange={() => {
                  const newSet = new Set(completedCriteria);
                  if (newSet.has(idx)) {
                    newSet.delete(idx);
                  } else {
                    newSet.add(idx);
                  }
                  setCompletedCriteria(newSet);
                }}
                className="w-5 h-5"
              />
              <span className="flex-1 text-gray-900">{criterion.requirement}</span>
            </label>
          ))}
        </div>

        {allCriteriaMet && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => onComplete(activity.points, activity.points)}
            className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold py-3 rounded-lg"
          >
            Claim Badge!
          </motion.button>
        )}
      </div>
    </div>
  );
};

// ========================================
// WORKSHEET COMPONENT
// ========================================

const WorksheetComponent: React.FC<{
  activity: WorksheetActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;

    activity.data.sections.forEach(section => {
      section.questions.forEach(q => {
        total++;
        if (q.correctAnswer && answers[q.id]?.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim()) {
          correct++;
        }
      });
    });

    const score = total > 0 ? Math.round((correct / total) * activity.points) : activity.points;
    setSubmitted(true);
    onComplete(score, activity.points);
  };

  return (
    <div className="space-y-6">
      {/* Instructions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-900">{activity.data.instructions}</p>
      </div>

      {/* Sections */}
      {activity.data.sections.map((section, sIdx) => (
        <div key={sIdx} className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h4 className="font-bold text-gray-900 mb-4">{section.sectionTitle}</h4>
          <div className="space-y-4">
            {section.questions.map((question, qIdx) => (
              <div key={question.id}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {qIdx + 1}. {question.question}
                </label>

                {question.type === 'multiple-choice' && question.options ? (
                  <div className="space-y-2">
                    {question.options.map((option, oIdx) => (
                      <label key={oIdx} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name={question.id}
                          value={option}
                          checked={answers[question.id] === option}
                          onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })}
                          className="w-4 h-4"
                        />
                        <span className="text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                ) : question.type === 'essay' ? (
                  <textarea
                    value={answers[question.id] || ''}
                    onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })}
                    rows={4}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400"
                    placeholder="Write your answer here..."
                  />
                ) : (
                  <input
                    type="text"
                    value={answers[question.id] || ''}
                    onChange={e => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-400"
                    placeholder="Your answer..."
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Download Option */}
      {activity.data.downloadable && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-4">
          <span className="text-sm text-gray-700">Download worksheet as PDF</span>
          <button className="flex items-center space-x-2 bg-roofRed text-white px-4 py-2 rounded-lg hover:bg-roofRed-dark">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      )}

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="w-full bg-roofRed hover:bg-roofRed-dark text-white font-semibold py-4 rounded-xl"
        >
          Submit Worksheet
        </button>
      )}
    </div>
  );
};

// ========================================
// CHECKLIST EXERCISE COMPONENT
// ========================================

const ChecklistExerciseComponent: React.FC<{
  activity: ChecklistExerciseActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleToggle = (itemId: string) => {
    const newSet = new Set(checkedItems);
    if (newSet.has(itemId)) {
      newSet.delete(itemId);
    } else {
      newSet.add(itemId);
    }
    setCheckedItems(newSet);
  };

  const handleComplete = () => {
    const score = Math.round((checkedItems.size / activity.data.checklist.length) * activity.points);
    onComplete(score, activity.points);
  };

  const progress = (checkedItems.size / activity.data.checklist.length) * 100;
  const canComplete = !activity.data.minimumRequired || checkedItems.size >= activity.data.minimumRequired;

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-xl p-6">
        <h4 className="font-semibold text-cyan-900 mb-2">Scenario</h4>
        <p className="text-gray-800">{activity.data.scenario}</p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            {checkedItems.size} / {activity.data.checklist.length} items completed
          </span>
          <span className="text-sm font-semibold text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-3">
        {activity.data.checklist.map(item => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              checkedItems.has(item.id)
                ? 'bg-green-50 border-green-400'
                : item.critical
                  ? 'bg-red-50 border-red-300'
                  : 'bg-white border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handleToggle(item.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 mb-1">
                  {item.item}
                  {item.critical && (
                    <span className="ml-2 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                      CRITICAL
                    </span>
                  )}
                </p>
                {item.tips && (
                  <p className="text-sm text-gray-600 italic">{item.tips}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Complete Button */}
      <button
        onClick={handleComplete}
        disabled={!canComplete}
        className="w-full bg-roofRed hover:bg-roofRed-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors"
      >
        Complete Checklist
      </button>
    </div>
  );
};

// ========================================
// RESOURCE DOWNLOAD COMPONENT
// ========================================

const ResourceDownloadComponent: React.FC<{
  activity: ResourceDownloadActivity;
  onComplete: (score: number, total: number) => void;
}> = ({ activity, onComplete }) => {
  const [downloaded, setDownloaded] = useState<Set<string>>(new Set());

  const handleDownload = (resourceId: string) => {
    setDownloaded(prev => new Set(prev).add(resourceId));
  };

  const allDownloaded = downloaded.size === activity.data.resources.length;

  return (
    <div className="space-y-6">
      {/* Completion Criteria */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">Completion:</span> {activity.data.completionCriteria}
        </p>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activity.data.resources.map(resource => {
          const isDownloaded = downloaded.has(resource.id);
          return (
            <div
              key={resource.id}
              className={`rounded-xl p-5 border-2 transition-all ${
                isDownloaded
                  ? 'bg-green-50 border-green-400'
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="flex-shrink-0">
                  {resource.type === 'pdf' && <FileText className="w-8 h-8 text-red-500" />}
                  {resource.type === 'template' && <Clipboard className="w-8 h-8 text-blue-500" />}
                  {resource.type === 'checklist' && <ListChecks className="w-8 h-8 text-green-500" />}
                  {resource.type === 'guide' && <BookOpen className="w-8 h-8 text-roofRed" />}
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 mb-1">{resource.name}</h5>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    {resource.pages && <span>{resource.pages} pages</span>}
                    {resource.size && <span>• {resource.size}</span>}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(resource.id)}
                disabled={isDownloaded}
                className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 ${
                  isDownloaded
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-roofRed hover:bg-roofRed-dark text-white'
                }`}
              >
                {isDownloaded ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Downloaded</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Complete Button */}
      {allDownloaded && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onComplete(activity.points, activity.points)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl"
        >
          Complete Activity
        </motion.button>
      )}
    </div>
  );
};

export default AgnesGamifiedAndPractical;
