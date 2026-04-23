import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./docs/mocks/**/*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Brand Colors */
        primary: "#E53935",
        "primary-hover": "#C62828",

        /* Background Colors */
        "background-light": "#F8F9FA",
        "background-dark": "#111827",
        "bg-dark": "#111827",

        /* Surface Colors */
        "surface-light": "#FFFFFF",
        "surface-dark": "#1F2937",

        /* Text Colors */
        "text-light": "#1F2937",
        "text-main-light": "#111827",
        "text-main-dark": "#F9FAFB",
        "text-sub-light": "#6B7280",
        "text-sub-dark": "#9CA3AF",
        "text-muted-light": "#9CA3AF",
        "text-muted-dark": "#6B7280",
        "text-muted": "#6B7280",
        "text-main": "#111827",
        "secondary-text-light": "#6B7280",
        "secondary-text-dark": "#9CA3AF",

        /* Border Colors */
        "border-light": "#E5E7EB",
        "border-dark": "#374151",

        /* Accent */
        "gray-light": "#F3F4F6",
        "gray-dark": "#374151",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [
    typography,
    forms,
  ],
}
