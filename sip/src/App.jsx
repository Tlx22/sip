import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SocialPane from './components/SocialPane';
import Home from './pages/Home';
import MapPage from './pages/MapPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessagingOpen, setIsMessagingOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FBFBFA] font-sans text-gray-800 relative">
      
      {/* --- SIDEBAR --- */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar currentPage={currentPage} setCurrentPage={(page) => { setCurrentPage(page); setIsSidebarOpen(false); }} />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        {/* Mobile Navbar */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 md:hidden bg-white shrink-0">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">🍔</button>
          <span className="font-serif font-bold text-lg text-emerald-800">COCO</span>
          <button onClick={() => setIsMessagingOpen(true)} className="p-2 text-xl hover:bg-gray-100 rounded-xl">💬</button>
        </header>

        {/* Clean Main Slot Wrapper */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentPage === 'home' && <Home />}
          {currentPage === 'map' && <MapPage />}
          
          {currentPage === 'events' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Events Hub</h1>
              <p className="text-sm text-gray-500">Browse and filter upcoming events.</p>
            </div>
          )}
          {currentPage === 'community' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Community Spaces</h1>
              <p className="text-sm text-gray-500">Join groups, chats, and meet active residents.</p>
            </div>
          )}
          {currentPage === 'games' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Arcade & Games</h1>
              <p className="text-sm text-gray-500">Unwind with simple local web games.</p>
            </div>
          )}
        </main>
      </div>

      {/* --- MESSAGING PANEL --- */}
      {isMessagingOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMessagingOpen(false)} />
      )}
      <div className={`fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:z-auto ${isMessagingOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="relative h-full bg-white border-l border-gray-100">
          <button onClick={() => setIsMessagingOpen(false)} className="absolute top-6 left-4 z-50 md:hidden bg-gray-100 p-2 rounded-full text-xs font-bold">✕ Close</button>
          <SocialPane />
        </div>
      </div>

    </div>
  );
}