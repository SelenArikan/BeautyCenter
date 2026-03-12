import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/html/**/*.{php,html}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-gowun-batang)', 'serif'],
                serif: ['var(--font-allura)', 'cursive'],
                logo: ['var(--font-gowun-batang)', 'serif'],
                slogan: ['var(--font-allura)', 'cursive'],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    main: "#ec4cc7",
                    aux1: "#000000",
                    aux2: "#ffffff",
                }
            },
        },
    },
    plugins: [],
};
export default config;
