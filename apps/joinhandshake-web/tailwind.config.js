const { colors } = require("./tailwind/main-brand")
const {
  colors: legacyColors,
  screens: legacyScreens,
  spacing: legacySpacing,
  fontSize: legacyFontSize,
  borderRadius: legacyBorderRadius,
  lineHeight: legacyLineHeight,
  letterSpacing: legacyLetterSpacing,
} = require("./tailwind/legacy")
const { colors: eta2022Colors } = require("./tailwind/legacy/eta2022")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "components/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
    "layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors,
    screens: {
      ...legacyScreens,
    },
    fontSize: legacyFontSize,
    spacing: legacySpacing,
    borderRadius: legacyBorderRadius,
    lineHeight: legacyLineHeight,
    letterSpacing: legacyLetterSpacing,
    fontFamily: {
      sansPlomb: ["var(--font-sans-plomb)"],
      noiGrotesk: ["var(--font-noi-grotesk)"],
    },
    extend: {
      colors: {
        ...legacyColors,
        ...eta2022Colors,
      },
    },
  },
  plugins: [],
}
