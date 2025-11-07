declare module 'aos' {
  interface AOSOptions {
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: string;
    disable?: boolean | string | (() => boolean);
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    throttleDelay?: number;
    debounceDelay?: number;
  }

  interface AOS {
    init(options?: AOSOptions): void;
    refresh(initialize?: boolean): void;
    refreshHard(): void;
  }

  const AOS: AOS;
  export default AOS;
}
