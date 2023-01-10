import React from "react"
import * as icons from "./icons"
import { cva } from "class-variance-authority"

export type IconVariant = keyof typeof icons

export interface IconProps {
  variant: IconVariant
  /** Class applied to SVG element */
  className?: string
  /** SVG icon background */
  background: "periwinkle" | "green" | "yellow"
}

const iconBg = cva(
  [
    "flex items-center justify-center",
    "mx-auto mb-4",
    "rounded-full",
    "w-9 h-9 lg:w-16 lg:h-16 p-2 lg:p-4",
  ],
  {
    variants: {
      background: {
        periwinkle: "bg-legacy-periwinkle",
        green: "bg-legacy-green",
        yellow: "bg-legacy-yellow",
      },
    },
  }
)

/**
 * Renders Company highlight SVG component.
 * Icon has no set width or height and will need to be controlled by container or styling/classes.
 */
export const CompanyHighlightSVG = ({
  variant,
  background,
  ...props
}: IconProps) => {
  const Icon = icons[variant]

  return (
    <div className="mx-auto w-min">
      <div className="text-center text-sm">
        <div className={iconBg({ background })}>
          <Icon {...props} />
        </div>
        <p>
          {variant
            .match(/[A-Z][a-z]+/g)
            ?.join(" ")
            .toLocaleUpperCase()}
        </p>
      </div>
    </div>
  )
}
