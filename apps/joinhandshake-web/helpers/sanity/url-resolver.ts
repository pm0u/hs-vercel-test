import { ETA2021Industry, ETA2021Winner } from "types/eta-2021"
import { ETA2022Category, ETA2022Winner } from "types/eta-2022"

/**
 * Parses a Sanity document to return relative URL for Nextjs site
 */
export const urlResolver = (document: {
  _type: string
  [key: string]: any
}) => {
  /**
   * ETA 2022
   */
  if (document._type === "eta2022Landing") return "/early-talent-awards"
  if (document._type === "etaCategory2022")
    return `/early-talent-awards/2022/${
      (document as ETA2022Category).categorySlug.current
    }`
  if (document._type === "etaWinners2022")
    return `/early-talent-awards/2022/${
      (document as ETA2022Winner).category.categorySlug.current
    }/${(document as ETA2022Winner).winnerSlug.current}`
  /**
   * ETA 2021
   */
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
