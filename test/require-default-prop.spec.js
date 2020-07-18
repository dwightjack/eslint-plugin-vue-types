const rule = require('../lib/rules/require-default-prop')
const RuleTester = require('eslint').RuleTester
const parserOptions = {
  ecmaVersion: 2019,
  ecmaFeatures: { experimentalObjectRestSpread: true },
  sourceType: 'module',
}

// const settings = {
//   'vue-types/namespace': ['VueTypes'],
// }

// const ruleTester = new RuleTester({ parserOptions, settings })
// ruleTester.run('require-default-prop', rule, {
//   valid: [
//     {
//       filename: 'test.vue',
//       code: `
//         export default {
//           props: {
//             a: {
//               type: Number,
//               required: true
//             },
//             b: VueTypes.string,
//             c: {
//               type: Number,
//               default: 0,
//               required: false
//             }
//           }
//         }
//       `,
//     },
//     {
//       filename: 'test.vue',
//       code: `
//         export default {
//           props: {
//             ...x,
//             a: {
//               ...y,
//               type: Number,
//               required: true
//             },
//             b: {
//               type: Number,
//               default: 0
//             }
//           }
//         }
//       `,
//     },
//     {
//       filename: 'test.vue',
//       code: `
//         const x = {
//           type: Object,
//           default() {
//             return {
//               foo: 1,
//               bar: 2
//             }
//           }
//         }
//         export default {
//           props: {
//             a: {
//               ...x,
//               default() {
//                 return {
//                   ...x.default(),
//                   baz: 3
//                 }
//               }
//             }
//           }
//         }
//       `,
//     },
//   ],

//   invalid: [],
// })

const ruleTesterCustom = new RuleTester({
  parserOptions,
  settings: {
    'vue-types/namespace': ['VueTypes', 'AppTypes'],
  },
})
ruleTesterCustom.run('require-default-prop custom settings', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        const AppTypes = {
          theme: VueTypes.oneOf(['dark', 'light'])
        }
        export default {
          props: {
            a: {
              type: Number,
              required: true
            },
            b: VueTypes.string,
            c: AppTypes.theme,
            d: VueTypes.oneOf(['dark', 'light']),
          }
        }
      `,
    },
  ],

  invalid: [],
})

// const ruleTesterTS = new RuleTester({
//   parserOptions,
//   settings,
//   parser: require.resolve('@typescript-eslint/parser'),
// })
// ruleTesterTS.run('require-default-prop with @typescript-eslint/parser', rule, {
//   valid: [
//     {
//       filename: 'test.vue',
//       code: `
//         export default {
//           props: {
//             a: {
//               type: Number,
//               required: true
//             },
//             b: VueTypes.string,
//             c: VueTypes.oneOf(['dark', 'light']),
//             d: {
//               type: Number,
//               default: 0,
//               required: false
//             }
//           }
//         }
//       `,
//     },
//   ],

//   invalid: [],
// })

const ruleTesterImport = new RuleTester({
  parserOptions,
  settings: {
    'vue-types/namespace': ['VueTypes', 'AppTypes'],
  },
})
ruleTesterImport.run('require-default-prop imported validators', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
        import VueTypes, { string, number as num } from 'vue-types'
        export default {
          props: {
            a: VueTypes.string,
            b: string().isRequired,
            c: num(),
          }
        }
      `,
    },
  ],

  invalid: [],
})
