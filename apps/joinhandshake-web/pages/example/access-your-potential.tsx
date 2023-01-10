import { HeroBanner, PortableTextBlocks } from "../../components/examples"
import { sanityClient } from "../../lib/sanity"

const AccessYourPotential = ({ pageData }: { pageData: any }) => {
  const { content, heroBanner } = pageData
  return (
    <main>
      <HeroBanner title={heroBanner.title} content={heroBanner.content} />
      <section className="container mx-auto">
        <PortableTextBlocks value={content} />
      </section>
    </main>
  )
}

export default AccessYourPotential

export const getStaticProps = async () => {
  const pageData = (
    await sanityClient.fetch(
      /* groq */ `*[_type == 'exampleAccessYourPotential']`
    )
  )[0]

  return {
    props: {
      pageData,
    },
  }
}
