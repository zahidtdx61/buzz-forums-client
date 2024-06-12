/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        "fira-sans": ["Fira Sans", " sans-serif"],
        mulish: ["Mulish", "sans-serif"],
      },
      colors: {
        "primary-blue": "#2C4E80",
        "primary-sky": "#0E46A3",
        "primary-navy": "#1E0342",
        "primary-maroon": "#DD5746",
      },
    }
  },
  plugins: [],
};
