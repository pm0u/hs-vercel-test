import { ObjectDefinition } from "sanity"

export const ctaBlock: ObjectDefinition = {
  name: "ctaBlock",
  type: "object",
  title: "CTA Block",
  description: "Text with a CTA button below",
  fields: [
    {
      type: "array",
      name: "content",
      title: "Text Content",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      type: "button",
      name: "button",
      title: "Button",
      validation: (Rule) => Rule.required(),
    },
  ],
}
