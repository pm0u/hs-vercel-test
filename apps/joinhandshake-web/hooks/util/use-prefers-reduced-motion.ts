import { useEffect, useState } from "react"
const QUERY = "(prefers-reduced-motion: no-preference)"

const getInitialState = () =>
  typeof window === "undefined" ? true : !window.matchMedia(QUERY).matches

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState)
  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(!event.matches)
    }
    mediaQueryList.addEventListener("change", listener)
    return () => {
      mediaQueryList.removeEventListener("change", listener)
    }
  }, [])

  return { prefersReducedMotion }
}
