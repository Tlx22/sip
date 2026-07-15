import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import SocialPane from './components/SocialPane';

// Page Views
import Home from './pages/Home';
import Events from './pages/Events';
import Community from './pages/Community';
import MapPage from './pages/MapPage';
import Games from './pages/Games';
import Settings from './pages/Settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#FBFBFA] font-sans antialiased text-[#1c1c1c]">
      {/* 1. Persistent Left Navigation Menu */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* 2. Workspace Layout */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar Header */}
        <Navbar />

        {/* Inner Content Split View */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Dashboard Display Frame */}
          <main className="flex-1 p-8 overflow-y-auto bg-[#FBFBFA]">
            {currentPage === 'home' && <Home />}
            {currentPage === 'events' && <Events />}
            {currentPage === 'community' && <Community />}
            {currentPage === 'map' && <MapPage />}
            {currentPage === 'games' && <Games />}
            {currentPage === 'settings' && <Settings />}
          </main>

          {/* 3. Persistent Right Column Chat Display Panel */}
          <SocialPane />
        </div>
      </div>
    </div>
  );
}