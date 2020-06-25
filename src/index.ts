import { NueElementSize } from "./rules/nue-element-size";
import { NueNotUseHooks } from "./rules/nue-not-use-hooks";
import { OtemElementSize } from "./rules/otem-element-size";
import { OtemNotUseHooks } from "./rules/otem-not-use-hooks";
import { PafeConditions } from "./rules/pafe-conditions";
import { PageMustHaveMainTag } from "./rules/page-must-have-main-tag";

export = {
  rules: {
    "nue-element-size": NueElementSize,
    "nue-not-use-hooks": NueNotUseHooks,
    "otem-element-size": OtemElementSize,
    "otem-not-use-hooks": OtemNotUseHooks,
    "pafe-conditions": PafeConditions,
    "page-must-have-main-tag": PageMustHaveMainTag,
  },

  configs: {
    recommended: {
      plugins: ["scd"],

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },

      rules: {
        "scd/nue-element-size": "error",
        "scd/nue-not-use-hooks": "error",
        "scd/otem-element-size": "error",
        "scd/otem-not-use-hooks": "error",
        "scd/pafe-conditions": "error",
        "scd/page-must-have-main-tag": "error",
      },
    },
  },
};
