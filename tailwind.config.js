/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#212120',
        secondary: '#EDD100'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography') // Used to render markdown with appropiate styling
  ],
}

