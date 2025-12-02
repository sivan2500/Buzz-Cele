
import React, { useState, useEffect, useRef } from 'react';
import { RadioStation, TVChannel, User } from '../types';
import { RADIO_STATIONS, TV_CHANNELS } from '../constants';
import { Play, Pause, Radio, Tv, Users, MessageSquare, Heart, Share2, BarChart2, Maximize, Volume2, VolumeX, SkipForward, Info } from 'lucide-react';
import Button from './Button';

interface LiveViewProps {
  onSelectStation: (station: RadioStation) => void;
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const LiveView: React.FC<LiveViewProps> = ({ 
  onSelectStation, 
  currentStation, 
  isPlaying, 
  onTogglePlay 
}) => {
  const [activeTab, setActiveTab] = useState<'tv' | 'radio'>('tv');
  const [activeLang, setActiveLang] = useState<string>('All');
  
  // TV Player State
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<TVChannel | null>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hlsInstance, setHlsInstance] = useState<any>(null);

  // Ad State
  const [isAdPlaying, setIsAdPlaying] = useState(false);
  const [adTimeLeft, setAdTimeLeft] = useState(15);
  const [canSkipAd, setCanSkipAd] = useState(false);
  const adTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mobile Controls State
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check hash on mount to switch tabs
  useEffect(() => {
    if (window.location.hash === '#live-radio') setActiveTab('radio');
    if (window.location.hash === '#live-tv') setActiveTab('tv');
  }, []);

  // Cleanup HLS on unmount
  useEffect(() => {
    return () => {
      if (hlsInstance) {
        hlsInstance.destroy();
      }
      if (adTimerRef.current) clearInterval(adTimerRef.current);
    };
  }, [hlsInstance]);

