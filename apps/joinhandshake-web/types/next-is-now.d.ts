import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { SanitySEOFields } from "./sanity"
import { SanityDocument } from "sanity/lib/exports"

export interface NextIsNowData extends SanitySEOFields, SanityDocument {
  careerFairIcon: SanityImageObject
  careerFairIconTransformed: SanityImageObject
  demoIcon: SanityImageObject
  demoIconTransformed: SanityImageObject
  etaIcon: SanityImageObject
  etaIconTransformed: SanityImageObject
  handshakeIcon: SanityImageObject
  handshakeIconTransformed: SanityImageObject
  hntIcon: SanityImageObject
  hntIconTransformed: SanityImageObject
  howToRecruitIcon: SanityImageObject
  howToRecruitIconTransformed: SanityImageObject
  linkedInIcon: SanityImageObject
  linkedInIconTransformed: SanityImageObject
  newWordmark: SanityImageObject
  oldWordmark: SanityImageObject
  recruitingIcon: SanityImageObject
  recruitingIconTransformed: SanityImageObject
  spaceInvaderEmoji: SanityImageObject
  todoListEmoji: SanityImageObject
  webinars: Array<{
    youtubeVideoId: string
    youtubeVideoPoster: SanityImageObject
  }>
  numStudents: number
  numUniversities: number
}
