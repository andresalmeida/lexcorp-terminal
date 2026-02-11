/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        term: {
          black: '#0a0a0a',
          dark: '#111111',
          gray: '#1a1a1a',
          'gray-light': '#2a2a2a',
          green: '#00FF41',
          'green-dim': '#00cc33',
          amber: '#FFB000',
          cyan: '#00FFFF',
          pink: '#FF0080',
        },
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
