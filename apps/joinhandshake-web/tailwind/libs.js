// @ts-check

/**
 *
 * @param {[string, string]} a
 * @param {[string, string]} b
 * @returns
 */
const sortStrings = (a, b) =>
  (a[1].includes("px") ? parseFloat(a[1]) / 16 : parseFloat(a[1])) -
  (b[1].includes("px") ? parseFloat(b[1]) / 16 : parseFloat(b[1]))

/**
 *
 * @param {[string, [string, string]]} a
 * @param {[string, [string, string]]} b
 * @returns
 */
const sortArrays = (a, b) =>
  (a[1][0].includes("px") ? parseFloat(a[1][0]) / 16 : parseFloat(a[1][0])) -
  (b[1][0].includes("px") ? parseFloat(b[1][0]) / 16 : parseFloat(b[1][0]))

/**
 *
 * @param {Record<string, string|[string, [string, string]]>} object
 * @returns
 */
const sortTailwindObject = (object) =>
  Object.entries(object)
    .sort((a, b) =>
      // @ts-ignore
      Array.isArray(a[1]) ? sortArrays(a, b) : sortStrings(a, b)
    )
    .reduce((entries, entry) => {
      entries[entry[0]] = entry[1]
      return entries
    }, /** @type {Record<string, string| [string, [string, string]]>} */ ({}))

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
 * @param options {{prefix?: string, skips?: string[], sort?: boolean }}
 * @returns {Record<string,any>}
 */

const prefixTailwindClasses = (
  tailwindConfigObject,
  { prefix = "legacy-", skips = ["DEFAULT"], sort = false } = {
    prefix: "legacy-",
    skips: ["DEFAULT"],
    sort: false,
  }
) => {
  return {
    ...Object.keys(
      sort ? sortTailwindObject(tailwindConfigObject) : tailwindConfigObject
    ).reduce((prefixedClasses, key) => {
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
  }
}

module.exports = {
  prefixTailwindClasses,
}
