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
    <div className="duration-30 h-12 w-12 transform rounded-md bg-legacy-purple text-neutral-0 hover:scale-105 hover:opacity-90">
      <Link
        href={href}
        target="_blank"
        className="flex h-full w-full items-center"
      >
        <SocialIcon className="p-3" icon={icon}></SocialIcon>
      </Link>
    </div>
  )
}
