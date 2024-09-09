import {
  capitalize_default,
  init_capitalize
} from "./chunk-SPBITBTA.js";
import {
  StepContext_default,
  StepperContext_default,
  init_DefaultPropsProvider,
  init_StepContext,
  init_StepperContext,
  useDefaultProps
} from "./chunk-JXVGBRJ3.js";
import {
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_styled,
  styled_default
} from "./chunk-VUNM75LU.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-CQOQLQ5M.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose
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

// node_modules/@mui/material/SvgIcon/svgIconClasses.js
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses, svgIconClasses_default;
var init_svgIconClasses = __esm({
  "node_modules/@mui/material/SvgIcon/svgIconClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
    svgIconClasses_default = svgIconClasses;
  }
});

// node_modules/@mui/material/SvgIcon/SvgIcon.js
var React, import_prop_types, import_jsx_runtime, import_jsx_runtime2, _excluded, useUtilityClasses, SvgIconRoot, SvgIcon, SvgIcon_default;
var init_SvgIcon = __esm({
  "node_modules/@mui/material/SvgIcon/SvgIcon.js"() {
    "use client";
    init_extends();
    init_objectWithoutPropertiesLoose();
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_clsx();
    init_composeClasses();
    init_capitalize();
    init_DefaultPropsProvider();
    init_styled();
    init_svgIconClasses();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    _excluded = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"];
    useUtilityClasses = (ownerState) => {
      const {
        color,
        fontSize,
        classes
      } = ownerState;
      const slots = {
        root: ["root", color !== "inherit" && `color${capitalize_default(color)}`, `fontSize${capitalize_default(fontSize)}`]
      };
      return composeClasses(slots, getSvgIconUtilityClass, classes);
    };
    SvgIconRoot = styled_default("svg", {
      name: "MuiSvgIcon",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, ownerState.color !== "inherit" && styles[`color${capitalize_default(ownerState.color)}`], styles[`fontSize${capitalize_default(ownerState.fontSize)}`]];
      }
    })(({
      theme,
      ownerState
    }) => {
      var _theme$transitions, _theme$transitions$cr, _theme$transitions2, _theme$typography, _theme$typography$pxT, _theme$typography2, _theme$typography2$px, _theme$typography3, _theme$typography3$px, _palette$ownerState$c, _palette, _palette2, _palette3;
      return {
        userSelect: "none",
        width: "1em",
        height: "1em",
        display: "inline-block",
        // the <svg> will define the property that has `currentColor`
        // for example heroicons uses fill="none" and stroke="currentColor"
        fill: ownerState.hasSvgAsChild ? void 0 : "currentColor",
        flexShrink: 0,
        transition: (_theme$transitions = theme.transitions) == null || (_theme$transitions$cr = _theme$transitions.create) == null ? void 0 : _theme$transitions$cr.call(_theme$transitions, "fill", {
          duration: (_theme$transitions2 = theme.transitions) == null || (_theme$transitions2 = _theme$transitions2.duration) == null ? void 0 : _theme$transitions2.shorter
        }),
        fontSize: {
          inherit: "inherit",
          small: ((_theme$typography = theme.typography) == null || (_theme$typography$pxT = _theme$typography.pxToRem) == null ? void 0 : _theme$typography$pxT.call(_theme$typography, 20)) || "1.25rem",
          medium: ((_theme$typography2 = theme.typography) == null || (_theme$typography2$px = _theme$typography2.pxToRem) == null ? void 0 : _theme$typography2$px.call(_theme$typography2, 24)) || "1.5rem",
          large: ((_theme$typography3 = theme.typography) == null || (_theme$typography3$px = _theme$typography3.pxToRem) == null ? void 0 : _theme$typography3$px.call(_theme$typography3, 35)) || "2.1875rem"
        }[ownerState.fontSize],
        // TODO v5 deprecate, v6 remove for sx
        color: (_palette$ownerState$c = (_palette = (theme.vars || theme).palette) == null || (_palette = _palette[ownerState.color]) == null ? void 0 : _palette.main) != null ? _palette$ownerState$c : {
          action: (_palette2 = (theme.vars || theme).palette) == null || (_palette2 = _palette2.action) == null ? void 0 : _palette2.active,
          disabled: (_palette3 = (theme.vars || theme).palette) == null || (_palette3 = _palette3.action) == null ? void 0 : _palette3.disabled,
          inherit: void 0
        }[ownerState.color]
      };
    });
    SvgIcon = React.forwardRef(function SvgIcon2(inProps, ref) {
      const props = useDefaultProps({
        props: inProps,
        name: "MuiSvgIcon"
      });
      const {
        children,
        className,
        color = "inherit",
        component = "svg",
        fontSize = "medium",
        htmlColor,
        inheritViewBox = false,
        titleAccess,
        viewBox = "0 0 24 24"
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded);
      const hasSvgAsChild = React.isValidElement(children) && children.type === "svg";
      const ownerState = _extends({}, props, {
        color,
        component,
        fontSize,
        instanceFontSize: inProps.fontSize,
        inheritViewBox,
        viewBox,
        hasSvgAsChild
      });
      const more = {};
      if (!inheritViewBox) {
        more.viewBox = viewBox;
      }
      const classes = useUtilityClasses(ownerState);
      return (0, import_jsx_runtime2.jsxs)(SvgIconRoot, _extends({
        as: component,
        className: clsx_default(classes.root, className),
        focusable: "false",
        color: htmlColor,
        "aria-hidden": titleAccess ? void 0 : true,
        role: titleAccess ? "img" : void 0,
        ref
      }, more, other, hasSvgAsChild && children.props, {
        ownerState,
        children: [hasSvgAsChild ? children.props.children : children, titleAccess ? (0, import_jsx_runtime.jsx)("title", {
          children: titleAccess
        }) : null]
      }));
    });
    true ? SvgIcon.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Node passed into the SVG element.
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
       * The color of the component.
       * It supports both default and custom theme colors, which can be added as shown in the
       * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
       * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
       * @default 'inherit'
       */
      color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), import_prop_types.default.string]),
      /**
       * The component used for the root node.
       * Either a string to use a HTML element or a component.
       */
      component: import_prop_types.default.elementType,
      /**
       * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
       * @default 'medium'
       */
      fontSize: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["inherit", "large", "medium", "small"]), import_prop_types.default.string]),
      /**
       * Applies a color attribute to the SVG element.
       */
      htmlColor: import_prop_types.default.string,
      /**
       * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
       * prop will be ignored.
       * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
       * `component`'s viewBox to the root node.
       * @default false
       */
      inheritViewBox: import_prop_types.default.bool,
      /**
       * The shape-rendering attribute. The behavior of the different options is described on the
       * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
       * If you are having issues with blurry icons you should investigate this prop.
       */
      shapeRendering: import_prop_types.default.string,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
      /**
       * Provides a human-readable title for the element that contains it.
       * https://www.w3.org/TR/SVG-access/#Equivalent
       */
      titleAccess: import_prop_types.default.string,
      /**
       * Allows you to redefine what the coordinates without units mean inside an SVG element.
       * For example, if the SVG element is 500 (width) by 200 (height),
       * and you pass viewBox="0 0 50 20",
       * this means that the coordinates inside the SVG will go from the top left corner (0,0)
       * to bottom right (50,20) and each unit will be worth 10px.
       * @default '0 0 24 24'
       */
      viewBox: import_prop_types.default.string
    } : void 0;
    SvgIcon.muiName = "SvgIcon";
    SvgIcon_default = SvgIcon;
  }
});

