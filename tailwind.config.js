/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/showcase/**/*.{html,ts}",
  ],
  safelist: [
    "ms-2",
    "me-2",
    "ms-auto",
    "me-auto",
    "flex-row-reverse",
    "flex-wrap",
    "flex-wrap-reverse",
    "bg-green-400",
    "bg-red-400",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
