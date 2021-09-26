# eslint-plugin-vue-types

> ESLint plugin for [vue-types](https://github.com/dwightjack/vue-types) and [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)

## eslint-plugin-vue version note

Since `eslint-plugin-vue@7`, the `vue/require-default-prop` rule ignores props assignment by call expressions (`VueTypes.arrayOf(String)`) or object properties (`VueTypes.array`). So you don't need this plugin anymore.

**If you are using an older version of `eslint-plugin-vue` consider upgrading it.**

`--- Original Documentation ---`

**Warning: This is the documentation for eslint-plugin-vue-types@^2.0.0. The documentation for v.1 is available [here](https://github.com/dwightjack/eslint-plugin-vue-types/blob/v1/README.md).**

This plugin should be used alongside [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) to allow the usage of [vue-types](https://github.com/dwightjack/vue-types) validators as valid prop definitions with the [] rule (see [vue-types#29](https://github.com/dwightjack/vue-types/issues/29) and [vue-types#179](https://github.com/dwightjack/vue-types/issues/179) for details).

## Requirements

- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) `^6.0.0`

* [ESLint](http://eslint.org/) `>=5.0.0`.
* Node.js `>=10.0.0`

## Installation

```
npm install --save-dev eslint eslint-plugin-vue eslint-plugin-vue-types
```

## Usage

This plugin provides a single rule: `vue-types/require-default-prop`.

The rule extends [`vue/require-default-prop`](https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/require-default-prop.md) preventing it from reporting errors for props defined with `VueTypes` namespaced validators (like `VueTypes.string` or `VueTypes.oneOf([...])`). It also allows individually imported validators.

In your eslint configuration add `plugin:vue-types/recommended` **after** any `plugin:vue/*` preset.

```json
{
  "extends": ["plugin:vue/recommended", "plugin:vue-types/recommended"]
}
```

This will filter errors for prop definitions like:

```js
import VueTypes, { string } from 'vue-types'

export default {
  props: {
    msg1: string().isRequired, // no error reported
    msg2: VueTypes.string, // no error reported
    msg3: VueTypes.shape({}).loose.isRequired, // no error reported
  },
}
```

**Note:** For this plugin to work properly, ensure that the `.isRequired` flag always comes last in the chain:

```js
import { shape } from 'vue-types'

export default {
  props: {
    msg1: shape({ ... }).loose.isRequired, // no error reported

    msg2: shape({}).isRequired.loose, // ERROR!
  },
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
  "extends": ["plugin:vue/recommended", "plugin:vue-types/recommended"],
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
  "extends": ["plugin:vue/recommended", "plugin:vue-types/recommended"],
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

Copyright (c) 2018-2021 Marco Solazzi
