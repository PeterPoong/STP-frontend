import {
  require_react
} from "./chunk-2RGQL2JM.js";
import {
  __commonJS
} from "./chunk-2LSFTFF7.js";

// node_modules/react-collapsible/dist/index.js
var require_dist = __commonJS({
  "node_modules/react-collapsible/dist/index.js"(exports, module) {
    !function(e, t) {
      if ("object" == typeof exports && "object" == typeof module)
        module.exports = t(require_react());
      else if ("function" == typeof define && define.amd)
        define(["react"], t);
      else {
        var n = "object" == typeof exports ? t(require_react()) : t(e.react);
        for (var r in n)
          ("object" == typeof exports ? exports : e)[r] = n[r];
      }
    }(exports, function(e) {
      return function(e2) {
        var t = {};
        function n(r) {
          if (t[r])
            return t[r].exports;
          var o = t[r] = { i: r, l: false, exports: {} };
          return e2[r].call(o.exports, o, o.exports, n), o.l = true, o.exports;
        }
        return n.m = e2, n.c = t, n.d = function(e3, t2, r) {
          n.o(e3, t2) || Object.defineProperty(e3, t2, { enumerable: true, get: r });
        }, n.r = function(e3) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e3, "__esModule", { value: true });
        }, n.t = function(e3, t2) {
          if (1 & t2 && (e3 = n(e3)), 8 & t2)
            return e3;
          if (4 & t2 && "object" == typeof e3 && e3 && e3.__esModule)
            return e3;
          var r = /* @__PURE__ */ Object.create(null);
          if (n.r(r), Object.defineProperty(r, "default", { enumerable: true, value: e3 }), 2 & t2 && "string" != typeof e3)
            for (var o in e3)
              n.d(r, o, (function(t3) {
                return e3[t3];
              }).bind(null, o));
          return r;
        }, n.n = function(e3) {
          var t2 = e3 && e3.__esModule ? function() {
            return e3.default;
          } : function() {
            return e3;
          };
          return n.d(t2, "a", t2), t2;
        }, n.o = function(e3, t2) {
          return Object.prototype.hasOwnProperty.call(e3, t2);
        }, n.p = "", n(n.s = 4);
      }([function(e2, t, n) {
        e2.exports = n(2)();
      }, function(t, n) {
        t.exports = e;
      }, function(e2, t, n) {
        "use strict";
        var r = n(3);
        function o() {
        }
        function i() {
        }
        i.resetWarningCache = o, e2.exports = function() {
          function e3(e4, t3, n3, o2, i2, s) {
            if (s !== r) {
              var a = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
              throw a.name = "Invariant Violation", a;
            }
          }
          function t2() {
            return e3;
          }
          e3.isRequired = e3;
          var n2 = { array: e3, bigint: e3, bool: e3, func: e3, number: e3, object: e3, string: e3, symbol: e3, any: e3, arrayOf: t2, element: e3, elementType: e3, instanceOf: t2, node: e3, objectOf: t2, oneOf: t2, oneOfType: t2, shape: t2, exact: t2, checkPropTypes: i, resetWarningCache: o };
          return n2.PropTypes = n2, n2;
        };
      }, function(e2, t, n) {
        "use strict";
        e2.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
      }, function(e2, t, n) {
        "use strict";
        n.r(t);
        var r = n(1), o = n.n(r), i = n(0), s = n.n(i), a = function(e3) {
          return 0 !== e3;
        };
        function l() {
          return (l = Object.assign ? Object.assign.bind() : function(e3) {
            for (var t2 = 1; t2 < arguments.length; t2++) {
              var n2 = arguments[t2];
              for (var r2 in n2)
                Object.prototype.hasOwnProperty.call(n2, r2) && (e3[r2] = n2[r2]);
            }
            return e3;
          }).apply(this, arguments);
        }
        function c(e3) {
          return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e4) {
            return typeof e4;
          } : function(e4) {
            return e4 && "function" == typeof Symbol && e4.constructor === Symbol && e4 !== Symbol.prototype ? "symbol" : typeof e4;
          })(e3);
        }
        function p(e3, t2) {
          for (var n2 = 0; n2 < t2.length; n2++) {
            var r2 = t2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(e3, r2.key, r2);
          }
        }
        function u(e3, t2) {
          return (u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e4, t3) {
            return e4.__proto__ = t3, e4;
          })(e3, t2);
        }
        function g(e3) {
          var t2 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
              })), true;
            } catch (e4) {
              return false;
            }
          }();
          return function() {
            var n2, r2 = d(e3);
            if (t2) {
              var o2 = d(this).constructor;
              n2 = Reflect.construct(r2, arguments, o2);
            } else
              n2 = r2.apply(this, arguments);
            return f(this, n2);
          };
        }
        function f(e3, t2) {
          if (t2 && ("object" === c(t2) || "function" == typeof t2))
            return t2;
          if (void 0 !== t2)
            throw new TypeError("Derived constructors may only return object or undefined");
          return h(e3);
        }
        function h(e3) {
          if (void 0 === e3)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e3;
        }
        function d(e3) {
          return (d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e4) {
            return e4.__proto__ || Object.getPrototypeOf(e4);
          })(e3);
        }
        function b(e3, t2, n2) {
          return t2 in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
        }
        var m = function(e3) {
          !function(e4, t3) {
            if ("function" != typeof t3 && null !== t3)
              throw new TypeError("Super expression must either be null or a function");
            e4.prototype = Object.create(t3 && t3.prototype, { constructor: { value: e4, writable: true, configurable: true } }), Object.defineProperty(e4, "prototype", { writable: false }), t3 && u(e4, t3);
          }(s2, e3);
          var t2, n2, r2, i2 = g(s2);
          function s2(e4) {
            var t3;
            return function(e5, t4) {
              if (!(e5 instanceof t4))
                throw new TypeError("Cannot call a class as a function");
            }(this, s2), b(h(t3 = i2.call(this, e4)), "continueOpenCollapsible", function() {
              var e5 = h(t3).innerRef;
              t3.setState({ height: e5.scrollHeight, transition: "height ".concat(t3.props.transitionTime, "ms ").concat(t3.props.easing), isClosed: false, hasBeenOpened: true, inTransition: a(e5.scrollHeight), shouldOpenOnNextCycle: false });
            }), b(h(t3), "handleTriggerClick", function(e5) {
              t3.props.triggerDisabled || t3.state.inTransition || (e5.preventDefault(), t3.props.handleTriggerClick ? t3.props.handleTriggerClick(t3.props.accordionPosition) : true === t3.state.isClosed ? (t3.openCollapsible(), t3.props.onOpening(), t3.props.onTriggerOpening()) : (t3.closeCollapsible(), t3.props.onClosing(), t3.props.onTriggerClosing()));
            }), b(h(t3), "handleTransitionEnd", function(e5) {
              e5.target === t3.innerRef && (t3.state.isClosed ? (t3.setState({ inTransition: false }), t3.props.onClose()) : (t3.setState({ height: "auto", overflow: t3.props.overflowWhenOpen, inTransition: false }), t3.props.onOpen()));
            }), b(h(t3), "setInnerRef", function(e5) {
              return t3.innerRef = e5;
            }), t3.timeout = void 0, t3.contentId = e4.contentElementId || "collapsible-content-".concat(Date.now()), t3.triggerId = e4.triggerElementProps.id || "collapsible-trigger-".concat(Date.now()), e4.open ? t3.state = { isClosed: false, shouldSwitchAutoOnNextCycle: false, height: "auto", transition: "none", hasBeenOpened: true, overflow: e4.overflowWhenOpen, inTransition: false } : t3.state = { isClosed: true, shouldSwitchAutoOnNextCycle: false, height: 0, transition: "height ".concat(e4.transitionTime, "ms ").concat(e4.easing), hasBeenOpened: false, overflow: "hidden", inTransition: false }, t3;
          }
          return t2 = s2, (n2 = [{ key: "componentDidUpdate", value: function(e4, t3) {
            var n3 = this;
            this.state.shouldOpenOnNextCycle && this.continueOpenCollapsible(), "auto" !== t3.height && 0 !== t3.height || true !== this.state.shouldSwitchAutoOnNextCycle || (window.clearTimeout(this.timeout), this.timeout = window.setTimeout(function() {
              n3.setState({ height: 0, overflow: "hidden", isClosed: true, shouldSwitchAutoOnNextCycle: false });
            }, 50)), e4.open !== this.props.open && (true === this.props.open ? (this.openCollapsible(), this.props.onOpening()) : (this.closeCollapsible(), this.props.onClosing()));
          } }, { key: "componentWillUnmount", value: function() {
            window.clearTimeout(this.timeout);
          } }, { key: "closeCollapsible", value: function() {
            var e4 = this.innerRef;
            this.setState({ shouldSwitchAutoOnNextCycle: true, height: e4.scrollHeight, transition: "height ".concat(this.props.transitionCloseTime ? this.props.transitionCloseTime : this.props.transitionTime, "ms ").concat(this.props.easing), inTransition: a(e4.scrollHeight) });
          } }, { key: "openCollapsible", value: function() {
            this.setState({ inTransition: a(this.innerRef.scrollHeight), shouldOpenOnNextCycle: true });
          } }, { key: "renderNonClickableTriggerElement", value: function() {
            var e4 = this.props, t3 = e4.triggerSibling, n3 = e4.classParentString;
            if (!t3)
              return null;
            switch (c(t3)) {
              case "string":
                return o.a.createElement("span", { className: "".concat(n3, "__trigger-sibling") }, t3);
              case "function":
                return t3();
              case "object":
                return t3;
              default:
                return null;
            }
          } }, { key: "render", value: function() {
            var e4 = this, t3 = { height: this.state.height, WebkitTransition: this.state.transition, msTransition: this.state.transition, transition: this.state.transition, overflow: this.state.overflow }, n3 = this.state.isClosed ? "is-closed" : "is-open", r3 = this.props.triggerDisabled ? "is-disabled" : "", i3 = false === this.state.isClosed && void 0 !== this.props.triggerWhenOpen ? this.props.triggerWhenOpen : this.props.trigger, s3 = this.props.contentContainerTagName, a2 = this.props.triggerTagName, c2 = this.props.lazyRender && !this.state.hasBeenOpened && this.state.isClosed && !this.state.inTransition ? null : this.props.children, p2 = this.props, u2 = p2.classParentString, g2 = p2.contentOuterClassName, f2 = p2.contentInnerClassName, h2 = "".concat(u2, "__trigger ").concat(n3, " ").concat(r3, " ").concat(this.state.isClosed ? this.props.triggerClassName : this.props.triggerOpenedClassName), d2 = "".concat(u2, " ").concat(this.state.isClosed ? this.props.className : this.props.openedClassName), b2 = "".concat(u2, "__contentOuter ").concat(g2), m2 = "".concat(u2, "__contentInner ").concat(f2);
            return o.a.createElement(s3, l({ className: d2.trim() }, this.props.containerElementProps), o.a.createElement(a2, l({ id: this.triggerId, className: h2.trim(), onClick: this.handleTriggerClick, style: this.props.triggerStyle && this.props.triggerStyle, onKeyPress: function(t4) {
              var n4 = t4.key;
              (" " === n4 && "button" !== e4.props.triggerTagName.toLowerCase() || "Enter" === n4) && e4.handleTriggerClick(t4);
            }, tabIndex: this.props.tabIndex && this.props.tabIndex, "aria-expanded": !this.state.isClosed, "aria-disabled": this.props.triggerDisabled, "aria-controls": this.contentId, role: "button" }, this.props.triggerElementProps), i3), this.renderNonClickableTriggerElement(), o.a.createElement("div", { id: this.contentId, className: b2.trim(), style: t3, onTransitionEnd: this.handleTransitionEnd, ref: this.setInnerRef, hidden: this.props.contentHiddenWhenClosed && this.state.isClosed && !this.state.inTransition, role: "region", "aria-labelledby": this.triggerId }, o.a.createElement("div", { className: m2.trim() }, c2)));
          } }]) && p(t2.prototype, n2), r2 && p(t2, r2), Object.defineProperty(t2, "prototype", { writable: false }), s2;
        }(r.Component);
        m.propTypes = { transitionTime: s.a.number, transitionCloseTime: s.a.number, triggerTagName: s.a.string, easing: s.a.string, open: s.a.bool, containerElementProps: s.a.object, triggerElementProps: s.a.object, contentElementId: s.a.string, classParentString: s.a.string, className: s.a.string, openedClassName: s.a.string, triggerStyle: s.a.object, triggerClassName: s.a.string, triggerOpenedClassName: s.a.string, contentOuterClassName: s.a.string, contentInnerClassName: s.a.string, accordionPosition: s.a.oneOfType([s.a.string, s.a.number]), handleTriggerClick: s.a.func, onOpen: s.a.func, onClose: s.a.func, onOpening: s.a.func, onClosing: s.a.func, onTriggerOpening: s.a.func, onTriggerClosing: s.a.func, trigger: s.a.oneOfType([s.a.string, s.a.element]), triggerWhenOpen: s.a.oneOfType([s.a.string, s.a.element]), triggerDisabled: s.a.bool, lazyRender: s.a.bool, overflowWhenOpen: s.a.oneOf(["hidden", "visible", "auto", "scroll", "inherit", "initial", "unset"]), contentHiddenWhenClosed: s.a.bool, triggerSibling: s.a.oneOfType([s.a.string, s.a.element, s.a.func]), tabIndex: s.a.number, contentContainerTagName: s.a.string, children: s.a.oneOfType([s.a.string, s.a.element]) }, m.defaultProps = { transitionTime: 400, transitionCloseTime: null, triggerTagName: "span", easing: "linear", open: false, classParentString: "Collapsible", triggerDisabled: false, lazyRender: false, overflowWhenOpen: "hidden", contentHiddenWhenClosed: false, openedClassName: "", triggerStyle: null, triggerClassName: "", triggerOpenedClassName: "", contentOuterClassName: "", contentInnerClassName: "", className: "", triggerSibling: null, onOpen: function() {
        }, onClose: function() {
        }, onOpening: function() {
        }, onClosing: function() {
        }, onTriggerOpening: function() {
        }, onTriggerClosing: function() {
        }, tabIndex: null, contentContainerTagName: "div", triggerElementProps: {} };
        t.default = m;
      }]);
    });
  }
});
export default require_dist();
//# sourceMappingURL=react-collapsible.js.map
