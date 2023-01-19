import path from "path"
import { Configuration } from "webpack"

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

  return config
}

export default config
