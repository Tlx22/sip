import React, { useState } from 'react';
import { Send, UserPlus, Search, ArrowLeft, MoreVertical, Archive, Trash2, Inbox, QrCode, Scan, Camera, X, Check } from 'lucide-react';

export default function SocialPane({ chatRoomsData, onAppendNewRoom }) {
  const [rooms, setRooms] = useState(chatRoomsData || [
    { id: '1', name: 'Alfie (Bouldering)', handle: 'alfie_v7', isArchived: false, messages: [{ sender: 'them', text: 'Yo, down to run some sets on the slab wall tonight?', time: '4:15 PM' }] },
    { id: '2', name: 'Jem (SP Band)', handle: 'jem_drums', isArchived: false, messages: [{ sender: 'you', text: 'Double hit on hi-hat sounds clean for the chorus!', time: 'Yesterday' }] }
  ]);
  
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id || null);
  const [typedMessage, setTypedMessage] = useState('');
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [addSearchTerm, setAddSearchTerm] = useState('');

  // QR States
  const [qrMode, setQrMode] = useState(null); // 'display' | 'scan' | null
  const [scanSuccess, setScanSuccess] = useState(false);

  // Context Menu & Archive View States
  const [openMenuRoomId, setOpenMenuRoomId] = useState(null);
  const [showArchivedView, setShowArchivedView] = useState(false);

  // Discovery Corpus
  const publicDiscoveryDirectory = [
    { id: 'hl-1', name: 'Marcus Tan', handle: 'marcus_mixes', interestTags: 'Drums Guitar Rock covers Analog' },
    { id: 'hl-2', name: 'Sarah Lim', handle: 'sarah_boulders', interestTags: 'Bouldering Slab Wall climbing balance' },
    { id: 'fc-football', name: 'Coach Fazli', handle: 'fazli_striker', interestTags: 'Football sports pitch local' }
  ];

  const currentActiveRoom = rooms.find(r => r.id === activeRoomId);

  React.useEffect(() => {
    if (chatRoomsData && chatRoomsData.length > 0) {
      const mergedRooms = chatRoomsData.map(newRoom => {
        const existing = rooms.find(r => r.id === newRoom.id);
        return existing ? { ...newRoom, isArchived: existing.isArchived ?? false } : { ...newRoom, isArchived: false };
      });
      setRooms(mergedRooms);
      setActiveRoomId(chatRoomsData[chatRoomsData.length - 1].id);
    }
  }, [chatRoomsData]);

  const fireMessage = () => {
    if (!typedMessage.trim() || !activeRoomId) return;
    
    setRooms(prevRooms => prevRooms.map(room => {
      if (room.id === activeRoomId) {
        return {
          ...room,
          messages: [...room.messages, { sender: 'you', text: typedMessage, time: 'Just now' }]
        };
      }
      return room;
    }));
    setTypedMessage('');
  };

  const executeAddContact = (candidate) => {
    const spaceExisted = rooms.find(r => r.id === candidate.id);
    if (!spaceExisted) {
      const freshRoom = {
        id: candidate.id,
        name: candidate.name,
        handle: candidate.handle,
        isArchived: false,
        messages: [{ sender: 'them', text: `Hey! I just added you via QR/Contact. Let's start typing!`, time: 'Just now' }]
      };
      const upgradedRooms = [...rooms, freshRoom];
      setRooms(upgradedRooms);
      setActiveRoomId(candidate.id);
      if (onAppendNewRoom) onAppendNewRoom(upgradedRooms);
    } else {
      setActiveRoomId(candidate.id);
    }
    setIsAddingPerson(false);
    setAddSearchTerm('');
    setQrMode(null);
    setScanSuccess(false);
  };

  // Trigger simulated QR Scan action
  const handleSimulatedScan = () => {
    setScanSuccess(true);
    setTimeout(() => {
      executeAddContact({ id: 'hl-siti', name: 'Siti', handle: 'siti_mom' });
    }, 1200);
  };

  const handleDeleteRoom = (roomId, e) => {
    e.stopPropagation();
    const updatedRooms = rooms.filter(r => r.id !== roomId);
    setRooms(updatedRooms);

    if (activeRoomId === roomId) {
      const remainingVisible = updatedRooms.filter(r => showArchivedView ? r.isArchived : !r.isArchived);
      setActiveRoomId(remainingVisible[0]?.id || null);
    }
    setOpenMenuRoomId(null);
  };

  const handleToggleArchiveRoom = (roomId, e) => {
    e.stopPropagation();
    const updatedRooms = rooms.map(r => 
      r.id === roomId ? { ...r, isArchived: !r.isArchived } : r
    );
    setRooms(updatedRooms);

    if (activeRoomId === roomId) {
      const remainingVisible = updatedRooms.filter(r => showArchivedView ? r.isArchived : !r.isArchived);
      setActiveRoomId(remainingVisible[0]?.id || null);
    }
    setOpenMenuRoomId(null);
  };

  const visibleDiscoveryMatches = publicDiscoveryDirectory.filter(person => 
    person.name.toLowerCase().includes(addSearchTerm.toLowerCase()) ||
    person.interestTags.toLowerCase().includes(addSearchTerm.toLowerCase())
  );

  const displayedRooms = rooms.filter(r => showArchivedView ? r.isArchived : !r.isArchived);
  const archivedCount = rooms.filter(r => r.isArchived).length;

  return (
    <aside className="w-80 bg-[#FBFBFA] border-l border-gray-100 flex flex-col h-screen text-left relative">
      
      {openMenuRoomId && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setOpenMenuRoomId(null)} 
        />
      )}

      {/* HEADER BAR */}
      <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between shrink-0">
        <div>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">Messaging</h2>
          <button 
            onClick={() => setShowArchivedView(!showArchivedView)}
            className="text-[10px] text-[#046A4E] hover:underline font-bold flex items-center gap-1 mt-0.5 cursor-pointer"
          >
            <span>{showArchivedView ? '📦 Archived Chats' : '💬 Active Threads'}</span>
            {archivedCount > 0 && !showArchivedView && (
              <span className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-full text-[9px] font-mono">
                {archivedCount}
              </span>
            )}
          </button>
        </div>
        <button 
          onClick={() => { setIsAddingPerson(true); setQrMode(null); }}
          className="p-2 bg-slate-50 hover:bg-[#046A4E] hover:text-white rounded-xl text-slate-600 transition-all flex items-center gap-1 text-[11px] font-bold cursor-pointer"
        >
          <UserPlus size={14} /> Add
        </button>
      </div>

      {/* VIEWPORT CHANNEL: ADD CONNECTIONS & QR INTERFACE */}
      {isAddingPerson ? (
        <div className="flex-1 p-4 bg-white flex flex-col space-y-4">
          <button 
            onClick={() => { setIsAddingPerson(false); setQrMode(null); }}
            className="flex items-center gap-1 text-xs text-slate-500 font-bold hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft size={12} /> Back to Chats
          </button>
          
          <div className="space-y-1">
            <h3 className="text-xs font-black text-slate-900 uppercase">Find Connections</h3>
            <p className="text-[10px] text-gray-400">Search tags or share QR codes for instant connection.</p>
          </div>

          {/* QR CODE ACTION TABS */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setQrMode(qrMode === 'display' ? null : 'display')}
              className={`py-2 px-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                qrMode === 'display' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-gray-200 text-slate-700 hover:bg-gray-100'
              }`}
            >
              <QrCode size={13} /> My QR Code
            </button>
            <button
              onClick={() => { setQrMode(qrMode === 'scan' ? null : 'scan'); setScanSuccess(false); }}
              className={`py-2 px-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                qrMode === 'scan' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-gray-200 text-slate-700 hover:bg-gray-100'
              }`}
            >
              <Scan size={13} /> Scan QR Code
            </button>
          </div>

          {/* MODE A: DISPLAY MY QR CODE */}
          {qrMode === 'display' && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-3 animate-in fade-in">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-slate-400">Share to Add</span>
                <button onClick={() => setQrMode(null)} className="text-gray-400 hover:text-slate-800"><X size={12}/></button>
              </div>
              <div className="bg-white p-3 rounded-xl inline-block border border-slate-200 shadow-xs">
                {/* Embedded SVG QR Pattern */}
                <svg className="w-32 h-32" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 h30 v30 h-30 z M5,5 v20 h20 v-20 z M10,10 h10 v10 h-10 z" />
                  <path d="M70,0 h30 v30 h-30 z M75,5 v20 h20 v-20 z M80,10 h10 v10 h-10 z" />
                  <path d="M0,70 h30 v30 h-30 z M5,75 v20 h20 v-20 z M10,80 h10 v10 h-10 z" />
                  <rect x="40" y="5" width="8" height="20" />
                  <rect x="40" y="35" width="20" height="8" />
                  <rect x="10" y="40" width="20" height="8" />
                  <rect x="70" y="40" width="25" height="8" />
                  <rect x="40" y="50" width="8" height="25" />
                  <rect x="55" y="55" width="20" height="20" />
                  <rect x="80" y="70" width="15" height="15" />
                  <rect x="35" y="85" width="30" height="10" />
                </svg>
              </div>
              <p className="text-[11px] font-bold text-slate-800">@chiew_sp</p>
            </div>
          )}

          {/* MODE B: SCANNER SIMULATOR */}
          {qrMode === 'scan' && (
            <div className="bg-slate-900 rounded-2xl p-4 text-center text-white space-y-3 relative overflow-hidden animate-in fade-in">
              <div className="flex justify-between items-center text-slate-400">
                <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1"><Camera size={12}/> Camera Active</span>
                <button onClick={() => setQrMode(null)} className="hover:text-white"><X size={12}/></button>
              </div>

              <div className="h-32 border-2 border-dashed border-emerald-400/70 rounded-xl flex items-center justify-center relative bg-slate-950/60">
                {scanSuccess ? (
                  <div className="flex flex-col items-center gap-1 text-emerald-400 animate-bounce">
                    <Check size={24} />
                    <span className="text-[10px] font-bold">QR Detected! Adding...</span>
                  </div>
                ) : (
                  <div className="text-center space-y-1">
                    <p className="text-[10px] text-slate-300 font-medium">Align friend's QR inside box</p>
                    <button 
                      onClick={handleSimulatedScan}
                      className="mt-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all"
                    >
                      Simulate Scan
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 text-gray-400" size={14} />
            <input 
              type="text"
              value={addSearchTerm}
              onChange={(e) => setAddSearchTerm(e.target.value)}
              placeholder="Search terms..."
              className="w-full text-xs px-3 py-2 pl-8 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#046A4E]/20"
            />
          </div>

          {/* DISCOVERY LIST */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {visibleDiscoveryMatches.map((person) => (
              <div key={person.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center group">
                <div className="min-w-0 flex-1 pr-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{person.name}</h4>
                  <p className="text-[9px] text-gray-400 truncate">@{person.handle}</p>
                </div>
                <button 
                  onClick={() => executeAddContact(person)}
                  className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[9px] uppercase font-black tracking-wider transition-colors hover:bg-[#046A4E] cursor-pointer"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* CHAT LIST */}
          <div className="flex-1 overflow-y-auto bg-white border-b border-gray-50">
            {displayedRooms.map((room) => {
              const active = room.id === activeRoomId;
              const lastMsg = room.messages[room.messages.length - 1];
              const isMenuOpen = openMenuRoomId === room.id;

              return (
                <div key={room.id} className="relative group">
                  <div 
                    onClick={() => setActiveRoomId(room.id)}
                    className={`p-3.5 border-b border-gray-50 flex gap-3 items-start cursor-pointer select-none transition-all ${
                      active ? 'bg-slate-50 border-l-4 border-l-[#046A4E]' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="w-9 h-9 bg-slate-100 rounded-xl text-xs flex items-center justify-center text-slate-500 shrink-0 font-bold mt-0.5">
                      {room.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-900 truncate pr-1">{room.name}</h4>
                        <span className="text-[8px] text-gray-400 font-mono shrink-0">{lastMsg?.time || ''}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate leading-snug">{lastMsg?.text || ''}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuRoomId(isMenuOpen ? null : room.id);
                      }}
                      className="p-1 rounded-lg text-gray-300 hover:text-slate-700 hover:bg-slate-200/60 transition-colors shrink-0 cursor-pointer"
                    >
                      <MoreVertical size={14} />
                    </button>
                  </div>

                  {isMenuOpen && (
                    <div className="absolute right-3 top-10 w-36 bg-white border border-gray-100 shadow-xl rounded-2xl py-1 z-30 space-y-0.5 text-xs text-left">
                      <button
                        onClick={(e) => handleToggleArchiveRoom(room.id, e)}
                        className="w-full text-left px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                      >
                        {room.isArchived ? <Inbox size={13} className="text-emerald-700" /> : <Archive size={13} className="text-slate-500" />}
                        <span>{room.isArchived ? 'Unarchive' : 'Archive'}</span>
                      </button>
                      <button
                        onClick={(e) => handleDeleteRoom(room.id, e)}
                        className="w-full text-left px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium transition-colors cursor-pointer"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {displayedRooms.length === 0 && (
              <div className="p-8 text-center text-xs text-gray-400 font-medium">
                {showArchivedView ? 'No archived conversations.' : 'No active conversations.'}
              </div>
            )}
          </div>

          {/* ACTIVE CHAT FEED & INPUT */}
          {currentActiveRoom ? (
            <div className="h-64 bg-slate-50/70 flex flex-col justify-between p-3 border-t border-gray-100">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {currentActiveRoom.messages.map((m, idx) => {
                  const isYou = m.sender === 'you';
                  return (
                    <div key={idx} className={`flex ${isYou ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-2.5 text-xs shadow-xs leading-relaxed ${isYou ? 'bg-[#046A4E] text-white rounded-tr-none' : 'bg-white border border-gray-100 text-slate-800 rounded-tl-none'}`}>
                        <p>{m.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-1.5 mt-2 bg-white p-1 rounded-xl border border-gray-200">
                <input 
                  type="text"
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fireMessage()}
                  placeholder={`Message ${currentActiveRoom.name.split(' ')[0]}...`}
                  className="flex-1 text-xs px-2 outline-none py-1.5 bg-transparent"
                />
                <button 
                  onClick={fireMessage}
                  className="p-1.5 bg-slate-900 text-white hover:bg-[#046A4E] rounded-lg transition-all cursor-pointer"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-[11px] text-gray-400 bg-slate-50 font-medium">
              Select a conversation thread to start texting.
            </div>
          )}
        </>
      )}
    </aside>
  );
}