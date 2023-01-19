import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider, ReusableImageProvider } from "../contexts"
import twConfig from "../tailwind.config"
import { NoiGrotesk, SansPlomb } from "components/base/fonts"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-noi-grotesk: ${NoiGrotesk.style.fontFamily};
          --font-sans-plomb: ${SansPlomb.style.fontFamily};
        }
      `}</style>
      <ReusableImageProvider>
        <ThemeProvider config={twConfig}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ReusableImageProvider>
    </>
  )
}
