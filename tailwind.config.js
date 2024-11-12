/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/src/**/*.{html,js,jsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        tan: "#D4A373",
        beige: "#FAEDCD",
        cream: "#FEFAE0",
        mint: "#E9EDC9",
        darkerMint: "#CCD5AE",
        darkestGreen: "#6b705c",
        lighterGreen: "#a5a58d",
      },
    },
  },
  plugins: [],
};
