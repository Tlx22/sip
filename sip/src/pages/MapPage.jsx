import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet marker icon asset paths
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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

function ChangeMapView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

const initialLocations = [
  { id: 1, name: "SP Bouldering Wall & Sports Complex", type: "hidden gems", coordinates: [1.3098, 103.7775], info: "High-quality climbing training setups." },
  { id: 2, name: "Gourmet Kampong Food Center", type: "food", coordinates: [1.3120, 103.7760], info: "Famous for local roasted delights." },
  { id: 3, name: "Dover Forest Eco-Trail Entry", type: "hidden gems", coordinates: [1.3115, 103.7820], info: "A quiet, lush green canopy getaway right next to the MRT tracks." },
  { id: 4, name: "Main Student Concourse & Plaza", type: "crowd watch", coordinates: [1.3090, 103.7788], info: "Highly crowded due to student club fairs." }
];

export default function MapPage() {
  const [locations] = useState(initialLocations);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mapFocus, setMapFocus] = useState({ center: [1.3098, 103.7775], zoom: 15 });

  const filteredLocations = locations.filter(loc => {
    const matchesFilter = activeFilter === "all" || loc.type === activeFilter;
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (filteredLocations.length > 0) {
      setMapFocus({ center: filteredLocations[0].coordinates, zoom: 16 });
    }
  };

  return (
    <div className="flex-1 w-full text-left space-y-5 max-w-5xl mx-auto p-1">
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">📍 Explore Interactive Map</h1>
        <p className="text-xs text-gray-400 mt-0.5">Discover interesting spots and crowdsourced event logs.</p>
      </div>

      <div className="bg-[#0b132b] rounded-3xl border border-slate-950 shadow-xl overflow-hidden p-3 relative flex flex-col min-h-[500px] h-[65vh] w-full">
        <div className="flex-1 w-full h-full rounded-2xl overflow-hidden relative z-10 bg-slate-900">
          <MapContainer center={mapFocus.center} zoom={mapFocus.zoom} zoomControl={false} className="h-full w-full">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; OpenStreetMap &copy; CARTO'
            />
            <MapResizeTrigger />
            <ChangeMapView center={mapFocus.center} zoom={mapFocus.zoom} />

            {filteredLocations.map((loc) => (
              <Marker key={loc.id} position={loc.coordinates}>
                <Popup>
                  <div className="text-slate-900 p-1 font-sans text-xs max-w-[200px]">
                    <p className="font-bold border-b border-gray-100 pb-0.5">{loc.name}</p>
                    <p className="text-[11px] mt-1 text-gray-600">{loc.info}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Console Controls bar overlay */}
        <div className="absolute bottom-6 inset-x-6 z-30 flex flex-col md:flex-row items-center justify-between gap-3 bg-[#111c40]/90 backdrop-blur-md border border-slate-700/60 rounded-2xl p-3 shadow-2xl">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-center">
            {['all', 'food', 'hidden gems', 'crowd watch'].map((type) => (
              <button
                key={type} onClick={() => setActiveFilter(type)}
                className={`text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-xl border transition-all ${
                  activeFilter === type ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-[#1a2656] text-slate-300 border-slate-700 hover:bg-[#223270]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearchSubmit} className="w-full md:w-64 relative flex items-center">
            <input 
              type="text" placeholder="Search hubs..." value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2 bg-[#0a1026] text-xs text-white placeholder-slate-400 rounded-xl border border-slate-700 focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="absolute right-2 px-2 py-0.5 text-[9px] font-black uppercase bg-slate-800 text-slate-300 rounded border border-slate-600">Go</button>
          </form>
        </div>
      </div>
    </div>
  );
}