// node_modules/@mui/material/SvgIcon/index.js
var init_SvgIcon2 = __esm({
  "node_modules/@mui/material/SvgIcon/index.js"() {
    "use client";
    init_SvgIcon();
    init_svgIconClasses();
    init_svgIconClasses();
  }
});

// node_modules/@mui/material/utils/createSvgIcon.js
function createSvgIcon(path, displayName) {
  function Component(props, ref) {
    return (0, import_jsx_runtime3.jsx)(SvgIcon_default, _extends({
      "data-testid": `${displayName}Icon`,
      ref
    }, props, {
      children: path
    }));
  }
  if (true) {
    Component.displayName = `${displayName}Icon`;
  }
  Component.muiName = SvgIcon_default.muiName;
  return React2.memo(React2.forwardRef(Component));
}
var React2, import_jsx_runtime3;
var init_createSvgIcon = __esm({
  "node_modules/@mui/material/utils/createSvgIcon.js"() {
    "use client";
    init_extends();
    React2 = __toESM(require_react());
    init_SvgIcon2();
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
  }
});

// node_modules/@mui/material/internal/svg-icons/CheckCircle.js
var React3, import_jsx_runtime4, CheckCircle_default;
var init_CheckCircle = __esm({
  "node_modules/@mui/material/internal/svg-icons/CheckCircle.js"() {
    "use client";
    React3 = __toESM(require_react());
    init_createSvgIcon();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
    CheckCircle_default = createSvgIcon((0, import_jsx_runtime4.jsx)("path", {
      d: "M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"
    }), "CheckCircle");
  }
});

