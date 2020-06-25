# otem-not-use-hooks

Determines if Hooks are used in the Otem component.

## Options

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

## Pass Example

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

## Error Example

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
