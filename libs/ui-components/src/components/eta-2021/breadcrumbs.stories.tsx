import React from "react"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Breadcrumbs } from "./breadcrumbs"

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>

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

export const withUnlinkedCrumbs = Template.bind({})

withUnlinkedCrumbs.args = {
  crumbs: [
    { label: "Crumb 1", href: "#" },
    { label: "Crumb 2", href: "#" },
    { label: "Crumb 3", href: "#" },
    { label: "Crumb 4 (Unlinked)" },
    { label: "Current Page" },
  ],
}

withUnlinkedCrumbs.parameters = {
  docs: {
    storyDescription: "Breadcrumbs at any depth can be plaintext (no link)",
  },
}
