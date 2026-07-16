import React, { useState } from 'react';

const initialEvents = [
  {
    id: 1,
    title: "Community Coding & Skill-Swap Jam",
    organization: "Grow2gether Tech Hub",
    type: "Skill-Swap",
    location: "Downtown Core, Singapore",
    date: "July 25, 2026",
    time: "2:00 PM - 6:00 PM",
    spotsLeft: 8,
    status: "Filling Fast",
    description: "Bring your laptop, share your programming stack experience, or pick up introductory UI rules from other local creators. Perfect for building up peer connections.",
    perks: ["Mentorship", "Certificate", "Refreshments Provided"]
  },
  {
    id: 2,
    title: "Eco-Youth Leadership Camp 2026",
    organization: "Green Horizon Initiatives",
    type: "Camps",
    location: "Pulau Ubin Outdoor Complex",
    date: "August 12-14, 2026",
    time: "3-Day Residential",
    spotsLeft: 15,
    status: "Open",
    description: "An immersive multi-day leadership track focused on urban planning sustainability, group team-building, and designing local environmental campaigns.",
    perks: ["Accommodation Included", "Leadership Badge", "Field Kit Provided"]
  },
  {
    id: 3,
    title: "Kampong Spirit Block Party & Food Drive",
    organization: "Harmonious Neighborhoods Collective",
    type: "Community Events",
    location: "Toa Payoh Central Hub",
    date: "July 30, 2026",
    time: "4:00 PM - 9:00 PM",
    spotsLeft: 0,
    status: "Waitlist Only",
    description: "Revisiting old-school neighborhood warmth! Help pack distribution kits for low-income support networks while participating in local acoustic performance stages.",
    perks: ["Community Hours Tracked", "Dinner Voucher"]
  },
  {
    id: 4,
    title: "Acoustic Band Cover & Gear Setup Workshop",
    organization: "Sip Performance Alliance",
    type: "Skill-Swap",
    location: "Dhoby Ghaut Creative Space",
    date: "August 05, 2026",
    time: "6:30 PM - 9:30 PM",
    spotsLeft: 4,
    status: "Filling Fast",
    description: "Learn how to effectively mic up live drum kits, patch digital keyboards, and map multi-instrument audio routing layers for small stage productions.",
    perks: ["Studio Equipment Access", "Networking Session"]
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEventId, setSelectedEventId] = useState(initialEvents[0].id);

  const eventTypes = ["All", "Skill-Swap", "Camps", "Community Events"];

  const filteredEvents = initialEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedType === "All" || event.type === selectedType;

    return matchesSearch && matchesTab;
  });

  const currentActiveEvent = filteredEvents.find(e => e.id === selectedEventId) || filteredEvents[0];

  return (
    <div className="w-full mx-auto p-4 md:p-6 text-left space-y-6 bg-transparent">
      
      {/* Search Header Banner Card Stack styled to match main content containers */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Events Hub
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Browse and filter upcoming opportunities, skill-swaps, and local tracks.
          </p>
        </div>

        {/* Input Interactive Search Bar */}
        <div className="w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, host group, keywords, or location..."
            className="w-full pl-4 pr-10 py-3 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none text-xs md:text-sm transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-sm">🔍</span>
        </div>

        {/* Categories Tab Engine Matching Core Accent Colors */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setSelectedEventId(null);
              }}
              className={`text-[10px] md:text-xs font-bold px-4 py-2 rounded-full border transition-all ${
                selectedType === type
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Board Viewport Split-Pane Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: The Interactive Search Result Cards Stack */}
        <div className="lg:col-span-7 space-y-3">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-1">
            Active opportunities ({filteredEvents.length})
          </p>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-2 shadow-sm">
              <span className="text-xl block">📂</span>
              <h3 className="font-bold text-gray-800 text-xs">No matches found</h3>
              <p className="text-[11px] text-gray-500 max-w-xs mx-auto">Try altering your text search string or selecting another header tab.</p>
            </div>
          ) : (
            filteredEvents.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedEventId(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white text-left ${
                  currentActiveEvent?.id === item.id
                    ? 'border-emerald-700 ring-1 ring-emerald-700/30 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/40">
                        {item.type}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm md:text-base mt-2.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">{item.organization}</p>
                    </div>

                    <span className={`text-[9px] shrink-0 font-bold px-2 py-0.5 rounded border ${
                      item.status === 'Waitlist Only'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200/50'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1.5 text-[11px] text-gray-400">
                    <span>📅 {item.date}</span>
                    <span>📍 {item.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-[11px]">
                  <span className="font-medium text-gray-500">
                    🔥 {item.spotsLeft > 0 ? `${item.spotsLeft} slots open` : 'Full'}
                  </span>
                  <span className="font-bold text-emerald-800 flex items-center gap-0.5">
                    View & Apply →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: The Sticky Career Detail Panel Interaction Frame */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          {currentActiveEvent ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-5 text-left">
              
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/40">
                  {currentActiveEvent.type}
                </span>
                <h2 className="text-base md:text-lg font-bold text-slate-900 leading-tight">
                  {currentActiveEvent.title}
                </h2>
                <div>
                  <p className="text-xs font-bold text-gray-700">{currentActiveEvent.organization}</p>
                  <p className="text-[11px] text-gray-400 mt-1">📍 {currentActiveEvent.location}</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100 text-[11px]">
                <div>
                  <span className="block font-bold text-gray-400 text-[9px] uppercase tracking-wider">Date</span>
                  <p className="font-bold text-slate-800 mt-0.5">{currentActiveEvent.date}</p>
                </div>
                <div>
                  <span className="block font-bold text-gray-400 text-[9px] uppercase tracking-wider">Timing</span>
                  <p className="font-bold text-slate-800 mt-0.5">{currentActiveEvent.time}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Overview</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {currentActiveEvent.description}
                </p>
              </div>

              {currentActiveEvent.perks && (
                <div className="space-y-2">
                  <h4 className="text-[9px] font-black uppercase tracking-widest text-gray-400">Included</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentActiveEvent.perks.map((perk, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 text-[10px] font-medium px-2.5 py-1 rounded-md">
                        ✨ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  disabled={currentActiveEvent.spotsLeft === 0}
                  onClick={() => alert(`Successfully submitted registration track entry request for: ${currentActiveEvent.title}`)}
                  className={`w-full text-center font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all ${
                    currentActiveEvent.spotsLeft === 0
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm active:scale-[0.99]'
                  }`}
                >
                  {currentActiveEvent.spotsLeft === 0 ? 'Waitlist Full' : 'Register for this Event'}
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 text-xs shadow-sm">
              Select an item to view requirements.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}