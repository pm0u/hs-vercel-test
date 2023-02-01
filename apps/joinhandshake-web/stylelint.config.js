module.exports = {
  plugins: ["stylelint-prettier"],
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "prettier/prettier": true,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["tailwind", "apply", "layer", "config", "screen"],
      },
    ],
    "no-descending-specificity": null,
    "import-notation": null,
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }],
    "no-invalid-position-at-import-rule": [
      true,
      { ignoreAtRules: ["tailwind"] },
    ],
    // Force camelCase class names to allow dot notation when importing CSS modules
    "selector-class-pattern": [
      /^[a-z]+([A-Z][a-z]+)?/,
      { message: "Expect class names in CSS modules to be camelCase" },
    ],
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["global"] },
    ],
  },
}
