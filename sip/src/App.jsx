import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SocialPane from './components/SocialPane';
import Home from './pages/Home';
import EventsPage from './pages/Events';
import SettingsPage from './pages/Settings';
import Community from './pages/Community';
import { ArrowLeft, Search, Clock, MapPin } from 'lucide-react';

// Static database for the Articles search hub
const allArticles = [
  { id: 1, category: "Hawker Culture", title: "The Secret Heritage of Maxwell Hawker Masters", readTime: "5 min read", snippet: "Uncovering the multi-generational spice blends and traditional methods kept alive behind local stalls.", content: "Behind the neon signs of Maxwell Food Centre lies generations of culinary dedication. We sit down with third-generation hawker owners who reveal the painstaking hours spent preparing traditional stocks and heritage balance before dawn breaks." },
  { id: 2, category: "Urban Exploration", title: "Hidden Quarry Trails You Haven't Explored Yet", readTime: "7 min read", snippet: "A complete visual mapping of rustic green corridors hidden off the standard urban pathways.", content: "Nestled deep past urban buffers, Singapore's old granite quarries have transformed into rich green hubs. This guide maps out entry gates, wildlife precautions, and the best vantage points for morning mist photography away from standard crowds." },
  { id: 3, category: "Music Scene", title: "Vinyl Revivals: The Indie Record Stores of Kampong Glam", readTime: "4 min read", snippet: "Why analog media collection is making a massive comeback among young local musicians.", content: "From rare city-pop pressings to indie local rock bands, the physical crate-digging scene is booming. Shop owners share how physical spaces are creating communities that digital streaming platforms simply cannot duplicate." }
];

