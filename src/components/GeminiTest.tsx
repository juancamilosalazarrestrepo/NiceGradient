'use client'

import { useState } from 'react';

export default function GeminiTest() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testBasic = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      console.log('=== DIAGNÓSTICO GEMINI ===');
      console.log('API Key presente:', !!apiKey);
      console.log('API Key primeros chars:', apiKey ? apiKey.substring(0, 10) + '...' : 'NO ENCONTRADA');
      
      if (!apiKey) {
        throw new Error('❌ API Key no encontrada en variables de entorno');
      }

      // Test básico con fetch directo - probando gemini-2.5-flash
      console.log('Iniciando test con REST API y gemini-2.5-flash...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Responde exactamente: GEMINI_2.5_FUNCIONA"
            }]
          }]
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta';
      setResult(text);
      
    } catch (error: any) {
      console.error('=== ERROR COMPLETO ===', error);
      setError(`${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testSDK = async () => {
    setLoading(true);
    setError('');
    setResult('');

    try {
      // Importación dinámica para debug
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API Key no configurada');
      }

      console.log('Testing con SDK gemini-2.5-flash...');
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const result = await model.generateContent("Responde: GEMINI_2.5_SDK_OK");
      const response = await result.response;
      const text = response.text();

      setResult(`SDK gemini-2.5-flash: ${text}`);
      
    } catch (error: any) {
      console.error('Error SDK:', error);
      setError(`SDK Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-yellow-100 rounded-lg border-2 border-yellow-300">
      <h3 className="text-xl font-bold mb-4 text-yellow-800">🔧 DIAGNÓSTICO GEMINI</h3>
      
      <div className="space-y-3">
        <div className="text-sm">
          <strong>API Key Status:</strong> {process.env.NEXT_PUBLIC_GEMINI_API_KEY ? '✅ Configurada' : '❌ No encontrada'}
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={testBasic}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Test REST API'}
          </button>
          
          <button 
            onClick={testSDK}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Test SDK'}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
          <h4 className="font-semibold text-green-800">✅ Éxito:</h4>
          <pre className="text-green-700 text-sm">{result}</pre>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h4 className="font-semibold text-red-800">❌ Error:</h4>
          <pre className="text-red-700 text-sm whitespace-pre-wrap">{error}</pre>
        </div>
      )}

      <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
        <p><strong>Instrucciones:</strong></p>
        <p>1. Abre F12 → Console para ver logs detallados</p>
        <p>2. Prueba &ldquo;Test REST API&rdquo; primero</p>
        <p>3. Si falla, verifica tu API key</p>
        <p>4. Si funciona, prueba &ldquo;Test SDK&rdquo;</p>
      </div>
    </div>
  );
}