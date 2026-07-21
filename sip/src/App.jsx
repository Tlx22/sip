import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SocialPane from './components/SocialPane';
import Home from './pages/Home';
import MapPage from './pages/MapPage'; 
import EventsPage from './pages/Events';
import SettingsPage from './pages/Settings';
import Community from './pages/Community';
import { ArrowLeft, Search } from 'lucide-react';

const allArticles = [
{ 
    id: 1, 
    category: "MDW Safety & Well-being", 
    title: "Essential Safety Guidelines for High-Rise Home Cleaning", 
    readTime: "4 min read", 
    snippet: "Crucial MOM height-safety regulations and precautions when cleaning window exteriors or balconies.", 
    content: "Safety at home is paramount..."
  },
  { 
    id: 2, 
    category: "Cultural Exposure", 
    title: "Tastes of Home: Traditional Indonesian & Tagalog Festive Dishes", 
    readTime: "6 min read", 
    snippet: "Exploring the heritage and ingredients behind iconic dishes prepared during cultural celebrations.", 
    content: "Food is one of the strongest bridges..."
  },
  { 
    id: 3, 
    category: "Community Highlights", 
    title: "Highlights from the Sunday Community Culinary Exchange", 
    readTime: "5 min read", 
    snippet: "Recap of last weekend's cooking masterclass...", 
    content: "Over 80 participants gathered..."
  },
  { 
    id: 4, 
    category: "MDW Safety & Well-being", 
    title: "Navigating Rest Days, Helplines & Mental Wellness Resources", 
    readTime: "5 min read", 
    snippet: "Key contacts, support channels, and recreational hubs...", 
    content: "Rest days are vital..."
  },
  { 
    id: 5, 
    category: "Cultural Exposure", 
    title: "Basic Conversational Phrases: Connecting Through Language", 
    readTime: "4 min read", 
    snippet: "Simple everyday Bahasa Indonesia, Tagalog, and English phrases...", 
    content: "Clear and empathetic communication..."
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  
  // WhatsApp State
  const [chatRooms, setChatRooms] = useState([
    { id: '1', name: 'Alfie (Bouldering)', handle: 'alfie_v7', messages: [{ sender: 'them', text: 'Yo, down to run some sets on the slab wall tonight?', time: '4:15 PM' }] },
    { id: '2', name: 'Jem (SP Band)', handle: 'jem_drums', messages: [{ sender: 'you', text: 'Double hit on hi-hat sounds clean for the chorus!', time: 'Yesterday' }] }
  ]);

  const [currentUser, setCurrentUser] = useState({
    type: 'personal',
    name: 'Chiew',
    handle: 'chiew_climbs',
    email: 'chiew@sp.edu.sg',
    bio: 'Boulder enthusiast 🧗‍♂️ | Audio tinkerer 🥁',
    interests: ['Bouldering', 'Drums', 'Python', 'Football']
  });

  const filteredArticles = allArticles.filter(article =>
    article.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(articleSearchQuery.toLowerCase())
  );

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
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      
      {/* Sidebar Layout */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentPage={currentPage} setCurrentPage={(page) => { setCurrentPage(page); setIsSidebarOpen(false); }} />
      </div>

      {/* Main Framework Content Panel Router */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        
        {/* Mobile Header Menu Bar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden bg-white shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">🍔</button>
          <span className="font-serif font-bold text-lg text-[#046A4E]">COCO</span>
          <button onClick={() => setIsMessagingOpen(!isMessagingOpen)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">💬</button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          
          {currentPage === 'home' && <Home setCurrentTab={(targetTab) => setCurrentPage(targetTab)} />}
          {currentPage === 'map' && <MapPage />}
          {currentPage === 'events' && <EventsPage currentUser={currentUser} />}
          {currentPage === 'community' && <Community triggerDirectMessage={handleDirectConnectMessagingSeed} />}
          
          {currentPage === 'nsf' && (
            <div className="max-w-4xl mx-auto space-y-4 text-left">
              <h1 className="text-3xl font-serif font-bold text-gray-900">NSF Portfolio Hub</h1>
              <p className="text-sm text-gray-500">Track your SAT, ACT, and private H2 Math progression during service days.</p>
            </div>
          )}

          {currentPage === 'games' && (
            <div className="max-w-4xl mx-auto space-y-4 text-left">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Arcade & Games</h1>
            </div>
          )}
          
          {currentPage === 'settings' && <SettingsPage currentUser={currentUser} setCurrentUser={setCurrentUser} />}

          {/* Dedicated Articles Hub */}
          {currentPage === 'articles' && (
            <div className="max-w-3xl mx-auto space-y-6 text-left pb-12">
              <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft size={14} /> Back to Feed
              </button>
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

      {/* CLEAN OVERLAY SIDE PANEL (Overlapping issue resolved) */}
      {isMessagingOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMessagingOpen(false)} />
      )}
      
      <div className={`fixed inset-y-0 right-0 z-50 md:z-auto md:relative transform transition-transform duration-300 ease-in-out h-full ${
        isMessagingOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      }`}>
        <div className="h-full bg-white border-l border-gray-100 flex flex-col relative">
          
          {/* Top internal header bar close trigger visible ONLY on mobile */}
          <div className="p-2 border-b border-gray-100 flex justify-end md:hidden bg-slate-50">
            <button 
              onClick={() => setIsMessagingOpen(false)}
              className="text-xs font-bold px-3 py-1.5 bg-slate-900 text-white rounded-xl shadow-sm hover:bg-slate-800 transition-colors"
            >
              ✕ Close Messaging
            </button>
          </div>

          <SocialPane chatRoomsData={chatRooms} onAppendNewRoom={(updatedSet) => setChatRooms(updatedSet)} />
        </div>
      </div>

    </div>
  );
}