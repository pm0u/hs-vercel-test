import { ETA2022ShareYourWin, EtaIconVariant } from "components"
import { ETA2022AboutCompany } from "components/eta-2022/about-company"
import { toPascalCase } from "helpers/strings"
import { useSanityImage } from "hooks/use-sanity-image"
import { ETA2022Layout } from "layouts/eta-2022"
import { sanityClient } from "lib/sanity"
import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"
import { ETA2022Winner } from "types/eta-2022"
import Image from "next/image"
import styles from "styles/eta-2022/shared.module.css"
import { useTheme } from "contexts"
import { SanityImageObject } from "@sanity/image-url/lib/types/types"
import { getImageDimensions } from "helpers/sanity"

const heroLogoSizingClass = (image: SanityImageObject) => {
  const { aspectRatio } = getImageDimensions(image.asset._ref)

  if (aspectRatio < 1) return /* tw */ "h-3/4 w-auto"
  if (aspectRatio < 1.2) return /* tw */ "w-[45%]"
  if (aspectRatio < 3) return /* tw */ "w-[60.33%]"
  if (aspectRatio < 4.2) return /* tw */ "w-3/4"
  if (aspectRatio < 6.3) return /* tw */ "w-4/5"
  return /* tw */ "w-5/6"
}

const ETA2022WinnerTemplate = ({ company }: { company: ETA2022Winner }) => {
  const {
    pastWinner,
    name,
    companyHighlights,
    aboutTheCompanyParagraph,
    winnerLogo,
    studentQuote,
    shareButtonText,
  } = company

  const {
    theme: {
      theme: { screens },
    },
  } = useTheme()

  const winnerLogoProps = useSanityImage(winnerLogo)
  return (
    <ETA2022Layout style="Winner">
      <section
        className={`bg-neutral-0 pt-legacy-8 pb-legacy-10 ${styles.bottomLeftToRightSlant} relative mb-legacy-28`}
      >
        <div className="eta2022-grid-container mx-auto flex !max-w-screen-legacy-md-lg flex-col items-center justify-between legacy-sm-md:flex-row">
          <div className="flex aspect-video w-full items-center px-legacy-6 pb-legacy-9 legacy-sm-md:w-5/12 legacy-sm-md:p-0">
            <Image
              {...winnerLogoProps}
              alt={name}
              className={`-ml-[10px] px-[10px] ${heroLogoSizingClass(
                winnerLogo
              )}`}
              sizes={`(max-width: ${screens["legacy-sm-md"]}) 100%, min(50%, 400px)`}
              priority
            />
          </div>
          <div className="w-full legacy-sm-md:w-1/4">
            <ETA2022ShareYourWin
              className="mr-auto w-min px-legacy-6 legacy-sm-md:ml-auto legacy-sm-md:mr-0 legacy-sm-md:p-0"
              shareText={shareButtonText}
            />
          </div>
        </div>
      </section>
      <ETA2022AboutCompany
        pastWinner={pastWinner}
        name={name}
        about={aboutTheCompanyParagraph}
        highlights={companyHighlights.map(
          (highlight) => toPascalCase(highlight) as EtaIconVariant
        )}
        excerpt={studentQuote}
        className="pb-legacy-24"
      />
    </ETA2022Layout>
  )
}

export default ETA2022WinnerTemplate

export const getStaticPaths: GetStaticPaths<{
  category: string
  winnerSlug: string
}> = async () => {
  const companies: ETA2022Winner[] = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2022'] { winnerSlug, category->{ categorySlug } }`
  )

  return {
    paths: companies.map((company) => ({
      params: {
        category: company.category.categorySlug.current,
        winnerSlug: company.winnerSlug.current,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<
  { company: ETA2022Winner },
  { winnerSlug: string }
> = async ({ params }) => {
  const { winnerSlug } = params as ParsedUrlQuery

  const company = await sanityClient.fetch(
    /* groq */ `*[_type == 'etaWinners2022' && winnerSlug.current == $winnerSlug][0]`,
    { winnerSlug }
  )

  return {
    props: {
      company,
    },
  }
}
