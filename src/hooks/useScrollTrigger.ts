import { useState, useEffect, useRef, RefObject } from 'react';

export interface ScrollTriggerConfig {
  threshold?: number; // 0-1, percentage of element visibility
  once?: boolean; // Trigger only once
  rootMargin?: string; // Margin around the root
  enabled?: boolean; // Enable/disable trigger
}

export interface ScrollTriggerResult {
  isVisible: boolean;
  hasBeenVisible: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Custom hook to detect when an element enters the viewport
 * Perfect for triggering Agnes avatar at specific scroll positions
 */
export function useScrollTrigger<T extends Element>(
  config: ScrollTriggerConfig = {}
): [RefObject<T | null>, ScrollTriggerResult] {
  const {
    threshold = 0.5,
    once = false,
    rootMargin = '0px',
    enabled = true,
  } = config;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);

        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasBeenVisible) {
            setHasBeenVisible(true);
          }
          // If once=true, disconnect after first trigger
          if (once) {
            observer.disconnect();
          }
        } else {
          // Only update if not once, or if hasn't been visible yet
          if (!once) {
            setIsVisible(false);
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin, enabled, hasBeenVisible]);

  return [
    ref,
    {
      isVisible: once ? hasBeenVisible : isVisible,
      hasBeenVisible,
      entry,
    },
  ];
}

/**
 * Hook to detect scroll position percentage
 * Useful for triggering Agnes at specific scroll depths
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentage = maxScroll > 0 ? (position / maxScroll) * 100 : 0;

      setScrollPosition(position);
      setScrollPercentage(percentage);
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return {
    scrollPosition,
    scrollPercentage,
  };
}

/**
 * Hook to detect when user scrolls past a certain percentage
 */
export function useScrollPercentageTrigger(
  targetPercentage: number,
  once: boolean = true
) {
  const { scrollPercentage } = useScrollPosition();
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (scrollPercentage >= targetPercentage) {
      setIsActive(true);
      if (!hasTriggered) {
        setHasTriggered(true);
      }
    } else if (!once) {
      setIsActive(false);
    }
  }, [scrollPercentage, targetPercentage, once, hasTriggered]);

  return {
    isActive: once ? hasTriggered : isActive,
    scrollPercentage,
    hasTriggered,
  };
}

/**
 * Hook to detect idle time (no scrolling or mouse movement)
 * Useful for showing Agnes when user seems stuck
 */
export function useIdleDetection(idleTimeMs: number = 5000) {
  const [isIdle, setIsIdle] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, idleTimeMs);
    };

    // Initial setup
    resetIdleTimer();

    // Events to track
    const events = ['scroll', 'mousemove', 'keydown', 'click', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
    };
  }, [idleTimeMs]);

  return isIdle;
}

export default useScrollTrigger;
