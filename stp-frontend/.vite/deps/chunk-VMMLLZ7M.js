import {
  CacheProvider,
  Global,
  ThemeContext,
  createCache,
  css,
  getRegisteredStyles,
  init_emotion_cache_browser_development_esm,
  init_emotion_memoize_esm,
  init_emotion_react_browser_development_esm,
  init_emotion_serialize_development_esm,
  init_emotion_use_insertion_effect_with_fallbacks_browser_esm,
  init_emotion_utils_browser_esm,
  insertStyles,
  keyframes,
  memoize,
  registerStyles,
  serializeStyles,
  useInsertionEffectAlwaysWithSyncFallback,
  withEmotionCache
} from "./chunk-5WQ7WAZ7.js";
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
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst && cache ? (0, import_jsx_runtime.jsx)(CacheProvider, {
    value: cache,
    children
  }) : children;
}
var React, import_prop_types, import_jsx_runtime, cache;
var init_StyledEngineProvider = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/StyledEngineProvider.js"() {
    "use client";
    React = __toESM(require_react());
    import_prop_types = __toESM(require_prop_types());
    init_emotion_react_browser_development_esm();
    init_emotion_cache_browser_development_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
    if (typeof document === "object") {
      cache = createCache({
        key: "css",
        prepend: true
      });
    }
    true ? StyledEngineProvider.propTypes = {
      /**
       * Your component tree.
       */
      children: import_prop_types.default.node,
      /**
       * By default, the styles are injected last in the <head> element of the page.
       * As a result, they gain more specificity than any other style sheet.
       * If you want to override MUI's styles, set this prop.
       */
      injectFirst: import_prop_types.default.bool
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/StyledEngineProvider/index.js
var init_StyledEngineProvider2 = __esm({
  "node_modules/@mui/styled-engine/StyledEngineProvider/index.js"() {
    "use client";
    init_StyledEngineProvider();
  }
});

// node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js
var reactPropsRegex, isPropValid;
var init_emotion_is_prop_valid_esm = __esm({
  "node_modules/@emotion/is-prop-valid/dist/emotion-is-prop-valid.esm.js"() {
    init_emotion_memoize_esm();
    reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
    isPropValid = memoize(
      function(prop) {
        return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
      }
      /* Z+1 */
    );
  }
});

// node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.development.esm.js
var React2, testOmitPropsOnStringTag, testOmitPropsOnComponent, getDefaultShouldForwardProp, composeShouldForwardProps, isDevelopment, ILLEGAL_ESCAPE_SEQUENCE_ERROR, Insertion, createStyled;
var init_emotion_styled_base_browser_development_esm = __esm({
  "node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.development.esm.js"() {
    init_extends();
    React2 = __toESM(require_react());
    init_emotion_is_prop_valid_esm();
    init_emotion_react_browser_development_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_development_esm();
    init_emotion_use_insertion_effect_with_fallbacks_browser_esm();
    testOmitPropsOnStringTag = isPropValid;
    testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
      return key !== "theme";
    };
    getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
      return typeof tag === "string" && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
    };
    composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
      var shouldForwardProp;
      if (options) {
        var optionsShouldForwardProp = options.shouldForwardProp;
        shouldForwardProp = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
          return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
        } : optionsShouldForwardProp;
      }
      if (typeof shouldForwardProp !== "function" && isReal) {
        shouldForwardProp = tag.__emotion_forwardProp;
      }
      return shouldForwardProp;
    };
    isDevelopment = true;
    ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    Insertion = function Insertion2(_ref) {
      var cache2 = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
      registerStyles(cache2, serialized, isStringTag);
      useInsertionEffectAlwaysWithSyncFallback(function() {
        return insertStyles(cache2, serialized, isStringTag);
      });
      return null;
    };
    createStyled = function createStyled2(tag, options) {
      {
        if (tag === void 0) {
          throw new Error("You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.");
        }
      }
      var isReal = tag.__emotion_real === tag;
      var baseTag = isReal && tag.__emotion_base || tag;
      var identifierName;
      var targetClassName;
      if (options !== void 0) {
        identifierName = options.label;
        targetClassName = options.target;
      }
      var shouldForwardProp = composeShouldForwardProps(tag, options, isReal);
      var defaultShouldForwardProp = shouldForwardProp || getDefaultShouldForwardProp(baseTag);
      var shouldUseAs = !defaultShouldForwardProp("as");
      return function() {
        var args = arguments;
        var styles = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
        if (identifierName !== void 0) {
          styles.push("label:" + identifierName + ";");
        }
        if (args[0] == null || args[0].raw === void 0) {
          styles.push.apply(styles, args);
        } else {
          if (args[0][0] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles.push(args[0][0]);
          var len = args.length;
          var i = 1;
          for (; i < len; i++) {
            if (args[0][i] === void 0) {
              console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
            }
            styles.push(args[i], args[0][i]);
          }
        }
        var Styled = withEmotionCache(function(props, cache2, ref) {
          var FinalTag = shouldUseAs && props.as || baseTag;
          var className = "";
          var classInterpolations = [];
          var mergedProps = props;
          if (props.theme == null) {
            mergedProps = {};
            for (var key in props) {
              mergedProps[key] = props[key];
            }
            mergedProps.theme = React2.useContext(ThemeContext);
          }
          if (typeof props.className === "string") {
            className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
          } else if (props.className != null) {
            className = props.className + " ";
          }
          var serialized = serializeStyles(styles.concat(classInterpolations), cache2.registered, mergedProps);
          className += cache2.key + "-" + serialized.name;
          if (targetClassName !== void 0) {
            className += " " + targetClassName;
          }
          var finalShouldForwardProp = shouldUseAs && shouldForwardProp === void 0 ? getDefaultShouldForwardProp(FinalTag) : defaultShouldForwardProp;
          var newProps = {};
          for (var _key in props) {
            if (shouldUseAs && _key === "as")
              continue;
            if (finalShouldForwardProp(_key)) {
              newProps[_key] = props[_key];
            }
          }
          newProps.className = className;
          if (ref) {
            newProps.ref = ref;
          }
          return React2.createElement(React2.Fragment, null, React2.createElement(Insertion, {
            cache: cache2,
            serialized,
            isStringTag: typeof FinalTag === "string"
          }), React2.createElement(FinalTag, newProps));
        });
        Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
        Styled.defaultProps = tag.defaultProps;
        Styled.__emotion_real = Styled;
        Styled.__emotion_base = baseTag;
        Styled.__emotion_styles = styles;
        Styled.__emotion_forwardProp = shouldForwardProp;
        Object.defineProperty(Styled, "toString", {
          value: function value() {
            if (targetClassName === void 0 && isDevelopment) {
              return "NO_COMPONENT_SELECTOR";
            }
            return "." + targetClassName;
          }
        });
        Styled.withComponent = function(nextTag, nextOptions) {
          return createStyled2(nextTag, _extends({}, options, nextOptions, {
            shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
          })).apply(void 0, styles);
        };
        return Styled;
      };
    };
  }
});

// node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js
var import_react3, tags, newStyled;
var init_emotion_styled_browser_development_esm = __esm({
  "node_modules/@emotion/styled/dist/emotion-styled.browser.development.esm.js"() {
    init_emotion_styled_base_browser_development_esm();
    init_extends();
    import_react3 = __toESM(require_react());
    init_emotion_is_prop_valid_esm();
    init_emotion_react_browser_development_esm();
    init_emotion_utils_browser_esm();
    init_emotion_serialize_development_esm();
    init_emotion_use_insertion_effect_with_fallbacks_browser_esm();
    tags = [
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "big",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      "data",
      "datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "dialog",
      "div",
      "dl",
      "dt",
      "em",
      "embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "legend",
      "li",
      "link",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meta",
      "meter",
      "nav",
      "noscript",
      "object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      "track",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
      // SVG
      "circle",
      "clipPath",
      "defs",
      "ellipse",
      "foreignObject",
      "g",
      "image",
      "line",
      "linearGradient",
      "mask",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialGradient",
      "rect",
      "stop",
      "svg",
      "text",
      "tspan"
    ];
    newStyled = createStyled.bind();
    tags.forEach(function(tagName) {
      newStyled[tagName] = newStyled(tagName);
    });
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles,
    defaultTheme: defaultTheme2 = {}
  } = props;
  const globalStyles = typeof styles === "function" ? (themeInput) => styles(isEmpty(themeInput) ? defaultTheme2 : themeInput) : styles;
  return (0, import_jsx_runtime2.jsx)(Global, {
    styles: globalStyles
  });
}
var React3, import_prop_types2, import_jsx_runtime2;
var init_GlobalStyles = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/GlobalStyles.js"() {
    "use client";
    React3 = __toESM(require_react());
    import_prop_types2 = __toESM(require_prop_types());
    init_emotion_react_browser_development_esm();
    import_jsx_runtime2 = __toESM(require_jsx_runtime());
    true ? GlobalStyles.propTypes = {
      defaultTheme: import_prop_types2.default.object,
      styles: import_prop_types2.default.oneOfType([import_prop_types2.default.array, import_prop_types2.default.string, import_prop_types2.default.object, import_prop_types2.default.func])
    } : void 0;
  }
});

// node_modules/@mui/styled-engine/GlobalStyles/index.js
var init_GlobalStyles2 = __esm({
  "node_modules/@mui/styled-engine/GlobalStyles/index.js"() {
    "use client";
    init_GlobalStyles();
  }
});

// node_modules/@mui/styled-engine/index.js
var styled_engine_exports = {};
__export(styled_engine_exports, {
  GlobalStyles: () => GlobalStyles,
  StyledEngineProvider: () => StyledEngineProvider,
  ThemeContext: () => ThemeContext,
  css: () => css,
  default: () => styled,
  internal_processStyles: () => internal_processStyles,
  keyframes: () => keyframes
});
function styled(tag, options) {
  const stylesFactory = newStyled(tag, options);
  if (true) {
    return (...styles) => {
      const component = typeof tag === "string" ? `"${tag}"` : "component";
      if (styles.length === 0) {
        console.error([`MUI: Seems like you called \`styled(${component})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join("\n"));
      } else if (styles.some((style3) => style3 === void 0)) {
        console.error(`MUI: the styled(${component})(...args) API requires all its args to be defined.`);
      }
      return stylesFactory(...styles);
    };
  }
  return stylesFactory;
}
var internal_processStyles;
var init_styled_engine = __esm({
  "node_modules/@mui/styled-engine/index.js"() {
    "use client";
    init_emotion_styled_browser_development_esm();
    init_emotion_react_browser_development_esm();
    init_StyledEngineProvider2();
    init_GlobalStyles2();
    internal_processStyles = (tag, processor) => {
      if (Array.isArray(tag.__emotion_styles)) {
        tag.__emotion_styles = processor(tag.__emotion_styles);
      }
    };
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js
var defaultGenerator, createClassNameGenerator, ClassNameGenerator, ClassNameGenerator_default;
var init_ClassNameGenerator = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/ClassNameGenerator.js"() {
    defaultGenerator = (componentName) => componentName;
    createClassNameGenerator = () => {
      let generate = defaultGenerator;
      return {
        configure(generator) {
          generate = generator;
        },
        generate(componentName) {
          return generate(componentName);
        },
        reset() {
          generate = defaultGenerator;
        }
      };
    };
    ClassNameGenerator = createClassNameGenerator();
    ClassNameGenerator_default = ClassNameGenerator;
  }
});

// node_modules/@mui/utils/esm/ClassNameGenerator/index.js
var init_ClassNameGenerator2 = __esm({
  "node_modules/@mui/utils/esm/ClassNameGenerator/index.js"() {
    init_ClassNameGenerator();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js
function generateUtilityClass(componentName, slot, globalStatePrefix = "Mui") {
  const globalStateClass = globalStateClasses[slot];
  return globalStateClass ? `${globalStatePrefix}-${globalStateClass}` : `${ClassNameGenerator_default.generate(componentName)}-${slot}`;
}
var globalStateClasses;
var init_generateUtilityClass = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/generateUtilityClass.js"() {
    init_ClassNameGenerator2();
    globalStateClasses = {
      active: "active",
      checked: "checked",
      completed: "completed",
      disabled: "disabled",
      error: "error",
      expanded: "expanded",
      focused: "focused",
      focusVisible: "focusVisible",
      open: "open",
      readOnly: "readOnly",
      required: "required",
      selected: "selected"
    };
  }
});

// node_modules/@mui/utils/esm/generateUtilityClass/index.js
var init_generateUtilityClass2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClass/index.js"() {
    init_generateUtilityClass();
    init_generateUtilityClass();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js
function generateUtilityClasses(componentName, slots, globalStatePrefix = "Mui") {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}
var init_generateUtilityClasses = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/generateUtilityClasses.js"() {
    init_generateUtilityClass2();
  }
});

// node_modules/@mui/utils/esm/generateUtilityClasses/index.js
var init_generateUtilityClasses2 = __esm({
  "node_modules/@mui/utils/esm/generateUtilityClasses/index.js"() {
    init_generateUtilityClasses();
  }
});

// node_modules/@mui/utils/esm/composeClasses/composeClasses.js
function composeClasses(slots, getUtilityClass, classes = void 0) {
  const output = {};
  Object.keys(slots).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (slot) => {
      output[slot] = slots[slot].reduce((acc, key) => {
        if (key) {
          const utilityClass = getUtilityClass(key);
          if (utilityClass !== "") {
            acc.push(utilityClass);
          }
          if (classes && classes[key]) {
            acc.push(classes[key]);
          }
        }
        return acc;
      }, []).join(" ");
    }
  );
  return output;
}
var init_composeClasses = __esm({
  "node_modules/@mui/utils/esm/composeClasses/composeClasses.js"() {
  }
});

// node_modules/@mui/utils/esm/composeClasses/index.js
var init_composeClasses2 = __esm({
  "node_modules/@mui/utils/esm/composeClasses/index.js"() {
    init_composeClasses();
  }
});

// node_modules/@mui/material/styles/identifier.js
var identifier_default;
var init_identifier = __esm({
  "node_modules/@mui/material/styles/identifier.js"() {
    identifier_default = "$$material";
  }
});

// node_modules/@mui/material/styles/createMixins.js
function createMixins(breakpoints, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [breakpoints.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [breakpoints.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
var init_createMixins = __esm({
  "node_modules/@mui/material/styles/createMixins.js"() {
    init_extends();
  }
});

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS({
  "node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
    function _interopRequireDefault(e) {
      return e && e.__esModule ? e : {
        "default": e
      };
    }
    module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@mui/utils/esm/deepmerge/deepmerge.js
function isPlainObject(item) {
  if (typeof item !== "object" || item === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(item);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in item) && !(Symbol.iterator in item);
}
function deepClone(source) {
  if (!isPlainObject(source)) {
    return source;
  }
  const output = {};
  Object.keys(source).forEach((key) => {
    output[key] = deepClone(source[key]);
  });
  return output;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isPlainObject(source[key]) && // Avoid prototype pollution
      Object.prototype.hasOwnProperty.call(target, key) && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else if (options.clone) {
        output[key] = isPlainObject(source[key]) ? deepClone(source[key]) : source[key];
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
var init_deepmerge = __esm({
  "node_modules/@mui/utils/esm/deepmerge/deepmerge.js"() {
    init_extends();
  }
});

// node_modules/@mui/utils/esm/deepmerge/index.js
var deepmerge_exports = {};
__export(deepmerge_exports, {
  default: () => deepmerge,
  isPlainObject: () => isPlainObject
});
var init_deepmerge2 = __esm({
  "node_modules/@mui/utils/esm/deepmerge/index.js"() {
    init_deepmerge();
    init_deepmerge();
  }
});

// node_modules/@mui/material/styles/createTypography.js
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
function createTypography(palette2, typography) {
  const _ref = typeof typography === "function" ? typography(palette2) : typography, {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14,
    // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded);
  if (true) {
    if (typeof fontSize !== "number") {
      console.error("MUI: `fontSize` is required to be a number.");
    }
    if (typeof htmlFontSize !== "number") {
      console.error("MUI: `htmlFontSize` is required to be a number.");
    }
  }
  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => _extends({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight
  }, fontFamily === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
    // No need to clone deep
  });
}
var _excluded, caseAllCaps, defaultFontFamily;
var init_createTypography = __esm({
  "node_modules/@mui/material/styles/createTypography.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_deepmerge2();
    _excluded = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
    caseAllCaps = {
      textTransform: "uppercase"
    };
    defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
  }
});

// node_modules/@mui/material/styles/createTransitions.js
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded2);
    if (true) {
      const isString = (value) => typeof value === "string";
      const isNumber = (value) => !isNaN(parseFloat(value));
      if (!isString(props) && !Array.isArray(props)) {
        console.error('MUI: Argument "props" must be a string or Array.');
      }
      if (!isNumber(durationOption) && !isString(durationOption)) {
        console.error(`MUI: Argument "duration" must be a number or a string but found ${durationOption}.`);
      }
      if (!isString(easingOption)) {
        console.error('MUI: Argument "easing" must be a string.');
      }
      if (!isNumber(delay) && !isString(delay)) {
        console.error('MUI: Argument "delay" must be a number or a string.');
      }
      if (typeof options !== "object") {
        console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join("\n"));
      }
      if (Object.keys(other).length !== 0) {
        console.error(`MUI: Unrecognized argument(s) [${Object.keys(other).join(",")}].`);
      }
    }
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
var _excluded2, easing, duration;
var init_createTransitions = __esm({
  "node_modules/@mui/material/styles/createTransitions.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded2 = ["duration", "easing", "delay"];
    easing = {
      // This is the most common easing curve.
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      // Objects enter the screen at full velocity from off-screen and
      // slowly decelerate to a resting point.
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      // Objects leave the screen at full velocity. They do not decelerate when off-screen.
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      // The sharp curve is used by objects that may return to the screen at any time.
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
    };
    duration = {
      shortest: 150,
      shorter: 200,
      short: 250,
      // most basic recommended timing
      standard: 300,
      // this is to be used in complex animations
      complex: 375,
      // recommended when something is entering screen
      enteringScreen: 225,
      // recommended when something is leaving screen
      leavingScreen: 195
    };
  }
});

// node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js
function formatMuiErrorMessage(code) {
  let url = "https://mui.com/production-error/?code=" + code;
  for (let i = 1; i < arguments.length; i += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified MUI error #" + code + "; visit " + url + " for the full message.";
}
var init_formatMuiErrorMessage = __esm({
  "node_modules/@mui/utils/esm/formatMuiErrorMessage/formatMuiErrorMessage.js"() {
  }
});

// node_modules/@mui/utils/esm/formatMuiErrorMessage/index.js
var formatMuiErrorMessage_exports = {};
__export(formatMuiErrorMessage_exports, {
  default: () => formatMuiErrorMessage
});
var init_formatMuiErrorMessage2 = __esm({
  "node_modules/@mui/utils/esm/formatMuiErrorMessage/index.js"() {
    init_formatMuiErrorMessage();
  }
});

// node_modules/@mui/utils/esm/capitalize/capitalize.js
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(true ? `MUI: \`capitalize(string)\` expects a string argument.` : formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var init_capitalize = __esm({
  "node_modules/@mui/utils/esm/capitalize/capitalize.js"() {
    init_formatMuiErrorMessage2();
  }
});

// node_modules/@mui/utils/esm/capitalize/index.js
var capitalize_exports = {};
__export(capitalize_exports, {
  default: () => capitalize
});
var init_capitalize2 = __esm({
  "node_modules/@mui/utils/esm/capitalize/index.js"() {
    init_capitalize();
  }
});

// node_modules/@mui/system/esm/merge.js
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
    // No need to clone deep, it's way faster.
  });
}
var merge_default;
var init_merge = __esm({
  "node_modules/@mui/system/esm/merge.js"() {
    init_deepmerge2();
    merge_default = merge;
  }
});

// node_modules/@mui/system/esm/responsivePropType.js
var import_prop_types3, responsivePropType, responsivePropType_default;
var init_responsivePropType = __esm({
  "node_modules/@mui/system/esm/responsivePropType.js"() {
    import_prop_types3 = __toESM(require_prop_types());
    responsivePropType = true ? import_prop_types3.default.oneOfType([import_prop_types3.default.number, import_prop_types3.default.string, import_prop_types3.default.object, import_prop_types3.default.array]) : {};
    responsivePropType_default = responsivePropType;
  }
});

// node_modules/@mui/system/esm/breakpoints.js
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style3) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style3);
}
function mergeBreakpointsInOrder(breakpointsInput, ...styles) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce((prev, next) => deepmerge(prev, next), {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}
function computeBreakpointsBase(breakpointValues, themeBreakpoints) {
  if (typeof breakpointValues !== "object") {
    return {};
  }
  const base = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}
function resolveBreakpointValues({
  values: breakpointValues,
  breakpoints: themeBreakpoints,
  base: customBase
}) {
  const base = customBase || computeBreakpointsBase(breakpointValues, themeBreakpoints);
  const keys = Object.keys(base);
  if (keys.length === 0) {
    return breakpointValues;
  }
  let previous;
  return keys.reduce((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === "object") {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues;
    }
    return acc;
  }, {});
}
var import_prop_types4, values, defaultBreakpoints;
var init_breakpoints = __esm({
  "node_modules/@mui/system/esm/breakpoints.js"() {
    init_extends();
    import_prop_types4 = __toESM(require_prop_types());
    init_deepmerge2();
    init_merge();
    values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    };
    defaultBreakpoints = {
      // Sorted ASC by size. That's important.
      // It can't be configured as it's used statically for propTypes.
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (key) => `@media (min-width:${values[key]}px)`
    };
  }
});

