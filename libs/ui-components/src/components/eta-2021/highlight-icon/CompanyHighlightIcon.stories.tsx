import React from "react"
import { CompanyHighlightSVG } from "./index"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
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
} as ComponentMeta<typeof CompanyHighlightSVG>

const Template: ComponentStory<typeof CompanyHighlightSVG> = ({
  className: string,
  ...args
}) => <CompanyHighlightSVG {...args} />

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
