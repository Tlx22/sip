import React, { useState } from 'react';
import { Search, X, ArrowRight, ChevronRight, BookOpen } from 'lucide-react';

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
  const [showAllArticlesModal, setShowAllArticlesModal] = useState(false);

  const openArticleModal = (article) => {
    setSelectedArticleModal(article);
  };

  const closeArticleModal = () => {
    setSelectedArticleModal(null);
  };

  return (
    <div className="w-full space-y-10 pb-24 text-left font-sans select-none">
      
      {/* 1. BRAND HEADER */}
      <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center">
        <h1 className="text-4xl font-serif font-black text-slate-900 tracking-tight">
          Co-Co
        </h1>
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

      {/* 3. UPCOMING EVENTS */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-slate-900">Upcoming Events</h2>
          <button 
            onClick={() => setCurrentTab && setCurrentTab('events')}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
          >
            See all <ChevronRight size={14} />
          </button>
        </div>
        
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

      {/* 4. BOTTOM HORIZONTAL ARTICLE SCROLLER */}
      <div className="space-y-3 pt-6 border-t-2 border-slate-200">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif font-bold text-slate-900">Featured Articles</h2>
            <p className="text-xs text-slate-500">Swipe through or view all articles directly</p>
          </div>
          
          <button 
            onClick={() => setShowAllArticlesModal(true)}
            className="px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 transition-all flex items-center gap-1 cursor-pointer"
          >
            View all articles <ArrowRight size={12} />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin">
          {exampleArticles.map((article) => (
            <div 
              key={article.id} 
              onClick={() => openArticleModal(article)}
              className="min-w-[280px] max-w-[280px] snap-start bg-[#FBFBEE] border-2 border-slate-900 rounded-xl p-3 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-2px] transition-all cursor-pointer"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                  {article.category}
                </span>

                <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                  {article.snippet}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-300">
                <span className="text-[10px] text-slate-500 font-medium">
                  {article.date}
                </span>
                <span className="text-[11px] font-bold text-slate-900 hover:underline flex items-center gap-0.5">
                  Read <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}

          {/* Quick Trigger Card at the end of scroll */}
          <div 
            onClick={() => setShowAllArticlesModal(true)}
            className="min-w-[160px] snap-start bg-slate-100 border-2 border-dashed border-slate-400 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-slate-200 transition-colors"
          >
            <span className="text-xs font-bold text-slate-700">View All</span>
            <div className="p-2 bg-slate-900 text-white rounded-full">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. SINGLE ARTICLE MODAL */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBFBEE] border-4 border-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative animate-in fade-in zoom-in-95 duration-150">
            
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
                  setShowAllArticlesModal(true);
                }}
                className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View all articles <ArrowRight size={12} />
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

      {/* 6. "ALL ARTICLES" OVERLAY MODAL */}
      {showAllArticlesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBFBEE] border-4 border-slate-900 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] relative max-h-[85vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-slate-900" />
                <h2 className="text-2xl font-serif font-bold text-slate-900">All Articles</h2>
              </div>
              <button 
                onClick={() => setShowAllArticlesModal(false)}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Article List inside Overlay */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {exampleArticles.map((article) => (
                <div 
                  key={article.id}
                  className="bg-white border-2 border-slate-900 rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] space-y-2 hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                  onClick={() => {
                    setShowAllArticlesModal(false);
                    openArticleModal(article);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{article.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{article.title}</h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{article.snippet}</p>

                  <div className="pt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                    Read article <ChevronRight size={12} />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t-2 border-slate-900 flex justify-end">
              <button
                onClick={() => setShowAllArticlesModal(false)}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer transition-colors"
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