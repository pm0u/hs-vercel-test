// @ts-check
const { colors } = require("../../configs/tailwind/main-brand")
const {
  colors: legacyColors,
  screens: legacyScreens,
  spacing: legacySpacing,
} = require("../../configs/tailwind/legacy")
const {
  colors: eta2022Colors,
} = require("../../configs/tailwind/legacy/eta2022")
const path = require("path")

/**
 * Computes the path to the UI component library's component "containing directory"
 * This is dependent upon the entrypoint defined in the package.json for the UI components
 * and is a bit fragile.
 *
 * @returns {string}
 */
const getUiComponentPath = () => {
  const main = require.resolve("@joinhandshake/ui-components")
  const basename = path.basename(main)
  return path.relative(__dirname, main.replace(basename, ""))
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "components/**/*.{js,jsx,ts,tsx}",
    "pages/**/*.{js,jsx,ts,tsx}",
    `${getUiComponentPath()}/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    colors,
    extend: {
      colors: {
        ...legacyColors,
        ...eta2022Colors,
      },
      screens: {
        ...legacyScreens,
      },
      spacing: {
        ...legacySpacing,
      },
    },
  },
  plugins: [],
}
