import {
  __commonJS,
  __toESM
} from "./chunk-2LSFTFF7.js";

// node_modules/mimic-fn/index.js
var require_mimic_fn = __commonJS({
  "node_modules/mimic-fn/index.js"(exports, module) {
    "use strict";
    var copyProperty = (to, from, property, ignoreNonConfigurable) => {
      if (property === "length" || property === "prototype") {
        return;
      }
      if (property === "arguments" || property === "caller") {
        return;
      }
      const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
      const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
      if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
        return;
      }
      Object.defineProperty(to, property, fromDescriptor);
    };
    var canCopyProperty = function(toDescriptor, fromDescriptor) {
      return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
    };
    var changePrototype = (to, from) => {
      const fromPrototype = Object.getPrototypeOf(from);
      if (fromPrototype === Object.getPrototypeOf(to)) {
        return;
      }
      Object.setPrototypeOf(to, fromPrototype);
    };
    var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
    var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
    var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
    var changeToString = (to, from, name) => {
      const withName = name === "" ? "" : `with ${name.trim()}() `;
      const newToString = wrappedToString.bind(null, withName, from.toString());
      Object.defineProperty(newToString, "name", toStringName);
      Object.defineProperty(to, "toString", { ...toStringDescriptor, value: newToString });
    };
    var mimicFn = (to, from, { ignoreNonConfigurable = false } = {}) => {
      const { name } = to;
      for (const property of Reflect.ownKeys(from)) {
        copyProperty(to, from, property, ignoreNonConfigurable);
      }
      changePrototype(to, from);
      changeToString(to, from, name);
      return to;
    };
    module.exports = mimicFn;
  }
});

// node_modules/p-defer/index.js
var require_p_defer = __commonJS({
  "node_modules/p-defer/index.js"(exports, module) {
    "use strict";
    module.exports = () => {
      const ret = {};
      ret.promise = new Promise((resolve, reject) => {
        ret.resolve = resolve;
        ret.reject = reject;
      });
      return ret;
    };
  }
});

// node_modules/map-age-cleaner/dist/index.js
var require_dist = __commonJS({
  "node_modules/map-age-cleaner/dist/index.js"(exports, module) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : new P(function(resolve2) {
            resolve2(result.value);
          }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    var p_defer_1 = __importDefault(require_p_defer());
    function mapAgeCleaner(map, property = "maxAge") {
      let processingKey;
      let processingTimer;
      let processingDeferred;
      const cleanup = () => __awaiter(this, void 0, void 0, function* () {
        if (processingKey !== void 0) {
          return;
        }
        const setupTimer = (item) => __awaiter(this, void 0, void 0, function* () {
          processingDeferred = p_defer_1.default();
          const delay = item[1][property] - Date.now();
          if (delay <= 0) {
            map.delete(item[0]);
            processingDeferred.resolve();
            return;
          }
          processingKey = item[0];
          processingTimer = setTimeout(() => {
            map.delete(item[0]);
            if (processingDeferred) {
              processingDeferred.resolve();
            }
          }, delay);
          if (typeof processingTimer.unref === "function") {
            processingTimer.unref();
          }
          return processingDeferred.promise;
        });
        try {
          for (const entry of map) {
            yield setupTimer(entry);
          }
        } catch (_a) {
        }
        processingKey = void 0;
      });
      const reset = () => {
        processingKey = void 0;
        if (processingTimer !== void 0) {
          clearTimeout(processingTimer);
          processingTimer = void 0;
        }
        if (processingDeferred !== void 0) {
          processingDeferred.reject(void 0);
          processingDeferred = void 0;
        }
      };
      const originalSet = map.set.bind(map);
      map.set = (key, value) => {
        if (map.has(key)) {
          map.delete(key);
        }
        const result = originalSet(key, value);
        if (processingKey && processingKey === key) {
          reset();
        }
        cleanup();
        return result;
      };
      cleanup();
      return map;
    }
    exports.default = mapAgeCleaner;
    module.exports = mapAgeCleaner;
    module.exports.default = mapAgeCleaner;
  }
});

