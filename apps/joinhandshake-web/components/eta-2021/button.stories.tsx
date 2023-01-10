import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2021Button } from "./button"

const story: ComponentMeta<typeof ETA2021Button> = {
  title: "Components/Button",
  component: ETA2021Button,
}

export default story

const Template: ComponentStory<typeof ETA2021Button> = (args) => (
  <div className="mx-auto w-min">
    <ETA2021Button {...args} />
  </div>
)

export const Blue = Template.bind({})

Blue.args = {
  children: "See if you've won",
  color: "blue",
  size: "large",
  href: "",
}

export const Green = Template.bind({})

Green.args = {
  children: "Watch the event",
  color: "green",
  size: "large",
  href: "",
}

export const WhiteSmall = Template.bind({})

WhiteSmall.args = {
  children: "See the winners",
  color: "white",
  size: "small",
  href: "",
}

export const Yellow = Template.bind({})

Yellow.args = {
  children: "Share on LinkedIn!",
  color: "yellow",
  size: "large",
  href: "",
}
