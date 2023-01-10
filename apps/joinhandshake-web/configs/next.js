/**
 * Allows sharing of next config values, since the preval wrapper would prevent
 * importing the next config otherwise.
 * @type {import('next').NextConfig}
 */
module.exports = {
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 3840],
  },
}
