import React, { ReactNode } from "react"
import { cva } from "class-variance-authority"
import Link from "next/link"

export interface ETA2021ButtonProps {
  /** Content displayed in the button */
  children: ReactNode
  /** Color theme for the button */
  color: "blue" | "green" | "white" | "yellow"
  /** Button size and padding */
  size: "small" | "large"
  /** URL to navigate the user to */
  href: string
  /** Custom classes to apply to button */
  className?: string
}

const button = cva(
  [
    "cursor-pointer whitespace-nowrap",
    "border border-neutral-100 transform duration-30",
    "translate-x-legacy-1 -translate-y-legacy-1 hover:transform-none",
    "flex",
  ],
  {
    variants: {
      color: {
        blue: ["bg-legacy-twilight-600", "text-neutral-0"],
        green: ["bg-legacy-green-300"],
        white: ["bg-neutral-0"],
        yellow: ["bg-legacy-yellow"],
      },
      size: {
        small: ["text-legacy-sm", "py-legacy-2", "px-legacy-3"],
        large: ["text-legacy-base", "font-bold", "py-legacy-3", "px-legacy-6"],
      },
    },
  }
)

export const ETA2021Button = ({
  children,
  href,
  color = "blue",
  size = "large",
  className = "",
}: ETA2021ButtonProps) => {
  return (
    // NOTE: assumption below that if href starts with '/' or '#' it is internal and will not open in a new tab
    <Link
      href={href}
      target={href.startsWith("/") || href.startsWith("#") ? "" : "_blank"}
      className={`inline-block ${className}`}
    >
      <span className="block bg-neutral-100">
        <span className={button({ color, size })}>{children}</span>
      </span>
    </Link>
  )
}
