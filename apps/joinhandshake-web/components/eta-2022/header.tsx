import { useReusableImages } from "contexts"
import { useSanityImage } from "hooks/use-sanity-image"
import Image from "next/image"
import Link from "next/link"
import { urlResolver } from "helpers/sanity/url-resolver"
import React from "react"
import styles from "styles/eta-2022/header.module.css"

export const ETA2022Header = ({ children }: { children: React.ReactNode }) => {
  const { eta2022Logo } = useReusableImages()
  const logoProps = useSanityImage(eta2022Logo.image)

  return (
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
      <div className={styles.headerContent}>{children}</div>
    </section>
  )
}
