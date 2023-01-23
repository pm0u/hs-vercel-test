const nextConfig = require("./configs/next")
const createNextPluginPreval = require("next-plugin-preval/config")
const withNextPluginPreval = createNextPluginPreval()

let withBundleAnalyzer = (/** @type {any} */ args) => args

// test comment

if (process.env.ANALYZE === "true") {
  withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  })
}

module.exports = withNextPluginPreval(withBundleAnalyzer(nextConfig))