// node_modules/mem/dist/index.js
var require_dist2 = __commonJS({
  "node_modules/mem/dist/index.js"(exports, module) {
    "use strict";
    var mimicFn = require_mimic_fn();
    var mapAgeCleaner = require_dist();
    var decoratorInstanceMap = /* @__PURE__ */ new WeakMap();
    var cacheStore = /* @__PURE__ */ new WeakMap();
    var mem2 = (fn, { cacheKey, cache = /* @__PURE__ */ new Map(), maxAge } = {}) => {
      if (typeof maxAge === "number") {
        mapAgeCleaner(cache);
      }
      const memoized = function(...arguments_) {
        const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
        const cacheItem = cache.get(key);
        if (cacheItem) {
          return cacheItem.data;
        }
        const result = fn.apply(this, arguments_);
        cache.set(key, {
          data: result,
          maxAge: maxAge ? Date.now() + maxAge : Number.POSITIVE_INFINITY
        });
        return result;
      };
      mimicFn(memoized, fn, {
        ignoreNonConfigurable: true
      });
      cacheStore.set(memoized, cache);
      return memoized;
    };
    mem2.decorator = (options = {}) => (target, propertyKey, descriptor) => {
      const input = target[propertyKey];
      if (typeof input !== "function") {
        throw new TypeError("The decorated value must be a function");
      }
      delete descriptor.value;
      delete descriptor.writable;
      descriptor.get = function() {
        if (!decoratorInstanceMap.has(this)) {
          const value = mem2(input, options);
          decoratorInstanceMap.set(this, value);
          return value;
        }
        return decoratorInstanceMap.get(this);
      };
    };
    mem2.clear = (fn) => {
      const cache = cacheStore.get(fn);
      if (!cache) {
        throw new TypeError("Can't clear a function that was not memoized!");
      }
      if (typeof cache.clear !== "function") {
        throw new TypeError("The cache Map can't be cleared!");
      }
      cache.clear();
    };
    module.exports = mem2;
  }
});

// node_modules/get-user-locale/dist/esm/index.js
var import_mem = __toESM(require_dist2());
function isString(el) {
  return typeof el === "string";
}
function isUnique(el, index, arr) {
  return arr.indexOf(el) === index;
}
function isAllLowerCase(el) {
  return el.toLowerCase() === el;
}
function fixCommas(el) {
  return el.indexOf(",") === -1 ? el : el.split(",");
}
function normalizeLocale(locale) {
  if (!locale) {
    return locale;
  }
  if (locale === "C" || locale === "posix" || locale === "POSIX") {
    return "en-US";
  }
  if (locale.indexOf(".") !== -1) {
    var _a = locale.split(".")[0], actualLocale = _a === void 0 ? "" : _a;
    return normalizeLocale(actualLocale);
  }
  if (locale.indexOf("@") !== -1) {
    var _b = locale.split("@")[0], actualLocale = _b === void 0 ? "" : _b;
    return normalizeLocale(actualLocale);
  }
  if (locale.indexOf("-") === -1 || !isAllLowerCase(locale)) {
    return locale;
  }
  var _c = locale.split("-"), splitEl1 = _c[0], _d = _c[1], splitEl2 = _d === void 0 ? "" : _d;
  return "".concat(splitEl1, "-").concat(splitEl2.toUpperCase());
}
function getUserLocalesInternal(_a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.useFallbackLocale, useFallbackLocale = _c === void 0 ? true : _c, _d = _b.fallbackLocale, fallbackLocale = _d === void 0 ? "en-US" : _d;
  var languageList = [];
  if (typeof navigator !== "undefined") {
    var rawLanguages = navigator.languages || [];
    var languages = [];
    for (var _i = 0, rawLanguages_1 = rawLanguages; _i < rawLanguages_1.length; _i++) {
      var rawLanguagesItem = rawLanguages_1[_i];
      languages = languages.concat(fixCommas(rawLanguagesItem));
    }
    var rawLanguage = navigator.language;
    var language = rawLanguage ? fixCommas(rawLanguage) : rawLanguage;
    languageList = languageList.concat(languages, language);
  }
  if (useFallbackLocale) {
    languageList.push(fallbackLocale);
  }
  return languageList.filter(isString).map(normalizeLocale).filter(isUnique);
}
var getUserLocales = (0, import_mem.default)(getUserLocalesInternal, { cacheKey: JSON.stringify });
function getUserLocaleInternal(options) {
  return getUserLocales(options)[0] || null;
}
var getUserLocale = (0, import_mem.default)(getUserLocaleInternal, { cacheKey: JSON.stringify });
var esm_default = getUserLocale;

