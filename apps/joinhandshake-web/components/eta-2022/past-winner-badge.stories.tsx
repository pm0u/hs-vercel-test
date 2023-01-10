import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2022PastWinnerBadge } from "./past-winner-badge"

const story: ComponentMeta<typeof ETA2022PastWinnerBadge> = {
  title: "Components",
  component: ETA2022PastWinnerBadge,
}

export default story

const Template: ComponentStory<typeof ETA2022PastWinnerBadge> = (args) => (
  <div className="mx-auto w-min">
    <ETA2022PastWinnerBadge />
  </div>
)

export const PastWinnerBadge = Template.bind({})
