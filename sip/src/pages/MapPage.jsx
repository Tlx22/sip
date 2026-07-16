import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker asset reference bugs in React build bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const mockItems = [
  { id: 1, name: "Lau Pa Sat Food Village", category: "Food", desc: "Local hawker delights & satay street.", coords: [1.2806, 103.8504] },
  { id: 2, name: "Armenian Street Vault", category: "Hidden Gems", desc: "Secret underground art display alley.", coords: [1.2942, 103.8492] },
  { id: 3, name: "Dhoby Ghaut Green", category: "Crowd Watch", desc: "Peak attendance alert: 85% capacity.", coords: [1.2993, 103.8454] },
  { id: 4, name: "National Museum Mapping", category: "Location", desc: "Main projection light show venue.", coords: [1.2966, 103.8485] }
];

function MapRecenter({ coords }) {
  const map = useMap();
  if (coords) {
    map.setView(coords, 16, { animate: true, duration: 1.5 });
  }
  return null;
}

export default function MapPage() {
  const [sliderMode, setSliderMode] = useState("search");
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoords, setSelectedCoords] = useState(null);

  const filteredItems = mockItems.filter(item => {
    if (sliderMode === "filter") {
      return activeCategory ? item.category === activeCategory : ["Food", "Hidden Gems", "Crowd Watch"].includes(item.category);
    }
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleItemSelect = (item) => {
    setSelectedCoords(item.coords);
    if (sliderMode === "search") {
      setSearchQuery(item.name);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Explore Map</h1>
        <p className="text-sm text-gray-500">Discover interesting places and events.</p>
      </div>

      {/* Frame Container Window - Set relative and explicit height block */}
      <div className="relative w-full h-[580px] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl border border-slate-800 z-0">
        
        {/* LIVE RENDER MAP CONTAINER LAYER */}
        <MapContainer 
          center={[1.2906, 103.8504]} 
          zoom={13} 
          zoomControl={false}
          style={{ width: '100%', height: '100%' }}
          className="w-full h-full z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {mockItems.map((item) => (
            <Marker key={item.id} position={item.coords}>
              <Popup>
                <div className="p-1 font-sans">
                  <span className="text-[9px] uppercase font-black tracking-wider text-emerald-600 block mb-0.5">{item.category}</span>
                  <strong className="text-xs text-slate-900 block">{item.name}</strong>
                  <p className="text-[10px] text-slate-600 mt-1 m-0 leading-tight">{item.desc}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapRecenter coords={selectedCoords} />
        </MapContainer>

        {/* HUD FLOATING CONTROL STACK BAR CONTAINER */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-2xl px-4 flex flex-col items-center pointer-events-auto">
          
          {/* POPUP RESULT VIEWS */}
          {(searchQuery || activeCategory || sliderMode === 'filter') && (
            <div className="w-full mb-3 bg-slate-950/95 backdrop-blur-md rounded-2xl border border-amber-400/30 shadow-2xl max-h-48 overflow-y-auto p-2 space-y-1 animate-in slide-in-from-bottom-2 duration-200">
              {filteredItems.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => handleItemSelect(item)}
                  className="w-full text-left p-2.5 hover:bg-slate-900 rounded-xl transition-colors border border-transparent hover:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{item.desc}</p>
                  </div>
                  <span className="text-[9px] shrink-0 font-black bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-md border border-amber-400/20">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* THE HUD INTERACTIVE TOGGLE SCOREBUG BAR */}
          <div className="w-full flex items-center justify-between bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-full border-2 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)] min-h-[3.5rem] md:h-14 py-2 md:py-0 px-2 gap-2">
            
            <div className={`flex-1 flex items-center justify-center gap-1.5 transition-all duration-300 px-1 ${
              sliderMode === 'filter' ? 'opacity-100 translate-x-0' : 'opacity-25 -translate-x-2 pointer-events-none hidden md:flex'
            }`}>
              {["Food", "Hidden Gems", "Crowd Watch"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`text-[9px] md:text-[11px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-full border transition-all ${
                    activeCategory === cat 
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md' 
                      : 'bg-slate-800/80 text-gray-200 border-slate-700 hover:border-amber-400/40'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div 
              onClick={() => { 
                setSliderMode(sliderMode === "search" ? "filter" : "search"); 
                setActiveCategory(null); 
                setSearchQuery(""); 
                setSelectedCoords(null);
              }}
              className="relative z-40 shrink-0 w-24 md:w-28 h-10 md:h-11 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-amber-400 rounded-xl shadow-lg font-black text-center cursor-pointer select-none active:scale-95 transition-transform"
            >
              <span className="text-[8px] text-amber-400 tracking-widest font-bold">MAP PANEL</span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[9px] transition-colors ${sliderMode === 'filter' ? 'text-amber-400 font-extrabold' : 'text-gray-500'}`}>◀ FILT</span>
                <span className="text-gray-600 text-[8px]">|</span>
                <span className={`text-[9px] transition-colors ${sliderMode === 'search' ? 'text-amber-400 font-extrabold' : 'text-gray-500'}`}>SRCH ▶</span>
              </div>
            </div>

            <div className={`flex-1 flex items-center transition-all duration-300 px-2 ${
              sliderMode === 'search' ? 'opacity-100 translate-x-0' : 'opacity-25 translate-x-2 pointer-events-none hidden md:flex'
            }`}>
              <span className="text-gray-400 text-xs md:text-sm mr-1.5">🔍</span>
              <input
                type="text"
                value={searchQuery}
                placeholder="Type location..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white font-medium placeholder-slate-500 text-[11px] md:text-xs outline-none border-none"
              />
            </div>

          </div>
          
        </div>

      </div>
    </div>
  );
}