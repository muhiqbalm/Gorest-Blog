/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SF Pro", "sans-serif"],
      },
      colors: {
        dark: {
          DEFAULT: "#18191a",
          second: "#242526",
          third: "#3a3b3c",
        },
        light: {
          DEFAULT: "#e4e6eb",
          second: "#b0b3b8",
        },
        orange: {
          DEFAULT: "#FFAD4D",
          light: "#FEC180",
          orange: "bg-gradient-to-r from-orange to-orange-light",
        },
        sky: {
          DEFAULT: "#39B1FF",
          light: "#6ECCFF",
          gradient: "bg-gradient-to-r from-sky to-sky-light",
        },
      },
    },
  },
  plugins: [],
};
