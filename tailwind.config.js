/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'max-sm': {'max': '639px'},  // This targets screens 639px and below
      },
      flex: {
        '0.6': '0.6',
        '1.4': '1.4'
      }
    },
  },
  plugins: [],
}