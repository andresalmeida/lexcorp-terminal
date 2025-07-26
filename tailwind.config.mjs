/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Nueva paleta retrofuturista principal (inspirada en tech espacial)
        retro: {
          primary: '#10367D',    // Azul espacial profundo
          accent: '#74B4DA',     // Azul claro elegante
          secondary: '#1B4F9E',  // Azul medio espacial
          dark: '#0A1A3A',       // Azul muy oscuro espacial
          light: '#EBEBEB',      // Gris tech claro
          surface: '#1A2744',    // Superficie azul oscuro
          border: '#2A4A7D',     // Bordes azul medio
        },
        // Paleta de terminal legacy (para chats)
        terminal: {
          bg: '#0D2F2B',
          text: '#33FF66',
          accent: '#33FC2',
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
        mono: ['Space Mono', 'IBM Plex Mono', 'monospace'],
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
          }
        },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #10367D 0%, #1B4F9E 50%, #74B4DA 100%)',
        'space-gradient': 'radial-gradient(ellipse at center, #10367D 0%, #0A1A3A 70%)',
        'terminal-glow': 'linear-gradient(90deg, transparent, #74B4DA, transparent)',
      }
    },
  },
  plugins: [],
} 