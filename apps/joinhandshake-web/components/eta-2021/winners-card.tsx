import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import React from "react"
import { cva } from "class-variance-authority"
import { ETA2021Button } from "./button"
import Image from "next/image"
import { useSanityImage } from "hooks/use-sanity-image"

export type IndustryBackgroundColor =
  | "coral"
  | "periwinkle"
  | "light-blue"
  | "green-light"
  | "yellow"

export interface WinnersCardProps {
  /** Background color for the card */
  color: IndustryBackgroundColor
  title: string
  /** Sanity Image Object */
  icon: SanityImageObject
  buttonText: string
  href: string
}

const card = cva(["p-legacy-8"], {
  variants: {
    color: {
      coral: ["bg-legacy-coral"],
      periwinkle: ["bg-legacy-periwinkle"],
      "light-blue": ["bg-legacy-light-blue"],
      "green-light": ["bg-legacy-green-300"],
      yellow: ["bg-legacy-yellow"],
    },
  },
})

export const ETA2021WinnersCard = (props: WinnersCardProps) => {
  const imageProps = useSanityImage(props.icon)

  return (
    <div className={card({ color: props.color })}>
      <div className="flex min-h-[160px] flex-col justify-between">
        <h3 className="mb-legacy-10 text-legacy-xl legacy-xs:text-legacy-2xl legacy-lg:text-legacy-3xl">
          {props.title}
        </h3>
        <div className="flex justify-between">
          <div className="pr-legacy-5">
            <ETA2021Button color="white" size="small" href={props.href}>
              {props.buttonText}
            </ETA2021Button>
          </div>
          <Image
            className="h-legacy-10 w-legacy-10"
            {...imageProps}
            alt=""
            sizes="40px"
          ></Image>
        </div>
      </div>
    </div>
  )
}