// Sample Local Locations Corpus for Map Page Interactive Search
const communityLocations = [
  { id: 'loc-1', name: 'Maxwell Community Studio Booth', area: 'Central', description: 'Co-working and podcasting facilities.' },
  { id: 'loc-2', name: 'Redhill Bouldering Slab Hub', area: 'Queenstown', description: 'Public climbing wall facility.' },
  { id: 'loc-3', name: 'Kampong Glam Music Jam Space', area: 'Rochor', description: 'Acoustic instruments and drums array.' },
  { id: 'loc-4', name: 'Tampines Green Ridge Study Corner', area: 'East', description: 'Quiet dynamic collaborative workspace spaces.' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  
  // Interactive Map Page Layout States
  const [mapSearch, setMapSearch] = useState('');
  const [selectedMapFilter, setSelectedMapFilter] = useState('all');
  const [showMapDropdown, setShowMapDropdown] = useState(false);

  // WhatsApp Global Context Memory Threads
  const [chatRooms, setChatRooms] = useState([
    { id: '1', name: 'Alfie (Bouldering)', handle: 'alfie_v7', messages: [{ sender: 'them', text: 'Yo, down to run some sets on the slab wall tonight?', time: '4:15 PM' }] },
    { id: '2', name: 'Jem (SP Band)', handle: 'jem_drums', messages: [{ sender: 'you', text: 'Double hit on hi-hat sounds clean for the chorus!', time: 'Yesterday' }] }
  ]);

  const [currentUser, setCurrentUser] = useState({
    type: 'personal',
    name: 'Chiew',
    handle: 'chiew_climbs',
    email: 'chiew@sp.edu.sg',
    bio: 'Boulder enthusiast 🧗‍♂️ | Audio tinkerer 🥁 | Aspiring Engineer',
    interests: ['Bouldering', 'Drums', 'Python', 'Football']
  });

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(articleSearchQuery.toLowerCase())
  );

  // Filter map suggestions dynamically based on user input string lengths
  const filteredMapLocations = mapSearch.trim().length > 0 
    ? communityLocations.filter(loc => loc.name.toLowerCase().includes(mapSearch.toLowerCase()) || loc.area.toLowerCase().includes(mapSearch.toLowerCase()))
    : [];

  const handleDirectConnectMessagingSeed = (constructedTargetRoom) => {
    setChatRooms(prevRooms => {
      const roomExists = prevRooms.find(r => r.id === constructedTargetRoom.id);
      if (!roomExists) return [...prevRooms, constructedTargetRoom];
      return prevRooms;
    });
    setIsMessagingOpen(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FBFBFA] font-sans text-gray-800 relative">
      
      {/* Mobile Sidebar Backdrop Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* Sidebar Framework Layout */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentPage={currentPage} setCurrentPage={(page) => { setCurrentPage(page); setIsSidebarOpen(false); }} />
      </div>

      {/* Main Container Viewport */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        
        {/* Mobile Header Bar Navigation */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden bg-white shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">🍔</button>
          <span className="font-serif font-bold text-lg text-[#046A4E]">COCO</span>
          <button onClick={() => setIsMessagingOpen(!isMessagingOpen)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">💬</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          
          {currentPage === 'home' && <Home setCurrentTab={(targetTab) => setCurrentPage(targetTab)} />}
          {currentPage === 'events' && <EventsPage currentUser={currentUser} />}
          {currentPage === 'community' && <Community triggerDirectMessage={handleDirectConnectMessagingSeed} />}
          {currentPage === 'settings' && <SettingsPage currentUser={currentUser} setCurrentUser={setCurrentUser} />}
          
          {currentPage === 'games' && (
            <div className="max-w-4xl mx-auto space-y-4 text-left">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Arcade & Games</h1>
              <p className="text-sm text-gray-500">Unwind with simple local web games.</p>
            </div>
          )}

          {/* UPGRADED MAP PAGE INTERFACE VIEW */}
          {currentPage === 'map' && (
            <div className="max-w-4xl mx-auto space-y-6 text-left relative">
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-900">Shared Spaces Map</h1>
                <p className="text-sm text-gray-500">Locate and book available neighborhood studios, pitches, or study lounges.</p>
              </div>

              {/* SEARCH BAR CONTAINER PANELS WITH FLOATING DROPDOWN OPTIONS RESULTS */}
              <div className="relative w-full z-20">
                <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={mapSearch}
                  onFocus={() => setShowMapDropdown(true)}
                  onChange={(e) => { setMapSearch(e.target.value); setShowMapDropdown(true); }}
                  placeholder="Type to search for active neighborhood spaces (e.g., Redhill, Studio)..." 
                  className="w-full px-4 py-3 pl-11 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#046A4E]/20 transition-all"
                />

                {/* DYNAMIC RESULTS POPUP OVERLAY */}
                {showMapDropdown && filteredMapLocations.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2 space-y-1">
                    <div className="p-2 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-50">Matching Locations Found</div>
                    {filteredMapLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() => { setMapSearch(loc.name); setShowMapDropdown(false); }}
                        className="w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 group"
                      >
                        <span className="p-2 bg-emerald-50 text-[#046A4E] rounded-lg group-hover:bg-[#046A4E] group-hover:text-white transition-colors"><MapPin size={14} /></span>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">{loc.name}</h4>
                          <p className="text-[10px] text-gray-400">{loc.area} Area • {loc.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Overlay backdrop block screen to close dropdown safely */}
                {showMapDropdown && <div className="fixed inset-0 z-[-1]" onClick={() => setShowMapDropdown(false)} />}
              </div>

              {/* DYNAMIC HORIZONTAL SCROLLABLE MAP FILTER ROW FOR MOBILE VIEWS */}
              <div className="w-full overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2 pb-2 -mb-2">
                {[
                  { id: 'all', label: '🌐 All Spaces' },
                  { id: 'studios', label: '🥁 Audio Studios' },
                  { id: 'climbing', label: '🧗‍♂️ Climbing Walls' },
                  { id: 'sports', label: '⚽ Sports Fields' },
                  { id: 'study', label: '📚 Study Hubs' }
                ].map((flt) => {
                  const active = selectedMapFilter === flt.id;
                  return (
                    <button
                      key={flt.id}
                      onClick={() => setSelectedMapFilter(flt.id)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl border tracking-wide uppercase transition-all shrink-0 ${
                        active 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                          : 'bg-white text-slate-600 border-gray-100 hover:bg-slate-50'
                      }`}
                    >
                      {flt.label}
                    </button>
                  );
                })}
              </div>

              {/* Visual Map Canvas Grid Mock Frame Container */}
              <div className="w-full h-96 rounded-3xl border border-dashed border-slate-200 bg-slate-50/70 flex flex-col items-center justify-center p-8 text-center text-gray-400 select-none">
                <span className="text-3xl filter drop-shadow-sm mb-2">🗺️</span>
                <p className="text-xs font-bold text-slate-700">Interactive OpenStreetMap Leaflet Engine View Canvas</p>
                <p className="text-[10px] text-slate-400 max-w-xs mt-1">Filtering active slots for category layout maps: <span className="font-mono text-[#046A4E] font-bold">[{selectedMapFilter}]</span></p>
              </div>
            </div>
          )}

          {/* DEDICATED ARTICLES DIRECTORY VIEW */}
          {currentPage === 'articles' && (
            <div className="max-w-3xl mx-auto space-y-6 text-left pb-12">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft size={14} /> Back to Feed
              </button>
              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Featured Stories</h1>
              </div>
              <div className="relative w-full">
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder="Search articles..." 
                  className="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#046A4E]/20"
                />
              </div>
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-2">
                    <h2 className="text-lg font-bold text-slate-900">{article.title}</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">{article.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MOBILE RESPONSIVE SLIDE-OVER TEXT TRAY CONTAINER LAYOUT FOR WHATSAPP PORTAL */}
      {isMessagingOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMessagingOpen(false)} />
      )}
      <div className={`fixed inset-y-0 right-0 z-50 md:z-auto md:relative transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        isMessagingOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      }`}>
        <div className="relative h-full bg-white border-l border-gray-100">
          <button 
            onClick={() => setIsMessagingOpen(false)} 
            className="absolute top-4 left-[-64px] z-50 md:hidden bg-slate-900 text-white p-2 rounded-xl text-xs font-bold shadow-md"
          >
            ✕ Close
          </button>
          <SocialPane chatRoomsData={chatRooms} onAppendNewRoom={(updatedSet) => setChatRooms(updatedSet)} />
        </div>
      </div>

    </div>
  );
}