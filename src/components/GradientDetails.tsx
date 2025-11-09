'use client'

import { useState } from 'react';
import { Gradient, getColorName, getHexFromColorName } from '@/data/gradients';
import ColorTooltip from './ColorTooltip';

interface GradientDetailsProps {
  gradient: Gradient | null;
  onClose: () => void;
}

export default function GradientDetails({ gradient, onClose }: GradientDetailsProps) {
  const [copied, setCopied] = useState(false);

  if (!gradient) return null;

  // Create subtle version of colors for tags
  const getBgStyle = (hex: string) => {
    if (!hex) return {};
    
    // Convert hex to RGB and create a subtle version
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    
    // Create a subtle background with low opacity
    return { 
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.15)`,
      borderColor: `rgba(${r}, ${g}, ${b}, 0.3)`
    };
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadAsImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Create gradient
    const gradientObj = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.colors.forEach((color, index) => {
      gradientObj.addColorStop(index / (gradient.colors.length - 1), color);
    });

    ctx.fillStyle = gradientObj;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Download
    const link = document.createElement('a');
    link.download = `${gradient.name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">{gradient.name}</h2>
              {gradient.description && (
                <blockquote className="text-sm font-light text-gray-600 italic leading-relaxed border-l-4 border-blue-200 pl-4 bg-blue-50 p-3 rounded-r-lg">
                  &ldquo;{gradient.description}&rdquo;
                </blockquote>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl ml-2"
            >
              ×
            </button>
          </div>
        </div>

        {/* Gradient Preview */}
        <div className="p-6">
          <div
            className="h-40 rounded-lg mb-6"
            style={{ background: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.colors.join(', ')})` }}
          />

          {/* Content Grid - Two columns on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Tags */}
              {gradient.tags && gradient.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Color Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {gradient.tags.map((tag, index) => {
                      const tagHex = getHexFromColorName(tag);
                      const bgStyle = tagHex ? getBgStyle(tagHex) : {};
                      const textColor = tagHex ? 'text-gray-700' : 'text-gray-600';
                      
                      return (
                        <span
                          key={index}
                          className={`px-3 py-1 text-sm rounded-full font-medium border ${textColor} ${!tagHex ? 'bg-gray-100 border-gray-200' : ''}`}
                          style={bgStyle}
                        >
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Color Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Colors</h3>
                <div className="grid grid-cols-1 gap-3">
                  {gradient.colors.map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md"
                    >
                      <ColorTooltip
                        color={color}
                        colorName={getColorName(color)}
                      >
                        <div
                          className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-200 flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                      </ColorTooltip>
                      <div>
                        <span className="text-base font-mono text-gray-700 block">{color}</span>
                        <span className="text-sm text-gray-500 capitalize">{getColorName(color)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* CSS Code */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">CSS Code</h3>
                <div className="relative">
                  <textarea
                    value={gradient.css}
                    readOnly
                    className="w-full p-4 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm h-32 resize-none text-gray-900"
                  />
                  <button
                    onClick={() => copyToClipboard(gradient.css)}
                    className={`absolute bottom-4 right-3 px-3 py-1 text-sm rounded-md transition-colors ${
                      copied
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                    }`}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => copyToClipboard(gradient.css)}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                >
                  📋 Copy CSS Code
                </button>
                <button
                  onClick={downloadAsImage}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
                >
                  🖼️ Download as PNG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}