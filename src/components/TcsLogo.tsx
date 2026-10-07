import React from 'react';

interface TcsLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const TcsLogo: React.FC<TcsLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-11' : 'h-9';

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <picture>
        <source srcSet="/tcs-logo.svg" type="image/svg+xml" />
        <img
          src="/tcs-logo.png"
          srcSet="/tcs-logo.png 1x, /tcs-logo@2x.png 2x"
          alt="TATA CONSULTANCY SERVICES"
          className={`${heightClass} w-auto object-contain pointer-events-none`}
          draggable={false}
        />
      </picture>
    </div>
  );
};

