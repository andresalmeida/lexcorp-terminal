# Guía para Imágenes Open Graph

## Imágenes necesarias para SEO perfecto:

### 1. `/public/og-image.jpg` (Página principal)
- **Tamaño:** 1200x630 píxeles
- **Contenido sugerido:**
  - Screenshot del terminal principal
  - Logo LEXCORP
  - Tu nombre: "Andrés Almeida"
  - Texto: "Full Stack Developer & Data Analyst"
  - Colores del tema terminal (#0D2F2B, #33FF66)

### 2. `/public/og-portfolio.jpg` (Página portafolio)
- **Tamaño:** 1200x630 píxeles  
- **Contenido sugerido:**
  - Screenshot del terminal de portafolio
  - Texto: "Portfolio Profesional"
  - Lista de tecnologías: React, Python, R, Shiny
  - Mismo esquema de colores

### 3. Herramientas para crear:
- **Canva:** Templates para Open Graph
- **Figma:** Diseño personalizado
- **Screenshot + edición:** Captura del terminal + texto

### 4. Alternativa temporal:
Si no tienes las imágenes listas, puedes:
1. Comentar las líneas `og:image` temporalmente
2. Usar un generador online como: https://opengraph.xyz/
3. O usar una imagen placeholder del logo

### 5. Cómo implementar:
1. Crea las imágenes con el tamaño correcto
2. Súbelas a `/public/og-image.jpg` y `/public/og-portfolio.jpg`
3. Las rutas en los meta tags ya están configuradas

### 6. Testear Open Graph:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Twitter Card Validator: https://cards-dev.twitter.com/validator 