
import {StorybookConfig} from '@storybook/react/types'
import * as webpack from "webpack";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../../../libs/ui-components/src/components/base",
      titlePrefix: "Components",
      files: "**/*.stories.*"
    },
    {
      directory: "../../../libs/ui-components/src/components/eta-2021",
      titlePrefix: "ETA 2021",
      files: "**/*.stories.*"
    },
    {
      directory: "../../../libs/ui-components/src/components/eta-2022",
      titlePrefix: "ETA 2022",
      files: "**/*.stories.*"
    },
    {
      directory: '../../../libs/ui-components/style-guide',
      titlePrefix: "Style Guide",
      files: '**/*.stories.*',
    }
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    '@storybook/addon-a11y',
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (c) => {
    c.plugins?.push(
      new webpack.DefinePlugin({
        'process.env.__NEXT_NEW_LINK_BEHAVIOR': true,
      })
    )

    return c
  }
}

module.exports = config