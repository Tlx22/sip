import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X, Send, FileText, PlayCircle, Bot } from 'lucide-react';

// Very small rule-based "AI" responder. Looks for keywords in the user's
// message and decides whether to surface the Terms & Conditions modal, the
// tutorial video modal, or just reply conversationally.
function getBotResponse(userText) {
  const text = userText.toLowerCase();

  const mentionsTerms = /\bt&c'?s?\b|\bterms\b|\bconditions\b|\btandc\b/.test(text);
  if (mentionsTerms) {
    return {
      reply: "Here are our Terms & Conditions - I've opened them up for you to review.",
      action: 'terms'
    };
  }

  const mentionsTutorial = /\btutorial\b|\bvideo\b|\bhow\s?to\b|\bguide\b|\bwalkthrough\b/.test(text);
  if (mentionsTutorial) {
    return {
      reply: "Sure thing! Here's a quick tutorial video walking through Co-Co.",
      action: 'video'
    };
  }

  return {
    reply: "I can help with a couple of things right now - try asking me for the \"Terms & Conditions\" or a \"tutorial video\"!",
    action: null
  };
}

const TUTORIAL_VIDEO_ID = '1aMCVgRKcP4';

export default function HelpChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! 👋 What do you need help with?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const { reply, action } = getBotResponse(trimmed);

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: trimmed },
      { sender: 'bot', text: reply }
    ]);
    setInputText('');

    if (action === 'terms') setShowTerms(true);
    if (action === 'video') setShowVideo(true);
  };

  return (
    <>
      {/* FLOATING HELP TRIGGER - always visible near the top of the viewport */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-lg transition-all"
        aria-label="Open help chat"
      >
        <HelpCircle size={15} /> Help
      </button>

      {/* CHAT PANEL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-slate-900/30"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white border-2 border-slate-900 rounded-3xl shadow-2xl flex flex-col overflow-hidden mt-14 max-h-[70vh]">

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center">
                  <Bot size={15} />
                </div>
                <div>
                  <p className="text-xs font-black">Co-Co Help Assistant</p>
                  <p className="text-[9px] text-slate-300">Simulated • usually replies instantly</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50/70">
              {messages.map((m, idx) => {
                const isBot = m.sender === 'bot';
                return (
                  <div key={idx} className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] rounded-2xl p-2.5 text-xs shadow-xs leading-relaxed ${
                      isBot
                        ? 'bg-white border border-gray-100 text-slate-800 rounded-tl-none'
                        : 'bg-[#046A4E] text-white rounded-tr-none'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                );
              })}

              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setInputText("Show me the Terms & Conditions")}
                  className="text-[10px] font-bold px-2.5 py-1 bg-white border border-gray-200 rounded-full text-slate-600 hover:bg-gray-100 transition-colors"
                >
                  📄 Terms & Conditions
                </button>
                <button
                  onClick={() => setInputText("Can I see a tutorial video?")}
                  className="text-[10px] font-bold px-2.5 py-1 bg-white border border-gray-200 rounded-full text-slate-600 hover:bg-gray-100 transition-colors"
                >
                  ▶️ Tutorial video
                </button>
              </div>

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-1.5 p-2.5 bg-white border-t border-gray-100 shrink-0">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask for help..."
                className="flex-1 text-xs px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-slate-400 transition-all"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-slate-900 text-white hover:bg-[#046A4E] rounded-xl transition-all"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TERMS & CONDITIONS MODAL */}
      {showTerms && (
        <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-slate-700" />
                <h2 className="text-sm font-serif font-bold text-slate-900">Terms & Conditions</h2>
              </div>
              <button onClick={() => setShowTerms(false)} className="p-1 text-gray-400 hover:text-slate-900 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-600 leading-relaxed overflow-y-auto">
              <p className="text-[10px] text-gray-400">Last updated: August 2026</p>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">1. Acceptance of Terms</h3>
                <p>By creating an account or using Co-Co, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the platform.</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">2. Eligibility & Accounts</h3>
                <p>You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You must provide accurate information when registering.</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">3. Acceptable Use</h3>
                <p>You agree not to use Co-Co to:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Post or solicit illegal employment, unlicensed labour arrangements, or any work that violates local employment law</li>
                  <li>Harass, threaten, or discriminate against other members</li>
                  <li>Post spam, scams, or fraudulent event/community listings</li>
                  <li>Share another person's private information without consent</li>
                  <li>Circumvent moderation, safety checks, or reporting tools</li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">4. Community & Event Listings</h3>
                <p>Organizations hosting events and communities are responsible for the accuracy of their listings, including safety briefing requirements. Co-Co reserves the right to remove any listing that violates these terms.</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">5. Moderation & Enforcement</h3>
                <p>Reports filed through the chat reporting feature are reviewed by our moderation team. Accounts found in violation of these terms may be suspended or removed at Co-Co's discretion.</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">6. Limitation of Liability</h3>
                <p>Co-Co is a platform for community connection and is not liable for interactions, transactions, or events arranged between members outside the app.</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900">7. Changes to These Terms</h3>
                <p>We may update these terms from time to time. Continued use of Co-Co after changes are posted constitutes acceptance of the revised terms.</p>
              </div>

              <p className="text-[10px] text-gray-400 pt-2 border-t border-gray-50">This is placeholder/mock text for demo purposes only and is not a legally binding document.</p>
            </div>

            <div className="p-4 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setShowTerms(false)}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TUTORIAL VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <PlayCircle size={16} className="text-slate-700" />
                <h2 className="text-sm font-serif font-bold text-slate-900">Getting Started with Co-Co</h2>
              </div>
              <button onClick={() => setShowVideo(false)} className="p-1 text-gray-400 hover:text-slate-900 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${TUTORIAL_VIDEO_ID}`}
                title="Co-Co Tutorial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4">
              <button
                onClick={() => setShowVideo(false)}
                className="w-full py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}