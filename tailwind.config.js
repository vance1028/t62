/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        space: {
          900: '#0a0e1a',
          800: '#0f1525',
          700: '#151d33',
          600: '#1c2744',
        },
        nebula: {
          500: '#7c3aed',
          400: '#a78bfa',
          300: '#c4b5fd',
        },
        alert: {
          critical: '#ef4444',
          severe: '#f97316',
          moderate: '#eab308',
          mild: '#22c55e',
          safe: '#10b981',
        },
      },
      fontFamily: {
        display: ['Orbitron', 'monospace'],
        body: ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'expand-ring': 'expandRing 0.6s ease-out',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        expandRing: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
