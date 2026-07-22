import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Search, ChevronDown, ChevronUp, ArrowRight, X } from 'lucide-react';

const exampleArticles = [
  { 
    id: 1, 
    category: "MDW Safety & Well-being", 
    title: "Why community Manners are important?", 
    date: "21 July 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    snippet: "Descriptions....", 
    content: "Safety and consideration at home are paramount. Under Ministry of Manpower (MOM) regulations, cleaning the exterior of windows in high-rise homes requires strict adherence to safety conditions: adult supervision must be present, and window grilles must be locked at all times. Never stretch or lean out over balconies or ledges to clean exterior glass."
  },
  { 
    id: 2, 
    category: "Community Highlights", 
    title: "How I found my second home in Singapore..", 
    date: "21 July 2026",
    readTime: "6 min read",
    image: null, // Card without image as shown in design
    snippet: "Descriptions....", 
    content: "Over 80 participants gathered last Sunday at the local community hub for a collaborative culinary workshop. Local families learned traditional sambal-making techniques while MDWs were introduced to heritage hawker recipes. Beyond cooking, the event featured free basic health screenings and peer networking sessions."
  },
  { 
    id: 3, 
    category: "Cultural Exposure", 
    title: "Understanding different Cultures...", 
    date: "21 July 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    snippet: "Descriptions....", 
    content: "Food is one of the strongest bridges between cultures. From rich Indonesian Nasi Tumpeng to traditional Tagalog Adobo and Sinigang, learning the history of these comfort foods fosters mutual respect and appreciation in households."
  }
];

