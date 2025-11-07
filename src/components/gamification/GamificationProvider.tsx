import React, { ReactNode } from 'react';
import { PointsProvider } from '../../contexts/PointsContext';
import { BadgeProvider } from '../../contexts/BadgeContext';
import BadgeNotifications from './BadgeNotification';

interface GamificationProviderProps {
  children: ReactNode;
}

/**
 * GamificationProvider - Wraps the app with gamification contexts
 *
 * Provides:
 * - Points tracking and level progression
 * - Badge/achievement system
 * - Real-time notifications for unlocks
 *
 * Usage:
 * <GamificationProvider>
 *   <App />
 * </GamificationProvider>
 */
const GamificationProvider: React.FC<GamificationProviderProps> = ({ children }) => {
  return (
    <PointsProvider>
      <BadgeProvider>
        {children}
        <BadgeNotifications />
      </BadgeProvider>
    </PointsProvider>
  );
};

export default GamificationProvider;
