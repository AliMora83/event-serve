/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#931e2e',
        bgMain: '#2a1818',
        textMain: '#f3f4f6',
      },
    },
  },
  plugins: [],
}
