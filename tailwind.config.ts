import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
        
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dirtygreen: "#4b5d38"
      },
    },
  },
  plugins: [],
} satisfies Config;
