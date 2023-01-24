import path from "path"
import { Configuration, RuleSetRule } from "webpack"

const config: ({
  config,
}: {
  config: Configuration
}) => Promise<Configuration> = async ({ config }) => {
  // fonts
  config.module?.rules?.push({
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          query: {
            name: "[name].[ext]",
          },
        },
      },
    ],
    include: path.resolve(__dirname, "../public"),
  })

  // @ts-ignore
  const styleRule: RuleSetRule = config.module?.rules
    ?.filter((rule) => rule !== "...")
    .find((rule) => ".module.scss".match((rule as RuleSetRule).test as RegExp))

  // @ts-ignore
  const cssObj = (styleRule as RuleSetRule).use?.find(
    (loader) => typeof loader !== "string" && loader.loader === "css-loader"
  )

  cssObj.options.localsConvention = "camelCase"

  return config
}

export default config
