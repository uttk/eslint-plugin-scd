import { Rule } from "eslint";
import { Node } from "estree";
import { isNueComponent } from "../utils/nue";

export const nueElementsSize: Rule.RuleModule = {
  create: (context) => {
    if (!isNueComponent(context.getFilename())) return {};

    let counter = 0;

    return {
      JSXElement: (node: Node) => {},

      JSXFragment: () => {
        console.log("=== JSXFragment ===", counter);
      },

      ArrowFunctionExpression: () => {
        console.log("=== ArrowFunctionExpression ===");
      },
    };
  },
};
