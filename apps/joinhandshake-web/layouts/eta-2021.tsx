import React from "react"
import { SkeletonFooter } from "./skeleton-footer"
import { SkeletonHeader } from "./skeleton-header"

interface LayoutProps {
  children: React.ReactNode
}
export const ETA2021Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SkeletonHeader />
      <main className="mt-legacy-12">{children}</main>
      <SkeletonFooter />
    </>
  )
}
