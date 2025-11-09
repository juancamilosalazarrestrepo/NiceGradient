'use client'

import { useState, useRef, useEffect } from 'react';

interface ColorTooltipProps {
  color: string;
  colorName: string;
  children: React.ReactNode;
}

export default function ColorTooltip({ color, colorName, children }: ColorTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState('top');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Si está muy cerca del borde superior, mostrar abajo
      if (rect.top < 80) {
        setPosition('bottom');
      } else {
        setPosition('top');
      }
    }
  }, [isVisible]);

  const tooltipClasses = position === 'top' 
    ? "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
    : "absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50";

  const arrowClasses = position === 'top'
    ? "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"
    : "absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900";

  return (
    <div 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div className={tooltipClasses}>
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl border border-gray-700">
            <div className="font-medium">{colorName}</div>
            <div className="font-mono text-gray-300">{color}</div>
            
            {/* Arrow */}
            <div className={arrowClasses}></div>
          </div>
        </div>
      )}
    </div>
  );
}