import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { SpaceBackground as SpaceBackgroundComponent } from "./space-background"

const story: ComponentMeta<typeof SpaceBackgroundComponent> = {
  title: "Components/Space Background",
  component: SpaceBackgroundComponent,
}

export default story

const Template: ComponentStory<typeof SpaceBackgroundComponent> = ({
  className = "",
  ...args
}) => (
  <SpaceBackgroundComponent {...args}>
    <div className={`min-h-screen py-legacy-48 ${className}`}></div>
  </SpaceBackgroundComponent>
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
