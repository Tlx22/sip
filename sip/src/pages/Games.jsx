import React from 'react';

export default function Games() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-800 mb-2">CoCo Arcade</h1>
      <p className="text-gray-600 mb-6">Interactive minigames to break the ice and connect with community members.</p>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-5xl mb-4">🎮</span>
        <h3 className="text-xl font-semibold mb-2">Minigames Coming Soon</h3>
        <p className="text-gray-400 text-sm text-center max-w-sm">
          We are currently designing casual multiplayer challenges. Details will be worked out in the next simulation iteration!
        </p>
      </div>
    </div>
  );
}