import React from "react"
import { PortableText } from "@portabletext/react"
import { Cta, ImageWithText, TextWidthBlock } from "../examples"

/**
 * This isn't exactly finalized, but can serve as an overall guide for how to accomplish this.
 * I think there would ideally be stronger typing for various components and the data coming from Sanity
 * rather than just `any`.
 *
 * Fields in the types object need to line up with the `id` on the sanity object.
 * @see apps/sanity/schemas/documents/example-access-your-potential.ts:38-43
 */

const components = {
  types: {
    imageWithText: ({ value: { content, image, layout } }: any) => (
      <ImageWithText
        content={<PortableText value={content} />}
        layout={layout}
        image={image}
        // @todo: add alt to schema
        alt={""}
      />
    ),
    ctaBlock: ({ value: { button, content } }: any) => {
      return (
        <Cta
          buttonText={button.buttonText}
          buttonType={button.buttonType}
          text={<PortableText value={content} />}
        />
      )
    },
    textWidth: ({ value: { content } }: any) => (
      <TextWidthBlock content={<PortableText value={content} />} />
    ),
  },
}

export const PortableTextBlocks = ({ value }: { value: any }) => {
  return <PortableText value={value} components={components} />
}
