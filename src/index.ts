import { NueElementSize } from "./rules/nue-element-size";
import { NueNotUseHooks } from "./rules/nue-not-use-hooks";
import { OtemElementSize } from "./rules/otem-element-size";

export = {
  rules: {
    "nue-element-size": NueElementSize,
    "nue-not-use-hooks": NueNotUseHooks,
    "otem-element-size": OtemElementSize,
  },
};
