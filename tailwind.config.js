/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Segoe UI',
      },
      colors: {
        primary: '#1fb6ff',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-pre-bg': theme('colors.gray[100]'),
          },
        },
        invert: {
          css: {
            '--tw-prose-pre-bg': theme('colors.gray[800]'),
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
