import React from 'react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Header section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-emerald-800 font-serif font-bold text-3xl">Co-Co</span>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100">About Us</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight leading-tight">
          Grow2gether aims to inspire users to initiate and foster harmonious communities in Singapore.
        </h1>
        <button className="bg-emerald-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-emerald-900 transition-colors shadow-sm">
          Read more
        </button>
      </div>

      {/* Decorative Canva Asset Area */}
      <div className="h-64 rounded-3xl bg-emerald-50/50 border border-dashed border-emerald-200 flex items-center justify-center text-emerald-800/60 font-medium text-sm">
        [ Canva Mission Asset Image Here ]
      </div>

      {/* Upcoming Events Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80" 
              alt="Nature trail" 
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-gray-800">Community Nature Walk</h3>
              <p className="text-xs text-gray-500">Explore local trails and connect with fellow nature lovers in Singapore.</p>
              <button className="text-xs font-bold text-emerald-800 hover:text-emerald-950">Sign up →</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <img 
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80" 
              alt="Book club" 
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-3">
              <h3 className="font-bold text-gray-800">Weekly Co-Reading Space</h3>
              <p className="text-xs text-gray-500">Bring your current read and enjoy a quiet, focused study/reading session.</p>
              <button className="text-xs font-bold text-emerald-800 hover:text-emerald-950">Sign up →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}