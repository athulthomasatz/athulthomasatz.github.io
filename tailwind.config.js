/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        surface: '#000000',
        'surface-container': '#111111',
        'surface-elevated': '#1a1a1a',
        accent: '#ffffff',
        'text-secondary': '#888888',
        'text-tertiary': '#555555',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
};
