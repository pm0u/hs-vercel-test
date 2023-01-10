import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Breadcrumbs } from "./breadcrumbs"

const story: ComponentMeta<typeof Breadcrumbs> = {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
}

export default story

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
)

export const TwoCrumbs = Template.bind({})

TwoCrumbs.args = {
  crumbs: [{ label: "Crumb 1", href: "#" }, { label: "Current Page" }],
}

export const ThreeCrumbs = Template.bind({})

ThreeCrumbs.args = {
  crumbs: [
    { label: "Crumb 1", href: "#" },
    { label: "Crumb 2", href: "#" },
    { label: "Current Page" },
  ],
}

export const WithUnlinkedCrumbs = Template.bind({})

WithUnlinkedCrumbs.args = {
  crumbs: [
    { label: "Crumb 1", href: "#" },
    { label: "Crumb 2", href: "#" },
    { label: "Crumb 3", href: "#" },
    { label: "Crumb 4 (Unlinked)" },
    { label: "Current Page" },
  ],
}

WithUnlinkedCrumbs.parameters = {
  docs: {
    storyDescription: "Breadcrumbs at any depth can be plaintext (no link)",
  },
}
