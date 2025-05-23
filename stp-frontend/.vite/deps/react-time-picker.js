import {
  esm_default,
  getHours,
  getHoursMinutes,
  getHoursMinutesSeconds,
  getMilliseconds,
  getMinutes,
  getSeconds
} from "./chunk-C6GN64RH.js";
import {
  require_warning
} from "./chunk-J5P6RILA.js";
import {
  clsx_default,
  init_clsx
} from "./chunk-CQOQLQ5M.js";
import {
  require_jsx_runtime
} from "./chunk-43ZI66F5.js";
import {
  require_react_dom
} from "./chunk-ISY3SE76.js";
import {
  require_react
} from "./chunk-2RGQL2JM.js";
import {
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/react-time-picker/dist/esm/TimePicker.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var import_react6 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/make-event-props/dist/esm/index.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var clipboardEvents = ["onCopy", "onCut", "onPaste"];
var compositionEvents = [
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate"
];
var focusEvents = ["onFocus", "onBlur"];
var formEvents = ["onInput", "onInvalid", "onReset", "onSubmit"];
var imageEvents = ["onLoad", "onError"];
var keyboardEvents = ["onKeyDown", "onKeyPress", "onKeyUp"];
var mediaEvents = [
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onError",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting"
];
var mouseEvents = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp"
];
var dragEvents = [
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop"
];
var selectionEvents = ["onSelect"];
var touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
var pointerEvents = [
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut"
];
var uiEvents = ["onScroll"];
var wheelEvents = ["onWheel"];
var animationEvents = [
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration"
];
var transitionEvents = ["onTransitionEnd"];
var otherEvents = ["onToggle"];
var changeEvents = ["onChange"];
var allEvents = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], clipboardEvents, true), compositionEvents, true), focusEvents, true), formEvents, true), imageEvents, true), keyboardEvents, true), mediaEvents, true), mouseEvents, true), dragEvents, true), selectionEvents, true), touchEvents, true), pointerEvents, true), uiEvents, true), wheelEvents, true), animationEvents, true), transitionEvents, true), changeEvents, true), otherEvents, true);
function makeEventProps(props, getArgs) {
  var eventProps = {};
  allEvents.forEach(function(eventName) {
    var eventHandler = props[eventName];
    if (!eventHandler) {
      return;
    }
    if (getArgs) {
      eventProps[eventName] = function(event) {
        return eventHandler(event, getArgs(eventName));
      };
    } else {
      eventProps[eventName] = eventHandler;
    }
  });
  return eventProps;
}

// node_modules/react-time-picker/dist/esm/TimePicker.js
init_clsx();

// node_modules/react-clock/dist/esm/Clock.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
init_clsx();

// node_modules/react-clock/dist/esm/Hand.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Hand(_a) {
  var _b = _a.angle, angle = _b === void 0 ? 0 : _b, name = _a.name, _c = _a.length, length = _c === void 0 ? 100 : _c, _d = _a.oppositeLength, oppositeLength = _d === void 0 ? 10 : _d, _e = _a.width, width = _e === void 0 ? 1 : _e;
  return (0, import_jsx_runtime.jsx)("div", { className: "react-clock__hand react-clock__".concat(name, "-hand"), style: {
    transform: "rotate(".concat(angle, "deg)")
  }, children: (0, import_jsx_runtime.jsx)("div", { className: "react-clock__hand__body react-clock__".concat(name, "-hand__body"), style: {
    width: "".concat(width, "px"),
    top: "".concat(50 - length / 2, "%"),
    bottom: "".concat(50 - oppositeLength / 2, "%")
  } }) });
}

// node_modules/react-clock/dist/esm/MinuteMark.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);

// node_modules/react-clock/dist/esm/Mark.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function Mark(_a) {
  var _b = _a.angle, angle = _b === void 0 ? 0 : _b, _c = _a.length, length = _c === void 0 ? 10 : _c, name = _a.name, _d = _a.width, width = _d === void 0 ? 1 : _d, number = _a.number;
  return (0, import_jsx_runtime2.jsxs)("div", { className: "react-clock__mark react-clock__".concat(name, "-mark"), style: {
    transform: "rotate(".concat(angle, "deg)")
  }, children: [(0, import_jsx_runtime2.jsx)("div", { className: "react-clock__mark__body react-clock__".concat(name, "-mark__body"), style: {
    width: "".concat(width, "px"),
    top: 0,
    bottom: "".concat(100 - length / 2, "%")
  } }), number ? (0, import_jsx_runtime2.jsx)("div", { className: "react-clock__mark__number", style: {
    transform: "rotate(-".concat(angle, "deg)"),
    top: "".concat(length / 2, "%")
  }, children: number }) : null] });
}

// node_modules/react-clock/dist/esm/MinuteMark.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var MinuteMark = (0, import_react.memo)(function MinuteMark2(props) {
  return (0, import_jsx_runtime3.jsx)(Mark, __assign({}, props));
});
var MinuteMark_default = MinuteMark;

// node_modules/react-clock/dist/esm/HourMark.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var import_react2 = __toESM(require_react(), 1);

// node_modules/react-clock/dist/esm/shared/hourFormatter.js
function formatHour(locale, hour) {
  return hour.toLocaleString(locale || esm_default() || void 0);
}

// node_modules/react-clock/dist/esm/HourMark.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var HourMark = (0, import_react2.memo)(function HourMark2(_a) {
  var _b = _a.formatHour, formatHour2 = _b === void 0 ? formatHour : _b, locale = _a.locale, number = _a.number, otherProps = __rest(_a, ["formatHour", "locale", "number"]);
  return (0, import_jsx_runtime4.jsx)(Mark, __assign2({ number: number ? formatHour2(locale, number) : null }, otherProps));
});
var HourMark_default = HourMark;

