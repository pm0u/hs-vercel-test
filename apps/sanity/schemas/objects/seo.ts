import { ObjectDefinition } from "sanity"

export const seo: ObjectDefinition = {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "title",
      title: "SEO title",
      type: "string",
    },
    {
      name: "description",
      title: "SEO description",
      type: "string", // set a max leng
    },
  ],
}
