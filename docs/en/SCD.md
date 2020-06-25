# Specific Component Design

Specific Component Design (SCD) is a design concept for classifying and designing components according to specific component standards.

SCD is composed of

- [Nue](#nue)
- [Otem](#otem)
- [Pafe](#pafe)
- [Page](#page)
- [Module](#module)

in ascending order of component units.

## Nue

Nue classifies the smallest component.

### Rules

- Put the component files under the `nues` or `nue` folder
- The number of elements (the number of html tags or components) should be within `0-5`.
- Don't have State
- Do not use Hooks

### Example

**Correct Example**

```tsx
function GoodExampleNue() {
  return <p>This component has no more than 5 elements</p>;
}
```

**Bad Example**

```tsx
// Too many elements, not good👎
function BadExampleNue() {
  return (
    <div>
      {/* There are more than 5 elements here */}
      <p>This component has more than 6 elements</p>
    </div>
  );
}

// Since this component has a state, not good👎
function BadExampleNue() {
  const [state, setState] = useState("state");

  return <div>This component has no more than 5 elements</div>;
}

// This component uses Hooks, not good👎
function BadExampleOtem() {
  useMyHook();

  return <div>{/* any code */}</div>;
}
```

## Otem

Classify components that are larger than `Nue`.

### Rules

- Put the component files under the `otems` or `otem` folder
- The number of elements (the number of html tags or components) should be within `5-10`.
- Don't have State
- Do not use Hooks

### Example

**Correct Example**

```jsx
function GoodExampleOtem() {
  return (
    <div>
      <p>This component</p>
      <p>has more than 5 </p>
      <p>and</p>
      <p>less than 10</p>
      <p>elements</p>
      <p>🐱‍🏍</p>
    </div>
  );
}
```

**Bad Example**

```jsx
// Too few elements、not good👎
function BadExampleOtem() {
  return (
    <div>
      <p>This component has less than 5 elements</p>
    </div>
  );
}

// Too many elements, not good👎
function BadExampleOtem() {
  return (
    <div>
      {/* There are more than 10 elements here */}
      <p>This component has more than 11 elements</p>
    </div>
  );
}

// Since this component has a state, not good👎
function BadExampleOtem() {
  const [state, setState] = useState("state");

  return <div>{/* any code */}</div>;
}

// This component uses Hooks, not good👎
function BadExampleOtem() {
  useAnyHooks();

  return <div>{/* any code */}</div>;
}
```

## Pafe

Classify components that are larger than `Nue` or `Otem`, or have a `state`.

### Rules

- Put the component files under the `pafes` or `pafe` folder
- The number of elements (the number of html tags or components) is more than `10` or holds `state`
- May use Hooks

### Example

**Correct Example**

```tsx
function GoodExamplePafe() {
  return (
    <div>
      {/* There are more than 10 elements here */}
      <p>This component</p>
      <p>has</p>
      <p>more than 10 elements</p>
      <p>🐱‍👤</p>
    </div>
  );
}

function GoodExamplePafe() {
  const [state, setState] = useState("state");

  return <div>{/* anything */}</div>;
}

function GoodExamplePafe() {
  useMyHook();

  return <div>{/* anything */}</div>;
}
```

**Bad Example**

```tsx
// Too few elements, not good👎
function BadExamplePafe() {
  return (
    <div>
      <p>This component has less than 10 elements</p>
      <p>Also, it does not use State.</p>
    </div>
  );
}
```

## Page

`Page` classifies the components that make up a page.

### Rules

- Put the component files under the `pages` or `page` folder
- Must have `<main></main>`
- May use Hooks

### Example

**Correct Example**

```tsx
export const GoodExamplePage = () => {
  const [state, setState] = useState(/* anything */);

  return (
    <div>
      <main>{/* anything */}</main>
    </div>
  );
};
```

**Bad Example**

```tsx
// Doesn't have a main tag, not good👎
export const BadExamplePage = () => (
  <div>
    <p>main tag is missing</p>
  </div>
);
```

## Module

The `Module` classifies **exceptional components** that cannot be classified in any of the above.<br />
There is no clear convention for `Module`. You can design freely.

⚠ Classifying into `Module` is when it cannot be classified into other things. Please try to be able to classify into `Nue`, `Otem`, `Pafe`, and `Page` as much as possible.
