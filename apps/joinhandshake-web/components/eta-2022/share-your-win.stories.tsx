import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2022ShareYourWin } from "./share-your-win"

const story: ComponentMeta<typeof ETA2022ShareYourWin> = {
  title: "Components",
  component: ETA2022ShareYourWin,
}

export default story

const Template: ComponentStory<typeof ETA2022ShareYourWin> = (args) => (
  <div className="mx-auto w-min">
    <ETA2022ShareYourWin />
  </div>
)

export const ShareYourWinBlock = Template.bind({})
