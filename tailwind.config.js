/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        oxygen: ["Oxygen", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        agrandir: ["Agrandir", "sans-serif"],
        ia_writer_quattro: ["IA Writer Quattro", "sans-serif"]
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
