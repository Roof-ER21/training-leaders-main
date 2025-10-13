import React, { useState, useEffect } from 'react';
import AgnesAvatar from './AgnesAvatar';
import {
  useScrollTrigger,
  useScrollPercentageTrigger,
  useIdleDetection,
} from '../hooks/useScrollTrigger';

export interface TriggerPoint {
  id: string;
  message: string;
  tip?: string;
  suggestedAction?: string;
  triggerOnce?: boolean;
  showAfterIdle?: boolean; // Show when user is idle
}

interface AgnesScrollTriggerProps {
  triggerPoints?: TriggerPoint[];
  onChatOpen?: () => void;
  onActionClick?: (triggerPointId: string) => void;
  enableIdleTrigger?: boolean;
  idleTimeMs?: number;
  enablePercentageTrigger?: boolean;
  percentageTriggers?: {
    percentage: number;
    message: string;
    tip?: string;
  }[];
}

const AgnesScrollTrigger: React.FC<AgnesScrollTriggerProps> = ({
  triggerPoints = [],
  onChatOpen,
  onActionClick,
  enableIdleTrigger = true,
  idleTimeMs = 10000,
  enablePercentageTrigger = false,
  percentageTriggers = [],
}) => {
  const [activeTrigger, setActiveTrigger] = useState<TriggerPoint | null>(null);
  const [dismissedTriggers, setDismissedTriggers] = useState<Set<string>>(
    new Set()
  );
  const [showAvatar, setShowAvatar] = useState(false);

  // Idle detection
  const isIdle = useIdleDetection(enableIdleTrigger ? idleTimeMs : 999999);

  // Percentage-based triggers
  const { isActive: is25Active } = useScrollPercentageTrigger(25, true);
  const { isActive: is50Active } = useScrollPercentageTrigger(50, true);
  const { isActive: is75Active } = useScrollPercentageTrigger(75, true);

  // Handle idle trigger
  useEffect(() => {
    if (enableIdleTrigger && isIdle && !activeTrigger) {
      const idleTrigger: TriggerPoint = {
        id: 'idle-help',
        message:
          "I noticed you've been here for a bit. Need help understanding this section?",
        tip: "Don't hesitate to ask questions - that's what I'm here for!",
        suggestedAction: 'Continue Reading',
        triggerOnce: false,
      };

      if (!dismissedTriggers.has(idleTrigger.id)) {
        setActiveTrigger(idleTrigger);
        setShowAvatar(true);
      }
    }
  }, [isIdle, activeTrigger, enableIdleTrigger, dismissedTriggers]);

  // Handle percentage-based triggers
  useEffect(() => {
    if (!enablePercentageTrigger || percentageTriggers.length === 0) return;

    let trigger: TriggerPoint | null = null;

    if (is75Active && percentageTriggers[2]) {
      trigger = {
        id: 'scroll-75',
        ...percentageTriggers[2],
        triggerOnce: true,
      };
    } else if (is50Active && percentageTriggers[1]) {
      trigger = {
        id: 'scroll-50',
        ...percentageTriggers[1],
        triggerOnce: true,
      };
    } else if (is25Active && percentageTriggers[0]) {
      trigger = {
        id: 'scroll-25',
        ...percentageTriggers[0],
        triggerOnce: true,
      };
    }

    if (trigger && !dismissedTriggers.has(trigger.id)) {
      setActiveTrigger(trigger);
      setShowAvatar(true);
    }
  }, [
    is25Active,
    is50Active,
    is75Active,
    enablePercentageTrigger,
    percentageTriggers,
    dismissedTriggers,
  ]);

  const handleClose = () => {
    if (activeTrigger) {
      setDismissedTriggers(prev => {
        const next = new Set(Array.from(prev));
        next.add(activeTrigger.id);
        return next;
      });
      setShowAvatar(false);
      setActiveTrigger(null);
    }
  };

  const handleChatClick = () => {
    onChatOpen?.();
    handleClose();
  };

  const handleActionClick = () => {
    if (activeTrigger) {
      onActionClick?.(activeTrigger.id);
      handleClose();
    }
  };

  return (
    <AgnesAvatar
      isVisible={showAvatar}
      message={activeTrigger?.message}
      tip={activeTrigger?.tip}
      suggestedAction={activeTrigger?.suggestedAction}
      onClose={handleClose}
      onChatClick={handleChatClick}
      onActionClick={handleActionClick}
      position="bottom-right"
      variant="full"
    />
  );
};

/**
 * Component to mark trigger points in content
 * Use this to wrap sections where Agnes should appear
 */
export const AgnesTriggerPoint: React.FC<{
  triggerId: string;
  message: string;
  tip?: string;
  suggestedAction?: string;
  onTrigger: (trigger: TriggerPoint) => void;
  threshold?: number;
  children?: React.ReactNode;
}> = ({
  triggerId,
  message,
  tip,
  suggestedAction,
  onTrigger,
  threshold = 0.3,
  children,
}) => {
  const [ref, { isVisible, hasBeenVisible }] = useScrollTrigger<Element>({
    threshold,
    once: true,
  });

  useEffect(() => {
    if (isVisible && !hasBeenVisible) {
      onTrigger({
        id: triggerId,
        message,
        tip,
        suggestedAction,
        triggerOnce: true,
      });
    }
  }, [
    isVisible,
    hasBeenVisible,
    triggerId,
    message,
    tip,
    suggestedAction,
    onTrigger,
  ]);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="relative">
      {children}
    </div>
  );
};

export default AgnesScrollTrigger;
