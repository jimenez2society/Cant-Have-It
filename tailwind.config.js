/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./*.html", "./pages/*.html"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(286.15deg, #F9623C 31.68%, #F45B34 96.39%);",
      },
      borderRadius: {
        med: "5px",
      },
      borderColor: {
        grey: "#DBDBDB",
      },
      borderWidth: {
        med: "1px",
      },
      boxShadow: {
        small: "0px 2px 3px rgba(0, 0, 0, 0.25)",
        med: "0px 3px 7px rgba(0, 0, 0, 0.25)",
        large: " 0px 4px 15px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans],
        cormorant: ["Cormorant Garamond", "serif"],
      },

      colors: {
        primary: "#F96C44",
        secondary: "#FEFFF9",
        btnBlue: "#408CFF",
        whiteFull: "#FFFAF9",
        inputBg: "#F8F8F8",
        backdrop: "#26262660",
        whitePlaceholder: "#FFFFFF99",
        whiteFaded: "#FFFFFF60",
        whiteTransparent: "#FFFFFF25",
        vegetarian: "#A8F895",
        vegan: "#E9FFBB",
        glutenFree: "#F8E295",
        popular: "#F9623C",
        cheap: "#95F8F2",
        dairyFree: "#6C5AAA",
        hanisColor: "#6C5AAA60",
      },
    },
  },
  plugins: [],
};
//
