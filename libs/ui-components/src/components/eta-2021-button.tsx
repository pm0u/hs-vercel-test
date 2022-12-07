import React, { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import Link from 'next/link';

export interface ETA2021ButtonProps {
  /** Content displayed in the button */
  label: ReactNode
  /** Color theme for the button */
  color: 'blue' | 'green' | 'white' | 'yellow',
  /** Button size and padding */
  size: 'small' | 'large',
  /** Optional icon to appear after the label */
  icon?: string,
  /** Does this link take the user away from the app? */
  external?: boolean,
  /** URL to navigate the user to */
  href?: string
}

const animationStyles = 'transform duration-30 translate-x-1 -translate-y-1 hover:transform-none';

const button = cva([`block cursor-pointer py-4 px-8 whitespace-nowrap border border-neutral-100 ${animationStyles}`], {
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

export const ETA2021Button = ({ label, color = 'blue', size = 'large', external = false, href='', icon = '' }: ETA2021ButtonProps) => {
  return (
    <Link href={href} target={external ? "_blank" : ""} className="bg-neutral-100 block">
      <span className={button({color, size})}>
        {label}
        {icon ? <i className={icon}/> : null}
      </span>
    </Link>
  );
}
