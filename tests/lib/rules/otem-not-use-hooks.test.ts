import { RuleTester } from "eslint";
import {
  Option,
  ErrorMessage,
  OtemNotUseHooks,
} from "../../../src/rules/otem-not-use-hooks";
import { isOtemComponent } from "../../../src/util/validate";
import { createComponentCode } from "../../util";

const option = (value: Option) => value;

const filenames = [
  "/src/components/otems/Hello/index.jsx",
  "/src/components/otem/index.jsx",
  "/src/index.jsx",
];

const valid = ([] as RuleTester.ValidTestCase[]).concat(
  ...filenames.map<RuleTester.ValidTestCase[]>((filename) => {
    const isOtem = isOtemComponent(filename);
    const size = 7;

    return [
      {
        filename,
        code: createComponentCode({
          size,
          setFields: isOtem ? void 0 : () => "useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          arrow: true,
          setFields: isOtem ? void 0 : () => "useHooks();",
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
    if (!isOtemComponent(filename)) return [];

    const size = 7;

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
          setFields: () => "const useHooks = () => {}; useHooks();",
        }),
      },
      {
        filename,
        errors: [ErrorMessage],
        code: createComponentCode({
          size,
          arrow: true,
          setFields: () => "const useHooks = () => {}; useHooks();",
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

ruleTester.run("otem-not-use-hooks", OtemNotUseHooks, {
  valid,
  invalid,
});
