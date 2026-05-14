/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        stone: 'rgb(var(--color-stone) / <alpha-value>)',
        'stone-soft': 'rgb(var(--color-stone-soft) / <alpha-value>)',
        graphite: 'rgb(var(--color-graphite) / <alpha-value>)',
        ash: 'rgb(var(--color-ash) / <alpha-value>)',
        paper: 'rgb(var(--color-paper) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        copper: 'rgb(var(--color-copper) / <alpha-value>)',
        coffee: 'rgb(var(--color-coffee) / <alpha-value>)',
        steel: 'rgb(var(--color-steel) / <alpha-value>)',
        black: 'rgb(var(--color-black) / <alpha-value>)',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        serif: ['Bebas Neue', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 24px 70px rgba(0, 0, 0, 0.32)',
      },
    },
  },
  plugins: [],
};
