const { prefixTailwindClasses } = require("../../libs")

/**
 * @type {Record<string,TailwindColorObject>}
 */
const eta2022Colors = {
  pink: {
    DEFAULT: "#F04588",
  },
  fuschia: {
    DEFAULT: "#C51770",
  },
  green: {
    DEFAULT: "#00dbd5",
  },
  orange: {
    DEFAULT: "#EF8009",
  },
  purple: {
    DEFAULT: "#0C0066",
  },
}

module.exports = {
  eta2022Colors: prefixTailwindClasses(eta2022Colors, { prefix: "eta2022-" }),
}
