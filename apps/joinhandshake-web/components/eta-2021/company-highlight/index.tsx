import React from "react"
import { icons, IconVariant } from "components/eta/highlight-icons"
import { cva } from "class-variance-authority"

export type ETA2021HighlightBackground = "periwinkle" | "green" | "yellow"

export interface IconProps {
  variant: IconVariant
  /** Class applied to SVG element */
  className?: string
  /** SVG icon background */
  background: ETA2021HighlightBackground
}

const iconBg = cva(
  [
    "flex items-center justify-center",
    "rounded-full",
    "w-legacy-9 h-legacy-9 legacy-lg:w-legacy-16 legacy-lg:h-legacy-16 p-legacy-2 legacy-lg:p-legacy-5",
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
export const ETA2021CompanyHighlight = ({
  variant,
  background,
  className,
  ...props
}: IconProps) => {
  const Icon = icons[variant]

  return (
    <div className={className}>
      <div className="flex items-center gap-[14px] text-legacy-xs tracking-legacy-widest legacy-md-lg:text-legacy-sm legacy-lg:flex-col legacy-lg:text-center">
        <div className={iconBg({ background })}>
          <Icon {...props} className="flex-1" />
        </div>
        <span>
          {variant
            .match(/[A-Z][a-z]+/g)
            ?.join(" ")
            .toLocaleUpperCase()}
        </span>
      </div>
    </div>
  )
}
