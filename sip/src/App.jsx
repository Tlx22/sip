import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SocialPane from './components/SocialPane';
import Home from './pages/Home';
// Import other pages if you have them

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FBFBFA] font-sans text-gray-800 relative">
      
      {/* --- SIDEBAR --- */}
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {/* Sidebar Element */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar currentPage={currentPage} setCurrentPage={(page) => { setCurrentPage(page); setIsSidebarOpen(false); }} />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        {/* Mobile Navbar Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden bg-white shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-xl hover:bg-gray-100 rounded-xl transition-colors"
          >
            🍔
          </button>
          <span className="font-serif font-bold text-lg text-emerald-800">COCO</span>
          <button 
            onClick={() => setIsMessagingOpen(true)}
            className="p-2 text-xl hover:bg-gray-100 rounded-xl transition-colors"
          >
            💬
          </button>
        </header>

        {/* Dynamic Inner Page Loader */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentPage === 'home' && <Home />}
          {/* Add your other page conditional renders here */}
        </main>
      </div>

      {/* --- MESSAGING TABS (SOCIAL PANE) --- */}
      {/* Mobile Backdrop */}
      {isMessagingOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 md:hidden" 
          onClick={() => setIsMessagingOpen(false)}
        />
      )}
      {/* Messaging Element */}
      <div className={`
        fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:z-auto
        ${isMessagingOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Simple Close button inside container for mobile view */}
        <div className="relative h-full">
          <button 
            onClick={() => setIsMessagingOpen(false)}
            className="absolute top-6 left-4 z-50 md:hidden bg-gray-200/60 p-1.5 rounded-full text-xs font-bold"
          >
            ✕ Close
          </button>
          <SocialPane />
        </div>
      </div>

    </div>
  );
}