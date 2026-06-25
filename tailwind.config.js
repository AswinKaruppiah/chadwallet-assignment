/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utility/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: "var(--brand)",
        secondary: "var(--text-secondary)",
        "brand-secondary": "var(--brand-secondary)",
        subtle: "var(--bg-subtle)",
        "brand-dim": "var(--brand-dim)",
      },
      backgroundImage: {
        "hero": "url('/assets/hero-bg.png')",
      },
      screens: {
        desktop: "1024px",
      },
      spacing: {
        130: "32.5rem",
      },
      fontFamily: {
        sans: ["var(--font-aeonik)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
