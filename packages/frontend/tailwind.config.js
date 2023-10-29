/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#ab36fe",
        green: "#77f835",
        blue: "#384cff",
      },
    },
  },
  plugins: [],
}

