import {
  CardHeaderContext_default,
  NavItem_default,
  Nav_default,
  Nav_default2
} from "./chunk-75JGLF7L.js";
import {
  AbstractModalHeader_default,
  CloseButton_default,
  Collapse_default,
  Fade_default,
  ModalContext_default,
  Modal_default,
  NavbarBrand_default,
  NavbarCollapse_default,
  NavbarOffcanvas_default,
  NavbarText_default,
  NavbarToggle_default,
  Navbar_default,
  NoopTransition_default,
  OffcanvasBody_default,
  OffcanvasHeader_default,
  OffcanvasTitle_default,
  OffcanvasToggling_default,
  Offcanvas_default,
  createChainedFunction_default,
  divWithClassName_default,
  getSharedManager,
  isEscKey,
  renderTransition,
  useWaitForDOMRef
} from "./chunk-L6JZTI53.js";
import {
  Container_default
} from "./chunk-SW5NY2UE.js";
import {
  ButtonGroup_default
} from "./chunk-3JCLF3TU.js";
import {
  NavDropdown_default
} from "./chunk-PXNMGZMN.js";
import {
  NavLink_default,
  TabContext_default,
  useNavItem
} from "./chunk-FS6WB5YY.js";
import {
  $b5e257d569688ac6$export$619500959fc48b26,
  $b5e257d569688ac6$export$9f8ac96af4b1b2ae,
  DropdownDivider_default,
  DropdownHeader_default,
  DropdownItemText_default,
  DropdownItem_default,
  DropdownMenu_default,
  DropdownToggle_default,
  Dropdown_default,
  InputGroupContext_default,
  alignPropType,
  getRefTarget,
  mergeOptionsWithPopperConfig,
  useClickOutside_default,
  usePopper_default,
  useUncontrolledProp as useUncontrolledProp2
} from "./chunk-SBUBINK7.js";
import "./chunk-IEYIYD2T.js";
import {
  Button_default
} from "./chunk-NNCWS4B3.js";
import {
  contains
} from "./chunk-EAXKUTIM.js";
import {
  SelectableContext_default,
  makeEventKey
} from "./chunk-IBU2J2BI.js";
import {
  CarouselCaption_default,
  CarouselItem_default,
  Carousel_default,
  forEach,
  hasChildOfType,
  map,
  useTimeout
} from "./chunk-KRHHC5GO.js";
import {
  safeFindDOMNode,
  transitionEnd,
  useWillUnmount
} from "./chunk-WPL7R3R7.js";
import {
  Anchor_default,
  useCallbackRef
} from "./chunk-L7QK2FJY.js";
import "./chunk-47HZ5FLN.js";
import {
  addEventListener_default,
  canUseDOM_default,
  listen_default,
  ownerDocument,
  removeEventListener_default
} from "./chunk-QJW2QC3G.js";
import {
  require_browser,
  useEventCallback,
  useIsomorphicEffect_default,
  useMergedRefs_default,
  useUncontrolled,
  useUncontrolledProp
} from "./chunk-SACBWDNG.js";
import {
  DEFAULT_BREAKPOINTS,
  DEFAULT_MIN_BREAKPOINT,
  ThemeProvider_default,
  require_classnames,
  useBootstrapBreakpoints,
  useBootstrapMinBreakpoint,
  useBootstrapPrefix,
  useIsRTL
} from "./chunk-V45P6XYM.js";
import {
  hasClass,
  init_hasClass
} from "./chunk-PONEVX6H.js";
import {
  ENTERING,
  EXITING,
  init_Transition
} from "./chunk-KTCTU4ET.js";
import "./chunk-RU56NBL2.js";
import "./chunk-QP43C3QV.js";
import "./chunk-YR7MIILV.js";
import "./chunk-GFY2XVYF.js";
import {
  require_warning
} from "./chunk-J5P6RILA.js";
import {
  require_jsx_runtime
} from "./chunk-43ZI66F5.js";
import {
  require_react_dom
} from "./chunk-ISY3SE76.js";
import {
  require_prop_types
} from "./chunk-KMVGN64O.js";
import {
  require_react
} from "./chunk-2RGQL2JM.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/react-bootstrap/esm/Accordion.js
var import_classnames6 = __toESM(require_classnames());
var React8 = __toESM(require_react());
var import_react5 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AccordionBody.js
var import_classnames2 = __toESM(require_classnames());
var React4 = __toESM(require_react());
var import_react2 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AccordionCollapse.js
var import_classnames = __toESM(require_classnames());
var React2 = __toESM(require_react());
var import_react = __toESM(require_react());

// node_modules/react-bootstrap/esm/AccordionContext.js
var React = __toESM(require_react());
function isAccordionItemSelected(activeEventKey, eventKey) {
  return Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : activeEventKey === eventKey;
}
var context = React.createContext({});
context.displayName = "AccordionContext";
var AccordionContext_default = context;

// node_modules/react-bootstrap/esm/AccordionCollapse.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var AccordionCollapse = React2.forwardRef(({
  as: Component2 = "div",
  bsPrefix,
  className,
  children,
  eventKey,
  ...props
}, ref) => {
  const {
    activeEventKey
  } = (0, import_react.useContext)(AccordionContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-collapse");
  return (0, import_jsx_runtime.jsx)(Collapse_default, {
    ref,
    in: isAccordionItemSelected(activeEventKey, eventKey),
    ...props,
    className: (0, import_classnames.default)(className, bsPrefix),
    children: (0, import_jsx_runtime.jsx)(Component2, {
      children: React2.Children.only(children)
    })
  });
});
AccordionCollapse.displayName = "AccordionCollapse";
var AccordionCollapse_default = AccordionCollapse;

// node_modules/react-bootstrap/esm/AccordionItemContext.js
var React3 = __toESM(require_react());
var context2 = React3.createContext({
  eventKey: ""
});
context2.displayName = "AccordionItemContext";
var AccordionItemContext_default = context2;

// node_modules/react-bootstrap/esm/AccordionBody.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var AccordionBody = React4.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  bsPrefix,
  className,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-body");
  const {
    eventKey
  } = (0, import_react2.useContext)(AccordionItemContext_default);
  return (0, import_jsx_runtime2.jsx)(AccordionCollapse_default, {
    eventKey,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children: (0, import_jsx_runtime2.jsx)(Component2, {
      ref,
      ...props,
      className: (0, import_classnames2.default)(className, bsPrefix)
    })
  });
});
AccordionBody.displayName = "AccordionBody";
var AccordionBody_default = AccordionBody;

// node_modules/react-bootstrap/esm/AccordionButton.js
var React5 = __toESM(require_react());
var import_react3 = __toESM(require_react());
var import_classnames3 = __toESM(require_classnames());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
function useAccordionButton(eventKey, onClick) {
  const {
    activeEventKey,
    onSelect,
    alwaysOpen
  } = (0, import_react3.useContext)(AccordionContext_default);
  return (e) => {
    let eventKeyPassed = eventKey === activeEventKey ? null : eventKey;
    if (alwaysOpen) {
      if (Array.isArray(activeEventKey)) {
        if (activeEventKey.includes(eventKey)) {
          eventKeyPassed = activeEventKey.filter((k) => k !== eventKey);
        } else {
          eventKeyPassed = [...activeEventKey, eventKey];
        }
      } else {
        eventKeyPassed = [eventKey];
      }
    }
    onSelect == null || onSelect(eventKeyPassed, e);
    onClick == null || onClick(e);
  };
}
var AccordionButton = React5.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "button",
  bsPrefix,
  className,
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-button");
  const {
    eventKey
  } = (0, import_react3.useContext)(AccordionItemContext_default);
  const accordionOnClick = useAccordionButton(eventKey, onClick);
  const {
    activeEventKey
  } = (0, import_react3.useContext)(AccordionContext_default);
  if (Component2 === "button") {
    props.type = "button";
  }
  return (0, import_jsx_runtime3.jsx)(Component2, {
    ref,
    onClick: accordionOnClick,
    ...props,
    "aria-expanded": Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : eventKey === activeEventKey,
    className: (0, import_classnames3.default)(className, bsPrefix, !isAccordionItemSelected(activeEventKey, eventKey) && "collapsed")
  });
});
AccordionButton.displayName = "AccordionButton";
var AccordionButton_default = AccordionButton;

// node_modules/react-bootstrap/esm/AccordionHeader.js
var import_classnames4 = __toESM(require_classnames());
var React6 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var AccordionHeader = React6.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "h2",
  bsPrefix,
  className,
  children,
  onClick,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-header");
  return (0, import_jsx_runtime4.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames4.default)(className, bsPrefix),
    children: (0, import_jsx_runtime4.jsx)(AccordionButton_default, {
      onClick,
      children
    })
  });
});
AccordionHeader.displayName = "AccordionHeader";
var AccordionHeader_default = AccordionHeader;

// node_modules/react-bootstrap/esm/AccordionItem.js
var import_classnames5 = __toESM(require_classnames());
var React7 = __toESM(require_react());
var import_react4 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var AccordionItem = React7.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  bsPrefix,
  className,
  eventKey,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "accordion-item");
  const contextValue = (0, import_react4.useMemo)(() => ({
    eventKey
  }), [eventKey]);
  return (0, import_jsx_runtime5.jsx)(AccordionItemContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime5.jsx)(Component2, {
      ref,
      ...props,
      className: (0, import_classnames5.default)(className, bsPrefix)
    })
  });
});
AccordionItem.displayName = "AccordionItem";
var AccordionItem_default = AccordionItem;

// node_modules/react-bootstrap/esm/Accordion.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var Accordion = React8.forwardRef((props, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component2 = "div",
    activeKey,
    bsPrefix,
    className,
    onSelect,
    flush,
    alwaysOpen,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: "onSelect"
  });
  const prefix = useBootstrapPrefix(bsPrefix, "accordion");
  const contextValue = (0, import_react5.useMemo)(() => ({
    activeEventKey: activeKey,
    onSelect,
    alwaysOpen
  }), [activeKey, onSelect, alwaysOpen]);
  return (0, import_jsx_runtime6.jsx)(AccordionContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime6.jsx)(Component2, {
      ref,
      ...controlledProps,
      className: (0, import_classnames6.default)(className, prefix, flush && `${prefix}-flush`)
    })
  });
});
Accordion.displayName = "Accordion";
var Accordion_default = Object.assign(Accordion, {
  Button: AccordionButton_default,
  Collapse: AccordionCollapse_default,
  Item: AccordionItem_default,
  Header: AccordionHeader_default,
  Body: AccordionBody_default
});

// node_modules/react-bootstrap/esm/Alert.js
var import_classnames9 = __toESM(require_classnames());
var React11 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AlertHeading.js
var React9 = __toESM(require_react());
var import_classnames7 = __toESM(require_classnames());
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var DivStyledAsH4 = divWithClassName_default("h4");
DivStyledAsH4.displayName = "DivStyledAsH4";
var AlertHeading = React9.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-heading");
  return (0, import_jsx_runtime7.jsx)(Component2, {
    ref,
    className: (0, import_classnames7.default)(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = "AlertHeading";
var AlertHeading_default = AlertHeading;

// node_modules/react-bootstrap/esm/AlertLink.js
var React10 = __toESM(require_react());
var import_classnames8 = __toESM(require_classnames());
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var AlertLink = React10.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = Anchor_default,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-link");
  return (0, import_jsx_runtime8.jsx)(Component2, {
    ref,
    className: (0, import_classnames8.default)(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = "AlertLink";
var AlertLink_default = AlertLink;

// node_modules/react-bootstrap/esm/Alert.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
var import_jsx_runtime10 = __toESM(require_jsx_runtime());
var Alert = React11.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = "Close alert",
    closeVariant,
    className,
    children,
    variant = "primary",
    onClose,
    dismissible,
    transition = Fade_default,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: "onClose"
  });
  const prefix = useBootstrapPrefix(bsPrefix, "alert");
  const handleClose = useEventCallback((e) => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade_default : transition;
  const alert = (0, import_jsx_runtime10.jsxs)("div", {
    role: "alert",
    ...!Transition ? props : void 0,
    ref,
    className: (0, import_classnames9.default)(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && (0, import_jsx_runtime9.jsx)(CloseButton_default, {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition)
    return show ? alert : null;
  return (0, import_jsx_runtime9.jsx)(Transition, {
    unmountOnExit: true,
    ...props,
    ref: void 0,
    in: show,
    children: alert
  });
});
Alert.displayName = "Alert";
var Alert_default = Object.assign(Alert, {
  Link: AlertLink_default,
  Heading: AlertHeading_default
});

// node_modules/react-bootstrap/esm/Anchor.js
var Anchor_default2 = Anchor_default;

// node_modules/react-bootstrap/esm/Badge.js
var import_classnames10 = __toESM(require_classnames());
var React12 = __toESM(require_react());
var import_jsx_runtime11 = __toESM(require_jsx_runtime());
var Badge = React12.forwardRef(({
  bsPrefix,
  bg = "primary",
  pill = false,
  text,
  className,
  as: Component2 = "span",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "badge");
  return (0, import_jsx_runtime11.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames10.default)(className, prefix, pill && `rounded-pill`, text && `text-${text}`, bg && `bg-${bg}`)
  });
});
Badge.displayName = "Badge";
var Badge_default = Badge;

// node_modules/react-bootstrap/esm/Breadcrumb.js
var import_classnames12 = __toESM(require_classnames());
var React14 = __toESM(require_react());

// node_modules/react-bootstrap/esm/BreadcrumbItem.js
var import_classnames11 = __toESM(require_classnames());
var React13 = __toESM(require_react());
var import_jsx_runtime12 = __toESM(require_jsx_runtime());
var BreadcrumbItem = React13.forwardRef(({
  bsPrefix,
  active = false,
  children,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "li",
  linkAs: LinkComponent = Anchor_default,
  linkProps = {},
  href,
  title,
  target,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "breadcrumb-item");
  return (0, import_jsx_runtime12.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames11.default)(prefix, className, {
      active
    }),
    "aria-current": active ? "page" : void 0,
    children: active ? children : (0, import_jsx_runtime12.jsx)(LinkComponent, {
      ...linkProps,
      href,
      title,
      target,
      children
    })
  });
});
BreadcrumbItem.displayName = "BreadcrumbItem";
var BreadcrumbItem_default = BreadcrumbItem;

// node_modules/react-bootstrap/esm/Breadcrumb.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime());
var Breadcrumb = React14.forwardRef(({
  bsPrefix,
  className,
  listProps = {},
  children,
  label = "breadcrumb",
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "nav",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "breadcrumb");
  return (0, import_jsx_runtime13.jsx)(Component2, {
    "aria-label": label,
    className,
    ref,
    ...props,
    children: (0, import_jsx_runtime13.jsx)("ol", {
      ...listProps,
      className: (0, import_classnames12.default)(prefix, listProps == null ? void 0 : listProps.className),
      children
    })
  });
});
Breadcrumb.displayName = "Breadcrumb";
var Breadcrumb_default = Object.assign(Breadcrumb, {
  Item: BreadcrumbItem_default
});

// node_modules/react-bootstrap/esm/ButtonToolbar.js
var import_classnames13 = __toESM(require_classnames());
var React15 = __toESM(require_react());
var import_jsx_runtime14 = __toESM(require_jsx_runtime());
var ButtonToolbar = React15.forwardRef(({
  bsPrefix,
  className,
  role = "toolbar",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "btn-toolbar");
  return (0, import_jsx_runtime14.jsx)("div", {
    ...props,
    ref,
    className: (0, import_classnames13.default)(className, prefix),
    role
  });
});
ButtonToolbar.displayName = "ButtonToolbar";
var ButtonToolbar_default = ButtonToolbar;

// node_modules/react-bootstrap/esm/Card.js
var import_classnames23 = __toESM(require_classnames());
var React25 = __toESM(require_react());

// node_modules/react-bootstrap/esm/CardBody.js
var React16 = __toESM(require_react());
var import_classnames14 = __toESM(require_classnames());
var import_jsx_runtime15 = __toESM(require_jsx_runtime());
var CardBody = React16.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-body");
  return (0, import_jsx_runtime15.jsx)(Component2, {
    ref,
    className: (0, import_classnames14.default)(className, bsPrefix),
    ...props
  });
});
CardBody.displayName = "CardBody";
var CardBody_default = CardBody;

// node_modules/react-bootstrap/esm/CardFooter.js
var React17 = __toESM(require_react());
var import_classnames15 = __toESM(require_classnames());
var import_jsx_runtime16 = __toESM(require_jsx_runtime());
var CardFooter = React17.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-footer");
  return (0, import_jsx_runtime16.jsx)(Component2, {
    ref,
    className: (0, import_classnames15.default)(className, bsPrefix),
    ...props
  });
});
CardFooter.displayName = "CardFooter";
var CardFooter_default = CardFooter;

