import { DocumentDefinition } from "sanity"

export const exampleAccessYourPotential: DocumentDefinition = {
  // This could be a more generic name for more flexible document types
  // For the final version of this page, it might be "legacyLandingPage" for example if it shares blocks with other pages
  name: "exampleAccessYourPotential",
  type: "document",
  title: "EXAMPLE Access Your Potential",
  preview: {
    select: {
      title: "heroBanner.title",
      subtitle: "heroBanner.content",
    },
  },
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
      type: "slug",
      name: "pageSlug",
      title: "URL slug",
      description: "What will appear in the URL bar",
      group: "pageData",
    },
    {
      type: "heroBanner",
      title: "Hero Banner",
      name: "heroBanner",
      group: "pageData",
    },
    {
      title: "Body Content",
      name: "content",
      type: "array",
      group: "pageData",
      of: [
        { type: "block" },
        { type: "imageWithText" },
        { type: "ctaBlock" },
        { type: "textWidth" },
      ],
    },
  ],
}
