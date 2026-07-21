import React, { useState } from 'react';

// Mock data
const upcomingEvents = [
  {
    id: 1,
    title: "Nature Walk & Clean-up",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    title: "Community Coffee & Read",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "Tech & Design Co-working",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    title: "Dinner & Cultural Exchange",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('homepage');

  return (
    <div className="flex h-screen w-screen bg-[#f8faf9] text-slate-800 font-sans overflow-hidden">
      
      {/* 🟢 1. SINGLE COMPACT LEFT SIDEBAR */}
      <aside className="w-20 bg-[#e8f3ee] border-r border-emerald-100 flex flex-col items-center justify-between py-6 shrink-0 z-20">
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Top Profile Avatar Button */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-11 h-11 rounded-full bg-white border shadow-sm flex items-center justify-center text-xl transition-all ${
              activeTab === 'profile' ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-emerald-200 hover:scale-105'
            }`}
            title="Profile"
          >
            👤
          </button>

          {/* Navigation Icons */}
          <nav className="flex flex-col gap-4 w-full px-2">
            {[
              { id: 'homepage', label: 'homepage', icon: '🏠' },
              { id: 'events', label: 'events', icon: '📅' },
              { id: 'community', label: 'community', icon: '👥' },
              { id: 'map', label: 'map', icon: '🗺️' },
              { id: 'games', label: 'games', icon: '🎮' },
              { id: 'profile', label: 'profile', icon: '👤' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 font-bold'
                      : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-100/50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[10px] mt-0.5 font-semibold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Version Tag */}
        <div className="text-[9px] font-mono text-emerald-600/70 tracking-tight select-none">
          COCO v1.0
        </div>
      </aside>

      {/* ⚪ 2. MAIN MIDDLE WORKSPACE */}
      <main className="flex-1 h-full overflow-y-auto p-8 space-y-8">
        
        {/* Mission Banner Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md space-y-4">
            <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Our Mission
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Grow2gether aims to inspire users to initiate and foster harmonious communities in Singapore.
            </p>
            <button className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors">
              Read more
            </button>
          </div>

          <div className="w-full md:w-[380px] h-48 rounded-2xl bg-gradient-to-tr from-amber-100 via-emerald-100 to-teal-200 flex items-center justify-center border border-white/60 shadow-inner p-4 text-center">
            <span className="text-xs font-mono text-slate-500 bg-white/70 px-3 py-1.5 rounded-md backdrop-blur-sm">
              [ Canva Mission Asset Image Here ]
            </span>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Upcoming Events
          </h2>

          <div className="relative flex items-center">
            <button className="absolute -left-4 z-10 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-slate-700 text-xs">
              &lt;
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col space-y-3">
                  <div className="h-36 rounded-xl overflow-hidden bg-slate-100">
                    <img 
                      src={evt.image} 
                      alt={evt.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <button className="w-full py-2 bg-[#e8f3ee] hover:bg-[#d8e8e0] text-emerald-900 text-xs font-bold rounded-xl transition-colors">
                    Sign up
                  </button>
                </div>
              ))}
            </div>

            <button className="absolute -right-4 z-10 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-400 hover:text-slate-700 text-xs">
              &gt;
            </button>
          </div>
        </div>

      </main>

      {/* 💬 3. SINGLE RIGHT MESSAGING PANEL */}
      <aside className="w-80 bg-white border-l border-slate-100 flex flex-col justify-between p-5 shrink-0 z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-slate-900">Messaging</h3>
            <span className="text-slate-400 text-sm">💬</span>
          </div>

          <button className="w-full py-2 px-3 border border-dashed border-emerald-300 bg-[#f4f9f6] text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#e8f3ee] transition-colors">
            <span>+</span> Add friends
          </button>

          <div className="h-[420px] rounded-2xl bg-[#fbfdfc] border border-slate-100 flex flex-col items-center justify-center p-6 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-lg mb-1">
              👥
            </div>
            <p className="text-xs font-bold text-slate-700">No active conversations</p>
            <p className="text-[11px] text-slate-400 leading-normal">
              Add friends to start sharing and coordinating activities.
            </p>
          </div>
        </div>

        <button className="w-full py-2.5 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors">
          Read more
        </button>
      </aside>

    </div>
  );
}