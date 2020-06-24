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
    const size = 1;

    return [
      {
        filename,
        code: createComponentCode({
          size,
          setFields: isNue ? void 0 : () => "useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          arrow: true,
          setFields: isNue ? void 0 : () => "useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
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

    const size = 1;

    return [
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          setFields: () => "useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          arrow: true,
          setFields: () => "useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          setFields: () => "const test = useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          arrow: true,
          setFields: () => "const test = useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          setFields: () => "useHooks();",
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
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
          size,
          setFields: () => "useHooks();",
        }),
      },
      {
        filename,
        errors: ["error"],
        options: [option({ message: "error" })],
        code: createComponentCode({
          size,
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
