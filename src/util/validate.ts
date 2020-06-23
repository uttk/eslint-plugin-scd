import { BlockStatement, CallExpression } from "estree-jsx";

export const isNueComponent = (filePath: string) => {
  return !!filePath.split("/").find((v: string) => v === "nues" || v === "nue");
};

export const isHookFunction = (callExpression: CallExpression) => {
  const { callee } = callExpression;

  if (callee.type === "Identifier" && callee.name.match(/^use.+/)) {
    return true;
  }
};

export const isUsingHooks = (node: BlockStatement): boolean => {
  const { body } = node;

  for (const childNode of body) {
    if (
      childNode.type === "ExpressionStatement" &&
      childNode.expression.type === "CallExpression"
    ) {
      if (isHookFunction(childNode.expression)) {
        return true;
      }
    }

    if (childNode.type === "VariableDeclaration") {
      for (const dec of childNode.declarations) {
        if (dec.init?.type === "CallExpression" && isHookFunction(dec.init)) {
          return true;
        }
      }
    }
  }

  return false;
};

export const isComponent = (node: BlockStatement): boolean => {
  const { body } = node;

  for (const childNode of body) {
    if (childNode.type === "ReturnStatement") {
      const { argument } = childNode;

      if (!argument) continue;

      if (argument.type.match("JSX")) {
        return true;
      } else if (argument.type === "ConditionalExpression") {
        if (
          argument.consequent.type.match("JSX") ||
          argument.alternate.type.match("JSX")
        ) {
          return true;
        }
      }
    }
  }

  return false;
};
