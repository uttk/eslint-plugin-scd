# nue-not-use-hooks

The Nue component determines if Hooks are used.

## Options

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

## Pass Example

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

## Error Example

```jsx
function useAnyFunc() {
  /* ... */
}

function Nue() {
  useAnyFunc();

  return <div>Any</div>;
}

const Nue = () => {
  useAnyFunc();

  return <div>Any</div>;
};
```
