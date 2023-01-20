import { sanityClient } from "lib/sanity"
import { GetStaticPaths, GetStaticProps } from "next"
import { ETA2021Layout } from "layouts/eta-2021"
import { ETA2021Industry, ETA2021Winner } from "types/eta-2021"
import { Breadcrumbs } from "components"
import { urlResolver } from "helpers/sanity/url-resolver"
import { useReusableImages } from "contexts"
import { useSanityImage } from "hooks/use-sanity-image"
import { getLogoAspectRatio } from "."
import Image from "next/image"
import Link from "next/link"
import { getImageDimensions } from "helpers/sanity/images"
import { cva } from "class-variance-authority"
import { ParsedUrlQuery } from "querystring"

type ETA2021WinnerData = Pick<
  ETA2021Winner,
  "name" | "winnerLogo" | "winnerSlug" | "industry" | "_type"
>

type ETA2021IndustryData = Pick<
  ETA2021Industry,
  "industryBackgroundColor" | "name"
>

const companyTileLogo = cva(
  ["absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"],
  {
    variants: {
      logoSize: {
        tall: "w-auto h-[56.66%]",
        square: "w-[73.33%]",
        wide: "w-full",
        veryWide: "w-full",
      },
    },
  }
)

const CompanyTile = ({ company }: { company: ETA2021WinnerData }) => {
  const imageProps = useSanityImage(company.winnerLogo.asset)
  const { aspectRatio } = getImageDimensions(company.winnerLogo.asset._ref)
  const logoSize = getLogoAspectRatio(aspectRatio)
  return (
    <Link
      className="flex flex-col items-center py-legacy-6"
      href={urlResolver(company)}
    >
      <div className="aspect-square w-legacy-32 bg-neutral-0 p-legacy-6 legacy-xs:w-[185px]">
        <div className="relative h-full">
          <Image
            {...imageProps}
            alt={company.name}
            className={companyTileLogo({ logoSize })}
          />
        </div>
      </div>
      <p className="py-legacy-3 px-legacy-8 text-center text-legacy-xs uppercase tracking-legacy-widest legacy-md-lg:text-legacy-sm">
        {company.name}
      </p>
    </Link>
  )
}

const heroBanner = cva([""], {
  variants: {
    industryBackgroundColor: {
      coral: "bg-legacy-coral",
      periwinkle: "bg-legacy-periwinkle",
      "light-blue": "bg-legacy-light-blue",
      "green-light": "bg-legacy-green-300",
      yellow: "bg-legacy-yellow",
    },
  },
})

const IndustryPage = ({
  industry,
  companies,
}: {
  industry: ETA2021IndustryData
  companies: ETA2021WinnerData[]
}) => {
  const { eta2021Logo } = useReusableImages()
  const { industryBackgroundColor } = industry
  const heroImageProps = useSanityImage(eta2021Logo.image)
  return (
    <ETA2021Layout>
      <section className="legacy-lg:px-legacy-4">
        <div className="legacy-grid-container pt-legacy-4 pb-legacy-3 legacy-lg:!ml-legacy-4">
          <Breadcrumbs
            crumbs={[
              {
                label: "2021 Early Talent Awards",
                href: urlResolver({ _type: "etaLanding2021" }),
              },
              { label: industry.name },
            ]}
          />
        </div>
      </section>
      <section className={heroBanner({ industryBackgroundColor })}>
        <div className="legacy-grid-container flex flex-col-reverse items-center justify-between py-legacy-12 text-center legacy-sm-md:flex-row legacy-sm-md:py-legacy-20 legacy-sm-md:text-left">
          <div className="legacy-sm-md:w-2/3">
            <p className="px-legacy-6 text-legacy-sm font-bold uppercase legacy-sm-md:leading-legacy-normal">
              early talent award winners in
            </p>
            <h1 className="mb-legacy-2 px-legacy-6 text-legacy-3.5xl font-bold legacy-lg:text-legacy-4.625xl">
              {industry.name}
            </h1>
            <h2 className="max-w-[625px] px-legacy-6 pt-legacy-5 text-legacy-1.5xl !leading-legacy-relaxed legacy-lg:text-legacy-3xl">
              Honoring {companies.length.toString()} employers in{" "}
              {industry.name.toLowerCase()} for visionary and engagement and
              excellence in digital recruiting.
            </h2>
          </div>
          <Image
            {...heroImageProps}
            className="max-w-[275px] pt-legacy-4 pb-legacy-12 legacy-sm-md:w-1/3 legacy-sm-md:max-w-none legacy-sm-md:p-0"
            alt=""
          />
        </div>
      </section>
      <section className="bg-legacy-gray-100 py-legacy-20">
        <div className="legacy-grid-container">
          <h3 className="pb-legacy-12 text-center legacy-md:!-mx-[30px] legacy-md-lg:text-legacy-lg">
            From on campus to online, learn what’s unique about these
            transformative programs by clicking on an employer&nbsp;below.
          </h3>
        </div>
        <div className="legacy-grid-container">
          <div className="grid grid-cols-2 legacy-sm-md:grid-cols-3 legacy-md:!-mx-[30px] legacy-md-lg:grid-cols-5">
            {companies.map((company) => (
              <CompanyTile company={company} key={company.name} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-nori py-legacy-20 text-center text-neutral-0">
        FOOTER CTA
      </section>
    </ETA2021Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const industries = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaIndustry2021'] { industrySlug }`
  )
  return {
    paths: industries.map(
      (industry: { industrySlug: { current: string } }) => ({
        params: { industry: industry.industrySlug.current },
      })
    ),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { industry: ETA2021IndustryData; companies: ETA2021WinnerData[] },
  { industry: string }
> = async ({ params }) => {
  const { industry } = params as ParsedUrlQuery
  const industryData: ETA2021IndustryData[] = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaIndustry2021' && industrySlug.current == $industry] { name, industryBackgroundColor }`,
    { industry }
  )

  const companies: ETA2021WinnerData[] = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2021' && industry->industrySlug.current == $industry] { name, winnerLogo, winnerSlug, industry->{ industrySlug }, _type }`,
    { industry }
  )

  return {
    props: {
      industry: industryData[0],
      companies,
    },
  }
}

export default IndustryPage
