import { DocumentDefinition } from "sanity"

export const handshakeStats: DocumentDefinition = {
  name: "handshakeStats",
  type: "document",
  title: "Handshake stats",
  preview: {
    prepare: () => ({
      title: "Handshake Stats",
    }),
  },
  fields: [
    {
      type: "number",
      name: "studentProfiles",
      title: "# of Student Profiles",
    },
    {
      type: "number",
      name: "universities",
      title: "# of Universities",
    },
  ],
}
