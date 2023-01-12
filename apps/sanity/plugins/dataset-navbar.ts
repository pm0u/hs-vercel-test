import { definePlugin } from "sanity"
import { DatasetNavbar } from "../components/dataset-navbar"

export const datasetNavbar = definePlugin({
  name: "dataset-navbar",
  studio: {
    components: {
      navbar: DatasetNavbar,
    },
  },
})
