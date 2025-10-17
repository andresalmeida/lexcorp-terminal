# 📦 Archivos Extraídos para Proyecto Chat

Este documento lista todos los archivos que fueron removidos del portfolio principal y deben ser movidos al nuevo repositorio **superhero-ai-chat**.

---

## 📂 **Archivos Eliminados del Portfolio**

### **Páginas**
```
❌ src/pages/chat-dc.astro
❌ src/pages/chat-marvel.astro
❌ src/pages/index-backup.astro
❌ src/pages/api/chat.js
```

### **Componentes**
```
❌ src/components/CommandInterface.jsx
❌ src/components/EntityModal.jsx
❌ src/components/ModalManager.jsx
```

### **Servicios**
```
❌ src/services/geminiService.js
```

---

## 🆕 **Estructura del Nuevo Repositorio: superhero-ai-chat**

Estos archivos deben recrearse/copiarse en el nuevo repo:

```
superhero-ai-chat/
├── src/
│   ├── pages/
│   │   ├── index.astro           ← COMBINAR chat-dc + chat-marvel aquí
│   │   └── api/
│   │       └── chat.js           ← Copiar del viejo repo
│   ├── components/
│   │   ├── EntityModal.jsx       ← Copiar del viejo repo
│   │   ├── ModalManager.jsx      ← Copiar del viejo repo
│   │   └── CommandInterface.jsx  ← Copiar del viejo repo
│   └── services/
│       └── geminiService.js      ← Copiar del viejo repo
├── public/
│   ├── favicon.svg
│   ├── lexcorp-logo.svg
│   └── images/
│       ├── lex-luthor.jpg
│       ├── oracle-barbara.jpg
│       ├── superman.jpg
│       ├── sue-storm.jpg
│       ├── iron-man.jpg
│       └── captain-marvel.jpg
├── package.json
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 📝 **Cambios Necesarios para index.astro del Chat**

El nuevo `index.astro` debe combinar DC y Marvel en una sola página:

### **Opción 1: Una sola página con 6 personajes**

```astro
---
import '@fontsource/ibm-plex-mono';
import ModalManager from '../components/ModalManager.jsx';
import CommandInterface from '../components/CommandInterface.jsx';
---

<html lang="es">
  <head>
    <title>Chat IA - Superhéroes | Andrés Almeida</title>
    <!-- ... meta tags ... -->
  </head>
  <body>
    <!-- Boot Sequence -->
    <div id="boot-sequence">
      <div>Initializing Superhero Chat Terminal...</div>
      <div>Available characters: 6</div>
    </div>

    <!-- Grid con 6 personajes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- DC Universe -->
      <div id="lexcorp-entity">LEX LUTHOR</div>
      <div id="oracle-entity">ORACLE</div>
      <div id="superman-entity">SUPERMAN</div>
      
      <!-- Marvel Universe -->
      <div id="sue-entity">INVISIBLE WOMAN</div>
      <div id="ironman-entity">IRON MAN</div>
      <div id="captainmarvel-entity">CAPTAIN MARVEL</div>
    </div>

    <ModalManager client:load />
  </body>
</html>
```

---

## 🔧 **package.json para el Chat**

```json
{
  "name": "superhero-ai-chat",
  "type": "module",
  "version": "1.0.0",
  "description": "Chat interactivo con personalidades de superhéroes usando Gemini AI",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^3.6.2",
    "@astrojs/tailwind": "^5.1.1",
    "@astrojs/vercel": "^8.2.3",
    "@fontsource/ibm-plex-mono": "^5.2.6",
    "@google/generative-ai": "^0.24.1",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "astro": "^5.12.3",
    "framer-motion": "^11.11.17",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwindcss": "^3.4.14"
  }
}
```

---

## 🌍 **Variables de Entorno (.env.example)**

Crear archivo `.env.example`:

```env
# Google Gemini AI API Key
# Obtener en: https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_api_key_here
```

Y archivo `.env` (no commitear):

```env
GEMINI_API_KEY=tu-api-key-real-aqui
```

---

## 📄 **README.md para el Chat**

```markdown
# 🤖 Superhero AI Chat

Chat interactivo con personalidades de superhéroes DC y Marvel usando Gemini AI.