// node_modules/react-clock/dist/esm/Clock.js
function Clock(_a) {
  var className = _a.className, formatHour2 = _a.formatHour, _b = _a.hourHandLength, hourHandLength = _b === void 0 ? 50 : _b, hourHandOppositeLength = _a.hourHandOppositeLength, _c = _a.hourHandWidth, hourHandWidth = _c === void 0 ? 4 : _c, _d = _a.hourMarksLength, hourMarksLength = _d === void 0 ? 10 : _d, _e = _a.hourMarksWidth, hourMarksWidth = _e === void 0 ? 3 : _e, locale = _a.locale, _f = _a.minuteHandLength, minuteHandLength = _f === void 0 ? 70 : _f, minuteHandOppositeLength = _a.minuteHandOppositeLength, _g = _a.minuteHandWidth, minuteHandWidth = _g === void 0 ? 2 : _g, _h = _a.minuteMarksLength, minuteMarksLength = _h === void 0 ? 6 : _h, _j = _a.minuteMarksWidth, minuteMarksWidth = _j === void 0 ? 1 : _j, _k = _a.renderHourMarks, renderHourMarks = _k === void 0 ? true : _k, _l = _a.renderMinuteHand, renderMinuteHand = _l === void 0 ? true : _l, _m = _a.renderMinuteMarks, renderMinuteMarks = _m === void 0 ? true : _m, renderNumbers = _a.renderNumbers, _o = _a.renderSecondHand, renderSecondHand = _o === void 0 ? true : _o, _p = _a.secondHandLength, secondHandLength = _p === void 0 ? 90 : _p, secondHandOppositeLength = _a.secondHandOppositeLength, _q = _a.secondHandWidth, secondHandWidth = _q === void 0 ? 1 : _q, _r = _a.size, size = _r === void 0 ? 150 : _r, useMillisecondPrecision = _a.useMillisecondPrecision, value = _a.value;
  function renderMinuteMarksFn() {
    if (!renderMinuteMarks) {
      return null;
    }
    var minuteMarks = [];
    for (var i = 1; i <= 60; i += 1) {
      var isHourMark = renderHourMarks && !(i % 5);
      if (!isHourMark) {
        minuteMarks.push((0, import_jsx_runtime5.jsx)(MinuteMark_default, { angle: i * 6, length: minuteMarksLength, name: "minute", width: minuteMarksWidth }, "minute_".concat(i)));
      }
    }
    return minuteMarks;
  }
  function renderHourMarksFn() {
    if (!renderHourMarks) {
      return null;
    }
    var hourMarks = [];
    for (var i = 1; i <= 12; i += 1) {
      hourMarks.push((0, import_jsx_runtime5.jsx)(HourMark_default, { angle: i * 30, formatHour: formatHour2, length: hourMarksLength, locale, name: "hour", number: renderNumbers ? i : void 0, width: hourMarksWidth }, "hour_".concat(i)));
    }
    return hourMarks;
  }
  function renderFace() {
    return (0, import_jsx_runtime5.jsxs)("div", { className: "react-clock__face", children: [renderMinuteMarksFn(), renderHourMarksFn()] });
  }
  function renderHourHandFn() {
    var angle = value ? getHours(value) * 30 + getMinutes(value) / 2 + getSeconds(value) / 120 + (useMillisecondPrecision ? getMilliseconds(value) / 12e4 : 0) : 0;
    return (0, import_jsx_runtime5.jsx)(Hand, { angle, length: hourHandLength, name: "hour", oppositeLength: hourHandOppositeLength, width: hourHandWidth });
  }
  function renderMinuteHandFn() {
    if (!renderMinuteHand) {
      return null;
    }
    var angle = value ? getHours(value) * 360 + getMinutes(value) * 6 + getSeconds(value) / 10 + (useMillisecondPrecision ? getMilliseconds(value) / 1e4 : 0) : 0;
    return (0, import_jsx_runtime5.jsx)(Hand, { angle, length: minuteHandLength, name: "minute", oppositeLength: minuteHandOppositeLength, width: minuteHandWidth });
  }
  function renderSecondHandFn() {
    if (!renderSecondHand) {
      return null;
    }
    var angle = value ? getMinutes(value) * 360 + getSeconds(value) * 6 + (useMillisecondPrecision ? getMilliseconds(value) * 6e-3 : 0) : 0;
    return (0, import_jsx_runtime5.jsx)(Hand, { angle, length: secondHandLength, name: "second", oppositeLength: secondHandOppositeLength, width: secondHandWidth });
  }
  return (0, import_jsx_runtime5.jsxs)("time", { className: clsx_default("react-clock", className), dateTime: value instanceof Date ? value.toISOString() : value || void 0, style: {
    width: size,
    height: size
  }, children: [renderFace(), renderHourHandFn(), renderMinuteHandFn(), renderSecondHandFn()] });
}

// node_modules/react-clock/dist/esm/index.js
var esm_default2 = Clock;

// node_modules/react-fit/dist/esm/Fit.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var import_react3 = __toESM(require_react(), 1);

// node_modules/detect-element-overflow/dist/esm/index.js
function getRect(element) {
  return element.getBoundingClientRect();
}
function detectElementOverflow(element, container) {
  return {
    get collidedTop() {
      return getRect(element).top < getRect(container).top;
    },
    get collidedBottom() {
      return getRect(element).bottom > getRect(container).bottom;
    },
    get collidedLeft() {
      return getRect(element).left < getRect(container).left;
    },
    get collidedRight() {
      return getRect(element).right > getRect(container).right;
    },
    get overflowTop() {
      return getRect(container).top - getRect(element).top;
    },
    get overflowBottom() {
      return getRect(element).bottom - getRect(container).bottom;
    },
    get overflowLeft() {
      return getRect(container).left - getRect(element).left;
    },
    get overflowRight() {
      return getRect(element).right - getRect(container).right;
    }
  };
}

