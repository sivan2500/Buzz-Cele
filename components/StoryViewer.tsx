
import React, { useEffect, useState, useRef } from 'react';
import { Story } from '../types';
import { X, Heart, Send, MoreHorizontal, ChevronUp } from 'lucide-react';

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

interface FloatingHeart {
  id: number;
  left: number;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose, onNext, onPrev }) => {
  const [progress, setProgress] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset state when story changes
    setProgress(0);
    setHearts([]);

    if (story.mediaType === 'video') {
      // Logic for video stories handled by timeupdate event
      const video = videoRef.current;
      if (video) {
        video.currentTime = 0;
        video.play().catch(e => console.error("Video autoplay blocked", e));
      }
    } else {
      // Logic for image stories (timer based)
      const duration = 5000; // 5 seconds per story
      const intervalTime = 50;
      const step = 100 / (duration / intervalTime);

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            onNext();
            return 100;
          }
          return prev + step;
        });
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [story, onNext]);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const percentage = (video.currentTime / video.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleVideoEnded = () => {
    onNext();
  };

  const handleLike = () => {
    const newHeart = {
      id: Date.now(),
      left: Math.random() * 60 + 20, // Random position between 20% and 80% width
    };
    setHearts(prev => [...prev, newHeart]);

    // Clean up heart after animation
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1500);
  };

  const handleLinkClick = () => {
    if (story.linkUrl) {
      window.open(story.linkUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center">
      {/* Container for Desktop sizing / Mobile full */}
      <div className="relative w-full md:max-w-md h-full bg-gray-900 md:rounded-xl overflow-hidden shadow-2xl">
        
        {/* Story Media */}
        <div className="absolute inset-0 bg-black">
          {story.mediaType === 'video' && story.videoUrl ? (
            <video 
              ref={videoRef}
              src={story.videoUrl}
              poster={story.imageUrl}
              className="w-full h-full object-cover"
              playsInline
              muted={false} // Allow sound if user enabled it, typically muted by default in browsers without interaction, but here we assume intent
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
            />
          ) : (
            <img src={story.imageUrl} alt={story.caption} className="w-full h-full object-cover" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none"></div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-4 left-4 right-4 h-1 bg-white/30 rounded-full overflow-hidden z-20 pointer-events-none">
          <div 
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20 text-white pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <img src={story.authorAvatar} alt={story.authorName} className="w-8 h-8 rounded-full border border-white/50" />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">{story.authorName}</span>
              <span className="text-[10px] opacity-80">{story.timestamp}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 pointer-events-auto">
             <button className="opacity-80 hover:opacity-100"><MoreHorizontal size={20} /></button>
             <button onClick={onClose} className="opacity-80 hover:opacity-100"><X size={24} /></button>
          </div>
        </div>

        {/* Navigation Tap Zones */}
        <div className="absolute inset-0 z-10 flex">
          <div className="w-1/2 h-full" onClick={onPrev} role="button" aria-label="Previous story"></div>
          <div className="w-1/2 h-full" onClick={onNext} role="button" aria-label="Next story"></div>
        </div>

        {/* Floating Hearts Container */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
           {hearts.map(heart => (
             <div 
               key={heart.id}
               className="absolute bottom-20 text-red-500 animate-float-up"
               style={{ left: `${heart.left}%` }}
             >
                <Heart size={32} fill="currentColor" />
             </div>
           ))}
        </div>

        {/* Footer / Caption / Swipe Up */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white pb-8 bg-gradient-to-t from-black/80 to-transparent">
           
           {/* Swipe Up Link */}
           {story.linkUrl && (
             <div className="flex flex-col items-center justify-center mb-6 animate-bounce pointer-events-auto cursor-pointer" onClick={handleLinkClick}>
                <ChevronUp size={24} />
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                  {story.linkText || 'See More'}
                </span>
             </div>
           )}

           <p className="text-lg font-medium text-center mb-6 drop-shadow-md">{story.caption}</p>
           
           <div className="flex items-center gap-4 pointer-events-auto">
             <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Send message..." 
                  className="w-full bg-transparent border border-white/50 rounded-full px-4 py-2.5 text-sm placeholder:text-white/70 focus:outline-none focus:border-white focus:bg-white/10 transition-colors"
                />
             </div>
             <button onClick={handleLike} className="text-white hover:scale-110 transition-transform active:scale-95">
                <Heart size={28} />
             </button>
             <button className="text-white hover:scale-110 transition-transform">
                <Send size={24} />
             </button>
           </div>
        </div>

      </div>
      
      {/* Desktop Close Button (Outside) */}
      <button 
        onClick={onClose}
        className="hidden md:block absolute top-4 right-4 text-white/50 hover:text-white p-2"
      >
        <X size={32} />
      </button>

      {/* Inline styles for the heart animation */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-300px) scale(1.5); opacity: 0; }
        }
        .animate-float-up {
          animation: float-up 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StoryViewer;
