const ruleComposer = require('eslint-rule-composer')
const noUnusedExpressionsRule = require('eslint-plugin-vue').rules['require-default-prop']

module.exports = ruleComposer.filterReports(
  noUnusedExpressionsRule,
  (problem, metadata) => {
    const sourceCode = metadata.sourceCode
    const tokens = sourceCode.getTokens(problem.node)
    const vtTokenIdx = tokens.findIndex((t) => t.value === 'VueTypes')
    if (vtTokenIdx !== -1) {
      const vtTokens = sourceCode.getTokensAfter(tokens[vtTokenIdx], 2)
      if (vtTokens.length < 2) {
        return true
      }
      return !(vtTokens[0].type === 'Punctuator' &&
      vtTokens[1].type === 'Identifier')
    }
    return true
  }
)
