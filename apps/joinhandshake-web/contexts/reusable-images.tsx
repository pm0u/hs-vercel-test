import React from "react"
import { SanityReusableImage } from "../sanity"
import images from "../lib/data/reusableImages.preval"

const ReusableImageContext = React.createContext<
  Record<string, SanityReusableImage> | undefined
>(undefined)

const ReusableImageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReusableImageContext.Provider value={images}>
      {children}
    </ReusableImageContext.Provider>
  )
}

/**
 * Used to retrieve dev images from sanity, for use in storybook to get FPO images
 */
const useReusableImages = () => {
  const context = React.useContext(ReusableImageContext)
  if (context === undefined) {
    throw new Error(
      "useReusableImages must be used within ReusableImageProvider!"
    )
  }
  return context
}

export { useReusableImages, ReusableImageProvider }
