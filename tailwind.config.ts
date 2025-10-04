import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy colors for compatibility
        navy: "#0E1526",
        "navy-light": "#1A2332",
        gold: "#FFCE45",
        ink: "#DDE1EA",
        paper: "#F9F9F6",
        bone: "#F7F5F3",
        "bone-dark": "#F0EDE8",

        // New Logo-inspired Green Palette (Primary Brand Colors)
        "saimor-green": "#4A6741",       // Main logo green (--saimor-green-700)
        "saimor-green-light": "#5D7C54", // Lighter variant (--saimor-green-600)
        "saimor-green-dark": "#3A5231",  // Darker variant
        "saimor-green-200": "#EAF1EC",   // Light background (--saimor-green-200)
        "saimor-accent": "#669966",      // Accent dot green
        "saimor-gold": "#D4B483",        // Logo golden line (--saimor-gold-500)
        "saimor-gold-light": "#E6C897",  // Light gold variant
        "saimor-gold-600": "#C6A36C",    // Gold hover/focus (--saimor-gold-600)
        "saimor-ink": "#0E1A1B",         // Dark depths (--saimor-ink-900)
        "saimor-cream": "#F8F5F0",       // Off-White (--saimor-cream)

        // Refined Pastell palette
        "gold-primary": "#D4B483",
        "gold-secondary": "#E6C897",
        "gold-dark": "#C2A270",
        "forest-primary": "#4A6741",
        "forest-secondary": "#5D7C54",
        "sage-green": "#B8D4BA",
        "warm-beige": "#FAF0E6",
        "neutral-gray": "#9CA3AF",
        "light-gray": "#F8FAF9",
        "text-dark": "#4A5568",

        // Glass-morphism colors
        "glass-white": "rgba(255, 255, 255, 0.1)",
        "glass-green": "rgba(74, 103, 65, 0.1)",
        "glass-gold": "rgba(212, 180, 131, 0.1)"
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
