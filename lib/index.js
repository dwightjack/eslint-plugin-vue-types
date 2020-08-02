const base = require('./configs/base')
module.exports = {
  rules: {
    'require-default-prop': require('./rules/require-default-prop'),
  },
  configs: {
    recommended: base,
    'strongly-recommended': base,
  },
}
