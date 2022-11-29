import React, { ReactNode } from "react"
import { cva } from "class-variance-authority"

export interface ButtonProps {
  /** Content displayed in the button */
  children: ReactNode
  /** Controls button appearance (color, background, font weight) */
  variant?: 'primary'|'secondary'
}

const button = cva(['py-4 px-8 rounded-md font-bold shadow-sm'], {
  variants: {
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

export const Button = ({ children, variant = "primary" }: ButtonProps) => {
  return <button className={button({ variant })}>{children}</button>
}
