import { sanityClient } from "../../lib/sanity"

export const getDevImages = async () => {
  return await sanityClient.fetch(/* groq */ `*[_type == 'devImage']`)
}
