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

    let componentNodes: Array<Node> = [];

    return {
      VariableDeclarator: (node: Node) => {
        if (
          node.type === "VariableDeclarator" &&
          node.init?.type === "ArrowFunctionExpression" &&
          isComponent(node.init.body)
        ) {
          componentNodes.push(node);
        }
      },

      "VariableDeclarator:exit": (node: Node) => {
        componentNodes = componentNodes.filter((n) => n !== node);
      },

      CallExpression: (node: Node) => {
        if (node.type === "CallExpression" && isHookFunction(node)) {
          const current = componentNodes.slice(-1)[0];

          if (current) {
            context.report({
              node,
              message: option.message,
            });
          }
        }
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type === "FunctionDeclaration" && isComponent(node.body)) {
          componentNodes.push(node);
        }
      },

      "FunctionDeclaration:exit": (node: Node) => {
        componentNodes = componentNodes.filter((n) => n !== node);
      },
    };
  },
};
