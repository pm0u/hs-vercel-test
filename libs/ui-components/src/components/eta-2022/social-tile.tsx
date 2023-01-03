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
    <div className="bg-legacy-purple rounded-md h-12 w-12 text-neutral-0 transform duration-30 hover:scale-105 hover:opacity-90">
      <Link
        href={href}
        target="_blank"
        className="h-full w-full flex items-center"
      >
        <SocialIcon className="p-3" icon={icon}></SocialIcon>
      </Link>
    </div>
  )
}
