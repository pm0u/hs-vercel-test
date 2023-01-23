import React from "react"
import { ETA2022HighlightIcons } from "./highlight-icons"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof ETA2022HighlightIcons> = {
  title: "Components/Highlight Icon",
  component: ETA2022HighlightIcons,
  parameters: {
    controls: {
      exclude: ["className"],
    },
  },
  argTypes: {
    variant: {
      name: "Highlight icon",
      // Prefer to use select over radio button since we will end up with many choices
      control: "select", // Automatically inferred when 'options' is defined
    },
  },
}

export default story

const Template: ComponentStory<typeof ETA2022HighlightIcons> = (args) => (
  <div className="bg-nori p-legacy-4">
    <ETA2022HighlightIcons {...args} />
  </div>
)

export const Challenging = Template.bind({})

Challenging.args = {
  variant: "Challenging",
  background: "pink",
}

export const OwnedMyOwnProject = Template.bind({})

OwnedMyOwnProject.args = {
  variant: "OwnedMyOwnProject",
  background: "green",
}

export const SocietallyImpactful = Template.bind({})

SocietallyImpactful.args = {
  variant: "SocietallyImpactful",
  background: "orange",
}
