# otem-not-use-hooks

Otem コンポーネントで、Hooks が使われているか判定します。

※ Hooks 関数かどうかは、関数名が`use`で始まるかどうかで判定しています。

## オプション

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    "otem-not-use-hooks": [
      "error",
      {
        message: String, // default : "Otem components should not use Hooks"
      },
    ],
  },
};
```

## パスする例

```jsx
function AnyFunc() {
  /* ... */
}

function Otem() {
  AnyFunc();

  return <div>Any</div>;
}

const Otem = () => {
  AnyFunc();

  return <div>Any</div>;
};
```

## エラーになる例

```jsx
function useAnyFunc() {
  /* ... */
}

function Otem() {
  useAnyFunc();

  return <div>Any</div>;
}

const Otem = () => {
  useAnyFunc();

  return <div>Any</div>;
};
```
