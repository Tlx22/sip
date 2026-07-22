import React from 'react';
import { ArrowLeft, Heart, Users, ShieldCheck, Target, Sparkles, BookOpen } from 'lucide-react';

export default function MissionsPage({ setCurrentTab }) {
  const missionPillars = [
    {
      icon: <Users className="text-emerald-600" size={24} />,
      title: "Fostering Inclusion",
      description: "Building bridge spaces that connect migrant domestic workers and local families through cultural exchanges, shared meals, and community events."
    },
    {
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      title: "Safety & Well-being",
      description: "Empowering workers with essential safety guidelines, legal rights awareness, mental health support, and 24/7 helpline access across Singapore."
    },
    {
      icon: <Heart className="text-emerald-600" size={24} />,
      title: "Mutual Respect",
      description: "Encouraging open dialogue, empathy, and clear communication between employers and domestic helpers to foster harmonious homes."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left pb-16 animate-in fade-in duration-300">
      
      {/* Navigation Header */}
      <button 
        onClick={() => setCurrentTab('home')} 
        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Home
      </button>

      {/* Hero Banner Section */}
      <div className="bg-gradient-to-br from-[#046A4E] to-emerald-900 text-white rounded-3xl p-8 md:p-12 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 bg-emerald-800/60 backdrop-blur-sm border border-emerald-600/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-200">
          <Target size={14} /> Our Core Purpose
        </div>

        <h1 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
          Empowering Communities & Building Harmonious Homes
        </h1>
        
        <p className="text-emerald-100 text-sm md:text-base max-w-2xl leading-relaxed">
          COCO is designed to bridge cultural gaps, provide critical safety and well-being resources, and champion mutual respect between migrant domestic workers and local Singaporean families.
        </p>
      </div>

      {/* Core Mission Pillars */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-bold text-slate-900">Our Key Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionPillars.map((pillar, idx) => (
            <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Card */}
      <div className="bg-amber-50 border border-amber-200/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles size={14} /> Get Involved
          </div>
          <h3 className="text-lg font-serif font-bold text-slate-900">Explore Community Events & Educational Guides</h3>
          <p className="text-xs text-slate-600 max-w-xl">
            Join upcoming culinary exchanges, connect with community members, or read essential well-being articles.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setCurrentTab('events')} 
            className="px-4 py-2.5 bg-[#046A4E] text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition-colors shadow-sm"
          >
            View Events
          </button>
          <button 
            onClick={() => setCurrentTab('articles')} 
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-800 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5"
          >
            <BookOpen size={14} /> Read Articles
          </button>
        </div>
      </div>

    </div>
  );
}