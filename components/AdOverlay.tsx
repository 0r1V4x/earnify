
import React, { useState, useEffect } from 'react';

interface AdOverlayProps {
  duration: number;
  onComplete: () => void;
  title?: string;
}

const AdOverlay: React.FC<AdOverlayProps> = ({ duration, onComplete, title = "Special Ad" }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      // Small delay for UX
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-6 text-white">
      <div className="absolute top-8 right-6 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
        <span className="text-sm font-bold">Closing in {timeLeft}s</span>
      </div>

      <div className="w-full max-w-sm bg-white/10 rounded-2xl p-8 flex flex-col items-center text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-500 rounded-3xl flex items-center justify-center animate-pulse">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-slate-300 text-sm">Please stay for a few seconds to claim your rewards and support the platform!</p>
        </div>

        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-500 h-full transition-all duration-1000 ease-linear"
            style={{ width: `${((duration - timeLeft) / duration) * 100}%` }}
          />
        </div>

        <div className="text-xs text-slate-400 italic">
          High Security Ad Environment
        </div>
      </div>
    </div>
  );
};

export default AdOverlay;
