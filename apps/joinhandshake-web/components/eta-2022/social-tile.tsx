import Link from "next/link"
import React from "react"
import { SocialIcon } from "../base/social-icon"

export interface ETA2022SocialTileProps {
  /** Color theme for the button */
  icon: "linkedin" | "twitter" | "facebook"
  href: string
}

export const ETA2022SocialTile = ({
  icon = "linkedin",
  href = "",
}: ETA2022SocialTileProps) => {
  return (
    <div className="group h-legacy-12 w-legacy-12 rounded-legacy-lg bg-eta2022-purple text-neutral-0 transition-all duration-300 hover:scale-105">
      <Link
        href={href}
        target="_blank"
        className="relative flex h-full w-full items-center"
      >
        <SocialIcon
          className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-legacy-3 opacity-0 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
          icon={icon}
        />
        <SocialIcon
          className="p-legacy-3 transition-all duration-300 group-hover:opacity-0"
          icon={icon}
        />
      </Link>
    </div>
  )
}
