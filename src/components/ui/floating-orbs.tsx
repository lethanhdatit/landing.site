'use client';

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large blue orb - top left */}
      <div
        className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 40%, transparent 70%)',
          animation: 'glow-drift 12s ease-in-out infinite',
        }}
      />

      {/* Medium violet orb - right */}
      <div
        className="absolute -right-20 top-1/3 h-[400px] w-[400px] rounded-full opacity-35"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.07) 0%, rgba(139, 92, 246, 0.02) 40%, transparent 70%)',
          animation: 'glow-drift 14s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* Cyan bubble - bottom left */}
      <div
        className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.02) 50%, transparent 70%)',
          animation: 'bubble-wobble 10s ease-in-out infinite',
          animationDelay: '5s',
        }}
      />

      {/* Small blue particle */}
      <div
        className="absolute right-1/3 top-1/4 h-2 w-2 rounded-full"
        style={{
          background: 'rgba(59, 130, 246, 0.5)',
          boxShadow: '0 0 12px rgba(59, 130, 246, 0.4)',
          animation: 'float 4s ease-in-out infinite',
        }}
      />
      {/* Small violet particle */}
      <div
        className="absolute left-1/3 top-2/3 h-1.5 w-1.5 rounded-full"
        style={{
          background: 'rgba(139, 92, 246, 0.4)',
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
          animation: 'float 5s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />
      {/* Small cyan particle */}
      <div
        className="absolute right-1/4 bottom-1/3 h-2.5 w-2.5 rounded-full"
        style={{
          background: 'rgba(6, 182, 212, 0.4)',
          boxShadow: '0 0 14px rgba(6, 182, 212, 0.3)',
          animation: 'float 6s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      {/* Tiny white particle */}
      <div
        className="absolute left-1/2 top-1/3 h-1 w-1 rounded-full"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.3)',
          animation: 'float 3s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* Water ripple effect - colored */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full opacity-10"
        style={{
          border: '1px solid rgba(59, 130, 246, 0.2)',
          animation: 'ripple 5s ease-out infinite',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full opacity-10"
        style={{
          border: '1px solid rgba(139, 92, 246, 0.15)',
          animation: 'ripple 5s ease-out infinite',
          animationDelay: '2.5s',
        }}
      />
    </div>
  );
}