// node_modules/@wojtekmaj/date-utils/dist/esm/index.js
function makeGetEdgeOfNeighbor(getPeriod, getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var previousPeriod = getPeriod(date) + offset;
    return getEdgeOfPeriod(previousPeriod);
  };
}
function makeGetEnd(getBeginOfNextPeriod) {
  return function makeGetEndInternal(date) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1);
  };
}
function makeGetRange(getStart, getEnd) {
  return function makeGetRangeInternal(date) {
    return [getStart(date), getEnd(date)];
  };
}
function getYear(date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  if (typeof date === "number") {
    return date;
  }
  var year = parseInt(date, 10);
  if (typeof date === "string" && !isNaN(year)) {
    return year;
  }
  throw new Error("Failed to get year from date: ".concat(date, "."));
}
function getMonth(date) {
  if (date instanceof Date) {
    return date.getMonth();
  }
  throw new Error("Failed to get month from date: ".concat(date, "."));
}
function getDate(date) {
  if (date instanceof Date) {
    return date.getDate();
  }
  throw new Error("Failed to get year from date: ".concat(date, "."));
}
function getHours(date) {
  if (date instanceof Date) {
    return date.getHours();
  }
  if (typeof date === "string") {
    var datePieces = date.split(":");
    if (datePieces.length >= 2) {
      var hoursString = datePieces[0];
      if (hoursString) {
        var hours = parseInt(hoursString, 10);
        if (!isNaN(hours)) {
          return hours;
        }
      }
    }
  }
  throw new Error("Failed to get hours from date: ".concat(date, "."));
}
function getMinutes(date) {
  if (date instanceof Date) {
    return date.getMinutes();
  }
  if (typeof date === "string") {
    var datePieces = date.split(":");
    if (datePieces.length >= 2) {
      var minutesString = datePieces[1] || "0";
      var minutes = parseInt(minutesString, 10);
      if (!isNaN(minutes)) {
        return minutes;
      }
    }
  }
  throw new Error("Failed to get minutes from date: ".concat(date, "."));
}
function getSeconds(date) {
  if (date instanceof Date) {
    return date.getSeconds();
  }
  if (typeof date === "string") {
    var datePieces = date.split(":");
    if (datePieces.length >= 2) {
      var secondsWithMillisecondsString = datePieces[2] || "0";
      var seconds = parseInt(secondsWithMillisecondsString, 10);
      if (!isNaN(seconds)) {
        return seconds;
      }
    }
  }
  throw new Error("Failed to get seconds from date: ".concat(date, "."));
}
function getMilliseconds(date) {
  if (date instanceof Date) {
    return date.getMilliseconds();
  }
  if (typeof date === "string") {
    var datePieces = date.split(":");
    if (datePieces.length >= 2) {
      var secondsWithMillisecondsString = datePieces[2] || "0";
      var millisecondsString = secondsWithMillisecondsString.split(".")[1] || "0";
      var milliseconds = parseInt(millisecondsString, 10);
      if (!isNaN(milliseconds)) {
        return milliseconds;
      }
    }
  }
  throw new Error("Failed to get seconds from date: ".concat(date, "."));
}
function getCenturyStart(date) {
  var year = getYear(date);
  var centuryStartYear = year + (-year + 1) % 100;
  var centuryStartDate = /* @__PURE__ */ new Date();
  centuryStartDate.setFullYear(centuryStartYear, 0, 1);
  centuryStartDate.setHours(0, 0, 0, 0);
  return centuryStartDate;
}
var getPreviousCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100);
var getNextCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100);
var getCenturyEnd = makeGetEnd(getNextCenturyStart);
var getPreviousCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100);
var getNextCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, 100);
var getCenturyRange = makeGetRange(getCenturyStart, getCenturyEnd);
function getDecadeStart(date) {
  var year = getYear(date);
  var decadeStartYear = year + (-year + 1) % 10;
  var decadeStartDate = /* @__PURE__ */ new Date();
  decadeStartDate.setFullYear(decadeStartYear, 0, 1);
  decadeStartDate.setHours(0, 0, 0, 0);
  return decadeStartDate;
}
var getPreviousDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10);
var getNextDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10);
var getDecadeEnd = makeGetEnd(getNextDecadeStart);
var getPreviousDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10);
var getNextDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, 10);
var getDecadeRange = makeGetRange(getDecadeStart, getDecadeEnd);
function getYearStart(date) {
  var year = getYear(date);
  var yearStartDate = /* @__PURE__ */ new Date();
  yearStartDate.setFullYear(year, 0, 1);
  yearStartDate.setHours(0, 0, 0, 0);
  return yearStartDate;
}
var getPreviousYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, -1);
var getNextYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, 1);
var getYearEnd = makeGetEnd(getNextYearStart);
var getPreviousYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1);
var getNextYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, 1);
var getYearRange = makeGetRange(getYearStart, getYearEnd);
function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborMonthInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var year = getYear(date);
    var month = getMonth(date) + offset;
    var previousPeriod = /* @__PURE__ */ new Date();
    previousPeriod.setFullYear(year, month, 1);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
