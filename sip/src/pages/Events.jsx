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
    /* Added strict layout constraint block framework classes so it fits cleanly into the main center flex tree column */
    <div className="flex-1 w-full min-w-0 px-2 py-4 md:p-6 text-left space-y-6 overflow-x-hidden">
      
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
            Events Hub
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Browse and filter upcoming opportunities, skill-swaps, and local tracks.
          </p>
        </div>

        {/* Input Interactive Search Bar */}
        <div className="w-full relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, host group, or keywords..."
            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:border-emerald-800 focus:ring-1 focus:ring-emerald-700 focus:outline-none text-xs md:text-sm transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">🔍</span>
        </div>

        {/* Categories Tab Engine */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setSelectedEventId(null);
              }}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                selectedType === type
                  ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Board Viewport Split-Pane Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start w-full">
        
        {/* LEFT COLUMN: Results Cards Stack */}
        <div className="xl:col-span-7 space-y-3 min-w-0 w-full">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-1 shadow-sm">
              <span className="text-lg block">📂</span>
              <h3 className="font-bold text-gray-800 text-xs">No matches found</h3>
            </div>
          ) : (
            filteredEvents.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedEventId(item.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white text-left block w-full ${
                  currentActiveEvent?.id === item.id
                    ? 'border-emerald-700 ring-1 ring-emerald-700/20 shadow-sm'
                    : 'border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {item.type}
                      </span>
                      <h3 className="font-bold text-slate-900 text-xs md:text-sm mt-1.5 truncate">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-gray-400 truncate">{item.organization}</p>
                    </div>

                    <span className={`text-[8px] shrink-0 font-bold px-1.5 py-0.5 rounded border ${
                      item.status === 'Waitlist Only'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200/50'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-3 text-[10px] text-gray-400">
                    <span>📅 {item.date}</span>
                    <span className="truncate">📍 {item.location}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-gray-50 flex justify-between items-center text-[10px]">
                  <span className="font-medium text-gray-400">
                    🔥 {item.spotsLeft > 0 ? `${item.spotsLeft} slots open` : 'Full'}
                  </span>
                  <span className="font-bold text-emerald-800">
                    View & Apply →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: Detail Panel Frame */}
        <div className="xl:col-span-5 w-full">
          {currentActiveEvent ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4 text-left w-full">
              
              <div className="space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {currentActiveEvent.type}
                </span>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">
                  {currentActiveEvent.title}
                </h2>
                <div>
                  <p className="text-[11px] font-bold text-gray-600">{currentActiveEvent.organization}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">📍 {currentActiveEvent.location}</p>
                </div>
              </div>

              <hr className="border-gray-50" />

              <div className="grid grid-cols-2 gap-2 bg-gray-50 p-2.5 rounded-xl border border-gray-100 text-[10px]">
                <div>
                  <span className="block font-bold text-gray-400 text-[8px] uppercase tracking-wider">Date</span>
                  <p className="font-bold text-slate-700 mt-0.5">{currentActiveEvent.date}</p>
                </div>
                <div>
                  <span className="block font-bold text-gray-400 text-[8px] uppercase tracking-wider">Timing</span>
                  <p className="font-bold text-slate-700 mt-0.5">{currentActiveEvent.time}</p>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-[8px] font-black uppercase tracking-widest text-gray-400">Overview</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  {currentActiveEvent.description}
                </p>
              </div>

              {currentActiveEvent.perks && (
                <div className="space-y-1.5">
                  <h4 className="text-[8px] font-black uppercase tracking-widest text-gray-400">Included</h4>
                  <div className="flex flex-wrap gap-1">
                    {currentActiveEvent.perks.map((perk, i) => (
                      <span key={i} className="bg-gray-50 text-gray-500 text-[9px] font-medium px-2 py-0.5 rounded border border-gray-100">
                        ✨ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-1">
                <button
                  disabled={currentActiveEvent.spotsLeft === 0}
                  onClick={() => alert(`Successfully submitted registration track entry request for: ${currentActiveEvent.title}`)}
                  className={`w-full text-center font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all ${
                    currentActiveEvent.spotsLeft === 0
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm'
                  }`}
                >
                  {currentActiveEvent.spotsLeft === 0 ? 'Waitlist Full' : 'Register for this Event'}
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}