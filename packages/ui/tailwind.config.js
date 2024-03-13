import baseConfig from "@repo/configs/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [baseConfig],
  mode: "jit",
  purge: ["**/*.{js,jsx,ts,tsx}"],
  extend: {
    cursor: ["help"],
  },
  plugins: [require("tailwindcss-animate")],
};
