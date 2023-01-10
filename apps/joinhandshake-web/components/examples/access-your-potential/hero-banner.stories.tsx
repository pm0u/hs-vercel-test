import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { HeroBanner } from "./hero-banner"

const story: ComponentMeta<typeof HeroBanner> = {
  title: "AYP Hero Banner",
  component: HeroBanner,
}

export default story

const Template: ComponentStory<typeof HeroBanner> = (args) => (
  <HeroBanner {...args} />
)

export const Default = Template.bind({})

Default.args = {
  title: "Title Title",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
}
