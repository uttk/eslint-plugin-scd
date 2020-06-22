# Specific Component Design

Specific Component Design ( SCD ) は、具体的なコンポーネント基準によってコンポーネントを分類して設計するための設計思想です。

SCD はコンポーネント単位が小さい順に、

- [Nue](#nue)
- [Otem](#otem)
- [Pafe](#pafe)
- [Page](#page)
- [Module](#module)

で構成されています。

## Nue

`Nue`は最小単位のコンポーネントを分類します。

### 規約

- コンポーネントファイルを`nues`または`nue`フォルダー下に入れる
- 要素数( html タグやコンポーネントの数 )は、`0~5`個以内する
- State は持たせない
- Hooks の使用禁止

### Example

**正しい Nue コンポーネントの記述例**

```tsx
function GoodExampleNue() {
  return <p>このコンポーネントは要素数が5個以下です</p>;
}
```

**悪い Nue コンポーネントの記述**

```tsx
// 要素数が多すぎるので、ダメ
function BadExampleNue() {
  return (
    <div>
      {/* ここに5個以上の要素 */}
      <p>このコンポーネントは要素数が6個以上です</p>
    </div>
  );
}

// Stateを持っているので、ダメ
function BadExampleNue() {
  const [state, setState] = useState("state");

  return <div>このコンポーネントは要素数が5個以下です</div>;
}

// Hooksを使っているので、ダメ
function BadExampleOtem() {
  useMyHook();

  return <div>{/* any code */}</div>;
}
```

## Otem

`Nue`よりも大きなコンポーネントを分類します。

### 規約

- コンポーネントファイルを`otems`または`otem`フォルダー下に入れる
- 要素数( html タグやコンポーネントの数 )は、`5~10`個以内する
- State は持たせない
- Hooks の使用禁止

### Example

**正しい Otem コンポーネントの記述例**

```tsx
function GoodExampleOtem() {
  return (
    <div>
      <p>このコンポーネントは</p>
      <p>要素数が</p>
      <p>5個</p>
      <p>以上</p>
      <p>10個</p>
      <p>未満です</p>
    </div>
  );
}
```

**悪い Otem コンポーネントの記述**

```tsx
// 要素数が少ないので、ダメ
function BadExampleOtem() {
  return (
    <div>
      <p>このコンポーネントは要素数が5個未満です</p>
    </div>
  );
}

// 要素数が多すぎるので、ダメ
function BadExampleOtem() {
  return (
    <div>
      {/* ここに10個以上の要素 */}
      <p>このコンポーネントは要素数が11個以上です</p>
    </div>
  );
}

// Stateを持っているので、ダメ
function BadExampleOtem() {
  const [state, setState] = useState("state");

  return <div>{/* any code */}</div>;
}

// Hooksを使っているので、ダメ
function BadExampleOtem() {
  useMyHook();

  return <div>{/* any code */}</div>;
}
```

## Pafe

`Nue`や`Otem`よりも大きなコンポーネント、または`State`を保持ているコンポーネントを分類します。

### 規約

- コンポーネントファイルを`pafes`または`pafe`フォルダー下に入れる
- 要素数( html タグやコンポーネントの数 )が`10`個以上、または`State`を保持している
- Hooks を使用してもよい

### Example

**正しい Pafe コンポーネントの記述例**

```tsx
function GoodExamplePafe() {
  return (
    <div>
      {/* ここに10個以上の要素 */}
      <p>このコンポーネントは</p>
      <p>要素数が</p>
      <p>10個</p>
      <p>以上です</p>
    </div>
  );
}

function GoodExamplePafe() {
  const [state, setState] = useState("state");

  return <div>{/* any code */}</div>;
}

function GoodExamplePafe() {
  useMyHook();

  return <div>{/* any code */}</div>;
}
```

**悪い Pafe コンポーネントの記述例**

```tsx
// 要素数が少なすぎるので、ダメ
function BadExamplePafe() {
  return (
    <div>
      <p>このコンポーネントは要素数が10個未満です</p>
      <p>また、Stateを使っていません。</p>
    </div>
  );
}
```

## Page

`Page`は、ページを構成するコンポーネントを分類します。

### 規約

- コンポーネントファイルを`pages`または`page`フォルダー下に入れる
- `<main></main>`を持たせる
- Hooks を使用してもよい

### Example

**正しい Pafe コンポーネントの記述例**

```tsx
/* Page Component Example */

// 正しい例
export const GoodExamplePage = () => {
  const [state, setState] = useState(/* anything */);

  return (
    <div>
      <main>{/* any code */}</main>
    </div>
  );
};
```

**悪い Pafe コンポーネントの記述例**

```tsx
// mainタグが無いので、ダメ
export const BadExamplePage = () => (
  <div>
    <p>mainタグがありません</p>
  </div>
);
```

### Module

`Module`は、上記のどれにも分類できない **例外的なコンポーネント** を分類します。<br />
`Module`には明確な規約はありません。自由に設計できます。

※ `Module`に分類するのは、どうしても他のモノに分類出来ない時です。なるべく`Nue`・`Otem`・`Pafe`・`Page`に分類できるようにしています。
