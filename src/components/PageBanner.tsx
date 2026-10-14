import React from 'react';
import { Home, ChevronRight, ArrowLeft } from 'lucide-react';
import { Language } from './translations';

interface PageBannerProps {
  pageTitle: string;
  pageSubtitle?: string;
  kicker?: string;
  language: Language;
  onGoHome: () => void;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  pageTitle,
  pageSubtitle,
  kicker,
  language,
  onGoHome,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#082140] via-[#0b2b54] to-[#071d37] text-white py-8 sm:py-12 border-b border-teal-500/20 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.18),transparent_60%)] pointer-events-none" />
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb & Quick back button */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300 font-bengali-stylish">
            <button
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 hover:text-teal-300 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'হোম' : 'Home'}</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-teal-300 font-semibold">{pageTitle}</span>
          </nav>

          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg border border-white/10 transition-colors font-bengali-stylish"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'হোমে ফিরে যান' : 'Back to Home'}</span>
          </button>
        </div>

        {/* Header Kicker, Title & Subtitle */}
        {kicker && (
          <span className="inline-block text-xs font-bold tracking-widest text-teal-400 uppercase mb-1.5">
            {kicker}
          </span>
        )}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white font-solaiman-lipi">
          {pageTitle}
        </h1>
        {pageSubtitle && (
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl font-bengali-stylish leading-relaxed">
            {pageSubtitle}
          </p>
        )}
      </div>
    </div>
  );
};
