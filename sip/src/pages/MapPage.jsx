import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Filter, Compass, MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default Leaflet marker icon asset paths in React environments
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- FIXED RESIZE TRIGGER COMPONENT ---
// This forces Leaflet to recalculate container bounds after the layout mounts
function MapResizeTrigger() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// Controller component to dynamically pan/zoom to selected coordinates
function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

// Simulated Neighborhood Hotspot Database
const initialLocations = [
  { id: 1, name: "SP Bouldering Wall & Sports Complex", type: "hidden gems", coordinates: [1.3098, 103.7775], info: "Great high-quality local climbing walls and training setups." },
  { id: 2, name: "Gourmet Kampong Food Center", type: "food", coordinates: [1.3120, 103.7760], info: "Peak crowd levels subsiding. Famous for local roasted delights." },
  { id: 3, name: "Dover Forest Eco-Trail Entry", type: "hidden gems", coordinates: [1.3115, 103.7820], info: "A quiet, lush green canopy getaway right next to the train tracks." },
  { id: 4, name: "Main Student Concourse & Plaza", type: "crowd watch", coordinates: [1.3090, 103.7788], info: "Current Status: Highly crowded due to afternoon co-curricular club fairs." }
];

export default function MapPage() {
  const [locations] = useState(initialLocations);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Map perspective focus tracking state (Defaults centered near Dover, Singapore)
  const [mapFocus, setMapFocus] = useState({
    center: [1.3098, 103.7775],
    zoom: 15
  });

  // Filter coordinates list based on selected category pill and search matches
  const filteredLocations = locations.filter(loc => {
    const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.info.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Search Submission Handler to center map on the first search hit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredLocations.length > 0) {
      setMapFocus({
        center: filteredLocations[0].coordinates,
        zoom: 16
      });
    }
  };

  return (
    <div className="flex-1 w-full text-left space-y-5 max-w-5xl mx-auto p-1 animate-fadeIn">
      
      {/* --- DASHBOARD HEADER BLOCK --- */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>📍</span> Explore Interactive Map
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">Discover interesting places, crowdsourcing hot-spots, and upcoming neighborhood tracks.</p>
      </div>

      {/* --- CORE WRAPPER INTERFACE CONTAINER --- */}
      <div className="bg-[#0b132b] rounded-3xl border border-slate-950 shadow-xl overflow-hidden p-3 relative flex flex-col min-h-[500px] h-[65vh] w-full">
        
        {/* --- LEAFLET NATIVE MAP INSTANCE FRAME --- */}
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden relative z-10 bg-slate-900">
          <MapContainer 
            center={mapFocus.center} 
            zoom={mapFocus.zoom} 
            zoomControl={false}
            className="h-full w-full"
          >
            {/* Dark Styled CartoDB Tiles matching your layout UI */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {/* Force immediate dimensions refresh & dynamic viewport panning hooks */}
            <MapResizeTrigger />
            <ChangeMapView center={mapFocus.center} zoom={mapFocus.zoom} />

            {/* Map Pin Render Loop */}
            {filteredLocations.map((loc) => (
              <Marker key={loc.id} position={loc.coordinates}>
                <Popup>
                  <div className="text-slate-900 p-1 font-sans text-xs space-y-1 max-w-[200px]">
                    <p className="font-bold text-slate-950 border-b border-gray-100 pb-0.5">{loc.name}</p>
                    <p className="text-[10px] text-gray-500 capitalize italic font-semibold">Track: {loc.type}</p>
                    <p className="text-[11px] leading-snug text-gray-600">{loc.info}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* --- FLOATING CONTROLS CONSOLE FLOODBAR --- */}
        <div className="absolute bottom-6 inset-x-6 z-30 flex flex-col md:flex-row items-center justify-between gap-3 bg-[#111c40]/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-3 shadow-2xl">
          
          {/* Action Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-center md:justify-start">
            <span className="hidden lg:inline text-[9px] font-black uppercase tracking-wider text-slate-400 mr-1">
              Filter:
            </span>
            {[
              { id: 'all', label: 'All Fields' },
              { id: 'food', label: 'Food Spots' },
              { id: 'hidden gems', label: 'Hidden Gems' },
              { id: 'crowd watch', label: 'Crowd Watch' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl border transition-all select-none ${
                  activeFilter === tab.id
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md'
                    : 'bg-[#1a2656] text-slate-300 border-slate-700 hover:bg-[#223270]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Integrated Search Console Panel */}
          <form onSubmit={handleSearchSubmit} className="w-full md:w-72 relative flex items-center">
            <input 
              type="text"
              placeholder="Type location, hub keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0a1026] text-xs text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <button 
              type="submit"
              className="absolute right-2 px-2 py-0.5 text-[9px] font-black uppercase bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-600 transition-colors"
            >
              Go
            </button>
          </form>

        </div>
      </div>

      {/* --- SUBTEXT QUICK INFRASTRUCTURE SIDEBAR SNAPSHOT --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredLocations.slice(0, 3).map((loc) => (
          <div 
            key={loc.id}
            onClick={() => setMapFocus({ center: loc.coordinates, zoom: 16 })}
            className="p-3 bg-white border border-gray-100 rounded-2xl shadow-xs hover:border-amber-500/50 cursor-pointer transition-all flex items-start gap-2.5 group text-left"
          >
            <div className="w-7 h-7 shrink-0 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-center text-xs group-hover:bg-amber-50 group-hover:text-amber-600 transition-colors">
              📍
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-800 truncate">{loc.name}</h4>
              <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{loc.info}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}