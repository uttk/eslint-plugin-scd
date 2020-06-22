import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { isNueComponent } from "../util/validate";
import { ErrorMessages } from "../util/errorMessages";
import { ComponentElementSizeCounter } from "../util/ComponentElementSizeCounter";

export const ErrorMessage = ErrorMessages["nue-elements-size"];

/**
 * @description
 */
export const NueElementSize: Rule.RuleModule = {
  create: (context) => {
    if (!isNueComponent(context.getFilename())) return {};

    const option = {
      max: 5,
      min: 0,
      message: "Nue components must have no more than 5 elements",
      ...context.options[0],
    };

    const counter = new ComponentElementSizeCounter({ context, ...option });

    return {
      JSXOpeningElement: (node: Node) => {
        if (node.type === "JSXOpeningElement") {
          counter.check();
        }
      },

      VariableDeclarator: (node: Node) => {
        if (
          node.type === "VariableDeclarator" &&
          node.init?.type === "ArrowFunctionExpression"
        ) {
          counter.init(node);
        }
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type !== "FunctionDeclaration") return;

        node.body.body.forEach((node) => {
          if (
            node.type === "ReturnStatement" &&
            node.argument?.type.match("JSX")
          ) {
            counter.init(node);
          }
        });
      },
    };
  },
};
