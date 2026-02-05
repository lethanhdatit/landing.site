'use client';

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large soft white orb - top left */}
      <div 
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      
      {/* Medium frosted orb - right */}
      <div 
        className="absolute -right-20 top-1/3 h-72 w-72 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          animation: 'float 10s ease-in-out infinite',
          animationDelay: '2s',
        }}
      />
      
      {/* Crystal bubble effect - bottom left */}
      <div 
        className="absolute left-1/4 bottom-1/4 h-48 w-48 rounded-full opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 70%)',
          animation: 'bubble-wobble 8s ease-in-out infinite',
          animationDelay: '4s',
        }}
      />
      
      {/* Small crystal particles */}
      <div 
        className="absolute right-1/3 top-1/4 h-2 w-2 rounded-full"
        style={{ 
          background: 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          animation: 'float 4s ease-in-out infinite' 
        }}
      />
      <div 
        className="absolute left-1/3 top-2/3 h-1.5 w-1.5 rounded-full"
        style={{ 
          background: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.2)',
          animation: 'float 5s ease-in-out infinite', 
          animationDelay: '1s' 
        }}
      />
      <div 
        className="absolute right-1/4 bottom-1/3 h-2.5 w-2.5 rounded-full"
        style={{ 
          background: 'rgba(255, 255, 255, 0.35)',
          boxShadow: '0 0 12px rgba(255, 255, 255, 0.25)',
          animation: 'float 6s ease-in-out infinite', 
          animationDelay: '2s' 
        }}
      />
      <div 
        className="absolute left-1/2 top-1/3 h-1 w-1 rounded-full"
        style={{ 
          background: 'rgba(255, 255, 255, 0.5)',
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.4)',
          animation: 'float 3s ease-in-out infinite', 
          animationDelay: '3s' 
        }}
      />
      
      {/* Water ripple effect in background */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full opacity-10"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          animation: 'ripple 4s ease-out infinite',
        }}
      />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-32 rounded-full opacity-10"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.15)',
          animation: 'ripple 4s ease-out infinite',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}
