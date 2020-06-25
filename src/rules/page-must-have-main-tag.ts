import { Rule } from "eslint";
import { Node } from "estree-jsx";
import { Node as ESNode } from "estree";
import { ErrorMessages } from "../util/errorMessages";
import { isPageComponent, isComponent } from "../util/validate";

export const ErrorMessage = ErrorMessages["page-must-have-main-taga"];

export interface Option {
  message: string;
}

export const PageMustHaveMainTag: Rule.RuleModule = {
  create(context) {
    if (!isPageComponent(context.getFilename())) return {};

    const option: Option = {
      message: ErrorMessage,
      ...context.options[0],
    };

    let state: Array<{ componentNode: ESNode; hasMainTag: boolean }> = [];

    const report = (node: Node) => {
      state = state.filter(({ componentNode, hasMainTag }) => {
        if (componentNode === node) {
          if (!hasMainTag) {
            context.report({
              node,
              message: option.message,
            });
          }

          return false;
        }

        return true;
      });
    };

    return {
      JSXOpeningElement: (node: Node) => {
        if (
          node.type === "JSXOpeningElement" &&
          node.name.type === "JSXIdentifier" &&
          node.name.name === "main"
        ) {
          const item = state.slice(-1)[0];

          if (item) {
            item.hasMainTag = true;
          }
        }
      },

      VariableDeclarator: (node: Node) => {
        if (
          node.type === "VariableDeclarator" &&
          node.init?.type === "ArrowFunctionExpression" &&
          isComponent(node.init.body)
        ) {
          state.push({ componentNode: node, hasMainTag: false });
        }
      },

      "VariableDeclarator:exit": (node: Node) => {
        report(node);
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type === "FunctionDeclaration" && isComponent(node.body)) {
          state.push({ componentNode: node, hasMainTag: false });
        }
      },

      "FunctionDeclaration:exit": (node: Node) => {
        report(node);
      },
    };
  },
};
