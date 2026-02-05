import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', // primary, secondary, icon
  size = 'md', // sm, md, lg
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'text-accent-primary font-semibold',
    secondary: 'text-text-secondary font-medium',
    icon: 'p-3'
  };

  const baseClasses = 'neu-button rounded-3xl transition-neu focus:outline-none';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;