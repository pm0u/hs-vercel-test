import React from "react"
import Image from "next/image"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { useSanityImage } from "hooks/use-sanity-image"

interface ImageWithTextProps {
  layout: "imageLeft" | "imageRight"
  image: SanityImageObject
  content: React.ReactNode
  alt: string
}

export const ImageWithText = ({
  content,
  image,
  layout,
  alt,
}: ImageWithTextProps) => {
  const imageProps = useSanityImage(image)
  const contents = [
    <div className="max-legacy-lg:pb-legacy-10 legacy-lg:w-1/2" key={0}>
      {content}
    </div>,
    <Image
      {...imageProps}
      alt={alt}
      key={1}
      className="max-legacy-lg:pb-legacy-10 legacy-lg:w-1/2"
    />,
  ]
  return (
    <section className="flex flex-col py-legacy-8 legacy-lg:flex-row legacy-lg:gap-legacy-12">
      {layout === "imageLeft" ? contents.reverse() : contents}
    </section>
  )
}
