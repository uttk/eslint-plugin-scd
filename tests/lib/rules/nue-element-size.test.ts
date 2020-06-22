import { RuleTester } from "eslint";
import {
  Option,
  ErrorMessage,
  NueElementSize,
} from "../../../src/rules/nue-element-size";
import { createComponentCode } from "../../util";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const option = (value: Partial<Option>) => value;
const filename = "/src/components/nues/Hello/index.js";

ruleTester.run("nue-element-size", NueElementSize, {
  valid: [
    { code: createComponentCode({ size: 1 }) },
    { code: createComponentCode({ size: 2, arrow: true }) },
    { code: createComponentCode({ size: 8 }) },
    {
      filename,
      code: createComponentCode({ size: 6, parentTagName: "fragment" }),
    },
  ],
  invalid: [
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
  ],
});