function getMonthStart(date) {
  var year = getYear(date);
  var month = getMonth(date);
  var monthStartDate = /* @__PURE__ */ new Date();
  monthStartDate.setFullYear(year, month, 1);
  monthStartDate.setHours(0, 0, 0, 0);
  return monthStartDate;
}
var getPreviousMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, -1);
var getNextMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, 1);
var getMonthEnd = makeGetEnd(getNextMonthStart);
var getPreviousMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, -1);
var getNextMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, 1);
var getMonthRange = makeGetRange(getMonthStart, getMonthEnd);
function makeGetEdgeOfNeighborDay(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborDayInternal(date, offset) {
    if (offset === void 0) {
      offset = defaultOffset;
    }
    var year = getYear(date);
    var month = getMonth(date);
    var day = getDate(date) + offset;
    var previousPeriod = /* @__PURE__ */ new Date();
    previousPeriod.setFullYear(year, month, day);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
function getDayStart(date) {
  var year = getYear(date);
  var month = getMonth(date);
  var day = getDate(date);
  var dayStartDate = /* @__PURE__ */ new Date();
  dayStartDate.setFullYear(year, month, day);
  dayStartDate.setHours(0, 0, 0, 0);
  return dayStartDate;
}
var getPreviousDayStart = makeGetEdgeOfNeighborDay(getDayStart, -1);
var getNextDayStart = makeGetEdgeOfNeighborDay(getDayStart, 1);
var getDayEnd = makeGetEnd(getNextDayStart);
var getPreviousDayEnd = makeGetEdgeOfNeighborDay(getDayEnd, -1);
var getNextDayEnd = makeGetEdgeOfNeighborDay(getDayEnd, 1);
var getDayRange = makeGetRange(getDayStart, getDayEnd);
function getDaysInMonth(date) {
  return getDate(getMonthEnd(date));
}
function padStart(num, val) {
  if (val === void 0) {
    val = 2;
  }
  var numStr = "".concat(num);
  if (numStr.length >= val) {
    return num;
  }
  return "0000".concat(numStr).slice(-val);
}
function getHoursMinutes(date) {
  var hours = padStart(getHours(date));
  var minutes = padStart(getMinutes(date));
  return "".concat(hours, ":").concat(minutes);
}
function getHoursMinutesSeconds(date) {
  var hours = padStart(getHours(date));
  var minutes = padStart(getMinutes(date));
  var seconds = padStart(getSeconds(date));
  return "".concat(hours, ":").concat(minutes, ":").concat(seconds);
}

export {
  getYear,
  getMonth,
  getDate,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  getCenturyStart,
  getPreviousCenturyStart,
  getNextCenturyStart,
  getCenturyEnd,
  getPreviousCenturyEnd,
  getCenturyRange,
  getDecadeStart,
  getPreviousDecadeStart,
  getNextDecadeStart,
  getDecadeEnd,
  getPreviousDecadeEnd,
  getDecadeRange,
  getYearStart,
  getPreviousYearStart,
  getNextYearStart,
  getYearEnd,
  getPreviousYearEnd,
  getYearRange,
  getMonthStart,
  getPreviousMonthStart,
  getNextMonthStart,
  getMonthEnd,
  getPreviousMonthEnd,
  getMonthRange,
  getDayStart,
  getDayEnd,
  getDayRange,
  getDaysInMonth,
  getHoursMinutes,
  getHoursMinutesSeconds,
  getUserLocale,
  esm_default
};
//# sourceMappingURL=chunk-C6GN64RH.js.map
