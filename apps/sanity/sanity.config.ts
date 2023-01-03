import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import schemas from "./schemas/schema"

export default defineConfig({
  title: "Handshake Studio",
  projectId: "mz2hls6g",
  dataset: "staging",
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemas,
  },
  /** Hides vision tool in production */
  tools: (prev) => {
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter((tool) => tool.name !== "vision")
  },
})
