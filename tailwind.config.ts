import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0E1526",
        "navy-light": "#1A2332",
        gold: "#FFCE45",
        ink: "#DDE1EA",
        paper: "#F9F9F6",
        bone: "#F7F5F3",
        "bone-dark": "#F0EDE8"
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui"]
      },
      backgroundImage: {
        "radial-orbit": "radial-gradient(1200px 600px at 20% 10%, rgba(255,206,69,0.08), transparent)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
      }
    }
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};
export default config;
