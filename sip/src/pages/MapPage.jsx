import React, { useState } from 'react';

const mockItems = [
  { id: 1, name: " Lau Pa Sat Food Village", category: "Food", desc: "Local hawker delights & satay street." },
  { id: 2, name: "Armenian Street Vault", category: "Hidden Gems", desc: "Secret underground art display alley." },
  { id: 3, name: "Dhoby Ghaut Green (High Density)", category: "Crowd Watch", desc: "Peak attendance alert: 85% capacity." },
  { id: 4, name: "National Museum Mapping", category: "Location", desc: "Main projection light show venue." }
];

export default function MapPage() {
  const [sliderMode, setSliderMode] = useState("search"); // "filter" (Left) or "search" (Right)
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockItems.filter(item => {
    if (sliderMode === "filter") {
      return activeCategory ? item.category === activeCategory : ["Food", "Hidden Gems", "Crowd Watch"].includes(item.category);
    }
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Explore Map</h1>
        <p className="text-sm text-gray-500">Discover interesting places and events.</p>
      </div>

      {/* Canvas Window */}
      <div className="relative w-full h-[580px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800">
        
        {/* --- NBC SNF SCOREBUG HEADS-UP DISPLAY --- */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4">
          <div className="relative flex items-center bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-full border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)] h-14 overflow-hidden px-2">
            
            {/* LEFT WING: Quick Mode Filters */}
            <div className={`flex-1 flex items-center justify-around gap-1 transition-all duration-300 px-2 ${sliderMode === 'filter' ? 'opacity-100 translate-x-0' : 'opacity-25 -translate-x-4 pointer-events-none'}`}>
              {["Food", "Hidden Gems", "Crowd Watch"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all ${activeCategory === cat ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md' : 'bg-slate-800/80 text-gray-200 border-slate-700 hover:border-amber-400/40'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* CENTER CONTROL DIAL (The SNF Medallion) */}
            <div className="relative z-40 shrink-0 w-28 h-12 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-amber-400 rounded-xl shadow-lg font-black text-center cursor-pointer select-none" onClick={() => { setSliderMode(sliderMode === "search" ? "filter" : "search"); setActiveCategory(null); setSearchQuery(""); }}>
              <span className="text-[9px] text-amber-400 tracking-widest font-bold">MAP PANEL</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] transition-colors ${sliderMode === 'filter' ? 'text-amber-400 font-extrabold' : 'text-gray-500'}`}>◀ FILT</span>
                <span className="text-gray-400 text-[9px]">|</span>
                <span className={`text-[10px] transition-colors ${sliderMode === 'search' ? 'text-amber-400 font-extrabold' : 'text-gray-500'}`}>SRCH ▶</span>
              </div>
            </div>

            {/* RIGHT WING: Input Search Text Field */}
            <div className={`flex-1 flex items-center transition-all duration-300 px-3 ${sliderMode === 'search' ? 'opacity-100 translate-x-0' : 'opacity-25 translate-x-4 pointer-events-none'}`}>
              <span className="text-gray-400 text-sm mr-2">🔍</span>
              <input
                type="text"
                value={searchQuery}
                placeholder="Type location destination..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white font-medium placeholder-slate-500 text-xs outline-none border-none"
              />
            </div>

          </div>

          {/* DYNAMIC RESULTS POPUP DROPDOWN */}
          {(searchQuery || activeCategory || sliderMode === 'filter') && (
            <div className="mt-2 bg-slate-950/95 backdrop-blur-md rounded-2xl border border-amber-400/30 shadow-2xl max-h-48 overflow-y-auto p-2 space-y-1 animate-in fade-in duration-200">
              {filteredItems.map(item => (
                <div key={item.id} className="p-2.5 hover:bg-slate-900 rounded-xl transition-colors border border-transparent hover:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-[9px] uppercase font-black bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-400/20">{item.category}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BACKGROUND MAP GRAPHIC GRID */}
        <div className="w-full h-full flex flex-col items-center justify-center bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px]">
          <div className="text-center opacity-40">
            <span className="text-5xl block">🏟️</span>
            <span className="text-[11px] text-slate-400 font-mono tracking-widest uppercase mt-3 block">HUD Canvas Display Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}