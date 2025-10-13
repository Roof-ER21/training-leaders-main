import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Eye,
  User,
  LogOut,
  Settings,
  BookOpen,
  Trophy,
  BarChart3,
} from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isLoggedIn?: boolean;
  userProgress?: any;
}

const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  isLoggedIn = false,
  userProgress,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper functions for delayed dropdown closing
  const handleMouseEnter = (key: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 300); // 300ms delay before closing
    setCloseTimeout(timeout);
  };

  const navigationItems = [
    {
      label: 'Training',
      key: 'training',
      dropdown: [
        { label: 'Sales Fundamentals', key: 'foundation', icon: BookOpen },
        { label: 'Hail Damage Assessment', key: 'advanced', icon: Trophy },
        { label: 'Advanced Sales Mastery', key: 'sales', icon: BarChart3 },
        { label: 'Certifications', key: 'certifications', icon: Trophy },
      ],
    },
    {
      label: 'AI Coach',
      key: 'ai-coach',
      dropdown: [
        { label: 'Sales Roleplay', key: 'practice', icon: User },
        { label: 'Performance Feedback', key: 'feedback', icon: BarChart3 },
        { label: 'Skills Assessment', key: 'assessment', icon: Trophy },
      ],
    },
    {
      label: 'Resources',
      key: 'resources',
      dropdown: [
        { label: 'Training Videos', key: 'videos', icon: BookOpen },
        { label: 'Sales Resources', key: 'docs', icon: BookOpen },
        { label: 'Success Stories', key: 'cases', icon: BarChart3 },
        { label: 'Industry Insights', key: 'news', icon: BookOpen },
      ],
    },
    {
      label: 'Community',
      key: 'community',
      dropdown: [
        { label: 'Sales Forum', key: 'forums', icon: User },
        { label: 'Expert Advice', key: 'qa', icon: User },
        { label: 'Top Performers', key: 'stories', icon: Trophy },
        { label: 'Events & Webinars', key: 'events', icon: BookOpen },
      ],
    },
  ];

  const RoofErLogo = () => (
    <motion.div
      className="flex items-center space-x-3 cursor-pointer"
      onClick={() => onNavigate('homepage')}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Use provided brand logo from public if available */}
      <img
        src="/brand/roofer-logo.png"
        alt="Roof ER — The Roof Docs"
        className="h-10 w-auto"
        onError={(e) => {
          // fallback to simple wordmark colors if image missing
          const container = (e.currentTarget.parentElement as HTMLElement);
          if (container) {
            e.currentTarget.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'flex items-baseline gap-1';
            fallback.innerHTML = '<span class=\"text-gray-900 font-black text-xl\">ROOF</span><span class=\"text-roofRed font-black text-xl\">ER</span>';
            container.prepend(fallback);
          }
        }}
      />
      <div className="hidden sm:block text-xs font-semibold tracking-wide text-gray-600">
        THE ROOF DOCS
      </div>
    </motion.div>
  );

  const DropdownMenu = ({ item }: { item: any }) => (
    <AnimatePresence>
      {activeDropdown === item.key && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
          onMouseEnter={() => handleMouseEnter(item.key)}
          onMouseLeave={handleMouseLeave}
        >
          {item.dropdown.map((dropdownItem: any, index: number) => (
            <motion.button
              key={dropdownItem.key}
              onClick={() => {
                onNavigate(dropdownItem.key);
                setActiveDropdown(null);
                setIsOpen(false);
              }}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-gray-700 hover:text-red-600"
              whileHover={{ x: 4 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <dropdownItem.icon className="w-5 h-5 mr-3 text-gray-400" />
              <div>
                <div className="font-medium">{dropdownItem.label}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const UserDropdown = () => (
    <AnimatePresence>
      {activeDropdown === 'user' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
          onMouseEnter={() => handleMouseEnter('user')}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="font-medium text-gray-900">John Doe</div>
            <div className="text-sm text-gray-500">john@roofingco.com</div>
            {userProgress && (
              <div className="mt-2">
                <div className="text-xs text-gray-500 mb-1">
                  Overall Progress
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${userProgress.overall || 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              onNavigate('dashboard');
              setActiveDropdown(null);
            }}
            className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-gray-700"
          >
            <BarChart3 className="w-5 h-5 mr-3 text-gray-400" />
            Dashboard
          </button>

          <button
            onClick={() => {
              onNavigate('profile');
              setActiveDropdown(null);
            }}
            className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-gray-700"
          >
            <Settings className="w-5 h-5 mr-3 text-gray-400" />
            Settings
          </button>

          <div className="border-t border-gray-100 mt-2 pt-2">
            <button className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 text-red-600">
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <RoofErLogo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map(item => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.key)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentView === item.key
                      ? 'text-red-600 bg-red-50'
                      : 'text-gray-700 hover:text-red-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <DropdownMenu item={item} />
              </div>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('user')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                <UserDropdown />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-gray-700 font-medium hover:text-red-600 transition-colors duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="space-y-4">
                {navigationItems.map(item => (
                  <div key={item.key}>
                    <button
                      onClick={() => onNavigate(item.key)}
                      className="block w-full text-left px-3 py-2 text-gray-700 font-medium hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      {item.label}
                    </button>
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown.map(dropdownItem => (
                        <button
                          key={dropdownItem.key}
                          onClick={() => {
                            onNavigate(dropdownItem.key);
                            setIsOpen(false);
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        >
                          <dropdownItem.icon className="w-4 h-4 mr-2" />
                          {dropdownItem.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile User Actions */}
                <div className="pt-4 border-t border-gray-100">
                  {isLoggedIn ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onNavigate('dashboard');
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 font-medium hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 font-medium hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        Profile
                      </button>
                      <button className="block w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors duration-200">
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onNavigate('login');
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-gray-700 font-medium hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          onNavigate('signup');
                          setIsOpen(false);
                        }}
                        className="block w-full px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg text-center"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
