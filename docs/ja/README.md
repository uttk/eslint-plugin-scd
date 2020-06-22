# eslint-plugin-scd

[Specific Component Design ( SCD )](SCD.md)を導入するための**Eslint Plugin**です。
現在は、`Functional Component`にのみ適用できます。

## インストール

```bash
$> npm install eslint-plugin-scd
```

or

```bash
$> yarn add eslint-plugin-scd
```

## 使い方

**eslint に適用する**

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    // 各ルール設定
  },
};
```

## サポートしているルール

各ルールの機能やオプションについては、以下をご参照ください。

|                   ルール名                    |              ルールの解説              |
| :-------------------------------------------: | :------------------------------------: |
| [nue-element-size](rules/nue-element-size.md) | Nue コンポーネントのサイズを判定します |
