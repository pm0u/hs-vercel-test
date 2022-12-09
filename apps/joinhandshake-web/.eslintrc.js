const sharedConfig = require("../../configs/.eslintrc")

module.exports = {
  extends: ["standard-with-typescript", "next/core-web-vitals", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    ...sharedConfig.rules,
    /**
     * This yells about every page component needing an explicit return type,
     * which we never interact with anyway
     */
    "@typescript-eslint/explicit-function-return-type": "off",
  },
}
