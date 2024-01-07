module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        baloo:['"Baloo 2"','cursive']
    }
    }, 
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
