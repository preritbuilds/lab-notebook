import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.mdx"],
  theme: {
    extend: {
      colors: {
        paper: "#FBFAF4", // cream engineering paper
        gridline: "#A9C4D9", // faint drafting blue
        ink: "#16324F", // fountain-pen navy
        graphite: "#41403C", // pencil
        buckram: "#20402E", // lab-notebook cloth cover
        buckramDark: "#16301F",
        label: "#F4EEDC", // cover label sticker
        string: "#B3261E", // red string
        stickyYellow: "#FFF6A9",
        stickyBlue: "#CDE8F6",
        stickyPink: "#FFD6D6",
        tape: "rgba(240, 234, 200, 0.65)",
      },
      fontFamily: {
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
        serif: ["'IBM Plex Serif'", "Georgia", "serif"],
        hand: ["'Caveat'", "cursive"],
      },
      boxShadow: {
        note: "1px 3px 8px rgba(30, 30, 30, 0.18), 0 1px 2px rgba(30,30,30,0.10)",
        noteLift: "4px 14px 24px rgba(30, 30, 30, 0.26)",
        cover: "0 24px 60px rgba(10, 20, 12, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
