/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
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
});
