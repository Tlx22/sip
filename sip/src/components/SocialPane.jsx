import React from 'react';

export default function SocialPane() {
  const contacts = [
    { name: '_nuralhidayah8847', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=nura' },
    { name: '_lindaloh__3881', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=linda' },
    { name: 'chengmeifong__', avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=cheng' }
  ];

  return (
    <aside className="w-80 bg-[#F4F6F0] border-l border-gray-200 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-serif font-bold text-gray-800">Messaging</h2>
        <span className="text-xl">💬</span>
      </div>
      
      <button className="w-full text-left py-2 px-3 border border-dashed border-gray-300 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 flex items-center gap-2 mb-4 transition-colors">
        <span>➕</span> Add friends
      </button>

      <div className="flex-1 space-y-3 overflow-y-auto">
        {contacts.map((contact, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2 hover:bg-white rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
            <img src={contact.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-white border" />
            <span className="text-sm font-medium text-gray-700 truncate">{contact.name}</span>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full bg-white border py-2 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors text-center">
        Read more
      </button>
    </aside>
  );
}