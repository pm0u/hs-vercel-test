import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2022SpaceBackground } from "./space-background"

const story: ComponentMeta<typeof ETA2022SpaceBackground> = {
  title: "Components/Space Background",
  component: ETA2022SpaceBackground,
}

export default story

const Template: ComponentStory<typeof ETA2022SpaceBackground> = ({
  className = "",
  ...args
}) => (
  <ETA2022SpaceBackground {...args}>
    <div className={`min-h-screen py-legacy-48 ${className}`}></div>
  </ETA2022SpaceBackground>
)

export const Short = Template.bind({})

export const Tall = Template.bind({})

Tall.args = {
  className: "h-[2000px]",
}

export const Taller = Template.bind({})

Taller.args = {
  className: "h-[3000px]",
}
