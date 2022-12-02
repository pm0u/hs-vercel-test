const { prefixTailwindClasses } = require("../libs")

const legacyColors = {
  'coral': '#ffc7b4',
  'coral-500': '#FFC7B4',
  'coral-600': '#eeab94',
  // 'red-dark': 'red-60', Deprecated: Use new main-brand red for any old versions of red //OLD - #d90202
  'midnight': '#0f1035',
  'twilight-300': '#2403af',
  'twilight': '#190083',
  'twilight-900': '#100056',
  
  'yellow': '#f3e02b',
  'periwinkle': '#739BF3',
  'light-blue': '#d3f1f3',
  'purple': '#2E2880', //Change original purple variable to this 
  'cream': '#F9F7F0',
  'cream-100': '#EBEFF4',
  
  'gray-900': '#2e2a2b', // black light on sketch file
  'gray-600': '#666666',// original color
  'gray-500': '#7a7a7a',
  'gray-400': '#959595', // gray light on sketch file
  'gray-300': '#b5b5b5',
  'gray-250': '#C2CCD4',
  'gray-200': '#e9e9e9', // lightgray dark on sketch file
  'gray-100': '#f6f6f8', // lightgray on sketch file
  'gray-50': '#f9f9f9',
  
  'green-700': '#026773',
  'green': '#3AC07D',
  'green-400': '#75D78A',
  'green-300': '#74D789',
  
  'lavendar': '#E4D4EF',
}

module.exports = { 
  legacyColors: prefixTailwindClasses(legacyColors, 'legacy-') 
}