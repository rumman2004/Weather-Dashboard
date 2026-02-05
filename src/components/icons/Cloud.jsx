import React from 'react';

const Cloud = ({ size = 100, className = '', color = '#94A3B8' }) => {
  // Determine color palette based on base color
  const getColorShades = (baseColor) => {
    const colorMap = {
      '#94A3B8': { light: '#CBD5E1', lighter: '#E2E8F0', highlight: '#F1F5F9' },
      '#475569': { light: '#64748B', lighter: '#94A3B8', highlight: '#CBD5E1' },
      '#64748B': { light: '#94A3B8', lighter: '#CBD5E1', highlight: '#E2E8F0' },
    };
    return colorMap[baseColor] || { light: '#CBD5E1', lighter: '#E2E8F0', highlight: '#F1F5F9' };
  };
  
  const shades = getColorShades(color);
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      className={className}
    >
      <style>{`
        @keyframes drift-cloud {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(8px); }
        }
        @keyframes float-cloud {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes puff {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.02); opacity: 1; }
        }
        .cloud-body {
          animation: drift-cloud 10s ease-in-out infinite, 
                     float-cloud 5s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
        }
        .cloud-puff {
          animation: puff 4s ease-in-out infinite;
        }
      `}</style>
      
      <g className="cloud-body">
        {/* Shadow beneath cloud */}
        <ellipse 
          cx="60" 
          cy="75" 
          rx="32" 
          ry="6" 
          fill={color} 
          opacity="0.15" 
        />
        
        {/* Cloud base - layered for depth */}
        <ellipse 
          cx="60" 
          cy="62" 
          rx="30" 
          ry="18" 
          fill={shades.lighter} 
          opacity="0.6" 
        />
        <ellipse 
          cx="60" 
          cy="64" 
          rx="28" 
          ry="16" 
          fill={shades.light} 
          opacity="0.8" 
        />
        
        {/* Main cloud puffs with depth */}
        <g className="cloud-puff" style={{animationDelay: '0s'}}>
          <circle cx="40" cy="58" r="17" fill={shades.lighter} opacity="0.85" />
          <circle cx="40" cy="58" r="15" fill={shades.light} opacity="0.95" />
          <circle cx="40" cy="58" r="13" fill={color} />
        </g>
        
        <g className="cloud-puff" style={{animationDelay: '0.5s'}}>
          <circle cx="60" cy="52" r="20" fill="white" opacity="0.4" />
          <circle cx="60" cy="52" r="18" fill={shades.lighter} opacity="0.9" />
          <circle cx="60" cy="52" r="16" fill={color} />
        </g>
        
        <g className="cloud-puff" style={{animationDelay: '1s'}}>
          <circle cx="80" cy="58" r="16" fill={shades.lighter} opacity="0.85" />
          <circle cx="80" cy="58" r="14" fill={shades.light} opacity="0.95" />
          <circle cx="80" cy="58" r="12" fill={color} />
        </g>
        
        {/* Additional smaller puffs for detail */}
        <circle cx="48" cy="56" r="10" fill={shades.light} opacity="0.7" />
        <circle cx="72" cy="56" r="9" fill={shades.light} opacity="0.7" />
        
        {/* Highlights for 3D effect */}
        <ellipse 
          cx="55" 
          cy="50" 
          rx="14" 
          ry="10" 
          fill="white" 
          opacity="0.35" 
        />
        <ellipse 
          cx="68" 
          cy="52" 
          rx="10" 
          ry="7" 
          fill="white" 
          opacity="0.3" 
        />
        <ellipse 
          cx="43" 
          cy="54" 
          rx="8" 
          ry="6" 
          fill="white" 
          opacity="0.25" 
        />
        
        {/* Soft edge details */}
        <circle cx="35" cy="60" r="6" fill={shades.lighter} opacity="0.5" />
        <circle cx="85" cy="60" r="5" fill={shades.lighter} opacity="0.5" />
      </g>
    </svg>
  );
};

export default Cloud;