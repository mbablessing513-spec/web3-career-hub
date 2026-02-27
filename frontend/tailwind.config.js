/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f9fafb',
          900: '#0f172a',
          950: '#08111a',
        },
        neon: {
          blue: '#00d4ff',
          purple: '#c084fc',
          pink: '#ff006e',
          green: '#00ff88',
        },
      },
      backdropBlur: {
        md: '10px',
      },
    },
  },
  plugins: [],
};