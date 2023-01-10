import { FieldDefinition } from "sanity"

export const reusableImageFields: FieldDefinition[] = [
  {
    name: "image",
    title: "Image",
    type: "image",
    validation: (Rule) => Rule.required(),
    options: {
      hotspot: true,
    },
  },
  {
    name: "id",
    title: "ID",
    type: "slug",
    description: "Unique descriptor ID for the image, used to retrieve",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "descriptiveText",
    title: "Descriptive Text",
    type: "string",
    description: "Text that describes the image",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "description",
    title: "Description",
    type: "string",
    description: "Describe the use or purpose of this image. For internal use.",
  },
]
