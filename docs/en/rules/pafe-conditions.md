# pafe-conditions

Determines if the Pafe component uses Hooks or has 10 or more elements.

## Options

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    "pafe-conditions": [
      "error",
      {
        max: Number, // default : Infinity
        min: Number, // default : 10
        message: String, // default : "Pafe components must have Hooks or 10 or more elements."
        ignoreFragmentTag: Boolean, // default : true
      },
    ],
  },
};
```

## Pass Example

```jsx
function useAnyHooks() {
  /* ... */
}

function Pafe() {
  useAnyHooks();

  return <div>Any</div>;
}

const Pafe = () => {
  return (
    <div className="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
        <li className="5"></li>
        <li className="6"></li>
        <li className="7"></li>
        <li className="8"></li>
        <li className="9"></li>
        <li className="10"></li>
      </ul>
    </div>
  );
};
```

## Error Example

```jsx
const AnyFunc = () => {
  /* ... */
};

function Pafe() {
  return (
    <div className="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
        <li className="5"></li>
      </ul>
    </div>
  );
}

const Pafe = () => {
  AnyFunc();

  return (
    <div className="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
        <li className="5"></li>
      </ul>
    </div>
  );
};
```
