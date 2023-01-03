import { sanityClient } from "../lib/sanity"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import {
  useNextSanityImage,
  UseNextSanityImageOptions,
} from "next-sanity-image"

/**
 * Convenient wrapper to utilize next sanity image with the sanity
 * client already included. Options should only need to be used to customize the image builder
 * in unique uses, should work for most use cases out of the box.
 */
export const useSanityImage = (
  image: SanityImageSource,
  options?: UseNextSanityImageOptions
) => {
  return useNextSanityImage(sanityClient, image, options)
}