// node_modules/react-bootstrap/esm/CardHeader.js
var import_classnames16 = __toESM(require_classnames());
var React18 = __toESM(require_react());
var import_react6 = __toESM(require_react());
var import_jsx_runtime17 = __toESM(require_jsx_runtime());
var CardHeader = React18.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "card-header");
  const contextValue = (0, import_react6.useMemo)(() => ({
    cardHeaderBsPrefix: prefix
  }), [prefix]);
  return (0, import_jsx_runtime17.jsx)(CardHeaderContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime17.jsx)(Component2, {
      ref,
      ...props,
      className: (0, import_classnames16.default)(className, prefix)
    })
  });
});
CardHeader.displayName = "CardHeader";
var CardHeader_default = CardHeader;

// node_modules/react-bootstrap/esm/CardImg.js
var import_classnames17 = __toESM(require_classnames());
var React19 = __toESM(require_react());
var import_jsx_runtime18 = __toESM(require_jsx_runtime());
var CardImg = React19.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    bsPrefix,
    className,
    variant,
    as: Component2 = "img",
    ...props
  }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, "card-img");
    return (0, import_jsx_runtime18.jsx)(Component2, {
      ref,
      className: (0, import_classnames17.default)(variant ? `${prefix}-${variant}` : prefix, className),
      ...props
    });
  }
);
CardImg.displayName = "CardImg";
var CardImg_default = CardImg;

// node_modules/react-bootstrap/esm/CardImgOverlay.js
var React20 = __toESM(require_react());
var import_classnames18 = __toESM(require_classnames());
var import_jsx_runtime19 = __toESM(require_jsx_runtime());
var CardImgOverlay = React20.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-img-overlay");
  return (0, import_jsx_runtime19.jsx)(Component2, {
    ref,
    className: (0, import_classnames18.default)(className, bsPrefix),
    ...props
  });
});
CardImgOverlay.displayName = "CardImgOverlay";
var CardImgOverlay_default = CardImgOverlay;

// node_modules/react-bootstrap/esm/CardLink.js
var React21 = __toESM(require_react());
var import_classnames19 = __toESM(require_classnames());
var import_jsx_runtime20 = __toESM(require_jsx_runtime());
var CardLink = React21.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "a",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-link");
  return (0, import_jsx_runtime20.jsx)(Component2, {
    ref,
    className: (0, import_classnames19.default)(className, bsPrefix),
    ...props
  });
});
CardLink.displayName = "CardLink";
var CardLink_default = CardLink;

// node_modules/react-bootstrap/esm/CardSubtitle.js
var React22 = __toESM(require_react());
var import_classnames20 = __toESM(require_classnames());
var import_jsx_runtime21 = __toESM(require_jsx_runtime());
var DivStyledAsH6 = divWithClassName_default("h6");
var CardSubtitle = React22.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = DivStyledAsH6,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-subtitle");
  return (0, import_jsx_runtime21.jsx)(Component2, {
    ref,
    className: (0, import_classnames20.default)(className, bsPrefix),
    ...props
  });
});
CardSubtitle.displayName = "CardSubtitle";
var CardSubtitle_default = CardSubtitle;

// node_modules/react-bootstrap/esm/CardText.js
var React23 = __toESM(require_react());
var import_classnames21 = __toESM(require_classnames());
var import_jsx_runtime22 = __toESM(require_jsx_runtime());
var CardText = React23.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "p",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-text");
  return (0, import_jsx_runtime22.jsx)(Component2, {
    ref,
    className: (0, import_classnames21.default)(className, bsPrefix),
    ...props
  });
});
CardText.displayName = "CardText";
var CardText_default = CardText;

// node_modules/react-bootstrap/esm/CardTitle.js
var React24 = __toESM(require_react());
var import_classnames22 = __toESM(require_classnames());
var import_jsx_runtime23 = __toESM(require_jsx_runtime());
var DivStyledAsH5 = divWithClassName_default("h5");
var CardTitle = React24.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = DivStyledAsH5,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-title");
  return (0, import_jsx_runtime23.jsx)(Component2, {
    ref,
    className: (0, import_classnames22.default)(className, bsPrefix),
    ...props
  });
});
CardTitle.displayName = "CardTitle";
var CardTitle_default = CardTitle;

// node_modules/react-bootstrap/esm/Card.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime());
var Card = React25.forwardRef(({
  bsPrefix,
  className,
  bg,
  text,
  border,
  body = false,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "card");
  return (0, import_jsx_runtime24.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames23.default)(className, prefix, bg && `bg-${bg}`, text && `text-${text}`, border && `border-${border}`),
    children: body ? (0, import_jsx_runtime24.jsx)(CardBody_default, {
      children
    }) : children
  });
});
Card.displayName = "Card";
var Card_default = Object.assign(Card, {
  Img: CardImg_default,
  Title: CardTitle_default,
  Subtitle: CardSubtitle_default,
  Body: CardBody_default,
  Link: CardLink_default,
  Text: CardText_default,
  Header: CardHeader_default,
  Footer: CardFooter_default,
  ImgOverlay: CardImgOverlay_default
});

// node_modules/react-bootstrap/esm/CardGroup.js
var React26 = __toESM(require_react());
var import_classnames24 = __toESM(require_classnames());
var import_jsx_runtime25 = __toESM(require_jsx_runtime());
var CardGroup = React26.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "card-group");
  return (0, import_jsx_runtime25.jsx)(Component2, {
    ref,
    className: (0, import_classnames24.default)(className, bsPrefix),
    ...props
  });
});
CardGroup.displayName = "CardGroup";
var CardGroup_default = CardGroup;

// node_modules/react-bootstrap/esm/Col.js
var import_classnames25 = __toESM(require_classnames());
var React27 = __toESM(require_react());
var import_jsx_runtime26 = __toESM(require_jsx_runtime());
function useCol({
  as,
  bsPrefix,
  className,
  ...props
}) {
  bsPrefix = useBootstrapPrefix(bsPrefix, "col");
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  const spans = [];
  const classes = [];
  breakpoints.forEach((brkPoint) => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let span;
    let offset;
    let order;
    if (typeof propValue === "object" && propValue != null) {
      ({
        span,
        offset,
        order
      } = propValue);
    } else {
      span = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : "";
    if (span)
      spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
    if (order != null)
      classes.push(`order${infix}-${order}`);
    if (offset != null)
      classes.push(`offset${infix}-${offset}`);
  });
  return [{
    ...props,
    className: (0, import_classnames25.default)(className, ...spans, ...classes)
  }, {
    as,
    bsPrefix,
    spans
  }];
}
var Col = React27.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (props, ref) => {
    const [{
      className,
      ...colProps
    }, {
      as: Component2 = "div",
      bsPrefix,
      spans
    }] = useCol(props);
    return (0, import_jsx_runtime26.jsx)(Component2, {
      ...colProps,
      ref,
      className: (0, import_classnames25.default)(className, !spans.length && bsPrefix)
    });
  }
);
Col.displayName = "Col";
var Col_default = Col;

// node_modules/react-bootstrap/esm/DropdownButton.js
var React28 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime27 = __toESM(require_jsx_runtime());
var import_jsx_runtime28 = __toESM(require_jsx_runtime());
var propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   */
  id: import_prop_types.default.string,
  /** An `href` passed to the Toggle component */
  href: import_prop_types.default.string,
  /** An `onClick` handler passed to the Toggle component */
  onClick: import_prop_types.default.func,
  /** The content of the non-toggle Button.  */
  title: import_prop_types.default.node.isRequired,
  /** Disables both Buttons  */
  disabled: import_prop_types.default.bool,
  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: import_prop_types.default.string,
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: import_prop_types.default.bool,
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: import_prop_types.default.string,
  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant: import_prop_types.default.oneOf(["dark"]),
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: import_prop_types.default.bool,
  /** @ignore */
  bsPrefix: import_prop_types.default.string,
  /** @ignore */
  variant: import_prop_types.default.string,
  /** @ignore */
  size: import_prop_types.default.string
};
var DropdownButton = React28.forwardRef(({
  title,
  children,
  bsPrefix,
  rootCloseEvent,
  variant,
  size: size2,
  menuRole,
  renderMenuOnMount,
  disabled,
  href,
  id,
  menuVariant,
  flip,
  ...props
}, ref) => (0, import_jsx_runtime28.jsxs)(Dropdown_default, {
  ref,
  ...props,
  children: [(0, import_jsx_runtime27.jsx)(DropdownToggle_default, {
    id,
    href,
    size: size2,
    variant,
    disabled,
    childBsPrefix: bsPrefix,
    children: title
  }), (0, import_jsx_runtime27.jsx)(DropdownMenu_default, {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent,
    variant: menuVariant,
    flip,
    children
  })]
}));
DropdownButton.displayName = "DropdownButton";
DropdownButton.propTypes = propTypes;
var DropdownButton_default = DropdownButton;

// node_modules/react-bootstrap/esm/Figure.js
var React32 = __toESM(require_react());
var import_classnames29 = __toESM(require_classnames());

// node_modules/react-bootstrap/esm/FigureImage.js
var import_classnames27 = __toESM(require_classnames());
var React30 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Image.js
var import_classnames26 = __toESM(require_classnames());
var React29 = __toESM(require_react());
var import_prop_types2 = __toESM(require_prop_types());
var import_jsx_runtime29 = __toESM(require_jsx_runtime());
var propTypes2 = {
  /**
   * @default 'img'
   */
  bsPrefix: import_prop_types2.default.string,
  /**
   * Sets image as fluid image.
   */
  fluid: import_prop_types2.default.bool,
  /**
   * Sets image shape as rounded.
   */
  rounded: import_prop_types2.default.bool,
  /**
   * Sets image shape as circle.
   */
  roundedCircle: import_prop_types2.default.bool,
  /**
   * Sets image shape as thumbnail.
   */
  thumbnail: import_prop_types2.default.bool
};
var Image = React29.forwardRef(({
  bsPrefix,
  className,
  fluid = false,
  rounded = false,
  roundedCircle = false,
  thumbnail = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "img");
  return (0, import_jsx_runtime29.jsx)("img", {
    // eslint-disable-line jsx-a11y/alt-text
    ref,
    ...props,
    className: (0, import_classnames26.default)(className, fluid && `${bsPrefix}-fluid`, rounded && `rounded`, roundedCircle && `rounded-circle`, thumbnail && `${bsPrefix}-thumbnail`)
  });
});
Image.displayName = "Image";
var Image_default = Image;

// node_modules/react-bootstrap/esm/FigureImage.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime());
var FigureImage = React30.forwardRef(({
  className,
  fluid = true,
  ...props
}, ref) => (0, import_jsx_runtime30.jsx)(Image_default, {
  ref,
  ...props,
  fluid,
  className: (0, import_classnames27.default)(className, "figure-img")
}));
FigureImage.displayName = "FigureImage";
FigureImage.propTypes = propTypes2;
var FigureImage_default = FigureImage;

// node_modules/react-bootstrap/esm/FigureCaption.js
var React31 = __toESM(require_react());
var import_classnames28 = __toESM(require_classnames());
var import_jsx_runtime31 = __toESM(require_jsx_runtime());
var FigureCaption = React31.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "figcaption",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "figure-caption");
  return (0, import_jsx_runtime31.jsx)(Component2, {
    ref,
    className: (0, import_classnames28.default)(className, bsPrefix),
    ...props
  });
});
FigureCaption.displayName = "FigureCaption";
var FigureCaption_default = FigureCaption;

// node_modules/react-bootstrap/esm/Figure.js
var import_jsx_runtime32 = __toESM(require_jsx_runtime());
var Figure = React32.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "figure",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "figure");
  return (0, import_jsx_runtime32.jsx)(Component2, {
    ref,
    className: (0, import_classnames29.default)(className, bsPrefix),
    ...props
  });
});
Figure.displayName = "Figure";
var Figure_default = Object.assign(Figure, {
  Image: FigureImage_default,
  Caption: FigureCaption_default
});

