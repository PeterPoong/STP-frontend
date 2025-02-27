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

// node_modules/react-bootstrap/esm/ButtonGroup.js
var import_classnames = __toESM(require_classnames());
var React = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ButtonGroup = React.forwardRef(({
  bsPrefix,
  size,
  vertical = false,
  className,
  role = "group",
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = "div",
  ...rest
}, ref) => {
  const prefix = useBootstrapPrefix(bsPrefix, "btn-group");
  let baseClass = prefix;
  if (vertical)
    baseClass = `${prefix}-vertical`;
  return (0, import_jsx_runtime.jsx)(Component, {
    ...rest,
    ref,
    role,
    className: (0, import_classnames.default)(className, baseClass, size && `${prefix}-${size}`)
  });
});
ButtonGroup.displayName = "ButtonGroup";
var ButtonGroup_default = ButtonGroup;

export {
  ButtonGroup_default
};
//# sourceMappingURL=chunk-3JCLF3TU.js.map