// node_modules/react-fit/dist/esm/Fit.js
var import_warning = __toESM(require_warning(), 1);
var __assign3 = function() {
  __assign3 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign3.apply(this, arguments);
};
var __rest2 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var isBrowser = typeof document !== "undefined";
var isMutationObserverSupported = isBrowser && "MutationObserver" in window;
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function findScrollContainer(element) {
  var parent = element.parentElement;
  while (parent) {
    var overflow = window.getComputedStyle(parent).overflow;
    if (overflow.split(" ").every(function(o) {
      return o === "auto" || o === "scroll";
    })) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}
function alignAxis(_a) {
  var axis = _a.axis, container = _a.container, element = _a.element, invertAxis = _a.invertAxis, scrollContainer = _a.scrollContainer, secondary = _a.secondary, spacing = _a.spacing;
  var style = window.getComputedStyle(element);
  var parent = container.parentElement;
  if (!parent) {
    return;
  }
  var scrollContainerCollisions = detectElementOverflow(parent, scrollContainer);
  var documentCollisions = detectElementOverflow(parent, document.documentElement);
  var isX = axis === "x";
  var startProperty = isX ? "left" : "top";
  var endProperty = isX ? "right" : "bottom";
  var sizeProperty = isX ? "width" : "height";
  var overflowStartProperty = "overflow".concat(capitalize(startProperty));
  var overflowEndProperty = "overflow".concat(capitalize(endProperty));
  var scrollProperty = "scroll".concat(capitalize(startProperty));
  var uppercasedSizeProperty = capitalize(sizeProperty);
  var offsetSizeProperty = "offset".concat(uppercasedSizeProperty);
  var clientSizeProperty = "client".concat(uppercasedSizeProperty);
  var minSizeProperty = "min-".concat(sizeProperty);
  var scrollbarWidth = scrollContainer[offsetSizeProperty] - scrollContainer[clientSizeProperty];
  var startSpacing = typeof spacing === "object" ? spacing[startProperty] : spacing;
  var availableStartSpace = -Math.max(scrollContainerCollisions[overflowStartProperty], documentCollisions[overflowStartProperty] + document.documentElement[scrollProperty]) - startSpacing;
  var endSpacing = typeof spacing === "object" ? spacing[endProperty] : spacing;
  var availableEndSpace = -Math.max(scrollContainerCollisions[overflowEndProperty], documentCollisions[overflowEndProperty] - document.documentElement[scrollProperty]) - endSpacing - scrollbarWidth;
  if (secondary) {
    availableStartSpace += parent[clientSizeProperty];
    availableEndSpace += parent[clientSizeProperty];
  }
  var offsetSize = element[offsetSizeProperty];
  function displayStart() {
    element.style[startProperty] = "auto";
    element.style[endProperty] = secondary ? "0" : "100%";
  }
  function displayEnd() {
    element.style[startProperty] = secondary ? "0" : "100%";
    element.style[endProperty] = "auto";
  }
  function displayIfFits(availableSpace, display) {
    var fits2 = offsetSize <= availableSpace;
    if (fits2) {
      display();
    }
    return fits2;
  }
  function displayStartIfFits() {
    return displayIfFits(availableStartSpace, displayStart);
  }
  function displayEndIfFits() {
    return displayIfFits(availableEndSpace, displayEnd);
  }
  function displayWhereverShrinkedFits() {
    var moreSpaceStart = availableStartSpace > availableEndSpace;
    var rawMinSize = style.getPropertyValue(minSizeProperty);
    var minSize = rawMinSize ? parseInt(rawMinSize, 10) : null;
    function shrinkToSize(size) {
      (0, import_warning.default)(!minSize || size >= minSize, "<Fit />'s child will not fit anywhere with its current ".concat(minSizeProperty, " of ").concat(minSize, "px."));
      var newSize = Math.max(size, minSize || 0);
      (0, import_warning.default)(false, "<Fit />'s child needed to have its ".concat(sizeProperty, " decreased to ").concat(newSize, "px."));
      element.style[sizeProperty] = "".concat(newSize, "px");
    }
    if (moreSpaceStart) {
      shrinkToSize(availableStartSpace);
      displayStart();
    } else {
      shrinkToSize(availableEndSpace);
      displayEnd();
    }
  }
  var fits;
  if (invertAxis) {
    fits = displayStartIfFits() || displayEndIfFits();
  } else {
    fits = displayEndIfFits() || displayStartIfFits();
  }
  if (!fits) {
    displayWhereverShrinkedFits();
  }
}
function alignMainAxis(args) {
  alignAxis(args);
}
function alignSecondaryAxis(args) {
  alignAxis(__assign3(__assign3({}, args), { axis: args.axis === "x" ? "y" : "x", secondary: true }));
}
function alignBothAxis(args) {
  var invertAxis = args.invertAxis, invertSecondaryAxis = args.invertSecondaryAxis, commonArgs = __rest2(args, ["invertAxis", "invertSecondaryAxis"]);
  alignMainAxis(__assign3(__assign3({}, commonArgs), { invertAxis }));
  alignSecondaryAxis(__assign3(__assign3({}, commonArgs), { invertAxis: invertSecondaryAxis }));
}
function Fit(_a) {
  var children = _a.children, invertAxis = _a.invertAxis, invertSecondaryAxis = _a.invertSecondaryAxis, _b = _a.mainAxis, mainAxis = _b === void 0 ? "y" : _b, _c = _a.spacing, spacing = _c === void 0 ? 8 : _c;
  var container = (0, import_react3.useRef)(void 0);
  var element = (0, import_react3.useRef)(void 0);
  var elementWidth = (0, import_react3.useRef)(void 0);
  var elementHeight = (0, import_react3.useRef)(void 0);
  var scrollContainer = (0, import_react3.useRef)(void 0);
  var fit = (0, import_react3.useCallback)(function() {
    if (!scrollContainer.current || !container.current || !element.current) {
      return;
    }
    var currentElementWidth = element.current.clientWidth;
    var currentElementHeight = element.current.clientHeight;
    if (elementWidth.current === currentElementWidth && elementHeight.current === currentElementHeight) {
      return;
    }
    elementWidth.current = currentElementWidth;
    elementHeight.current = currentElementHeight;
    var parent = container.current.parentElement;
    if (!parent) {
      return;
    }
    var style = window.getComputedStyle(element.current);
    var position = style.position;
    if (position !== "absolute") {
      element.current.style.position = "absolute";
    }
    var parentStyle = window.getComputedStyle(parent);
    var parentPosition = parentStyle.position;
    if (parentPosition !== "relative" && parentPosition !== "absolute") {
      parent.style.position = "relative";
    }
    alignBothAxis({
      axis: mainAxis,
      container: container.current,
      element: element.current,
      invertAxis,
      invertSecondaryAxis,
      scrollContainer: scrollContainer.current,
      spacing
    });
  }, [invertAxis, invertSecondaryAxis, mainAxis, spacing]);
  var child = import_react3.Children.only(children);
  (0, import_react3.useEffect)(function() {
    fit();
    function onMutation() {
      fit();
    }
    if (isMutationObserverSupported && element.current) {
      var mutationObserver = new MutationObserver(onMutation);
      mutationObserver.observe(element.current, {
        attributes: true,
        attributeFilter: ["class", "style"]
      });
    }
  }, [fit]);
  function assignRefs(domElement) {
    if (!domElement || !(domElement instanceof HTMLElement)) {
      return;
    }
    element.current = domElement;
    scrollContainer.current = findScrollContainer(domElement);
  }
  return (0, import_jsx_runtime6.jsx)("span", { ref: function(domContainer) {
    if (!domContainer) {
      return;
    }
    container.current = domContainer;
    var domElement = domContainer === null || domContainer === void 0 ? void 0 : domContainer.firstElementChild;
    assignRefs(domElement);
  }, style: { display: "contents" }, children: child });
}

// node_modules/react-fit/dist/esm/index.js
var esm_default3 = Fit;

// node_modules/react-time-picker/dist/esm/TimeInput.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var import_react5 = __toESM(require_react(), 1);

// node_modules/react-time-picker/dist/esm/Divider.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function Divider(_a) {
  var children = _a.children;
  return (0, import_jsx_runtime7.jsx)("span", { className: "react-time-picker__inputGroup__divider", children });
}

// node_modules/react-time-picker/dist/esm/TimeInput/Hour12Input.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-time-picker/dist/esm/TimeInput/Input.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var import_react4 = __toESM(require_react(), 1);
init_clsx();

