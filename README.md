# eslint-plugin-vue-types

> ESLint plugin for [vue-types](https://github.com/dwightjack/vue-types) and [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

**Warning: This is the documentation for eslint-plugin-vue-types@^2.0.0. The documentation for v.1 is available [here](https://github.com/dwightjack/eslint-plugin-vue-types/blob/v1/README.md).**

This plugin should be used alongside [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) to validate usages of [vue-types](https://github.com/dwightjack/vue-types) on prop definitions (see [this issue](https://github.com/dwightjack/vue-types/issues/29) for details).

## Requirements

- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) `>=6.0.0`

* [ESLint](http://eslint.org/) `>=5.0.0`.
* Node.js `>=10.0.0`

## Installation

```
npm install --save-dev eslint eslint-plugin-vue eslint-plugin-vue-types
```

## Usage

This plugin provides a single rule: `vue-types/require-default-prop`.

The rule extends [`vue/require-default-prop`](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-default-prop.md) preventing it from reporting errors for props defined with `VueTypes` namespaced validators (like `VueTypes.string` or `VueTypes.oneOf([...])`).

It also allows individually imported validators like in the following example:

```js
import { string } from 'vue-types'

export default {
  props: {
    msg: string().isRequired, // no error reported
  },
}
```

## Default usage

In your eslint configuration add `plugin:vue-types/recommended` **after** any `plugin:vue/*` preset.

```json
{
  "extends": [
    "plugin:vue/recommended",
    "plugin:vue-types/recommended"
  ]
}
```

## Customization

### Custom namespaces

By default `vue-types/require-default-prop` will not report VueTypes validators when used with the `VueTypes` namespace.

```js
import VueTypes from 'vue-types'

const theme = VueTypes.oneOf(['dark', 'light'])

export default {
  props: {
    name: VueTypes.string, // <-- not an error
    theme, // <-- error
  },
}
```

To prevent this error you can wrap custom validators in a namespace and add it to the plugin's allowed namespaces:

```json
// .eslintrc.json
{
  "extends": [
    "plugin:vue/recommended",
    "plugin:vue-types/recommended"
  ],
  "settings": {
    "vue-types/namespace": ["AppTypes"]
  }
}
```

```js
import VueTypes from 'vue-types'

const AppTypes = {
  theme: VueTypes.oneOf(['dark', 'light']),
}

export default {
  props: {
    name: VueTypes.string, // <-- not an error
    theme: AppTypes.theme, // <-- not an error
  },
}
```

### Custom import sources

By default `vue-types/require-default-prop` will not report VueTypes individual validators when imported from the `vue-types` module.

To extend this feature to other modules, include them in the `vue-types/sources` setting:

```json
// .eslintrc.json
{
  "extends": [
    "plugin:vue/recommended",
    "plugin:vue-types/recommended"
  ],
  "settings": {
    "vue-types/sources": ["~/utils/prop-types"]
  }
}
```

```js
import { string } from 'vue-types'
import { myValidator } from '~/utils/prop-types'

export default {
  props: {
    name: string(), // <-- not an error
    msg: myValidator(), // <-- custom validator, not an error
  },
}
```

**Note**: This feature is only available for [static import statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-2020 Marco Solazzi
