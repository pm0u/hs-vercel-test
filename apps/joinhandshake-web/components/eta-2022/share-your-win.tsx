import React from "react"
import { ETA2022SocialTile } from "./social-tile"

export const ETA2022ShareYourWin = () => {
  return (
    <div className="bg-neutral-0">
      <p className="text-xs mb-legacy-3 font-bold">SHARE YOUR WIN</p>
      <div className="flex">
        <span className="pr-legacy-2">
          <ETA2022SocialTile icon="linkedin" href="https://linkedin.com" />
        </span>
        <span className="pr-legacy-2">
          <ETA2022SocialTile icon="twitter" href="http://twitter.com" />
        </span>
        <span>
          <ETA2022SocialTile icon="facebook" href="https://facebook.com" />
        </span>
      </div>
    </div>
  )
}
