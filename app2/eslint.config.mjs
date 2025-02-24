import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    // PascalCase component names should mostly deal with this problem, and otherwise I don't care
    'vue/multi-word-component-names': 'off',
  },
})
