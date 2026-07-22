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
    perks: ["Mentorship", "Certificate", "Refreshments Provided"],
    requiresSafety: false
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
    perks: ["Accommodation Included", "Leadership Badge", "Field Kit Provided"],
    requiresSafety: true,
    safetyInfo: "All camp attendees must watch the standard Outward Bound & Eco-Camp safety brief before finalizing registration."
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
    perks: ["Community Hours Tracked", "Dinner Voucher"],
    requiresSafety: false
  }
];

export default function EventsPage() {
  // Navigation & Filtering State
  const [eventsList, setEventsList] = useState(initialEvents);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedEventId, setSelectedEventId] = useState(initialEvents[0].id);
  
  // Dynamic Views Engine Control
  // "dashboard" | "register" | "create"
  const [viewMode, setViewMode] = useState("dashboard");

  // Registration Intake Form Local State
  const [regFormData, setRegFormData] = useState({ name: '', contact: '', notes: '', watchedVideo: false });

  // Organization Event Creation Form Local State
  const [newEventData, setNewEventData] = useState({
    title: '',
    type: 'Skill-Swap',
    organization: '',
    location: '',
    date: '',
    time: '',
    spotsLeft: 10,
    description: '',
    perksString: '',
    requiresSafety: false,
    safetyInfo: ''
  });

  const eventTypes = ["All", "Skill-Swap", "Camps", "Community Events"];

  const filteredEvents = eventsList.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedType === "All" || event.type === selectedType;
    return matchesSearch && matchesTab;
  });

  const currentActiveEvent = filteredEvents.find(e => e.id === selectedEventId) || filteredEvents[0];

  // Submission handler for attendees signing up
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (currentActiveEvent.requiresSafety && !regFormData.watchedVideo) {
      alert("Please acknowledge that you have reviewed the safety brief protocols.");
      return;
    }
    alert(`Success! Registered ${regFormData.name} for ${currentActiveEvent.title}.`);
    
    // Decrement spots left if available
    setEventsList(eventsList.map(item => 
      item.id === currentActiveEvent.id 
        ? { ...item, spotsLeft: Math.max(0, item.spotsLeft - 1) } 
        : item
    ));

    setRegFormData({ name: '', contact: '', notes: '', watchedVideo: false });
    setViewMode("dashboard");
  };

  // Submission handler for Orgs listing a new event
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    
    const preparedEvent = {
      id: Date.now(),
      title: newEventData.title,
      organization: newEventData.organization || "Verified Organization",
      type: newEventData.type,
      location: newEventData.location,
      date: newEventData.date,
      time: newEventData.time,
      spotsLeft: parseInt(newEventData.spotsLeft) || 10,
      status: "Open",
      description: newEventData.description,
      perks: newEventData.perksString ? newEventData.perksString.split(',').map(p => p.trim()) : [],
      requiresSafety: newEventData.requiresSafety,
      safetyInfo: newEventData.safetyInfo
    };

    setEventsList([preparedEvent, ...eventsList]);
    setSelectedEventId(preparedEvent.id);
    alert(`🎉 Event successfully listed under ${preparedEvent.organization}!`);
    
    // Reset Form & Redirect back
    setNewEventData({
      title: '', type: 'Skill-Swap', organization: '', location: '', date: '', time: '',
      spotsLeft: 10, description: '', perksString: '', requiresSafety: false, safetyInfo: ''
    });
    setViewMode("dashboard");
  };

  // --- VIEW MODE: 1. EVENT CREATION VIEW FOR ORGANIZATIONS ---
  if (viewMode === "create") {
    return (
      <div className="flex-1 w-full min-w-0 px-2 py-4 md:p-6 text-left space-y-6 max-w-3xl mx-auto">
        <button 
          onClick={() => setViewMode("dashboard")}
          className="text-xs font-bold text-gray-500 hover:text-slate-900 transition-colors flex items-center gap-1 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm"
        >
          ← Back to Board
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Host an Opportunity</h1>
            <p className="text-xs text-gray-400 mt-0.5">List a skill-swap, local bootcamp, or performance camp track on the community grid.</p>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            {/* Mock Organization Account Banner */}
            <div className="bg-slate-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <span className="text-base">💼</span>
                <div>
                  <p className="font-bold text-slate-800">Organization Settings Placeholder</p>
                  <p className="text-[10px] text-gray-400">Linked login credentials managed in profile tab.</p>
                </div>
              </div>
              <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-100 text-[10px] uppercase">
                Org Connected
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Event Title</label>
                <input 
                  type="text" required placeholder="e.g. Advanced Drum Kit & Acoustic Covers Jam"
                  value={newEventData.title} onChange={(e) => setNewEventData({...newEventData, title: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Track Type</label>
                <select 
                  value={newEventData.type} onChange={(e) => setNewEventData({...newEventData, type: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                >
                  <option value="Skill-Swap">Skill-Swap</option>
                  <option value="Camps">Camps</option>
                  <option value="Community Events">Community Events</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Hosting Organization</label>
                <input 
                  type="text" required placeholder="e.g. Sip Performance Alliance"
                  value={newEventData.organization} onChange={(e) => setNewEventData({...newEventData, organization: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Venue / Location</label>
                <input 
                  type="text" required placeholder="e.g. Dhoby Ghaut Green, Singapore"
                  value={newEventData.location} onChange={(e) => setNewEventData({...newEventData, location: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Date</label>
                <input 
                  type="text" required placeholder="e.g. August 05, 2026"
                  value={newEventData.date} onChange={(e) => setNewEventData({...newEventData, date: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Timing Duration</label>
                <input 
                  type="text" required placeholder="e.g. 6:30 PM - 9:30 PM"
                  value={newEventData.time} onChange={(e) => setNewEventData({...newEventData, time: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Total Available Slots</label>
                <input 
                  type="number" required min="1" placeholder="10"
                  value={newEventData.spotsLeft} onChange={(e) => setNewEventData({...newEventData, spotsLeft: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-600 uppercase">Track Overview / Description</label>
              <textarea 
                rows="3" required placeholder="Describe the milestones, expectations, or background history needed..."
                value={newEventData.description} onChange={(e) => setNewEventData({...newEventData, description: e.target.value})}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-600 uppercase">Perks / Inclusions (Comma Separated)</label>
              <input 
                type="text" placeholder="e.g. Certificate, Refreshments, Studio Access"
                value={newEventData.perksString} onChange={(e) => setNewEventData({...newEventData, perksString: e.target.value})}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
              />
            </div>

            {/* Safety Brief Checkbox Group Toggle */}
            <div className="border border-slate-100 rounded-xl p-3.5 space-y-3">
              <label className="flex items-center gap-2 select-none cursor-pointer">
                <input 
                  type="checkbox" checked={newEventData.requiresSafety}
                  onChange={(e) => setNewEventData({...newEventData, requiresSafety: e.target.checked})}
                  className="rounded border-gray-300 text-emerald-800 focus:ring-emerald-800"
                />
                <span className="text-xs font-bold text-slate-800">Requires Mandatory Safety Brief Video Mod</span>
              </label>

              {newEventData.requiresSafety && (
                <div className="space-y-1 pt-1">
                  <label className="block text-[9px] font-bold text-gray-500 uppercase">Briefing Guidelines Instruction Text</label>
                  <input 
                    type="text" placeholder="e.g. Electrical insulation rules for amp routing apply."
                    value={newEventData.safetyInfo} onChange={(e) => setNewEventData({...newEventData, safetyInfo: e.target.value})}
                    className="w-full text-xs p-2 bg-white border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                  />
                </div>
              )}
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                type="button" onClick={() => setViewMode("dashboard")}
                className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 text-center font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm transition-all"
              >
                Publish Opportunity Grid Post
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW MODE: 2. APPLICANT INTAKE REGISTRATION VIEW ---
  if (viewMode === "register" && currentActiveEvent) {
    return (
      <div className="flex-1 w-full min-w-0 px-2 py-4 md:p-6 text-left space-y-6 max-w-3xl mx-auto">
        <button 
          onClick={() => setViewMode("dashboard")}
          className="text-xs font-bold text-gray-500 hover:text-slate-900 transition-colors flex items-center gap-1 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm"
        >
          ← Return to Opportunities Board
        </button>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
              {currentActiveEvent.type}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Registration Pipeline: {currentActiveEvent.title}
            </h1>
            <p className="text-xs text-gray-400">Hosted by <span className="font-bold text-gray-600">{currentActiveEvent.organization}</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-[11px] text-gray-600">
            <p><strong>📅 Date:</strong> {currentActiveEvent.date} ({currentActiveEvent.time})</p>
            <p><strong>📍 Venue Location:</strong> {currentActiveEvent.location}</p>
          </div>

          {currentActiveEvent.requiresSafety && (
            <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-4 md:p-5 space-y-3">
              <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                <span>⚠️</span> Mandatory Safety Briefing Protocol
              </h3>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {currentActiveEvent.safetyInfo || "Please ensure you have read and understood all venue safety guidelines prior to completing your registration."}
              </p>
              <label className="flex items-center gap-2 select-none cursor-pointer pt-1">
                <input 
                  type="checkbox" required
                  checked={regFormData.watchedVideo}
                  onChange={(e) => setRegFormData({ ...regFormData, watchedVideo: e.target.checked })}
                  className="rounded border-amber-300 text-amber-800 focus:ring-amber-700"
                />
                <span className="text-xs font-bold text-amber-900">I acknowledge and agree to the safety protocol requirements.</span>
              </label>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-600 uppercase">Full Name</label>
              <input 
                type="text" required placeholder="e.g. Alex Tan"
                value={regFormData.name}
                onChange={(e) => setRegFormData({ ...regFormData, name: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-600 uppercase">Contact Email / Telegram</label>
              <input 
                type="text" required placeholder="e.g. alex@example.com or @alextan"
                value={regFormData.contact}
                onChange={(e) => setRegFormData({ ...regFormData, contact: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-600 uppercase">Relevant Experience / Notes (Optional)</label>
              <textarea 
                rows="3" placeholder="Share any relevant background skills or dietary requirements..."
                value={regFormData.notes}
                onChange={(e) => setRegFormData({ ...regFormData, notes: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-3 flex gap-3">
              <button 
                type="button" onClick={() => setViewMode("dashboard")}
                className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 text-center font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm transition-all"
              >
                Confirm & Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW MODE: 3. MAIN DASHBOARD VIEW ---
  return (
    <div className="flex-1 w-full min-w-0 px-2 py-4 md:p-6 text-left space-y-6 max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Community Opportunities Grid</h1>
          <p className="text-xs text-gray-400 mt-1">Discover skill-swaps, leadership camps, and neighborhood initiatives around Singapore.</p>
        </div>
        <button 
          onClick={() => setViewMode("create")}
          className="text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-2.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 self-start md:self-auto"
        >
          <span>+</span> Host Opportunity
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <input 
          type="text" 
          placeholder="Search by title, organization, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-xs p-2.5 bg-white border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none md:w-80 shadow-sm"
        />

        <div className="flex gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedType === type 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Column Grid Layout */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-2">
          <p className="text-2xl">🔍</p>
          <p className="text-sm font-bold text-slate-800">No events found matching your criteria</p>
          <p className="text-xs text-gray-400">Try adjusting your search query or tab filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Events Listing */}
          <div className="lg:col-span-5 space-y-3">
            {filteredEvents.map(event => {
              const isSelected = currentActiveEvent && currentActiveEvent.id === event.id;
              return (
                <div
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected 
                      ? 'bg-white border-emerald-800 ring-2 ring-emerald-800/10 shadow-sm' 
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {event.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      event.spotsLeft === 0 
                        ? 'bg-rose-50 text-rose-700' 
                        : event.spotsLeft <= 5 
                          ? 'bg-amber-50 text-amber-700' 
                          : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      {event.spotsLeft === 0 ? "Waitlist Only" : `${event.spotsLeft} spots left`}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{event.title}</h3>
                  <p className="text-xs text-gray-400">{event.organization}</p>

                  <div className="text-[11px] text-gray-500 space-y-0.5 pt-1">
                    <p>📅 {event.date}</p>
                    <p>📍 {event.location}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Event Detail View */}
          {currentActiveEvent && (
            <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-6 lg:sticky lg:top-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    {currentActiveEvent.type}
                  </span>
                  {currentActiveEvent.requiresSafety && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100">
                      Safety Briefing Required
                    </span>
                  )}
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  {currentActiveEvent.title}
                </h2>
                <p className="text-xs text-gray-400">Hosted by <span className="font-bold text-gray-600">{currentActiveEvent.organization}</span></p>
              </div>

              {/* Event Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-600">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Date & Time</p>
                  <p className="font-semibold text-slate-800">{currentActiveEvent.date}</p>
                  <p className="text-gray-500">{currentActiveEvent.time}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Location</p>
                  <p className="font-semibold text-slate-800">{currentActiveEvent.location}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Overview</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{currentActiveEvent.description}</p>
              </div>

              {/* Perks */}
              {currentActiveEvent.perks && currentActiveEvent.perks.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Perks & Inclusions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentActiveEvent.perks.map((perk, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-lg">
                        ✨ {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {currentActiveEvent.spotsLeft > 0 ? `${currentActiveEvent.spotsLeft} Spots Available` : "Event Full"}
                  </p>
                  <p className="text-[10px] text-gray-400">Registration closes prior to start time</p>
                </div>

                <button
                  onClick={() => setViewMode("register")}
                  disabled={currentActiveEvent.spotsLeft === 0}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm ${
                    currentActiveEvent.spotsLeft === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  {currentActiveEvent.spotsLeft === 0 ? "Join Waitlist" : "Register Now"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}