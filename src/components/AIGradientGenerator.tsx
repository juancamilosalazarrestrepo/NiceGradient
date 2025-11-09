'use client'

import { useState } from 'react';
import OpenAI from 'openai';
import { Gradient } from '@/data/gradients';
import { Sparkles, Upload, Wand2, Loader2 } from 'lucide-react';

interface AIGradientGeneratorProps {
  onGradientGenerated: (gradient: Gradient) => void;
}

export default function AIGradientGenerator({ onGradientGenerated }: AIGradientGeneratorProps) {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');

  // Generador local como fallback
  const generateLocalGradient = (desc: string): Gradient => {
    const colorPalettes: { [key: string]: string[] } = {
      'sunset': ['#ff6b35', '#f7931e'],
      'ocean': ['#2193b0', '#6dd5ed'],
      'fire': ['#ff416c', '#ff4b2b'],
      'sky': ['#74b9ff', '#0984e3'],
      'forest': ['#11998e', '#38ef7d'],
      'night': ['#2c3e50', '#4a6741'],
    };

    const lowerDesc = desc.toLowerCase();
    let colors = ['#667eea', '#764ba2']; // Default

    for (const [keyword, palette] of Object.entries(colorPalettes)) {
      if (lowerDesc.includes(keyword)) {
        colors = palette;
        break;
      }
    }

    return {
      id: Date.now().toString(),
      name: `${desc} Gradient`,
      colors,
      direction: 'to right',
      css: `background: linear-gradient(to right, ${colors.join(', ')});`,
      description: `A beautiful gradient inspired by ${desc}, generated locally.`,
      tags: []
    };
  };

  // Initialize OpenAI
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  console.log('OpenAI API Key loaded:', apiKey ? 'Yes' : 'No');
  
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // Only for demo, use API routes in production
  });

  const generateFromDescription = async () => {
    if (!description.trim() || isGenerating) return;

    // Verificar API Key
    if (!apiKey || apiKey.trim() === '') {
      alert('API Key de OpenAI no configurada. Verifica tu archivo .env.local');
      return;
    }

    setIsGenerating(true);
    
    try {
      console.log('Generating gradient with OpenAI...');
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Economic and fast model
        messages: [
          {
            role: "system",
            content: "You are an expert CSS gradient designer. You always respond ONLY with valid JSON, without markdown or additional text."
          },
          {
            role: "user", 
            content: `Create a CSS gradient based on: "${description}"

Respond ONLY with this exact JSON format:
{
  "colors": ["#color1", "#color2"],
  "direction": "to right",
  "name": "Gradient name",
  "description": "Poetic description in English"
}

Requirements:
- Exactly 2-3 colors in valid hexadecimal format
- Creative and memorable name (maximum 20 characters)
- Poetic description of 15-25 words in English
- Direction can be: "to right", "to bottom", "45deg", "135deg"`
          }
        ],
        max_tokens: 500,
        temperature: 0.8
      });

      const responseText = completion.choices[0]?.message?.content || '';
      console.log('OpenAI Response:', responseText);
      
      // Clean and parse JSON
      let cleanedText = responseText.replace(/```json|```|`/g, '').trim();
      
      // Look for JSON if mixed with other content
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanedText = jsonMatch[0];
      }
      
      const gradientData = JSON.parse(cleanedText);
      
      // Validate that it has the necessary fields
      if (!gradientData.colors || !Array.isArray(gradientData.colors) || gradientData.colors.length < 2) {
        throw new Error('Invalid AI response: missing colors');
      }
      
      // Create gradient object
      const newGradient: Gradient = {
        id: Date.now().toString(),
        name: gradientData.name || `Gradient ${Date.now()}`,
        colors: gradientData.colors,
        direction: gradientData.direction || 'to right',
        css: `background: linear-gradient(${gradientData.direction || 'to right'}, ${gradientData.colors.join(', ')});`,
        description: gradientData.description || `Beautiful gradient inspired by ${description}`,
        tags: [] // Will be populated with existing system
      };
      
      onGradientGenerated(newGradient);
      setDescription('');
      
    } catch (error: any) {
      console.error('Error generating gradient with OpenAI:', error);
      
      let errorMessage = 'Error with OpenAI. Generated a gradient using local algorithm.';
      
      // Check for specific OpenAI error codes
      if (error?.status === 429) {
        errorMessage = '⚠️ OpenAI API: Quota exceeded\n\nSolutions:\n1. Check your billing at platform.openai.com\n2. Add payment method or increase limits\n3. For now we will use local generation';
      } else if (error?.status === 401) {
        errorMessage = '🔑 OpenAI API: Invalid key\n\nCheck that your API key is correct in .env.local\nUsing local generation for now.';
      } else if (error?.status === 500) {
        errorMessage = '🔧 OpenAI API: Service temporarily unavailable\n\nTry again in a few minutes.\nUsing local generation for now.';
      }
      
      // Local fallback
      console.log('Using local generator as fallback...');
      const localGradient = generateLocalGradient(description);
      onGradientGenerated(localGradient);
      setDescription('');
      
      alert(errorMessage);
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
    
    setIsGenerating(true);
    
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64 = reader.result as string;
          
          console.log('Analyzing image with OpenAI Vision...');
          
          const completion = await openai.chat.completions.create({
            model: "gpt-4o", // GPT-4 Vision for image analysis
            messages: [
              {
                role: "system",
                content: "You are an expert gradient designer. Analyze images and extract the most dominant colors to create beautiful gradients. Respond ONLY with valid JSON."
              },
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Analyze this image and extract the 2-3 most dominant and harmonious colors to create a CSS gradient.

Respond ONLY with this exact JSON format:
{
  "colors": ["#hex1", "#hex2"],
  "direction": "to right",
  "name": "Image-inspired name",
  "description": "Poetic description in English"
}

Requirements:
- 2-3 main colors from the image in hexadecimal
- Creative name based on what you see
- Description that captures the visual essence of the image`
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: base64
                    }
                  }
                ]
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          });

          const responseText = completion.choices[0]?.message?.content || '';
          console.log('OpenAI Vision Response:', responseText);
          
          // Clean and parse JSON
          let cleanedText = responseText.replace(/```json|```|`/g, '').trim();
          
          const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleanedText = jsonMatch[0];
          }
          
          const gradientData = JSON.parse(cleanedText);
          
          // Create gradient object
          const newGradient: Gradient = {
            id: Date.now().toString(),
            name: gradientData.name || `Image Gradient ${Date.now()}`,
            colors: gradientData.colors,
            direction: gradientData.direction || 'to right',
            css: `background: linear-gradient(${gradientData.direction || 'to right'}, ${gradientData.colors.join(', ')});`,
            description: gradientData.description || 'Image-inspired gradient',
            tags: []
          };
          
          onGradientGenerated(newGradient);
          setSelectedImage(null);
          
        } catch (apiError: any) {
          console.error('API Error:', apiError);
          
          let errorMessage = 'Error with OpenAI Vision. Image analysis function will be available soon.';
          
          if (apiError?.status === 429) {
            errorMessage = '⚠️ OpenAI API: Quota exceeded\n\nFor image analysis you need:\n1. Available credits in your account\n2. Access to the gpt-4o model\n\nCheck your billing at platform.openai.com';
          }
          
          alert(errorMessage);
          setSelectedImage(null);
        }
      };
      
      reader.readAsDataURL(selectedImage);
      
    } catch (error) {
      console.error('Error generating image gradient:', error);
      alert('Error processing the image.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">AI Gradient Generator</h2>
      </div>

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
              placeholder="E.g.: A beach sunset, northern lights, burning fire, deep ocean..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
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
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Gradient
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isGenerating}
              />
              <label htmlFor="image-upload" className="cursor-pointer">
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
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Generate from Image
              </>
            )}
          </button>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 <strong>Tip:</strong> Be specific in your descriptions. Example: &ldquo;Warm mountain sunset&rdquo; generates better results than just &ldquo;nice colors&rdquo;.
        </p>
      </div>
    </div>
  );
}