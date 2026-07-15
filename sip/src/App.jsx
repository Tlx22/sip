{/* Dynamic Page Router */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentPage === 'home' && <Home />}
          
          {currentPage === 'events' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Events Hub</h1>
              <p className="text-sm text-gray-500">Browse and filter upcoming events.</p>
              <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-sm">
                No events scheduled this week. Check back later!
              </div>
            </div>
          )}

          {currentPage === 'community' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Community Spaces</h1>
              <p className="text-sm text-gray-500">Join groups, chats, and meet active residents.</p>
              <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-sm">
                Connect with interest groups and chat rooms here.
              </div>
            </div>
          )}

          {currentPage === 'map' && <MapPage />}

          {currentPage === 'games' && (
            <div className="space-y-4">
              <h1 className="text-3xl font-serif font-bold text-gray-900">Arcade & Games</h1>
              <p className="text-sm text-gray-500">Unwind with simple local web games.</p>
              <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center text-gray-400 text-sm">
                Game integrations coming soon!
              </div>
            </div>
          )}
        </main>