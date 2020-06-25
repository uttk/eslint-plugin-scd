import { RuleTester } from "eslint";
import {
  Option,
  ErrorMessage,
  PageMustHaveMainTag,
} from "../../../src/rules/page-must-have-main-tag";
import { createComponentCode } from "../../util";
import { isPageComponent } from "../../../src/util/validate";

const option = (value: Partial<Option>) => value;

const filenames = [
  "/src/components/pages/Hello/index.jsx",
  "/src/components/page/index.jsx",
  "/src/index.jsx",
];

const valid = ([] as RuleTester.ValidTestCase[]).concat(
  ...filenames.map<RuleTester.ValidTestCase[]>((filename) => {
    const size = 8;

    return [
      { filename, code: createComponentCode({ size, parentTagName: "main" }) },
      {
        filename,
        code: createComponentCode({ size, arrow: true, parentTagName: "main" }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          parentTagName: "main",
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          arrow: true,
          parentTagName: "main",
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size,
          arrow: true,
          parentTagName: "main",
          setBlock: (_, __, ele) => `(${ele})`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          parentTagName: "main",
          setFields: () => "const test = useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          parentTagName: "main",
          setFields: () => `
            const useHooks = () => {}; 
            const test = useHooks();
          `,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          arrow: true,
          parentTagName: "main",
          setFields: () => `
            const useHooks = () => {}; 
            const test = useHooks();
          `,
        }),
      },
    ];
  })
);

const invalid = ([] as RuleTester.InvalidTestCase[]).concat(
  ...filenames.map<RuleTester.InvalidTestCase[]>((filename) => {
    if (!isPageComponent(filename)) return [];

    const size = 8;
    const common = {
      filename,
      errors: [ErrorMessage],
    };

    return [
      { ...common, code: createComponentCode({ size }) },
      { ...common, code: createComponentCode({ size, arrow: true }) },
      {
        ...common,
        code: createComponentCode({
          size,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        ...common,
        code: createComponentCode({
          size,
          arrow: true,
          setReturnValue: (ele) => `bool ? ${ele} : null`,
        }),
      },
      {
        ...common,
        code: createComponentCode({
          size,
          setFields: () => createComponentCode({ size, parentTagName: "main" }),
        }),
      },
      {
        ...common,
        code: createComponentCode({
          size,
          arrow: true,
          setFields: () => createComponentCode({ size, parentTagName: "main" }),
        }),
      },
      {
        ...common,
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

ruleTester.run("page-must-have-main-tag", PageMustHaveMainTag, {
  valid,
  invalid,
});
