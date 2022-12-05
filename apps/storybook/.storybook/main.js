// @ts-check
module.exports = {
  stories: [
    "../../../libs/ui-components/src/**/*.stories.@(ts|tsx|js|jsx|mdx)",
    "../../../libs/ui-components/styles/**/*.stories.@(ts|tsx|js|jsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  env: (config) => {
    return {
      ...config,
      /**
       * will be fixed in sb v7, this ENV var is set by Next when within a full nextjs app.
       * @see https://github.com/storybookjs/storybook/issues/19813
       * @see https://github.com/storybookjs/storybook/pull/19834
       */
      __NEXT_NEW_LINK_BEHAVIOR: true,
    }
  },
}
