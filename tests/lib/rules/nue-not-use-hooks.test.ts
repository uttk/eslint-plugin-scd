import { RuleTester } from "eslint";
import {
  Option,
  ErrorMessage,
  NueNotUseHooks,
} from "../../../src/rules/nue-not-use-hooks";
import { isNueComponent } from "../../../src/util/validate";
import { createComponentCode } from "../../util";

const option = (value: Option) => value;

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
        code: createComponentCode({
          size: 1,
          setFields: isNue ? void 0 : () => "useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          arrow: true,
          setFields: isNue ? void 0 : () => "useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          arrow: true,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        code: "() => {}",
      },
      {
        filename,
        code: "function NotComponent(){}",
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
        code: createComponentCode({
          size: 1,
          setFields: () => "useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 1,
          arrow: true,
          setFields: () => "useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 1,
          setFields: () => "const test = useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 1,
          arrow: true,
          setFields: () => "const test = useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 1,
          setFields: () => "useHooks();",
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size: 1,
          arrow: true,
          setFields: () => "useHooks();",
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({
          size: 1,
          setFields: () => "useHooks();",
        }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({
          size: 1,
          arrow: true,
          setFields: () => "useHooks();",
        }),
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

ruleTester.run("nue-not-use-hooks", NueNotUseHooks, {
  valid,
  invalid,
});
