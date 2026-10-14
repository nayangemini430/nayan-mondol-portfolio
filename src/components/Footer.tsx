import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ExternalLink,
  MessageSquare,
  HeartPulse,
  ArrowUp,
  AlertCircle
} from 'lucide-react';
import { Language, translations } from './translations';
import { TealPharmacyExecutiveBadgeSVG } from './TealBadgeSVG';

interface FooterProps {
  onBlogClick?: () => void;
  onNavigate?: (page: string) => void;
  currentPage?: string;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onBlogClick, onNavigate, currentPage, language }) => {
  const isBn = language === 'bn';
  const t = translations[language].footer;

  const handleNav = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07192f] text-slate-300 pt-8 sm:pt-12 pb-6 sm:pb-10 overflow-hidden border-t-4 border-[#0284c7]">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            TOP ROW: EMERGENCY / DIRECT CONSULTATION CALLOUT (COMPACT & MOBILE-READY)
        ========================================================================== */}
        <div className="bg-gradient-to-r from-[#0d2a4a] via-[#092244] to-[#0a3560] rounded-2xl p-4 sm:p-5 mb-6 sm:mb-10 border border-blue-900/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3.5 sm:gap-4">
          <div className="flex items-center gap-3 text-center md:text-left w-full md:w-auto">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-500/30">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </div>
            <div className="text-left flex-1 min-w-0">
              <h4 className="text-sm sm:text-base font-bold text-white font-solaiman-lipi leading-snug">
                {isBn
                  ? 'জরুরি প্রেসক্রিপশন বা ওষুধ নিয়ে তাৎক্ষণিক পরামর্শ প্রয়োজন?'
                  : 'Need Urgent Prescription or Medication Consultation?'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-300 font-bengali-stylish mt-0.5">
                {isBn
                  ? 'নয়ন মন্ডল সরাসরি ফোন কল ও হোয়াটসঅ্যাপে প্রেসক্রিপশন অনুযায়ী ওষুধ সেবা প্রদান করেন।'
                  : 'Nayan Mondol provides direct assistance and prescription medicine supply.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-stretch sm:justify-end">
            <a
              href="tel:+8801989044092"
              className="flex-1 md:flex-none px-3.5 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isBn ? 'সরাসরি কল' : 'Call Now'}</span>
            </a>
            <a
              href={`https://wa.me/8801989044092?text=${encodeURIComponent(
                isBn
                  ? 'হ্যালো নয়ন মন্ডল ভাই, আমি প্রেসক্রিপশন অনুযায়ী ওষুধ নিয়ে কথা বলতে চাই।'
                  : 'Hello Nayan Mondol, I need assistance regarding my prescription.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-3.5 py-2 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isBn ? 'হোয়াটসঅ্যাপ' : 'WhatsApp'}</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            MAIN RESPONSIVE FOOTER GRID (OPTIMIZED FOR MOBILE TO AVOID LONG SCROLL)
        ========================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 pb-8 sm:pb-10 border-b border-slate-800">
          
          {/* Column 1: Brand & Professional Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 via-teal-400 to-teal-200 shadow-md ring-1 ring-teal-300/40 shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#032828] overflow-hidden flex items-center justify-center border border-amber-300/30">
                  <TealPharmacyExecutiveBadgeSVG className="w-full h-full" />
                </div>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-white font-solaiman-lipi tracking-tight leading-tight">
                  {isBn ? 'নয়ন মন্ডল' : 'Nayan Mondol'}
                </h3>
                <p className="text-[11px] sm:text-xs text-teal-300 font-medium tracking-wide">
                  Sales Executive
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300/90 leading-relaxed font-bengali-stylish">
              {isBn
                ? 'প্রেসক্রিপশন অনুযায়ী সঠিক ওষুধ সরবরাহ, কোল্ড-চেইন সংরক্ষণ এবং কমিউনিটির প্রতিটি পরিবারের সুস্বাস্থ্য সেবায় নিবেদিতপ্রাণ।'
                : 'Dedicated to genuine prescription medicine supply, cold-chain maintenance, and honest community care in Shariatpur.'}
            </p>

            {/* Professional Experience Badge (Compact) */}
            <div className="p-2.5 bg-[#0d233e] rounded-xl border border-blue-900/60 space-y-1 text-xs">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-[11px] sm:text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>{isBn ? '১০০% আসল ওষুধ ও সঠিক সরবরাহ' : '100% Genuine Medicine Sourcing'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-bengali-stylish text-[10.5px] sm:text-[11px]">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{isBn ? '১০+ বছরের বাস্তব রিটেল ফার্মেসি অভিজ্ঞতা' : '10+ Years Hands-on Retail Experience'}</span>
              </div>
            </div>
          </div>

          {/* Group Column: Quick Navigation & Services side-by-side on mobile (5 cols desktop) */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-5">
            {/* Sub-column 1: Quick Navigation Pages */}
            <div className="space-y-2.5 font-bengali-stylish">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-solaiman-lipi border-l-2 border-teal-400 pl-2">
                {isBn ? 'পেজসমূহ' : 'Pages'}
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => handleNav(e, 'home')}
                    className={`hover:text-teal-300 transition-colors flex items-center gap-1 ${
                      currentPage === 'home' ? 'text-teal-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-teal-500 text-[10px]">›</span>
                    <span>{isBn ? 'হোম পেজ' : 'Home'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleNav(e, 'about')}
                    className={`hover:text-teal-300 transition-colors flex items-center gap-1 ${
                      currentPage === 'about' ? 'text-teal-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-teal-500 text-[10px]">›</span>
                    <span>{isBn ? 'পরিচিতি' : 'About'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleNav(e, 'services')}
                    className={`hover:text-teal-300 transition-colors flex items-center gap-1 ${
                      currentPage === 'services' ? 'text-teal-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-teal-500 text-[10px]">›</span>
                    <span>{isBn ? 'সেবাসমূহ' : 'Services'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#portfolio"
                    onClick={(e) => handleNav(e, 'portfolio')}
                    className={`hover:text-teal-300 transition-colors flex items-center gap-1 ${
                      currentPage === 'portfolio' ? 'text-teal-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-teal-500 text-[10px]">›</span>
                    <span>{isBn ? 'পোর্টফোলিও' : 'Portfolio'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    onClick={(e) => handleNav(e, 'blog')}
                    className={`hover:text-teal-300 transition-colors flex items-center gap-1 ${
                      currentPage === 'blog' ? 'text-teal-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-teal-500 text-[10px]">›</span>
                    <span>{isBn ? 'স্বাস্থ্য ব্লগ' : 'Blog'}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleNav(e, 'contact')}
                    className={`hover:text-teal-300 transition-colors flex items-center gap-1 ${
                      currentPage === 'contact' ? 'text-teal-300 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span className="text-teal-500 text-[10px]">›</span>
                    <span>{isBn ? 'যোগাযোগ' : 'Contact'}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Sub-column 2: Clinical Services List */}
            <div className="space-y-2.5 font-bengali-stylish">
              <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-solaiman-lipi border-l-2 border-[#0284c7] pl-2">
                {isBn ? 'সেবাসমূহ' : 'Services'}
              </h4>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-slate-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold text-[10px]">✓</span>
                  <span>{isBn ? 'প্রেসক্রিপশন অনুযায়ী সঠিক সরবরাহ' : 'Prescription Dispensing'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold text-[10px]">✓</span>
                  <span>{isBn ? 'ওষুধের সঠিক মাত্রা ও সেবনবিধি' : 'Dosage & Timing Guide'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold text-[10px]">✓</span>
                  <span>{isBn ? 'ইনসুলিনের কোল্ড-চেইন (২°-৮°C)' : 'Cold-Chain Insulin Care'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold text-[10px]">✓</span>
                  <span>{isBn ? 'ডায়াবেটিস ও প্রেশারের ওষুধ সাপোর্ট' : 'Chronic Patient Support'}</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-teal-400 font-bold text-[10px]">✓</span>
                  <span>{isBn ? 'আসল ওষুধের শতভাগ নিশ্চয়তা' : '100% Genuine Medicine'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Chamber, Direct Phone & Map (3 cols) */}
          <div className="lg:col-span-3 space-y-2.5 font-bengali-stylish">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider font-solaiman-lipi border-l-2 border-emerald-400 pl-2">
              {isBn ? 'চেম্বার ও সরাসরি যোগাযোগ' : 'Chamber & Visit'}
            </h4>

            <div className="space-y-2 text-xs text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <div className="text-[11px] sm:text-xs">
                  <strong className="text-white block font-solaiman-lipi">
                    {isBn ? 'মেসার্স সিকদার ফার্মেসী' : 'M/S Sikder Pharmacy'}
                  </strong>
                  <span className="text-slate-400">
                    {isBn ? 'দাইয়ান টাওয়ারের নিচে, আঙ্গারিয়া বাজার, সদর, শরীয়তপুর' : 'Under Daiyan Tower, Angaria Bazar, Shariatpur'}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <a href="tel:+8801989044092" className="hover:text-teal-300 transition-colors font-bold text-white">
                  +880 1989 044092
                </a>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-2 text-[11px] sm:text-xs">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-white block">
                    {isBn ? 'প্রতিদিন: সকাল ৯টা – রাত ১০টা' : 'Daily: 9:00 AM – 10:00 PM'}
                  </span>
                </div>
              </div>
            </div>

            {/* Google Map Link Button (Compact) */}
            <div className="pt-1">
              <a
                href="https://maps.app.goo.gl/Xx7CZZQ6mVJH5r76A"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-2.5 bg-[#0d2a4a] hover:bg-[#133b66] border border-blue-800 text-teal-300 hover:text-white rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MapPin className="w-3 h-3 text-teal-400" />
                <span>{isBn ? 'গুগল ম্যাপে লোকেশন দেখুন' : 'Google Maps Location'}</span>
                <ExternalLink className="w-3 h-3 text-teal-400" />
              </a>
            </div>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM BAR: MEDICAL DISCLAIMER, COPYRIGHT, SOCIAL LINKS, SCROLL TOP
        ========================================================================== */}
        <div className="pt-5 sm:pt-6 space-y-3 sm:space-y-4">
          {/* Medical Notice (Compact) */}
          <div className="p-2 sm:p-2.5 bg-[#0d233e]/80 rounded-xl border border-blue-900/40 flex items-start sm:items-center gap-2 text-slate-400 text-[10.5px] sm:text-[11px] font-bengali-stylish leading-relaxed">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <p>
              {isBn
                ? 'সতর্কতা: এই ওয়েবসাইটের সকল বিষয়বস্তু ফার্মাসিউটিক্যাল সচেতনতা ও সঠিক ওষুধ ব্যবহারের নির্দেশনার উদ্দেশ্যে প্রকাশিত। জটিল জরুরি চিকিৎসায় বিশেষজ্ঞ চিকিৎসকের পরামর্শ নিন।'
                : 'Disclaimer: All contents are for pharmaceutical education and safe medication awareness. In medical emergencies, consult an authorized physician.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-400 font-bengali-stylish">
            {/* Copyright */}
            <p className="text-center sm:text-left">
              {isBn ? '© ২০২৬ নয়ন মন্ডল (Nayan Mondol)। সর্বস্বত্ব সংরক্ষিত।' : '© 2026 Nayan Mondol. All rights reserved.'}
            </p>

            {/* Social Icons & Back to top */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1877F2]/20 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801989044092"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#10b981]/20 hover:bg-[#10b981] text-slate-300 hover:text-white flex items-center justify-center transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#FF0000]/20 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>

              {/* Scroll To Top Button */}
              <button
                type="button"
                onClick={scrollToTop}
                title={isBn ? 'উপরে স্ক্রল করুন' : 'Scroll to top'}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
