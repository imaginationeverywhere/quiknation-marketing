import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hub: {
          bg: "#050505",
          surface: "#0F0F0F",
          card: "#151515",
          border: "#1A1A1A",
          muted: "#888888",
          accent: "#7BC8D8",
          client: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};

export default config;
