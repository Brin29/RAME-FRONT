module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
      extend: {
        animation: {
          slide: 'slide 20s ease-in-out infinite',
        },
        keyframes: {
          slide: {
            '0%': { marginLeft: '0' },
            '20%': { marginLeft: '0' },
            '25%': { marginLeft: '-100%' },
            '50%': { marginLeft: '-100%' },
            '55%': { marginLeft: '-200%' },
            '75%': { marginLeft: '-200%' },
            '100%': { marginLeft: '0' },
          },
        },
      },
    },
    plugins: [],
  };
  