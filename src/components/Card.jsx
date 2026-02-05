import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'flat', // flat, concave, convex, pressed
  hover = false,
  onClick = null 
}) => {
  const variants = {
    flat: 'neu-flat',
    concave: 'neu-concave',
    convex: 'neu-convex',
    pressed: 'neu-pressed'
  };
  
  const baseClasses = 'rounded-3xl p-6 transition-neu';
  const variantClass = variants[variant] || variants.flat;
  const hoverClass = hover ? 'neu-hover cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${variantClass} ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;