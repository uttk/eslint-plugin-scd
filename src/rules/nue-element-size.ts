import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { isNueComponent } from "../util/validate";
import { ErrorMessages } from "../util/errorMessages";
import { ComponentElementSizeCounter } from "../util/ComponentElementSizeCounter";

export const ErrorMessage = ErrorMessages["nue-elements-size"];

export interface Option {
  max: number;
  min: number;
  message: string;
  ignoreFragmentTag: boolean;
}

export const NueElementSize: Rule.RuleModule = {
  create: (context) => {
    if (!isNueComponent(context.getFilename())) return {};

    const option: Option = {
      max: 5,
      min: 0,
      message: "Nue components must have no more than 5 elements",
      ignoreFragmentTag: true,
      ...context.options[0],
    };

    const counter = new ComponentElementSizeCounter({ context, ...option });

    return {
      JSXOpeningFragment: (node: Node) => {
        if (node.type === "JSXOpeningFragment" && !option.ignoreFragmentTag) {
          counter.check();
        }
      },

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
