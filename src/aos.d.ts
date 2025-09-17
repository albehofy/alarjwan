declare module 'aos' {
  interface AOSOptions {
    disable?: boolean | 'phone' | 'tablet' | 'mobile' | (() => boolean);
    startEvent?: string;
    initClassName?: string;
    animatedClassName?: string;
    useClassNames?: boolean;
    disableMutationObserver?: boolean;
    debounceDelay?: number;
    throttleDelay?: number;
    offset?: number;
    delay?: number;
    duration?: number;
    easing?: string;
    once?: boolean;
    mirror?: boolean;
    anchorPlacement?: 'top-bottom' | 'top-center' | 'bottom-bottom' | 'bottom-center';
  }

  interface AOS {
    init(options?: AOSOptions): void;
    refresh(): void;
    refreshHard(): void;
    // Add more methods here if needed
  }

  const aosInstance: AOS;
  export = aosInstance;
}
