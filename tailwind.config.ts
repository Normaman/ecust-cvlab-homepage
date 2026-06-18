import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        wikiBlue: "#0645AD",
        wikiText: "#202122",
        wikiBorder: "#A2A9B1",
        wikiSoft: "#F8F9FA",
        wikiAccent: "#EAECF0"
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"]
      },
      boxShadow: {
        wiki: "0 10px 24px rgba(32, 33, 34, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
