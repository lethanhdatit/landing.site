'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'white' | 'silver' | 'warm' | 'cool' | 'blue' | 'violet';
}

export function GlowingCard({ 
  children, 
  className,
  glowColor = 'blue' 
}: GlowingCardProps) {
  const glowColors = {
    white: 'group-hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]',
    silver: 'group-hover:shadow-[0_0_60px_rgba(200,200,220,0.08)]',
    warm: 'group-hover:shadow-[0_0_60px_rgba(255,180,120,0.06)]',
    cool: 'group-hover:shadow-[0_0_60px_rgba(6,182,212,0.08)]',
    blue: 'group-hover:shadow-[0_0_80px_rgba(59,130,246,0.08)]',
    violet: 'group-hover:shadow-[0_0_80px_rgba(139,92,246,0.08)]',
  };

  return (
    <div className={cn('group relative', className)}>
      <div className={cn(
        'glass-card relative h-full transition-all duration-500',
        glowColors[glowColor]
      )}>
        {/* Top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  );
}
