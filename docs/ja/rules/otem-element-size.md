# otem-element-size

Otem コンポーネントの要素数をカウントし、適切な要素数か判定します。

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
        max: Number, // default : 10
        min: Number, // default : 5
        message: String, // default : "Otem component elements must be between 5 and 10"
        ignoreFragmentTag: Boolean, // default : true
      },
    ],
  },
};
```

## パスする例

```jsx
const Otem = () => (
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

const Otem = () => {
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
};

function Otem() {
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
}
```

## エラーになる例

```jsx
const Otem = () => (
  <div class="1">
    <ul class="2">
      <li class="3"></li>
      <li class="4"></li>
    </ul>
  </div>
);

const Otem = () => {
  return (
    <div class="1">
      <ul class="2">
        <li class="3"></li>
        <li class="4"></li>
        <li class="5"></li>
        <li class="6"></li>
        <li class="7"></li>
        <li class="8"></li>
        <li class="9"></li>
        <li class="10"></li>
        <li class="11"></li>
      </ul>
    </div>
  );
};

function Otem() {
  return (
    <div class="1">
      <ul class="2">
        <li class="3"></li>
        <li class="4"></li>
        <li class="5"></li>
        <li class="6"></li>
        <li class="7"></li>
        <li class="8"></li>
        <li class="9"></li>
        <li class="10"></li>
        <li class="11"></li>
        <li class="12"></li>
      </ul>
    </div>
  );
}
```
