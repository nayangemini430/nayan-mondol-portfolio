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
      className={`${className} drop-shadow-sm select-none block`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Teal Pharmacy Sales Executive Badge"
    >
      <defs>
        {/* Rich Golden Gradient */}
        <linearGradient id="goldRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        {/* Outer Teal Gradient */}
        <linearGradient id="tealOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="45%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>

        {/* Deep Teal Inner Disc */}
        <linearGradient id="tealInnerGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#0f766e" />
          <stop offset="50%" stopColor="#115e59" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#021f20" floodOpacity="0.7" />
        </filter>
      </defs>

      {/* Outer Golden Border Rim */}
      <circle cx="50" cy="50" r="48" fill="url(#goldRimGrad)" />

      {/* Main Teal Ring */}
      <circle cx="50" cy="50" r="44" fill="url(#tealOuterGrad)" stroke="#fef08a" strokeWidth="0.8" />

      {/* Elegant Dotted Golden Ring */}
      <circle
        cx="50"
        cy="50"
        r="40.5"
        fill="none"
        stroke="#fde047"
        strokeWidth="0.9"
        strokeDasharray="1.8 2"
        opacity="0.85"
      />

      {/* Inner Deep Teal Disc */}
      <circle
        cx="50"
        cy="50"
        r="37"
        fill="url(#tealInnerGrad)"
        stroke="url(#goldRimGrad)"
        strokeWidth="1"
      />

      {/* Laurel Wreath Left */}
      <g stroke="#fef08a" strokeWidth="1" fill="none" opacity="0.95">
        <path d="M22 56 C20 48, 22 36, 29 27" />
        <path d="M21 46 C18 43, 17 41, 19 39" />
        <path d="M22 51 C19 49, 18 47, 20 45" />
        <path d="M24 40 C21 37, 22 35, 24 33" />
        <path d="M27 32 C25 29, 27 27, 29 26" />
      </g>

      {/* Laurel Wreath Right */}
      <g stroke="#fef08a" strokeWidth="1" fill="none" opacity="0.95">
        <path d="M78 56 C80 48, 78 36, 71 27" />
        <path d="M79 46 C82 43, 83 41, 81 39" />
        <path d="M78 51 C81 49, 82 47, 80 45" />
        <path d="M76 40 C79 37, 78 35, 76 33" />
        <path d="M73 32 C75 29, 73 27, 71 26" />
      </g>

      {/* Mortar Bowl (White with Clean Contour) */}
      <path
        d="M33 38 L67 38 C66 50, 58 56.5, 50 56.5 C42 56.5, 34 50, 33 38 Z"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="0.5"
      />

      {/* Mortar Stand Base */}
      <path
        d="M42 56.5 L58 56.5 L60 60 L40 60 Z"
        fill="#ffffff"
        opacity="0.95"
      />

      {/* Pestle (Gold Rod & Knob) */}
      <path
        d="M58 22 L64 25.5 L48 43 L42 39.5 Z"
        fill="url(#goldRimGrad)"
      />
      <circle cx="61.5" cy="24" r="3" fill="#fef08a" stroke="#d97706" strokeWidth="0.5" />

      {/* Medical Cross in Mortar Center */}
      <path d="M48 41 h4 v10 h-4 z" fill="#0d9488" />
      <path d="M45 44 h10 v4 h-10 z" fill="#0d9488" />

      {/* Curved Upper Text: PHARMACY */}
      <path id="pharmacyCurve" d="M26 31 A 32 32 0 0 1 74 31" fill="none" />
      <text fill="#fef08a" fontSize="5" fontWeight="800" fontFamily="sans-serif" letterSpacing="1.2">
        <textPath href="#pharmacyCurve" startOffset="50%" textAnchor="middle">
          PHARMACY
        </textPath>
      </text>

      {/* Gold Ribbon Banner for EXECUTIVE */}
      <path
        d="M17 64 L22 58.5 L78 58.5 L83 64 L80 73 L50 71.5 L20 73 Z"
        fill="url(#goldRimGrad)"
        filter="url(#badgeShadow)"
      />
      <path
        d="M22 60.5 L78 60.5 L76 70 L50 68.5 L24 70 Z"
        fill="#5c1d06"
      />
      <text
        x="50"
        y="67.5"
        fill="#fef08a"
        fontSize="6"
        fontWeight="900"
        fontFamily="sans-serif"
        textAnchor="middle"
        letterSpacing="1"
      >
        EXECUTIVE
      </text>

      {/* 3 Gold Stars under Banner */}
      <polygon
        points="50,75.5 51.5,79 55,79 52,81 53,84.5 50,82.3 47,84.5 48,81 45,79 48.5,79"
        fill="url(#goldRimGrad)"
      />
      <polygon
        points="41,74.5 42.2,77.3 45,77.3 42.6,78.9 43.4,81.7 41,79.9 38.6,81.7 39.4,78.9 37,77.3 39.8,77.3"
        fill="url(#goldRimGrad)"
      />
      <polygon
        points="59,74.5 60.2,77.3 63,77.3 60.6,78.9 61.4,81.7 59,79.9 56.6,81.7 57.4,78.9 55,77.3 57.8,77.3"
        fill="url(#goldRimGrad)"
      />
    </svg>
  );
};
