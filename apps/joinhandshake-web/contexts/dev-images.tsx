import React from "react"
import { SanityReusableImage } from "types/sanity"
import images from "lib/data/devImages.preval"

const DevImageContext = React.createContext<
  Record<string, SanityReusableImage> | undefined
>(undefined)

const DevImageProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DevImageContext.Provider value={images}>
      {children}
    </DevImageContext.Provider>
  )
}

/**
 * Used to retrieve dev images from sanity, for use in storybook to get FPO images
 */
const useDevImages = () => {
  const context = React.useContext(DevImageContext)
  if (context === undefined) {
    throw new Error("useDevImages must be used within DevImageProvider!")
  }
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.IS_STORYBOOK !== "true"
  ) {
    throw new Error(
      "Dev images are for use in development only!! If this is storybook, set the ENV var 'IS_STORYBOOK' to 'true' (string)"
    )
  }
  return context
}

export { DevImageProvider, useDevImages }
