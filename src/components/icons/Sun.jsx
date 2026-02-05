import React from 'react';

const Sun = ({ size = 100, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 120 120" 
    fill="none" 
    className={className}
  >
    <style>{`
      @keyframes rotate-sun {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes pulse-rays {
        0%, 100% { 
          opacity: 0.7;
          transform: scale(1);
        }
        50% { 
          opacity: 1;
          transform: scale(1.15);
        }
      }
      @keyframes glow-pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 0.7; }
      }
      .sun-core {
        animation: rotate-sun 30s linear infinite;
        transform-origin: center;
        filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.6));
      }
      .sun-ray {
        animation: pulse-rays 3s ease-in-out infinite;
        transform-origin: center;
      }
      .sun-glow {
        animation: glow-pulse 4s ease-in-out infinite;
      }
    `}</style>
    
    {/* Outer glow layers */}
    <circle cx="60" cy="60" r="50" fill="url(#sunGlowOuter)" opacity="0.3" className="sun-glow" />
    <circle cx="60" cy="60" r="40" fill="url(#sunGlowMid)" opacity="0.4" className="sun-glow" />
    
    {/* Enhanced sun rays with gradient */}
    <g className="sun-ray">
      {[...Array(16)].map((_, i) => {
        const angle = (i * 22.5 * Math.PI) / 180;
        const innerRadius = 32;
        const outerRadius = 52;
        return (
          <g key={i}>
            <line
              x1={60 + Math.cos(angle) * innerRadius}
              y1={60 + Math.sin(angle) * innerRadius}
              x2={60 + Math.cos(angle) * outerRadius}
              y2={60 + Math.sin(angle) * outerRadius}
              stroke="url(#rayGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
            {/* Secondary smaller rays between main rays */}
            {i % 2 === 0 && (
              <line
                x1={60 + Math.cos(angle + Math.PI/8) * (innerRadius + 5)}
                y1={60 + Math.sin(angle + Math.PI/8) * (innerRadius + 5)}
                x2={60 + Math.cos(angle + Math.PI/8) * (outerRadius - 8)}
                y2={60 + Math.sin(angle + Math.PI/8) * (outerRadius - 8)}
                stroke="url(#rayGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.6"
                style={{ animationDelay: `${i * 0.08 + 0.2}s` }}
              />
            )}
          </g>
        );
      })}
    </g>
    
    {/* Sun core with enhanced details */}
    <g className="sun-core">
      {/* Main sun body */}
      <circle cx="60" cy="60" r="26" fill="url(#sunGradient)" />
      
      {/* Surface texture details */}
      <circle cx="52" cy="52" r="4" fill="#FFF4E0" opacity="0.5" />
      <circle cx="68" cy="56" r="3" fill="#FFF4E0" opacity="0.4" />
      <circle cx="60" cy="68" r="3.5" fill="#FFE8B8" opacity="0.45" />
      <circle cx="55" cy="62" r="2.5" fill="#FFF4E0" opacity="0.35" />
      <circle cx="66" cy="64" r="2" fill="#FFE8B8" opacity="0.4" />
      
      {/* Subtle highlight */}
      <ellipse 
        cx="56" 
        cy="54" 
        rx="10" 
        ry="8" 
        fill="white" 
        opacity="0.25" 
        transform="rotate(-25 56 54)"
      />
    </g>
    
    <defs>
      {/* Enhanced gradients */}
      <radialGradient id="sunGradient">
        <stop offset="0%" stopColor="#FEF3C7" />
        <stop offset="30%" stopColor="#FDE047" />
        <stop offset="60%" stopColor="#FBBF24" />
        <stop offset="100%" stopColor="#F59E0B" />
      </radialGradient>
      
      <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#FBBF24" stopOpacity="1" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
      </linearGradient>
      
      <radialGradient id="sunGlowOuter">
        <stop offset="0%" stopColor="#FDE047" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#FDE047" stopOpacity="0" />
      </radialGradient>
      
      <radialGradient id="sunGlowMid">
        <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export default Sun;