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
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/react-select-search/dist/esm/index.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
function $f63eea9d7c5f466f$export$2e2bcd8739ae039(v1, v2) {
  return String(v1) === String(v2);
}
function $f7a118348608ef0e$export$2e2bcd8739ae039(value, options) {
  if (Array.isArray(value))
    return value.map((v) => options.find((o) => (0, $f63eea9d7c5f466f$export$2e2bcd8739ae039)(o.value, v))).filter((o) => o);
  return options.find((o) => (0, $f63eea9d7c5f466f$export$2e2bcd8739ae039)(o.value, value)) || null;
}
function $ab17a5af9c7227da$export$2e2bcd8739ae039(value) {
  return Array.isArray(value) ? value : [
    value
  ];
}
function $fcc1d8b4a4fe77ec$export$2e2bcd8739ae039(newOption, oldOption, multiple) {
  if (!newOption)
    return oldOption;
  if (!multiple)
    return newOption;
  if (!oldOption)
    return (0, $ab17a5af9c7227da$export$2e2bcd8739ae039)(newOption);
  const nextOption = (0, $ab17a5af9c7227da$export$2e2bcd8739ae039)(oldOption);
  const newOptionIndex = nextOption.findIndex((o) => (0, $f63eea9d7c5f466f$export$2e2bcd8739ae039)(o.value, newOption.value));
  if (newOptionIndex >= 0)
    nextOption.splice(newOptionIndex, 1);
  else
    nextOption.push(newOption);
  return nextOption;
}
function $29242e7c542b89e5$export$2e2bcd8739ae039(option, options, placeholder) {
  if (!option && !placeholder)
    return options && options.length ? options[0].name || "" : "";
  const isMultiple = Array.isArray(option);
  if (!option && !isMultiple)
    return "";
  return isMultiple ? option.map((o) => o.name).filter(Boolean).join(", ") : option.name || "";
}
function $8f7d71ac34985a60$export$2e2bcd8739ae039(option) {
  if (!option)
    return null;
  if (Array.isArray(option))
    return option.filter(Boolean).map((o) => o.value);
  return option.value || null;
}
function $559302edb229d5e8$export$2e2bcd8739ae039(options) {
  const nextOptions = [];
  options.forEach((option) => {
    if (option.group) {
      const group = nextOptions.findIndex((o) => o.type === "group" && o.name === option.group);
      if (group >= 0)
        nextOptions[group].items.push(option);
      else
        nextOptions.push({
          items: [
            option
          ],
          type: "group",
          name: option.group
        });
    } else
      nextOptions.push(option);
  });
  return nextOptions;
}
function $e2eb089248fa8007$var$search(q, text) {
  const searchLength = q.length;
  const textLength = text.length;
  if (searchLength > textLength)
    return false;
  if (text.indexOf(q) >= 0)
    return true;
  mainLoop:
    for (let i = 0, j = 0; i < searchLength; i += 1) {
      const ch = q.charCodeAt(i);
      while (j < textLength) {
        if (text.charCodeAt(j++) === ch)
          continue mainLoop;
      }
      return false;
    }
  return true;
}
function $e2eb089248fa8007$export$2e2bcd8739ae039(options, query) {
  return !query.length ? options : options.filter((o) => $e2eb089248fa8007$var$search(query.toLowerCase(), `${o.name} ${o.group || ""}`.trim().toLowerCase()));
}
function $5b742793c6607960$export$2e2bcd8739ae039(middleware, items, query) {
  return middleware.filter(Boolean).reduce((data, cb) => cb(data, query), items).map((item, i) => ({
    ...item,
    index: i
  }));
}
function $ab7b6b8f43adf325$export$2e2bcd8739ae039(options) {
  let index = 0;
  return options.map((option) => {
    if (option.type === "group")
      return option.items.map((o) => ({
        ...o,
        group: option.name,
        index: index++
      }));
    return {
      ...option,
      index: index++
    };
  }).flat();
}
function $21775510bb0d6713$export$2e2bcd8739ae039(defaultOptions, getOptions, debounceTime, search) {
  const [options, setOptions] = (0, import_react.useState)(() => (0, $ab7b6b8f43adf325$export$2e2bcd8739ae039)(defaultOptions));
  const [fetching, setFetching] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    let timeout;
    if (!getOptions)
      return;
    timeout = setTimeout(() => {
      const optionsReq = getOptions(search, options);
      setFetching(true);
      Promise.resolve(optionsReq).then((newOptions) => setOptions((0, $ab7b6b8f43adf325$export$2e2bcd8739ae039)(newOptions))).finally(() => setFetching(false));
    }, debounceTime);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    search
  ]);
  (0, import_react.useEffect)(() => {
    setOptions((0, $ab7b6b8f43adf325$export$2e2bcd8739ae039)(defaultOptions));
  }, [
    defaultOptions
  ]);
  return [
    options,
    fetching
  ];
}
function $e86f7a275d5b9934$export$2e2bcd8739ae039(current, dir, options) {
  const max = options.length - 1;
  let option = null;
  let i = -1;
  let newHighlighted = current;
  while (i++ <= max && (!option || option.disabled)) {
    newHighlighted = dir === "down" ? newHighlighted + 1 : newHighlighted - 1;
    if (newHighlighted < 0)
      newHighlighted = max;
    else if (newHighlighted > max)
      newHighlighted = 0;
    option = options[newHighlighted];
  }
  return newHighlighted;
}
function $8c63ada902e0d18e$export$2e2bcd8739ae039(options, onSelect, ref) {
  const [highlighted, setHighlighted] = (0, import_react.useState)(-1);
  return [
    {
      onKeyDown: (e) => {
        const key = e.key.replace("Arrow", "").toLowerCase();
        if (key === "down" || key === "up") {
          e.preventDefault();
          setHighlighted((0, $e86f7a275d5b9934$export$2e2bcd8739ae039)(highlighted, key, options));
        }
      },
      onKeyUp: (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          ref.current.blur();
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (options[highlighted])
            onSelect(options[highlighted].value);
        }
      }
    },
    highlighted,
    setHighlighted
  ];
}
var $0d0f732c1d5a71da$var$nullCb = () => {
};
function $0d0f732c1d5a71da$export$2e2bcd8739ae039({ options: defaultOptions, defaultValue, value, multiple, search, onChange = $0d0f732c1d5a71da$var$nullCb, onFocus = $0d0f732c1d5a71da$var$nullCb, onBlur = $0d0f732c1d5a71da$var$nullCb, closeOnSelect = true, placeholder, getOptions, filterOptions, useFuzzySearch = true, debounce }) {
  const ref = (0, import_react.useRef)();
  const [option, setOption] = (0, import_react.useState)(null);
  const [q, setSearch] = (0, import_react.useState)("");
  const [focus, setFocus] = (0, import_react.useState)(false);
  const [options, fetching] = (0, $21775510bb0d6713$export$2e2bcd8739ae039)(defaultOptions, getOptions, debounce, q);
  const onSelect = (v) => {
    const newOption = (0, $fcc1d8b4a4fe77ec$export$2e2bcd8739ae039)((0, $f7a118348608ef0e$export$2e2bcd8739ae039)(decodeURIComponent(v), options), option, multiple);
    if (value === void 0)
      setOption(newOption);
    onChange((0, $8f7d71ac34985a60$export$2e2bcd8739ae039)(newOption), newOption);
    setTimeout(() => {
      if (ref.current && closeOnSelect)
        ref.current.blur();
    }, 0);
  };
  const middleware = [
    useFuzzySearch ? (0, $e2eb089248fa8007$export$2e2bcd8739ae039) : null,
    ...filterOptions ? filterOptions : []
  ];
  const filteredOptions = (0, $559302edb229d5e8$export$2e2bcd8739ae039)((0, $5b742793c6607960$export$2e2bcd8739ae039)(middleware, options, q));
  const [keyHandlers, highlighted, setHighlighted] = (0, $8c63ada902e0d18e$export$2e2bcd8739ae039)(filteredOptions, onSelect, ref);
  const snapshot = {
    search: q,
    focus,
    option,
    value: (0, $8f7d71ac34985a60$export$2e2bcd8739ae039)(option),
    fetching,
    highlighted,
    options: filteredOptions,
    displayValue: (0, $29242e7c542b89e5$export$2e2bcd8739ae039)(option, options, placeholder)
  };
  const valueProps = {
    tabIndex: "0",
    readOnly: !search,
    placeholder,
    value: focus && search ? q : snapshot.displayValue,
    ref,
    ...keyHandlers,
    onFocus: (e) => {
      setFocus(true);
      onFocus(e);
    },
    onBlur: (e) => {
      setFocus(false);
      setSearch("");
      setHighlighted(-1);
      onBlur(e);
    },
    onMouseDown: (e) => {
      if (focus) {
        e.preventDefault();
        ref.current.blur();
      }
    },
    onChange: search ? ({ target }) => setSearch(target.value) : null
  };
  const optionProps = {
    tabIndex: "-1",
    onMouseDown(e) {
      e.preventDefault();
      onSelect(e.currentTarget.value);
    }
  };
  (0, import_react.useEffect)(() => {
    setOption((0, $f7a118348608ef0e$export$2e2bcd8739ae039)(value === void 0 ? defaultValue : value, options));
  }, [
    value,
    options
  ]);
  return [
    snapshot,
    valueProps,
    optionProps
  ];
}
var $461fda4bde208857$var$isString = (str) => typeof str === "string";
var $461fda4bde208857$var$getClassName = (str, className) => $461fda4bde208857$var$isString(className) ? `${className}-${str}` : className[str];
function $461fda4bde208857$export$2e2bcd8739ae039(classNames, className) {
  if ($461fda4bde208857$var$isString(classNames))
    return $461fda4bde208857$var$getClassName(classNames, className);
  return Object.entries(classNames).filter(([cls, display]) => cls && display).map(([cls]) => $461fda4bde208857$var$getClassName(cls, className)).join(" ");
}
function $9b55b4f5631730e8$var$Option({ optionProps, highlighted, selected, option, cls, renderOption, disabled }) {
  const props = {
    ...optionProps,
    value: encodeURIComponent(option.value),
    disabled
  };
  const className = cls({
    option: true,
    "is-selected": selected,
    "is-highlighted": highlighted
  });
  return (0, import_jsx_runtime.jsxs)("li", {
    className: cls("row"),
    role: "menuitem",
    "data-index": option.index,
    children: [
      renderOption && renderOption(props, option, {
        selected,
        highlighted
      }, className),
      !renderOption && (0, import_jsx_runtime.jsx)("button", {
        type: "button",
        className,
        ...props,
        children: option.name
      })
    ]
  });
}
var $9b55b4f5631730e8$export$2e2bcd8739ae039 = (0, import_react.memo)($9b55b4f5631730e8$var$Option);
function $b5eecf9f88e2d7ae$export$2e2bcd8739ae039(option, selectedOption) {
  if (!selectedOption)
    return false;
  return Array.isArray(selectedOption) ? selectedOption.findIndex((o) => o.value === option.value) >= 0 : selectedOption.value === option.value;
}
function $1b5fcad01c07e709$var$Options(props) {
  const { options, cls, renderOption, renderGroupHeader, optionProps, snapshot, disabled } = props;
  return (0, import_jsx_runtime.jsx)("ul", {
    className: cls("options"),
    children: options.map((o) => {
      if (o.type === "group")
        return (0, import_jsx_runtime.jsx)("li", {
          role: "none",
          className: cls("row"),
          children: (0, import_jsx_runtime.jsxs)("div", {
            className: cls("group"),
            children: [
              (0, import_jsx_runtime.jsx)("div", {
                className: cls("group-header"),
                children: renderGroupHeader ? renderGroupHeader(o.name) : o.name
              }),
              (0, import_jsx_runtime.jsx)($1b5fcad01c07e709$var$Options, {
                ...props,
                options: o.items
              })
            ]
          })
        }, o.name);
      return (0, import_jsx_runtime.jsx)((0, $9b55b4f5631730e8$export$2e2bcd8739ae039), {
        option: o,
        optionProps,
        cls,
        renderOption,
        selected: (0, $b5eecf9f88e2d7ae$export$2e2bcd8739ae039)(o, snapshot.option),
        highlighted: snapshot.highlighted === o.index,
        disabled: o.disabled || disabled
      }, o.value);
    })
  });
}
var $1b5fcad01c07e709$export$2e2bcd8739ae039 = (0, import_react.memo)($1b5fcad01c07e709$var$Options);
var $00d3317695af813e$var$SelectSearch = (0, import_react.forwardRef)(({ disabled, placeholder, multiple, search, autoFocus, autoComplete, id, closeOnSelect, className, renderValue, renderOption, renderGroupHeader, fuzzySearch, emptyMessage, value, ...hookProps }, ref) => {
  const selectRef = (0, import_react.useRef)(null);
  const cls = (classNames) => (0, $461fda4bde208857$export$2e2bcd8739ae039)(classNames, className);
  const [controlledValue, setControlledValue] = (0, import_react.useState)(value);
  const [snapshot, valueProps, optionProps] = (0, $0d0f732c1d5a71da$export$2e2bcd8739ae039)({
    value: controlledValue,
    placeholder,
    multiple,
    search,
    closeOnSelect: closeOnSelect && !multiple,
    useFuzzySearch: fuzzySearch,
    ...hookProps
  });
  const { highlighted, value: snapValue, fetching, focus } = snapshot;
  const props = {
    ...valueProps,
    autoFocus,
    autoComplete,
    disabled
  };
  (0, import_react.useEffect)(() => {
    const { current } = selectRef;
    if (current) {
      const val = Array.isArray(snapValue) ? snapValue[0] : snapValue;
      const selected = current.querySelector(highlighted > -1 ? `[data-index="${highlighted}"]` : `[value="${encodeURIComponent(val)}"]`);
      if (selected) {
        const rect = current.getBoundingClientRect();
        const selectedRect = selected.getBoundingClientRect();
        current.scrollTop = selected.offsetTop - rect.height / 2 + selectedRect.height / 2;
      }
    }
  }, [
    snapValue,
    highlighted,
    selectRef.current
  ]);
  (0, import_react.useEffect)(() => setControlledValue(value), [
    value
  ]);
  return (0, import_jsx_runtime.jsxs)("div", {
    ref,
    id,
    className: cls({
      container: true,
      "is-multiple": multiple,
      "is-disabled": disabled,
      "is-loading": fetching,
      "has-focus": focus
    }),
    children: [
      (!multiple || placeholder || search) && (0, import_jsx_runtime.jsxs)("div", {
        className: cls("value"),
        children: [
          renderValue && renderValue(props, snapshot, cls("input")),
          !renderValue && (0, import_jsx_runtime.jsx)("input", {
            ...props,
            className: cls("input")
          })
        ]
      }),
      (0, import_jsx_runtime.jsxs)("div", {
        className: cls("select"),
        ref: selectRef,
        onMouseDown: (e) => e.preventDefault(),
        children: [
          snapshot.options.length > 0 && (0, import_jsx_runtime.jsx)((0, $1b5fcad01c07e709$export$2e2bcd8739ae039), {
            options: snapshot.options,
            optionProps,
            renderOption,
            renderGroupHeader,
            disabled,
            snapshot,
            cls
          }),
          !snapshot.options.length && (0, import_jsx_runtime.jsx)("ul", {
            className: cls("options"),
            children: !snapshot.options.length && emptyMessage && (0, import_jsx_runtime.jsx)("li", {
              className: cls("not-found"),
              children: emptyMessage
            })
          })
        ]
      })
    ]
  });
});
$00d3317695af813e$var$SelectSearch.defaultProps = {
  // Data
  options: [],
  fuzzySearch: true,
  // Interaction´
  printOptions: "auto",
  closeOnSelect: true,
  debounce: 250,
  // Attributes
  autoComplete: "on",
  // Design
  className: "select-search"
};
$00d3317695af813e$var$SelectSearch.displayName = "SelectSearch";
var $00d3317695af813e$export$2e2bcd8739ae039 = (0, import_react.memo)($00d3317695af813e$var$SelectSearch);
var $cf838c15c8b009ba$export$2e2bcd8739ae039 = (0, $00d3317695af813e$export$2e2bcd8739ae039);
export {
  $cf838c15c8b009ba$export$2e2bcd8739ae039 as default,
  $0d0f732c1d5a71da$export$2e2bcd8739ae039 as useSelect
};
//# sourceMappingURL=react-select-search.js.map
