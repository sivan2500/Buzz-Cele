
import React, { useState } from 'react';
import { Image, Upload, Grid, List, MoreVertical, Trash2, ExternalLink, Scissors, Video, HardDrive } from 'lucide-react';

const mockMedia = [
  { id: 1, type: 'image', url: 'https://picsum.photos/300/200?random=1', name: 'red-carpet-zendaya.jpg', size: '1.2 MB', date: '2024-03-10' },
  { id: 2, type: 'video', url: 'https://picsum.photos/300/200?random=2', name: 'veo-gen-met-gala.mp4', size: '14.5 MB', date: '2024-03-09' },
  { id: 3, type: 'image', url: 'https://picsum.photos/300/200?random=3', name: 'royal-scandal-cover.png', size: '2.4 MB', date: '2024-03-08' },
  { id: 4, type: 'image', url: 'https://picsum.photos/300/200?random=4', name: 'taylor-swift-concert.jpg', size: '3.1 MB', date: '2024-03-08' },
  { id: 5, type: 'image', url: 'https://picsum.photos/300/200?random=5', name: 'fashion-week-paris.jpg', size: '1.8 MB', date: '2024-03-07' },
  { id: 6, type: 'video', url: 'https://picsum.photos/300/200?random=6', name: 'oscars-recap-ai.mp4', size: '22 MB', date: '2024-03-06' },
];

const MediaManager = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Image className="text-brand-600" /> Media Library
          </h1>
          <p className="text-gray-500 text-sm">Manage images and Veo videos.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">
              <Upload size={16} /> Upload
           </button>
           <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button onClick={() => setView('grid')} className={`p-2 rounded ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}><Grid size={18} /></button>
              <button onClick={() => setView('list')} className={`p-2 rounded ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400'}`}><List size={18} /></button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         {/* Sidebar Stats */}
         <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><HardDrive size={18} /> Storage</h3>
               <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                     <span className="text-xs font-semibold inline-block text-brand-600">75% Used</span>
                     <span className="text-xs font-semibold inline-block text-gray-600">15GB / 20GB</span>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-brand-100">
                     <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-500"></div>
                  </div>
               </div>
               <button className="w-full py-2 text-xs font-bold text-brand-600 border border-brand-200 rounded hover:bg-brand-50">Upgrade Storage</button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
               <h3 className="font-bold text-gray-900 mb-4">Quick Filters</h3>
               <div className="space-y-2">
                  <button className="w-full text-left px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 flex justify-between">
                     <span>Images</span> <span className="bg-gray-100 px-2 rounded-full text-xs py-0.5 text-gray-500">1,204</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 flex justify-between">
                     <span>Videos (Veo)</span> <span className="bg-gray-100 px-2 rounded-full text-xs py-0.5 text-gray-500">450</span>
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded text-sm font-medium hover:bg-gray-50 flex justify-between">
                     <span>Documents</span> <span className="bg-gray-100 px-2 rounded-full text-xs py-0.5 text-gray-500">32</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Asset Grid */}
         <div className="lg:col-span-3">
            {view === 'grid' ? (
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {mockMedia.map(item => (
                     <div key={item.id} className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all relative">
                        <div className="aspect-square bg-gray-100 relative flex items-center justify-center">
                           {item.type === 'video' ? (
                              <Video size={32} className="text-gray-400" />
                           ) : (
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                           )}
                           
                           {/* Hover Overlay */}
                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                              <button className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 hover:bg-gray-100">
                                 <ExternalLink size={12} /> View
                              </button>
                              <button className="bg-white text-gray-900 px-3 py-1 rounded text-xs font-bold flex items-center gap-1 hover:bg-gray-100">
                                 <Scissors size={12} /> Crop
                              </button>
                           </div>
                        </div>
                        <div className="p-3">
                           <p className="text-xs font-bold text-gray-900 truncate mb-1" title={item.name}>{item.name}</p>
                           <div className="flex justify-between items-center text-[10px] text-gray-500">
                              <span>{item.size}</span>
                              <button className="hover:text-red-500"><Trash2 size={12} /></button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                     <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                           <th className="px-4 py-3">File</th>
                           <th className="px-4 py-3">Name</th>
                           <th className="px-4 py-3">Size</th>
                           <th className="px-4 py-3">Date</th>
                           <th className="px-4 py-3 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {mockMedia.map(item => (
                           <tr key={item.id} className="hover:bg-gray-50">
                              <td className="px-4 py-2">
                                 <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden">
                                    <img src={item.url} className="w-full h-full object-cover" />
                                 </div>
                              </td>
                              <td className="px-4 py-2 font-medium">{item.name}</td>
                              <td className="px-4 py-2 text-gray-500">{item.size}</td>
                              <td className="px-4 py-2 text-gray-500">{item.date}</td>
                              <td className="px-4 py-2 text-right">
                                 <button className="text-gray-400 hover:text-gray-600"><MoreVertical size={16} /></button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MediaManager;
