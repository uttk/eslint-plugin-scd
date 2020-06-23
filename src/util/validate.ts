import { BlockStatement } from "estree-jsx";

/**
 * @description Verify that the file describes Nue Component
 * @param {string} filePath a source file path to check
 */
export const isNueComponent = (filePath: string) => {
  return !!filePath.split("/").find((v: string) => v === "nues" || v === "nue");
};

/**
 * @description Verify that Hook is used
 * @param {BlockStatement} node a BlockStatement Node
 */
export const isUsingHooks = (node: BlockStatement): boolean => {
  const { body } = node;

  for (const childNode of body) {
    if (
      childNode.type === "ExpressionStatement" &&
      childNode.expression.type === "CallExpression"
    ) {
      const { callee } = childNode.expression;

      if (callee.type === "Identifier" && callee.name.match(/^use.+/)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * @description Verify it is a Component
 * @param {BlockStatement} node a BlockStatement Node
 */
export const isComponent = (node: BlockStatement): boolean => {
  const { body } = node;

  for (const childNode of body) {
    if (
      childNode.type === "ReturnStatement" &&
      childNode.argument?.type.match("JSX")
    ) {
      return true;
    }
  }

  return false;
};
