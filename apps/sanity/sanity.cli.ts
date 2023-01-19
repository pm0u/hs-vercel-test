import { defineCliConfig } from "sanity/cli"
import { config } from "dotenv"

config({ path: ".env.development" })

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
})
