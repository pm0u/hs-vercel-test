import React from "react"
import { ETA2022FooterCta } from "./footer-cta"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof ETA2022FooterCta> = {
  title: "Components",
  component: ETA2022FooterCta,
}

export default story

const Template: ComponentStory<typeof ETA2022FooterCta> = () => (
  <div className="bg-eta2022-purple py-legacy-10">
    <ETA2022FooterCta />
  </div>
)

export const FooterCTA = Template.bind({})
