import "../styles/globals.css"
import React from "react"
import * as NextImage from "next/image"
import * as Head from "next/head"
import {
  ThemeProvider,
  ReusableImageProvider,
  DevImageProvider,
} from "../contexts"
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport"
/**
 * Cannot figure out how to get a type out of this
 */
// @ts-ignore
import tailwindTheme from "../../joinhandshake-web/tailwind.config"

/**
 * Force unoptimized images in stories
 * @see https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
 */
const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props: any) => <OriginalNextImage {...props} unoptimized />,
})

/**
 * For now, next/head is not supported in storybook. This will just output the contents of next/head
 * inline in the DOM which may help with review in some situations. This may also create invalid markup
 * for elements that can only be children of <head></head> so we may have to revisit this. This should be
 * solved for storybook 7
 * @see https://github.com/storybookjs/storybook/issues/20189
 */
Object.defineProperty(Head, "default", {
  configurable: true,
  value: ({ children }: { children: React.ReactElement }) => <>{children}</>,
})

export const decorators = [
  (Story: () => JSX.Element) => (
    <ReusableImageProvider>
      <DevImageProvider>
        <ThemeProvider config={tailwindTheme}>{Story()}</ThemeProvider>
      </DevImageProvider>
    </ReusableImageProvider>
  ),
]

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: [
        "Style Guide",
        ["Main Brand", "Legacy", "ETA 2022"],
        "*",
        "Examples",
      ],
    },
  },
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      "1024x768": {
        name: "1024x768",
        styles: {
          width: "1024px",
          height: "768px",
        },
      },
      "1280x720": {
        name: "1280x720",
        styles: {
          width: "1280px",
          height: "720px",
        },
      },
      "1366x768": {
        name: "1366x768",
        styles: {
          width: "1366px",
          height: "768px",
        },
      },
      "1563x824": {
        name: "1563x824",
        styles: {
          width: "1536px",
          height: "824px",
        },
      },
      "1600x900": {
        name: "1600x900",
        styles: {
          width: "1600px",
          height: "900px",
        },
      },
      "1920x1080": {
        name: "1920x1080",
        styles: {
          width: "1920px",
          height: "1080px",
        },
      },
      "2560x1440": {
        name: "2560x1440",
        styles: {
          width: "2560px",
          height: "1440px",
        },
      },
      "3840x2160": {
        name: "3840x2160",
        styles: {
          width: "3840px",
          height: "2160px",
        },
      },
    },
  },
}
