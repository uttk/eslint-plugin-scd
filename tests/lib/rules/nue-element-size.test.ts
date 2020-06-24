import { RuleTester } from "eslint";
import {
  Option,
  ErrorMessage,
  NueElementSize,
} from "../../../src/rules/nue-element-size";
import { createComponentCode } from "../../util";
import { isNueComponent } from "../../../src/util/validate";

const option = (value: Partial<Option>) => value;

const filenames = [
  "/src/components/nues/Hello/index.jsx",
  "/src/components/nue/index.jsx",
  "/src/index.jsx",
];

const valid = ([] as RuleTester.ValidTestCase[]).concat(
  ...filenames.map<RuleTester.ValidTestCase[]>((filename) => {
    const size = isNueComponent(filename) ? 5 : 8;

    return [
      { filename, code: createComponentCode({ size }) },
      { filename, code: createComponentCode({ size, arrow: true }) },
      {
        filename,
        code: createComponentCode({ size: 6, parentTagName: "fragment" }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          arrow: true,
          setBlock: (_, __, ele) => `(${ele})`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          setFields: () =>
            `const A = () => (<div><div /><div /><div /></div>);`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          arrow: true,
          setFields: () =>
            `const A = () => (<div><div /><div /><div /></div>);`,
        }),
      },
      {
        filename,
        options: [option({ max: 10 })],
        code: createComponentCode({ size: 10 }),
      },
    ];
  })
);

const invalid = ([] as RuleTester.InvalidTestCase[]).concat(
  ...filenames.map<RuleTester.InvalidTestCase[]>((filename) => {
    if (!isNueComponent(filename)) return [];

    const size = 8;

    return [
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({ size }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({ size, arrow: true }),
      },
      {
        filename,
        errors: [ErrorMessage],
        options: [option({ ignoreFragmentTag: false })],
        code: createComponentCode({ size: 6, parentTagName: "fragment" }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          arrow: true,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          arrow: true,
          setBlock: (_, __, ele) => `(${ele})`,
        }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({ size }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({ size, arrow: true }),
      },
    ];
  })
);

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("nue-element-size", NueElementSize, {
  valid,
  invalid,
});
