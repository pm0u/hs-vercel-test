import React, { ReactNode } from "react"
import { cva, VariantProps } from "class-variance-authority"

interface ButtonBaseProps {
  /** Content displayed in the button */
  children: ReactNode
}

const button = cva(['py-4 px-8 rounded-md font-bold shadow-sm'], {
  variants: {
    /** Controls button appearance (color, background, font weight) */
    variant: {
      primary: [
        'bg-purple-60',
        'text-neutral-0'
      ],
      secondary: [
        'bg-lime-30',
        'text-neutral-100'
      ]
    }
  }
})

export interface ButtonProps
  extends VariantProps<typeof button>,
    ButtonBaseProps {}

export const Button = ({ children, variant = "primary" }: ButtonProps) => {
  return <button className={button({ variant })}>{children}</button>
}
