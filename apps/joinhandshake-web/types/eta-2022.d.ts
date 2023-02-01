import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { SanitySEOFields } from "./sanity"
import { SanityDocument, Slug } from "sanity/lib/exports"
import { EtaIconVariant } from "components"

export interface ETA2022Category extends SanitySEOFields, SanityDocument {
  name: string
  categorySlug: Slug
  description: string
  categoryIcon: SanityImageObject
}

export interface ETA2022Winner extends SanitySEOFields, SanityDocument {
  name: string
  winnerSlug: Slug
  winnerLogo: SanityImageObject
  category: ETA2022Category
  excerpt: string
  pastWinner: boolean
  aboutTheCompanyParagraph: string
  companyHighlights: EtaIconVariant[]
  studentQuote: string
  shareButtonText: string
}
