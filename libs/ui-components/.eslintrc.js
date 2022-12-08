const sharedConfig = require("../../configs/.eslintrc")

module.exports = {
  extends: [
    "standard-with-typescript",
    "next/core-web-vitals",
    "next",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    ...sharedConfig.rules,
    // Allows typing default exports using export default {} as T (storybook)
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      { assertionStyle: "as", objectLiteralTypeAssertions: "allow" },
    ],
    // We won't have pages here, so disable
    "@next/next/no-html-link-for-pages": 0,
  },
}
