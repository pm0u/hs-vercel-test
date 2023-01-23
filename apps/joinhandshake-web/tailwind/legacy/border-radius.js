const { prefixTailwindClasses } = require("../libs")
const defaultBorderRadius = require("tailwindcss/defaultConfig").theme
  .borderRadius

const legacyBorderRadius = {
  ...defaultBorderRadius,
}

module.exports = {
  legacyBorderRadius: prefixTailwindClasses(legacyBorderRadius, "legacy-", [
    "full",
    "none",
  ]),
}
