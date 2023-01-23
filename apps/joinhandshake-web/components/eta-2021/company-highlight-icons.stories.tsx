import React from "react"
import { CompanyHighlightSVG } from "./highlight-icon"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof CompanyHighlightSVG> = {
  title: "Components/Highlight Icon",
  component: CompanyHighlightSVG,
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
    background: {
      name: "Icon background",
      control: "select",
      defaultValue: "yellow",
    },
  },
}

export default story

const Template: ComponentStory<typeof CompanyHighlightSVG> = (args) => (
  <CompanyHighlightSVG {...args} />
)

export const ShadowingOpportunities = Template.bind({})

ShadowingOpportunities.args = {
  variant: "ShadowingOpportunities",
}

export const Supportive = Template.bind({})

Supportive.args = {
  variant: "Supportive",
  background: "yellow",
}

export const ValuesFeedback = Template.bind({})

ValuesFeedback.args = {
  variant: "ValuesFeedback",
  background: "periwinkle",
}
