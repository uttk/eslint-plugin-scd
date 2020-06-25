# nue-element-size

Counts the number of elements in the Nue component and determines if the number is appropriate.

## Options

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    "nue-element-size": [
      "error",
      {
        max: Number, // default : 5
        min: Number, // default : 0
        message: String, // default : "Nue components must have no more than 5 elements"
        ignoreFragmentTag: Boolean, // default : true
      },
    ],
  },
};
```

## Pass Example

```jsx
const Nue = () => (
  <div clasName="1">
    <ul className="2">
      <li className="3"></li>
    </ul>
  </div>
);

const Nue = () => {
  return (
    <div clasName="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
      </ul>
    </div>
  );
};

function Nue() {
  return (
    <div clasName="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
        <li className="5"></li>
      </ul>
    </div>
  );
}
```

## Error Example

```jsx
const Nue = () => (
  <div className="1">
    <ul className="2">
      <li className="3"></li>
      <li className="4"></li>
      <li className="5"></li>
      <li className="6"></li>
    </ul>
  </div>
);

const Nue = () => {
  return (
    <div className="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
        <li className="5"></li>
        <li className="6"></li>
        <li className="7"></li>
      </ul>
    </div>
  );
};

function Nue() {
  return (
    <div className="1">
      <ul className="2">
        <li className="3"></li>
        <li className="4"></li>
        <li className="5"></li>
        <li className="6"></li>
        <li className="7"></li>
        <li className="8"></li>
      </ul>
    </div>
  );
}
```
