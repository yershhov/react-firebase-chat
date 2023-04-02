/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        raisinBlack: "#393748",
        mainDark: "#202020",
        deepDark: "#121212",
        primary: "#C56FFF",
      },
      fontFamily: {
        poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
        sourceSansPro: ['"Source Sans Pro"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: "class",
};
