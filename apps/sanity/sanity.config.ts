import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import schemas from "./schemas/schema"
import { datasetNavbar } from "./plugins/dataset-navbar"

export default defineConfig({
  title: "Handshake Studio",
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(),
    visionTool({
      defaultApiVersion: "v2022-10-21",
    }),
    datasetNavbar(),
  ],
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
