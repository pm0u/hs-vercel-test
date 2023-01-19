// @ts-check
/**
 * Takes a tailwind config section and "prefixes" with a passed in string
 * Default prefix is "legacy-" if it's not set when function is called
 * If prefix is for a single page or microsite, use the page/microsite name as the prefix
 * If prefix can be used sitewide use default "legacy-"
 * This is to preserve/namespace the full tailwind spacing system for the legacy sites
 *
 * Some tailwind defaults have a 'DEFAULT' key - in these cases you may want to "skipDefault" as in
 * skip prefixing this value. This would create `rounded-prefix-2 rounded-prefix` rather than
 * `rounded-prefix-2 rounded-prefix-DEFAULT`.
 *
 * @param tailwindConfigObject {Record<string,any>}
 * @returns {Record<string,any>}
 */

const prefixTailwindClasses = (
  tailwindConfigObject,
  prefix = "legacy-",
  skips = ["DEFAULT"]
) => ({
  ...Object.keys(tailwindConfigObject).reduce((prefixedClasses, key) => {
    return {
      ...prefixedClasses,
      ...(skips.includes(key)
        ? {
            [key === "DEFAULT" ? prefix.slice(0, -1) : key]:
              tailwindConfigObject[key],
          }
        : { [`${prefix}${key}`]: tailwindConfigObject[key] }),
    }
  }, {}),
})

module.exports = {
  prefixTailwindClasses,
}
