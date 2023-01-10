import React, { HTMLProps, ImgHTMLAttributes } from "react"
import { Config } from "tailwindcss"
import { useTheme } from "../../contexts"
import Head from "next/head"

interface PictureProps
  extends Partial<
    Omit<
      ImgHTMLAttributes<HTMLImageElement>,
      "width" | "height" | "src" | "srcSet" | "loading"
    >
  > {
  /**
   * Images to use at various media queries.
   * Images are expected to be sorted by their breakpoint, the smallest image is expected to have no breakpoint field,
   * indicating it is shown before any provided breakpoints are reached.
   * Image sources are matched "first match" so the order provided needs to take this into account - largest breakpoint first.
   * If a fallback src is not provided, the first image source is assumed to be the largest and will be used as the fallback.
   */
  sources: Source[]
  alt: string
  /** Use native lazy loading on the image */
  lazy?: boolean
  /** Default source for the image. If not provided the largest `source` is used */
  fallbackImage?: { src: string; width: number; height: number }
  /** If true, image will be preloaded */
  priority?: boolean
}

interface SourceProps {
  srcSet: NonNullable<HTMLProps<HTMLSourceElement>["srcSet"]>
  width: number
  height: number
  /** A sizes attribute, applied to the `<source>` element for the image. Defaults to 100vw if not provided  */
  sizes?: string
}

interface SourceWithCustomMedia extends SourceProps {
  /** custom media query */
  media: string
  breakpoint?: never
}

interface SourceWithBreakpoint extends SourceProps {
  /**
   * The breakpoint to show the image at, applied as `(min-width: ${breakpoint})` .
   * Breakpoints can be pixel numbers or a string that references a Tailwind defined breakpoint.
   */
  breakpoint: string | number
  media?: never
}

interface DefaultSource extends SourceProps {
  breakpoint?: never
  media?: never
}

type Source = SourceWithBreakpoint | SourceWithCustomMedia | DefaultSource

/**
 * Given a tailwind theme config and a breakpoint (either a PX number or tailwind breakpoint),
 * returns a PX number value for a given breakpoint. If no breakpoint provided, returns undefined.
 */
const getBreakpointNumber = (theme: Config, breakpoint?: string | number) => {
  if (typeof breakpoint === "undefined") {
    return
  }

  if (typeof breakpoint === "number") {
    return breakpoint
  }

  if (
    typeof theme.theme?.screens !== "undefined" &&
    breakpoint in theme.theme.screens
  ) {
    const tailwindBreakpoint = (theme.theme.screens as Record<string, string>)[
      breakpoint
    ]
    return Number(tailwindBreakpoint.replace("px", ""))
  }

  throw new Error(`Breakpoint not found in tailwind config: ${breakpoint}`)
}

/**
 * Creates a min width media query from a breakpoint value.
 * If no breakpoint provided returns undefined.
 */
const getMinWidthMedia = (theme: Config, breakpoint?: string | number) => {
  if (typeof breakpoint === "undefined") {
    return
  }
  return `(min-width: ${
    getBreakpointNumber(theme, breakpoint) as string | number
  }px)`
}

/**
 * Creates a media query based on the current source and the next largest source,
 * to load the current source up until the next largest source's breakpoint.
 */
const getMediaRange = (
  theme: Config,
  sources: Source[],
  currentSource: number
) => {
  const source = sources[currentSource]
  const nextSourceLarger = sources[currentSource - 1]
  const minQuery = getMinWidthMedia(theme, source.breakpoint)
  const maxQuery =
    typeof nextSourceLarger?.breakpoint !== "undefined"
      ? `(max-width: ${
          (getBreakpointNumber(theme, nextSourceLarger.breakpoint) as number) -
          0.1
        }px)`
      : undefined
  const join =
    typeof minQuery !== "undefined" && typeof maxQuery !== "undefined"
      ? " and "
      : ""
  return `${minQuery ?? ""}${join}${maxQuery ?? ""}`
}

/**
 * Creates as src fallback from a source using the srcSet attribute. Uses the last (largest) source in the srcset.
 */
const getFallback = (source: Source) => {
  const { srcSet, ...sourceWithoutSrcset } = source
  const sources = srcSet.split(",")
  const lastSource = sources[sources.length - 1]
  const src = lastSource.split(" ")[lastSource.split(" ").length - 2]
  return {
    ...sourceWithoutSrcset,
    src,
  }
}

/**
 * A Tailwind theme aware responsive picture component. Will utilize tailwind breakpoints for media queries,
 * obtaining breakpoints from `<ThemeProvider />`
 */
export const Picture = ({
  sources,
  lazy = true,
  fallbackImage,
  priority = false,
  ...props
}: PictureProps) => {
  const { theme } = useTheme()

  const mainImage = fallbackImage ?? getFallback(sources[0])

  return (
    <>
      {priority ? (
        <Head>
          {sources.map((source, i) => (
            <link
              rel="preload"
              as="image"
              imageSrcSet={source.srcSet}
              sizes={source.sizes ?? "100vw"}
              key={`${source.srcSet}${source.sizes ?? ""}`}
              media={getMediaRange(theme, sources, i)}
            />
          ))}
        </Head>
      ) : null}
      <picture>
        {sources.map((source) => (
          <source
            sizes={source.sizes ?? "100vw"}
            srcSet={source.srcSet}
            media={getMinWidthMedia(theme, source.breakpoint)}
            width={source.width}
            height={source.height}
            key={source.srcSet}
          />
        ))}
        {/** The alt attribute is included in `props` */}
        {/* eslint-disable jsx-a11y/alt-text */}
        <img {...mainImage} {...props} loading={lazy ? "lazy" : undefined} />
        {/* eslint-enable jsx-a11y/alt-text */}
      </picture>
    </>
  )
}
