import { sanityClient } from "lib/sanity"
import { ETA2021Industry, ETA2021Winner } from "types/eta-2021"
import { ETA2021WinnersCard } from "components/eta-2021/winners-card"
import { urlResolver } from "helpers/sanity/url-resolver"
import { useSanityImage } from "hooks/use-sanity-image"
import Image from "next/image"
import { cva } from "class-variance-authority"
import {
  SanityDocument,
  SanityImageObject,
  SanityReusableImage,
} from "types/sanity"
import { ETA2021Button } from "components"
import Link from "next/link"
import { ETA2021Layout } from "layouts/eta-2021"
import { useTheme } from "contexts"
import { YoutubePopout } from "components/base"
import { getLogoSize } from "helpers/eta"

type ETA2021WinnerData = Pick<
  ETA2021Winner,
  "name" | "winnerSlug" | "winnerLogo" | "_type" | "industry"
>

interface ETA2021LandingPageProps {
  industries: Array<
    Pick<
      ETA2021Industry,
      | "name"
      | "industrySlug"
      | "industryBackgroundColor"
      | "industryIcon"
      | "_type"
    >
  >
  companies: ETA2021WinnerData[]
  pageData: SanityDocument & {
    heroImage: SanityReusableImage
    youtubeVideoId: string
    youtubeVideoPoster: SanityImageObject
  }
}

const companyLogo = cva(["w-auto m-legacy-6"], {
  variants: {
    logoSize: {
      tall: "max-h-legacy-10",
      square: "max-h-legacy-10",
      wide: "max-h-legacy-6",
      veryWide: "max-h-legacy-4",
    },
  },
})

const CompanyLogo = ({ company }: { company: ETA2021WinnerData }) => {
  const { winnerLogo, name } = company
  const url = urlResolver(company)
  const imageProps = useSanityImage(winnerLogo)
  const { logoSize, aspectRatio } = getLogoSize(winnerLogo)
  return (
    <Link href={url}>
      <Image
        {...imageProps}
        alt={name}
        className={companyLogo({ logoSize })}
        sizes={`${aspectRatio * 20}px`}
      />
    </Link>
  )
}

