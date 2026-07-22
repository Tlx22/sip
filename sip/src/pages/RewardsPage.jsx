import React from 'react';

export default function RewardsPage({ currentUser, onBack }) {
  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left pb-16 animate-in fade-in duration-300">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
      >
        ← Back to Profile
      </button>

      {/* Rewards Header Banner */}
      <div className="bg-[#FBFBFA] border border-gray-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-4 flex-1">
          <h1 className="text-4xl font-serif font-normal text-slate-900">Rewards</h1>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xl font-bold border-2 border-slate-900">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : "C"}
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-slate-900">{currentUser?.name || "Carrie"}</h2>
              <p className="text-xs text-slate-500 font-sans">@{currentUser?.handle || "carrrielovesfood"}</p>
            </div>
          </div>
        </div>

        {/* Level & XP Box */}
        <div className="w-full md:w-80 space-y-2">
          <p className="text-xs font-semibold text-slate-800">Level 10 - Community builder</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-5 bg-white border border-slate-800 rounded-full p-0.5 overflow-hidden">
              <div className="h-full bg-emerald-200/80 rounded-full w-[56%]" />
            </div>
            <span className="text-xs font-medium text-slate-700">450 / 800 XP</span>
          </div>
        </div>
      </div>

      {/* Grid: Claimable Offers vs Claimable Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Claimable Offers (Vouchers) */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 underline underline-offset-4 decoration-2">
            Claimable offers
          </h2>

          <div className="space-y-4">
            {/* Voucher Ticket 1 */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 flex items-center justify-between gap-3 relative overflow-hidden shadow-xs">
              <div className="w-20 font-bold text-lg text-slate-900 tracking-tighter text-center border-r-2 border-dashed border-slate-800 pr-3">
                owala
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-slate-900">50% off voucher</h3>
                <p className="text-xs text-slate-600">Purchase an Owala item at half the price!</p>
                <p className="text-[10px] text-slate-400">expiration: 21 June 2026</p>
              </div>
              <button 
                onClick={() => alert("🎟️ Owala Voucher Claimed!")}
                className="w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"
              >
                →
              </button>
            </div>

            {/* Voucher Ticket 2 */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 flex items-center justify-between gap-3 relative overflow-hidden shadow-xs">
              <div className="w-20 font-bold text-xs text-red-600 uppercase text-center border-r-2 border-dashed border-slate-800 pr-3">
                SWENSEN'S
              </div>
              <div className="flex-1 space-y-1">
                <h3 className="font-bold text-sm text-slate-900">Buy 1-get-1-free voucher</h3>
                <p className="text-xs text-slate-600">Buy one dessert, get one free!*</p>
                <p className="text-[10px] text-slate-400">*Selected desserts only. expiration: 17 July 2026</p>
              </div>
              <button 
                onClick={() => alert("🎟️ Swensen's Voucher Claimed!")}
                className="w-9 h-9 rounded-full border-2 border-slate-900 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Vertical Divider for Large Displays */}
        <div className="hidden lg:block w-px bg-purple-400 self-stretch my-2" />

        {/* Right Column: Claimable Physical Items */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 underline underline-offset-4 decoration-2">
            Claimable items
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Item 1 */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-3 flex flex-col justify-between items-center shadow-xs">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                🔋
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">10000mAh Power Bank</p>
              <button 
                onClick={() => alert("🎁 Claimed Power Bank!")}
                className="px-4 py-1 text-xs font-bold bg-emerald-100 border border-slate-900 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                Claim
              </button>
            </div>

            {/* Item 2 */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-3 flex flex-col justify-between items-center shadow-xs">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                💨
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">Portable Fan</p>
              <button 
                onClick={() => alert("🎁 Claimed Portable Fan!")}
                className="px-4 py-1 text-xs font-bold bg-emerald-100 border border-slate-900 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                Claim
              </button>
            </div>

            {/* Item 3 */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-3 flex flex-col justify-between items-center shadow-xs">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                📱
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">Aluminium Phone Stand</p>
              <button 
                onClick={() => alert("🎁 Claimed Aluminium Phone Stand!")}
                className="px-4 py-1 text-xs font-bold bg-emerald-100 border border-slate-900 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                Claim
              </button>
            </div>

            {/* Item 4 */}
            <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-3 flex flex-col justify-between items-center shadow-xs">
              <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-2xl">
                🎧
              </div>
              <p className="text-xs font-bold text-slate-900 leading-snug">Wireless Earbuds</p>
              <button 
                onClick={() => alert("🎁 Claimed Wireless Earbuds!")}
                className="px-4 py-1 text-xs font-bold bg-emerald-100 border border-slate-900 rounded-lg hover:bg-emerald-200 transition-colors"
              >
                Claim
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}