// node_modules/react-bootstrap/esm/Form.js
var import_classnames41 = __toESM(require_classnames());
var import_prop_types4 = __toESM(require_prop_types());
var React47 = __toESM(require_react());

// node_modules/react-bootstrap/esm/FormCheck.js
var import_classnames33 = __toESM(require_classnames());
var React37 = __toESM(require_react());
var import_react9 = __toESM(require_react());

// node_modules/react-bootstrap/esm/Feedback.js
var import_classnames30 = __toESM(require_classnames());
var React33 = __toESM(require_react());
var import_prop_types3 = __toESM(require_prop_types());
var import_jsx_runtime33 = __toESM(require_jsx_runtime());
var propTypes3 = {
  /**
   * Specify whether the feedback is for valid or invalid fields
   *
   * @type {('valid'|'invalid')}
   */
  type: import_prop_types3.default.string,
  /** Display feedback as a tooltip. */
  tooltip: import_prop_types3.default.bool,
  as: import_prop_types3.default.elementType
};
var Feedback = React33.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    as: Component2 = "div",
    className,
    type = "valid",
    tooltip = false,
    ...props
  }, ref) => (0, import_jsx_runtime33.jsx)(Component2, {
    ...props,
    ref,
    className: (0, import_classnames30.default)(className, `${type}-${tooltip ? "tooltip" : "feedback"}`)
  })
);
Feedback.displayName = "Feedback";
Feedback.propTypes = propTypes3;
var Feedback_default = Feedback;

// node_modules/react-bootstrap/esm/FormCheckInput.js
var import_classnames31 = __toESM(require_classnames());
var React35 = __toESM(require_react());
var import_react7 = __toESM(require_react());

// node_modules/react-bootstrap/esm/FormContext.js
var React34 = __toESM(require_react());
var FormContext = React34.createContext({});
var FormContext_default = FormContext;

// node_modules/react-bootstrap/esm/FormCheckInput.js
var import_jsx_runtime34 = __toESM(require_jsx_runtime());
var FormCheckInput = React35.forwardRef(({
  id,
  bsPrefix,
  className,
  type = "checkbox",
  isValid = false,
  isInvalid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "input",
  ...props
}, ref) => {
  const {
    controlId
  } = (0, import_react7.useContext)(FormContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-check-input");
  return (0, import_jsx_runtime34.jsx)(Component2, {
    ...props,
    ref,
    type,
    id: id || controlId,
    className: (0, import_classnames31.default)(className, bsPrefix, isValid && "is-valid", isInvalid && "is-invalid")
  });
});
FormCheckInput.displayName = "FormCheckInput";
var FormCheckInput_default = FormCheckInput;

// node_modules/react-bootstrap/esm/FormCheckLabel.js
var import_classnames32 = __toESM(require_classnames());
var React36 = __toESM(require_react());
var import_react8 = __toESM(require_react());
var import_jsx_runtime35 = __toESM(require_jsx_runtime());
var FormCheckLabel = React36.forwardRef(({
  bsPrefix,
  className,
  htmlFor,
  ...props
}, ref) => {
  const {
    controlId
  } = (0, import_react8.useContext)(FormContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-check-label");
  return (0, import_jsx_runtime35.jsx)("label", {
    ...props,
    ref,
    htmlFor: htmlFor || controlId,
    className: (0, import_classnames32.default)(className, bsPrefix)
  });
});
FormCheckLabel.displayName = "FormCheckLabel";
var FormCheckLabel_default = FormCheckLabel;

// node_modules/react-bootstrap/esm/FormCheck.js
var import_jsx_runtime36 = __toESM(require_jsx_runtime());
var import_jsx_runtime37 = __toESM(require_jsx_runtime());
var import_jsx_runtime38 = __toESM(require_jsx_runtime());
var FormCheck = React37.forwardRef(({
  id,
  bsPrefix,
  bsSwitchPrefix,
  inline = false,
  reverse = false,
  disabled = false,
  isValid = false,
  isInvalid = false,
  feedbackTooltip = false,
  feedback,
  feedbackType,
  className,
  style,
  title = "",
  type = "checkbox",
  label,
  children,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as = "input",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-check");
  bsSwitchPrefix = useBootstrapPrefix(bsSwitchPrefix, "form-switch");
  const {
    controlId
  } = (0, import_react9.useContext)(FormContext_default);
  const innerFormContext = (0, import_react9.useMemo)(() => ({
    controlId: id || controlId
  }), [controlId, id]);
  const hasLabel = !children && label != null && label !== false || hasChildOfType(children, FormCheckLabel_default);
  const input = (0, import_jsx_runtime36.jsx)(FormCheckInput_default, {
    ...props,
    type: type === "switch" ? "checkbox" : type,
    ref,
    isValid,
    isInvalid,
    disabled,
    as
  });
  return (0, import_jsx_runtime36.jsx)(FormContext_default.Provider, {
    value: innerFormContext,
    children: (0, import_jsx_runtime36.jsx)("div", {
      style,
      className: (0, import_classnames33.default)(className, hasLabel && bsPrefix, inline && `${bsPrefix}-inline`, reverse && `${bsPrefix}-reverse`, type === "switch" && bsSwitchPrefix),
      children: children || (0, import_jsx_runtime38.jsxs)(import_jsx_runtime37.Fragment, {
        children: [input, hasLabel && (0, import_jsx_runtime36.jsx)(FormCheckLabel_default, {
          title,
          children: label
        }), feedback && (0, import_jsx_runtime36.jsx)(Feedback_default, {
          type: feedbackType,
          tooltip: feedbackTooltip,
          children: feedback
        })]
      })
    })
  });
});
FormCheck.displayName = "FormCheck";
var FormCheck_default = Object.assign(FormCheck, {
  Input: FormCheckInput_default,
  Label: FormCheckLabel_default
});

// node_modules/react-bootstrap/esm/FormControl.js
var import_classnames34 = __toESM(require_classnames());
var React38 = __toESM(require_react());
var import_react10 = __toESM(require_react());
var import_warning = __toESM(require_warning());
var import_jsx_runtime39 = __toESM(require_jsx_runtime());
var FormControl = React38.forwardRef(({
  bsPrefix,
  type,
  size: size2,
  htmlSize,
  id,
  className,
  isValid = false,
  isInvalid = false,
  plaintext,
  readOnly,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "input",
  ...props
}, ref) => {
  const {
    controlId
  } = (0, import_react10.useContext)(FormContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-control");
  true ? (0, import_warning.default)(controlId == null || !id, "`controlId` is ignored on `<FormControl>` when `id` is specified.") : void 0;
  return (0, import_jsx_runtime39.jsx)(Component2, {
    ...props,
    type,
    size: htmlSize,
    ref,
    readOnly,
    id: id || controlId,
    className: (0, import_classnames34.default)(className, plaintext ? `${bsPrefix}-plaintext` : bsPrefix, size2 && `${bsPrefix}-${size2}`, type === "color" && `${bsPrefix}-color`, isValid && "is-valid", isInvalid && "is-invalid")
  });
});
FormControl.displayName = "FormControl";
var FormControl_default = Object.assign(FormControl, {
  Feedback: Feedback_default
});

// node_modules/react-bootstrap/esm/FormFloating.js
var React39 = __toESM(require_react());
var import_classnames35 = __toESM(require_classnames());
var import_jsx_runtime40 = __toESM(require_jsx_runtime());
var FormFloating = React39.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-floating");
  return (0, import_jsx_runtime40.jsx)(Component2, {
    ref,
    className: (0, import_classnames35.default)(className, bsPrefix),
    ...props
  });
});
FormFloating.displayName = "FormFloating";
var FormFloating_default = FormFloating;

// node_modules/react-bootstrap/esm/FormGroup.js
var React40 = __toESM(require_react());
var import_react11 = __toESM(require_react());
var import_jsx_runtime41 = __toESM(require_jsx_runtime());
var FormGroup = React40.forwardRef(({
  controlId,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  ...props
}, ref) => {
  const context3 = (0, import_react11.useMemo)(() => ({
    controlId
  }), [controlId]);
  return (0, import_jsx_runtime41.jsx)(FormContext_default.Provider, {
    value: context3,
    children: (0, import_jsx_runtime41.jsx)(Component2, {
      ...props,
      ref
    })
  });
});
FormGroup.displayName = "FormGroup";
var FormGroup_default = FormGroup;

// node_modules/react-bootstrap/esm/FormLabel.js
var import_classnames36 = __toESM(require_classnames());
var React41 = __toESM(require_react());
var import_react12 = __toESM(require_react());
var import_warning2 = __toESM(require_warning());
var import_jsx_runtime42 = __toESM(require_jsx_runtime());
var FormLabel = React41.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "label",
  bsPrefix,
  column = false,
  visuallyHidden = false,
  className,
  htmlFor,
  ...props
}, ref) => {
  const {
    controlId
  } = (0, import_react12.useContext)(FormContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-label");
  let columnClass = "col-form-label";
  if (typeof column === "string")
    columnClass = `${columnClass} ${columnClass}-${column}`;
  const classes = (0, import_classnames36.default)(className, bsPrefix, visuallyHidden && "visually-hidden", column && columnClass);
  true ? (0, import_warning2.default)(controlId == null || !htmlFor, "`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.") : void 0;
  htmlFor = htmlFor || controlId;
  if (column)
    return (0, import_jsx_runtime42.jsx)(Col_default, {
      ref,
      as: "label",
      className: classes,
      htmlFor,
      ...props
    });
  return (
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    (0, import_jsx_runtime42.jsx)(Component2, {
      ref,
      className: classes,
      htmlFor,
      ...props
    })
  );
});
FormLabel.displayName = "FormLabel";
var FormLabel_default = FormLabel;

// node_modules/react-bootstrap/esm/FormRange.js
var import_classnames37 = __toESM(require_classnames());
var React42 = __toESM(require_react());
var import_react13 = __toESM(require_react());
var import_jsx_runtime43 = __toESM(require_jsx_runtime());
var FormRange = React42.forwardRef(({
  bsPrefix,
  className,
  id,
  ...props
}, ref) => {
  const {
    controlId
  } = (0, import_react13.useContext)(FormContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-range");
  return (0, import_jsx_runtime43.jsx)("input", {
    ...props,
    type: "range",
    ref,
    className: (0, import_classnames37.default)(className, bsPrefix),
    id: id || controlId
  });
});
FormRange.displayName = "FormRange";
var FormRange_default = FormRange;

// node_modules/react-bootstrap/esm/FormSelect.js
var import_classnames38 = __toESM(require_classnames());
var React43 = __toESM(require_react());
var import_react14 = __toESM(require_react());
var import_jsx_runtime44 = __toESM(require_jsx_runtime());
var FormSelect = React43.forwardRef(({
  bsPrefix,
  size: size2,
  htmlSize,
  className,
  isValid = false,
  isInvalid = false,
  id,
  ...props
}, ref) => {
  const {
    controlId
  } = (0, import_react14.useContext)(FormContext_default);
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-select");
  return (0, import_jsx_runtime44.jsx)("select", {
    ...props,
    size: htmlSize,
    ref,
    className: (0, import_classnames38.default)(className, bsPrefix, size2 && `${bsPrefix}-${size2}`, isValid && `is-valid`, isInvalid && `is-invalid`),
    id: id || controlId
  });
});
FormSelect.displayName = "FormSelect";
var FormSelect_default = FormSelect;

// node_modules/react-bootstrap/esm/FormText.js
var import_classnames39 = __toESM(require_classnames());
var React44 = __toESM(require_react());
var import_jsx_runtime45 = __toESM(require_jsx_runtime());
var FormText = React44.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({
    bsPrefix,
    className,
    as: Component2 = "small",
    muted,
    ...props
  }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, "form-text");
    return (0, import_jsx_runtime45.jsx)(Component2, {
      ...props,
      ref,
      className: (0, import_classnames39.default)(className, bsPrefix, muted && "text-muted")
    });
  }
);
FormText.displayName = "FormText";
var FormText_default = FormText;

// node_modules/react-bootstrap/esm/Switch.js
var React45 = __toESM(require_react());
var import_jsx_runtime46 = __toESM(require_jsx_runtime());
var Switch = React45.forwardRef((props, ref) => (0, import_jsx_runtime46.jsx)(FormCheck_default, {
  ...props,
  ref,
  type: "switch"
}));
Switch.displayName = "Switch";
var Switch_default = Object.assign(Switch, {
  Input: FormCheck_default.Input,
  Label: FormCheck_default.Label
});

// node_modules/react-bootstrap/esm/FloatingLabel.js
var import_classnames40 = __toESM(require_classnames());
var React46 = __toESM(require_react());
var import_jsx_runtime47 = __toESM(require_jsx_runtime());
var import_jsx_runtime48 = __toESM(require_jsx_runtime());
var FloatingLabel = React46.forwardRef(({
  bsPrefix,
  className,
  children,
  controlId,
  label,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "form-floating");
  return (0, import_jsx_runtime48.jsxs)(FormGroup_default, {
    ref,
    className: (0, import_classnames40.default)(className, bsPrefix),
    controlId,
    ...props,
    children: [children, (0, import_jsx_runtime47.jsx)("label", {
      htmlFor: controlId,
      children: label
    })]
  });
});
FloatingLabel.displayName = "FloatingLabel";
var FloatingLabel_default = FloatingLabel;

// node_modules/react-bootstrap/esm/Form.js
var import_jsx_runtime49 = __toESM(require_jsx_runtime());
var propTypes4 = {
  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: import_prop_types4.default.any,
  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: import_prop_types4.default.bool,
  as: import_prop_types4.default.elementType
};
var Form = React47.forwardRef(({
  className,
  validated,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "form",
  ...props
}, ref) => (0, import_jsx_runtime49.jsx)(Component2, {
  ...props,
  ref,
  className: (0, import_classnames41.default)(className, validated && "was-validated")
}));
Form.displayName = "Form";
Form.propTypes = propTypes4;
var Form_default = Object.assign(Form, {
  Group: FormGroup_default,
  Control: FormControl_default,
  Floating: FormFloating_default,
  Check: FormCheck_default,
  Switch: Switch_default,
  Label: FormLabel_default,
  Text: FormText_default,
  Range: FormRange_default,
  Select: FormSelect_default,
  FloatingLabel: FloatingLabel_default
});

