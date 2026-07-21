import React, { useState, useEffect } from 'react';

// --- MOCK DATA ---
const featuredArticles = [
  {
    id: 1,
    tag: "HAWKER CULTURE",
    readTime: "5 min read",
    title: "The Secret Heritage of Maxwell Hawker Masters",
    snippet: "Uncovering the multi-generational spice blends and traditional methods kept alive behind local stalls.",
    fullText: "Singapore's hawker stalls are more than food venues; they are repositories of living history. Behind every plate of chicken rice or bowl of laksa is a family legacy passed down over decades..."
  },
  {
    id: 2,
    tag: "BOULDERING & FITNESS",
    readTime: "4 min read",
    title: "Mastering Slab Boulders: Balance Over Power",
    snippet: "Why foot precision, micro-adjustments, and patience win over raw strength on delicate slab routes.",
    fullText: "Slab climbing is a mental game. When holds disappear and wall angles push you backward, trusting tiny rubber edges and keeping your hips tight to the wall is key..."
  },
  {
    id: 3,
    tag: "LOCAL MUSIC SCENE",
    readTime: "6 min read",
    title: "Inside the Indie Band Movement: Rhythm & Resonance",
    snippet: "From precise drum fills to crisp hi-hat double hits, local musicians discuss craft and live covers.",
    fullText: "Singapore's local music hubs are buzzing. We chat with indie drummers and guitarists about dialing in clean live tones, tight arrangements, and stage energy..."
  }
];

const initialThreads = [
  {
    id: 1,
    name: "Alfie (Bouldering)",
    time: "4:15 PM",
    preview: "Yo, down to run some sets on the slab wall tonight?",
    avatar: "A",
    messages: [
      { sender: "Alfie", text: "Yo, down to run some sets on the slab wall tonight?", time: "4:15 PM" }
    ]
  },
  {
    id: 2,
    name: "Jem (SP Band)",
    time: "Yesterday",
    preview: "Double hit on hi-hat sounds clean for the chorus!",
    avatar: "J",
    messages: [
      { sender: "Jem", text: "Hey! Practicing the song structure for the upcoming set.", time: "Yesterday" },
      { sender: "You", text: "Double hit on hi-hat sounds clean for the chorus!", time: "Yesterday" }
    ]
  }
];

