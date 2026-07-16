import React from 'react';
import { Home, Map, Calendar, Users, Gamepad2 } from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab }) {
  const links = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'map', label: 'Shared Spaces Map', icon: Map },
    { id: 'events', label: 'Events Hub', icon: Calendar },
    { id: 'community', label: 'Community Spaces', icon: Users },
    { id: 'arcade', label: 'Arcade & Games', icon: Gamepad2 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-4 min-h-screen">
      <div className="space-y-6">
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          Main Directory
        </div>
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wide transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-amber-400' : 'text-slate-400'} />
                {link.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Profile/Account interaction block remains anchored at the bottom */}
    </aside>
  );
}