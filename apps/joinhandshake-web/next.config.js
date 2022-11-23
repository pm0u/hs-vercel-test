// Not sure if we should have the UI lib build itself? this gives us an easy start though...
const withTM = require('next-transpile-modules')(['@joinhandshake/ui-components'])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = withTM(nextConfig)
