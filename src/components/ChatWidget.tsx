import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, Video, Mic, Image as ImageIcon, Paperclip, Smile } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useLanguage();
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: t('chat.welcome'), sender: 'bot', original: t('chat.welcome') },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update welcome message if it's the only one
    if (chatHistory.length === 1 && chatHistory[0].id === 1) {
      setChatHistory([{ id: 1, text: t('chat.welcome'), sender: 'bot', original: t('chat.welcome') }]);
    }
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg = { id: Date.now(), text: message, sender: 'user', original: message };
    setChatHistory([...chatHistory, newMsg]);
    setMessage('');

    // Mock auto-reply with "translation"
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        id: Date.now() + 1,
        text: t('chat.translating'),
        sender: 'bot',
        original: t('chat.translating')
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[380px] h-[500px] bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1428A0] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{t('chat.title')}</h3>
                  <p className="text-[10px] opacity-70">{t('chat.status')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title={t('chat.voiceCall')}><Phone className="w-4 h-4" /></button>
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title={t('chat.videoCall')}><Video className="w-4 h-4" /></button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50">
              {chatHistory.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[#1428A0] text-white rounded-tr-none' 
                      : 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <p className="text-[10px] mt-1 opacity-50 italic">{t('chat.original')}: {msg.original}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-100 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <button className="p-2 text-zinc-400 hover:text-zinc-600"><ImageIcon className="w-5 h-5" /></button>
                <button className="p-2 text-zinc-400 hover:text-zinc-600"><Mic className="w-5 h-5" /></button>
                <button className="p-2 text-zinc-400 hover:text-zinc-600"><Paperclip className="w-5 h-5" /></button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-zinc-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#1428A0] transition-all"
                />
                <button 
                  onClick={handleSend}
                  className="bg-[#1428A0] text-white p-2 rounded-xl hover:bg-[#0d1b6e] transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#1428A0] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};
