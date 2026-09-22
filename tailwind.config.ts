import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pageBg: "#FAF8F5",
        navy: {
          DEFAULT: "#1E3A5F",
          50: "#f0f4f9",
          100: "#d9e2ed",
          200: "#b3c5db",
          300: "#8da8c9",
          400: "#5a80b0",
          500: "#1E3A5F",
          600: "#182e4c",
          700: "#13253d",
          800: "#0e1a2b",
          900: "#0a121e",
        },
        gold: {
          DEFAULT: "#D4AF37",
          50: "#fdfbf3",
          100: "#faf4df",
          200: "#f5e8be",
          300: "#efdc9d",
          400: "#e5c562",
          500: "#D4AF37",
          600: "#b89422",
          700: "#917316",
          800: "#6d5612",
          900: "#48390c",
        },
        darkgray: {
          DEFAULT: "#1F2937",
          muted: "#4B5563",
          light: "#6B7280",
          lighter: "#9CA3AF",
        },
        cardBg: "#FFFFFF",
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#D4AF37",
          600: "#b89422",
          700: "#917316",
          800: "#6d5612",
          900: "#1E3A5F",
          950: "#0e1a2b",
        }
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(30, 58, 95, 0.08), 0 0 1px 1px rgba(30, 58, 95, 0.05)',
        'luxury-hover': '0 20px 40px -12px rgba(212, 175, 55, 0.2), 0 0 1px 1px rgba(30, 58, 95, 0.1)',
        'card': '0 4px 20px -2px rgba(31, 41, 55, 0.06), 0 2px 6px -1px rgba(31, 41, 55, 0.04)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Montserrat', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cinzel', 'serif'],
        playfair: ['var(--font-playfair)', 'Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;
