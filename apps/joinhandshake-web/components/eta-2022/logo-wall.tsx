import { getLogoSize } from "helpers/eta"
import { urlResolver } from "helpers/sanity/url-resolver"
import { useSanityImage } from "hooks/use-sanity-image"
import { ETA2022Winner } from "types/eta-2022"
import { Slug } from "sanity"
import Image from "next/image"
import Link from "next/link"
import styles from "styles/eta-2022/logo-wall.module.css"

type ETA2022WinnerData = Pick<
  ETA2022Winner,
  "name" | "winnerSlug" | "_type" | "winnerLogo"
> & { category: { categorySlug: Slug } }

const CompanyLogo = ({ company }: { company: ETA2022WinnerData }) => {
  const logoProps = useSanityImage(company.winnerLogo)
  const { aspectRatio } = getLogoSize(company.winnerLogo)
  return (
    <li className="flex items-end">
      <Link className="block" href={urlResolver(company)}>
        <Image
          {...logoProps}
          alt={company.name}
          className={`inline-block w-auto align-middle transition-transform duration-[350ms] hover:scale-110 logo-${company.name
            .toLowerCase()
            .replace(/ /g, "-")} logo--${Math.round(aspectRatio)}`}
        />
      </Link>
    </li>
  )
}
export const ETA2022LogoWall = ({
  companies,
  style,
  className,
}: {
  companies: ETA2022WinnerData[]
  style?: "home"
  className?: string
}) => {
  return (
    <div
      className={
        style === "home" ? styles.leftToRightSlant : styles.rightToLeftSlant
      }
    >
      <div className={className}>
        <ul
          className={`eta2022-grid-container ${styles.logos} ${
            style === "home" ? styles.home : ""
          }`}
        >
          {companies.map((company) => (
            <CompanyLogo company={company} key={company.name} />
          ))}
        </ul>
      </div>
    </div>
  )
}
