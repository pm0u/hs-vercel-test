import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ThemeProvider, ReusableImageProvider } from "../contexts"
import twConfig from "../tailwind.config"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReusableImageProvider>
      <ThemeProvider config={twConfig}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ReusableImageProvider>
  )
}
