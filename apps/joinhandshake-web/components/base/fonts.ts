import localFont from "@next/font/local"

export const NoiGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/NoiGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoiGrotesk-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoiGrotesk-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoiGrotesk-SemiboldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoiGrotesk-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoiGrotesk-RegularItalic.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/NoiGrotesk-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/NoiGrotesk-SemiboldItalic.woff",
      weight: "600",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  variable: "--font-noi-grotesk",
  declarations: [
    {
      prop: "font-feature-settings",
      value: '"ss03" 1,"ss06" 1,"ss12" 1;',
    },
  ],
})

export const SansPlomb = localFont({
  src: [
    {
      path: "../../public/fonts/SansPlomb-95.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SansPlomb-95Oblique.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/SansPlomb-95.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/SansPlomb-95Oblique.woff",
      weight: "400",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
  variable: "--font-sans-plomb",
})

export const ChicagoFLF = localFont({
  src: [
    {
      path: "../../public/fonts/ChicagoFLF.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "block",
  preload: true,
  fallback: ["monospace"],
  variable: "--font-chicago-flf",
})

export const Geneva = localFont({
  src: [
    {
      path: "../../public/fonts/Geneva.woff",
      weight: "400",
      style: "normal",
    },
  ],
  display: "block",
  preload: true,
  fallback: ["system-ui"],
  variable: "--font-geneva",
})
