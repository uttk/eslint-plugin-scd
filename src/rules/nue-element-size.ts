import { Rule } from "eslint";
import { Node, VariableDeclarator, FunctionDeclaration } from "estree-jsx";
import { ErrorMessages } from "../util/errorMessages";
import { isNueComponent, isComponent } from "../util/validate";
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

    const counter = new ComponentElementSizeCounter({
      ...option,
      report: (descriptor) => context.report(descriptor),
    });

    return {
      JSXOpeningFragment: () => {
        if (!option.ignoreFragmentTag) {
          counter.count();
        }
      },

      JSXOpeningElement: () => {
        counter.count();
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
        counter.close(node as VariableDeclarator);
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type === "FunctionDeclaration" && isComponent(node.body)) {
          counter.start(node);
        }
      },

      "FunctionDeclaration:exit": (node: Node) => {
        counter.close(node as FunctionDeclaration);
      },
    };
  },
};
