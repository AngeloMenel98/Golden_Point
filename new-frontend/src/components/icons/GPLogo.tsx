import React from "react";

interface GPLogoProps {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}

const GPLogo: React.FC<GPLogoProps> = ({ width = 120, height = 60, style, className }) => {
  // Scale factors
  const scaleX = width / 120;
  const scaleY = height / 60;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      className={className}
      role="img"
      aria-label="Golden Point"
    >
      {/* Background - optional rounded container */}
      <rect 
        x="2" 
        y="2" 
        width={116 * scaleX} 
        height={56 * scaleY} 
        rx="8" 
        fill="#40573C" 
      />
      
      {/* Court grid lines - forming abstract GP shape */}
      <g stroke="#96a259" strokeWidth="2" strokeLinecap="round">
        {/* Left diagonal / (forms G left side) */}
        <line x1="25" y1="48" x2="45" y2="12" />
        
        {/* Top horizontal of G */}
        <line x1="30" y1="12" x2="55" y2="12" />
        
        {/* Right curve of G (middle) */}
        <path d="M55 12 Q65 12 65 25 Q65 38 55 38" />
        
        {/* Bottom of G */}
        <line x1="35" y1="48" x2="55" y2="48" />
        
        {/* Vertical of G (left side) */}
        <line x1="30" y1="12" x2="30" y2="48" />
        
        {/* P vertical line */}
        <line x1="75" y1="12" x2="75" y2="48" />
        
        {/* P top horizontal */}
        <line x1="75" y1="12" x2="95" y2="12" />
        
        {/* P right curve */}
        <path d="M95 12 Q105 12 105 25 Q105 38 95 38" />
        
        {/* P middle horizontal */}
        <line x1="75" y1="25" x2="95" y2="25" />
      </g>
      
      {/* Decorative court line accent */}
      <line 
        x1="10" 
        y1="55" 
        x2="110" 
        y2="55" 
        stroke="#6B8E4A" 
        strokeWidth="1" 
        strokeLinecap="round" 
      />
      
      {/* Small dot accent - padel ball reference */}
      <circle cx="108" cy="45" r="3" fill="#96a259" />
    </svg>
  );
};

export default GPLogo;