// node_modules/update-input-width/dist/esm/index.js
var allowedVariants = ["normal", "small-caps"];
function getFontShorthand(element) {
  if (!element) {
    return "";
  }
  var style = window.getComputedStyle(element);
  if (style.font) {
    return style.font;
  }
  var isFontDefined = style.fontFamily !== "";
  if (!isFontDefined) {
    return "";
  }
  var fontVariant = allowedVariants.includes(style.fontVariant) ? style.fontVariant : "normal";
  return "".concat(style.fontStyle, " ").concat(fontVariant, " ").concat(style.fontWeight, " ").concat(style.fontSize, " / ").concat(style.lineHeight, " ").concat(style.fontFamily);
}
var cachedCanvas;
function measureText(text, font) {
  var canvas = cachedCanvas || (cachedCanvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  context.font = font;
  var width = context.measureText(text).width;
  return Math.ceil(width);
}
function updateInputWidth(element) {
  if (typeof document === "undefined" || !element) {
    return null;
  }
  var font = getFontShorthand(element);
  var text = element.value || element.placeholder;
  var width = measureText(text, font);
  if (width === null) {
    return null;
  }
  element.style.width = "".concat(width, "px");
  return width;
}
var esm_default4 = updateInputWidth;

// node_modules/react-time-picker/dist/esm/TimeInput/Input.js
var isBrowser2 = typeof document !== "undefined";
var useIsomorphicLayoutEffect = isBrowser2 ? import_react4.useLayoutEffect : import_react4.useEffect;
var isIEOrEdgeLegacy = isBrowser2 && /(MSIE|Trident\/|Edge\/)/.test(navigator.userAgent);
var isFirefox = isBrowser2 && /Firefox/.test(navigator.userAgent);
function onFocus(event) {
  var target = event.target;
  if (isIEOrEdgeLegacy) {
    requestAnimationFrame(function() {
      return target.select();
    });
  } else {
    target.select();
  }
}
function updateInputWidthOnLoad(element) {
  if (document.readyState === "complete") {
    return;
  }
  function onLoad() {
    esm_default4(element);
  }
  window.addEventListener("load", onLoad);
}
function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }
  var font = getFontShorthand(element);
  if (!font) {
    return;
  }
  var isFontLoaded = document.fonts.check(font);
  if (isFontLoaded) {
    return;
  }
  function onLoadingDone() {
    esm_default4(element);
  }
  document.fonts.addEventListener("loadingdone", onLoadingDone);
}
function getSelectionString(input) {
  if (input && "selectionStart" in input && input.selectionStart !== null && "selectionEnd" in input && input.selectionEnd !== null) {
    return input.value.slice(input.selectionStart, input.selectionEnd);
  }
  if ("getSelection" in window) {
    var selection = window.getSelection();
    return selection && selection.toString();
  }
  return null;
}
function makeOnKeyPress(maxLength) {
  if (maxLength === null) {
    return void 0;
  }
  return function onKeyPress(event) {
    if (isFirefox) {
      return;
    }
    var key = event.key, input = event.target;
    var value = input.value;
    var isNumberKey = key.length === 1 && /\d/.test(key);
    var selection = getSelectionString(input);
    if (!isNumberKey || !(selection || value.length < maxLength)) {
      event.preventDefault();
    }
  };
}
function Input(_a) {
  var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, max = _a.max, min = _a.min, name = _a.name, nameForClass = _a.nameForClass, onChange = _a.onChange, onKeyDown = _a.onKeyDown, onKeyUp = _a.onKeyUp, _b = _a.placeholder, placeholder = _b === void 0 ? "--" : _b, required = _a.required, showLeadingZeros = _a.showLeadingZeros, step = _a.step, value = _a.value;
  useIsomorphicLayoutEffect(function() {
    if (!inputRef || !inputRef.current) {
      return;
    }
    esm_default4(inputRef.current);
    updateInputWidthOnLoad(inputRef.current);
    updateInputWidthOnFontLoad(inputRef.current);
  }, [inputRef, value]);
  var hasLeadingZero = showLeadingZeros && value && Number(value) < 10 && (value === "0" || !value.toString().startsWith("0"));
  var maxLength = max ? max.toString().length : null;
  return (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [hasLeadingZero ? (0, import_jsx_runtime8.jsx)("span", { className: "".concat(className, "__leadingZero"), children: "0" }) : null, (0, import_jsx_runtime8.jsx)("input", {
    "aria-label": ariaLabel,
    autoComplete: "off",
    autoFocus,
    className: clsx_default("".concat(className, "__input"), "".concat(className, "__").concat(nameForClass || name), hasLeadingZero && "".concat(className, "__input--hasLeadingZero")),
    "data-input": "true",
    disabled,
    inputMode: "numeric",
    max,
    min,
    name,
    onChange,
    onFocus,
    onKeyDown,
    onKeyPress: makeOnKeyPress(maxLength),
    onKeyUp: function(event) {
      esm_default4(event.target);
      if (onKeyUp) {
        onKeyUp(event);
      }
    },
    placeholder,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required,
    step,
    type: "number",
    value: value !== null ? value : ""
  })] });
}

// node_modules/react-time-picker/dist/esm/shared/dates.js
function convert12to24(hour12, amPm) {
  var hour24 = Number(hour12);
  if (amPm === "am" && hour24 === 12) {
    hour24 = 0;
  } else if (amPm === "pm" && hour24 < 12) {
    hour24 += 12;
  }
  return hour24;
}
function convert24to12(hour24) {
  var hour12 = Number(hour24) % 12 || 12;
  return [hour12, Number(hour24) < 12 ? "am" : "pm"];
}

// node_modules/react-time-picker/dist/esm/shared/dateFormatter.js
var formatterCache = /* @__PURE__ */ new Map();
function getFormatter(options) {
  return function formatter(locale, date) {
    var localeWithDefault = locale || esm_default();
    if (!formatterCache.has(localeWithDefault)) {
      formatterCache.set(localeWithDefault, /* @__PURE__ */ new Map());
    }
    var formatterCacheLocale = formatterCache.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || void 0, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
var numberFormatterCache = /* @__PURE__ */ new Map();
function getNumberFormatter(options) {
  return function(locale, number) {
    var localeWithDefault = locale || esm_default();
    if (!numberFormatterCache.has(localeWithDefault)) {
      numberFormatterCache.set(localeWithDefault, /* @__PURE__ */ new Map());
    }
    var numberFormatterCacheLocale = numberFormatterCache.get(localeWithDefault);
    if (!numberFormatterCacheLocale.has(options)) {
      numberFormatterCacheLocale.set(options, new Intl.NumberFormat(localeWithDefault || void 0, options).format);
    }
    return numberFormatterCacheLocale.get(options)(number);
  };
}

// node_modules/react-time-picker/dist/esm/shared/utils.js
var nines = ["9", "٩"];
var ninesRegExp = new RegExp("[".concat(nines.join(""), "]"));
var amPmFormatter = getFormatter({ hour: "numeric" });
function getAmPmLabels(locale) {
  var amString = amPmFormatter(locale, new Date(2017, 0, 1, 9));
  var pmString = amPmFormatter(locale, new Date(2017, 0, 1, 21));
  var _a = amString.split(ninesRegExp), am1 = _a[0], am2 = _a[1];
  var _b = pmString.split(ninesRegExp), pm1 = _b[0], pm2 = _b[1];
  if (pm2 !== void 0) {
    if (am1 !== pm1) {
      return [am1, pm1].map(function(el) {
        return el.trim();
      });
    }
    if (am2 !== pm2) {
      return [am2, pm2].map(function(el) {
        return el.trim();
      });
    }
  }
  return ["AM", "PM"];
}
function isValidNumber(num) {
  return num !== null && num !== false && !Number.isNaN(Number(num));
}
function safeMin() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Math.min.apply(Math, args.filter(isValidNumber));
}
function safeMax() {
  var args = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }
  return Math.max.apply(Math, args.filter(isValidNumber));
}

