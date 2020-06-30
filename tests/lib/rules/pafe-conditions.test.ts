import { RuleTester } from "eslint";
import {
  Option,
  ErrorMessage,
  PafeConditions,
} from "../../../src/rules/pafe-conditions";
import { createComponentCode } from "../../util";
import { isPafeComponent } from "../../../src/util/validate";

const option = (value: Partial<Option>) => value;

const filenames = [
  "/src/components/pafes/Hello/index.jsx",
  "/src/components/pafe/index.jsx",
  "/src/index.jsx",
];

const valid = ([] as RuleTester.ValidTestCase[]).concat(
  ...filenames.map<RuleTester.ValidTestCase[]>((filename) => {
    const size = isPafeComponent(filename) ? 11 : 8;

    return [
      { filename, code: createComponentCode({ size }) },
      { filename, code: createComponentCode({ size, arrow: true }) },
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
        code: createComponentCode({
          size,
          arrow: true,
          setBlock: (_, __, ele) => `(${ele})`,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
          setFields: () => "const test = useHooks();",
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 1,
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
          setFields: () => `
            const useHooks = () => {}; 
            const test = useHooks();
          `,
        }),
      },
      {
        filename,
        code: createComponentCode({
          size: 3,
          setFields: () => `
          const [state, setState] = useState(false);

          useEffect(()=> {
            const id = setTimeout(setState, 1000, false);

            return () => clearTimeout(id)
          },[state])
        `,
        }),
      },
      {
        filename,
        options: [option({ ignoreFragmentTag: false })],
        code: createComponentCode({ size: 10, parentTagName: "fragment" }),
      },
      {
        filename,
        options: [option({ min: 5 })],
        code: createComponentCode({ size: 5 }),
      },
    ];
  })
);

const invalid = ([] as RuleTester.InvalidTestCase[]).concat(
  ...filenames.map<RuleTester.InvalidTestCase[]>((filename) => {
    if (!isPafeComponent(filename)) return [];

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
          setFields: () => createComponentCode({ size: 10 }),
        }),
      },
      {
        ...common,
        code: createComponentCode({
          size,
          arrow: true,
          setFields: () => createComponentCode({ size: 10 }),
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
        ...common,
        code: createComponentCode({ size: 10, parentTagName: "fragment" }),
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

ruleTester.run("pafe-conditions", PafeConditions, {
  valid,
  invalid,
});
