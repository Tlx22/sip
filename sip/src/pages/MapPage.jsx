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

// React 19 layout sizing safe-guard hook
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

// Map frame fly-to controller
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 0.8 });
    }
  }, [center, zoom, map]);
  return null;
}

// Your actual, original location markers dataset
const initialLocations = [
  { id: 1, name: "SP Bouldering Wall", type: "hidden gems", coordinates: [1.30983, 103.77751], info: "V1 to V6+ slab and overhang training zones." },
  { id: 2, name: "Gourmet Kampong", type: "food", coordinates: [1.31205, 103.77622], info: "Local economic rice, chicken rice, and coffee hubs." },
  { id: 3, name: "Dover Forest Trail", type: "hidden gems", coordinates: [1.31152, 103.78214], info: "Lush green rustic canopy walkthrough." },
  { id: 4, name: "FC5 / Concourse Plaza", type: "crowd watch", coordinates: [1.30895, 103.77912], info: "Peak hour campus traffic track." }
];

export default function MapPage() {
  const [locations] = useState(initialLocations);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapFocus, setMapFocus] = useState({ center: [1.30983, 103.77751], zoom: 16 });

  // Filter logic pipeline
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
      
      {/* Upper header section */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">📍 Shared Spaces Map</h1>
        <p className="text-xs text-gray-400 mt-0.5">Explore crowdsourced student hubs, food spots, and active zones.</p>
      </div>

      {/* Main Container Frame */}
      <div className="bg-[#050B1E] rounded-3xl border border-slate-950 shadow-2xl overflow-hidden p-3 relative flex flex-col min-h-[520px] h-[68vh] w-full">
        
        {/* ========================================================= */}
        {/* 🏈 SUNDAY NIGHT FOOTBALL BROADCAST BUG OVERLAY            */}
        {/* ========================================================= */}
        <div className="absolute top-6 left-6 z-30 flex items-center bg-[#0d0d0d]/95 text-white font-mono border-b-2 border-amber-400 rounded shadow-xl overflow-hidden select-none h-8 text-[11px]">
          <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-black px-2.5 h-full flex items-center font-sans italic font-black text-amber-400 tracking-tighter">
            NBC
          </div>
          <div className="flex items-center h-full">
            <div className="w-2 h-full bg-red-600" />
            <div className="px-2.5 font-black tracking-wide bg-neutral-900 h-full flex items-center">MIN</div>
            <div className="px-2 font-bold bg-neutral-800 text-xs h-full flex items-center border-r border-neutral-700">24</div>
          </div>
          <div className="flex items-center h-full">
            <div className="w-2 h-full bg-emerald-700" />
            <div className="px-2.5 font-black tracking-wide bg-neutral-900 h-full flex items-center">PHI</div>
            <div className="px-2 font-bold bg-neutral-800 text-xs h-full flex items-center border-r border-neutral-700">27</div>
          </div>
          <div className="bg-black px-2.5 h-full flex items-center font-sans font-bold text-[10px] text-gray-300 border-r border-neutral-700">
            4TH <span className="text-white font-mono ml-1">2:14</span>
          </div>
          <div className="bg-amber-400 text-neutral-950 px-2.5 h-full flex items-center font-sans font-black text-[10px]">
            3RD & 4
          </div>
        </div>

        {/* Leaflet Map Target Canvas */}
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
                  <div className="text-slate-900 p-1 font-sans text-xs max-w-[180px]">
                    <p className="font-bold border-b border-gray-100 pb-0.5 capitalize">{loc.name}</p>
                    <p className="text-[10px] mt-1 text-gray-500 leading-tight">{loc.info}</p>
                    <span className="inline-block mt-1.5 px-1.5 py-0.5 bg-slate-100 text-slate-700 font-bold text-[8px] uppercase rounded">
                      {loc.type}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* ========================================================= */}
        {/* 🎛️ ORIGINAL SLICK CAPSULE CONTROL CONSOLE LOG PANELS     */}
        {/* ========================================================= */}
        <div className="absolute bottom-6 inset-x-6 z-35 flex items-center justify-center pointer-events-none">
          <div className="flex flex-wrap items-center gap-3 bg-[#0a1128]/85 backdrop-blur-md border border-amber-500/80 rounded-full px-5 py-2.5 shadow-2xl pointer-events-auto max-w-full">
            
            {/* Tag Selection Row */}
            <div className="flex items-center gap-1">
              {['all', 'food', 'hidden gems', 'crowd watch'].map((type) => {
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

            {/* Separator Divider Indicator Capsule */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1 text-[8px] font-black tracking-tight text-slate-400">
              <span>🔹 FILT</span>
              <span className="text-gray-600">|</span>
              <span className="text-amber-400">SRCH 🔹</span>
            </div>

            {/* Search Action Input Module */}
            <form onSubmit={handleSearchSubmit} className="relative flex items-center min-w-[160px] sm:min-w-[200px]">
              <span className="absolute left-3 text-xs opacity-70">🔍</span>
              <input
                type="text"
                placeholder="Type location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-10 py-1.5 bg-slate-950/90 text-white placeholder-slate-500 text-[11px] font-medium rounded-full border border-slate-800 focus:outline-none focus:border-amber-500/80 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 px-2 py-0.5 text-[8px] font-black uppercase bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 transition-colors"
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