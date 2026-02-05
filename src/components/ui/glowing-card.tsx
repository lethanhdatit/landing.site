'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'white' | 'silver' | 'warm' | 'cool';
}

export function GlowingCard({ 
  children, 
  className,
  glowColor = 'white' 
}: GlowingCardProps) {
  const glowColors = {
    white: 'group-hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]',
    silver: 'group-hover:shadow-[0_0_60px_rgba(200,200,220,0.1)]',
    warm: 'group-hover:shadow-[0_0_60px_rgba(255,220,180,0.08)]',
    cool: 'group-hover:shadow-[0_0_60px_rgba(180,200,255,0.08)]',
  };

  return (
    <div className={cn('group relative', className)}>
      {/* Card content with crystal effect */}
      <div className={cn(
        'glass-card relative h-full transition-all duration-500',
        glowColors[glowColor]
      )}>
        {/* Subtle highlight overlay - top edge */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}
