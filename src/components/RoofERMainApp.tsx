import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Homepage from './Homepage';
import EnhancedTrainingInterface from './EnhancedTrainingInterface';
import AgnesIntegratedTraining from './AgnesIntegratedTraining';
import AnalyticsDashboard from './AnalyticsDashboard';
import DocsLibrary from './DocsLibrary';
import AdminDashboard from './AdminDashboard';
import ProtectedRoute from './ProtectedRoute';
import analytics from '../utils/analytics';
import authService from '../services/authService';
import trainingService from '../services/trainingService';
import 'aos/dist/aos.css';
import AOS from 'aos';

type ViewType =
  | 'homepage'
  | 'training'
  | 'agnes-training'
  | 'ai-coach'
  | 'resources'
  | 'community'
  | 'dashboard'
  | 'admin'
  | 'profile'
  | 'login'
  | 'signup'
  | 'foundation'
  | 'advanced'
  | 'sales'
  | 'certifications'
  | 'practice'
  | 'feedback'
  | 'assessment'
  | 'videos'
  | 'docs'
  | 'cases'
  | 'news'
  | 'forums'
  | 'qa'
  | 'stories'
  | 'events';

interface UserProgress {
  overall: number;
  currentStreak: number;
  totalHours: number;
  certificatesEarned: number;
  completedModules: number[];
}

const RoofERMainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('homepage');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProgress] = useState<UserProgress>({
    overall: 35,
    currentStreak: 7,
    totalHours: 24,
    certificatesEarned: 2,
    completedModules: [1, 2],
  });

  // Initialize services and AOS
  useEffect(() => {
    // Initialize auth service
    authService.initialize();

    // Initialize AOS for scroll animations
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });

    // Mock authentication (for demo)
    const timer = setTimeout(() => {
      setIsLoggedIn(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: string) => {
    // Track navigation analytics
    analytics.trackEvent('navigation', {
      from: currentView,
      to: view,
      timestamp: Date.now(),
    });

    setCurrentView(view as ViewType);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToTraining = () => {
    analytics.trackEvent('training_start', {
      from: currentView,
      user_progress: userProgress.overall,
      timestamp: Date.now(),
    });

    setCurrentView('agnes-training');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('homepage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'homepage':
        return (
          <motion.div
            key="homepage"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Homepage onNavigateToTraining={handleNavigateToTraining} />
          </motion.div>
        );

      case 'training':
        return (
          <motion.div
            key="training"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <EnhancedTrainingInterface onNavigateHome={handleNavigateHome} />
          </motion.div>
        );

      case 'agnes-training':
        return (
          <motion.div
            key="agnes-training"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AgnesIntegratedTraining onNavigateHome={handleNavigateHome} />
          </motion.div>
        );

      case 'ai-coach':
        return (
          <motion.div
            key="ai-coach"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  AI Coach Coming Soon
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Agnes AI is being enhanced with advanced features. Stay tuned!
                </p>
                <button
                  onClick={() => handleNavigate('training')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Go to Training
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'resources':
        return (
          <motion.div
            key="resources"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Resources Library
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Comprehensive resources and documentation coming soon.
                </p>
                <button
                  onClick={() => handleNavigate('training')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Start Learning
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'docs':
        return (
          <motion.div
            key="docs"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <DocsLibrary />
          </motion.div>
        );

      case 'community':
        return (
          <motion.div
            key="community"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Roofing Community
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Connect with fellow professionals and share experiences.
                </p>
                <button
                  onClick={() => handleNavigate('training')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Join Training
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'admin':
        return (
          <motion.div
            key="admin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ProtectedRoute
              requireAdmin={true}
              onUnauthorized={() => handleNavigate('dashboard')}
            >
              <AdminDashboard onNavigateHome={handleNavigateHome} />
            </ProtectedRoute>
          </motion.div>
        );

      case 'dashboard':
        return (
          <motion.div
            key="dashboard"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Learning Dashboard
                </h1>
                <p className="text-gray-600">
                  Track your progress and performance insights
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Learning Progress
                  </h3>
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {userProgress.overall}%
                  </div>
                  <p className="text-gray-600">Overall completion</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Current Streak
                  </h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {userProgress.currentStreak}
                  </div>
                  <p className="text-gray-600">Days in a row</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Total Hours
                  </h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {userProgress.totalHours}
                  </div>
                  <p className="text-gray-600">Learning time</p>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Certificates
                  </h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {userProgress.certificatesEarned}
                  </div>
                  <p className="text-gray-600">Earned so far</p>
                </div>
              </div>

              {/* Analytics Dashboard */}
              <AnalyticsDashboard
                analytics={analytics}
                userProgress={userProgress}
                onClose={() => {}}
              />

              <div className="text-center mt-8">
                <button
                  onClick={() => handleNavigate('training')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'profile':
        return (
          <motion.div
            key="profile"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-4xl mx-auto px-6 py-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Profile Settings
                </h1>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="profile-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="profile-name"
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profile-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="profile-email"
                      type="email"
                      defaultValue="john@roofingco.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="profile-company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="profile-company"
                      type="text"
                      defaultValue="Elite Roofing Solutions"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300">
                      Save Changes
                    </button>
                    <button
                      onClick={() => handleNavigate('dashboard')}
                      className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'login':
        return (
          <motion.div
            key="login"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center"
          >
            <div className="max-w-md w-full mx-auto px-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Welcome Back
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      handleNavigate('dashboard');
                    }}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                  >
                    Sign In
                  </button>
                </form>
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => handleNavigate('signup')}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'signup':
        return (
          <motion.div
            key="signup"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center"
          >
            <div className="max-w-md w-full mx-auto px-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Join RoofER Academy
                </h2>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="signup-name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-company"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Company
                    </label>
                    <input
                      id="signup-company"
                      type="text"
                      placeholder="Your company name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="signup-password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(true);
                      handleNavigate('training');
                    }}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                  >
                    Create Account
                  </button>
                </form>
                <div className="text-center mt-6">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      onClick={() => handleNavigate('login')}
                      className="text-red-600 hover:text-red-700 font-medium"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      // Training dropdown views
      case 'foundation':
      case 'advanced':
      case 'sales':
      case 'certifications':
        return (
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AgnesIntegratedTraining onNavigateHome={handleNavigateHome} />
          </motion.div>
        );

      // AI Coach dropdown views
      case 'practice':
      case 'feedback':
      case 'assessment':
        return (
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AgnesIntegratedTraining onNavigateHome={handleNavigateHome} />
          </motion.div>
        );

      // Resources dropdown views
      case 'videos':
      case 'docs':
      case 'cases':
      case 'news':
        return (
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Resources Library
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Comprehensive resources and documentation coming soon.
                </p>
                <button
                  onClick={() => handleNavigate('training')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Start Learning
                </button>
              </div>
            </div>
          </motion.div>
        );

      // Community dropdown views
      case 'forums':
      case 'qa':
      case 'stories':
      case 'events':
        return (
          <motion.div
            key={currentView}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="min-h-screen bg-gray-50 pt-24"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Roofing Community
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Connect with fellow professionals and share experiences.
                </p>
                <button
                  onClick={() => handleNavigate('training')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
                >
                  Join Training
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="homepage"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Homepage onNavigateToTraining={handleNavigateToTraining} />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navigation
        currentView={currentView}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        userProgress={userProgress}
      />

      {/* Main Content */}
      <main className="relative">
        <AnimatePresence mode="wait" key={currentView}>
          {renderCurrentView()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      {currentView === 'homepage' && (
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 via-gray-400 to-gray-300 rounded-full flex items-center justify-center border-2 border-red-600">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-red-400 text-xl font-bold">RoofER</div>
                    <div className="text-gray-400 text-sm">
                      Training Academy
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Professional roofing sales training and hail damage assessment
                  certification for emergency roof repair specialists.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Training</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button
                      onClick={() => handleNavigate('foundation')}
                      className="hover:text-white transition-colors"
                    >
                      Sales Fundamentals
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('advanced')}
                      className="hover:text-white transition-colors"
                    >
                      Hail Damage Assessment
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('sales')}
                      className="hover:text-white transition-colors"
                    >
                      Advanced Sales Mastery
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('certifications')}
                      className="hover:text-white transition-colors"
                    >
                      Certifications
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button
                      onClick={() => handleNavigate('resources')}
                      className="hover:text-white transition-colors"
                    >
                      Help Center
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('community')}
                      className="hover:text-white transition-colors"
                    >
                      Community
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('resources')}
                      className="hover:text-white transition-colors"
                    >
                      Documentation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('resources')}
                      className="hover:text-white transition-colors"
                    >
                      Contact Us
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <button
                      onClick={() => handleNavigate('homepage')}
                      className="hover:text-white transition-colors"
                    >
                      About Us
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('homepage')}
                      className="hover:text-white transition-colors"
                    >
                      Careers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('homepage')}
                      className="hover:text-white transition-colors"
                    >
                      Press
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNavigate('homepage')}
                      className="hover:text-white transition-colors"
                    >
                      Partners
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 RoofER Training Academy. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Security
                </button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default RoofERMainApp;
