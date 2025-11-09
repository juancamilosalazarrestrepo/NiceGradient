'use client'

import { useState } from 'react';
import { Gradient } from '@/data/gradients';

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
      className="group relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        className="h-40 w-full"
        style={{ background: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.colors.join(', ')})` }}
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
        {isHovered && (
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(gradient.css);
              }}
              className="bg-white text-gray-800 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Get CSS
            </button>
          </div>
        )}
      </div>

      <div className="p-3 bg-white">
        <h3 className="text-sm font-semibold text-gray-800">{gradient.name}</h3>
        <div className="flex space-x-1 mt-2">
          {gradient.colors.map((color, index) => (
            <div
              key={index}
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}