export const etaIndustry2021 = {
  name: "etaIndustry2021",
  type: "document",
  title: "ETA 2021 Industries",
  fields: [
    {
      title: "Industry Name",
      name: "name",
      type: "string",
    },
    {
      title: "Industry Slug",
      name: "industrySlug",
      type: "slug",
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
    },
    {
      title: "Industry Background Color",
      name: "industryBackgroundColor",
      type: "string",
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
    },
    {
      title: "Share Image",
      name: "shareImage",
      type: "image",
    },
    {
      title: "Seo Title",
      name: "seoTitle",
      type: "text",
    },
    {
      title: "Seo Description",
      name: "seoDescription",
      type: "text",
    },
  ],
}
