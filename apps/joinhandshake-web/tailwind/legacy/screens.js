const { prefixTailwindClasses } = require("../libs")
const defaultScreens = require("tailwindcss/defaultConfig").theme.screens

const legacyScreens = {
  ...defaultScreens,
  /* @see https://tailwindcss.com/docs/screens#configuring-custom-screens */
  xs: "475px",
  sm: "600px",
  md: "834px",
  lg: "1200px",
  xl: "1440px",
}

module.exports = {
  legacyScreens: prefixTailwindClasses(legacyScreens, "legacy-"),
}
