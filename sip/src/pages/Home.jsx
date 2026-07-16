import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, BookOpen, Clock, Tag, ChevronDown, ChevronUp } from 'lucide-react';

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

export default function HomePage({ setCurrentTab }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  // Auto-scroll loop every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-advance if the current article isn't expanded by the user
      if (expandedArticleId === null) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % exampleArticles.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [expandedArticleId]);

  const toggleExpand = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  const currentArticle = exampleArticles[currentIndex];

  return (
    <div className="flex-1 w-full text-left space-y-8 max-w-5xl mx-auto p-2 pb-16">
      
      {/* Hero Header Segment */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 max-w-xl space-y-3">
          <span className="bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
            Hub Portal
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Discover What's Happening Around You
          </h2>
          <p className="text-xs text-slate-300 max-w-sm font-medium leading-relaxed">
            Access mapping dashboards, community discussions, and curated featured columns updated live.
          </p>
        </div>
      </div>

      {/* --- FEATURED ARTICLES CAROUSEL ZONE --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="text-amber-500" size={18} />
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-950">
              Featured Stories
            </h3>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-mono">
              Auto-cycling
            </span>
          </div>

          {/* Search Icon Shortcut Interaction */}
          <button 
            onClick={() => setCurrentTab('articles')}
            className="p-2 text-slate-400 hover:text-amber-500 hover:bg-slate-50 rounded-xl transition-all"
            title="Search all articles"
          >
            <Search size={18} />
          </button>
        </div>

        {/* Dynamic Display Panel Container */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                {currentArticle.category}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                <Clock size={12} />
                <span>{currentArticle.readTime}</span>
              </div>
            </div>
            
            {/* Slide Indicators Tracker */}
            <div className="flex gap-1">
              {exampleArticles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setExpandedArticleId(null);
                    setCurrentIndex(idx);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentIndex ? 'w-4 bg-amber-500' : 'w-1.5 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-slate-900 tracking-tight">
              {currentArticle.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              {currentArticle.snippet}
            </p>
          </div>

          {/* Dynamic Accordion Expand Segment */}
          <div 
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              expandedArticleId === currentArticle.id ? 'max-h-[300px] mt-4 opacity-100 border-t border-dashed border-gray-100 pt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-4 rounded-2xl border border-gray-50">
              {currentArticle.content}
            </p>
          </div>

          {/* Interactive Control Trigger Frame */}
          <div className="flex items-center justify-between mt-6 pt-3 border-t border-gray-50">
            <button
              onClick={() => toggleExpand(currentArticle.id)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-amber-600 transition-colors"
            >
              {expandedArticleId === currentArticle.id ? (
                <>
                  <span>Collapse Article</span>
                  <ChevronUp size={14} />
                </>
              ) : (
                <>
                  <span>Expand Full View</span>
                  <ChevronDown size={14} />
                </>
              )}
            </button>

            {/* Read More Button (Navigates out to core articles feed page) */}
            <button
              onClick={() => setCurrentTab('articles')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-slate-800 shadow-sm transition-all group"
            >
              <span>Read More Articles</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid Overview Directory Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setCurrentTab('map')}
          className="bg-slate-50 border border-gray-100 rounded-2xl p-5 hover:bg-amber-50/40 hover:border-amber-200 transition-all cursor-pointer text-left"
        >
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">Interactive Map</div>
          <h4 className="text-sm font-bold text-slate-900">Explore Spaces & Zone Crowds →</h4>
        </div>
        <div 
          onClick={() => setCurrentTab('events')}
          className="bg-slate-50 border border-gray-100 rounded-2xl p-5 hover:bg-amber-50/40 hover:border-amber-200 transition-all cursor-pointer text-left"
        >
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-1">Active Scheduling</div>
          <h4 className="text-sm font-bold text-slate-900">Browse Booked Community Events →</h4>
        </div>
      </div>

    </div>
  );
}