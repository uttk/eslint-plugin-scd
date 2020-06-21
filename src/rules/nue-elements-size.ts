import { Rule } from "eslint";

const isNueComponent = (filePath: string) => {
  return !!filePath.split("/").find((v: string) => v === "nues");
};

export const nueElementsSize: Rule.RuleModule = {
  create: (context) => {
    return {
      ArrowFunctionExpression(node) {
        if (isNueComponent(context.getFilename())) {
          context.report({
            node: node,
            message:
              "There are too many elements. Nue components must have 0 to 5 elements or less",
          });
        }
      },
    };
  },
};
