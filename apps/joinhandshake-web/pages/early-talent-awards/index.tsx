import { useReusableImages } from "contexts"
import { urlResolver } from "helpers/sanity/url-resolver"
import { useSanityImage } from "hooks/use-sanity-image"
import { sanityClient } from "lib/sanity"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { ETA2022Category, ETA2022Winner } from "types/eta-2022"
import styles from "styles/eta-2022-landing.module.css"
import { getLogoSize } from "helpers/eta"
import { ETA2022FooterCta } from "components/eta-2022/footer-cta"
import { ETA2022Layout } from "layouts/eta-2022"
import { Slug } from "sanity"

type ETA2022CategoryData = Pick<
  ETA2022Category,
  "categorySlug" | "categoryIcon" | "name" | "_type"
>

type ETA2022WinnerData = Pick<
  ETA2022Winner,
  "name" | "winnerSlug" | "_type" | "winnerLogo"
> & { category: { categorySlug: Slug } }

interface ETA2022LandingProps {
  categories: ETA2022CategoryData[]
  companies: ETA2022WinnerData[]
}

const CategoryTile = ({ category }: { category: ETA2022CategoryData }) => {
  const logoProps = useSanityImage(category.categoryIcon)
  return (
    <li className={`${styles.categoryTile} group`}>
      <Link
        href={urlResolver(category)}
        className="flex h-full flex-col items-baseline justify-between"
      >
        <Image
          {...logoProps}
          alt=""
          className="mb-legacy-5 h-legacy-8 w-auto max-w-[57px] transition-all duration-[350ms] group-hover:invert"
        />
        <h3 className="text-legacy-sm legacy-sm-md:text-legacy-lg">
          Winners in {category.name}
        </h3>
      </Link>
    </li>
  )
}

const CompanyLogo = ({ company }: { company: ETA2022WinnerData }) => {
  const logoProps = useSanityImage(company.winnerLogo)
  const { aspectRatio } = getLogoSize(company.winnerLogo)
  return (
    <li className="mx-legacy-4 flex items-end legacy-md-lg:mx-legacy-6">
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

const ETA2022Landing = ({ categories, companies }: ETA2022LandingProps) => {
  const { eta2022Logo } = useReusableImages()
  const logoProps = useSanityImage(eta2022Logo.image)
  return (
    <ETA2022Layout>
      <section className={styles.headerContainer}>
        <div className="flex justify-end pb-legacy-8 legacy-sm-md:mx-[15px] legacy-sm-md:w-5/12 legacy-sm-md:pr-[30px] legacy-sm-md:pb-0">
          <Link href={urlResolver({ _type: "eta2022Landing" })}>
            <Image
              {...logoProps}
              alt={eta2022Logo.descriptiveText}
              className="transition-all duration-[350ms] hover:scale-110 hover:drop-shadow-[30px_30px_40px_rgba(186,24,209,.9)]"
            />
          </Link>
        </div>
        <h1 className={styles.headerTitle}>
          Celebrating the top employers that launch early careers to new heights
        </h1>
      </section>
      <section className="eta2022-grid-container pb-[60px] legacy-sm-md:pb-legacy-28">
        <ul className={styles.categoryGrid}>
          {categories.map((category) => (
            <CategoryTile category={category} key={category.name} />
          ))}
        </ul>
      </section>
      <section>
        <div className="eta2022-grid-container">
          <h2 className="pb-legacy-2 text-center text-legacy-2xl legacy-sm-md:text-legacy-3.95xl">
            Congratulations to our class of&nbsp;2022!
          </h2>
        </div>
        <div className={styles.leftToRightSlant}>
          <ul
            className={`eta2022-grid-container flex flex-wrap items-baseline justify-between ${styles.logos}`}
          >
            {companies.map((company) => (
              <CompanyLogo company={company} key={company.name} />
            ))}
          </ul>
        </div>
      </section>
      <ETA2022FooterCta className="py-legacy-10" />
    </ETA2022Layout>
  )
}

export default ETA2022Landing

export const getStaticProps: GetStaticProps<
  { categories: any[]; companies: any[] },
  {}
> = async () => {
  const categories = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaCategory2022']{ categorySlug, categoryIcon, name, _type }`
  )

  const companies = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2022']{ winnerSlug, winnerLogo, name, _type, category->{ categorySlug } } | order(lower(name) asc)`
  )

  return {
    props: {
      categories,
      companies,
    },
  }
}
