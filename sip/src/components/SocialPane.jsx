import React from 'react';

export default function SocialPane() {
  return (
    <aside className="w-80 bg-[#F4F6F0] border-l border-gray-200 p-6 flex flex-col h-full shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-bold text-gray-800">Messaging</h2>
        <span className="text-xl">💬</span>
      </div>
      
      <button className="w-full text-left py-2 px-3 border border-dashed border-gray-300 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2 mb-4 transition-colors">
        <span>➕</span> Add friends
      </button>

      {/* Example people section stripped out completely */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-4 bg-white/50 rounded-2xl border border-dashed border-gray-200">
        <span className="text-2xl mb-2">👥</span>
        <p className="text-xs text-gray-400 font-medium">No active conversations</p>
        <p className="text-[10px] text-gray-400 mt-1 max-w-[180px]">Add friends to start sharing and coordinating activities.</p>
      </div>

      <button className="mt-4 w-full bg-white border py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors text-center">
        Read more
      </button>
    </aside>
  );
}