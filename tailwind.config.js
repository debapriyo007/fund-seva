
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      
      colors: {
        blue: {
          500: '#3B82F6', // base blue color
          600: '#2563EB'
        },
        green: {
          500: '#10B981',
          600: '#059669'
        },
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED'
        },
        'github-blue': '#1A73E8',
        'github-purple': '#6F42C1',
        'github-gray': '#24292E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        doto: [ 'Russo One', 'sans-serif'],
        payton: ['Paytone One', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'neumorphic': '8px 8px 16px #0d0d0d, -8px -8px 16px #151515',
      }
      // fontFamily: {
      //   doto: [ 'Russo One', 'sans-serif'],
      //   payton: ['Paytone One', 'sans-serif'],
      //   outfit: ['Outfit', 'sans-serif'],
      // },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}