// node_modules/react-bootstrap/esm/InputGroup.js
var import_classnames43 = __toESM(require_classnames());
var React49 = __toESM(require_react());
var import_react15 = __toESM(require_react());

// node_modules/react-bootstrap/esm/InputGroupText.js
var React48 = __toESM(require_react());
var import_classnames42 = __toESM(require_classnames());
var import_jsx_runtime50 = __toESM(require_jsx_runtime());
var InputGroupText = React48.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "span",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "input-group-text");
  return (0, import_jsx_runtime50.jsx)(Component2, {
    ref,
    className: (0, import_classnames42.default)(className, bsPrefix),
    ...props
  });
});
InputGroupText.displayName = "InputGroupText";
var InputGroupText_default = InputGroupText;

// node_modules/react-bootstrap/esm/InputGroup.js
var import_jsx_runtime51 = __toESM(require_jsx_runtime());
var InputGroupCheckbox = (props) => (0, import_jsx_runtime51.jsx)(InputGroupText_default, {
  children: (0, import_jsx_runtime51.jsx)(FormCheckInput_default, {
    type: "checkbox",
    ...props
  })
});
var InputGroupRadio = (props) => (0, import_jsx_runtime51.jsx)(InputGroupText_default, {
  children: (0, import_jsx_runtime51.jsx)(FormCheckInput_default, {
    type: "radio",
    ...props
  })
});
var InputGroup = React49.forwardRef(({
  bsPrefix,
  size: size2,
  hasValidation,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "input-group");
  const contextValue = (0, import_react15.useMemo)(() => ({}), []);
  return (0, import_jsx_runtime51.jsx)(InputGroupContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime51.jsx)(Component2, {
      ref,
      ...props,
      className: (0, import_classnames43.default)(className, bsPrefix, size2 && `${bsPrefix}-${size2}`, hasValidation && "has-validation")
    })
  });
});
InputGroup.displayName = "InputGroup";
var InputGroup_default = Object.assign(InputGroup, {
  Text: InputGroupText_default,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox
});

// node_modules/react-bootstrap/esm/ListGroup.js
var import_classnames45 = __toESM(require_classnames());
var React51 = __toESM(require_react());
var import_warning4 = __toESM(require_warning());

// node_modules/react-bootstrap/esm/ListGroupItem.js
var import_classnames44 = __toESM(require_classnames());
var React50 = __toESM(require_react());
var import_warning3 = __toESM(require_warning());
var import_jsx_runtime52 = __toESM(require_jsx_runtime());
var ListGroupItem = React50.forwardRef(({
  bsPrefix,
  active,
  disabled,
  eventKey,
  className,
  variant,
  action,
  as,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "list-group-item");
  const [navItemProps, meta] = useNavItem({
    key: makeEventKey(eventKey, props.href),
    active,
    ...props
  });
  const handleClick = useEventCallback((event) => {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    navItemProps.onClick(event);
  });
  if (disabled && props.tabIndex === void 0) {
    props.tabIndex = -1;
    props["aria-disabled"] = true;
  }
  const Component2 = as || (action ? props.href ? "a" : "button" : "div");
  true ? (0, import_warning3.default)(as || !(!action && props.href), "`action=false` and `href` should not be used together.") : void 0;
  return (0, import_jsx_runtime52.jsx)(Component2, {
    ref,
    ...props,
    ...navItemProps,
    onClick: handleClick,
    className: (0, import_classnames44.default)(className, bsPrefix, meta.isActive && "active", disabled && "disabled", variant && `${bsPrefix}-${variant}`, action && `${bsPrefix}-action`)
  });
});
ListGroupItem.displayName = "ListGroupItem";
var ListGroupItem_default = ListGroupItem;

// node_modules/react-bootstrap/esm/ListGroup.js
var import_jsx_runtime53 = __toESM(require_jsx_runtime());
var ListGroup = React51.forwardRef((props, ref) => {
  const {
    className,
    bsPrefix: initialBsPrefix,
    variant,
    horizontal,
    numbered,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as = "div",
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: "onSelect"
  });
  const bsPrefix = useBootstrapPrefix(initialBsPrefix, "list-group");
  let horizontalVariant;
  if (horizontal) {
    horizontalVariant = horizontal === true ? "horizontal" : `horizontal-${horizontal}`;
  }
  true ? (0, import_warning4.default)(!(horizontal && variant === "flush"), '`variant="flush"` and `horizontal` should not be used together.') : void 0;
  return (0, import_jsx_runtime53.jsx)(Nav_default, {
    ref,
    ...controlledProps,
    as,
    className: (0, import_classnames45.default)(className, bsPrefix, variant && `${bsPrefix}-${variant}`, horizontalVariant && `${bsPrefix}-${horizontalVariant}`, numbered && `${bsPrefix}-numbered`)
  });
});
ListGroup.displayName = "ListGroup";
var ListGroup_default = Object.assign(ListGroup, {
  Item: ListGroupItem_default
});

// node_modules/react-bootstrap/esm/Modal.js
var import_classnames51 = __toESM(require_classnames());

// node_modules/dom-helpers/esm/scrollbarSize.js
var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM_default) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}

// node_modules/react-bootstrap/esm/Modal.js
var React57 = __toESM(require_react());
var import_react16 = __toESM(require_react());

// node_modules/react-bootstrap/esm/ModalBody.js
var React52 = __toESM(require_react());
var import_classnames46 = __toESM(require_classnames());
var import_jsx_runtime54 = __toESM(require_jsx_runtime());
var ModalBody = React52.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-body");
  return (0, import_jsx_runtime54.jsx)(Component2, {
    ref,
    className: (0, import_classnames46.default)(className, bsPrefix),
    ...props
  });
});
ModalBody.displayName = "ModalBody";
var ModalBody_default = ModalBody;

// node_modules/react-bootstrap/esm/ModalDialog.js
var import_classnames47 = __toESM(require_classnames());
var React53 = __toESM(require_react());
var import_jsx_runtime55 = __toESM(require_jsx_runtime());
var ModalDialog = React53.forwardRef(({
  bsPrefix,
  className,
  contentClassName,
  centered,
  size: size2,
  fullscreen,
  children,
  scrollable,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof fullscreen === "string" ? `${bsPrefix}-fullscreen-${fullscreen}` : `${bsPrefix}-fullscreen`;
  return (0, import_jsx_runtime55.jsx)("div", {
    ...props,
    ref,
    className: (0, import_classnames47.default)(dialogClass, className, size2 && `${bsPrefix}-${size2}`, centered && `${dialogClass}-centered`, scrollable && `${dialogClass}-scrollable`, fullscreen && fullScreenClass),
    children: (0, import_jsx_runtime55.jsx)("div", {
      className: (0, import_classnames47.default)(`${bsPrefix}-content`, contentClassName),
      children
    })
  });
});
ModalDialog.displayName = "ModalDialog";
var ModalDialog_default = ModalDialog;

// node_modules/react-bootstrap/esm/ModalFooter.js
var React54 = __toESM(require_react());
var import_classnames48 = __toESM(require_classnames());
var import_jsx_runtime56 = __toESM(require_jsx_runtime());
var ModalFooter = React54.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-footer");
  return (0, import_jsx_runtime56.jsx)(Component2, {
    ref,
    className: (0, import_classnames48.default)(className, bsPrefix),
    ...props
  });
});
ModalFooter.displayName = "ModalFooter";
var ModalFooter_default = ModalFooter;

// node_modules/react-bootstrap/esm/ModalHeader.js
var import_classnames49 = __toESM(require_classnames());
var React55 = __toESM(require_react());
var import_jsx_runtime57 = __toESM(require_jsx_runtime());
var ModalHeader = React55.forwardRef(({
  bsPrefix,
  className,
  closeLabel = "Close",
  closeButton = false,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-header");
  return (0, import_jsx_runtime57.jsx)(AbstractModalHeader_default, {
    ref,
    ...props,
    className: (0, import_classnames49.default)(className, bsPrefix),
    closeLabel,
    closeButton
  });
});
ModalHeader.displayName = "ModalHeader";
var ModalHeader_default = ModalHeader;

// node_modules/react-bootstrap/esm/ModalTitle.js
var React56 = __toESM(require_react());
var import_classnames50 = __toESM(require_classnames());
var import_jsx_runtime58 = __toESM(require_jsx_runtime());
var DivStyledAsH42 = divWithClassName_default("h4");
var ModalTitle = React56.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = DivStyledAsH42,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal-title");
  return (0, import_jsx_runtime58.jsx)(Component2, {
    ref,
    className: (0, import_classnames50.default)(className, bsPrefix),
    ...props
  });
});
ModalTitle.displayName = "ModalTitle";
var ModalTitle_default = ModalTitle;

// node_modules/react-bootstrap/esm/Modal.js
var import_jsx_runtime59 = __toESM(require_jsx_runtime());
function DialogTransition(props) {
  return (0, import_jsx_runtime59.jsx)(Fade_default, {
    ...props,
    timeout: null
  });
}
function BackdropTransition(props) {
  return (0, import_jsx_runtime59.jsx)(Fade_default, {
    ...props,
    timeout: null
  });
}
var Modal = React57.forwardRef(({
  bsPrefix,
  className,
  style,
  dialogClassName,
  contentClassName,
  children,
  dialogAs: Dialog = ModalDialog_default,
  "data-bs-theme": dataBsTheme,
  "aria-labelledby": ariaLabelledby,
  "aria-describedby": ariaDescribedby,
  "aria-label": ariaLabel,
  /* BaseModal props */
  show = false,
  animation = true,
  backdrop = true,
  keyboard = true,
  onEscapeKeyDown,
  onShow,
  onHide,
  container,
  autoFocus = true,
  enforceFocus = true,
  restoreFocus = true,
  restoreFocusOptions,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  backdropClassName,
  manager: propsManager,
  ...props
}, ref) => {
  const [modalStyle, setStyle] = (0, import_react16.useState)({});
  const [animateStaticModal, setAnimateStaticModal] = (0, import_react16.useState)(false);
  const waitingForMouseUpRef = (0, import_react16.useRef)(false);
  const ignoreBackdropClickRef = (0, import_react16.useRef)(false);
  const removeStaticModalAnimationRef = (0, import_react16.useRef)(null);
  const [modal, setModalRef] = useCallbackRef();
  const mergedRef = useMergedRefs_default(ref, setModalRef);
  const handleHide = useEventCallback(onHide);
  const isRTL = useIsRTL();
  bsPrefix = useBootstrapPrefix(bsPrefix, "modal");
  const modalContext = (0, import_react16.useMemo)(() => ({
    onHide: handleHide
  }), [handleHide]);
  function getModalManager() {
    if (propsManager)
      return propsManager;
    return getSharedManager({
      isRTL
    });
  }
  function updateDialogStyle(node) {
    if (!canUseDOM_default)
      return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > ownerDocument(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
    });
  }
  const handleWindowResize = useEventCallback(() => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  });
  useWillUnmount(() => {
    removeEventListener_default(window, "resize", handleWindowResize);
    removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
  });
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef.current = true;
  };
  const handleMouseUp = (e) => {
    if (waitingForMouseUpRef.current && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef.current = true;
    }
    waitingForMouseUpRef.current = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef.current = transitionEnd(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = (e) => {
    if (backdrop === "static") {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef.current || e.target !== e.currentTarget) {
      ignoreBackdropClickRef.current = false;
      return;
    }
    onHide == null || onHide();
  };
  const handleEscapeKeyDown = (e) => {
    if (keyboard) {
      onEscapeKeyDown == null || onEscapeKeyDown(e);
    } else {
      e.preventDefault();
      if (backdrop === "static") {
        handleStaticModalAnimation();
      }
    }
  };
  const handleEnter = (node, isAppearing) => {
    if (node) {
      updateDialogStyle(node);
    }
    onEnter == null || onEnter(node, isAppearing);
  };
  const handleExit = (node) => {
    removeStaticModalAnimationRef.current == null || removeStaticModalAnimationRef.current();
    onExit == null || onExit(node);
  };
  const handleEntering = (node, isAppearing) => {
    onEntering == null || onEntering(node, isAppearing);
    addEventListener_default(window, "resize", handleWindowResize);
  };
  const handleExited = (node) => {
    if (node)
      node.style.display = "";
    onExited == null || onExited(node);
    removeEventListener_default(window, "resize", handleWindowResize);
  };
  const renderBackdrop = (0, import_react16.useCallback)((backdropProps) => (0, import_jsx_runtime59.jsx)("div", {
    ...backdropProps,
    className: (0, import_classnames51.default)(`${bsPrefix}-backdrop`, backdropClassName, !animation && "show")
  }), [animation, backdropClassName, bsPrefix]);
  const baseModalStyle = {
    ...style,
    ...modalStyle
  };
  baseModalStyle.display = "block";
  const renderDialog = (dialogProps) => (0, import_jsx_runtime59.jsx)("div", {
    role: "dialog",
    ...dialogProps,
    style: baseModalStyle,
    className: (0, import_classnames51.default)(className, bsPrefix, animateStaticModal && `${bsPrefix}-static`, !animation && "show"),
    onClick: backdrop ? handleClick : void 0,
    onMouseUp: handleMouseUp,
    "data-bs-theme": dataBsTheme,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    children: (0, import_jsx_runtime59.jsx)(Dialog, {
      ...props,
      onMouseDown: handleDialogMouseDown,
      className: dialogClassName,
      contentClassName,
      children
    })
  });
  return (0, import_jsx_runtime59.jsx)(ModalContext_default.Provider, {
    value: modalContext,
    children: (0, import_jsx_runtime59.jsx)(Modal_default, {
      show,
      ref: mergedRef,
      backdrop,
      container,
      keyboard: true,
      autoFocus,
      enforceFocus,
      restoreFocus,
      restoreFocusOptions,
      onEscapeKeyDown: handleEscapeKeyDown,
      onShow,
      onHide,
      onEnter: handleEnter,
      onEntering: handleEntering,
      onEntered,
      onExit: handleExit,
      onExiting,
      onExited: handleExited,
      manager: getModalManager(),
      transition: animation ? DialogTransition : void 0,
      backdropTransition: animation ? BackdropTransition : void 0,
      renderBackdrop,
      renderDialog
    })
  });
});
Modal.displayName = "Modal";
var Modal_default2 = Object.assign(Modal, {
  Body: ModalBody_default,
  Header: ModalHeader_default,
  Title: ModalTitle_default,
  Footer: ModalFooter_default,
  Dialog: ModalDialog_default,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
});

