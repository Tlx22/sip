import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, BookOpen, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// The 10 Curated Articles Dataset
const exampleArticles = [
  { id: 1, category: "Hawker Culture", title: "The Secret Heritage of Maxwell Hawker Masters", readTime: "5 min read", snippet: "Uncovering the multi-generational spice blends and traditional methods kept alive behind local stalls.", content: "Behind the neon signs of Maxwell Food Centre lies generations of culinary dedication. We sit down with third-generation hawker owners who reveal the painstaking hours spent preparing traditional stocks and heritage balance before dawn breaks." },
  { id: 2, category: "Urban Exploration", title: "Hidden Quarry Trails You Haven't Explored Yet", readTime: "7 min read", snippet: "A complete visual mapping of rustic green corridors hidden off the standard urban pathways.", content: "Nestled deep past urban buffers, Singapore's old granite quarries have transformed into rich green hubs. This guide maps out entry gates, wildlife precautions, and the best vantage points for morning mist photography away from standard crowds." },
  { id: 3, category: "Music Scene", title: "Vinyl Revivals: The Indie Record Stores of Kampong Glam", readTime: "4 min read", snippet: "Why analog media collection is making a massive comeback among young local musicians.", content: "From rare city-pop pressings to indie local rock bands, the physical crate-digging scene is booming. Shop owners share how physical spaces are creating communities that digital streaming platforms simply cannot duplicate." },
  { id: 4, category: "Fitness & Sport", title: "Mastering the Slab Wall: Balance Over Power", readTime: "6 min read", snippet: "Technical climbing movements required to send complex routes without exhausting your grip.", content: "Climbing vertical or rock-face slab walls demands total weight management, hip flexibility, and high reliance on absolute foot precision rather than upper body dynamic pulling strength. We analyze route-setting patterns for advanced grades." },
  { id: 5, category: "Campus Tech", title: "Building Responsive Leaflet Maps in Modern React Components", readTime: "8 min read", snippet: "Optimizing window bounds and DOM scaling triggers to handle rich customized application overlays.", content: "Map layout render failures often map back to unhandled layout size adjustments. Learn how implementing resize timeouts and custom tile cache engines preserves silky responsive map rendering during rapid panel shifting." },
  { id: 6, category: "Community Growth", title: "How Shared Spaces Shape New Social Dynamics", readTime: "5 min read", snippet: "Why designated neighborhood third places reduce isolation and boost creative collaborative projects.", content: "Geographic common hubs serve as crucial connective tissue. Data highlights that neighborhoods incorporating flexible community spaces experience higher cross-collaboration and community trust indexes." },
  { id: 7, category: "Aviation Trends", title: "Fleet Management: Widebody Efficiency in Modern Logistics", readTime: "9 min read", snippet: "An in-depth analysis looking at long-range dual-engine route planning over historical heavy jumbo jets.", content: "Modern long-haul fleet deployment centers around range optimization and fuel economy metrics. We look closely at commercial route scheduling and freight efficiency data transforming regional hubs." },
  { id: 8, category: "Coding Practices", title: "Transitioning Styles: C++ Performance to Python OOP Architecture", readTime: "6 min read", snippet: "Understanding scope management and reference tracking across distinct modern runtimes.", content: "Moving from low-level memory layout control to high-level dynamic binding requires shifting how you envision scopes, class pointers, and runtime assignment behaviors. Here is a clear structural parallel analysis." },
  { id: 9, category: "Acoustic Spaces", title: "The Mechanics of Home Studio Multi-Instrument Engineering", readTime: "7 min read", snippet: "How to properly capture drums, guitars, and keys inside standard insulated tracking rooms.", content: "Tracking diverse instrumental dynamics needs smart microphone placement and phase balancing. Learn how small space tracking setups can achieve expansive mix results using direct inputs and proper overhead tracking pairs." },
  { id: 10, category: "Local Artistry", title: "Analysing Modern Storytelling Formats in Global Audio Projects", readTime: "5 min read", snippet: "Unlocking hidden metaphors, lyric structures, and thematic concepts in concept albums.", content: "Melodic themes and seasonal motifs offer deep layers of storytelling depth. We deconstruct how modern indie duos thread poetic imagery seamlessly through driving rock instrumentation to deliver high emotional impact." }
];

export default function Home({ setCurrentTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedArticleId, setExpandedArticleId] = useState(null);

  // Auto-scroll framework running every 5 seconds
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
    <div className="flex-1 w-full space-y-6 max-w-5xl mx-auto p-4 text-left">
      
      {/* 1. ORIGINAL HERO BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="inline-block bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md">
            Hub Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            Discover What's Happening Around You
          </h1>
          <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
            Access live mapping tools, track community spaces, and stay updated with rotating featured articles.
          </p>
        </div>
      </div>

      {/* 2. DYNAMIC SLIDING STORIES BLOCK */}
      <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-50 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="text-amber-500" size={16} />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">Featured Stories</h2>
            <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">Auto-cycling</span>
          </div>
          <button 
            onClick={() => setCurrentTab('articles')}
            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-50 rounded-lg transition-all"
          >
            <Search size={16} />
          </button>
        </div>

        {/* Article Body Content Wrapper */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                {currentArticle.category}
              </span>
              <span className="flex items-center gap-1 text-[10px] text-gray-400">
                <Clock size={11} /> {currentArticle.readTime}
              </span>
            </div>
            
            {/* Inline Dots Navigator */}
            <div className="flex gap-1">
              {exampleArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setExpandedArticleId(null); setCurrentIndex(idx); }}
                  className={`h-1 rounded-full transition-all ${idx === currentIndex ? 'w-3 bg-amber-500' : 'w-1 bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 tracking-tight">{currentArticle.title}</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-medium">{currentArticle.snippet}</p>

          {/* Smooth Accordion Body Section */}
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedArticleId === currentArticle.id ? 'max-h-[300px] mt-2 opacity-100 pt-2 border-t border-dashed border-gray-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-gray-50 leading-relaxed font-normal">
              {currentArticle.content}
            </p>
          </div>
        </div>

        {/* Bottom Control Bars */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <button
            onClick={() => toggleExpand(currentArticle.id)}
            className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors"
          >
            {expandedArticleId === currentArticle.id ? (
              <><span>Collapse View</span><ChevronUp size={14} /></>
            ) : (
              <><span>Expand Full View</span><ChevronDown size={14} /></>
            )}
          </button>

          <button
            onClick={() => setCurrentTab('articles')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all group"
          >
            <span>Read More Articles</span>
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. RESTORED DASHBOARD ROUTING PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div 
          onClick={() => setCurrentTab('map')}
          className="bg-slate-50 border border-gray-100 rounded-2xl p-4 hover:bg-amber-50/30 hover:border-amber-200 transition-all cursor-pointer group"
        >
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Interactive Map</span>
          <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1">
            Explore Spaces & Zone Crowds <ArrowRight size={12} />
          </h4>
        </div>
        
        <div 
          onClick={() => setCurrentTab('events')}
          className="bg-slate-50 border border-gray-100 rounded-2xl p-4 hover:bg-amber-50/30 hover:border-amber-200 transition-all cursor-pointer group"
        >
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Active Scheduling</span>
          <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-600 flex items-center gap-1">
            Browse Booked Community Events <ArrowRight size={12} />
          </h4>
        </div>
      </div>

    </div>
  );
}