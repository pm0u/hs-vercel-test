import { ListBuilder, StructureBuilder } from "sanity/desk"
import { ClipboardIcon } from "@sanity/icons"
import { ConfigContext } from "sanity"

/**
 * Singleton Setup
 *
 * @see https://www.sanity.io/guides/singleton-document
 * --------------------------------------------------------
 * These will need to be linked to directly in the desk structure,
 * otherwise they are hidden. These are also hidden from creating new
 * documents in the popup.
 */
export const singletonTypes = new Set([
  "etaLanding2021",
  "nextIsNow",
  "handshakeStats",
])

/**
 * Types that are explicitly organized outside of the "catch all"
 */
const organizedTypes = new Set([
  "etaWinners2021",
  "etaIndustry2021",
  "etaWinners2022",
  "etaCategory2022",
])

/**
 * All of these will be hidden in the catch all area, except for users
 * with roles called out in fullEditorRoles below.
 */
export const hiddenTypes = new Set([
  ...singletonTypes,
  ...organizedTypes,
  "devImage",
])

/**
 * Available actions to perform on a singleton doc.
 * We don't want duplicate or delete available for example.
 * Users with roles in fullEditorRoles will have all actions available.
 */
export const singletonActions = new Set([
  "publish",
  "discardChanges",
  "restore",
])

/**
 * These users will have *all* actions available on singletons
 * and all types will be visible in the content list.
 */
export const fullEditorRoles = new Set(["developer", "administrator"])

export const structure: (
  S: StructureBuilder,
  context: ConfigContext
) => ListBuilder = (S, context) => {
  const userRoles = context.currentUser?.roles
  return S.list()
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
      S.listItem()
        .title("ETA 2022")
        .child(
          S.list()
            .id("eta2022Winners")
            .items([
              S.listItem()
                .title("Winners")
                .child(S.documentTypeList("etaWinners2022")),
              S.listItem()
                .title("Industries")
                .child(S.documentTypeList("etaCategory2022")),
            ])
        ),
      S.listItem()
        .title("Next is Now")
        .id("nextIsNowDoc")
        .child(
          S.document().schemaType("nextIsNow").documentId("nextIsNowPage")
        ),
      S.listItem()
        .title("Handshake Stats")
        .id("statsDoc")
        .child(
          S.document().schemaType("handshakeStats").documentId("handshakeStats")
        ),
      S.divider(),
      // Filter out hidden types for unauthorized users
      ...S.documentTypeListItems().filter((listItem) =>
        userRoles?.some((userRole) => fullEditorRoles.has(userRole.name))
          ? true
          : !hiddenTypes.has(listItem.getId() as string)
      ),
    ])
}
