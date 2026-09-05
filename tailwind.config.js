/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#70BF4F',
          600: '#5ba83c',
          700: '#46892e',
          800: '#23391b',
        },
        saffron: {
          500: '#E65100',
          600: '#BF360C',
        },
        maroon: {
          800: '#4A0E17',
          900: '#2E080E',
        }
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
