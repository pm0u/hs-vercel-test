import { ObjectDefinition } from "sanity"

export const seo: ObjectDefinition = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "image",
      title: "SEO Share Image",
      type: "image",
    },
    {
      name: "title",
      title: "SEO title",
      type: "string",
      validation: (Rule) =>
        Rule.max(60).warning("SEO Title should be less than 60 characters."),
    },
    {
      name: "description",
      title: "SEO description",
      type: "text",
      validation: (Rule) =>
        Rule.max(160).warning(
          "SEO Descriptions should be less than 160 characters."
        ),
    },
  ],
}
