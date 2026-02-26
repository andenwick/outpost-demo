/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        espresso: '#2C1810',
        cream: '#F5EDE0',
        parchment: '#EDE4D4',
        forest: '#2D4A3E',
        amber: '#C8860A',
        rust: '#8B4513',
        charcoal: '#1A1008',
        sage: '#8B9D83',
        warmGray: '#6B5E53',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Source Serif 4"', 'serif'],
        accent: ['"Josefin Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
