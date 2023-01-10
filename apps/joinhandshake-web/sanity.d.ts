import { SanityImageObject } from "@sanity/image-url/lib/types/types"

export interface SanityReusableImage {
  image: SanityImageObject
  descriptiveText: string
  id: { current: string }
  description: string
}
