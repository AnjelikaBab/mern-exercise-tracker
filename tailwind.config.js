/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        text: "#FFFFFF",        // Use a valid hex code with #
        buttonCol: "#593F5F",   // Use a valid hex code with #
        backgroundCol: "#9479A0" // Use a valid hex code with #
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.customBtn': {
          backgroundColor: "#593F5F",
          color: "#f8f9fa", // Change this to `white` if you want the text to be white
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: '#9479A0 0.3s', // Fixed transition syntax
          '&:hover': {
    backgroundColor: "#9479A0",
          },
        }
      })
    },

    function ({ addComponents }) {
      addComponents({
        '.customLink': {
          backgroundColor: "#593F5F",
          margin: 20,
          color: "FFFFFF", // Change this to `white` if you want the text to be white
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: '#542D5D 0.3s', // Fixed transition syntax
          '&:hover': {
    backgroundColor: "#542D5D",
          },
        }
      })
    },

    function ({ addComponents }) {
      addComponents({
        '.customLinkText': {
          color: "FFFFFF", // Change this to `white` if you want the text to be white
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: '#FFFFFF 0.3s', // Fixed transition syntax
          '&:hover': {
    backgroundColor: "#FFFFFF",
          },
        }
      })
    }

  ],
}
