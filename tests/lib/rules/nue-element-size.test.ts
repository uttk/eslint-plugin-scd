import { RuleTester } from "eslint";
import { NueElementSize, ErrorMessage } from "@src/rules/nue-element-size";

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
  valid: [
    { code: `const Nue = () => <div></div>` },
    { code: `const Nue = () => ( <div> <p>Hello World!</p> </div>)` },
    { code: `function Nue(){ return ( <div></div> ); }` },
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
    },
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

      errors: [ErrorMessage],

      filename: "/src/components/nues/Hello/index.js",
    },
    {
      code: `
        function Nue(){
          return (
            <div>
              <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          );
        }
      `,

      errors: [ErrorMessage],

      filename: "/src/components/nues/Hello/index.js",
    },
  ],
});
