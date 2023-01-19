const { prefixTailwindClasses } = require("../libs")
const defaultFontSizing = require("tailwindcss/defaultConfig").theme?.fontSize

const legacyFontSizing = {
  ...defaultFontSizing,
  "1.5xl": ["22px", "1.20"], // rb-headline-3
  "2.25xl": ["26px", "1.25"], // eta2021
  "3.5xl": ["32px", "1.15"], // rb-headline-2
  "4.5xl": ["40px", "1.2"], // eta2021
  "5xl": ["48px", "0.90"], // rb-headline-1-5
  "6.5xl": ["64px", "0.90"], // rb-headline-1
  body: ["22px", "1.4"], // rb-body-1
  text: ["18px", "1.4"], // rb-text-1
  "text-2": ["14px", "1.5"], // rb-text-2
  caption: ["12px", "1.2"], // rb-caption-1
}

module.exports = {
  legacyFontSize: prefixTailwindClasses(legacyFontSizing),
}
