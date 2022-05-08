/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1rem",
        lg: "0rem",
        xl: "0rem",
      },
    },
    screens: {
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    fontSize: {
      "tiny": "0.875rem",
      "base": "1.25rem",
      "lg": "1.56rem",
      "xl": "1.95rem",
      "2xl": "2.44rem",
      "3xl": "3.05rem",
      "4xl": "3.82rem",
    },
    spacing: {
      0: "0rem",
      1: "0.25rem",
      2: "0.5rem",
      3: "1rem",
      4: "1.5rem",
      5: "2.25rem",
      6: "3rem",
      7: "4rem",
      8: "6.5rem",
      9: "7.75rem",
      12: "12.5rem",
      24: "25rem",
      48: "50rem",
      rectangle: "calc(100% - 8px) 8px 8px 8px",
    },
    minWidth: {
      "0": "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      "full": "100%",
      "1": "0.25rem",
      "2": "0.5rem",
      "3": "1rem",
      "4": "1.5rem",
      "5": "2.25rem",
      "6": "3rem",
      "7": "4rem",
      "8": "6.5rem",
      "9": "7.75rem",
      "12": "12.5rem",
      "24": "25rem",
      "48": "50rem",
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      200: "200%",
      50: "50%",
      100: "100%",
      300: "300%",
    },
    borderRadius: {
      none: "0",
      sm: "0.25rem",
      md: "0.5rem",
      lg: "1rem",
      xl: "2rem",
      full: "9999px",
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      // Grayscale Design palette: https://grayscale.design/app?lums=92.72,72.74,56.79,43.47,32.39,23.22,15.67,9.51,4.51,0.50&palettes=%2398305a,%23F9F871,%23061212,%236BD8A1,%234AC8AE,%233bb6b3&filters=0%7C0,0%7C0,0%7C-30,0%7C0,0%7C0,0%7C0&names=red,yellow,gray,green,teal,blue&labels=,,,,,
      red: {
        50: "#fcf5f8",
        100: "#f2d7e2",
        200: "#e9bacd",
        300: "#e09db8",
        400: "#d780a3",
        500: "#cd608c",
        600: "#c03d71",
        700: "#98305a",
        800: "#6a213e",
        900: "#1d0911",
        1000: "rgba(152, 48, 90, 0.1)",
      },
      yellow: {
        50: "#fbfba1",
        100: "#e5e50a",
        200: "#cdcd09",
        300: "#b6b608",
        400: "#9f9f07",
        500: "#898906",
        600: "#727205",
        700: "#5a5a04",
        800: "#3e3e03",
        900: "#101001",
        1000: "rgba(159, 159, 7,0.1)",
      },
      gray: {
        50: "#f7f7f7",
        100: "#dddddd",
        200: "#c6c6c6",
        300: "#b0b0b0",
        400: "#9a9a9a",
        500: "#858585",
        600: "#6f6f6f",
        700: "#585858",
        800: "#2c4242",
        900: "#061212",
      },
      green: {
        50: "hsl(150, 58.30%, 95.30%)",
        100: "hsl(150, 58.30%, 80.24%)",
        200: "hsl(150, 58.30%, 65.23%)",
        300: "hsl(150, 58.30%, 49.55%)",
        400: "hsl(150, 58.30%, 43.36%)",
        500: "hsl(150, 58.30%, 37.17%)",
        600: "hsl(150, 58.30%, 30.97%)",
        700: "hsl(150, 58.30%, 24.53%)",
        800: "hsl(150, 58.30%, 17.10%)",
        900: "hsl(150, 58.30%, 4.71%)",
        1000: "hsl(150, 58.30%, 43.36%, 0.1)",
      },
      teal: {
        50: "hsl(168, 53.40%, 95.03%)",
        100: "hsl(168, 53.40%, 80.60%)",
        200: "hsl(168, 53.40%, 66.33%)",
        300: "hsl(168, 53.40%, 50.36%)",
        400: "hsl(168, 53.40%, 43.97%)",
        500: "hsl(168, 53.40%, 37.59%)",
        600: "hsl(168, 53.40%, 31.44%)",
        700: "hsl(168, 53.40%, 24.80%)",
        800: "hsl(168, 53.40%, 17.40%)",
        900: "hsl(168, 53.40%, 4.57%)",
        1000: "hsl(168, 53.40%, 43.97%, 0.1)",
      },
      blue: {
        50: "#edf9f9",
        100: "#b5e7e6",
        200: "#7dd5d3",
        300: "#43c2c0",
        400: "#37aaa8",
        500: "#2f9290",
        600: "#287b7a",
        700: "#1f605f",
        800: "#154140",
        900: "#061212",
        1000: "rgba(55, 170, 168,0.1)",
      },
      bg: {
        200: "hsla(179, 51.00%, 10.69%, 0.8)",
        300: "hsl(179, 51.00%, 10.69%)",
        400: "hsla(179, 51.00%, 7.69%, 0.8)",
        500: "hsl(179, 51.00%, 7.69%)",
        600: "hsla(179, 51.00%, 4.69%, 0.8)",
        700: "hsl(179, 51.00%, 4.69%)",
      },
    },

    extend: {
      backgroundImage: () => ({
        gradient: `radial-gradient(circle at center left, #37aaa8, transparent 50%),
        radial-gradient(circle at 0% 0%, #9f9f07, transparent 25%),
        radial-gradient(circle at 20% 60%, #37aaa8, transparent 50%),
        radial-gradient(circle at center right, #34ac94, transparent 50%),
        radial-gradient(circle at 60% 60%, #2eaf6f, transparent 25%),
        radial-gradient(circle at bottom center, #34ac94, transparent 75%),
        radial-gradient(circle at 80% 40%, #2eaf6f, transparent 75%),
        radial-gradient(circle at center center, #000, #000 100%)`,
      }),
      transitionTimingFunction: {
        cog: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["hover", "focus", "group-hover"],
      transform: ["hover", "focus", "group-hover"],
      scale: ["hover", "focus", "group-hover"],
      translate: ["hover", "focus", "group-hover"],
      display: ["hover", "focus", "group-hover"],
      filter: ["hover", "focus", "group-hover"],
      opacity: ["hover", "focus", "group-hover"],
      blur: ["hover", "focus", "group-hover"],
      text: ["hover", "focus", "group-hover"],
    },
  },
};
