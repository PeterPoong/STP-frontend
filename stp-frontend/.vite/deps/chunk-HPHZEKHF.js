import {
  StepConnector_default,
  init_StepConnector
} from "./chunk-2V22UATQ.js";
import {
  StepperContext_default,
  init_StepperContext
} from "./chunk-4UXHDA7S.js";
import {
  init_DefaultPropsProvider,
  useDefaultProps
} from "./chunk-5O7C7Y52.js";
import {
  init_integerPropType,
  integerPropType_default
} from "./chunk-UGTSZ3WA.js";
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

// node_modules/@mui/material/Stepper/stepperClasses.js
function getStepperUtilityClass(slot) {
  return generateUtilityClass("MuiStepper", slot);
}
var stepperClasses, stepperClasses_default;
var init_stepperClasses = __esm({
  "node_modules/@mui/material/Stepper/stepperClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    stepperClasses = generateUtilityClasses("MuiStepper", ["root", "horizontal", "vertical", "nonLinear", "alternativeLabel"]);
    stepperClasses_default = stepperClasses;
  }
});

// node_modules/@mui/material/Stepper/Stepper.js
var React, import_prop_types, import_jsx_runtime, _excluded, useUtilityClasses, StepperRoot, defaultConnector, Stepper, Stepper_default;
var init_Stepper = __esm({
  "node_modules/@mui/material/Stepper/Stepper.js"() {
    "use client";
    init_objectWithoutPropertiesLoose();
    init_extends();
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_clsx();
    init_integerPropType();
    init_composeClasses();
    init_DefaultPropsProvider();
    init_styled();
    init_stepperClasses();
    init_StepConnector();
    init_StepperContext();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    _excluded = ["activeStep", "alternativeLabel", "children", "className", "component", "connector", "nonLinear", "orientation"];
    useUtilityClasses = (ownerState) => {
      const {
        orientation,
        nonLinear,
        alternativeLabel,
        classes
      } = ownerState;
      const slots = {
        root: ["root", orientation, nonLinear && "nonLinear", alternativeLabel && "alternativeLabel"]
      };
      return composeClasses(slots, getStepperUtilityClass, classes);
    };
    StepperRoot = styled_default("div", {
      name: "MuiStepper",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, styles[ownerState.orientation], ownerState.alternativeLabel && styles.alternativeLabel, ownerState.nonLinear && styles.nonLinear];
      }
    })(({
      ownerState
    }) => _extends({
      display: "flex"
    }, ownerState.orientation === "horizontal" && {
      flexDirection: "row",
      alignItems: "center"
    }, ownerState.orientation === "vertical" && {
      flexDirection: "column"
    }, ownerState.alternativeLabel && {
      alignItems: "flex-start"
    }));
    defaultConnector = (0, import_jsx_runtime.jsx)(StepConnector_default, {});
    Stepper = React.forwardRef(function Stepper2(inProps, ref) {
      const props = useDefaultProps({
        props: inProps,
        name: "MuiStepper"
      });
      const {
        activeStep = 0,
        alternativeLabel = false,
        children,
        className,
        component = "div",
        connector = defaultConnector,
        nonLinear = false,
        orientation = "horizontal"
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
      const ownerState = _extends({}, props, {
        nonLinear,
        alternativeLabel,
        orientation,
        component
      });
      const classes = useUtilityClasses(ownerState);
      const childrenArray = React.Children.toArray(children).filter(Boolean);
      const steps = childrenArray.map((step, index) => {
        return React.cloneElement(step, _extends({
          index,
          last: index + 1 === childrenArray.length
        }, step.props));
      });
      const contextValue = React.useMemo(() => ({
        activeStep,
        alternativeLabel,
        connector,
        nonLinear,
        orientation
      }), [activeStep, alternativeLabel, connector, nonLinear, orientation]);
      return (0, import_jsx_runtime.jsx)(StepperContext_default.Provider, {
        value: contextValue,
        children: (0, import_jsx_runtime.jsx)(StepperRoot, _extends({
          as: component,
          ownerState,
          className: clsx_default(classes.root, className),
          ref
        }, other, {
          children: steps
        }))
      });
    });
    true ? Stepper.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Set the active step (zero based index).
       * Set to -1 to disable all the steps.
       * @default 0
       */
      activeStep: integerPropType_default,
      /**
       * If set to 'true' and orientation is horizontal,
       * then the step label will be positioned under the icon.
       * @default false
       */
      alternativeLabel: import_prop_types.default.bool,
      /**
       * Two or more `<Step />` components.
       */
      children: import_prop_types.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types.default.object,
      /**
       * @ignore
       */
      className: import_prop_types.default.string,
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types.default.elementType,
      /**
       * An element to be placed between each step.
       * @default <StepConnector />
       */
      connector: import_prop_types.default.element,
      /**
       * If set the `Stepper` will not assist in controlling steps for linear flow.
       * @default false
       */
      nonLinear: import_prop_types.default.bool,
      /**
       * The component orientation (layout flow direction).
       * @default 'horizontal'
       */
      orientation: import_prop_types.default.oneOf(["horizontal", "vertical"]),
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
    } : void 0;
    Stepper_default = Stepper;
  }
});

// node_modules/@mui/material/Stepper/index.js
var init_Stepper2 = __esm({
  "node_modules/@mui/material/Stepper/index.js"() {
    init_Stepper();
    init_stepperClasses();
    init_stepperClasses();
    init_StepperContext();
    init_StepperContext();
  }
});

export {
  getStepperUtilityClass,
  stepperClasses_default,
  Stepper_default,
  init_Stepper2 as init_Stepper
};
//# sourceMappingURL=chunk-HPHZEKHF.js.map
