import { ETA2022SpaceBackground, SpaceBackgroundStyle } from "components"
import React from "react"
import { SkeletonFooter } from "./skeleton-footer"
import { SkeletonHeader } from "./skeleton-header"

interface LayoutProps {
  children: React.ReactNode
  style?: SpaceBackgroundStyle
}
export const ETA2022Layout = ({ children, style }: LayoutProps) => {
  return (
    <>
      <SkeletonHeader />
      <ETA2022SpaceBackground
        className="mt-legacy-12 text-neutral-0"
        style={style}
      >
        {children}
        <SkeletonFooter />
      </ETA2022SpaceBackground>
    </>
  )
}
