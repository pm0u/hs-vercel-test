/**
 * @type {Record<string,PartialTailwindColorObject>}
 */
const colors = {
  red: {
    10: "#FFE9EB",
    20: "#FFCACF",
    30: "#FF929D",
    40: "#FF6272",
    50: "#FF2A40",
    60: "#A31C2A",
    70: "#700C16",
    80: "#450A10",
    90: "#250508",
  },
  lime: {
    10: "#F5FFD6",
    20: "#EAFFA5",
    30: "#D3FB52",
    40: "#93D030",
    50: "#60A31C",
    60: "#327D0F",
    70: "#155B0A",
    80: "#063C1B",
    90: "#052218",
  },
  blue: {
    10: "#E5EDFF",
    20: "#B4C9FF",
    30: "#729AFF",
    40: "#2E6AFF",
    50: "#194FD4",
    60: "#1942A7",
    70: "#12317D",
    80: "#0D2357",
    90: "#09173A",
  },
  neutral: {
    0: "#FFFFFF",
    10: "#F5F6FF",
    20: "#D4D6EC",
    30: "#B1B3CE",
    40: "#878AAE",
    50: "#606384",
    60: "#464862",
    70: "#323346",
    80: "#1F202C",
    90: "#14151C",
    100: "#000",
  },
  cyan: {
    10: "#E3FDFF",
    20: "#B1F8FF",
    30: "#7AF3FF",
    40: "#44C6D2",
    50: "#2195A0",
    60: "#116169",
    70: "#073D42",
    80: "#06292D",
    90: "#052326",
  },
  purple: {
    10: "#F5EDFF",
    20: "#DFC6FF",
    30: "#CDA5FF",
    40: "#BA83FF",
    50: "#9B53F6",
    60: "#7139B8",
    70: "#4A1A87",
    80: "#350E67",
    90: "#250A46",
  },
  magenta: {
    10: "#FFE2FB",
    20: "#FFB5F5",
    30: "#FF7BEE",
    40: "#FF3CE6",
    50: "#D129BC",
    60: "#A1108F",
    70: "#6A0B5E",
    80: "#4A0742",
    90: "#32062C",
  },
}

/**
 * Define defaults
 * Allows referencing these colors directly like `bg-magenta`
 */

colors.red.DEFAULT = colors.red[50]
colors.lime.DEFAULT = colors.lime[30]
colors.blue.DEFAULT = colors.blue[40]
colors.neutral.DEFAULT = colors.neutral[10]
colors.cyan.DEFAULT = colors.cyan[30]
colors.purple.DEFAULT = colors.purple[50]
colors.magenta.DEFAULT = colors.magenta[40]
colors.nori = {}
colors.nori.DEFAULT = colors.cyan[90]

/**
 * @type {{colors: Record<string,TailwindColorObject>}}
 */
module.exports = {
  colors,
}
