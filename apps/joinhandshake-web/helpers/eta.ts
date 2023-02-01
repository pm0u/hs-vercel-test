import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { getImageDimensions } from "./sanity"

export const getLogoSizeClassification: (
  aspectRatio: number
) => "tall" | "square" | "wide" | "veryWide" = (aspectRatio) => {
  if (aspectRatio < 1) return "tall"
  if (aspectRatio >= 1 && aspectRatio < 1.4) return "square"
  if (aspectRatio >= 1.4 && aspectRatio < 4.6) return "wide"
  return "veryWide"
}

/**
 * returns the "size classifciation" and the aspect ratio of the image
 */
export const getLogoSize = (image: SanityImageObject) => {
  const { aspectRatio } = getImageDimensions(image.asset._ref)
  return {
    /** Size Classification */
    logoSize: getLogoSizeClassification(aspectRatio),
    /** Aspect Ratio */
    aspectRatio,
  }
}
