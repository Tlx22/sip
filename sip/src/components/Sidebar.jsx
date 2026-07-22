import React from 'react';

export default function Sidebar({ currentPage, setCurrentPage }) {
  const links = [
    { id: 'home', label: 'Home Feed', icon: '🏠' },
    { id: 'map', label: 'Shared Spaces Map', icon: '📍' },
    { id: 'events', label: 'Events Hub', icon: '🗓️' },
    { id: 'community', label: 'Community Spaces', icon: '👥' },
    { id: 'games', label: 'Arcade & Games', icon: '🎮' },
  ];

  return (
    <aside className="w-68 bg-white border-r border-gray-100 flex flex-col justify-between p-6 h-screen shrink-0 text-left">
      <div className="space-y-7">
        
        {/* COCO Brand Header Logo */}
        <div className="flex items-center gap-3 px-2 py-1 select-none">
          <div className="w-11 h-11 bg-[#046A4E] rounded-2xl flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
            C
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-xl text-[#046A4E] tracking-tight leading-none mb-0.5">Co-Co</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none">Collective Hub</span>
          </div>
        </div>

        {/* Directory Group Label */}
        <div className="space-y-3">
          <div className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Main Directory
          </div>
          
          {/* Navigation Link Stack */}
          <nav className="space-y-1.5">
            {links.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (typeof setCurrentPage === 'function') {
                      setCurrentPage(link.id);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all relative ${
                    isActive
                      ? 'bg-[#046A4E] text-white shadow-md shadow-emerald-900/10 font-black'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-4 text-xs uppercase tracking-wider">
                    <span className="text-base filter drop-shadow-sm">{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                  
                  {/* Right hand dot indicator for active tab status */}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white/80 absolute right-4 top-1/2 -translate-y-1/2" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Pinned Bottom Workspace Active Profile Card */}
      <div 
        onClick={() => setCurrentPage('settings')}
        className="bg-slate-50 border border-slate-100/60 rounded-2xl p-3 flex items-center justify-between cursor-pointer hover:bg-slate-100/80 transition-all group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200/70 flex items-center justify-center text-slate-600">
            👤
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-900 leading-tight">Active Profile</span>
            <span className="text-[10px] text-slate-400 font-medium">Manage workspace</span>
          </div>
        </div>
        <span className="text-slate-300 group-hover:text-slate-500 text-xs transition-colors pr-1">→</span>
      </div>

    </aside>
  );
}