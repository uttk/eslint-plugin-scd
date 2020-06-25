Support Languages : [English](README.md) | [日本語](docs/ja/README.md)

# eslint-plugin-scd

This **ESLint Plugin** for introducing [Specific Component Design ( SCD )](docs/en/SCD.md).
Currently applicable only to Functional Components.

## install

```bash
$> npm install eslint-plugin-scd
```

or

```bash
$> yarn add eslint-plugin-scd
```

## Usage

**apply to eslint**

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    /* You can override the rules */
  },
};
```

## Supported Rules

See below for the features and options of each rule.

| Name                                                                | Description                                                                |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------- |
| [nue-element-size](docs/en/rules/nue-element-size.md)               | Determines the size of the Nue component                                   |
| [nue-not-use-hooks](docs/en/rules/nue-not-use-hooks.md)             | Determine if Hooks are used in the Nue component                           |
| [otem-element-size](docs/en/rules/otem-element-size.md)             | Determines the size of the Otem component                                  |
| [otem-not-use-hooks](docs/en/rules/nue-not-use-hooks.md)            | Determine if Hooks are used in the Otem component                          |
| [pafe-conditions](docs/en/rules/pafe-conditions.md)                 | Determine if Pafe component has more than 10 elements or if Hooks are used |
| [page-must-have-main-tag](docs/en/rules/page-must-have-main-tag.md) | Determine if the Page component has a main tag.                            |

## Contribution

Do you have bugs, feature additions, questions, etc. in this repository? If so, please refer to [this file](docs/en/CONTRIBUTION.md) and contribute!

## MIT LICENSE

[MIT](LICENSE "LICENSE")
