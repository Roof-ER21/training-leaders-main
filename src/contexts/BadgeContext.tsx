import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Trophy, Flame, Target, Star, Award, Zap, BookOpen, Medal, Crown, Rocket } from 'lucide-react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'streak' | 'mastery' | 'special';
  requirement: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface BadgeContextType {
  badges: Badge[];
  unlockedBadges: Badge[];
  checkBadgeUnlock: (criteria: BadgeCriteria) => Badge | null;
  markBadgeAsViewed: (badgeId: string) => void;
  newlyUnlockedBadges: Badge[];
}

export interface BadgeCriteria {
  totalPoints?: number;
  streak?: number;
  modulesCompleted?: number;
  perfectScores?: number;
  dailyLogins?: number;
  activitiesCompleted?: number;
  level?: number;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

const BADGES_STORAGE_KEY = 'roofER_badges_data';

const initialBadges: Badge[] = [
  {
    id: 'first-module',
    name: 'First Steps',
    description: 'Complete your first training module',
    icon: 'BookOpen',
    category: 'achievement',
    requirement: 'Complete 1 module',
    earned: false,
    rarity: 'common',
  },
  {
    id: 'five-modules',
    name: 'Learning Journey',
    description: 'Complete 5 training modules',
    icon: 'Target',
    category: 'achievement',
    requirement: 'Complete 5 modules',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'all-modules',
    name: 'Master Roofer',
    description: 'Complete all training modules',
    icon: 'Crown',
    category: 'mastery',
    requirement: 'Complete 9 modules',
    earned: false,
    rarity: 'legendary',
  },
  {
    id: 'three-day-streak',
    name: 'Consistent Learner',
    description: 'Maintain a 3-day learning streak',
    icon: 'Flame',
    category: 'streak',
    requirement: '3-day streak',
    earned: false,
    rarity: 'common',
  },
  {
    id: 'week-streak',
    name: 'Dedicated Pro',
    description: 'Maintain a 7-day learning streak',
    icon: 'Flame',
    category: 'streak',
    requirement: '7-day streak',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'month-streak',
    name: 'Unstoppable',
    description: 'Maintain a 30-day learning streak',
    icon: 'Flame',
    category: 'streak',
    requirement: '30-day streak',
    earned: false,
    rarity: 'legendary',
  },
  {
    id: 'first-perfect',
    name: 'Perfect Score',
    description: 'Achieve a perfect score on any quiz',
    icon: 'Star',
    category: 'achievement',
    requirement: '100% quiz score',
    earned: false,
    rarity: 'common',
  },
  {
    id: 'five-perfect',
    name: 'Quiz Master',
    description: 'Achieve 5 perfect quiz scores',
    icon: 'Medal',
    category: 'mastery',
    requirement: '5 perfect quiz scores',
    earned: false,
    rarity: 'epic',
  },
  {
    id: 'level-5',
    name: 'Rising Star',
    description: 'Reach Level 5',
    icon: 'Rocket',
    category: 'achievement',
    requirement: 'Reach Level 5',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'level-10',
    name: 'Expert Status',
    description: 'Reach Level 10',
    icon: 'Trophy',
    category: 'mastery',
    requirement: 'Reach Level 10',
    earned: false,
    rarity: 'epic',
  },
  {
    id: 'thousand-points',
    name: 'Point Collector',
    description: 'Earn 1,000 total points',
    icon: 'Zap',
    category: 'achievement',
    requirement: '1,000 points',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'five-thousand-points',
    name: 'Elite Achiever',
    description: 'Earn 5,000 total points',
    icon: 'Award',
    category: 'mastery',
    requirement: '5,000 points',
    earned: false,
    rarity: 'epic',
  },
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a module before 9 AM',
    icon: 'Star',
    category: 'special',
    requirement: 'Complete module before 9 AM',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a module after 10 PM',
    icon: 'Star',
    category: 'special',
    requirement: 'Complete module after 10 PM',
    earned: false,
    rarity: 'rare',
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete 5 activities in one session',
    icon: 'Zap',
    category: 'achievement',
    requirement: '5 activities in one session',
    earned: false,
    rarity: 'epic',
  },
];

export const BadgeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [badges, setBadges] = useState<Badge[]>(() => {
    const stored = localStorage.getItem(BADGES_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return initialBadges;
  });

  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<Badge[]>([]);

  useEffect(() => {
    localStorage.setItem(BADGES_STORAGE_KEY, JSON.stringify(badges));
  }, [badges]);

  const checkBadgeUnlock = (criteria: BadgeCriteria): Badge | null => {
    let unlockedBadge: Badge | null = null;

    setBadges(prev => {
      return prev.map(badge => {
        if (badge.earned) return badge;

        let shouldUnlock = false;

        // Check each badge's unlock criteria
        switch (badge.id) {
          case 'first-module':
            shouldUnlock = (criteria.modulesCompleted ?? 0) >= 1;
            break;
          case 'five-modules':
            shouldUnlock = (criteria.modulesCompleted ?? 0) >= 5;
            break;
          case 'all-modules':
            shouldUnlock = (criteria.modulesCompleted ?? 0) >= 9;
            break;
          case 'three-day-streak':
            shouldUnlock = (criteria.streak ?? 0) >= 3;
            break;
          case 'week-streak':
            shouldUnlock = (criteria.streak ?? 0) >= 7;
            break;
          case 'month-streak':
            shouldUnlock = (criteria.streak ?? 0) >= 30;
            break;
          case 'first-perfect':
            shouldUnlock = (criteria.perfectScores ?? 0) >= 1;
            break;
          case 'five-perfect':
            shouldUnlock = (criteria.perfectScores ?? 0) >= 5;
            break;
          case 'level-5':
            shouldUnlock = (criteria.level ?? 0) >= 5;
            break;
          case 'level-10':
            shouldUnlock = (criteria.level ?? 0) >= 10;
            break;
          case 'thousand-points':
            shouldUnlock = (criteria.totalPoints ?? 0) >= 1000;
            break;
          case 'five-thousand-points':
            shouldUnlock = (criteria.totalPoints ?? 0) >= 5000;
            break;
          case 'speed-demon':
            shouldUnlock = (criteria.activitiesCompleted ?? 0) >= 5;
            break;
        }

        if (shouldUnlock && !unlockedBadge) {
          const updatedBadge: Badge = {
            ...badge,
            earned: true,
            earnedDate: new Date().toISOString(),
          };
          unlockedBadge = updatedBadge;
          return updatedBadge;
        }

        return badge;
      });
    });

    if (unlockedBadge !== null) {
      const badgeToNotify: Badge = unlockedBadge;
      setNewlyUnlockedBadges(prev => [...prev, badgeToNotify]);
      // Auto-clear after 5 seconds
      const badgeId = badgeToNotify.id;
      setTimeout(() => {
        setNewlyUnlockedBadges(prev => prev.filter(b => b.id !== badgeId));
      }, 5000);
    }

    return unlockedBadge;
  };

  const markBadgeAsViewed = (badgeId: string) => {
    setNewlyUnlockedBadges(prev => prev.filter(b => b.id !== badgeId));
  };

  const unlockedBadges = badges.filter(b => b.earned);

  return (
    <BadgeContext.Provider
      value={{
        badges,
        unlockedBadges,
        checkBadgeUnlock,
        markBadgeAsViewed,
        newlyUnlockedBadges,
      }}
    >
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadges = () => {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useBadges must be used within a BadgeProvider');
  }
  return context;
};
