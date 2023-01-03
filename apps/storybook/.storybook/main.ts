import { StorybookConfig } from "@storybook/react/types";

const config: StorybookConfig = {
  stories: [
    {
      directory: "../../../libs/ui-components/src/components/eta-2021",
      titlePrefix: "ETA 2021",
      files: "**/*.stories.*",
    },
    {
      directory: "../../../libs/ui-components/src/components/eta-2022",
      titlePrefix: "ETA 2022",
      files: "**/*.stories.*",
    },
    {
      directory: "../../../libs/ui-components/style-guide",
      titlePrefix: "Style Guide",
      files: "**/*.stories.*",
    },
    {
      directory: "../../../libs/ui-components/src/components/base",
      titlePrefix: "Base",
      files: "**/*.stories.*",
    },
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
};

module.exports = config;
