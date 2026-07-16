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
              <h3 className="text-xs font-bold text-amber-800 flex items-center gap-1">⚠️ Mandatory Safety Brief Requirements</h3>
              <p className="text-[11px] text-amber-900/80 leading-relaxed">{currentActiveEvent.safetyInfo}</p>
              
              <div className="aspect-video w-full max-w-md bg-slate-900 rounded-xl flex items-center justify-center border border-slate-950 shadow-inner relative overflow-hidden">
                <span className="text-2xl z-10">📺</span>
                <span className="text-[10px] text-slate-400 absolute bottom-3 z-10 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                  Click to play 2-min brief stream module
                </span>
              </div>

              <label className="flex items-center gap-2 pt-1 select-none cursor-pointer">
                <input 
                  type="checkbox" checked={regFormData.watchedVideo}
                  onChange={(e) => setRegFormData({...regFormData, watchedVideo: e.target.checked})}
                  className="rounded border-amber-300 text-emerald-800 focus:ring-emerald-800"
                />
                <span className="text-[11px] text-amber-900 font-medium">I verify that I have watched and accept the safety rules.</span>
              </label>
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Applicant Intake Data</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Full Name</label>
                <input 
                  type="text" required placeholder="e.g. John Doe" value={regFormData.name}
                  onChange={(e) => setRegFormData({...regFormData, name: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-600 uppercase">Contact Number</label>
                <input 
                  type="tel" required placeholder="e.g. +65 9123 4567" value={regFormData.contact}
                  onChange={(e) => setRegFormData({...regFormData, contact: e.target.value})}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-600 uppercase">Additional Information</label>
              <textarea 
                rows="3" placeholder="List any specific equipment needs, dietary tracks, or skill levels..."
                value={regFormData.notes} onChange={(e) => setRegFormData({...regFormData, notes: e.target.value})}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none resize-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button 
                type="button" onClick={() => setViewMode("dashboard")}
                className="px-4 py-2.5 text-xs font-bold text-gray-500 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-1 text-center font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm"
              >
                Confirm Track Reservation Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- VIEW MODE: 3. MAIN DIRECTORY DASHBOARD SCREEN ---
  return (
    <div className="flex-1 w-full min-w-0 px-2 py-4 md:p-6 text-left space-y-6 overflow-x-hidden bg-transparent">
      
      {/* Main Filter Control & Title Header Block */}
      <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Events Hub</h1>
            <p className="text-xs text-gray-400 mt-0.5">Browse or host upcoming opportunities, skill-swaps, and local tracks.</p>
          </div>
          {/* Host Registration Control Button */}
          <button
            onClick={() => setViewMode("create")}
            className="shrink-0 text-[11px] font-bold uppercase tracking-wider bg-emerald-800 text-white border border-emerald-800 px-4 py-2.5 rounded-xl hover:bg-emerald-900 shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            <span>➕</span> Host an Event
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full relative">
          <input
            type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, host group, or keywords..."
            className="w-full pl-4 pr-10 py-2.5 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-xl border border-gray-200 focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 focus:outline-none text-xs md:text-sm transition-colors"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">🔍</span>
        </div>

        {/* Filter Selection Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-50">
          {eventTypes.map((type) => (
            <button
              key={type} onClick={() => { setSelectedType(type); setSelectedEventId(null); }}
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

      {/* Grid Display Split Pane Stack Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-start w-full">
        
        {/* LEFT STREAM: Interactive Briefing Cards */}
        <div className="xl:col-span-7 space-y-3 min-w-0 w-full">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-1 shadow-sm">
              <span className="text-lg block">📂</span>
              <h3 className="font-bold text-gray-800 text-xs">No opportunities listed</h3>
            </div>
          ) : (
            filteredEvents.map((item) => (
              <div
                key={item.id} onClick={() => setSelectedEventId(item.id)}
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
                      <h3 className="font-bold text-slate-900 text-xs md:text-sm mt-1.5 truncate">{item.title}</h3>
                      <p className="text-[11px] text-gray-400 truncate">{item.organization}</p>
                    </div>
                    <span className={`text-[8px] shrink-0 font-bold px-1.5 py-0.5 rounded border ${
                      item.status === 'Waitlist Only' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200/50'
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
                  <span className="font-medium text-gray-400">🔥 {item.spotsLeft > 0 ? `${item.spotsLeft} slots open` : 'Full'}</span>
                  <span className="font-bold text-emerald-800">Learn More & Register →</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT COLUMN: Permanent Snapshot Sticky Details Pane */}
        <div className="xl:col-span-5 w-full">
          {currentActiveEvent ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4 text-left w-full">
              <div className="space-y-2">
                <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                  {currentActiveEvent.type}
                </span>
                <h2 className="text-sm font-bold text-slate-900 leading-tight">{currentActiveEvent.title}</h2>
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
                <p className="text-[11px] text-gray-500 leading-relaxed">{currentActiveEvent.description}</p>
              </div>

              {currentActiveEvent.perks && currentActiveEvent.perks.length > 0 && (
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
                  onClick={() => setViewMode("register")}
                  className={`w-full text-center font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-xl transition-all ${
                    currentActiveEvent.spotsLeft === 0
                      ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                      : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm active:scale-[0.99]'
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