/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#931e2e',
        bgMain: '#2a1818',
        textMain: '#f3f4f6',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        h1: ['Montserrat', 'sans-serif'],
        h2: ['Montserrat', 'sans-serif'],
        h3: ['Montserrat', 'sans-serif'],
        h4: ['Montserrat', 'sans-serif'],
        h5: ['Montserrat', 'sans-serif'],
        h6: ['Montserrat', 'sans-serif'],
        paragraph: ['Montserrat', 'sans-serif'],
        link: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        'h1': '700',
        'h2': '600',
        'h3': '500',
        'h4': '500',
        'h5': '500',
        'h6': '500',
        'paragraph': '400',
        'link': '400',
      },
    },
  },
  plugins: [],
}
