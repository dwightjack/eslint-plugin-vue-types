# eslint-plugin-vue-types

> ESLint plugin for [vue-types](https://github.com/dwightjack/vue-types) and [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

This plugin should be used alongside [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) to validate usages of [vue-types](https://github.com/dwightjack/vue-types) on prop definitions (see [this issue](https://github.com/dwightjack/vue-types/issues/29) for details).

## Requirements

* [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) `^4.4.0`
- [ESLint](http://eslint.org/) `>=3.18.0`.
  - `>=4.7.0` to use `eslint --fix`.
  - `>=4.14.0` to use with `babel-eslint`.
- Node.js `>=4.0.0`

## Installation

```
npm install --save-dev eslint eslint-plugin-vue eslint-plugin-vue-types
```

## Usage

This plugin provides the following [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) rule:

* `vue-types/require-default-prop`: extends [`vue/require-default-prop`](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-default-prop.md) allowing `VueTypes` methods.

## Default usage

In your eslint configuration add `plugin:vue-types/strongly-recommended` after any `plugin:vue/*` preset.

```js
module.exports = {
  extends: [
    // ...
    'plugin:vue/strongly-recommended'
    'plugin:vue-types/strongly-recommended'
  ],
  //...
}
```

## Custom `vue-types` namespaces

By default `vue-types/require-default-prop` will not report `vue-types` when used with the `VueTypes` namespace.

```js
import VueTypes from 'vue-types'

const theme = VueTypes.oneOf(['dark', 'light'])

export default {

  props: {
    name: VueTypes.string, // <-- not an error
    theme, // <-- error
  }

}
```

To prevent this error you can wrap custom definition in a namespace and add it to the plugin's whitelist:

```js
// .eslint.rc.js
module.exports = {
  extends: [
    // ...
    'plugin:vue/strongly-recommended'
    'plugin:vue-types/strongly-recommended'
  ],
  settings: {
    'vue-types/namespace': ['VueTypes', 'AppTypes']
  }
}
```

```js
import VueTypes from 'vue-types'

const AppTypes = {
  theme: VueTypes.oneOf(['dark', 'light'])
}

export default {

  props: {
    name: VueTypes.string, // <-- not an error
    theme: AppTypes.theme, // <-- not an error
  }

}
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 Marco Solazzi
