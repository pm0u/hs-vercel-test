const { prefixTailwindClasses } = require("../libs")
const defaultLineHeight = require("tailwindcss/defaultConfig").theme?.lineHeight

const legacyLineHeight = {
  ...defaultLineHeight,
  "extra-tight": "0.90",
  "extra-relaxed": "1.75",
}

module.exports = {
  legacyLineHeight: prefixTailwindClasses(legacyLineHeight, "legacy-"),
}
