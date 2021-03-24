module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['nunito', 'sans-serif']
      },
      colors: {
        gelap: "#353535",
        hijau: "#69C1A6",
        abu: "#DEDEDE"
      },
      minHeight: {
        '85': '85vh',
        '50px': '50px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
