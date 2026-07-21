import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Search, ChevronDown, ChevronUp, ArrowRight, X, ShieldAlert, Heart, Calendar } from 'lucide-react';

const exampleArticles = [
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

export default function Home({ setCurrentTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [selectedArticleModal, setSelectedArticleModal] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Pause auto-cycle if user expanded preview or opened full article modal
      if (expandedArticleId === null && selectedArticleModal === null) {
        setCurrentIndex((prev) => (prev + 1) % exampleArticles.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [expandedArticleId, selectedArticleModal]);

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
    <div className="w-full space-y-8 pb-48 text-left relative">
      
      {/* 1. MISSION HERO CARD PANEL */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Our Mission</h1>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            Grow2gether aims to inspire users to foster inclusive, safe, and harmonious communities in Singapore by supporting Migrant Domestic Worker (MDW) well-being and cultural integration.
          </p>
          <button className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors shadow-sm">
            Read more
          </button>
        </div>
        <div className="w-full md:w-[45%] h-48 bg-gradient-to-tr from-amber-100 via-orange-50 to-emerald-200 rounded-2xl flex items-center justify-center border border-white shadow-inner select-none text-gray-400 font-mono text-[10px]">
          [ Canva Mission Asset Image Here ]
        </div>
      </div>

      {/* 2. UPCOMING EVENTS CAROUSEL */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 1, title: "MDW Safety Workshop", img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=300&q=80" },
            { id: 2, title: "Cultural Cooking Exchange", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" },
            { id: 3, title: "Language & Skills Class", img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" },
            { id: 4, title: "Health Check-up Drive", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80" }
          ].map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col items-center space-y-3 group hover:border-slate-200 transition-all">
              <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-50 relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-xs font-bold text-slate-800 text-center w-full truncate">{item.title}</p>
              <button 
                onClick={() => setCurrentTab && setCurrentTab('events')}
                className="w-full py-2 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all"
              >
                Sign up
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 3. STICKY FLOATING FOOTER ARTICLE SLIDER CONTAINER */}
      <div className="fixed bottom-4 left-4 right-4 md:left-[288px] md:right-[390px] z-30 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-xl shadow-slate-200/50 space-y-3 transition-all duration-300">
        
        {/* Slider Meta Controls */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
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
                  className={`h-1 rounded-full transition-all ${idx === currentIndex ? 'w-3 bg-amber-500' : 'w-1 bg-gray-200'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentTab && setCurrentTab('articles')}
              className="text-slate-400 hover:text-amber-500 transition-colors"
              title="View all articles"
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
            <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
              <Clock size={10} /> {currentArticle.readTime}
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">{currentArticle.title}</h3>
          <p className="text-[11px] text-gray-500 truncate">{currentArticle.snippet}</p>

          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedArticleId === currentArticle.id ? 'max-h-[150px] mt-2 opacity-100 pt-2 border-t border-dashed border-gray-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-50 max-h-24 overflow-y-auto leading-relaxed">
              {currentArticle.content}
            </p>
          </div>
        </div>

        {/* Card Interactive Footer Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <button
            onClick={() => toggleExpand(currentArticle.id)}
            className="flex items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-amber-600 transition-colors"
          >
            {expandedArticleId === currentArticle.id ? (
              <><span>Collapse</span><ChevronUp size={12} /></>
            ) : (
              <><span>Quick Preview</span><ChevronDown size={12} /></>
            )}
          </button>

          <button
            onClick={() => openArticleModal(currentArticle)}
            className="flex items-center gap-1 px-3 py-1 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-bold rounded-xl shadow-sm transition-all"
          >
            <span>Read Article</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

      {/* 4. ARTICLE READER MODAL */}
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
                onClick={closeArticleModal}
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
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  closeArticleModal();
                  if (setCurrentTab) setCurrentTab('articles');
                }}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                Explore all articles & resources →
              </button>
              <button
                onClick={closeArticleModal}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all"
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