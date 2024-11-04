module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "consistent-return": "off",
    "import/no-unresolved": "off",
    "import/extensions": ["warn", { "js": "always", "json": "never" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [],
      },
    ],
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        code: 120,
        comments: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  ignorePatterns: ["node_modules", ".git", "coverage", "dist"],
};
