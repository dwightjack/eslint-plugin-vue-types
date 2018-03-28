const rule = require('../../eslint/require-default-prop')
const RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: { experimentalObjectRestSpread: true },
  sourceType: 'module'
}

const ruleTester = new RuleTester()
ruleTester.run('require-default-prop', rule, {

  valid: [
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            a: {
              type: Number,
              required: true
            },
            b: VueTypes.string,
            c: {
              type: Number,
              default: 0,
              required: false
            }
          }
        }
      `,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
        export default {
          props: {
            ...x,
            a: {
              ...y,
              type: Number,
              required: true
            },
            b: {
              type: Number,
              default: 0
            }
          }
        }
      `,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `
        const x = {
          type: Object,
          default() {
            return {
              foo: 1,
              bar: 2
            }
          }
        }
        export default {
          props: {
            a: {
              ...x,
              default() {
                return {
                  ...x.default(),
                  baz: 3
                }
              }
            }
          }
        }
      `,
      parserOptions
    }
  ],

  invalid: [

  ]
})
