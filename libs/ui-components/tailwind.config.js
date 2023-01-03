const { colors } = require("../../configs/tailwind/main-brand")
const {
  colors: legacyColors,
  screens: legacyScreens,
  spacing: legacySpacing,
} = require("../../configs/tailwind/legacy")
const {
  colors: eta2022Colors,
} = require("../../configs/tailwind/legacy/eta2022")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}", "styles/**/*.{js,jsx,ts,tsx}"],
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
      transitionDuration: {
        30: "30ms",
      },
    },
  },
  plugins: [],
}
