import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { SanityDocument, Slug } from "sanity/lib/exports"

export interface SanityReusableImage extends SanityDocument {
  image: SanityImageObject
  descriptiveText: string
  id: Slug
  description: string
}

export interface SanitySEOFields {
  shareImage: SanityImageObject
  seoTitle: string
  seoMetaDescription: string
}

export { SanityImageObject, SanityDocument }
