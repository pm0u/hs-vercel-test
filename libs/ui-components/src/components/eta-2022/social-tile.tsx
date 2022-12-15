import React from "react"
import { SocialIcon } from "../base/social-icon"

export interface ETA2022SocialTileProps {
  /** Color theme for the button */
  icon: "linkedin" | "twitter" | "facebook"
}

export const ETA2022SocialTile = ({
  icon = "linkedin",
}: ETA2022SocialTileProps) => {
  return (
    <div className="bg-legacy-purple rounded-md h-12 w-12 p-3 text-neutral-0 flex items-center transform duration-30 hover:scale-105 hover:opacity-90 cursor-pointer">
      {/*FIXME: using <SocialIcon> as a child of <Link> results with the following error:
        Warning: Function components cannot be given refs.
        Attempts to access this ref will fail. 
        Did you mean to use React.forwardRef()?
      */}
      <SocialIcon icon={icon}></SocialIcon>
    </div>
  )
}
