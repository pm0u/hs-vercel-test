import React from "react"
import { SocialIcon } from "./index"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof SocialIcon> = {
  title: "Components/Social Icon",
  component: SocialIcon,
}

export default story

const Template: ComponentStory<typeof SocialIcon> = ({
  className = "",
  ...args
}) => (
  <div className="mx-auto w-min">
    <SocialIcon className={`${className} h-10 w-10`} {...args} />
  </div>
)

export const Twitter = Template.bind({})

Twitter.args = {
  icon: "twitter",
}

export const Facebook = Template.bind({})

Facebook.args = {
  icon: "facebook",
}

export const LinkedIn = Template.bind({})

LinkedIn.args = {
  icon: "linkedin",
}

export const Colored = Template.bind({})

Colored.args = {
  icon: "linkedin",
  className: "text-lime-60",
}
