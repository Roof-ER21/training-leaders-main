import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import analytics from '../utils/analytics';
import {
  Play,
  Award,
  Trophy,
  CheckCircle,
  Target,
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  Bot,
  Video,
  Gamepad2,
  Clock,
  X,
  Star,
  BookOpen,
  Lock,
  ArrowRight,
  ChevronRight,
  Zap,
  Brain,
  Shield,
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  type: 'video' | 'interactive' | 'practice' | 'assessment';
  skills: string[];
  videoUrl?: string;
  progress?: number;
  isLocked?: boolean;
  isCompleted?: boolean;
  rating?: number;
  studentsEnrolled?: number;
  instructor?: {
    name: string;
    title: string;
    avatar: string;
  };
}

interface EnhancedTrainingInterfaceProps {
  onNavigateHome: () => void;
}

const EnhancedTrainingInterface: React.FC<EnhancedTrainingInterfaceProps> = ({
  onNavigateHome,
}) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(
    new Set([1, 2])
  );
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAICoach, setShowAICoach] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizModule, setCurrentQuizModule] = useState<number | null>(
    null
  );
  const [quizResults, setQuizResults] = useState<Record<number, number>>({});
  const [showVRTraining, setShowVRTraining] = useState(false);
  const [vrSupported, setVrSupported] = useState(false);
  const [userProgress, setUserProgress] = useState({
    overall: 35,
    currentStreak: 7,
    totalHours: 24,
    certificatesEarned: 2,
  });

  // Persistence utility functions
  const saveUserProgress = (progress: any) => {
    try {
      localStorage.setItem('roofer_user_progress', JSON.stringify(progress));
      analytics.trackEvent('progress_saved', {
        overall: progress.overall,
        certificates: progress.certificatesEarned,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.warn('Failed to save user progress:', error);
    }
  };

  const loadUserProgress = () => {
    try {
      const saved = localStorage.getItem('roofer_user_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load user progress:', error);
    }
    return null;
  };

  const saveCompletedModules = (modules: Set<number>) => {
    try {
      localStorage.setItem(
        'roofer_completed_modules',
        JSON.stringify(Array.from(modules))
      );
    } catch (error) {
      console.warn('Failed to save completed modules:', error);
    }
  };

  const loadCompletedModules = (): Set<number> => {
    try {
      const saved = localStorage.getItem('roofer_completed_modules');
      if (saved) {
        const parsed = JSON.parse(saved) as number[];
        return new Set(parsed);
      }
    } catch (error) {
      console.warn('Failed to load completed modules:', error);
    }
    return new Set([1, 2]); // Default
  };

  // Initialize state from localStorage or defaults
  useEffect(() => {
    const savedProgress = loadUserProgress();
    if (savedProgress) {
      setUserProgress(savedProgress);
    }

    const savedModules = loadCompletedModules();
    setCompletedModules(savedModules);
  }, []);

  // Check VR support on component mount
  useEffect(() => {
    const checkVRSupport = async () => {
      if ((navigator as any).xr) {
        try {
          const isSupported = await (navigator as any).xr.isSessionSupported(
            'immersive-vr'
          );
          setVrSupported(isSupported);
        } catch (error) {
          console.warn('VR support check failed:', error);
          setVrSupported(false);
        }
      } else {
        setVrSupported(false);
      }
    };

    checkVRSupport();
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveUserProgress(userProgress);
  }, [userProgress]);

  // Save completed modules whenever they change
  useEffect(() => {
    saveCompletedModules(completedModules);
  }, [completedModules]);

  const modules: Module[] = [
    {
      id: 1,
      title: 'Foundation & Company Culture',
      description:
        'Learn the fundamentals of roofing safety, company values, and industry standards.',
      duration: '45 mins',
      difficulty: 'Beginner',
      type: 'video',
      skills: ['Safety Protocols', 'Company Values', 'Industry Standards'],
      progress: 100,
      isCompleted: true,
      rating: 4.8,
      studentsEnrolled: 1250,
      instructor: {
        name: 'Michael Chen',
        title: 'Senior Safety Instructor',
        avatar: '/api/placeholder/40/40',
      },
    },
    {
      id: 2,
      title: 'Advanced Roofing Techniques',
      description:
        'Master complex installation methods and material handling for various roof types.',
      duration: '1.5 hours',
      difficulty: 'Advanced',
      type: 'interactive',
      skills: ['Complex Installation', 'Material Handling', 'Quality Control'],
      progress: 100,
      isCompleted: true,
      rating: 4.9,
      studentsEnrolled: 980,
      instructor: {
        name: 'Sarah Rodriguez',
        title: 'Master Craftsman',
        avatar: '/api/placeholder/40/40',
      },
    },
    {
      id: 3,
      title: 'Sales & Customer Relations',
      description:
        'Develop professional sales skills and learn to build lasting customer relationships.',
      duration: '2 hours',
      difficulty: 'Intermediate',
      type: 'practice',
      skills: [
        'Sales Techniques',
        'Customer Communication',
        'Objection Handling',
      ],
      progress: 60,
      rating: 4.7,
      studentsEnrolled: 1150,
      instructor: {
        name: 'David Thompson',
        title: 'Sales Director',
        avatar: '/api/placeholder/40/40',
      },
    },
    {
      id: 4,
      title: 'Digital Documentation & Reporting',
      description:
        'Learn modern digital tools for project documentation and customer reporting.',
      duration: '1 hour',
      difficulty: 'Beginner',
      type: 'interactive',
      skills: ['Digital Tools', 'Report Writing', 'Documentation'],
      progress: 0,
      rating: 4.6,
      studentsEnrolled: 850,
      instructor: {
        name: 'Jennifer Kim',
        title: 'Technology Specialist',
        avatar: '/api/placeholder/40/40',
      },
    },
    {
      id: 5,
      title: 'Emergency Response & Problem Solving',
      description:
        'Handle emergency situations and develop critical problem-solving skills.',
      duration: '1.5 hours',
      difficulty: 'Advanced',
      type: 'assessment',
      skills: ['Emergency Response', 'Problem Solving', 'Critical Thinking'],
      progress: 0,
      isLocked: true,
      rating: 4.8,
      studentsEnrolled: 650,
      instructor: {
        name: 'Robert Johnson',
        title: 'Emergency Response Expert',
        avatar: '/api/placeholder/40/40',
      },
    },
    {
      id: 6,
      title: 'Business Management & Leadership',
      description:
        'Develop leadership skills and learn business management for roofing companies.',
      duration: '3 hours',
      difficulty: 'Expert',
      type: 'video',
      skills: ['Leadership', 'Business Management', 'Team Building'],
      progress: 0,
      isLocked: true,
      rating: 4.9,
      studentsEnrolled: 450,
      instructor: {
        name: 'Lisa Anderson',
        title: 'Business Consultant',
        avatar: '/api/placeholder/40/40',
      },
    },
  ];

  const categories = [
    { id: 'all', label: 'All Courses', count: modules.length },
    {
      id: 'beginner',
      label: 'Beginner',
      count: modules.filter(m => m.difficulty === 'Beginner').length,
    },
    {
      id: 'intermediate',
      label: 'Intermediate',
      count: modules.filter(m => m.difficulty === 'Intermediate').length,
    },
    {
      id: 'advanced',
      label: 'Advanced',
      count: modules.filter(m => m.difficulty === 'Advanced').length,
    },
    {
      id: 'expert',
      label: 'Expert',
      count: modules.filter(m => m.difficulty === 'Expert').length,
    },
  ];

  const filteredModules =
    selectedCategory === 'all'
      ? modules
      : modules.filter(m => m.difficulty.toLowerCase() === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Expert':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video;
      case 'interactive':
        return Gamepad2;
      case 'practice':
        return Target;
      case 'assessment':
        return FileText;
      default:
        return BookOpen;
    }
  };

  const ModuleCard = ({ module }: { module: Module }) => {
    const TypeIcon = getTypeIcon(module.type);
    const isLocked = module.isLocked || false;
    const isCompleted = completedModules.has(module.id);
    const inProgress =
      module.progress && module.progress > 0 && module.progress < 100;

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={!isLocked ? { y: -4, scale: 1.02 } : {}}
        className={`relative bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
          isLocked
            ? 'border-gray-200 opacity-60'
            : isCompleted
              ? 'border-green-200 shadow-lg hover:shadow-xl'
              : inProgress
                ? 'border-red-200 shadow-lg hover:shadow-xl'
                : 'border-gray-200 hover:border-red-200 shadow-md hover:shadow-xl'
        }`}
      >
        {/* Module Header */}
        <div className="relative p-6 pb-4">
          {isLocked && (
            <div className="absolute top-4 right-4">
              <Lock className="w-5 h-5 text-gray-400" />
            </div>
          )}

          {isCompleted && (
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-100'
                    : inProgress
                      ? 'bg-red-100'
                      : 'bg-gray-100'
                }`}
              >
                <TypeIcon
                  className={`w-6 h-6 ${
                    isCompleted
                      ? 'text-green-600'
                      : inProgress
                        ? 'text-red-600'
                        : 'text-gray-600'
                  }`}
                />
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(module.difficulty)}`}
                >
                  {module.difficulty}
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {module.title}
          </h3>

          <p className="text-gray-600 mb-4 leading-relaxed">
            {module.description}
          </p>

          {/* Module Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {module.duration}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {module.studentsEnrolled?.toLocaleString()} students
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
              {module.rating}
            </div>
          </div>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {module.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
              >
                {skill}
              </span>
            ))}
            {module.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                +{module.skills.length - 3} more
              </span>
            )}
          </div>

          {/* Instructor */}
          {module.instructor && (
            <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={module.instructor.avatar}
                alt={module.instructor.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {module.instructor.name}
                </div>
                <div className="text-xs text-gray-500">
                  {module.instructor.title}
                </div>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {module.progress !== undefined && module.progress > 0 && (
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {module.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-2 rounded-full ${
                    module.progress === 100 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            onClick={() => {
              if (!isLocked) {
                setActiveModule(module.id);
                // Auto-show Agnes AI coach for guidance when starting a new module
                if (!isCompleted && !inProgress) {
                  setTimeout(() => setShowAICoach(true), 1000);
                }
              }
            }}
            disabled={isLocked}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isLocked
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isCompleted
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : inProgress
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
            }`}
          >
            {isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Locked</span>
              </>
            ) : isCompleted ? (
              <>
                <Trophy className="w-4 h-4" />
                <span>Review & Agnes Coaching</span>
              </>
            ) : inProgress ? (
              <>
                <Play className="w-4 h-4" />
                <span>Continue with Agnes</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Start with Agnes AI</span>
              </>
            )}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  };

  const ProgressOverview = () => (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <TrendingUp className="w-8 h-8" />
          <span className="text-blue-100 text-sm">Overall</span>
        </div>
        <div className="text-3xl font-bold mb-1">{userProgress.overall}%</div>
        <div className="text-blue-100">Course Progress</div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <Zap className="w-8 h-8" />
          <span className="text-green-100 text-sm">Streak</span>
        </div>
        <div className="text-3xl font-bold mb-1">
          {userProgress.currentStreak}
        </div>
        <div className="text-green-100">Days in a row</div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <Clock className="w-8 h-8" />
          <span className="text-purple-100 text-sm">Time</span>
        </div>
        <div className="text-3xl font-bold mb-1">
          {userProgress.totalHours}h
        </div>
        <div className="text-purple-100">Total Learning</div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <Award className="w-8 h-8" />
          <span className="text-orange-100 text-sm">Earned</span>
        </div>
        <div className="text-3xl font-bold mb-1">
          {userProgress.certificatesEarned}
        </div>
        <div className="text-orange-100">Certificates</div>
      </div>
    </div>
  );

  const AICoachButton = () => (
    <motion.button
      onClick={() => setShowAICoach(true)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300"
    >
      <Bot className="w-8 h-8" />
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
    </motion.button>
  );

  // Enhanced Quiz System with Progress Tracking
  const QuizComponent = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [quizCompleted, setQuizCompleted] = useState(false);

    const quizQuestions = [
      {
        question:
          'What is the most important safety consideration when working on a roof?',
        options: [
          'Weather conditions',
          'Proper personal protective equipment (PPE)',
          'Time of day',
          'Roof material type',
        ],
        correctAnswer: 1,
      },
      {
        question: 'Which roofing material typically lasts the longest?',
        options: [
          'Asphalt shingles',
          'Metal roofing',
          'Clay tiles',
          'Wood shakes',
        ],
        correctAnswer: 1,
      },
      {
        question: 'What should be done before starting any roofing project?',
        options: [
          'Check the weather forecast',
          'Gather all tools and materials',
          'Conduct a thorough roof inspection',
          'All of the above',
        ],
        correctAnswer: 3,
      },
    ];

    const handleAnswerSelect = (answerIndex: number) => {
      setAnswers({ ...answers, [currentQuestion]: answerIndex });
    };

    const handleNextQuestion = () => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleCompleteQuiz();
      }
    };

    const handleCompleteQuiz = () => {
      const score = quizQuestions.reduce((total, question, index) => {
        return total + (answers[index] === question.correctAnswer ? 1 : 0);
      }, 0);

      const percentage = Math.round((score / quizQuestions.length) * 100);

      if (currentQuizModule) {
        setQuizResults({ ...quizResults, [currentQuizModule]: percentage });

        // Track quiz completion analytics
        analytics.trackEvent('quiz_completed', {
          module_id: currentQuizModule,
          score: percentage,
          passed: percentage >= 70,
          perfect_score: percentage === 100,
          timestamp: Date.now(),
        });

        // Update completion status and progress
        if (percentage >= 70) {
          setCompletedModules(
            new Set(Array.from(completedModules).concat([currentQuizModule]))
          );
          setUserProgress(prev => ({
            ...prev,
            overall: Math.min(100, prev.overall + 10),
            certificatesEarned:
              percentage >= 90
                ? prev.certificatesEarned + 1
                : prev.certificatesEarned,
          }));

          // Track module completion
          analytics.trackEvent('module_completed', {
            module_id: currentQuizModule,
            final_score: percentage,
            certificate_earned: percentage >= 90,
            new_progress: Math.min(100, userProgress.overall + 10),
            timestamp: Date.now(),
          });
        }
      }

      setQuizCompleted(true);
    };

    if (!showQuiz || !currentQuizModule) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowQuiz(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
          onClick={e => e.stopPropagation()}
        >
          {!quizCompleted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Module Assessment
                </h2>
                <div className="text-sm text-gray-500">
                  {currentQuestion + 1} of {quizQuestions.length}
                </div>
              </div>

              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                    }}
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                          answers[currentQuestion] === index
                            ? 'border-red-600 bg-red-50 text-red-700'
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setShowQuiz(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    answers[currentQuestion] !== undefined
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {currentQuestion < quizQuestions.length - 1
                    ? 'Next Question'
                    : 'Complete Quiz'}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Quiz Complete!
              </h2>
              <p className="text-gray-600 mb-4">
                You scored {quizResults[currentQuizModule]}% on this assessment.
              </p>
              {(quizResults[currentQuizModule] || 0) >= 70 ? (
                <div className="p-4 bg-green-50 rounded-lg mb-6">
                  <p className="text-green-700 font-semibold">
                    Congratulations! You passed this module.
                  </p>
                  {(quizResults[currentQuizModule] || 0) >= 90 && (
                    <p className="text-green-600 text-sm">
                      Excellence! You've earned a certificate.
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-yellow-50 rounded-lg mb-6">
                  <p className="text-yellow-700">
                    You need 70% to pass. Review the material and try again.
                  </p>
                </div>
              )}
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setQuizCompleted(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setCurrentQuizModule(null);
                }}
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Continue Learning
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    );
  };

  // VR Training Component
  const VRTrainingComponent = () => {
    if (!showVRTraining) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={() => setShowVRTraining(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              VR Safety Training
            </h2>
            <p className="text-gray-600 mb-6">
              Experience immersive roofing safety training in virtual reality.
              Practice dangerous scenarios safely.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Shield className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  Safety Scenarios
                </h3>
                <p className="text-sm text-gray-600">
                  Practice emergency responses in safe VR environment
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">
                  Skill Training
                </h3>
                <p className="text-sm text-gray-600">
                  Master techniques with haptic feedback
                </p>
              </div>
            </div>

            {vrSupported ? (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">
                  ✓ VR Headset Detected
                </p>
                <button
                  onClick={() => {
                    // In a real app, this would launch VR session
                    alert(
                      'VR Training session would start here. Connect your VR headset and follow the prompts.'
                    );
                    analytics.trackEvent('vr_session_launched', {
                      module_id: activeModule,
                      timestamp: Date.now(),
                    });
                  }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                >
                  Launch VR Training
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-orange-600 font-medium">
                  ! VR Headset Required
                </p>
                <p className="text-sm text-gray-600">
                  This feature requires a WebXR-compatible VR headset like Meta
                  Quest or HTC Vive.
                </p>
              </div>
            )}

            <button
              onClick={() => setShowVRTraining(false)}
              className="mt-4 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Training Academy
              </h1>
              <p className="text-gray-600">
                Master roofing with AI-powered learning
              </p>
            </div>
            <button
              onClick={onNavigateHome}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 rotate-180 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Overview */}
        <ProgressOverview />

        {/* Category Filter */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{category.label}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-red-700 text-red-100'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence>
            {filteredModules.map(module => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </AnimatePresence>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Your Learning Journey
            </h3>
            <span className="text-2xl font-bold text-red-600">
              {userProgress.overall}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${userProgress.overall}%` }}
              transition={{ duration: 2, delay: 0.5 }}
              className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {completedModules.size}
              </div>
              <div className="text-gray-600">Modules Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {modules.length - completedModules.size}
              </div>
              <div className="text-gray-600">Modules Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round((completedModules.size / modules.length) * 100)}%
              </div>
              <div className="text-gray-600">Overall Progress</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Coach Floating Button */}
      <AICoachButton />

      {/* AI Coach Modal */}
      <AnimatePresence>
        {showAICoach && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAICoach(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Agnes AI Coach
                    </h3>
                    <p className="text-sm text-gray-600">
                      Your personal roofing mentor
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAICoach(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <p className="text-gray-700 mb-3">
                    Hi! I'm Agnes, your AI learning coach. I can provide
                    personalized guidance, practice sessions, and real-time
                    feedback to accelerate your learning.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-purple-600">
                    <Bot className="w-4 h-4" />
                    <span>Powered by Advanced AI • Ready to help 24/7</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setCurrentQuizModule(activeModule || 3);
                      setShowQuiz(true);
                      setShowAICoach(false);
                    }}
                    className="p-3 bg-gray-50 hover:bg-red-50 rounded-lg text-left transition-colors duration-200 border border-transparent hover:border-red-200"
                  >
                    <Brain className="w-5 h-5 text-red-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">
                      Take Quiz
                    </div>
                  </button>

                  <button className="p-3 bg-gray-50 hover:bg-purple-50 rounded-lg text-left transition-colors duration-200 border border-transparent hover:border-purple-200">
                    <Target className="w-5 h-5 text-purple-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">
                      Skill Assessment
                    </div>
                  </button>

                  <button className="p-3 bg-gray-50 hover:bg-blue-50 rounded-lg text-left transition-colors duration-200 border border-transparent hover:border-blue-200">
                    <MessageSquare className="w-5 h-5 text-blue-600 mb-2" />
                    <div className="text-sm font-medium text-gray-900">
                      Ask Questions
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      if (vrSupported) {
                        setShowVRTraining(true);
                        setShowAICoach(false);
                        analytics.trackEvent('vr_training_started', {
                          module_id: activeModule,
                          timestamp: Date.now(),
                        });
                      } else {
                        alert('VR is not supported on this device or browser.');
                      }
                    }}
                    className={`p-3 rounded-lg text-left transition-colors duration-200 border border-transparent ${
                      vrSupported
                        ? 'bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 border-purple-200'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <Gamepad2
                      className={`w-5 h-5 mb-2 ${vrSupported ? 'text-purple-600' : 'text-gray-400'}`}
                    />
                    <div
                      className={`text-sm font-medium ${vrSupported ? 'text-gray-900' : 'text-gray-500'}`}
                    >
                      VR Training {!vrSupported && '(Not Available)'}
                    </div>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setShowAICoach(false)}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200"
              >
                Start AI Session
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz System */}
      <QuizComponent />

      {/* VR Training System */}
      <VRTrainingComponent />
    </div>
  );
};

export default EnhancedTrainingInterface;
