# Gradient Collection

Una hermosa colección de gradientes de colores construida con Next.js, TypeScript y Tailwind CSS, similar a UIGradients.

## 🎨 Características

- **Colección Curada**: Una selección cuidadosamente elegida de hermosos gradientes de colores
- **Creador de Gradientes**: Herramienta interactiva para crear gradientes personalizados
- **Generación de CSS**: Obtén el código CSS de cualquier gradiente con un clic
- **Diseño Responsive**: Funciona perfectamente en dispositivos móviles y de escritorio
- **Interfaz Moderna**: UI/UX limpia y moderna
- **Descarga de Imágenes**: Descarga gradientes como archivos PNG
- **Búsqueda**: Encuentra gradientes rápidamente por nombre

## 🛠️ Stack Tecnológico

- **Next.js 15** - Framework React para producción
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **React** - Biblioteca de JavaScript para interfaces de usuario

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18 o superior
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd gradient-collection
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para encontrar problemas

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página principal
├── components/
│   ├── GradientCard.tsx  # Componente de tarjeta de gradiente
│   ├── GradientDetails.tsx # Modal de detalles del gradiente
│   └── GradientMaker.tsx # Herramienta creador de gradientes
└── data/
    └── gradients.ts      # Datos de gradientes predefinidos
```

## 🎨 Cómo Usar

### Explorar Gradientes
- Navega por la colección de gradientes predefinidos
- Haz clic en cualquier gradiente para ver sus detalles
- Usa la barra de búsqueda para encontrar gradientes específicos

### Crear Gradientes Personalizados
1. Haz clic en "Create Gradient" para abrir el creador de gradientes
2. Ajusta los colores usando los selectores de color o introduciendo códigos HEX
3. Cambia la dirección del gradiente
4. Copia el código CSS generado o guarda tu gradiente personalizado

### Obtener Código CSS
- Pasa el mouse sobre cualquier gradiente y haz clic en "Get CSS"
- O abre los detalles del gradiente para más opciones

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Reconocimientos

- Inspirado por [UIGradients](https://uigradients.com/)
- Construido con amor usando Next.js y Tailwind CSS