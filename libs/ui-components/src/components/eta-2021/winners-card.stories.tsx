import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2021WinnersCard } from "./winners-card"

export default {
  title: "Components",
  component: ETA2021WinnersCard,
} as ComponentMeta<typeof ETA2021WinnersCard>

const Template: ComponentStory<typeof ETA2021WinnersCard> = (args) => (
  <div className="mx-auto w-max">
    <ETA2021WinnersCard {...args} />
  </div>
)

export const WinnersCard = Template.bind({})

WinnersCard.args = {
  color: "coral",
  title: "Accounting",
  link: "See the winners!",
  icon: "https://i0.wp.com/joinhandshake.com/wp-content/uploads/2021/03/eta-industry-accounting-1.png?resize=150%2C150&ssl=1",
}
