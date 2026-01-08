/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Scan app folder
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    
    // Scan lib folder (if you have components there)
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    
    // Include public folder if you have HTML files
    './public/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}