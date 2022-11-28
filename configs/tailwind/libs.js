//@ts-check
/**
 * Takes a tailwind config section and "prefixes" with the below prefix
 * This is to preserve/namespace the full tailwind spacing system for the legacy sites
 */
const prefix = "legacy-"

const prefixTailwindClasses = (tailwindConfigObject) => ({
  ...Object.keys(tailwindConfigObject).reduce((prefixedClasses, key) => {
    return {
      ...prefixedClasses,
      [`${prefix}${key}`]: tailwindConfigObject[key],
    }
  }, {}),
})

module.exports = {
  prefixTailwindClasses
}