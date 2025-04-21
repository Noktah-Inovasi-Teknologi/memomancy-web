/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}",
    "./app.vue",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      animation: {
        "infinite-loop-scroll": "loop-scroll 25s infinite",
        "infinite-loop-scroll-inverted":
          "loop-scroll-inverted 20s linear infinite",
        "infinite-loop-scroll-5": "loop-scroll 30s infinite",
      },
      colors: {
        primary: {
          50: "#FCFFE5",
          100: "#F5FFB3",
          200: "#ECFF73",
          300: "#E6FF3A",
          400: "#E5FF0F",
          500: "#E3FE01", // your main base
          600: "#BADA01",
          700: "#91B501",
          800: "#6B8F00",
          900: "#4E6A00",
          950: "#2E4100",
        },
      },
      keyframes: {
        "loop-scroll": {
          "0%, 30%": { transform: "translateY(0)" },
          "30%, 50%": { transform: "translateY(-300%)" },
          "50%, 70%": { transform: "translateY(-300%)" },
          "70%, 100%": { transform: "translateY(0)" },
        },
        "loop-scroll-inverted": {
          "0%, 30%": { transform: "translateY(-300%)" },
          "30%, 50%": { transform: "translateY(0)" },
          "50%, 70%": { transform: "translateY(0)" },
          "70%, 100%": { transform: "translateY(-300%)" },
        },
      },
      fontFamily: {
        han: ["Hanuman", "sans-serif"],
      },
    },
  },
  plugins: [],
};
