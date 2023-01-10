import { ObjectDefinition } from "sanity"

export const button: ObjectDefinition = {
  name: "button",
  type: "object",
  title: "Button",
  fields: [
    {
      type: "string",
      title: "Button text",
      name: "buttonText",
    },
    {
      type: "string",
      name: "buttonType",
      options: {
        list: [
          {
            title: "Primary",
            value: "primary",
          },
          {
            title: "Secondary",
            value: "secondary",
          },
        ],
      },
    },
  ],
}
