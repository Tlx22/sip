import React, { useState } from 'react';
import { festivalLocations } from '../data/locations';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter locations based on search text (case-insensitive)
  const filteredLocations = festivalLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    loc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setSearchQuery(loc.name);
    setIsDropdownOpen(false);
    
    // ACTION: If you have a map library instance (like Mapbox/Leaflet), 
    // you would trigger a pan/zoom animation here:
    // mapRef.current.flyTo({ center: loc.coordinates, zoom: 16 });
    console.log(`Panning map to: ${loc.name} at coordinates`, loc.coordinates);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSelectedLocation(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900">Explore Map</h1>
        <p className="text-sm text-gray-500 mt-1">Search and locate events or installations across the area.</p>
      </div>

      {/* Map Container Box */}
      <div className="relative w-full h-[550px] rounded-3xl overflow-hidden border border-gray-100 shadow-inner bg-slate-100">
        
        {/* --- FLOATING SEARCH BAR --- */}
        <div className="absolute top-4 left-4 z-30 w-full max-w-sm px-2">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-2 transition-all">
            <div className="flex items-center gap-2 px-2">
              <span className="text-gray-400 text-lg">🔍</span>
              <input
                type="text"
                value={searchQuery}
                placeholder="Search installations, food zones..."
                onFocus={() => setIsDropdownOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                className="w-full bg-transparent border-none outline-none py-2 text-sm text-gray-800 placeholder-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={handleClearSearch}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Results List */}
            {isDropdownOpen && searchQuery && (
              <div className="mt-2 border-t border-gray-100 max-h-60 overflow-y-auto scrollbar-hide">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className="w-full text-left px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors flex flex-col gap-0.5"
                    >
                      <span className="text-xs font-semibold text-gray-800">{loc.name}</span>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600">{loc.category}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-4 text-center text-xs text-gray-400">
                    No matching locations found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- MAP PLACEHOLDER CANVAS --- */}
        {/* Replace this div with your actual Mapbox / Leaflet / Google Map component */}
        <div className="w-full h-full flex flex-col items-center justify-center relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <span className="text-4xl mb-2">🗺️</span>
          <p className="text-sm font-semibold text-gray-500">Interactive Map Canvas</p>
          
          {selectedLocation && (
            <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-emerald-500/20 z-10 transition-all animate-in fade-in slide-in-from-bottom-2">
              <span className="text-[10px] uppercase font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full">{selectedLocation.category}</span>
              <h4 className="font-bold text-sm text-gray-800 mt-2">{selectedLocation.name}</h4>
              <p className="text-xs text-gray-500 mt-1">{selectedLocation.description}</p>
              <p className="text-[10px] text-gray-400 mt-2 font-mono">Coordinates: {selectedLocation.coordinates.join(', ')}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}