const { prefixTailwindClasses } = require("../libs")
const defaultBorderRadius = require("tailwindcss/defaultConfig").theme
  .borderRadius

const legacyBorderRadius = {
  ...defaultBorderRadius,
  "2.5xl": "20px",
}

module.exports = {
  legacyBorderRadius: prefixTailwindClasses(legacyBorderRadius, {
    skips: ["full", "DEFAULT", "none"],
    sort: true,
  }),
}
