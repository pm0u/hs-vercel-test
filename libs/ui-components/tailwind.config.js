const { colors } = require('../../configs/tailwind/main-brand')
const { spacing: legacySpacing, colors: legacyColors } = require('../../configs/tailwind/legacy')
const { colors: eta2022Colors } = require('../../configs/tailwind/legacy/eta2022')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{js,jsx,ts,tsx}',
    'styles/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors,
    extend: {
      spacing: {
        ...legacySpacing,
      },
      colors: {
        ...legacyColors,
        ...eta2022Colors,
      }
    }
  },
  plugins: [],
}
