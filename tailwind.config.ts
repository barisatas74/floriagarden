import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        bordo: {
          DEFAULT: "#8E1F3F",
          dark: "#5F1228",
          50: "#FBEDF1",
          100: "#F4D3DC",
          200: "#E5A2B4",
          300: "#D2718E",
          400: "#B94769",
          500: "#8E1F3F",
          600: "#7A1A36",
          700: "#5F1228",
          800: "#430C1C",
          900: "#2B0712",
        },
        wine: {
          DEFAULT: "#430C1C",
          deep: "#2D0612",
          night: "#1B0309",
        },
        cream: {
          DEFAULT: "#F6F1EB",
          soft: "#FBF8F4",
          deep: "#EDE4D8",
        },
        rose: {
          gold: "#C9A46A",
          goldLight: "#E0C496",
          goldDark: "#A3823F",
        },
        coffee: {
          DEFAULT: "#2B1A16",
          soft: "#3F2A24",
          deep: "#1A0F0C",
        },
        sage: {
          DEFAULT: "#78866B",
          soft: "#9AA88E",
          deep: "#5C6A52",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "ultra-wide": "0.3em",
        wider2: "0.18em",
      },
      borderRadius: {
        xl2: "1.25rem",
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 12px 40px -16px rgba(11, 3, 6, 0.55)",
        card: "0 22px 60px -24px rgba(11, 3, 6, 0.7)",
        glow: "0 22px 60px -22px rgba(201, 164, 106, 0.55)",
        inset: "inset 0 1px 0 rgba(201,164,106,0.18)",
      },
      backgroundImage: {
        "bordo-gradient":
          "linear-gradient(135deg, #8E1F3F 0%, #5F1228 100%)",
        "hero-gradient":
          "linear-gradient(135deg, #8E1F3F 0%, #5F1228 45%, #430C1C 100%)",
        "wine-gradient":
          "linear-gradient(180deg, #5F1228 0%, #430C1C 60%, #2D0612 100%)",
        "rose-gold-gradient":
          "linear-gradient(135deg, #E0C496 0%, #C9A46A 50%, #A3823F 100%)",
        "noise":
          "radial-gradient(circle at 20% 10%, rgba(201,164,106,0.10), transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04), transparent 45%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 55%, rgba(11,3,6,0.55) 100%)",
      },
      transitionTimingFunction: {
        silk: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 3.5s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
