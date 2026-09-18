/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        page: 'rgb(var(--color-page) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        shell: 'rgb(var(--color-shell) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        graphite: 'rgb(var(--color-graphite) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        line: 'rgb(var(--color-line) / <alpha-value>)',
        rule: 'rgb(var(--color-rule) / <alpha-value>)',
        bronze: 'rgb(var(--color-bronze) / <alpha-value>)',
        'bronze-hot': 'rgb(var(--color-bronze-hot) / <alpha-value>)',
        // Solid amber fill — constant across themes (see styles/tokens.css).
        amber: 'rgb(var(--color-amber) / <alpha-value>)',
        // Type that sits on an amber block — always near-black, never white.
        'on-amber': 'rgb(var(--on-amber) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 18px 44px rgba(0, 0, 0, 0.18)',
        plate: '0 24px 60px rgba(0, 0, 0, 0.32)',
      },
    },
  },
  plugins: [],
};
