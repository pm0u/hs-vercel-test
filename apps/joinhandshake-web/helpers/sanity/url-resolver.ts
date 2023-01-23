import { ETA2021Industry, ETA2021Winner } from "types/eta-2021"

/**
 * Parses a Sanity document to return relative URL for Nextjs site
 */
export const urlResolver = (document: {
  _type: string
  [key: string]: any
}) => {
  if (document._type === "etaIndustry2021")
    return `/early-talent-awards/2021/${
      (document as ETA2021Industry).industrySlug.current
    }`
  if (document._type === "etaLanding2021") return "/early-talent-awards/2021"
  if (document._type === "etaWinners2021")
    return `/early-talent-awards/2021/${
      (document as ETA2021Winner).industry.industrySlug.current
    }/${(document as ETA2021Winner).winnerSlug.current}`
  return ""
}
