'use client'

import { Search, Plus } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onCreateClick: () => void;
  onHomeClick: () => void;
  showMaker: boolean;
}

export default function Navbar({ searchTerm, onSearchChange, onCreateClick, onHomeClick, showMaker }: NavbarProps) {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable to go home */}
          <button 
            onClick={onHomeClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 cursor-pointer"
          >
            <div className="bg-white rounded-lg p-2 shadow-sm -mt-1">
              <Image 
                src="/logoNiceGradient.png" 
                alt="Nice Gradient Logo" 
                width={56} 
                height={56}
                className="rounded-md"
              />
            </div>
            <div className="text-left">
              <h1 className="text-2xl tracking-tight">
                <span className="momo-trust-display-medium nice-gradient-text">
                  Nice Gradient
                </span>
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block font-light tracking-wide -mt-1">Beautiful gradients collection</p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search gradients by name..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Create Button */}
          <div className="flex items-center">
            <button
              onClick={onCreateClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                showMaker
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              <Plus className={`h-4 w-4 transition-transform duration-200 ${showMaker ? 'rotate-45' : ''}`} />
              <span className="hidden sm:inline">
                {showMaker ? 'Close' : 'Create'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}