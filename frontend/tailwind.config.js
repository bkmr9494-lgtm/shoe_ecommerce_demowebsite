/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090A0F',
        darkSurface: '#121420',
        electricCyan: '#00F0FF',
        neonViolet: '#9400D3',
        laserPink: '#FF007F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'btn': '12px',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.25)',
        'glow-violet': '0 0 20px rgba(148, 0, 211, 0.25)',
      }
    },
  },
  plugins: [],
}