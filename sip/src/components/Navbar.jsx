import React from 'react';

export default function Navbar() {
  return (
    <header className="h-16 bg-[#F4F6F0] border-b border-gray-200 px-8 flex items-center justify-between w-full">
      <div className="flex items-center gap-4">
        <span className="text-2xl font-serif font-bold text-[#1c1c1c]">Co-Co</span>
        <button className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">
          About Us
        </button>
      </div>
      
      <div className="w-96 relative">
        <input 
          type="text" 
          placeholder="Search for events, articles, community spaces..." 
          className="w-full px-4 py-1.5 pl-10 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-shadow"
        />
        <span className="absolute left-3 top-2 text-gray-400 text-sm">🔍</span>
      </div>
    </header>
  );
}