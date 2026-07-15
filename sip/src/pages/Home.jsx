import React, { useState } from 'react';

// Mock event cards matching your layout images
const eventCards = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=400&q=80",
    alt: "Nature Trail Garden"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80",
    alt: "Open Book Study"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
    alt: "Coding Workspace"
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80",
    alt: "Social Dining Banquet"
  }
];

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);

  // Simple carousel navigation logic
  const handleNext = () => {
    if (startIndex + 4 < eventCards.length) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full space-y-10 pb-12">
      
      {/* --- TOP MISSION BANNER CARD --- */}
      <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-8 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl md:text-4xl font-serif font-black text-[#1E293B] tracking-tight">
              Our Mission
            </h1>
            <p className="text-xs md:text-sm text-gray-500 font-normal leading-relaxed max-w-sm">
              Grow2gether aims to inspire users to initiate and foster harmonious communities in Singapore.
            </p>
            <button className="bg-[#EAEFEF] text-slate-800 font-bold text-xs px-5 py-2.5 rounded-full hover:bg-slate-200 transition-colors shadow-sm">
              Read more
            </button>
          </div>

          {/* Right Gradient Asset Box */}
          <div className="md:col-span-3 h-48 md:h-56 rounded-2xl bg-gradient-to-r from-amber-100 via-orange-100 to-emerald-200 flex items-center justify-center border border-amber-100/30">
            <span className="text-gray-600/70 font-mono text-[11px] tracking-wide">
              [ Canva Mission Asset Image Here ]
            </span>
          </div>

        </div>
      </div>

      {/* --- UPCOMING EVENTS CAROUSEL SECTION --- */}
      <div className="space-y-6">
        <h2 className="text-3xl font-serif font-black text-[#1E293B]">
          Upcoming Events
        </h2>

        {/* Carousel Container */}
        <div className="relative flex items-center gap-2">
          
          {/* Left Arrow Button */}
          <button 
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`shrink-0 w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center font-bold text-sm bg-white shadow-sm transition-all hover:bg-gray-50 active:scale-95 ${startIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            &lt;
          </button>

          {/* Cards Track Viewport */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 overflow-hidden">
            {eventCards.slice(startIndex, startIndex + 4).map((card) => (
              <div 
                key={card.id} 
                className="bg-white rounded-2xl border border-gray-100 p-3 shadow-sm flex flex-col gap-3 group hover:shadow-md transition-shadow"
              >
                {/* Image Wrap Container */}
                <div className="w-full h-40 rounded-xl overflow-hidden bg-gray-50 relative">
                  <img 
                    src={card.img} 
                    alt={card.alt} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Action button container */}
                <button className="w-full py-2.5 text-xs font-bold text-[#1E293B] bg-[#EAF0EE] hover:bg-emerald-800 hover:text-white rounded-xl transition-all">
                  Sign up
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button 
            onClick={handleNext}
            disabled={startIndex + 4 >= eventCards.length}
            className={`shrink-0 w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center font-bold text-sm bg-white shadow-sm transition-all hover:bg-gray-50 active:scale-95 ${startIndex + 4 >= eventCards.length ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            &gt;
          </button>

        </div>
      </div>

    </div>
  );
}