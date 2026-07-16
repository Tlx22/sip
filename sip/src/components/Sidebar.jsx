import React from 'react';

export default function Sidebar({ currentPage, setCurrentPage }) {
  // Navigation configuration array
  const navItems = [
    { id: 'home', label: 'Home Feed', icon: '🏠' },
    { id: 'map', label: 'Shared Spaces Map', icon: '📍' },
    { id: 'events', label: 'Events Hub', icon: '📅' },
    { id: 'community', label: 'Community Spaces', icon: '👥' },
    { id: 'games', label: 'Arcade & Games', icon: '🎮' },
    { id: 'settings', label: 'Profile & Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 h-full bg-white border-r border-gray-100 flex flex-col justify-between p-4 shadow-sm text-left">
      
      {/* --- TOP BRAND / HEADER SECTION --- */}
      <div className="space-y-6">
        <div className="px-3 py-2 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-800 flex items-center justify-center text-white font-serif font-black shadow-sm">
            C
          </div>
          <div>
            <h1 className="font-serif font-black text-xl text-emerald-800 tracking-tight leading-none">COCO</h1>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">Collective Hub</span>
          </div>
        </div>

        {/* --- CORE NAVIGATION PIPELINES --- */}
        <nav className="space-y-1">
          <span className="block px-3 text-[9px] font-black tracking-widest text-gray-400 uppercase mb-2">
            Main Directory
          </span>
          
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 select-none group border ${
                  isActive
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                    : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50 hover:text-slate-900'
                }`}
              >
                <span className={`text-base transition-transform group-hover:scale-110 duration-200 ${isActive ? 'filter drop-shadow' : ''}`}>
                  {item.icon}
                </span>
                <span className="flex-1 truncate">{item.label}</span>
                
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* --- BOTTOM SYSTEM CONTEXT CARD --- */}
      <div className="border-t border-gray-50 pt-4">
        <div 
          onClick={() => setCurrentPage('settings')}
          className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-100/70 transition-all group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-800/10 text-emerald-800 flex items-center justify-center font-bold text-sm shadow-inner group-hover:bg-emerald-800 group-hover:text-white transition-all duration-300">
            👤
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-slate-800 truncate leading-none">Active Profile</p>
            <p className="text-[10px] text-gray-400 truncate mt-1">Manage workspace</p>
          </div>
          <span className="text-gray-300 text-[10px] group-hover:text-emerald-800 transition-colors">→</span>
        </div>
      </div>

    </div>
  );
}