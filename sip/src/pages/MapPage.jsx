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

// Expanded dataset featuring your real campus locations, food spots, and culture items
const initialLocations = [
  // --- HIDDEN GEMS ---
  { id: 1, name: "SP Bouldering Wall", type: "hidden gems", coordinates: [1.30983, 103.77751], info: "High-quality climbing training setup featuring routes from V1 up to V6 slabs." },
  { id: 2, name: "Dover Forest Eco-Trail", type: "hidden gems", coordinates: [1.31152, 103.78214], info: "A quiet, lush green canopy getaway right next to the MRT tracks." },
  { id: 3, name: "Aerohub Flight Simulator Lab", type: "hidden gems", coordinates: [1.30940, 103.77580], info: "Advanced aviation setups running specialized fleet simulator training." },

  // --- FOOD ---
  { id: 4, name: "Gourmet Kampong Food Center", type: "food", coordinates: [1.31205, 103.77622], info: "Famous for local roasted delights, economic rice, and traditional coffee." },
  { id: 5, name: "Food Court 5 (FC5)", type: "food", coordinates: [1.30840, 103.77970], info: "Huge selection of air-conditioned student food stalls and quick bites." },
  { id: 6, name: "Marrow & Mingle Cafe", type: "food", coordinates: [1.31020, 103.77810], info: "Great spot for specialty iced matcha lattees and studying between modules." },

  // --- CULTURAL SHOPS ---
  { id: 7, name: "SP Library Music & Media Zone", type: "cultural shops", coordinates: [1.30910, 103.77820], info: "Stocked with audio gear and resources perfect for checking out music arrangements." },
  { id: 8, name: "Campus Book & Vinyl Hub", type: "cultural shops", coordinates: [1.30790, 103.77690], info: "Quaint spot tracking student art, zines, and classic acoustic layout charts." },

  // --- CROWD WATCH ---
  { id: 9, name: "Main Student Concourse Plaza", type: "crowd watch", coordinates: [1.30895, 103.77912], info: "Highly crowded right now due to student club booths and CCA fairs." },
  { id: 10, name: "Sports Complex Football Field", type: "crowd watch", coordinates: [1.30990, 103.77660], info: "Moderate activity with active recreational matches taking place under the lights." }
];

export default function MapPage() {
  const [locations] = useState(initialLocations);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapFocus, setMapFocus] = useState({ center: [1.30983, 103.77751], zoom: 16 });

  // Filter processing
  const filteredLocations = locations.filter(loc => {
    const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredLocations.length > 0) {
      setMapFocus({ center: filteredLocations[0].coordinates, zoom: 17 });
    }
  };

  return (
    <div className="flex-1 w-full text-left space-y-6 max-w-5xl mx-auto p-1">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">📍 Interactive Campus Guide</h1>
        <p className="text-xs text-gray-400 mt-0.5">Explore local food hubs, hidden gems, culture shops, and active zones.</p>
      </div>

      {/* Map Main Workspace Frame */}
      <div className="bg-[#050B1E] rounded-3xl border border-slate-950 shadow-2xl overflow-hidden p-3 relative flex flex-col min-h-[520px] h-[68vh] w-full">
        
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
        {/* 🎛️ ORIGINAL CAPSULE CONTROL PANEL DISPLAY                 */}
        {/* ========================================================= */}
        <div className="absolute bottom-6 inset-x-6 z-30 flex items-center justify-center pointer-events-none">
          <div className="flex flex-wrap items-center gap-3 bg-[#0a1128]/85 backdrop-blur-md border border-amber-500/80 rounded-full px-5 py-2.5 shadow-2xl pointer-events-auto max-w-full">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1">
              {['all', 'food', 'hidden gems', 'cultural shops', 'crowd watch'].map((type) => {
                const isSelected = activeFilter === type;
                return (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200 select-none ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md scale-105'
                        : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* Middle Badge Panel Indicator */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 text-[8px] font-black tracking-tight text-slate-400">
              <span>🔹 FILT</span>
              <span className="text-gray-600">|</span>
              <span className="text-amber-400">SRCH 🔹</span>
            </div>

            {/* Custom Text Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center min-w-[160px] sm:min-w-[190px]">
              <span className="absolute left-3 text-[10px] opacity-70">🔍</span>
              <input
                type="text"
                placeholder="Type location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-10 py-1.5 bg-slate-950/90 text-white placeholder-slate-500 text-[11px] font-medium rounded-full border border-slate-800 focus:outline-none focus:border-amber-500/80 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-2 py-0.5 text-[8px] font-black uppercase bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700"
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