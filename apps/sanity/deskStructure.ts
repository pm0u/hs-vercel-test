import { StructureBuilder } from "sanity/desk"
import { ClipboardIcon } from "@sanity/icons"

/**
 * Singleton Setup
 *
 * @see https://www.sanity.io/guides/singleton-document
 * --------------------------------------------------------
 * These will need to be linked to directly in the desk structure,
 * otherwise they are hidden.
 */
export const singletonTypes = new Set(["etaLanding2021"])

/**
 * Available actions to perform on a singleton doc.
 * We don't want duplicate or delete available for example
 */
export const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
])

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("ETA 2021")
        .child(
          S.list()
            .id("eta2021Winners")
            .items([
              S.listItem()
                .title("Landing Page")
                .icon(ClipboardIcon)
                .child(
                  S.document()
                    .schemaType("etaLanding2021")
                    .documentId("landingPage")
                ),
              S.listItem()
                .title("Winners")
                .child(S.documentTypeList("etaWinners2021")),
              S.listItem()
                .title("Industries")
                .child(S.documentTypeList("etaIndustry2021")),
            ])
        ),
      S.divider(),
      ...S.documentTypeListItems() /*.filter(
        (listItem) => !singletonTypes.has(listItem.getId() as string)
      )*/,
    ])
