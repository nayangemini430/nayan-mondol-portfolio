import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Language } from './translations';

interface PageQuickNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  language: Language;
}

export const PageQuickNav: React.FC<PageQuickNavProps> = ({
  currentPage,
  onNavigate,
  language,
}) => {
  const pages = [
    { id: 'home', bn: 'হোম পেজ', en: 'Home Page', icon: '🏠' },
    { id: 'about', bn: 'পরিচিতি পেজ', en: 'About Me', icon: '👨‍⚕️' },
    { id: 'services', bn: 'সেবাসমূহ পেজ', en: 'Services', icon: '🩺' },
    { id: 'portfolio', bn: 'পোর্টফোলিও পেজ', en: 'Portfolio', icon: '💼' },
    { id: 'blog', bn: 'ব্লগ পেজ', en: 'Health Blog', icon: '📚' },
    { id: 'contact', bn: 'যোগাযোগ পেজ', en: 'Contact', icon: '📍' },
  ];

  const otherPages = pages.filter((p) => p.id !== currentPage);

  return (
    <section className="bg-slate-50 border-t border-slate-200 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="text-sm sm:text-base font-bold text-[#092244] font-solaiman-lipi">
              {language === 'bn' ? 'অন্যান্য আলাদা পেজ ব্রাউজ করুন' : 'Browse Other Pages'}
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-bengali-stylish hidden sm:inline">
            {language === 'bn' ? 'ক্লিক করে সরাসরি আলাদা পেজে যান' : 'Click to open page separately'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {otherPages.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200/90 hover:border-teal-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{p.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-teal-700 font-bengali-stylish">
                  {language === 'bn' ? p.bn : p.en}
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
