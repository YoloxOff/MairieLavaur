import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				institution: {
					50: "#eef4fb",
					100: "#d9e6f5",
					200: "#b3cdeb",
					300: "#82abdc",
					400: "#5285c8",
					500: "#3566ad",
					600: "#264d8a",
					700: "#1f3f70",
					800: "#1a3459",
					900: "#152a47",
				},
				occitan: {
					gold: "#c9971f",
					terracotta: "#b5502f",
					ocre: "#d98a3d",
				},
				surface: {
					light: "#f5f7fa",
					DEFAULT: "#ffffff",
				},
			},
			fontFamily: {
				sans: ["var(--font-public-sans)", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};

export default config;
