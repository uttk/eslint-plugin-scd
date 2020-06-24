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
function Nue() {
  return <div>Any</div>;
}

const Nue = () => <div>Any</div>;

const Nue = () => (
  <div>
    <p>Any</p>
    <p>Any</p>
    <p>Any</p>
  </div>
);
```

## エラーになる例

```jsx
const Nue = () => (
  <div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
);

function Nue() {
  return (
    <div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}
```
