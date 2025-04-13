import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    ignores: ["node_modules/**", "dist/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    ignores: ["./node_modules/**", "./dist/**"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    files: ["**/*.vue"],
    plugins: {
      vue: pluginVue,
    },
    rules: {
      ...pluginVue.configs.essential.rules,
    },
  },
  eslintPluginPrettierRecommended,
];
