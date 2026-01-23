/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
      },
      colors: {
        primary: '#1E1E1E',
        secondary: '#636363',
        'accent-green': '#01F701',
        'accent-blue': '#7F8AF4',
        'accent-yellow': '#F3F303',
      },
    },
  },
  plugins: [],
}
