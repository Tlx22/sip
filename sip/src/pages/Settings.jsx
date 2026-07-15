import React, { useState } from 'react';

export default function Settings() {
  const [isSingpassLinked, setIsSingpassLinked] = useState(false);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-800 mb-6">Profile Settings</h1>
      
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
        {/* Account Info */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Identity Verification</h3>
          <div className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">Singpass Integration</p>
              <p className="text-xs text-gray-400">Securely verify community accountability</p>
            </div>
            <button 
              onClick={() => setIsSingpassLinked(!isSingpassLinked)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                isSingpassLinked ? 'bg-emerald-100 text-emerald-800' : 'bg-[#EF4444] text-white'
              }`}
            >
              {isSingpassLinked ? '✓ Verified via Singpass' : 'Simulate Singpass Link'}
            </button>
          </div>
        </div>

        {/* User Details */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Profile Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Occupation / Role</label>
              <input type="text" placeholder="e.g. Student, Resident, Support Partner..." className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Interests (Comma separated)</label>
              <input type="text" placeholder="e.g. Cooking, Football, Music, Languages" className="w-full px-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}