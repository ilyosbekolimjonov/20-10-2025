import js from "@eslint/js"

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            linterOptions: {
                reportUnusedDisableDirectives: true,
            },
            settings: {},
            files: ["**/*.js"],
            languageOptions: {
                globals: {
                    ...js.environments.node.globals,
                },
            }
        },
        rules: {
            // O'zingga kerak bo'lgan qoida o'zgarishlarini shu yerda yozasan
        },
    },
]