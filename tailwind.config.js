/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // если есть index.html в корне
    "./src/**/*.{js,ts,jsx,tsx}" // все компоненты React
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#4C1D95",
      },
    },
  },
  plugins: [],
};