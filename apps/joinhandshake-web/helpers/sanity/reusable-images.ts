import { sanityClient } from "lib/sanity"

export const getReusableImages = async () => {
  return await sanityClient.fetch(/* groq */ `*[_type == 'reusableImage']`)
}
