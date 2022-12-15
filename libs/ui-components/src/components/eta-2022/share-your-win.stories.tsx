import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2022ShareYourWin } from "./share-your-win"

export default {
  title: "Components",
  component: ETA2022ShareYourWin,
} as ComponentMeta<typeof ETA2022ShareYourWin>

const Template: ComponentStory<typeof ETA2022ShareYourWin> = (args) => (
  <div className="mx-auto w-min">
    <ETA2022ShareYourWin />
  </div>
)

export const ShareYourWinBlock = Template.bind({})
