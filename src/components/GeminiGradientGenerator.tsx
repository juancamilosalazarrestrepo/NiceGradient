'use client'

import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Gradient } from '@/data/gradients';
import { Sparkles, Upload, Wand2, Loader2, Zap } from 'lucide-react';

interface GeminiGradientGeneratorProps {
  onGradientGenerated: (gradient: Gradient) => void;
}

export default function GeminiGradientGenerator({ onGradientGenerated }: GeminiGradientGeneratorProps) {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [error, setError] = useState('');

  // Enhanced local generator as fallback
  const generateLocalGradient = (desc: string): Gradient => {
    const enhancedPalettes: { [key: string]: { colors: string[], name: string, desc: string } } = {
      // Nature and landscapes
      'sunset|dusk|twilight|evening': { 
        colors: ['#ff6b35', '#f7931e', '#ffcc02'], 
        name: 'Golden Sunset',
        desc: 'Warm golden tones dancing among the clouds of infinite twilight'
      },
      'sunrise|dawn|morning|aurora': { 
        colors: ['#ff9a9e', '#fecfef', '#ffd1ff'], 
        name: 'Rosy Dawn',
        desc: 'Soft pink hues awakening with the first light of day'
      },
      'ocean|sea|water|marine': { 
        colors: ['#2193b0', '#6dd5ed', '#c2fffe'], 
        name: 'Marine Depths',
        desc: 'Crystalline blues reflecting the immensity of the infinite ocean'
      },
      'fire|flame|burning|blaze': { 
        colors: ['#ff416c', '#ff4b2b', '#ff6b35'], 
        name: 'Burning Flame',
        desc: 'Intense reds and oranges dancing like tongues of eternal fire'
      },
      'forest|jungle|green|woods': { 
        colors: ['#11998e', '#38ef7d', '#7de77b'], 
        name: 'Emerald Foliage',
        desc: 'Vibrant greens whispering secrets of wild nature'
      },
      'sky|clouds|blue|heaven': { 
        colors: ['#74b9ff', '#0984e3', '#a8e6cf'], 
        name: 'Infinite Sky',
        desc: 'Ethereal blues stretching toward limitless horizons'
      },
      'night|star|dark|midnight': { 
        colors: ['#2c3e50', '#4a6741', '#8e44ad'], 
        name: 'Starry Night',
        desc: 'Deep nocturnal blues sprinkled with cosmic mystery'
      },
      
      // Emotions and states
      'happy|joy|cheerful|colorful|bright': { 
        colors: ['#f093fb', '#f5576c', '#4facfe'], 
        name: 'Radiant Euphoria',
        desc: 'Vibrant colors celebrating the pure joy of existence'
      },
      'calm|peaceful|serene|tranquil|zen': { 
        colors: ['#a8edea', '#fed6e3', '#d299c2'], 
        name: 'Absolute Serenity',
        desc: 'Soft tones embracing the soul with infinite peace'
      },
      'energy|power|electric|dynamic|vibrant': { 
        colors: ['#fa709a', '#fee140', '#fa709a'], 
        name: 'Pure Energy',
        desc: 'Electric colors vibrating with inexhaustible life force'
      },
      'mystery|enigma|purple|violet|mystic': { 
        colors: ['#667eea', '#764ba2', '#f093fb'], 
        name: 'Violet Enigma',
        desc: 'Mystical purples guarding secrets of the universe'
      },

      // Elements and materials
      'gold|golden|bright|shiny|metallic': { 
        colors: ['#f7971e', '#ffd200', '#fff200'], 
        name: 'Liquid Gold',
        desc: 'Golden brilliance flowing like molten precious metal'
      },
      'silver|metallic|chrome|steel': { 
        colors: ['#bdc3c7', '#ecf0f1', '#d5dbdb'], 
        name: 'Lunar Silver',
        desc: 'Silvery reflections capturing the light of the full moon'
      },
      'crystal|diamond|transparent|clear|glass': { 
        colors: ['#e0eafc', '#cfdef3', '#ffffff'], 
        name: 'Pure Crystal',
        desc: 'Crystalline transparencies refracting light into subtle rainbows'
      },
      
      // Fruits and flavors
      'orange|citrus|tangerine|mandarin': {
        colors: ['#ff8008', '#ffc837', '#fff200'],
        name: 'Radiant Citrus',
        desc: 'Vibrant oranges awakening all senses with citric energy'
      },
      'strawberry|pink|berry|sweet': {
        colors: ['#ff0844', '#ffb199', '#ff9a9e'],
        name: 'Sweet Strawberry',
        desc: 'Sweet pink tones evoking the freshness of ripe fruits'
      }
    };

    const lowerDesc = desc.toLowerCase();
    let selectedPalette = enhancedPalettes['mystery|enigma|purple|violet|mystic']; // Default

    // Search for matches
    for (const [keywords, palette] of Object.entries(enhancedPalettes)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerDesc.includes(keyword))) {
        selectedPalette = palette;
        break;
      }
    }

    // More varied directions
    const directions = [
      'to right', 'to bottom', 'to top right', 'to bottom left',
      '45deg', '135deg', '225deg', '315deg'
    ];
    
    const direction = directions[Math.floor(Math.random() * directions.length)];

    return {
      id: Date.now().toString(),
      name: selectedPalette.name,
      colors: selectedPalette.colors,
      direction: direction,
      css: `background: linear-gradient(${direction}, ${selectedPalette.colors.join(', ')});`,
      description: selectedPalette.desc,
      tags: []
    };
  };

  // Google Gemini API call usando SDK oficial
  const generateFromDescription = async () => {
    if (!description.trim() || isGenerating) return;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError('Google Gemini API Key not configured');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      console.log('Generating gradient with Google Gemini 2.5 Flash...');
      
      // Initialize Gemini with official SDK - using newer model
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `You are an expert CSS gradient designer. Create a beautiful gradient based on: "${description}"

Respond ONLY with valid JSON in this exact format:
{
  "colors": ["#hex1", "#hex2", "#hex3"],
  "direction": "to right",
  "name": "Creative Name",
  "description": "Poetic description in English"
}

STRICT REQUIREMENTS:
- Exactly 2-3 colors in valid hexadecimal format (#RRGGBB)
- Creative and memorable name (maximum 20 characters)
- Beautiful poetic description of 20-40 words in English that captures the visual and emotional essence
- Direction can be: "to right", "to bottom", "45deg", "135deg", "225deg", "315deg"
- Colors must harmonize perfectly
- Draw inspiration from nature, emotions, or described elements
- Description should be lyrical, evocative, and artistic

Examples of good responses:
- For "sunset": warm colors like oranges, reds, yellows
- For "ocean": deep and clear blues
- For "fire": intense reds, vibrant oranges
- For "peaceful": soft and pastel tones

DO NOT include explanatory text, ONLY the JSON.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('Respuesta de Gemini SDK:', text);
      
      if (!text) {
        throw new Error('Respuesta vacía de Gemini');
      }
      
      // Limpiar y parsear JSON
      let cleanedText = text.replace(/```json|```|`/g, '').trim();
      
      // Buscar JSON si está mezclado con otro contenido
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
      
      const gradientData = JSON.parse(cleanedText);
      
      // Validate that it has the necessary fields
      if (!gradientData.colors || !Array.isArray(gradientData.colors) || gradientData.colors.length < 2) {
        throw new Error('Invalid Gemini response: missing colors');
      }
      
      // Validate hexadecimal format
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      const validColors = gradientData.colors.filter((color: string) => hexRegex.test(color));
      
      if (validColors.length < 2) {
        throw new Error('Colors in invalid format');
      }
      
      // Create gradient object
      const newGradient: Gradient = {
        id: Date.now().toString(),
        name: gradientData.name || `Gradient ${Date.now()}`,
        colors: validColors,
        direction: gradientData.direction || 'to right',
        css: `background: linear-gradient(${gradientData.direction || 'to right'}, ${validColors.join(', ')});`,
        description: gradientData.description || `Beautiful gradient inspired by ${description}`,
        tags: []
      };
      
      console.log('✅ Gradient generated successfully:', newGradient.name);
      console.log('📝 Description generated:', newGradient.description);
      
      onGradientGenerated(newGradient);
      setDescription('');
      
    } catch (error: any) {
      console.error('Error with Gemini SDK:', error);
      
      let errorMessage = 'Error with Google Gemini. Using local generator as alternative.';
      
      if (error?.message?.includes('429') || error?.status === 429) {
        errorMessage = '⚠️ Google Gemini: Quota exceeded. Using local generator.';
      } else if (error?.message?.includes('401') || error?.message?.includes('403') || error?.status === 401 || error?.status === 403) {
        errorMessage = '🔑 Google Gemini: Invalid API key. Check your configuration.';
      } else if (error?.message?.includes('404') || error?.status === 404) {
        errorMessage = '🔧 Google Gemini: Model not found. Verifying configuration...';
      } else if (error?.message?.includes('500') || error?.status === 500) {
        errorMessage = '🔧 Google Gemini: Service temporarily unavailable.';
      }
      
      setError(errorMessage);
      
      // Fallback to local generator
      console.log('Using local generator as fallback...');
      const localGradient = generateLocalGradient(description);
      onGradientGenerated(localGradient);
      setDescription('');
      
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    }
  };

  const generateFromImage = async () => {
    if (!selectedImage || isGenerating) return;
    
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
      setError('Google Gemini API Key not configured');
      return;
    }

    setIsGenerating(true);
    setError('');
    
    try {
      // Convert image to ArrayBuffer
      const arrayBuffer = await selectedImage.arrayBuffer();
      
      console.log('Analyzing image with Gemini 2.5 Flash (multimodal)...');
      
      // Initialize Gemini 2.5 Flash with multimodal support
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `Analyze this image and extract the 2-3 most dominant and harmonious colors to create a beautiful CSS gradient.

Respond ONLY with valid JSON:
{
  "colors": ["#hex1", "#hex2", "#hex3"],
  "direction": "to right",
  "name": "Image-inspired name",
  "description": "Poetic description in English"
}

REQUIREMENTS:
- 2-3 main colors from the image in valid hexadecimal format
- Creative name based on what you see (maximum 20 characters)
- Poetic description of 20-40 words capturing the visual and emotional essence of the image
- Colors that work well together in a gradient
- Description should be artistic and evocative

DO NOT include explanations, ONLY the JSON.`;

      const imagePart = {
        inlineData: {
          data: Buffer.from(arrayBuffer).toString('base64'),
          mimeType: selectedImage.type
        }
      };

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();
      
      console.log('Gemini Vision SDK response:', text);
      
      // Clean and parse JSON
      let cleanedText = text.replace(/```json|```|`/g, '').trim();
      
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
      
      const gradientData = JSON.parse(cleanedText);
      
      // Validate colors
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;
      const validColors = gradientData.colors?.filter((color: string) => hexRegex.test(color)) || [];
      
      if (validColors.length < 2) {
        throw new Error('Could not extract valid colors from the image');
      }
      
      // Create gradient object
      const newGradient: Gradient = {
        id: Date.now().toString(),
        name: gradientData.name || `Image Gradient ${Date.now()}`,
        colors: validColors,
        direction: gradientData.direction || 'to right',
        css: `background: linear-gradient(${gradientData.direction || 'to right'}, ${validColors.join(', ')});`,
        description: gradientData.description || 'Image-inspired gradient',
        tags: []
      };
      
      onGradientGenerated(newGradient);
      setSelectedImage(null);
      
    } catch (error: any) {
      console.error('Gemini Vision SDK error:', error);
      
      let errorMessage = 'Error analyzing image with Gemini Vision.';
      
      if (error?.message?.includes('429') || error?.status === 429) {
        errorMessage = '⚠️ Gemini Vision: Quota exceeded for image analysis.';
      } else if (error?.message?.includes('404') || error?.status === 404) {
        errorMessage = '🔧 Gemini Vision: Model not found. Verifying configuration...';
      }
      
      setError(errorMessage);
      setSelectedImage(null);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">AI Gradient Generator</h2>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">FREE</span>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">{error}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'text'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Wand2 className="h-4 w-4" />
          Description
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === 'image'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Upload className="h-4 w-4" />
          Image
        </button>
      </div>

      {/* Text Description Tab */}
      {activeTab === 'text' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your ideal gradient
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="E.g.: Magical sunset in the mountains, crystalline ocean, burning fire, zen serenity..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              rows={3}
              disabled={isGenerating}
            />
          </div>
          
          <button
            onClick={generateFromDescription}
            disabled={!description.trim() || isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate with AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Image Upload Tab */}
      {activeTab === 'image' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload an image to extract colors
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="gemini-image-upload"
                disabled={isGenerating}
              />
              <label htmlFor="gemini-image-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  {selectedImage ? selectedImage.name : 'Click to select an image'}
                </p>
              </label>
            </div>
          </div>
          
          <button
            onClick={generateFromImage}
            disabled={!selectedImage || isGenerating}
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing image with AI...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Analyze Image with AI
              </>
            )}
          </button>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <p className="text-xs text-purple-700 mb-2">
          🚀 <strong>Advanced AI:</strong> 1,500 daily requests completely free
        </p>
        <p className="text-xs text-purple-600">
          💡 <strong>Tip:</strong> Be specific: &ldquo;Golden sunset on tropical beach&rdquo; works better than &ldquo;nice colors&rdquo;
        </p>
      </div>
    </div>
  );
}