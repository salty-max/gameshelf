import baseConfig from "@repo/configs/tailwind.config";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [baseConfig],
  mode: "jit",
  purge: ["src/**/*.{js,jsx,ts,tsx}"],
  extend: {
    cursor: ["help"],
  },
  plugins: [require("tailwindcss-animate")],
};
