/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Paleta Street Urbana - Ferxxo Flow
        street: {
          black: '#0A0A0A',       // Negro profundo
          ferxxo: '#39FF14',      // Verde neón ferxxo
          purple: '#9D4EDD',      // Morado urbano
          purpleDark: '#5A189A',  // Morado profundo
          white: '#F0F0F0',       // Blanco
          surface: '#1A1A1A',     // Superficies/cards
          gray: '#2A2A2A',        // Gris medio
        },
        // Legacy paleta (mantener para 404)
        retro: {
          primary: '#10367D',
          accent: '#74B4DA',
          secondary: '#1B4F9E',
          dark: '#0A1A3A',
          light: '#EBEBEB',
          surface: '#1A2744',
          border: '#2A4A7D',
        },
        // Paleta de terminal legacy (para chats)
        terminal: {
          bg: '#0D2F2B',
          text: '#33FF66',
          accent: '#33FFC2',
          lexcorp: {
            primary: '#B22222',
            secondary: '#8B0000',
            glow: '#FF4444'
          },
          oracle: {
            primary: '#4B0082',
            secondary: '#6A5ACD',
            glow: '#9370DB'
          },
          sue: {
            primary: '#00BFFF',
            secondary: '#87CEEB',
            glow: '#00FFFF'
          }
        },
        // Colores para Los 4 Fantásticos
        fantastic: {
          reed: '#1E40AF',       // Azul ciencia
          sue: '#06B6D4',        // Cian invisible
          johnny: '#F97316',     // Naranja fuego
          ben: '#D97706',        // Naranja roca
        }
      },
      fontFamily: {
        // Fuentes Street/Urbanas
        display: ['Bebas Neue', 'Impact', 'sans-serif'],      // Títulos grandes
        graffiti: ['Permanent Marker', 'cursive'],            // Acentos graffiti
        body: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'], // Texto legible
        mono: ['Space Mono', 'IBM Plex Mono', 'monospace'],
        // Legacy
        sans: ['Orbitron', 'system-ui', 'sans-serif'],
        tech: ['Orbitron', 'sans-serif'],
      },
              animation: {
          'typing': 'typing 3.5s steps(40, end)',
          'blink': 'blink 1s step-end infinite',
          'glitch': 'glitch 2s infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 3s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
          'tech-glow': 'tech-glow 3s ease-in-out infinite alternate',
          'scan-line': 'scan-line 2s linear infinite',
          'data-flow': 'data-flow 4s linear infinite',
          'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
          'street-float': 'street-float 3s ease-in-out infinite',
        },
              keyframes: {
          typing: {
            'from': { width: '0' },
            'to': { width: '100%' }
          },
          blink: {
            '0%, 50%': { opacity: '1' },
            '51%, 100%': { opacity: '0' }
          },
          glitch: {
            '0%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-2px, 2px)' },
            '40%': { transform: 'translate(-2px, -2px)' },
            '60%': { transform: 'translate(2px, 2px)' },
            '80%': { transform: 'translate(2px, -2px)' },
            '100%': { transform: 'translate(0)' }
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' }
          },
          glow: {
            'from': { boxShadow: '0 0 5px #74B4DA, 0 0 10px #74B4DA, 0 0 15px #74B4DA' },
            'to': { boxShadow: '0 0 10px #74B4DA, 0 0 20px #74B4DA, 0 0 30px #74B4DA' }
          },
          'tech-glow': {
            'from': { 
              boxShadow: '0 0 5px #74B4DA, 0 0 10px #74B4DA, inset 0 0 5px #74B4DA',
              borderColor: '#74B4DA'
            },
            'to': { 
              boxShadow: '0 0 15px #74B4DA, 0 0 25px #74B4DA, inset 0 0 10px #74B4DA',
              borderColor: '#8BCAEF'
            }
          },
          'scan-line': {
            '0%': { transform: 'translateX(-100%)' },
            '100%': { transform: 'translateX(100%)' }
          },
          'data-flow': {
            '0%': { transform: 'translateY(100vh)', opacity: '0' },
            '10%': { opacity: '1' },
            '90%': { opacity: '1' },
            '100%': { transform: 'translateY(-100vh)', opacity: '0' }
          },
          'neon-pulse': {
            '0%, 100%': { 
              textShadow: '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14',
              filter: 'brightness(1)'
            },
            '50%': { 
              textShadow: '0 0 20px #39FF14, 0 0 30px #39FF14, 0 0 40px #39FF14',
              filter: 'brightness(1.2)'
            }
          },
          'street-float': {
            '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
            '50%': { transform: 'translateY(-15px) rotate(2deg)' }
          }
        },
      backgroundImage: {
        // Gradientes Street
        'street-gradient': 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #2A2A2A 100%)',
        'neon-gradient': 'linear-gradient(90deg, #39FF14 0%, #9D4EDD 100%)',
        'purple-gradient': 'linear-gradient(135deg, #5A189A 0%, #9D4EDD 100%)',
        // Legacy
        'tech-gradient': 'linear-gradient(135deg, #10367D 0%, #1B4F9E 50%, #74B4DA 100%)',
        'space-gradient': 'radial-gradient(ellipse at center, #10367D 0%, #0A1A3A 70%)',
        'terminal-glow': 'linear-gradient(90deg, transparent, #74B4DA, transparent)',
      },
      boxShadow: {
        'neon-green': '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 30px #39FF14',
        'neon-purple': '0 0 10px #9D4EDD, 0 0 20px #9D4EDD, 0 0 30px #9D4EDD',
        'street': '0 4px 20px rgba(57, 255, 20, 0.3)',
      }
    },
  },
  plugins: [],
} 