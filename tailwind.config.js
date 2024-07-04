/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{svelte,html,ts}'],
  theme: {
    extend: {
      colors: {
        ruby: {
          50: '#fbf4f6',
          100: '#f8ebef',
          200: '#f3d7e0',
          300: '#eab7c6',
          400: '#dc8aa1',
          500: '#ce667f',
          600: '#b3445a',
          700: '#9f3748',
          800: '#84303d',
          900: '#6f2c37',
          950: '#42151c',
        },
      },
    },
  },
}
