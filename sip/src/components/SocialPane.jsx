import React, { useState } from 'react';
import { Send, UserPlus, Search, ArrowLeft } from 'lucide-react';

export default function SocialPane({ chatRoomsData, onAppendNewRoom }) {
  const [rooms, setRooms] = useState(chatRoomsData || [
    { id: '1', name: 'Alfie (Bouldering)', handle: 'alfie_v7', messages: [{ sender: 'them', text: 'Yo, down to run some sets on the slab wall tonight?', time: '4:15 PM' }] },
    { id: '2', name: 'Jem (SP Band)', handle: 'jem_drums', messages: [{ sender: 'you', text: 'Double hit on hi-hat sounds clean for the chorus!', time: 'Yesterday' }] }
  ]);
  
  const [activeRoomId, setActiveRoomId] = useState(rooms[0]?.id || null);
  const [typedMessage, setTypedMessage] = useState('');
  const [isAddingPerson, setIsAddingPerson] = useState(false);
  const [addSearchTerm, setAddSearchTerm] = useState('');

  // Hypothetical Discovery Corpus Database Array for New Connections
  const publicDiscoveryDirectory = [
    { id: 'hl-1', name: 'Marcus Tan', handle: 'marcus_mixes', interestTags: 'Drums Guitar Rock covers Analog' },
    { id: 'hl-2', name: 'Sarah Lim', handle: 'sarah_boulders', interestTags: 'Bouldering Slab Wall climbing balance' },
    { id: 'fc-football', name: 'Coach Fazli', handle: 'fazli_striker', interestTags: 'Football sports pitch local' }
  ];

  const currentActiveRoom = rooms.find(r => r.id === activeRoomId);

  // Sync structural property changes passed via the main pipeline layout framework
  React.useEffect(() => {
    if (chatRoomsData && chatRoomsData.length > 0) {
      setRooms(chatRoomsData);
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
        messages: [{ sender: 'them', text: `Hey! I just added you as a contact. Let's start typing!`, time: 'Just now' }]
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
  };

  const visibleDiscoveryMatches = publicDiscoveryDirectory.filter(person => 
    person.name.toLowerCase().includes(addSearchTerm.toLowerCase()) ||
    person.interestTags.toLowerCase().includes(addSearchTerm.toLowerCase())
  );

  return (
    <aside className="w-80 bg-[#FBFBFA] border-l border-gray-100 flex flex-col h-screen text-left">
      
      {/* HEADER BAR STATUS PROFILE */}
      <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between">
        <div>
          <h2 className="text-sm font-black text-slate-900 tracking-tight">Messaging</h2>
          <span className="text-[10px] text-[#046A4E] font-bold">Active Threads</span>
        </div>
        <button 
          onClick={() => setIsAddingPerson(true)}
          className="p-2 bg-slate-50 hover:bg-[#046A4E] hover:text-white rounded-xl text-slate-600 transition-all flex items-center gap-1 text-[11px] font-bold"
        >
          <UserPlus size={14} /> Add
        </button>
      </div>

      {/* VIEWPORT CHANNEL A: INTERACTIVE SEARCH/ADD PEOPLE MODAL BLOCK CONTAINER OVERLAY */}
      {isAddingPerson ? (
        <div className="flex-1 p-4 bg-white flex flex-col space-y-4">
          <button 
            onClick={() => setIsAddingPerson(false)}
            className="flex items-center gap-1 text-xs text-slate-500 font-bold hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={12} /> Back to Chats
          </button>
          
          <div className="space-y-1">
            <h3 className="text-xs font-black text-slate-900 uppercase">Find Connections</h3>
            <p className="text-[10px] text-gray-400">Search global tags like 'Douldering', 'Drums', or custom user handles.</p>
          </div>

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

          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {visibleDiscoveryMatches.map((person) => (
              <div key={person.id} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center group">
                <div className="min-w-0 flex-1 pr-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{person.name}</h4>
                  <p className="text-[9px] text-gray-400 truncate">@{person.handle}</p>
                </div>
                <button 
                  onClick={() => executeAddContact(person)}
                  className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[9px] uppercase font-black tracking-wider transition-colors hover:bg-[#046A4E]"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* WHATSAPP CORE ROUTER CHATLIST AREA */}
          <div className="flex-1 overflow-y-auto bg-white border-b border-gray-50">
            {rooms.map((room) => {
              const active = room.id === activeRoomId;
              const lastMsg = room.messages[room.messages.length - 1];
              return (
                <div 
                  key={room.id}
                  onClick={() => setActiveRoomId(room.id)}
                  className={`p-3.5 border-b border-gray-50 flex gap-3 cursor-pointer select-none transition-all ${active ? 'bg-slate-50 border-l-4 border-l-[#046A4E]' : 'hover:bg-slate-50/50'}`}
                >
                  <div className="w-9 h-9 bg-slate-100 rounded-xl text-xs flex items-center justify-center text-slate-500 shrink-0 font-bold">
                    {room.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900 truncate pr-1">{room.name}</h4>
                      <span className="text-[8px] text-gray-400 font-mono shrink-0">{lastMsg?.time || ''}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate leading-snug">{lastMsg?.text || ''}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE EXPANDED CHAT PORTAL FEED LOGS AND INPUT TEXT ENGINE */}
          {currentActiveRoom ? (
            <div className="h-64 bg-slate-50/70 flex flex-col justify-between p-3 border-t border-gray-100">
              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {currentActiveRoom.messages.map((m, idx) => {
                  const isYou = m.sender === 'you';
                  return (
                    <div key={idx} className={`flex ${isYou ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-2.5 text-xs shadow-sm leading-relaxed ${isYou ? 'bg-[#046A4E] text-white rounded-tr-none' : 'bg-white border border-gray-100 text-slate-800 rounded-tl-none'}`}>
                        <p>{m.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Action Form Tray */}
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
                  className="p-1.5 bg-slate-900 text-white hover:bg-[#046A4E] rounded-lg transition-all"
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