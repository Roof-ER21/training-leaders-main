import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { X, MessageCircle, Lightbulb, ArrowRight } from 'lucide-react';

interface AgnesAvatarProps {
  isVisible: boolean;
  message?: string;
  tip?: string;
  suggestedAction?: string;
  onClose?: () => void;
  onChatClick?: () => void;
  onActionClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  variant?: 'full' | 'compact' | 'mini';
}

const AgnesAvatar: React.FC<AgnesAvatarProps> = ({
  isVisible,
  message = "Hi there! I'm Agnes, your roofing instructor. Need help with this section?",
  tip,
  suggestedAction,
  onClose,
  onChatClick,
  onActionClick,
  position = 'bottom-right',
  variant = 'full',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Auto-expand after a short delay
      const timer = setTimeout(() => setIsExpanded(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsExpanded(false);
    }
  }, [isVisible]);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
      x: position.includes('right') ? 100 : -100,
      y: position.includes('bottom') ? 100 : -100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: 12,
      transition: {
        delay: 0.3,
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed ${positionClasses[position]} z-50 pointer-events-auto`}
        >
          <div className="relative">
            {/* Main Avatar Container */}
            <motion.div
              className={`relative ${
                variant === 'mini'
                  ? 'w-16 h-16'
                  : variant === 'compact'
                    ? 'w-20 h-20'
                    : 'w-24 h-24'
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() =>
                variant === 'mini' && onChatClick ? onChatClick() : null
              }
            >
              {/* Avatar Circle with Agnes Character */}
              <div
                className={`w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-purple-700 border-4 border-white shadow-2xl cursor-pointer overflow-hidden ${
                  variant === 'mini' ? 'hover:shadow-purple-200' : ''
                }`}
                onClick={() =>
                  variant !== 'mini' ? setIsExpanded(!isExpanded) : null
                }
              >
                {/* Agnes SVG Character */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background */}
                  <circle cx="50" cy="50" r="50" fill="#7C3AED" />

                  {/* Face */}
                  <circle cx="50" cy="45" r="28" fill="#FED7AA" />

                  {/* Hair */}
                  <path
                    d="M 22 35 Q 20 20 30 18 Q 40 15 50 15 Q 60 15 70 18 Q 80 20 78 35 L 75 38 Q 73 25 65 22 Q 60 20 50 20 Q 40 20 35 22 Q 27 25 25 38 Z"
                    fill="#92400E"
                  />

                  {/* Eyes */}
                  <ellipse cx="40" cy="42" rx="3" ry="4" fill="#374151" />
                  <ellipse cx="60" cy="42" rx="3" ry="4" fill="#374151" />
                  <circle cx="41" cy="41" r="1" fill="#FFFFFF" />
                  <circle cx="61" cy="41" r="1" fill="#FFFFFF" />

                  {/* Smile */}
                  <path
                    d="M 38 52 Q 50 58 62 52"
                    stroke="#DC2626"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />

                  {/* Polo Shirt */}
                  <rect
                    x="25"
                    y="70"
                    width="50"
                    height="30"
                    fill="#1F2937"
                    rx="2"
                  />

                  {/* Collar */}
                  <path
                    d="M 40 70 L 35 75 L 40 75 Z M 60 70 L 65 75 L 60 75 Z"
                    fill="#374151"
                  />

                  {/* Roof ER Logo Circle (simplified) */}
                  <circle cx="50" cy="82" r="6" fill="#FFFFFF" opacity="0.9" />
                  <text
                    x="50"
                    y="85"
                    fontSize="6"
                    fill="#1F2937"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    ER
                  </text>
                </svg>
              </div>

              {/* Notification Pulse */}
              {variant === 'mini' && (
                <motion.div
                  className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}

              {/* Status Indicator */}
              {variant !== 'mini' && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
              )}
            </motion.div>

            {/* Message Card */}
            {variant !== 'mini' && isExpanded && (
              <motion.div
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`${
                  position.includes('right') ? 'right-0' : 'left-0'
                } bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden ${
                  variant === 'compact' ? 'w-64' : 'w-80'
                }`}
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-semibold">Agnes AI Coach</span>
                  </div>
                  {onClose && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onClose();
                      }}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Main Message */}
                  <p className="text-gray-800 text-sm mb-3 leading-relaxed">
                    {message}
                  </p>

                  {/* Tip Section */}
                  {tip && (
                    <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <p className="text-yellow-800 text-xs leading-relaxed">
                          {tip}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {onChatClick && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onChatClick();
                        }}
                        className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat with Agnes</span>
                      </button>
                    )}

                    {suggestedAction && onActionClick && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onActionClick();
                        }}
                        className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 text-sm"
                      >
                        <ArrowRight className="w-4 h-4" />
                        <span>{suggestedAction}</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AgnesAvatar;
