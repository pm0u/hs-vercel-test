import { createClient } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"
import { config } from "./config"
import {
  SanityImageSource,
  SanityProjectDetails,
} from "@sanity/image-url/lib/types/types"

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source: SanityImageSource) =>
  // This type coercion just assures that projectId and dataset are in fact defined
  createImageUrlBuilder(config as SanityProjectDetails).image(source)

// Client for querying documents
export const sanityClient = createClient(config)
