'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'slide-up' | 'slide-left' | 'slide-right' | 'scale-in' | 'fade-in';
  delay?: number;
  threshold?: number;
  className?: string;
}

export function ScrollAnimationWrapper({
  children,
  animation = 'slide-up',
  delay = 0,
  threshold = 0.1,
  className,
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const animationClasses = {
    'slide-up': 'translate-y-8 opacity-0',
    'slide-left': '-translate-x-8 opacity-0',
    'slide-right': 'translate-x-8 opacity-0',
    'scale-in': 'scale-95 opacity-0',
    'fade-in': 'opacity-0',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-x-0 translate-y-0 scale-100 opacity-100' : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
