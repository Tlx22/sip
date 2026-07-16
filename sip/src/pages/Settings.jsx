import React, { useState } from 'react';

export default function SettingsPage({ currentUser, setCurrentUser }) {
  // Navigation inside Settings: "profile" | "auth"
  const [authMode, setAuthMode] = useState(currentUser ? "profile" : "auth");
  const [isSingpassLoading, setIsSingpassLoading] = useState(false);
  
  // Local Form Controls for profile updating
  const [editForm, setEditForm] = useState(currentUser || {
    type: 'personal', name: '', handle: '', email: '', bio: '', interests: []
  });
  const [newInterest, setNewInterest] = useState("");

  // Local Form Controls for Manual Sign-up / Login
  const [authForm, setAuthForm] = useState({ type: 'personal', name: '', handle: '', email: '', password: '' });
  const [isSignUp, setIsSignUp] = useState(false);

  // --- MOCK FUNCTION: SINGPASS AUTH GATEWAY ---
  const triggerSingpassLogin = () => {
    setIsSingpassLoading(true);
    setTimeout(() => {
      const mockSingpassData = {
        type: 'personal',
        name: 'CHIEW JUN JIE (SIMULATED)',
        handle: 'singpass_verified_chiew',
        email: 'chiew.verified@singpass.gov.sg',
        bio: 'Identity secure verified via Singpass NDI cluster.',
        interests: ['Tech', 'Community Service'],
        isSingpassVerified: true
      };
      setCurrentUser(mockSingpassData);
      setEditForm(mockSingpassData);
      setIsSingpassLoading(false);
      setAuthMode("profile");
      alert("🔒 Identity verified successfully via Singpass Secure API Sandbox.");
    }, 1500);
  };

  // Handle local changes to profile input fields
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setCurrentUser(editForm);
    alert("✨ Profile configurations saved successfully!");
  };

  // Add tag chip helper method
  const addInterestTag = () => {
    if (newInterest.trim() && !editForm.interests.includes(newInterest.trim())) {
      const updatedTags = [...editForm.interests, newInterest.trim()];
      setEditForm({ ...editForm, interests: updatedTags });
      setNewInterest("");
    }
  };

  // Remove tag chip helper method
  const removeInterestTag = (tagToRemove) => {
    const updatedTags = editForm.interests.filter(tag => tag !== tagToRemove);
    setEditForm({ ...editForm, interests: updatedTags });
  };

  // Handle Manual Auth submissions (Personal or Org)
  const handleManualAuth = (e) => {
    e.preventDefault();
    const mockUser = {
      type: authForm.type,
      name: authForm.name || "New User Workspace",
      handle: authForm.handle || "community_member",
      email: authForm.email,
      bio: authForm.type === 'org' ? 'Verified neighborhood hosting group.' : 'Active local participant.',
      interests: authForm.type === 'org' ? ['Events', 'Outreach'] : ['General']
    };
    setCurrentUser(mockUser);
    setEditForm(mockUser);
    setAuthMode("profile");
    alert(`Welcome! Authenticated as ${mockUser.name} (${mockUser.type === 'org' ? 'Organization Account' : 'Personal Account'}).`);
  };

  // --- VIEW MODE 1: UNAUTHENTICATED / SIGN-UP GATEWAY PANEL ---
  if (authMode === "auth" || !currentUser) {
    return (
      <div className="max-w-md mx-auto my-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-6 md:p-8 text-left space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-serif font-bold text-gray-900">Get Started on COCO</h1>
          <p className="text-xs text-gray-400">Access events hubs, build shared maps, and track opportunities.</p>
        </div>

        {/* Dynamic Singpass Login Block Button */}
        <button
          onClick={triggerSingpassLogin}
          disabled={isSingpassLoading}
          className="w-full relative flex items-center justify-center gap-2.5 py-3 rounded-xl font-bold text-xs bg-[#E61F26] text-white hover:bg-[#c4151b] shadow-sm transition-all disabled:opacity-70"
        >
          {isSingpassLoading ? (
            <span className="animate-pulse">Connecting to Singpass NDI...</span>
          ) : (
            <>
              <span className="font-serif tracking-tighter text-sm bg-white text-[#E61F26] px-1.5 py-0.5 rounded font-black">singpass</span>
              <span>Log in with Singpass</span>
            </>
          )}
        </button>

        <div className="flex items-center my-4 text-gray-300 before:content-[''] before:flex-1 before:border-b before:border-gray-100 before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-gray-100 after:ml-3 text-[10px] uppercase font-bold tracking-widest">
          or setup standard profile
        </div>

        <form onSubmit={handleManualAuth} className="space-y-4">
          <div className="flex gap-2 p-1 bg-gray-50 rounded-xl border border-gray-100">
            <button
              type="button"
              onClick={() => setAuthForm({ ...authForm, type: 'personal' })}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${authForm.type === 'personal' ? 'bg-white shadow-xs text-emerald-800' : 'text-gray-400'}`}
            >
              🙋‍♂️ Personal
            </button>
            <button
              type="button"
              onClick={() => setAuthForm({ ...authForm, type: 'org' })}
              className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg uppercase tracking-wider transition-all ${authForm.type === 'org' ? 'bg-white shadow-xs text-emerald-800' : 'text-gray-400'}`}
            >
              🏢 Organization
            </button>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">
              {authForm.type === 'org' ? 'Organization / Agency Name' : 'Full Display Name'}
            </label>
            <input
              type="text" required placeholder={authForm.type === 'org' ? 'e.g. Sip Performance Alliance' : 'e.g. John Doe'}
              value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Handle / Username</label>
            <input
              type="text" required placeholder="e.g. community_hub_2026"
              value={authForm.handle} onChange={(e) => setAuthForm({ ...authForm, handle: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-500 uppercase">Email Address</label>
            <input
              type="email" required placeholder="name@domain.com"
              value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
              className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full text-center font-bold text-xs uppercase tracking-wider py-3 mt-2 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm transition-all"
          >
            {isSignUp ? "Create Workspace Account" : "Sign In & Initialize"}
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[11px] text-gray-400 hover:text-slate-900 underline underline-offset-4"
          >
            {isSignUp ? "Already have an account? Sign In" : "Need a distinct organization workspace? Sign up here"}
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW MODE 2: ACTIVE INSTAGRAM-STYLE SETTINGS & EDIT INTERFACE ---
  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
        <p className="text-xs text-gray-400 mt-0.5">Adjust your display attributes, tags, credentials, and verification frameworks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Hand Navigation Submenu Column */}
        <div className="md:col-span-4 bg-white border border-gray-100 rounded-2xl p-3 space-y-1.5 shadow-sm">
          <button className="w-full text-left font-bold text-xs px-3 py-2 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100">
            Edit Profile Elements
          </button>
          <button onClick={() => { setCurrentUser(null); setAuthMode("auth"); }} className="w-full text-left font-bold text-xs px-3 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all">
            Sign Out / Disconnect Account
          </button>
        </div>

        {/* Right Hand Profile Parameter Matrix */}
        <div className="md:col-span-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
          
          {/* Avatar Metadata Block Layout */}
          <div className="flex items-center gap-4 border-b border-gray-50 pb-5">
            <div className="w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xl font-bold shadow-inner">
              {editForm.name ? editForm.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">@{editForm.handle || 'username'}</h3>
                {editForm.isSingpassVerified && (
                  <span className="bg-red-50 border border-red-200 text-[#E61F26] text-[8px] px-1.5 py-0.5 font-bold uppercase rounded-md tracking-wider">
                    Singpass Verified
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 capitalize">{editForm.type} Workspace Tier Account</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Display Name / Title</label>
                <input
                  type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-gray-500 uppercase">Public Handle</label>
                <input
                  type="text" value={editForm.handle} onChange={(e) => setEditForm({ ...editForm, handle: e.target.value })}
                  className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Associated Contact Email</label>
              <input
                type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">Bio / Purpose Description</label>
              <textarea
                rows="3" value={editForm.bio} onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                className="w-full text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none resize-none"
              />
            </div>

            {/* Custom Tag & Interest Matrix */}
            <div className="space-y-2 pt-2 border-t border-gray-50">
              <label className="block text-[10px] font-bold text-gray-500 uppercase">
                {editForm.type === 'org' ? 'Target Focus & Competency Domains' : 'Personal Interests / Skillsets'}
              </label>
              
              <div className="flex flex-wrap gap-1 bg-gray-50 p-3 rounded-xl border border-gray-200 min-h-[44px]">
                {editForm.interests && editForm.interests.length > 0 ? (
                  editForm.interests.map((tag) => (
                    <span key={tag} className="bg-white text-emerald-800 text-[10px] font-bold pl-2.5 pr-1.5 py-1 rounded-lg border border-gray-200 flex items-center gap-1.5 shadow-xs">
                      {tag}
                      <button type="button" onClick={() => removeInterestTag(tag)} className="text-gray-400 hover:text-red-500 font-bold font-sans text-[11px]">✕</button>
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-gray-400 self-center">No active tags assigned yet. Add some domains below!</span>
                )}
              </div>

              {/* Tag Insertion Elements */}
              <div className="flex gap-2">
                <input
                  type="text" placeholder="Add custom skill/interest tag..." value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addInterestTag(); } }}
                  className="flex-1 text-xs p-2 bg-white border border-gray-200 rounded-xl focus:border-emerald-800 focus:outline-none"
                />
                <button
                  type="button" onClick={addInterestTag}
                  className="px-4 text-[11px] font-bold bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 transition-colors"
                >
                  Add Tag
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full text-center font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 shadow-sm transition-all"
              >
                Apply Changes & Save Profile
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}