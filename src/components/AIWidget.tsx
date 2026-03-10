import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AIWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const faqs = t('faqItems') || [];
  const filteredFaqs = faqs.filter((f: any) => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FF7A00] p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Bot className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{t('faq.title')}</h3>
                    <p className="text-xs opacity-80">{t('faq.status')}</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('faq.search')}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:bg-white/20 transition-all"
                />
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-zinc-50">
              {filteredFaqs.map((faq: any, index: number) => (
                <div key={index} className="bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-zinc-50 transition-colors"
                  >
                    <span className="font-bold text-sm text-zinc-800">{faq.q}</span>
                    {expandedIndex === index ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-sm text-zinc-600 leading-relaxed"
                      >
                        <div className="pt-2 border-t border-zinc-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#FF7A00] text-white rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform active:scale-95"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
      </button>
    </div>
  );
};
