import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

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
      
      {/* Top Header Section */}
      <div className="shrink-0">
        <h1 className="text-2xl font-serif font-bold text-gray-950 tracking-tight">
          📍 Singapore Interactive Guide
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Explore local food havens, hidden gems, cultural media shops, and active zones.
        </p>
      </div>

      {/* RESTORED MAP CONTAINER VIEWPORT */}
      <div className="flex-1 w-full rounded-[2.5rem] bg-[#0E131F] border border-slate-950 shadow-inner overflow-hidden relative">
        
        {/* If you are using a custom background image map layout, make sure to insert your asset layer element back here: */}
        {/* <img src="/path-to-your-singapore-dark-map.png" className="absolute inset-0 w-full h-full object-cover" alt="Map View" /> */}

        {/* Dynamic Map Pins */}
        <div className="absolute top-[40%] left-[45%] text-sky-400 cursor-pointer z-10 animate-pulse">
          <MapPin size={28} fill="currentColor" className="text-sky-500/20" />
        </div>
        <div className="absolute top-[55%] left-[38%] text-amber-500 cursor-pointer z-10 animate-pulse">
          <MapPin size={28} fill="currentColor" className="text-amber-500/20" />
        </div>
        <div className="absolute top-[48%] left-[62%] text-emerald-400 cursor-pointer z-10 animate-pulse">
          <MapPin size={28} fill="currentColor" className="text-emerald-500/20" />
        </div>

        {/* RESTORED & UPGRADED ORANGE THEMED BOTTOM PILL CONTROLS DECK */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-[#090D1A]/90 backdrop-blur-md border-2 border-amber-500/60 rounded-full px-5 py-2.5 flex items-center justify-between gap-4 z-30 shadow-2xl">
          
          {/* CONDITION 1: SCROLLABLE FILTERS VIEW */}
          {panelMode === 'filt' && (
            <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth py-0.5">
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
                    className={`shrink-0 text-xs font-black tracking-widest px-4 py-1.5 rounded-full transition-all duration-150 ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-black shadow-md scale-105'
                        : 'text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* CONDITION 2: UPWARD POPPING SEARCH FIELDS */}
          {panelMode === 'srch' && (
            <div className="flex-1 relative">
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute bottom-full left-0 right-0 mb-4 bg-[#090D1A]/95 backdrop-blur-lg border border-amber-500/40 rounded-2xl shadow-2xl max-h-56 overflow-y-auto p-2 space-y-1 z-50">
                  <div className="px-2.5 py-1 text-[9px] font-black tracking-widest text-slate-500 uppercase border-b border-slate-800 mb-1">
                    Matching Search Results
                  </div>
                  {filteredSuggestions.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc.name)}
                      className="w-full text-left p-2 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-3 text-slate-200"
                    >
                      <span className="p-1 bg-slate-700 rounded-md text-amber-500">
                        <MapPin size={12} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold truncate">{loc.name}</h4>
                        <p className="text-[9px] text-slate-400 truncate">{loc.area} Area</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="relative flex items-center">
                <Search className="absolute left-3 text-slate-400" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  placeholder="Type location..."
                  className="w-full bg-slate-900/80 border border-slate-800 text-white rounded-full py-1.5 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-amber-500/50"
                />
              </div>

              {showSuggestions && (
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowSuggestions(false)} />
              )}
            </div>
          )}

          {/* RIGHT SWITCH CONTROLLER SWITCHBOARD LAYER */}
          <div className="shrink-0 flex items-center border-l border-slate-800 pl-3">
            <div className="border border-amber-500/30 bg-slate-950/60 rounded-xl px-2.5 py-1 flex items-center gap-2">
              <span className="text-[8px] font-black tracking-widest text-slate-500 uppercase hidden sm:inline">
                MAP PANEL
              </span>
              <div className="flex items-center gap-2 text-[9px] font-black text-slate-400">
                <button 
                  onClick={() => setPanelMode('filt')} 
                  className={`transition-colors ${panelMode === 'filt' ? 'text-amber-400 font-extrabold' : 'hover:text-white'}`}
                >
                  ◀ FILT
                </button>
                <span className="text-slate-700">|</span>
                <button 
                  onClick={() => setPanelMode('srch')} 
                  className={`transition-colors ${panelMode === 'srch' ? 'text-amber-400 font-extrabold' : 'hover:text-white'}`}
                >
                  SRCH ▶
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="absolute bottom-0 right-0 bg-slate-950/80 text-[9px] font-medium tracking-tight text-slate-500 px-3 py-1 rounded-tl-xl border-t border-l border-slate-900 z-10">
          Leaflet Engine Framework Map View Canvas 
        </div>

      </div>
    </div>
  );
}