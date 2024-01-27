/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    container: {
      padding: '10rem',
    },
    extend: {
      colors: {
        primary: '#212120',
        secondary: '#EDD100',
        faded: '#8A8A88',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