// node_modules/@mui/material/internal/svg-icons/Warning.js
var React4, import_jsx_runtime5, Warning_default;
var init_Warning = __esm({
  "node_modules/@mui/material/internal/svg-icons/Warning.js"() {
    "use client";
    React4 = __toESM(require_react());
    init_createSvgIcon();
    import_jsx_runtime5 = __toESM(require_jsx_runtime());
    Warning_default = createSvgIcon((0, import_jsx_runtime5.jsx)("path", {
      d: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
    }), "Warning");
  }
});

// node_modules/@mui/material/StepIcon/stepIconClasses.js
function getStepIconUtilityClass(slot) {
  return generateUtilityClass("MuiStepIcon", slot);
}
var stepIconClasses, stepIconClasses_default;
var init_stepIconClasses = __esm({
  "node_modules/@mui/material/StepIcon/stepIconClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    stepIconClasses = generateUtilityClasses("MuiStepIcon", ["root", "active", "completed", "error", "text"]);
    stepIconClasses_default = stepIconClasses;
  }
});

// node_modules/@mui/material/StepIcon/StepIcon.js
var React5, import_prop_types2, import_jsx_runtime6, import_jsx_runtime7, _circle, _excluded2, useUtilityClasses2, StepIconRoot, StepIconText, StepIcon, StepIcon_default;
var init_StepIcon = __esm({
  "node_modules/@mui/material/StepIcon/StepIcon.js"() {
    "use client";
    init_extends();
    init_objectWithoutPropertiesLoose();
    React5 = __toESM(require_react());
    import_prop_types2 = __toESM(require_prop_types());
    init_clsx();
    init_composeClasses();
    init_styled();
    init_DefaultPropsProvider();
    init_CheckCircle();
    init_Warning();
    init_SvgIcon2();
    init_stepIconClasses();
    import_jsx_runtime6 = __toESM(require_jsx_runtime());
    import_jsx_runtime7 = __toESM(require_jsx_runtime());
    _excluded2 = ["active", "className", "completed", "error", "icon"];
    useUtilityClasses2 = (ownerState) => {
      const {
        classes,
        active,
        completed,
        error
      } = ownerState;
      const slots = {
        root: ["root", active && "active", completed && "completed", error && "error"],
        text: ["text"]
      };
      return composeClasses(slots, getStepIconUtilityClass, classes);
    };
    StepIconRoot = styled_default(SvgIcon_default, {
      name: "MuiStepIcon",
      slot: "Root",
      overridesResolver: (props, styles) => styles.root
    })(({
      theme
    }) => ({
      display: "block",
      transition: theme.transitions.create("color", {
        duration: theme.transitions.duration.shortest
      }),
      color: (theme.vars || theme).palette.text.disabled,
      [`&.${stepIconClasses_default.completed}`]: {
        color: (theme.vars || theme).palette.primary.main
      },
      [`&.${stepIconClasses_default.active}`]: {
        color: (theme.vars || theme).palette.primary.main
      },
      [`&.${stepIconClasses_default.error}`]: {
        color: (theme.vars || theme).palette.error.main
      }
    }));
    StepIconText = styled_default("text", {
      name: "MuiStepIcon",
      slot: "Text",
      overridesResolver: (props, styles) => styles.text
    })(({
      theme
    }) => ({
      fill: (theme.vars || theme).palette.primary.contrastText,
      fontSize: theme.typography.caption.fontSize,
      fontFamily: theme.typography.fontFamily
    }));
    StepIcon = React5.forwardRef(function StepIcon2(inProps, ref) {
      const props = useDefaultProps({
        props: inProps,
        name: "MuiStepIcon"
      });
      const {
        active = false,
        className: classNameProp,
        completed = false,
        error = false,
        icon
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded2);
      const ownerState = _extends({}, props, {
        active,
        completed,
        error
      });
      const classes = useUtilityClasses2(ownerState);
      if (typeof icon === "number" || typeof icon === "string") {
        const className = clsx_default(classNameProp, classes.root);
        if (error) {
          return (0, import_jsx_runtime6.jsx)(StepIconRoot, _extends({
            as: Warning_default,
            className,
            ref,
            ownerState
          }, other));
        }
        if (completed) {
          return (0, import_jsx_runtime6.jsx)(StepIconRoot, _extends({
            as: CheckCircle_default,
            className,
            ref,
            ownerState
          }, other));
        }
        return (0, import_jsx_runtime7.jsxs)(StepIconRoot, _extends({
          className,
          ref,
          ownerState
        }, other, {
          children: [_circle || (_circle = (0, import_jsx_runtime6.jsx)("circle", {
            cx: "12",
            cy: "12",
            r: "12"
          })), (0, import_jsx_runtime6.jsx)(StepIconText, {
            className: classes.text,
            x: "12",
            y: "12",
            textAnchor: "middle",
            dominantBaseline: "central",
            ownerState,
            children: icon
          })]
        }));
      }
      return icon;
    });
    true ? StepIcon.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * Whether this step is active.
       * @default false
       */
      active: import_prop_types2.default.bool,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types2.default.object,
      /**
       * @ignore
       */
      className: import_prop_types2.default.string,
      /**
       * Mark the step as completed. Is passed to child components.
       * @default false
       */
      completed: import_prop_types2.default.bool,
      /**
       * If `true`, the step is marked as failed.
       * @default false
       */
      error: import_prop_types2.default.bool,
      /**
       * The label displayed in the step icon.
       */
      icon: import_prop_types2.default.node,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types2.default.oneOfType([import_prop_types2.default.arrayOf(import_prop_types2.default.oneOfType([import_prop_types2.default.func, import_prop_types2.default.object, import_prop_types2.default.bool])), import_prop_types2.default.func, import_prop_types2.default.object])
    } : void 0;
    StepIcon_default = StepIcon;
  }
});

