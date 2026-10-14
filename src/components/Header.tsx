import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Language, translations } from './translations';
import { TealPharmacyExecutiveBadgeSVG } from './TealBadgeSVG';

interface HeaderProps {
  onHireMeClick: () => void;
  onBlogClick?: () => void;
  currentPage?: string;
  onNavigate: (page: string) => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onHireMeClick,
  currentPage = 'home',
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('nm_badge_image') || null;
    } catch {
      return null;
    }
  });

  const t = translations[language].header;

  const navLinks = [
    { name: t.home, href: '#home', id: 'home' },
    { name: t.about, href: '#about', id: 'about' },
    { name: t.services, href: '#services', id: 'services' },
    { name: t.portfolio, href: '#portfolio', id: 'portfolio' },
    { name: t.blog, href: '#blog', id: 'blog' },
    { name: t.contact, href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href: string, id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#082140] text-white shadow-md border-b border-[#0f305c]/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo & Tagline - Direct Link to Home */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            className="flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer focus:outline-none"
            aria-label="নয়ন মন্ডল - ফার্মেসি সেলস এক্সিকিউটিভ"
          >
            {/* Logo Badge - Clean Official Reference Badge without any edit/pen icon */}
            <div className="relative shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-teal-400 to-teal-200 shadow-md ring-1 ring-teal-300/40 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#032828] overflow-hidden flex items-center justify-center border border-amber-300/40">
                {badgeImage ? (
                  <img
                    src={badgeImage}
                    alt="নয়ন মন্ডল - Pharmacy Sales Executive"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <TealPharmacyExecutiveBadgeSVG className="w-full h-full" />
                )}
              </div>
            </div>

            {/* Brand Title & Tagline */}
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-xl lg:text-[22px] font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors leading-none font-solaiman-lipi">
                {t.brandTitle}
              </span>
              <span className="block text-[10px] sm:text-[11px] text-teal-300 font-medium tracking-wide mt-0.5 sm:mt-1">
                {t.brandTagline}
              </span>
            </div>
          </a>

          {/* Center / Right Horizontal Navigation Menu (Desktop & Laptop) */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-5 text-xs lg:text-sm" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.id);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-all duration-150 font-medium whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-teal-300 bg-teal-900/35 border-b-2 border-teal-400 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Area: Language Switcher + Hire Me CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher Button (Bengali / English) */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0e325c] hover:bg-[#123e72] text-xs font-semibold text-slate-200 hover:text-white border border-[#1e4d85] transition-all cursor-pointer shadow-sm active:scale-95"
              title={language === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-400" />
              <span className="uppercase tracking-wide font-mono text-[11px]">
                {language === 'bn' ? 'English' : 'বাংলা'}
              </span>
            </button>

            {/* Hire Me CTA Button */}
            <button
              onClick={onHireMeClick}
              className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-slate-950 font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 text-xs lg:text-sm cursor-pointer whitespace-nowrap font-solaiman-lipi"
            >
              {t.hireMe}
            </button>
          </div>

          {/* Mobile Right Controls: Language Switcher + Hamburger Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Button */}
            <button
              type="button"
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#0e325c] text-xs font-medium text-slate-200 border border-[#1e4d85] cursor-pointer"
              aria-label="Toggle language mobile"
            >
              <Globe className="w-3 h-3 text-teal-400" />
              <span className="text-[10px] uppercase font-mono font-bold">
                {language === 'bn' ? 'EN' : 'বাং'}
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-teal-400 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071d38] border-b border-[#0f305c] animate-fadeIn">
          <div className="px-4 pt-2 pb-5 space-y-1 sm:px-6">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href, link.id);
                  }}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-teal-300 bg-teal-900/40 border-l-4 border-teal-400'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                </a>
              );
            })}

            {/* Mobile Hire Me Button */}
            <div className="pt-3">
              <button
                onClick={() => {
                  onHireMeClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-slate-950 font-semibold px-4 py-2.5 rounded-lg shadow-md text-sm text-center cursor-pointer font-solaiman-lipi"
              >
                {t.hireMe}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
