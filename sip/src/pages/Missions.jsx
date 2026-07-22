import React from 'react';
import { ArrowLeft, Heart, Users, ShieldCheck } from 'lucide-react';

export default function MissionsPage({ setCurrentTab }) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left pb-16 animate-in fade-in duration-300">
      
      {/* Navigation Back Button */}
      {setCurrentTab && (
        <button 
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
      )}

      {/* Main Mission Hero Frame */}
      <div className="bg-[#FBFBFA] border border-gray-200/80 rounded-3xl p-6 md:p-12 shadow-sm relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Content Area */}
          <div className="md:col-span-6 space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight">
              Our Mission
            </h1>

            <p className="text-base text-slate-700 leading-relaxed font-sans">
              Co-Co aims to inspire Singaporeans, foreign domestic workers, and residents to initiate and foster harmonious communities in Singapore. We are dedicated to bringing people together across cultures and backgrounds.
            </p>

            <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
              <p className="text-sm font-bold text-slate-900 leading-snug">
                Co-Co is dedicated to bringing people together across cultures, backgrounds, and communities.
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                We inspire Singaporeans, foreign domestic workers, and residents alike to form meaningful relationships, celebrate diversity, and build a caring, inclusive Singapore where everyone feels welcomed, valued, and connected.
              </p>
            </div>
          </div>

          {/* Right Overlapping Polaroid Photo Framing */}
          <div className="md:col-span-6 relative flex items-center justify-center min-h-[340px] pt-4 md:pt-0">
            
            {/* Background Polaroid Frame */}
            <div className="absolute right-0 top-0 w-64 md:w-72 bg-white p-3 pt-3 pb-8 rounded-xl shadow-xl border border-slate-100 transform rotate-3 hover:rotate-1 transition-transform duration-300 z-10">
              <div className="w-full h-44 md:h-48 overflow-hidden rounded-lg bg-amber-100">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80" 
                  alt="Community hands together" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Foreground Overlapping Polaroid Frame */}
            <div className="relative left-[-20px] md:left-[-30px] top-[40px] w-56 md:w-64 bg-white p-3 pt-3 pb-8 rounded-xl shadow-2xl border border-slate-100 transform -rotate-6 hover:-rotate-3 transition-transform duration-300 z-20">
              <div className="w-full h-40 md:h-44 overflow-hidden rounded-lg bg-emerald-100">
                <img 
                  src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80" 
                  alt="Friends picnic on green lawn" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Core Values Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            <Heart size={16} />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Empathy & Respect</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Building authentic connections between households and domestic helpers through understanding and open dialogue.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            <Users size={16} />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Inclusive Spaces</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Creating community events, cooking masterclasses, and gatherings where everyone feels welcomed.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-2 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
            <ShieldCheck size={16} />
          </div>
          <h3 className="font-bold text-sm text-slate-900">Safety & Well-being</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Promoting safety awareness, physical care, and mental wellness support across all neighborhoods.
          </p>
        </div>
      </div>

    </div>
  );
}