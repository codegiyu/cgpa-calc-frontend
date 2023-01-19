/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        workSans: ["'Work Sans'", "sans-serif"],
        montserrat: ["'Nunito Sans'", "sans-serif"]
      },
      colors: {
        purple: "#1481BA",
        purple80: "rgba(32, 24, 51, 0.9)",
        lightBlue: "#11B5E4",
        grey: "#666874",
        grey42: "#66687442",
        white20: "#FFFFFF20",
        white70: "#FFFFFF70",
        black20: "#00000020",
        black70: "#00000070",
        black44: "#00000044",
        lightGrey: "#E9E9E9",
        lightGrey70: "#E9E9E970",
      },
      backgroundImage: {
        background: "linear-gradient(25deg, #72246C80, #72246C70), url('./img/background.jpg')"
      },
      boxShadow: {
        input: "0 0 2px 3px #1481BA55",
        error: "0 0 2px 3px rgba(185, 28, 28, 0.35)",
      }
    },
  },
  plugins: [],
}
