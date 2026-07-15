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
    <div className="flex h-screen w-screen overflow-hidden bg-[#F4F6F0] font-sans antialiased text-[#1c1c1c]">
      {/* Left Menu Navigation */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Frame Center & Right */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Unified Search Header */}
        <Navbar />

        {/* Dashboard Workspace split */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Display Frame */}
          <main className="flex-1 p-8 overflow-y-auto">
            {currentPage === 'home' && <Home />}
            {currentPage === 'events' && <Events />}
            {currentPage === 'community' && <Community />}
            {currentPage === 'map' && <MapPage />}
            {currentPage === 'games' && <Games />}
            {currentPage === 'settings' && <Settings />}
          </main>

          {/* Persistent Social Frame on the Landing View */}
          {currentPage === 'home' && <SocialPane />}
        </div>
      </div>
    </div>
  );
}