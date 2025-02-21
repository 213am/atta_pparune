import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    //검사할 파일 종류
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier, // Prettier 플러그인
      react,
    },
    rules: {
<<<<<<< HEAD
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
=======
>>>>>>> 3cf4eebd5cab5826abc51aee2747fe1cd71ff691
      ...reactHooks.configs.recommended.rules,
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "off",
        { allowConstantExport: true },
      ], // React Fast Refresh 규칙
      "prettier/prettier": "warn", // Prettier 규칙 (포매팅 오류를 에러로 표시)
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
    settings: {
      react: {
        version: "detect", // React 버전을 자동 감지
      },
    },
  },
);
