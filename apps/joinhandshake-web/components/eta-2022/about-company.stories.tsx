import React from "react"
import { ETA2022AboutCompany } from "./about-company"
import { ComponentMeta, ComponentStory } from "@storybook/react"

const story: ComponentMeta<typeof ETA2022AboutCompany> = {
  title: "Components/About Company Section",
  component: ETA2022AboutCompany,
}

export default story

const Template: ComponentStory<typeof ETA2022AboutCompany> = (args) => (
  <div className="bg-eta2022-purple py-legacy-8">
    <ETA2022AboutCompany {...args} />
  </div>
)

export const PastWinner = Template.bind({})

PastWinner.args = {
  pastWinner: true,
  about:
    'Black & Veatch is an employee-owned engineering, procurement, consulting, and construction company with a more than 100-year track record of innovation in sustainable infrastructure. The company is committed to its mission of "Building a World of Difference."',
  excerpt:
    "The internship program is very well-developed. From day one, was grateful to find so many people who were willing to help me. I was given 10 separate projects to work on, which gave me my own responsibilities and kept me actively engaged.",
  highlights: [
    "NetworkingOpportunities",
    "StructuredMentorshipPrograms",
    "Collaborative",
  ],
  name: "Black & Veatch",
}

export const FirstTimeWinner = Template.bind({})

FirstTimeWinner.args = {
  about:
    'Black & Veatch is an employee-owned engineering, procurement, consulting, and construction company with a more than 100-year track record of innovation in sustainable infrastructure. The company is committed to its mission of "Building a World of Difference."',
  excerpt:
    "The internship program is very well-developed. From day one, was grateful to find so many people who were willing to help me. I was given 10 separate projects to work on, which gave me my own responsibilities and kept me actively engaged.",
  highlights: [
    "NetworkingOpportunities",
    "StructuredMentorshipPrograms",
    "Collaborative",
  ],
  name: "Black & Veatch",
}
