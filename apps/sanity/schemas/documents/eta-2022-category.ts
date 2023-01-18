import { DocumentDefinition } from "sanity"

export const etaCategory2022: DocumentDefinition = {
  name: "etaCategory2022",
  type: "document",
  title: "ETA 2022 Categories",
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
      title: "Category Name",
      name: "name",
      type: "string",
      group: "pageData",
    },
    {
      title: "Category Slug",
      name: "categorySlug",
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
      title: "Description",
      name: "description",
      type: "text",
      group: "pageData",
    },
    {
      title: "Category Icon",
      name: "categoryIcon",
      type: "image",
      group: "pageData",
    },
  ],
}