export default function Home({ setCurrentTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);
  const [showAllArticlesView, setShowAllArticlesView] = useState(false);

  // Auto-cycle carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (expandedArticleId === null && selectedArticleModal === null && !showAllArticlesView) {
        setCurrentIndex((prev) => (prev + 1) % exampleArticles.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [expandedArticleId, selectedArticleModal, showAllArticlesView]);

  const toggleExpand = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  const openArticleModal = (article) => {
    setSelectedArticleModal(article);
  };

  const closeArticleModal = () => {
    setSelectedArticleModal(null);
  };

  const currentArticle = exampleArticles[currentIndex];

  const getCategoryBadgeStyle = (category) => {
    if (category.includes("Safety")) return "bg-red-100 text-red-800";
    if (category.includes("Cultural")) return "bg-amber-100 text-amber-900";
    return "bg-emerald-100 text-emerald-800";
  };

  return (
    <div className="w-full space-y-8 pb-48 text-left relative font-sans select-none">
      
      {/* 1. BRAND HEADER & SEARCH BAR */}
      <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center">
        <h1 className="text-4xl font-serif font-black text-slate-900 tracking-tight">
          Co-Co
        </h1>
        <div className="relative w-48 sm:w-64">
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-slate-100 border border-slate-200 rounded-md py-1.5 pl-3 pr-8 text-xs focus:outline-none"
          />
          <Search size={14} className="absolute right-2.5 top-2.5 text-slate-400" />
        </div>
      </div>

      {/* CONDITIONAL RENDER: FULL ARTICLES GRID VIEW */}
      {showAllArticlesView ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Header Controls for All Articles */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Featured Articles
            </h2>
            <button 
              onClick={() => setShowAllArticlesView(false)}
              className="px-3 py-1 bg-slate-100 border border-slate-900 text-xs font-bold text-slate-900 rounded-lg hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </div>

          {/* 3-COLUMN CARD GRID (MATCHES YOUR IMAGE DESIGN) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exampleArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-[#FBFBEE] border-2 border-slate-900 rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow min-h-[380px]"
              >
                <div className="space-y-3">
                  {/* Image Container (Optional/Conditional) */}
                  {article.image ? (
                    <div className="w-full h-44 rounded-xl overflow-hidden border border-slate-900">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : null}

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {article.title}
                  </h3>

                  {/* Snippet / Description */}
                  <p className="text-xs text-slate-600">
                    {article.snippet}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="flex items-center justify-between pt-4 mt-auto">
                  <button 
                    onClick={() => openArticleModal(article)}
                    className="px-4 py-1.5 bg-[#EAEAD7] hover:bg-slate-900 hover:text-white border border-slate-900 rounded-lg text-xs font-bold text-slate-900 transition-all cursor-pointer"
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

        </div>
      ) : (
        /* NORMAL HOME CONTENT */
        <>
          {/* MISSION HERO CARD PANEL */}
          <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">Our Mission</h2>
              <p className="text-xs text-slate-600 max-w-md leading-relaxed">
                Co-Co aims to inspire users to foster inclusive, safe, and harmonious communities in Singapore by supporting Migrant Domestic Worker (MDW) well-being and cultural integration.
              </p>
              <button className="px-5 py-2 bg-slate-100 border border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 text-xs font-bold rounded-xl transition-all cursor-pointer">
                Read more
              </button>
            </div>
            <div className="w-full md:w-[45%] h-48 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-slate-900 select-none text-slate-400 font-mono text-[10px]">
              [ Mission Image ]
            </div>
          </div>

          {/* UPCOMING EVENTS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Upcoming Events</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: 1, title: "MDW Safety Workshop", img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=300&q=80" },
                { id: 2, title: "Cultural Cooking Exchange", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" },
                { id: 3, title: "Language & Skills Class", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" },
                { id: 4, title: "Health Check-up Drive", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80" }
              ].map((item) => (
                <div key={item.id} className="bg-white border-2 border-slate-900 rounded-2xl p-3 shadow-sm flex flex-col items-center space-y-3">
                  <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-50 border border-slate-900">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-bold text-slate-900 text-center w-full truncate">{item.title}</p>
                  <button 
                    onClick={() => setCurrentTab && setCurrentTab('events')}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-900 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    Sign up
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* FLOATING CAROUSEL FOOTER (Appears at bottom) */}
      <div className="fixed bottom-4 left-4 right-4 md:left-[288px] md:right-[390px] z-30 bg-white/95 backdrop-blur-md border-2 border-slate-900 rounded-2xl p-4 shadow-xl space-y-3 transition-all duration-300">
        
        {/* Slider Meta Controls */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="text-amber-500" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-900">Featured Stories & Awareness</h2>
            <span className="text-[8px] bg-slate-100 text-slate-500 px-1 py-0.5 rounded font-mono">Auto-cycling</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {exampleArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setExpandedArticleId(null); setCurrentIndex(idx); }}
                  className={`h-1 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'w-3 bg-amber-500' : 'w-1 bg-slate-200'}`}
                />
              ))}
            </div>
            
            {/* SEARCH BUTTON OPENS ALL ARTICLES IN-PAGE */}
            <button 
              onClick={() => setShowAllArticlesView(true)}
              className="text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
              title="View all articles grid"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* Dynamic Inner Text Content Frame */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide ${getCategoryBadgeStyle(currentArticle.category)}`}>
              {currentArticle.category}
            </span>
            <span className="flex items-center gap-0.5 text-[9px] text-slate-400">
              <Clock size={10} /> {currentArticle.readTime}
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">{currentArticle.title}</h3>
          <p className="text-[11px] text-slate-500 truncate">{currentArticle.snippet}</p>

          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedArticleId === currentArticle.id ? 'max-h-[150px] mt-2 opacity-100 pt-2 border-t border-dashed border-slate-200' : 'max-h-0 opacity-0'}`}>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 max-h-24 overflow-y-auto leading-relaxed">
              {currentArticle.content}
            </p>
          </div>
        </div>

        {/* Card Interactive Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => toggleExpand(currentArticle.id)}
            className="flex items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
          >
            {expandedArticleId === currentArticle.id ? (
              <><span>Collapse</span><ChevronUp size={12} /></>
            ) : (
              <><span>Quick Preview</span><ChevronDown size={12} /></>
            )}
          </button>

          <button
            onClick={() => openArticleModal(currentArticle)}
            className="flex items-center gap-1 px-3 py-1 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <span>Read Article</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FBFBEE] border-4 border-slate-900 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
              <div className="space-y-1">
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide ${getCategoryBadgeStyle(selectedArticleModal.category)}`}>
                  {selectedArticleModal.category}
                </span>
                <h2 className="text-lg font-serif font-bold text-slate-900 leading-snug">
                  {selectedArticleModal.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
                  <span>{selectedArticleModal.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {selectedArticleModal.readTime}</span>
                </div>
              </div>
              <button 
                onClick={closeArticleModal}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <p className="font-semibold text-slate-900 bg-white p-3 rounded-xl border-2 border-slate-900">
                {selectedArticleModal.snippet}
              </p>
              <p className="text-sm leading-relaxed">{selectedArticleModal.content}</p>
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-3 border-t-2 border-slate-900 flex items-center justify-between">
              <button
                onClick={() => {
                  closeArticleModal();
                  setShowAllArticlesView(true);
                }}
                className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 cursor-pointer"
              >
                View all featured articles <ArrowRight size={12} />
              </button>
              <button
                onClick={closeArticleModal}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
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