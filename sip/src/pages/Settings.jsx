import React, { useState } from 'react';
import RewardsPage from './RewardsPage'; // Adjust path if needed

export default function SettingsPage({ currentUser, setCurrentUser }) {
  const [authMode, setAuthMode] = useState(currentUser ? "profile" : "auth");
  const [isSingpassLoading, setIsSingpassLoading] = useState(false);
  const [editForm, setEditForm] = useState(currentUser || { type: 'personal', name: '', handle: '', email: '', bio: '', interests: [] });
  const [newInterest, setNewInterest] = useState("");
  const [authForm, setAuthForm] = useState({ type: 'personal', name: '', handle: '', email: '', password: '' });
  const [showRewards, setShowRewards] = useState(false);

  const triggerSingpassLogin = () => {
    setIsSingpassLoading(true);
    setTimeout(() => {
      const mockSingpassData = {
        type: 'personal',
        name: 'Carrie',
        handle: 'carrrielovesfood',
        email: 'carrie@example.com',
        bio: 'Identity secure verified via Singpass NDI cluster.',
        interests: ['Bouldering', 'Tech Hubs'],
        isSingpassVerified: true
      };
      setCurrentUser(mockSingpassData);
      setEditForm(mockSingpassData);
      setIsSingpassLoading(false);
      setAuthMode("profile");
      alert("🔒 Identity verified successfully via Singpass Secure API Sandbox.");
    }, 1200);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(editForm);
    alert("✨ Profile configurations saved successfully!");
  };

  const addInterestTag = () => {
    if (newInterest.trim() && !editForm.interests.includes(newInterest.trim())) {
      setEditForm({ ...editForm, interests: [...editForm.interests, newInterest.trim()] });
      setNewInterest("");
    }
  };

  const removeInterestTag = (tagToRemove) => {
    setEditForm({ ...editForm, interests: editForm.interests.filter(tag => tag !== tagToRemove) });
  };

  const handleManualAuth = (e) => {
    e.preventDefault();
    const mockUser = {
      type: authForm.type,
      name: authForm.name || "Carrie",
      handle: authForm.handle || "carrrielovesfood",
      email: authForm.email,
      bio: authForm.type === 'org' ? 'Verified neighborhood hosting group.' : 'Active participant.',
      interests: ['General']
    };
    setCurrentUser(mockUser);
    setEditForm(mockUser);
    setAuthMode("profile");
  };

  // -------------------------------------------------------------
  // RENDER REWARDS PAGE VIEW
  // -------------------------------------------------------------
  if (showRewards) {
    return <RewardsPage currentUser={editForm} onBack={() => setShowRewards(false)} />;
  }

  // -------------------------------------------------------------
  // RENDER AUTHENTICATION FORM (IF NOT LOGGED IN)
  // -------------------------------------------------------------
  if (authMode === "auth" || !currentUser) {
    return (
      <div className="max-w-md mx-auto my-8 bg-white rounded-3xl border border-gray-100 shadow-sm p-6 text-left space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-serif font-bold text-gray-900">Get Started on COCO</h1>
          <p className="text-xs text-gray-400">Access events hubs, build shared maps, and track opportunities.</p>
        </div>

        <button
          onClick={triggerSingpassLogin} disabled={isSingpassLoading}
          className="w-full relative flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-xs bg-[#E61F26] text-white hover:bg-[#c4151b] transition-all"
        >
          {isSingpassLoading ? <span className="animate-pulse">Connecting to Singpass NDI...</span> : <>
            <span className="font-serif tracking-tighter text-sm bg-white text-[#E61F26] px-1.5 py-0.5 rounded font-black">singpass</span>
            <span>Log in with Singpass</span>
          </>}
        </button>

        <div className="flex items-center my-4 text-gray-300 before:content-[''] before:flex-1 before:border-b before:border-gray-100 before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-gray-100 after:ml-3 text-[10px] uppercase font-bold tracking-widest">or configuration logs</div>

        <form onSubmit={handleManualAuth} className="space-y-4">
          <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
            <button type="button" onClick={() => setAuthForm({ ...authForm, type: 'personal' })} className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${authForm.type === 'personal' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-400'}`}>🙋‍♂️ Personal</button>
            <button type="button" onClick={() => setAuthForm({ ...authForm, type: 'org' })} className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${authForm.type === 'org' ? 'bg-white text-emerald-800 shadow-xs' : 'text-gray-400'}`}>🏢 Org</button>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Display Title</label>
            <input type="text" required placeholder="Display Name" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Username Handle</label>
            <input type="text" required placeholder="handle" value={authForm.handle} onChange={(e) => setAuthForm({ ...authForm, handle: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Email</label>
            <input type="email" required placeholder="name@domain.com" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
          </div>

          <button type="submit" className="w-full text-center font-bold text-xs uppercase tracking-wider py-3 mt-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm transition-all">
            Initialize Platform Workspace
          </button>
        </form>
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN SETTINGS & PROFILE VIEW
  // -------------------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left pb-16">
      
      {/* --- TOP PROFILE HEADER BAR (MATCHES PIC 1) --- */}
      <div className="bg-[#FBFBFA] border border-gray-200 rounded-3xl p-6 shadow-xs space-y-6">
        
        {/* Title and Top Icons */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-normal text-slate-900">Profile</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs border border-slate-200 overflow-hidden">
              {editForm.name ? editForm.name.charAt(0).toUpperCase() : "C"}
            </div>
          </div>
        </div>

        {/* Profile Info & XP Progress Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-2xl font-bold border-2 border-slate-900 shadow-sm shrink-0">
            {editForm.name ? editForm.name.charAt(0).toUpperCase() : "C"}
          </div>

          <div className="space-y-1 flex-1 w-full">
            <h2 className="text-2xl font-serif font-bold text-slate-900">{editForm.name || "Carrie"}</h2>
            <p className="text-xs text-slate-500 font-sans">@{editForm.handle || "carrrielovesfood"}</p>
            
            <div className="pt-2 space-y-1.5">
              <p className="text-xs font-semibold text-slate-800">Level 10 - Community builder</p>
              
              <div className="flex items-center gap-3">
                <div className="flex-1 max-w-md h-5 bg-white border border-slate-800 rounded-full p-0.5 overflow-hidden">
                  <div className="h-full bg-emerald-200/80 rounded-full w-[56%]" />
                </div>
                <span className="text-xs font-medium text-slate-700">450 / 800 XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- STATS GRID WITH VIEW REWARDS BUTTON --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-1 shadow-xs">
            <p className="text-xs text-slate-600 font-medium">Events Joined</p>
            <p className="text-xl font-bold text-slate-900">12</p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-1 shadow-xs">
            <p className="text-xs text-slate-600 font-medium">Communities</p>
            <p className="text-xl font-bold text-slate-900">9</p>
          </div>

          <div className="bg-white border-2 border-slate-900 rounded-2xl p-4 text-center space-y-1 shadow-xs">
            <p className="text-xs text-slate-600 font-medium">Friends</p>
            <p className="text-xl font-bold text-slate-900">28</p>
          </div>

          {/* Points Box with View Rewards Button */}
          <div className="bg-white border-2 border-slate-900 rounded-2xl p-3 text-center space-y-1 shadow-xs flex flex-col justify-between items-center">
            <div>
              <p className="text-xs text-slate-600 font-medium">Points</p>
              <p className="text-xl font-bold text-slate-900">2458</p>
            </div>
            <button 
              onClick={() => setShowRewards(true)}
              className="mt-1 px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 hover:bg-emerald-800 hover:text-white text-emerald-900 border border-emerald-300 rounded-lg transition-all"
            >
              View Rewards →
            </button>
          </div>
        </div>

        {/* --- BADGES BOX --- */}
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-sm">Badges</h3>
            <button className="text-xs font-bold underline text-slate-800 hover:text-slate-600">View All</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-emerald-600 bg-emerald-50/50 flex flex-col items-center justify-center text-center p-2">
              <span className="text-xl">🤝</span>
              <span className="text-[9px] font-extrabold uppercase text-emerald-900 tracking-tighter mt-1">Community Builder</span>
            </div>
          </div>
        </div>

      </div>

      {/* --- ACCOUNT FORM & MANAGEMENT PANEL --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-4">
        <div className="md:col-span-4 bg-white border border-gray-100 rounded-2xl p-3 space-y-1.5 shadow-sm">
          <button className="w-full text-left font-bold text-xs px-3 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">Edit Profile Elements</button>
          <button onClick={() => { setCurrentUser(null); setAuthMode("auth"); }} className="w-full text-left font-bold text-xs px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all">Sign Out / Disconnect</button>
        </div>

        <div className="md:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-50 pb-5">
            <div className="w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xl font-bold">
              {editForm.name ? editForm.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">@{editForm.handle || 'username'}</h3>
                {editForm.isSingpassVerified && <span className="bg-red-50 border border-red-200 text-[#E61F26] text-[8px] px-1.5 py-0.5 font-bold uppercase rounded-md tracking-wider">Singpass Verified</span>}
              </div>
              <p className="text-xs text-gray-400 capitalize">{editForm.type} Workspace Account</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Display Title</label>
                <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Public Handle</label>
                <input type="text" value={editForm.handle} onChange={(e) => setEditForm({ ...editForm, handle: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Contact Email</label>
              <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Bio / Purpose Description</label>
              <textarea rows="3" value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })} className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none resize-none" />
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-50">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Skills / Focus Tags</label>
              <div className="flex flex-wrap gap-1 bg-gray-50 p-3 rounded-xl border border-gray-200 min-h-[44px]">
                {editForm.interests && editForm.interests.length > 0 ? editForm.interests.map((tag) => (
                  <span key={tag} className="bg-white text-emerald-800 text-[10px] font-bold pl-2.5 pr-1.5 py-1 rounded-lg border border-gray-200 flex items-center gap-1.5">
                    {tag}
                    <button type="button" onClick={() => removeInterestTag(tag)} className="text-gray-400 hover:text-red-500 text-[11px]">✕</button>
                  </span>
                )) : <span className="text-[10px] text-gray-400 self-center">No active tags assigned yet.</span>}
              </div>

              <div className="flex gap-2">
                <input type="text" placeholder="Add custom tag..." value={newInterest} onChange={(e) => setNewInterest(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterestTag(); } }} className="flex-1 text-xs p-2 bg-white border border-gray-200 rounded-xl focus:outline-none" />
                <button type="button" onClick={addInterestTag} className="px-4 text-[11px] font-bold bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700">Add Tag</button>
              </div>
            </div>

            <div className="pt-3">
              <button type="submit" className="w-full text-center font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 transition-all">Apply Changes & Save Profile</button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}