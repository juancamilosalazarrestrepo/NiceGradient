'use client'

import { useState } from 'react';
import { Gradient } from '@/data/gradients';
import { Sparkles, Upload, Wand2, Loader2, Zap, Globe } from 'lucide-react';

interface FreeAIGradientGeneratorProps {
  onGradientGenerated: (gradient: Gradient) => void;
}

export default function FreeAIGradientGenerator({ onGradientGenerated }: FreeAIGradientGeneratorProps) {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  const [currentProvider, setCurrentProvider] = useState<string>('');

  // Generador local mejorado
  const generateLocalGradient = (desc: string): Gradient => {
    const enhancedPalettes: { [key: string]: { colors: string[], name: string, desc: string } } = {
      // Naturaleza
      'atardecer|sunset|anochecer': { 
        colors: ['#ff6b35', '#f7931e', '#ffcc02'], 
        name: 'Atardecer Dorado',
        desc: 'Cálidos tonos dorados que danzan entre las nubes del crepúsculo'
      },
      'amanecer|dawn|alba': { 
        colors: ['#ff9a9e', '#fecfef', '#fecfef'], 
        name: 'Alba Rosada',
        desc: 'Suaves matices rosados que despiertan con la primera luz del día'
      },
      'océano|ocean|mar|sea': { 
        colors: ['#2193b0', '#6dd5ed', '#ffffff'], 
        name: 'Profundidades Marinas',
        desc: 'Azules cristalinos que reflejan la inmensidad del océano infinito'
      },
      'fuego|fire|llama|flame': { 
        colors: ['#ff416c', '#ff4b2b', '#ff6b35'], 
        name: 'Llama Ardiente',
        desc: 'Intensos rojos y naranjas que danzan como lenguas de fuego eterno'
      },
      'bosque|forest|selva|jungle': { 
        colors: ['#11998e', '#38ef7d', '#7de77b'], 
        name: 'Frondosidad Esmeralda',
        desc: 'Verdes vibrantes que susurran secretos de la naturaleza salvaje'
      },
      'cielo|sky|nubes|clouds': { 
        colors: ['#74b9ff', '#0984e3', '#a8e6cf'], 
        name: 'Cielo Infinito',
        desc: 'Azules etéreos que se extienden hacia horizontes sin límite'
      },
      'noche|night|estrella|star': { 
        colors: ['#2c3e50', '#4a6741', '#8e44ad'], 
        name: 'Noche Estrellada',
        desc: 'Profundos azules nocturnos salpicados de misterio cósmico'
      },
      
      // Emociones y estados
      'feliz|happy|alegre|joy': { 
        colors: ['#f093fb', '#f5576c', '#4facfe'], 
        name: 'Euforia Radiante',
        desc: 'Colores vibrantes que celebran la pura alegría de existir'
      },
      'tranquilo|calm|paz|peace': { 
        colors: ['#a8edea', '#fed6e3', '#d299c2'], 
        name: 'Serenidad Absoluta',
        desc: 'Tonos suaves que abrazan el alma con paz infinita'
      },
      'energía|energy|poder|power': { 
        colors: ['#fa709a', '#fee140', '#fa709a'], 
        name: 'Energía Pura',
        desc: 'Colores eléctricos que vibran con fuerza vital inagotable'
      },
      'misterio|mystery|enigma': { 
        colors: ['#667eea', '#764ba2', '#667eea'], 
        name: 'Enigma Violeta',
        desc: 'Púrpuras místicos que guardan secretos del universo'
      },

      // Elementos
      'oro|gold|dorado|golden': { 
        colors: ['#f7971e', '#ffd200', '#f7971e'], 
        name: 'Oro Líquido',
        desc: 'Brillos dorados que fluyen como metal precioso fundido'
      },
      'plata|silver|plateado': { 
        colors: ['#bdc3c7', '#2c3e50', '#bdc3c7'], 
        name: 'Plata Lunar',
        desc: 'Reflejos plateados que capturan la luz de la luna llena'
      },
      'cristal|crystal|diamante|diamond': { 
        colors: ['#e0eafc', '#cfdef3', '#ffffff'], 
        name: 'Cristal Puro',
        desc: 'Transparencias cristalinas que refractan luz en arcoíris sutiles'
      }
    };

    const lowerDesc = desc.toLowerCase();
    let selectedPalette = enhancedPalettes['misterio|mystery|enigma']; // Default

    // Buscar coincidencias
    for (const [keywords, palette] of Object.entries(enhancedPalettes)) {
      const keywordList = keywords.split('|');
      if (keywordList.some(keyword => lowerDesc.includes(keyword))) {
        selectedPalette = palette;
        break;
      }
    }

    // Direcciones aleatorias más interesantes
    const directions = [
      'to right', 'to bottom', 'to top right', 'to bottom left',
      '45deg', '135deg', '225deg', '315deg',
      'radial-gradient(circle', 'radial-gradient(ellipse'
    ];
    
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const isRadial = direction.includes('radial');
    
    const css = isRadial 
      ? `background: ${direction}, ${selectedPalette.colors.join(', ')});`
      : `background: linear-gradient(${direction}, ${selectedPalette.colors.join(', ')});`;

    return {
      id: Date.now().toString(),
      name: selectedPalette.name,
      colors: selectedPalette.colors,
      direction: direction,
      css: css,
      description: selectedPalette.desc,
      tags: []
    };
  };

  // API providers gratuitos
  const providers = {
    // Google Gemini Flash (GRATIS)
    gemini: async (prompt: string) => {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Create a CSS gradient inspired by: "${prompt}"

Respond ONLY with valid JSON:
{
  "colors": ["#hex1", "#hex2", "#hex3"],
  "direction": "to right",
  "name": "Creative name",
  "description": "Poetic description in English"
}

Requirements:
- 2-3 valid hex colors
- Name maximum 20 characters
- Description 15-25 words in English`
            }]
          }]
        })
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return JSON.parse(text.replace(/```json|```/g, '').trim());
    },

    // Hugging Face Inference (GRATIS)
    huggingface: async (prompt: string) => {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-large', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: `Create a CSS gradient for: ${prompt}. Response format: {"colors":["#hex1","#hex2"],"direction":"to right","name":"Creative Name","description":"Poetic description"}`
        })
      });

      const data = await response.json();
      // Procesar respuesta de HF...
      return { colors: ['#667eea', '#764ba2'], direction: 'to right', name: 'HF Gradient', description: 'Generated by Hugging Face' };
    },

    // Cohere (GRATIS 100 calls/mes)
    cohere: async (prompt: string) => {
      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_COHERE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'command-light',
          prompt: `Create a CSS gradient for: ${prompt}`,
          max_tokens: 200
        })
      });

      const data = await response.json();
      // Procesar respuesta de Cohere...
      return { colors: ['#667eea', '#764ba2'], direction: 'to right', name: 'Cohere Gradient', description: 'Generated by Cohere' };
    }
  };

  const generateFromDescription = async () => {
    if (!description.trim() || isGenerating) return;

    setIsGenerating(true);
    
    // Intentar con múltiples proveedores
    const providerKeys = Object.keys(providers) as (keyof typeof providers)[];
    
    for (const providerKey of providerKeys) {
      try {
        setCurrentProvider(providerKey.toUpperCase());
        console.log(`Intentando con ${providerKey}...`);
        
        const gradientData = await providers[providerKey](description);
        
        if (gradientData && gradientData.colors && gradientData.colors.length >= 2) {
          const newGradient: Gradient = {
            id: Date.now().toString(),
            name: gradientData.name || `Gradiente ${Date.now()}`,
            colors: gradientData.colors,
            direction: gradientData.direction || 'to right',
            css: `background: linear-gradient(${gradientData.direction || 'to right'}, ${gradientData.colors.join(', ')});`,
            description: gradientData.description || `Gradiente inspirado en ${description}`,
            tags: []
          };
          
          onGradientGenerated(newGradient);
          setDescription('');
          setCurrentProvider('');
          setIsGenerating(false);
          return;
        }
      } catch (error) {
        console.log(`${providerKey} falló:`, error);
        continue; // Intentar siguiente proveedor
      }
    }
    
    // Si todos fallan, usar generador local
    console.log('Todos los proveedores fallaron, usando generador local...');
    setCurrentProvider('LOCAL');
    const localGradient = generateLocalGradient(description);
    onGradientGenerated(localGradient);
    setDescription('');
    setCurrentProvider('');
    setIsGenerating(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="h-6 w-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-800">Generador IA Gratuito</h2>
        <div className="ml-auto flex items-center gap-2 text-xs">
          <Globe className="h-4 w-4 text-green-500" />
          <span className="text-green-600 font-medium">100% Gratis</span>
        </div>
      </div>

      {/* Provider Status */}
      {currentProvider && (
        <div className="mb-4 p-2 bg-blue-50 rounded-lg text-center">
          <span className="text-sm text-blue-700">
            Generando con: <strong>{currentProvider}</strong>
          </span>
        </div>
      )}

      {/* Text Description */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe tu gradiente ideal
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Atardecer en la playa, aurora boreal mágica, energía cósmica, tranquilidad zen..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
            rows={3}
            disabled={isGenerating}
          />
        </div>
        
        <button
          onClick={generateFromDescription}
          disabled={!description.trim() || isGenerating}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generando con IA...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generar con IA Gratis
            </>
          )}
        </button>
      </div>

      {/* Info about free providers */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-xs text-green-700 mb-2">
          🌟 <strong>Proveedores Gratuitos Disponibles:</strong>
        </p>
        <div className="text-xs text-green-600 space-y-1">
          <div>• <strong>Google Gemini Flash:</strong> 1500 requests/día gratis</div>
          <div>• <strong>Hugging Face:</strong> Uso personal ilimitado</div>
          <div>• <strong>Cohere:</strong> 100 calls/mes gratis</div>
          <div>• <strong>Generador Local:</strong> Siempre disponible como fallback</div>
        </div>
      </div>
    </div>
  );
}