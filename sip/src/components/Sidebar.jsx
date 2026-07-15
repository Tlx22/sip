import React from 'react';

export default function Sidebar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'home', label: 'homepage', icon: '🏠' },
    { id: 'events', label: 'events', icon: '📅' },
    { id: 'community', label: 'community', icon: '👥' },
    { id: 'map', label: 'map', icon: '🗺️' },
    { id: 'games', label: 'games', icon: '🎮' }
  ];

  return (
    <div className="w-28 bg-[#E6F3EE] flex flex-col items-center py-6 border-r border-gray-100 justify-between h-full">
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Top User Avatar */}
        <div 
          onClick={() => setCurrentPage('settings')}
          className="w-14 h-14 rounded-full bg-white border border-gray-200 shadow-sm cursor-pointer overflow-hidden hover:scale-105 transition-transform flex items-center justify-center"
        >
          <span className="text-2xl">👧🏻</span>
        </div>
        
        {/* Navigation buttons links */}
        <nav className="flex flex-col gap-4 w-full px-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center justify-center py-3 rounded-2xl w-full text-xs font-semibold transition-all ${
                currentPage === item.id 
                  ? 'text-emerald-800 bg-white shadow-sm' 
                  : 'text-gray-500 hover:bg-[#DCEDE6]'
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      
      <div className="text-[10px] text-emerald-700/60 font-mono tracking-wider">COCO v1.0</div>
    </div>
  );
}