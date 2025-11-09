'use client'

import { useState } from 'react';
import { gradients, Gradient } from '@/data/gradients';
import GradientCard from '@/components/GradientCard';
import GradientDetails from '@/components/GradientDetails';
import GradientMaker from '@/components/GradientMaker';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);
  const [showMaker, setShowMaker] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customGradients, setCustomGradients] = useState<Gradient[]>([]);

  const allGradients = [...gradients, ...customGradients];
  
  const filteredGradients = allGradients.filter(gradient => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search by name
    if (gradient.name.toLowerCase().includes(searchLower)) return true;
    
    // Search by tags (color names)
    if (gradient.tags?.some(tag => tag.toLowerCase().includes(searchLower))) return true;
    
    // Search by hex colors
    if (gradient.colors.some(color => color.toLowerCase().includes(searchLower))) return true;
    
    return false;
  });

  const handleGradientSelect = (gradient: Gradient) => {
    setSelectedGradient(gradient);
  };

  const handleGradientCreate = (newGradient: { name: string; colors: string[]; css: string }) => {
    const gradient: Gradient = {
      id: `custom-${Date.now()}`,
      name: newGradient.name,
      colors: newGradient.colors,
      direction: 'to right',
      css: newGradient.css
    };
    setCustomGradients([...customGradients, gradient]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onCreateClick={() => setShowMaker(!showMaker)}
        showMaker={showMaker}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Gradient Maker */}
        {showMaker && (
          <div className="mb-8">
            <GradientMaker onGradientCreate={handleGradientCreate} />
          </div>
        )}

        {/* Gradients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4 overflow-visible">
          {filteredGradients.map((gradient) => (
            <GradientCard
              key={gradient.id}
              gradient={gradient}
              onSelect={handleGradientSelect}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Showing {filteredGradients.length} of {allGradients.length} gradients
          </p>
        </div>

        {/* No Results */}
        {filteredGradients.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No gradients found matching &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
            <p className="text-gray-500 mt-2">
              Explore beautiful gradients with poetic descriptions or create your own masterpiece
            </p>
          </div>
        </div>
      </footer>

      {/* Gradient Details Modal */}
      {selectedGradient && (
        <GradientDetails
          gradient={selectedGradient}
          onClose={() => setSelectedGradient(null)}
        />
      )}
    </div>
  );
}