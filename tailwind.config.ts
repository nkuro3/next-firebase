import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    extend: {
      fontSize: {
        "2xs": ["0.625rem", "1rem"]
      },
      spacing: {
        "96": "24rem",
        "100": "25rem",
        "120": "30rem",
        "144": "36rem",
        "156": "39rem",
        "168": "42rem",
        "192": "48rem",
        "200": "50rem",
        "240": "60rem",
        "300": "75rem",
        "400": "100rem",
        "1/2": "50%"
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};
export default config;
