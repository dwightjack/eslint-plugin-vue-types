const ruleComposer = require('eslint-rule-composer')
const baseRule = require('eslint-plugin-vue').rules['require-default-prop']

function getSettings(eslintSettings = {}) {
  const settings = {
    namespace: ['VueTypes'],
    sources: ['vue-types'],
  }
  Object.entries(settings).forEach(([key, value]) => {
    if (eslintSettings[`vue-types/${key}`]) {
      settings[key] = value.concat(eslintSettings[`vue-types/${key}`])
    }
  })
  return settings
}

module.exports = ruleComposer.filterReports(baseRule, (problem, metadata) => {
  const { sourceCode } = metadata
  const { sources, namespace } = getSettings(metadata.settings)

  const tokens = sourceCode.getTokens(problem.node)

  const vtTokenIdx = tokens.findIndex((t) => namespace.includes(t.value))

  if (vtTokenIdx !== -1) {
    const vtTokens = sourceCode.getTokensAfter(tokens[vtTokenIdx], 2)
    if (vtTokens.length < 2) {
      return true
    }
    return !(
      vtTokens[0].type === 'Punctuator' &&
      (vtTokens[1].type === 'Identifier' || vtTokens[1].type === 'Keyword')
    )
  }

  // Let's see is we are using direct import
  // i.e.: import { string } from 'vue-types'
  const imports = sourceCode.ast.body.filter(
    ({ type, specifiers = [], source = {} }) =>
      type === 'ImportDeclaration' &&
      sources.includes(source.value) &&
      specifiers.length > 0,
  )

  if (imports.length === 0) {
    return true
  }

  let names = []
  for (const { specifiers } of imports) {
    names.push(...specifiers.map(({ local }) => local.name))
  }

  names = [...new Set(names)]

  const importTokens = tokens.find(
    (t) => names.includes(t.value) && t.type === 'Identifier',
  )

  return importTokens === undefined
})
