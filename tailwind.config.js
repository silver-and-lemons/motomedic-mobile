/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#11161a",
          light: "#161d24",
          card: "#1b232c",
        },
        primary: {
          DEFAULT: "#0ea5e9",
          dark: "#0284c7",
        },
        mint: {
          DEFAULT: "#10b981",
          light: "#00f0a2",
        },
        muted: "#94a3b8",
        "muted-light": "#cbd5e1",
      },
    },
  },
  plugins: [],
};