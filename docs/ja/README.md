# eslint-plugin-scd

[Specific Component Design ( SCD )](SCD.md)を導入するための**ESLint Plugin**です。
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

| ルール名                                         | ルールの解説                                                                     |
| :----------------------------------------------- | :------------------------------------------------------------------------------- |
| [nue-element-size](rules/nue-element-size.md)    | Nue コンポーネントのサイズを判定します                                           |
| [nue-not-use-hooks](rules/nue-not-use-hooks.md)  | Nue コンポーネントで Hooks が使われているか判定します                            |
| [otem-element-size](rules/otem-element-size.md)  | Otem コンポーネントのサイズを判定します                                          |
| [otem-not-use-hooks](rules/nue-not-use-hooks.md) | Otem コンポーネントで Hooks が使われているか判定します                           |
| [pafe-conditions](rules/pafe-conditions.md)      | Pafe コンポーネントの要素数が 10 個以上または、 Hooks が使われているか判定します |

## 貢献

このリポジトリにバグや機能の追加、質問などがありますか？それなら、ぜひ[このファイル](CONTRIBUTION.md)を参考にして、貢献してください！

## MIT LICENSE

[MIT](LICENSE "LICENSE")