// node_modules/react-time-picker/dist/esm/TimeInput/Hour12Input.js
var __assign4 = function() {
  __assign4 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign4.apply(this, arguments);
};
var __rest3 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Hour12Input(_a) {
  var amPm = _a.amPm, maxTime = _a.maxTime, minTime = _a.minTime, value = _a.value, otherProps = __rest3(_a, ["amPm", "maxTime", "minTime", "value"]);
  var maxHour = safeMin(12, maxTime && function() {
    var _a2 = convert24to12(getHours(maxTime)), maxHourResult = _a2[0], maxAmPm = _a2[1];
    if (maxAmPm !== amPm) {
      return null;
    }
    return maxHourResult;
  }());
  var minHour = safeMax(1, minTime && function() {
    var _a2 = convert24to12(getHours(minTime)), minHourResult = _a2[0], minAmPm = _a2[1];
    if (
      // pm is always after am, so we should ignore validation
      minAmPm !== amPm || // If minHour is 12 am/pm, user should be able to enter 12, 1, ..., 11.
      minHourResult === 12
    ) {
      return null;
    }
    return minHourResult;
  }());
  var value12 = value ? convert24to12(value)[0].toString() : "";
  return (0, import_jsx_runtime9.jsx)(Input, __assign4({ max: maxHour, min: minHour, name: "hour12", nameForClass: "hour", value: value12 }, otherProps));
}

// node_modules/react-time-picker/dist/esm/TimeInput/Hour24Input.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var __assign5 = function() {
  __assign5 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign5.apply(this, arguments);
};
var __rest4 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Hour24Input(_a) {
  var maxTime = _a.maxTime, minTime = _a.minTime, otherProps = __rest4(_a, ["maxTime", "minTime"]);
  var maxHour = safeMin(23, maxTime && getHours(maxTime));
  var minHour = safeMax(0, minTime && getHours(minTime));
  return (0, import_jsx_runtime10.jsx)(Input, __assign5({ max: maxHour, min: minHour, name: "hour24", nameForClass: "hour" }, otherProps));
}

// node_modules/react-time-picker/dist/esm/TimeInput/MinuteInput.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var __assign6 = function() {
  __assign6 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign6.apply(this, arguments);
};
var __rest5 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function MinuteInput(_a) {
  var hour = _a.hour, maxTime = _a.maxTime, minTime = _a.minTime, _b = _a.showLeadingZeros, showLeadingZeros = _b === void 0 ? true : _b, otherProps = __rest5(_a, ["hour", "maxTime", "minTime", "showLeadingZeros"]);
  function isSameHour(date) {
    return hour === getHours(date).toString();
  }
  var maxMinute = safeMin(59, maxTime && isSameHour(maxTime) && getMinutes(maxTime));
  var minMinute = safeMax(0, minTime && isSameHour(minTime) && getMinutes(minTime));
  return (0, import_jsx_runtime11.jsx)(Input, __assign6({ max: maxMinute, min: minMinute, name: "minute", showLeadingZeros }, otherProps));
}

// node_modules/react-time-picker/dist/esm/TimeInput/SecondInput.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var __assign7 = function() {
  __assign7 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign7.apply(this, arguments);
};
var __rest6 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function SecondInput(_a) {
  var hour = _a.hour, maxTime = _a.maxTime, minTime = _a.minTime, minute = _a.minute, _b = _a.showLeadingZeros, showLeadingZeros = _b === void 0 ? true : _b, otherProps = __rest6(_a, ["hour", "maxTime", "minTime", "minute", "showLeadingZeros"]);
  function isSameMinute(date) {
    return hour === getHours(date).toString() && minute === getMinutes(date).toString();
  }
  var maxSecond = safeMin(59, maxTime && isSameMinute(maxTime) && getSeconds(maxTime));
  var minSecond = safeMax(0, minTime && isSameMinute(minTime) && getSeconds(minTime));
  return (0, import_jsx_runtime12.jsx)(Input, __assign7({ max: maxSecond, min: minSecond, name: "second", showLeadingZeros }, otherProps));
}

// node_modules/react-time-picker/dist/esm/TimeInput/NativeInput.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
function NativeInput(_a) {
  var ariaLabel = _a.ariaLabel, disabled = _a.disabled, maxTime = _a.maxTime, minTime = _a.minTime, name = _a.name, onChange = _a.onChange, required = _a.required, value = _a.value, valueType = _a.valueType;
  var nativeValueParser = function() {
    switch (valueType) {
      case "hour":
        return function(receivedValue) {
          return "".concat(getHours(receivedValue), ":00");
        };
      case "minute":
        return getHoursMinutes;
      case "second":
        return getHoursMinutesSeconds;
      default:
        throw new Error("Invalid valueType");
    }
  }();
  var step = function() {
    switch (valueType) {
      case "hour":
        return 3600;
      case "minute":
        return 60;
      case "second":
        return 1;
      default:
        throw new Error("Invalid valueType");
    }
  }();
  function stopPropagation(event) {
    event.stopPropagation();
  }
  return (0, import_jsx_runtime13.jsx)("input", { "aria-label": ariaLabel, disabled, hidden: true, max: maxTime ? nativeValueParser(maxTime) : void 0, min: minTime ? nativeValueParser(minTime) : void 0, name, onChange, onFocus: stopPropagation, required, step, style: {
    visibility: "hidden",
    position: "absolute",
    zIndex: "-999"
  }, type: "time", value: value ? nativeValueParser(value) : "" });
}

// node_modules/react-time-picker/dist/esm/TimeInput/AmPm.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
init_clsx();
function AmPm(_a) {
  var ariaLabel = _a.ariaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, inputRef = _a.inputRef, locale = _a.locale, maxTime = _a.maxTime, minTime = _a.minTime, onChange = _a.onChange, onKeyDown = _a.onKeyDown, required = _a.required, value = _a.value;
  var amDisabled = minTime ? convert24to12(getHours(minTime))[1] === "pm" : false;
  var pmDisabled = maxTime ? convert24to12(getHours(maxTime))[1] === "am" : false;
  var name = "amPm";
  var _b = getAmPmLabels(locale), amLabel = _b[0], pmLabel = _b[1];
  return (0, import_jsx_runtime14.jsxs)("select", {
    "aria-label": ariaLabel,
    autoFocus,
    className: clsx_default("".concat(className, "__input"), "".concat(className, "__").concat(name)),
    "data-input": "true",
    "data-select": "true",
    disabled,
    name,
    onChange,
    onKeyDown,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required,
    value: value !== null ? value : "",
    children: [!value && (0, import_jsx_runtime14.jsx)("option", { value: "", children: "--" }), (0, import_jsx_runtime14.jsx)("option", { disabled: amDisabled, value: "am", children: amLabel }), (0, import_jsx_runtime14.jsx)("option", { disabled: pmDisabled, value: "pm", children: pmLabel })]
  });
}

// node_modules/react-time-picker/dist/esm/TimeInput.js
var __assign8 = function() {
  __assign8 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign8.apply(this, arguments);
};
var getFormatterOptionsCache = {};
var allViews = ["hour", "minute", "second"];
function isInternalInput(element) {
  return element.dataset.input === "true";
}
function findInput(element, property) {
  var nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}
