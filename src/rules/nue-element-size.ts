import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { isNueComponent, isComponent } from "../util/validate";
import { ErrorMessages } from "../util/errorMessages";
import { ComponentElementSizeCounter } from "../util/ComponentElementSizeCounter";

export const ErrorMessage = ErrorMessages["nue-element-size"];

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
      message: ErrorMessage,
      ignoreFragmentTag: true,
      ...context.options[0],
    };

    const counter = new ComponentElementSizeCounter({ context, ...option });

    return {
      JSXOpeningFragment: (node: Node) => {
        if (node.type === "JSXOpeningFragment" && !option.ignoreFragmentTag) {
          counter.count();
        }
      },

      JSXOpeningElement: (node: Node) => {
        if (node.type === "JSXOpeningElement") {
          counter.count();
        }
      },

      VariableDeclarator: (node: Node) => {
        if (
          node.type === "VariableDeclarator" &&
          node.init?.type === "ArrowFunctionExpression" &&
          isComponent(node.init.body)
        ) {
          counter.start(node);
        }
      },

      "VariableDeclarator:exit": (node: Node) => {
        if (node.type === "VariableDeclarator") {
          counter.close(node);
        }
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type === "FunctionDeclaration" && isComponent(node.body)) {
          counter.start(node);
        }
      },

      "FunctionDeclaration:exit": (node: Node) => {
        if (node.type === "FunctionDeclaration") {
          counter.close(node);
        }
      },
    };
  },
};
