import { ObjectDefinition } from "sanity"

export const textWidth: ObjectDefinition = {
  name: "textWidth",
  title: "Narrow width text content",
  type: "object",
  fields: [
    {
      name: "content",
      title: "Text Content",
      type: "array",
      description: "text content",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
}
