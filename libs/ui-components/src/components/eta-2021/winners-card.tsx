import React, { ReactNode } from "react"
import { cva } from "class-variance-authority"
import Link from "next/link"
import { ETA2021Button } from "./button"

export interface WinnersCardProps {
  /** Background color for the card*/
  color: "coral" | "periwinkle" | "lightBlue" | "lightGreen" | "yellow"
  title: string
  /** URL to the image file */
  icon: string
  /** Label text for button */
  link: string
  href: string
}

const card = cva(["p-8"], {
  variants: {
    color: {
      coral: ["bg-legacy-coral"],
      periwinkle: ["bg-legacy-periwinkle"],
      lightBlue: ["bg-legacy-light-blue"],
      lightGreen: ["bg-legacy-green-300"],
      yellow: ["bg-legacy-yellow"],
    },
  },
})

export const ETA2021WinnersCard = ({
  color = "coral",
  title = "",
  link = "",
  href = "",
  icon = "",
}: WinnersCardProps) => {
  return (
    <div className={card({ color })}>
      <h3 className="mb-10">{title}</h3>
      <div className="flex justify-between">
        <div className="pr-5">
          <ETA2021Button
            children={link}
            color="white"
            size="small"
            href={href}
          ></ETA2021Button>
        </div>
        <div>
          <img src={icon} className="h-10" />
        </div>
      </div>
    </div>
  )
}