function focus(element) {
  if (element) {
    element.focus();
  }
}
function renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
  var usedFunctions = [];
  var pattern = new RegExp(Object.keys(elementFunctions).map(function(el) {
    return "".concat(el, "+");
  }).join("|"), "g");
  var matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce(function(arr, element, index) {
    var divider = element && // eslint-disable-next-line react/no-array-index-key
    (0, import_jsx_runtime15.jsx)(Divider, { children: element }, "separator_".concat(index));
    arr.push(divider);
    var currentMatch = matches && matches[index];
    if (currentMatch) {
      var renderFunction = elementFunctions[currentMatch] || elementFunctions[Object.keys(elementFunctions).find(function(elementFunction) {
        return currentMatch.match(elementFunction);
      })];
      if (!renderFunction) {
        return arr;
      }
      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        arr.push(currentMatch);
      } else {
        arr.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }
    return arr;
  }, []);
}
var formatNumber = getNumberFormatter({ useGrouping: false });
function TimeInput(_a) {
  var amPmAriaLabel = _a.amPmAriaLabel, autoFocus = _a.autoFocus, className = _a.className, disabled = _a.disabled, format = _a.format, hourAriaLabel = _a.hourAriaLabel, hourPlaceholder = _a.hourPlaceholder, _b = _a.isClockOpen, isClockOpenProps = _b === void 0 ? null : _b, locale = _a.locale, _c = _a.maxDetail, maxDetail = _c === void 0 ? "minute" : _c, maxTime = _a.maxTime, minTime = _a.minTime, minuteAriaLabel = _a.minuteAriaLabel, minutePlaceholder = _a.minutePlaceholder, _d = _a.name, name = _d === void 0 ? "time" : _d, nativeInputAriaLabel = _a.nativeInputAriaLabel, onChangeProps = _a.onChange, onInvalidChange = _a.onInvalidChange, required = _a.required, secondAriaLabel = _a.secondAriaLabel, secondPlaceholder = _a.secondPlaceholder, valueProps = _a.value;
  var _e = (0, import_react5.useState)(null), amPm = _e[0], setAmPm = _e[1];
  var _f = (0, import_react5.useState)(null), hour = _f[0], setHour = _f[1];
  var _g = (0, import_react5.useState)(null), minute = _g[0], setMinute = _g[1];
  var _h = (0, import_react5.useState)(null), second = _h[0], setSecond = _h[1];
  var _j = (0, import_react5.useState)(null), value = _j[0], setValue = _j[1];
  var amPmInput = (0, import_react5.useRef)(null);
  var hour12Input = (0, import_react5.useRef)(null);
  var hour24Input = (0, import_react5.useRef)(null);
  var minuteInput = (0, import_react5.useRef)(null);
  var secondInput = (0, import_react5.useRef)(null);
  var _k = (0, import_react5.useState)(isClockOpenProps), isClockOpen = _k[0], setIsClockOpen = _k[1];
  var lastPressedKey = (0, import_react5.useRef)(void 0);
  (0, import_react5.useEffect)(function() {
    setIsClockOpen(isClockOpenProps);
  }, [isClockOpenProps]);
  (0, import_react5.useEffect)(function() {
    var nextValue = valueProps;
    if (nextValue) {
      setAmPm(convert24to12(getHours(nextValue))[1]);
      setHour(getHours(nextValue).toString());
      setMinute(getMinutes(nextValue).toString());
      setSecond(getSeconds(nextValue).toString());
      setValue(nextValue);
    } else {
      setAmPm(null);
      setHour(null);
      setMinute(null);
      setSecond(null);
      setValue(null);
    }
  }, [
    valueProps,
    minTime,
    maxTime,
    maxDetail,
    // Toggling clock visibility resets values
    isClockOpen
  ]);
  var valueType = maxDetail;
  var formatTime = function() {
    var level = allViews.indexOf(maxDetail);
    var formatterOptions = getFormatterOptionsCache[level] || function() {
      var options = { hour: "numeric" };
      if (level >= 1) {
        options.minute = "numeric";
      }
      if (level >= 2) {
        options.second = "numeric";
      }
      getFormatterOptionsCache[level] = options;
      return options;
    }();
    return getFormatter(formatterOptions);
  }();
  function getProcessedValue(value2) {
    var processFunction = function() {
      switch (valueType) {
        case "hour":
        case "minute":
          return getHoursMinutes;
        case "second":
          return getHoursMinutesSeconds;
        default:
          throw new Error("Invalid valueType");
      }
    }();
    return processFunction(value2);
  }
  var placeholder = format || function() {
    var hour24 = 21;
    var hour12 = 9;
    var minute2 = 13;
    var second2 = 14;
    var date = new Date(2017, 0, 1, hour24, minute2, second2);
    return formatTime(locale, date).replace(formatNumber(locale, hour12), "h").replace(formatNumber(locale, hour24), "H").replace(formatNumber(locale, minute2), "mm").replace(formatNumber(locale, second2), "ss").replace(new RegExp(getAmPmLabels(locale).join("|")), "a");
  }();
  var divider = function() {
    var dividers = placeholder.match(/[^0-9a-z]/i);
    return dividers ? dividers[0] : null;
  }();
  function onClick(event) {
    if (event.target === event.currentTarget) {
      var firstInput = event.target.children[1];
      focus(firstInput);
    }
  }
  function onKeyDown(event) {
    lastPressedKey.current = event.key;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case divider: {
        event.preventDefault();
        var input = event.target;
        var property = event.key === "ArrowLeft" ? "previousElementSibling" : "nextElementSibling";
        var nextInput = findInput(input, property);
        focus(nextInput);
        break;
      }
      default:
    }
  }
  function onKeyUp(event) {
    var key = event.key, input = event.target;
    var isLastPressedKey = lastPressedKey.current === key;
    if (!isLastPressedKey) {
      return;
    }
    var isNumberKey = !isNaN(Number(key));
    if (!isNumberKey) {
      return;
    }
    var max = input.getAttribute("max");
    if (!max) {
      return;
    }
    var value2 = input.value;
    if (Number(value2) * 10 > Number(max) || value2.length >= max.length) {
      var property = "nextElementSibling";
      var nextInput = findInput(input, property);
      focus(nextInput);
    }
  }
  function onChangeExternal() {
    if (!onChangeProps) {
      return;
    }
    function filterBoolean(value2) {
      return Boolean(value2);
    }
    var formElements = [
      amPmInput.current,
      hour12Input.current,
      hour24Input.current,
      minuteInput.current,
      secondInput.current
    ].filter(filterBoolean);
    var formElementsWithoutSelect = formElements.slice(1);
    var values = {};
    formElements.forEach(function(formElement) {
      values[formElement.name] = formElement.type === "number" ? "valueAsNumber" in formElement ? formElement.valueAsNumber : Number(formElement.value) : formElement.value;
    });
    var isEveryValueEmpty = formElementsWithoutSelect.every(function(formElement) {
      return !formElement.value;
    });
    if (isEveryValueEmpty) {
      onChangeProps(null, false);
      return;
    }
    var isEveryValueFilled = formElements.every(function(formElement) {
      return formElement.value;
    });
    var isEveryValueValid = formElements.every(function(formElement) {
      return formElement.validity.valid;
    });
    if (isEveryValueFilled && isEveryValueValid) {
      var hour_1 = Number(values.hour24 || values.hour12 && values.amPm && convert12to24(values.hour12, values.amPm) || 0);
      var minute_1 = Number(values.minute || 0);
      var second_1 = Number(values.second || 0);
      var padStart = function(num) {
        return "0".concat(num).slice(-2);
      };
      var proposedValue = "".concat(padStart(hour_1), ":").concat(padStart(minute_1), ":").concat(padStart(second_1));
      var processedValue = getProcessedValue(proposedValue);
      onChangeProps(processedValue, false);
      return;
    }
    if (!onInvalidChange) {
      return;
    }
    onInvalidChange();
  }
  function onChange(event) {
    var _a2 = event.target, name2 = _a2.name, value2 = _a2.value;
    switch (name2) {
      case "amPm":
        setAmPm(value2);
        break;
      case "hour12":
        setHour(value2 ? convert12to24(value2, amPm || "am").toString() : "");
        break;
      case "hour24":
        setHour(value2);
        break;
      case "minute":
        setMinute(value2);
        break;
      case "second":
        setSecond(value2);
        break;
    }
    onChangeExternal();
  }
  function onChangeNative(event) {
    var value2 = event.target.value;
    if (!onChangeProps) {
      return;
    }
    var processedValue = value2 || null;
    onChangeProps(processedValue, false);
  }
  var commonInputProps = {
    className,
    disabled,
    maxTime,
    minTime,
    onChange,
    onKeyDown,
    onKeyUp,
    // This is only for showing validity when editing
    required: Boolean(required || isClockOpen)
  };
  function renderHour12(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    var showLeadingZeros = currentMatch ? currentMatch.length === 2 : false;
    return (0, import_jsx_runtime15.jsx)(Hour12Input, __assign8({}, commonInputProps, {
      amPm,
      ariaLabel: hourAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: hour12Input,
      placeholder: hourPlaceholder,
      showLeadingZeros,
      value: hour
    }), "hour12");
  }
  function renderHour24(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    var showLeadingZeros = currentMatch ? currentMatch.length === 2 : false;
    return (0, import_jsx_runtime15.jsx)(Hour24Input, __assign8({}, commonInputProps, {
      ariaLabel: hourAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: hour24Input,
      placeholder: hourPlaceholder,
      showLeadingZeros,
      value: hour
    }), "hour24");
  }
  function renderHour(currentMatch, index) {
    if (/h/.test(currentMatch)) {
      return renderHour12(currentMatch, index);
    }
    return renderHour24(currentMatch, index);
  }
  function renderMinute(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    var showLeadingZeros = currentMatch ? currentMatch.length === 2 : false;
    return (0, import_jsx_runtime15.jsx)(MinuteInput, __assign8({}, commonInputProps, {
      ariaLabel: minuteAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      hour,
      inputRef: minuteInput,
      placeholder: minutePlaceholder,
      showLeadingZeros,
      value: minute
    }), "minute");
  }
  function renderSecond(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error("Unsupported token: ".concat(currentMatch));
    }
    var showLeadingZeros = currentMatch ? currentMatch.length === 2 : true;
    return (0, import_jsx_runtime15.jsx)(SecondInput, __assign8({}, commonInputProps, {
      ariaLabel: secondAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      hour,
      inputRef: secondInput,
      minute,
      placeholder: secondPlaceholder,
      showLeadingZeros,
      value: second
    }), "second");
  }
  function renderAmPm(currentMatch, index) {
    return (0, import_jsx_runtime15.jsx)(AmPm, __assign8({}, commonInputProps, {
      ariaLabel: amPmAriaLabel,
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus: index === 0 && autoFocus,
      inputRef: amPmInput,
      locale,
      onChange,
      value: amPm
    }), "ampm");
  }
  function renderCustomInputsInternal() {
    var elementFunctions = {
      h: renderHour,
      H: renderHour,
      m: renderMinute,
      s: renderSecond,
      a: renderAmPm
    };
    var allowMultipleInstances = typeof format !== "undefined";
    return renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
  }
  function renderNativeInput() {
    return (0, import_jsx_runtime15.jsx)(NativeInput, { ariaLabel: nativeInputAriaLabel, disabled, maxTime, minTime, name, onChange: onChangeNative, required, value, valueType }, "time");
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    (0, import_jsx_runtime15.jsxs)("div", { className, onClick, children: [renderNativeInput(), renderCustomInputsInternal()] })
  );
}

