import React from 'react'
import { Facebook } from './facebook'
import { LinkedIn } from './linkedin'
import { Twitter } from './twitter'

export type SocialIconProps = Omit<React.HtmlHTMLAttributes<SVGElement>, 'className'> & {
  /** Icon to render */
  icon: 'facebook' | 'twitter' | 'linkedin'
  /** Class applied to SVG element */
  className?: string
}

/**
 * Renders SVG Social Icon. Icon has no set width or height and will need to be controlled by container or styling/classes.
 */
export const SocialIcon = ({ icon, ...props }: SocialIconProps) => {
  if (icon === 'facebook') return <Facebook {...props} />
  if (icon === 'linkedin') return <LinkedIn {...props} />
  if (icon === 'twitter') return <Twitter {...props} />
  return <></>
}
