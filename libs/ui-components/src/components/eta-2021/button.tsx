import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import Link from 'next/link';

export interface ETA2021ButtonProps {
  /** Content displayed in the button */
  children: ReactNode
  /** Color theme for the button */
  color: 'blue' | 'green' | 'white' | 'yellow',
  /** Button size and padding */
  size: 'small' | 'large',
  /** URL to navigate the user to */
  href: string
}

const button = cva(
  [
    'block cursor-pointer py-4 px-8 whitespace-nowrap', 
    'border border-neutral-100 transform duration-30',
    'translate-x-1 -translate-y-1 hover:transform-none'
  ],{
  variants: {
    color: {
      blue: ["bg-legacy-twilight-600", "text-neutral-0"],
      green: ["bg-legacy-green-300"],
      white: ["bg-neutral-0"],
      yellow: ["bg-legacy-yellow"],
    },
    size: {
      small: ["text-sm", "py-2", "px-3"],
      large: ["text-base", "font-bold", "py-4", "px-6"],
    },
  },
})

export const ETA2021Button = ({ children, color = 'blue', size = 'large', href = '' }: ETA2021ButtonProps) => {
  return (
    // NOTE: assumption below that if href starts with '/' it is internal and will not open in a new tab
    <Link href={href} target={href.startsWith('/') ? "" : "_blank" }>
      <span className="bg-neutral-100 block">
        <span className={button({color, size})}>{children}</span>
      </span>
    </Link>
  );
}
