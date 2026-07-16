import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const exampleArticles = [
  { id: 1, category: "Hawker Culture", title: "The Secret Heritage of Maxwell Hawker Masters", readTime: "5 min read", snippet: "Uncovering the multi-generational spice blends and traditional methods kept alive behind local stalls.", content: "Behind the neon signs of Maxwell Food Centre lies generations of culinary dedication. We sit down with third-generation hawker owners who reveal the painstaking hours spent preparing traditional stocks and heritage balance before dawn breaks." },
  { id: 2, category: "Urban Exploration", title: "Hidden Quarry Trails You Haven't Explored Yet", readTime: "7 min read", snippet: "A complete visual mapping of rustic green corridors hidden off the standard urban pathways.", content: "Nestled deep past urban buffers, Singapore's old granite quarries have transformed into rich green hubs. This guide maps out entry gates, wildlife precautions, and the best vantage points for morning mist photography away from standard crowds." },
  { id: 3, category: "Music Scene", title: "Vinyl Revivals: The Indie Record Stores of Kampong Glam", readTime: "4 min read", snippet: "Why analog media collection is making a massive comeback among young local musicians.", content: "From rare city-pop pressings to indie local rock bands, the physical crate-digging scene is booming. Shop owners share how physical spaces are creating communities that digital streaming platforms simply cannot duplicate." },
  { id: 4, category: "Fitness & Sport", title: "Mastering the Slab Wall: Balance Over Power", readTime: "6 min read", snippet: "Technical climbing movements required to send complex routes without exhausting your grip.", content: "Climbing vertical or rock-face slab walls demands total weight management, hip flexibility, and high reliance on absolute foot precision rather than upper body dynamic pulling strength. We analyze route-setting patterns for advanced grades." },
  { id: 5, category: "Campus Tech", title: "Building Responsive Leaflet Maps in Modern React Components", readTime: "8 min read", snippet: "Optimizing window bounds and DOM scaling triggers to handle rich customized application overlays.", content: "Map layout render failures often map back to unhandled layout size adjustments. Learn how implementing resize timeouts and custom tile cache engines preserves silky responsive map rendering during rapid panel shifting." }
];

export default function Home({ setCurrentTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (expandedArticleId === null) {
        setCurrentIndex((prev) => (prev + 1) % exampleArticles.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [expandedArticleId]);

  const toggleExpand = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  const currentArticle = exampleArticles[currentIndex];

  return (
    <div className="w-full space-y-8 pb-48 text-left">
      
      {/* 1. ORIGINAL HEADLINE BANNER (Matches Photo 2 Structure) */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">Our Mission</h1>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            Grow2gether aims to inspire users to initiate and foster harmonious communities in Singapore.
          </p>
          <button className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors shadow-sm">
            Read more
          </button>
        </div>
        <div className="w-full md:w-[45%] h-48 bg-gradient-to-tr from-amber-100 via-orange-50 to-emerald-200 rounded-2xl flex items-center justify-center border border-white shadow-inner select-none text-gray-400 font-mono text-[10px]">
          [ Canva Mission Asset Image Here ]
        </div>
      </div>

      {/* 2. UPCOMING EVENTS CAROUSEL FEED */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900">Upcoming Events</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 1, img: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=300&q=80" },
            { id: 2, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" },
            { id: 3, img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80" },
            { id: 4, img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=300&q=80" }
          ].map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col items-center space-y-3 group hover:border-slate-200 transition-all">
              <div className="w-full h-32 rounded-xl overflow-hidden bg-gray-50 relative">
                <img src={item.img} alt="Event Cover" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <button className="w-full py-2 bg-slate-50 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all">
                Sign up
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder blocks to create natural scrolling content */}
      <div className="pt-4 space-y-4 opacity-60">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 font-sans">Recent Activity Hub</h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Scroll down down to review workspace activity pipelines, pending community chat groups, and local notice board listings. The featured slider container anchors cleanly above the screen baseline frame layout.
        </p>
      </div>

      {/* 3. DYNAMIC STICKY FLOATING FOOTER ARTICLE SLIDER */}
      <div className="fixed bottom-4 left-4 right-4 md:left-[272px] md:right-[390px] z-30 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl p-4 shadow-xl shadow-slate-200/50 space-y-3 transition-all duration-300">
        
        {/* Banner Row */}
        <div className="flex items-center justify-between border-b border-gray-50 pb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="text-amber-500" size={14} />
            <h2 className="text-[10px] font-black uppercase tracking-wider text-slate-900">Featured Stories</h2>
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
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        {/* Dynamic Card Content Frame */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[8px] bg-amber-100 text-amber-900 font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wide">
              {currentArticle.category}
            </span>
            <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
              <Clock size={10} /> {currentArticle.readTime}
            </span>
          </div>
          <h3 className="text-xs font-bold text-slate-900 tracking-tight">{currentArticle.title}</h3>
          <p className="text-[11px] text-gray-500 truncate">{currentArticle.snippet}</p>

          {/* Collapsible content segment */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedArticleId === currentArticle.id ? 'max-h-[150px] mt-2 opacity-100 pt-2 border-t border-dashed border-gray-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-gray-50 max-h-24 overflow-y-auto leading-relaxed">
              {currentArticle.content}
            </p>
          </div>
        </div>

        {/* Card Interactive Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <button
            onClick={() => toggleExpand(currentArticle.id)}
            className="flex items-center gap-0.5 text-[10px] font-bold text-slate-500 hover:text-amber-600 transition-colors"
          >
            {expandedArticleId === currentArticle.id ? (
              <><span>Collapse</span><ChevronUp size={12} /></>
            ) : (
              <><span>Expand View</span><ChevronDown size={12} /></>
            )}
          </button>

          <button
            onClick={() => setCurrentTab && setCurrentTab('articles')}
            className="flex items-center gap-1 px-3 py-1 bg-slate-950 hover:bg-slate-800 text-white text-[10px] font-bold rounded-xl shadow-sm transition-all"
          >
            <span>Read More</span>
            <ArrowRight size={10} />
          </button>
        </div>
      </div>

    </div>
  );
}