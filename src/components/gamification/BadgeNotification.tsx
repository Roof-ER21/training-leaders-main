import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Flame, Target, Star, Award, Zap, BookOpen, Medal, Crown, Rocket } from 'lucide-react';
import { useBadges, Badge } from '../../contexts/BadgeContext';

interface BadgeNotificationProps {
  badge?: Badge;
  onClose?: () => void;
}

const getBadgeIcon = (iconName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    Trophy: <Trophy className="w-full h-full" />,
    Flame: <Flame className="w-full h-full" />,
    Target: <Target className="w-full h-full" />,
    Star: <Star className="w-full h-full" />,
    Award: <Award className="w-full h-full" />,
    Zap: <Zap className="w-full h-full" />,
    BookOpen: <BookOpen className="w-full h-full" />,
    Medal: <Medal className="w-full h-full" />,
    Crown: <Crown className="w-full h-full" />,
    Rocket: <Rocket className="w-full h-full" />,
  };
  return icons[iconName] || <Award className="w-full h-full" />;
};

const getBadgeColor = (rarity: string) => {
  const colors = {
    common: 'from-gray-400 to-gray-600',
    rare: 'from-blue-400 to-blue-600',
    epic: 'from-purple-400 to-purple-600',
    legendary: 'from-yellow-400 to-yellow-600',
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

const BadgeNotificationToast: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  useEffect(() => {
    if (badge) {
      const timer = setTimeout(() => {
        onClose?.();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed top-4 right-4 z-50 max-w-sm"
    >
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-yellow-400">
        <div className={`h-2 bg-gradient-to-r ${getBadgeColor(badge.rarity)}`} />
        <div className="p-4">
          <div className="flex items-start space-x-4">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{ duration: 0.6, repeat: 2 }}
              className={`w-16 h-16 rounded-full bg-gradient-to-br ${getBadgeColor(badge.rarity)} flex items-center justify-center text-white flex-shrink-0`}
            >
              {getBadgeIcon(badge.icon)}
            </motion.div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Badge Unlocked!
                  </p>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">
                    {badge.name}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {badge.description}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-2 inline-block px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-600 capitalize">
                {badge.rarity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BadgeUnlockModal: React.FC<BadgeNotificationProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Confetti Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 400 - 200, opacity: 1 }}
              animate={{
                y: 600,
                x: Math.random() * 400 - 200,
                opacity: 0,
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 2, delay: Math.random() * 0.5 }}
              className="absolute top-0 left-1/2 w-3 h-3 rounded-full"
              style={{
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'][
                  i % 5
                ],
              }}
            />
          ))}
        </div>

        {/* Header */}
        <div className={`relative bg-gradient-to-br ${getBadgeColor(badge.rarity)} text-white p-8 text-center`}>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <div className={`w-28 h-28 bg-gradient-to-br ${getBadgeColor(badge.rarity)} rounded-full flex items-center justify-center text-white`}>
              {getBadgeIcon(badge.icon)}
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold mb-2"
          >
            {badge.name}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold capitalize"
          >
            {badge.rarity} Badge
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-700 text-lg mb-4"
          >
            {badge.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gray-50 rounded-lg p-4 mb-6"
          >
            <p className="text-sm text-gray-600 mb-1">Achievement Requirement</p>
            <p className="font-semibold text-gray-900">{badge.requirement}</p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className={`w-full bg-gradient-to-r ${getBadgeColor(badge.rarity)} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow`}
          >
            Awesome!
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

// Main component that shows both modal and toasts
const BadgeNotifications: React.FC = () => {
  const { newlyUnlockedBadges, markBadgeAsViewed } = useBadges();
  const [showModal, setShowModal] = React.useState<Badge | null>(null);

  useEffect(() => {
    if (newlyUnlockedBadges.length > 0 && !showModal) {
      setShowModal(newlyUnlockedBadges[0]);
    }
  }, [newlyUnlockedBadges, showModal]);

  const handleCloseModal = () => {
    if (showModal) {
      markBadgeAsViewed(showModal.id);
      setShowModal(null);
    }
  };

  return (
    <>
      {/* Modal for first badge */}
      <AnimatePresence>
        {showModal && (
          <BadgeUnlockModal badge={showModal} onClose={handleCloseModal} />
        )}
      </AnimatePresence>

      {/* Toast notifications for additional badges */}
      <div className="fixed top-4 right-4 z-40 space-y-2">
        <AnimatePresence>
          {newlyUnlockedBadges.slice(1).map((badge) => (
            <BadgeNotificationToast
              key={badge.id}
              badge={badge}
              onClose={() => markBadgeAsViewed(badge.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export { BadgeNotifications, BadgeUnlockModal, BadgeNotificationToast };
export default BadgeNotifications;
