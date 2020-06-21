import { RuleTester } from "eslint";
import { nueElementsSize } from "./nue-elements-size";

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run("nue-elements-size", nueElementsSize, {
  valid: [
    { code: `const Nue = () => <div></div>` },
    { code: `const Nue = () => ( <div> <p>Hello World!</p> </div>)` },
    { code: `function Nue(){ return ( <div></div> ); }` },
  ],
  invalid: [
    {
      code: `
        const Nue = () => (
          <div>
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        )
      `,
      errors: [
        "There are too many elements. Nue components must have 0 to 5 elements or less",
      ],
      filename: "/src/components/nues/Hello/index.js",
    },
  ],
});
