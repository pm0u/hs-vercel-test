const { prefixTailwindClasses } = require("../libs")
const defaultLetterSpacing = require("tailwindcss/defaultConfig").theme
  ?.letterSpacing

const legacyLetterSpacing = {
  ...defaultLetterSpacing,
  smtight: "-0.01em",
}

module.exports = {
  legacyLetterSpacing: prefixTailwindClasses(legacyLetterSpacing),
}
