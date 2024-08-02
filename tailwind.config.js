/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/showcase/**/*.{html,ts}",
  ],
  safelist: [
    "ms-auto",
    "me-auto",
    "flex-row-reverse",
    "flex-wrap",
    "flex-wrap-reverse",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
