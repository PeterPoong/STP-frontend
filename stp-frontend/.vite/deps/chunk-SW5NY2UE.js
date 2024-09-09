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

// node_modules/react-bootstrap/esm/Container.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var Container = React.forwardRef(({
  bsPrefix,
  fluid = false,
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  className,
  ...props
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "container");
  const suffix = typeof fluid === "string" ? `-${fluid}` : "-fluid";
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    ...props,
    className: (0, import_classnames.default)(className, fluid ? `${prefix}${suffix}` : prefix)
  });
});
Container.displayName = "Container";
var Container_default = Container;

export {
  Container_default
};
//# sourceMappingURL=chunk-SW5NY2UE.js.map
