import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface PointsData {
  totalPoints: number;
  dailyPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  streak: number;
  lastActivity: string;
  level: number;
  pointsToNextLevel: number;
}

interface PointsContextType {
  points: PointsData;
  addPoints: (amount: number, activity: string) => void;
  resetDaily: () => void;
  updateStreak: () => void;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

const POINTS_STORAGE_KEY = 'roofER_points_data';
const LAST_LOGIN_KEY = 'roofER_last_login';
const POINTS_PER_LEVEL = 1000;

const getInitialPoints = (): PointsData => {
  const stored = localStorage.getItem(POINTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    totalPoints: 0,
    dailyPoints: 0,
    weeklyPoints: 0,
    monthlyPoints: 0,
    streak: 0,
    lastActivity: new Date().toISOString(),
    level: 1,
    pointsToNextLevel: POINTS_PER_LEVEL,
  };
};

const calculateLevel = (totalPoints: number) => {
  const level = Math.floor(totalPoints / POINTS_PER_LEVEL) + 1;
  const pointsToNextLevel = POINTS_PER_LEVEL - (totalPoints % POINTS_PER_LEVEL);
  return { level, pointsToNextLevel };
};

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<PointsData>(getInitialPoints);

  useEffect(() => {
    localStorage.setItem(POINTS_STORAGE_KEY, JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    checkDailyReset();
    updateStreak();
  }, []);

  const checkDailyReset = () => {
    const lastLogin = localStorage.getItem(LAST_LOGIN_KEY);
    const today = new Date().toDateString();

    if (lastLogin !== today) {
      setPoints(prev => ({
        ...prev,
        dailyPoints: 0,
      }));
      localStorage.setItem(LAST_LOGIN_KEY, today);
    }
  };

  const updateStreak = () => {
    const lastLogin = localStorage.getItem(LAST_LOGIN_KEY);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (!lastLogin) {
      setPoints(prev => ({ ...prev, streak: 1 }));
      localStorage.setItem(LAST_LOGIN_KEY, today.toDateString());
    } else {
      const lastDate = new Date(lastLogin);
      const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        // Consecutive day - increase streak
        setPoints(prev => ({ ...prev, streak: prev.streak + 1 }));
      } else if (daysDiff > 1) {
        // Streak broken
        setPoints(prev => ({ ...prev, streak: 1 }));
      }
      // If daysDiff === 0, same day - no change
    }
  };

  const addPoints = (amount: number, activity: string) => {
    setPoints(prev => {
      const newTotalPoints = prev.totalPoints + amount;
      const { level, pointsToNextLevel } = calculateLevel(newTotalPoints);

      return {
        ...prev,
        totalPoints: newTotalPoints,
        dailyPoints: prev.dailyPoints + amount,
        weeklyPoints: prev.weeklyPoints + amount,
        monthlyPoints: prev.monthlyPoints + amount,
        lastActivity: new Date().toISOString(),
        level,
        pointsToNextLevel,
      };
    });

    // Trigger achievement check
    window.dispatchEvent(new CustomEvent('points-earned', {
      detail: { amount, activity }
    }));
  };

  const resetDaily = () => {
    setPoints(prev => ({ ...prev, dailyPoints: 0 }));
  };

  return (
    <PointsContext.Provider value={{ points, addPoints, resetDaily, updateStreak }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error('usePoints must be used within a PointsProvider');
  }
  return context;
};
