import React, { useState } from 'react';
import { Search, MessageSquare, BookOpen, Calendar, Users, Heart, X, Megaphone } from 'lucide-react';

// Sample Dataset for Human Library
const humanLibraryData = [
  { id: 'hl-1', name: 'Marcus Tan', bio: 'Audio engineer & indie rock drummer. Loves vintage analog record mixing.', interests: ['Drums', 'Vinyl', 'Music Scene'], spots: ['Maxwell Hub - Room A (Sat 2pm)', 'Tampines Hub - Booth 3 (Sun 4pm)'] },
  { id: 'hl-2', name: 'Sarah Lim', bio: 'Competes in regional slab bouldering. Expert in technical hip flexibility routes.', interests: ['Bouldering', 'Fitness', 'Sports Science'], spots: ['Outram Beta Vault - Spot 1 (Fri 7pm)'] },
  { id: 'hl-3', name: 'Viknesh Raj', bio: 'Full-stack developer building mapping plugins. Loves Python architecture.', interests: ['Python', 'React', 'Campus Tech'], spots: ['SP Tech Lab 4 (Mon 10am)'] }
];

// Sample Dataset for Community Groups
const groupAnnouncements = [
  { id: 1, group: 'Redhill Climbers Club', author: 'Coach Dave', time: '2 hours ago', text: 'Hey dynamic crew! The slab wall at the central community hub has just been reset with advanced technical configurations. Check it out!' },
  { id: 2, group: 'SG Audio Collective', author: 'Elaine Soh', time: 'Yesterday', text: 'Reminder that registrations for the analog drum cover masterclass close tonight. We only have 4 seats left!' }
];

// Sample Dataset for Connections from Past Events
const pastConnections = [
  { id: 'p-1', name: 'Darren Goh', eventAttended: 'Maxwell Hawker Heritage Tour', handle: 'darren_eats', status: 'Online' },
  { id: 'p-2', name: 'Amanda Teo', eventAttended: 'Acoustic Analog Jam Session', handle: 'mandy_keys', status: 'Offline' }
];

