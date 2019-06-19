const ruleComposer = require('eslint-rule-composer')
const noUnusedExpressionsRule = require('eslint-plugin-vue').rules['require-default-prop']

function getNamespace (settings) {
  const namespace = settings && settings['vue-types/namespace']
  if (namespace) {
    if (namespace === 'string') {
      return [namespace]
    }
    return namespace
  }
  return ['VueTypes']
}

module.exports = ruleComposer.filterReports(
  noUnusedExpressionsRule,
  (problem, metadata) => {
    const sourceCode = metadata.sourceCode
    const namespace = getNamespace(metadata.settings)

    const tokens = sourceCode.getTokens(problem.node)
    const vtTokenIdx = tokens.findIndex((t) => namespace.indexOf(t.value) !== -1)
    if (vtTokenIdx !== -1) {
      const vtTokens = sourceCode.getTokensAfter(tokens[vtTokenIdx], 2)
      if (vtTokens.length < 2) {
        return true
      }
      return !(vtTokens[0].type === 'Punctuator' &&
        (vtTokens[1].type === 'Identifier' || vtTokens[1].type === 'Keyword'))
    }
    return true
  }
)
