import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SocialPane from './components/SocialPane';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import EventsPage from './pages/Events';
import SettingsPage from './pages/Settings';
import Community from './pages/Community';
import { ArrowLeft, Search, Clock } from 'lucide-react';

// Static database for the Articles search hub
const allArticles = [
  { id: 1, category: "Hawker Culture", title: "The Secret Heritage of Maxwell Hawker Masters", readTime: "5 min read", snippet: "Uncovering the multi-generational spice blends and traditional methods kept alive behind local stalls.", content: "Behind the neon signs of Maxwell Food Centre lies generations of culinary dedication. We sit down with third-generation hawker owners who reveal the painstaking hours spent preparing traditional stocks and heritage balance before dawn breaks." },
  { id: 2, category: "Urban Exploration", title: "Hidden Quarry Trails You Haven't Explored Yet", readTime: "7 min read", snippet: "A complete visual mapping of rustic green corridors hidden off the standard urban pathways.", content: "Nestled deep past urban buffers, Singapore's old granite quarries have transformed into rich green hubs. This guide maps out entry gates, wildlife precautions, and the best vantage points for morning mist photography away from standard crowds." },
  { id: 3, category: "Music Scene", title: "Vinyl Revivals: The Indie Record Stores of Kampong Glam", readTime: "4 min read", snippet: "Why analog media collection is making a massive comeback among young local musicians.", content: "From rare city-pop pressings to indie local rock bands, the physical crate-digging scene is booming. Shop owners share how physical spaces are creating communities that digital streaming platforms simply cannot duplicate." },
  { id: 4, category: "Fitness & Sport", title: "Mastering the Slab Wall: Balance Over Power", readTime: "6 min read", snippet: "Technical climbing movements required to send complex routes without exhausting your grip.", content: "Climbing vertical or rock-face slab walls demands total weight management, hip flexibility, and high reliance on absolute foot precision rather than upper body dynamic pulling strength. We analyze route-setting patterns for advanced grades." },
  { id: 5, category: "Campus Tech", title: "Building Responsive Leaflet Maps in Modern React Components", readTime: "8 min read", snippet: "Optimizing window bounds and DOM scaling triggers to handle rich customized application overlays.", content: "Map layout render failures often map back to unhandled layout size adjustments. Learn how implementing resize timeouts and custom tile cache engines preserves silky responsive map rendering during rapid panel shifting." }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  
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

  // Articles search pipeline filter
  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
    article.snippet.toLowerCase().includes(articleSearchQuery.toLowerCase())
  );

  // Unified trigger handler to bind Community/Human Library hooks seamlessly to the Messaging panel
  const handleDirectConnectMessagingSeed = (constructedTargetRoom) => {
    setChatRooms(prevRooms => {
      const roomExists = prevRooms.find(r => r.id === constructedTargetRoom.id);
      if (!roomExists) {
        return [...prevRooms, constructedTargetRoom];
      }
      return prevRooms;
    });
    setIsMessagingOpen(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FBFBFA] font-sans text-gray-800 relative">
      
      {/* Mobile Sidebar Overlay Backdrops */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* Sidebar Core */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentPage={currentPage} setCurrentPage={(page) => { setCurrentPage(page); setIsSidebarOpen(false); }} />
      </div>

      {/* Main Viewport Router */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        {/* Mobile Navbar Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden bg-white shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">🍔</button>
          <span className="font-serif font-bold text-lg text-emerald-800">COCO</span>
          <button onClick={() => setIsMessagingOpen(true)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">💬</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          
          {currentPage === 'home' && (
            <Home setCurrentTab={(targetTab) => setCurrentPage(targetTab)} />
          )}
          
          {currentPage === 'map' && <MapPage />}
          
          {currentPage === 'events' && <EventsPage currentUser={currentUser} />}
          
          {currentPage === 'community' && (
            <Community triggerDirectMessage={handleDirectConnectMessagingSeed} />
          )}
          
          {currentPage === 'games' && (
            <div className="max-w-4xl mx-auto space-y-4 text-left">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Arcade & Games</h1>
              <p className="text-sm text-gray-500">Unwind with simple local web games.</p>
            </div>
          )}
          
          {currentPage === 'settings' && (
            <SettingsPage currentUser={currentUser} setCurrentUser={setCurrentUser} />
          )}

          {/* DEDICATED ARTICLES SEARCH DIRECTORY */}
          {currentPage === 'articles' && (
            <div className="max-w-3xl mx-auto space-y-6 text-left pb-12">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={14} /> Back to Feed
              </button>

              <div className="space-y-2">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Featured Stories Directory</h1>
                <p className="text-sm text-gray-500">Explore community entries, analytical blogs, and deep dives.</p>
              </div>

              {/* Functional Search Bar */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder="Search articles by title, tags, or contents..." 
                  className="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#046A4E]/20 transition-shadow"
                />
              </div>

              {/* Filtered Articles Array */}
              <div className="space-y-4">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <div key={article.id} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-slate-900 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wide">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                          <Clock size={12} /> {article.readTime}
                        </span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900">{article.title}</h2>
                      <p className="text-sm text-slate-600 leading-relaxed">{article.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-gray-400 text-sm">
                    No articles matching your terms were found.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* WhatsApp Right Hand Social Bar Tray */}
      <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto ${isMessagingOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="relative h-full bg-white border-l border-gray-100">
          <button 
            onClick={() => setIsMessagingOpen(false)} 
            className="absolute top-4 left-[-70px] z-50 md:hidden bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-md"
          >
            ✕ Close
          </button>
          <SocialPane chatRoomsData={chatRooms} onAppendNewRoom={(updatedSet) => setChatRooms(updatedSet)} />
        </div>
      </div>

    </div>
  );
}