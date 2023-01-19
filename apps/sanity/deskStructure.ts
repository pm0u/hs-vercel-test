import { ListBuilder, StructureBuilder } from "sanity/desk"
import { ClipboardIcon } from "@sanity/icons"
import { ConfigContext } from "sanity"

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

/**
 * These users will have *all* actions available on singletons
 * and they will be visible in the content list.
 */
export const singletonEditorRoles = new Set(["developer", "administrator"])

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
      S.divider(),
      // Filter out singletons for unauthorized users
      ...S.documentTypeListItems().filter((listItem) =>
        userRoles?.some((userRole) => singletonEditorRoles.has(userRole.name))
          ? true
          : !singletonTypes.has(listItem.getId() as string)
      ),
    ])
}
