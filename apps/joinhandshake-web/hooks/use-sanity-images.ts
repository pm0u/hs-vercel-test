import { sanityClient } from "../lib/sanity"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import {
  useNextSanityImage,
  UseNextSanityImageOptions,
} from "next-sanity-image"

/**
 * Convenient wrapper to utilize next sanity image with the sanity
 * client already included for multiple images.
 *
 * Options should only need to be used to customize the image builder
 * in unique uses, should work for most use cases out of the box.
 *
 * @important This does include a footgun - hooks should not be called in loops/arrays (which this does).
 * If the image order will not change, this is safe. If the component using this hook passes a dynamic array,
 * there will be unexpected results.
 */
export const useSanityImages = (
  images: SanityImageSource[],
  options?: UseNextSanityImageOptions
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return images.map((image) => useNextSanityImage(sanityClient, image, options))
}
