/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        black: "#151515",
      },
      fontFamily: {
        poppins: '"Poppins", sans-serif;',
      },
    },
  },
  plugins: [require("daisyui", "flowbite/plugin")],
};
