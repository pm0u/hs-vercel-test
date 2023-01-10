import { SanityImageObject, FitMode } from "@sanity/image-url/lib/types/types"
import { urlFor } from "../../lib/sanity"
import { imageConfigDefault } from "next/dist/shared/lib/image-config"
import { images } from "../../configs/next"

const imageSizes: number[] =
  typeof (images as any).imageSizes === "undefined"
    ? imageConfigDefault.imageSizes
    : (images as any).imageSizes
const deviceSizes: number[] =
  typeof (images as any).deviceSizes === "undefined"
    ? imageConfigDefault.deviceSizes
    : (images as any).deviceSizes

interface SanityImageOptions {
  fixedAspectRatio?: number
  fit?: FitMode
  fixedHeight?: number
}

type SanityImageOptionsWithFit = SanityImageOptions &
  Required<Pick<SanityImageOptions, "fit">>

interface ImageDimensions {
  width: number
  height: number
  aspectRatio: number
}

const sizeImage = (
  size: number,
  image: SanityImageObject,
  options: SanityImageOptionsWithFit,
  dimensions: ImageDimensions
) => {
  const imageUrl = urlFor(image)
  if (typeof options.fixedHeight !== "undefined")
    return imageUrl
      .height(options.fixedHeight)
      .width(size)
      .fit(options.fit)
      .url()

  if (typeof options.fixedAspectRatio !== "undefined")
    return imageUrl
      .width(size)
      .height(size * options.fixedAspectRatio)
      .fit(options.fit)
      .url()

  return imageUrl.width(size).height(dimensions.height).fit(options.fit).url()
}

const getSrcsetForSizes = (
  sizes: number[],
  image: SanityImageObject,
  options: SanityImageOptionsWithFit,
  dimensions: ImageDimensions
) => {
  return sizes
    .map((size) => `${sizeImage(size, image, options, dimensions)} ${size}w`)
    .join(",")
}

/**
 * Stolen from 'next-sanity-image'
 * Gets image dimensions and aspect ratio from asset ID
 * These are guaranteed by sanity to be constant
 * @see https://www.sanity.io/docs/image-urls
 */
const getImageDimensions = (id: string) => {
  const dimensions = id.split("-")[2]
  const [width, height] = dimensions.split("x").map((num) => parseInt(num, 10))
  const aspectRatio = width / height
  return { width, height, aspectRatio }
}

/**
 * Used to build our own srcset that will match next/image.
 * Restricts sizes to not exceed the intrinsic width and height of the image provided.
 * If unspecified, options.fit will default to crop and intrinsic aspect ratio will be used.
 * Fixed height will take precedence over a fixed aspect ratio.
 */
export const sanitySrcsetBuilder = (
  image: SanityImageObject,
  options: SanityImageOptions = {}
) => {
  const dimensions = getImageDimensions(image.asset._ref)
  const sizes = [...imageSizes, ...deviceSizes]
    .filter(
      (size) =>
        size <= dimensions.width &&
        size / dimensions.aspectRatio <= dimensions.height
    )
    .sort((a, b) => a - b)
  const srcSet = getSrcsetForSizes(
    sizes,
    image,
    { fit: "crop", ...options },
    dimensions
  )

  return {
    srcSet,
    width: dimensions.width,
    height: options.fixedHeight ?? dimensions.height,
  }
}
