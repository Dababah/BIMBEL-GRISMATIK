import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#eef1f8",
          100: "#d6deee",
          200: "#aebddb",
          300: "#7f96c1",
          400: "#56719f",
          500: "#3a527e",
          600: "#2a3d65",
          700: "#1f2d4d",
          800: "#16213a",
          900: "#0f1626",
          950: "#0a0f1a",
        },
        gold: {
          50: "#fdf8ec",
          100: "#faedc9",
          200: "#f5da93",
          300: "#f0c45c",
          400: "#ecb234",
          500: "#e3a022",
          600: "#c5821b",
          700: "#9c641a",
          800: "#7e511c",
          900: "#6b441c",
        },
        cream: "#FBF7EE",
        ink: "#1B2333",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-jakarta)", "sans-serif"],
      },
      backgroundImage: {
        "pen-line": "linear-gradient(90deg, transparent, currentColor, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
