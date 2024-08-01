import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
    content: [
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            xs: '500px',
            ...defaultTheme.screens,
            '2lg': '1100px',
            '2xl': '1400px',
            '3xl': '1500px',
            '4xl': '1600px',
            '5xl': '1700px',
        },
        extend: {
            animation: {
                border: 'background ease infinite',
              },
              keyframes: {
                background: {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                },
              },
            spacing: {
                18: '4.5rem',
                112: '28rem',
                120: '30rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
export default config
