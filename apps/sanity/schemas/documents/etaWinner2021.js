export const etaWinner2021 = {
  name: "etaWinners2021",
  type: "document",
  title: "ETA 2021 Winners",
  fields: [
    {
      title: "Winner Name",
      name: "name",
      type: "string",
    },
    {
      title: "Winner Slug",
      name: "winnerSlug",
      type: "slug",
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
    },
    {
      title: "Industry",
      name: "industry",
      type: "reference",
      to: [{ type: "etaIndustry2021" }],
      options: {
        disableNew: true,
      },
    },
    {
      title: "Excerpt",
      name: "excerpt",
      type: "text",
    },
    {
      title: "About The Company Paragraph",
      name: "aboutTheCompanyParagraph",
      type: "text",
    },
    {
      title: "Company Highlights",
      name: "companyHighlights",
      type: "array",
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
    },
    {
      title: "Share Button Text",
      name: "shareButtonText",
      type: "text",
    },
    {
      title: "Share Image",
      name: "shareImage",
      type: "image",
    },
    {
      title: "SEO Title",
      name: "seoTitle",
      type: "string",
    },
    {
      title: "SEO Meta Description",
      name: "seoMetaDescription",
      type: "text",
    },
  ],
}
