import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ETA2021WinnersCard } from "./winners-card"
import { useDevImages } from "contexts"

const story: ComponentMeta<typeof ETA2021WinnersCard> = {
  title: "Components",
  component: ETA2021WinnersCard,
}

export default story

const Template: ComponentStory<typeof ETA2021WinnersCard> = (args) => {
  const { _600 } = useDevImages()
  return (
    <div className="mx-auto w-max">
      <ETA2021WinnersCard {...args} icon={_600.image} />
    </div>
  )
}

export const WinnersCard = Template.bind({})

WinnersCard.args = {
  color: "coral",
  title: "Accounting",
  buttonText: "See the winners!",
  href: "https://www.joinhandshake.com",
}
