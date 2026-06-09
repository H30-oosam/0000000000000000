import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'horizontal' | 'vertical';
}

export default function Logo({ className = 'w-12 h-12', showText = true, variant = 'horizontal' }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${variant === 'vertical' ? 'flex-col text-center' : 'flex-row'}`} id="al_mona_academy_logo">
      {/* Brain & Lightning Bolt SVG */}
      <div className={`relative flex items-center justify-center shrink-0 ${className} rounded-2xl bg-gradient-to-b from-[#16273c] to-[#0c1622] border border-gold-500/15 shadow-lg shadow-gold-500/5 p-1`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_8px_rgba(224,179,84,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients */}
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbf0d9" />
              <stop offset="50%" stopColor="#e0b354" />
              <stop offset="100%" stopColor="#a77d33" />
            </linearGradient>
            <linearGradient id="glowSilver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#cbd8eb" />
              <stop offset="100%" stopColor="#7199ca" />
            </linearGradient>
          </defs>

          {/* Left Hemisphere - Organic Brain & Neural Nodes (Gold) */}
          <path
            d="M 45,15 
               C 32,15 22,23 22,35 
               C 22,39 24,42 26,45 
               C 23,48 21,52 21,56 
               C 21,62 25,67 29,69 
               C 28,71 28,74 28,76 
               C 28,82 35,85 41,85 
               C 43,85 45,84 45,84"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Neural Nodes Detail (Gold) */}
          <circle cx="32" cy="24" r="2.5" fill="url(#goldGrad)" />
          <circle cx="26" cy="38" r="2.5" fill="url(#goldGrad)" />
          <circle cx="25" cy="56" r="2.5" fill="url(#goldGrad)" />
          <circle cx="34" cy="72" r="2.5" fill="url(#goldGrad)" />
          <circle cx="42" cy="80" r="2.5" fill="url(#goldGrad)" />
          
          {/* Neural Connection lines (Gold) */}
          <path d="M 32,24 C 36,28 38,36 34,42" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 26,38 C 30,44 42,42 42,48" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 25,56 C 29,60 36,54 41,64" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 34,72 C 34,76 38,78 42,80" stroke="url(#goldGrad)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Hemisphere - Tech Circuit & Motherboard Tracks (Silver/Cyan) */}
          <path
            d="M 55,15 
               C 68,15 78,23 78,35 
               C 78,39 76,42 74,45 
               C 77,48 79,52 79,56 
               C 79,62 75,67 71,69 
               C 72,71 72,74 72,76 
               C 72,82 65,85 59,85 
               C 57,85 55,84 55,84"
            stroke="url(#glowSilver)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Circuit Nodes and straight connector tracks (Silver/White) */}
          <circle cx="68" cy="24" r="2" fill="url(#glowSilver)" />
          <circle cx="74" cy="38" r="2" fill="url(#glowSilver)" />
          <circle cx="75" cy="56" r="2" fill="url(#glowSilver)" />
          <circle cx="66" cy="72" r="2" fill="url(#glowSilver)" />
          <circle cx="58" cy="80" r="2" fill="url(#glowSilver)" />

          {/* Rectilinear tracks */}
          <path d="M 55,26 H 65 V 32" stroke="url(#glowSilver)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 55,42 H 70 V 48" stroke="url(#glowSilver)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 55,59 H 68 L 72,64" stroke="url(#glowSilver)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 55,75 H 62 V 79" stroke="url(#glowSilver)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Glowing central dividing space */}
          {/* Lightning Bolt Separator (Solid white / intense glowing cyan) */}
          <path
            d="M 53,10 
               L 43,48 
               H 54 
               L 47,90 
               L 57,52 
               H 46 
               Z"
            fill="#ffffff"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Typography side */}
      {showText && (
        <div className="flex flex-col text-right">
          <h1 className="font-cairo font-black text-base sm:text-lg lg:text-xl text-gold-200 tracking-tight leading-tight">
            أكاديمية المنى
          </h1>
          <span className="font-sans text-[10px] sm:text-xs text-navy-300 font-medium">
            للتمكين والتدريب الاحترافي
          </span>
        </div>
      )}
    </div>
  );
}