// node_modules/react-bootstrap/esm/Overlay.js
var React64 = __toESM(require_react());
var import_react20 = __toESM(require_react());
var import_classnames56 = __toESM(require_classnames());

// node_modules/@restart/ui/esm/Overlay.js
var React58 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_react18 = __toESM(require_react());

// node_modules/@restart/ui/esm/useRootClose.js
var import_react17 = __toESM(require_react());
var noop = () => {
};
function useRootClose(ref, onRootClose, {
  disabled,
  clickTrigger
} = {}) {
  const onClose = onRootClose || noop;
  useClickOutside_default(ref, onClose, {
    disabled,
    clickTrigger
  });
  const handleKeyUp = useEventCallback((e) => {
    if (isEscKey(e)) {
      onClose(e);
    }
  });
  (0, import_react17.useEffect)(() => {
    if (disabled || ref == null)
      return void 0;
    const doc = ownerDocument(getRefTarget(ref));
    let currentEvent = (doc.defaultView || window).event;
    const removeKeyupListener = listen_default(doc, "keyup", (e) => {
      if (e === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleKeyUp(e);
    });
    return () => {
      removeKeyupListener();
    };
  }, [ref, disabled, handleKeyUp]);
}
var useRootClose_default = useRootClose;

// node_modules/@restart/ui/esm/Overlay.js
var Overlay = React58.forwardRef((props, outerRef) => {
  const {
    flip,
    offset,
    placement,
    containerPadding,
    popperConfig = {},
    transition: Transition,
    runTransition
  } = props;
  const [rootElement, attachRef] = useCallbackRef();
  const [arrowElement, attachArrowRef] = useCallbackRef();
  const mergedRef = useMergedRefs_default(attachRef, outerRef);
  const container = useWaitForDOMRef(props.container);
  const target = useWaitForDOMRef(props.target);
  const [exited, setExited] = (0, import_react18.useState)(!props.show);
  const popper = usePopper_default(target, rootElement, mergeOptionsWithPopperConfig({
    placement,
    enableEvents: !!props.show,
    containerPadding: containerPadding || 5,
    flip,
    offset,
    arrowElement,
    popperConfig
  }));
  if (props.show && exited) {
    setExited(false);
  }
  const handleHidden = (...args) => {
    setExited(true);
    if (props.onExited) {
      props.onExited(...args);
    }
  };
  const mountOverlay = props.show || !exited;
  useRootClose_default(rootElement, props.onHide, {
    disabled: !props.rootClose || props.rootCloseDisabled,
    clickTrigger: props.rootCloseEvent
  });
  if (!mountOverlay) {
    return null;
  }
  const {
    onExit,
    onExiting,
    onEnter,
    onEntering,
    onEntered
  } = props;
  let child = props.children(Object.assign({}, popper.attributes.popper, {
    style: popper.styles.popper,
    ref: mergedRef
  }), {
    popper,
    placement,
    show: !!props.show,
    arrowProps: Object.assign({}, popper.attributes.arrow, {
      style: popper.styles.arrow,
      ref: attachArrowRef
    })
  });
  child = renderTransition(Transition, runTransition, {
    in: !!props.show,
    appear: true,
    mountOnEnter: true,
    unmountOnExit: true,
    children: child,
    onExit,
    onExiting,
    onExited: handleHidden,
    onEnter,
    onEntering,
    onEntered
  });
  return container ? import_react_dom.default.createPortal(child, container) : null;
});
Overlay.displayName = "Overlay";
var Overlay_default = Overlay;

// node_modules/react-bootstrap/esm/useOverlayOffset.js
var import_react19 = __toESM(require_react());
init_hasClass();

// node_modules/react-bootstrap/esm/Popover.js
var import_classnames54 = __toESM(require_classnames());
var React62 = __toESM(require_react());

// node_modules/react-bootstrap/esm/PopoverHeader.js
var React59 = __toESM(require_react());
var import_classnames52 = __toESM(require_classnames());
var import_jsx_runtime60 = __toESM(require_jsx_runtime());
var PopoverHeader = React59.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "popover-header");
  return (0, import_jsx_runtime60.jsx)(Component2, {
    ref,
    className: (0, import_classnames52.default)(className, bsPrefix),
    ...props
  });
});
PopoverHeader.displayName = "PopoverHeader";
var PopoverHeader_default = PopoverHeader;

// node_modules/react-bootstrap/esm/PopoverBody.js
var React60 = __toESM(require_react());
var import_classnames53 = __toESM(require_classnames());
var import_jsx_runtime61 = __toESM(require_jsx_runtime());
var PopoverBody = React60.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "popover-body");
  return (0, import_jsx_runtime61.jsx)(Component2, {
    ref,
    className: (0, import_classnames53.default)(className, bsPrefix),
    ...props
  });
});
PopoverBody.displayName = "PopoverBody";
var PopoverBody_default = PopoverBody;

// node_modules/react-bootstrap/esm/helpers.js
var React61 = __toESM(require_react());
function getOverlayDirection(placement, isRTL) {
  let bsDirection = placement;
  if (placement === "left") {
    bsDirection = isRTL ? "end" : "start";
  } else if (placement === "right") {
    bsDirection = isRTL ? "start" : "end";
  }
  return bsDirection;
}

// node_modules/react-bootstrap/esm/getInitialPopperStyles.js
function getInitialPopperStyles(position = "absolute") {
  return {
    position,
    top: "0",
    left: "0",
    opacity: "0",
    pointerEvents: "none"
  };
}

// node_modules/react-bootstrap/esm/Popover.js
var import_jsx_runtime62 = __toESM(require_jsx_runtime());
var import_jsx_runtime63 = __toESM(require_jsx_runtime());
var Popover = React62.forwardRef(({
  bsPrefix,
  placement = "right",
  className,
  style,
  children,
  body,
  arrowProps,
  hasDoneInitialMeasure,
  popper,
  show,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "popover");
  const isRTL = useIsRTL();
  const [primaryPlacement] = (placement == null ? void 0 : placement.split("-")) || [];
  const bsDirection = getOverlayDirection(primaryPlacement, isRTL);
  let computedStyle = style;
  if (show && !hasDoneInitialMeasure) {
    computedStyle = {
      ...style,
      ...getInitialPopperStyles(popper == null ? void 0 : popper.strategy)
    };
  }
  return (0, import_jsx_runtime63.jsxs)("div", {
    ref,
    role: "tooltip",
    style: computedStyle,
    "x-placement": primaryPlacement,
    className: (0, import_classnames54.default)(className, decoratedBsPrefix, primaryPlacement && `bs-popover-${bsDirection}`),
    ...props,
    children: [(0, import_jsx_runtime62.jsx)("div", {
      className: "popover-arrow",
      ...arrowProps
    }), body ? (0, import_jsx_runtime62.jsx)(PopoverBody_default, {
      children
    }) : children]
  });
});
var Popover_default = Object.assign(Popover, {
  Header: PopoverHeader_default,
  Body: PopoverBody_default,
  // Default popover offset.
  // https://github.com/twbs/bootstrap/blob/5c32767e0e0dbac2d934bcdee03719a65d3f1187/js/src/popover.js#L28
  POPPER_OFFSET: [0, 8]
});

// node_modules/react-bootstrap/esm/Tooltip.js
var import_classnames55 = __toESM(require_classnames());
var React63 = __toESM(require_react());
var import_jsx_runtime64 = __toESM(require_jsx_runtime());
var import_jsx_runtime65 = __toESM(require_jsx_runtime());
var Tooltip = React63.forwardRef(({
  bsPrefix,
  placement = "right",
  className,
  style,
  children,
  arrowProps,
  hasDoneInitialMeasure,
  popper,
  show,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "tooltip");
  const isRTL = useIsRTL();
  const [primaryPlacement] = (placement == null ? void 0 : placement.split("-")) || [];
  const bsDirection = getOverlayDirection(primaryPlacement, isRTL);
  let computedStyle = style;
  if (show && !hasDoneInitialMeasure) {
    computedStyle = {
      ...style,
      ...getInitialPopperStyles(popper == null ? void 0 : popper.strategy)
    };
  }
  return (0, import_jsx_runtime65.jsxs)("div", {
    ref,
    style: computedStyle,
    role: "tooltip",
    "x-placement": primaryPlacement,
    className: (0, import_classnames55.default)(className, bsPrefix, `bs-tooltip-${bsDirection}`),
    ...props,
    children: [(0, import_jsx_runtime64.jsx)("div", {
      className: "tooltip-arrow",
      ...arrowProps
    }), (0, import_jsx_runtime64.jsx)("div", {
      className: `${bsPrefix}-inner`,
      children
    })]
  });
});
Tooltip.displayName = "Tooltip";
var Tooltip_default = Object.assign(Tooltip, {
  // Default tooltip offset.
  // https://github.com/twbs/bootstrap/blob/beca2a6c7f6bc88b6449339fc76edcda832c59e5/js/src/tooltip.js#L65
  TOOLTIP_OFFSET: [0, 6]
});

// node_modules/react-bootstrap/esm/useOverlayOffset.js
function useOverlayOffset(customOffset) {
  const overlayRef = (0, import_react19.useRef)(null);
  const popoverClass = useBootstrapPrefix(void 0, "popover");
  const tooltipClass = useBootstrapPrefix(void 0, "tooltip");
  const offset = (0, import_react19.useMemo)(() => ({
    name: "offset",
    options: {
      offset: () => {
        if (customOffset) {
          return customOffset;
        }
        if (overlayRef.current) {
          if (hasClass(overlayRef.current, popoverClass)) {
            return Popover_default.POPPER_OFFSET;
          }
          if (hasClass(overlayRef.current, tooltipClass)) {
            return Tooltip_default.TOOLTIP_OFFSET;
          }
        }
        return [0, 0];
      }
    }
  }), [customOffset, popoverClass, tooltipClass]);
  return [overlayRef, [offset]];
}

// node_modules/react-bootstrap/esm/Overlay.js
var import_jsx_runtime66 = __toESM(require_jsx_runtime());
function wrapRefs(props, arrowProps) {
  const {
    ref
  } = props;
  const {
    ref: aRef
  } = arrowProps;
  props.ref = ref.__wrapped || (ref.__wrapped = (r) => ref(safeFindDOMNode(r)));
  arrowProps.ref = aRef.__wrapped || (aRef.__wrapped = (r) => aRef(safeFindDOMNode(r)));
}
var Overlay2 = React64.forwardRef(({
  children: overlay,
  transition = Fade_default,
  popperConfig = {},
  rootClose = false,
  placement = "top",
  show: outerShow = false,
  ...outerProps
}, outerRef) => {
  const popperRef = (0, import_react20.useRef)({});
  const [firstRenderedState, setFirstRenderedState] = (0, import_react20.useState)(null);
  const [ref, modifiers] = useOverlayOffset(outerProps.offset);
  const mergedRef = useMergedRefs_default(outerRef, ref);
  const actualTransition = transition === true ? Fade_default : transition || void 0;
  const handleFirstUpdate = useEventCallback((state) => {
    setFirstRenderedState(state);
    popperConfig == null || popperConfig.onFirstUpdate == null || popperConfig.onFirstUpdate(state);
  });
  useIsomorphicEffect_default(() => {
    if (firstRenderedState && outerProps.target) {
      popperRef.current.scheduleUpdate == null || popperRef.current.scheduleUpdate();
    }
  }, [firstRenderedState, outerProps.target]);
  (0, import_react20.useEffect)(() => {
    if (!outerShow) {
      setFirstRenderedState(null);
    }
  }, [outerShow]);
  return (0, import_jsx_runtime66.jsx)(Overlay_default, {
    ...outerProps,
    ref: mergedRef,
    popperConfig: {
      ...popperConfig,
      modifiers: modifiers.concat(popperConfig.modifiers || []),
      onFirstUpdate: handleFirstUpdate
    },
    transition: actualTransition,
    rootClose,
    placement,
    show: outerShow,
    children: (overlayProps, {
      arrowProps,
      popper: popperObj,
      show
    }) => {
      var _popperObj$state;
      wrapRefs(overlayProps, arrowProps);
      const updatedPlacement = popperObj == null ? void 0 : popperObj.placement;
      const popper = Object.assign(popperRef.current, {
        state: popperObj == null ? void 0 : popperObj.state,
        scheduleUpdate: popperObj == null ? void 0 : popperObj.update,
        placement: updatedPlacement,
        outOfBoundaries: (popperObj == null || (_popperObj$state = popperObj.state) == null || (_popperObj$state = _popperObj$state.modifiersData.hide) == null ? void 0 : _popperObj$state.isReferenceHidden) || false,
        strategy: popperConfig.strategy
      });
      const hasDoneInitialMeasure = !!firstRenderedState;
      if (typeof overlay === "function")
        return overlay({
          ...overlayProps,
          placement: updatedPlacement,
          show,
          ...!transition && show && {
            className: "show"
          },
          popper,
          arrowProps,
          hasDoneInitialMeasure
        });
      return React64.cloneElement(overlay, {
        ...overlayProps,
        placement: updatedPlacement,
        arrowProps,
        popper,
        hasDoneInitialMeasure,
        className: (0, import_classnames56.default)(overlay.props.className, !transition && show && "show"),
        style: {
          ...overlay.props.style,
          ...overlayProps.style
        }
      });
    }
  });
});
Overlay2.displayName = "Overlay";
var Overlay_default2 = Overlay2;

