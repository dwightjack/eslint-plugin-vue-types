module.exports = {
  plugins: ['vue-types'],
  rules: {
    'vue/require-default-prop': 'off',
    'vue-types/require-default-prop': 'error'
  },
  settings: {
    'vue-types/namespace': ['VueTypes']
  }
}
