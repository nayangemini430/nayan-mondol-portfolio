import React from 'react';

interface VisualProps {
  customImage?: string | null;
  className?: string;
  onReplaceClick?: () => void;
}

/**
 * Highly detailed visual representing the Hero Pharmacist portrait.
 * Closely reproduces Nayan Mondol's portrait, white coat with badge,
 * blurred pharmacy background, and "Your Health Our Priority" handwritten script.
 */
export const HeroPharmacistVisual: React.FC<VisualProps> = ({
  customImage,
  className = '',
  onReplaceClick,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <div
      className={`relative w-full max-w-[560px] select-none ${
        customImage ? 'h-auto rounded-2xl' : 'aspect-[4/3.8]'
      } ${className}`}
    >
      {customImage ? (
        <>
          <img
            src={customImage}
            alt="নয়ন মন্ডল - মেসার্স সিকদার ফার্মেসী"
            className="w-full h-auto max-h-[720px] object-contain rounded-2xl shadow-xl border border-slate-200/90 bg-white cursor-pointer transition-all hover:shadow-2xl"
            onClick={() => setIsFullscreen(true)}
            title="সম্পূর্ণ ছবি বড় করে দেখতে ক্লিক করুন"
          />
          {/* Full view button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            aria-label="View full photo"
            className="absolute top-2.5 right-2.5 bg-white/95 hover:bg-white text-slate-800 text-[11px] font-semibold px-2.5 py-1.5 rounded-md shadow-md border border-slate-200 transition-all flex items-center gap-1.5 backdrop-blur-xs z-10 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>ফুল ভিউ</span>
          </button>
        </>
      ) : (
        <svg
          viewBox="0 0 640 560"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pharmacy bokeh background gradients */}
            <linearGradient id="wallWash" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#edf5fc" />
              <stop offset="45%" stopColor="#e2edf7" />
              <stop offset="100%" stopColor="#d5e4f2" />
            </linearGradient>

            <linearGradient id="shelfGlassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.45" />
            </linearGradient>

            <linearGradient id="coatGradReal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="85%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="lapelShade" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            <linearGradient id="skinRealistic" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2aa89" />
              <stop offset="50%" stopColor="#d59873" />
              <stop offset="100%" stopColor="#be7e57" />
            </linearGradient>

            <linearGradient id="hairRealistic" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2c2f35" />
              <stop offset="50%" stopColor="#1e2025" />
              <stop offset="100%" stopColor="#101114" />
            </linearGradient>

            <filter id="bokehBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.8" />
            </filter>
            <filter id="slightShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" floodColor="#092244" />
            </filter>
          </defs>

          {/* Background Wall */}
          <rect width="640" height="560" fill="url(#wallWash)" rx="20" />

          {/* Background Pharmacy Shelves (Depth of Field Bokeh Blur) */}
          <g filter="url(#bokehBlur)" opacity="0.75">
            {/* Shelves */}
            <rect x="20" y="35" width="600" height="9" rx="2" fill="url(#shelfGlassGrad)" />
            <rect x="20" y="95" width="600" height="9" rx="2" fill="url(#shelfGlassGrad)" />
            <rect x="20" y="155" width="600" height="9" rx="2" fill="url(#shelfGlassGrad)" />
            <rect x="20" y="215" width="600" height="9" rx="2" fill="url(#shelfGlassGrad)" />

            {/* Shelf 1 Bottles */}
            <rect x="35" y="48" width="16" height="42" rx="3" fill="#38bdf8" />
            <rect x="56" y="52" width="20" height="38" rx="3" fill="#34d399" />
            <rect x="80" y="46" width="18" height="44" rx="3" fill="#60a5fa" />
            <rect x="104" y="55" width="22" height="35" rx="3" fill="#fbbf24" />
            <rect x="130" y="50" width="16" height="40" rx="3" fill="#f87171" />
            <rect x="150" y="52" width="22" height="38" rx="3" fill="#a78bfa" />

            <rect x="420" y="48" width="20" height="42" rx="3" fill="#34d399" />
            <rect x="445" y="44" width="18" height="46" rx="3" fill="#38bdf8" />
            <rect x="470" y="54" width="24" height="36" rx="3" fill="#a78bfa" />
            <rect x="500" y="48" width="16" height="42" rx="3" fill="#34d399" />
            <rect x="522" y="50" width="22" height="40" rx="3" fill="#60a5fa" />

            {/* Shelf 2 Bottles */}
            <rect x="40" y="108" width="24" height="42" rx="3" fill="#38bdf8" />
            <rect x="70" y="112" width="20" height="38" rx="3" fill="#34d399" />
            <rect x="95" y="106" width="18" height="44" rx="3" fill="#fbbf24" />
            <rect x="430" y="108" width="22" height="42" rx="3" fill="#60a5fa" />
            <rect x="460" y="105" width="18" height="45" rx="3" fill="#34d399" />
            <rect x="485" y="114" width="24" height="36" rx="3" fill="#f87171" />
            <rect x="515" y="108" width="20" height="42" rx="3" fill="#38bdf8" />

            {/* Shelf 3 Boxes */}
            <rect x="45" y="168" width="30" height="42" rx="2" fill="#ffffff" />
            <rect x="80" y="168" width="32" height="42" rx="2" fill="#ffffff" />
            <rect x="440" y="168" width="35" height="42" rx="2" fill="#ffffff" />
            <rect x="480" y="168" width="30" height="42" rx="2" fill="#ffffff" />
          </g>

          {/* Right edge: Pharmacy Counter Monitor & Plant */}
          <g transform="translate(545, 140)">
            {/* Potted Indoor plant leaves */}
            <path d="M10,90 Q-20,30 18,-15 Q35,40 15,90" fill="#10b981" />
            <path d="M25,90 Q48,15 70,-25 Q60,40 28,90" fill="#059669" />
            <path d="M20,90 Q30,15 45,5 Q40,45 22,90" fill="#34d399" />
          </g>
          {/* Pharmacy terminal monitor */}
          <rect x="535" y="275" width="95" height="155" rx="8" fill="#1e293b" opacity="0.9" filter="url(#slightShadow)" />
          <rect x="543" y="283" width="78" height="66" rx="4" fill="#0f172a" />
          <rect x="550" y="290" width="64" height="52" rx="2" fill="#38bdf8" opacity="0.25" />

          {/* Floating Callout Top-Right: Your Health Our Priority */}
          <g transform="translate(485, 78)">
            <text
              x="0"
              y="0"
              fontFamily="'Caveat', 'Kalam', cursive, sans-serif"
              fontSize="38"
              fontWeight="bold"
              fill="#092244"
              transform="rotate(-5)"
            >
              Your Health
            </text>
            <text
              x="14"
              y="38"
              fontFamily="'Caveat', 'Kalam', cursive, sans-serif"
              fontSize="38"
              fontWeight="bold"
              fill="#092244"
              transform="rotate(-5)"
            >
              Our Priority
            </text>
            {/* Decorative underline flourish */}
            <path
              d="M10,48 Q85,62 160,34"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
              transform="rotate(-5)"
            />
          </g>

          {/* Pharmacist Figure (Nayan Mondol portrait) */}
          <g transform="translate(230, 25)" filter="url(#slightShadow)">
            {/* Dark Hair with natural hairline & volume */}
            <path
              d="M140,24 C82,24 58,58 54,115 C54,138 60,158 66,172 C50,166 46,145 46,120 C46,62 84,18 140,18 C196,18 234,62 234,120 C234,145 230,166 214,172 C220,158 226,138 226,115 C222,58 198,24 140,24 Z"
              fill="url(#hairRealistic)"
            />

            {/* Neck */}
            <path d="M108,185 L172,185 L176,232 L104,232 Z" fill="#b97c58" />

            {/* Head / Face Oval */}
            <path
              d="M78,110 C78,60 102,40 140,40 C178,40 202,60 202,110 C202,168 180,208 140,208 C100,208 78,168 78,110 Z"
              fill="url(#skinRealistic)"
            />

            {/* Ears */}
            <ellipse cx="76" cy="118" rx="8" ry="16" fill="#c58661" />
            <ellipse cx="204" cy="118" rx="8" ry="16" fill="#c58661" />

            {/* Hair styling texture */}
            <path
              d="M70,88 C80,45 110,30 140,30 C170,30 200,45 210,88 C192,62 160,50 140,50 C115,50 88,62 70,88 Z"
              fill="#181a1d"
            />

            {/* Eyebrows */}
            <path d="M94,96 Q112,89 126,95" stroke="#16181b" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M154,95 Q168,89 186,96" stroke="#16181b" strokeWidth="4.5" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            <ellipse cx="112" cy="108" rx="5.5" ry="4.5" fill="#16181b" />
            <ellipse cx="168" cy="108" rx="5.5" ry="4.5" fill="#16181b" />
            <circle cx="114" cy="106" r="1.8" fill="#ffffff" />
            <circle cx="170" cy="106" r="1.8" fill="#ffffff" />

            {/* Nose */}
            <path d="M140,105 L138,136 Q144,140 148,136" stroke="#a76848" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Well-groomed short beard & mustache */}
            <path
              d="M98,148 C112,152 128,154 140,154 C152,154 168,152 182,148 C186,168 170,200 140,202 C110,200 94,168 98,148 Z"
              fill="#181a1d"
              opacity="0.92"
            />

            {/* Warm Friendly Smile with Teeth */}
            <path
              d="M116,156 Q140,175 164,156"
              stroke="#ffffff"
              strokeWidth="5.5"
              strokeLinecap="round"
              fill="#ffffff"
            />
            <path
              d="M114,155 Q140,173 166,155"
              stroke="#8a3b3b"
              strokeWidth="2"
              fill="none"
            />

            {/* Blue Shirt Collar under Coat */}
            <path d="M112,212 L140,234 L168,212 L154,198 L126,198 Z" fill="#0284c7" />

            {/* White Lab Coat Body */}
            <path
              d="M40,235 C12,275 -18,365 -28,515 L308,515 C298,365 268,275 240,235 L188,228 L140,255 L92,228 Z"
              fill="url(#coatGradReal)"
            />

            {/* Coat Lapels */}
            <path d="M92,228 L126,340 L78,310 Z" fill="url(#lapelShade)" stroke="#cbd5e1" strokeWidth="1.2" />
            <path d="M188,228 L154,340 L202,310 Z" fill="url(#lapelShade)" stroke="#cbd5e1" strokeWidth="1.2" />

            {/* Chest Pocket with Pharmacist Logo (Viewer's Right) */}
            <g transform="translate(196, 298)">
              <rect x="0" y="0" width="50" height="44" rx="3" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              {/* Green cross emblem */}
              <rect x="20" y="8" width="10" height="18" rx="2" fill="#10b981" />
              <rect x="16" y="12" width="18" height="10" rx="2" fill="#10b981" />
              {/* Wordmark */}
              <text x="25" y="38" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#092244" fontFamily="sans-serif">
                Pharmacy
              </text>
            </g>

            {/* Folded Arms in White Coat */}
            <g transform="translate(12, 342)">
              {/* Foreground folded arm */}
              <path
                d="M16,42 Q130,58 218,15 Q228,45 188,82 Q105,92 5,72 Z"
                fill="#ffffff"
                stroke="#e2e8f0"
                strokeWidth="1.5"
              />
              {/* Underlying arm */}
              <path
                d="M58,56 Q135,80 228,56 Q248,90 208,102 Q115,102 45,82 Z"
                fill="#f8fafc"
                stroke="#cbd5e1"
                strokeWidth="1"
              />
              {/* Hands tucked */}
              <ellipse cx="70" cy="56" rx="14" ry="10" fill="#c58661" />
              <ellipse cx="210" cy="52" rx="14" ry="10" fill="#c58661" />
            </g>
          </g>
        </svg>
      )}



      {/* Fullscreen Hero Photo Modal */}
      {isFullscreen && customImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[95vh] w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white px-1">
              <span className="text-xs sm:text-sm font-bold">
                নয়ন মন্ডল — মেসার্স সিকদার ফার্মেসী (সম্পূর্ণ ছবি ভিউ)
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img
              src={customImage}
              alt="নয়ন মন্ডল - সম্পূর্ণ ছবি"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/15 bg-slate-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * About Section Pharmacist Desk Visual:
 * Leaning at desk, stacked books (Pharmacology, Clinical Pharmacy, Patient Care),
 * desk plant, and the "Pharmacist for a healthier community" top-right badge.
 */
export const AboutPharmacistVisual: React.FC<VisualProps> = ({
  customImage,
  className = '',
  onReplaceClick,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <div
      className={`relative w-full max-w-[500px] select-none ${
        customImage ? 'h-auto rounded-2xl' : 'aspect-[4/3]'
      } ${className}`}
    >
      {customImage ? (
        <>
          <img
            src={customImage}
            alt="নয়ন মন্ডল - পরিচিতি (মেসার্স সিকদার ফার্মেসী)"
            className="w-full h-auto max-h-[720px] object-contain rounded-2xl shadow-xl border border-slate-200/90 bg-white cursor-pointer transition-all hover:shadow-2xl"
            onClick={() => setIsFullscreen(true)}
            title="সম্পূর্ণ ছবি বড় করে দেখতে ক্লিক করুন"
          />
          {/* Full view button */}
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            aria-label="View full poster"
            className="absolute top-2.5 right-2.5 bg-white/95 hover:bg-white text-slate-800 text-[11px] font-semibold px-2.5 py-1.5 rounded-md shadow-md border border-slate-200 transition-all flex items-center gap-1.5 backdrop-blur-xs z-10"
          >
            <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>ফুল ভিউ</span>
          </button>
        </>
      ) : (
        <svg
          viewBox="0 0 540 400"
          className="w-full h-full rounded-2xl shadow-md border border-slate-100 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="aboutRoomBgReal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#eaf2f8" />
              <stop offset="100%" stopColor="#d8e6f2" />
            </linearGradient>
            <linearGradient id="book1Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0c233c" />
              <stop offset="100%" stopColor="#08182b" />
            </linearGradient>
            <linearGradient id="book2Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="book3Spine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* Background Wall */}
          <rect width="540" height="400" fill="url(#aboutRoomBgReal)" />

          {/* Background blurred pharmacy shelves */}
          <g opacity="0.45">
            <line x1="20" y1="40" x2="520" y2="40" stroke="#94a3b8" strokeWidth="4" />
            <line x1="20" y1="95" x2="520" y2="95" stroke="#94a3b8" strokeWidth="4" />
            <line x1="20" y1="150" x2="520" y2="150" stroke="#94a3b8" strokeWidth="4" />

            {/* Medicine bottles */}
            <rect x="40" y="55" width="16" height="35" rx="3" fill="#38bdf8" />
            <rect x="65" y="60" width="20" height="30" rx="3" fill="#34d399" />
            <rect x="95" y="50" width="18" height="40" rx="3" fill="#f87171" />
            <rect x="420" y="55" width="20" height="35" rx="3" fill="#38bdf8" />
            <rect x="450" y="52" width="18" height="38" rx="3" fill="#10b981" />
          </g>

          {/* Green potted desk plant on left */}
          <g transform="translate(30, 240)">
            <ellipse cx="25" cy="50" rx="20" ry="12" fill="#cbd5e1" />
            <path d="M10,50 Q-10,10 15,-15 Q25,20 15,50" fill="#10b981" />
            <path d="M25,50 Q30,-5 50,-25 Q45,20 28,50" fill="#059669" />
            <path d="M20,50 Q25,15 40,5 Q35,35 22,50" fill="#34d399" />
          </g>

          {/* Desk Surface */}
          <rect x="0" y="290" width="540" height="110" fill="#ffffff" />
          <line x1="0" y1="290" x2="540" y2="290" stroke="#cbd5e1" strokeWidth="2" />

          {/* Stacked Textbooks in exact reference order:
              Bottom: Patient Care
              Middle: Clinical Pharmacy
              Top: Pharmacology
          */}
          <g transform="translate(55, 255)">
            {/* Book 3 (Bottom): Patient Care */}
            <rect x="0" y="44" width="125" height="18" rx="2" fill="url(#book1Spine)" />
            <rect x="120" y="46" width="5" height="14" fill="#ffffff" />
            <text x="55" y="56" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              Patient Care
            </text>

            {/* Book 2 (Middle): Clinical Pharmacy */}
            <rect x="5" y="25" width="120" height="18" rx="2" fill="url(#book2Spine)" />
            <rect x="120" y="27" width="5" height="14" fill="#ffffff" />
            <text x="55" y="37" fill="#ffffff" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">
              Clinical Pharmacy
            </text>

            {/* Book 1 (Top): Pharmacology */}
            <rect x="10" y="6" width="115" height="18" rx="2" fill="url(#book3Spine)" />
            <rect x="120" y="8" width="5" height="14" fill="#ffffff" />
            <text x="55" y="19" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">
              Pharmacology
            </text>
          </g>

          {/* Pharmacist Seated Leaning at Desk */}
          <g transform="translate(180, 75)">
            {/* Hair */}
            <path d="M90,45 C70,45 50,60 50,90 C50,110 65,130 90,135 C115,130 130,110 130,90 C130,60 110,45 90,45 Z" fill="#1e2126" />
            {/* Face */}
            <ellipse cx="90" cy="95" rx="35" ry="38" fill="#dfa484" />
            {/* Ears */}
            <ellipse cx="53" cy="98" rx="7" ry="12" fill="#c58661" />
            <ellipse cx="127" cy="98" rx="7" ry="12" fill="#c58661" />
            {/* Eyes */}
            <circle cx="78" cy="92" r="3.5" fill="#1e2126" />
            <circle cx="102" cy="92" r="3.5" fill="#1e2126" />
            {/* Beard */}
            <path d="M72,112 C80,128 100,128 108,112 C108,135 72,135 72,112 Z" fill="#1e2126" opacity="0.85" />
            {/* Smile */}
            <path d="M82,114 Q90,124 98,114" stroke="#ffffff" strokeWidth="3" fill="#ffffff" strokeLinecap="round" />
            {/* Neck & Shirt */}
            <rect x="80" y="130" width="20" height="20" fill="#0284c7" />
            {/* White Coat */}
            <path d="M30,150 L80,140 L90,210 L10,210 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <path d="M150,150 L100,140 L90,210 L170,210 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <path d="M40,150 Q90,165 140,150 L160,250 L20,250 Z" fill="#f8fafc" />
            {/* Folded Arms on Desk */}
            <rect x="25" y="210" width="130" height="35" rx="10" fill="#ffffff" stroke="#e2e8f0" />
            {/* Hands */}
            <ellipse cx="85" cy="225" rx="20" ry="10" fill="#c58661" />
          </g>

          {/* Floating Callout Top-Right: Pharmacist for a healthier community */}
          <g transform="translate(330, 65)">
            <rect x="0" y="0" width="185" height="80" rx="12" fill="#ffffff" opacity="0.95" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.06))" />
            <text
              x="22"
              y="30"
              fontFamily="'Caveat', 'Kalam', cursive, sans-serif"
              fontSize="26"
              fontWeight="bold"
              fill="#092244"
            >
              Pharmacy Care
            </text>
            <text
              x="22"
              y="52"
              fontFamily="'Caveat', 'Kalam', cursive, sans-serif"
              fontSize="21"
              fontWeight="bold"
              fill="#092244"
            >
              for a healthier
            </text>
            <text
              x="22"
              y="72"
              fontFamily="'Caveat', 'Kalam', cursive, sans-serif"
              fontSize="21"
              fontWeight="bold"
              fill="#092244"
            >
              community
            </text>
          </g>
        </svg>
      )}



      {/* Fullscreen Poster Modal */}
      {isFullscreen && customImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[95vh] w-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 text-white px-1">
              <span className="text-xs sm:text-sm font-bold">
                নয়ন মন্ডল — মেসার্স সিকদার ফার্মেসী (সম্পূর্ণ পোস্টার ভিউ)
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <img
              src={customImage}
              alt="নয়ন মন্ডল - সম্পূর্ণ পরিচিতি পোস্টার"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/15 bg-slate-900"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const PatientCounsellingVisual: React.FC<{ customImage?: string | null }> = ({ customImage }) => {
  const [imageError, setImageError] = React.useState(false);
  const photoUrl = customImage || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80';

  if (!imageError) {
    return (
      <div className="relative w-full h-full bg-slate-900 group">
        <img
          src={photoUrl}
          alt="Patient Counselling & Clinical Advice"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle clinical gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-600/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
            Clinical Consultation
          </span>
          <span className="text-[10px] text-slate-200 font-medium">
            1-on-1 Advisory
          </span>
        </div>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="counselBgReal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="40%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#0c4a6e" />
        </linearGradient>
        <linearGradient id="glowCircle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#counselBgReal)" />
      <circle cx="160" cy="90" r="85" fill="url(#glowCircle)" />

      {/* Modern Medical Grid & Shelves */}
      <g opacity="0.25" stroke="#bae6fd" strokeWidth="1">
        <line x1="20" y1="40" x2="300" y2="40" />
        <line x1="20" y1="80" x2="300" y2="80" />
        <line x1="20" y1="120" x2="300" y2="120" />
      </g>

      {/* Center Medical Cross Emblem */}
      <g transform="translate(140, 35)">
        <rect x="12" y="0" width="16" height="40" rx="4" fill="#38bdf8" />
        <rect x="0" y="12" width="40" height="16" rx="4" fill="#38bdf8" />
        <circle cx="20" cy="20" r="5" fill="#ffffff" />
      </g>

      {/* Consultation Icons & Pills */}
      <g transform="translate(45, 90)">
        {/* Pharmacist White Coat Badge */}
        <rect x="0" y="0" width="105" height="42" rx="8" fill="#ffffff" opacity="0.95" />
        <text x="14" y="24" fontSize="11" fontWeight="bold" fill="#0369a1" fontFamily="sans-serif">
          👨‍⚕️ Pharmacist
        </text>
        <text x="14" y="35" fontSize="8" fill="#64748b" fontFamily="sans-serif">
          Personal Counselling
        </text>
      </g>

      <g transform="translate(170, 90)">
        {/* Patient Care Badge */}
        <rect x="0" y="0" width="105" height="42" rx="8" fill="#ffffff" opacity="0.95" />
        <text x="14" y="24" fontSize="11" fontWeight="bold" fill="#059669" fontFamily="sans-serif">
          💊 Safe Dosage
        </text>
        <text x="14" y="35" fontSize="8" fill="#64748b" fontFamily="sans-serif">
          Adherence Guide
        </text>
      </g>

      {/* Bottom info banner */}
      <rect x="0" y="155" width="320" height="45" fill="#082f49" opacity="0.95" />
      <text x="160" y="182" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="sans-serif">
        Personalized Patient Adherence & Safety
      </text>
    </svg>
  );
};

export const MedicineGuideVisual: React.FC<{ customImage?: string | null }> = ({ customImage }) => {
  const [imageError, setImageError] = React.useState(false);
  const photoUrl = customImage || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80';

  if (!imageError) {
    return (
      <div className="relative w-full h-full bg-slate-900 group">
        <img
          src={photoUrl}
          alt="Medicine Information Guide"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-teal-600/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
            Pharmacotherapy
          </span>
          <span className="text-[10px] text-slate-200 font-medium">
            Drug Reference
          </span>
        </div>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="guideBgReal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f9fc" />
          <stop offset="100%" stopColor="#e2edf5" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#guideBgReal)" />

      {/* Medicine Guide Brochure */}
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="145" height="135" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.06))" />
        <rect x="10" y="15" width="125" height="32" rx="4" fill="#0284c7" />
        <text x="72" y="35" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
          Medicine Guide
        </text>
        <line x1="20" y1="62" x2="115" y2="62" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <line x1="20" y1="78" x2="125" y2="78" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="94" x2="100" y2="94" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="110" x2="120" y2="110" stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Blister Card & Pills */}
      <g transform="translate(190, 40)">
        <rect x="0" y="0" width="95" height="70" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
        <ellipse cx="25" cy="20" rx="12" ry="8" fill="#38bdf8" />
        <ellipse cx="65" cy="20" rx="12" ry="8" fill="#38bdf8" />
        <ellipse cx="25" cy="50" rx="12" ry="8" fill="#10b981" />
        <ellipse cx="65" cy="50" rx="12" ry="8" fill="#10b981" />
      </g>

      {/* Amber Medicine Bottle */}
      <g transform="translate(205, 105)">
        <rect x="25" y="0" width="25" height="10" rx="2" fill="#ffffff" stroke="#cbd5e1" />
        <rect x="15" y="10" width="45" height="60" rx="6" fill="#d97706" opacity="0.9" />
        <rect x="20" y="25" width="35" height="30" fill="#ffffff" rx="2" />
        <line x1="24" y1="35" x2="50" y2="35" stroke="#94a3b8" strokeWidth="2" />
        <line x1="24" y1="42" x2="45" y2="42" stroke="#cbd5e1" strokeWidth="1.5" />
      </g>
    </svg>
  );
};