// node_modules/react-bootstrap/esm/OverlayTrigger.js
var import_prop_types5 = __toESM(require_prop_types());
var React65 = __toESM(require_react());
var import_react21 = __toESM(require_react());
var import_warning5 = __toESM(require_warning());
var import_jsx_runtime67 = __toESM(require_jsx_runtime());
var import_jsx_runtime68 = __toESM(require_jsx_runtime());
var import_jsx_runtime69 = __toESM(require_jsx_runtime());
function normalizeDelay(delay) {
  return delay && typeof delay === "object" ? delay : {
    show: delay,
    hide: delay
  };
}
function handleMouseOverOut(handler, args, relatedNative) {
  const [e] = args;
  const target = e.currentTarget;
  const related = e.relatedTarget || e.nativeEvent[relatedNative];
  if ((!related || related !== target) && !contains(target, related)) {
    handler(...args);
  }
}
var triggerType = import_prop_types5.default.oneOf(["click", "hover", "focus"]);
var OverlayTrigger = ({
  trigger = ["hover", "focus"],
  overlay,
  children,
  popperConfig = {},
  show: propsShow,
  defaultShow = false,
  onToggle,
  delay: propsDelay,
  placement,
  flip = placement && placement.indexOf("auto") !== -1,
  ...props
}) => {
  const triggerNodeRef = (0, import_react21.useRef)(null);
  const mergedRef = useMergedRefs_default(triggerNodeRef, children.ref);
  const timeout = useTimeout();
  const hoverStateRef = (0, import_react21.useRef)("");
  const [show, setShow] = useUncontrolledProp(propsShow, defaultShow, onToggle);
  const delay = normalizeDelay(propsDelay);
  const {
    onFocus,
    onBlur,
    onClick
  } = typeof children !== "function" ? React65.Children.only(children).props : {};
  const attachRef = (r) => {
    mergedRef(safeFindDOMNode(r));
  };
  const handleShow = (0, import_react21.useCallback)(() => {
    timeout.clear();
    hoverStateRef.current = "show";
    if (!delay.show) {
      setShow(true);
      return;
    }
    timeout.set(() => {
      if (hoverStateRef.current === "show")
        setShow(true);
    }, delay.show);
  }, [delay.show, setShow, timeout]);
  const handleHide = (0, import_react21.useCallback)(() => {
    timeout.clear();
    hoverStateRef.current = "hide";
    if (!delay.hide) {
      setShow(false);
      return;
    }
    timeout.set(() => {
      if (hoverStateRef.current === "hide")
        setShow(false);
    }, delay.hide);
  }, [delay.hide, setShow, timeout]);
  const handleFocus = (0, import_react21.useCallback)((...args) => {
    handleShow();
    onFocus == null || onFocus(...args);
  }, [handleShow, onFocus]);
  const handleBlur = (0, import_react21.useCallback)((...args) => {
    handleHide();
    onBlur == null || onBlur(...args);
  }, [handleHide, onBlur]);
  const handleClick = (0, import_react21.useCallback)((...args) => {
    setShow(!show);
    onClick == null || onClick(...args);
  }, [onClick, setShow, show]);
  const handleMouseOver = (0, import_react21.useCallback)((...args) => {
    handleMouseOverOut(handleShow, args, "fromElement");
  }, [handleShow]);
  const handleMouseOut = (0, import_react21.useCallback)((...args) => {
    handleMouseOverOut(handleHide, args, "toElement");
  }, [handleHide]);
  const triggers = trigger == null ? [] : [].concat(trigger);
  const triggerProps = {
    ref: attachRef
  };
  if (triggers.indexOf("click") !== -1) {
    triggerProps.onClick = handleClick;
  }
  if (triggers.indexOf("focus") !== -1) {
    triggerProps.onFocus = handleFocus;
    triggerProps.onBlur = handleBlur;
  }
  if (triggers.indexOf("hover") !== -1) {
    true ? (0, import_warning5.default)(triggers.length > 1, '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibility of the overlay to just mouse users. Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.') : void 0;
    triggerProps.onMouseOver = handleMouseOver;
    triggerProps.onMouseOut = handleMouseOut;
  }
  return (0, import_jsx_runtime69.jsxs)(import_jsx_runtime68.Fragment, {
    children: [typeof children === "function" ? children(triggerProps) : (0, import_react21.cloneElement)(children, triggerProps), (0, import_jsx_runtime67.jsx)(Overlay_default2, {
      ...props,
      show,
      onHide: handleHide,
      flip,
      placement,
      popperConfig,
      target: triggerNodeRef.current,
      children: overlay
    })]
  });
};
var OverlayTrigger_default = OverlayTrigger;

// node_modules/react-bootstrap/esm/PageItem.js
var import_classnames57 = __toESM(require_classnames());
var React66 = __toESM(require_react());
var import_jsx_runtime70 = __toESM(require_jsx_runtime());
var import_jsx_runtime71 = __toESM(require_jsx_runtime());
var PageItem = React66.forwardRef(({
  active = false,
  disabled = false,
  className,
  style,
  activeLabel = "(current)",
  children,
  linkStyle,
  linkClassName,
  as = Anchor_default,
  ...props
}, ref) => {
  const Component2 = active || disabled ? "span" : as;
  return (0, import_jsx_runtime70.jsx)("li", {
    ref,
    style,
    className: (0, import_classnames57.default)(className, "page-item", {
      active,
      disabled
    }),
    children: (0, import_jsx_runtime71.jsxs)(Component2, {
      className: (0, import_classnames57.default)("page-link", linkClassName),
      style: linkStyle,
      ...props,
      children: [children, active && activeLabel && (0, import_jsx_runtime70.jsx)("span", {
        className: "visually-hidden",
        children: activeLabel
      })]
    })
  });
});
PageItem.displayName = "PageItem";
var PageItem_default = PageItem;
function createButton(name, defaultValue, label = name) {
  const Button = React66.forwardRef(({
    children,
    ...props
  }, ref) => (0, import_jsx_runtime71.jsxs)(PageItem, {
    ...props,
    ref,
    children: [(0, import_jsx_runtime70.jsx)("span", {
      "aria-hidden": "true",
      children: children || defaultValue
    }), (0, import_jsx_runtime70.jsx)("span", {
      className: "visually-hidden",
      children: label
    })]
  }));
  Button.displayName = name;
  return Button;
}
var First = createButton("First", "«");
var Prev = createButton("Prev", "‹", "Previous");
var Ellipsis = createButton("Ellipsis", "…", "More");
var Next = createButton("Next", "›");
var Last = createButton("Last", "»");

// node_modules/react-bootstrap/esm/Pagination.js
var import_classnames58 = __toESM(require_classnames());
var React67 = __toESM(require_react());
var import_jsx_runtime72 = __toESM(require_jsx_runtime());
var Pagination = React67.forwardRef(({
  bsPrefix,
  className,
  size: size2,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "pagination");
  return (0, import_jsx_runtime72.jsx)("ul", {
    ref,
    ...props,
    className: (0, import_classnames58.default)(className, decoratedBsPrefix, size2 && `${decoratedBsPrefix}-${size2}`)
  });
});
Pagination.displayName = "Pagination";
var Pagination_default = Object.assign(Pagination, {
  First,
  Prev,
  Ellipsis,
  Item: PageItem_default,
  Next,
  Last
});

// node_modules/react-bootstrap/esm/Placeholder.js
var React69 = __toESM(require_react());

// node_modules/react-bootstrap/esm/usePlaceholder.js
var import_classnames59 = __toESM(require_classnames());
function usePlaceholder({
  animation,
  bg,
  bsPrefix,
  size: size2,
  ...props
}) {
  bsPrefix = useBootstrapPrefix(bsPrefix, "placeholder");
  const [{
    className,
    ...colProps
  }] = useCol(props);
  return {
    ...colProps,
    className: (0, import_classnames59.default)(className, animation ? `${bsPrefix}-${animation}` : bsPrefix, size2 && `${bsPrefix}-${size2}`, bg && `bg-${bg}`)
  };
}

// node_modules/react-bootstrap/esm/PlaceholderButton.js
var React68 = __toESM(require_react());
var import_jsx_runtime73 = __toESM(require_jsx_runtime());
var PlaceholderButton = React68.forwardRef((props, ref) => {
  const placeholderProps = usePlaceholder(props);
  return (0, import_jsx_runtime73.jsx)(Button_default, {
    ...placeholderProps,
    ref,
    disabled: true,
    tabIndex: -1
  });
});
PlaceholderButton.displayName = "PlaceholderButton";
var PlaceholderButton_default = PlaceholderButton;

// node_modules/react-bootstrap/esm/Placeholder.js
var import_jsx_runtime74 = __toESM(require_jsx_runtime());
var Placeholder = React69.forwardRef(({
  as: Component2 = "span",
  ...props
}, ref) => {
  const placeholderProps = usePlaceholder(props);
  return (0, import_jsx_runtime74.jsx)(Component2, {
    ...placeholderProps,
    ref
  });
});
Placeholder.displayName = "Placeholder";
var Placeholder_default = Object.assign(Placeholder, {
  Button: PlaceholderButton_default
});

// node_modules/react-bootstrap/esm/ProgressBar.js
var import_classnames60 = __toESM(require_classnames());
var React70 = __toESM(require_react());
var import_react22 = __toESM(require_react());
var import_jsx_runtime75 = __toESM(require_jsx_runtime());
var ROUND_PRECISION = 1e3;
function getPercentage(now, min, max) {
  const percentage = (now - min) / (max - min) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}
function renderProgressBar({
  min,
  now,
  max,
  label,
  visuallyHidden,
  striped,
  animated,
  className,
  style,
  variant,
  bsPrefix,
  ...props
}, ref) {
  return (0, import_jsx_runtime75.jsx)("div", {
    ref,
    ...props,
    role: "progressbar",
    className: (0, import_classnames60.default)(className, `${bsPrefix}-bar`, {
      [`bg-${variant}`]: variant,
      [`${bsPrefix}-bar-animated`]: animated,
      [`${bsPrefix}-bar-striped`]: animated || striped
    }),
    style: {
      width: `${getPercentage(now, min, max)}%`,
      ...style
    },
    "aria-valuenow": now,
    "aria-valuemin": min,
    "aria-valuemax": max,
    children: visuallyHidden ? (0, import_jsx_runtime75.jsx)("span", {
      className: "visually-hidden",
      children: label
    }) : label
  });
}
var ProgressBar = React70.forwardRef(({
  isChild = false,
  ...rest
}, ref) => {
  const props = {
    min: 0,
    max: 100,
    animated: false,
    visuallyHidden: false,
    striped: false,
    ...rest
  };
  props.bsPrefix = useBootstrapPrefix(props.bsPrefix, "progress");
  if (isChild) {
    return renderProgressBar(props, ref);
  }
  const {
    min,
    now,
    max,
    label,
    visuallyHidden,
    striped,
    animated,
    bsPrefix,
    variant,
    className,
    children,
    ...wrapperProps
  } = props;
  return (0, import_jsx_runtime75.jsx)("div", {
    ref,
    ...wrapperProps,
    className: (0, import_classnames60.default)(className, bsPrefix),
    children: children ? map(children, (child) => (0, import_react22.cloneElement)(child, {
      isChild: true
    })) : renderProgressBar({
      min,
      now,
      max,
      label,
      visuallyHidden,
      striped,
      animated,
      bsPrefix,
      variant
    }, ref)
  });
});
ProgressBar.displayName = "ProgressBar";
var ProgressBar_default = ProgressBar;

// node_modules/react-bootstrap/esm/Ratio.js
var import_classnames61 = __toESM(require_classnames());
var React71 = __toESM(require_react());
var import_jsx_runtime76 = __toESM(require_jsx_runtime());
function toPercent(num) {
  if (num <= 0)
    return "100%";
  if (num < 1)
    return `${num * 100}%`;
  return `${num}%`;
}
var Ratio = React71.forwardRef(({
  bsPrefix,
  className,
  children,
  aspectRatio = "1x1",
  style,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "ratio");
  const isCustomRatio = typeof aspectRatio === "number";
  return (0, import_jsx_runtime76.jsx)("div", {
    ref,
    ...props,
    style: {
      ...style,
      ...isCustomRatio && {
        "--bs-aspect-ratio": toPercent(aspectRatio)
      }
    },
    className: (0, import_classnames61.default)(bsPrefix, className, !isCustomRatio && `${bsPrefix}-${aspectRatio}`),
    children: React71.Children.only(children)
  });
});
var Ratio_default = Ratio;

// node_modules/react-bootstrap/esm/Row.js
var import_classnames62 = __toESM(require_classnames());
var React72 = __toESM(require_react());
var import_jsx_runtime77 = __toESM(require_jsx_runtime());
var Row = React72.forwardRef(({
  bsPrefix,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "row");
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints.forEach((brkPoint) => {
    const propValue = props[brkPoint];
    delete props[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === "object") {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : "";
    if (cols != null)
      classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return (0, import_jsx_runtime77.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames62.default)(className, decoratedBsPrefix, ...classes)
  });
});
Row.displayName = "Row";
var Row_default = Row;

// node_modules/react-bootstrap/esm/Spinner.js
var import_classnames63 = __toESM(require_classnames());
var React73 = __toESM(require_react());
var import_jsx_runtime78 = __toESM(require_jsx_runtime());
var Spinner = React73.forwardRef(({
  bsPrefix,
  variant,
  animation = "border",
  size: size2,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  className,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "spinner");
  const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
  return (0, import_jsx_runtime78.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames63.default)(className, bsSpinnerPrefix, size2 && `${bsSpinnerPrefix}-${size2}`, variant && `text-${variant}`)
  });
});
Spinner.displayName = "Spinner";
var Spinner_default = Spinner;

