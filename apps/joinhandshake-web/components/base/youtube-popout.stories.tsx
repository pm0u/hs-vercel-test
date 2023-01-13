import React from "react"
import { YoutubePopout } from "./youtube-popout"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof YoutubePopout> = {
  title: "Components/Youtube Popout",
  component: YoutubePopout,
}

export default story

const Template: ComponentStory<typeof YoutubePopout> = (args) => (
  <YoutubePopout {...args} />
)

export const Example = Template.bind({})

Example.args = {
  videoId: "MssQgr1ZwU8",
  children: "Click it!",
}
