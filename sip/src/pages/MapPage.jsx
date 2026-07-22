import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default Leaflet marker assets in production builds
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Layout sizing safe-guard hook
function MapResizeTrigger() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// Map frame controller
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 0.8 });
    }
  }, [center, zoom, map]);
  return null;
}

// Helper to determine badge & bar color based on crowd level
const getCrowdStatus = (level) => {
  switch (level) {
    case 'low':
      return { label: 'Not Busy', color: 'bg-emerald-500', text: 'text-emerald-700', bg: 'bg-emerald-100' };
    case 'medium':
      return { label: 'Kinda Busy', color: 'bg-amber-500', text: 'text-amber-800', bg: 'bg-amber-100' };
    case 'high':
      return { label: 'Crowded', color: 'bg-rose-500', text: 'text-rose-800', bg: 'bg-rose-100' };
    default:
      return { label: 'Unknown', color: 'bg-gray-400', text: 'text-gray-700', bg: 'bg-gray-100' };
  }
};

// Updated Singapore locations reflecting MDW & MW communities + Crowd Watch features
const initialLocations = [
  // FOOD: Authentic home country cuisines
  { 
    id: 1, 
    name: "Lucky Plaza (Jollibee & Carinderias)", 
    type: "food", 
    coordinates: [1.3045, 103.8341], 
    info: "Popular hub for authentic Filipino dishes like Lechon Kawali, Sinigang, and Jollibee.",
    crowd: { level: "high", percentage: 85, hasCam: true, camUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
  },
  { 
    id: 2, 
    name: "City Plaza (Penyet & Padang Outlets)", 
    type: "food", 
    coordinates: [1.3148, 103.8927], 
    info: "A favorite for Indonesian home-style cooking, Ayam Penyet, and traditional snacks.",
    crowd: { level: "medium", percentage: 55, hasCam: false }
  },
  { 
    id: 3, 
    name: "Peninsula Plaza (Little Yangon Eats)", 
    type: "food", 
    coordinates: [1.2922, 103.8509], 
    info: "The heart of Myanmar cuisine in SG—famous for Mohinga, Tea Leaf Salad, and Shan Noodles.",
    crowd: { level: "medium", percentage: 60, hasCam: true, camUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" }
  },
  { 
    id: 4, 
    name: "Mustafa/Desker Road Bangladeshi Dining", 
    type: "food", 
    coordinates: [1.3090, 103.8568], 
    info: "Authentic Bangladeshi eateries serving traditional Kacchi Biryani, Tehari, and Mustard Fish.",
    crowd: { level: "high", percentage: 90, hasCam: false }
  },

  // HIDDEN GEMS: Murals, art & spaces celebrating MW/MDW heritage
  { 
    id: 5, 
    name: "Little India Heritage Murals (Kerbau Rd)", 
    type: "hidden gems", 
    coordinates: [1.3061, 103.8518], 
    info: "Vibrant street art murals by Psyfool and Yip Yew Chong capturing traditional trades and migrant stories.",
    crowd: { level: "low", percentage: 25, hasCam: false }
  },
  { 
    id: 6, 
    name: "Kampong Glam Batik & Craft Murals", 
    type: "hidden gems", 
    coordinates: [1.3012, 103.8590], 
    info: "Colorful alleyways featuring Southeast Asian cultural heritage, batik motifs, and community art.",
    crowd: { level: "medium", percentage: 45, hasCam: false }
  },
  { 
    id: 7, 
    name: "Lemonade Mural at Tanjong Pagar", 
    type: "hidden gems", 
    coordinates: [1.2788, 103.8436], 
    info: "Street art celebrating community diversity and shared heritage amidst heritage shop houses.",
    crowd: { level: "low", percentage: 20, hasCam: false }
  },

  // CULTURAL SHOPS: Traditional clothing, groceries & native items
  { 
    id: 8, 
    name: "Peninsula Plaza Burmese Grocery & Tailors", 
    type: "cultural shops", 
    coordinates: [1.2925, 103.8505], 
    info: "Shops offering traditional Burmese Longyi (sarongs), Thanaka cosmetics, and imported goods.",
    crowd: { level: "medium", percentage: 50, hasCam: false }
  },
  { 
    id: 9, 
    name: "City Plaza Indonesian Batik & Hijab Fashion", 
    type: "cultural shops", 
    coordinates: [1.3145, 103.8931], 
    info: "Boutiques offering authentic Batik dresses, traditional Kebaya, and imported Indonesian spices.",
    crowd: { level: "low", percentage: 30, hasCam: false }
  },
  { 
    id: 10, 
    name: "Tekka Centre Spice & Sari Marts", 
    type: "cultural shops", 
    coordinates: [1.3063, 103.8507], 
    info: "Vibrant market for silk Saris, Kurti tops, South Asian spices, and traditional remedies.",
    crowd: { level: "high", percentage: 80, hasCam: true, camUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=600&q=80" }
  },

  // CROWD WATCH: Popular gathering spots on rest days
  { 
    id: 11, 
    name: "Paya Lebar Quarter Open Plaza", 
    type: "crowd watch", 
    coordinates: [1.3175, 103.8928], 
    info: "Lively Sunday gathering spot for MDWs to relax, share meals, and socialize on rest days.",
    crowd: { level: "high", percentage: 95, hasCam: true, camUrl: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=600&q=80" }
  },
  { 
    id: 12, 
    name: "Fort Canning Green Lawns", 
    type: "crowd watch", 
    coordinates: [1.2953, 103.8463], 
    info: "Popular scenic park lawn where groups gather for picnics, music, and rest day leisure.",
    crowd: { level: "medium", percentage: 40, hasCam: true, camUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80" }
  },
  { 
    id: 13, 
    name: "Mustafa Centre & Lembu Park Zone", 
    type: "crowd watch", 
    coordinates: [1.3101, 103.8553], 
    info: "Bustling gathering point for migrant workers to meet friends, shop, and catch up.",
    crowd: { level: "high", percentage: 88, hasCam: true, camUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80" }
  }
];

export default function MapPage() {
  const [locations] = useState(initialLocations);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapFocus, setMapFocus] = useState({ center: [1.3140, 103.8448], zoom: 12 });
  const [viewMode, setViewMode] = useState("filter"); // toggles between 'filter' and 'search'
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Modal state for viewing live cams
  const [selectedCamLoc, setSelectedCamLoc] = useState(null);

  // Live matching results array evaluated as the user types
  const liveSuggestions = searchQuery.trim().length > 0
    ? locations.filter(loc => loc.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const filteredLocations = locations.filter(loc => {
    const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (viewMode === "search" && filteredLocations.length > 0) {
      setMapFocus({ center: filteredLocations[0].coordinates, zoom: 15 });
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (loc) => {
    setSearchQuery(loc.name);
    setMapFocus({ center: loc.coordinates, zoom: 16 });
    setShowSuggestions(false);
  };

  const toggleViewMode = () => {
    setViewMode(prev => (prev === "filter" ? "search" : "filter"));
    setShowSuggestions(false);
  };

  return (
    <div className="flex-1 w-full text-left space-y-6 max-w-7xl mx-auto p-1">
      
      {/* Upper Header Banner */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">📍 Singapore Community Map</h1>
        <p className="text-xs text-gray-400 mt-0.5">Explore authentic home cuisines, cultural shops, heritage murals, and crowd watch zones.</p>
      </div>

      {/* Map Main Workspace Frame */}
      <div className="bg-[#050B1E] rounded-3xl border border-slate-950 shadow-2xl overflow-hidden p-3 relative flex flex-col min-h-[550px] h-[70vh] w-full">
        
        {/* Leaflet Map Window */}
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden relative z-10 bg-slate-950">
          <MapContainer center={mapFocus.center} zoom={mapFocus.zoom} zoomControl={false} className="h-full w-full">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; CARTO'
            />
            <MapResizeTrigger />
            <ChangeMapView center={mapFocus.center} zoom={mapFocus.zoom} />

            {filteredLocations.map((loc) => {
              const status = getCrowdStatus(loc.crowd.level);

              return (
                <Marker key={loc.id} position={loc.coordinates}>
                  <Popup>
                    <div className="text-slate-900 p-1.5 font-sans text-xs max-w-[210px]">
                      <p className="font-bold border-b border-gray-100 pb-0.5 capitalize text-slate-950">{loc.name}</p>
                      <p className="text-[10px] mt-1 text-gray-600 leading-normal">{loc.info}</p>
                      
                      {/* CROWD WATCH BAR SECTION */}
                      <div className="mt-2.5 pt-2 border-t border-gray-100">
                        <div className="flex justify-between items-center text-[10px] mb-1">
                          <span className="font-semibold text-gray-500">Live Crowd Level:</span>
                          <span className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                        </div>

                        {/* Crowd Visual Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${status.color}`} 
                            style={{ width: `${loc.crowd.percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* LIVE CAMERA BUTTON (If location has cam) */}
                      {loc.crowd.hasCam && (
                        <button
                          type="button"
                          onClick={() => setSelectedCamLoc(loc)}
                          className="mt-2.5 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] py-1 px-2 rounded flex items-center justify-center gap-1 transition-colors shadow-sm cursor-pointer"
                        >
                          <span>📹</span> View Live Cam Feed
                        </button>
                      )}

                      <span className="inline-block mt-2 px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold text-[8px] uppercase tracking-wider rounded">
                        {loc.type}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* ========================================================= */}
        {/* 🎛️ DYNAMIC SLIDING CENTERED CAPSULE CONTROL CONSOLE      */}
        {/* ========================================================= */}
        <div className="absolute bottom-6 inset-x-4 sm:inset-x-6 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex flex-row items-center justify-center gap-2 bg-[#081026]/95 backdrop-blur-md border border-amber-500 rounded-full px-3 py-2 shadow-2xl pointer-events-auto transition-all duration-500 ease-in-out overflow-visible max-w-full">
            
            {/* Left Box Panel: Sliding & Touch-Scrollable Category Filters */}
            <div 
              className={`flex items-center gap-2 transition-all duration-500 ease-in-out scrollbar-none ${
                viewMode === 'filter' 
                  ? 'max-w-[80vw] sm:max-w-[500px] opacity-100 overflow-x-auto touch-pan-x pr-1 py-1' 
                  : 'max-w-0 opacity-0 pointer-events-none overflow-hidden'
              }`}
            >
              {['all', 'food', 'hidden gems', 'cultural shops', 'crowd watch'].map((type) => {
                const isSelected = activeFilter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`text-[10px] font-black tracking-wider uppercase whitespace-nowrap select-none shrink-0 transition-all duration-150 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-full shadow-md scale-105'
                        : 'text-slate-400 hover:text-white px-2.5 py-1.5'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Center Component: Anchor Switcher Toggle */}
            <button
              onClick={toggleViewMode}
              className={`flex flex-col items-center justify-center bg-[#060c1f] border rounded-xl px-3 py-1 transition-all active:scale-95 cursor-pointer select-none shrink-0 ${
                viewMode === 'filter' ? 'border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.2)]' : 'border-slate-700'
              }`}
            >
              <span className="text-[8px] font-black tracking-widest text-amber-500 uppercase mb-0.5">Map Panel</span>
              <div className="flex items-center gap-1 text-[9px] font-bold font-mono">
                <span className={viewMode === 'filter' ? 'text-blue-400' : 'text-slate-500'}>◀ FILT</span>
                <span className="text-slate-700">|</span>
                <span className={viewMode === 'search' ? 'text-amber-400' : 'text-slate-500'}>SRCH ▶</span>
              </div>
            </button>

            {/* Right Box Panel: Sliding Search Input Box Wrapper */}
            <div 
              className={`relative flex items-center transition-all duration-500 ease-in-out ${
                viewMode === 'search' 
                  ? 'w-[240px] sm:w-[300px] opacity-100 pl-1' 
                  : 'w-0 opacity-0 pointer-events-none overflow-hidden'
              }`}
            >
              {/* INSTANT INTERACTIVE RESULTS DRAWER */}
              {showSuggestions && liveSuggestions.length > 0 && (
                <div className="absolute bottom-full mb-3 left-1 right-0 bg-[#081026]/95 backdrop-blur-md border border-amber-500/40 rounded-2xl shadow-2xl max-h-48 overflow-y-auto p-1.5 space-y-0.5 z-50">
                  {liveSuggestions.map((loc) => (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(loc)}
                      className="w-full text-left px-3 py-2 rounded-xl text-slate-200 hover:bg-slate-800/80 hover:text-white transition-colors flex flex-col gap-0.5"
                    >
                      <span className="text-xs font-bold tracking-tight">{loc.name}</span>
                      <span className="text-[9px] font-medium uppercase text-amber-500/80 tracking-wide">{loc.type}</span>
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSearchSubmit} className="relative w-full flex items-center">
                <span className="absolute left-3 text-xs opacity-75">🔮</span>
                <input
                  type="text"
                  placeholder="Type location..."
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  className="w-full pl-9 pr-12 py-1.5 bg-slate-950 text-white placeholder-slate-500 text-[11px] font-medium rounded-full border border-amber-500 focus:outline-none focus:border-amber-400 transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-2.5 py-0.5 text-[9px] font-black uppercase bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700"
                >
                  Go
                </button>
              </form>

              {/* Overlay listener to close drawer on outside tap */}
              {showSuggestions && (
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowSuggestions(false)} />
              )}
            </div>

          </div>
        </div>
        {/* ========================================================= */}

      </div>

      {/* ========================================================= */}
      {/* 📹 LIVE CAMERA MODAL FEED                                */}
      {/* ========================================================= */}
      {selectedCamLoc && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-5 shadow-2xl text-white space-y-4 relative animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" /> Live Cam Feed
                </span>
                <h3 className="text-base font-bold mt-1 text-slate-100">{selectedCamLoc.name}</h3>
              </div>
              <button
                onClick={() => setSelectedCamLoc(null)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video / Snapshot Frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 group">
              <img 
                src={selectedCamLoc.crowd.camUrl} 
                alt={`Live view of ${selectedCamLoc.name}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 border border-slate-800">
                CAM_ID: #{selectedCamLoc.id}09 • 1080p
              </div>
            </div>

            {/* Stats Summary Footer */}
            <div className="flex justify-between items-center bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-mono">Current Occupancy</p>
                <p className="font-bold text-amber-400">{selectedCamLoc.crowd.percentage}% Capacity</p>
              </div>
              <button
                onClick={() => setSelectedCamLoc(null)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-xl text-xs transition-colors"
              >
                Close Stream
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}