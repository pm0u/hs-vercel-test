// Not sure if we should have the UI lib build itself? this gives us an easy start though...
const withTM = require("next-transpile-modules")([
  "@joinhandshake/ui-components",
])

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn.sanity.io",
        protocol: "https",
        pathname: `images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
      },
    ],
  },
}

module.exports = withTM(nextConfig)
