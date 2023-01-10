import React from "react"
import { Picture } from "./picture"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof Picture> = {
  title: "Components/Picture",
  component: Picture,
}

export default story

const Template: ComponentStory<typeof Picture> = (args) => <Picture {...args} />

export const ArtDirectionMobileDesktop = Template.bind({})

ArtDirectionMobileDesktop.args = {
  alt: "Alt text",
  lazy: true,
  priority: true,
  sources: [
    {
      srcSet: `https://via.placeholder.com/200 200w,
               https://via.placeholder.com/300 300w,
               https://via.placeholder.com/400 400w,
               https://via.placeholder.com/500 500w,
               https://via.placeholder.com/600 600w,
               https://via.placeholder.com/700 700w,
               https://via.placeholder.com/800 800w`,
      width: 200,
      height: 200,
      breakpoint: "legacy-md",
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/100x700 100w,
               https://via.placeholder.com/200x1400 200w,
               https://via.placeholder.com/300x2100 300w,
               https://via.placeholder.com/400x2800 400w,
               https://via.placeholder.com/500x3500 500w`,
      width: 150,
      height: 700,
      sizes: "50vw",
    },
  ],
}

ArtDirectionMobileDesktop.storyName = "Art Direction (Mobile/Desktop)"

export const ArtDirectionMobileTabletDesktop = Template.bind({})

ArtDirectionMobileTabletDesktop.args = {
  alt: "Alt text",
  lazy: true,
  priority: true,
  sources: [
    {
      srcSet: `https://via.placeholder.com/150x200 150w,
               https://via.placeholder.com/300x400 300w,
               https://via.placeholder.com/450x600 450w,
               https://via.placeholder.com/600x800 600w,
               https://via.placeholder.com/750x1000 750w,
               https://via.placeholder.com/900x1200 900w`,
      width: 300,
      height: 400,
      breakpoint: "legacy-lg",
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/200 200w,
               https://via.placeholder.com/300 300w,
               https://via.placeholder.com/400 400w,
               https://via.placeholder.com/500 500w,
               https://via.placeholder.com/600 600w,
               https://via.placeholder.com/700 700w,
               https://via.placeholder.com/800 800w`,
      width: 200,
      height: 200,
      breakpoint: "legacy-md",
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/100x700 100w,
               https://via.placeholder.com/200x1400 200w,
               https://via.placeholder.com/300x2100 300w,
               https://via.placeholder.com/400x2800 400w,
               https://via.placeholder.com/500x3500 500w`,
      width: 100,
      height: 700,
      sizes: "50vw",
    },
  ],
}

ArtDirectionMobileTabletDesktop.storyName =
  "Art Direction (Mobile/Tablet/Desktop)"

export const WithCustomFallback = Template.bind({})

WithCustomFallback.args = {
  alt: "Alt text",
  lazy: true,
  priority: true,
  sources: [
    {
      srcSet: `https://via.placeholder.com/150x200 150w,
               https://via.placeholder.com/300x400 300w,
               https://via.placeholder.com/450x600 450w,
               https://via.placeholder.com/600x800 600w,
               https://via.placeholder.com/750x1000 750w,
               https://via.placeholder.com/900x1200 900w`,
      width: 300,
      height: 400,
      breakpoint: "legacy-lg",
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/200 200w,
               https://via.placeholder.com/300 300w,
               https://via.placeholder.com/400 400w,
               https://via.placeholder.com/500 500w,
               https://via.placeholder.com/600 600w,
               https://via.placeholder.com/700 700w,
               https://via.placeholder.com/800 800w`,
      width: 200,
      height: 200,
      breakpoint: "legacy-md",
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/100x700 100w,
               https://via.placeholder.com/200x1400 200w,
               https://via.placeholder.com/300x2100 300w,
               https://via.placeholder.com/400x2800 400w,
               https://via.placeholder.com/500x3500 500w`,
      width: 100,
      height: 700,
      sizes: "50vw",
    },
  ],
  fallbackImage: {
    src: "https://via.placeholder.com/1000x1000?text=Fallback+Image",
    width: 1000,
    height: 1000,
  },
}

export const WithCustomBreakpoints = Template.bind({})

WithCustomBreakpoints.args = {
  alt: "Alt text",
  lazy: true,
  priority: true,
  sources: [
    {
      srcSet: `https://via.placeholder.com/150x200 150w,
               https://via.placeholder.com/300x400 300w,
               https://via.placeholder.com/450x600 450w,
               https://via.placeholder.com/600x800 600w,
               https://via.placeholder.com/750x1000 750w,
               https://via.placeholder.com/900x1200 900w`,
      width: 300,
      height: 400,
      breakpoint: 1400,
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/200 200w,
               https://via.placeholder.com/300 300w,
               https://via.placeholder.com/400 400w,
               https://via.placeholder.com/500 500w,
               https://via.placeholder.com/600 600w,
               https://via.placeholder.com/700 700w,
               https://via.placeholder.com/800 800w`,
      width: 200,
      height: 200,
      breakpoint: 768,
      sizes: "50vw",
    },
    {
      srcSet: `https://via.placeholder.com/100x700 100w,
               https://via.placeholder.com/200x1400 200w,
               https://via.placeholder.com/300x2100 300w,
               https://via.placeholder.com/400x2800 400w,
               https://via.placeholder.com/500x3500 500w`,
      width: 100,
      height: 700,
      sizes: "50vw",
    },
  ],
}
