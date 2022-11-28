const { colors } = require('../../configs/tailwind/main-brand')
const { spacing: legacySpacing } = require('../../configs/tailwind/legacy')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors,
    extend: {
      spacing: {
        ...legacySpacing,
      }
    }
  },
  plugins: [],
}
