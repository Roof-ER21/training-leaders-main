import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AgnesChat from './AgnesChat';
import VRTraining from './VRTraining';
import CustomerRoleplaySystem from './CustomerRoleplaySystem';
import SalesTrainingModules from './SalesTrainingModules';
import InteractiveModuleSystem from './InteractiveModuleSystem';
import { IndustryDataAnalyzer } from '../data/industryData';
import { VRMetrics } from '../services/vrService';
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
  Star,
  BookOpen,
  Lock,
  ArrowRight,
  Zap,
  Brain,
  Glasses as VrHeadset,
  BarChart3,
  Menu,
  Home,
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  type: 'video' | 'interactive' | 'practice' | 'assessment';
  skills: string[];
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

interface AgnesIntegratedTrainingProps {
  onNavigateHome: () => void;
}

const AgnesIntegratedTraining: React.FC<AgnesIntegratedTrainingProps> = ({
  onNavigateHome,
}) => {
  // Core state
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<number>>(
    new Set([1, 2])
  );
  const [selectedCategory, setSelectedCategory] = useState('all');

  // UI state
  const [showAgnesChat, setShowAgnesChat] = useState(false);
  const [showVRTraining, setShowVRTraining] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState<
    'modules' | 'lesson' | 'assessment' | 'sales-training' | 'roleplay'
  >('modules');

  // New training components state
  const [showRoleplaySystem, setShowRoleplaySystem] = useState(false);
  const [showSalesModules, setShowSalesModules] = useState(false);
  const [showInteractiveModule, setShowInteractiveModule] = useState(false);
  const [selectedRoleplayScenario, setSelectedRoleplayScenario] = useState<string>('');
  const [selectedSalesModule] = useState<string>('');
  const [selectedInteractiveModule, setSelectedInteractiveModule] =
    useState<number>(0);

  // Training state
  const [userProgress, setUserProgress] = useState({
    overall: 35,
    currentStreak: 7,
    totalHours: 24,
    certificatesEarned: 2,
    agnesInteractions: 156,
    vrSessionsCompleted: 8,
  });

  const [agnesMetrics, setAgnesMetrics] = useState({
    questionsAsked: 45,
    topicsExplored: 12,
    averageConfidence: 0.87,
    preferredLearningStyle: 'mixed' as
      | 'visual'
      | 'auditory'
      | 'kinesthetic'
      | 'mixed',
    weakAreas: ['Customer Service', 'Sales Techniques'],
    strongAreas: ['Safety Protocols', 'Material Knowledge'],
  });

  // Load data on component mount
  useEffect(() => {
    loadUserData();
    initializeAnalytics();
  }, []);

  // Global event to open CustomerRoleplaySystem from module content
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as { id?: string } | undefined;
      if (!detail?.id) return;
      setShowRoleplaySystem(true);
      setSelectedRoleplayScenario(detail.id);
    };
    window.addEventListener('openRoleplayScenario', handler as EventListener);
    return () => window.removeEventListener('openRoleplayScenario', handler as EventListener);
  }, []);

  const loadUserData = () => {
    try {
      const savedProgress = localStorage.getItem('agnes_user_progress');
      if (savedProgress) {
        setUserProgress(JSON.parse(savedProgress));
      }

      const savedMetrics = localStorage.getItem('agnes_metrics');
      if (savedMetrics) {
        setAgnesMetrics(JSON.parse(savedMetrics));
      }

      const savedModules = localStorage.getItem('completed_modules');
      if (savedModules) {
        setCompletedModules(new Set(JSON.parse(savedModules)));
      }
    } catch (error) {
      console.warn('Failed to load user data:', error);
    }
  };

  const initializeAnalytics = () => {
    // Get industry benchmarks
    const benchmarks = IndustryDataAnalyzer.getIndustryBenchmarks();
    console.log('Industry benchmarks loaded:', benchmarks);

    // Get certifications for current level
    const certs =
      IndustryDataAnalyzer.getCertificationsByCareerStage('intermediate');
    console.log('Recommended certifications:', certs);

    // Get regional trends (example)
    const trends = IndustryDataAnalyzer.getTrendsByImpact('high');
    console.log('High-impact trends:', trends);
  };

  const modules: Module[] = [
    { id: 1, title: 'Welcome & Company Intro', description: 'Roof‑ER overview, mission, and values. Leadership profiles and org chart with quick quiz.', duration: '30 minutes', difficulty: 'Beginner', type: 'interactive', skills: ['Mission & Values','Company Structure','Leadership','Quiz'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 2, title: 'Your Commitment', description: 'Roof‑ER Promise and Rep Standards. Ethics, professionalism, and digital acknowledgment.', duration: '15 minutes', difficulty: 'Beginner', type: 'interactive', skills: ['Standards','Ethics','Professionalism','Acknowledgment'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 3, title: 'General Roofing Knowledge & Terminology', description: 'Core terms, components, systems. Identifying knockable doors and etiquette. Quick Quiz #2.', duration: '30–45 minutes', difficulty: 'Beginner', type: 'interactive', skills: ['Terminology','Parts of a Roof','Knockable Doors','Etiquette'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 4, title: 'Shingle Types & Materials', description: 'Compare old vs new shingles, discontinued intro, manufacturer ID tips.', duration: '30 minutes', difficulty: 'Beginner', type: 'interactive', skills: ['3‑tab vs Arch','Materials','Discontinued','Manufacturer ID'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 5, title: 'The Initial Pitch', description: 'Deliver the 5 Non‑Negotiables with professional tone and posture; ask for the inspection.', duration: '30 minutes', difficulty: 'Intermediate', type: 'interactive', skills: ['Pitch','Non‑verbal','Ask'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 6, title: 'Handling Initial Pitch Objections', description: 'Doorstep objections using Listen → Empathize → Reframe → Close.', duration: '30 minutes', difficulty: 'Intermediate', type: 'interactive', skills: ['Acknowledge','Empathy','Reframe','Close'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 7, title: 'The Inspection Process', description: '15–20 minute inspection walkthrough with safety and documentation sequence.', duration: '45–60 minutes', difficulty: 'Intermediate', type: 'interactive', skills: ['Documentation','Photo Order','Safety','Interaction'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 8, title: 'Post‑Inspection Pitch', description: 'Evidence‑based storytelling, damage education, and smooth transition to claim filing.', duration: '45 minutes', difficulty: 'Intermediate', type: 'interactive', skills: ['Presentation','Storytelling','Transition'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 9, title: 'Post‑Inspection Objections', description: 'Handle hesitations after showing photos. Create urgency and maintain momentum.', duration: '45 minutes', difficulty: 'Intermediate', type: 'interactive', skills: ['Acknowledge','Evidence','Urgency','Close'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 10, title: 'Damage Identification', description: 'Recognize hail, wind, and age damage with field photos and mini quizzes.', duration: '3 hours', difficulty: 'Intermediate', type: 'interactive', skills: ['Hail','Wind','Aging','Collateral'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 11, title: 'Filing the Claim & Closing', description: 'When and how to file, contingency & authorization, expectations for adjuster meetings.', duration: '60–75 minutes', difficulty: 'Advanced', type: 'interactive', skills: ['Carrier Scripts','Authorization','Expectations'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 12, title: 'Closing Objections', description: 'Tie‑in to filing/closing; address “think about it”, DIY insurance, and cost hesitations.', duration: '2 hours', difficulty: 'Advanced', type: 'interactive', skills: ['Close','Cost','DIY Insurance','Timeline'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 13, title: 'Discontinued Products & Special Scenarios', description: 'Handling discontinued shingles/materials; manufacturer resources and real claim examples.', duration: '2 hours', difficulty: 'Advanced', type: 'interactive', skills: ['Discontinued','Verification','Claims'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 14, title: 'The Sales Cycle & Job Flow', description: 'Full Roof‑ER job flow start→finish. Interactive game and seasonal scheduling examples.', duration: '3 hours', difficulty: 'Advanced', type: 'interactive', skills: ['Job Flow','Cycle','Scheduling','Game'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 15, title: 'AI Role‑Play', description: 'Agnes role‑play with personas, homeowner/rep roles, scenarios, hints, and scoring.', duration: '2 hours', difficulty: 'Advanced', type: 'practice', skills: ['Role‑Play','Personas','Scenarios','Coaching'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
    { id: 16, title: 'Final Exam / Certification Quiz', description: '50 questions: 35 MCQ, 10 fill‑blank, 5 short answer with rubric and retake.', duration: '2 hours', difficulty: 'Expert', type: 'assessment', skills: ['Assessment','Certification'], progress: 0, instructor: { name: 'Agnes', title: 'AI Coach', avatar: '/api/placeholder/40/40' } },
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

  const handleModuleStart = (module: Module) => {
    setActiveModule(module.id);

    // All modules (1-16) use the comprehensive InteractiveModuleSystem
    if (module.id >= 1 && module.id <= 16) {
      // Route to comprehensive interactive content
      setSelectedInteractiveModule(module.id);
      setShowInteractiveModule(true);
    } else {
      // Fallback for any other modules (shouldn't happen with our 10-module system)
      setCurrentView('lesson');
      setTimeout(() => setShowAgnesChat(true), 1000);
    }
  };

  const handleVRSessionComplete = (metrics: VRMetrics) => {
    setUserProgress(prev => ({
      ...prev,
      vrSessionsCompleted: prev.vrSessionsCompleted + 1,
      totalHours: prev.totalHours + metrics.sessionDuration / 3600000, // convert ms to hours
    }));

    // Save metrics
    localStorage.setItem('vr_session_metrics', JSON.stringify(metrics));
  };

  const handleModuleRecommendation = (moduleTitle: string) => {
    const recommendedModule = modules.find(m =>
      m.title.toLowerCase().includes(moduleTitle.toLowerCase())
    );
    if (recommendedModule) {
      setActiveModule(recommendedModule.id);
    }
  };

  const handleRoleplayComplete = (results: any) => {
    setUserProgress(prev => ({
      ...prev,
      totalHours: prev.totalHours + results.timeSpent / 3600,
      agnesInteractions: prev.agnesInteractions + 5,
    }));

    // Update module progress if high score
    if (results.score >= 80) {
      const moduleIndex = modules.findIndex(m => m.id === 15);
      if (moduleIndex !== -1) {
        modules[moduleIndex].progress = Math.max(
          modules[moduleIndex].progress || 0,
          results.score
        );
      }
    }
  };

  const handleSalesModuleComplete = (moduleId: string, score: number) => {
    setUserProgress(prev => ({
      ...prev,
      certificatesEarned:
        score >= 80 ? prev.certificatesEarned + 1 : prev.certificatesEarned,
      totalHours: prev.totalHours + 1,
    }));

    // Update module progress
    const moduleIndex = modules.findIndex(m => m.id === 14);
    if (moduleIndex !== -1) {
      modules[moduleIndex].progress = Math.max(
        modules[moduleIndex].progress || 0,
        score
      );
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
                ? 'border-roofRed/30 shadow-lg hover:shadow-xl'
                : 'border-gray-200 hover:border-roofRed/30 shadow-md hover:shadow-xl'
        }`}
      >
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
                      ? 'bg-purple-100'
                      : 'bg-gray-100'
                }`}
              >
                <TypeIcon
                  className={`w-6 h-6 ${
                    isCompleted
                      ? 'text-green-600'
                      : inProgress
                        ? 'text-roofRed'
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

          <div className="flex flex-wrap gap-2 mb-4">
            {module.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>

          {module.instructor && (
            <div className="flex items-center space-x-3 mb-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
              <div className="w-8 h-8 bg-roofRed rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {module.instructor.name}
                </div>
                <div className="text-xs text-roofRed">
                  AI-Powered Instructor
                </div>
              </div>
            </div>
          )}

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
                    module.progress === 100 ? 'bg-green-500' : 'bg-purple-500'
                  }`}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <button
              onClick={() => !isLocked && handleModuleStart(module)}
              disabled={isLocked}
              className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                isLocked
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isCompleted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : inProgress
                      ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800'
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
                  <span>Review with Agnes</span>
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

            {!isLocked && (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setShowVRTraining(true)}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center justify-center space-x-1"
                >
                  <VrHeadset className="w-3 h-3" />
                  <span>VR Practice</span>
                </button>
                <button
                  onClick={() => setShowAgnesChat(true)}
                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center justify-center space-x-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Ask Agnes</span>
                </button>
              </div>
            )}
          </div>
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
          <Bot className="w-8 h-8" />
          <span className="text-gray-300 text-sm">Agnes AI</span>
        </div>
        <div className="text-3xl font-bold mb-1">
          {userProgress.agnesInteractions}
        </div>
        <div className="text-gray-300">Interactions</div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  RoofER Sales Training Academy
                </h1>
                <p className="text-gray-600">
                  Master door-to-door sales with Agnes AI guidance
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </button>
              <button
                onClick={() => setShowAgnesChat(true)}
                className="flex items-center px-4 py-2 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors"
              >
                <Bot className="w-4 h-4 mr-2" />
                Chat with Agnes
              </button>
              <button
                onClick={onNavigateHome}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
            </div>
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
                  ? 'bg-roofRed text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{category.label}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-purple-700 text-gray-300'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Current View Content */}
        {currentView === 'modules' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence>
              {filteredModules.map(module => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {currentView === 'lesson' && activeModule && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setCurrentView('modules')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Modules
              </button>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowVRTraining(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <VrHeadset className="w-4 h-4" />
                  <span>VR Practice</span>
                </button>
                <button
                  onClick={() => setShowAgnesChat(true)}
                  className="px-4 py-2 bg-roofRed text-white rounded-lg hover:bg-roofRed-dark transition-colors flex items-center space-x-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask Agnes</span>
                </button>
              </div>
            </div>

            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {modules.find(m => m.id === activeModule)?.title}
              </h2>
              <p className="text-gray-600 mb-6">
                Interactive lesson content with Agnes AI guidance would be
                loaded here.
              </p>
              <div className="bg-purple-50 border border-roofRed/30 rounded-lg p-6 max-w-2xl mx-auto">
                <Bot className="w-12 h-12 text-roofRed mx-auto mb-4" />
                <p className="text-purple-800 font-medium mb-2">
                  Agnes AI is ready to guide you through this lesson!
                </p>
                <p className="text-roofRed text-sm">
                  Click "Chat with Agnes" above to get personalized instruction
                  and answers to your questions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Dashboard */}
        {showAnalytics && (
          <div className="bg-white rounded-2xl p-8 border border-gray-200 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Learning Analytics
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-roofRed text-sm font-medium">
                    Agnes Confidence
                  </span>
                  <Bot className="w-4 h-4 text-roofRed" />
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {Math.round(agnesMetrics.averageConfidence * 100)}%
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 text-sm font-medium">
                    VR Sessions
                  </span>
                  <VrHeadset className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {userProgress.vrSessionsCompleted}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-600 text-sm font-medium">
                    Questions Asked
                  </span>
                  <MessageSquare className="w-4 h-4 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {agnesMetrics.questionsAsked}
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-orange-600 text-sm font-medium">
                    Topics Explored
                  </span>
                  <Brain className="w-4 h-4 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-orange-900">
                  {agnesMetrics.topicsExplored}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Strong Areas
                </h4>
                <div className="space-y-2">
                  {agnesMetrics.strongAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  Areas for Improvement
                </h4>
                <div className="space-y-2">
                  {agnesMetrics.weakAreas.map((area, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      <span className="text-gray-700">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overall Progress Section */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Your Learning Journey
            </h3>
            <span className="text-2xl font-bold text-roofRed">
              {userProgress.overall}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${userProgress.overall}%` }}
              transition={{ duration: 2, delay: 0.5 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
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
                {userProgress.agnesInteractions}
              </div>
              <div className="text-gray-600">Agnes Interactions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {userProgress.vrSessionsCompleted}
              </div>
              <div className="text-gray-600">VR Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Agnes Chat Integration */}
      <AnimatePresence>
        {showAgnesChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAgnesChat(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl h-[80vh]"
              onClick={e => e.stopPropagation()}
            >
              <AgnesChat
                currentModule={
                  activeModule ? `module${activeModule}` : undefined
                }
                currentLesson={
                  currentView === 'lesson' ? 'current-lesson' : undefined
                }
                onModuleRecommendation={handleModuleRecommendation}
                onVRDemoRequest={() => setShowVRTraining(true)}
                className="h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VR Training Integration */}
      <VRTraining
        isOpen={showVRTraining}
        onClose={() => setShowVRTraining(false)}
        selectedModule={activeModule ? `module${activeModule}` : undefined}
        onScenarioComplete={handleVRSessionComplete}
      />

      {/* Customer Roleplay System Integration */}
      <CustomerRoleplaySystem
        isOpen={showRoleplaySystem}
        onClose={() => setShowRoleplaySystem(false)}
        selectedScenario={selectedRoleplayScenario}
        onComplete={handleRoleplayComplete}
      />

      {/* Sales Training Modules Integration */}
      <SalesTrainingModules
        isOpen={showSalesModules}
        onClose={() => setShowSalesModules(false)}
        selectedModule={selectedSalesModule}
        onModuleComplete={handleSalesModuleComplete}
      />

      {/* Interactive Module System Integration */}
      <AnimatePresence>
        {showInteractiveModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] overflow-auto"
          >
            <InteractiveModuleSystem
              moduleId={selectedInteractiveModule}
              onClose={() => {
                setShowInteractiveModule(false);
                setCurrentView('modules');
              }}
              onComplete={results => {
                console.log('Interactive module completed:', results);
                // Mark module as completed
                setCompletedModules(
                  prev =>
                    new Set(Array.from(prev).concat(selectedInteractiveModule))
                );
                // Update progress
                setUserProgress(prev => ({
                  ...prev,
                  overall: Math.min(prev.overall + 10, 100),
                }));
                // Close module
                setShowInteractiveModule(false);
                setCurrentView('modules');
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgnesIntegratedTraining;
