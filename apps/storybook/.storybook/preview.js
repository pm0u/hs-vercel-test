// @ts-check
import "@joinhandshake/ui-components/dist/style.css"
import React from 'react'
import * as NextImage from "next/image";

/**
 * Force unoptimized images in stories
 * @see https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
 */
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Style Guide', ['Main Brand', 'Legacy', 'ETA 2022'], '*', 'Examples']
    }
  }
}