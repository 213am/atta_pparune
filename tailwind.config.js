/** @type {import('tailwindcss').Config} */
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Vite 프로젝트에 맞는 파일 확장자 추가
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6F4CDB",
        primaryFocus: "#4825b6",
        secondary: "#C4B6F0",
        third: "#9176e4",
        white: "#ffffff",
        black: "#333333",
        darkGray: "#929292",
        tableGray: "#A9A9A9",
        gray: "#eeeeee",
        red: "#E44B58",
        redHover: "#db2131",
        blue: "#79BAF2",
        yellow: "#FFD400",
        green: "#3CB371",
        greenHover: "#2f8d59",
        lightGreen: "#5ac88b",
      },
    },
    screens: {
      mw: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      tb: "1400px",
    },
    border: {
      1: 1,
    },
    keyframes: {
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0.5" },
      },
      ping: {
        "75%, 100%": {
          transform: "scale(1.2)",
          opacity: "1",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "none",
          animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
      fadein: {
        "0%": {
          opacity: "0.5",
          transform: "translateY(-10px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      fadeout: {
        "0%": {
          opacity: "1",
        },
        "100%": {
          opacity: "0",
          transform: "translateY(-10px)",
        },
      },
    },
    animation: {
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      bounce: "bounce 1s infinite",
      fadein: "fadein 0.5s",
      fadeout: "fadeout 1s",
    },
  },
  plugins: [scrollbarHide],
};
