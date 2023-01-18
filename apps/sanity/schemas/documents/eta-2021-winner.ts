import { DocumentDefinition } from "sanity"

export const etaWinner2021: DocumentDefinition = {
  name: "etaWinners2021",
  type: "document",
  title: "ETA 2021 Winners",
  groups: [
    {
      name: "pageData",
      title: "Page Data",
      default: true,
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    { type: "seo", group: "seo", name: "seo" },
    {
      title: "Winner Name",
      name: "name",
      type: "string",
      group: "pageData",
    },
    {
      title: "Winner Slug",
      name: "winnerSlug",
      type: "slug",
      group: "pageData",
      options: {
        source: "name",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      title: "Winner Logo",
      name: "winnerLogo",
      type: "image",
      group: "pageData",
    },
    {
      title: "Industry",
      name: "industry",
      type: "reference",
      group: "pageData",
      to: [{ type: "etaIndustry2021" }],
      options: {
        disableNew: true,
      },
    },
    {
      title: "Excerpt",
      name: "excerpt",
      type: "text",
      group: "pageData",
    },
    {
      title: "About The Company Paragraph",
      name: "aboutTheCompanyParagraph",
      type: "text",
      group: "pageData",
    },
    {
      title: "Company Highlights",
      name: "companyHighlights",
      type: "array",
      group: "pageData",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().length(3),
      options: {
        layout: "grid",
        list: [
          { value: "challenging", title: "Challenging" },
          { value: "collaborative", title: "Collaborative" },
          { value: "established", title: "Established" },
          {
            value: "flexible-work-environment",
            title: "Flexible Work Environment",
          },
          { value: "focused-tasks", title: "Focused Tasks" },
          { value: "friendly", title: "Friendly" },
          { value: "high-performance", title: "High Performance" },
          { value: "housing-stipend", title: "Housing Stipend" },
          { value: "inspiring-leadership", title: "Inspiring Leadership" },
          {
            value: "leadership-opportunities",
            title: "Leadership Opportunities",
          },
          { value: "light-workload", title: "Light Workload" },
          {
            value: "managers-are-good-mentors",
            title: "Managers are Good Mentors",
          },
          {
            value: "managers-care-about-you",
            title: "Managers Care About You",
          },
          { value: "mission-driven", title: "Mission-Driven" },
          {
            value: "networking-opportunities",
            title: "Networking Opportunities",
          },
          { value: "owned-my-own-project", title: "Owned My Own Project" },
          {
            value: "shadowing-opportunities",
            title: "Shadowing Opportunities",
          },
          {
            value: "social-events-outside-work",
            title: "Social Events Outside Work",
          },
          { value: "socially-responsible", title: "Socially Responsible" },
          { value: "societally-impactful", title: "Societally Impactful" },
          {
            value: "structured-mentorship-programs",
            title: "Structured Mentorship Programs",
          },
          { value: "supportive", title: "Supportive" },
          { value: "values-feedback", title: "Values Feedback" },
        ],
      },
    },
    {
      title: "Student Quote",
      name: "studentQuote",
      type: "text",
      group: "pageData",
    },
    {
      title: "Share Button Text",
      name: "shareButtonText",
      type: "text",
      group: "pageData",
    },
  ],
}
