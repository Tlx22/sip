import React, { useState } from 'react';

// Structured mock dataset representing different community track initiatives
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

  // Filter Categories Pipeline
  const eventTypes = ["All", "Skill-Swap", "Camps", "Community Events"];

  const filteredEvents = initialEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = selectedType === "All" || event.type === selectedType;

    return matchesSearch && matchesTab;
  });

  // Keep track of which event object is currently pulled open in the preview pane
  const currentActiveEvent = initialEvents.find(e => e.id === selectedEventId) || filteredEvents[0];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 text-left space-y-6">
      
      {/* Search Header Banner Card Stack */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-4">
        <div className="max-w-xl">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-white tracking-tight">
            Discover Opportunities & Tracks
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Find local skill-swaps, specialized development camps, and community events across Singapore.
          </p>
        </div>

        {/* Input Interactive Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, host group, keywords, or location..."
              className="w-full pl-10 pr-4 py-3 bg-slate-950 text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:border-emerald-500 focus:outline-none text-sm transition-colors"
            />
          </div>
        </div>

        {/* Categories Tab Engine */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/60">
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                // Reset active element viewport to avoid state mismatch
                setSelectedEventId(null);
              }}
              className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                selectedType === type
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Board Viewport Split-Pane Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: The Interactive Search Result Cards Stack */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex justify-between items-center px-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              Showing {filteredEvents.length} active opportunities
            </p>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center space-y-2">
              <span className="text-2xl block">📂</span>
              <h3 className="font-bold text-gray-800 text-sm">No exact matches found</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">Try refining your search text or switching the filter tracks above.</p>
            </div>
          ) : (
            filteredEvents.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedEventId(item.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between bg-white ${
                  currentActiveEvent?.id === item.id
                    ? 'border-emerald-500 ring-2 ring-emerald-500/10 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] font-black tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                        {item.type}
                      </span>
                      <h3 className="font-bold text-gray-900 text-sm md:text-base mt-2 hover:text-emerald-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">{item.organization}</p>
                    </div>

                    <span className={`text-[10px] shrink-0 font-bold px-2 py-0.5 rounded-full border ${
                      item.status === 'Waitlist Only'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-2 text-[11px] text-gray-500">
                    <span className="flex items-center gap-1">📅 {item.date}</span>
                    <span className="flex items-center gap-1">📍 {item.location}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[11px] font-medium text-slate-500">
                    🔥 {item.spotsLeft > 0 ? `${item.spotsLeft} slots left` : 'Fully Booked'}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5 group">
                    View Details <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: The Sticky Career Detail Interaction Frame */}
        <div className="lg:col-span-5 lg:sticky lg:top-6">
          {currentActiveEvent ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-6">
              
              <div className="space-y-3">
                <span className="text-[10px] font-black tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                  {currentActiveEvent.type}
                </span>
                <h2 className="text-lg font-bold text-gray-900 leading-tight">
                  {currentActiveEvent.title}
                </h2>
                <div>
                  <p className="text-xs font-bold text-gray-800">{currentActiveEvent.organization}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">📍 {currentActiveEvent.location}</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Specific Timings Grid Details */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="block font-semibold text-slate-400 text-[10px] uppercase tracking-wide">Date</span>
                  <p className="font-bold text-slate-800 mt-0.5">{currentActiveEvent.date}</p>
                </div>
                <div>
                  <span className="block font-semibold text-slate-400 text-[10px] uppercase tracking-wide">Timing</span>
                  <p className="font-bold text-slate-800 mt-0.5">{currentActiveEvent.time}</p>
                </div>
              </div>

              {/* Inner Core Overview Body Text */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Track Description</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {currentActiveEvent.description}
                </p>
              </div>

              {/* Skill Perks Tags */}
              {currentActiveEvent.perks && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Included In Track</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentActiveEvent.perks.map((perk, i) => (
                      <span key={i} className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2.5 py-1 rounded-md">
                        ✨ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Interactive Submission Engagement Trigger CTA */}
              <div className="pt-2">
                <button
                  disabled={currentActiveEvent.spotsLeft === 0}
                  onClick={() => alert(`Successfully submitted registration track entry request for: ${currentActiveEvent.title}`)}
                  className={`w-full text-center font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all ${
                    currentActiveEvent.spotsLeft === 0
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transform active:scale-[0.99]'
                  }`}
                >
                  {currentActiveEvent.spotsLeft === 0 ? 'Waitlist Full' : 'Register for this Event'}
                </button>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center text-slate-400 text-xs font-medium">
              Select an option from the panel to explore tracks.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}