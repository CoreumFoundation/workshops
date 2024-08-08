// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        green: {
          800: '#22543d', // You can customize these colors as needed
          900: '#1c4532',
          'greenish-black': '#0A1D1D',
        'coreum-green': '#00C896',
        'greenish': '#00C896',
        'coreum-green-dark': '#00A982',
        darkgreen: '#006400',

        },
      },
      fontFamily: {
        'space-grotesk': ["var(--font-space-grotesk)"],
        'noto-sans': ["var(--font-noto-sans)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        'gradient-green': 'rgba(37, 214, 149, 0.15)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