// node_modules/@mui/system/esm/style.js
function getPath(obj, path, checkVars = true) {
  if (!path || typeof path !== "string") {
    return null;
  }
  if (obj && obj.vars && checkVars) {
    const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
    if (val != null) {
      return val;
    }
  }
  return path.split(".").reduce((acc, item) => {
    if (acc && acc[item] != null) {
      return acc[item];
    }
    return null;
  }, obj);
}
function getStyleValue(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform) {
    value = transform(value, userValue, themeMapping);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform
  } = options;
  const fn = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn.propTypes = true ? {
    [prop]: responsivePropType_default
  } : {};
  fn.filterProps = [prop];
  return fn;
}
var style_default;
var init_style = __esm({
  "node_modules/@mui/system/esm/style.js"() {
    init_capitalize2();
    init_responsivePropType();
    init_breakpoints();
    style_default = style;
  }
});

// node_modules/@mui/system/esm/memoize.js
function memoize2(fn) {
  const cache2 = {};
  return (arg) => {
    if (cache2[arg] === void 0) {
      cache2[arg] = fn(arg);
    }
    return cache2[arg];
  };
}
var init_memoize = __esm({
  "node_modules/@mui/system/esm/memoize.js"() {
  }
});

// node_modules/@mui/system/esm/spacing.js
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  var _getPath;
  const themeSpacing = (_getPath = getPath(theme, themeKey, false)) != null ? _getPath : defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (true) {
        if (typeof abs !== "number") {
          console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
        }
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      if (true) {
        if (!Number.isInteger(abs)) {
          console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
        } else if (abs > themeSpacing.length - 1) {
          console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
        }
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  if (true) {
    console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8, "spacing");
}
function getValue(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys, prop, transformer) {
  if (keys.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style2(props, keys) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys, prop, transformer)).reduce(merge_default, {});
}
function margin(props) {
  return style2(props, marginKeys);
}
function padding(props) {
  return style2(props, paddingKeys);
}
function spacing(props) {
  return style2(props, spacingKeys);
}
var properties, directions, aliases, getCssProperties, marginKeys, paddingKeys, spacingKeys, spacing_default;
var init_spacing = __esm({
  "node_modules/@mui/system/esm/spacing.js"() {
    init_responsivePropType();
    init_breakpoints();
    init_style();
    init_merge();
    init_memoize();
    properties = {
      m: "margin",
      p: "padding"
    };
    directions = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"]
    };
    aliases = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
    };
    getCssProperties = memoize2((prop) => {
      if (prop.length > 2) {
        if (aliases[prop]) {
          prop = aliases[prop];
        } else {
          return [prop];
        }
      }
      const [a, b] = prop.split("");
      const property = properties[a];
      const direction = directions[b] || "";
      return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
    });
    marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
    paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
    spacingKeys = [...marginKeys, ...paddingKeys];
    margin.propTypes = true ? marginKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    margin.filterProps = marginKeys;
    padding.propTypes = true ? paddingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    padding.filterProps = paddingKeys;
    spacing.propTypes = true ? spacingKeys.reduce((obj, key) => {
      obj[key] = responsivePropType_default;
      return obj;
    }, {}) : {};
    spacing.filterProps = spacingKeys;
    spacing_default = spacing;
  }
});

