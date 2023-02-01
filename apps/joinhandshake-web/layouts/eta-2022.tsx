import { ETA2022SpaceBackground } from "components"
import React from "react"
import { SkeletonFooter } from "./skeleton-footer"
import { SkeletonHeader } from "./skeleton-header"

interface LayoutProps {
  children: React.ReactNode
}
export const ETA2022Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SkeletonHeader />
      <ETA2022SpaceBackground className="mt-legacy-12 text-neutral-0">
        {children}
        <SkeletonFooter />
      </ETA2022SpaceBackground>
    </>
  )
}
