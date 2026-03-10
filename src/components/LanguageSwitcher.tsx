import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Locale } from '../i18n/translations';

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
];

export const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useLanguage();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-black rounded-xl transition-all text-sm font-medium text-white">
        <Globe className="w-4 h-4" />
        <span>{languages.find(l => l.code === locale)?.label}</span>
        <ChevronDown className="w-4 h-4 opacity-50" />
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
        <div className="p-2 space-y-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLocale(lang.code)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                locale === lang.code 
                  ? 'bg-[#1428A0] text-white' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
