module.exports = {
  extends: [
    "standard-with-typescript",
    "next/core-web-vitals",
    "prettier",
    "plugin:storybook/recommended",
  ],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    /**
     * This yells about every page component needing an explicit return type,
     * which we never interact with anyway
     */
    "@typescript-eslint/explicit-function-return-type": "off",
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "@typescript-eslint/space-before-function-paren": 0,
    "comma-dangle": 0,
    "@typescript-eslint/comma-dangle": ["error", "only-multiline"],
  },
}
