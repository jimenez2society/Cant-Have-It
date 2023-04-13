/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      backgroundImage: {
        gradient: "linear-gradient(286.15deg, #F9623C 31.68%, #FF8162 96.39%);",
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
      colors: {
        primary: "#F1674F",
        secondary: "#FEFFF9",
        whiteFull: "#FFFAF9",
        inputBg: "#F8F8F8",
        whiteFaded: "#FFFFFF60",
        vegetarian: "#A8F895",
        vegan: "#E9FFBB",
        glutenFree: "#F8E295",
        popular: "#F9623C",
        cheap: "#95F8F2",
        dairyFree: "#6C5AAA",
      },
    },
  },
  plugins: [],
};
//
