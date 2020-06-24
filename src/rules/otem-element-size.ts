import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { ErrorMessages } from "../util/errorMessages";
import { isOtemComponent, isComponent } from "../util/validate";
import { ComponentElementSizeCounter } from "../util/ComponentElementSizeCounter";

export const ErrorMessage = ErrorMessages["nue-elements-size"];

export interface Option {
  max: number;
  min: number;
  message: string;
  ignoreFragmentTag: boolean;
}

export const OtemElementSize: Rule.RuleModule = {
  create: (context) => {
    if (!isOtemComponent(context.getFilename())) return {};

    const option: Option = {
      max: 10,
      min: 5,
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
