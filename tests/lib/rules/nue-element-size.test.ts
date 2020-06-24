import { RuleTester, Rule } from "eslint";
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
    const isNue = isNueComponent(filename);

    return [
      {
        filename,
        code: createComponentCode({ size: isNue ? 4 : 8 }),
      },
      {
        filename,
        code: createComponentCode({ size: isNue ? 4 : 8, arrow: true }),
      },
      {
        filename,
        code: createComponentCode({ size: 6, parentTagName: "fragment" }),
      },
      {
        filename,
        code: createComponentCode({
          size: isNue ? 4 : 8,
          arrow: true,
          setBlock: (_, __, ele) => `(${ele})`,
        }),
      },
    ];
  })
);

const invalid = ([] as RuleTester.InvalidTestCase[]).concat(
  ...filenames.map<RuleTester.InvalidTestCase[]>((filename) => {
    if (!isNueComponent(filename)) return [];

    return [
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({ size: 8 }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({ size: 8, arrow: true }),
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
          size: 8,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 8,
          arrow: true,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 8,
          arrow: true,
          setBlock: (_, __, ele) => `(${ele})`,
        }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({ size: 8 }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({ size: 8, arrow: true }),
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
