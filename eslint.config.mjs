import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: [".tora/**", "dist/**", "reports/**", "target/**", "node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    rules: { "@typescript-eslint/no-explicit-any": "error" },
  },
];
