export const createComponentDefinitionCode = (
  elements: string,
  isArrow?: boolean
) => {
  return isArrow
    ? `const Component = () => (${elements})`
    : `function Component() { return (${elements}) }`;
};

export const createComponentCode = (options: {
  size: number;
  arrow?: boolean;
  tagName?: ElementTagNameMap;
  parentTagName?: keyof ElementTagNameMap | "fragment";
}): string => {
  let { size, arrow, tagName = "div", parentTagName = "div" } = options;

  if (--size < 0) return createComponentDefinitionCode("void 0", arrow);

  const elements = new Array(size)
    .fill(0)
    .map(() => `<${tagName} />`)
    .join("");

  const tag = parentTagName === "fragment" ? "" : parentTagName;

  return createComponentDefinitionCode(`<${tag}>${elements}</${tag}>`, arrow);
};