## 🦸 Personajes Disponibles

### DC Universe
- **Lex Luthor** - Tecnología empresarial y liderazgo
- **Oracle (Barbara Gordon)** - Programación y seguridad
- **Superman** - Esperanza y valores

### Marvel Universe  
- **Sue Storm** - Creatividad e innovación
- **Tony Stark** - Tecnología y emprendimiento
- **Captain Marvel** - Liderazgo y determinación

## 🚀 Demo en Vivo

[chat.adaghost.me](https://chat.adaghost.me)

## 💻 Tecnologías

- Astro 5
- React 18
- Tailwind CSS
- Google Gemini AI
- Framer Motion

## 🛠️ Instalación Local

\`\`\`bash
git clone https://github.com/tu-usuario/superhero-ai-chat.git
cd superhero-ai-chat
npm install

# Configurar API key
cp .env.example .env
# Editar .env con tu GEMINI_API_KEY

npm run dev
\`\`\`

## 📝 Licencia

MIT
```

---

## 🎯 **Próximos Pasos**

1. ✅ **Crear nuevo repositorio** en GitHub: `superhero-ai-chat`
2. ✅ **Copiar archivos** listados arriba
3. ✅ **Crear index.astro** combinado (opción 1)
4. ✅ **Configurar .env** con GEMINI_API_KEY
5. ✅ **Deploy** en Vercel
6. ✅ **Configurar subdominio** `chat.adaghost.me`
7. ✅ **Agregar link** en portfolio principal

---

## 🔗 **Integración con Portfolio**

En `src/pages/index.astro` del portfolio, actualizar el proyecto del chat:

```html
<!-- Proyecto 4 - ACTUALIZAR -->
<div class="bg-retro-primary/20 rounded-xl overflow-hidden border border-retro-accent/20 hover:border-retro-accent/50 transition-all duration-300 group">
  <div class="h-48 bg-tech-gradient relative overflow-hidden">
    <div class="absolute inset-0 bg-retro-dark/20 group-hover:bg-retro-dark/10 transition-all duration-300"></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-4xl text-retro-light">🤖</div>
    </div>
  </div>
  <div class="p-6">
    <h3 class="text-xl font-semibold text-retro-light mb-2">Chat IA - Superhéroes</h3>
    <p class="text-retro-light/70 mb-4">
      Sistema de chat con 6 personalidades únicas de DC y Marvel usando Gemini AI.
      Conversaciones contextuales con Lex Luthor, Oracle, Superman, Sue Storm, Iron Man y Captain Marvel.
    </p>
    <div class="flex gap-2 flex-wrap mb-4">
      <span class="px-2 py-1 bg-retro-accent/20 text-retro-accent text-xs rounded">React</span>
      <span class="px-2 py-1 bg-retro-accent/20 text-retro-accent text-xs rounded">Astro</span>
      <span class="px-2 py-1 bg-retro-accent/20 text-retro-accent text-xs rounded">Gemini AI</span>
      <span class="px-2 py-1 bg-retro-accent/20 text-retro-accent text-xs rounded">Framer Motion</span>
    </div>
    <div class="flex gap-2">
      <a href="https://chat.adaghost.me" target="_blank" 
         class="px-4 py-2 bg-retro-accent text-retro-dark rounded hover:bg-retro-accent/80 transition-colors text-sm font-semibold">
        Ver Demo →
      </a>
      <a href="https://github.com/tu-usuario/superhero-ai-chat" target="_blank"
         class="px-4 py-2 border border-retro-accent/40 text-retro-accent rounded hover:bg-retro-accent/10 transition-colors text-sm">
        GitHub
      </a>
    </div>
  </div>
</div>
```

---

## ✨ **Ventajas de Esta Arquitectura**

✅ **Portfolio limpio** - Solo muestra tus skills profesionales
✅ **Proyectos separados** - Cada uno con su propio repo y deploy
✅ **Escalable** - Fácil agregar más proyectos
✅ **Profesional** - Subdominios personalizados
✅ **Mantenible** - Cambios aislados por proyecto

---

**¿Preguntas?** Revisa `SUBDOMAIN_SETUP.md` para la configuración de Vercel.