const upcomingEvents = [
  { id: 1, title: "Nature Walk & Clean-up", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80" },
  { id: 2, title: "Community Coffee & Read", image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80" },
  { id: 3, title: "Tech & Design Co-working", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80" },
  { id: 4, title: "Dinner & Cultural Exchange", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" }
];

export default function App() {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('homepage');
  
  // Featured Articles States
  const [currentArticleIdx, setCurrentArticleIdx] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [isArticleExpanded, setIsArticleExpanded] = useState(false);
  const [articleSearch, setArticleSearch] = useState('');

  // Messaging States
  const [threads, setThreads] = useState(initialThreads);
  const [activeThreadId, setActiveThreadId] = useState(2); // Default to Jem
  const [messageInput, setMessageInput] = useState('');

  // Modals / Overlays
  const [signupSuccess, setSignupSuccess] = useState(null);
  const [readMissionModal, setReadMissionModal] = useState(false);

  // Auto-cycle Featured Articles
  useEffect(() => {
    if (!isAutoCycling || isArticleExpanded) return;
    const interval = setInterval(() => {
      setCurrentArticleIdx((prev) => (prev + 1) % featuredArticles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoCycling, isArticleExpanded]);

  const currentArticle = featuredArticles[currentArticleIdx];

  // Send message handler
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id === activeThreadId) {
          const newMsg = { sender: 'You', text: messageInput, time: 'Just now' };
          return {
            ...thread,
            preview: messageInput,
            time: 'Just now',
            messages: [...thread.messages, newMsg]
          };
        }
        return thread;
      })
    );
    setMessageInput('');
  };

  const activeThread = threads.find((t) => t.id === activeThreadId);

  return (
    <div className="flex h-screen w-screen bg-[#f8faf9] text-slate-800 font-sans overflow-hidden">
      
      {/* ========================================================= */}
      {/* 🟢 1. COMPACT LEFT SIDEBAR                                */}
      {/* ========================================================= */}
      <aside className="w-20 bg-[#e8f3ee] border-r border-emerald-100 flex flex-col items-center justify-between py-6 shrink-0 z-20">
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Top Profile Avatar Button */}
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-11 h-11 rounded-full bg-white border shadow-sm flex items-center justify-center text-xl transition-all ${
              activeTab === 'profile' ? 'border-emerald-600 ring-2 ring-emerald-200' : 'border-emerald-200 hover:scale-105'
            }`}
            title="Profile"
          >
            👤
          </button>

          {/* Nav Buttons */}
          <nav className="flex flex-col gap-4 w-full px-2">
            {[
              { id: 'homepage', label: 'homepage', icon: '🏠' },
              { id: 'events', label: 'events', icon: '📅' },
              { id: 'community', label: 'community', icon: '👥' },
              { id: 'map', label: 'map', icon: '🗺️' },
              { id: 'games', label: 'games', icon: '🎮' },
              { id: 'profile', label: 'profile', icon: '👤' },
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-emerald-800 shadow-sm border border-emerald-100 font-bold'
                      : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-100/50'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[10px] mt-0.5 font-semibold tracking-tight">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Version */}
        <div className="text-[9px] font-mono text-emerald-600/70 tracking-tight select-none">
          COCO v1.0
        </div>
      </aside>

      {/* ========================================================= */}
      {/* ⚪ 2. MAIN CENTER CONTENT AREA                            */}
      {/* ========================================================= */}
      <main className="flex-1 h-full overflow-y-auto p-6 md:p-8 space-y-6">
        
        {/* Dynamic Navigation Page Switcher View */}
        {activeTab !== 'homepage' ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center space-y-3">
            <span className="text-4xl">
              {activeTab === 'events' && '📅'}
              {activeTab === 'community' && '👥'}
              {activeTab === 'map' && '🗺️'}
              {activeTab === 'games' && '🎮'}
              {activeTab === 'profile' && '👤'}
            </span>
            <h2 className="text-2xl font-bold capitalize text-slate-800">{activeTab} Section</h2>
            <p className="text-sm text-slate-400 max-w-sm">
              You are currently viewing the active {activeTab} workspace tab.
            </p>
            <button
              onClick={() => setActiveTab('homepage')}
              className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition-colors"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            {/* Our Mission Banner */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-md space-y-4 text-left">
                <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                  Our Mission
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Grow2gether aims to inspire users to initiate and foster harmonious communities in Singapore.
                </p>
                <button
                  onClick={() => setReadMissionModal(true)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors active:scale-95"
                >
                  Read more
                </button>
              </div>

              <div className="w-full md:w-[380px] h-48 rounded-2xl bg-gradient-to-tr from-amber-100 via-emerald-100 to-teal-200 flex items-center justify-center border border-white/60 shadow-inner p-4 text-center">
                <span className="text-xs font-mono text-slate-500 bg-white/70 px-3 py-1.5 rounded-md backdrop-blur-sm">
                  [ Canva Mission Asset Image Here ]
                </span>
              </div>
            </div>

            {/* Upcoming Events Carousel */}
            <div className="space-y-4 text-left">
              <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
                Upcoming Events
              </h2>

              <div className="relative flex items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {upcomingEvents.map((evt) => (
                    <div key={evt.id} className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col space-y-3">
                      <div className="h-36 rounded-xl overflow-hidden bg-slate-100">
                        <img 
                          src={evt.image} 
                          alt={evt.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <button 
                        onClick={() => setSignupSuccess(evt.title)}
                        className="w-full py-2 bg-[#e8f3ee] hover:bg-[#d4e8dd] text-emerald-900 text-xs font-bold rounded-xl transition-all active:scale-95"
                      >
                        Sign up
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 📰 FEATURED STORIES WIDGET (AUTO-CYCLING & EXPANDABLE) */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 text-left transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-base">📖</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">Featured Stories</span>
                  <button
                    onClick={() => setIsAutoCycling(!isAutoCycling)}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                      isAutoCycling ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isAutoCycling ? 'Auto-cycling' : 'Paused'}
                  </button>
                </div>

                {/* Article controls & dots */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {featuredArticles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentArticleIdx(idx)}
                        className={`h-1.5 rounded-full transition-all ${
                          currentArticleIdx === idx ? 'w-5 bg-amber-500' : 'w-1.5 bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-300 text-xs">🔍</span>
                </div>
              </div>

              {/* Story Content Card */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {currentArticle.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">🕒 {currentArticle.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">{currentArticle.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {isArticleExpanded ? currentArticle.fullText : currentArticle.snippet}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setIsArticleExpanded(!isArticleExpanded)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  {isArticleExpanded ? 'Collapse View ⌃' : 'Expand View ⌄'}
                </button>

                <button 
                  onClick={() => setIsArticleExpanded(!isArticleExpanded)}
                  className="px-4 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all"
                >
                  {isArticleExpanded ? 'Close Story' : 'Read More →'}
                </button>
              </div>
            </div>
          </>
        )}

      </main>

      {/* ========================================================= */}
      {/* 💬 3. RIGHT MESSAGING PANEL (FULL CHAT & THREADS)         */}
      {/* ========================================================= */}
      <aside className="w-80 bg-white border-l border-slate-100 flex flex-col justify-between p-4 shrink-0 z-10 text-left">
        <div className="flex flex-col h-full space-y-4">
          
          {/* Messaging Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-serif font-bold text-slate-900">Messaging</h3>
              <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mt-0.5">Active Threads</p>
            </div>
            <button className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors">
              <span>+</span> Add
            </button>
          </div>

          {/* Active Thread List Selectors */}
          <div className="space-y-1.5">
            {threads.map((t) => {
              const isSelected = t.id === activeThreadId;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveThreadId(t.id)}
                  className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-start gap-3 border ${
                    isSelected 
                      ? 'bg-slate-50 border-emerald-600/40 shadow-sm' 
                      : 'border-transparent hover:bg-slate-50/60'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {t.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-800 truncate">{t.name}</p>
                      <span className="text-[9px] text-slate-400 shrink-0">{t.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{t.preview}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Chat Window Area */}
          <div className="flex-1 flex flex-col bg-[#f9fbfa] rounded-2xl border border-slate-100 p-3 justify-between overflow-hidden">
            
            {/* Message Feed */}
            <div className="overflow-y-auto space-y-2 pr-1 flex-1">
              {activeThread?.messages.map((msg, i) => {
                const isMe = msg.sender === 'You';
                return (
                  <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-emerald-800 text-white rounded-br-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[8px] text-slate-400 mt-0.5 px-1">{msg.time}</span>
                  </div>
                );
              })}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="relative mt-2">
              <input
                type="text"
                placeholder={`Message ${activeThread ? activeThread.name.split(' ')[0] : ''}...`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600 transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 w-6 h-6 bg-slate-900 hover:bg-emerald-900 text-white rounded-lg flex items-center justify-center text-xs transition-colors"
              >
                ➔
              </button>
            </form>
          </div>

        </div>
      </aside>

      {/* ========================================================= */}
      {/* 🔔 MODALS & POPUPS                                       */}
      {/* ========================================================= */}
      {signupSuccess && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 text-2xl flex items-center justify-center mx-auto">
              🎉
            </div>
            <h3 className="text-lg font-bold text-slate-900">Signed Up!</h3>
            <p className="text-xs text-slate-500">
              You are officially registered for <span className="font-bold text-slate-800">{signupSuccess}</span>.
            </p>
            <button
              onClick={() => setSignupSuccess(null)}
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {readMissionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full text-left space-y-4 shadow-2xl">
            <h3 className="text-xl font-serif font-bold text-slate-900">Grow2gether Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Our mission is centered on connecting individuals across local neighborhoods in Singapore through shared hobbies, bouldering sessions, music jam sessions, hawker culture appreciation, and active events.
            </p>
            <button
              onClick={() => setReadMissionModal(false)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}