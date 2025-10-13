/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#b60807',
          600: '#b60807',
          700: '#a00706',
          800: '#8a0605',
          900: '#740504',
        },
        roofRed: {
          DEFAULT: '#b60807',
          light: '#d00908',
          dark: '#a00706',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'premium-lg': '0 35px 60px -12px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}