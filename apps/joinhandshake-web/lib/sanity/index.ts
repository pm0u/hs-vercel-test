import { createClient } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"
import { config } from "./config"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: SanityImageSource) =>
  createImageUrlBuilder(config).image(source)

// Client for querying documents
export const sanityClient = createClient(config)