const LandingPage = ({
  industries,
  companies,
  pageData,
}: ETA2021LandingPageProps) => {
  const heroImageProps = useSanityImage(pageData.heroImage.image)
  const posterImageProps = useSanityImage(pageData.youtubeVideoPoster)

  const {
    theme: {
      theme: { screens },
    },
  } = useTheme()

  return (
    <ETA2021Layout>
      <section className="bg-legacy-yellow py-legacy-16">
        <div className="legacy-grid-container mx-auto flex flex-col-reverse gap-legacy-9 legacy-md:flex-row legacy-md:gap-legacy-4">
          <div className="legacy-md:ml-auto legacy-md:w-5/12">
            <h1 className="text-legacy-4xl leading-legacy-extra-tight tracking-legacy-smtight">
              Handshake’s Early Talent Awards 2021
            </h1>
            <p className="py-legacy-4 text-legacy-text">
              In its inaugural debut, Handshake’s Early Talent Awards celebrate
              the legendary employers inspiring tomorrow’s leaders today.
              Congratulations to our winners!
            </p>
            <ETA2021Button
              color="blue"
              size="large"
              href="#industries"
              className="mt-legacy-6"
            >
              See if you&apos;ve won
            </ETA2021Button>
          </div>
          <Image
            {...heroImageProps}
            sizes={`(min-width: ${screens["legacy-lg"]}) 50vw; 100vw`}
            alt=""
            className="legacy-md:mr-[calc(1/12*100%)] legacy-md:ml-auto legacy-md:w-1/3"
            priority
          />
        </div>
      </section>
      <section className="bg-legacy-gray-100 py-legacy-20">
        <div className="legacy-grid-container legacy-md:flex legacy-md:gap-legacy-4">
          <YoutubePopout
            videoId={pageData.youtubeVideoId}
            className="relative ml-auto legacy-md:w-5/12"
          >
            <Image
              {...posterImageProps}
              alt="Play video"
              sizes={`(min-width: ${screens["legacy-lg"]}) 50vw; 100vw`}
              priority
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 85 85"
              version="1.1"
              className="absolute top-1/2 left-1/2 h-legacy-20 w-legacy-20 -translate-x-1/2 -translate-y-1/2"
            >
              <title>Play</title>
              <g
                id="Designs"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                <g
                  id="HS_web_reskin_university"
                  transform="translate(-1187.000000, -4238.000000)"
                >
                  <g
                    id="Button-/-Play-Button"
                    transform="translate(1187.000000, 4238.000000)"
                  >
                    <g id="Group-3">
                      <circle
                        id="Oval"
                        fill="#FFFFFF"
                        cx="42.5"
                        cy="42.5"
                        r="42.5"
                      />
                      <polygon
                        id="Path-5"
                        fill="#FB3325"
                        transform="translate(48.000000, 43.500000) rotate(-270.000000) translate(-48.000000, -43.500000) "
                        points="33 56.5 63 56.5 48 30.5"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </YoutubePopout>
          <div className="legacy-md:ml-auto legacy-md:w-5/12">
            <h2 className="mt-legacy-5 text-legacy-2.25xl">
              An out-of-this world award you&apos;ll want to phone home about
            </h2>
            <p className="my-legacy-4 text-legacy-text">
              See what makes this year&apos;s winners so special then join our
              awards show to learn from some of the best in recruiting.
            </p>
            <ETA2021Button
              color="green"
              size="large"
              href="https://go.joinhandshake.com/Top-Early-Talent-Awards-On-Demand-Hub-Lp.html?_ga=2.211678998.2072928197.1673377749-1998017243.1668532734"
              className="mt-legacy-6"
            >
              Watch the event
            </ETA2021Button>
          </div>
        </div>
      </section>
      <section className="py-legacy-20" id="industries">
        <h2 className="pb-legacy-12 text-center text-legacy-5xl">
          Winners By Industry
        </h2>
        <section className="legacy-grid-container mx-auto grid gap-legacy-6 px-legacy-6 legacy-md:grid-cols-2 legacy-lg:grid-cols-3 legacy-lg:gap-legacy-10">
          {industries.map((industry) => {
            const {
              industryBackgroundColor,
              industryIcon,
              name,
              industrySlug,
            } = industry
            return (
              <ETA2021WinnersCard
                key={industrySlug.current}
                color={industryBackgroundColor}
                title={name}
                icon={industryIcon}
                buttonText="See the winners"
                href={urlResolver(industry)}
              />
            )
          })}
        </section>
      </section>
      <section className="bg-legacy-gray-100">
        <section className="legacy-grid-container mx-auto py-legacy-20">
          <h2 className="pb-legacy-10 text-center text-legacy-4.5xl">
            Congratulations to our class of 2021
          </h2>
          <section className="flex flex-wrap items-center justify-center">
            {companies.map((company) => (
              <CompanyLogo company={company} key={company.winnerSlug.current} />
            ))}
          </section>
        </section>
      </section>
      <section className="bg-nori py-legacy-20 text-center text-neutral-0">
        Footer CTA
      </section>
    </ETA2021Layout>
  )
}

export default LandingPage

export const getStaticProps = async () => {
  const [industries, companies, landingPages] = await Promise.all([
    sanityClient.fetch(
      /* groq */ `*[_type == 'etaIndustry2021'] { name, industrySlug, industryBackgroundColor, industryIcon, _type }`
    ),
    sanityClient.fetch(
      /* groq */ `*[_type == 'etaWinners2021'] { name, winnerSlug, winnerLogo, _type, industry->{industrySlug} }`
    ),
    sanityClient.fetch(
      /* groq */ `*[_type == 'etaLanding2021'] { ..., heroImage-> }`
    ),
  ])

  return {
    props: {
      industries,
      companies,
      pageData: landingPages[0],
    },
  }
}
