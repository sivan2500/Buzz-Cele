import React from 'react';
import { Story } from '../types';
import { Plus } from 'lucide-react';

interface StoryRailProps {
  stories: Story[];
  onStoryClick: (storyId: string) => void;
}

const StoryRail: React.FC<StoryRailProps> = ({ stories, onStoryClick }) => {
  return (
    <div className="bg-white border-b border-gray-100 py-4 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 md:space-x-6">
          
          {/* "Add Story" Mock (optional) */}
          <div className="flex flex-col items-center gap-1 cursor-pointer group">
             <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] border-2 border-gray-100">
               <img src="https://picsum.photos/id/447/200/200" alt="My Story" className="w-full h-full rounded-full object-cover opacity-80" />
               <div className="absolute bottom-0 right-0 bg-brand-600 text-white rounded-full p-0.5 border-2 border-white">
                  <Plus size={14} />
               </div>
             </div>
             <span className="text-xs font-medium text-gray-500">Your Story</span>
          </div>

          {stories.map((story) => (
            <button 
              key={story.id} 
              className="flex flex-col items-center gap-1 group focus:outline-none"
              onClick={() => onStoryClick(story.id)}
            >
              <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full p-[3px] ${story.isSeen ? 'bg-gray-200' : 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-brand-600'} transition-transform duration-300 group-hover:scale-105`}>
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
                  <img src={story.authorAvatar} alt={story.authorName} className="w-full h-full object-cover" />
                </div>
              </div>
              <span className={`text-xs truncate max-w-[70px] ${story.isSeen ? 'text-gray-500 font-medium' : 'text-gray-900 font-bold'}`}>
                {story.authorName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryRail;