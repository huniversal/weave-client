import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export const baseConfig = tseslint.config(
  {
    ignores: [
      "dist",
      "dist-electron",
      ".electron-build",
      "node_modules",
      "release",
      "out"
    ]
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  }
);

export default baseConfig;
