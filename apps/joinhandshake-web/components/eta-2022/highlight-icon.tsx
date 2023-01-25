import React from "react"
import { icons, IconVariant } from "../eta/highlight-icons"
import { cva } from "class-variance-authority"

export type ETA2022HighlightBackground = "pink" | "orange" | "green"

interface ETA2022HighlightIconProps
  extends Omit<React.HTMLAttributes<SVGElement>, "className"> {
  variant: IconVariant
  className?: string
  background: ETA2022HighlightBackground
}

const iconBackground = cva(["rounded-full w-legacy-9 p-legacy-2"], {
  variants: {
    background: {
      pink: ["bg-eta2022-pink"],
      orange: ["bg-eta2022-orange"],
      green: ["bg-eta2022-green"],
    },
  },
})

export const ETA2022HighlightIcon = ({
  variant,
  className = "",
  background,
  ...props
}: ETA2022HighlightIconProps) => {
  const Icon = icons[variant]
  return (
    <div className={`flex items-center gap-legacy-3 ${className}`}>
      <div className={iconBackground({ background })}>
        <Icon {...props} className="text-neutral-100" />
      </div>
      <p className="text-neutral-0">
        {variant.match(/[A-Z][a-z]+/g)?.join(" ")}
      </p>
    </div>
  )
}
