module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-prettier"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "config"
        ],
      },
    ],
    "no-descending-specificity": null,
    "import-notation": null,
    "value-keyword-case": ["lower", { camelCaseSvgKeywords: true }]
  },
}
