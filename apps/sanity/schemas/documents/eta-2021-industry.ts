import { DocumentDefinition } from "sanity"

export const etaIndustry2021: DocumentDefinition = {
  name: "etaIndustry2021",
  type: "document",
  title: "ETA 2021 Industries",
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
      title: "Industry Name",
      name: "name",
      type: "string",
      group: "pageData",
    },
    {
      title: "Industry Slug",
      name: "industrySlug",
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
      title: "Industry Background Color",
      name: "industryBackgroundColor",
      type: "string",
      group: "pageData",
      options: {
        list: [
          { title: "Aqua", value: "light-blue" },
          { title: "Coral", value: "coral" },
          { title: "Light Green", value: "green-light" },
          { title: "Periwinkle", value: "periwinkle" },
          { title: "Yellow", value: "yellow" },
        ],
      },
    },
    {
      title: "Industry Icon",
      name: "industryIcon",
      type: "image",
      group: "pageData",
    },
  ],
}
