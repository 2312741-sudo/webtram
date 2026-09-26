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
        paper: {
          DEFAULT: "#F6EFDF",
          ink: "#E9E1CF",
        },
        ink: "#1C1A2D",
        navy: {
          DEFAULT: "#2D2A4A",
          dark: "#1B1930",
        },
        maroon: {
          DEFAULT: "#7E2930",
          dark: "#5C1F24",
        },
        mustard: {
          DEFAULT: "#E3A94C",
          light: "#FFF2D5",
        },
        teal: {
          DEFAULT: "#1E8E87",
          dark: "#14615C",
        },
        muted: "#5D5B63",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        tram: "18px",
      },
      boxShadow: {
        tram: "0 10px 30px rgba(45,42,74,.12), 0 2px 8px rgba(45,42,74,.08)",
        "tram-card": "0 8px 24px rgba(45,42,74,.10)",
        "tram-hard": "0 4px 0 #2D2A4A",
      },
    },
  },
  plugins: [],
};
export default config;
