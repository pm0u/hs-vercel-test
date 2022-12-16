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
      {/* 
       NOTE: see the following github issue related to using functional component inside of next/link
       https://github.com/vercel/next.js/issues/7915
       Suggested best practice is to wrap the component in an anchor element
       https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-functional-component
       */}
      <Link href={href} passHref>
        <a target="_blank" className="h-full w-full flex">
          <SocialIcon className="p-3" icon={icon}></SocialIcon>
        </a>
      </Link>
    </div>
  )
}
