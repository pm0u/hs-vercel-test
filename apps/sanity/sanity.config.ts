import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import schemas from "./schemas/schema"
import { datasetNavbar } from "./plugins/dataset-navbar"
import {
  structure,
  singletonActions,
  singletonTypes,
  singletonEditorRoles,
} from "./deskStructure"

export default defineConfig({
  title: "Handshake Studio",
  projectId: import.meta.env.SANITY_STUDIO_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool({ structure }),
    visionTool({
      defaultApiVersion: "v2022-10-21",
    }),
    datasetNavbar(),
  ],
  schema: {
    types: schemas,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) => {
      const roles = context.currentUser?.roles

      // allow authorized users all permissions on singletons
      if (roles?.some((role) => singletonEditorRoles.has(role.name))) {
        return input
      }

      return singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input
    },
  },
  /** Hides vision tool in production */
  tools: (prev) => {
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter((tool) => tool.name !== "vision")
  },
})
