import React, { useState } from 'react';
import { HelpCircle, Play, Users, Coins, Sparkles } from 'lucide-react';

export default function Games({ onStartGame, onPlayTogether }) {
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  const gamesList = [
    {
      id: 1,
      rank: 1,
      title: 'Garden Together',
      subtitle: 'Jigsaw Puzzle',
      image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-sky-200/80',
      description: 'Work together with friends to assemble bright community jigsaw pieces!'
    },
    {
      id: 2,
      rank: 2,
      title: 'Garden Together',
      subtitle: 'Strawberry Harvest',
      image: 'https://images.unsplash.com/photo-1587393855524-087f83d95bc9?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-rose-100/90',
      description: 'Climb the vines and harvest ripe strawberries in co-op mode.'
    },
    {
      id: 3,
      rank: 3,
      title: 'Garden Together',
      subtitle: 'Item Merge Rush',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
      bgColor: 'bg-amber-100/90',
      description: 'Match and merge cute items on the grid board to fulfill local orders.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-left pb-24 font-mono select-none relative">
      
      {/* TOP HEADER & MULTIPLAYER STATUS BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-dashed border-slate-300 pb-4">
        
        {/* Retro Pixel Games Banner */}
        <div className="relative bg-[#F3E5AB] border-4 border-slate-900 px-8 py-3 rounded-lg shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-3">
          <div className="absolute -top-3 -left-3 text-amber-500 font-black text-xs bg-white px-1 border-2 border-slate-900 rounded">
            ★
          </div>
          <h1 className="text-3xl font-serif font-black text-slate-900 tracking-wider uppercase">
            Games
          </h1>
          <div className="absolute -bottom-3 -right-3 text-amber-500 font-black text-xs bg-white px-1 border-2 border-slate-900 rounded">
            ★
          </div>
        </div>

        {/* Top Right "Play Together!" Online Widget */}
        <div className="bg-slate-100 border-2 border-slate-800 rounded-xl p-3 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] flex items-center gap-4">
          <div className="flex items-center -space-x-2 overflow-hidden">
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-pink-200 text-center leading-7 text-xs font-bold border border-slate-700">👧</div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-amber-200 text-center leading-7 text-xs font-bold border border-slate-700">🎧</div>
            <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-emerald-200 text-center leading-7 text-xs font-bold border border-slate-700">🎀</div>
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-700">+5 more are online</p>
            <button 
              onClick={() => {
                if (onPlayTogether) onPlayTogether();
                else alert('🎮 Joining active lobby with friends!');
              }}
              className="mt-1 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 border-2 border-slate-900 text-slate-900 rounded-lg text-xs font-bold transition-all shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            >
              Play together!
            </button>
          </div>
        </div>
      </div>

      {/* GAME CARDS DISPLAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {gamesList.map((game) => (
          <div key={game.id} className="flex flex-col items-center space-y-4 group">
            
            {/* Arch Game Frame Container */}
            <div className={`relative w-full h-80 rounded-t-full border-4 border-slate-900 p-3 ${game.bgColor} flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] overflow-hidden transition-transform group-hover:-translate-y-1`}>
              
              {/* Rank Star Badge (1, 2, 3) */}
              <div className="absolute top-2 left-2 z-10 bg-amber-300 border-2 border-slate-900 text-slate-900 font-black text-2xl w-10 h-10 rounded-full flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                {game.rank}
              </div>

              {/* Tutorial Badge Button */}
              <button
                onClick={() => setSelectedTutorial(game)}
                className="absolute top-4 right-3 z-10 bg-white hover:bg-slate-100 border-2 border-slate-900 px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center gap-1"
              >
                <HelpCircle size={10} /> Tutorial
              </button>

              {/* Central Thumbnail / Art Placeholder */}
              <div className="w-full h-48 mt-8 rounded-2xl border-2 border-slate-900 overflow-hidden relative bg-white">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>

              {/* "Garden Together" Script Label Box */}
              <div className="bg-pink-100 border-2 border-slate-900 rounded-xl p-2 text-center shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                <h3 className="font-serif italic font-bold text-slate-900 text-base leading-tight">
                  {game.title}
                </h3>
                <p className="text-[9px] font-bold uppercase text-pink-700 tracking-wider">
                  {game.subtitle}
                </p>
              </div>
            </div>

            {/* Start Button & Coin Indicator Below Card */}
            <div className="w-full flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (onStartGame) onStartGame(game);
                  else alert(`🚀 Launching ${game.title}: ${game.subtitle}`);
                }}
                className="flex-1 max-w-[200px] py-2.5 bg-slate-200 hover:bg-emerald-300 border-4 border-slate-900 text-slate-900 font-black text-sm uppercase tracking-wider rounded-lg shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Play size={14} className="fill-slate-900" /> Start
              </button>

              {/* Coin Decor Icon */}
              <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-amber-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] animate-pulse">
                🪙
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* TUTORIAL MODAL POPUP */}
      {selectedTutorial && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-slate-900 rounded-2xl p-6 max-w-md w-full space-y-4 text-left shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex justify-between items-center border-b-2 border-slate-200 pb-2">
              <h3 className="font-serif font-black text-lg text-slate-900 flex items-center gap-2">
                📖 {selectedTutorial.title} Tutorial
              </h3>
              <button 
                onClick={() => setSelectedTutorial(null)}
                className="font-bold text-slate-400 hover:text-slate-900 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700 leading-relaxed">
                {selectedTutorial.description}
              </p>
              <div className="bg-amber-50 border-2 border-amber-200 p-3 rounded-xl text-[11px] text-amber-900 space-y-1">
                <p className="font-bold">🕹️ How to Play:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li>Gather 2-4 team members online.</li>
                  <li>Complete shared objectives before timer runs out.</li>
                  <li>Earn garden coins to unlock avatar accessories!</li>
                </ul>
              </div>
            </div>

            <button 
              onClick={() => setSelectedTutorial(null)}
              className="w-full py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* FOOTER PIXEL GRASS DECORATION STRIP */}
      <div className="pt-8">
        <div className="w-full h-6 bg-emerald-600 border-t-4 border-slate-900 rounded-b-lg flex justify-around items-center overflow-hidden opacity-90">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="w-2 h-3 bg-emerald-400 rotate-45 transform" />
          ))}
        </div>
      </div>

    </div>
  );
}