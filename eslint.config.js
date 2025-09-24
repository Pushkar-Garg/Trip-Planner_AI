import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
  {
    ignores: ["dist/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
