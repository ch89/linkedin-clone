module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    	colors: {
    		"linkedin-blue": "#0A66C2",
        "linkedin-light-gray": "#EEF3F8",
        "linkedin-dark-gray": "gray",
        "linkedin-gray": "#F3F2EF",
    	}
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
