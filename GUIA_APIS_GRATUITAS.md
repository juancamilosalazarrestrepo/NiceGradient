# 🆓 Guía de APIs Gratuitas para Nice Gradient

## 🎯 **Objetivo**
Esta guía te ayudará a obtener API keys gratuitas para generar gradientes con IA sin costo alguno.

---

## 🌟 **1. Google Gemini Flash (⭐ MÁS RECOMENDADO)**

### ✅ **Ventajas:**
- **Completamente gratuito**
- 15 requests por minuto
- 1,500 requests por día
- 1 millón de tokens por mes
- Muy rápido y preciso
- Multimodal (texto + imágenes)

### 📋 **Cómo obtener tu API Key:**
1. Ve a: **https://makersuite.google.com/app/apikey**
2. Inicia sesión con tu cuenta Google (o crea una)
3. Haz clic en **"Create API key"**
4. Copia tu API key
5. En tu archivo `.env.local`, descomenta y agrega:
   ```bash
   NEXT_PUBLIC_GEMINI_API_KEY=tu_api_key_aqui
   ```

---

## 🤗 **2. Hugging Face Inference API (♾️ ILIMITADO)**

### ✅ **Ventajas:**
- **Completamente gratuito para uso personal**
- Sin límites estrictos
- Muchos modelos disponibles
- Comunidad muy activa

### 📋 **Cómo obtener tu token:**
1. Ve a: **https://huggingface.co/settings/tokens**
2. Crea una cuenta gratuita si no tienes
3. Haz clic en **"New token"**
4. Selecciona permisos de **"Read"**
5. Copia tu token
6. En tu archivo `.env.local`, descomenta y agrega:
   ```bash
   NEXT_PUBLIC_HF_API_KEY=hf_tu_token_aqui
   ```

---

## 💎 **3. Cohere (100 llamadas/mes gratis)**

### ✅ **Ventajas:**
- Plan gratuito permanente
- 100 llamadas por mes
- Muy buena calidad de respuestas
- Fácil de usar

### 📋 **Cómo obtener tu API Key:**
1. Ve a: **https://dashboard.cohere.ai/api-keys**
2. Regístrate con tu email
3. Ve a **"API Keys"** en el dashboard
4. Haz clic en **"Create API Key"**
5. Copia tu API key
6. En tu archivo `.env.local`, descomenta y agrega:
   ```bash
   NEXT_PUBLIC_COHERE_API_KEY=tu_api_key_aqui
   ```

---

## 🚀 **Cómo funciona el sistema híbrido**

### 🔄 **Fallback inteligente:**
1. **Intenta Gemini Flash** (más rápido y gratuito)
2. Si falla, **intenta Hugging Face** (ilimitado)
3. Si falla, **intenta Cohere** (100 calls/mes)
4. Si todo falla, **usa el generador local** (siempre funciona)

### 💡 **Recomendación:**
- **Configura al menos Gemini Flash** (es el mejor gratuito)
- **Opcionalmente agrega Hugging Face** como respaldo
- **El generador local siempre funcionará** aunque no tengas APIs

---

## ⚡ **Instalación rápida (5 minutos)**

### Paso 1: Obtener Gemini API Key
```bash
# 1. Ve a: https://makersuite.google.com/app/apikey
# 2. Crea API key
# 3. Copia la key
```

### Paso 2: Configurar en tu proyecto
```bash
# Edita tu archivo .env.local
NEXT_PUBLIC_GEMINI_API_KEY=tu_api_key_de_gemini
```

### Paso 3: ¡Listo!
```bash
# Reinicia tu servidor de desarrollo
npm run dev
```

---

## 📊 **Comparación de APIs gratuitas**

| API | Límite diario | Velocidad | Calidad | Multimodal |
|-----|---------------|-----------|---------|------------|
| **Gemini Flash** ⭐ | 1,500 req | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | ✅ Sí |
| **Hugging Face** | ♾️ Ilimitado | ⚡⚡ | ⭐⭐⭐⭐ | ❌ No |
| **Cohere** | 100 req | ⚡⚡⚡ | ⭐⭐⭐⭐ | ❌ No |
| **Local** | ♾️ Ilimitado | ⚡⚡⚡ | ⭐⭐⭐ | ❌ No |

---

## 🛠️ **Solución de problemas**

### ❓ **¿Qué pasa si no configuro ninguna API?**
- El generador local **siempre funciona**
- Tienes más de 20 paletas de colores predefinidas
- Genera gradientes hermosos basados en palabras clave

### ❓ **¿Puedo usar múltiples APIs al mismo tiempo?**
- ¡Sí! El sistema automáticamente prueba todas las disponibles
- Si una falla, usa la siguiente automáticamente

### ❓ **¿Son realmente gratuitas?**
- **Sí**, todas las opciones listadas tienen planes gratuitos permanentes
- No requieren tarjeta de crédito para empezar

---

## 🎉 **¡Ya estás listo!**

Con cualquiera de estas APIs gratuitas podrás:
- ✅ Generar gradientes únicos con IA
- ✅ Describir colores con palabras naturales
- ✅ Crear paletas profesionales
- ✅ Tener fallback local siempre disponible

**¿Listo para crear gradientes increíbles? ¡Empieza con Gemini Flash!** 🚀