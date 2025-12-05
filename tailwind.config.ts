import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // ============================================
        // SAIMÔR MÔRA BIBEL COLOR SYSTEM
        // Based on: Saimor Mora Masterbibel
        // ============================================

        // === BIBEL PRIMARY COLORS ===
        "waldgruen": "#1A3C32",           // Saimôr Primary
        "mora-gold": "#D6A848",           // Môra/Meaning/Awareness
        "space": "#0B0F10",               // Tiefschwarz - Deep Space
        "nebel": "#AAB0B2",               // Nebelgrau - Glass/Icons

        // === AWARENESS COLORS (Bibel) ===
        "awareness-idle": "#22C55E",      // Green - Idle
        "awareness-info": "#FBBF24",      // Yellow - Info
        "awareness-thinking": "#3B82F6",  // Blue - Thinking
        "awareness-problem": "#EF4444",   // Red - Problem
        "awareness-insight": "#D6A848",   // Gold - Insight

        // === SAIMÔR GREEN SCALE ===
        "saimor-green": {
          900: "#0F231C",
          800: "#1A3C32",  // === WALDGRÜN ===
          700: "#2A5244",
          600: "#3D6857",
          500: "#4A7A68",
          400: "#6B9A88",
          300: "#8FBAA8",
          200: "#C5DDD4",
          100: "#E8F2EE",
          DEFAULT: "#1A3C32",
        },

        // === SAIMÔR GOLD SCALE ===
        "saimor-gold": {
          700: "#B8913A",
          600: "#C79E42",
          500: "#D6A848",  // === MÔRA GOLD ===
          400: "#E4BE6D",
          300: "#EDD092",
          200: "#F5E3B8",
          100: "#FBF3E0",
          DEFAULT: "#D6A848",
        },

        // === LEGACY ALIASES (backwards compatibility) ===
        "saimor-ink": "#0B0F10",
        "saimor-cream": "#F8F7F3",
        "gold-primary": "#D6A848",
        "forest-primary": "#1A3C32",
        "saimor-accent": "#4A7A68",

        // Legacy colors for compatibility
        navy: "#0E1526",
        "navy-light": "#1A2332",
        gold: "#D6A848",
        ink: "#AAB0B2",
        paper: "#F9F9F6",
        bone: "#F7F5F3",
        "bone-dark": "#F0EDE8",

        // Glass-morphism colors
        "glass-white": "rgba(255, 255, 255, 0.1)",
        "glass-green": "rgba(26, 60, 50, 0.15)",
        "glass-gold": "rgba(214, 168, 72, 0.15)",

        // Mora Deep View Palette
        "saimor-base": "#020d0a",
        "saimor-forest-dark": "#1A3C32",
        "saimor-teal": "#10b981",
        "saimor-gold-retro": "#D6A848",
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui"],
        mono: ['"Space Mono"', "monospace"],
        vcr: ['"VT323"', "monospace"],
      },
      backgroundImage: {
        "radial-orbit": "radial-gradient(1200px 600px at 20% 10%, rgba(255,206,69,0.08), transparent)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))"
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'boot-fade': 'fadeOut 0.8s ease-out forwards',
        'equalizer': 'equalizer 0.8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-15px) scale(1.02)' },
        },
        fadeOut: {
          '0%': { opacity: '1', pointerEvents: 'auto' },
          '100%': { opacity: '0', pointerEvents: 'none' }
        },
        equalizer: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '80%' }
        }
      }
    }
  },
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
};
export default config;
