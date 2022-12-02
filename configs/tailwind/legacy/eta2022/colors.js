const { prefixTailwindClasses } = require("../../libs")

const eta2022Colors = {
  "pink" : "#F04588",
  "fuschia" : "#C51770",
  "green" : "#00dbd5",
  "orange" : "#EF8009",
  "purple" : "#0C0066",
}

module.exports = {
  eta2022Colors : prefixTailwindClasses(eta2022Colors, 'eta2022-')
}