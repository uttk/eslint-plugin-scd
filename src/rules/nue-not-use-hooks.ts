import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { ErrorMessages } from "../util/errorMessages";
import { isComponent, isHookFunction, isNueComponent } from "../util/validate";

export const ErrorMessage = ErrorMessages["nue-not-use-hooks"];

export interface Option {
  message: string;
}

export const NueNotUseHooks: Rule.RuleModule = {
  create: (context) => {
    if (!isNueComponent(context.getFilename())) return {};

    const option: Option = {
      message: ErrorMessage,
      ...context.options[0],
    };

    let currentComponent: Node | null = null;

    return {
      VariableDeclarator: (node: Node) => {
        if (
          node.type === "VariableDeclarator" &&
          node.init?.type === "ArrowFunctionExpression"
        ) {
          currentComponent = isComponent(node.init.body) ? node : null;
        }
      },

      "VariableDeclarator:exit": () => {
        currentComponent = null;
      },

      CallExpression: (node: Node) => {
        if (node.type === "CallExpression" && isHookFunction(node)) {
          if (currentComponent) {
            context.report({
              node,
              message: option.message,
            });
          }
        }
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type === "FunctionDeclaration") {
          currentComponent = isComponent(node.body) ? node : null;
        }
      },

      "FunctionDeclaration:exit": () => {
        currentComponent = null;
      },
    };
  },
};
