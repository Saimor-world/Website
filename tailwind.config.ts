import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0E1526",
        gold: "#FFCE45",
        paper: "#F9F9F6"
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui"]
      },
      backgroundImage: {
        "radial-orbit": "radial-gradient(1200px 600px at 20% 10%, rgba(255,206,69,0.08), transparent)"
      }
    }
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};
export default config;