export const PrescriptionReviewVisual: React.FC<{ customImage?: string | null }> = ({ customImage }) => {
  const [imageError, setImageError] = React.useState(false);
  const photoUrl = customImage || 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80';

  if (!imageError) {
    return (
      <div className="relative w-full h-full bg-slate-900 group">
        <img
          src={photoUrl}
          alt="Prescription Review & Quality Check"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
            Rx Quality Audit
          </span>
          <span className="text-[10px] text-slate-200 font-medium">
            Safe Dispensing
          </span>
        </div>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 320 200" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rxBgReal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#bae6fd" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#rxBgReal)" />

      {/* Prescription Pad / Clipboard */}
      <g transform="translate(45, 18)">
        <rect x="0" y="0" width="180" height="165" rx="8" fill="#cbd5e1" />
        <rect x="65" y="-6" width="50" height="16" rx="4" fill="#64748b" />
        <rect x="10" y="12" width="160" height="142" rx="4" fill="#ffffff" />

        {/* Rx Symbol */}
        <text x="25" y="48" fontSize="32" fontWeight="bold" fill="#092244" fontFamily="'Times New Roman', serif">
          ℞
        </text>

        <line x1="65" y1="35" x2="155" y2="35" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="65" y1="45" x2="140" y2="45" stroke="#cbd5e1" strokeWidth="2" />

        {/* Verified checkmarks */}
        <g transform="translate(25, 70)">
          <line x1="0" y1="0" x2="135" y2="0" stroke="#e2e8f0" strokeWidth="2" />
          <circle cx="10" cy="15" r="7" fill="#10b981" />
          <path d="M7,15 L9,17 L13,13" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <line x1="25" y1="15" x2="130" y2="15" stroke="#64748b" strokeWidth="2" />

          <circle cx="10" cy="35" r="7" fill="#10b981" />
          <path d="M7,35 L9,37 L13,33" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <line x1="25" y1="35" x2="120" y2="35" stroke="#64748b" strokeWidth="2" />

          <circle cx="10" cy="55" r="7" fill="#10b981" />
          <path d="M7,55 L9,57 L13,53" stroke="#ffffff" strokeWidth="1.5" fill="none" />
          <line x1="25" y1="55" x2="110" y2="55" stroke="#64748b" strokeWidth="2" />
        </g>
      </g>

      {/* Fountain Pen */}
      <g transform="translate(210, 55) rotate(35)">
        <rect x="0" y="0" width="12" height="100" rx="3" fill="#0f172a" />
        <rect x="0" y="30" width="12" height="6" fill="#e2e8f0" />
        <polygon points="0,100 12,100 6,118" fill="#e2e8f0" />
        <polygon points="4,114 8,114 6,122" fill="#0284c7" />
      </g>
    </svg>
  );
};

export const HealthAwarenessVisual: React.FC<{ customImage?: string | null }> = ({ customImage }) => {
  const [imageError, setImageError] = React.useState(false);
  const photoUrl = customImage || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80';

  if (!imageError) {
    return (
      <div className="relative w-full h-full bg-slate-900 group">
        <img
          src={photoUrl}
          alt="Health Awareness & Community Screening"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm">
            Public Outreach
          </span>
          <span className="text-[10px] text-slate-200 font-medium">
            Community Camps
          </span>
        </div>
      </div>
    );
  }
  return (
    <svg viewBox="0 0 320 200" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="awareBgReal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0fdf4" />
          <stop offset="100%" stopColor="#dcfce7" />
        </linearGradient>
      </defs>
      <rect width="320" height="200" fill="url(#awareBgReal)" />

      {/* Pharmacy Display Shelves */}
      <g transform="translate(20, 15)">
        <rect x="0" y="52" width="280" height="8" rx="2" fill="#94a3b8" opacity="0.6" />
        <rect x="0" y="112" width="280" height="8" rx="2" fill="#94a3b8" opacity="0.6" />
        <rect x="0" y="162" width="280" height="8" rx="2" fill="#94a3b8" opacity="0.6" />

        {/* Health Awareness Ribbon */}
        <g transform="translate(45, 10)">
          <rect x="0" y="0" width="190" height="28" rx="6" fill="#10b981" />
          <text x="95" y="18" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Health Awareness
          </text>
        </g>

        {/* Vitamin & Supplement Bottles */}
        <rect x="25" y="70" width="18" height="42" rx="3" fill="#0284c7" />
        <rect x="55" y="64" width="22" height="48" rx="3" fill="#10b981" />
        <rect x="90" y="68" width="20" height="44" rx="3" fill="#f59e0b" />
        <rect x="125" y="72" width="18" height="40" rx="3" fill="#8b5cf6" />
        <rect x="160" y="67" width="22" height="45" rx="3" fill="#ec4899" />
        <rect x="195" y="64" width="20" height="48" rx="3" fill="#06b6d4" />
        <rect x="230" y="70" width="24" height="42" rx="3" fill="#10b981" />

        {/* Shelf 2 Medicine Boxes */}
        <rect x="30" y="126" width="30" height="36" rx="2" fill="#ffffff" stroke="#cbd5e1" />
        <rect x="70" y="126" width="35" height="36" rx="2" fill="#ffffff" stroke="#cbd5e1" />
        <rect x="115" y="131" width="30" height="31" rx="2" fill="#ffffff" stroke="#cbd5e1" />
        <rect x="155" y="126" width="40" height="36" rx="2" fill="#ffffff" stroke="#cbd5e1" />
        <rect x="205" y="126" width="30" height="36" rx="2" fill="#ffffff" stroke="#cbd5e1" />
      </g>
    </svg>
  );
};
