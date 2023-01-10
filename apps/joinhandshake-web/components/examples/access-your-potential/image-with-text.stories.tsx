import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ImageWithText } from "./image-with-text"
import { useDevImages } from "../../../contexts"

const story: ComponentMeta<typeof ImageWithText> = {
  title: "Image with Text",
  component: ImageWithText,
  parameters: {
    controls: {
      exclude: ["image", "alt"],
    },
  },
}

export default story

const Template: ComponentStory<typeof ImageWithText> = (args) => {
  const { _600 } = useDevImages()
  return (
    <div className="container mx-auto">
      <ImageWithText {...args} image={_600.image} alt={_600.descriptiveText} />
    </div>
  )
}

export const Default = Template.bind({})

Default.args = {
  content: (
    <p>
      <strong>Lorem ipsum dolor sit amet,</strong> consectetur adipiscing elit,
      sed do eiusmod tempor <i>incididunt ut labore et dolore magna aliqua.</i>{" "}
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
      aliquip ex ea commodo consequat
    </p>
  ),
  layout: "imageLeft",
}
