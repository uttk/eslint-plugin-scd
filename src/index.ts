import { NueElementSize } from "./rules/nue-element-size";
import { NueNotUseHooks } from "./rules/nue-not-use-hooks";
import { OtemElementSize } from "./rules/otem-element-size";
import { OtemNotUseHooks } from "./rules/otem-not-use-hooks";
import { PafeConditions } from "./rules/pafe-conditions";

export = {
  rules: {
    "nue-element-size": NueElementSize,
    "nue-not-use-hooks": NueNotUseHooks,
    "otem-element-size": OtemElementSize,
    "otem-not-use-hooks": OtemNotUseHooks,
    "pafe-conditions": PafeConditions,
  },
};