// node_modules/react-bootstrap/esm/SplitButton.js
var React74 = __toESM(require_react());
var import_prop_types6 = __toESM(require_prop_types());
var import_jsx_runtime79 = __toESM(require_jsx_runtime());
var import_jsx_runtime80 = __toESM(require_jsx_runtime());
var propTypes5 = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   * @required
   */
  id: import_prop_types6.default.string,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: import_prop_types6.default.string,
  /** An `href` passed to the non-toggle Button */
  href: import_prop_types6.default.string,
  /** An anchor `target` passed to the non-toggle Button */
  target: import_prop_types6.default.string,
  /** An `onClick` handler passed to the non-toggle Button */
  onClick: import_prop_types6.default.func,
  /** The content of the non-toggle Button.  */
  title: import_prop_types6.default.node.isRequired,
  /** A `type` passed to the non-toggle Button */
  type: import_prop_types6.default.string,
  /** Disables both Buttons  */
  disabled: import_prop_types6.default.bool,
  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,
  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: import_prop_types6.default.string,
  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: import_prop_types6.default.bool,
  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: import_prop_types6.default.string,
  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: import_prop_types6.default.bool,
  /** @ignore */
  bsPrefix: import_prop_types6.default.string,
  /** @ignore */
  variant: import_prop_types6.default.string,
  /** @ignore */
  size: import_prop_types6.default.string
};
var SplitButton = React74.forwardRef(({
  id,
  bsPrefix,
  size: size2,
  variant,
  title,
  type = "button",
  toggleLabel = "Toggle dropdown",
  children,
  onClick,
  href,
  target,
  menuRole,
  renderMenuOnMount,
  rootCloseEvent,
  flip,
  ...props
}, ref) => (0, import_jsx_runtime80.jsxs)(Dropdown_default, {
  ref,
  ...props,
  as: ButtonGroup_default,
  children: [(0, import_jsx_runtime79.jsx)(Button_default, {
    size: size2,
    variant,
    disabled: props.disabled,
    bsPrefix,
    href,
    target,
    onClick,
    type,
    children: title
  }), (0, import_jsx_runtime79.jsx)(Dropdown_default.Toggle, {
    split: true,
    id,
    size: size2,
    variant,
    disabled: props.disabled,
    childBsPrefix: bsPrefix,
    children: (0, import_jsx_runtime79.jsx)("span", {
      className: "visually-hidden",
      children: toggleLabel
    })
  }), (0, import_jsx_runtime79.jsx)(Dropdown_default.Menu, {
    role: menuRole,
    renderOnMount: renderMenuOnMount,
    rootCloseEvent,
    flip,
    children
  })]
}));
SplitButton.propTypes = propTypes5;
SplitButton.displayName = "SplitButton";
var SplitButton_default = SplitButton;

// node_modules/react-bootstrap/esm/SSRProvider.js
var SSRProvider_default = $b5e257d569688ac6$export$9f8ac96af4b1b2ae;

// node_modules/react-bootstrap/esm/Stack.js
var import_classnames64 = __toESM(require_classnames());
var React75 = __toESM(require_react());

// node_modules/react-bootstrap/esm/createUtilityClasses.js
var import_prop_types7 = __toESM(require_prop_types());
function createUtilityClassName(utilityValues, breakpoints = DEFAULT_BREAKPOINTS, minBreakpoint = DEFAULT_MIN_BREAKPOINT) {
  const classes = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === "object") {
        breakpoints.forEach((brkPoint) => {
          const bpValue = utilValue[brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== minBreakpoint ? `-${brkPoint}` : "";
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });
  return classes;
}

// node_modules/react-bootstrap/esm/Stack.js
var import_jsx_runtime81 = __toESM(require_jsx_runtime());
var Stack = React75.forwardRef(({
  as: Component2 = "div",
  bsPrefix,
  className,
  direction,
  gap,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, direction === "horizontal" ? "hstack" : "vstack");
  const breakpoints = useBootstrapBreakpoints();
  const minBreakpoint = useBootstrapMinBreakpoint();
  return (0, import_jsx_runtime81.jsx)(Component2, {
    ...props,
    ref,
    className: (0, import_classnames64.default)(className, bsPrefix, ...createUtilityClassName({
      gap
    }, breakpoints, minBreakpoint))
  });
});
Stack.displayName = "Stack";
var Stack_default = Stack;

// node_modules/react-bootstrap/esm/Tab.js
var import_prop_types8 = __toESM(require_prop_types());

// node_modules/react-bootstrap/esm/TabContainer.js
var React78 = __toESM(require_react());

// node_modules/@restart/ui/esm/Tabs.js
var React77 = __toESM(require_react());
var import_react24 = __toESM(require_react());

// node_modules/@restart/ui/esm/TabPanel.js
var React76 = __toESM(require_react());
var import_react23 = __toESM(require_react());
var import_jsx_runtime82 = __toESM(require_jsx_runtime());
var _excluded = ["active", "eventKey", "mountOnEnter", "transition", "unmountOnExit", "role", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited"];
var _excluded2 = ["activeKey", "getControlledId", "getControllerId"];
var _excluded3 = ["as"];
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r)
    return {};
  var t = {};
  for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
      if (e.indexOf(n) >= 0)
        continue;
      t[n] = r[n];
    }
  return t;
}
function useTabPanel(_ref) {
  let {
    active,
    eventKey,
    mountOnEnter,
    transition,
    unmountOnExit,
    role = "tabpanel",
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const context3 = (0, import_react23.useContext)(TabContext_default);
  if (!context3)
    return [Object.assign({}, props, {
      role
    }), {
      eventKey,
      isActive: active,
      mountOnEnter,
      transition,
      unmountOnExit,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited
    }];
  const {
    activeKey,
    getControlledId,
    getControllerId
  } = context3, rest = _objectWithoutPropertiesLoose(context3, _excluded2);
  const key = makeEventKey(eventKey);
  return [Object.assign({}, props, {
    role,
    id: getControlledId(eventKey),
    "aria-labelledby": getControllerId(eventKey)
  }), {
    eventKey,
    isActive: active == null && key != null ? makeEventKey(activeKey) === key : active,
    transition: transition || rest.transition,
    mountOnEnter: mountOnEnter != null ? mountOnEnter : rest.mountOnEnter,
    unmountOnExit: unmountOnExit != null ? unmountOnExit : rest.unmountOnExit,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited
  }];
}
var TabPanel = React76.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (_ref2, ref) => {
    let {
      as: Component2 = "div"
    } = _ref2, props = _objectWithoutPropertiesLoose(_ref2, _excluded3);
    const [tabPanelProps, {
      isActive,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      mountOnEnter,
      unmountOnExit,
      transition: Transition = NoopTransition_default
    }] = useTabPanel(props);
    return (0, import_jsx_runtime82.jsx)(TabContext_default.Provider, {
      value: null,
      children: (0, import_jsx_runtime82.jsx)(SelectableContext_default.Provider, {
        value: null,
        children: (0, import_jsx_runtime82.jsx)(Transition, {
          in: isActive,
          onEnter,
          onEntering,
          onEntered,
          onExit,
          onExiting,
          onExited,
          mountOnEnter,
          unmountOnExit,
          children: (0, import_jsx_runtime82.jsx)(Component2, Object.assign({}, tabPanelProps, {
            ref,
            hidden: !isActive,
            "aria-hidden": !isActive
          }))
        })
      })
    });
  }
);
TabPanel.displayName = "TabPanel";
var TabPanel_default = TabPanel;

// node_modules/@restart/ui/esm/Tabs.js
var import_jsx_runtime83 = __toESM(require_jsx_runtime());
var Tabs = (props) => {
  const {
    id: userId,
    generateChildId: generateCustomChildId,
    onSelect: propsOnSelect,
    activeKey: propsActiveKey,
    defaultActiveKey,
    transition,
    mountOnEnter,
    unmountOnExit,
    children
  } = props;
  const [activeKey, onSelect] = useUncontrolledProp2(propsActiveKey, defaultActiveKey, propsOnSelect);
  const id = $b5e257d569688ac6$export$619500959fc48b26(userId);
  const generateChildId = (0, import_react24.useMemo)(() => generateCustomChildId || ((key, type) => id ? `${id}-${type}-${key}` : null), [id, generateCustomChildId]);
  const tabContext = (0, import_react24.useMemo)(() => ({
    onSelect,
    activeKey,
    transition,
    mountOnEnter: mountOnEnter || false,
    unmountOnExit: unmountOnExit || false,
    getControlledId: (key) => generateChildId(key, "tabpane"),
    getControllerId: (key) => generateChildId(key, "tab")
  }), [onSelect, activeKey, transition, mountOnEnter, unmountOnExit, generateChildId]);
  return (0, import_jsx_runtime83.jsx)(TabContext_default.Provider, {
    value: tabContext,
    children: (0, import_jsx_runtime83.jsx)(SelectableContext_default.Provider, {
      value: onSelect || null,
      children
    })
  });
};
Tabs.Panel = TabPanel_default;
var Tabs_default = Tabs;

// node_modules/react-bootstrap/esm/getTabTransitionComponent.js
function getTabTransitionComponent(transition) {
  if (typeof transition === "boolean") {
    return transition ? Fade_default : NoopTransition_default;
  }
  return transition;
}

// node_modules/react-bootstrap/esm/TabContainer.js
var import_jsx_runtime84 = __toESM(require_jsx_runtime());
var TabContainer = ({
  transition,
  ...props
}) => (0, import_jsx_runtime84.jsx)(Tabs_default, {
  ...props,
  transition: getTabTransitionComponent(transition)
});
TabContainer.displayName = "TabContainer";
var TabContainer_default = TabContainer;

// node_modules/react-bootstrap/esm/TabContent.js
var React79 = __toESM(require_react());
var import_classnames65 = __toESM(require_classnames());
var import_jsx_runtime85 = __toESM(require_jsx_runtime());
var TabContent = React79.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "tab-content");
  return (0, import_jsx_runtime85.jsx)(Component2, {
    ref,
    className: (0, import_classnames65.default)(className, bsPrefix),
    ...props
  });
});
TabContent.displayName = "TabContent";
var TabContent_default = TabContent;

// node_modules/react-bootstrap/esm/TabPane.js
var import_classnames66 = __toESM(require_classnames());
var React80 = __toESM(require_react());
var import_jsx_runtime86 = __toESM(require_jsx_runtime());
var TabPane = React80.forwardRef(({
  bsPrefix,
  transition,
  ...props
}, ref) => {
  const [{
    className,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component2 = "div",
    ...rest
  }, {
    isActive,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    mountOnEnter,
    unmountOnExit,
    transition: Transition = Fade_default
  }] = useTabPanel({
    ...props,
    transition: getTabTransitionComponent(transition)
  });
  const prefix = useBootstrapPrefix(bsPrefix, "tab-pane");
  return (0, import_jsx_runtime86.jsx)(TabContext_default.Provider, {
    value: null,
    children: (0, import_jsx_runtime86.jsx)(SelectableContext_default.Provider, {
      value: null,
      children: (0, import_jsx_runtime86.jsx)(Transition, {
        in: isActive,
        onEnter,
        onEntering,
        onEntered,
        onExit,
        onExiting,
        onExited,
        mountOnEnter,
        unmountOnExit,
        children: (0, import_jsx_runtime86.jsx)(Component2, {
          ...rest,
          ref,
          className: (0, import_classnames66.default)(className, prefix, isActive && "active")
        })
      })
    })
  });
});
TabPane.displayName = "TabPane";
var TabPane_default = TabPane;

// node_modules/react-bootstrap/esm/Tab.js
var propTypes6 = {
  eventKey: import_prop_types8.default.oneOfType([import_prop_types8.default.string, import_prop_types8.default.number]),
  /**
   * Content for the tab title.
   */
  title: import_prop_types8.default.node.isRequired,
  /**
   * The disabled state of the tab.
   */
  disabled: import_prop_types8.default.bool,
  /**
   * Class to pass to the underlying nav link.
   */
  tabClassName: import_prop_types8.default.string,
  /**
   * Object containing attributes to pass to underlying nav link.
   */
  tabAttrs: import_prop_types8.default.object
};
var Tab = () => {
  throw new Error("ReactBootstrap: The `Tab` component is not meant to be rendered! It's an abstract component that is only valid as a direct Child of the `Tabs` Component. For custom tabs components use TabPane and TabsContainer directly");
};
Tab.propTypes = propTypes6;
var Tab_default = Object.assign(Tab, {
  Container: TabContainer_default,
  Content: TabContent_default,
  Pane: TabPane_default
});

// node_modules/react-bootstrap/esm/Table.js
var import_classnames67 = __toESM(require_classnames());
var React81 = __toESM(require_react());
var import_jsx_runtime87 = __toESM(require_jsx_runtime());
var Table = React81.forwardRef(({
  bsPrefix,
  className,
  striped,
  bordered,
  borderless,
  hover,
  size: size2,
  variant,
  responsive,
  ...props
}, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, "table");
  const classes = (0, import_classnames67.default)(className, decoratedBsPrefix, variant && `${decoratedBsPrefix}-${variant}`, size2 && `${decoratedBsPrefix}-${size2}`, striped && `${decoratedBsPrefix}-${typeof striped === "string" ? `striped-${striped}` : "striped"}`, bordered && `${decoratedBsPrefix}-bordered`, borderless && `${decoratedBsPrefix}-borderless`, hover && `${decoratedBsPrefix}-hover`);
  const table = (0, import_jsx_runtime87.jsx)("table", {
    ...props,
    className: classes,
    ref
  });
  if (responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof responsive === "string") {
      responsiveClass = `${responsiveClass}-${responsive}`;
    }
    return (0, import_jsx_runtime87.jsx)("div", {
      className: responsiveClass,
      children: table
    });
  }
  return table;
});
var Table_default = Table;

// node_modules/react-bootstrap/esm/Tabs.js
var React82 = __toESM(require_react());
var import_jsx_runtime88 = __toESM(require_jsx_runtime());
var import_jsx_runtime89 = __toESM(require_jsx_runtime());
function getDefaultActiveKey(children) {
  let defaultActiveKey;
  forEach(children, (child) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}
function renderTab(child) {
  const {
    title,
    eventKey,
    disabled,
    tabClassName,
    tabAttrs,
    id
  } = child.props;
  if (title == null) {
    return null;
  }
  return (0, import_jsx_runtime88.jsx)(NavItem_default, {
    as: "li",
    role: "presentation",
    children: (0, import_jsx_runtime88.jsx)(NavLink_default, {
      as: "button",
      type: "button",
      eventKey,
      disabled,
      id,
      className: tabClassName,
      ...tabAttrs,
      children: title
    })
  });
}
var Tabs2 = (props) => {
  const {
    id,
    onSelect,
    transition,
    mountOnEnter = false,
    unmountOnExit = false,
    variant = "tabs",
    children,
    activeKey = getDefaultActiveKey(children),
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: "onSelect"
  });
  return (0, import_jsx_runtime89.jsxs)(Tabs_default, {
    id,
    activeKey,
    onSelect,
    transition: getTabTransitionComponent(transition),
    mountOnEnter,
    unmountOnExit,
    children: [(0, import_jsx_runtime88.jsx)(Nav_default2, {
      id,
      ...controlledProps,
      role: "tablist",
      as: "ul",
      variant,
      children: map(children, renderTab)
    }), (0, import_jsx_runtime88.jsx)(TabContent_default, {
      children: map(children, (child) => {
        const childProps = {
          ...child.props
        };
        delete childProps.title;
        delete childProps.disabled;
        delete childProps.tabClassName;
        delete childProps.tabAttrs;
        return (0, import_jsx_runtime88.jsx)(TabPane_default, {
          ...childProps
        });
      })
    })]
  });
};
Tabs2.displayName = "Tabs";
var Tabs_default2 = Tabs2;

