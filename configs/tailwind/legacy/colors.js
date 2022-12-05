const { prefixTailwindClasses } = require("../libs")

const legacyColors = {
  coral: {
    500: '#FFC7B4',
    600: '#eeab94',
  },
  // 'red-dark': 'red-60', Deprecated: Use new main-brand red for any old versions of red //OLD - #d90202
  'midnight': '#0f1035',
  twilight: {
    300: '#2403af',
    600: '#190083',
    900: '#100056'
  },
  'yellow': '#f3e02b',
  'periwinkle': '#739BF3',
  'light-blue': '#d3f1f3',
  'purple': '#2E2880', //Change original purple variable to this 
  cream: '#F9F7F0',
  'blue-gray': {
    100: '#EBEFF4', // old 'cream-100'
    200: '#C2CCD4', // old 'grayish-blue'
  },
  gray: {
    900: '#2e2a2b', // black light on sketch file
    600: '#666666',// original color
    500: '#7a7a7a',
    400: '#959595', // gray light on sketch file
    300: '#b5b5b5',
    200: '#e9e9e9', // lightgray dark on sketch file
    100: '#f6f6f8', // lightgray on sketch file
    50: '#f9f9f9',
  },
  green: {
    700: '#026773',
    500: '#3AC07D',
    400: '#75D78A',
    300: '#74D789',
  },
  'lavendar': '#E4D4EF',
}

legacyColors.cream.DEFAULT = legacyColors.cream[200]
legacyColors.green.DEFAULT = legacyColors.green[500]
legacyColors.twilight.DEFAULT = legacyColors.twilight[600]
legacyColors.coral.DEFAULT = legacyColors.coral[500]
legacyColors.gray.DEFAULT = legacyColors.gray[600]
legacyColors['blue-gray'].DEFAULT = legacyColors['blue-gray'][200]

module.exports = { 
  legacyColors: prefixTailwindClasses(legacyColors, 'legacy-') 
}