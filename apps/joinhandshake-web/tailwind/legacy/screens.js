const { prefixTailwindClasses } = require("../libs")
const defaultScreens = require("tailwindcss/defaultConfig").theme.screens

const legacyScreens = {
  ...defaultScreens,
  /* @see https://tailwindcss.com/docs/screens#configuring-custom-screens */
  xs: "475px",
  sm: "600px",
  "sm-md": "750px", // eta 2021
  md: "834px",
  "md-lg": "1024px", // eta 2021
  lg: "1200px",
  xl: "1440px",
}

module.exports = {
  legacyScreens: prefixTailwindClasses(legacyScreens, { sort: true }),
}
