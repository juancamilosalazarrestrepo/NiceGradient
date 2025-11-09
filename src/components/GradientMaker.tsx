'use client'

import { useState } from 'react';
import { Gradient } from '@/data/gradients';
import GeminiGradientGenerator from './GeminiGradientGenerator';
import AIGradientGenerator from './AIGradientGenerator';
import { Palette, Sparkles, Zap, Crown, Trash2 } from 'lucide-react';

interface GradientMakerProps {
  onGradientCreate: (gradient: { name: string; colors: string[]; css: string }) => void;
}

export default function GradientMaker({ onGradientCreate }: GradientMakerProps) {
  const [colors, setColors] = useState(['#ff6b6b', '#4ecdc4']);
  const [direction, setDirection] = useState('to right');
  const [gradientName, setGradientName] = useState('');
  const [gradientDescription, setGradientDescription] = useState('');
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');

  const addColor = () => {
    if (colors.length < 5) {
      setColors([...colors, '#ffffff']);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index: number, color: string) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const generateCSS = () => {
    return `background: linear-gradient(${direction}, ${colors.join(', ')});`;
  };

  const copyCSS = async () => {
    const css = generateCSS();
    try {
      await navigator.clipboard.writeText(css);
      alert('CSS copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy CSS: ', err);
    }
  };

  const saveGradient = () => {
    if (!gradientName.trim()) {
      alert('Please enter a gradient name');
      return;
    }

    const newGradient = {
      name: gradientName,
      colors: [...colors],
      css: generateCSS()
    };

    onGradientCreate(newGradient);
    setGradientName('');
    setGradientDescription('');
    alert('Gradient saved!');
  };

  const handleAIGradientGenerated = (gradient: Gradient) => {
    // Auto-save the AI generated gradient
    onGradientCreate({
      name: gradient.name,
      colors: gradient.colors,
      css: gradient.css
    });
    
    // Also load it into the manual editor for further customization
    setColors(gradient.colors);
    setDirection(gradient.direction || 'to right');
    setGradientName(gradient.name);
    setGradientDescription(gradient.description || '');
    setActiveTab('manual');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Gradient</h2>
        <p className="text-gray-600">Generate unique gradients with AI or create them manually - you choose!</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'ai'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          AI Generation
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'manual'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Palette className="h-4 w-4" />
          Manual Editor
        </button>
      </div>

      {/* AI Generator Tab */}
      {activeTab === 'ai' && (
        <GeminiGradientGenerator onGradientGenerated={handleAIGradientGenerated} />
      )}

      {/* Manual Creator Tab */}
      {activeTab === 'manual' && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Manual Editor</h3>
          
          {/* Gradient Preview */}
          <div className="mb-6">
            <div
              className="h-32 rounded-lg border-2 border-gray-200"
              style={{ background: `linear-gradient(${direction}, ${colors.join(', ')})` }}
            />
          </div>

          {/* Direction Control */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Direction</label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="to right">To Right</option>
              <option value="to left">To Left</option>
              <option value="to top">To Top</option>
              <option value="to bottom">To Bottom</option>
              <option value="45deg">Diagonal 45°</option>
              <option value="135deg">Diagonal 135°</option>
            </select>
          </div>

          {/* Color Controls */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
            <div className="space-y-2">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="#ffffff"
                  />
                  {colors.length > 2 && (
                    <button
                      onClick={() => removeColor(index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {colors.length < 5 && (
              <button
                onClick={addColor}
                className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Add Color
              </button>
            )}
          </div>

          {/* CSS Output */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">CSS Code</label>
            <textarea
              value={generateCSS()}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-50 font-mono text-sm"
              rows={3}
            />
            <button
              onClick={copyCSS}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Copy CSS
            </button>
          </div>

          {/* Save Gradient */}
          <div>
            <input
              type="text"
              value={gradientName}
              onChange={(e) => setGradientName(e.target.value)}
              placeholder="Gradient name"
              className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            {/* Description field */}
            <textarea
              value={gradientDescription}
              onChange={(e) => setGradientDescription(e.target.value)}
              placeholder="Poetic description of the gradient (AI-generated or custom)"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
              rows={3}
            />
            
            {/* Display generated description info */}
            {gradientDescription && (
              <div className="mb-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-purple-700 mb-1">
                  ✨ <strong>Description:</strong>
                </p>
                <p className="text-sm text-purple-600 italic">
                  {gradientDescription}
                </p>
              </div>
            )}
            
            <button
              onClick={saveGradient}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Gradient
            </button>
          </div>
        </div>
      )}
    </div>
  );
}