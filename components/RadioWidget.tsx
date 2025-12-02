
import React, { useState } from 'react';
import { RadioStation } from '../types';
import { RADIO_STATIONS } from '../constants';
import { Radio, Play, Pause, BarChart2 } from 'lucide-react';

interface RadioWidgetProps {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  onSelectStation: (station: RadioStation) => void;
  onTogglePlay: () => void;
}

const RadioWidget: React.FC<RadioWidgetProps> = ({ 
  currentStation, 
  isPlaying, 
  onSelectStation,
  onTogglePlay 
}) => {
  const [activeLang, setActiveLang] = useState<'All' | 'EN' | 'ES' | 'KR' | 'FR'>('All');

  const filteredStations = activeLang === 'All' 
    ? RADIO_STATIONS 
    : RADIO_STATIONS.filter(s => s.language === activeLang);

  const handleStationClick = (station: RadioStation) => {
    if (currentStation?.id === station.id) {
      onTogglePlay();
    } else {
      onSelectStation(station);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio size={18} className="text-brand-400" aria-hidden="true" />
          <h3 className="font-bold font-sans">Global Radio</h3>
        </div>
        <div className="flex items-center gap-1">
           {currentStation && isPlaying && (
             <div className="flex items-end gap-0.5 h-3">
               <span className="w-1 bg-brand-500 animate-[music-bar_0.6s_ease-in-out_infinite]"></span>
               <span className="w-1 bg-brand-500 animate-[music-bar_0.8s_ease-in-out_infinite] delay-75"></span>
               <span className="w-1 bg-brand-500 animate-[music-bar_1.0s_ease-in-out_infinite] delay-150"></span>
             </div>
           )}
           <span className="text-[10px] bg-red-600 px-1.5 rounded font-bold uppercase tracking-wider ml-2">Live</span>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex border-b border-gray-100 bg-gray-50 overflow-x-auto no-scrollbar">
        {['All', 'EN', 'ES', 'KR', 'FR'].map((lang) => (
          <button
            key={lang}
            onClick={() => setActiveLang(lang as any)}
            className={`flex-1 py-2 text-xs font-bold transition-colors border-b-2 ${
              activeLang === lang 
                ? 'border-brand-600 text-brand-700 bg-white' 
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            {lang === 'All' ? 'All' : lang}
          </button>
        ))}
      </div>

      <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto custom-scrollbar">
        {filteredStations.map((station) => {
          const isActive = currentStation?.id === station.id;
          
          return (
            <button
              key={station.id}
              onClick={() => handleStationClick(station)}
              className={`w-full flex items-center gap-3 p-3 text-left transition-colors group ${
                isActive ? 'bg-brand-50/50' : 'hover:bg-gray-50'
              }`}
            >
              {/* Logo/Icon */}
              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white shadow-sm ${station.logoColor} relative`}>
                 {isActive && isPlaying ? (
                    <BarChart2 size={18} className="animate-pulse" />
                 ) : (
                    <span className="text-xs font-black">{station.language}</span>
                 )}
                 
                 {/* Play Overlay */}
                 <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {isActive && isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                 </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                   <h4 className={`text-sm font-bold truncate ${isActive ? 'text-brand-700' : 'text-gray-900'}`}>
                     {station.name}
                   </h4>
                   {isActive && (
                     <span className="text-[10px] uppercase font-bold text-brand-500 flex items-center gap-1">
                        On Air
                     </span>
                   )}
                </div>
                <p className="text-xs text-gray-500 truncate">{station.genre}</p>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* CSS for custom animation if not present globally */}
      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
      `}</style>
    </div>
  );
};

export default RadioWidget;
