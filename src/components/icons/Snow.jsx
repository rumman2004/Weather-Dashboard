import React from 'react';

const Snow = ({ size = 100, className = '', intensity = 'medium' }) => {
  const flakeCounts = {
    light: 8,
    medium: 14,
    heavy: 20
  };
  
  const flakeCount = flakeCounts[intensity] || 14;
  
  // Generate snowflake paths with 6-point symmetry
  const generateSnowflake = (cx, cy, radius) => {
    const branches = 6;
    let path = '';
    
    for (let i = 0; i < branches; i++) {
      const angle = (i * 60 * Math.PI) / 180;
      const x1 = cx + Math.cos(angle) * radius * 0.3;
      const y1 = cy + Math.sin(angle) * radius * 0.3;
      const x2 = cx + Math.cos(angle) * radius;
      const y2 = cy + Math.sin(angle) * radius;
      
      path += `M ${cx} ${cy} L ${x2} ${y2} `;
      
      // Add small branches
      const branchAngle1 = angle + Math.PI / 6;
      const branchAngle2 = angle - Math.PI / 6;
      const bx1 = x1 + Math.cos(branchAngle1) * radius * 0.2;
      const by1 = y1 + Math.sin(branchAngle1) * radius * 0.2;
      const bx2 = x1 + Math.cos(branchAngle2) * radius * 0.2;
      const by2 = y1 + Math.sin(branchAngle2) * radius * 0.2;
      
      path += `M ${x1} ${y1} L ${bx1} ${by1} M ${x1} ${y1} L ${bx2} ${by2} `;
    }
    
    return path;
  };
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      className={className}
    >
      <style>{`
        @keyframes snow-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(140px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes snow-fall-slow {
          0% {
            transform: translateY(-15px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(135px) rotate(270deg);
            opacity: 0;
          }
        }
        @keyframes snow-fall-fast {
          0% {
            transform: translateY(-25px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(145px) rotate(450deg);
            opacity: 0;
          }
        }
        @keyframes twirl {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
        }
        @keyframes float-drift {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(8px); }
        }
        .snowflake-1 {
          animation: snow-fall 4s linear infinite, float-drift 3s ease-in-out infinite;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
        }
        .snowflake-2 {
          animation: snow-fall-slow 5s linear infinite, float-drift 4s ease-in-out infinite;
          filter: drop-shadow(0 0 3px rgba(226, 232, 240, 0.7));
        }
        .snowflake-3 {
          animation: snow-fall-fast 3.5s linear infinite, float-drift 2.5s ease-in-out infinite;
          filter: drop-shadow(0 0 2px rgba(241, 245, 249, 0.9));
        }
        .pile-snow {
          animation: twirl 6s ease-in-out infinite;
        }
      `}</style>
      
      <defs>
        {/* Snowflake gradients for shimmer effect */}
        <radialGradient id="snowGradient1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="60%" stopColor="#F8FAFC" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.8" />
        </radialGradient>
        
        <radialGradient id="snowGradient2">
          <stop offset="0%" stopColor="#F1F5F9" stopOpacity="1" />
          <stop offset="50%" stopColor="#E2E8F0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.7" />
        </radialGradient>
        
        <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F1F5F9" stopOpacity="1" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      
      {/* Background layer - larger, slower snowflakes */}
      <g opacity="0.5">
        {[...Array(Math.floor(flakeCount * 0.4))].map((_, i) => {
          const x = 15 + (i * (90 / Math.floor(flakeCount * 0.4)));
          const y = -10 - (i % 3) * 15;
          const delay = (i * 0.6) % 5;
          const size = 2.5 + Math.random() * 1;
          
          return (
            <g key={`back-${i}`} className="snowflake-2" style={{ animationDelay: `${delay}s` }}>
              <circle cx={x} cy={y} r={size} fill="url(#snowGradient2)" />
              <circle cx={x} cy={y} r={size * 0.6} fill="white" opacity="0.6" />
            </g>
          );
        })}
      </g>
      
      {/* Middle layer - detailed snowflakes */}
      <g>
        {[...Array(Math.floor(flakeCount * 0.5))].map((_, i) => {
          const x = 10 + (i * (100 / Math.floor(flakeCount * 0.5)));
          const y = -15 - (i % 4) * 12;
          const delay = (i * 0.4) % 4;
          const size = 3;
          
          return (
            <g key={`mid-${i}`} className="snowflake-1" style={{ animationDelay: `${delay}s` }}>
              {/* Detailed 6-pointed snowflake */}
              <path
                d={generateSnowflake(x, y, size)}
                stroke="url(#sparkleGradient)"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle cx={x} cy={y} r={size * 0.3} fill="white" opacity="0.9" />
              
              {/* Crystalline details */}
              {[...Array(6)].map((_, j) => {
                const angle = (j * 60 * Math.PI) / 180;
                const dx = x + Math.cos(angle) * size * 0.6;
                const dy = y + Math.sin(angle) * size * 0.6;
                return (
                  <circle key={j} cx={dx} cy={dy} r="0.4" fill="#F1F5F9" opacity="0.8" />
                );
              })}
            </g>
          );
        })}
      </g>
      
      {/* Foreground layer - simple flakes, faster */}
      <g opacity="0.95">
        {[...Array(Math.floor(flakeCount * 0.6))].map((_, i) => {
          const x = 20 + (i * (80 / Math.floor(flakeCount * 0.6)));
          const y = -20 - (i % 5) * 10;
          const delay = (i * 0.3) % 3.5;
          const size = 2 + Math.random() * 1.5;
          
          return (
            <g key={`front-${i}`} className="snowflake-3" style={{ animationDelay: `${delay}s` }}>
              {/* Star-shaped simple snowflake */}
              <g>
                {[...Array(8)].map((_, k) => {
                  const angle = (k * 45 * Math.PI) / 180;
                  const length = k % 2 === 0 ? size : size * 0.6;
                  const x1 = x;
                  const y1 = y;
                  const x2 = x + Math.cos(angle) * length;
                  const y2 = y + Math.sin(angle) * length;
                  
                  return (
                    <line
                      key={k}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="white"
                      strokeWidth="0.6"
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>
              <circle cx={x} cy={y} r={size * 0.8} fill="url(#snowGradient1)" opacity="0.7" />
              <circle cx={x} cy={y} r={size * 0.4} fill="white" opacity="0.9" />
            </g>
          );
        })}
      </g>
      
      {/* Accumulated snow at bottom - optional decorative element */}
      <g opacity="0.3">
        <ellipse cx="30" cy="115" rx="12" ry="4" fill="white" />
        <ellipse cx="60" cy="115" rx="15" ry="4" fill="#F8FAFC" />
        <ellipse cx="90" cy="115" rx="10" ry="4" fill="white" />
        
        {/* Sparkles on snow pile */}
        <circle cx="28" cy="113" r="0.8" fill="white" opacity="0.8" className="pile-snow" />
        <circle cx="62" cy="113" r="1" fill="#F1F5F9" className="pile-snow" style={{animationDelay: '1s'}} />
        <circle cx="88" cy="113" r="0.7" fill="white" opacity="0.9" className="pile-snow" style={{animationDelay: '2s'}} />
      </g>
      
      {/* Floating ice crystals for extra detail */}
      <g opacity="0.6">
        {[...Array(5)].map((_, i) => {
          const positions = [
            { x: 25, y: 40 },
            { x: 70, y: 30 },
            { x: 45, y: 60 },
            { x: 85, y: 50 },
            { x: 35, y: 80 }
          ];
          const pos = positions[i];
          const delay = i * 0.8;
          
          return (
            <g key={`crystal-${i}`}>
              <circle 
                cx={pos.x} 
                cy={pos.y} 
                r="1.2" 
                fill="white" 
                opacity="0.7"
                className="snowflake-1"
                style={{ animationDelay: `${delay}s` }}
              >
                <animate
                  attributeName="opacity"
                  values="0.7;1;0.7"
                  dur="2s"
                  repeatCount="indefinite"
                  begin={`${delay}s`}
                />
              </circle>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Snow;