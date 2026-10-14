import React from 'react';

interface TealPharmacyExecutiveBadgeSVGProps {
  className?: string;
  size?: number | string;
}

export const TealPharmacyExecutiveBadgeSVG: React.FC<TealPharmacyExecutiveBadgeSVGProps> = ({
  className = 'w-full h-full',
}) => {
  return (
    <svg
      className={`${className} drop-shadow-md select-none block`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="নয়ন মন্ডল - Pharmacy Sales Executive Official Badge"
    >
      <defs>
        {/* Rich Golden Gradient */}
        <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        {/* Outer Teal Gradient */}
        <linearGradient id="tealOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="40%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>

        {/* Sky / Medical Background Gradient */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="50%" stopColor="#e0f2fe" />
          <stop offset="100%" stopColor="#99f6e4" />
        </linearGradient>

        {/* Turquoise Shirt Gradient */}
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="50%" stopColor="#0f766e" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>

        {/* Hair Gradient */}
        <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#292524" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>

        {/* Skin Tone Gradient */}
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e2a27d" />
          <stop offset="100%" stopColor="#c58661" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#021f20" floodOpacity="0.5" />
        </filter>

        {/* Circle Clip for Avatar */}
        <clipPath id="badgeInnerClip">
          <circle cx="50" cy="50" r="39.5" />
        </clipPath>
      </defs>

      {/* Outer Golden Border Rim */}
      <circle cx="50" cy="50" r="49" fill="url(#goldRimGrad)" />

      {/* Main Teal Ring */}
      <circle cx="50" cy="50" r="45" fill="url(#tealOuterGrad)" stroke="#fef08a" strokeWidth="0.8" />

      {/* Elegant Dotted Golden Ring */}
      <circle
        cx="50"
        cy="50"
        r="41.5"
        fill="none"
        stroke="#fde047"
        strokeWidth="0.8"
        strokeDasharray="1.5 1.8"
        opacity="0.9"
      />

      {/* Inner Masked Content: Sky Background, Nayan Mondol Portrait & Labels */}
      <g clipPath="url(#badgeInnerClip)">
        {/* Soft Sky / Medical Atmosphere */}
        <rect x="0" y="0" width="100" height="100" fill="url(#skyGrad)" />

        {/* Subtle clouds / medical cross decor */}
        <circle cx="25" cy="25" r="14" fill="#ffffff" opacity="0.45" />
        <circle cx="75" cy="22" r="16" fill="#ffffff" opacity="0.45" />
        <circle cx="50" cy="18" r="10" fill="#ffffff" opacity="0.35" />

        {/* Subtle Water ripple / bokeh */}
        <ellipse cx="50" cy="78" rx="45" ry="12" fill="#0d9488" opacity="0.25" />

        {/* Nayan Mondol Portrait */}
        <g id="pharmacistFigure">
          {/* Shoulders / Torso with Turquoise Polo Shirt */}
          <path
            d="M20 95 C20 72, 32 64, 42 63 L58 63 C68 64, 80 72, 80 95 Z"
            fill="url(#shirtGrad)"
          />

          {/* Polo Collar */}
          <path d="M42 63 L47 72 L50 67 L45 62 Z" fill="#042f2e" />
          <path d="M58 63 L53 72 L50 67 L55 62 Z" fill="#042f2e" />
          <polygon points="48,64 52,64 50,68" fill="#c58661" />

          {/* Blue Lanyard / Ribbon */}
          <path
            d="M43 64 L48 76 L52 76 L57 64"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Neck */}
          <rect x="44.5" y="53" width="11" height="12" rx="3" fill="url(#skinGrad)" />
          {/* Neck Shadow */}
          <ellipse cx="50" cy="56" rx="5.5" ry="2.5" fill="#a76846" opacity="0.4" />

          {/* Ears */}
          <ellipse cx="36" cy="42" rx="2.5" ry="4" fill="url(#skinGrad)" />
          <ellipse cx="64" cy="42" rx="2.5" ry="4" fill="url(#skinGrad)" />

          {/* Head / Face */}
          <path
            d="M37 38 C37 28, 41 24, 50 24 C59 24, 63 28, 63 38 C63 48, 57 55, 50 55 C43 55, 37 48, 37 38 Z"
            fill="url(#skinGrad)"
          />

          {/* Short Trimmed Hair */}
          <path
            d="M36 36 C35 27, 40 20, 50 20 C60 20, 65 27, 64 36 C63 32, 60 25, 50 25 C40 25, 37 32, 36 36 Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M36 33 C39 25, 46 22, 50 22 C55 22, 62 25, 64 33 C62 28, 56 24, 50 24 C44 24, 38 28, 36 33 Z"
            fill="#1c1917"
          />

          {/* Eyebrows */}
          <path d="M41 33 Q44 31.5 47 33" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" fill="none" />
          <path d="M53 33 Q56 31.5 59 33" stroke="#1c1917" strokeWidth="1" strokeLinecap="round" fill="none" />

          {/* Eyes with friendly glint */}
          <ellipse cx="44" cy="36.5" rx="1.8" ry="1.2" fill="#18181b" />
          <circle cx="44.5" cy="36" r="0.5" fill="#ffffff" />
          <ellipse cx="56" cy="36.5" rx="1.8" ry="1.2" fill="#18181b" />
          <circle cx="56.5" cy="36" r="0.5" fill="#ffffff" />

          {/* Nose */}
          <path d="M50 35 L49 41 L51.5 41.5" stroke="#a76846" strokeWidth="0.8" strokeLinecap="round" fill="none" />

          {/* Gentle Smile */}
          <path d="M46 45 Q50 48 54 45" stroke="#7c2d12" strokeWidth="1" strokeLinecap="round" fill="none" />
        </g>

        {/* Teal Ribbon Banner: NAYAN MONDOL */}
        <g id="nameRibbon" filter="url(#badgeShadow)">
          <path
            d="M16 67 L84 67 L81 76 L19 76 Z"
            fill="#0f766e"
            stroke="#fef08a"
            strokeWidth="0.6"
          />
          <text
            x="50"
            y="73.8"
            fill="#ffffff"
            fontSize="5.2"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            textAnchor="middle"
            letterSpacing="0.8"
          >
            NAYAN MONDOL
          </text>
        </g>

        {/* White Pill Badge: PHARMACY SALES EXECUTIVE */}
        <g id="titleBadge">
          <rect
            x="12"
            y="77.5"
            width="76"
            height="8.5"
            rx="4.25"
            fill="#ffffff"
            stroke="#0d9488"
            strokeWidth="0.7"
          />
          {/* Tiny Medical Cross Icon */}
          <g transform="translate(15.5, 79.5)">
            <circle cx="3" cy="2.5" r="2.2" fill="#0d9488" />
            <rect x="2.5" y="1" width="1" height="3" fill="#ffffff" />
            <rect x="1.5" y="2" width="3" height="1" fill="#ffffff" />
          </g>
          <text
            x="53"
            y="83.8"
            fill="#042f2e"
            fontSize="3.8"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            textAnchor="middle"
            letterSpacing="0.3"
          >
            PHARMACY SALES EXECUTIVE
          </text>
        </g>
      </g>
    </svg>
  );
};
