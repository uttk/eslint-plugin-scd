# nue-element-size

Nue コンポーネントの要素数をカウントし、適切な要素数か判定します。

## オプション

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

## パスする例

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

## エラーになる例

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
