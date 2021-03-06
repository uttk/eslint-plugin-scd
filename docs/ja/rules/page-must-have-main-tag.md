# page-must-have-main-tag

Page コンポーネントが main タグを持っているか判定します。

## オプション

```js
// .eslintrc.js

module.exports = {
  extends: ["plugin:scd/recommended"],
  plugins: ["scd"],
  rules: {
    "page-must-have-main-tag": [
      "error",
      {
        message: String, // default : "Page components must have a main tag"
      },
    ],
  },
};
```

## パスする例

```jsx
const Page = () => (
  <main>
    <ul>
      <li></li>
    </ul>
  </main>
);

function useAnyHooks() {
  /* ... */
}

const Page = () => {
  useAnyHooks();

  return (
    <div>
      <main>{/* ... */}</main>
    </div>
  );
};

function Page() {
  return <main>{/* ... */}</main>;
}
```

## エラーになる例

```jsx
const Page = () => (
  <div>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
);

function useAnyHooks() {
  /* ... */
}

const Page = () => {
  useAnyHooks();

  return (
    <div>
      <div>Any</div>
    </div>
  );
};

function Page() {
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
