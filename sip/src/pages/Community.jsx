import React, { useState } from 'react';
import { Search, MessageSquare, Calendar, Users, Megaphone, SlidersHorizontal, Heart, CheckCircle } from 'lucide-react';

// Sample Dataset for Human Library updated with roles and quote-style bios
const humanLibraryData = [
  { id: 'hl-1', name: 'Lev', role: 'Chef', quote: 'Food connects us', bio: 'Audio engineer & indie rock drummer. Loves vintage analog record mixing.', interests: ['Drums', 'Vinyl', 'Music Scene'], spots: ['Maxwell Hub - Room A (Sat 2pm)', 'Tampines Hub - Booth 3 (Sun 4pm)'] },
  { id: 'hl-2', name: 'Siti', role: 'Mom', quote: 'My journey in SG', bio: 'Competes in regional slab bouldering. Expert in technical hip flexibility routes.', interests: ['Bouldering', 'Fitness', 'Sports Science'], spots: ['Outram Beta Vault - Spot 1 (Fri 7pm)'] },
  { id: 'hl-3', name: 'Sabrina', role: 'Student', quote: 'Learning and growing', bio: 'Full-stack developer building mapping plugins. Loves Python architecture.', interests: ['Python', 'React', 'Campus Tech'], spots: ['SP Tech Lab 4 (Mon 10am)'] },
  { id: 'hl-4', name: 'Emily', role: 'Manager', quote: 'Communication is important', bio: 'Community organizer hosting neighbourhood workshops and heritage walks.', interests: ['Events', 'Community', 'Leadership'], spots: ['City Canvas - Table 2 (Thu 3pm)'] }
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
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [connectedIds, setConnectedIds] = useState([]);

  // Filter library cards based on search input across name, role, quote, or interests
  const filteredLibrary = humanLibraryData.filter(person =>
    person.name.toLowerCase().includes(librarySearch.toLowerCase()) ||
    person.role.toLowerCase().includes(librarySearch.toLowerCase()) ||
    person.quote.toLowerCase().includes(librarySearch.toLowerCase()) ||
    person.interests.some(interest => interest.toLowerCase().includes(librarySearch.toLowerCase()))
  );

  const handleConnect = (person) => {
    if (!connectedIds.includes(person.id)) {
      setConnectedIds([...connectedIds, person.id]);
    }

    if (triggerDirectMessage) {
      triggerDirectMessage({
        id: person.id,
        name: person.name,
        handle: person.id.includes('hl') ? `${person.name.toLowerCase()}_book` : person.handle,
        messages: [{ sender: 'them', text: `Hi! Thanks for connecting through the Human Library. Let's arrange a time to chat!`, time: 'Just now' }]
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left pb-24 font-sans">
      
      {/* Page Title & Navigation Header */}
      <div className="border-b border-gray-200 pb-4 space-y-1">
        <h1 className="text-3xl font-serif font-normal text-slate-900">Co-Co</h1>
        <h2 className="text-2xl font-serif font-semibold text-slate-800">Human Library</h2>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-gray-100 gap-6 text-xs font-bold">
        <button 
          onClick={() => setActiveFilter('library')} 
          className={`pb-2.5 transition-colors ${activeFilter === 'library' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          📖 Human Books
        </button>
        <button 
          onClick={() => setActiveFilter('groups')} 
          className={`pb-2.5 transition-colors ${activeFilter === 'groups' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          👥 Community Groups
        </button>
        <button 
          onClick={() => setActiveFilter('connects')} 
          className={`pb-2.5 transition-colors ${activeFilter === 'connects' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-400 hover:text-gray-600'}`}
        >
          🔄 Past Event Links
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: HUMAN LIBRARY (GRID LAYOUT MATCHING IMAGE)          */}
      {/* ========================================================= */}
      {activeFilter === 'library' && (
        <div className="space-y-6">
          
          {/* Search Bar & Filter Button */}
          <div className="flex items-center gap-3 max-w-sm">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
              <input 
                type="text"
                value={librarySearch}
                onChange={(e) => setLibrarySearch(e.target.value)}
                placeholder="Search"
                className="w-full pl-9 pr-3 py-1.5 bg-gray-100/80 border border-transparent rounded-lg text-xs outline-none focus:bg-white focus:border-slate-300 transition-all"
              />
            </div>
            <button className="p-2 border border-slate-900 rounded-lg hover:bg-slate-50 transition-colors">
              <SlidersHorizontal size={14} className="text-slate-900" />
            </button>
          </div>

          {/* Cards Grid Container */}
          {filteredLibrary.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredLibrary.map((person) => {
                const isSelected = selectedBook?.id === person.id;
                const isConnected = connectedIds.includes(person.id);

                return (
                  <div 
                    key={person.id}
                    onClick={() => setSelectedBook(person)}
                    className={`bg-[#F9F9F6] border-2 border-slate-900 rounded-2xl p-5 text-center flex flex-col items-center justify-between space-y-4 cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-emerald-500 shadow-md' : ''
                    }`}
                  >
                    {/* Circle Avatar */}
                    <div className="w-20 h-20 rounded-full bg-amber-100/80 border border-slate-300 flex items-center justify-center text-2xl font-bold text-slate-700 shadow-xs">
                      {person.name.charAt(0)}
                    </div>

                    {/* Name, Role & Quote */}
                    <div className="space-y-1 flex-1">
                      <h3 className="text-lg font-serif font-semibold text-slate-900">{person.name}</h3>
                      <p className="text-xs font-semibold text-slate-600">{person.role}</p>
                      <p className="text-xs italic text-slate-500 pt-1">"{person.quote}"</p>
                    </div>

                    {/* Connect Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConnect(person);
                      }}
                      className={`w-full py-2 border-2 border-slate-900 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                        isConnected
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-[#E3EFE6] hover:bg-[#d2e5d6] text-slate-900'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <CheckCircle size={13} /> Connected
                        </>
                      ) : (
                        'Connect'
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs">
              No human books match your search filter.
            </div>
          )}

          {/* Bottom Action: Book a Conversation Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                if (!selectedBook && filteredLibrary.length > 0) {
                  setSelectedBook(filteredLibrary[0]);
                }
                setShowBookingModal(true);
              }}
              className="w-full max-w-xl mx-auto block py-3 border-2 border-slate-900 bg-[#E3EFE6] hover:bg-[#d2e5d6] text-slate-900 font-serif font-bold text-base rounded-2xl transition-all shadow-xs"
            >
              Book a Conversation {selectedBook ? `with ${selectedBook.name}` : ''}
            </button>
          </div>

          {/* Booking Slots Drawer / Modal */}
          {showBookingModal && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 text-left shadow-xl">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900">
                      Book Session with {selectedBook ? selectedBook.name : 'Human Book'}
                    </h3>
                    <p className="text-xs text-gray-500">{selectedBook?.role} • "{selectedBook?.quote}"</p>
                  </div>
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="p-1 text-gray-400 hover:text-slate-900 rounded-lg text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Available Locations & Times</p>
                  {selectedBook?.spots?.map((spot, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <span className="text-xs font-medium text-slate-800">📍 {spot}</span>
                      <button 
                        onClick={() => {
                          alert(`🗓️ Conversation booked with ${selectedBook.name} at ${spot}!`);
                          setShowBookingModal(false);
                        }}
                        className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors"
                      >
                        Book
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="w-full py-2 bg-gray-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: COMMUNITY GROUPS                                   */}
      {/* ========================================================= */}
      {activeFilter === 'groups' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Megaphone size={12}/> Group Announcements</h3>
            {groupAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{ann.group}</span>
                  <span className="text-[10px] text-gray-400">{ann.time}</span>
                </div>
                <p className="text-xs font-semibold text-slate-500">Posted by {ann.author}</p>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{ann.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5"><Users size={12}/> Find/Create Channels</h3>
            <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3">
              {['Redhill Climbers Hub', 'Kampong Glam Vinyl Crew', 'SP Tech Explorers'].map((grp, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs font-semibold text-slate-800 truncate pr-2"># {grp}</span>
                  <button 
                    onClick={() => handleConnect({ id: `grp-${i}`, name: grp, handle: 'group_channel' })}
                    className="p-1.5 bg-gray-50 hover:bg-slate-900 hover:text-white rounded-lg transition-colors text-slate-400"
                  >
                    <MessageSquare size={12} />
                  </button>
                </div>
              ))}
              <button className="w-full mt-2 py-2 border border-dashed border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl transition-all">
                + Create New Space
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: PAST EVENT CONNECTIONS                             */}
      {/* ========================================================= */}
      {activeFilter === 'connects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pastConnections.map((user) => (
            <div key={user.id} className="bg-white border border-gray-200 p-4 rounded-2xl shadow-xs flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{user.name}</h4>
                  <span className={`w-2 h-2 rounded-full ${user.status === 'Online' ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                </div>
                <p className="text-xs text-gray-400">Met via: <span className="text-slate-700 font-medium">{user.eventAttended}</span></p>
              </div>
              <button 
                onClick={() => handleConnect(user)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
              >
                <MessageSquare size={11} /> Chat
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}