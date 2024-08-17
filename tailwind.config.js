/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0 0 0.125em var(--tw-shadow-color)",
        DEFAULT:
          "0 0 0.125em var(--tw-shadow-color), 0 0 0.2em var(--tw-shadow-color)",
        lg: "0 0 1em var(--tw-shadow-color), 0 0 0.2em var(--tw-shadow-color)",
      },
    },
    colors: {
      cyan: "#5efdf7",
      magenta: "#ff5dcc",
      yellow: "#fdfe89",
      white: "#ffffff",

      blue: {
        1: "#85daeb",
        2: "#5fc9e7",
        3: "#5fa1e7",
        4: "#5f6ee7",
        5: "#4c60aa",
        6: "#444774",
      },

      purple: {
        1: "#ca60ae",
        2: "#ab58a8",
        3: "#855395",
        4: "#5d4776",
        5: "#463c5e",
        6: "#32313b",
      },

      orange: {
        1: "#f5daa7",
        2: "#f3a787",
      },

      green: {
        1: "#8dd894",
        2: "#5dc190",
        3: "#4ab9a3",
        4: "#4593a5",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
