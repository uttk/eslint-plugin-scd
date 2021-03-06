import { Node, BlockStatement, CallExpression } from "estree-jsx";

export const isNueComponent = (filePath: string): boolean => {
  return !!filePath.split("/").find((v: string) => v === "nues" || v === "nue");
};

export const isOtemComponent = (filePath: string): boolean => {
  return !!filePath
    .split("/")
    .find((v: string) => v === "otems" || v === "otem");
};

export const isPafeComponent = (filePath: string): boolean => {
  return !!filePath
    .split("/")
    .find((v: string) => v === "pafes" || v === "pafe");
};

export const isPageComponent = (filePath: string): boolean => {
  return !!filePath
    .split("/")
    .find((v: string) => v === "pages" || v === "page");
};

export const isHookFunction = (callExpression: CallExpression): boolean => {
  const { callee } = callExpression;

  if (callee.type === "Identifier" && callee.name.match(/^use.+/)) {
    return true;
  }

  return false;
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

export const isComponent = (node: Node): boolean => {
  if (node.type.match(/^JSX/)) return true;

  switch (node.type) {
    case "BlockStatement":
      return SearchJSXFromBlock(node);

    default:
      return false;
  }
};

export const SearchJSXFromBlock = (block: BlockStatement): boolean => {
  const { body } = block;

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