// node_modules/react-time-picker/dist/esm/TimePicker.js
var __assign9 = function() {
  __assign9 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign9.apply(this, arguments);
};
var __rest7 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var baseClassName = "react-time-picker";
var outsideActionEvents = ["mousedown", "focusin", "touchstart"];
var iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 19,
  height: 19,
  viewBox: "0 0 19 19",
  stroke: "black",
  strokeWidth: 2
};
var ClockIcon = (0, import_jsx_runtime16.jsxs)("svg", __assign9({}, iconProps, { className: "".concat(baseClassName, "__clock-button__icon ").concat(baseClassName, "__button__icon"), fill: "none", children: [(0, import_jsx_runtime16.jsx)("circle", { cx: "9.5", cy: "9.5", r: "7.5" }), (0, import_jsx_runtime16.jsx)("path", { d: "M9.5 4.5 v5 h4" })] }));
var ClearIcon = (0, import_jsx_runtime16.jsxs)("svg", __assign9({}, iconProps, { className: "".concat(baseClassName, "__clear-button__icon ").concat(baseClassName, "__button__icon"), children: [(0, import_jsx_runtime16.jsx)("line", { x1: "4", x2: "15", y1: "4", y2: "15" }), (0, import_jsx_runtime16.jsx)("line", { x1: "15", x2: "4", y1: "4", y2: "15" })] }));
function TimePicker(props) {
  var amPmAriaLabel = props.amPmAriaLabel, autoFocus = props.autoFocus, className = props.className, clearAriaLabel = props.clearAriaLabel, _a = props.clearIcon, clearIcon = _a === void 0 ? ClearIcon : _a, clockAriaLabel = props.clockAriaLabel, _b = props.clockIcon, clockIcon = _b === void 0 ? ClockIcon : _b, _c = props.closeClock, shouldCloseClockOnSelect = _c === void 0 ? true : _c, dataTestid = props["data-testid"], hourAriaLabel = props.hourAriaLabel, hourPlaceholder = props.hourPlaceholder, disableClock = props.disableClock, disabled = props.disabled, format = props.format, id = props.id, _d = props.isOpen, isOpenProps = _d === void 0 ? null : _d, locale = props.locale, maxTime = props.maxTime, _e = props.maxDetail, maxDetail = _e === void 0 ? "minute" : _e, minTime = props.minTime, minuteAriaLabel = props.minuteAriaLabel, minutePlaceholder = props.minutePlaceholder, _f = props.name, name = _f === void 0 ? "time" : _f, nativeInputAriaLabel = props.nativeInputAriaLabel, onClockClose = props.onClockClose, onClockOpen = props.onClockOpen, onChangeProps = props.onChange, onFocusProps = props.onFocus, onInvalidChange = props.onInvalidChange, _g = props.openClockOnFocus, openClockOnFocus = _g === void 0 ? true : _g, required = props.required, value = props.value, secondAriaLabel = props.secondAriaLabel, secondPlaceholder = props.secondPlaceholder, shouldCloseClock = props.shouldCloseClock, shouldOpenClock = props.shouldOpenClock, otherProps = __rest7(props, ["amPmAriaLabel", "autoFocus", "className", "clearAriaLabel", "clearIcon", "clockAriaLabel", "clockIcon", "closeClock", "data-testid", "hourAriaLabel", "hourPlaceholder", "disableClock", "disabled", "format", "id", "isOpen", "locale", "maxTime", "maxDetail", "minTime", "minuteAriaLabel", "minutePlaceholder", "name", "nativeInputAriaLabel", "onClockClose", "onClockOpen", "onChange", "onFocus", "onInvalidChange", "openClockOnFocus", "required", "value", "secondAriaLabel", "secondPlaceholder", "shouldCloseClock", "shouldOpenClock"]);
  var _h = (0, import_react6.useState)(isOpenProps), isOpen = _h[0], setIsOpen = _h[1];
  var wrapper = (0, import_react6.useRef)(null);
  var clockWrapper = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(function() {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);
  function openClock(_a2) {
    var reason = _a2.reason;
    if (shouldOpenClock) {
      if (!shouldOpenClock({ reason })) {
        return;
      }
    }
    setIsOpen(true);
    if (onClockOpen) {
      onClockOpen();
    }
  }
  var closeClock = (0, import_react6.useCallback)(function(_a2) {
    var reason = _a2.reason;
    if (shouldCloseClock) {
      if (!shouldCloseClock({ reason })) {
        return;
      }
    }
    setIsOpen(false);
    if (onClockClose) {
      onClockClose();
    }
  }, [onClockClose, shouldCloseClock]);
  function toggleClock() {
    if (isOpen) {
      closeClock({ reason: "buttonClick" });
    } else {
      openClock({ reason: "buttonClick" });
    }
  }
  function onChange(value2, shouldCloseClock2) {
    if (shouldCloseClock2 === void 0) {
      shouldCloseClock2 = shouldCloseClockOnSelect;
    }
    if (shouldCloseClock2) {
      closeClock({ reason: "select" });
    }
    if (onChangeProps) {
      onChangeProps(value2);
    }
  }
  function onFocus2(event) {
    if (onFocusProps) {
      onFocusProps(event);
    }
    if (
      // Internet Explorer still fires onFocus on disabled elements
      disabled || isOpen || !openClockOnFocus || event.target.dataset.select === "true"
    ) {
      return;
    }
    openClock({ reason: "focus" });
  }
  var onKeyDown = (0, import_react6.useCallback)(function(event) {
    if (event.key === "Escape") {
      closeClock({ reason: "escape" });
    }
  }, [closeClock]);
  function clear() {
    onChange(null);
  }
  function stopPropagation(event) {
    event.stopPropagation();
  }
  var onOutsideAction = (0, import_react6.useCallback)(function(event) {
    var wrapperEl = wrapper.current;
    var clockWrapperEl = clockWrapper.current;
    var target = "composedPath" in event ? event.composedPath()[0] : event.target;
    if (target && wrapperEl && !wrapperEl.contains(target) && (!clockWrapperEl || !clockWrapperEl.contains(target))) {
      closeClock({ reason: "outsideAction" });
    }
  }, [clockWrapper, closeClock, wrapper]);
  var handleOutsideActionListeners = (0, import_react6.useCallback)(function(shouldListen) {
    if (shouldListen === void 0) {
      shouldListen = isOpen;
    }
    outsideActionEvents.forEach(function(event) {
      if (shouldListen) {
        document.addEventListener(event, onOutsideAction);
      } else {
        document.removeEventListener(event, onOutsideAction);
      }
    });
    if (shouldListen) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen, onOutsideAction, onKeyDown]);
  (0, import_react6.useEffect)(function() {
    handleOutsideActionListeners();
    return function() {
      handleOutsideActionListeners(false);
    };
  }, [handleOutsideActionListeners]);
  function renderInputs() {
    var valueFrom = (Array.isArray(value) ? value : [value])[0];
    var ariaLabelProps = {
      amPmAriaLabel,
      hourAriaLabel,
      minuteAriaLabel,
      nativeInputAriaLabel,
      secondAriaLabel
    };
    var placeholderProps = {
      hourPlaceholder,
      minutePlaceholder,
      secondPlaceholder
    };
    return (0, import_jsx_runtime16.jsxs)("div", { className: "".concat(baseClassName, "__wrapper"), children: [(0, import_jsx_runtime16.jsx)(TimeInput, __assign9({}, ariaLabelProps, placeholderProps, {
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus,
      className: "".concat(baseClassName, "__inputGroup"),
      disabled,
      format,
      isClockOpen: isOpen,
      locale,
      maxDetail,
      maxTime,
      minTime,
      name,
      onChange,
      onInvalidChange,
      required,
      value: valueFrom
    })), clearIcon !== null && (0, import_jsx_runtime16.jsx)("button", { "aria-label": clearAriaLabel, className: "".concat(baseClassName, "__clear-button ").concat(baseClassName, "__button"), disabled, onClick: clear, onFocus: stopPropagation, type: "button", children: typeof clearIcon === "function" ? (0, import_react6.createElement)(clearIcon) : clearIcon }), clockIcon !== null && !disableClock && (0, import_jsx_runtime16.jsx)("button", { "aria-expanded": isOpen || false, "aria-label": clockAriaLabel, className: "".concat(baseClassName, "__clock-button ").concat(baseClassName, "__button"), disabled, onClick: toggleClock, onFocus: stopPropagation, type: "button", children: typeof clockIcon === "function" ? (0, import_react6.createElement)(clockIcon) : clockIcon })] });
  }
  function renderClock() {
    if (isOpen === null || disableClock) {
      return null;
    }
    var clockProps = props.clockProps, portalContainer = props.portalContainer, value2 = props.value;
    var className2 = "".concat(baseClassName, "__clock");
    var classNames = clsx_default(className2, "".concat(className2, "--").concat(isOpen ? "open" : "closed"));
    var valueFrom = (Array.isArray(value2) ? value2 : [value2])[0];
    var clock = (0, import_jsx_runtime16.jsx)(esm_default2, __assign9({ locale, value: valueFrom }, clockProps));
    return portalContainer ? (0, import_react_dom.createPortal)((0, import_jsx_runtime16.jsx)("div", { ref: clockWrapper, className: classNames, children: clock }), portalContainer) : (0, import_jsx_runtime16.jsx)(esm_default3, { children: (0, import_jsx_runtime16.jsx)("div", { ref: function(ref) {
      if (ref && !isOpen) {
        ref.removeAttribute("style");
      }
    }, className: classNames, children: clock }) });
  }
  var eventProps = (0, import_react6.useMemo)(function() {
    return makeEventProps(otherProps);
  }, [otherProps]);
  return (0, import_jsx_runtime16.jsxs)("div", __assign9({ className: clsx_default(baseClassName, "".concat(baseClassName, "--").concat(isOpen ? "open" : "closed"), "".concat(baseClassName, "--").concat(disabled ? "disabled" : "enabled"), className), "data-testid": dataTestid, id }, eventProps, { onFocus: onFocus2, ref: wrapper, children: [renderInputs(), renderClock()] }));
}

// node_modules/react-time-picker/dist/esm/index.js
var esm_default5 = TimePicker;
export {
  TimePicker,
  esm_default5 as default
};
//# sourceMappingURL=react-time-picker.js.map
