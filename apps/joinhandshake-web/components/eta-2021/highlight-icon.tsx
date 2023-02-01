import React from "react"
import { icons, EtaIconVariant } from "../eta/highlight-icons"
import { cva } from "class-variance-authority"

export interface IconProps {
  variant: EtaIconVariant
  /** Class applied to SVG element */
  className?: string
  /** SVG icon background */
  background: "periwinkle" | "green" | "yellow"
}

const iconBg = cva(
  [
    "flex items-center justify-center",
    "mx-auto mb-legacy-4",
    "rounded-full",
    "w-legacy-9 h-legacy-9 lg:w-legacy-16 lg:h-legacy-16 p-legacy-2 lg:p-legacy-4",
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
      <div className="text-center text-legacy-sm">
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
