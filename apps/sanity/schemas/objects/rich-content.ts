import { ArrayDefinition } from "sanity"

export const richContent: ArrayDefinition = {
  name: "richContent",
  type: "array",
  title: "Rich Content",
  of: [
    {
      type: "block",
    },
    {
      type: "image",
    },
  ],
}
