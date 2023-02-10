import React from "react"
import Image from "next/image"
import { EtaIconVariant } from "components/eta/highlight-icons"
import { useReusableImages } from "contexts"
import { useSanityImage } from "hooks/use-sanity-image"
import { ETA2022PastWinnerBadge } from "./past-winner-badge"
import {
  ETA2022HighlightBackground,
  ETA2022HighlightIcon,
} from "./highlight-icon"

interface AboutCompanyProps {
  name: string
  pastWinner: boolean
  highlights: EtaIconVariant[]
  excerpt: string
  about: string
  className?: string
}
const colorOrder: ETA2022HighlightBackground[] = ["pink", "orange", "green"]

const h2 =
  /* tw */ "pb-legacy-2 text-legacy-sm font-bold uppercase tracking-legacy-widest"

const section =
  /* tw */ "pb-legacy-10 legacy-sm-md:px-legacy-4 legacy-sm-md:w-3/4"

export const ETA2022AboutCompany = ({
  pastWinner,
  name,
  about,
  highlights,
  excerpt,
  className = "",
}: AboutCompanyProps) => {
  const { eta2022Logo } = useReusableImages()
  const logoProps = useSanityImage(eta2022Logo.image)
  return (
    <section
      className={`px-legacy-6 text-neutral-0 ${className} legacy-sm-md:px-0`}
    >
      <div className="eta2022-grid-container !max-w-screen-legacy-md-lg">
        <div className="pb-legacy-10">
          <div className="flex-row-reverse legacy-sm-md:flex">
            <div className="pb-legacy-9 legacy-sm-md:w-1/4 legacy-sm-md:pl-legacy-4">
              <Image
                {...logoProps}
                alt={eta2022Logo.descriptiveText}
                className="h-min w-full max-w-[175px] transition-all duration-[350ms] hover:scale-110 hover:drop-shadow-[30px_30px_40px_rgba(186,24,209,.9)] legacy-sm-md:ml-auto"
              />
            </div>
            <div className="legacy-sm-md:w-3/4 legacy-sm-md:flex-1 legacy-sm-md:pr-legacy-4">
              {pastWinner ? (
                <ETA2022PastWinnerBadge className="mt-legacy-10" />
              ) : null}
              <h1 className="py-legacy-6 text-legacy-3.95xl">{name}</h1>
              <h2 className={h2}>about the program</h2>
              <p className="text-legacy-lg">{about}</p>
            </div>
          </div>
        </div>
        <div className={section}>
          <h2 className={h2}>why students love {name}</h2>
          <div className="flex flex-col gap-legacy-3 rounded-legacy-2.5xl border border-neutral-0 py-legacy-6 px-[18px] legacy-sm-md:flex-row legacy-sm-md:gap-legacy-9 legacy-sm-md:px-legacy-9">
            {highlights.map((highlight, i) => (
              <ETA2022HighlightIcon
                variant={highlight}
                key={highlight}
                background={colorOrder[i]}
              />
            ))}
          </div>
        </div>
        <div className={section}>
          <h2 className={h2}>hear about the student experience</h2>
          <p className="text-legacy-lg">{excerpt}</p>
        </div>
      </div>
    </section>
  )
}
