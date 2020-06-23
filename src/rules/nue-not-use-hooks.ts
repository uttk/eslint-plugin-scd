import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { ErrorMessages } from "../util/errorMessages";
import { isNueComponent, isUsingHooks, isComponent } from "../util/validate";

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

    return {
      VariableDeclarator: (node: Node) => {
        if (
          node.type === "VariableDeclarator" &&
          node.init?.type === "ArrowFunctionExpression" &&
          node.init.body.type === "BlockStatement"
        ) {
          if (isUsingHooks(node.init.body) && isComponent(node.init.body)) {
            context.report({
              node,
              message: option.message,
            });
          }
        }
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type === "FunctionDeclaration") {
          if (isUsingHooks(node.body) && isComponent(node.body)) {
            context.report({
              node,
              message: option.message,
            });
          }
        }
      },
    };
  },
};