// node_modules/@mui/material/StepIcon/index.js
var init_StepIcon2 = __esm({
  "node_modules/@mui/material/StepIcon/index.js"() {
    "use client";
    init_StepIcon();
    init_stepIconClasses();
    init_stepIconClasses();
  }
});

// node_modules/@mui/material/StepLabel/stepLabelClasses.js
function getStepLabelUtilityClass(slot) {
  return generateUtilityClass("MuiStepLabel", slot);
}
var stepLabelClasses, stepLabelClasses_default;
var init_stepLabelClasses = __esm({
  "node_modules/@mui/material/StepLabel/stepLabelClasses.js"() {
    init_generateUtilityClasses();
    init_generateUtilityClass();
    stepLabelClasses = generateUtilityClasses("MuiStepLabel", ["root", "horizontal", "vertical", "label", "active", "completed", "error", "disabled", "iconContainer", "alternativeLabel", "labelContainer"]);
    stepLabelClasses_default = stepLabelClasses;
  }
});

// node_modules/@mui/material/StepLabel/StepLabel.js
var React6, import_prop_types3, import_jsx_runtime8, import_jsx_runtime9, _excluded3, useUtilityClasses3, StepLabelRoot, StepLabelLabel, StepLabelIconContainer, StepLabelLabelContainer, StepLabel, StepLabel_default;
var init_StepLabel = __esm({
  "node_modules/@mui/material/StepLabel/StepLabel.js"() {
    "use client";
    init_objectWithoutPropertiesLoose();
    init_extends();
    React6 = __toESM(require_react());
    import_prop_types3 = __toESM(require_prop_types());
    init_clsx();
    init_composeClasses();
    init_styled();
    init_DefaultPropsProvider();
    init_StepIcon2();
    init_StepperContext();
    init_StepContext();
    init_stepLabelClasses();
    import_jsx_runtime8 = __toESM(require_jsx_runtime());
    import_jsx_runtime9 = __toESM(require_jsx_runtime());
    _excluded3 = ["children", "className", "componentsProps", "error", "icon", "optional", "slotProps", "StepIconComponent", "StepIconProps"];
    useUtilityClasses3 = (ownerState) => {
      const {
        classes,
        orientation,
        active,
        completed,
        error,
        disabled,
        alternativeLabel
      } = ownerState;
      const slots = {
        root: ["root", orientation, error && "error", disabled && "disabled", alternativeLabel && "alternativeLabel"],
        label: ["label", active && "active", completed && "completed", error && "error", disabled && "disabled", alternativeLabel && "alternativeLabel"],
        iconContainer: ["iconContainer", active && "active", completed && "completed", error && "error", disabled && "disabled", alternativeLabel && "alternativeLabel"],
        labelContainer: ["labelContainer", alternativeLabel && "alternativeLabel"]
      };
      return composeClasses(slots, getStepLabelUtilityClass, classes);
    };
    StepLabelRoot = styled_default("span", {
      name: "MuiStepLabel",
      slot: "Root",
      overridesResolver: (props, styles) => {
        const {
          ownerState
        } = props;
        return [styles.root, styles[ownerState.orientation]];
      }
    })(({
      ownerState
    }) => _extends({
      display: "flex",
      alignItems: "center",
      [`&.${stepLabelClasses_default.alternativeLabel}`]: {
        flexDirection: "column"
      },
      [`&.${stepLabelClasses_default.disabled}`]: {
        cursor: "default"
      }
    }, ownerState.orientation === "vertical" && {
      textAlign: "left",
      padding: "8px 0"
    }));
    StepLabelLabel = styled_default("span", {
      name: "MuiStepLabel",
      slot: "Label",
      overridesResolver: (props, styles) => styles.label
    })(({
      theme
    }) => _extends({}, theme.typography.body2, {
      display: "block",
      transition: theme.transitions.create("color", {
        duration: theme.transitions.duration.shortest
      }),
      [`&.${stepLabelClasses_default.active}`]: {
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500
      },
      [`&.${stepLabelClasses_default.completed}`]: {
        color: (theme.vars || theme).palette.text.primary,
        fontWeight: 500
      },
      [`&.${stepLabelClasses_default.alternativeLabel}`]: {
        marginTop: 16
      },
      [`&.${stepLabelClasses_default.error}`]: {
        color: (theme.vars || theme).palette.error.main
      }
    }));
    StepLabelIconContainer = styled_default("span", {
      name: "MuiStepLabel",
      slot: "IconContainer",
      overridesResolver: (props, styles) => styles.iconContainer
    })(() => ({
      flexShrink: 0,
      // Fix IE11 issue
      display: "flex",
      paddingRight: 8,
      [`&.${stepLabelClasses_default.alternativeLabel}`]: {
        paddingRight: 0
      }
    }));
    StepLabelLabelContainer = styled_default("span", {
      name: "MuiStepLabel",
      slot: "LabelContainer",
      overridesResolver: (props, styles) => styles.labelContainer
    })(({
      theme
    }) => ({
      width: "100%",
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${stepLabelClasses_default.alternativeLabel}`]: {
        textAlign: "center"
      }
    }));
    StepLabel = React6.forwardRef(function StepLabel2(inProps, ref) {
      var _slotProps$label;
      const props = useDefaultProps({
        props: inProps,
        name: "MuiStepLabel"
      });
      const {
        children,
        className,
        componentsProps = {},
        error = false,
        icon: iconProp,
        optional,
        slotProps = {},
        StepIconComponent: StepIconComponentProp,
        StepIconProps
      } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
      const {
        alternativeLabel,
        orientation
      } = React6.useContext(StepperContext_default);
      const {
        active,
        disabled,
        completed,
        icon: iconContext
      } = React6.useContext(StepContext_default);
      const icon = iconProp || iconContext;
      let StepIconComponent = StepIconComponentProp;
      if (icon && !StepIconComponent) {
        StepIconComponent = StepIcon_default;
      }
      const ownerState = _extends({}, props, {
        active,
        alternativeLabel,
        completed,
        disabled,
        error,
        orientation
      });
      const classes = useUtilityClasses3(ownerState);
      const labelSlotProps = (_slotProps$label = slotProps.label) != null ? _slotProps$label : componentsProps.label;
      return (0, import_jsx_runtime9.jsxs)(StepLabelRoot, _extends({
        className: clsx_default(classes.root, className),
        ref,
        ownerState
      }, other, {
        children: [icon || StepIconComponent ? (0, import_jsx_runtime8.jsx)(StepLabelIconContainer, {
          className: classes.iconContainer,
          ownerState,
          children: (0, import_jsx_runtime8.jsx)(StepIconComponent, _extends({
            completed,
            active,
            error,
            icon
          }, StepIconProps))
        }) : null, (0, import_jsx_runtime9.jsxs)(StepLabelLabelContainer, {
          className: classes.labelContainer,
          ownerState,
          children: [children ? (0, import_jsx_runtime8.jsx)(StepLabelLabel, _extends({
            ownerState
          }, labelSlotProps, {
            className: clsx_default(classes.label, labelSlotProps == null ? void 0 : labelSlotProps.className),
            children
          })) : null, optional]
        })]
      }));
    });
    true ? StepLabel.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * In most cases will simply be a string containing a title for the label.
       */
      children: import_prop_types3.default.node,
      /**
       * Override or extend the styles applied to the component.
       */
      classes: import_prop_types3.default.object,
      /**
       * @ignore
       */
      className: import_prop_types3.default.string,
      /**
       * The props used for each slot inside.
       * @default {}
       */
      componentsProps: import_prop_types3.default.shape({
        label: import_prop_types3.default.object
      }),
      /**
       * If `true`, the step is marked as failed.
       * @default false
       */
      error: import_prop_types3.default.bool,
      /**
       * Override the default label of the step icon.
       */
      icon: import_prop_types3.default.node,
      /**
       * The optional node to display.
       */
      optional: import_prop_types3.default.node,
      /**
       * The props used for each slot inside.
       * @default {}
       */
      slotProps: import_prop_types3.default.shape({
        label: import_prop_types3.default.object
      }),
      /**
       * The component to render in place of the [`StepIcon`](/material-ui/api/step-icon/).
       */
      StepIconComponent: import_prop_types3.default.elementType,
      /**
       * Props applied to the [`StepIcon`](/material-ui/api/step-icon/) element.
       */
      StepIconProps: import_prop_types3.default.object,
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx: import_prop_types3.default.oneOfType([import_prop_types3.default.arrayOf(import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object, import_prop_types3.default.bool])), import_prop_types3.default.func, import_prop_types3.default.object])
    } : void 0;
    StepLabel.muiName = "StepLabel";
    StepLabel_default = StepLabel;
  }
});

// node_modules/@mui/material/StepLabel/index.js
var init_StepLabel2 = __esm({
  "node_modules/@mui/material/StepLabel/index.js"() {
    init_StepLabel();
    init_stepLabelClasses();
    init_stepLabelClasses();
  }
});

export {
  getSvgIconUtilityClass,
  svgIconClasses_default,
  SvgIcon_default,
  init_SvgIcon2 as init_SvgIcon,
  createSvgIcon,
  init_createSvgIcon,
  getStepIconUtilityClass,
  stepIconClasses_default,
  StepIcon_default,
  init_StepIcon2 as init_StepIcon,
  getStepLabelUtilityClass,
  stepLabelClasses_default,
  StepLabel_default,
  init_StepLabel2 as init_StepLabel
};
//# sourceMappingURL=chunk-C6A7ZAHD.js.map
