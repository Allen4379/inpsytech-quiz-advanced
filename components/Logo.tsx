import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon-only';
}

export const Logo: React.FC<LogoProps> = ({ className = "", variant = 'full' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Glow Effect behind the logo */}
      <div className="absolute inset-0 bg-inpsy-cyan/20 blur-xl rounded-full animate-pulse-slow pointer-events-none"></div>
      
      {/* SVG Icon */}
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={variant === 'icon-only' ? 'w-full h-full' : 'w-16 h-16 md:w-20 md:h-20 mb-2'}
      >
        {/* Hexagon Border */}
        <path 
          d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z" 
          stroke="url(#paint0_linear)" 
          strokeWidth="2"
          className="drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]"
        />
        
        {/* Inner Circuit Lines */}
        <path d="M50 5V25" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 105V85" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M93.3 30L75 40" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
        <path d="M6.7 30L25 40" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
        
        {/* Central Core "IP" abstract */}
        <path d="M35 35H45V75H35" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M55 35H65C70.5228 35 75 39.4772 75 45V55C75 60.5228 70.5228 65 65 65H55V35Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>

        {/* Gradients */}
        <defs>
          <linearGradient id="paint0_linear" x1="50" y1="5" x2="50" y2="105" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00E5FF" />
            <stop offset="1" stopColor="#0044AA" />
          </linearGradient>
        </defs>
      </svg>

      {/* Text Branding (Only for full variant) */}
      {variant === 'full' && (
        <div className="text-center relative z-10">
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md font-sans">
            InPsy<span className="text-inpsy-cyan">tech</span>
          </h1>
          <h2 className="text-sm text-inpsy-cyan font-medium tracking-[0.5em] uppercase mt-1 opacity-90">
            乾瞻科技
          </h2>
        </div>
      )}
    </div>
  );
};