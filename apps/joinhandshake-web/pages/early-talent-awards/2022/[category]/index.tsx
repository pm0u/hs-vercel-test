import { ETA2022Header } from "components/eta-2022/header"
import { ETA2022Layout } from "layouts/eta-2022"
import { sanityClient } from "lib/sanity"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { Slug } from "sanity"
import { ETA2022Category, ETA2022Winner } from "types/eta-2022"
import { ETA2022LogoWall } from "components/eta-2022/logo-wall"
import { ETA2022FooterCta } from "components/eta-2022/footer-cta"

type ETA2022CategoryData = Pick<ETA2022Category, "name" | "description">

type ETA2022WinnerData = Pick<
  ETA2022Winner,
  "name" | "winnerLogo" | "_type" | "winnerSlug"
> & { category: Pick<ETA2022Category, "categorySlug"> }

interface CategoryPageProps {
  category: ETA2022CategoryData
  companies: ETA2022WinnerData[]
}

const CategoryPage = ({ category, companies }: CategoryPageProps) => {
  return (
    <ETA2022Layout style="Category">
      <ETA2022Header>
        <h1 className="pb-legacy-6 text-legacy-2xl legacy-xxs:text-legacy-3.95xl">
          {category.name}
        </h1>
        <p className="text-legacy-text">{category.description}</p>
      </ETA2022Header>
      <ETA2022LogoWall companies={companies} className="mx-[10px]" />
      <ETA2022FooterCta className="py-legacy-10" />
    </ETA2022Layout>
  )
}

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaCategory2022'] { categorySlug }`
  )

  return {
    paths: categories.map((category: { categorySlug: Slug }) => ({
      params: { category: category.categorySlug.current },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { category: ETA2022Category },
  { category: string }
> = async ({ params }) => {
  const { category } = params as ParsedUrlQuery
  const categoryData = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaCategory2022' && categorySlug.current == $category ][0] { name, description }`,
    { category }
  )
  const companies = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2022' && category->categorySlug.current == $category] { name, winnerLogo, _type, category->{ categorySlug }, winnerSlug }| order(lower(name) asc)`,
    { category }
  )

  return {
    props: {
      category: categoryData,
      companies,
    },
  }
}
