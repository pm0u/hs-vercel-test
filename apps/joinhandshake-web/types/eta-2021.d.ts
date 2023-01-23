import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { IconVariant, IndustryBackgroundColor } from "../components"
import { SanitySEOFields } from "./sanity"
import { SanityDocument, Slug } from "sanity/lib/exports"

export interface ETA2021Winner extends SanitySEOFields, SanityDocument {
  name: string
  winnerSlug: Slug
  winnerLogo: SanityImageObject
  industry: ETA2021Industry
  excerpt: string
  aboutTheCompanyParagraph: string
  companyHighlights: IconVariant[]
  studentQuote: string
  shareButtonText: string
}

export interface ETA2021Industry extends SanitySEOFields, SanityDocument {
  name: string
  slug: string
  description: string
  industryBackgroundColor: IndustryBackgroundColor
  industryIcon: SanityImageObject
  industrySlug: Slug
  _id: string
}
