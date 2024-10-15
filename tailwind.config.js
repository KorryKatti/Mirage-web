/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-blue': 'rgb(27, 31, 56)',
        'custom-pink': 'rgb(255, 71, 126)',
      },
      fontFamily: {
        sora: ['Sora', 'sans-serif'], 
        manrope: ['Manrope', 'sans-serif'], 
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
