/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#205295",
        secondary: "#F2F2F2",
        muted: "#E0E0E0",
        redCustom: "#EB5757",
        textGray: "#828282",
        blackCust: "#222222",
        greenCust: "#8BC34A",
      },
      keyframes: {
        slideFadeIn: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideFadeOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
      },
      animation: {
        "slide-fade-in": "slideFadeIn 0.4s ease-out forwards",
        "slide-fade-out": "slideFadeOut 0.4s ease-in forwards",
      },
    },
  },
  plugins: [],
};
