
import React, { useEffect, useRef, useState } from 'react';
import { RadioStation } from '../types';
import { Play, Pause, Volume2, VolumeX, X, Radio, SkipForward, SkipBack } from 'lucide-react';

interface GlobalPlayerProps {
  station: RadioStation | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

const GlobalPlayer: React.FC<GlobalPlayerProps> = ({ station, isPlaying, onTogglePlay, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const lastStationId = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!audioRef.current || !station) return;

    const handleAudioChange = async () => {
      try {
        // Check if station changed
        if (lastStationId.current !== station.id) {
          lastStationId.current = station.id;
          audioRef.current!.load();
        }

        if (isPlaying) {
          setIsLoading(true);
          await audioRef.current!.play();
          setIsLoading(false);
        } else {
          audioRef.current!.pause();
          setIsLoading(false);
        }
      } catch (error: any) {
        // AbortError is expected when pausing rapidly or switching sources while loading
        if (error.name !== 'AbortError') {
          console.error("Playback failed", error);
        }
        setIsLoading(false);
      }
    };

    handleAudioChange();
    
  }, [isPlaying, station]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  if (!station) return null;

  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 text-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-[100] animate-in slide-in-from-bottom duration-300">
      <audio 
        ref={audioRef} 
        src={station.streamUrl} 
        preload="none"
        onEnded={() => {
            // Loop for demo purposes since these are short clips
            if(audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
            }
        }}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Station Info */}
        <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg shrink-0 flex items-center justify-center ${station.logoColor} shadow-lg relative overflow-hidden group`}>
             <Radio className="text-white relative z-10" size={20} />
             {/* Visualizer BG */}
             {isPlaying && (
                <div className="absolute inset-0 flex items-end justify-center gap-0.5 opacity-30 pb-1">
                   {[1,2,3,4].map(i => (
                     <div key={i} className="w-1.5 bg-black" style={{ 
                        height: '100%', 
                        animation: `eq-bar ${0.5 + Math.random() * 0.5}s ease-in-out infinite alternate` 
                     }} />
                   ))}
                </div>
             )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
               <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 rounded animate-pulse">LIVE</span>
               <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{station.language} • {station.genre}</span>
            </div>
            <h4 className="text-sm md:text-base font-bold text-white truncate leading-tight">
              {station.name}
            </h4>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 md:gap-6">
           <button className="text-gray-400 hover:text-white hidden md:block" aria-label="Previous">
             <SkipBack size={20} />
           </button>
           
           <button 
             onClick={onTogglePlay}
             className="w-10 h-10 md:w-12 md:h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
             aria-label={isPlaying ? "Pause" : "Play"}
           >
             {isLoading ? (
               <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
             ) : isPlaying ? (
               <Pause size={20} fill="currentColor" />
             ) : (
               <Play size={20} fill="currentColor" className="ml-0.5" />
             )}
           </button>

           <button className="text-gray-400 hover:text-white hidden md:block" aria-label="Next">
             <SkipForward size={20} />
           </button>
        </div>

        {/* Volume & Close */}
        <div className="flex items-center gap-4 flex-1 justify-end">
           <div className="hidden md:flex items-center gap-2 group">
             <button onClick={toggleMute} className="text-gray-400 group-hover:text-white focus:outline-none">
               {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
             </button>
             <input 
               type="range" 
               min="0" 
               max="1" 
               step="0.1" 
               value={isMuted ? 0 : volume} 
               onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
               }}
               className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
               aria-label="Volume"
             />
           </div>
           
           <div className="w-px h-8 bg-gray-800 hidden md:block"></div>
           
           <button 
             onClick={onClose}
             className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
             aria-label="Close Player"
           >
             <X size={20} />
           </button>
        </div>

      </div>
      <style>{`
        @keyframes eq-bar {
          0% { height: 10%; }
          100% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default GlobalPlayer;
