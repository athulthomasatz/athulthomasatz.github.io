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
        surface: '#12131a',
        'surface-container': '#1a1b22',
        accent: '#00f0ff',
        'text-secondary': '#a1a1aa',
      },
      transitionDuration: {
        250: '250ms',
      },
    },
  },
  plugins: [],
};
