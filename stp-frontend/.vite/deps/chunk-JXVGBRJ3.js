import {
  DefaultPropsProvider_default,
  init_DefaultPropsProvider,
  useDefaultProps
} from "./chunk-VUNM75LU.js";
import {
  _extends,
  init_extends
} from "./chunk-GFY2XVYF.js";
import {
  require_jsx_runtime
} from "./chunk-43ZI66F5.js";
import {
  require_prop_types
} from "./chunk-KMVGN64O.js";
import {
  require_react
} from "./chunk-2RGQL2JM.js";
import {
  __esm,
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/@mui/material/Stepper/StepperContext.js
function useStepperContext() {
  return React.useContext(StepperContext);
}
var React, StepperContext, StepperContext_default;
var init_StepperContext = __esm({
  "node_modules/@mui/material/Stepper/StepperContext.js"() {
    React = __toESM(require_react());
    StepperContext = React.createContext({});
    if (true) {
      StepperContext.displayName = "StepperContext";
    }
    StepperContext_default = StepperContext;
  }
});

// node_modules/@mui/material/Step/StepContext.js
function useStepContext() {
  return React2.useContext(StepContext);
}
var React2, StepContext, StepContext_default;
var init_StepContext = __esm({
  "node_modules/@mui/material/Step/StepContext.js"() {
    React2 = __toESM(require_react());
    StepContext = React2.createContext({});
    if (true) {
      StepContext.displayName = "StepContext";
    }
    StepContext_default = StepContext;
  }
});

// node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js
function DefaultPropsProvider(props) {
  return (0, import_jsx_runtime.jsx)(DefaultPropsProvider_default, _extends({}, props));
}
function useDefaultProps2(params) {
  return useDefaultProps(params);
}
var React3, import_prop_types, import_jsx_runtime;
var init_DefaultPropsProvider2 = __esm({
  "node_modules/@mui/material/DefaultPropsProvider/DefaultPropsProvider.js"() {
    "use client";
    init_extends();
    React3 = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_DefaultPropsProvider();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    true ? DefaultPropsProvider.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types.default.node,
      /**
       * @ignore
       */
      value: import_prop_types.default.object.isRequired
    } : void 0;
  }
});

// node_modules/@mui/material/DefaultPropsProvider/index.js
var init_DefaultPropsProvider3 = __esm({
  "node_modules/@mui/material/DefaultPropsProvider/index.js"() {
    init_DefaultPropsProvider2();
  }
});

export {
  useDefaultProps2 as useDefaultProps,
  init_DefaultPropsProvider3 as init_DefaultPropsProvider,
  useStepperContext,
  StepperContext_default,
  init_StepperContext,
  useStepContext,
  StepContext_default,
  init_StepContext
};
//# sourceMappingURL=chunk-JXVGBRJ3.js.map