// node_modules/@mui/system/esm/compose.js
function compose(...styles) {
  const handlers = styles.reduce((acc, style3) => {
    style3.filterProps.forEach((prop) => {
      acc[prop] = style3;
    });
    return acc;
  }, {});
  const fn = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge_default(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn.propTypes = true ? styles.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
  fn.filterProps = styles.reduce((acc, style3) => acc.concat(style3.filterProps), []);
  return fn;
}
var compose_default;
var init_compose = __esm({
  "node_modules/@mui/system/esm/compose.js"() {
    init_merge();
    compose_default = compose;
  }
});

// node_modules/@mui/system/esm/borders.js
function borderTransform(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
function createBorderStyle(prop, transform) {
  return style_default({
    prop,
    themeKey: "borders",
    transform
  });
}
var border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, outline, outlineColor, borderRadius, borders, borders_default;
var init_borders = __esm({
  "node_modules/@mui/system/esm/borders.js"() {
    init_responsivePropType();
    init_style();
    init_compose();
    init_spacing();
    init_breakpoints();
    border = createBorderStyle("border", borderTransform);
    borderTop = createBorderStyle("borderTop", borderTransform);
    borderRight = createBorderStyle("borderRight", borderTransform);
    borderBottom = createBorderStyle("borderBottom", borderTransform);
    borderLeft = createBorderStyle("borderLeft", borderTransform);
    borderColor = createBorderStyle("borderColor");
    borderTopColor = createBorderStyle("borderTopColor");
    borderRightColor = createBorderStyle("borderRightColor");
    borderBottomColor = createBorderStyle("borderBottomColor");
    borderLeftColor = createBorderStyle("borderLeftColor");
    outline = createBorderStyle("outline", borderTransform);
    outlineColor = createBorderStyle("outlineColor");
    borderRadius = (props) => {
      if (props.borderRadius !== void 0 && props.borderRadius !== null) {
        const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4, "borderRadius");
        const styleFromPropValue = (propValue) => ({
          borderRadius: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
      }
      return null;
    };
    borderRadius.propTypes = true ? {
      borderRadius: responsivePropType_default
    } : {};
    borderRadius.filterProps = ["borderRadius"];
    borders = compose_default(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius, outline, outlineColor);
    borders_default = borders;
  }
});

// node_modules/@mui/system/esm/cssGrid.js
var gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea, grid, cssGrid_default;
var init_cssGrid = __esm({
  "node_modules/@mui/system/esm/cssGrid.js"() {
    init_style();
    init_compose();
    init_spacing();
    init_breakpoints();
    init_responsivePropType();
    gap = (props) => {
      if (props.gap !== void 0 && props.gap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "gap");
        const styleFromPropValue = (propValue) => ({
          gap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.gap, styleFromPropValue);
      }
      return null;
    };
    gap.propTypes = true ? {
      gap: responsivePropType_default
    } : {};
    gap.filterProps = ["gap"];
    columnGap = (props) => {
      if (props.columnGap !== void 0 && props.columnGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "columnGap");
        const styleFromPropValue = (propValue) => ({
          columnGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.columnGap, styleFromPropValue);
      }
      return null;
    };
    columnGap.propTypes = true ? {
      columnGap: responsivePropType_default
    } : {};
    columnGap.filterProps = ["columnGap"];
    rowGap = (props) => {
      if (props.rowGap !== void 0 && props.rowGap !== null) {
        const transformer = createUnaryUnit(props.theme, "spacing", 8, "rowGap");
        const styleFromPropValue = (propValue) => ({
          rowGap: getValue(transformer, propValue)
        });
        return handleBreakpoints(props, props.rowGap, styleFromPropValue);
      }
      return null;
    };
    rowGap.propTypes = true ? {
      rowGap: responsivePropType_default
    } : {};
    rowGap.filterProps = ["rowGap"];
    gridColumn = style_default({
      prop: "gridColumn"
    });
    gridRow = style_default({
      prop: "gridRow"
    });
    gridAutoFlow = style_default({
      prop: "gridAutoFlow"
    });
    gridAutoColumns = style_default({
      prop: "gridAutoColumns"
    });
    gridAutoRows = style_default({
      prop: "gridAutoRows"
    });
    gridTemplateColumns = style_default({
      prop: "gridTemplateColumns"
    });
    gridTemplateRows = style_default({
      prop: "gridTemplateRows"
    });
    gridTemplateAreas = style_default({
      prop: "gridTemplateAreas"
    });
    gridArea = style_default({
      prop: "gridArea"
    });
    grid = compose_default(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
    cssGrid_default = grid;
  }
});

// node_modules/@mui/system/esm/palette.js
function paletteTransform(value, userValue) {
  if (userValue === "grey") {
    return userValue;
  }
  return value;
}
var color, bgcolor, backgroundColor, palette, palette_default;
var init_palette = __esm({
  "node_modules/@mui/system/esm/palette.js"() {
    init_style();
    init_compose();
    color = style_default({
      prop: "color",
      themeKey: "palette",
      transform: paletteTransform
    });
    bgcolor = style_default({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    });
    backgroundColor = style_default({
      prop: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform
    });
    palette = compose_default(color, bgcolor, backgroundColor);
    palette_default = palette;
  }
});

// node_modules/@mui/system/esm/sizing.js
function sizingTransform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width, maxWidth, minWidth, height, maxHeight, minHeight, sizeWidth, sizeHeight, boxSizing, sizing, sizing_default;
var init_sizing = __esm({
  "node_modules/@mui/system/esm/sizing.js"() {
    init_style();
    init_compose();
    init_breakpoints();
    width = style_default({
      prop: "width",
      transform: sizingTransform
    });
    maxWidth = (props) => {
      if (props.maxWidth !== void 0 && props.maxWidth !== null) {
        const styleFromPropValue = (propValue) => {
          var _props$theme, _props$theme2;
          const breakpoint = ((_props$theme = props.theme) == null || (_props$theme = _props$theme.breakpoints) == null || (_props$theme = _props$theme.values) == null ? void 0 : _props$theme[propValue]) || values[propValue];
          if (!breakpoint) {
            return {
              maxWidth: sizingTransform(propValue)
            };
          }
          if (((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.breakpoints) == null ? void 0 : _props$theme2.unit) !== "px") {
            return {
              maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
            };
          }
          return {
            maxWidth: breakpoint
          };
        };
        return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
      }
      return null;
    };
    maxWidth.filterProps = ["maxWidth"];
    minWidth = style_default({
      prop: "minWidth",
      transform: sizingTransform
    });
    height = style_default({
      prop: "height",
      transform: sizingTransform
    });
    maxHeight = style_default({
      prop: "maxHeight",
      transform: sizingTransform
    });
    minHeight = style_default({
      prop: "minHeight",
      transform: sizingTransform
    });
    sizeWidth = style_default({
      prop: "size",
      cssProperty: "width",
      transform: sizingTransform
    });
    sizeHeight = style_default({
      prop: "size",
      cssProperty: "height",
      transform: sizingTransform
    });
    boxSizing = style_default({
      prop: "boxSizing"
    });
    sizing = compose_default(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
    sizing_default = sizing;
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js
var defaultSxConfig, defaultSxConfig_default;
var init_defaultSxConfig = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/defaultSxConfig.js"() {
    init_spacing();
    init_borders();
    init_cssGrid();
    init_palette();
    init_sizing();
    defaultSxConfig = {
      // borders
      border: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderTop: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderRight: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderBottom: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderLeft: {
        themeKey: "borders",
        transform: borderTransform
      },
      borderColor: {
        themeKey: "palette"
      },
      borderTopColor: {
        themeKey: "palette"
      },
      borderRightColor: {
        themeKey: "palette"
      },
      borderBottomColor: {
        themeKey: "palette"
      },
      borderLeftColor: {
        themeKey: "palette"
      },
      outline: {
        themeKey: "borders",
        transform: borderTransform
      },
      outlineColor: {
        themeKey: "palette"
      },
      borderRadius: {
        themeKey: "shape.borderRadius",
        style: borderRadius
      },
      // palette
      color: {
        themeKey: "palette",
        transform: paletteTransform
      },
      bgcolor: {
        themeKey: "palette",
        cssProperty: "backgroundColor",
        transform: paletteTransform
      },
      backgroundColor: {
        themeKey: "palette",
        transform: paletteTransform
      },
      // spacing
      p: {
        style: padding
      },
      pt: {
        style: padding
      },
      pr: {
        style: padding
      },
      pb: {
        style: padding
      },
      pl: {
        style: padding
      },
      px: {
        style: padding
      },
      py: {
        style: padding
      },
      padding: {
        style: padding
      },
      paddingTop: {
        style: padding
      },
      paddingRight: {
        style: padding
      },
      paddingBottom: {
        style: padding
      },
      paddingLeft: {
        style: padding
      },
      paddingX: {
        style: padding
      },
      paddingY: {
        style: padding
      },
      paddingInline: {
        style: padding
      },
      paddingInlineStart: {
        style: padding
      },
      paddingInlineEnd: {
        style: padding
      },
      paddingBlock: {
        style: padding
      },
      paddingBlockStart: {
        style: padding
      },
      paddingBlockEnd: {
        style: padding
      },
      m: {
        style: margin
      },
      mt: {
        style: margin
      },
      mr: {
        style: margin
      },
      mb: {
        style: margin
      },
      ml: {
        style: margin
      },
      mx: {
        style: margin
      },
      my: {
        style: margin
      },
      margin: {
        style: margin
      },
      marginTop: {
        style: margin
      },
      marginRight: {
        style: margin
      },
      marginBottom: {
        style: margin
      },
      marginLeft: {
        style: margin
      },
      marginX: {
        style: margin
      },
      marginY: {
        style: margin
      },
      marginInline: {
        style: margin
      },
      marginInlineStart: {
        style: margin
      },
      marginInlineEnd: {
        style: margin
      },
      marginBlock: {
        style: margin
      },
      marginBlockStart: {
        style: margin
      },
      marginBlockEnd: {
        style: margin
      },
      // display
      displayPrint: {
        cssProperty: false,
        transform: (value) => ({
          "@media print": {
            display: value
          }
        })
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      // flexbox
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      // grid
      gap: {
        style: gap
      },
      rowGap: {
        style: rowGap
      },
      columnGap: {
        style: columnGap
      },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      // positions
      position: {},
      zIndex: {
        themeKey: "zIndex"
      },
      top: {},
      right: {},
      bottom: {},
      left: {},
      // shadows
      boxShadow: {
        themeKey: "shadows"
      },
      // sizing
      width: {
        transform: sizingTransform
      },
      maxWidth: {
        style: maxWidth
      },
      minWidth: {
        transform: sizingTransform
      },
      height: {
        transform: sizingTransform
      },
      maxHeight: {
        transform: sizingTransform
      },
      minHeight: {
        transform: sizingTransform
      },
      boxSizing: {},
      // typography
      fontFamily: {
        themeKey: "typography"
      },
      fontSize: {
        themeKey: "typography"
      },
      fontStyle: {
        themeKey: "typography"
      },
      fontWeight: {
        themeKey: "typography"
      },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: {
        cssProperty: false,
        themeKey: "typography"
      }
    };
    defaultSxConfig_default = defaultSxConfig;
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
  const union = new Set(allKeys);
  return objects.every((object) => union.size === Object.keys(object).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function unstable_createStyleFunctionSx() {
  function getThemeValue(prop, val, theme, config) {
    const props = {
      [prop]: val,
      theme
    };
    const options = config[prop];
    if (!options) {
      return {
        [prop]: val
      };
    }
    const {
      cssProperty = prop,
      themeKey,
      transform,
      style: style3
    } = options;
    if (val == null) {
      return null;
    }
    if (themeKey === "typography" && val === "inherit") {
      return {
        [prop]: val
      };
    }
    const themeMapping = getPath(theme, themeKey) || {};
    if (style3) {
      return style3(props);
    }
    const styleFromPropValue = (propValueFinal) => {
      let value = getStyleValue(themeMapping, transform, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getStyleValue(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, val, styleFromPropValue);
  }
  function styleFunctionSx2(props) {
    var _theme$unstable_sxCon;
    const {
      sx,
      theme = {}
    } = props || {};
    if (!sx) {
      return null;
    }
    const config = (_theme$unstable_sxCon = theme.unstable_sxConfig) != null ? _theme$unstable_sxCon : defaultSxConfig_default;
    function traverse(sxInput) {
      let sxObject = sxInput;
      if (typeof sxInput === "function") {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== "object") {
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }
      const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
      const breakpointsKeys = Object.keys(emptyBreakpoints);
      let css2 = emptyBreakpoints;
      Object.keys(sxObject).forEach((styleKey) => {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value !== null && value !== void 0) {
          if (typeof value === "object") {
            if (config[styleKey]) {
              css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
            } else {
              const breakpointsValues = handleBreakpoints({
                theme
              }, value, (x) => ({
                [styleKey]: x
              }));
              if (objectsHaveSameKeys(breakpointsValues, value)) {
                css2[styleKey] = styleFunctionSx2({
                  sx: value,
                  theme
                });
              } else {
                css2 = merge_default(css2, breakpointsValues);
              }
            }
          } else {
            css2 = merge_default(css2, getThemeValue(styleKey, value, theme, config));
          }
        }
      });
      return removeUnusedBreakpoints(breakpointsKeys, css2);
    }
    return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
  }
  return styleFunctionSx2;
}
var styleFunctionSx, styleFunctionSx_default;
var init_styleFunctionSx = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/styleFunctionSx.js"() {
    init_capitalize2();
    init_merge();
    init_style();
    init_breakpoints();
    init_defaultSxConfig();
    styleFunctionSx = unstable_createStyleFunctionSx();
    styleFunctionSx.filterProps = ["sx"];
    styleFunctionSx_default = styleFunctionSx;
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded3);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  let finalSx;
  if (Array.isArray(inSx)) {
    finalSx = [systemProps, ...inSx];
  } else if (typeof inSx === "function") {
    finalSx = (...args) => {
      const result = inSx(...args);
      if (!isPlainObject(result)) {
        return systemProps;
      }
      return _extends({}, systemProps, result);
    };
  } else {
    finalSx = _extends({}, systemProps, inSx);
  }
  return _extends({}, otherProps, {
    sx: finalSx
  });
}
var _excluded3, splitProps;
var init_extendSxProp = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/extendSxProp.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_deepmerge2();
    init_defaultSxConfig();
    _excluded3 = ["sx"];
    splitProps = (props) => {
      var _props$theme$unstable, _props$theme;
      const result = {
        systemProps: {},
        otherProps: {}
      };
      const config = (_props$theme$unstable = props == null || (_props$theme = props.theme) == null ? void 0 : _props$theme.unstable_sxConfig) != null ? _props$theme$unstable : defaultSxConfig_default;
      Object.keys(props).forEach((prop) => {
        if (config[prop]) {
          result.systemProps[prop] = props[prop];
        } else {
          result.otherProps[prop] = props[prop];
        }
      });
      return result;
    };
  }
});

// node_modules/@mui/system/esm/styleFunctionSx/index.js
var init_styleFunctionSx2 = __esm({
  "node_modules/@mui/system/esm/styleFunctionSx/index.js"() {
    init_styleFunctionSx();
    init_styleFunctionSx();
    init_extendSxProp();
    init_defaultSxConfig();
  }
});

// node_modules/@mui/system/esm/createTheme/createBreakpoints.js
function createBreakpoints(breakpoints) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: values2 = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit = "px",
    step = 5
  } = breakpoints, other = _objectWithoutPropertiesLoose(breakpoints, _excluded4);
  const sortedValues = sortBreakpointsValues(values2);
  const keys = Object.keys(sortedValues);
  function up(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values2[key] === "number" ? values2[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start, end) {
    const endIndex = keys.indexOf(end);
    return `@media (min-width:${typeof values2[start] === "number" ? values2[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1]);
    }
    return up(key);
  }
  function not(key) {
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1]);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex]);
    }
    return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
  }
  return _extends({
    keys,
    values: sortedValues,
    up,
    down,
    between,
    only,
    not,
    unit
  }, other);
}
var _excluded4, sortBreakpointsValues;
var init_createBreakpoints = __esm({
  "node_modules/@mui/system/esm/createTheme/createBreakpoints.js"() {
    init_objectWithoutPropertiesLoose();
    init_extends();
    _excluded4 = ["values", "unit", "step"];
    sortBreakpointsValues = (values2) => {
      const breakpointsAsArray = Object.keys(values2).map((key) => ({
        key,
        val: values2[key]
      })) || [];
      breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
      return breakpointsAsArray.reduce((acc, obj) => {
        return _extends({}, acc, {
          [obj.key]: obj.val
        });
      }, {});
    };
  }
});

// node_modules/@mui/system/esm/createTheme/shape.js
var shape, shape_default;
var init_shape = __esm({
  "node_modules/@mui/system/esm/createTheme/shape.js"() {
    shape = {
      borderRadius: 4
    };
    shape_default = shape;
  }
});

// node_modules/@mui/system/esm/createTheme/createSpacing.js
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    if (true) {
      if (!(argsInput.length <= 4)) {
        console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
      }
    }
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}
var init_createSpacing = __esm({
  "node_modules/@mui/system/esm/createTheme/createSpacing.js"() {
    init_spacing();
  }
});

// node_modules/@mui/system/esm/createTheme/applyStyles.js
function applyStyles(key, styles) {
  const theme = this;
  if (theme.vars && typeof theme.getColorSchemeSelector === "function") {
    const selector = theme.getColorSchemeSelector(key).replace(/(\[[^\]]+\])/, "*:where($1)");
    return {
      [selector]: styles
    };
  }
  if (theme.palette.mode === key) {
    return styles;
  }
  return {};
}
var init_applyStyles = __esm({
  "node_modules/@mui/system/esm/createTheme/applyStyles.js"() {
  }
});

// node_modules/@mui/system/esm/createTheme/createTheme.js
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded5);
  const breakpoints = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape_default, shapeInput)
  }, other);
  muiTheme.applyStyles = applyStyles;
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig_default, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
var _excluded5, createTheme_default;
var init_createTheme = __esm({
  "node_modules/@mui/system/esm/createTheme/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_deepmerge2();
    init_createBreakpoints();
    init_shape();
    init_createSpacing();
    init_styleFunctionSx();
    init_defaultSxConfig();
    init_applyStyles();
    _excluded5 = ["breakpoints", "palette", "spacing", "shape"];
    createTheme_default = createTheme;
  }
});

// node_modules/@mui/system/esm/createTheme/index.js
var init_createTheme2 = __esm({
  "node_modules/@mui/system/esm/createTheme/index.js"() {
    init_createTheme();
    init_createBreakpoints();
    init_applyStyles();
  }
});

// node_modules/@mui/utils/esm/clamp/clamp.js
function clamp(val, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  return Math.max(min, Math.min(val, max));
}
var clamp_default;
var init_clamp = __esm({
  "node_modules/@mui/utils/esm/clamp/clamp.js"() {
    clamp_default = clamp;
  }
});

// node_modules/@mui/utils/esm/clamp/index.js
var clamp_exports = {};
__export(clamp_exports, {
  default: () => clamp_default
});
var init_clamp2 = __esm({
  "node_modules/@mui/utils/esm/clamp/index.js"() {
    init_clamp();
  }
});

// node_modules/@mui/system/colorManipulator.js
var require_colorManipulator = __commonJS({
  "node_modules/@mui/system/colorManipulator.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.alpha = alpha;
    exports.blend = blend;
    exports.colorChannel = void 0;
    exports.darken = darken2;
    exports.decomposeColor = decomposeColor;
    exports.emphasize = emphasize;
    exports.getContrastRatio = getContrastRatio2;
    exports.getLuminance = getLuminance;
    exports.hexToRgb = hexToRgb;
    exports.hslToRgb = hslToRgb;
    exports.lighten = lighten2;
    exports.private_safeAlpha = private_safeAlpha;
    exports.private_safeColorChannel = void 0;
    exports.private_safeDarken = private_safeDarken;
    exports.private_safeEmphasize = private_safeEmphasize;
    exports.private_safeLighten = private_safeLighten;
    exports.recomposeColor = recomposeColor;
    exports.rgbToHex = rgbToHex;
    var _formatMuiErrorMessage2 = _interopRequireDefault((init_formatMuiErrorMessage2(), __toCommonJS(formatMuiErrorMessage_exports)));
    var _clamp = _interopRequireDefault((init_clamp2(), __toCommonJS(clamp_exports)));
    function clampWrapper(value, min = 0, max = 1) {
      if (true) {
        if (value < min || value > max) {
          console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
        }
      }
      return (0, _clamp.default)(value, min, max);
    }
    function hexToRgb(color2) {
      color2 = color2.slice(1);
      const re = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
      let colors = color2.match(re);
      if (colors && colors[0].length === 1) {
        colors = colors.map((n) => n + n);
      }
      return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n, index) => {
        return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3;
      }).join(", ")})` : "";
    }
    function intToHex(int) {
      const hex = int.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }
    function decomposeColor(color2) {
      if (color2.type) {
        return color2;
      }
      if (color2.charAt(0) === "#") {
        return decomposeColor(hexToRgb(color2));
      }
      const marker = color2.indexOf("(");
      const type = color2.substring(0, marker);
      if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
        throw new Error(true ? `MUI: Unsupported \`${color2}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : (0, _formatMuiErrorMessage2.default)(9, color2));
      }
      let values2 = color2.substring(marker + 1, color2.length - 1);
      let colorSpace;
      if (type === "color") {
        values2 = values2.split(" ");
        colorSpace = values2.shift();
        if (values2.length === 4 && values2[3].charAt(0) === "/") {
          values2[3] = values2[3].slice(1);
        }
        if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
          throw new Error(true ? `MUI: unsupported \`${colorSpace}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : (0, _formatMuiErrorMessage2.default)(10, colorSpace));
        }
      } else {
        values2 = values2.split(",");
      }
      values2 = values2.map((value) => parseFloat(value));
      return {
        type,
        values: values2,
        colorSpace
      };
    }
    var colorChannel = (color2) => {
      const decomposedColor = decomposeColor(color2);
      return decomposedColor.values.slice(0, 3).map((val, idx) => decomposedColor.type.indexOf("hsl") !== -1 && idx !== 0 ? `${val}%` : val).join(" ");
    };
    exports.colorChannel = colorChannel;
    var private_safeColorChannel = (color2, warning) => {
      try {
        return colorChannel(color2);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    };
    exports.private_safeColorChannel = private_safeColorChannel;
    function recomposeColor(color2) {
      const {
        type,
        colorSpace
      } = color2;
      let {
        values: values2
      } = color2;
      if (type.indexOf("rgb") !== -1) {
        values2 = values2.map((n, i) => i < 3 ? parseInt(n, 10) : n);
      } else if (type.indexOf("hsl") !== -1) {
        values2[1] = `${values2[1]}%`;
        values2[2] = `${values2[2]}%`;
      }
      if (type.indexOf("color") !== -1) {
        values2 = `${colorSpace} ${values2.join(" ")}`;
      } else {
        values2 = `${values2.join(", ")}`;
      }
      return `${type}(${values2})`;
    }
    function rgbToHex(color2) {
      if (color2.indexOf("#") === 0) {
        return color2;
      }
      const {
        values: values2
      } = decomposeColor(color2);
      return `#${values2.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join("")}`;
    }
    function hslToRgb(color2) {
      color2 = decomposeColor(color2);
      const {
        values: values2
      } = color2;
      const h = values2[0];
      const s = values2[1] / 100;
      const l = values2[2] / 100;
      const a = s * Math.min(l, 1 - l);
      const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      let type = "rgb";
      const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
      if (color2.type === "hsla") {
        type += "a";
        rgb.push(values2[3]);
      }
      return recomposeColor({
        type,
        values: rgb
      });
    }
    function getLuminance(color2) {
      color2 = decomposeColor(color2);
      let rgb = color2.type === "hsl" || color2.type === "hsla" ? decomposeColor(hslToRgb(color2)).values : color2.values;
      rgb = rgb.map((val) => {
        if (color2.type !== "color") {
          val /= 255;
        }
        return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
      });
      return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
    }
    function getContrastRatio2(foreground, background) {
      const lumA = getLuminance(foreground);
      const lumB = getLuminance(background);
      return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
    }
    function alpha(color2, value) {
      color2 = decomposeColor(color2);
      value = clampWrapper(value);
      if (color2.type === "rgb" || color2.type === "hsl") {
        color2.type += "a";
      }
      if (color2.type === "color") {
        color2.values[3] = `/${value}`;
      } else {
        color2.values[3] = value;
      }
      return recomposeColor(color2);
    }
    function private_safeAlpha(color2, value, warning) {
      try {
        return alpha(color2, value);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    }
    function darken2(color2, coefficient) {
      color2 = decomposeColor(color2);
      coefficient = clampWrapper(coefficient);
      if (color2.type.indexOf("hsl") !== -1) {
        color2.values[2] *= 1 - coefficient;
      } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
        for (let i = 0; i < 3; i += 1) {
          color2.values[i] *= 1 - coefficient;
        }
      }
      return recomposeColor(color2);
    }
    function private_safeDarken(color2, coefficient, warning) {
      try {
        return darken2(color2, coefficient);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    }
    function lighten2(color2, coefficient) {
      color2 = decomposeColor(color2);
      coefficient = clampWrapper(coefficient);
      if (color2.type.indexOf("hsl") !== -1) {
        color2.values[2] += (100 - color2.values[2]) * coefficient;
      } else if (color2.type.indexOf("rgb") !== -1) {
        for (let i = 0; i < 3; i += 1) {
          color2.values[i] += (255 - color2.values[i]) * coefficient;
        }
      } else if (color2.type.indexOf("color") !== -1) {
        for (let i = 0; i < 3; i += 1) {
          color2.values[i] += (1 - color2.values[i]) * coefficient;
        }
      }
      return recomposeColor(color2);
    }
    function private_safeLighten(color2, coefficient, warning) {
      try {
        return lighten2(color2, coefficient);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    }
    function emphasize(color2, coefficient = 0.15) {
      return getLuminance(color2) > 0.5 ? darken2(color2, coefficient) : lighten2(color2, coefficient);
    }
    function private_safeEmphasize(color2, coefficient, warning) {
      try {
        return emphasize(color2, coefficient);
      } catch (error) {
        if (warning && true) {
          console.warn(warning);
        }
        return color2;
      }
    }
    function blend(background, overlay, opacity, gamma = 1) {
      const blendChannel = (b, o) => Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);
      const backgroundColor2 = decomposeColor(background);
      const overlayColor = decomposeColor(overlay);
      const rgb = [blendChannel(backgroundColor2.values[0], overlayColor.values[0]), blendChannel(backgroundColor2.values[1], overlayColor.values[1]), blendChannel(backgroundColor2.values[2], overlayColor.values[2])];
      return recomposeColor({
        type: "rgb",
        values: rgb
      });
    }
  }
});

// node_modules/@mui/material/colors/common.js
var common, common_default;
var init_common = __esm({
  "node_modules/@mui/material/colors/common.js"() {
    common = {
      black: "#000",
      white: "#fff"
    };
    common_default = common;
  }
});

// node_modules/@mui/material/colors/grey.js
var grey, grey_default;
var init_grey = __esm({
  "node_modules/@mui/material/colors/grey.js"() {
    grey = {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#f5f5f5",
      A200: "#eeeeee",
      A400: "#bdbdbd",
      A700: "#616161"
    };
    grey_default = grey;
  }
});

// node_modules/@mui/material/colors/purple.js
var purple, purple_default;
var init_purple = __esm({
  "node_modules/@mui/material/colors/purple.js"() {
    purple = {
      50: "#f3e5f5",
      100: "#e1bee7",
      200: "#ce93d8",
      300: "#ba68c8",
      400: "#ab47bc",
      500: "#9c27b0",
      600: "#8e24aa",
      700: "#7b1fa2",
      800: "#6a1b9a",
      900: "#4a148c",
      A100: "#ea80fc",
      A200: "#e040fb",
      A400: "#d500f9",
      A700: "#aa00ff"
    };
    purple_default = purple;
  }
});

// node_modules/@mui/material/colors/red.js
var red, red_default;
var init_red = __esm({
  "node_modules/@mui/material/colors/red.js"() {
    red = {
      50: "#ffebee",
      100: "#ffcdd2",
      200: "#ef9a9a",
      300: "#e57373",
      400: "#ef5350",
      500: "#f44336",
      600: "#e53935",
      700: "#d32f2f",
      800: "#c62828",
      900: "#b71c1c",
      A100: "#ff8a80",
      A200: "#ff5252",
      A400: "#ff1744",
      A700: "#d50000"
    };
    red_default = red;
  }
});

// node_modules/@mui/material/colors/orange.js
var orange, orange_default;
var init_orange = __esm({
  "node_modules/@mui/material/colors/orange.js"() {
    orange = {
      50: "#fff3e0",
      100: "#ffe0b2",
      200: "#ffcc80",
      300: "#ffb74d",
      400: "#ffa726",
      500: "#ff9800",
      600: "#fb8c00",
      700: "#f57c00",
      800: "#ef6c00",
      900: "#e65100",
      A100: "#ffd180",
      A200: "#ffab40",
      A400: "#ff9100",
      A700: "#ff6d00"
    };
    orange_default = orange;
  }
});

// node_modules/@mui/material/colors/blue.js
var blue, blue_default;
var init_blue = __esm({
  "node_modules/@mui/material/colors/blue.js"() {
    blue = {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
      A100: "#82b1ff",
      A200: "#448aff",
      A400: "#2979ff",
      A700: "#2962ff"
    };
    blue_default = blue;
  }
});

// node_modules/@mui/material/colors/lightBlue.js
var lightBlue, lightBlue_default;
var init_lightBlue = __esm({
  "node_modules/@mui/material/colors/lightBlue.js"() {
    lightBlue = {
      50: "#e1f5fe",
      100: "#b3e5fc",
      200: "#81d4fa",
      300: "#4fc3f7",
      400: "#29b6f6",
      500: "#03a9f4",
      600: "#039be5",
      700: "#0288d1",
      800: "#0277bd",
      900: "#01579b",
      A100: "#80d8ff",
      A200: "#40c4ff",
      A400: "#00b0ff",
      A700: "#0091ea"
    };
    lightBlue_default = lightBlue;
  }
});

// node_modules/@mui/material/colors/green.js
var green, green_default;
var init_green = __esm({
  "node_modules/@mui/material/colors/green.js"() {
    green = {
      50: "#e8f5e9",
      100: "#c8e6c9",
      200: "#a5d6a7",
      300: "#81c784",
      400: "#66bb6a",
      500: "#4caf50",
      600: "#43a047",
      700: "#388e3c",
      800: "#2e7d32",
      900: "#1b5e20",
      A100: "#b9f6ca",
      A200: "#69f0ae",
      A400: "#00e676",
      A700: "#00c853"
    };
    green_default = green;
  }
});

// node_modules/@mui/material/styles/createPalette.js
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = (0, import_colorManipulator.lighten)(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = (0, import_colorManipulator.darken)(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue_default[200],
      light: blue_default[50],
      dark: blue_default[400]
    };
  }
  return {
    main: blue_default[700],
    light: blue_default[400],
    dark: blue_default[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple_default[200],
      light: purple_default[50],
      dark: purple_default[400]
    };
  }
  return {
    main: purple_default[500],
    light: purple_default[300],
    dark: purple_default[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red_default[500],
      light: red_default[300],
      dark: red_default[700]
    };
  }
  return {
    main: red_default[700],
    light: red_default[400],
    dark: red_default[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue_default[400],
      light: lightBlue_default[300],
      dark: lightBlue_default[700]
    };
  }
  return {
    main: lightBlue_default[700],
    light: lightBlue_default[500],
    dark: lightBlue_default[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green_default[400],
      light: green_default[300],
      dark: green_default[700]
    };
  }
  return {
    main: green_default[800],
    light: green_default[500],
    dark: green_default[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange_default[400],
      light: orange_default[300],
      dark: orange_default[700]
    };
  }
  return {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: orange_default[500],
    dark: orange_default[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded6);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = (0, import_colorManipulator.getContrastRatio)(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (true) {
      const contrast = (0, import_colorManipulator.getContrastRatio)(background, contrastText);
      if (contrast < 3) {
        console.error([`MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join("\n"));
      }
    }
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${mainShade}\` property.` : formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(true ? `MUI: The color${name ? ` (${name})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(color2.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes = {
    dark,
    light
  };
  if (true) {
    if (!modes[mode]) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }
  const paletteOutput = deepmerge(_extends({
    // A collection of common colors.
    common: _extends({}, common_default),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor({
      color: error,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor({
      color: info,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor({
      color: success,
      name: "success"
    }),
    // The grey colors.
    grey: grey_default,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText,
    // Generate a rich color object.
    augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset
  }, modes[mode]), other);
  return paletteOutput;
}
var import_colorManipulator, _excluded6, light, dark;
var init_createPalette = __esm({
  "node_modules/@mui/material/styles/createPalette.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    import_colorManipulator = __toESM(require_colorManipulator());
    init_common();
    init_grey();
    init_purple();
    init_red();
    init_orange();
    init_blue();
    init_lightBlue();
    init_green();
    _excluded6 = ["mode", "contrastThreshold", "tonalOffset"];
    light = {
      // The colors used to style the text.
      text: {
        // The most important text.
        primary: "rgba(0, 0, 0, 0.87)",
        // Secondary text.
        secondary: "rgba(0, 0, 0, 0.6)",
        // Disabled text have even lower visual prominence.
        disabled: "rgba(0, 0, 0, 0.38)"
      },
      // The color used to divide different elements.
      divider: "rgba(0, 0, 0, 0.12)",
      // The background colors used to style the surfaces.
      // Consistency between these values is important.
      background: {
        paper: common_default.white,
        default: common_default.white
      },
      // The colors used to style the action elements.
      action: {
        // The color of an active action like an icon button.
        active: "rgba(0, 0, 0, 0.54)",
        // The color of an hovered action.
        hover: "rgba(0, 0, 0, 0.04)",
        hoverOpacity: 0.04,
        // The color of a selected action.
        selected: "rgba(0, 0, 0, 0.08)",
        selectedOpacity: 0.08,
        // The color of a disabled action.
        disabled: "rgba(0, 0, 0, 0.26)",
        // The background color of a disabled action.
        disabledBackground: "rgba(0, 0, 0, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(0, 0, 0, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.12
      }
    };
    dark = {
      text: {
        primary: common_default.white,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        icon: "rgba(255, 255, 255, 0.5)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      background: {
        paper: "#121212",
        default: "#121212"
      },
      action: {
        active: common_default.white,
        hover: "rgba(255, 255, 255, 0.08)",
        hoverOpacity: 0.08,
        selected: "rgba(255, 255, 255, 0.16)",
        selectedOpacity: 0.16,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        disabledOpacity: 0.38,
        focus: "rgba(255, 255, 255, 0.12)",
        focusOpacity: 0.12,
        activatedOpacity: 0.24
      }
    };
  }
});

// node_modules/@mui/material/styles/shadows.js
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadowKeyUmbraOpacity, shadowKeyPenumbraOpacity, shadowAmbientShadowOpacity, shadows, shadows_default;
var init_shadows = __esm({
  "node_modules/@mui/material/styles/shadows.js"() {
    shadowKeyUmbraOpacity = 0.2;
    shadowKeyPenumbraOpacity = 0.14;
    shadowAmbientShadowOpacity = 0.12;
    shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
    shadows_default = shadows;
  }
});

// node_modules/@mui/material/styles/zIndex.js
var zIndex, zIndex_default;
var init_zIndex = __esm({
  "node_modules/@mui/material/styles/zIndex.js"() {
    zIndex = {
      mobileStepper: 1e3,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500
    };
    zIndex_default = zIndex;
  }
});

// node_modules/@mui/material/styles/createTheme.js
function createTheme2(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded7);
  if (options.vars) {
    throw new Error(true ? `MUI: \`vars\` is a private field used for CSS variables support.
Please use another name.` : formatMuiErrorMessage(18));
  }
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme_default(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, mixinsInput),
    palette: palette2,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: shadows_default.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex_default)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  if (true) {
    const stateClasses = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"];
    const traverse = (node, component) => {
      let key;
      for (key in node) {
        const child = node[key];
        if (stateClasses.indexOf(key) !== -1 && Object.keys(child).length > 0) {
          if (true) {
            const stateClass = generateUtilityClass("", key);
            console.error([`MUI: The \`${component}\` component increases the CSS specificity of the \`${key}\` internal state.`, "You can not override it like this: ", JSON.stringify(node, null, 2), "", `Instead, you need to use the '&.${stateClass}' syntax:`, JSON.stringify({
              root: {
                [`&.${stateClass}`]: child
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join("\n"));
          }
          node[key] = {};
        }
      }
    };
    Object.keys(muiTheme.components).forEach((component) => {
      const styleOverrides = muiTheme.components[component].styleOverrides;
      if (styleOverrides && component.indexOf("Mui") === 0) {
        traverse(styleOverrides, component);
      }
    });
  }
  muiTheme.unstable_sxConfig = _extends({}, defaultSxConfig_default, other == null ? void 0 : other.unstable_sxConfig);
  muiTheme.unstable_sx = function sx(props) {
    return styleFunctionSx_default({
      sx: props,
      theme: this
    });
  };
  return muiTheme;
}
function createMuiTheme(...args) {
  if (true) {
    if (!warnedOnce) {
      warnedOnce = true;
      console.error(["MUI: the createMuiTheme function was renamed to createTheme.", "", "You should use `import { createTheme } from '@mui/material/styles'`"].join("\n"));
    }
  }
  return createTheme2(...args);
}
var _excluded7, warnedOnce, createTheme_default2;
var init_createTheme3 = __esm({
  "node_modules/@mui/material/styles/createTheme.js"() {
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_formatMuiErrorMessage2();
    init_deepmerge2();
    init_styleFunctionSx2();
    init_createTheme2();
    init_generateUtilityClass2();
    init_createMixins();
    init_createPalette();
    init_createTypography();
    init_shadows();
    init_createTransitions();
    init_zIndex();
    _excluded7 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
    warnedOnce = false;
    createTheme_default2 = createTheme2;
  }
});

// node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "node_modules/@babel/runtime/helpers/extends.js"(exports, module) {
    function _extends2() {
      return module.exports = _extends2 = Object.assign ? Object.assign.bind() : function(n) {
        for (var e = 1; e < arguments.length; e++) {
          var t = arguments[e];
          for (var r in t)
            ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends2.apply(null, arguments);
    }
    module.exports = _extends2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js
var require_objectWithoutPropertiesLoose = __commonJS({
  "node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js"(exports, module) {
    function _objectWithoutPropertiesLoose2(r, e) {
      if (null == r)
        return {};
      var t = {};
      for (var n in r)
        if ({}.hasOwnProperty.call(r, n)) {
          if (e.includes(n))
            continue;
          t[n] = r[n];
        }
      return t;
    }
    module.exports = _objectWithoutPropertiesLoose2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (true) {
      (function() {
        "use strict";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for("react.server_context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                  case REACT_SUSPENSE_LIST_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_SERVER_CONTEXT_TYPE:
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef2 = REACT_FORWARD_REF_TYPE;
        var Fragment2 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo2 = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isConcurrentMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
              hasWarnedAboutDeprecatedIsConcurrentMode = true;
              console["warn"]("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.");
            }
          }
          return false;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
          return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef2;
        exports.Fragment = Fragment2;
        exports.Lazy = Lazy;
        exports.Memo = Memo2;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS({
  "node_modules/react-is/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_is_development();
    }
  }
});

// node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js
function getFunctionName(fn) {
  const match = `${fn}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || "";
}
function getFunctionComponentName(Component, fallback = "") {
  return Component.displayName || Component.name || getFunctionName(Component) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component) {
  if (Component == null) {
    return void 0;
  }
  if (typeof Component === "string") {
    return Component;
  }
  if (typeof Component === "function") {
    return getFunctionComponentName(Component, "Component");
  }
  if (typeof Component === "object") {
    switch (Component.$$typeof) {
      case import_react_is.ForwardRef:
        return getWrappedName(Component, Component.render, "ForwardRef");
      case import_react_is.Memo:
        return getWrappedName(Component, Component.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
var import_react_is, fnNameMatchRegex;
var init_getDisplayName = __esm({
  "node_modules/@mui/utils/esm/getDisplayName/getDisplayName.js"() {
    import_react_is = __toESM(require_react_is());
    fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
  }
});

// node_modules/@mui/utils/esm/getDisplayName/index.js
var getDisplayName_exports = {};
__export(getDisplayName_exports, {
  default: () => getDisplayName,
  getFunctionName: () => getFunctionName
});
var init_getDisplayName2 = __esm({
  "node_modules/@mui/utils/esm/getDisplayName/index.js"() {
    init_getDisplayName();
    init_getDisplayName();
  }
});

// node_modules/@mui/system/createTheme/createBreakpoints.js
var require_createBreakpoints = __commonJS({
  "node_modules/@mui/system/createTheme/createBreakpoints.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.breakpointKeys = void 0;
    exports.default = createBreakpoints2;
    var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require_objectWithoutPropertiesLoose());
    var _extends2 = _interopRequireDefault(require_extends());
    var _excluded8 = ["values", "unit", "step"];
    var breakpointKeys = exports.breakpointKeys = ["xs", "sm", "md", "lg", "xl"];
    var sortBreakpointsValues2 = (values2) => {
      const breakpointsAsArray = Object.keys(values2).map((key) => ({
        key,
        val: values2[key]
      })) || [];
      breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
      return breakpointsAsArray.reduce((acc, obj) => {
        return (0, _extends2.default)({}, acc, {
          [obj.key]: obj.val
        });
      }, {});
    };
    function createBreakpoints2(breakpoints) {
      const {
        // The breakpoint **start** at this value.
        // For instance with the first breakpoint xs: [xs, sm).
        values: values2 = {
          xs: 0,
          // phone
          sm: 600,
          // tablet
          md: 900,
          // small laptop
          lg: 1200,
          // desktop
          xl: 1536
          // large screen
        },
        unit = "px",
        step = 5
      } = breakpoints, other = (0, _objectWithoutPropertiesLoose2.default)(breakpoints, _excluded8);
      const sortedValues = sortBreakpointsValues2(values2);
      const keys = Object.keys(sortedValues);
      function up(key) {
        const value = typeof values2[key] === "number" ? values2[key] : key;
        return `@media (min-width:${value}${unit})`;
      }
      function down(key) {
        const value = typeof values2[key] === "number" ? values2[key] : key;
        return `@media (max-width:${value - step / 100}${unit})`;
      }
      function between(start, end) {
        const endIndex = keys.indexOf(end);
        return `@media (min-width:${typeof values2[start] === "number" ? values2[start] : start}${unit}) and (max-width:${(endIndex !== -1 && typeof values2[keys[endIndex]] === "number" ? values2[keys[endIndex]] : end) - step / 100}${unit})`;
      }
      function only(key) {
        if (keys.indexOf(key) + 1 < keys.length) {
          return between(key, keys[keys.indexOf(key) + 1]);
        }
        return up(key);
      }
      function not(key) {
        const keyIndex = keys.indexOf(key);
        if (keyIndex === 0) {
          return up(keys[1]);
        }
        if (keyIndex === keys.length - 1) {
          return down(keys[keyIndex]);
        }
        return between(key, keys[keys.indexOf(key) + 1]).replace("@media", "@media not all and");
      }
      return (0, _extends2.default)({
        keys,
        values: sortedValues,
        up,
        down,
        between,
        only,
        not,
        unit
      }, other);
    }
  }
});

// node_modules/@mui/system/createTheme/shape.js
var require_shape = __commonJS({
  "node_modules/@mui/system/createTheme/shape.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var shape2 = {
      borderRadius: 4
    };
    var _default = exports.default = shape2;
  }
});

// node_modules/@mui/system/responsivePropType.js
var require_responsivePropType = __commonJS({
  "node_modules/@mui/system/responsivePropType.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _propTypes = _interopRequireDefault(require_prop_types());
    var responsivePropType2 = true ? _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.object, _propTypes.default.array]) : {};
    var _default = exports.default = responsivePropType2;
  }
});

// node_modules/@mui/system/merge.js
var require_merge = __commonJS({
  "node_modules/@mui/system/merge.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _deepmerge = _interopRequireDefault((init_deepmerge2(), __toCommonJS(deepmerge_exports)));
    function merge2(acc, item) {
      if (!item) {
        return acc;
      }
      return (0, _deepmerge.default)(acc, item, {
        clone: false
        // No need to clone deep, it's way faster.
      });
    }
    var _default = exports.default = merge2;
  }
});

// node_modules/@mui/system/breakpoints.js
var require_breakpoints = __commonJS({
  "node_modules/@mui/system/breakpoints.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.computeBreakpointsBase = computeBreakpointsBase2;
    exports.createEmptyBreakpointObject = createEmptyBreakpointObject2;
    exports.default = void 0;
    exports.handleBreakpoints = handleBreakpoints2;
    exports.mergeBreakpointsInOrder = mergeBreakpointsInOrder2;
    exports.removeUnusedBreakpoints = removeUnusedBreakpoints2;
    exports.resolveBreakpointValues = resolveBreakpointValues2;
    exports.values = void 0;
    var _extends2 = _interopRequireDefault(require_extends());
    var _propTypes = _interopRequireDefault(require_prop_types());
    var _deepmerge = _interopRequireDefault((init_deepmerge2(), __toCommonJS(deepmerge_exports)));
    var _merge = _interopRequireDefault(require_merge());
    var values2 = exports.values = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    };
    var defaultBreakpoints2 = {
      // Sorted ASC by size. That's important.
      // It can't be configured as it's used statically for propTypes.
      keys: ["xs", "sm", "md", "lg", "xl"],
      up: (key) => `@media (min-width:${values2[key]}px)`
    };
    function handleBreakpoints2(props, propValue, styleFromPropValue) {
      const theme = props.theme || {};
      if (Array.isArray(propValue)) {
        const themeBreakpoints = theme.breakpoints || defaultBreakpoints2;
        return propValue.reduce((acc, item, index) => {
          acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
          return acc;
        }, {});
      }
      if (typeof propValue === "object") {
        const themeBreakpoints = theme.breakpoints || defaultBreakpoints2;
        return Object.keys(propValue).reduce((acc, breakpoint) => {
          if (Object.keys(themeBreakpoints.values || values2).indexOf(breakpoint) !== -1) {
            const mediaKey = themeBreakpoints.up(breakpoint);
            acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
          } else {
            const cssKey = breakpoint;
            acc[cssKey] = propValue[cssKey];
          }
          return acc;
        }, {});
      }
      const output = styleFromPropValue(propValue);
      return output;
    }
    function breakpoints(styleFunction) {
      const newStyleFunction = (props) => {
        const theme = props.theme || {};
        const base = styleFunction(props);
        const themeBreakpoints = theme.breakpoints || defaultBreakpoints2;
        const extended = themeBreakpoints.keys.reduce((acc, key) => {
          if (props[key]) {
            acc = acc || {};
            acc[themeBreakpoints.up(key)] = styleFunction((0, _extends2.default)({
              theme
            }, props[key]));
          }
          return acc;
        }, null);
        return (0, _merge.default)(base, extended);
      };
      newStyleFunction.propTypes = true ? (0, _extends2.default)({}, styleFunction.propTypes, {
        xs: _propTypes.default.object,
        sm: _propTypes.default.object,
        md: _propTypes.default.object,
        lg: _propTypes.default.object,
        xl: _propTypes.default.object
      }) : {};
      newStyleFunction.filterProps = ["xs", "sm", "md", "lg", "xl", ...styleFunction.filterProps];
      return newStyleFunction;
    }
    function createEmptyBreakpointObject2(breakpointsInput = {}) {
      var _breakpointsInput$key;
      const breakpointsInOrder = (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
        const breakpointStyleKey = breakpointsInput.up(key);
        acc[breakpointStyleKey] = {};
        return acc;
      }, {});
      return breakpointsInOrder || {};
    }
    function removeUnusedBreakpoints2(breakpointKeys, style3) {
      return breakpointKeys.reduce((acc, key) => {
        const breakpointOutput = acc[key];
        const isBreakpointUnused = !breakpointOutput || Object.keys(breakpointOutput).length === 0;
        if (isBreakpointUnused) {
          delete acc[key];
        }
        return acc;
      }, style3);
    }
    function mergeBreakpointsInOrder2(breakpointsInput, ...styles) {
      const emptyBreakpoints = createEmptyBreakpointObject2(breakpointsInput);
      const mergedOutput = [emptyBreakpoints, ...styles].reduce((prev, next) => (0, _deepmerge.default)(prev, next), {});
      return removeUnusedBreakpoints2(Object.keys(emptyBreakpoints), mergedOutput);
    }
    function computeBreakpointsBase2(breakpointValues, themeBreakpoints) {
      if (typeof breakpointValues !== "object") {
        return {};
      }
      const base = {};
      const breakpointsKeys = Object.keys(themeBreakpoints);
      if (Array.isArray(breakpointValues)) {
        breakpointsKeys.forEach((breakpoint, i) => {
          if (i < breakpointValues.length) {
            base[breakpoint] = true;
          }
        });
      } else {
        breakpointsKeys.forEach((breakpoint) => {
          if (breakpointValues[breakpoint] != null) {
            base[breakpoint] = true;
          }
        });
      }
      return base;
    }
    function resolveBreakpointValues2({
      values: breakpointValues,
      breakpoints: themeBreakpoints,
      base: customBase
    }) {
      const base = customBase || computeBreakpointsBase2(breakpointValues, themeBreakpoints);
      const keys = Object.keys(base);
      if (keys.length === 0) {
        return breakpointValues;
      }
      let previous;
      return keys.reduce((acc, breakpoint, i) => {
        if (Array.isArray(breakpointValues)) {
          acc[breakpoint] = breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
          previous = i;
        } else if (typeof breakpointValues === "object") {
          acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
          previous = breakpoint;
        } else {
          acc[breakpoint] = breakpointValues;
        }
        return acc;
      }, {});
    }
    var _default = exports.default = breakpoints;
  }
});

// node_modules/@mui/system/style.js
var require_style = __commonJS({
  "node_modules/@mui/system/style.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.getPath = getPath2;
    exports.getStyleValue = getStyleValue2;
    var _capitalize = _interopRequireDefault((init_capitalize2(), __toCommonJS(capitalize_exports)));
    var _responsivePropType = _interopRequireDefault(require_responsivePropType());
    var _breakpoints = require_breakpoints();
    function getPath2(obj, path, checkVars = true) {
      if (!path || typeof path !== "string") {
        return null;
      }
      if (obj && obj.vars && checkVars) {
        const val = `vars.${path}`.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
        if (val != null) {
          return val;
        }
      }
      return path.split(".").reduce((acc, item) => {
        if (acc && acc[item] != null) {
          return acc[item];
        }
        return null;
      }, obj);
    }
    function getStyleValue2(themeMapping, transform, propValueFinal, userValue = propValueFinal) {
      let value;
      if (typeof themeMapping === "function") {
        value = themeMapping(propValueFinal);
      } else if (Array.isArray(themeMapping)) {
        value = themeMapping[propValueFinal] || userValue;
      } else {
        value = getPath2(themeMapping, propValueFinal) || userValue;
      }
      if (transform) {
        value = transform(value, userValue, themeMapping);
      }
      return value;
    }
    function style3(options) {
      const {
        prop,
        cssProperty = options.prop,
        themeKey,
        transform
      } = options;
      const fn = (props) => {
        if (props[prop] == null) {
          return null;
        }
        const propValue = props[prop];
        const theme = props.theme;
        const themeMapping = getPath2(theme, themeKey) || {};
        const styleFromPropValue = (propValueFinal) => {
          let value = getStyleValue2(themeMapping, transform, propValueFinal);
          if (propValueFinal === value && typeof propValueFinal === "string") {
            value = getStyleValue2(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : (0, _capitalize.default)(propValueFinal)}`, propValueFinal);
          }
          if (cssProperty === false) {
            return value;
          }
          return {
            [cssProperty]: value
          };
        };
        return (0, _breakpoints.handleBreakpoints)(props, propValue, styleFromPropValue);
      };
      fn.propTypes = true ? {
        [prop]: _responsivePropType.default
      } : {};
      fn.filterProps = [prop];
      return fn;
    }
    var _default = exports.default = style3;
  }
});

// node_modules/@mui/system/memoize.js
var require_memoize = __commonJS({
  "node_modules/@mui/system/memoize.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = memoize3;
    function memoize3(fn) {
      const cache2 = {};
      return (arg) => {
        if (cache2[arg] === void 0) {
          cache2[arg] = fn(arg);
        }
        return cache2[arg];
      };
    }
  }
});

// node_modules/@mui/system/spacing.js
var require_spacing = __commonJS({
  "node_modules/@mui/system/spacing.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.createUnarySpacing = createUnarySpacing2;
    exports.createUnaryUnit = createUnaryUnit2;
    exports.default = void 0;
    exports.getStyleFromPropValue = getStyleFromPropValue2;
    exports.getValue = getValue2;
    exports.margin = margin2;
    exports.marginKeys = void 0;
    exports.padding = padding2;
    exports.paddingKeys = void 0;
    var _responsivePropType = _interopRequireDefault(require_responsivePropType());
    var _breakpoints = require_breakpoints();
    var _style = require_style();
    var _merge = _interopRequireDefault(require_merge());
    var _memoize = _interopRequireDefault(require_memoize());
    var properties2 = {
      m: "margin",
      p: "padding"
    };
    var directions2 = {
      t: "Top",
      r: "Right",
      b: "Bottom",
      l: "Left",
      x: ["Left", "Right"],
      y: ["Top", "Bottom"]
    };
    var aliases2 = {
      marginX: "mx",
      marginY: "my",
      paddingX: "px",
      paddingY: "py"
    };
    var getCssProperties2 = (0, _memoize.default)((prop) => {
      if (prop.length > 2) {
        if (aliases2[prop]) {
          prop = aliases2[prop];
        } else {
          return [prop];
        }
      }
      const [a, b] = prop.split("");
      const property = properties2[a];
      const direction = directions2[b] || "";
      return Array.isArray(direction) ? direction.map((dir) => property + dir) : [property + direction];
    });
    var marginKeys2 = exports.marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
    var paddingKeys2 = exports.paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
    var spacingKeys2 = [...marginKeys2, ...paddingKeys2];
    function createUnaryUnit2(theme, themeKey, defaultValue, propName) {
      var _getPath;
      const themeSpacing = (_getPath = (0, _style.getPath)(theme, themeKey, false)) != null ? _getPath : defaultValue;
      if (typeof themeSpacing === "number") {
        return (abs) => {
          if (typeof abs === "string") {
            return abs;
          }
          if (true) {
            if (typeof abs !== "number") {
              console.error(`MUI: Expected ${propName} argument to be a number or a string, got ${abs}.`);
            }
          }
          return themeSpacing * abs;
        };
      }
      if (Array.isArray(themeSpacing)) {
        return (abs) => {
          if (typeof abs === "string") {
            return abs;
          }
          if (true) {
            if (!Number.isInteger(abs)) {
              console.error([`MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`].join("\n"));
            } else if (abs > themeSpacing.length - 1) {
              console.error([`MUI: The value provided (${abs}) overflows.`, `The supported values are: ${JSON.stringify(themeSpacing)}.`, `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`].join("\n"));
            }
          }
          return themeSpacing[abs];
        };
      }
      if (typeof themeSpacing === "function") {
        return themeSpacing;
      }
      if (true) {
        console.error([`MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`, "It should be a number, an array or a function."].join("\n"));
      }
      return () => void 0;
    }
    function createUnarySpacing2(theme) {
      return createUnaryUnit2(theme, "spacing", 8, "spacing");
    }
    function getValue2(transformer, propValue) {
      if (typeof propValue === "string" || propValue == null) {
        return propValue;
      }
      const abs = Math.abs(propValue);
      const transformed = transformer(abs);
      if (propValue >= 0) {
        return transformed;
      }
      if (typeof transformed === "number") {
        return -transformed;
      }
      return `-${transformed}`;
    }
    function getStyleFromPropValue2(cssProperties, transformer) {
      return (propValue) => cssProperties.reduce((acc, cssProperty) => {
        acc[cssProperty] = getValue2(transformer, propValue);
        return acc;
      }, {});
    }
    function resolveCssProperty2(props, keys, prop, transformer) {
      if (keys.indexOf(prop) === -1) {
        return null;
      }
      const cssProperties = getCssProperties2(prop);
      const styleFromPropValue = getStyleFromPropValue2(cssProperties, transformer);
      const propValue = props[prop];
      return (0, _breakpoints.handleBreakpoints)(props, propValue, styleFromPropValue);
    }
    function style3(props, keys) {
      const transformer = createUnarySpacing2(props.theme);
      return Object.keys(props).map((prop) => resolveCssProperty2(props, keys, prop, transformer)).reduce(_merge.default, {});
    }
    function margin2(props) {
      return style3(props, marginKeys2);
    }
    margin2.propTypes = true ? marginKeys2.reduce((obj, key) => {
      obj[key] = _responsivePropType.default;
      return obj;
    }, {}) : {};
    margin2.filterProps = marginKeys2;
    function padding2(props) {
      return style3(props, paddingKeys2);
    }
    padding2.propTypes = true ? paddingKeys2.reduce((obj, key) => {
      obj[key] = _responsivePropType.default;
      return obj;
    }, {}) : {};
    padding2.filterProps = paddingKeys2;
    function spacing2(props) {
      return style3(props, spacingKeys2);
    }
    spacing2.propTypes = true ? spacingKeys2.reduce((obj, key) => {
      obj[key] = _responsivePropType.default;
      return obj;
    }, {}) : {};
    spacing2.filterProps = spacingKeys2;
    var _default = exports.default = spacing2;
  }
});

// node_modules/@mui/system/createTheme/createSpacing.js
var require_createSpacing = __commonJS({
  "node_modules/@mui/system/createTheme/createSpacing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createSpacing2;
    var _spacing = require_spacing();
    function createSpacing2(spacingInput = 8) {
      if (spacingInput.mui) {
        return spacingInput;
      }
      const transform = (0, _spacing.createUnarySpacing)({
        spacing: spacingInput
      });
      const spacing2 = (...argsInput) => {
        if (true) {
          if (!(argsInput.length <= 4)) {
            console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${argsInput.length}`);
          }
        }
        const args = argsInput.length === 0 ? [1] : argsInput;
        return args.map((argument) => {
          const output = transform(argument);
          return typeof output === "number" ? `${output}px` : output;
        }).join(" ");
      };
      spacing2.mui = true;
      return spacing2;
    }
  }
});

// node_modules/@mui/system/compose.js
var require_compose = __commonJS({
  "node_modules/@mui/system/compose.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _merge = _interopRequireDefault(require_merge());
    function compose2(...styles) {
      const handlers = styles.reduce((acc, style3) => {
        style3.filterProps.forEach((prop) => {
          acc[prop] = style3;
        });
        return acc;
      }, {});
      const fn = (props) => {
        return Object.keys(props).reduce((acc, prop) => {
          if (handlers[prop]) {
            return (0, _merge.default)(acc, handlers[prop](props));
          }
          return acc;
        }, {});
      };
      fn.propTypes = true ? styles.reduce((acc, style3) => Object.assign(acc, style3.propTypes), {}) : {};
      fn.filterProps = styles.reduce((acc, style3) => acc.concat(style3.filterProps), []);
      return fn;
    }
    var _default = exports.default = compose2;
  }
});

// node_modules/@mui/system/borders.js
var require_borders = __commonJS({
  "node_modules/@mui/system/borders.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.borderTopColor = exports.borderTop = exports.borderRightColor = exports.borderRight = exports.borderRadius = exports.borderLeftColor = exports.borderLeft = exports.borderColor = exports.borderBottomColor = exports.borderBottom = exports.border = void 0;
    exports.borderTransform = borderTransform2;
    exports.outlineColor = exports.outline = exports.default = void 0;
    var _responsivePropType = _interopRequireDefault(require_responsivePropType());
    var _style = _interopRequireDefault(require_style());
    var _compose = _interopRequireDefault(require_compose());
    var _spacing = require_spacing();
    var _breakpoints = require_breakpoints();
    function borderTransform2(value) {
      if (typeof value !== "number") {
        return value;
      }
      return `${value}px solid`;
    }
    function createBorderStyle2(prop, transform) {
      return (0, _style.default)({
        prop,
        themeKey: "borders",
        transform
      });
    }
    var border2 = exports.border = createBorderStyle2("border", borderTransform2);
    var borderTop2 = exports.borderTop = createBorderStyle2("borderTop", borderTransform2);
    var borderRight2 = exports.borderRight = createBorderStyle2("borderRight", borderTransform2);
    var borderBottom2 = exports.borderBottom = createBorderStyle2("borderBottom", borderTransform2);
    var borderLeft2 = exports.borderLeft = createBorderStyle2("borderLeft", borderTransform2);
    var borderColor2 = exports.borderColor = createBorderStyle2("borderColor");
    var borderTopColor2 = exports.borderTopColor = createBorderStyle2("borderTopColor");
    var borderRightColor2 = exports.borderRightColor = createBorderStyle2("borderRightColor");
    var borderBottomColor2 = exports.borderBottomColor = createBorderStyle2("borderBottomColor");
    var borderLeftColor2 = exports.borderLeftColor = createBorderStyle2("borderLeftColor");
    var outline2 = exports.outline = createBorderStyle2("outline", borderTransform2);
    var outlineColor2 = exports.outlineColor = createBorderStyle2("outlineColor");
    var borderRadius2 = (props) => {
      if (props.borderRadius !== void 0 && props.borderRadius !== null) {
        const transformer = (0, _spacing.createUnaryUnit)(props.theme, "shape.borderRadius", 4, "borderRadius");
        const styleFromPropValue = (propValue) => ({
          borderRadius: (0, _spacing.getValue)(transformer, propValue)
        });
        return (0, _breakpoints.handleBreakpoints)(props, props.borderRadius, styleFromPropValue);
      }
      return null;
    };
    exports.borderRadius = borderRadius2;
    borderRadius2.propTypes = true ? {
      borderRadius: _responsivePropType.default
    } : {};
    borderRadius2.filterProps = ["borderRadius"];
    var borders2 = (0, _compose.default)(border2, borderTop2, borderRight2, borderBottom2, borderLeft2, borderColor2, borderTopColor2, borderRightColor2, borderBottomColor2, borderLeftColor2, borderRadius2, outline2, outlineColor2);
    var _default = exports.default = borders2;
  }
});

// node_modules/@mui/system/cssGrid.js
var require_cssGrid = __commonJS({
  "node_modules/@mui/system/cssGrid.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.rowGap = exports.gridTemplateRows = exports.gridTemplateColumns = exports.gridTemplateAreas = exports.gridRow = exports.gridColumn = exports.gridAutoRows = exports.gridAutoFlow = exports.gridAutoColumns = exports.gridArea = exports.gap = exports.default = exports.columnGap = void 0;
    var _style = _interopRequireDefault(require_style());
    var _compose = _interopRequireDefault(require_compose());
    var _spacing = require_spacing();
    var _breakpoints = require_breakpoints();
    var _responsivePropType = _interopRequireDefault(require_responsivePropType());
    var gap2 = (props) => {
      if (props.gap !== void 0 && props.gap !== null) {
        const transformer = (0, _spacing.createUnaryUnit)(props.theme, "spacing", 8, "gap");
        const styleFromPropValue = (propValue) => ({
          gap: (0, _spacing.getValue)(transformer, propValue)
        });
        return (0, _breakpoints.handleBreakpoints)(props, props.gap, styleFromPropValue);
      }
      return null;
    };
    exports.gap = gap2;
    gap2.propTypes = true ? {
      gap: _responsivePropType.default
    } : {};
    gap2.filterProps = ["gap"];
    var columnGap2 = (props) => {
      if (props.columnGap !== void 0 && props.columnGap !== null) {
        const transformer = (0, _spacing.createUnaryUnit)(props.theme, "spacing", 8, "columnGap");
        const styleFromPropValue = (propValue) => ({
          columnGap: (0, _spacing.getValue)(transformer, propValue)
        });
        return (0, _breakpoints.handleBreakpoints)(props, props.columnGap, styleFromPropValue);
      }
      return null;
    };
    exports.columnGap = columnGap2;
    columnGap2.propTypes = true ? {
      columnGap: _responsivePropType.default
    } : {};
    columnGap2.filterProps = ["columnGap"];
    var rowGap2 = (props) => {
      if (props.rowGap !== void 0 && props.rowGap !== null) {
        const transformer = (0, _spacing.createUnaryUnit)(props.theme, "spacing", 8, "rowGap");
        const styleFromPropValue = (propValue) => ({
          rowGap: (0, _spacing.getValue)(transformer, propValue)
        });
        return (0, _breakpoints.handleBreakpoints)(props, props.rowGap, styleFromPropValue);
      }
      return null;
    };
    exports.rowGap = rowGap2;
    rowGap2.propTypes = true ? {
      rowGap: _responsivePropType.default
    } : {};
    rowGap2.filterProps = ["rowGap"];
    var gridColumn2 = exports.gridColumn = (0, _style.default)({
      prop: "gridColumn"
    });
    var gridRow2 = exports.gridRow = (0, _style.default)({
      prop: "gridRow"
    });
    var gridAutoFlow2 = exports.gridAutoFlow = (0, _style.default)({
      prop: "gridAutoFlow"
    });
    var gridAutoColumns2 = exports.gridAutoColumns = (0, _style.default)({
      prop: "gridAutoColumns"
    });
    var gridAutoRows2 = exports.gridAutoRows = (0, _style.default)({
      prop: "gridAutoRows"
    });
    var gridTemplateColumns2 = exports.gridTemplateColumns = (0, _style.default)({
      prop: "gridTemplateColumns"
    });
    var gridTemplateRows2 = exports.gridTemplateRows = (0, _style.default)({
      prop: "gridTemplateRows"
    });
    var gridTemplateAreas2 = exports.gridTemplateAreas = (0, _style.default)({
      prop: "gridTemplateAreas"
    });
    var gridArea2 = exports.gridArea = (0, _style.default)({
      prop: "gridArea"
    });
    var grid2 = (0, _compose.default)(gap2, columnGap2, rowGap2, gridColumn2, gridRow2, gridAutoFlow2, gridAutoColumns2, gridAutoRows2, gridTemplateColumns2, gridTemplateRows2, gridTemplateAreas2, gridArea2);
    var _default = exports.default = grid2;
  }
});

// node_modules/@mui/system/palette.js
var require_palette = __commonJS({
  "node_modules/@mui/system/palette.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.color = exports.bgcolor = exports.backgroundColor = void 0;
    exports.paletteTransform = paletteTransform2;
    var _style = _interopRequireDefault(require_style());
    var _compose = _interopRequireDefault(require_compose());
    function paletteTransform2(value, userValue) {
      if (userValue === "grey") {
        return userValue;
      }
      return value;
    }
    var color2 = exports.color = (0, _style.default)({
      prop: "color",
      themeKey: "palette",
      transform: paletteTransform2
    });
    var bgcolor2 = exports.bgcolor = (0, _style.default)({
      prop: "bgcolor",
      cssProperty: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform2
    });
    var backgroundColor2 = exports.backgroundColor = (0, _style.default)({
      prop: "backgroundColor",
      themeKey: "palette",
      transform: paletteTransform2
    });
    var palette2 = (0, _compose.default)(color2, bgcolor2, backgroundColor2);
    var _default = exports.default = palette2;
  }
});

// node_modules/@mui/system/sizing.js
var require_sizing = __commonJS({
  "node_modules/@mui/system/sizing.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.sizeWidth = exports.sizeHeight = exports.minWidth = exports.minHeight = exports.maxWidth = exports.maxHeight = exports.height = exports.default = exports.boxSizing = void 0;
    exports.sizingTransform = sizingTransform2;
    exports.width = void 0;
    var _style = _interopRequireDefault(require_style());
    var _compose = _interopRequireDefault(require_compose());
    var _breakpoints = require_breakpoints();
    function sizingTransform2(value) {
      return value <= 1 && value !== 0 ? `${value * 100}%` : value;
    }
    var width2 = exports.width = (0, _style.default)({
      prop: "width",
      transform: sizingTransform2
    });
    var maxWidth2 = (props) => {
      if (props.maxWidth !== void 0 && props.maxWidth !== null) {
        const styleFromPropValue = (propValue) => {
          var _props$theme, _props$theme2;
          const breakpoint = ((_props$theme = props.theme) == null || (_props$theme = _props$theme.breakpoints) == null || (_props$theme = _props$theme.values) == null ? void 0 : _props$theme[propValue]) || _breakpoints.values[propValue];
          if (!breakpoint) {
            return {
              maxWidth: sizingTransform2(propValue)
            };
          }
          if (((_props$theme2 = props.theme) == null || (_props$theme2 = _props$theme2.breakpoints) == null ? void 0 : _props$theme2.unit) !== "px") {
            return {
              maxWidth: `${breakpoint}${props.theme.breakpoints.unit}`
            };
          }
          return {
            maxWidth: breakpoint
          };
        };
        return (0, _breakpoints.handleBreakpoints)(props, props.maxWidth, styleFromPropValue);
      }
      return null;
    };
    exports.maxWidth = maxWidth2;
    maxWidth2.filterProps = ["maxWidth"];
    var minWidth2 = exports.minWidth = (0, _style.default)({
      prop: "minWidth",
      transform: sizingTransform2
    });
    var height2 = exports.height = (0, _style.default)({
      prop: "height",
      transform: sizingTransform2
    });
    var maxHeight2 = exports.maxHeight = (0, _style.default)({
      prop: "maxHeight",
      transform: sizingTransform2
    });
    var minHeight2 = exports.minHeight = (0, _style.default)({
      prop: "minHeight",
      transform: sizingTransform2
    });
    var sizeWidth2 = exports.sizeWidth = (0, _style.default)({
      prop: "size",
      cssProperty: "width",
      transform: sizingTransform2
    });
    var sizeHeight2 = exports.sizeHeight = (0, _style.default)({
      prop: "size",
      cssProperty: "height",
      transform: sizingTransform2
    });
    var boxSizing2 = exports.boxSizing = (0, _style.default)({
      prop: "boxSizing"
    });
    var sizing2 = (0, _compose.default)(width2, maxWidth2, minWidth2, height2, maxHeight2, minHeight2, boxSizing2);
    var _default = exports.default = sizing2;
  }
});

// node_modules/@mui/system/styleFunctionSx/defaultSxConfig.js
var require_defaultSxConfig = __commonJS({
  "node_modules/@mui/system/styleFunctionSx/defaultSxConfig.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _spacing = require_spacing();
    var _borders = require_borders();
    var _cssGrid = require_cssGrid();
    var _palette = require_palette();
    var _sizing = require_sizing();
    var defaultSxConfig2 = {
      // borders
      border: {
        themeKey: "borders",
        transform: _borders.borderTransform
      },
      borderTop: {
        themeKey: "borders",
        transform: _borders.borderTransform
      },
      borderRight: {
        themeKey: "borders",
        transform: _borders.borderTransform
      },
      borderBottom: {
        themeKey: "borders",
        transform: _borders.borderTransform
      },
      borderLeft: {
        themeKey: "borders",
        transform: _borders.borderTransform
      },
      borderColor: {
        themeKey: "palette"
      },
      borderTopColor: {
        themeKey: "palette"
      },
      borderRightColor: {
        themeKey: "palette"
      },
      borderBottomColor: {
        themeKey: "palette"
      },
      borderLeftColor: {
        themeKey: "palette"
      },
      outline: {
        themeKey: "borders",
        transform: _borders.borderTransform
      },
      outlineColor: {
        themeKey: "palette"
      },
      borderRadius: {
        themeKey: "shape.borderRadius",
        style: _borders.borderRadius
      },
      // palette
      color: {
        themeKey: "palette",
        transform: _palette.paletteTransform
      },
      bgcolor: {
        themeKey: "palette",
        cssProperty: "backgroundColor",
        transform: _palette.paletteTransform
      },
      backgroundColor: {
        themeKey: "palette",
        transform: _palette.paletteTransform
      },
      // spacing
      p: {
        style: _spacing.padding
      },
      pt: {
        style: _spacing.padding
      },
      pr: {
        style: _spacing.padding
      },
      pb: {
        style: _spacing.padding
      },
      pl: {
        style: _spacing.padding
      },
      px: {
        style: _spacing.padding
      },
      py: {
        style: _spacing.padding
      },
      padding: {
        style: _spacing.padding
      },
      paddingTop: {
        style: _spacing.padding
      },
      paddingRight: {
        style: _spacing.padding
      },
      paddingBottom: {
        style: _spacing.padding
      },
      paddingLeft: {
        style: _spacing.padding
      },
      paddingX: {
        style: _spacing.padding
      },
      paddingY: {
        style: _spacing.padding
      },
      paddingInline: {
        style: _spacing.padding
      },
      paddingInlineStart: {
        style: _spacing.padding
      },
      paddingInlineEnd: {
        style: _spacing.padding
      },
      paddingBlock: {
        style: _spacing.padding
      },
      paddingBlockStart: {
        style: _spacing.padding
      },
      paddingBlockEnd: {
        style: _spacing.padding
      },
      m: {
        style: _spacing.margin
      },
      mt: {
        style: _spacing.margin
      },
      mr: {
        style: _spacing.margin
      },
      mb: {
        style: _spacing.margin
      },
      ml: {
        style: _spacing.margin
      },
      mx: {
        style: _spacing.margin
      },
      my: {
        style: _spacing.margin
      },
      margin: {
        style: _spacing.margin
      },
      marginTop: {
        style: _spacing.margin
      },
      marginRight: {
        style: _spacing.margin
      },
      marginBottom: {
        style: _spacing.margin
      },
      marginLeft: {
        style: _spacing.margin
      },
      marginX: {
        style: _spacing.margin
      },
      marginY: {
        style: _spacing.margin
      },
      marginInline: {
        style: _spacing.margin
      },
      marginInlineStart: {
        style: _spacing.margin
      },
      marginInlineEnd: {
        style: _spacing.margin
      },
      marginBlock: {
        style: _spacing.margin
      },
      marginBlockStart: {
        style: _spacing.margin
      },
      marginBlockEnd: {
        style: _spacing.margin
      },
      // display
      displayPrint: {
        cssProperty: false,
        transform: (value) => ({
          "@media print": {
            display: value
          }
        })
      },
      display: {},
      overflow: {},
      textOverflow: {},
      visibility: {},
      whiteSpace: {},
      // flexbox
      flexBasis: {},
      flexDirection: {},
      flexWrap: {},
      justifyContent: {},
      alignItems: {},
      alignContent: {},
      order: {},
      flex: {},
      flexGrow: {},
      flexShrink: {},
      alignSelf: {},
      justifyItems: {},
      justifySelf: {},
      // grid
      gap: {
        style: _cssGrid.gap
      },
      rowGap: {
        style: _cssGrid.rowGap
      },
      columnGap: {
        style: _cssGrid.columnGap
      },
      gridColumn: {},
      gridRow: {},
      gridAutoFlow: {},
      gridAutoColumns: {},
      gridAutoRows: {},
      gridTemplateColumns: {},
      gridTemplateRows: {},
      gridTemplateAreas: {},
      gridArea: {},
      // positions
      position: {},
      zIndex: {
        themeKey: "zIndex"
      },
      top: {},
      right: {},
      bottom: {},
      left: {},
      // shadows
      boxShadow: {
        themeKey: "shadows"
      },
      // sizing
      width: {
        transform: _sizing.sizingTransform
      },
      maxWidth: {
        style: _sizing.maxWidth
      },
      minWidth: {
        transform: _sizing.sizingTransform
      },
      height: {
        transform: _sizing.sizingTransform
      },
      maxHeight: {
        transform: _sizing.sizingTransform
      },
      minHeight: {
        transform: _sizing.sizingTransform
      },
      boxSizing: {},
      // typography
      fontFamily: {
        themeKey: "typography"
      },
      fontSize: {
        themeKey: "typography"
      },
      fontStyle: {
        themeKey: "typography"
      },
      fontWeight: {
        themeKey: "typography"
      },
      letterSpacing: {},
      textTransform: {},
      lineHeight: {},
      textAlign: {},
      typography: {
        cssProperty: false,
        themeKey: "typography"
      }
    };
    var _default = exports.default = defaultSxConfig2;
  }
});

// node_modules/@mui/system/styleFunctionSx/styleFunctionSx.js
var require_styleFunctionSx = __commonJS({
  "node_modules/@mui/system/styleFunctionSx/styleFunctionSx.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    exports.unstable_createStyleFunctionSx = unstable_createStyleFunctionSx2;
    var _capitalize = _interopRequireDefault((init_capitalize2(), __toCommonJS(capitalize_exports)));
    var _merge = _interopRequireDefault(require_merge());
    var _style = require_style();
    var _breakpoints = require_breakpoints();
    var _defaultSxConfig = _interopRequireDefault(require_defaultSxConfig());
    function objectsHaveSameKeys2(...objects) {
      const allKeys = objects.reduce((keys, object) => keys.concat(Object.keys(object)), []);
      const union = new Set(allKeys);
      return objects.every((object) => union.size === Object.keys(object).length);
    }
    function callIfFn2(maybeFn, arg) {
      return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
    }
    function unstable_createStyleFunctionSx2() {
      function getThemeValue(prop, val, theme, config) {
        const props = {
          [prop]: val,
          theme
        };
        const options = config[prop];
        if (!options) {
          return {
            [prop]: val
          };
        }
        const {
          cssProperty = prop,
          themeKey,
          transform,
          style: style3
        } = options;
        if (val == null) {
          return null;
        }
        if (themeKey === "typography" && val === "inherit") {
          return {
            [prop]: val
          };
        }
        const themeMapping = (0, _style.getPath)(theme, themeKey) || {};
        if (style3) {
          return style3(props);
        }
        const styleFromPropValue = (propValueFinal) => {
          let value = (0, _style.getStyleValue)(themeMapping, transform, propValueFinal);
          if (propValueFinal === value && typeof propValueFinal === "string") {
            value = (0, _style.getStyleValue)(themeMapping, transform, `${prop}${propValueFinal === "default" ? "" : (0, _capitalize.default)(propValueFinal)}`, propValueFinal);
          }
          if (cssProperty === false) {
            return value;
          }
          return {
            [cssProperty]: value
          };
        };
        return (0, _breakpoints.handleBreakpoints)(props, val, styleFromPropValue);
      }
      function styleFunctionSx3(props) {
        var _theme$unstable_sxCon;
        const {
          sx,
          theme = {}
        } = props || {};
        if (!sx) {
          return null;
        }
        const config = (_theme$unstable_sxCon = theme.unstable_sxConfig) != null ? _theme$unstable_sxCon : _defaultSxConfig.default;
        function traverse(sxInput) {
          let sxObject = sxInput;
          if (typeof sxInput === "function") {
            sxObject = sxInput(theme);
          } else if (typeof sxInput !== "object") {
            return sxInput;
          }
          if (!sxObject) {
            return null;
          }
          const emptyBreakpoints = (0, _breakpoints.createEmptyBreakpointObject)(theme.breakpoints);
          const breakpointsKeys = Object.keys(emptyBreakpoints);
          let css2 = emptyBreakpoints;
          Object.keys(sxObject).forEach((styleKey) => {
            const value = callIfFn2(sxObject[styleKey], theme);
            if (value !== null && value !== void 0) {
              if (typeof value === "object") {
                if (config[styleKey]) {
                  css2 = (0, _merge.default)(css2, getThemeValue(styleKey, value, theme, config));
                } else {
                  const breakpointsValues = (0, _breakpoints.handleBreakpoints)({
                    theme
                  }, value, (x) => ({
                    [styleKey]: x
                  }));
                  if (objectsHaveSameKeys2(breakpointsValues, value)) {
                    css2[styleKey] = styleFunctionSx3({
                      sx: value,
                      theme
                    });
                  } else {
                    css2 = (0, _merge.default)(css2, breakpointsValues);
                  }
                }
              } else {
                css2 = (0, _merge.default)(css2, getThemeValue(styleKey, value, theme, config));
              }
            }
          });
          return (0, _breakpoints.removeUnusedBreakpoints)(breakpointsKeys, css2);
        }
        return Array.isArray(sx) ? sx.map(traverse) : traverse(sx);
      }
      return styleFunctionSx3;
    }
    var styleFunctionSx2 = unstable_createStyleFunctionSx2();
    styleFunctionSx2.filterProps = ["sx"];
    var _default = exports.default = styleFunctionSx2;
  }
});

// node_modules/@mui/system/createTheme/applyStyles.js
var require_applyStyles = __commonJS({
  "node_modules/@mui/system/createTheme/applyStyles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = applyStyles2;
    function applyStyles2(key, styles) {
      const theme = this;
      if (theme.vars && typeof theme.getColorSchemeSelector === "function") {
        const selector = theme.getColorSchemeSelector(key).replace(/(\[[^\]]+\])/, "*:where($1)");
        return {
          [selector]: styles
        };
      }
      if (theme.palette.mode === key) {
        return styles;
      }
      return {};
    }
  }
});

// node_modules/@mui/system/createTheme/createTheme.js
var require_createTheme = __commonJS({
  "node_modules/@mui/system/createTheme/createTheme.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _extends2 = _interopRequireDefault(require_extends());
    var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require_objectWithoutPropertiesLoose());
    var _deepmerge = _interopRequireDefault((init_deepmerge2(), __toCommonJS(deepmerge_exports)));
    var _createBreakpoints = _interopRequireDefault(require_createBreakpoints());
    var _shape = _interopRequireDefault(require_shape());
    var _createSpacing = _interopRequireDefault(require_createSpacing());
    var _styleFunctionSx = _interopRequireDefault(require_styleFunctionSx());
    var _defaultSxConfig = _interopRequireDefault(require_defaultSxConfig());
    var _applyStyles = _interopRequireDefault(require_applyStyles());
    var _excluded8 = ["breakpoints", "palette", "spacing", "shape"];
    function createTheme3(options = {}, ...args) {
      const {
        breakpoints: breakpointsInput = {},
        palette: paletteInput = {},
        spacing: spacingInput,
        shape: shapeInput = {}
      } = options, other = (0, _objectWithoutPropertiesLoose2.default)(options, _excluded8);
      const breakpoints = (0, _createBreakpoints.default)(breakpointsInput);
      const spacing2 = (0, _createSpacing.default)(spacingInput);
      let muiTheme = (0, _deepmerge.default)({
        breakpoints,
        direction: "ltr",
        components: {},
        // Inject component definitions.
        palette: (0, _extends2.default)({
          mode: "light"
        }, paletteInput),
        spacing: spacing2,
        shape: (0, _extends2.default)({}, _shape.default, shapeInput)
      }, other);
      muiTheme.applyStyles = _applyStyles.default;
      muiTheme = args.reduce((acc, argument) => (0, _deepmerge.default)(acc, argument), muiTheme);
      muiTheme.unstable_sxConfig = (0, _extends2.default)({}, _defaultSxConfig.default, other == null ? void 0 : other.unstable_sxConfig);
      muiTheme.unstable_sx = function sx(props) {
        return (0, _styleFunctionSx.default)({
          sx: props,
          theme: this
        });
      };
      return muiTheme;
    }
    var _default = exports.default = createTheme3;
  }
});

// node_modules/@mui/system/createTheme/index.js
var require_createTheme2 = __commonJS({
  "node_modules/@mui/system/createTheme/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _createTheme.default;
      }
    });
    Object.defineProperty(exports, "private_createBreakpoints", {
      enumerable: true,
      get: function() {
        return _createBreakpoints.default;
      }
    });
    Object.defineProperty(exports, "unstable_applyStyles", {
      enumerable: true,
      get: function() {
        return _applyStyles.default;
      }
    });
    var _createTheme = _interopRequireDefault(require_createTheme());
    var _createBreakpoints = _interopRequireDefault(require_createBreakpoints());
    var _applyStyles = _interopRequireDefault(require_applyStyles());
  }
});

// node_modules/@mui/system/styleFunctionSx/extendSxProp.js
var require_extendSxProp = __commonJS({
  "node_modules/@mui/system/styleFunctionSx/extendSxProp.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = extendSxProp2;
    var _extends2 = _interopRequireDefault(require_extends());
    var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require_objectWithoutPropertiesLoose());
    var _deepmerge = (init_deepmerge2(), __toCommonJS(deepmerge_exports));
    var _defaultSxConfig = _interopRequireDefault(require_defaultSxConfig());
    var _excluded8 = ["sx"];
    var splitProps2 = (props) => {
      var _props$theme$unstable, _props$theme;
      const result = {
        systemProps: {},
        otherProps: {}
      };
      const config = (_props$theme$unstable = props == null || (_props$theme = props.theme) == null ? void 0 : _props$theme.unstable_sxConfig) != null ? _props$theme$unstable : _defaultSxConfig.default;
      Object.keys(props).forEach((prop) => {
        if (config[prop]) {
          result.systemProps[prop] = props[prop];
        } else {
          result.otherProps[prop] = props[prop];
        }
      });
      return result;
    };
    function extendSxProp2(props) {
      const {
        sx: inSx
      } = props, other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded8);
      const {
        systemProps,
        otherProps
      } = splitProps2(other);
      let finalSx;
      if (Array.isArray(inSx)) {
        finalSx = [systemProps, ...inSx];
      } else if (typeof inSx === "function") {
        finalSx = (...args) => {
          const result = inSx(...args);
          if (!(0, _deepmerge.isPlainObject)(result)) {
            return systemProps;
          }
          return (0, _extends2.default)({}, systemProps, result);
        };
      } else {
        finalSx = (0, _extends2.default)({}, systemProps, inSx);
      }
      return (0, _extends2.default)({}, otherProps, {
        sx: finalSx
      });
    }
  }
});

// node_modules/@mui/system/styleFunctionSx/index.js
var require_styleFunctionSx2 = __commonJS({
  "node_modules/@mui/system/styleFunctionSx/index.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "default", {
      enumerable: true,
      get: function() {
        return _styleFunctionSx.default;
      }
    });
    Object.defineProperty(exports, "extendSxProp", {
      enumerable: true,
      get: function() {
        return _extendSxProp.default;
      }
    });
    Object.defineProperty(exports, "unstable_createStyleFunctionSx", {
      enumerable: true,
      get: function() {
        return _styleFunctionSx.unstable_createStyleFunctionSx;
      }
    });
    Object.defineProperty(exports, "unstable_defaultSxConfig", {
      enumerable: true,
      get: function() {
        return _defaultSxConfig.default;
      }
    });
    var _styleFunctionSx = _interopRequireWildcard(require_styleFunctionSx());
    var _extendSxProp = _interopRequireDefault(require_extendSxProp());
    var _defaultSxConfig = _interopRequireDefault(require_defaultSxConfig());
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != typeof e && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
  }
});

// node_modules/@mui/system/createStyled.js
var require_createStyled = __commonJS({
  "node_modules/@mui/system/createStyled.js"(exports) {
    "use strict";
    var _interopRequireDefault = require_interopRequireDefault();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = createStyled4;
    exports.shouldForwardProp = shouldForwardProp;
    exports.systemDefaultTheme = void 0;
    var _extends2 = _interopRequireDefault(require_extends());
    var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require_objectWithoutPropertiesLoose());
    var _styledEngine = _interopRequireWildcard((init_styled_engine(), __toCommonJS(styled_engine_exports)));
    var _deepmerge = (init_deepmerge2(), __toCommonJS(deepmerge_exports));
    var _capitalize = _interopRequireDefault((init_capitalize2(), __toCommonJS(capitalize_exports)));
    var _getDisplayName = _interopRequireDefault((init_getDisplayName2(), __toCommonJS(getDisplayName_exports)));
    var _createTheme = _interopRequireDefault(require_createTheme2());
    var _styleFunctionSx = _interopRequireDefault(require_styleFunctionSx2());
    var _excluded8 = ["ownerState"];
    var _excluded22 = ["variants"];
    var _excluded32 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
    function _getRequireWildcardCache(e) {
      if ("function" != typeof WeakMap)
        return null;
      var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
      return (_getRequireWildcardCache = function(e2) {
        return e2 ? t : r;
      })(e);
    }
    function _interopRequireWildcard(e, r) {
      if (!r && e && e.__esModule)
        return e;
      if (null === e || "object" != typeof e && "function" != typeof e)
        return { default: e };
      var t = _getRequireWildcardCache(r);
      if (t && t.has(e))
        return t.get(e);
      var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var u in e)
        if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
          var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
          i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
      return n.default = e, t && t.set(e, n), n;
    }
    function isEmpty2(obj) {
      return Object.keys(obj).length === 0;
    }
    function isStringTag(tag) {
      return typeof tag === "string" && // 96 is one less than the char code
      // for "a" so this is checking that
      // it's a lowercase character
      tag.charCodeAt(0) > 96;
    }
    function shouldForwardProp(prop) {
      return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
    }
    var systemDefaultTheme = exports.systemDefaultTheme = (0, _createTheme.default)();
    var lowercaseFirstLetter = (string) => {
      if (!string) {
        return string;
      }
      return string.charAt(0).toLowerCase() + string.slice(1);
    };
    function resolveTheme({
      defaultTheme: defaultTheme2,
      theme,
      themeId
    }) {
      return isEmpty2(theme) ? defaultTheme2 : theme[themeId] || theme;
    }
    function defaultOverridesResolver(slot) {
      if (!slot) {
        return null;
      }
      return (props, styles) => styles[slot];
    }
    function processStyleArg(callableStyle, _ref) {
      let {
        ownerState
      } = _ref, props = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded8);
      const resolvedStylesArg = typeof callableStyle === "function" ? callableStyle((0, _extends2.default)({
        ownerState
      }, props)) : callableStyle;
      if (Array.isArray(resolvedStylesArg)) {
        return resolvedStylesArg.flatMap((resolvedStyle) => processStyleArg(resolvedStyle, (0, _extends2.default)({
          ownerState
        }, props)));
      }
      if (!!resolvedStylesArg && typeof resolvedStylesArg === "object" && Array.isArray(resolvedStylesArg.variants)) {
        const {
          variants = []
        } = resolvedStylesArg, otherStyles = (0, _objectWithoutPropertiesLoose2.default)(resolvedStylesArg, _excluded22);
        let result = otherStyles;
        variants.forEach((variant) => {
          let isMatch = true;
          if (typeof variant.props === "function") {
            isMatch = variant.props((0, _extends2.default)({
              ownerState
            }, props, ownerState));
          } else {
            Object.keys(variant.props).forEach((key) => {
              if ((ownerState == null ? void 0 : ownerState[key]) !== variant.props[key] && props[key] !== variant.props[key]) {
                isMatch = false;
              }
            });
          }
          if (isMatch) {
            if (!Array.isArray(result)) {
              result = [result];
            }
            result.push(typeof variant.style === "function" ? variant.style((0, _extends2.default)({
              ownerState
            }, props, ownerState)) : variant.style);
          }
        });
        return result;
      }
      return resolvedStylesArg;
    }
    function createStyled4(input = {}) {
      const {
        themeId,
        defaultTheme: defaultTheme2 = systemDefaultTheme,
        rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
        slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
      } = input;
      const systemSx = (props) => {
        return (0, _styleFunctionSx.default)((0, _extends2.default)({}, props, {
          theme: resolveTheme((0, _extends2.default)({}, props, {
            defaultTheme: defaultTheme2,
            themeId
          }))
        }));
      };
      systemSx.__mui_systemSx = true;
      return (tag, inputOptions = {}) => {
        (0, _styledEngine.internal_processStyles)(tag, (styles) => styles.filter((style3) => !(style3 != null && style3.__mui_systemSx)));
        const {
          name: componentName,
          slot: componentSlot,
          skipVariantsResolver: inputSkipVariantsResolver,
          skipSx: inputSkipSx,
          // TODO v6: remove `lowercaseFirstLetter()` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          overridesResolver = defaultOverridesResolver(lowercaseFirstLetter(componentSlot))
        } = inputOptions, options = (0, _objectWithoutPropertiesLoose2.default)(inputOptions, _excluded32);
        const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : (
          // TODO v6: remove `Root` in the next major release
          // For more details: https://github.com/mui/material-ui/pull/37908
          componentSlot && componentSlot !== "Root" && componentSlot !== "root" || false
        );
        const skipSx = inputSkipSx || false;
        let label;
        if (true) {
          if (componentName) {
            label = `${componentName}-${lowercaseFirstLetter(componentSlot || "Root")}`;
          }
        }
        let shouldForwardPropOption = shouldForwardProp;
        if (componentSlot === "Root" || componentSlot === "root") {
          shouldForwardPropOption = rootShouldForwardProp2;
        } else if (componentSlot) {
          shouldForwardPropOption = slotShouldForwardProp2;
        } else if (isStringTag(tag)) {
          shouldForwardPropOption = void 0;
        }
        const defaultStyledResolver = (0, _styledEngine.default)(tag, (0, _extends2.default)({
          shouldForwardProp: shouldForwardPropOption,
          label
        }, options));
        const transformStyleArg = (stylesArg) => {
          if (typeof stylesArg === "function" && stylesArg.__emotion_real !== stylesArg || (0, _deepmerge.isPlainObject)(stylesArg)) {
            return (props) => processStyleArg(stylesArg, (0, _extends2.default)({}, props, {
              theme: resolveTheme({
                theme: props.theme,
                defaultTheme: defaultTheme2,
                themeId
              })
            }));
          }
          return stylesArg;
        };
        const muiStyledResolver = (styleArg, ...expressions) => {
          let transformedStyleArg = transformStyleArg(styleArg);
          const expressionsWithDefaultTheme = expressions ? expressions.map(transformStyleArg) : [];
          if (componentName && overridesResolver) {
            expressionsWithDefaultTheme.push((props) => {
              const theme = resolveTheme((0, _extends2.default)({}, props, {
                defaultTheme: defaultTheme2,
                themeId
              }));
              if (!theme.components || !theme.components[componentName] || !theme.components[componentName].styleOverrides) {
                return null;
              }
              const styleOverrides = theme.components[componentName].styleOverrides;
              const resolvedStyleOverrides = {};
              Object.entries(styleOverrides).forEach(([slotKey, slotStyle]) => {
                resolvedStyleOverrides[slotKey] = processStyleArg(slotStyle, (0, _extends2.default)({}, props, {
                  theme
                }));
              });
              return overridesResolver(props, resolvedStyleOverrides);
            });
          }
          if (componentName && !skipVariantsResolver) {
            expressionsWithDefaultTheme.push((props) => {
              var _theme$components;
              const theme = resolveTheme((0, _extends2.default)({}, props, {
                defaultTheme: defaultTheme2,
                themeId
              }));
              const themeVariants = theme == null || (_theme$components = theme.components) == null || (_theme$components = _theme$components[componentName]) == null ? void 0 : _theme$components.variants;
              return processStyleArg({
                variants: themeVariants
              }, (0, _extends2.default)({}, props, {
                theme
              }));
            });
          }
          if (!skipSx) {
            expressionsWithDefaultTheme.push(systemSx);
          }
          const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
          if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
            const placeholders = new Array(numOfCustomFnsApplied).fill("");
            transformedStyleArg = [...styleArg, ...placeholders];
            transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
          }
          const Component = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
          if (true) {
            let displayName;
            if (componentName) {
              displayName = `${componentName}${(0, _capitalize.default)(componentSlot || "")}`;
            }
            if (displayName === void 0) {
              displayName = `Styled(${(0, _getDisplayName.default)(tag)})`;
            }
            Component.displayName = displayName;
          }
          if (tag.muiName) {
            Component.muiName = tag.muiName;
          }
          return Component;
        };
        if (defaultStyledResolver.withConfig) {
          muiStyledResolver.withConfig = defaultStyledResolver.withConfig;
        }
        return muiStyledResolver;
      };
    }
  }
});

// node_modules/@mui/material/styles/defaultTheme.js
var defaultTheme, defaultTheme_default;
var init_defaultTheme = __esm({
  "node_modules/@mui/material/styles/defaultTheme.js"() {
    "use client";
    init_createTheme3();
    defaultTheme = createTheme_default2();
    defaultTheme_default = defaultTheme;
  }
});

// node_modules/@mui/material/styles/slotShouldForwardProp.js
function slotShouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var slotShouldForwardProp_default;
var init_slotShouldForwardProp = __esm({
  "node_modules/@mui/material/styles/slotShouldForwardProp.js"() {
    slotShouldForwardProp_default = slotShouldForwardProp;
  }
});

// node_modules/@mui/material/styles/rootShouldForwardProp.js
var rootShouldForwardProp, rootShouldForwardProp_default;
var init_rootShouldForwardProp = __esm({
  "node_modules/@mui/material/styles/rootShouldForwardProp.js"() {
    init_slotShouldForwardProp();
    rootShouldForwardProp = (prop) => slotShouldForwardProp_default(prop) && prop !== "classes";
    rootShouldForwardProp_default = rootShouldForwardProp;
  }
});

// node_modules/@mui/material/styles/styled.js
var import_createStyled, styled2, styled_default;
var init_styled = __esm({
  "node_modules/@mui/material/styles/styled.js"() {
    "use client";
    import_createStyled = __toESM(require_createStyled());
    init_defaultTheme();
    init_identifier();
    init_rootShouldForwardProp();
    init_slotShouldForwardProp();
    init_rootShouldForwardProp();
    styled2 = (0, import_createStyled.default)({
      themeId: identifier_default,
      defaultTheme: defaultTheme_default,
      rootShouldForwardProp: rootShouldForwardProp_default
    });
    styled_default = styled2;
  }
});

// node_modules/@mui/utils/esm/resolveProps/resolveProps.js
function resolveProps(defaultProps, props) {
  const output = _extends({}, props);
  Object.keys(defaultProps).forEach((propName) => {
    if (propName.toString().match(/^(components|slots)$/)) {
      output[propName] = _extends({}, defaultProps[propName], output[propName]);
    } else if (propName.toString().match(/^(componentsProps|slotProps)$/)) {
      const defaultSlotProps = defaultProps[propName] || {};
      const slotProps = props[propName];
      output[propName] = {};
      if (!slotProps || !Object.keys(slotProps)) {
        output[propName] = defaultSlotProps;
      } else if (!defaultSlotProps || !Object.keys(defaultSlotProps)) {
        output[propName] = slotProps;
      } else {
        output[propName] = _extends({}, slotProps);
        Object.keys(defaultSlotProps).forEach((slotPropName) => {
          output[propName][slotPropName] = resolveProps(defaultSlotProps[slotPropName], slotProps[slotPropName]);
        });
      }
    } else if (output[propName] === void 0) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
}
var init_resolveProps = __esm({
  "node_modules/@mui/utils/esm/resolveProps/resolveProps.js"() {
    init_extends();
  }
});

// node_modules/@mui/utils/esm/resolveProps/index.js
var init_resolveProps2 = __esm({
  "node_modules/@mui/utils/esm/resolveProps/index.js"() {
    init_resolveProps();
  }
});

// node_modules/@mui/system/esm/DefaultPropsProvider/DefaultPropsProvider.js
function DefaultPropsProvider({
  value,
  children
}) {
  return (0, import_jsx_runtime3.jsx)(PropsContext.Provider, {
    value,
    children
  });
}
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name]) {
    return props;
  }
  const config = theme.components[name];
  if (config.defaultProps) {
    return resolveProps(config.defaultProps, props);
  }
  if (!config.styleOverrides && !config.variants) {
    return resolveProps(config, props);
  }
  return props;
}
function useDefaultProps({
  props,
  name
}) {
  const ctx = React4.useContext(PropsContext);
  return getThemeProps({
    props,
    name,
    theme: {
      components: ctx
    }
  });
}
var React4, import_prop_types5, import_jsx_runtime3, PropsContext, DefaultPropsProvider_default;
var init_DefaultPropsProvider = __esm({
  "node_modules/@mui/system/esm/DefaultPropsProvider/DefaultPropsProvider.js"() {
    "use client";
    React4 = __toESM(require_react());
    import_prop_types5 = __toESM(require_prop_types());
    init_resolveProps2();
    import_jsx_runtime3 = __toESM(require_jsx_runtime());
    PropsContext = React4.createContext(void 0);
    true ? DefaultPropsProvider.propTypes = {
      // ┌────────────────────────────── Warning ──────────────────────────────┐
      // │ These PropTypes are generated from the TypeScript type definitions. │
      // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
      // └─────────────────────────────────────────────────────────────────────┘
      /**
       * @ignore
       */
      children: import_prop_types5.default.node,
      /**
       * @ignore
       */
      value: import_prop_types5.default.object
    } : void 0;
    DefaultPropsProvider_default = DefaultPropsProvider;
  }
});

// node_modules/@mui/system/esm/DefaultPropsProvider/index.js
var init_DefaultPropsProvider2 = __esm({
  "node_modules/@mui/system/esm/DefaultPropsProvider/index.js"() {
    init_DefaultPropsProvider();
  }
});

export {
  init_formatMuiErrorMessage2 as init_formatMuiErrorMessage,
  StyledEngineProvider,
  GlobalStyles,
  styled,
  internal_processStyles,
  styled_engine_exports,
  init_styled_engine,
  isPlainObject,
  deepmerge,
  init_deepmerge2 as init_deepmerge,
  createBreakpoints,
  init_createBreakpoints,
  init_shape,
  init_responsivePropType,
  handleBreakpoints,
  mergeBreakpointsInOrder,
  resolveBreakpointValues,
  init_breakpoints,
  capitalize,
  init_capitalize2 as init_capitalize,
  getPath,
  style_default,
  init_style,
  createUnarySpacing,
  getValue,
  spacing_default,
  init_spacing,
  createSpacing,
  init_createSpacing,
  compose_default,
  init_compose,
  borders_default,
  init_borders,
  cssGrid_default,
  init_cssGrid,
  palette_default,
  init_palette,
  sizing_default,
  init_sizing,
  defaultSxConfig_default,
  styleFunctionSx_default,
  createTheme_default,
  init_createTheme2 as init_createTheme,
  extendSxProp,
  init_styleFunctionSx2 as init_styleFunctionSx,
  ClassNameGenerator_default,
  init_ClassNameGenerator2 as init_ClassNameGenerator,
  generateUtilityClass,
  init_generateUtilityClass2 as init_generateUtilityClass,
  generateUtilityClasses,
  init_generateUtilityClasses2 as init_generateUtilityClasses,
  require_react_is,
  getDisplayName,
  init_getDisplayName2 as init_getDisplayName,
  resolveProps,
  init_resolveProps2 as init_resolveProps,
  clamp_default,
  init_clamp2 as init_clamp,
  composeClasses,
  init_composeClasses2 as init_composeClasses,
  useDefaultProps,
  DefaultPropsProvider_default,
  init_DefaultPropsProvider2 as init_DefaultPropsProvider,
  identifier_default,
  init_identifier,
  createMixins,
  init_createMixins,
  require_interopRequireDefault,
  require_colorManipulator,
  common_default,
  init_common,
  grey_default,
  init_grey,
  purple_default,
  init_purple,
  red_default,
  init_red,
  orange_default,
  init_orange,
  blue_default,
  init_blue,
  lightBlue_default,
  init_lightBlue,
  green_default,
  init_green,
  createTypography,
  init_createTypography,
  easing,
  duration,
  init_createTransitions,
  createMuiTheme,
  createTheme_default2,
  init_createTheme3 as init_createTheme2,
  defaultTheme_default,
  init_defaultTheme,
  slotShouldForwardProp_default,
  init_slotShouldForwardProp,
  rootShouldForwardProp_default,
  styled_default,
  init_styled
};
/*! Bundled license information:

@mui/styled-engine/index.js:
  (**
   * @mui/styled-engine v5.16.6
   *
   * @license MIT
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (**
   * @license React
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=chunk-VMMLLZ7M.js.map
