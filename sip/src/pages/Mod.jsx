import React, { useState, useMemo } from 'react';
import { ArrowLeft, ShieldCheck, Users, Calendar, Flag, Check, Trash2, Clock } from 'lucide-react';

const NEW_WINDOW_MS = 1000 * 60 * 60 * 48; // items posted within the last 48h are flagged "New"

function timeAgo(timestamp) {
  const diffMs = Date.now() - timestamp;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${Math.max(mins, 0)}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Moderation Dashboard: a single place for a "mod" account to see freshly
// created communities, freshly listed events, and reports filed from chat
// conversations. All data is handed down from App.jsx, which is the shared
// source of truth for these lists across the rest of the app.
export default function ModPage({
  communityGroups = [],
  events = [],
  reports = [],
  onDismissReport,
  onRemoveReport,
  onRemoveGroup,
  onRemoveEvent,
  onBack
}) {
  const [activeTab, setActiveTab] = useState('reports');

  const sortedGroups = useMemo(
    () => [...communityGroups].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [communityGroups]
  );
  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)),
    [events]
  );
  const sortedReports = useMemo(
    () => [...reports].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)),
    [reports]
  );

  const pendingReportCount = reports.filter(r => r.status !== 'reviewed').length;
  const newGroupCount = communityGroups.filter(g => Date.now() - (g.createdAt || 0) < NEW_WINDOW_MS).length;
  const newEventCount = events.filter(e => Date.now() - (e.createdAt || 0) < NEW_WINDOW_MS).length;

  const tabs = [
    { key: 'reports', label: 'Chat Reports', icon: Flag, count: pendingReportCount },
    { key: 'communities', label: 'New Communities', icon: Users, count: newGroupCount },
    { key: 'events', label: 'New Events', icon: Calendar, count: newEventCount }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left pb-24">

      {/* Header */}
      <div className="space-y-3 border-b border-gray-100 pb-5">
        {onBack && (
          <button
            onClick={onBack}
            className="text-xs font-bold text-gray-500 hover:text-slate-900 transition-colors flex items-center gap-1 bg-white border border-gray-100 px-3 py-1.5 rounded-xl shadow-sm"
          >
            <ArrowLeft size={12} /> Back to Profile
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Moderation Dashboard</h1>
            <p className="text-xs text-gray-400">Review new community postings, event listings, and chat reports.</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              activeTab === key
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
            }`}
          >
            <Icon size={13} />
            {label}
            {count > 0 && (
              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                activeTab === key ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-700'
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ========================================================= */}
      {/* TAB: CHAT REPORTS                                         */}
      {/* ========================================================= */}
      {activeTab === 'reports' && (
        <div className="space-y-3">
          {sortedReports.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs">
              No reports filed yet. Reports submitted from chat conversations will show up here.
            </div>
          ) : (
            sortedReports.map((report) => (
              <div
                key={report.id}
                className={`bg-white border rounded-2xl p-5 shadow-xs space-y-3 ${
                  report.status === 'reviewed' ? 'border-gray-100 opacity-70' : 'border-amber-200'
                }`}
              >
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{report.roomName}</span>
                      {report.roomHandle && <span className="text-[11px] text-gray-400">@{report.roomHandle}</span>}
                    </div>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={10} /> {timeAgo(report.timestamp)} • Reported by {report.reporterHandle}
                    </p>
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                    report.status === 'reviewed'
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-amber-50 text-amber-800 border border-amber-100'
                  }`}>
                    {report.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                  </span>
                </div>

                <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 space-y-1.5">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Reason</p>
                  <p className="text-xs font-semibold text-slate-800">{report.reason}</p>
                  {report.note && (
                    <>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pt-1">Details</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{report.note}</p>
                    </>
                  )}
                  {report.lastMessageText && (
                    <>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pt-1">Last Message in Thread</p>
                      <p className="text-xs text-slate-600 italic leading-relaxed">"{report.lastMessageText}"</p>
                    </>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  {report.status !== 'reviewed' && onDismissReport && (
                    <button
                      onClick={() => onDismissReport(report.id)}
                      className="flex-1 py-2 border-2 border-slate-900 bg-[#E3EFE6] hover:bg-[#d2e5d6] text-slate-900 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Check size={12} /> Mark Reviewed
                    </button>
                  )}
                  {onRemoveReport && (
                    <button
                      onClick={() => onRemoveReport(report.id)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: NEW COMMUNITIES                                      */}
      {/* ========================================================= */}
      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedGroups.length === 0 ? (
            <div className="md:col-span-2 text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs">
              No community groups yet.
            </div>
          ) : (
            sortedGroups.map((grp) => {
              const isNew = Date.now() - (grp.createdAt || 0) < NEW_WINDOW_MS;
              return (
                <div key={grp.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold text-slate-900"># {grp.name}</h3>
                    {isNew && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                        New
                      </span>
                    )}
                  </div>
                  {grp.description && <p className="text-xs text-slate-600 leading-relaxed">{grp.description}</p>}
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> Created {timeAgo(grp.createdAt || Date.now())}
                  </p>
                  {onRemoveGroup && (
                    <button
                      onClick={() => onRemoveGroup(grp.id)}
                      className="w-full mt-1 py-2 bg-gray-50 hover:bg-rose-50 hover:text-rose-700 text-gray-500 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 size={12} /> Remove Community
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB: NEW EVENTS                                           */}
      {/* ========================================================= */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedEvents.length === 0 ? (
            <div className="md:col-span-2 text-center py-12 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-gray-400 text-xs">
              No events listed yet.
            </div>
          ) : (
            sortedEvents.map((event) => {
              const isNew = Date.now() - (event.createdAt || 0) < NEW_WINDOW_MS;
              return (
                <div key={event.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      {event.type}
                    </span>
                    {isNew && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{event.title}</h3>
                  <p className="text-xs text-gray-400">{event.organization} • {event.location}</p>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Clock size={10} /> Posted {timeAgo(event.createdAt || Date.now())}
                  </p>
                  {onRemoveEvent && (
                    <button
                      onClick={() => onRemoveEvent(event.id)}
                      className="w-full mt-1 py-2 bg-gray-50 hover:bg-rose-50 hover:text-rose-700 text-gray-500 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 size={12} /> Remove Listing
                    </button>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}