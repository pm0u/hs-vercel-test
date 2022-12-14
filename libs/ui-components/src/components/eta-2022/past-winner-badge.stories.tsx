import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2022PastWinnerBadge } from "./past-winner-badge"

export default {
  title: "Components/WinnerBadge",
  component: ETA2022PastWinnerBadge,
} as ComponentMeta<typeof ETA2022PastWinnerBadge>

const Template: ComponentStory<typeof ETA2022PastWinnerBadge> = (args) => (
  <div className="mx-auto w-min">
    <ETA2022PastWinnerBadge />
  </div>
)

export const Badge = Template.bind({})
