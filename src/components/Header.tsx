import React, { useState, useRef } from 'react';
import { User, Menu, X, Globe, Upload, Camera, RotateCcw, ShieldCheck, CheckCircle } from 'lucide-react';
import { Language, translations } from './translations';
import { safeLocalStorageSetItem, compressImageFile } from '../utils/storage';

interface HeaderProps {
  onHireMeClick: () => void;
  onBlogClick?: () => void;
  currentPage?: string;
  onNavigate: (page: string) => void;
  language: Language;
  onToggleLanguage: () => void;
}

import { TealPharmacyExecutiveBadgeSVG } from './TealBadgeSVG';


export const Header: React.FC<HeaderProps> = ({
  onHireMeClick,
  onBlogClick,
  currentPage = 'home',
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [badgeImage, setBadgeImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('nm_badge_image') || null;
    } catch {
      return null;
    }
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const t = translations[language].header;

  const navLinks = [
    { name: t.home, href: '#home', id: 'home' },
    { name: t.about, href: '#about', id: 'about' },
    { name: t.services, href: '#services', id: 'services' },
    { name: t.portfolio, href: '#portfolio', id: 'portfolio' },
    { name: t.blog, href: '#blog', id: 'blog' },
    { name: t.contact, href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    onNavigate(link.id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#082140] text-white shadow-md border-b border-[#0f305c]/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Logo Badge - Click opens preview / change modal */}
            <div className="relative group/badge shrink-0">
              <button
                type="button"
                onClick={() => setBadgeModalOpen(true)}
                className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-teal-400 to-teal-200 shadow-md ring-1 ring-teal-300/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400"
                title="Teal Pharmacy Sales Executive Badge • বড় করে দেখতে বা পরিবর্তন করতে ক্লিক করুন"
                aria-label="Pharmacy Sales Executive Badge"
              >
                <div className="w-full h-full rounded-full bg-[#032828] overflow-hidden flex items-center justify-center border border-amber-300/40">
                  {badgeImage ? (
                    <img
                      src={badgeImage}
                      alt="Teal Pharmacy Sales Executive Badge"
                      className="w-full h-full object-cover rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <TealPharmacyExecutiveBadgeSVG className="w-full h-full" />
                  )}
                </div>

                {/* Subtle Edit / Zoom indicator */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md ring-1 ring-slate-900 opacity-90 group-hover/badge:opacity-100 group-hover/badge:scale-110 transition-all text-[9px] font-bold"
                  title="ব্যাজ দেখুন বা পরিবর্তন করুন"
                >
                  ✎
                </span>
              </button>
            </div>

            {/* Brand Title & Tagline - Direct Link to Home */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="flex flex-col text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-base sm:text-xl lg:text-[22px] font-bold tracking-tight text-white group-hover:text-teal-300 transition-colors leading-none font-solaiman-lipi">
                {t.brandTitle}
              </span>
              <span className="block text-[10px] sm:text-[11px] text-teal-300 font-medium tracking-wide mt-0.5 sm:mt-1">
                {t.brandTagline}
              </span>
            </a>
          </div>

          {/* Center / Right Horizontal Navigation Menu (Desktop & Laptop) */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-5 text-xs lg:text-sm" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`relative font-medium transition-all py-1.5 px-2.5 rounded-lg font-bengali-stylish ${
                    isActive
                      ? 'text-teal-300 bg-white/10 font-bold shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-teal-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Language switcher */}
            <button
              onClick={onToggleLanguage}
              type="button"
              title="Switch Language / ভাষা পরিবর্তন"
              className="flex items-center gap-1 sm:gap-1.5 bg-[#0e2f5b] hover:bg-[#153c6e] text-teal-300 hover:text-white px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-semibold border border-teal-500/30 transition-all font-bengali-stylish"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{language === 'bn' ? 'English' : 'বাংলা'}</span>
              <span className="sm:hidden">{language === 'bn' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Hire Me button */}
            <button
              onClick={onHireMeClick}
              type="button"
              className="inline-flex items-center gap-1 sm:gap-2 bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-semibold px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-sm transition-all duration-150 transform hover:-translate-y-0.5 active:translate-y-0 font-bengali-stylish"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
              <span className="hidden min-[380px]:inline">{t.hireMe}</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#0e2f5b] focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Dropdown on Mobile) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071b36] border-t border-[#123668] px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm sm:text-base font-medium font-bengali-stylish transition-colors ${
                  isActive
                    ? 'bg-teal-600/25 text-teal-300 font-semibold border-l-4 border-teal-400'
                    : 'text-slate-200 hover:bg-[#0d2a52] hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onHireMeClick();
              }}
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-semibold py-2.5 rounded-lg shadow font-bengali-stylish text-sm"
            >
              <User className="w-4 h-4 fill-white" />
              <span>{t.hireMe}</span>
            </button>
          </div>
        </div>
      )}

      {/* Hidden file input for direct badge upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            try {
              const compressed = await compressImageFile(file, 600, 600, 0.85);
              setBadgeImage(compressed);
              safeLocalStorageSetItem('nm_badge_image', compressed);
            } catch (err) {
              console.error('Failed to compress badge image, falling back to FileReader:', err);
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target?.result) {
                  const dataUrl = event.target.result as string;
                  setBadgeImage(dataUrl);
                  safeLocalStorageSetItem('nm_badge_image', dataUrl);
                }
              };
              reader.readAsDataURL(file);
            }
          }
        }}
      />

      {/* Badge View & Customization Modal */}
      {badgeModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setBadgeModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#092244] border border-teal-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-center overflow-hidden animate-zoomIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-teal-400/20 blur-2xl pointer-events-none rounded-full" />

            {/* Close button */}
            <button
              onClick={() => setBadgeModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close badge modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Badge Preview */}
            <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-teal-400 to-teal-200 shadow-xl ring-4 ring-teal-500/30 flex items-center justify-center mb-5">
              <div className="w-full h-full rounded-full bg-[#032828] overflow-hidden flex items-center justify-center border border-amber-300/40">
                {badgeImage ? (
                  <img
                    src={badgeImage}
                    alt="Teal Pharmacy Sales Executive Badge"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <TealPharmacyExecutiveBadgeSVG className="w-full h-full" />
                )}
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-400/40 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                <span>Verified Professional Badge</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white font-solaiman-lipi mt-2">
                {language === 'bn' ? 'ফার্মেসি সেলস এক্সিকিউটিভ ব্যাজ' : 'Pharmacy Sales Executive Badge'}
              </h3>
              <p className="text-xs sm:text-sm text-teal-200/90 font-bengali-stylish">
                {language === 'bn'
                  ? '১০+ বছরের প্রেসক্রিপশন হ্যান্ডলিং, কোল্ড-চেইন সংরক্ষণ ও পেশাদার রিটেল ফার্মেসি সেবার স্বীকৃতি।'
                  : 'Certified retail pharmacy management, prescription accuracy & cold-chain distribution credentials.'}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center font-bengali-stylish text-sm">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold shadow-md transition-all active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>{language === 'bn' ? 'ব্যাজের ছবি আপলোড করুন' : 'Upload Badge Image'}</span>
              </button>

              {badgeImage && (
                <button
                  type="button"
                  onClick={() => {
                    setBadgeImage(null);
                    try {
                      localStorage.removeItem('nm_badge_image');
                    } catch {}
                  }}
                  className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold transition-all active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{language === 'bn' ? 'ডিফল্ট ব্যাজে ফিরুন' : 'Reset to Default'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};


