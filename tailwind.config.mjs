/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
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
        }
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'glitch': 'glitch 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        }
      }
    },
  },
  plugins: [],
} 