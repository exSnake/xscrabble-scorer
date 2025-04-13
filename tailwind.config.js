/* eslint-env node */

import flowbitePlugin from "flowbite/plugin";
import tailwindcssForm from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  theme: {
    fontSize: {
      "4xs": "0.15rem",
      "3xs": "0.25rem",
      "2xs": "0.5rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3.0rem",
      "6xl": "3.75rem",
      "7xl": "4.5rem",
      "8xl": "6.0rem",
      "9xl": "8.0rem",
    },
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [flowbitePlugin, tailwindcssForm],
};
