import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, Trophy, User, BarChart } from 'lucide-react';

export type NavItem = 'home' | 'learn' | 'leaderboard' | 'progress' | 'profile';

interface BottomNavBarProps {
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
  unreadNotifications?: number;
}

interface NavItemConfig {
  id: NavItem;
  icon: React.ReactNode;
  label: string;
  color: string;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
  unreadNotifications = 0,
}) => {
  const navItems: NavItemConfig[] = [
    {
      id: 'home',
      icon: <Home className="w-6 h-6" />,
      label: 'Home',
      color: 'text-blue-600',
    },
    {
      id: 'learn',
      icon: <BookOpen className="w-6 h-6" />,
      label: 'Learn',
      color: 'text-green-600',
    },
    {
      id: 'leaderboard',
      icon: <Trophy className="w-6 h-6" />,
      label: 'Rank',
      color: 'text-yellow-600',
    },
    {
      id: 'progress',
      icon: <BarChart className="w-6 h-6" />,
      label: 'Progress',
      color: 'text-purple-600',
    },
    {
      id: 'profile',
      icon: <User className="w-6 h-6" />,
      label: 'Profile',
      color: 'text-gray-600',
    },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative flex flex-col items-center justify-center flex-1 h-full focus:outline-none"
                style={{ minWidth: '44px', minHeight: '44px' }} // WCAG touch target
              >
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-0 top-0 h-1 bg-blue-600 rounded-b-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon Container */}
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="relative"
                >
                  <div className={`${isActive ? item.color : 'text-gray-400'} transition-colors`}>
                    {item.icon}
                  </div>

                  {/* Notification Badge */}
                  {item.id === 'profile' && unreadNotifications > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {unreadNotifications > 9 ? '9+' : unreadNotifications}
                    </motion.div>
                  )}
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{
                    opacity: isActive ? 1 : 0.7,
                    fontWeight: isActive ? 600 : 400,
                  }}
                  className={`text-xs mt-1 ${isActive ? item.color : 'text-gray-500'}`}
                >
                  {item.label}
                </motion.span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-20 bg-white border-r border-gray-200 z-40">
        <div className="flex flex-col items-center py-6 space-y-6">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative flex flex-col items-center justify-center w-16 h-16 rounded-xl focus:outline-none group"
              >
                {/* Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabDesktop"
                    className="absolute inset-0 bg-blue-50 rounded-xl"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Hover Background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                )}

                {/* Icon */}
                <div className={`relative z-10 ${isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'} transition-colors`}>
                  {item.icon}
                </div>

                {/* Notification Badge */}
                {item.id === 'profile' && unreadNotifications > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center z-20"
                  >
                    {unreadNotifications > 9 ? '9+' : unreadNotifications}
                  </motion.div>
                )}

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spacer for mobile */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default BottomNavBar;
