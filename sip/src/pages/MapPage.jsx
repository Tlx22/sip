import React, { useState } from 'react';
import { Search, MapPin, Layers } from 'lucide-react';

// Centralized location corpus database
const communityLocations = [
  { id: 'loc-1', name: 'Maxwell Community Studio Booth', area: 'Central', category: 'media', description: 'Co-working and podcasting facilities.' },
  { id: 'loc-2', name: 'Redhill Bouldering Slab Hub', area: 'Queenstown', category: 'active', description: 'Public climbing wall facility.' },
  { id: 'loc-3', name: 'Kampong Glam Music Jam Space', area: 'Rochor', category: 'media', description: 'Acoustic instruments and drums array.' },
  { id: 'loc-4', name: 'Tampines Green Ridge Study Corner', area: 'East', category: 'heritage', description: 'Quiet dynamic collaborative workspace spaces.' },
  { id: 'loc-5', name: 'Old Airport Road Hawker Hub', area: 'Mountbatten', category: 'food', description: 'Legendary local food stalls.' },
  { id: 'loc-6', name: 'Zion Riverside Food Centre', area: 'River Valley', category: 'food', description: 'Popular riverside char kway teow master.' }
];

export default function MapPage() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [panelMode, setPanelMode] = useState('filt'); // 'filt' or 'srch'
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter map suggestions dynamically based on user input string lengths
  const filteredSuggestions = searchQuery.trim().length > 0 
    ? communityLocations.filter(loc => 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        loc.area.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectLocation = (locationName) => {
    setSearchQuery(locationName);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 text-left relative h-[calc(100vh-8rem)] flex flex-col">
      
      {/* Top Title Header Section */}
      <div className="shrink-0">
        <h1 className="text-2xl font-serif font-bold text-gray-950 tracking-tight">
          📍 Singapore Interactive Guide
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Explore local food havens, hidden gems, cultural media shops, and active zones.
        </p>
      </div>

      {/* Main Map Viewport Canvas Wrapper Container */}
      <div className="flex-1 w-full rounded-[2.5rem] bg-[#0B1220] border border-slate-900 shadow-inner overflow-hidden relative">
        
        {/* Mock Map Background Layer Canvas Grid Graphic */}
        <div className="absolute inset-0 opacity-20 pointer-events-none select-none bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* MOCK MAP PIN OVERLAYS */}
        <div className="absolute top-[40%] left-[45%] text-emerald-400 animate-bounce cursor-pointer z-10">
          <MapPin size={28} fill="currentColor" className="text-emerald-500/30" />
        </div>
        <div className="absolute top-[55%] left-[38%] text-amber-400 animate-bounce cursor-pointer z-10">
          <MapPin size={28} fill="currentColor" className="text-amber-500/30" />
        </div>
        <div className="absolute top-[60%] left-[58%] text-sky-400 animate-bounce cursor-pointer z-10">
          <MapPin size={28} fill="currentColor" className="text-sky-500/30" />
        </div>

        {/* DYNAMIC COMBINED FLOATING CONTROLS CONTROL PILL TRAY */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-[#0F172A]/90 backdrop-blur-md border border-slate-700/50 rounded-full px-4 py-2 flex items-center justify-between gap-3 z-30 shadow-2xl">
          
          {/* CONDITION 1: MODE CONTROLLER RENDERS HORIZONTALLY SCROLLABLE FILTER TRACK */}
          {panelMode === 'filt' && (
            <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth py-1 pr-1">
              {[
                { id: 'all', label: 'ALL' },
                { id: 'food', label: 'FOOD' },
                { id: 'heritage', label: 'HERITAGE' },
                { id: 'media', label: 'MEDIA' },
                { id: 'active', label: 'ACTIVE' }
              ].map((filter) => {
                const isActive = currentFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setCurrentFilter(filter.id)}
                    className={`shrink-0 text-[10px] font-black tracking-wider px-3.5 py-2 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md scale-105 font-black'
                        : 'text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* CONDITION 2: MODE CONTROLLER RENDERS LIVE AUTO-SUGGESTION UPWARD SEARCH CONTAINER */}
          {panelMode === 'srch' && (
            <div className="flex-1 relative">
              
              {/* UPWARD DYNAMIC AUTOCOMPLETE DROPDOWN SEARCH POPUP BOARD */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-4 bg-[#0F172A]/95 backdrop-blur-lg border border-slate-700/60 rounded-2xl shadow-2xl max-h-56 overflow-y-auto p-2 space-y-1 z-50 animate-in fade-in slide-in-from-bottom-3">
                  <div className="px-2.5 py-1 text-[9px] font-black tracking-widest text-slate-500 uppercase border-b border-slate-800/60 mb-1">
                    Locations Found
                  </div>
                  {filteredSuggestions.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc.name)}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors flex items-center gap-3 group text-slate-200"
                    >
                      <span className="p-1.5 bg-slate-800 rounded-lg group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        <MapPin size={12} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold truncate leading-tight">{loc.name}</h4>
                        <p className="text-[9px] text-slate-400 truncate">{loc.area} Area • {loc.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Input Core Node Layout */}
              <div className="relative flex items-center">
                <Search className="absolute left-3 text-slate-400 pointer-events-none" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  placeholder="Search locations..."
                  className="w-full bg-slate-900/60 border border-slate-800 text-white rounded-full py-1.5 pl-9 pr-4 text-xs font-medium placeholder-slate-500 outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
                />
              </div>

              {/* Transparent click catcher panel to dim suggestions context cleanly */}
              {showSuggestions && (
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowSuggestions(false)} />
              )}
            </div>
          )}

          {/* SECTION CONTROLLERS TOGGLE LOCK TRAY DECK */}
          <div className="shrink-0 flex items-center border-l border-slate-800 pl-3">
            <div className="border border-slate-800 bg-slate-950/40 rounded-xl px-2 py-1 flex items-center gap-2">
              <span className="text-[8px] font-extrabold tracking-widest text-slate-500 uppercase hidden sm:inline">
                Deck
              </span>
              <div className="flex items-center gap-1.5 text-[9px] font-black tracking-wide text-slate-400">
                <button 
                  onClick={() => setPanelMode('filt')} 
                  className={`px-1.5 py-0.5 rounded transition-colors ${panelMode === 'filt' ? 'text-amber-400 font-extrabold bg-slate-800/60' : 'hover:text-white'}`}
                >
                  FILT
                </button>
                <span className="text-slate-800 font-normal">|</span>
                <button 
                  onClick={() => setPanelMode('srch')} 
                  className={`px-1.5 py-0.5 rounded transition-colors ${panelMode === 'srch' ? 'text-amber-400 font-extrabold bg-slate-800/60' : 'hover:text-white'}`}
                >
                  SRCH
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Map Vendor Engine Bottom Tag Attribution Label Grid */}
        <div className="absolute bottom-0 right-0 bg-slate-900/90 text-[9px] font-medium tracking-tight text-slate-500 px-3 py-1 rounded-tl-xl border-t border-l border-slate-800 z-10">
          Leaflet Engine Framework Map View Canvas 
        </div>

      </div>
    </div>
  );
}