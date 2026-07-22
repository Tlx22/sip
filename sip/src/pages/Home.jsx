import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';

const exampleArticles = [
  { 
    id: 1, 
    category: "MDW Safety & Well-being", 
    title: "Why community Manners are important?", 
    date: "21 July 2026",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    snippet: "Safety and consideration at home are paramount under MOM regulations.", 
    content: "Safety and consideration at home are paramount. Under Ministry of Manpower (MOM) regulations, cleaning the exterior of windows in high-rise homes requires strict adherence to safety conditions: adult supervision must be present, and window grilles must be locked at all times. Never stretch or lean out over balconies or ledges to clean exterior glass."
  },
  { 
    id: 2, 
    category: "Community Highlights", 
    title: "How I found my second home in Singapore..", 
    date: "21 July 2026",
    image: null,
    snippet: "A collaborative culinary workshop bringing families and MDWs together.", 
    content: "Over 80 participants gathered last Sunday at the local community hub for a collaborative culinary workshop. Local families learned traditional sambal-making techniques while MDWs were introduced to heritage hawker recipes. Beyond cooking, the event featured free basic health screenings and peer networking sessions."
  },
  { 
    id: 3, 
    category: "Cultural Exposure", 
    title: "Understanding different Cultures...", 
    date: "21 July 2026",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    snippet: "Discover how food bridges cultural gaps between Singaporean households and MDWs.", 
    content: "Food is one of the strongest bridges between cultures. From rich Indonesian Nasi Tumpeng to traditional Tagalog Adobo and Sinigang, learning the history of these comfort foods fosters mutual respect and appreciation in households."
  }
];

export default function Home({ setCurrentTab }) {
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openArticleModal = (article) => {
    setSelectedArticleModal(article);
  };

  const closeArticleModal = () => {
    setSelectedArticleModal(null);
  };

  // Filter articles based on search query
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) return exampleArticles;
    const query = searchQuery.toLowerCase();
    return exampleArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="w-full space-y-10 pb-24 text-left font-sans select-none">
      
      {/* 1. BRAND HEADER & SEARCH BAR */}
      <div className="border-b-2 border-slate-900 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-4xl font-serif font-black text-slate-900 tracking-tight">
            Co-Co
          </h1>
          
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-md py-1.5 pl-3 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <Search className="absolute right-2.5 top-2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* 2. MISSION HERO CARD PANEL */}
      <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex-1 space-y-3">
          <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Our Mission</h2>
          <p className="text-xs text-slate-600 max-w-md leading-relaxed">
            Co-Co aims to inspire users to foster inclusive, safe, and harmonious communities in Singapore by supporting Migrant Domestic Worker (MDW) well-being and cultural integration.
          </p>
          
          <button 
            onClick={() => setCurrentTab && setCurrentTab('missions')}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold rounded-lg border border-slate-900 transition-all cursor-pointer"
          >
            Read more
          </button>
        </div>

        <div 
          onClick={() => setCurrentTab && setCurrentTab('missions')}
          className="w-full md:w-[40%] h-40 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-900 cursor-pointer group relative"
        >
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" 
            alt="Our Mission" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* 3. FEATURED ARTICLES SECTION */}
      <div className="space-y-4">
        <h2 className="text-3xl font-serif font-normal text-slate-900">
          Featured Articles
        </h2>

        {filteredArticles.length === 0 ? (
          <p className="text-sm text-slate-500 py-6">No articles found matching "{searchQuery}".</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div 
                key={article.id} 
                className="bg-[#FBFBEE] border-2 border-slate-900 rounded-2xl p-4 flex flex-col justify-between h-[380px] shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none transition-all"
              >
                <div className="space-y-3">
                  {/* Category Tag */}
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {article.category}
                  </span>

                  {/* Optional Image Banner */}
                  {article.image ? (
                    <div className="w-full h-36 rounded-xl border-2 border-slate-900 overflow-hidden bg-white">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-2" />
                  )}

                  {/* Article Title & Snippet */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium line-clamp-2">
                      {article.snippet}
                    </p>
                  </div>
                </div>

                {/* Bottom Footer: Button + Date */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => openArticleModal(article)}
                    className="px-4 py-1.5 bg-[#E2F1E7] hover:bg-[#d2e8db] border-2 border-slate-900 text-slate-900 text-xs font-bold rounded-lg shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                  >
                    Read more
                  </button>

                  <span className="text-xs text-slate-500 font-medium">
                    {article.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. UPCOMING EVENTS */}
      <div className="space-y-4 pt-4">
        <h2 className="text-2xl font-serif font-bold text-slate-900">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 1, title: "MDW Safety Workshop", img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=300&q=80" },
            { id: 2, title: "Cultural Cooking Exchange", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" },
            { id: 3, title: "Language & Skills Class", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" },
            { id: 4, title: "Health Check-up Drive", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80" }
          ].map((item) => (
            <div key={item.id} className="bg-white border-2 border-slate-900 rounded-xl p-3 shadow-sm flex flex-col items-center space-y-3">
              <div className="w-full h-28 rounded-lg overflow-hidden bg-slate-100 border border-slate-900">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-bold text-slate-900 text-center w-full truncate">{item.title}</p>
              <button 
                onClick={() => setCurrentTab && setCurrentTab('events')}
                className="w-full py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold rounded-lg border border-slate-900 transition-all cursor-pointer"
              >
                Sign up
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ARTICLE READER MODAL */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBFBEE] border-4 border-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {selectedArticleModal.category}
                </span>
                <h2 className="text-xl font-serif font-bold text-slate-900 leading-snug">
                  {selectedArticleModal.title}
                </h2>
                <span className="text-xs text-slate-500 font-bold block">{selectedArticleModal.date}</span>
              </div>
              <button 
                onClick={closeArticleModal}
                aria-label="Close modal"
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              {selectedArticleModal.snippet && (
                <p className="font-semibold text-slate-900 bg-white p-3 rounded-xl border-2 border-slate-900">
                  {selectedArticleModal.snippet}
                </p>
              )}
              <p className="text-sm leading-relaxed">{selectedArticleModal.content}</p>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between">
              <button
                onClick={() => {
                  closeArticleModal();
                  if (setCurrentTab) setCurrentTab('articles');
                }}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Explore all articles <ArrowRight size={12} />
              </button>
              <button
                onClick={closeArticleModal}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}