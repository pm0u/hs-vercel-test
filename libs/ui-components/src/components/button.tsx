import React, { ReactNode } from "react"

interface ButtonProps {
  /** Content displayed in the button */
  children: ReactNode
  /** Button variant (text color and background color) */
  variant?: "primary" | "secondary"
}

export const Button = ({ children, variant = "primary" }: ButtonProps) => {
  return <button className={variant}>{children}</button>
}
