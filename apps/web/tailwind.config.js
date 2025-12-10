/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "Inter", "system-ui"],
        body: ["'Inter'", "system-ui"],
      },
      colors: {
        brand: {
          50: "#EEF2FF",
          500: "#4C5BD3",
          700: "#27308F",
        },
      },
    },
  },
  plugins: [],
};
