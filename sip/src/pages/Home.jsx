import React from 'react';

export default function Home() {
  const events = [
    { id: 1, title: "Community Gardening", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400" },
    { id: 2, title: "Reading Circle", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400" },
    { id: 3, title: "Beach Cleanup", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400" },
    { id: 4, title: "Social Gathering", img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400" }
  ];

  return (
    <div className="space-y-12">
      {/* 1. Header Banner Box (Our Mission) */}
      <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="max-w-xs space-y-4">
          <h2 className="text-3xl font-serif font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed text-sm">
            Grow2gether aims to inspire users to initiate and foster harmonious communities in Singapore.
          </p>
          <button className="bg-[#E2ECE9] hover:bg-[#d4e2de] text-gray-800 font-semibold px-5 py-2 rounded-full text-xs shadow-sm transition-all">
            Read more
          </button>
        </div>

        {/* Placeholder Graphic Banner */}
        <div className="flex-1 w-full h-48 bg-gradient-to-r from-amber-100 via-orange-100 to-emerald-100 rounded-2xl flex items-center justify-center border border-dashed border-gray-300">
          <span className="text-gray-400 font-medium text-sm">[ Canva Mission Asset Image Here ]</span>
        </div>
      </section>

      {/* 2. Horizontal Events Slider Section */}
      <section className="relative">
        <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">Upcoming Events</h2>
        
        {/* Carousel Tracks */}
        <div className="flex items-center gap-4 relative">
          {/* Left Arrow Button */}
          <button className="absolute left-[-20px] z-10 w-10 h-10 rounded-full bg-white shadow-md border flex items-center justify-center text-xl font-bold hover:bg-gray-50">
            &lt;
          </button>

          {/* Cards Flex Row Container */}
          <div className="flex-1 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {events.map((evt) => (
              <div key={evt.id} className="min-w-[220px] bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col items-center">
                <img 
                  src={evt.img} 
                  alt={evt.title} 
                  className="w-full h-36 object-cover rounded-xl mb-3"
                />
                <button className="w-full bg-[#E2ECE9] hover:bg-[#d4e2de] text-gray-800 text-xs font-bold py-2 rounded-xl transition-colors text-center">
                  Sign up
                </button>
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button className="absolute right-[-20px] z-10 w-10 h-10 rounded-full bg-white shadow-md border flex items-center justify-center text-xl font-bold hover:bg-gray-50">
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
}

// trigger build change