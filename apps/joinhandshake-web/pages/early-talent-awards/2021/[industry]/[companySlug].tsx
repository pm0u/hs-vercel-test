import {
  Breadcrumbs,
  ETA2021Button,
  ETA2021CompanyHighlight,
  ETA21021HighlightBackground,
  IconVariant,
} from "components"
import { SocialIcon } from "components/base"
import { useReusableImages, useTheme } from "contexts"
import { urlResolver } from "helpers/sanity/url-resolver"
import { toPascalCase } from "helpers/strings"
import { useSanityImage } from "hooks/use-sanity-image"
import { ETA2021Layout } from "layouts/eta-2021"
import { sanityClient } from "lib/sanity"
import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/image"
import { ParsedUrlQuery } from "querystring"
import { ETA2021Industry, ETA2021Winner } from "types/eta-2021"
import { useUrl } from "hooks/use-url"

const backgrounds: ETA21021HighlightBackground[] = [
  "yellow",
  "periwinkle",
  "green",
]

type ETA2021WinnerData = Pick<
  ETA2021Winner,
  | "winnerLogo"
  | "name"
  | "aboutTheCompanyParagraph"
  | "companyHighlights"
  | "studentQuote"
  | "shareButtonText"
> & {
  industry: Pick<
    ETA2021Industry,
    "industrySlug" | "name" | "industryIcon" | "_type"
  >
}

const WinnerPage = ({ company }: { company: ETA2021WinnerData }) => {
  const { eta2021Logo } = useReusableImages()
  const etaLogoProps = useSanityImage(eta2021Logo.image)
  const companyLogoProps = useSanityImage(company.winnerLogo.asset)
  const industryLogoProps = useSanityImage(company.industry.industryIcon.asset)
  const {
    theme: {
      theme: { screens },
    },
  } = useTheme()

  const { url: shareUrl } = useUrl()

  return (
    <ETA2021Layout>
      <section className="legacy-lg:px-legacy-4">
        <div className="legacy-grid-container pt-legacy-4 pb-legacy-3 legacy-lg:!ml-legacy-4">
          <Breadcrumbs
            crumbs={[
              {
                label: "2021 early talent awards",
                href: urlResolver({ _type: "etaLanding2021" }),
              },
              {
                label: company.industry.name,
                href: urlResolver(company.industry),
              },
              { label: company.name },
            ]}
          />
        </div>
      </section>
      <section className="flex flex-wrap justify-center">
        <div className="flex w-full flex-col items-center justify-center bg-legacy-light-blue py-legacy-20 px-legacy-6 legacy-sm-md:w-1/2">
          <Image
            {...etaLogoProps}
            alt={eta2021Logo.descriptiveText}
            className="h-auto w-[86%] max-w-[408px]"
            sizes={`(min-width: ${screens["legacy-sm-md"]}) 45vw, 100vw`}
            priority
          />
        </div>
        <div className="flex flex-col items-center justify-center px-legacy-6 pt-legacy-6 pb-legacy-14 legacy-sm-md:w-1/2 legacy-md-lg:py-legacy-28">
          <Image
            {...companyLogoProps}
            alt={company.name}
            className="aspect-square max-w-[350px] object-contain"
            sizes={`(min-width: ${screens["legacy-sm-md"]}) 45vw, 100vw`}
          />
          <p className="text-legacy-xs uppercase tracking-legacy-widest legacy-md-lg:text-legacy-base">
            {company.name}
          </p>
        </div>
      </section>
      <section className="flex flex-wrap justify-center">
        <div className="relative flex w-full flex-col justify-center bg-legacy-green-300 py-legacy-14 px-legacy-6 legacy-sm-md:w-1/2 legacy-sm-md:p-legacy-14 legacy-lg:p-legacy-28">
          <Image
            {...industryLogoProps}
            alt=""
            className="absolute top-[50px] left-[50px] right-[-50px] bottom-[-50px] h-[calc(100%-100px)] w-[calc(100%-100px)] object-contain opacity-5"
            sizes={`(min-width: ${screens["legacy-sm-md"]}) 45vw, calc(100vw - 100px)`}
          />
          <div className="mx-auto max-w-[500px]">
            <h2 className="z-0 mb-legacy-2 text-legacy-2.25xl legacy-md-lg:text-legacy-3.5xl">
              About the employer
            </h2>
            <p className="z-0 legacy-md-lg:text-legacy-xl">
              {company.aboutTheCompanyParagraph}
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-legacy-4 bg-legacy-light-blue p-legacy-14 legacy-sm-md:w-1/2 legacy-sm-md:py-legacy-14 legacy-lg:p-legacy-28">
          <div className="mx-auto max-w-[500px]">
            <div className="flex max-w-[500px] flex-col gap-legacy-4 legacy-lg:mx-auto legacy-lg:flex-row legacy-lg:gap-legacy-6">
              {company.companyHighlights.map((highlight, i) => (
                <ETA2021CompanyHighlight
                  variant={toPascalCase(highlight) as IconVariant}
                  key={highlight}
                  background={backgrounds[i]}
                  className="flex-1"
                />
              ))}
            </div>
            <h2 className="mt-legacy-9 mb-legacy-2 text-legacy-xs uppercase tracking-legacy-widest legacy-md-lg:text-legacy-base">
              student testimonial
            </h2>
            <p className="italic legacy-sm-md:leading-legacy-relaxed legacy-md-lg:text-legacy-xl ">
              {company.studentQuote}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-legacy-twilight py-legacy-14 legacy-lg:sticky legacy-lg:bottom-0 legacy-lg:left-0 legacy-lg:right-0 legacy-lg:pb-legacy-4 legacy-lg:pt-legacy-6">
        <div className="legacy-grid-container flex flex-wrap justify-center">
          <div className="flex flex-col gap-legacy-8 legacy-sm-md:flex-row">
            <ETA2021Button
              color="yellow"
              size="large"
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                shareUrl
              )}`}
            >
              Share on LinkedIn
              <SocialIcon
                icon="linkedin"
                className="ml-legacy-2 h-legacy-6 w-auto"
              />
            </ETA2021Button>
            <ETA2021Button
              color="yellow"
              size="large"
              href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
            >
              Share on Facebook
              <SocialIcon
                icon="facebook"
                className="ml-legacy-2 h-legacy-6 w-auto"
              />
            </ETA2021Button>
            <ETA2021Button
              color="yellow"
              size="large"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                shareUrl
              )}&text=${encodeURIComponent(company.shareButtonText)}`}
            >
              Share on Twitter
              <SocialIcon
                icon="twitter"
                className="ml-legacy-2 h-legacy-6 w-auto"
              />
            </ETA2021Button>
          </div>
        </div>
      </section>
    </ETA2021Layout>
  )
}

export default WinnerPage

export const getStaticPaths: GetStaticPaths<{
  industry: string
  companySlug: string
}> = async () => {
  const companies = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2021']{ industry->{ industrySlug }, winnerSlug }`
  )

  const paths = companies.map((company: ETA2021Winner) => ({
    params: {
      industry: company.industry.industrySlug.current,
      companySlug: company.winnerSlug.current,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { company: ETA2021WinnerData },
  { companySlug: string; industry: string }
> = async ({ params }) => {
  const { companySlug } = params as ParsedUrlQuery

  const company = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2021' && winnerSlug.current == $companySlug][0] {name, aboutTheCompanyParagraph, studentQuote, winnerLogo, companyHighlights, industry->{ industrySlug, name, industryIcon, _type }, shareButtonText }`,
    { companySlug }
  )

  return {
    props: {
      company,
    },
  }
}
