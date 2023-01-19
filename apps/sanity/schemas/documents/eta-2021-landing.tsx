import { DocumentDefinition } from "sanity"

export const etaLanding2021: DocumentDefinition = {
  name: "etaLanding2021",
  type: "document",
  title: "ETA 2021 Landing",
  preview: {
    prepare: () => ({
      title: "ETA 2021 Landing Page",
    }),
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
      title: "hero banner logo",
      name: "heroImage",
      type: "reference",
      to: [{ type: "reusableImage" }],
      group: "pageData",
    },
    {
      type: "string",
      title: "Youtube video (ID)",
      name: "youtubeVideoId",
      group: "pageData",
    },
    {
      type: "image",
      title: "Youtube video Poster image",
      name: "youtubeVideoPoster",
      group: "pageData",
    },
  ],
}
