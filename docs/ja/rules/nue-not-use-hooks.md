# nue-not-use-hooks

Nue コンポーネントで、Hooks が使われているか判定します。

※ Hooks 関数かどうかは、関数名が`use`で始まるかどうかで判定しています。

## オプション

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    "nue-not-use-hooks": [
      "error",
      {
        message: String, // default : "Nue components should not use Hooks"
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

function Nue() {
  AnyFunc();

  return <div>Any</div>;
}

const Nue = () => {
  AnyFunc();

  return <div>Any</div>;
};
```

## エラーになる例

```jsx
function useAnyFunc() {
  /* ... */
}

function Nue() {
  useAnyFunc(); // error

  return <div>Any</div>;
}

const Nue = () => {
  useAnyFunc(); // error

  return <div>Any</div>;
};
```