  const handleInteraction = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      
      if (isVideoPlaying || isAdPlaying) {
          controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
      }
  };

  useEffect(() => {
     if (!isVideoPlaying && !isAdPlaying) {
         setShowControls(true);
         if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
     } else {
         handleInteraction();
     }
  }, [isVideoPlaying, isAdPlaying]);


  const startAd = (channel: TVChannel) => {
      setIsAdPlaying(true);
      setAdTimeLeft(15);
      setCanSkipAd(false);
      
      // Start Ad Timer
      adTimerRef.current = setInterval(() => {
          setAdTimeLeft(prev => {
              if (prev <= 1) {
                  endAd(channel);
                  return 0;
              }
              if (prev <= 11) setCanSkipAd(true); // Enable skip after 5s (15-11=4s)
              return prev - 1;
          });
      }, 1000);
  };

  const endAd = (channel: TVChannel) => {
      if (adTimerRef.current) clearInterval(adTimerRef.current);
      setIsAdPlaying(false);
      startStream(channel);
  };

  const startStream = (channel: TVChannel) => {
    if (hlsInstance) {
        hlsInstance.destroy();
    }

    // Small delay to ensure video element is rendered
    setTimeout(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset state
        setIsVideoPlaying(true);
        video.volume = volume;

        if ((window as any).Hls && (window as any).Hls.isSupported()) {
            const hls = new (window as any).Hls();
            hls.loadSource(channel.stream);
            hls.attachMedia(video);
            hls.on((window as any).Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(e => console.error("Autoplay failed", e));
            });
            setHlsInstance(hls);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = channel.stream;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch(e => console.error("Autoplay failed", e));
            });
        }
    }, 100);
  };

  const loadChannel = (channel: TVChannel) => {
    setCurrentChannel(channel);
    // Start with Ad
    startAd(channel);
    
    // Scroll to player on mobile
    if (window.innerWidth < 1024) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleVideoPlay = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      handleInteraction();

      if (isAdPlaying) return; // Can't pause ads in this mock

      if (videoRef.current) {
          if (videoRef.current.paused) {
              videoRef.current.play();
              setIsVideoPlaying(true);
          } else {
              videoRef.current.pause();
              setIsVideoPlaying(false);
          }
      }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVol = parseFloat(e.target.value);
      setVolume(newVol);
      if (videoRef.current) {
          videoRef.current.volume = newVol;
          videoRef.current.muted = newVol === 0;
      }
      setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
      if (videoRef.current) {
          const newMuted = !isMuted;
          videoRef.current.muted = newMuted;
          setIsMuted(newMuted);
          if (!newMuted && volume === 0) {
              setVolume(0.5);
              videoRef.current.volume = 0.5;
          }
      }
  };

  const toggleFullscreen = () => {
      if (!document.fullscreenElement && playerWrapperRef.current) {
          playerWrapperRef.current.requestFullscreen();
      } else {
          document.exitFullscreen();
      }
  };

  const filteredStations = activeLang === 'All' 
    ? RADIO_STATIONS 
    : RADIO_STATIONS.filter(s => s.language === activeLang);

  const languages = ['All', ...Array.from(new Set(RADIO_STATIONS.map(s => s.language)))].sort();

  return (
    <div className="bg-gray-950 min-h-screen text-white pb-20 animate-in fade-in duration-300">
      
      {/* Live Header */}
      <div className="border-b border-gray-800 bg-gray-900 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                 <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                 </span>
                 <h1 className="text-xl font-serif font-bold tracking-tight">BUZZ<span className="text-brand-500">LIVE</span> STUDIO</h1>
              </div>
              
              <div className="flex bg-gray-800 rounded-lg p-1">
                 <button 
                   onClick={() => setActiveTab('tv')}
                   className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'tv' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                 >
                   <Tv size={16} /> TV
                 </button>
                 <button 
                   onClick={() => setActiveTab('radio')}
                   className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-bold transition-all ${activeTab === 'radio' ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-400 hover:text-white'}`}
                 >
                   <Radio size={16} /> Radio
                 </button>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Live TV Section */}
        {activeTab === 'tv' && (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                 {/* Video Player */}
                 <div 
                    ref={playerWrapperRef} 
                    className="aspect-video bg-black rounded-xl overflow-hidden relative shadow-2xl ring-1 ring-white/10 group cursor-pointer"
                    onClick={toggleVideoPlay}
                    onMouseMove={handleInteraction}
                    onMouseLeave={() => (isVideoPlaying || isAdPlaying) && setShowControls(false)}
                 >
                    {isAdPlaying ? (
                        /* Pre-roll Ad Simulation */
                        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center relative z-20">
                            {/* Dummy Ad Video */}
                            <video 
                                src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" 
                                autoPlay 
                                loop 
                                muted={isMuted}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            
                            {/* Ad Controls / UI */}
                            <div className="absolute bottom-4 left-4 text-white bg-black/60 px-3 py-1 rounded flex items-center gap-2 text-sm pointer-events-none">
                                <span className="font-bold text-yellow-400">Ad</span>
                                <span>·</span>
                                <span>0:{adTimeLeft < 10 ? `0${adTimeLeft}` : adTimeLeft}</span>
                            </div>
                            
                            <div className="absolute bottom-4 right-4 flex gap-4 items-center">
                                <a href="#" className="text-xs text-white/80 hover:text-white underline pointer-events-auto">Visit Advertiser</a>
                                {canSkipAd ? (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); endAd(currentChannel!); }}
                                        className="bg-black/60 hover:bg-black/80 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-1 transition-colors border border-white/20"
                                    >
                                        Skip Ad <SkipForward size={14} />
                                    </button>
                                ) : (
                                    <div className="bg-black/60 text-white/70 px-4 py-2 rounded font-medium text-sm border border-white/10">
                                        Skip in {adTimeLeft - 10 > 0 ? adTimeLeft - 10 : 0}s
                                    </div>
                                )}
                            </div>
                            
                            <div className="absolute top-4 left-4 bg-black/40 p-2 rounded">
                                <Info size={16} className="text-white/50" />
                            </div>
                        </div>
                    ) : currentChannel ? (
                        <video 
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            playsInline
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-500">
                             <Tv size={64} className="mb-4 opacity-50" />
                             <p>Select a channel below to watch live</p>
                        </div>
                    )}
                    
                    {/* Default/Placeholder Image if no channel selected or loading */}
                    {!currentChannel && (
                        <>
                             <img 
                                src="https://picsum.photos/1200/800?random=tv" 
                                alt="Live Broadcast" 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none"></div>
                        </>
                    )}

                    {/* Custom Controls Overlay (Main Content) */}
                    {currentChannel && !isAdPlaying && (
                        <div 
                            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 flex flex-col gap-2 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                            onClick={(e) => e.stopPropagation()} 
                        >
                            {/* Progress Bar (Visual only for live) */}
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-full"></div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button onClick={toggleVideoPlay} className="text-white hover:text-brand-400 transition-colors p-2 -ml-2">
                                        {isVideoPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                                    </button>
                                    
                                    <div className="flex items-center gap-2 group/vol hidden sm:flex">
                                        <button onClick={toggleMute} className="text-white hover:text-brand-400">
                                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                        <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300">
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="1" 
                                                step="0.1"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                className="w-20 h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 bg-red-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                        LIVE
                                    </div>
                                </div>

                                <button onClick={toggleFullscreen} className="text-white hover:text-brand-400 transition-colors">
                                    <Maximize size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Channel Info Overlay (Top Left) */}
                    {currentChannel && !isAdPlaying && (
                        <div className={`absolute top-4 left-4 flex gap-2 pointer-events-none transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="bg-brand-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded shadow-lg uppercase tracking-wider">
                                {currentChannel.name}
                            </span>
                        </div>
                    )}
                 </div>

                 {/* Channel Strip */}
                 <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Live Channels</h3>
                       <span className="text-xs text-brand-500 font-bold">Active Streams</span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {TV_CHANNELS.map((channel, idx) => (
                          <React.Fragment key={channel.name}>
                              <div 
                                onClick={() => loadChannel(channel)}
                                className={`bg-gray-800 rounded-lg p-3 cursor-pointer hover:bg-gray-700 transition-colors border group ${currentChannel?.name === channel.name ? 'border-brand-500 ring-1 ring-brand-500' : 'border-transparent hover:border-brand-500/50'}`}
                              >
                                <div className="aspect-video bg-white rounded mb-2 overflow-hidden relative flex items-center justify-center p-2">
                                    <img src={channel.logo} className="max-w-full max-h-full object-contain" alt={channel.name} />
                                    <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${currentChannel?.name === channel.name ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                       {currentChannel?.name === channel.name && isVideoPlaying ? (
                                           <div className="flex gap-1 items-end h-4">
                                               <span className="w-1 bg-brand-500 animate-[music-bar_0.5s_ease-in-out_infinite]"></span>
                                               <span className="w-1 bg-brand-500 animate-[music-bar_0.7s_ease-in-out_infinite]"></span>
                                               <span className="w-1 bg-brand-500 animate-[music-bar_0.9s_ease-in-out_infinite]"></span>
                                           </div>
                                       ) : (
                                           <Play size={20} className="text-white" fill="white" />
                                       )}
                                    </div>
                                </div>
                                <p className={`text-xs font-bold truncate ${currentChannel?.name === channel.name ? 'text-brand-400' : 'text-white'}`}>{channel.name}</p>
                                <p className="text-[10px] text-gray-500 truncate">{channel.category}</p>
                              </div>

                              {/* Strategic Ad Placement every 3 channels */}
                              {(idx + 1) % 3 === 0 && (
                                 <div className="bg-gray-800/50 rounded-lg p-3 flex flex-col items-center justify-center text-gray-600 font-bold border-2 border-dashed border-gray-700 min-h-[120px] hover:bg-gray-800 transition-colors cursor-pointer group">
                                     <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-brand-400">Ad Space</span>
                                     <span className="text-[8px] text-gray-700 mt-1">Sponsor</span>
                                 </div>
                              )}
                          </React.Fragment>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Chat / Interaction */}
              <div className="lg:col-span-1 bg-gray-900 rounded-xl border border-gray-800 flex flex-col h-[600px]">
                 <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold text-sm">Live Chat</h3>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {[1,2,3,4,5,6,7,8].map(i => (
                       <div key={i} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0 overflow-hidden">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} className="w-full h-full" />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-gray-400">User{i*23}</p>
                             <p className="text-sm text-gray-200">OMG did you see that dress?! 🔥</p>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="p-4 border-t border-gray-800">
                    <div className="relative">
                       <input 
                         type="text" 
                         placeholder="Say something..." 
                         className="w-full bg-gray-800 border-none rounded-full py-2.5 pl-4 pr-10 text-sm focus:ring-1 focus:ring-brand-500"
                       />
                       <button className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-500 hover:text-brand-400">
                          <MessageSquare size={18} />
                       </button>
                    </div>
                    <div className="flex justify-between mt-3 px-2">
                       <button className="text-gray-500 hover:text-red-500 transition-colors"><Heart size={20} /></button>
                       <button className="text-gray-500 hover:text-blue-500 transition-colors"><Share2 size={20} /></button>
                       <button className="text-gray-500 hover:text-brand-500 transition-colors"><Users size={20} /></button>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* Live Radio Section */}
        {activeTab === 'radio' && (
           <div>
              <div className="mb-8 p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                  <div className="relative z-10 text-center">
                     <h2 className="text-3xl font-serif font-bold mb-2">Global Beats</h2>
                     <p className="text-gray-400 max-w-xl mx-auto mb-6">Tune in to our exclusive network of radio stations curating the vibes from fashion runways to VIP afterparties.</p>
                     
                     {currentStation && isPlaying && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-500/20 text-brand-400 rounded-full border border-brand-500/30 mb-6">
                           <BarChart2 size={16} className="animate-pulse" />
                           <span className="text-xs font-bold uppercase tracking-wider">Now Playing: {currentStation.name}</span>
                        </div>
                     )}
                  </div>
              </div>

              {/* Language Filters */}
              <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                        activeLang === lang
                          ? 'bg-brand-600 text-white shadow-sm'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {filteredStations.map((station) => {
                    const isActive = currentStation?.id === station.id;
                    return (
                       <div key={station.id} className={`group bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-brand-500 transition-all cursor-pointer ${isActive ? 'ring-2 ring-brand-500 bg-gray-800/80' : ''}`} onClick={() => {
                           if (isActive) onTogglePlay();
                           else onSelectStation(station);
                       }}>
                          <div className={`h-32 ${station.logoColor} relative flex items-center justify-center`}>
                              <Radio size={48} className="text-white/20 absolute" />
                              <div className="relative z-10 text-center">
                                 <h3 className="text-2xl font-black text-white">{station.language}</h3>
                                 <p className="text-xs font-bold text-white/80 uppercase tracking-widest">{station.genre}</p>
                              </div>
                              
                              {/* Visualizer Overlay if Playing */}
                              {isActive && isPlaying && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 flex items-end justify-center gap-0.5 opacity-50">
                                  {[...Array(20)].map((_, i) => (
                                    <div 
                                      key={i} 
                                      className="w-1 bg-white animate-[bounce_0.5s_infinite]" 
                                      style={{ animationDelay: `${Math.random() * 0.5}s`, height: `${Math.random() * 100}%` }}
                                    ></div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Overlay Play Button */}
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                    {isActive && isPlaying ? <Pause size={20} className="text-gray-900" /> : <Play size={20} className="text-gray-900 ml-1" />}
                                 </div>
                              </div>
                          </div>
                          <div className="p-4">
                             <div className="flex justify-between items-start mb-1">
                                <h4 className="font-bold text-lg">{station.name}</h4>
                                {isActive && <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse mt-2"></span>}
                             </div>
                             <p className="text-sm text-gray-500">Live 24/7</p>
                             
                             <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
                                <span>128kbps</span>
                                <span>Stereo</span>
                             </div>
                          </div>
                       </div>
                    );
                 })}
              </div>
           </div>
        )}

      </div>
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LiveView;
