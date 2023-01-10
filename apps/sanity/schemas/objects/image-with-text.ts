import { ObjectDefinition } from "sanity"

export const imageWithText: ObjectDefinition = {
  name: "imageWithText",
  title: "Image With Text",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "content",
      title: "Text Content",
      type: "array",
      description: "text displayed next to image",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "layout",
      title: "Layout",
      type: "string",
      description:
        "Ordering of image/text when shown side by side. Left content will be displayed first on mobile",
      options: {
        list: [
          {
            title: "Image left, text right",
            value: "imageLeft",
          },
          {
            title: "Text left, Image right",
            value: "imageRight",
          },
        ],
      },
    },
  ],
}
