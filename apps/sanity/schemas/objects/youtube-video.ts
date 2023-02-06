import { ObjectDefinition } from "sanity"

export const youtubeVideo: ObjectDefinition = {
  name: "youtubeVideo",
  title: "Youtube Video",
  type: "object",
  fields: [
    {
      type: "string",
      title: "Youtube video (ID)",
      name: "youtubeVideoId",
    },
    {
      type: "image",
      title: "Youtube video Poster image",
      name: "youtubeVideoPoster",
    },
  ],
}