// node_modules/react-bootstrap/esm/Toast.js
var React87 = __toESM(require_react());
var import_react26 = __toESM(require_react());
var import_classnames70 = __toESM(require_classnames());

// node_modules/react-bootstrap/esm/ToastFade.js
var React83 = __toESM(require_react());
init_Transition();
var import_jsx_runtime90 = __toESM(require_jsx_runtime());
var fadeStyles = {
  [ENTERING]: "showing",
  [EXITING]: "showing show"
};
var ToastFade = React83.forwardRef((props, ref) => (0, import_jsx_runtime90.jsx)(Fade_default, {
  ...props,
  ref,
  transitionClasses: fadeStyles
}));
ToastFade.displayName = "ToastFade";
var ToastFade_default = ToastFade;

// node_modules/react-bootstrap/esm/ToastHeader.js
var import_classnames68 = __toESM(require_classnames());
var React85 = __toESM(require_react());
var import_react25 = __toESM(require_react());

// node_modules/react-bootstrap/esm/ToastContext.js
var React84 = __toESM(require_react());
var ToastContext = React84.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {
  }
});
var ToastContext_default = ToastContext;

// node_modules/react-bootstrap/esm/ToastHeader.js
var import_jsx_runtime91 = __toESM(require_jsx_runtime());
var import_jsx_runtime92 = __toESM(require_jsx_runtime());
var ToastHeader = React85.forwardRef(({
  bsPrefix,
  closeLabel = "Close",
  closeVariant,
  closeButton = true,
  className,
  children,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast-header");
  const context3 = (0, import_react25.useContext)(ToastContext_default);
  const handleClick = useEventCallback((e) => {
    context3 == null || context3.onClose == null || context3.onClose(e);
  });
  return (0, import_jsx_runtime92.jsxs)("div", {
    ref,
    ...props,
    className: (0, import_classnames68.default)(bsPrefix, className),
    children: [children, closeButton && (0, import_jsx_runtime91.jsx)(CloseButton_default, {
      "aria-label": closeLabel,
      variant: closeVariant,
      onClick: handleClick,
      "data-dismiss": "toast"
    })]
  });
});
ToastHeader.displayName = "ToastHeader";
var ToastHeader_default = ToastHeader;

// node_modules/react-bootstrap/esm/ToastBody.js
var React86 = __toESM(require_react());
var import_classnames69 = __toESM(require_classnames());
var import_jsx_runtime93 = __toESM(require_jsx_runtime());
var ToastBody = React86.forwardRef(({
  className,
  bsPrefix,
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast-body");
  return (0, import_jsx_runtime93.jsx)(Component2, {
    ref,
    className: (0, import_classnames69.default)(className, bsPrefix),
    ...props
  });
});
ToastBody.displayName = "ToastBody";
var ToastBody_default = ToastBody;

// node_modules/react-bootstrap/esm/Toast.js
var import_jsx_runtime94 = __toESM(require_jsx_runtime());
var Toast = React87.forwardRef(({
  bsPrefix,
  className,
  transition: Transition = ToastFade_default,
  show = true,
  animation = true,
  delay = 5e3,
  autohide = false,
  onClose,
  onEntered,
  onExit,
  onExiting,
  onEnter,
  onEntering,
  onExited,
  bg,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast");
  const delayRef = (0, import_react26.useRef)(delay);
  const onCloseRef = (0, import_react26.useRef)(onClose);
  (0, import_react26.useEffect)(() => {
    delayRef.current = delay;
    onCloseRef.current = onClose;
  }, [delay, onClose]);
  const autohideTimeout = useTimeout();
  const autohideToast = !!(autohide && show);
  const autohideFunc = (0, import_react26.useCallback)(() => {
    if (autohideToast) {
      onCloseRef.current == null || onCloseRef.current();
    }
  }, [autohideToast]);
  (0, import_react26.useEffect)(() => {
    autohideTimeout.set(autohideFunc, delayRef.current);
  }, [autohideTimeout, autohideFunc]);
  const toastContext = (0, import_react26.useMemo)(() => ({
    onClose
  }), [onClose]);
  const hasAnimation = !!(Transition && animation);
  const toast = (0, import_jsx_runtime94.jsx)("div", {
    ...props,
    ref,
    className: (0, import_classnames70.default)(bsPrefix, className, bg && `bg-${bg}`, !hasAnimation && (show ? "show" : "hide")),
    role: "alert",
    "aria-live": "assertive",
    "aria-atomic": "true"
  });
  return (0, import_jsx_runtime94.jsx)(ToastContext_default.Provider, {
    value: toastContext,
    children: hasAnimation && Transition ? (0, import_jsx_runtime94.jsx)(Transition, {
      in: show,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      onExited,
      unmountOnExit: true,
      children: toast
    }) : toast
  });
});
Toast.displayName = "Toast";
var Toast_default = Object.assign(Toast, {
  Body: ToastBody_default,
  Header: ToastHeader_default
});

// node_modules/react-bootstrap/esm/ToastContainer.js
var import_classnames71 = __toESM(require_classnames());
var React88 = __toESM(require_react());
var import_jsx_runtime95 = __toESM(require_jsx_runtime());
var positionClasses = {
  "top-start": "top-0 start-0",
  "top-center": "top-0 start-50 translate-middle-x",
  "top-end": "top-0 end-0",
  "middle-start": "top-50 start-0 translate-middle-y",
  "middle-center": "top-50 start-50 translate-middle",
  "middle-end": "top-50 end-0 translate-middle-y",
  "bottom-start": "bottom-0 start-0",
  "bottom-center": "bottom-0 start-50 translate-middle-x",
  "bottom-end": "bottom-0 end-0"
};
var ToastContainer = React88.forwardRef(({
  bsPrefix,
  position,
  containerPosition,
  className,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component2 = "div",
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "toast-container");
  return (0, import_jsx_runtime95.jsx)(Component2, {
    ref,
    ...props,
    className: (0, import_classnames71.default)(bsPrefix, position && positionClasses[position], containerPosition && `position-${containerPosition}`, className)
  });
});
ToastContainer.displayName = "ToastContainer";
var ToastContainer_default = ToastContainer;

// node_modules/react-bootstrap/esm/ToggleButton.js
var import_classnames72 = __toESM(require_classnames());
var React89 = __toESM(require_react());
var import_jsx_runtime96 = __toESM(require_jsx_runtime());
var import_jsx_runtime97 = __toESM(require_jsx_runtime());
var import_jsx_runtime98 = __toESM(require_jsx_runtime());
var noop2 = () => void 0;
var ToggleButton = React89.forwardRef(({
  bsPrefix,
  name,
  className,
  checked,
  type,
  onChange,
  value,
  disabled,
  id,
  inputRef,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "btn-check");
  return (0, import_jsx_runtime98.jsxs)(import_jsx_runtime97.Fragment, {
    children: [(0, import_jsx_runtime96.jsx)("input", {
      className: bsPrefix,
      name,
      type,
      value,
      ref: inputRef,
      autoComplete: "off",
      checked: !!checked,
      disabled: !!disabled,
      onChange: onChange || noop2,
      id
    }), (0, import_jsx_runtime96.jsx)(Button_default, {
      ...props,
      ref,
      className: (0, import_classnames72.default)(className, disabled && "disabled"),
      type: void 0,
      role: void 0,
      as: "label",
      htmlFor: id
    })]
  });
});
ToggleButton.displayName = "ToggleButton";
var ToggleButton_default = ToggleButton;

// node_modules/react-bootstrap/esm/ToggleButtonGroup.js
var React90 = __toESM(require_react());
var import_invariant = __toESM(require_browser());
var import_jsx_runtime99 = __toESM(require_jsx_runtime());
var ToggleButtonGroup = React90.forwardRef((props, ref) => {
  const {
    children,
    type = "radio",
    name,
    value,
    onChange,
    vertical = false,
    ...controlledProps
  } = useUncontrolled(props, {
    value: "onChange"
  });
  const getValues = () => value == null ? [] : [].concat(value);
  const handleToggle = (inputVal, event) => {
    if (!onChange) {
      return;
    }
    const values = getValues();
    const isActive = values.indexOf(inputVal) !== -1;
    if (type === "radio") {
      if (!isActive)
        onChange(inputVal, event);
      return;
    }
    if (isActive) {
      onChange(values.filter((n) => n !== inputVal), event);
    } else {
      onChange([...values, inputVal], event);
    }
  };
  !(type !== "radio" || !!name) ? true ? (0, import_invariant.default)(false, 'A `name` is required to group the toggle buttons when the `type` is set to "radio"') : (0, import_invariant.default)(false) : void 0;
  return (0, import_jsx_runtime99.jsx)(ButtonGroup_default, {
    ...controlledProps,
    ref,
    vertical,
    children: map(children, (child) => {
      const values = getValues();
      const {
        value: childVal,
        onChange: childOnChange
      } = child.props;
      const handler = (e) => handleToggle(childVal, e);
      return React90.cloneElement(child, {
        type,
        name: child.name || name,
        checked: values.indexOf(childVal) !== -1,
        onChange: createChainedFunction_default(childOnChange, handler)
      });
    })
  });
});
var ToggleButtonGroup_default = Object.assign(ToggleButtonGroup, {
  Button: ToggleButton_default
});
export {
  Accordion_default as Accordion,
  AccordionBody_default as AccordionBody,
  AccordionButton_default as AccordionButton,
  AccordionCollapse_default as AccordionCollapse,
  AccordionContext_default as AccordionContext,
  AccordionHeader_default as AccordionHeader,
  AccordionItem_default as AccordionItem,
  Alert_default as Alert,
  AlertHeading_default as AlertHeading,
  AlertLink_default as AlertLink,
  Anchor_default2 as Anchor,
  Badge_default as Badge,
  Breadcrumb_default as Breadcrumb,
  BreadcrumbItem_default as BreadcrumbItem,
  Button_default as Button,
  ButtonGroup_default as ButtonGroup,
  ButtonToolbar_default as ButtonToolbar,
  Card_default as Card,
  CardBody_default as CardBody,
  CardFooter_default as CardFooter,
  CardGroup_default as CardGroup,
  CardHeader_default as CardHeader,
  CardImg_default as CardImg,
  CardImgOverlay_default as CardImgOverlay,
  CardLink_default as CardLink,
  CardSubtitle_default as CardSubtitle,
  CardText_default as CardText,
  CardTitle_default as CardTitle,
  Carousel_default as Carousel,
  CarouselCaption_default as CarouselCaption,
  CarouselItem_default as CarouselItem,
  CloseButton_default as CloseButton,
  Col_default as Col,
  Collapse_default as Collapse,
  Container_default as Container,
  Dropdown_default as Dropdown,
  DropdownButton_default as DropdownButton,
  DropdownDivider_default as DropdownDivider,
  DropdownHeader_default as DropdownHeader,
  DropdownItem_default as DropdownItem,
  DropdownItemText_default as DropdownItemText,
  DropdownMenu_default as DropdownMenu,
  DropdownToggle_default as DropdownToggle,
  Fade_default as Fade,
  Figure_default as Figure,
  FigureCaption_default as FigureCaption,
  FigureImage_default as FigureImage,
  FloatingLabel_default as FloatingLabel,
  Form_default as Form,
  FormCheck_default as FormCheck,
  FormControl_default as FormControl,
  FormFloating_default as FormFloating,
  FormGroup_default as FormGroup,
  FormLabel_default as FormLabel,
  FormSelect_default as FormSelect,
  FormText_default as FormText,
  Image_default as Image,
  InputGroup_default as InputGroup,
  ListGroup_default as ListGroup,
  ListGroupItem_default as ListGroupItem,
  Modal_default2 as Modal,
  ModalBody_default as ModalBody,
  ModalDialog_default as ModalDialog,
  ModalFooter_default as ModalFooter,
  ModalHeader_default as ModalHeader,
  ModalTitle_default as ModalTitle,
  Nav_default2 as Nav,
  NavDropdown_default as NavDropdown,
  NavItem_default as NavItem,
  NavLink_default as NavLink,
  Navbar_default as Navbar,
  NavbarBrand_default as NavbarBrand,
  NavbarCollapse_default as NavbarCollapse,
  NavbarOffcanvas_default as NavbarOffcanvas,
  NavbarText_default as NavbarText,
  NavbarToggle_default as NavbarToggle,
  Offcanvas_default as Offcanvas,
  OffcanvasBody_default as OffcanvasBody,
  OffcanvasHeader_default as OffcanvasHeader,
  OffcanvasTitle_default as OffcanvasTitle,
  OffcanvasToggling_default as OffcanvasToggling,
  Overlay_default2 as Overlay,
  OverlayTrigger_default as OverlayTrigger,
  PageItem_default as PageItem,
  Pagination_default as Pagination,
  Placeholder_default as Placeholder,
  PlaceholderButton_default as PlaceholderButton,
  Popover_default as Popover,
  PopoverBody_default as PopoverBody,
  PopoverHeader_default as PopoverHeader,
  ProgressBar_default as ProgressBar,
  Ratio_default as Ratio,
  Row_default as Row,
  SSRProvider_default as SSRProvider,
  Spinner_default as Spinner,
  SplitButton_default as SplitButton,
  Stack_default as Stack,
  Tab_default as Tab,
  TabContainer_default as TabContainer,
  TabContent_default as TabContent,
  TabPane_default as TabPane,
  Table_default as Table,
  Tabs_default2 as Tabs,
  ThemeProvider_default as ThemeProvider,
  Toast_default as Toast,
  ToastBody_default as ToastBody,
  ToastContainer_default as ToastContainer,
  ToastHeader_default as ToastHeader,
  ToggleButton_default as ToggleButton,
  ToggleButtonGroup_default as ToggleButtonGroup,
  Tooltip_default as Tooltip,
  useAccordionButton
};
//# sourceMappingURL=react-bootstrap.js.map
