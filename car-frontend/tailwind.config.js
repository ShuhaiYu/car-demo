/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004c93",
        secondary: "#051C2C",
        blue: "#00A1CB",
      },
    },
  },
  plugins: [],
}

