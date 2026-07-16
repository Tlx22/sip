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

// Expanded Singapore dataset
const initialLocations = [
  // --- FOOD ---
  { id: 1, name: "Maxwell Food Centre", type: "food", coordinates: [1.2804, 103.8448], info: "Iconic hawker center famous for Tian Tian Chicken Rice and local delights." },
  { id: 2, name: "Old Airport Road Food Centre", type: "food", coordinates: [1.3082, 103.8858], info: "One of Singapore's legendary food havens packed with char kway teow and hokkien mee." },
  { id: 3, name: "Chomp Chomp Food Centre", type: "food", coordinates: [1.3544, 103.8667], info: "Late-night favorite hotspot for sambal stingray and satay." },

  // --- HIDDEN GEMS ---
  { id: 4, name: "Bukit Timah Bouldering Quarry", type: "hidden gems", coordinates: [1.3620, 103.7740], info: "Scenic abandoned granite quarry with surrounding rustic hiking paths." },
  { id: 5, name: "Hampstead Wetlands Park", type: "hidden gems", coordinates: [1.4147, 103.8672], info: "A quiet, rustic sanctuary hidden away in Seletar Aerospace Park." },
  { id: 6, name: "Wessex Estate Trails", type: "hidden gems", coordinates: [1.2965, 103.7995], info: "Colonial-era black and white houses nestled in quiet, lush greenery." },

  // --- CULTURAL SHOPS ---
  { id: 7, name: "Sultan Gate Vinyls & Crafts", type: "cultural shops", coordinates: [1.3025, 103.8601], info: "Indie shop in Kampong Glam stocking vintage physical media and records." },
  { id: 8, name: "BooksActually Vintage Hub", type: "cultural shops", coordinates: [1.2842, 103.8315], info: "Charming independent bookstore promoting local literature and art zines." },
  { id: 9, name: "Katong Antique House", type: "cultural shops", coordinates: [1.3051, 103.9048], info: "A private museum shop filled with rich Peranakan heritage heirlooms." },

  // --- CROWD WATCH ---
  { id: 10, name: "Marina Bay Waterfront", type: "crowd watch", coordinates: [1.2852, 103.8545], info: "Highly crowded spot, especially during weekend drone shows and evening walks." },
  { id: 11, name: "Orchard Road Pedestrian Walk", type: "crowd watch", coordinates: [1.3024, 103.8379], info: "Heavy weekend foot traffic along the main shopping belts and street buskers." }
];

export default function MapPage() {
  const [locations] = useState(initialLocations);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapFocus, setMapFocus] = useState({ center: [1.3140, 103.8448], zoom: 12 });
  
  // viewMode handles the state for what section is active: 'filter' or 'search'
  const [viewMode, setViewMode] = useState("filter"); 

  const filteredLocations = locations.filter(loc => {
    const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (viewMode === "search" && filteredLocations.length > 0) {
      setMapFocus({ center: filteredLocations[0].coordinates, zoom: 15 });
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => (prev === "filter" ? "search" : "filter"));
  };

  return (
    <div className="flex-1 w-full text-left space-y-6 max-w-7xl mx-auto p-1">
      
      {/* Upper Header Banner */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">📍 Singapore Interactive Guide</h1>
        <p className="text-xs text-gray-400 mt-0.5">Explore local food havens, hidden gems, cultural media shops, and active zones.</p>
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

            {filteredLocations.map((loc) => (
              <Marker key={loc.id} position={loc.coordinates}>
                <Popup>
                  <div className="text-slate-900 p-1 font-sans text-xs max-w-[190px]">
                    <p className="font-bold border-b border-gray-100 pb-0.5 capitalize text-slate-950">{loc.name}</p>
                    <p className="text-[10px] mt-1 text-gray-600 leading-normal">{loc.info}</p>
                    <span className="inline-block mt-2 px-1.5 py-0.5 bg-amber-100 text-amber-800 font-bold text-[8px] uppercase tracking-wider rounded">
                      {loc.type}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* ========================================================= */}
        {/* 🎛️ ORIGINAL DUAL-SIDE CONSOLE PANEL INTERFACE            */}
        {/* ========================================================= */}
        <div className="absolute bottom-6 inset-x-4 sm:inset-x-6 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex flex-row items-center justify-between gap-4 bg-[#081026]/90 backdrop-blur-md border border-amber-500 rounded-full px-4 py-2 shadow-2xl pointer-events-auto w-full max-w-5xl overflow-x-auto no-scrollbar">
            
            {/* Left Side: Category Filters (Dimmed if search mode is active) */}
            <div className={`flex items-center gap-4 transition-opacity duration-300 ${viewMode === 'filter' ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}>
              {['all', 'food', 'hidden gems', 'cultural shops', 'crowd watch'].map((type) => {
                const isSelected = activeFilter === type && viewMode === 'filter';
                return (
                  <button
                    key={type}
                    disabled={viewMode !== 'filter'}
                    onClick={() => setActiveFilter(type)}
                    className={`text-[10px] font-bold tracking-wider uppercase whitespace-nowrap select-none transition-all duration-150 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 font-black px-4 py-2 rounded-full shadow-md scale-105'
                        : 'text-slate-300 hover:text-white px-2 py-2'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Center Component: Interactive Switcher Toggle */}
            <button
              onClick={toggleViewMode}
              className={`flex flex-col items-center justify-center bg-[#060c1f] border rounded-xl px-4 py-1.5 transition-all active:scale-95 cursor-pointer select-none shrink-0 ${
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

            {/* Right Side: Search Input Frame (Dimmed if filter mode is active) */}
            <form 
              onSubmit={handleSearchSubmit} 
              className={`relative flex items-center min-w-[200px] sm:w-[280px] transition-opacity duration-300 ${viewMode === 'search' ? 'opacity-100' : 'opacity-25 pointer-events-none'}`}
            >
              <span className="absolute left-3 text-xs opacity-75">🔮</span>
              <input
                type="text"
                placeholder="Type location..."
                value={searchQuery}
                disabled={viewMode !== 'search'}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-8 pr-12 py-1.5 bg-slate-950 text-white placeholder-slate-500 text-[11px] font-medium rounded-full border transition-all ${
                  viewMode === 'search' ? 'border-amber-400/80 focus:outline-none focus:border-amber-400' : 'border-slate-800'
                }`}
              />
              <button
                type="submit"
                disabled={viewMode !== 'search'}
                className="absolute right-2 px-2.5 py-0.5 text-[9px] font-black uppercase bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700"
              >
                Go
              </button>
            </form>

          </div>
        </div>
        {/* ========================================================= */}

      </div>
    </div>
  );
}