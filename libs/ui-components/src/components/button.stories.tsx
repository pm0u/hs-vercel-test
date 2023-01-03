import React from "react"
import { ExampleButton } from "./button"
import { ComponentMeta, ComponentStory } from "@storybook/react"

export default {
  title: "Examples/Button",
  component: ExampleButton,
} as ComponentMeta<typeof ExampleButton>

const Template: ComponentStory<typeof ExampleButton> = (args) => (
  <div className="mx-auto w-min">
    <ExampleButton {...args} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  children: "Button",
}

export const Primary = Template.bind({})

Primary.args = {
  children: "Primary",
}

export const Secondary = Template.bind({})

Secondary.args = {
  children: "Secondary",
  variant: "secondary",
}

export const AccessibilityTest = Template.bind({})

AccessibilityTest.args = {
  children: "Accessibility",
  variant: "accessibility",
}
