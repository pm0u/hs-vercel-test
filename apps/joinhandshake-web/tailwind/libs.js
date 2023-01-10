// @ts-check
/**
 * Takes a tailwind config section and "prefixes" with a passed in string
 * Default prefix is "legacy-" if it's not set when function is called
 * If prefix is for a single page or microsite, use the page/microsite name as the prefix
 * If prefix can be used sitewide use default "legacy-"
 * This is to preserve/namespace the full tailwind spacing system for the legacy sites
 * @param tailwindConfigObject {Record<string,TailwindColorObject>}
 * @returns {Record<string,TailwindColorObject>}
 */

const prefixTailwindClasses = (tailwindConfigObject, prefix = "legacy-") => ({
  ...Object.keys(tailwindConfigObject).reduce((prefixedClasses, key) => {
    return {
      ...prefixedClasses,
      [`${prefix}${key}`]: tailwindConfigObject[key],
    }
  }, {}),
})

module.exports = {
  prefixTailwindClasses,
}
