import {
  NavLink_default
} from "./chunk-FS6WB5YY.js";
import {
  Dropdown_default
} from "./chunk-SBUBINK7.js";
import {
  require_classnames,
  useBootstrapPrefix
} from "./chunk-V45P6XYM.js";
import {
  require_jsx_runtime
} from "./chunk-43ZI66F5.js";
import {
  require_react
} from "./chunk-2RGQL2JM.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/react-bootstrap/esm/NavDropdown.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var NavDropdown = React.forwardRef(({
  id,
  title,
  children,
  bsPrefix,
  className,
  rootCloseEvent,
  menuRole,
  disabled,
  active,
  renderMenuOnMount,
  menuVariant,
  ...props
}, ref) => {
  const navItemPrefix = useBootstrapPrefix(void 0, "nav-item");
  return (0, import_jsx_runtime2.jsxs)(Dropdown_default, {
    ref,
    ...props,
    className: (0, import_classnames.default)(className, navItemPrefix),
    children: [(0, import_jsx_runtime.jsx)(Dropdown_default.Toggle, {
      id,
      eventKey: null,
      active,
      disabled,
      childBsPrefix: bsPrefix,
      as: NavLink_default,
      children: title
    }), (0, import_jsx_runtime.jsx)(Dropdown_default.Menu, {
      role: menuRole,
      renderOnMount: renderMenuOnMount,
      rootCloseEvent,
      variant: menuVariant,
      children
    })]
  });
});
NavDropdown.displayName = "NavDropdown";
var NavDropdown_default = Object.assign(NavDropdown, {
  Item: Dropdown_default.Item,
  ItemText: Dropdown_default.ItemText,
  Divider: Dropdown_default.Divider,
  Header: Dropdown_default.Header
});

export {
  NavDropdown_default
};
//# sourceMappingURL=chunk-PXNMGZMN.js.map