export default function Community({ triggerDirectMessage }) {
  const [activeFilter, setActiveFilter] = useState('library');
  const [librarySearch, setLibrarySearch] = useState('');
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [showSpotsId, setShowSpotsId] = useState(null);

  // Filter library cards dynamically based on searched interests
  const filteredLibrary = humanLibraryData.filter(person => 
    person.interests.some(interest => interest.toLowerCase().includes(librarySearch.toLowerCase()))
  );

  const currentCard = filteredLibrary[currentCardIdx];

  const handleConnect = (person) => {
    if (triggerDirectMessage) {
      triggerDirectMessage({
        id: person.id,
        name: person.name,
        handle: person.id.includes('hl') ? 'human_library_guest' : person.handle,
        messages: [{ sender: 'them', text: `Hi! Thanks for connecting through the Community portal. Let's arrange a time to chat!`, time: 'Just now' }]
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-24">
      {/* Title Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Community Spaces</h1>
        <p className="text-sm text-gray-500">Discover human books, join collaborative hubs, and link up with familiar faces.</p>
      </div>

      {/* Filter Navigation Bar */}
      <div className="flex border-b border-gray-100 gap-6 text-sm font-bold">
        <button 
          onClick={() => setActiveFilter('library')} 
          className={`pb-3 transition-colors ${activeFilter === 'library' ? 'border-b-2 border-[#046A4E] text-[#046A4E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          📖 Human Library
        </button>
        <button 
          onClick={() => setActiveFilter('groups')} 
          className={`pb-3 transition-colors ${activeFilter === 'groups' ? 'border-b-2 border-[#046A4E] text-[#046A4E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          👥 Community Groups
        </button>
        <button 
          onClick={() => setActiveFilter('connects')} 
          className={`pb-3 transition-colors ${activeFilter === 'connects' ? 'border-b-2 border-[#046A4E] text-[#046A4E]' : 'text-gray-400 hover:text-gray-600'}`}
        >
          🔄 Past Event Links
        </button>
      </div>

      {/* INTERFACE 1: HUMAN LIBRARY (TINDER STYLE SWIPER + SEARCH) */}
      {activeFilter === 'library' && (
        <div className="space-y-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 text-gray-400" size={16} />
            <input 
              type="text"
              value={librarySearch}
              onChange={(e) => { setLibrarySearch(e.target.value); setCurrentCardIdx(0); }}
              placeholder="Search human books by shared interests (e.g., Drums, Bouldering, Python)..."
              className="w-full px-4 py-2.5 pl-10 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#046A4E]/20"
            />
          </div>

          {currentCard ? (
            <div className="max-w-md mx-auto bg-white border border-gray-100 rounded-3xl shadow-xl overflow-hidden p-6 space-y-6 relative transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">{currentCard.name}</h3>
                  <span className="text-xs font-mono px-2 py-0.5 bg-emerald-50 text-[#046A4E] rounded-full border border-emerald-100">Human Book</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed min-h-12">{currentCard.bio}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {currentCard.interests.map((tag, i) => (
                  <span key={i} className="text-[10px] bg-slate-100 font-bold uppercase tracking-wide text-slate-600 px-2 py-0.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Booking Segment Toggler */}
              <div className="border-t border-dashed border-gray-100 pt-3">
                <button 
                  onClick={() => setShowSpotsId(showSpotsId === currentCard.id ? null : currentCard.id)}
                  className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 font-bold transition-colors"
                >
                  <Calendar size={12} /> {showSpotsId === currentCard.id ? 'Hide Booking Spots' : 'View Available Spots to Book'}
                </button>
                
                {showSpotsId === currentCard.id && (
                  <div className="mt-2 space-y-1 bg-amber-50/50 border border-amber-100/40 p-2 rounded-xl">
                    {currentCard.spots.map((spot, i) => (
                      <div key={i} className="text-[11px] text-amber-900 flex justify-between items-center py-0.5">
                        <span>📍 {spot}</span>
                        <button className="px-2 py-0.5 bg-amber-600 hover:bg-amber-700 text-white rounded font-bold text-[9px] uppercase tracking-wide">Book</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Tinder Action Buttons */}
              <div className="flex items-center justify-center gap-6 pt-2">
                <button 
                  onClick={() => setCurrentCardIdx((prev) => (prev + 1) % filteredLibrary.length)}
                  className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all scale-100 hover:scale-105 active:scale-95"
                >
                  <X size={20} />
                </button>
                <button 
                  onClick={() => { handleConnect(currentCard); handleConnect(currentCard); }}
                  className="px-6 h-12 rounded-full bg-[#046A4E] hover:bg-[#03543e] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all scale-100 hover:scale-105 active:scale-95"
                >
                  <Heart size={14} className="fill-white" /> Connect Box
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-gray-400 text-sm">
              No human books matching those specific catalog parameters. Try checking alternative terms!
            </div>
          )}
        </div>
      )}

      {/* INTERFACE 2: COMMUNITY GROUPS (FACEBOOK ANN-BOARD STYLE) */}
      {activeFilter === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Main Feed Column */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Megaphone size={12}/> Group Announcements</h3>
            {groupAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-[#046A4E] bg-emerald-50 px-2 py-0.5 rounded-md">{ann.group}</span>
                  <span className="text-[10px] text-gray-400">{ann.time}</span>
                </div>
                <p className="text-xs font-bold text-slate-500">Posted by {ann.author}</p>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{ann.text}</p>
              </div>
            ))}
          </div>

          {/* Group Chat Directories Sidebar Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Users size={12}/> Find/Create Channels</h3>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-3">
              {['Redhill Climbers Hub', 'Kampong Glam Vinyl Crew', 'SP Tech Explorers'].map((grp, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs font-bold text-slate-800 truncate pr-2"># {grp}</span>
                  <button 
                    onClick={() => handleConnect({ id: `grp-${i}`, name: grp, handle: 'group_channel' })}
                    className="p-1.5 bg-slate-50 hover:bg-[#046A4E] hover:text-white rounded-lg transition-colors text-slate-400"
                  >
                    <MessageSquare size={12} />
                  </button>
                </div>
              ))}
              <button className="w-full mt-2 py-2 border border-dashed border-emerald-300 hover:bg-emerald-50/50 text-[#046A4E] font-bold text-xs rounded-xl transition-all">
                + Create New Space
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERFACE 3: PAST EVENTS CONNECT ROSTER */}
      {activeFilter === 'connects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pastConnections.map((user) => (
            <div key={user.id} className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{user.name}</h4>
                  <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Online' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </div>
                <p className="text-[11px] text-gray-400">Met via: <span className="text-slate-600 font-medium">{user.eventAttended}</span></p>
              </div>
              <button 
                onClick={() => handleConnect(user)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] rounded-xl uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <MessageSquare size={10} /> Chat
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}