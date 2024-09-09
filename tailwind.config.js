/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '15px',

      // default breakpoints but with 40px removed
      screens: {
        'nw': '375px',
        'sm': '640px',
        'md': '768px',
        'ml': '992px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1430px',
      },
    },


    extend: {
      screens: {
        'nw': '575px',
        'sm': '640px',
        'md': '768px',
        'ml': '992px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      
      colors: {
        accent: '#1b0cc1',
        primary: '#ff0000',
        secondary: '#505050',
        heading: '#222222',
        text: '#505050',
        border: '#c2c2c2',
      },
      fontFamily: {
        Oswald: ["Oswald", 'sans-serif'],
        heading: ["Oswald", 'sans-serif'],
        text: ["Open Sans", 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '14px',
            color: '#121212bf',
            maxWidth: '100%',
            a: {
              color: 'red',
              '&:hover': {
                color: '#0a58ca',
              },
            },
            li: {
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
            },
            p: {
              fontSize: '14px',
              fontWeight: '400',
              fontFamily: 'Open Sans',
            },
            // Customize other styles
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')({
    className: 'wysiwyg',
  }),]
}

