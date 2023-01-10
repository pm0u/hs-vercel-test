const nextConfig = require("./configs/next")
const createNextPluginPreval = require("next-plugin-preval/config")
const withNextPluginPreval = createNextPluginPreval()

// @ts-ignore
module.exports = withNextPluginPreval(nextConfig)
