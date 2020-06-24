interface DefinitionCodeOption {
  elements: string;
  setFields: () => string;
  setBlock: (block: string, fields: string, elements: string) => string;
}

export const createComponentDefinitionCode = ({
  elements,
  setBlock,
  setFields,
}: DefinitionCodeOption) => {
  const fields = setFields();
  const block = setBlock(
    `{ ${fields} return (${elements}) }`,
    fields,
    elements
  );

  return `function Component()${block}`;
};

const createArrowComponentDefinitionCode = ({
  elements,
  setBlock,
  setFields,
}: DefinitionCodeOption) => {
  const fields = setFields();
  const block = setBlock(
    `{ ${fields} return (${elements}) }`,
    fields,
    elements
  );

  return `const Component = () => ${block}`;
};

type ComponentCodeOption = {
  arrow?: boolean;
  tagName?: keyof ElementTagNameMap | "fragment";
  parentTagName?: keyof ElementTagNameMap | "fragment";
  setBlock?: DefinitionCodeOption["setBlock"];
  setFields?: DefinitionCodeOption["setFields"];
  setReturnValue?: (element: string) => string;
} & {
  size: number;
};

export const createComponentCode = (options: ComponentCodeOption): string => {
  let {
    size,
    arrow,
    tagName = "div",
    parentTagName = "div",
    setFields = () => "",
    setReturnValue = (v: string) => v,
    setBlock = (v) => v,
  } = options;

  let create = arrow
    ? createArrowComponentDefinitionCode
    : createComponentDefinitionCode;

  if (--size < 0) {
    return create({
      elements: setReturnValue("void 0"),
      setBlock,
      setFields,
    });
  }

  const elements = new Array(size)
    .fill(0)
    .map(() => `<${tagName} />`)
    .join("");

  const tag = parentTagName === "fragment" ? "" : parentTagName;
  const ele = `<${tag}>${elements}</${tag}>`;

  return create({ elements: setReturnValue(ele), setBlock, setFields });
};
