'use client'

import { useState } from 'react';
import { Gradient } from '@/data/gradients';

interface GradientDetailsProps {
  gradient: Gradient | null;
  onClose: () => void;
}

export default function GradientDetails({ gradient, onClose }: GradientDetailsProps) {
  const [copied, setCopied] = useState(false);

  if (!gradient) return null;

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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{gradient.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Gradient Preview */}
        <div className="p-6">
          <div
            className="h-48 rounded-lg mb-6"
            style={{ background: `linear-gradient(${gradient.direction || 'to right'}, ${gradient.colors.join(', ')})` }}
          />

          {/* Color Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gradient.colors.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 border border-gray-200 rounded-md"
                >
                  <div
                    className="w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm font-mono text-gray-700">{color}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CSS Code */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">CSS Code</h3>
            <div className="relative">
              <textarea
                value={gradient.css}
                readOnly
                className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
                rows={3}
              />
              <button
                onClick={() => copyToClipboard(gradient.css)}
                className={`absolute top-2 right-2 px-3 py-1 text-sm rounded-md transition-colors ${
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
          <div className="flex space-x-3">
            <button
              onClick={() => copyToClipboard(gradient.css)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Copy CSS
            </button>
            <button
              onClick={downloadAsImage}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}