import React from "react"
import { sanitySrcsetBuilder } from "../../../helpers/sanity/images"
import { Picture } from "../../../components/base"
import { useReusableImages } from "../../../contexts"

interface HeroBannerProps {
  title: string
  content: string
}

export const HeroBanner = ({ title, content }: HeroBannerProps) => {
  const { aypHeroBanner } = useReusableImages()
  const landscape = sanitySrcsetBuilder(aypHeroBanner.image, {
    fixedHeight: 500,
  })
  const portrait = sanitySrcsetBuilder(aypHeroBanner.image, {
    fixedAspectRatio: 1,
  })
  return (
    <section className="relative mb-legacy-12 h-[500px] w-full overflow-hidden">
      <Picture
        sources={[
          {
            srcSet: landscape.srcSet,
            width: landscape.width,
            height: landscape.height,
            breakpoint: "legacy-lg",
          },
          {
            srcSet: portrait.srcSet,
            width: portrait.width,
            height: portrait.height,
          },
        ]}
        alt=""
        className="min-w-full object-cover object-top legacy-lg:min-h-full"
        priority
      />
      <div className="container absolute top-0 left-0 right-0 bottom-0 z-10 mx-auto px-legacy-20">
        <section className="font-serif absolute left-1/2 bottom-legacy-9 w-fit bg-neutral-0 p-legacy-4 max-legacy-lg:w-11/12 max-legacy-lg:-translate-x-1/2 legacy-lg:left-legacy-8">
          <h1 className="lg:text-legacy-4xl mb-legacy-4 max-w-[13em] text-legacy-2xl font-bold">
            {title}
          </h1>
          <p className="max-w-[24em]">{content}</p>
        </section>
      </div>
    </section>
  )
}
