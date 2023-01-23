import React from "react"
import { ETA2021CompanyHighlight } from "./index"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof ETA2021CompanyHighlight> = {
  title: "Components/Highlight Icon",
  component: ETA2021CompanyHighlight,
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

const Template: ComponentStory<typeof ETA2021CompanyHighlight> = ({
  className: string,
  ...args
}) => <ETA2021CompanyHighlight {...args} />

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
