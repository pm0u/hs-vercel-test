import { urlResolver } from "helpers/sanity/url-resolver"
import { useSanityImage } from "hooks/use-sanity-image"
import { sanityClient } from "lib/sanity"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { ETA2022Category, ETA2022Winner } from "types/eta-2022"
import styles from "styles/eta-2022/landing.module.css"
import { ETA2022FooterCta } from "components/eta-2022/footer-cta"
import { ETA2022Layout } from "layouts/eta-2022"
import { Slug } from "sanity"
import { ETA2022Header } from "components/eta-2022/header"
import { ETA2022LogoWall } from "components/eta-2022/logo-wall"

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

const ETA2022Landing = ({ categories, companies }: ETA2022LandingProps) => {
  return (
    <ETA2022Layout>
      <ETA2022Header>
        <h1 className="text-[27px] font-bold leading-legacy-tight legacy-sm-md:text-legacy-3.5xl">
          Celebrating the top employers that launch early careers to new heights
        </h1>
      </ETA2022Header>
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
        <ETA2022LogoWall companies={companies} style="home" />
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
