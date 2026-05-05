import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terra: "#C75D3F",
        "terra-hover": "#B14F33",
        "terra-soft": "#F2D9CE",
        cream: "#FAF7F2",
        paper: "#FFFFFF",
        ink: "#141414",
        mute: "#8A8782",
        slate: "#4A4A48",
        line: "#E8E4DC",
        "border-strong": "#C9C4B9",
        "bg-subtle": "#F4F1EB",
        sage: "#7A8B5B",
        "sage-soft": "#E5EAD9",
        secondary: "#546438",
        saffron: "#D9963C",
        danger: "#C44545",
      },
      spacing: {
        "3xs": "0.25rem",
        "2xs": "0.5rem",
        xs: "0.75rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
        "3xl": "6rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        "body-large": ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        h1: ["var(--font-fraunces)", "Georgia", "serif"],
        h2: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["ui-monospace", "JetBrains Mono", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        h1: [
          "clamp(1.75rem, 4vw, 2.75rem)",
          { lineHeight: "1.2", fontWeight: "500" },
        ],
        h2: [
          "clamp(1.5rem, 3vw, 2rem)",
          { lineHeight: "1.3", fontWeight: "500" },
        ],
        "body-large": [
          "1.125rem",
          { lineHeight: "1.6", fontWeight: "400" },
        ],
        body: ["1.0625rem", { lineHeight: "1.6", fontWeight: "400" }],
        mono: ["0.9375rem", { lineHeight: "1.5", fontWeight: "400" }],
      },
    },
  },
  plugins: [],
};

export default config;
