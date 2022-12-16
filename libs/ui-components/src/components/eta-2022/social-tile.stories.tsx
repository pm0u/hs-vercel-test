import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2022SocialTile } from "./social-tile"

export default {
  title: "Components/Social Tiles",
  component: ETA2022SocialTile,
} as ComponentMeta<typeof ETA2022SocialTile>

const Template: ComponentStory<typeof ETA2022SocialTile> = (args) => (
  <div className="mx-auto w-min">
    <ETA2022SocialTile {...args} />
  </div>
)

export const LinkedIn = Template.bind({})

LinkedIn.args = {
  icon: "linkedin",
  href: "https://linkedin.com"
}

export const Twitter = Template.bind({})

Twitter.args = {
  icon: "twitter",
  href: "https://twitter.com"
}

export const Facebook = Template.bind({})

Facebook.args = {
  icon: "facebook",
  href: "https://facebook.com"
}
