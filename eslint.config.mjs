// eslint.config.mjs
import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import obsidianmd from "eslint-plugin-obsidianmd";

export default defineConfig([
    ...obsidianmd.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: "./tsconfig.json"
            },
            globals: {
                console: "readonly",
                window: "readonly",
            },
        },
        rules: {
            // Disable sample-names rule as it's not relevant for this project
            "obsidianmd/sample-names": "off",
            // Disable unsafe-assignment as Obsidian API uses 'any' types
            "@typescript-eslint/no-unsafe-assignment": "off",
        },
    },
    {
        ignores: ["node_modules/**", "main.js", "tests/**", "*.config.*"]
    }
]);
