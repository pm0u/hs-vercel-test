const { colors } = require("./tailwind/main-brand")
const {
  colors: legacyColors,
  screens: legacyScreens,
  spacing: legacySpacing,
} = require("./tailwind/legacy")
const { colors: eta2022Colors } = require("./tailwind/legacy/eta2022")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["components/**/*.{js,jsx,ts,tsx}", "pages/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    screens: {
      ...legacyScreens,
    },
    extend: {
      colors: {
        ...legacyColors,
        ...eta2022Colors,
      },
      spacing: {
        ...legacySpacing,
      },
    },
  },
  plugins: [],
}
