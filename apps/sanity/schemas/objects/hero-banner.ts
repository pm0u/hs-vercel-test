import { ObjectDefinition } from "sanity"

export const heroBanner: ObjectDefinition = {
  name: "heroBanner",
  type: "object",
  title: "AYP Hero banner",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "banner title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Banner Content",
      type: "string",
      description: "text content displayed below the title (optional)",
      validation: (Rule) => Rule.max(80),
    },
  ],
}
