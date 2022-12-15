import React from "react"
import { ETA2022SocialTile } from "./social-tile"

export const ETA2022ShareYourWin = () => {
  return (
    <div className="bg-neutral-0">
      <p className="text-xs font-bold mb-3">SHARE YOUR WIN</p>
      <div className="flex">
        <span className="pr-2">
          <ETA2022SocialTile icon="linkedin" />
        </span>
        <span className="pr-2">
          <ETA2022SocialTile icon="twitter" />
        </span>
        <span>
          <ETA2022SocialTile icon="facebook" />
        </span>
      </div>
    </div>
  )
}
