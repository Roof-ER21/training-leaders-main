import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
  className?: string;
}

const ModalPortal: React.FC<ModalPortalProps> = ({ children, className }) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const prevOverflow = useRef<string>('');
  if (!elRef.current) {
    const el = document.createElement('div');
    el.className = `fixed inset-0 z-[4000] ${className || ''}`.trim();
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('tabindex', '-1');
    elRef.current = el;
  }

  useEffect(() => {
    const el = elRef.current!;
    // Append to body
    document.body.appendChild(el);
    // Scroll lock
    prevOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus management
    const tryFocus = () => {
      try { (el as any).focus?.(); } catch {}
    };
    tryFocus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = el.querySelectorAll<HTMLElement>(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey) {
        if (active === first || active === el) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (active === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow.current;
      try {
        document.body.removeChild(el);
      } catch {}
    };
  }, [className]);

  return createPortal(children, elRef.current!);
};

export default ModalPortal;
