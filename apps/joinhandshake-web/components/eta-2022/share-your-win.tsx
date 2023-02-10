import { useUrl } from "hooks/use-url"
import React from "react"
import { ETA2022SocialTile } from "./social-tile"

export const ETA2022ShareYourWin = ({
  className = "",
  shareText,
}: {
  className?: string
  shareText: string
}) => {
  const { url: shareUrl } = useUrl()
  return (
    <div className={`bg-neutral-0 ${className}`}>
      <p className="mb-legacy-3 text-legacy-sm font-bold text-neutral-100">
        SHARE YOUR WIN
      </p>
      <div className="flex">
        <span className="pr-legacy-2">
          <ETA2022SocialTile
            icon="linkedin"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              shareUrl
            )}`}
          />
        </span>
        <span className="pr-legacy-2">
          <ETA2022SocialTile
            icon="twitter"
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              shareUrl
            )}&text=${encodeURIComponent(shareText)}`}
          />
        </span>
        <span>
          <ETA2022SocialTile
            icon="facebook"
            href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`}
          />
        </span>
      </div>
    </div>
  )
}
