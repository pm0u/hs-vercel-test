import { ClientConfig } from "next-sanity"

export const config: ClientConfig = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "staging",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: "2022-10-21", // Learn more: https://www.sanity.io/docs/api-versioning
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === "production",
  /**
   * Token is used to permit authenticated server side requests,
   * which allows retrieving drafts (for preview mode) and other
   * gated content. Not expected to be used on production.
   *
   * @see https://www.sanity.io/docs/ids
   */
  token: process.env.SANITY_API_TOKEN,
}
