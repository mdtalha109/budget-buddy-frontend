/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1976d2',
          DEFAULT: '#302D43',
          dark: '#0d8ecf',
        },
        primaryMuted: {
          DEFAULT: '#373A40'
        },

        error: {
          DEFAULT: "#f44336"
        }
        
      }
    },
  },
  plugins: [],
}