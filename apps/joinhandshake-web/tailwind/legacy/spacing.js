const { prefixTailwindClasses } = require("../libs")
const defaultSpacing = require("tailwindcss/defaultConfig").theme.spacing

const legacySpacing = {
  ...defaultSpacing,
  /**
   * add additional spacing values here...
   * DO NOT INCLUDE THE PREFIX
   * @see https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale
   * example:
   * '13': '3.25rem',
   */
  2.5: "10px",
}

module.exports = {
  legacySpacing: prefixTailwindClasses(legacySpacing, {
    skips: ["DEFAULT", "0", "px"],
    sort: true,
  }),
}
