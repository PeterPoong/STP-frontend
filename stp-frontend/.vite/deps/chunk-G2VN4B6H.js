import {
  arrow_default,
  computeStyles_default,
  eventListeners_default,
  flip_default,
  getNodeName,
  hide_default,
  init_arrow,
  init_computeStyles,
  init_createPopper,
  init_enums,
  init_eventListeners,
  init_flip,
  init_getNodeName,
  init_hide,
  init_instanceOf,
  init_offset,
  init_popperOffsets,
  init_preventOverflow,
  isHTMLElement,
  offset_default,
  popperGenerator,
  popperOffsets_default,
  preventOverflow_default
} from "./chunk-YR7MIILV.js";
import {
  __esm
} from "./chunk-2LSFTFF7.js";

// node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style = styleProperties.reduce(function(style2, property) {
        style2[property] = "";
        return style2;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default;
var init_applyStyles = __esm({
  "node_modules/@popperjs/core/lib/modifiers/applyStyles.js"() {
    init_getNodeName();
    init_instanceOf();
    applyStyles_default = {
      name: "applyStyles",
      enabled: true,
      phase: "write",
      fn: applyStyles,
      effect,
      requires: ["computeStyles"]
    };
  }
});

// node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers, createPopper;
var init_popper_lite = __esm({
  "node_modules/@popperjs/core/lib/popper-lite.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
    createPopper = popperGenerator({
      defaultModifiers
    });
  }
});

// node_modules/@popperjs/core/lib/modifiers/index.js
var init_modifiers = __esm({
  "node_modules/@popperjs/core/lib/modifiers/index.js"() {
    init_applyStyles();
    init_arrow();
    init_computeStyles();
    init_eventListeners();
    init_flip();
    init_hide();
    init_offset();
    init_popperOffsets();
    init_preventOverflow();
  }
});

// node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2, createPopper2;
var init_popper = __esm({
  "node_modules/@popperjs/core/lib/popper.js"() {
    init_createPopper();
    init_eventListeners();
    init_popperOffsets();
    init_computeStyles();
    init_applyStyles();
    init_offset();
    init_flip();
    init_preventOverflow();
    init_arrow();
    init_hide();
    init_popper_lite();
    init_modifiers();
    defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
    createPopper2 = popperGenerator({
      defaultModifiers: defaultModifiers2
    });
  }
});

// node_modules/@popperjs/core/lib/index.js
var init_lib = __esm({
  "node_modules/@popperjs/core/lib/index.js"() {
    init_enums();
    init_modifiers();
    init_createPopper();
    init_popper();
    init_popper_lite();
  }
});

export {
  createPopper2 as createPopper,
  init_lib
};
//# sourceMappingURL=chunk-G2VN4B6H.js.map
