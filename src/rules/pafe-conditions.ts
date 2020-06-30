import { Rule } from "eslint";
import { Node, VariableDeclarator, FunctionDeclaration } from "estree-jsx";
import { ErrorMessages } from "../util/errorMessages";
import { isPafeComponent, isComponent, isHookFunction } from "../util/validate";
import { ComponentElementSizeCounter } from "../util/ComponentElementSizeCounter";

export const ErrorMessage = ErrorMessages["pafe-conditions"];

export interface Option {
  max: number;
  min: number;
  message: string;
  ignoreFragmentTag: boolean;
}

export const PafeConditions: Rule.RuleModule = {
  create: (context) => {
    if (!isPafeComponent(context.getFilename())) return {};

    const option: Option = {
      max: Infinity,
      min: 10,
      message: ErrorMessage,
      ignoreFragmentTag: true,
      ...context.options[0],
    };

    let state: Array<{
      node: Node;
      hasHooks: boolean;
      component: boolean;
    }> = [];
    const counter = new ComponentElementSizeCounter({
      ...option,
      report: (descriptor) => {
        state = state.filter(({ node, hasHooks, component }) => {
          if (!component) return false;

          if (node === descriptor.node && !hasHooks) {
            context.report(descriptor);

            return false;
          }

          return true;
        });
      },
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
        if (node.type !== "VariableDeclarator") return;
        if (node.init?.type !== "ArrowFunctionExpression") return;

        counter.start(node);
        state.push({
          node,
          hasHooks: false,
          component: isComponent(node.init.body),
        });
      },

      "VariableDeclarator:exit": (node: Node) => {
        counter.close(node as VariableDeclarator);
      },

      FunctionDeclaration: (node: Node) => {
        if (node.type !== "FunctionDeclaration") return;

        counter.start(node);
        state.push({
          node,
          hasHooks: false,
          component: isComponent(node.body),
        });
      },

      "FunctionDeclaration:exit": (node: Node) => {
        counter.close(node as FunctionDeclaration);
      },

      CallExpression: (node: Node) => {
        const item = state.slice(-1)[0];

        if (!item || item.hasHooks) return;

        item.hasHooks = node.type === "CallExpression" && isHookFunction(node);
      },
    };
  },
};
