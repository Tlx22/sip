import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SocialPane from './components/SocialPane';
import Home from './pages/Home';
import MapPage from './pages/MapPage'; 
import EventsPage from './pages/Events';
import SettingsPage from './pages/Settings';
import Community from './pages/Community';
import { ArrowLeft, Search, Clock, X, ChevronDown, ChevronUp } from 'lucide-react';

const allArticles = [
  { 
    id: 1, 
    category: "MDW Safety & Well-being", 
    title: "Essential Safety Guidelines for High-Rise Home Cleaning", 
    readTime: "4 min read", 
    snippet: "Crucial MOM height-safety regulations and precautions when cleaning window exteriors or balconies.", 
    content: "Safety at home is paramount. Under Ministry of Manpower (MOM) regulations, cleaning the exterior of windows in high-rise homes requires strict adherence to safety conditions: adult supervision must be present, and window grilles must be locked at all times. Never stretch or lean out over balconies or ledges to clean exterior glass. Employers and helper communities should continuously review these physical safety checklists together to ensure a safe working environment for everyone."
  },
  { 
    id: 2, 
    category: "Cultural Exposure", 
    title: "Tastes of Home: Traditional Indonesian & Tagalog Festive Dishes", 
    readTime: "6 min read", 
    snippet: "Exploring the heritage and ingredients behind iconic dishes prepared during cultural celebrations.", 
    content: "Food is one of the strongest bridges between cultures. From rich Indonesian Nasi Tumpeng to traditional Tagalog Adobo and Sinigang, learning the history of these comfort foods fosters mutual respect and appreciation in households. Trying out authentic spices together not only expands culinary horizons but also provides MDWs a heartfelt space to share memories and traditions from their home countries."
  },
  { 
    id: 3, 
    category: "Community Highlights", 
    title: "Highlights from the Sunday Community Culinary Exchange", 
    readTime: "5 min read", 
    snippet: "Recap of last weekend's cooking masterclass bringing together local families and migrant domestic workers.", 
    content: "Over 80 participants gathered last Sunday at the local community hub for a collaborative culinary workshop. Local families learned traditional sambal-making techniques while MDWs were introduced to heritage hawker recipes. Beyond cooking, the event featured free basic health screenings, financial literacy check-ins, and peer networking sessions aimed at strengthening mutual support systems."
  },
  { 
    id: 4, 
    category: "MDW Safety & Well-being", 
    title: "Navigating Rest Days, Helplines & Mental Wellness Resources", 
    readTime: "5 min read", 
    snippet: "Key contacts, support channels, and recreational hubs available across Singapore.", 
    content: "Rest days are vital for emotional resilience and mental well-being. Singapore offers dedicated drop-in spaces, skills-training centers (such as FAST and CDE), and recreational hubs tailored for domestic workers. Knowing where to access 24/7 helplines, medical assistance, or advice on employment standards ensures that help is always reachable whenever challenges arise."
  },
  { 
    id: 5, 
    category: "Cultural Exposure", 
    title: "Basic Conversational Phrases: Connecting Through Language", 
    readTime: "4 min read", 
    snippet: "Simple everyday Bahasa Indonesia, Tagalog, and English phrases to improve household communication.", 
    content: "Clear and empathetic communication reduces workplace misunderstandings. Learning a few polite phrases—such as 'Terima kasih' (Thank you in Bahasa), 'Salamat' (Thank you in Tagalog), or taking time to explain household routines clearly—goes a long way in establishing trust, comfort, and mutual harmony between household members and helpers."
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  
  // Interactive Article Modal & Expansion State for Articles Tab
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [expandedArticleId, setExpandedArticleId] = useState(null);

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
    article.category.toLowerCase().includes(articleSearchQuery.toLowerCase()) ||
    article.snippet.toLowerCase().includes(articleSearchQuery.toLowerCase())
  );

  const handleDirectConnectMessagingSeed = (constructedTargetRoom) => {
    setChatRooms(prevRooms => {
      const roomExists = prevRooms.find(r => r.id === constructedTargetRoom.id);
      if (!roomExists) return [...prevRooms, constructedTargetRoom];
      return prevRooms;
    });
    setIsMessagingOpen(true);
  };

  const getCategoryBadgeStyle = (category) => {
    if (category.includes("Safety")) return "bg-red-100 text-red-800";
    if (category.includes("Cultural")) return "bg-amber-100 text-amber-900";
    return "bg-emerald-100 text-emerald-800";
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

          {/* DEDICATED ARTICLES HUB */}
          {currentPage === 'articles' && (
            <div className="max-w-3xl mx-auto space-y-6 text-left pb-12">
              <button 
                onClick={() => setCurrentPage('home')} 
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft size={14} /> Back to Feed
              </button>

              <div className="relative w-full">
                <Search className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={articleSearchQuery}
                  onChange={(e) => setArticleSearchQuery(e.target.value)}
                  placeholder="Search articles by title, category, or keyword..." 
                  className="w-full px-4 py-3 pl-10 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#046A4E]/20"
                />
              </div>

              <div className="space-y-4">
                {filteredArticles.length === 0 ? (
                  <p className="text-sm text-gray-400 italic py-8 text-center">No articles found matching "{articleSearchQuery}".</p>
                ) : (
                  filteredArticles.map((article) => {
                    const isExpanded = expandedArticleId === article.id;
                    return (
                      <div 
                        key={article.id} 
                        className="bg-white border border-slate-100 hover:border-slate-300 p-6 rounded-2xl shadow-sm transition-all space-y-3 cursor-pointer group"
                        onClick={() => setSelectedArticleModal(article)}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wide ${getCategoryBadgeStyle(article.category)}`}>
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={12} /> {article.readTime}
                          </span>
                        </div>

                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                          {article.title}
                        </h2>

                        <p className="text-sm text-slate-600 leading-relaxed">
                          {article.snippet}
                        </p>

                        {/* Expandable Preview Drawer inside the Card */}
                        {isExpanded && (
                          <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl leading-relaxed">
                            {article.content}
                          </div>
                        )}

                        <div className="pt-2 flex items-center justify-between border-t border-slate-50 text-xs font-bold text-amber-600">
                          <span>Click card to read full article →</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent modal trigger when toggling preview
                              setExpandedArticleId(isExpanded ? null : article.id);
                            }}
                            className="flex items-center gap-1 text-slate-400 hover:text-slate-700"
                          >
                            {isExpanded ? <>Collapse <ChevronUp size={14} /></> : <>Quick Preview <ChevronDown size={14} /></>}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ARTICLE READER MODAL (For Articles Page) */}
          {selectedArticleModal && (
            <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                  <div className="space-y-1">
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide ${getCategoryBadgeStyle(selectedArticleModal.category)}`}>
                      {selectedArticleModal.category}
                    </span>
                    <h2 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                      {selectedArticleModal.title}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={12} /> {selectedArticleModal.readTime}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedArticleModal(null)}
                    className="p-1 rounded-full text-gray-400 hover:text-slate-800 hover:bg-slate-100 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Modal Content Body */}
                <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
                  <p className="font-medium text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedArticleModal.snippet}
                  </p>
                  <p>{selectedArticleModal.content}</p>
                </div>

                {/* Modal Footer Controls */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedArticleModal(null)}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* CLEAN OVERLAY SIDE PANEL */}
      {isMessagingOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMessagingOpen(false)} />
      )}
      
      <div className={`fixed inset-y-0 right-0 z-50 md:z-auto md:relative transform transition-transform duration-300 ease-in-out h-full ${
        isMessagingOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      }`}>
        <div className="h-full bg-white border-l border-gray-100 flex flex-col relative">
          
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