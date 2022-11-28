const postcss = require("rollup-plugin-postcss")
const tailwindcss = require("tailwindcss")
const tailwindConfig = require("./tailwind.config.js")

/**
 * We have this build step so that we can conveniently export the styles
 * needed for these UI components for use in storybook. Anything that consumes
 * these UI components is expected to include them in it's content
 * array for tailwind and generate their own styles. It would be possible to also
 * rely upon the stylesheet generated here, but it is not recommended.
 */

module.exports = {
  input: "src/tailwind.css",
  output: [
    {
      file: "dist/style.css",
      format: "es",
      sourcemap: true,
    },
  ],
  external: ["react"],
  plugins: [
    postcss({
      extract: true,
      plugins: [tailwindcss(tailwindConfig)],
    }),
  ],
}
