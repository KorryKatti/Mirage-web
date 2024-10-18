/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'], 
        inter: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'], // Add Sora font
      },
      colors: {
        'custom-blue': '#1b1f38', // Custom blue color
        'custom-gray': '#f8f9fa', // Add another color if needed
      },
    },
  },
  plugins: [],
};
