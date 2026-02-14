
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_VIDEOS } from '../constants';
import AdOverlay from '../components/AdOverlay';

const HomeView: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoWatchCount, setVideoWatchCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    const index = Math.round(scrollTop / clientHeight);
    if (index !== currentIndex) {
      setCurrentIndex(index);
      setVideoWatchCount(prev => prev + 1);
    }
  };

  useEffect(() => {
    // Show ad every 5 videos
    if (videoWatchCount > 0 && videoWatchCount % 5 === 0) {
      setShowAd(true);
      setVideoWatchCount(0);
    }
  }, [videoWatchCount]);

  return (
    <div className="h-full bg-black relative">
      {showAd && (
        <AdOverlay 
          duration={5} 
          onComplete={() => setShowAd(false)} 
          title="Video Partner Ad" 
        />
      )}

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      >
        {MOCK_VIDEOS.map((src, i) => (
          <div key={i} className="h-full w-full snap-start relative flex items-center justify-center">
            <video 
              src={src} 
              className="h-full w-full object-cover"
              autoPlay={i === currentIndex}
              loop
              muted
              playsInline
            />
            
            <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
              <h3 className="font-bold text-lg">@earnify_user</h3>
              <p className="text-sm opacity-80 mt-1">Watch and earn coins daily! 🚀 #earning #rewards</p>
            </div>

            <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <span className="text-white text-xs mt-1 font-medium">1.2k</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z"/></svg>
                </div>
                <span className="text-white text-xs mt-1 font-medium">234</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
