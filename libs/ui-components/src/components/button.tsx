import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority'

export interface ButtonProps {
  /** Content displayed in the button */
  children: ReactNode
  /** Controls button appearance (color, background, font weight) */
  variant?: 'primary' | 'secondary' | 'accessibility'
}

const button = cva(['py-4 px-8 rounded-md font-bold shadow-sm'], {
  variants: {
    variant: {
      primary: [
        'bg-cyan-90',
        'text-neutral-0'
      ],
      secondary: [
        'bg-lime-30',
        'text-lime-100',
      ],
      accessibility: [
        'bg-lime-40',
        'text-lime-10',
      ],
    }
  }
})

export const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  return <button className={button({ variant })}>{children}</button>
}
