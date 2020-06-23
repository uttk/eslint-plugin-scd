export const createComponentDefinitionCode = (
  elements: string,
  setFields: () => string,
  isArrow?: boolean
) => {
  return isArrow
    ? `const Component = () => {
      ${setFields()}
      return (${elements})
    }`
    : `function Component() { 
      ${setFields()}
      return (${elements}) 
    }`;
};

export const createComponentCode = (options: {
  size: number;
  arrow?: boolean;
  tagName?: ElementTagNameMap;
  parentTagName?: keyof ElementTagNameMap | "fragment";
  setFields?: () => string;
  setReturnValue?: (element: string) => string;
}): string => {
  let {
    size,
    arrow,
    setFields = () => "",
    setReturnValue = (v: string) => v,
    tagName = "div",
    parentTagName = "div",
  } = options;

  if (--size < 0) {
    return createComponentDefinitionCode(
      setReturnValue("void 0"),
      setFields,
      arrow
    );
  }

  const elements = new Array(size)
    .fill(0)
    .map(() => `<${tagName} />`)
    .join("");

  const tag = parentTagName === "fragment" ? "" : parentTagName;

  return createComponentDefinitionCode(
    setReturnValue(`<${tag}>${elements}</${tag}>`),
    setFields,
    arrow
  );
};
