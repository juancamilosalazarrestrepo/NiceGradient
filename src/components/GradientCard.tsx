'use client'

import { useState } from 'react';
import { Gradient, getColorName } from '@/data/gradients';
import ColorTooltip from './ColorTooltip';

interface GradientCardProps {
  gradient: Gradient;
  onSelect: (gradient: Gradient) => void;
}

export default function GradientCard({ gradient, onSelect }: GradientCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onSelect(gradient);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className="group relative cursor-pointer rounded-xl shadow-md hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500 transform hover:scale-105 bg-white border border-transparent hover:border-white/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        background: isHovered 
          ? 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,248,255,0.9))' 
          : 'white'
      }}
    >
      <div
        className="h-32 w-full rounded-t-xl overflow-hidden"
        style={{ background: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.colors.join(', ')})` }}
      />
      
      {/* Overlay sutil solo en la parte superior (área del gradiente) */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-black bg-opacity-0 group-hover:bg-opacity-8 transition-all duration-500 flex items-start justify-end p-3 rounded-t-xl overflow-hidden">
        {/* Efecto holográfico solo en el gradiente */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/20 via-blue-100/10 to-purple-200/10 mix-blend-overlay rounded-t-xl"></div>
        
        {/* Ondas curvas solo en el área del gradiente */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-t-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent transform rotate-12 scale-110 translate-x-[-110%] translate-y-[-10%] group-hover:translate-x-[110%] group-hover:translate-y-[10%] transition-transform duration-1200 ease-out"
               style={{
                 borderRadius: '50% 30% 70% 40%',
                 background: 'conic-gradient(from 45deg, transparent, rgba(255,255,255,0.2), transparent, rgba(200,230,255,0.1), transparent)'
               }}></div>
          
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-200/10 to-transparent transform -rotate-6 scale-105 translate-x-[-90%] translate-y-[5%] group-hover:translate-x-[90%] group-hover:translate-y-[-5%] transition-transform duration-1000 ease-out delay-100"
               style={{
                 borderRadius: '60% 40% 30% 70%',
                 background: 'radial-gradient(ellipse, rgba(255,255,255,0.15), transparent 70%)'
               }}></div>
        </div>
        
        {isHovered && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(gradient.css);
            }}
            className="bg-white bg-opacity-95 backdrop-blur-sm text-gray-800 px-2.5 py-1 rounded-md text-xs font-medium hover:bg-opacity-100 hover:scale-105 transition-all duration-200 shadow-lg border border-white/30 relative z-10"
          >
            CSS
          </button>
        )}
      </div>

      <div className="p-4 bg-white group-hover:bg-gray-50/50 transition-colors duration-300 relative z-10">
        <h3 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-gray-900">{gradient.name}</h3>
        
        {gradient.description && (
          <p className="text-xs font-light text-gray-600 group-hover:text-gray-700 leading-relaxed mb-3 italic min-h-[3rem] line-clamp-3 tracking-wide">
            "{gradient.description}"
          </p>
        )}
        
        <div className="flex flex-wrap gap-1 pt-2 mb-2">
          {gradient.tags && gradient.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-1.5">
          {gradient.colors.map((color, index) => (
            <ColorTooltip
              key={index}
              color={color}
              colorName={getColorName(color)}
            >
              <div
                className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: color }}
              />
            </ColorTooltip>
          ))}
        </div>
      </div>
    </div>
  );
}