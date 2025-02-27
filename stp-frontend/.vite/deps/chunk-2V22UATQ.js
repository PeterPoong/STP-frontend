import {
  capitalize_default,
  init_capitalize
} from "./chunk-KDNVPDES.js";
import {
  StepContext_default,
  StepperContext_default,
  init_StepContext,
  init_StepperContext
} from "./chunk-4UXHDA7S.js";
import {
  init_DefaultPropsProvider,
  useDefaultProps
} from "./chunk-5O7C7Y52.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_styled,
  styled_default
} from "./chunk-VMMLLZ7M.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose
} from "./chunk-GFY2XVYF.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-CQOQLQ5M.js";
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

// node_modules/@mui/material/StepConnector/stepConnectorClasses.js
function getStepConnectorUtilityClass(slot) {
  return generateUtilityClass("MuiStepConnector", slot);
}
var stepConnectorClasses, stepConnectorClasses_default;
var init_stepConnectorClasses = __esm({
  "node_modules/@mui/material/StepConnector/stepConnectorClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    stepConnectorClasses = generateUtilityClasses("MuiStepConnector", ["root", "horizontal", "vertical", "alternativeLabel", "active", "completed", "disabled", "line", "lineHorizontal", "lineVertical"]);
    stepConnectorClasses_default = stepConnectorClasses;
  }
});

// node_modules/@mui/material/StepConnector/StepConnector.js
var React, import_prop_types, import_jsx_runtime, _excluded, useUtilityClasses, StepConnectorRoot, StepConnectorLine, StepConnector, StepConnector_default;
var init_StepConnector = __esm({
  "node_modules/@mui/material/StepConnector/StepConnector.js"() {
    "use client";
    init_objectWithoutPropertiesLoose();
    init_extends();
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_clsx();
    init_composeClasses();
    init_capitalize();
    init_styled();
    init_DefaultPropsProvider();
    init_StepperContext();
    init_StepContext();
    init_stepConnectorClasses();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    _excluded = ["className"];
    useUtilityClasses = (ownerState) => {
      const {
        classes,
        orientation,
        alternativeLabel,
        active,
        completed,
        disabled
      } = ownerState;
      const slots = {
        root: ["root", orientation, alternativeLabel && "alternativeLabel", active && "active", completed && "completed", disabled && "disabled"],
        line: ["line", `line${capitalize_default(orientation)}`]
      };
      return composeClasses(slots, getStepConnectorUtilityClass, classes);
    };
    StepConnectorRoot = styled_default("div", {
      name: "MuiStepConnector",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel, ownerState.completed && styles.completed];
      }
    })(({
      ownerState
    }) => _extends({
      flex: "1 1 auto"
    }, ownerState.orientation === "vertical" && {
      marginLeft: 12
      // half icon
    }, ownerState.alternativeLabel && {
      position: "absolute",
      top: 8 + 4,
      left: "calc(-50% + 20px)",
      right: "calc(50% + 20px)"
    }));
    StepConnectorLine = styled_default("span", {
      name: "MuiStepConnector",
      slot: "Line",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.line, styles[`line${capitalize_default(ownerState.orientation)}`]];
      }
    })(({
      ownerState,
      theme
    }) => {
      const borderColor = theme.palette.mode === "light" ? theme.palette.grey[400] : theme.palette.grey[600];
      return _extends({
        display: "block",
        borderColor: theme.vars ? theme.vars.palette.StepConnector.border : borderColor
      }, ownerState.orientation === "horizontal" && {
        borderTopStyle: "solid",
        borderTopWidth: 1
      }, ownerState.orientation === "vertical" && {
        borderLeftStyle: "solid",
        borderLeftWidth: 1,
        minHeight: 24
      });
    });
    StepConnector = React.forwardRef(function StepConnector2(inProps, ref) {
      const props = useDefaultProps({
        props: inProps,
        name: "MuiStepConnector"
      });
      const {
        className
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
      const {
        alternativeLabel,
        orientation = "horizontal"
      } = React.useContext(StepperContext_default);
      const {
        active,
        disabled,
        completed
      } = React.useContext(StepContext_default);
      const ownerState = _extends({}, props, {
        alternativeLabel,
        orientation,
        active,
        completed,
        disabled
      });
      const classes = useUtilityClasses(ownerState);
      return (0, import_jsx_runtime.jsx)(StepConnectorRoot, _extends({
        className: clsx_default(classes.root, className),
        ref,
        ownerState
      }, other, {
        children: (0, import_jsx_runtime.jsx)(StepConnectorLine, {
          className: classes.line,
          ownerState
        })
      }));
    });
    true ? StepConnector.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types.default.object,
      /**
       * @ignore
       */
      className: import_prop_types.default.string,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
    } : void 0;
    StepConnector_default = StepConnector;
  }
});

// node_modules/@mui/material/StepConnector/index.js
var init_StepConnector2 = __esm({
  "node_modules/@mui/material/StepConnector/index.js"() {
    init_StepConnector();
    init_stepConnectorClasses();
    init_stepConnectorClasses();
  }
});

export {
  getStepConnectorUtilityClass,
  stepConnectorClasses_default,
  StepConnector_default,
  init_StepConnector2 as init_StepConnector
};
//# sourceMappingURL=chunk-2V22UATQ.js.map
