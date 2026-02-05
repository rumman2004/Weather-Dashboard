import React from 'react';

const Moon = ({ size = 100, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    fill="none" 
    className={className}
  >
    <style>{`
      @keyframes glow-moon {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 0.9; }
      }
      @keyframes twinkle-1 {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.3); }
      }
      @keyframes twinkle-2 {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.9; transform: scale(1.2); }
      }
      @keyframes twinkle-3 {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.4); }
      }
      @keyframes float-up {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
      }
      .moon-glow {
        animation: glow-moon 5s ease-in-out infinite;
      }
      .moon-body {
        animation: float-up 6s ease-in-out infinite;
        filter: drop-shadow(0 0 12px rgba(226, 232, 240, 0.5));
      }
      .star-1 { animation: twinkle-1 2.5s ease-in-out infinite; }
      .star-2 { animation: twinkle-2 3s ease-in-out infinite; }
      .star-3 { animation: twinkle-3 3.5s ease-in-out infinite; }
    `}</style>
    
    {/* Background stars - more numerous and varied */}
    <g>
      {/* Large stars */}
      <circle cx="18" cy="22" r="2.5" fill="#F1F5F9" className="star-1" />
      <circle cx="95" cy="28" r="2" fill="#E2E8F0" className="star-2" style={{animationDelay: '0.5s'}} />
      <circle cx="85" cy="75" r="2.2" fill="#F1F5F9" className="star-3" style={{animationDelay: '1s'}} />
      <circle cx="12" cy="80" r="1.8" fill="#E2E8F0" className="star-1" style={{animationDelay: '1.5s'}} />
      <circle cx="100" cy="55" r="1.5" fill="#F1F5F9" className="star-2" style={{animationDelay: '2s'}} />
      
      {/* Medium stars */}
      <circle cx="30" cy="15" r="1.3" fill="#CBD5E1" className="star-3" style={{animationDelay: '0.3s'}} />
      <circle cx="75" cy="20" r="1.2" fill="#E2E8F0" className="star-1" style={{animationDelay: '0.8s'}} />
      <circle cx="20" cy="65" r="1.4" fill="#F1F5F9" className="star-2" style={{animationDelay: '1.3s'}} />
      <circle cx="92" cy="90" r="1.1" fill="#CBD5E1" className="star-3" style={{animationDelay: '1.8s'}} />
      
      {/* Small stars */}
      <circle cx="40" cy="30" r="0.8" fill="#E2E8F0" className="star-1" style={{animationDelay: '0.2s'}} />
      <circle cx="65" cy="35" r="0.7" fill="#F1F5F9" className="star-2" style={{animationDelay: '0.7s'}} />
      <circle cx="35" cy="85" r="0.9" fill="#CBD5E1" className="star-3" style={{animationDelay: '1.2s'}} />
      <circle cx="88" cy="45" r="0.8" fill="#E2E8F0" className="star-1" style={{animationDelay: '1.7s'}} />
      <circle cx="25" cy="95" r="0.7" fill="#F1F5F9" className="star-2" style={{animationDelay: '2.2s'}} />
    </g>
    
    {/* Moon glow layers */}
    <circle cx="60" cy="60" r="48" fill="url(#moonGlowOuter)" opacity="0.3" className="moon-glow" />
    <circle cx="60" cy="60" r="38" fill="url(#moonGlowMid)" opacity="0.4" className="moon-glow" style={{animationDelay: '0.5s'}} />
    
    {/* Moon body */}
    <g className="moon-body">
      <circle cx="60" cy="60" r="28" fill="url(#moonGradient)" />
      
      {/* Detailed craters with depth */}
      <g opacity="0.3">
        <circle cx="52" cy="52" r="5" fill="#94A3B8" />
        <circle cx="52" cy="52" r="3.5" fill="#CBD5E1" />
      </g>
      
      <g opacity="0.25">
        <circle cx="70" cy="56" r="4" fill="#94A3B8" />
        <circle cx="70" cy="56" r="2.8" fill="#CBD5E1" />
      </g>
      
      <g opacity="0.28">
        <circle cx="62" cy="70" r="3.5" fill="#94A3B8" />
        <circle cx="62" cy="70" r="2.3" fill="#CBD5E1" />
      </g>
      
      <g opacity="0.22">
        <circle cx="48" cy="65" r="2.8" fill="#94A3B8" />
        <circle cx="48" cy="65" r="1.8" fill="#CBD5E1" />
      </g>
      
      <g opacity="0.2">
        <circle cx="68" cy="68" r="2.2" fill="#94A3B8" />
        <circle cx="68" cy="68" r="1.5" fill="#CBD5E1" />
      </g>
      
      {/* Smaller surface details */}
      <circle cx="56" cy="58" r="1.5" fill="#94A3B8" opacity="0.2" />
      <circle cx="65" cy="62" r="1.3" fill="#94A3B8" opacity="0.18" />
      <circle cx="54" cy="68" r="1.2" fill="#94A3B8" opacity="0.15" />
      
      {/* Subtle shadow for 3D effect */}
      <path
        d="M 60 32 Q 75 50 75 60 Q 75 70 60 88 Q 80 85 88 60 Q 80 35 60 32 Z"
        fill="#64748B"
        opacity="0.12"
      />
      
      {/* Highlight for shine */}
      <ellipse
        cx="54"
        cy="50"
        rx="12"
        ry="9"
        fill="white"
        opacity="0.2"
        transform="rotate(-30 54 50)"
      />
    </g>
    
    <defs>
      <radialGradient id="moonGradient">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="40%" stopColor="#F8FAFC" />
        <stop offset="70%" stopColor="#F1F5F9" />
        <stop offset="100%" stopColor="#E2E8F0" />
      </radialGradient>
      
      <radialGradient id="moonGlowOuter">
        <stop offset="0%" stopColor="#F1F5F9" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0" />
      </radialGradient>
      
      <radialGradient id="moonGlowMid">
        <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export default Moon;