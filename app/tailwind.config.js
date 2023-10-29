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
      typography: (theme) => ({
        article: {
          css: {
            '--tw-prose-invert-body': theme('colors.white'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-links': theme('colors.secondary'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.white'),
            '--tw-prose-invert-bullets': theme('colors.white'),
            
            img: {
              'margin-left': 'auto',
              'margin-right': 'auto',
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography') // Used to render markdown with appropriate styling
  ],
}

