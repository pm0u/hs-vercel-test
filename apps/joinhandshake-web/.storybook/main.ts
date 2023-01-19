import { StorybookConfig } from "@storybook/react/types"
import * as webpack from "webpack"
import * as dotenv from "dotenv"

// Pulls in ENV vars to configure sanity
dotenv.config()

const config: StorybookConfig = {
  stories: [
    {
      directory: "../components/eta-2021",
      titlePrefix: "ETA 2021",
      files: "**/*.stories.*",
    },
    {
      directory: "../components/eta-2022",
      titlePrefix: "ETA 2022",
      files: "**/*.stories.*",
    },
    {
      directory: "../storybook/style-guide",
      titlePrefix: "Style Guide",
      files: "**/*.stories.*",
    },
    {
      directory: "../components/examples",
      titlePrefix: "Examples",
      files: "**/*.stories.*",
    },
    {
      directory: "../components/base",
      titlePrefix: "Base",
      files: "**/*.stories.*",
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "storybook-addon-next",
  ],
  staticDirs: ["../public/"],
  framework: "@storybook/react",
  core: {
    builder: "webpack5",
  },
  webpackFinal: (config) => {
    const rules = config.module?.rules

    if (!rules) {
      throw new Error("No webpack rules found!")
    }

    // Adds next preval compatibility to storybook webpack
    rules.push({
      test: /\.preval\.(t|j)sx?$/,
      loader: require.resolve("next-plugin-preval/loader"),
    })

    const plugins = config.plugins

    if (!plugins) throw new Error("Plugins not in config")

    plugins.push(
      new webpack.DefinePlugin({
        "process.env.__NEXT_NEW_LINK_BEHAVIOR": true,
        /**
         * Injects necessary ENV vars for sanity images to work.
         * These need to be in quotes otherwise the substitution(?)
         * performed by storybook fails.
         */
        "process.env.NEXT_PUBLIC_SANITY_PROJECT_ID": `'${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}'`,
        "process.env.NEXT_PUBLIC_SANITY_DATASET": `'${
          process.env.NEXT_PUBLIC_SANITY_DATASET ?? "staging"
        }'`,
        /**
         * Permits the use of DEV images context. Otherwise an error is thrown
         * to prevent leaking FPO images into live site. Also needs to be in quotes
         * otherwise it is substituted as a boolean.
         */
        "process.env.IS_STORYBOOK": "'true'",
      })
    )

    return config
  },
}

export default config
