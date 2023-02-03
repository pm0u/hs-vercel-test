import React, { useRef } from "react"
import { useGalaxy } from "hooks/eta-2022/use-galaxy"
import Image from "next/image"
import styles from "./space-background.module.scss"
import { useReusableImages } from "contexts"
import { useSanityImage } from "hooks/use-sanity-image"
import { usePrefersReducedMotion } from "hooks/util/use-prefers-reduced-motion"

export type SpaceBackgroundStyle = "Category" | ""

interface SpaceBackgroundProps {
  children: React.ReactNode
  className?: string
  style?: SpaceBackgroundStyle
}

export const ETA2022SpaceBackground = ({
  children,
  className = "",
  style = "",
}: SpaceBackgroundProps) => {
  const { eta2022HotPinkPlanet, eta2022BluePlanet, eta2022OrangePlanet } =
    useReusableImages()

  const pinkPlanetProps = useSanityImage(eta2022HotPinkPlanet.image)
  const bluePlanetProps = useSanityImage(eta2022BluePlanet.image)
  const orangePlanetProps = useSanityImage(eta2022OrangePlanet.image)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { prefersReducedMotion } = usePrefersReducedMotion()

  useGalaxy(canvasRef.current, prefersReducedMotion)

  return (
    <div className={`${styles.eta2022Bg} ${className}`}>
      <canvas className={styles.eta2022BgStars} ref={canvasRef} />
      <div
        className={`${styles.eta2022BgNova} ${styles.eta2022BgNovaPurple}`}
      />
      <div
        className={`${styles.eta2022BgNova} ${
          styles[`eta2022BgNovaRed${style}`]
        } ${style !== "Category" ? styles.eta2022BgNovaLarge : ""}`}
      />
      <div
        className={`${styles.eta2022BgNova} ${
          styles[`eta2022BgNovaGreen${style}`]
        } ${style !== "Category" ? styles.eta2022BgNovaLarge : ""}`}
      />
      <div
        className={`${styles.eta2022BgPlanet} ${
          styles[`eta2022BgPlanetPink${style}`]
        }`}
      >
        <Image {...pinkPlanetProps} alt="" priority />
      </div>
      <div
        className={`${styles.eta2022BgPlanet} ${styles.eta2022BgPlanetBlue}`}
      >
        <Image {...bluePlanetProps} alt="" />
      </div>
      <div
        className={`${styles.eta2022BgPlanet} ${
          styles[`eta2022BgPlanetOrange${style}`]
        }`}
      >
        <Image {...orangePlanetProps} alt="" />
      </div>
      <div className="relative z-[5]">{children}</div>
    </div>
  )
}
