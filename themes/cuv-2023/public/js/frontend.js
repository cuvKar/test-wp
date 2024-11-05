(self["webpackChunkcuv_2023"] = self["webpackChunkcuv_2023"] || []).push([["/js/frontend"],{

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: () => (/* binding */ createPopper),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   popperGenerator: () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_4__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_7__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref) {
        var name = _ref.name,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options,
            effect = _ref.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isElement: () => (/* binding */ isElement),
/* harmony export */   isHTMLElement: () => (/* binding */ isHTMLElement),
/* harmony export */   isShadowRoot: () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterMain: () => (/* binding */ afterMain),
/* harmony export */   afterRead: () => (/* binding */ afterRead),
/* harmony export */   afterWrite: () => (/* binding */ afterWrite),
/* harmony export */   auto: () => (/* binding */ auto),
/* harmony export */   basePlacements: () => (/* binding */ basePlacements),
/* harmony export */   beforeMain: () => (/* binding */ beforeMain),
/* harmony export */   beforeRead: () => (/* binding */ beforeRead),
/* harmony export */   beforeWrite: () => (/* binding */ beforeWrite),
/* harmony export */   bottom: () => (/* binding */ bottom),
/* harmony export */   clippingParents: () => (/* binding */ clippingParents),
/* harmony export */   end: () => (/* binding */ end),
/* harmony export */   left: () => (/* binding */ left),
/* harmony export */   main: () => (/* binding */ main),
/* harmony export */   modifierPhases: () => (/* binding */ modifierPhases),
/* harmony export */   placements: () => (/* binding */ placements),
/* harmony export */   popper: () => (/* binding */ popper),
/* harmony export */   read: () => (/* binding */ read),
/* harmony export */   reference: () => (/* binding */ reference),
/* harmony export */   right: () => (/* binding */ right),
/* harmony export */   start: () => (/* binding */ start),
/* harmony export */   top: () => (/* binding */ top),
/* harmony export */   variationPlacements: () => (/* binding */ variationPlacements),
/* harmony export */   viewport: () => (/* binding */ viewport),
/* harmony export */   write: () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   afterMain: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterMain),
/* harmony export */   afterRead: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterRead),
/* harmony export */   afterWrite: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.afterWrite),
/* harmony export */   applyStyles: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.applyStyles),
/* harmony export */   arrow: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.arrow),
/* harmony export */   auto: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.auto),
/* harmony export */   basePlacements: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements),
/* harmony export */   beforeMain: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeMain),
/* harmony export */   beforeRead: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeRead),
/* harmony export */   beforeWrite: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.beforeWrite),
/* harmony export */   bottom: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom),
/* harmony export */   clippingParents: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents),
/* harmony export */   computeStyles: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.computeStyles),
/* harmony export */   createPopper: () => (/* reexport safe */ _popper_js__WEBPACK_IMPORTED_MODULE_4__.createPopper),
/* harmony export */   createPopperBase: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.createPopper),
/* harmony export */   createPopperLite: () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__.createPopper),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   end: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.end),
/* harmony export */   eventListeners: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.eventListeners),
/* harmony export */   flip: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.flip),
/* harmony export */   hide: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.hide),
/* harmony export */   left: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.left),
/* harmony export */   main: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.main),
/* harmony export */   modifierPhases: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases),
/* harmony export */   offset: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.offset),
/* harmony export */   placements: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements),
/* harmony export */   popper: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper),
/* harmony export */   popperGenerator: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_2__.popperGenerator),
/* harmony export */   popperOffsets: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.popperOffsets),
/* harmony export */   preventOverflow: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__.preventOverflow),
/* harmony export */   read: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.read),
/* harmony export */   reference: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference),
/* harmony export */   right: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.right),
/* harmony export */   start: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.start),
/* harmony export */   top: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.top),
/* harmony export */   variationPlacements: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements),
/* harmony export */   viewport: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport),
/* harmony export */   write: () => (/* reexport safe */ _enums_js__WEBPACK_IMPORTED_MODULE_0__.write)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _popper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popper.js */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");








 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_8__["default"])(state.elements.popper, arrowElement)) {
    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   mapToStyles: () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   arrow: () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   computeStyles: () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   eventListeners: () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   flip: () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   hide: () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   offset: () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   popperOffsets: () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   preventOverflow: () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   distanceAndSkiddingToXY: () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPopper: () => (/* binding */ createPopper),
/* harmony export */   defaultModifiers: () => (/* binding */ defaultModifiers),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   popperGenerator: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   applyStyles: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   arrow: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   computeStyles: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   createPopper: () => (/* binding */ createPopper),
/* harmony export */   createPopperLite: () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   defaultModifiers: () => (/* binding */ defaultModifiers),
/* harmony export */   detectOverflow: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   eventListeners: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   flip: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   hide: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   offset: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   popperGenerator: () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   popperOffsets: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   preventOverflow: () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   max: () => (/* binding */ max),
/* harmony export */   min: () => (/* binding */ min),
/* harmony export */   round: () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   within: () => (/* binding */ within),
/* harmony export */   withinMaxClamp: () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./assets/js/frontend/after.js":
/*!*************************************!*\
  !*** ./assets/js/frontend/after.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Loaded after app.js
__webpack_require__(/*! ./custom.js */ "./assets/js/frontend/custom.js");
__webpack_require__(/*! ./custom/bootstrap.js */ "./assets/js/frontend/custom/bootstrap.js");
__webpack_require__(/*! ./custom/cookies.js */ "./assets/js/frontend/custom/cookies.js");
__webpack_require__(/*! ./custom/embed.js */ "./assets/js/frontend/custom/embed.js");
__webpack_require__(/*! ./custom/forms.js */ "./assets/js/frontend/custom/forms.js");
__webpack_require__(/*! ./custom/header.js */ "./assets/js/frontend/custom/header.js");
__webpack_require__(/*! ./custom/menu.js */ "./assets/js/frontend/custom/menu.js");
__webpack_require__(/*! ./custom/scroll.js */ "./assets/js/frontend/custom/scroll.js");
__webpack_require__(/*! ./custom/slick.js */ "./assets/js/frontend/custom/slick.js");
__webpack_require__(/*! ./helpers/analytics.js */ "./assets/js/frontend/helpers/analytics.js");
__webpack_require__(/*! ./plugins/share-price.js */ "./assets/js/frontend/plugins/share-price.js");

/***/ }),

/***/ "./assets/js/frontend/app.js":
/*!***********************************!*\
  !*** ./assets/js/frontend/app.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! slick-carousel */ "./node_modules/slick-carousel/slick/slick.js");
/* harmony import */ var slick_carousel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(slick_carousel__WEBPACK_IMPORTED_MODULE_0__);
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */


try {
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "jquery");

  /**
   * Get Bootstrap
   */
  window.bootstrap = __webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.esm.js");

  /**
   * JS Cookie
   */
  window.Cookies = __webpack_require__(/*! js-cookie */ "./node_modules/js-cookie/dist/js.cookie.js");

  /**
   * Custom Plugins / Components
   */
  __webpack_require__(/*! ./plugins/exists.js */ "./assets/js/frontend/plugins/exists.js");
} catch (e) {}

/***/ }),

/***/ "./assets/js/frontend/before.js":
/*!**************************************!*\
  !*** ./assets/js/frontend/before.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Loaded before app.js
__webpack_require__(/*! ./helpers/polyfills.js */ "./assets/js/frontend/helpers/polyfills.js");
__webpack_require__(/*! ./helpers/validation.js */ "./assets/js/frontend/helpers/validation.js");

/***/ }),

/***/ "./assets/js/frontend/custom.js":
/*!**************************************!*\
  !*** ./assets/js/frontend/custom.js ***!
  \**************************************/
/***/ (() => {

/*
 * Get A Query Variable
 *
 * Simple url string parsing function to grab
 * a query variable or return false if not set
 */
CUVAjax.getQueryVariable = function (variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};

/*
 * Check If ANY Query Variables
 *
 * Lorem ipsum dolor sit amet, consectetur adipiscing
 * elit. Proin aliquam commodo quam etiamx imperdiet.
 */
CUVAjax.hasQueryVars = function () {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  return vars.length >= 1;
};

/*
 * Remove A Query Variable
 *
 * Lorem ipsum dolor sit amet, consectetur adipiscing
 * elit. Proin aliquam commodo quam etiamx imperdiet.
 */
CUVAjax.removeQueryVariable = function (variable) {
  window.history.pushState(null, null, window.location.pathname);
};

/*
 * @TODO
 *
 * Bacon ipsum dolor amet tenderloin cow tongue,
 * filet mignon kielbasa brisket salami biltong.
 */
CUVAjax.equalHeights = function (el) {
  var $el = [],
    tallest = 0,
    els = jQuery(el);
  els.each(function () {
    $el = jQuery(this);
    $el.height('auto');
    var currentHeight = jQuery(this).height();
    if (currentHeight > tallest) {
      tallest = currentHeight;
    }
  });
  els.height(tallest);
};

/*
 * @TODO
 *
 * Bacon ipsum dolor amet tenderloin cow tongue,
 * filet mignon kielbasa brisket salami biltong.
 */
CUVAjax.scrollToEl = function (el, off, cb) {
  pos = el ? $(el).offset().top : 0;
  jQuery('html,body').animate({
    scrollTop: pos - (off ? off : 0)
  }, 1200, cb);
};

/**
 * Helper function to find closest ancestor
 * (polyfill as closest is not supported by IE11)
 * 
 * @param el DOM node to find the ancestor for
 * @param selector Query selector string
 * @return {HTMLElement | {matchesSelector}}
 */
CUVAjax.findAncestor = function (el, selector) {
  while ((el = el.parentElement) && !(el.matches || el.matchesSelector).call(el, selector));
  return el;
};

/***/ }),

/***/ "./assets/js/frontend/custom/bootstrap.js":
/*!************************************************!*\
  !*** ./assets/js/frontend/custom/bootstrap.js ***!
  \************************************************/
/***/ (() => {

/**
 * Bootstrap 4 Inits + Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * Bootstrap Popup Modal
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  if ($('#popup-modal').length > 0) {
    var popupModal = new bootstrap.Modal('#popup-modal', {
      keyboard: false
    });
    popupModal.show();
  }
  $('.collapse').on('shown.bs.collapse', function () {
    var person = $(this).data('person');
    $(this).parent().siblings('.row').find('.person').removeClass('active');
    $('#' + person).addClass('active');
  });

  // ---------------------------------------------------------------------

  /*
   * @TODO
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $('input[type=radio][name=enquiry_type]').change(function (evt) {
    $('.form-wrapper').removeClass('d-none');
  });

  // ---------------------------------------------------------------------

  /*
   * @TODO
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $('.close-modal').on('click', function (e) {
    e.preventDefault();
    $(this).parent().find('.form-messages').removeClass('success error').addClass('d-none').text('');
  });
  $('.modal').on('hidden.bs.modal', function () {
    $(this).find('.form-messages').removeClass('success error').addClass('d-none').text('');
  });

  // ---------------------------------------------------------------------

  /*
   * @TODO
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $('.show-more').on('click', function (e) {
    var type = $(this).data('type');
    $(this).parent().find('.' + type + '.d-none').toggleClass('d-none d-flex');
    $(this).addClass('d-none');
  });
});

/***/ }),

/***/ "./assets/js/frontend/custom/cookies.js":
/*!**********************************************!*\
  !*** ./assets/js/frontend/custom/cookies.js ***!
  \**********************************************/
/***/ (() => {

/*
 * Cookies + Cookie Notice
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * Dismissed Cookie Notification
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  if (!Cookies.get('dismissed-notifications')) {
    $('body').addClass('cookie');
    $('#cookie-notice').show();
  }

  // ---------------------------------------------------------------------

  /*
   * Dismissed Cookie Notification
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $('.dismiss-notice, .btn-cookie').click(function (e) {
    // prevent jump
    e.preventDefault();
    // remove body class
    $('body').removeClass('cookie');
    // dismiss notification
    $(this).closest('.cookie-message').fadeOut('slow');
    // update cookie
    Cookies.set('dismissed-notifications', 1, {
      expires: 365
    });
  });
});

/***/ }),

/***/ "./assets/js/frontend/custom/embed.js":
/*!********************************************!*\
  !*** ./assets/js/frontend/custom/embed.js ***!
  \********************************************/
/***/ (() => {

/**
 * Embed Functions + Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
(function ($) {
  // poster frame click event
  $(document).on('click', '.js-embed-poster', function (ev) {
    ev.preventDefault();
    var $poster = $(this);
    var $wrapper = $poster.closest('.js-embed-responsive');
    videoPlay($wrapper);
  });

  // play the targeted video (and hide the poster frame)
  function videoPlay($wrapper) {
    var $iframe = $wrapper.find('.js-embed-responsive-item');
    var src = $iframe.data('src');
    // hide poster
    $wrapper.addClass('js-embed-responsive-active');
    // add iframe src in, starting the video
    $iframe.attr('src', src);
  }

  // stop the targeted/all videos (and re-instate the poster frames)
  function videoStop($wrapper) {
    // if we're stopping all videos on page
    if (!$wrapper) {
      var $wrapper = $('.js-embed-responsive');
      var $iframe = $('.js-embed-responsive-item');
      // if we're stopping a particular video
    } else {
      var $iframe = $wrapper.find('.js-embed-responsive-item');
    }
    // reveal poster
    $wrapper.removeClass('js-embed-responsive-active');
    // remove youtube link, stopping the video from playing in the background
    $iframe.attr('src', '');
  }
})(jQuery);

/***/ }),

/***/ "./assets/js/frontend/custom/forms.js":
/*!********************************************!*\
  !*** ./assets/js/frontend/custom/forms.js ***!
  \********************************************/
/***/ (() => {

/**
 * Form Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * All Forms Custom Bootstrap File Input Helper
   */
  $('input[type="file"]').change(function (e) {
    var approved = [],
      files = e.currentTarget.files;
    for (var i = 0; i < files.length; i++) {
      var filesize = (files[i].size / 1024 / 1024).toFixed(4);
      if (filesize <= 1) {
        approved.push(files[i].name);
      } else {
        delete files[i];
      }
    }
    $(this).parent().find('.filelist').html(approved.join('<br>'));
  });

  // ---------------------------------------------------------------------

  /*
   * The Datepicker Init For All Forms
   */
  if ($('.datepicker').length > 0) {
    $('.datepicker').datepicker({
      dateFormat: "dd-mm-yy"
    });
  }

  // ---------------------------------------------------------------------

  /*
   * Generic Save Button Handler
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $(document).on('click', '.btn-send', function (e) {
    var form = $(this).closest('form');
    var saveButton = form.find('.btn-save');
    var spinner = saveButton.find('.fa-spinner');
    $(form).submit(function (e) {
      if ($(this)[0].checkValidity() === true) {} else {
        e.preventDefault();
        e.stopPropagation();
      }
      form.addClass('was-validated');
    });
  });

  // ---------------------------------------------------------------------

  /*
   * Ajax Contact Form Handler
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $(function () {
    var form = $('#contact-form');
    var formMssg = form.find('.form-messages');
    var sendBttn = form.find('.btn-send');
    var spinner = sendBttn.find('.fa-spinner');
    $(form).submit(function (e) {
      e.preventDefault();
      e.stopPropagation();
      if ($(this).get(0).checkValidity() === true) {
        grecaptcha.ready(function () {
          grecaptcha.execute('6Lc40FoaAAAAAK9b4i7hlvSioZ2H3WV7pINK-YUo', {
            action: 'asr_contact_form_handler'
          }).then(function (token) {
            if (!token) {
              grecaptcha.reset();
              return null;
            }
            var gRecaptchaResponse = form.find('.g-recaptcha-response');
            gRecaptchaResponse.val(token);
            var formData = $(form).serialize();
            $.ajax({
              type: 'POST',
              url: CUVAjax.ajax_url,
              data: {
                'action': 'asr_contact_form_handler',
                'formdata': formData
              },
              beforeSend: function beforeSend() {
                $(sendBttn).prop('disabled', true);
                $(spinner).removeClass('d-none');
              }
            }).done(function (response) {
              console.log(response);
              $(sendBttn).prop('disabled', false);
              $(spinner).addClass('d-none');
              $(formMssg).removeClass('d-none error').addClass('success').text(response);
              $('.form-control').val('');
              form.removeClass('was-validated');
              $('#exampleModal').modal('hide');
            }).fail(function (data) {
              $(sendBttn).prop('disabled', false);
              $(spinner).addClass('d-none');
              $(formMssg).removeClass('d-none success').addClass('error');
              if (data.responseText !== '') {
                $(formMssg).text(data.responseText);
              } else {
                $(formMssg).text('An error occured and your message could not be sent. Please try again.');
              }
            });
          });
        });
      }
      form.addClass('was-validated');
    });
  });

  // ---------------------------------------------------------------------

  /*
   * Ajax Signup Mailchimp Form Handler
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $(function () {
    var form = $('#newsletter-signup-form');
    var formMssg = form.find('.form-messages');
    var sendBttn = form.find('.btn-send');
    var spinner = sendBttn.find('.fa-spinner');
    $(document).on('submit', '#newsletter-signup-form', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if ($(this).get(0).checkValidity() === true) {
        var formData = $(form).serialize();
        $.ajax({
          type: 'POST',
          url: CUVAjax.ajax_url,
          data: {
            'action': 'asr_newsletter_signup_form_handler',
            'formdata': formData
          },
          beforeSend: function beforeSend() {
            $(sendBttn).prop('disabled', true);
            $(spinner).removeClass('d-none');
          }
        }).done(function (response) {
          $(sendBttn).prop('disabled', false);
          $(spinner).addClass('d-none');
          $(formMssg).removeClass('d-none error').addClass('success').text(response);
          $('.form-control').val('');
          $('#signup_terms').prop('checked', false);
          form.removeClass('was-validated');
          setTimeout(function () {
            $('#newsletter-signup-modal').modal('hide');
            $(formMssg).removeClass('error success').addClass('d-none').text('');
          }, 5000);
        }).fail(function (data) {
          $(sendBttn).prop('disabled', false);
          $(spinner).addClass('d-none');
          $(formMssg).removeClass('d-none success').addClass('error');
          if (data.responseText !== '') {
            $(formMssg).text(data.responseText);
          } else {
            $(formMssg).text('An error occured and your message could not be sent. Please try again.');
          }
        });
      }
      form.addClass('was-validated');
    });
  });
});

/***/ }),

/***/ "./assets/js/frontend/custom/header.js":
/*!*********************************************!*\
  !*** ./assets/js/frontend/custom/header.js ***!
  \*********************************************/
/***/ (() => {

/**
 * Header Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * @TODO
   */
  var mainHeader = $('#page-header'),
    headerHeight = mainHeader.height(),
    scrolling = false,
    previousTop = 0,
    currentTop = 0,
    scrollDelta = 10,
    scrollOffset = 90;

  /*
   * @TODO
   */
  $(window).on('scroll', function () {
    if (!scrolling) {
      scrolling = true;
      !window.requestAnimationFrame ? setTimeout(autoHideHeader, 250) : requestAnimationFrame(autoHideHeader);
    }
  });

  /*
   * @TODO
   */
  $(window).on('resize', function () {
    headerHeight = mainHeader.height();
  });

  /*
   * @TODO
   */
  function autoHideHeader() {
    var currentTop = $(window).scrollTop();
    animateLogo(currentTop);
    checkSimpleNavigation(currentTop);
    previousTop = currentTop;
    scrolling = false;
  }

  /*
   * @TODO
   */
  function animateLogo(currentTop) {
    if (currentTop > 1) {
      $('body').addClass('scrolled');
    } else {
      $('body').removeClass('scrolled');
    }
  }

  /*
   * @TODO
   */
  function checkSimpleNavigation(currentTop) {
    if (previousTop - currentTop > scrollDelta) {
      if (mainHeader.hasClass('has-shop-nav')) {
        $('html').removeClass('nav-pinned');
        mainHeader.removeClass('is-hidden');
      }
    } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
      if (mainHeader.hasClass('has-shop-nav')) {
        $('html').addClass('nav-pinned');
        mainHeader.addClass('is-hidden');
      }
    }
  }
});

/***/ }),

/***/ "./assets/js/frontend/custom/menu.js":
/*!*******************************************!*\
  !*** ./assets/js/frontend/custom/menu.js ***!
  \*******************************************/
/***/ (() => {

/**
 * Menu and Mavigation Element Handlers.
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * Menu Toggle Click Hangler
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $('.menu-toggle').on('click', function (e) {
    e.preventDefault();
    $('body').toggleClass('menu-open');
  });

  // ---------------------------------------------------------------------

  /*
   * Cache Current Window Wisth
   */
  var cachedWidth = $(window).width();

  // ---------------------------------------------------------------------

  /*
   * Sub Menu Toggle Click Hangler
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $('.menu-item-has-children > a').on('click', function (e) {
    if (cachedWidth < 1366) {
      e.preventDefault();
      $('.menu-item-has-children > a').not(this).parent().removeClass('sub-menu-open');
      $(this).parent().toggleClass('sub-menu-open');
    }
  });

  // ---------------------------------------------------------------------

  /*
   * Resize Handler
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $(window).resize(function () {
    var newWidth = $(window).width();
    if (newWidth !== cachedWidth) {
      if ($('body').hasClass('menu-open')) {
        $('body').removeClass('menu-open');
      }
      $('.menu-item-has-children').removeClass('sub-menu-open');
      cachedWidth = newWidth;
    }
  });

  // ---------------------------------------------------------------------

  /*
   * Off Sidebar Click To Close Handling
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  $(document).mouseup(function (evt) {
    if ($('body').hasClass('off-canvas-open')) {
      var elements = '.menu, .menu-toggle, .off-canvas, .menu-socials, .off-canvas-search';
      if (!$(elements).is(evt.target) && $(elements).has(evt.target).length === 0) {
        $('.off-canvas').removeClass('open');
        $('body').removeClass('off-canvas-open');
      }
    }
  });
});

/***/ }),

/***/ "./assets/js/frontend/custom/scroll.js":
/*!*********************************************!*\
  !*** ./assets/js/frontend/custom/scroll.js ***!
  \*********************************************/
/***/ (() => {

/**
 * Scroll Functions + Handlers
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * Scroll To Element Button Handlers
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  if ($('.scroll-to-thee').length > 0) {
    $('.scroll-to-thee').each(function () {
      $(this).on('click', function (e) {
        e.preventDefault();
        var href = $(this).attr('href');
        CUVAjax.scrollToEl(href, 0, null);
      });
    });
  }

  // ---------------------------------------------------------------------

  /*
   * Scroll To Top
   *
   * Super simple scroll to top functionality
   * fired when scrolling past a given height.
   */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 340) {
      $('#back-top').addClass('show');
    } else {
      $('#back-top').removeClass('show');
    }
  });
  $('#back-top').on('click', function (e) {
    e.preventDefault();
    $('body, html').animate({
      scrollTop: 0
    }, 800);
    return false;
  });
});

/***/ }),

/***/ "./assets/js/frontend/custom/slick.js":
/*!********************************************!*\
  !*** ./assets/js/frontend/custom/slick.js ***!
  \********************************************/
/***/ (() => {

/**
 * Slick Carousel Inits + Handles
 *
 * @author John Ranby
 * @see    https://github.com/jranby
 */
jQuery(document).ready(function ($) {
  /*
   * Link Carousel.
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  if ($('.link-carousel .carousel').length > 0) {
    $('.link-carousel .carousel').each(function () {
      var specSlider = $(this),
        specPaging = specSlider.parent().find('.pager');
      var specPrev = specPaging.find('.prev'),
        specNext = specPaging.find('.next');
      specSlider.on('init', function (event, slick) {
        //$('.slick-current').next().addClass('pull-down');
      });
      specSlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        prevArrow: specPrev,
        nextArrow: specNext,
        appendArrows: specPaging,
        adaptiveHeight: 0,
        accessibility: 0,
        rows: 0,
        responsive: [{
          breakpoint: 1366,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            arrows: false
          }
        }]
      });
    });
  }

  /*
   * Text Carousel.
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  if ($('.text-carousel .carousel').length > 0) {
    $('.text-carousel .carousel').each(function () {
      var specSlider = $(this),
        specPaging = specSlider.parent().find('.pager');
      var specPrev = specPaging.find('.prev'),
        specNext = specPaging.find('.next');
      specSlider.slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        prevArrow: specPrev,
        nextArrow: specNext,
        appendArrows: specPaging,
        adaptiveHeight: 0,
        accessibility: 0,
        rows: 0,
        responsive: [{
          breakpoint: 1366,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            arrows: false
          }
        }]
      });
    });
  }

  /*
   * Image Carousel.
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
    if ($('.image-carousel .carousel').length > 0) {
        $('.image-carousel .carousel').each(function () {
          var specSlider = $(this),
            specPaging = specSlider.parent().find('.pager');

          var specPrev = specPaging.find('.prev'),
            specNext = specPaging.find('.next');
          specSlider.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: true,
            dots: true,
            infinite: true,
            prevArrow: specPrev,
            nextArrow: specNext,
            appendArrows: specPaging,
            adaptiveHeight: 0,
            accessibility: 0,
            rows: 0
          });
        });
    }

  /*
   * Quote Carousel.
   *
   * Bacon ipsum dolor amet tenderloin cow tongue,
   * filet mignon kielbasa brisket salami biltong.
   */
  if ($('.quote-carousel .carousel').length > 0) {

    $('.quote-carousel .carousel').each(function () {
      var specSlider = $(this),
        specPaging = specSlider.parent().find('.pager');
      var specPrev = specPaging.find('.prev'),
        specNext = specPaging.find('.next');
      specSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: true,
        prevArrow: specPrev,
        nextArrow: specNext,
        appendArrows: specPaging,
        adaptiveHeight: 0,
        accessibility: 0,
        rows: 0
      });
    });
  }
});

/***/ }),

/***/ "./assets/js/frontend/helpers/analytics.js":
/*!*************************************************!*\
  !*** ./assets/js/frontend/helpers/analytics.js ***!
  \*************************************************/
/***/ (() => {

/*
 * Google Tag Manager & Analytics Handling
 *
 * Bacon ipsum dolor amet tenderloin cow tongue,
 * filet mignon kielbasa brisket salami biltong.
 */
(function () {
  // Add click tracking
  var entityLinks = document.querySelectorAll('.entity-click');
  [].forEach.call(entityLinks, function (entityLink) {
    // Add click event listener
    entityLink.addEventListener('click', function () {
      var eventLabel = this.hasAttribute('data-gtag-label') ? this.getAttribute('data-gtag-label') : '';
      var eventAction = this.hasAttribute('data-gtag-action') ? this.getAttribute('data-gtag-action') : 'Click';
      gtag('event', eventAction, {
        'event_category': 'GHE',
        'event_label': eventLabel
      });
    });
  });
})();

/***/ }),

/***/ "./assets/js/frontend/helpers/polyfills.js":
/*!*************************************************!*\
  !*** ./assets/js/frontend/helpers/polyfills.js ***!
  \*************************************************/
/***/ (() => {

if (!Array.from) {
  Array.from = function () {
    var symbolIterator;
    try {
      symbolIterator = Symbol.iterator ? Symbol.iterator : 'Symbol(Symbol.iterator)';
    } catch (_unused) {
      symbolIterator = 'Symbol(Symbol.iterator)';
    }
    var toStr = Object.prototype.toString;
    var isCallable = function isCallable(fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function toInteger(value) {
      var number = Number(value);
      if (isNaN(number)) return 0;
      if (number === 0 || !isFinite(number)) return number;
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function toLength(value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    var setGetItemHandler = function setGetItemHandler(isIterator, items) {
      var iterator = isIterator && items[symbolIterator]();
      return function getItem(k) {
        return isIterator ? iterator.next() : items[k];
      };
    };
    var getArray = function getArray(T, A, len, getItem, isIterator, mapFn) {
      // 16. Let k be 0.
      var k = 0;

      // 17. Repeat, while k < len… or while iterator is done (also steps a - h)
      while (k < len || isIterator) {
        var item = getItem(k);
        var kValue = isIterator ? item.value : item;
        if (isIterator && item.done) {
          return A;
        } else {
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
        }
        k += 1;
      }
      if (isIterator) {
        throw new TypeError('Array.from: provided arrayLike or iterator has length more then 2 ** 52 - 1');
      } else {
        A.length = len;
      }
      return A;
    };

    // The length property of the from method is 1.
    return function from(arrayLikeOrIterator /*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLikeOrIterator).
      var items = Object(arrayLikeOrIterator);
      var isIterator = isCallable(items[symbolIterator]);

      // 3. ReturnIfAbrupt(items).
      if (arrayLikeOrIterator == null && !isIterator) {
        throw new TypeError('Array.from requires an array-like object or iterator - not null or undefined');
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);
      return getArray(T, A, len, setGetItemHandler(isIterator, items), isIterator, mapFn);
    };
  }();
}

/***/ }),

/***/ "./assets/js/frontend/helpers/validation.js":
/*!**************************************************!*\
  !*** ./assets/js/frontend/helpers/validation.js ***!
  \**************************************************/
/***/ (() => {

/*==================================================================================================

Application:   Utility Function
Author:        John Gardner

Version:       V1.0
Date:          18th November 2003
Description:   Used to check the validity of a UK postcode

Version:       V2.0
Date:          8th March 2005
Description:   BFPO postcodes implemented.
			   The rules concerning which alphabetic characters are allowed in which part of the 
			   postcode were more stringently implementd.
  
Version:       V3.0
Date:          8th August 2005
Description:   Support for Overseas Territories added                 
  
Version:       V3.1
Date:          23rd March 2008
Description:   Problem corrected whereby valid postcode not returned, and 'BD23 DX' was invalidly 
			   treated as 'BD2 3DX' (thanks Peter Graves)        
  
Version:       V4.0
Date:          7th October 2009
Description:   Character 3 extended to allow 'pmnrvxy' (thanks to Jaco de Groot)  

Version:       V4.1
			   8th September 2011
			   Support for Anguilla overseas territory added    
			   
Version:       V5.0
Date:          8th November 2012
			   Specific support added for new BFPO postcodes           
  
Parameters:    toCheck - postcodeto be checked. 

This function checks the value of the parameter for a valid postcode format. The space between the 
inward part and the outward part is optional, although is inserted if not there as it is part of the 
official postcode.

If the postcode is found to be in a valid format, the function returns the postcode properly 
formatted (in capitals with the outward code and the inward code separated by a space. If the 
postcode is deemed to be incorrect a value of false is returned.
  
Example call:
  
  if (checkPostCode (myPostCode)) {
	alert ("Postcode has a valid format")
  } 
  else {alert ("Postcode has invalid format")};
					
--------------------------------------------------------------------------------------------------*/

window.checkPostCode = function (toCheck) {
  // Permitted letters depend upon their position in the postcode.
  var alpha1 = "[abcdefghijklmnoprstuwyz]"; // Character 1
  var alpha2 = "[abcdefghklmnopqrstuvwxy]"; // Character 2
  var alpha3 = "[abcdefghjkpmnrstuvwxy]"; // Character 3
  var alpha4 = "[abehmnprvwxy]"; // Character 4
  var alpha5 = "[abdefghjlnpqrstuwxyz]"; // Character 5
  var BFPOa5 = "[abdefghjlnpqrst]"; // BFPO alpha5
  var BFPOa6 = "[abdefghjlnpqrstuwzyz]"; // BFPO alpha6

  // Array holds the regular expressions for the valid postcodes
  var pcexp = new Array();

  // BFPO postcodes
  pcexp.push(new RegExp("^(bf1)(\\s*)([0-6]{1}" + BFPOa5 + "{1}" + BFPOa6 + "{1})$", "i"));

  // Expression for postcodes: AN NAA, ANN NAA, AAN NAA, and AANN NAA
  pcexp.push(new RegExp("^(" + alpha1 + "{1}" + alpha2 + "?[0-9]{1,2})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"));

  // Expression for postcodes: ANA NAA
  pcexp.push(new RegExp("^(" + alpha1 + "{1}[0-9]{1}" + alpha3 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"));

  // Expression for postcodes: AANA  NAA
  pcexp.push(new RegExp("^(" + alpha1 + "{1}" + alpha2 + "{1}" + "?[0-9]{1}" + alpha4 + "{1})(\\s*)([0-9]{1}" + alpha5 + "{2})$", "i"));

  // Exception for the special postcode GIR 0AA
  pcexp.push(/^(GIR)(\s*)(0AA)$/i);

  // Standard BFPO numbers
  pcexp.push(/^(bfpo)(\s*)([0-9]{1,4})$/i);

  // c/o BFPO numbers
  pcexp.push(/^(bfpo)(\s*)(c\/o\s*[0-9]{1,3})$/i);

  // Overseas Territories
  pcexp.push(/^([A-Z]{4})(\s*)(1ZZ)$/i);

  // Anguilla
  pcexp.push(/^(ai-2640)$/i);

  // Load up the string to check
  var postCode = toCheck;

  // Assume we're not going to find a valid postcode
  var valid = false;

  // Check the string against the types of post codes
  for (var i = 0; i < pcexp.length; i++) {
    if (pcexp[i].test(postCode)) {
      // The post code is valid - split the post code into component parts
      pcexp[i].exec(postCode);

      // Copy it back into the original string, converting it to uppercase and inserting a space 
      // between the inward and outward codes
      postCode = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase();

      // If it is a BFPO c/o type postcode, tidy up the "c/o" part
      postCode = postCode.replace(/C\/O\s*/, "c/o ");

      // If it is the Anguilla overseas territory postcode, we need to treat it specially
      if (toCheck.toUpperCase() == 'AI-2640') {
        postCode = 'AI-2640';
      }
      ;

      // Load new postcode back into the form element
      valid = true;

      // Remember that we have found that the code is valid and break from loop
      break;
    }
  }

  // Return with either the reformatted valid postcode or the original invalid postcode
  if (valid) {
    return postCode;
  }
  return false;
};

// Validate the field
window.fieldHasError = function (field) {
  // Don't validate submits, buttons, file and reset inputs, and disabled fields
  if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

  // Get validity
  var validity = field.validity;
  var errorMessage = '';

  // If valid, return null
  if (validity.valid) return false;

  // If field is required and empty
  if (validity.valueMissing) errorMessage = 'Please fill out this field.';

  // If not the right type
  if (validity.typeMismatch) {
    // Email
    if (field.type === 'email') errorMessage = 'Please enter an email address.';

    // URL
    if (field.type === 'url') errorMessage = 'Please enter a URL.';
  }

  // If too short
  if (validity.tooShort) errorMessage = 'Please lengthen this text to ' + field.getAttribute('minLength') + ' characters or more. You are currently using ' + field.value.length + ' characters.';

  // If too long
  if (validity.tooLong) errorMessage = 'Please shorten this text to no more than ' + field.getAttribute('maxLength') + ' characters. You are currently using ' + field.value.length + ' characters.';

  // If number input isn't a number
  if (validity.badInput) errorMessage = 'Please enter a number.';

  // If a number value doesn't match the step interval
  if (validity.stepMismatch) errorMessage = 'Please select a valid value.';

  // If a number field is over the max
  if (validity.rangeOverflow) errorMessage = 'Please select a value that is no more than ' + field.getAttribute('max') + '.';

  // If a number field is below the min
  if (validity.rangeUnderflow) errorMessage = 'Please select a value that is no less than ' + field.getAttribute('min') + '.';

  // If pattern doesn't match
  if (validity.patternMismatch) {
    // If pattern info is included, return custom error
    if (field.hasAttribute('title')) errorMessage = field.getAttribute('title');

    // Otherwise, generic error
    errorMessage = 'Please match the requested format.';
  }

  // If all else fails, return a generic catchall error
  errorMessage = 'The value you entered for this field is invalid.';
  return true;
};

/***/ }),

/***/ "./assets/js/frontend/plugins/exists.js":
/*!**********************************************!*\
  !*** ./assets/js/frontend/plugins/exists.js ***!
  \**********************************************/
/***/ (() => {

;
(function ($, window) {
  var intervals = {};
  var removeListener = function removeListener(selector) {
    if (intervals[selector]) {
      window.clearInterval(intervals[selector]);
      intervals[selector] = null;
    }
  };
  var found = 'waitUntilExists.found';

  /**
   * @function
   * @property {object} jQuery plugin which runs handler function once specified
   *           element is inserted into the DOM
   * @param {function|string} handler 
   *            A function to execute at the time when the element is inserted or 
   *            string "remove" to remove the listener from the given selector
   * @param {bool} shouldRunHandlerOnce 
   *            Optional: if true, handler is unbound after its first invocation
   * @example jQuery(selector).waitUntilExists(function);
   */

  $.fn.waitUntilExists = function (handler, shouldRunHandlerOnce, isChild) {
    var selector = this.selector;
    var $this = $(selector);
    var $elements = $this.not(function () {
      return $(this).data(found);
    });
    if (handler === 'remove') {
      // Hijack and remove interval immediately if the code requests
      removeListener(selector);
    } else {
      // Run the handler on all found elements and mark as found
      $elements.each(handler).data(found, true);
      if (shouldRunHandlerOnce && $this.length) {
        // Element was found, implying the handler already ran for all 
        // matched elements
        removeListener(selector);
      } else if (!isChild) {
        // If this is a recurring search or if the target has not yet been 
        // found, create an interval to continue searching for the target
        intervals[selector] = window.setInterval(function () {
          $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
        }, 500);
      }
    }
    return $this;
  };
})(jQuery, window);

/***/ }),

/***/ "./assets/js/frontend/plugins/share-price.js":
/*!***************************************************!*\
  !*** ./assets/js/frontend/plugins/share-price.js ***!
  \***************************************************/
/***/ (function() {

/*
 * YourIR loader for Clinuvel Pharmaceuticals Limited Investor Relations
 * (c) 2017 Iguana2 Pty. Ltd.
 *
 * Strictly for the sole use of Clinuvel Pharmaceuticals Limited on its Investor Relations web pages only
 *
 * Last updated: 2017-12-26T23:12:20Z
 */
!function (e, a) {
  "use strict";

  var o = (e.document, e.location, e.yourirSetup),
    t = {
      version: "1.9.4",
      startup: {
        processLocationHash: !0,
        addLoadedCSS: !0,
        addStyleSheet: !1,
        removeLoadingCSS: !0
      },
      autoUpdate: {
        enable: !0,
        libVersion: "1.9.4",
        loaderChecksum: "3be5c47039fb60f827eede6cff399ef2"
      },
      preload: {
        enable: !0,
        symbolData: !0
      },
      theme: "default",
      contexts: {
        "default": {
          symbol: "cuv.asx",
          allowedSymbols: ["cuv.asx"],
          consolidate: !0,
          streamUpdates: !1
        }
      },
      components: {
        defaults: {
          liveness: "delayed"
        },
        announcements: {
          includeOtherIssuers: !1,
          liveness: "live"
        },
        priceComparisonChart: {
          comparisonSymbol1: "xjo.asx"
        }
      },
      resources: {
        check: !1
      }
    },
    s = [t];
  if (t.appID = /* this appID (Application Identifier) is strictly for the sole use of Clinuvel Pharmaceuticals Limited */"fee77b1d1a878633", e.yourirAutoUpdate && t.autoUpdate && t.autoUpdate.enable) return void e.yourirAutoUpdate(t.autoUpdate.loaderChecksum);
  o && s.push(o), e.yourirSetup = function (e) {
    e(s);
  }, e.yourirSetup.appID = t.appID;
}(this);
/*
 * yourir v1.9.4 loader
 * (c) 2016 Iguana2 Pty. Ltd. - https://yourir.info/
 * License: Creative Commons Attribution No Derivatives 3.0 License
 * (http://creativecommons.org/licenses/by-nd/3.0/legalcode)
 */
(function (root, undefined) {
  'use strict';

  var h = window.yourirLoader = {},
    k = document.head || document.getElementsByTagName("head")[0];
  k && l();
  var m,
    p = navigator.userAgent.match(/msie *([0-9]+)/i),
    q = (m = p ? p[1] : 0) && 10 > m;
  if (m && 9 > m) try {
    document.namespaces.add("yourir-vml", "urn:schemas-microsoft-com:vml", "#default#VML"), h.addVMLNameSpace = !1;
  } catch (r) {}
  var t = document.createElement("script");
  t.type = "text/javascript";
  t.src = "https://yourir.info/lib/1.9.4/yourir.js";
  t.async = !0;
  q || (t.crossOrigin = "anonymous", t.integrity = "sha256-E57zYHZtriZmRbK959wYagJ7B0thuCCmarH9pGIudg4= sha512-uY5WlUg98/r2beC3W9mIAfSaL4GbfzDRPRsn1nQOaet5e7EbozD/dsn0rT54Hr5EzhaW75TShRDOPX7M0ubI8Q==");
  var u = k && l();
  if (u) u.parentNode.insertBefore(t, u.nextSibling);else if (k) k.insertBefore(t, k.firstChild);else if (document.body) document.body.appendChild(t);else {
    var v = document.getElementsByTagName("script")[0];
    v && v.parentNode.insertBefore(t, v);
  }
  var w = "https://yourir.info/lib/1.9.4/yourir" + (q ? "-ie" : "") + ".css",
    x = !0;
  if (document.createStyleSheet) document.createStyleSheet(w, 0);else {
    var y = document.createElement("link");
    y.type = "text/css";
    y.rel = "stylesheet";
    y.href = w;
    y.async = !0;
    q || (y.crossOrigin = "anonymous", y.integrity = "sha256-aCoXKgi363Hf2OsU5CLlxD4P4F7leQ6migfhRmDDxL8= sha512-WiB7bucGO6jSC7H7ovy12vYwnBRshlPWHvQTM89kJ4JIcvMlWcuUSo2I7h7M4m5X61kmZLKFOx9ZeF6m55Ezww==");
    var z = k && k.getElementsByTagName("link")[0];
    z ? z.parentNode.insertBefore(y, z) : k ? k.insertBefore(y, k.firstChild) : x = !1;
  }
  x && (h.addStyleSheet = !1);
  function l() {
    for (var d = k.getElementsByTagName("script"), b = 0, e = d.length; b < e; b++) {
      var c = d[b].src;
      if (c && /yourir.info|yourir-loader[.]js/.test(c)) return d[b];
    }
    return null;
  }
  ;
  function B(d) {
    function b(a, c) {
      var b = d.match(new RegExp(a + "([.:/-]|$)", c ? "" : "i"));
      if (b && (b[b.length - 1] || "." !== b[b.length - 3] || !A.test(b[b.length - 2]))) return b;
    }
    function e(a) {
      var b;
      for (b = 1; b < a.length; b++) f && a[b] === f ? a[b] = "{code}" : g && a[b] === g ? a[b] = "{market}" : n && a[b] === n && (a[b] = "{symbol}");
      b = a.index;
      var c = b + a[0].length;
      d = (0 < b ? d.substr(0, b) : "") + a.slice(1).join("") + (c < d.length ? d.substr(c) : "");
    }
    function c(a) {
      f = f ? f.toLowerCase() : "";
      g = g ? g.toLowerCase() : "";
      n = n ? n.toLowerCase() : f && g ? f + "." + g : "";
      return {
        path: d,
        a: g,
        symbol: n,
        code: f,
        mark: a
      };
    }
    var a,
      f,
      g,
      n,
      A = /html?|php|asp/;
    return (a = b("([.:/-])(asx|nzx)([.:/-])([A-Z0-9]{3,6})")) ? (g = a[2], f = a[4], e(a), c(4)) : (a = b("([.:/-])([A-Z0-9]{3,6})([.:/-])(asx|nzx)")) ? (f = a[2], g = a[4], e(a), c(4)) : (a = b("([.:/-])([A-Z0-9]{3,6})", !0)) ? (f = a[2], e(a), c(3)) : (a = b("([.:/-])(asx|nzx)")) ? (g = a[2], e(a), c(2)) : (a = b("([.:/-])([a-z0-9]{3})")) ? (f = a[2], e(a), c(1)) : c(0);
  }
  function C(d, b, e) {
    var c, a;
    e && e.mark > b.mark ? (c = e.symbol, a = e.code, b = e.a) : (c = b.symbol, a = b.code, b = b.a);
    return c ? d.replace(/(symbols\/)[^\/]+/, "$1" + c) : a ? d.replace(/(symbols\/)[^.]+/, "$1" + a) : b ? d.replace(/(markets\/)[^\/]+/, "$1" + b) : d;
  }
  ;
  function D(d, b) {
    var e = 0 > d.indexOf("?") ? "?" : "&",
      c,
      a,
      f = [];
    for (c in b) b.hasOwnProperty(c) && (a = b[c], void 0 !== a && null !== a && (a = !0 === a ? "1" : !1 === a ? "0" : encodeURIComponent(a), f.push(encodeURIComponent(c) + "=" + a)));
    f.sort();
    (c = f.length ? f.join("&") : "") && (c = (void 0 === e ? "?" : e) + c);
    return d + c;
  }
  ;
  h = window.yourirPreload = {
    loading: !1,
    requests: []
  };
  try {
    "undefined" !== typeof JSON && "undefined" !== typeof localStorage && "undefined" !== typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest() && (h.requests = E(), h.loading = !0);
  } catch (F) {}
  function E() {
    var d, b, e, c, a, f;
    a = B(location.pathname);
    try {
      window !== window.top && (f = B(window.top.location.pathname));
    } catch (g) {}
    h.path = a.path;
    e = (e = window.yourirSetup) && e.appID ? e.appID : localStorage.getItem("yourir-app-id");
    if (!e) return [];
    d = localStorage.getItem("yourir-" + (e + "-preload-requests-" + a.path));
    if (!d) return [];
    c = JSON.parse(d).requests;
    if (!c || !c.length) return [];
    d = 0;
    for (b = c.length; d < b; d++) G(c[d], e, a, f || {});
    return c;
  }
  function G(d, b, e, c) {
    var a;
    !1 !== d.modify ? (e = C(d.uri, e, c), d.uri = e) : e = d.uri;
    b = D("https://yourir.info/api/v4" + e + "?appID=" + b, d.params);
    a = new XMLHttpRequest();
    a.open("GET", b, !0);
    a.async = !0;
    a.onreadystatechange = function () {
      if (4 === a.readyState) {
        var b = d.hook;
        b ? b(d, a) : d.xhr = a;
      }
    };
    a.send();
  }
  ;
})(this);

/***/ }),

/***/ "./assets/scss/frontend/app.scss":
/*!***************************************!*\
  !*** ./assets/scss/frontend/app.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = jQuery;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["css/frontend","/js/vendor"], () => (__webpack_exec__("./assets/js/frontend/before.js"), __webpack_exec__("./assets/js/frontend/app.js"), __webpack_exec__("./assets/js/frontend/after.js"), __webpack_exec__("./assets/scss/frontend/app.scss")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RztJQUFDN0IsQ0FBQyxHQUFDYSxDQUFDLENBQUMsNEJBQTRCLEdBQUNyVixDQUFDLEdBQUMsU0FBUyxHQUFDd1UsQ0FBQyxFQUFDRCxDQUFDLENBQUMrQixNQUFNLENBQUM7SUFBQ25HLENBQUMsR0FBQyxJQUFJNEYsY0FBYyxDQUFELENBQUM7SUFBQzVGLENBQUMsQ0FBQ29HLElBQUksQ0FBQyxLQUFLLEVBQUMvQixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFBQ3JFLENBQUMsQ0FBQ21ELEtBQUssR0FBQyxDQUFDLENBQUM7SUFBQ25ELENBQUMsQ0FBQ3FHLGtCQUFrQixHQUFDLFlBQVU7TUFBQyxJQUFHLENBQUMsS0FBR3JHLENBQUMsQ0FBQ3NHLFVBQVUsRUFBQztRQUFDLElBQUlqQyxDQUFDLEdBQUNELENBQUMsQ0FBQ21DLElBQUk7UUFBQ2xDLENBQUMsR0FBQ0EsQ0FBQyxDQUFDRCxDQUFDLEVBQUNwRSxDQUFDLENBQUMsR0FBQ29FLENBQUMsQ0FBQ29DLEdBQUcsR0FBQ3hHLENBQUM7TUFBQTtJQUFDLENBQUM7SUFBQ0EsQ0FBQyxDQUFDeUcsSUFBSSxDQUFDLENBQUM7RUFBQTtFQUFDO0FBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0FDdEIzUjs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvY3JlYXRlUG9wcGVyLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvY29udGFpbnMuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDbGlwcGluZ1JlY3QuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRDb21wb3NpdGVSZWN0LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldERvY3VtZW50UmVjdC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE5vZGVOYW1lLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvZ2V0Tm9kZVNjcm9sbC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldE9mZnNldFBhcmVudC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2dldFBhcmVudE5vZGUuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRTY3JvbGxQYXJlbnQuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRWaWV3cG9ydFJlY3QuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3cuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGwuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvaW5zdGFuY2VPZi5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzTGF5b3V0Vmlld3BvcnQuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2RvbS11dGlscy9pc1Njcm9sbFBhcmVudC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvZG9tLXV0aWxzL2lzVGFibGVFbGVtZW50LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9kb20tdXRpbHMvbGlzdFNjcm9sbFBhcmVudHMuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL2VudW1zLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvYXJyb3cuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL21vZGlmaWVycy9mbGlwLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvaGlkZS5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL2luZGV4LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvb2Zmc2V0LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi9tb2RpZmllcnMvcG9wcGVyT2Zmc2V0cy5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdy5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvcG9wcGVyLWxpdGUuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3BvcHBlci5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2NvbXB1dGVPZmZzZXRzLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9kZWJvdW5jZS5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2V4cGFuZFRvSGFzaE1hcC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QWx0QXhpcy5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0QmFzZVBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvbGliL3V0aWxzL2dldE9wcG9zaXRlUGxhY2VtZW50LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9nZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvZ2V0VmFyaWF0aW9uLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tYXRoLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9tZXJnZUJ5TmFtZS5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvbWVyZ2VQYWRkaW5nT2JqZWN0LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy9vcmRlck1vZGlmaWVycy5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvcmVjdFRvQ2xpZW50UmVjdC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL25vZGVfbW9kdWxlcy9AcG9wcGVyanMvY29yZS9saWIvdXRpbHMvdXNlckFnZW50LmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2xpYi91dGlscy93aXRoaW4uanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvYWZ0ZXIuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvYXBwLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vYXNzZXRzL2pzL2Zyb250ZW5kL2JlZm9yZS5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL2Fzc2V0cy9qcy9mcm9udGVuZC9jdXN0b20uanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvY3VzdG9tL2Jvb3RzdHJhcC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL2Fzc2V0cy9qcy9mcm9udGVuZC9jdXN0b20vY29va2llcy5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL2Fzc2V0cy9qcy9mcm9udGVuZC9jdXN0b20vZW1iZWQuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvY3VzdG9tL2Zvcm1zLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vYXNzZXRzL2pzL2Zyb250ZW5kL2N1c3RvbS9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvY3VzdG9tL21lbnUuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvY3VzdG9tL3Njcm9sbC5qcyIsIndlYnBhY2s6Ly9jdXYtMjAyMy8uL2Fzc2V0cy9qcy9mcm9udGVuZC9jdXN0b20vc2xpY2suanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvaGVscGVycy9hbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvaGVscGVycy9wb2x5ZmlsbHMuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvanMvZnJvbnRlbmQvaGVscGVycy92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vYXNzZXRzL2pzL2Zyb250ZW5kL3BsdWdpbnMvZXhpc3RzLmpzIiwid2VicGFjazovL2N1di0yMDIzLy4vYXNzZXRzL2pzL2Zyb250ZW5kL3BsdWdpbnMvc2hhcmUtcHJpY2UuanMiLCJ3ZWJwYWNrOi8vY3V2LTIwMjMvLi9hc3NldHMvc2Nzcy9mcm9udGVuZC9hcHAuc2Nzcz9iOTVhIiwid2VicGFjazovL2N1di0yMDIzL2V4dGVybmFsIHZhciBcImpRdWVyeVwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBnZXRDb21wb3NpdGVSZWN0IGZyb20gXCIuL2RvbS11dGlscy9nZXRDb21wb3NpdGVSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0TGF5b3V0UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2RvbS11dGlscy9saXN0U2Nyb2xsUGFyZW50cy5qc1wiO1xuaW1wb3J0IGdldE9mZnNldFBhcmVudCBmcm9tIFwiLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgb3JkZXJNb2RpZmllcnMgZnJvbSBcIi4vdXRpbHMvb3JkZXJNb2RpZmllcnMuanNcIjtcbmltcG9ydCBkZWJvdW5jZSBmcm9tIFwiLi91dGlscy9kZWJvdW5jZS5qc1wiO1xuaW1wb3J0IG1lcmdlQnlOYW1lIGZyb20gXCIuL3V0aWxzL21lcmdlQnlOYW1lLmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBwbGFjZW1lbnQ6ICdib3R0b20nLFxuICBtb2RpZmllcnM6IFtdLFxuICBzdHJhdGVneTogJ2Fic29sdXRlJ1xufTtcblxuZnVuY3Rpb24gYXJlVmFsaWRFbGVtZW50cygpIHtcbiAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiAhYXJncy5zb21lKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgcmV0dXJuICEoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgPT09ICdmdW5jdGlvbicpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvcHBlckdlbmVyYXRvcihnZW5lcmF0b3JPcHRpb25zKSB7XG4gIGlmIChnZW5lcmF0b3JPcHRpb25zID09PSB2b2lkIDApIHtcbiAgICBnZW5lcmF0b3JPcHRpb25zID0ge307XG4gIH1cblxuICB2YXIgX2dlbmVyYXRvck9wdGlvbnMgPSBnZW5lcmF0b3JPcHRpb25zLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmID0gX2dlbmVyYXRvck9wdGlvbnMuZGVmYXVsdE1vZGlmaWVycyxcbiAgICAgIGRlZmF1bHRNb2RpZmllcnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYgPT09IHZvaWQgMCA/IFtdIDogX2dlbmVyYXRvck9wdGlvbnMkZGVmLFxuICAgICAgX2dlbmVyYXRvck9wdGlvbnMkZGVmMiA9IF9nZW5lcmF0b3JPcHRpb25zLmRlZmF1bHRPcHRpb25zLFxuICAgICAgZGVmYXVsdE9wdGlvbnMgPSBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyID09PSB2b2lkIDAgPyBERUZBVUxUX09QVElPTlMgOiBfZ2VuZXJhdG9yT3B0aW9ucyRkZWYyO1xuICByZXR1cm4gZnVuY3Rpb24gY3JlYXRlUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIH1cblxuICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgIHBsYWNlbWVudDogJ2JvdHRvbScsXG4gICAgICBvcmRlcmVkTW9kaWZpZXJzOiBbXSxcbiAgICAgIG9wdGlvbnM6IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgZGVmYXVsdE9wdGlvbnMpLFxuICAgICAgbW9kaWZpZXJzRGF0YToge30sXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICByZWZlcmVuY2U6IHJlZmVyZW5jZSxcbiAgICAgICAgcG9wcGVyOiBwb3BwZXJcbiAgICAgIH0sXG4gICAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICAgIHN0eWxlczoge31cbiAgICB9O1xuICAgIHZhciBlZmZlY3RDbGVhbnVwRm5zID0gW107XG4gICAgdmFyIGlzRGVzdHJveWVkID0gZmFsc2U7XG4gICAgdmFyIGluc3RhbmNlID0ge1xuICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgc2V0T3B0aW9uczogZnVuY3Rpb24gc2V0T3B0aW9ucyhzZXRPcHRpb25zQWN0aW9uKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIHNldE9wdGlvbnNBY3Rpb24gPT09ICdmdW5jdGlvbicgPyBzZXRPcHRpb25zQWN0aW9uKHN0YXRlLm9wdGlvbnMpIDogc2V0T3B0aW9uc0FjdGlvbjtcbiAgICAgICAgY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICBzdGF0ZS5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdE9wdGlvbnMsIHN0YXRlLm9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0ge1xuICAgICAgICAgIHJlZmVyZW5jZTogaXNFbGVtZW50KHJlZmVyZW5jZSkgPyBsaXN0U2Nyb2xsUGFyZW50cyhyZWZlcmVuY2UpIDogcmVmZXJlbmNlLmNvbnRleHRFbGVtZW50ID8gbGlzdFNjcm9sbFBhcmVudHMocmVmZXJlbmNlLmNvbnRleHRFbGVtZW50KSA6IFtdLFxuICAgICAgICAgIHBvcHBlcjogbGlzdFNjcm9sbFBhcmVudHMocG9wcGVyKVxuICAgICAgICB9OyAvLyBPcmRlcnMgdGhlIG1vZGlmaWVycyBiYXNlZCBvbiB0aGVpciBkZXBlbmRlbmNpZXMgYW5kIGBwaGFzZWBcbiAgICAgICAgLy8gcHJvcGVydGllc1xuXG4gICAgICAgIHZhciBvcmRlcmVkTW9kaWZpZXJzID0gb3JkZXJNb2RpZmllcnMobWVyZ2VCeU5hbWUoW10uY29uY2F0KGRlZmF1bHRNb2RpZmllcnMsIHN0YXRlLm9wdGlvbnMubW9kaWZpZXJzKSkpOyAvLyBTdHJpcCBvdXQgZGlzYWJsZWQgbW9kaWZpZXJzXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycyA9IG9yZGVyZWRNb2RpZmllcnMuZmlsdGVyKGZ1bmN0aW9uIChtKSB7XG4gICAgICAgICAgcmV0dXJuIG0uZW5hYmxlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJ1bk1vZGlmaWVyRWZmZWN0cygpO1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UudXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgLy8gU3luYyB1cGRhdGUg4oCTIGl0IHdpbGwgYWx3YXlzIGJlIGV4ZWN1dGVkLCBldmVuIGlmIG5vdCBuZWNlc3NhcnkuIFRoaXNcbiAgICAgIC8vIGlzIHVzZWZ1bCBmb3IgbG93IGZyZXF1ZW5jeSB1cGRhdGVzIHdoZXJlIHN5bmMgYmVoYXZpb3Igc2ltcGxpZmllcyB0aGVcbiAgICAgIC8vIGxvZ2ljLlxuICAgICAgLy8gRm9yIGhpZ2ggZnJlcXVlbmN5IHVwZGF0ZXMgKGUuZy4gYHJlc2l6ZWAgYW5kIGBzY3JvbGxgIGV2ZW50cyksIGFsd2F5c1xuICAgICAgLy8gcHJlZmVyIHRoZSBhc3luYyBQb3BwZXIjdXBkYXRlIG1ldGhvZFxuICAgICAgZm9yY2VVcGRhdGU6IGZ1bmN0aW9uIGZvcmNlVXBkYXRlKCkge1xuICAgICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX3N0YXRlJGVsZW1lbnRzID0gc3RhdGUuZWxlbWVudHMsXG4gICAgICAgICAgICByZWZlcmVuY2UgPSBfc3RhdGUkZWxlbWVudHMucmVmZXJlbmNlLFxuICAgICAgICAgICAgcG9wcGVyID0gX3N0YXRlJGVsZW1lbnRzLnBvcHBlcjsgLy8gRG9uJ3QgcHJvY2VlZCBpZiBgcmVmZXJlbmNlYCBvciBgcG9wcGVyYCBhcmUgbm90IHZhbGlkIGVsZW1lbnRzXG4gICAgICAgIC8vIGFueW1vcmVcblxuICAgICAgICBpZiAoIWFyZVZhbGlkRWxlbWVudHMocmVmZXJlbmNlLCBwb3BwZXIpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IC8vIFN0b3JlIHRoZSByZWZlcmVuY2UgYW5kIHBvcHBlciByZWN0cyB0byBiZSByZWFkIGJ5IG1vZGlmaWVyc1xuXG5cbiAgICAgICAgc3RhdGUucmVjdHMgPSB7XG4gICAgICAgICAgcmVmZXJlbmNlOiBnZXRDb21wb3NpdGVSZWN0KHJlZmVyZW5jZSwgZ2V0T2Zmc2V0UGFyZW50KHBvcHBlciksIHN0YXRlLm9wdGlvbnMuc3RyYXRlZ3kgPT09ICdmaXhlZCcpLFxuICAgICAgICAgIHBvcHBlcjogZ2V0TGF5b3V0UmVjdChwb3BwZXIpXG4gICAgICAgIH07IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZS4gVGhlXG4gICAgICAgIC8vIG1vc3QgY29tbW9uIHVzZSBjYXNlIGZvciB0aGlzIGlzIHRoZSBgZmxpcGAgbW9kaWZpZXIgY2hhbmdpbmcgdGhlXG4gICAgICAgIC8vIHBsYWNlbWVudCwgd2hpY2ggdGhlbiBuZWVkcyB0byByZS1ydW4gYWxsIHRoZSBtb2RpZmllcnMsIGJlY2F1c2UgdGhlXG4gICAgICAgIC8vIGxvZ2ljIHdhcyBwcmV2aW91c2x5IHJhbiBmb3IgdGhlIHByZXZpb3VzIHBsYWNlbWVudCBhbmQgaXMgdGhlcmVmb3JlXG4gICAgICAgIC8vIHN0YWxlL2luY29ycmVjdFxuXG4gICAgICAgIHN0YXRlLnJlc2V0ID0gZmFsc2U7XG4gICAgICAgIHN0YXRlLnBsYWNlbWVudCA9IHN0YXRlLm9wdGlvbnMucGxhY2VtZW50OyAvLyBPbiBlYWNoIHVwZGF0ZSBjeWNsZSwgdGhlIGBtb2RpZmllcnNEYXRhYCBwcm9wZXJ0eSBmb3IgZWFjaCBtb2RpZmllclxuICAgICAgICAvLyBpcyBmaWxsZWQgd2l0aCB0aGUgaW5pdGlhbCBkYXRhIHNwZWNpZmllZCBieSB0aGUgbW9kaWZpZXIuIFRoaXMgbWVhbnNcbiAgICAgICAgLy8gaXQgZG9lc24ndCBwZXJzaXN0IGFuZCBpcyBmcmVzaCBvbiBlYWNoIHVwZGF0ZS5cbiAgICAgICAgLy8gVG8gZW5zdXJlIHBlcnNpc3RlbnQgZGF0YSwgdXNlIGAke25hbWV9I3BlcnNpc3RlbnRgXG5cbiAgICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5tb2RpZmllcnNEYXRhW21vZGlmaWVyLm5hbWVdID0gT2JqZWN0LmFzc2lnbih7fSwgbW9kaWZpZXIuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBzdGF0ZS5vcmRlcmVkTW9kaWZpZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIGlmIChzdGF0ZS5yZXNldCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgc3RhdGUucmVzZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIGluZGV4ID0gLTE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgX3N0YXRlJG9yZGVyZWRNb2RpZmllID0gc3RhdGUub3JkZXJlZE1vZGlmaWVyc1tpbmRleF0sXG4gICAgICAgICAgICAgIGZuID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLmZuLFxuICAgICAgICAgICAgICBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm9wdGlvbnMsXG4gICAgICAgICAgICAgIF9vcHRpb25zID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllMiA9PT0gdm9pZCAwID8ge30gOiBfc3RhdGUkb3JkZXJlZE1vZGlmaWUyLFxuICAgICAgICAgICAgICBuYW1lID0gX3N0YXRlJG9yZGVyZWRNb2RpZmllLm5hbWU7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IGZuKHtcbiAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgICBvcHRpb25zOiBfb3B0aW9ucyxcbiAgICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgICAgaW5zdGFuY2U6IGluc3RhbmNlXG4gICAgICAgICAgICB9KSB8fCBzdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBBc3luYyBhbmQgb3B0aW1pc3RpY2FsbHkgb3B0aW1pemVkIHVwZGF0ZSDigJMgaXQgd2lsbCBub3QgYmUgZXhlY3V0ZWQgaWZcbiAgICAgIC8vIG5vdCBuZWNlc3NhcnkgKGRlYm91bmNlZCB0byBydW4gYXQgbW9zdCBvbmNlLXBlci10aWNrKVxuICAgICAgdXBkYXRlOiBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgIGluc3RhbmNlLmZvcmNlVXBkYXRlKCk7XG4gICAgICAgICAgcmVzb2x2ZShzdGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICBjbGVhbnVwTW9kaWZpZXJFZmZlY3RzKCk7XG4gICAgICAgIGlzRGVzdHJveWVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFhcmVWYWxpZEVsZW1lbnRzKHJlZmVyZW5jZSwgcG9wcGVyKSkge1xuICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cblxuICAgIGluc3RhbmNlLnNldE9wdGlvbnMob3B0aW9ucykudGhlbihmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgIGlmICghaXNEZXN0cm95ZWQgJiYgb3B0aW9ucy5vbkZpcnN0VXBkYXRlKSB7XG4gICAgICAgIG9wdGlvbnMub25GaXJzdFVwZGF0ZShzdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7IC8vIE1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgYmVmb3JlIHRoZSBmaXJzdFxuICAgIC8vIHVwZGF0ZSBjeWNsZSBydW5zLiBUaGV5IHdpbGwgYmUgZXhlY3V0ZWQgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlIHVwZGF0ZVxuICAgIC8vIGN5Y2xlLiBUaGlzIGlzIHVzZWZ1bCB3aGVuIGEgbW9kaWZpZXIgYWRkcyBzb21lIHBlcnNpc3RlbnQgZGF0YSB0aGF0XG4gICAgLy8gb3RoZXIgbW9kaWZpZXJzIG5lZWQgdG8gdXNlLCBidXQgdGhlIG1vZGlmaWVyIGlzIHJ1biBhZnRlciB0aGUgZGVwZW5kZW50XG4gICAgLy8gb25lLlxuXG4gICAgZnVuY3Rpb24gcnVuTW9kaWZpZXJFZmZlY3RzKCkge1xuICAgICAgc3RhdGUub3JkZXJlZE1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICAgICAgX3JlZiRvcHRpb25zID0gX3JlZi5vcHRpb25zLFxuICAgICAgICAgICAgb3B0aW9ucyA9IF9yZWYkb3B0aW9ucyA9PT0gdm9pZCAwID8ge30gOiBfcmVmJG9wdGlvbnMsXG4gICAgICAgICAgICBlZmZlY3QgPSBfcmVmLmVmZmVjdDtcblxuICAgICAgICBpZiAodHlwZW9mIGVmZmVjdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciBjbGVhbnVwRm4gPSBlZmZlY3Qoe1xuICAgICAgICAgICAgc3RhdGU6IHN0YXRlLFxuICAgICAgICAgICAgbmFtZTogbmFtZSxcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHZhciBub29wRm4gPSBmdW5jdGlvbiBub29wRm4oKSB7fTtcblxuICAgICAgICAgIGVmZmVjdENsZWFudXBGbnMucHVzaChjbGVhbnVwRm4gfHwgbm9vcEZuKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cE1vZGlmaWVyRWZmZWN0cygpIHtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuKCk7XG4gICAgICB9KTtcbiAgICAgIGVmZmVjdENsZWFudXBGbnMgPSBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59XG5leHBvcnQgdmFyIGNyZWF0ZVBvcHBlciA9IC8qI19fUFVSRV9fKi9wb3BwZXJHZW5lcmF0b3IoKTsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBkZXRlY3RPdmVyZmxvdyB9OyIsImltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRhaW5zKHBhcmVudCwgY2hpbGQpIHtcbiAgdmFyIHJvb3ROb2RlID0gY2hpbGQuZ2V0Um9vdE5vZGUgJiYgY2hpbGQuZ2V0Um9vdE5vZGUoKTsgLy8gRmlyc3QsIGF0dGVtcHQgd2l0aCBmYXN0ZXIgbmF0aXZlIG1ldGhvZFxuXG4gIGlmIChwYXJlbnQuY29udGFpbnMoY2hpbGQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gdGhlbiBmYWxsYmFjayB0byBjdXN0b20gaW1wbGVtZW50YXRpb24gd2l0aCBTaGFkb3cgRE9NIHN1cHBvcnRcbiAgZWxzZSBpZiAocm9vdE5vZGUgJiYgaXNTaGFkb3dSb290KHJvb3ROb2RlKSkge1xuICAgICAgdmFyIG5leHQgPSBjaGlsZDtcblxuICAgICAgZG8ge1xuICAgICAgICBpZiAobmV4dCAmJiBwYXJlbnQuaXNTYW1lTm9kZShuZXh0KSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXTogbmVlZCBhIGJldHRlciB3YXkgdG8gaGFuZGxlIHRoaXMuLi5cblxuXG4gICAgICAgIG5leHQgPSBuZXh0LnBhcmVudE5vZGUgfHwgbmV4dC5ob3N0O1xuICAgICAgfSB3aGlsZSAobmV4dCk7XG4gICAgfSAvLyBHaXZlIHVwLCB0aGUgcmVzdWx0IGlzIGZhbHNlXG5cblxuICByZXR1cm4gZmFsc2U7XG59IiwiaW1wb3J0IHsgaXNFbGVtZW50LCBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc0xheW91dFZpZXdwb3J0IGZyb20gXCIuL2lzTGF5b3V0Vmlld3BvcnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50LCBpbmNsdWRlU2NhbGUsIGlzRml4ZWRTdHJhdGVneSkge1xuICBpZiAoaW5jbHVkZVNjYWxlID09PSB2b2lkIDApIHtcbiAgICBpbmNsdWRlU2NhbGUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc0ZpeGVkU3RyYXRlZ3kgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWRTdHJhdGVneSA9IGZhbHNlO1xuICB9XG5cbiAgdmFyIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2NhbGVYID0gMTtcbiAgdmFyIHNjYWxlWSA9IDE7XG5cbiAgaWYgKGluY2x1ZGVTY2FsZSAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpKSB7XG4gICAgc2NhbGVYID0gZWxlbWVudC5vZmZzZXRXaWR0aCA+IDAgPyByb3VuZChjbGllbnRSZWN0LndpZHRoKSAvIGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgMSA6IDE7XG4gICAgc2NhbGVZID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgPiAwID8gcm91bmQoY2xpZW50UmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMSA6IDE7XG4gIH1cblxuICB2YXIgX3JlZiA9IGlzRWxlbWVudChlbGVtZW50KSA/IGdldFdpbmRvdyhlbGVtZW50KSA6IHdpbmRvdyxcbiAgICAgIHZpc3VhbFZpZXdwb3J0ID0gX3JlZi52aXN1YWxWaWV3cG9ydDtcblxuICB2YXIgYWRkVmlzdWFsT2Zmc2V0cyA9ICFpc0xheW91dFZpZXdwb3J0KCkgJiYgaXNGaXhlZFN0cmF0ZWd5O1xuICB2YXIgeCA9IChjbGllbnRSZWN0LmxlZnQgKyAoYWRkVmlzdWFsT2Zmc2V0cyAmJiB2aXN1YWxWaWV3cG9ydCA/IHZpc3VhbFZpZXdwb3J0Lm9mZnNldExlZnQgOiAwKSkgLyBzY2FsZVg7XG4gIHZhciB5ID0gKGNsaWVudFJlY3QudG9wICsgKGFkZFZpc3VhbE9mZnNldHMgJiYgdmlzdWFsVmlld3BvcnQgPyB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3AgOiAwKSkgLyBzY2FsZVk7XG4gIHZhciB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGggLyBzY2FsZVg7XG4gIHZhciBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodCAvIHNjYWxlWTtcbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgdG9wOiB5LFxuICAgIHJpZ2h0OiB4ICsgd2lkdGgsXG4gICAgYm90dG9tOiB5ICsgaGVpZ2h0LFxuICAgIGxlZnQ6IHgsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiaW1wb3J0IHsgdmlld3BvcnQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRWaWV3cG9ydFJlY3QgZnJvbSBcIi4vZ2V0Vmlld3BvcnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRSZWN0IGZyb20gXCIuL2dldERvY3VtZW50UmVjdC5qc1wiO1xuaW1wb3J0IGxpc3RTY3JvbGxQYXJlbnRzIGZyb20gXCIuL2xpc3RTY3JvbGxQYXJlbnRzLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuL2dldE9mZnNldFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuL2dldENvbXB1dGVkU3R5bGUuanNcIjtcbmltcG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgY29udGFpbnMgZnJvbSBcIi4vY29udGFpbnMuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IHJlY3RUb0NsaWVudFJlY3QgZnJvbSBcIi4uL3V0aWxzL3JlY3RUb0NsaWVudFJlY3QuanNcIjtcbmltcG9ydCB7IG1heCwgbWluIH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjtcblxuZnVuY3Rpb24gZ2V0SW5uZXJCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCwgZmFsc2UsIHN0cmF0ZWd5ID09PSAnZml4ZWQnKTtcbiAgcmVjdC50b3AgPSByZWN0LnRvcCArIGVsZW1lbnQuY2xpZW50VG9wO1xuICByZWN0LmxlZnQgPSByZWN0LmxlZnQgKyBlbGVtZW50LmNsaWVudExlZnQ7XG4gIHJlY3QuYm90dG9tID0gcmVjdC50b3AgKyBlbGVtZW50LmNsaWVudEhlaWdodDtcbiAgcmVjdC5yaWdodCA9IHJlY3QubGVmdCArIGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIHJlY3Qud2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICByZWN0LmhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICByZWN0LnggPSByZWN0LmxlZnQ7XG4gIHJlY3QueSA9IHJlY3QudG9wO1xuICByZXR1cm4gcmVjdDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgY2xpcHBpbmdQYXJlbnQsIHN0cmF0ZWd5KSB7XG4gIHJldHVybiBjbGlwcGluZ1BhcmVudCA9PT0gdmlld3BvcnQgPyByZWN0VG9DbGllbnRSZWN0KGdldFZpZXdwb3J0UmVjdChlbGVtZW50LCBzdHJhdGVneSkpIDogaXNFbGVtZW50KGNsaXBwaW5nUGFyZW50KSA/IGdldElubmVyQm91bmRpbmdDbGllbnRSZWN0KGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSkgOiByZWN0VG9DbGllbnRSZWN0KGdldERvY3VtZW50UmVjdChnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkpKTtcbn0gLy8gQSBcImNsaXBwaW5nIHBhcmVudFwiIGlzIGFuIG92ZXJmbG93YWJsZSBjb250YWluZXIgd2l0aCB0aGUgY2hhcmFjdGVyaXN0aWMgb2Zcbi8vIGNsaXBwaW5nIChvciBoaWRpbmcpIG92ZXJmbG93aW5nIGVsZW1lbnRzIHdpdGggYSBwb3NpdGlvbiBkaWZmZXJlbnQgZnJvbVxuLy8gYGluaXRpYWxgXG5cblxuZnVuY3Rpb24gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIHtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IGxpc3RTY3JvbGxQYXJlbnRzKGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xuICB2YXIgY2FuRXNjYXBlQ2xpcHBpbmcgPSBbJ2Fic29sdXRlJywgJ2ZpeGVkJ10uaW5kZXhPZihnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLnBvc2l0aW9uKSA+PSAwO1xuICB2YXIgY2xpcHBlckVsZW1lbnQgPSBjYW5Fc2NhcGVDbGlwcGluZyAmJiBpc0hUTUxFbGVtZW50KGVsZW1lbnQpID8gZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQpIDogZWxlbWVudDtcblxuICBpZiAoIWlzRWxlbWVudChjbGlwcGVyRWxlbWVudCkpIHtcbiAgICByZXR1cm4gW107XG4gIH0gLy8gJEZsb3dGaXhNZVtpbmNvbXBhdGlibGUtcmV0dXJuXTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzE0MTRcblxuXG4gIHJldHVybiBjbGlwcGluZ1BhcmVudHMuZmlsdGVyKGZ1bmN0aW9uIChjbGlwcGluZ1BhcmVudCkge1xuICAgIHJldHVybiBpc0VsZW1lbnQoY2xpcHBpbmdQYXJlbnQpICYmIGNvbnRhaW5zKGNsaXBwaW5nUGFyZW50LCBjbGlwcGVyRWxlbWVudCkgJiYgZ2V0Tm9kZU5hbWUoY2xpcHBpbmdQYXJlbnQpICE9PSAnYm9keSc7XG4gIH0pO1xufSAvLyBHZXRzIHRoZSBtYXhpbXVtIGFyZWEgdGhhdCB0aGUgZWxlbWVudCBpcyB2aXNpYmxlIGluIGR1ZSB0byBhbnkgbnVtYmVyIG9mXG4vLyBjbGlwcGluZyBwYXJlbnRzXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0Q2xpcHBpbmdSZWN0KGVsZW1lbnQsIGJvdW5kYXJ5LCByb290Qm91bmRhcnksIHN0cmF0ZWd5KSB7XG4gIHZhciBtYWluQ2xpcHBpbmdQYXJlbnRzID0gYm91bmRhcnkgPT09ICdjbGlwcGluZ1BhcmVudHMnID8gZ2V0Q2xpcHBpbmdQYXJlbnRzKGVsZW1lbnQpIDogW10uY29uY2F0KGJvdW5kYXJ5KTtcbiAgdmFyIGNsaXBwaW5nUGFyZW50cyA9IFtdLmNvbmNhdChtYWluQ2xpcHBpbmdQYXJlbnRzLCBbcm9vdEJvdW5kYXJ5XSk7XG4gIHZhciBmaXJzdENsaXBwaW5nUGFyZW50ID0gY2xpcHBpbmdQYXJlbnRzWzBdO1xuICB2YXIgY2xpcHBpbmdSZWN0ID0gY2xpcHBpbmdQYXJlbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjUmVjdCwgY2xpcHBpbmdQYXJlbnQpIHtcbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3RGcm9tTWl4ZWRUeXBlKGVsZW1lbnQsIGNsaXBwaW5nUGFyZW50LCBzdHJhdGVneSk7XG4gICAgYWNjUmVjdC50b3AgPSBtYXgocmVjdC50b3AsIGFjY1JlY3QudG9wKTtcbiAgICBhY2NSZWN0LnJpZ2h0ID0gbWluKHJlY3QucmlnaHQsIGFjY1JlY3QucmlnaHQpO1xuICAgIGFjY1JlY3QuYm90dG9tID0gbWluKHJlY3QuYm90dG9tLCBhY2NSZWN0LmJvdHRvbSk7XG4gICAgYWNjUmVjdC5sZWZ0ID0gbWF4KHJlY3QubGVmdCwgYWNjUmVjdC5sZWZ0KTtcbiAgICByZXR1cm4gYWNjUmVjdDtcbiAgfSwgZ2V0Q2xpZW50UmVjdEZyb21NaXhlZFR5cGUoZWxlbWVudCwgZmlyc3RDbGlwcGluZ1BhcmVudCwgc3RyYXRlZ3kpKTtcbiAgY2xpcHBpbmdSZWN0LndpZHRoID0gY2xpcHBpbmdSZWN0LnJpZ2h0IC0gY2xpcHBpbmdSZWN0LmxlZnQ7XG4gIGNsaXBwaW5nUmVjdC5oZWlnaHQgPSBjbGlwcGluZ1JlY3QuYm90dG9tIC0gY2xpcHBpbmdSZWN0LnRvcDtcbiAgY2xpcHBpbmdSZWN0LnggPSBjbGlwcGluZ1JlY3QubGVmdDtcbiAgY2xpcHBpbmdSZWN0LnkgPSBjbGlwcGluZ1JlY3QudG9wO1xuICByZXR1cm4gY2xpcHBpbmdSZWN0O1xufSIsImltcG9ydCBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZnJvbSBcIi4vZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZVNjcm9sbCBmcm9tIFwiLi9nZXROb2RlU2Nyb2xsLmpzXCI7XG5pbXBvcnQgZ2V0Tm9kZU5hbWUgZnJvbSBcIi4vZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0RG9jdW1lbnRFbGVtZW50IGZyb20gXCIuL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGlzU2Nyb2xsUGFyZW50IGZyb20gXCIuL2lzU2Nyb2xsUGFyZW50LmpzXCI7XG5pbXBvcnQgeyByb3VuZCB9IGZyb20gXCIuLi91dGlscy9tYXRoLmpzXCI7XG5cbmZ1bmN0aW9uIGlzRWxlbWVudFNjYWxlZChlbGVtZW50KSB7XG4gIHZhciByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHNjYWxlWCA9IHJvdW5kKHJlY3Qud2lkdGgpIC8gZWxlbWVudC5vZmZzZXRXaWR0aCB8fCAxO1xuICB2YXIgc2NhbGVZID0gcm91bmQocmVjdC5oZWlnaHQpIC8gZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgMTtcbiAgcmV0dXJuIHNjYWxlWCAhPT0gMSB8fCBzY2FsZVkgIT09IDE7XG59IC8vIFJldHVybnMgdGhlIGNvbXBvc2l0ZSByZWN0IG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gaXRzIG9mZnNldFBhcmVudC5cbi8vIENvbXBvc2l0ZSBtZWFucyBpdCB0YWtlcyBpbnRvIGFjY291bnQgdHJhbnNmb3JtcyBhcyB3ZWxsIGFzIGxheW91dC5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wb3NpdGVSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnQsIGlzRml4ZWQpIHtcbiAgaWYgKGlzRml4ZWQgPT09IHZvaWQgMCkge1xuICAgIGlzRml4ZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHZhciBpc09mZnNldFBhcmVudEFuRWxlbWVudCA9IGlzSFRNTEVsZW1lbnQob2Zmc2V0UGFyZW50KTtcbiAgdmFyIG9mZnNldFBhcmVudElzU2NhbGVkID0gaXNIVE1MRWxlbWVudChvZmZzZXRQYXJlbnQpICYmIGlzRWxlbWVudFNjYWxlZChvZmZzZXRQYXJlbnQpO1xuICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gZ2V0RG9jdW1lbnRFbGVtZW50KG9mZnNldFBhcmVudCk7XG4gIHZhciByZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnRPclZpcnR1YWxFbGVtZW50LCBvZmZzZXRQYXJlbnRJc1NjYWxlZCwgaXNGaXhlZCk7XG4gIHZhciBzY3JvbGwgPSB7XG4gICAgc2Nyb2xsTGVmdDogMCxcbiAgICBzY3JvbGxUb3A6IDBcbiAgfTtcbiAgdmFyIG9mZnNldHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwXG4gIH07XG5cbiAgaWYgKGlzT2Zmc2V0UGFyZW50QW5FbGVtZW50IHx8ICFpc09mZnNldFBhcmVudEFuRWxlbWVudCAmJiAhaXNGaXhlZCkge1xuICAgIGlmIChnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpICE9PSAnYm9keScgfHwgLy8gaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMDc4XG4gICAgaXNTY3JvbGxQYXJlbnQoZG9jdW1lbnRFbGVtZW50KSkge1xuICAgICAgc2Nyb2xsID0gZ2V0Tm9kZVNjcm9sbChvZmZzZXRQYXJlbnQpO1xuICAgIH1cblxuICAgIGlmIChpc0hUTUxFbGVtZW50KG9mZnNldFBhcmVudCkpIHtcbiAgICAgIG9mZnNldHMgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50LCB0cnVlKTtcbiAgICAgIG9mZnNldHMueCArPSBvZmZzZXRQYXJlbnQuY2xpZW50TGVmdDtcbiAgICAgIG9mZnNldHMueSArPSBvZmZzZXRQYXJlbnQuY2xpZW50VG9wO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICBvZmZzZXRzLnggPSBnZXRXaW5kb3dTY3JvbGxCYXJYKGRvY3VtZW50RWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiByZWN0LmxlZnQgKyBzY3JvbGwuc2Nyb2xsTGVmdCAtIG9mZnNldHMueCxcbiAgICB5OiByZWN0LnRvcCArIHNjcm9sbC5zY3JvbGxUb3AgLSBvZmZzZXRzLnksXG4gICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiByZWN0LmhlaWdodFxuICB9O1xufSIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGdldFdpbmRvdyhlbGVtZW50KS5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xufSIsImltcG9ydCB7IGlzRWxlbWVudCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldERvY3VtZW50RWxlbWVudChlbGVtZW50KSB7XG4gIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl06IGFzc3VtZSBib2R5IGlzIGFsd2F5cyBhdmFpbGFibGVcbiAgcmV0dXJuICgoaXNFbGVtZW50KGVsZW1lbnQpID8gZWxlbWVudC5vd25lckRvY3VtZW50IDogLy8gJEZsb3dGaXhNZVtwcm9wLW1pc3NpbmddXG4gIGVsZW1lbnQuZG9jdW1lbnQpIHx8IHdpbmRvdy5kb2N1bWVudCkuZG9jdW1lbnRFbGVtZW50O1xufSIsImltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsIGZyb20gXCIuL2dldFdpbmRvd1Njcm9sbC5qc1wiO1xuaW1wb3J0IHsgbWF4IH0gZnJvbSBcIi4uL3V0aWxzL21hdGguanNcIjsgLy8gR2V0cyB0aGUgZW50aXJlIHNpemUgb2YgdGhlIHNjcm9sbGFibGUgZG9jdW1lbnQgYXJlYSwgZXZlbiBleHRlbmRpbmcgb3V0c2lkZVxuLy8gb2YgdGhlIGA8aHRtbD5gIGFuZCBgPGJvZHk+YCByZWN0IGJvdW5kcyBpZiBob3Jpem9udGFsbHkgc2Nyb2xsYWJsZVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXREb2N1bWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgX2VsZW1lbnQkb3duZXJEb2N1bWVuO1xuXG4gIHZhciBodG1sID0gZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpO1xuICB2YXIgd2luU2Nyb2xsID0gZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpO1xuICB2YXIgYm9keSA9IChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keTtcbiAgdmFyIHdpZHRoID0gbWF4KGh0bWwuc2Nyb2xsV2lkdGgsIGh0bWwuY2xpZW50V2lkdGgsIGJvZHkgPyBib2R5LnNjcm9sbFdpZHRoIDogMCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKTtcbiAgdmFyIGhlaWdodCA9IG1heChodG1sLnNjcm9sbEhlaWdodCwgaHRtbC5jbGllbnRIZWlnaHQsIGJvZHkgPyBib2R5LnNjcm9sbEhlaWdodCA6IDAsIGJvZHkgPyBib2R5LmNsaWVudEhlaWdodCA6IDApO1xuICB2YXIgeCA9IC13aW5TY3JvbGwuc2Nyb2xsTGVmdCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCk7XG4gIHZhciB5ID0gLXdpblNjcm9sbC5zY3JvbGxUb3A7XG5cbiAgaWYgKGdldENvbXB1dGVkU3R5bGUoYm9keSB8fCBodG1sKS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgeCArPSBtYXgoaHRtbC5jbGllbnRXaWR0aCwgYm9keSA/IGJvZHkuY2xpZW50V2lkdGggOiAwKSAtIHdpZHRoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0SFRNTEVsZW1lbnRTY3JvbGwoZWxlbWVudCkge1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IGVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICBzY3JvbGxUb3A6IGVsZW1lbnQuc2Nyb2xsVG9wXG4gIH07XG59IiwiaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi9nZXRCb3VuZGluZ0NsaWVudFJlY3QuanNcIjsgLy8gUmV0dXJucyB0aGUgbGF5b3V0IHJlY3Qgb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBpdHMgb2Zmc2V0UGFyZW50LiBMYXlvdXRcbi8vIG1lYW5zIGl0IGRvZXNuJ3QgdGFrZSBpbnRvIGFjY291bnQgdHJhbnNmb3Jtcy5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TGF5b3V0UmVjdChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpOyAvLyBVc2UgdGhlIGNsaWVudFJlY3Qgc2l6ZXMgaWYgaXQncyBub3QgYmVlbiB0cmFuc2Zvcm1lZC5cbiAgLy8gRml4ZXMgaHR0cHM6Ly9naXRodWIuY29tL3BvcHBlcmpzL3BvcHBlci1jb3JlL2lzc3Vlcy8xMjIzXG5cbiAgdmFyIHdpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuXG4gIGlmIChNYXRoLmFicyhjbGllbnRSZWN0LndpZHRoIC0gd2lkdGgpIDw9IDEpIHtcbiAgICB3aWR0aCA9IGNsaWVudFJlY3Qud2lkdGg7XG4gIH1cblxuICBpZiAoTWF0aC5hYnMoY2xpZW50UmVjdC5oZWlnaHQgLSBoZWlnaHQpIDw9IDEpIHtcbiAgICBoZWlnaHQgPSBjbGllbnRSZWN0LmhlaWdodDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgIHk6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE5vZGVOYW1lKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGVsZW1lbnQgPyAoZWxlbWVudC5ub2RlTmFtZSB8fCAnJykudG9Mb3dlckNhc2UoKSA6IG51bGw7XG59IiwiaW1wb3J0IGdldFdpbmRvd1Njcm9sbCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGwuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4vZ2V0V2luZG93LmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGdldEhUTUxFbGVtZW50U2Nyb2xsIGZyb20gXCIuL2dldEhUTUxFbGVtZW50U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXROb2RlU2Nyb2xsKG5vZGUpIHtcbiAgaWYgKG5vZGUgPT09IGdldFdpbmRvdyhub2RlKSB8fCAhaXNIVE1MRWxlbWVudChub2RlKSkge1xuICAgIHJldHVybiBnZXRXaW5kb3dTY3JvbGwobm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldEhUTUxFbGVtZW50U2Nyb2xsKG5vZGUpO1xuICB9XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldENvbXB1dGVkU3R5bGUgZnJvbSBcIi4vZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IHsgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuaW1wb3J0IGlzVGFibGVFbGVtZW50IGZyb20gXCIuL2lzVGFibGVFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0UGFyZW50Tm9kZSBmcm9tIFwiLi9nZXRQYXJlbnROb2RlLmpzXCI7XG5pbXBvcnQgZ2V0VUFTdHJpbmcgZnJvbSBcIi4uL3V0aWxzL3VzZXJBZ2VudC5qc1wiO1xuXG5mdW5jdGlvbiBnZXRUcnVlT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgaWYgKCFpc0hUTUxFbGVtZW50KGVsZW1lbnQpIHx8IC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9wb3BwZXJqcy9wb3BwZXItY29yZS9pc3N1ZXMvODM3XG4gIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50Lm9mZnNldFBhcmVudDtcbn0gLy8gYC5vZmZzZXRQYXJlbnRgIHJlcG9ydHMgYG51bGxgIGZvciBmaXhlZCBlbGVtZW50cywgd2hpbGUgYWJzb2x1dGUgZWxlbWVudHNcbi8vIHJldHVybiB0aGUgY29udGFpbmluZyBibG9ja1xuXG5cbmZ1bmN0aW9uIGdldENvbnRhaW5pbmdCbG9jayhlbGVtZW50KSB7XG4gIHZhciBpc0ZpcmVmb3ggPSAvZmlyZWZveC9pLnRlc3QoZ2V0VUFTdHJpbmcoKSk7XG4gIHZhciBpc0lFID0gL1RyaWRlbnQvaS50ZXN0KGdldFVBU3RyaW5nKCkpO1xuXG4gIGlmIChpc0lFICYmIGlzSFRNTEVsZW1lbnQoZWxlbWVudCkpIHtcbiAgICAvLyBJbiBJRSA5LCAxMCBhbmQgMTEgZml4ZWQgZWxlbWVudHMgY29udGFpbmluZyBibG9jayBpcyBhbHdheXMgZXN0YWJsaXNoZWQgYnkgdGhlIHZpZXdwb3J0XG4gICAgdmFyIGVsZW1lbnRDc3MgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRDc3MucG9zaXRpb24gPT09ICdmaXhlZCcpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHZhciBjdXJyZW50Tm9kZSA9IGdldFBhcmVudE5vZGUoZWxlbWVudCk7XG5cbiAgaWYgKGlzU2hhZG93Um9vdChjdXJyZW50Tm9kZSkpIHtcbiAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLmhvc3Q7XG4gIH1cblxuICB3aGlsZSAoaXNIVE1MRWxlbWVudChjdXJyZW50Tm9kZSkgJiYgWydodG1sJywgJ2JvZHknXS5pbmRleE9mKGdldE5vZGVOYW1lKGN1cnJlbnROb2RlKSkgPCAwKSB7XG4gICAgdmFyIGNzcyA9IGdldENvbXB1dGVkU3R5bGUoY3VycmVudE5vZGUpOyAvLyBUaGlzIGlzIG5vbi1leGhhdXN0aXZlIGJ1dCBjb3ZlcnMgdGhlIG1vc3QgY29tbW9uIENTUyBwcm9wZXJ0aWVzIHRoYXRcbiAgICAvLyBjcmVhdGUgYSBjb250YWluaW5nIGJsb2NrLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy9Db250YWluaW5nX2Jsb2NrI2lkZW50aWZ5aW5nX3RoZV9jb250YWluaW5nX2Jsb2NrXG5cbiAgICBpZiAoY3NzLnRyYW5zZm9ybSAhPT0gJ25vbmUnIHx8IGNzcy5wZXJzcGVjdGl2ZSAhPT0gJ25vbmUnIHx8IGNzcy5jb250YWluID09PSAncGFpbnQnIHx8IFsndHJhbnNmb3JtJywgJ3BlcnNwZWN0aXZlJ10uaW5kZXhPZihjc3Mud2lsbENoYW5nZSkgIT09IC0xIHx8IGlzRmlyZWZveCAmJiBjc3Mud2lsbENoYW5nZSA9PT0gJ2ZpbHRlcicgfHwgaXNGaXJlZm94ICYmIGNzcy5maWx0ZXIgJiYgY3NzLmZpbHRlciAhPT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn0gLy8gR2V0cyB0aGUgY2xvc2VzdCBhbmNlc3RvciBwb3NpdGlvbmVkIGVsZW1lbnQuIEhhbmRsZXMgc29tZSBlZGdlIGNhc2VzLFxuLy8gc3VjaCBhcyB0YWJsZSBhbmNlc3RvcnMgYW5kIGNyb3NzIGJyb3dzZXIgYnVncy5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KGVsZW1lbnQpO1xuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0VHJ1ZU9mZnNldFBhcmVudChlbGVtZW50KTtcblxuICB3aGlsZSAob2Zmc2V0UGFyZW50ICYmIGlzVGFibGVFbGVtZW50KG9mZnNldFBhcmVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykge1xuICAgIG9mZnNldFBhcmVudCA9IGdldFRydWVPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIGlmIChvZmZzZXRQYXJlbnQgJiYgKGdldE5vZGVOYW1lKG9mZnNldFBhcmVudCkgPT09ICdodG1sJyB8fCBnZXROb2RlTmFtZShvZmZzZXRQYXJlbnQpID09PSAnYm9keScgJiYgZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uID09PSAnc3RhdGljJykpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG9mZnNldFBhcmVudCB8fCBnZXRDb250YWluaW5nQmxvY2soZWxlbWVudCkgfHwgd2luZG93O1xufSIsImltcG9ydCBnZXROb2RlTmFtZSBmcm9tIFwiLi9nZXROb2RlTmFtZS5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCB7IGlzU2hhZG93Um9vdCB9IGZyb20gXCIuL2luc3RhbmNlT2YuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZ2V0Tm9kZU5hbWUoZWxlbWVudCkgPT09ICdodG1sJykge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuICgvLyB0aGlzIGlzIGEgcXVpY2tlciAoYnV0IGxlc3MgdHlwZSBzYWZlKSB3YXkgdG8gc2F2ZSBxdWl0ZSBzb21lIGJ5dGVzIGZyb20gdGhlIGJ1bmRsZVxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXJldHVybl1cbiAgICAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICBlbGVtZW50LmFzc2lnbmVkU2xvdCB8fCAvLyBzdGVwIGludG8gdGhlIHNoYWRvdyBET00gb2YgdGhlIHBhcmVudCBvZiBhIHNsb3R0ZWQgbm9kZVxuICAgIGVsZW1lbnQucGFyZW50Tm9kZSB8fCAoIC8vIERPTSBFbGVtZW50IGRldGVjdGVkXG4gICAgaXNTaGFkb3dSb290KGVsZW1lbnQpID8gZWxlbWVudC5ob3N0IDogbnVsbCkgfHwgLy8gU2hhZG93Um9vdCBkZXRlY3RlZFxuICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBIVE1MRWxlbWVudCBpcyBhIE5vZGVcbiAgICBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCkgLy8gZmFsbGJhY2tcblxuICApO1xufSIsImltcG9ydCBnZXRQYXJlbnROb2RlIGZyb20gXCIuL2dldFBhcmVudE5vZGUuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5pbXBvcnQgeyBpc0hUTUxFbGVtZW50IH0gZnJvbSBcIi4vaW5zdGFuY2VPZi5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0U2Nyb2xsUGFyZW50KG5vZGUpIHtcbiAgaWYgKFsnaHRtbCcsICdib2R5JywgJyNkb2N1bWVudCddLmluZGV4T2YoZ2V0Tm9kZU5hbWUobm9kZSkpID49IDApIHtcbiAgICAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1yZXR1cm5dOiBhc3N1bWUgYm9keSBpcyBhbHdheXMgYXZhaWxhYmxlXG4gICAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICB9XG5cbiAgaWYgKGlzSFRNTEVsZW1lbnQobm9kZSkgJiYgaXNTY3JvbGxQYXJlbnQobm9kZSkpIHtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIHJldHVybiBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShub2RlKSk7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4vZ2V0RG9jdW1lbnRFbGVtZW50LmpzXCI7XG5pbXBvcnQgZ2V0V2luZG93U2Nyb2xsQmFyWCBmcm9tIFwiLi9nZXRXaW5kb3dTY3JvbGxCYXJYLmpzXCI7XG5pbXBvcnQgaXNMYXlvdXRWaWV3cG9ydCBmcm9tIFwiLi9pc0xheW91dFZpZXdwb3J0LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRWaWV3cG9ydFJlY3QoZWxlbWVudCwgc3RyYXRlZ3kpIHtcbiAgdmFyIHdpbiA9IGdldFdpbmRvdyhlbGVtZW50KTtcbiAgdmFyIGh0bWwgPSBnZXREb2N1bWVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciB2aXN1YWxWaWV3cG9ydCA9IHdpbi52aXN1YWxWaWV3cG9ydDtcbiAgdmFyIHdpZHRoID0gaHRtbC5jbGllbnRXaWR0aDtcbiAgdmFyIGhlaWdodCA9IGh0bWwuY2xpZW50SGVpZ2h0O1xuICB2YXIgeCA9IDA7XG4gIHZhciB5ID0gMDtcblxuICBpZiAodmlzdWFsVmlld3BvcnQpIHtcbiAgICB3aWR0aCA9IHZpc3VhbFZpZXdwb3J0LndpZHRoO1xuICAgIGhlaWdodCA9IHZpc3VhbFZpZXdwb3J0LmhlaWdodDtcbiAgICB2YXIgbGF5b3V0Vmlld3BvcnQgPSBpc0xheW91dFZpZXdwb3J0KCk7XG5cbiAgICBpZiAobGF5b3V0Vmlld3BvcnQgfHwgIWxheW91dFZpZXdwb3J0ICYmIHN0cmF0ZWd5ID09PSAnZml4ZWQnKSB7XG4gICAgICB4ID0gdmlzdWFsVmlld3BvcnQub2Zmc2V0TGVmdDtcbiAgICAgIHkgPSB2aXN1YWxWaWV3cG9ydC5vZmZzZXRUb3A7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgeDogeCArIGdldFdpbmRvd1Njcm9sbEJhclgoZWxlbWVudCksXG4gICAgeTogeVxuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvdyhub2RlKSB7XG4gIGlmIChub2RlID09IG51bGwpIHtcbiAgICByZXR1cm4gd2luZG93O1xuICB9XG5cbiAgaWYgKG5vZGUudG9TdHJpbmcoKSAhPT0gJ1tvYmplY3QgV2luZG93XScpIHtcbiAgICB2YXIgb3duZXJEb2N1bWVudCA9IG5vZGUub3duZXJEb2N1bWVudDtcbiAgICByZXR1cm4gb3duZXJEb2N1bWVudCA/IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93IDogd2luZG93O1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFdpbmRvd1Njcm9sbChub2RlKSB7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3cobm9kZSk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gd2luLnBhZ2VYT2Zmc2V0O1xuICB2YXIgc2Nyb2xsVG9wID0gd2luLnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4ge1xuICAgIHNjcm9sbExlZnQ6IHNjcm9sbExlZnQsXG4gICAgc2Nyb2xsVG9wOiBzY3JvbGxUb3BcbiAgfTtcbn0iLCJpbXBvcnQgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZyb20gXCIuL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3dTY3JvbGwgZnJvbSBcIi4vZ2V0V2luZG93U2Nyb2xsLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRXaW5kb3dTY3JvbGxCYXJYKGVsZW1lbnQpIHtcbiAgLy8gSWYgPGh0bWw+IGhhcyBhIENTUyB3aWR0aCBncmVhdGVyIHRoYW4gdGhlIHZpZXdwb3J0LCB0aGVuIHRoaXMgd2lsbCBiZVxuICAvLyBpbmNvcnJlY3QgZm9yIFJUTC5cbiAgLy8gUG9wcGVyIDEgaXMgYnJva2VuIGluIHRoaXMgY2FzZSBhbmQgbmV2ZXIgaGFkIGEgYnVnIHJlcG9ydCBzbyBsZXQncyBhc3N1bWVcbiAgLy8gaXQncyBub3QgYW4gaXNzdWUuIEkgZG9uJ3QgdGhpbmsgYW55b25lIGV2ZXIgc3BlY2lmaWVzIHdpZHRoIG9uIDxodG1sPlxuICAvLyBhbnl3YXkuXG4gIC8vIEJyb3dzZXJzIHdoZXJlIHRoZSBsZWZ0IHNjcm9sbGJhciBkb2Vzbid0IGNhdXNlIGFuIGlzc3VlIHJlcG9ydCBgMGAgZm9yXG4gIC8vIHRoaXMgKGUuZy4gRWRnZSAyMDE5LCBJRTExLCBTYWZhcmkpXG4gIHJldHVybiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZ2V0RG9jdW1lbnRFbGVtZW50KGVsZW1lbnQpKS5sZWZ0ICsgZ2V0V2luZG93U2Nyb2xsKGVsZW1lbnQpLnNjcm9sbExlZnQ7XG59IiwiaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcblxuZnVuY3Rpb24gaXNFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuRWxlbWVudDtcbiAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBPd25FbGVtZW50IHx8IG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50O1xufVxuXG5mdW5jdGlvbiBpc0hUTUxFbGVtZW50KG5vZGUpIHtcbiAgdmFyIE93bkVsZW1lbnQgPSBnZXRXaW5kb3cobm9kZSkuSFRNTEVsZW1lbnQ7XG4gIHJldHVybiBub2RlIGluc3RhbmNlb2YgT3duRWxlbWVudCB8fCBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGlzU2hhZG93Um9vdChub2RlKSB7XG4gIC8vIElFIDExIGhhcyBubyBTaGFkb3dSb290XG4gIGlmICh0eXBlb2YgU2hhZG93Um9vdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgT3duRWxlbWVudCA9IGdldFdpbmRvdyhub2RlKS5TaGFkb3dSb290O1xuICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIE93bkVsZW1lbnQgfHwgbm9kZSBpbnN0YW5jZW9mIFNoYWRvd1Jvb3Q7XG59XG5cbmV4cG9ydCB7IGlzRWxlbWVudCwgaXNIVE1MRWxlbWVudCwgaXNTaGFkb3dSb290IH07IiwiaW1wb3J0IGdldFVBU3RyaW5nIGZyb20gXCIuLi91dGlscy91c2VyQWdlbnQuanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzTGF5b3V0Vmlld3BvcnQoKSB7XG4gIHJldHVybiAhL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChnZXRVQVN0cmluZygpKTtcbn0iLCJpbXBvcnQgZ2V0Q29tcHV0ZWRTdHlsZSBmcm9tIFwiLi9nZXRDb21wdXRlZFN0eWxlLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Njcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIEZpcmVmb3ggd2FudHMgdXMgdG8gY2hlY2sgYC14YCBhbmQgYC15YCB2YXJpYXRpb25zIGFzIHdlbGxcbiAgdmFyIF9nZXRDb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldENvbXB1dGVkU3R5bGUub3ZlcmZsb3csXG4gICAgICBvdmVyZmxvd1ggPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0Q29tcHV0ZWRTdHlsZS5vdmVyZmxvd1k7XG5cbiAgcmV0dXJuIC9hdXRvfHNjcm9sbHxvdmVybGF5fGhpZGRlbi8udGVzdChvdmVyZmxvdyArIG92ZXJmbG93WSArIG92ZXJmbG93WCk7XG59IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuL2dldE5vZGVOYW1lLmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1RhYmxlRWxlbWVudChlbGVtZW50KSB7XG4gIHJldHVybiBbJ3RhYmxlJywgJ3RkJywgJ3RoJ10uaW5kZXhPZihnZXROb2RlTmFtZShlbGVtZW50KSkgPj0gMDtcbn0iLCJpbXBvcnQgZ2V0U2Nyb2xsUGFyZW50IGZyb20gXCIuL2dldFNjcm9sbFBhcmVudC5qc1wiO1xuaW1wb3J0IGdldFBhcmVudE5vZGUgZnJvbSBcIi4vZ2V0UGFyZW50Tm9kZS5qc1wiO1xuaW1wb3J0IGdldFdpbmRvdyBmcm9tIFwiLi9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBpc1Njcm9sbFBhcmVudCBmcm9tIFwiLi9pc1Njcm9sbFBhcmVudC5qc1wiO1xuLypcbmdpdmVuIGEgRE9NIGVsZW1lbnQsIHJldHVybiB0aGUgbGlzdCBvZiBhbGwgc2Nyb2xsIHBhcmVudHMsIHVwIHRoZSBsaXN0IG9mIGFuY2Vzb3JzXG51bnRpbCB3ZSBnZXQgdG8gdGhlIHRvcCB3aW5kb3cgb2JqZWN0LiBUaGlzIGxpc3QgaXMgd2hhdCB3ZSBhdHRhY2ggc2Nyb2xsIGxpc3RlbmVyc1xudG8sIGJlY2F1c2UgaWYgYW55IG9mIHRoZXNlIHBhcmVudCBlbGVtZW50cyBzY3JvbGwsIHdlJ2xsIG5lZWQgdG8gcmUtY2FsY3VsYXRlIHRoZVxucmVmZXJlbmNlIGVsZW1lbnQncyBwb3NpdGlvbi5cbiovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxpc3RTY3JvbGxQYXJlbnRzKGVsZW1lbnQsIGxpc3QpIHtcbiAgdmFyIF9lbGVtZW50JG93bmVyRG9jdW1lbjtcblxuICBpZiAobGlzdCA9PT0gdm9pZCAwKSB7XG4gICAgbGlzdCA9IFtdO1xuICB9XG5cbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChlbGVtZW50KTtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudCA9PT0gKChfZWxlbWVudCRvd25lckRvY3VtZW4gPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQpID09IG51bGwgPyB2b2lkIDAgOiBfZWxlbWVudCRvd25lckRvY3VtZW4uYm9keSk7XG4gIHZhciB3aW4gPSBnZXRXaW5kb3coc2Nyb2xsUGFyZW50KTtcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IFt3aW5dLmNvbmNhdCh3aW4udmlzdWFsVmlld3BvcnQgfHwgW10sIGlzU2Nyb2xsUGFyZW50KHNjcm9sbFBhcmVudCkgPyBzY3JvbGxQYXJlbnQgOiBbXSkgOiBzY3JvbGxQYXJlbnQ7XG4gIHZhciB1cGRhdGVkTGlzdCA9IGxpc3QuY29uY2F0KHRhcmdldCk7XG4gIHJldHVybiBpc0JvZHkgPyB1cGRhdGVkTGlzdCA6IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLWNhbGxdOiBpc0JvZHkgdGVsbHMgdXMgdGFyZ2V0IHdpbGwgYmUgYW4gSFRNTEVsZW1lbnQgaGVyZVxuICB1cGRhdGVkTGlzdC5jb25jYXQobGlzdFNjcm9sbFBhcmVudHMoZ2V0UGFyZW50Tm9kZSh0YXJnZXQpKSk7XG59IiwiZXhwb3J0IHZhciB0b3AgPSAndG9wJztcbmV4cG9ydCB2YXIgYm90dG9tID0gJ2JvdHRvbSc7XG5leHBvcnQgdmFyIHJpZ2h0ID0gJ3JpZ2h0JztcbmV4cG9ydCB2YXIgbGVmdCA9ICdsZWZ0JztcbmV4cG9ydCB2YXIgYXV0byA9ICdhdXRvJztcbmV4cG9ydCB2YXIgYmFzZVBsYWNlbWVudHMgPSBbdG9wLCBib3R0b20sIHJpZ2h0LCBsZWZ0XTtcbmV4cG9ydCB2YXIgc3RhcnQgPSAnc3RhcnQnO1xuZXhwb3J0IHZhciBlbmQgPSAnZW5kJztcbmV4cG9ydCB2YXIgY2xpcHBpbmdQYXJlbnRzID0gJ2NsaXBwaW5nUGFyZW50cyc7XG5leHBvcnQgdmFyIHZpZXdwb3J0ID0gJ3ZpZXdwb3J0JztcbmV4cG9ydCB2YXIgcG9wcGVyID0gJ3BvcHBlcic7XG5leHBvcnQgdmFyIHJlZmVyZW5jZSA9ICdyZWZlcmVuY2UnO1xuZXhwb3J0IHZhciB2YXJpYXRpb25QbGFjZW1lbnRzID0gLyojX19QVVJFX18qL2Jhc2VQbGFjZW1lbnRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCArIFwiLVwiICsgc3RhcnQsIHBsYWNlbWVudCArIFwiLVwiICsgZW5kXSk7XG59LCBbXSk7XG5leHBvcnQgdmFyIHBsYWNlbWVudHMgPSAvKiNfX1BVUkVfXyovW10uY29uY2F0KGJhc2VQbGFjZW1lbnRzLCBbYXV0b10pLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIGFjYy5jb25jYXQoW3BsYWNlbWVudCwgcGxhY2VtZW50ICsgXCItXCIgKyBzdGFydCwgcGxhY2VtZW50ICsgXCItXCIgKyBlbmRdKTtcbn0sIFtdKTsgLy8gbW9kaWZpZXJzIHRoYXQgbmVlZCB0byByZWFkIHRoZSBET01cblxuZXhwb3J0IHZhciBiZWZvcmVSZWFkID0gJ2JlZm9yZVJlYWQnO1xuZXhwb3J0IHZhciByZWFkID0gJ3JlYWQnO1xuZXhwb3J0IHZhciBhZnRlclJlYWQgPSAnYWZ0ZXJSZWFkJzsgLy8gcHVyZS1sb2dpYyBtb2RpZmllcnNcblxuZXhwb3J0IHZhciBiZWZvcmVNYWluID0gJ2JlZm9yZU1haW4nO1xuZXhwb3J0IHZhciBtYWluID0gJ21haW4nO1xuZXhwb3J0IHZhciBhZnRlck1haW4gPSAnYWZ0ZXJNYWluJzsgLy8gbW9kaWZpZXIgd2l0aCB0aGUgcHVycG9zZSB0byB3cml0ZSB0byB0aGUgRE9NIChvciB3cml0ZSBpbnRvIGEgZnJhbWV3b3JrIHN0YXRlKVxuXG5leHBvcnQgdmFyIGJlZm9yZVdyaXRlID0gJ2JlZm9yZVdyaXRlJztcbmV4cG9ydCB2YXIgd3JpdGUgPSAnd3JpdGUnO1xuZXhwb3J0IHZhciBhZnRlcldyaXRlID0gJ2FmdGVyV3JpdGUnO1xuZXhwb3J0IHZhciBtb2RpZmllclBoYXNlcyA9IFtiZWZvcmVSZWFkLCByZWFkLCBhZnRlclJlYWQsIGJlZm9yZU1haW4sIG1haW4sIGFmdGVyTWFpbiwgYmVmb3JlV3JpdGUsIHdyaXRlLCBhZnRlcldyaXRlXTsiLCJleHBvcnQgKiBmcm9tIFwiLi9lbnVtcy5qc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vbW9kaWZpZXJzL2luZGV4LmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdywgY3JlYXRlUG9wcGVyIGFzIGNyZWF0ZVBvcHBlckJhc2UgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgfSBmcm9tIFwiLi9wb3BwZXIuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgeyBjcmVhdGVQb3BwZXIgYXMgY3JlYXRlUG9wcGVyTGl0ZSB9IGZyb20gXCIuL3BvcHBlci1saXRlLmpzXCI7IiwiaW1wb3J0IGdldE5vZGVOYW1lIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Tm9kZU5hbWUuanNcIjtcbmltcG9ydCB7IGlzSFRNTEVsZW1lbnQgfSBmcm9tIFwiLi4vZG9tLXV0aWxzL2luc3RhbmNlT2YuanNcIjsgLy8gVGhpcyBtb2RpZmllciB0YWtlcyB0aGUgc3R5bGVzIHByZXBhcmVkIGJ5IHRoZSBgY29tcHV0ZVN0eWxlc2AgbW9kaWZpZXJcbi8vIGFuZCBhcHBsaWVzIHRoZW0gdG8gdGhlIEhUTUxFbGVtZW50cyBzdWNoIGFzIHBvcHBlciBhbmQgYXJyb3dcblxuZnVuY3Rpb24gYXBwbHlTdHlsZXMoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlO1xuICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBzdHlsZSA9IHN0YXRlLnN0eWxlc1tuYW1lXSB8fCB7fTtcbiAgICB2YXIgYXR0cmlidXRlcyA9IHN0YXRlLmF0dHJpYnV0ZXNbbmFtZV0gfHwge307XG4gICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTsgLy8gYXJyb3cgaXMgb3B0aW9uYWwgKyB2aXJ0dWFsIGVsZW1lbnRzXG5cbiAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfSAvLyBGbG93IGRvZXNuJ3Qgc3VwcG9ydCB0byBleHRlbmQgdGhpcyBwcm9wZXJ0eSwgYnV0IGl0J3MgdGhlIG1vc3RcbiAgICAvLyBlZmZlY3RpdmUgd2F5IHRvIGFwcGx5IHN0eWxlcyB0byBhbiBIVE1MRWxlbWVudFxuICAgIC8vICRGbG93Rml4TWVbY2Fubm90LXdyaXRlXVxuXG5cbiAgICBPYmplY3QuYXNzaWduKGVsZW1lbnQuc3R5bGUsIHN0eWxlKTtcbiAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW25hbWVdO1xuXG4gICAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUgPT09IHRydWUgPyAnJyA6IHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVmZmVjdChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZTtcbiAgdmFyIGluaXRpYWxTdHlsZXMgPSB7XG4gICAgcG9wcGVyOiB7XG4gICAgICBwb3NpdGlvbjogc3RhdGUub3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbWFyZ2luOiAnMCdcbiAgICB9LFxuICAgIGFycm93OiB7XG4gICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICAgIH0sXG4gICAgcmVmZXJlbmNlOiB7fVxuICB9O1xuICBPYmplY3QuYXNzaWduKHN0YXRlLmVsZW1lbnRzLnBvcHBlci5zdHlsZSwgaW5pdGlhbFN0eWxlcy5wb3BwZXIpO1xuICBzdGF0ZS5zdHlsZXMgPSBpbml0aWFsU3R5bGVzO1xuXG4gIGlmIChzdGF0ZS5lbGVtZW50cy5hcnJvdykge1xuICAgIE9iamVjdC5hc3NpZ24oc3RhdGUuZWxlbWVudHMuYXJyb3cuc3R5bGUsIGluaXRpYWxTdHlsZXMuYXJyb3cpO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZS5lbGVtZW50cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBzdGF0ZS5lbGVtZW50c1tuYW1lXTtcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gc3RhdGUuYXR0cmlidXRlc1tuYW1lXSB8fCB7fTtcbiAgICAgIHZhciBzdHlsZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhzdGF0ZS5zdHlsZXMuaGFzT3duUHJvcGVydHkobmFtZSkgPyBzdGF0ZS5zdHlsZXNbbmFtZV0gOiBpbml0aWFsU3R5bGVzW25hbWVdKTsgLy8gU2V0IGFsbCB2YWx1ZXMgdG8gYW4gZW1wdHkgc3RyaW5nIHRvIHVuc2V0IHRoZW1cblxuICAgICAgdmFyIHN0eWxlID0gc3R5bGVQcm9wZXJ0aWVzLnJlZHVjZShmdW5jdGlvbiAoc3R5bGUsIHByb3BlcnR5KSB7XG4gICAgICAgIHN0eWxlW3Byb3BlcnR5XSA9ICcnO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgICB9LCB7fSk7IC8vIGFycm93IGlzIG9wdGlvbmFsICsgdmlydHVhbCBlbGVtZW50c1xuXG4gICAgICBpZiAoIWlzSFRNTEVsZW1lbnQoZWxlbWVudCkgfHwgIWdldE5vZGVOYW1lKGVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCBzdHlsZSk7XG4gICAgICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChhdHRyaWJ1dGUpIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXBwbHlTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3dyaXRlJyxcbiAgZm46IGFwcGx5U3R5bGVzLFxuICBlZmZlY3Q6IGVmZmVjdCxcbiAgcmVxdWlyZXM6IFsnY29tcHV0ZVN0eWxlcyddXG59OyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBjb250YWlucyBmcm9tIFwiLi4vZG9tLXV0aWxzL2NvbnRhaW5zLmpzXCI7XG5pbXBvcnQgZ2V0T2Zmc2V0UGFyZW50IGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0T2Zmc2V0UGFyZW50LmpzXCI7XG5pbXBvcnQgZ2V0TWFpbkF4aXNGcm9tUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHdpdGhpbiB9IGZyb20gXCIuLi91dGlscy93aXRoaW4uanNcIjtcbmltcG9ydCBtZXJnZVBhZGRpbmdPYmplY3QgZnJvbSBcIi4uL3V0aWxzL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi4vdXRpbHMvZXhwYW5kVG9IYXNoTWFwLmpzXCI7XG5pbXBvcnQgeyBsZWZ0LCByaWdodCwgYmFzZVBsYWNlbWVudHMsIHRvcCwgYm90dG9tIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxudmFyIHRvUGFkZGluZ09iamVjdCA9IGZ1bmN0aW9uIHRvUGFkZGluZ09iamVjdChwYWRkaW5nLCBzdGF0ZSkge1xuICBwYWRkaW5nID0gdHlwZW9mIHBhZGRpbmcgPT09ICdmdW5jdGlvbicgPyBwYWRkaW5nKE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnJlY3RzLCB7XG4gICAgcGxhY2VtZW50OiBzdGF0ZS5wbGFjZW1lbnRcbiAgfSkpIDogcGFkZGluZztcbiAgcmV0dXJuIG1lcmdlUGFkZGluZ09iamVjdCh0eXBlb2YgcGFkZGluZyAhPT0gJ251bWJlcicgPyBwYWRkaW5nIDogZXhwYW5kVG9IYXNoTWFwKHBhZGRpbmcsIGJhc2VQbGFjZW1lbnRzKSk7XG59O1xuXG5mdW5jdGlvbiBhcnJvdyhfcmVmKSB7XG4gIHZhciBfc3RhdGUkbW9kaWZpZXJzRGF0YSQ7XG5cbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICBvcHRpb25zID0gX3JlZi5vcHRpb25zO1xuICB2YXIgYXJyb3dFbGVtZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3c7XG4gIHZhciBwb3BwZXJPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzO1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQoc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGF4aXMgPSBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCk7XG4gIHZhciBpc1ZlcnRpY2FsID0gW2xlZnQsIHJpZ2h0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID49IDA7XG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIGlmICghYXJyb3dFbGVtZW50IHx8ICFwb3BwZXJPZmZzZXRzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdPYmplY3QgPSB0b1BhZGRpbmdPYmplY3Qob3B0aW9ucy5wYWRkaW5nLCBzdGF0ZSk7XG4gIHZhciBhcnJvd1JlY3QgPSBnZXRMYXlvdXRSZWN0KGFycm93RWxlbWVudCk7XG4gIHZhciBtaW5Qcm9wID0gYXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgdmFyIG1heFByb3AgPSBheGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgdmFyIGVuZERpZmYgPSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbbGVuXSArIHN0YXRlLnJlY3RzLnJlZmVyZW5jZVtheGlzXSAtIHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5wb3BwZXJbbGVuXTtcbiAgdmFyIHN0YXJ0RGlmZiA9IHBvcHBlck9mZnNldHNbYXhpc10gLSBzdGF0ZS5yZWN0cy5yZWZlcmVuY2VbYXhpc107XG4gIHZhciBhcnJvd09mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChhcnJvd0VsZW1lbnQpO1xuICB2YXIgY2xpZW50U2l6ZSA9IGFycm93T2Zmc2V0UGFyZW50ID8gYXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50SGVpZ2h0IHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRXaWR0aCB8fCAwIDogMDtcbiAgdmFyIGNlbnRlclRvUmVmZXJlbmNlID0gZW5kRGlmZiAvIDIgLSBzdGFydERpZmYgLyAyOyAvLyBNYWtlIHN1cmUgdGhlIGFycm93IGRvZXNuJ3Qgb3ZlcmZsb3cgdGhlIHBvcHBlciBpZiB0aGUgY2VudGVyIHBvaW50IGlzXG4gIC8vIG91dHNpZGUgb2YgdGhlIHBvcHBlciBib3VuZHNcblxuICB2YXIgbWluID0gcGFkZGluZ09iamVjdFttaW5Qcm9wXTtcbiAgdmFyIG1heCA9IGNsaWVudFNpemUgLSBhcnJvd1JlY3RbbGVuXSAtIHBhZGRpbmdPYmplY3RbbWF4UHJvcF07XG4gIHZhciBjZW50ZXIgPSBjbGllbnRTaXplIC8gMiAtIGFycm93UmVjdFtsZW5dIC8gMiArIGNlbnRlclRvUmVmZXJlbmNlO1xuICB2YXIgb2Zmc2V0ID0gd2l0aGluKG1pbiwgY2VudGVyLCBtYXgpOyAvLyBQcmV2ZW50cyBicmVha2luZyBzeW50YXggaGlnaGxpZ2h0aW5nLi4uXG5cbiAgdmFyIGF4aXNQcm9wID0gYXhpcztcbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IChfc3RhdGUkbW9kaWZpZXJzRGF0YSQgPSB7fSwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkW2F4aXNQcm9wXSA9IG9mZnNldCwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkLmNlbnRlck9mZnNldCA9IG9mZnNldCAtIGNlbnRlciwgX3N0YXRlJG1vZGlmaWVyc0RhdGEkKTtcbn1cblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYyKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYyLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYyLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50LFxuICAgICAgYXJyb3dFbGVtZW50ID0gX29wdGlvbnMkZWxlbWVudCA9PT0gdm9pZCAwID8gJ1tkYXRhLXBvcHBlci1hcnJvd10nIDogX29wdGlvbnMkZWxlbWVudDtcblxuICBpZiAoYXJyb3dFbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH0gLy8gQ1NTIHNlbGVjdG9yXG5cblxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBzdGF0ZS5lbGVtZW50cy5wb3BwZXIucXVlcnlTZWxlY3RvcihhcnJvd0VsZW1lbnQpO1xuXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBpZiAoIWNvbnRhaW5zKHN0YXRlLmVsZW1lbnRzLnBvcHBlciwgYXJyb3dFbGVtZW50KSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0YXRlLmVsZW1lbnRzLmFycm93ID0gYXJyb3dFbGVtZW50O1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnYXJyb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogYXJyb3csXG4gIGVmZmVjdDogZWZmZWN0LFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J11cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBlbmQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjtcbmltcG9ydCBnZXREb2N1bWVudEVsZW1lbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXREb2N1bWVudEVsZW1lbnQuanNcIjtcbmltcG9ydCBnZXRDb21wdXRlZFN0eWxlIGZyb20gXCIuLi9kb20tdXRpbHMvZ2V0Q29tcHV0ZWRTdHlsZS5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgcm91bmQgfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbnZhciB1bnNldFNpZGVzID0ge1xuICB0b3A6ICdhdXRvJyxcbiAgcmlnaHQ6ICdhdXRvJyxcbiAgYm90dG9tOiAnYXV0bycsXG4gIGxlZnQ6ICdhdXRvJ1xufTsgLy8gUm91bmQgdGhlIG9mZnNldHMgdG8gdGhlIG5lYXJlc3Qgc3VpdGFibGUgc3VicGl4ZWwgYmFzZWQgb24gdGhlIERQUi5cbi8vIFpvb21pbmcgY2FuIGNoYW5nZSB0aGUgRFBSLCBidXQgaXQgc2VlbXMgdG8gcmVwb3J0IGEgdmFsdWUgdGhhdCB3aWxsXG4vLyBjbGVhbmx5IGRpdmlkZSB0aGUgdmFsdWVzIGludG8gdGhlIGFwcHJvcHJpYXRlIHN1YnBpeGVscy5cblxuZnVuY3Rpb24gcm91bmRPZmZzZXRzQnlEUFIoX3JlZiwgd2luKSB7XG4gIHZhciB4ID0gX3JlZi54LFxuICAgICAgeSA9IF9yZWYueTtcbiAgdmFyIGRwciA9IHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gIHJldHVybiB7XG4gICAgeDogcm91bmQoeCAqIGRwcikgLyBkcHIgfHwgMCxcbiAgICB5OiByb3VuZCh5ICogZHByKSAvIGRwciB8fCAwXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYXBUb1N0eWxlcyhfcmVmMikge1xuICB2YXIgX09iamVjdCRhc3NpZ24yO1xuXG4gIHZhciBwb3BwZXIgPSBfcmVmMi5wb3BwZXIsXG4gICAgICBwb3BwZXJSZWN0ID0gX3JlZjIucG9wcGVyUmVjdCxcbiAgICAgIHBsYWNlbWVudCA9IF9yZWYyLnBsYWNlbWVudCxcbiAgICAgIHZhcmlhdGlvbiA9IF9yZWYyLnZhcmlhdGlvbixcbiAgICAgIG9mZnNldHMgPSBfcmVmMi5vZmZzZXRzLFxuICAgICAgcG9zaXRpb24gPSBfcmVmMi5wb3NpdGlvbixcbiAgICAgIGdwdUFjY2VsZXJhdGlvbiA9IF9yZWYyLmdwdUFjY2VsZXJhdGlvbixcbiAgICAgIGFkYXB0aXZlID0gX3JlZjIuYWRhcHRpdmUsXG4gICAgICByb3VuZE9mZnNldHMgPSBfcmVmMi5yb3VuZE9mZnNldHMsXG4gICAgICBpc0ZpeGVkID0gX3JlZjIuaXNGaXhlZDtcbiAgdmFyIF9vZmZzZXRzJHggPSBvZmZzZXRzLngsXG4gICAgICB4ID0gX29mZnNldHMkeCA9PT0gdm9pZCAwID8gMCA6IF9vZmZzZXRzJHgsXG4gICAgICBfb2Zmc2V0cyR5ID0gb2Zmc2V0cy55LFxuICAgICAgeSA9IF9vZmZzZXRzJHkgPT09IHZvaWQgMCA/IDAgOiBfb2Zmc2V0cyR5O1xuXG4gIHZhciBfcmVmMyA9IHR5cGVvZiByb3VuZE9mZnNldHMgPT09ICdmdW5jdGlvbicgPyByb3VuZE9mZnNldHMoe1xuICAgIHg6IHgsXG4gICAgeTogeVxuICB9KSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjMueDtcbiAgeSA9IF9yZWYzLnk7XG4gIHZhciBoYXNYID0gb2Zmc2V0cy5oYXNPd25Qcm9wZXJ0eSgneCcpO1xuICB2YXIgaGFzWSA9IG9mZnNldHMuaGFzT3duUHJvcGVydHkoJ3knKTtcbiAgdmFyIHNpZGVYID0gbGVmdDtcbiAgdmFyIHNpZGVZID0gdG9wO1xuICB2YXIgd2luID0gd2luZG93O1xuXG4gIGlmIChhZGFwdGl2ZSkge1xuICAgIHZhciBvZmZzZXRQYXJlbnQgPSBnZXRPZmZzZXRQYXJlbnQocG9wcGVyKTtcbiAgICB2YXIgaGVpZ2h0UHJvcCA9ICdjbGllbnRIZWlnaHQnO1xuICAgIHZhciB3aWR0aFByb3AgPSAnY2xpZW50V2lkdGgnO1xuXG4gICAgaWYgKG9mZnNldFBhcmVudCA9PT0gZ2V0V2luZG93KHBvcHBlcikpIHtcbiAgICAgIG9mZnNldFBhcmVudCA9IGdldERvY3VtZW50RWxlbWVudChwb3BwZXIpO1xuXG4gICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZShvZmZzZXRQYXJlbnQpLnBvc2l0aW9uICE9PSAnc3RhdGljJyAmJiBwb3NpdGlvbiA9PT0gJ2Fic29sdXRlJykge1xuICAgICAgICBoZWlnaHRQcm9wID0gJ3Njcm9sbEhlaWdodCc7XG4gICAgICAgIHdpZHRoUHJvcCA9ICdzY3JvbGxXaWR0aCc7XG4gICAgICB9XG4gICAgfSAvLyAkRmxvd0ZpeE1lW2luY29tcGF0aWJsZS1jYXN0XTogZm9yY2UgdHlwZSByZWZpbmVtZW50LCB3ZSBjb21wYXJlIG9mZnNldFBhcmVudCB3aXRoIHdpbmRvdyBhYm92ZSwgYnV0IEZsb3cgZG9lc24ndCBkZXRlY3QgaXRcblxuXG4gICAgb2Zmc2V0UGFyZW50ID0gb2Zmc2V0UGFyZW50O1xuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gdG9wIHx8IChwbGFjZW1lbnQgPT09IGxlZnQgfHwgcGxhY2VtZW50ID09PSByaWdodCkgJiYgdmFyaWF0aW9uID09PSBlbmQpIHtcbiAgICAgIHNpZGVZID0gYm90dG9tO1xuICAgICAgdmFyIG9mZnNldFkgPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC5oZWlnaHQgOiAvLyAkRmxvd0ZpeE1lW3Byb3AtbWlzc2luZ11cbiAgICAgIG9mZnNldFBhcmVudFtoZWlnaHRQcm9wXTtcbiAgICAgIHkgLT0gb2Zmc2V0WSAtIHBvcHBlclJlY3QuaGVpZ2h0O1xuICAgICAgeSAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuXG4gICAgaWYgKHBsYWNlbWVudCA9PT0gbGVmdCB8fCAocGxhY2VtZW50ID09PSB0b3AgfHwgcGxhY2VtZW50ID09PSBib3R0b20pICYmIHZhcmlhdGlvbiA9PT0gZW5kKSB7XG4gICAgICBzaWRlWCA9IHJpZ2h0O1xuICAgICAgdmFyIG9mZnNldFggPSBpc0ZpeGVkICYmIG9mZnNldFBhcmVudCA9PT0gd2luICYmIHdpbi52aXN1YWxWaWV3cG9ydCA/IHdpbi52aXN1YWxWaWV3cG9ydC53aWR0aCA6IC8vICRGbG93Rml4TWVbcHJvcC1taXNzaW5nXVxuICAgICAgb2Zmc2V0UGFyZW50W3dpZHRoUHJvcF07XG4gICAgICB4IC09IG9mZnNldFggLSBwb3BwZXJSZWN0LndpZHRoO1xuICAgICAgeCAqPSBncHVBY2NlbGVyYXRpb24gPyAxIDogLTE7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbW1vblN0eWxlcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgIHBvc2l0aW9uOiBwb3NpdGlvblxuICB9LCBhZGFwdGl2ZSAmJiB1bnNldFNpZGVzKTtcblxuICB2YXIgX3JlZjQgPSByb3VuZE9mZnNldHMgPT09IHRydWUgPyByb3VuZE9mZnNldHNCeURQUih7XG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH0sIGdldFdpbmRvdyhwb3BwZXIpKSA6IHtcbiAgICB4OiB4LFxuICAgIHk6IHlcbiAgfTtcblxuICB4ID0gX3JlZjQueDtcbiAgeSA9IF9yZWY0Lnk7XG5cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbikge1xuICAgIHZhciBfT2JqZWN0JGFzc2lnbjtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIChfT2JqZWN0JGFzc2lnbiA9IHt9LCBfT2JqZWN0JGFzc2lnbltzaWRlWV0gPSBoYXNZID8gJzAnIDogJycsIF9PYmplY3QkYXNzaWduW3NpZGVYXSA9IGhhc1ggPyAnMCcgOiAnJywgX09iamVjdCRhc3NpZ24udHJhbnNmb3JtID0gKHdpbi5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpIDw9IDEgPyBcInRyYW5zbGF0ZShcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4KVwiIDogXCJ0cmFuc2xhdGUzZChcIiArIHggKyBcInB4LCBcIiArIHkgKyBcInB4LCAwKVwiLCBfT2JqZWN0JGFzc2lnbikpO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGNvbW1vblN0eWxlcywgKF9PYmplY3QkYXNzaWduMiA9IHt9LCBfT2JqZWN0JGFzc2lnbjJbc2lkZVldID0gaGFzWSA/IHkgKyBcInB4XCIgOiAnJywgX09iamVjdCRhc3NpZ24yW3NpZGVYXSA9IGhhc1ggPyB4ICsgXCJweFwiIDogJycsIF9PYmplY3QkYXNzaWduMi50cmFuc2Zvcm0gPSAnJywgX09iamVjdCRhc3NpZ24yKSk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVTdHlsZXMoX3JlZjUpIHtcbiAgdmFyIHN0YXRlID0gX3JlZjUuc3RhdGUsXG4gICAgICBvcHRpb25zID0gX3JlZjUub3B0aW9ucztcbiAgdmFyIF9vcHRpb25zJGdwdUFjY2VsZXJhdCA9IG9wdGlvbnMuZ3B1QWNjZWxlcmF0aW9uLFxuICAgICAgZ3B1QWNjZWxlcmF0aW9uID0gX29wdGlvbnMkZ3B1QWNjZWxlcmF0ID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkZ3B1QWNjZWxlcmF0LFxuICAgICAgX29wdGlvbnMkYWRhcHRpdmUgPSBvcHRpb25zLmFkYXB0aXZlLFxuICAgICAgYWRhcHRpdmUgPSBfb3B0aW9ucyRhZGFwdGl2ZSA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFkYXB0aXZlLFxuICAgICAgX29wdGlvbnMkcm91bmRPZmZzZXRzID0gb3B0aW9ucy5yb3VuZE9mZnNldHMsXG4gICAgICByb3VuZE9mZnNldHMgPSBfb3B0aW9ucyRyb3VuZE9mZnNldHMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRyb3VuZE9mZnNldHM7XG4gIHZhciBjb21tb25TdHlsZXMgPSB7XG4gICAgcGxhY2VtZW50OiBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCksXG4gICAgdmFyaWF0aW9uOiBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KSxcbiAgICBwb3BwZXI6IHN0YXRlLmVsZW1lbnRzLnBvcHBlcixcbiAgICBwb3BwZXJSZWN0OiBzdGF0ZS5yZWN0cy5wb3BwZXIsXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiBncHVBY2NlbGVyYXRpb24sXG4gICAgaXNGaXhlZDogc3RhdGUub3B0aW9ucy5zdHJhdGVneSA9PT0gJ2ZpeGVkJ1xuICB9O1xuXG4gIGlmIChzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5zdHlsZXMucG9wcGVyLCBtYXBUb1N0eWxlcyhPYmplY3QuYXNzaWduKHt9LCBjb21tb25TdHlsZXMsIHtcbiAgICAgIG9mZnNldHM6IHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyxcbiAgICAgIHBvc2l0aW9uOiBzdGF0ZS5vcHRpb25zLnN0cmF0ZWd5LFxuICAgICAgYWRhcHRpdmU6IGFkYXB0aXZlLFxuICAgICAgcm91bmRPZmZzZXRzOiByb3VuZE9mZnNldHNcbiAgICB9KSkpO1xuICB9XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEuYXJyb3cgIT0gbnVsbCkge1xuICAgIHN0YXRlLnN0eWxlcy5hcnJvdyA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLnN0eWxlcy5hcnJvdywgbWFwVG9TdHlsZXMoT2JqZWN0LmFzc2lnbih7fSwgY29tbW9uU3R5bGVzLCB7XG4gICAgICBvZmZzZXRzOiBzdGF0ZS5tb2RpZmllcnNEYXRhLmFycm93LFxuICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICBhZGFwdGl2ZTogZmFsc2UsXG4gICAgICByb3VuZE9mZnNldHM6IHJvdW5kT2Zmc2V0c1xuICAgIH0pKSk7XG4gIH1cblxuICBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciA9IE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLmF0dHJpYnV0ZXMucG9wcGVyLCB7XG4gICAgJ2RhdGEtcG9wcGVyLXBsYWNlbWVudCc6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ2NvbXB1dGVTdHlsZXMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ2JlZm9yZVdyaXRlJyxcbiAgZm46IGNvbXB1dGVTdHlsZXMsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRXaW5kb3cgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRXaW5kb3cuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG52YXIgcGFzc2l2ZSA9IHtcbiAgcGFzc2l2ZTogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZWZmZWN0KF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIGluc3RhbmNlID0gX3JlZi5pbnN0YW5jZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmLm9wdGlvbnM7XG4gIHZhciBfb3B0aW9ucyRzY3JvbGwgPSBvcHRpb25zLnNjcm9sbCxcbiAgICAgIHNjcm9sbCA9IF9vcHRpb25zJHNjcm9sbCA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHNjcm9sbCxcbiAgICAgIF9vcHRpb25zJHJlc2l6ZSA9IG9wdGlvbnMucmVzaXplLFxuICAgICAgcmVzaXplID0gX29wdGlvbnMkcmVzaXplID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkcmVzaXplO1xuICB2YXIgd2luZG93ID0gZ2V0V2luZG93KHN0YXRlLmVsZW1lbnRzLnBvcHBlcik7XG4gIHZhciBzY3JvbGxQYXJlbnRzID0gW10uY29uY2F0KHN0YXRlLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLCBzdGF0ZS5zY3JvbGxQYXJlbnRzLnBvcHBlcik7XG5cbiAgaWYgKHNjcm9sbCkge1xuICAgIHNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAoc2Nyb2xsUGFyZW50KSB7XG4gICAgICBzY3JvbGxQYXJlbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyZXNpemUpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHNjcm9sbCkge1xuICAgICAgc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChzY3JvbGxQYXJlbnQpIHtcbiAgICAgICAgc2Nyb2xsUGFyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGluc3RhbmNlLnVwZGF0ZSwgcGFzc2l2ZSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVzaXplKSB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaW5zdGFuY2UudXBkYXRlLCBwYXNzaXZlKTtcbiAgICB9XG4gIH07XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdldmVudExpc3RlbmVycycsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnd3JpdGUnLFxuICBmbjogZnVuY3Rpb24gZm4oKSB7fSxcbiAgZWZmZWN0OiBlZmZlY3QsXG4gIGRhdGE6IHt9XG59OyIsImltcG9ydCBnZXRPcHBvc2l0ZVBsYWNlbWVudCBmcm9tIFwiLi4vdXRpbHMvZ2V0T3Bwb3NpdGVQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZGV0ZWN0T3ZlcmZsb3cgZnJvbSBcIi4uL3V0aWxzL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgY29tcHV0ZUF1dG9QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2NvbXB1dGVBdXRvUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyBib3R0b20sIHRvcCwgc3RhcnQsIHJpZ2h0LCBsZWZ0LCBhdXRvIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuLi91dGlscy9nZXRWYXJpYXRpb24uanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5mdW5jdGlvbiBnZXRFeHBhbmRlZEZhbGxiYWNrUGxhY2VtZW50cyhwbGFjZW1lbnQpIHtcbiAgaWYgKGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0bykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBvcHBvc2l0ZVBsYWNlbWVudCA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG4gIHJldHVybiBbZ2V0T3Bwb3NpdGVWYXJpYXRpb25QbGFjZW1lbnQocGxhY2VtZW50KSwgb3Bwb3NpdGVQbGFjZW1lbnQsIGdldE9wcG9zaXRlVmFyaWF0aW9uUGxhY2VtZW50KG9wcG9zaXRlUGxhY2VtZW50KV07XG59XG5cbmZ1bmN0aW9uIGZsaXAoX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGFbbmFtZV0uX3NraXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX29wdGlvbnMkbWFpbkF4aXMgPSBvcHRpb25zLm1haW5BeGlzLFxuICAgICAgY2hlY2tNYWluQXhpcyA9IF9vcHRpb25zJG1haW5BeGlzID09PSB2b2lkIDAgPyB0cnVlIDogX29wdGlvbnMkbWFpbkF4aXMsXG4gICAgICBfb3B0aW9ucyRhbHRBeGlzID0gb3B0aW9ucy5hbHRBeGlzLFxuICAgICAgY2hlY2tBbHRBeGlzID0gX29wdGlvbnMkYWx0QXhpcyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBzcGVjaWZpZWRGYWxsYmFja1BsYWNlbWVudHMgPSBvcHRpb25zLmZhbGxiYWNrUGxhY2VtZW50cyxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9IG9wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBmbGlwVmFyaWF0aW9ucyA9IF9vcHRpb25zJGZsaXBWYXJpYXRpbyA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJGZsaXBWYXJpYXRpbyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50cyA9IG9wdGlvbnMuYWxsb3dlZEF1dG9QbGFjZW1lbnRzO1xuICB2YXIgcHJlZmVycmVkUGxhY2VtZW50ID0gc3RhdGUub3B0aW9ucy5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwcmVmZXJyZWRQbGFjZW1lbnQpO1xuICB2YXIgaXNCYXNlUGxhY2VtZW50ID0gYmFzZVBsYWNlbWVudCA9PT0gcHJlZmVycmVkUGxhY2VtZW50O1xuICB2YXIgZmFsbGJhY2tQbGFjZW1lbnRzID0gc3BlY2lmaWVkRmFsbGJhY2tQbGFjZW1lbnRzIHx8IChpc0Jhc2VQbGFjZW1lbnQgfHwgIWZsaXBWYXJpYXRpb25zID8gW2dldE9wcG9zaXRlUGxhY2VtZW50KHByZWZlcnJlZFBsYWNlbWVudCldIDogZ2V0RXhwYW5kZWRGYWxsYmFja1BsYWNlbWVudHMocHJlZmVycmVkUGxhY2VtZW50KSk7XG4gIHZhciBwbGFjZW1lbnRzID0gW3ByZWZlcnJlZFBsYWNlbWVudF0uY29uY2F0KGZhbGxiYWNrUGxhY2VtZW50cykucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIHJldHVybiBhY2MuY29uY2F0KGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KSA9PT0gYXV0byA/IGNvbXB1dGVBdXRvUGxhY2VtZW50KHN0YXRlLCB7XG4gICAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICAgIHJvb3RCb3VuZGFyeTogcm9vdEJvdW5kYXJ5LFxuICAgICAgcGFkZGluZzogcGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zOiBmbGlwVmFyaWF0aW9ucyxcbiAgICAgIGFsbG93ZWRBdXRvUGxhY2VtZW50czogYWxsb3dlZEF1dG9QbGFjZW1lbnRzXG4gICAgfSkgOiBwbGFjZW1lbnQpO1xuICB9LCBbXSk7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIGNoZWNrc01hcCA9IG5ldyBNYXAoKTtcbiAgdmFyIG1ha2VGYWxsYmFja0NoZWNrcyA9IHRydWU7XG4gIHZhciBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBwbGFjZW1lbnRzWzBdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhY2VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwbGFjZW1lbnQgPSBwbGFjZW1lbnRzW2ldO1xuXG4gICAgdmFyIF9iYXNlUGxhY2VtZW50ID0gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIGlzU3RhcnRWYXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KSA9PT0gc3RhcnQ7XG4gICAgdmFyIGlzVmVydGljYWwgPSBbdG9wLCBib3R0b21dLmluZGV4T2YoX2Jhc2VQbGFjZW1lbnQpID49IDA7XG4gICAgdmFyIGxlbiA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgdmFyIG92ZXJmbG93ID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBhbHRCb3VuZGFyeTogYWx0Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSk7XG4gICAgdmFyIG1haW5WYXJpYXRpb25TaWRlID0gaXNWZXJ0aWNhbCA/IGlzU3RhcnRWYXJpYXRpb24gPyByaWdodCA6IGxlZnQgOiBpc1N0YXJ0VmFyaWF0aW9uID8gYm90dG9tIDogdG9wO1xuXG4gICAgaWYgKHJlZmVyZW5jZVJlY3RbbGVuXSA+IHBvcHBlclJlY3RbbGVuXSkge1xuICAgICAgbWFpblZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgfVxuXG4gICAgdmFyIGFsdFZhcmlhdGlvblNpZGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChtYWluVmFyaWF0aW9uU2lkZSk7XG4gICAgdmFyIGNoZWNrcyA9IFtdO1xuXG4gICAgaWYgKGNoZWNrTWFpbkF4aXMpIHtcbiAgICAgIGNoZWNrcy5wdXNoKG92ZXJmbG93W19iYXNlUGxhY2VtZW50XSA8PSAwKTtcbiAgICB9XG5cbiAgICBpZiAoY2hlY2tBbHRBeGlzKSB7XG4gICAgICBjaGVja3MucHVzaChvdmVyZmxvd1ttYWluVmFyaWF0aW9uU2lkZV0gPD0gMCwgb3ZlcmZsb3dbYWx0VmFyaWF0aW9uU2lkZV0gPD0gMCk7XG4gICAgfVxuXG4gICAgaWYgKGNoZWNrcy5ldmVyeShmdW5jdGlvbiAoY2hlY2spIHtcbiAgICAgIHJldHVybiBjaGVjaztcbiAgICB9KSkge1xuICAgICAgZmlyc3RGaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50O1xuICAgICAgbWFrZUZhbGxiYWNrQ2hlY2tzID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjaGVja3NNYXAuc2V0KHBsYWNlbWVudCwgY2hlY2tzKTtcbiAgfVxuXG4gIGlmIChtYWtlRmFsbGJhY2tDaGVja3MpIHtcbiAgICAvLyBgMmAgbWF5IGJlIGRlc2lyZWQgaW4gc29tZSBjYXNlcyDigJMgcmVzZWFyY2ggbGF0ZXJcbiAgICB2YXIgbnVtYmVyT2ZDaGVja3MgPSBmbGlwVmFyaWF0aW9ucyA/IDMgOiAxO1xuXG4gICAgdmFyIF9sb29wID0gZnVuY3Rpb24gX2xvb3AoX2kpIHtcbiAgICAgIHZhciBmaXR0aW5nUGxhY2VtZW50ID0gcGxhY2VtZW50cy5maW5kKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICAgICAgdmFyIGNoZWNrcyA9IGNoZWNrc01hcC5nZXQocGxhY2VtZW50KTtcblxuICAgICAgICBpZiAoY2hlY2tzKSB7XG4gICAgICAgICAgcmV0dXJuIGNoZWNrcy5zbGljZSgwLCBfaSkuZXZlcnkoZnVuY3Rpb24gKGNoZWNrKSB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2s7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZml0dGluZ1BsYWNlbWVudCkge1xuICAgICAgICBmaXJzdEZpdHRpbmdQbGFjZW1lbnQgPSBmaXR0aW5nUGxhY2VtZW50O1xuICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmb3IgKHZhciBfaSA9IG51bWJlck9mQ2hlY2tzOyBfaSA+IDA7IF9pLS0pIHtcbiAgICAgIHZhciBfcmV0ID0gX2xvb3AoX2kpO1xuXG4gICAgICBpZiAoX3JldCA9PT0gXCJicmVha1wiKSBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhdGUucGxhY2VtZW50ICE9PSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQpIHtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdLl9za2lwID0gdHJ1ZTtcbiAgICBzdGF0ZS5wbGFjZW1lbnQgPSBmaXJzdEZpdHRpbmdQbGFjZW1lbnQ7XG4gICAgc3RhdGUucmVzZXQgPSB0cnVlO1xuICB9XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdmbGlwJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgcGhhc2U6ICdtYWluJyxcbiAgZm46IGZsaXAsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsnb2Zmc2V0J10sXG4gIGRhdGE6IHtcbiAgICBfc2tpcDogZmFsc2VcbiAgfVxufTsiLCJpbXBvcnQgeyB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQgfSBmcm9tIFwiLi4vZW51bXMuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcblxuZnVuY3Rpb24gZ2V0U2lkZU9mZnNldHMob3ZlcmZsb3csIHJlY3QsIHByZXZlbnRlZE9mZnNldHMpIHtcbiAgaWYgKHByZXZlbnRlZE9mZnNldHMgPT09IHZvaWQgMCkge1xuICAgIHByZXZlbnRlZE9mZnNldHMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRvcDogb3ZlcmZsb3cudG9wIC0gcmVjdC5oZWlnaHQgLSBwcmV2ZW50ZWRPZmZzZXRzLnksXG4gICAgcmlnaHQ6IG92ZXJmbG93LnJpZ2h0IC0gcmVjdC53aWR0aCArIHByZXZlbnRlZE9mZnNldHMueCxcbiAgICBib3R0b206IG92ZXJmbG93LmJvdHRvbSAtIHJlY3QuaGVpZ2h0ICsgcHJldmVudGVkT2Zmc2V0cy55LFxuICAgIGxlZnQ6IG92ZXJmbG93LmxlZnQgLSByZWN0LndpZHRoIC0gcHJldmVudGVkT2Zmc2V0cy54XG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzQW55U2lkZUZ1bGx5Q2xpcHBlZChvdmVyZmxvdykge1xuICByZXR1cm4gW3RvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdF0uc29tZShmdW5jdGlvbiAoc2lkZSkge1xuICAgIHJldHVybiBvdmVyZmxvd1tzaWRlXSA+PSAwO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZShfcmVmKSB7XG4gIHZhciBzdGF0ZSA9IF9yZWYuc3RhdGUsXG4gICAgICBuYW1lID0gX3JlZi5uYW1lO1xuICB2YXIgcmVmZXJlbmNlUmVjdCA9IHN0YXRlLnJlY3RzLnJlZmVyZW5jZTtcbiAgdmFyIHBvcHBlclJlY3QgPSBzdGF0ZS5yZWN0cy5wb3BwZXI7XG4gIHZhciBwcmV2ZW50ZWRPZmZzZXRzID0gc3RhdGUubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3c7XG4gIHZhciByZWZlcmVuY2VPdmVyZmxvdyA9IGRldGVjdE92ZXJmbG93KHN0YXRlLCB7XG4gICAgZWxlbWVudENvbnRleHQ6ICdyZWZlcmVuY2UnXG4gIH0pO1xuICB2YXIgcG9wcGVyQWx0T3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGFsdEJvdW5kYXJ5OiB0cnVlXG4gIH0pO1xuICB2YXIgcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzID0gZ2V0U2lkZU9mZnNldHMocmVmZXJlbmNlT3ZlcmZsb3csIHJlZmVyZW5jZVJlY3QpO1xuICB2YXIgcG9wcGVyRXNjYXBlT2Zmc2V0cyA9IGdldFNpZGVPZmZzZXRzKHBvcHBlckFsdE92ZXJmbG93LCBwb3BwZXJSZWN0LCBwcmV2ZW50ZWRPZmZzZXRzKTtcbiAgdmFyIGlzUmVmZXJlbmNlSGlkZGVuID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0cyk7XG4gIHZhciBoYXNQb3BwZXJFc2NhcGVkID0gaXNBbnlTaWRlRnVsbHlDbGlwcGVkKHBvcHBlckVzY2FwZU9mZnNldHMpO1xuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0ge1xuICAgIHJlZmVyZW5jZUNsaXBwaW5nT2Zmc2V0czogcmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzLFxuICAgIHBvcHBlckVzY2FwZU9mZnNldHM6IHBvcHBlckVzY2FwZU9mZnNldHMsXG4gICAgaXNSZWZlcmVuY2VIaWRkZW46IGlzUmVmZXJlbmNlSGlkZGVuLFxuICAgIGhhc1BvcHBlckVzY2FwZWQ6IGhhc1BvcHBlckVzY2FwZWRcbiAgfTtcbiAgc3RhdGUuYXR0cmlidXRlcy5wb3BwZXIgPSBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5hdHRyaWJ1dGVzLnBvcHBlciwge1xuICAgICdkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuJzogaXNSZWZlcmVuY2VIaWRkZW4sXG4gICAgJ2RhdGEtcG9wcGVyLWVzY2FwZWQnOiBoYXNQb3BwZXJFc2NhcGVkXG4gIH0pO1xufSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnaGlkZScsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIHBoYXNlOiAnbWFpbicsXG4gIHJlcXVpcmVzSWZFeGlzdHM6IFsncHJldmVudE92ZXJmbG93J10sXG4gIGZuOiBoaWRlXG59OyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgYXBwbHlTdHlsZXMgfSBmcm9tIFwiLi9hcHBseVN0eWxlcy5qc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJvdyB9IGZyb20gXCIuL2Fycm93LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbXB1dGVTdHlsZXMgfSBmcm9tIFwiLi9jb21wdXRlU3R5bGVzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGV2ZW50TGlzdGVuZXJzIH0gZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmxpcCB9IGZyb20gXCIuL2ZsaXAuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgaGlkZSB9IGZyb20gXCIuL2hpZGUuanNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgb2Zmc2V0IH0gZnJvbSBcIi4vb2Zmc2V0LmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHBvcHBlck9mZnNldHMgfSBmcm9tIFwiLi9wb3BwZXJPZmZzZXRzLmpzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHByZXZlbnRPdmVyZmxvdyB9IGZyb20gXCIuL3ByZXZlbnRPdmVyZmxvdy5qc1wiOyIsImltcG9ydCBnZXRCYXNlUGxhY2VtZW50IGZyb20gXCIuLi91dGlscy9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgeyB0b3AsIGxlZnQsIHJpZ2h0LCBwbGFjZW1lbnRzIH0gZnJvbSBcIi4uL2VudW1zLmpzXCI7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3RhbmNlQW5kU2tpZGRpbmdUb1hZKHBsYWNlbWVudCwgcmVjdHMsIG9mZnNldCkge1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IGdldEJhc2VQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIGludmVydERpc3RhbmNlID0gW2xlZnQsIHRvcF0uaW5kZXhPZihiYXNlUGxhY2VtZW50KSA+PSAwID8gLTEgOiAxO1xuXG4gIHZhciBfcmVmID0gdHlwZW9mIG9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IG9mZnNldChPYmplY3QuYXNzaWduKHt9LCByZWN0cywge1xuICAgIHBsYWNlbWVudDogcGxhY2VtZW50XG4gIH0pKSA6IG9mZnNldCxcbiAgICAgIHNraWRkaW5nID0gX3JlZlswXSxcbiAgICAgIGRpc3RhbmNlID0gX3JlZlsxXTtcblxuICBza2lkZGluZyA9IHNraWRkaW5nIHx8IDA7XG4gIGRpc3RhbmNlID0gKGRpc3RhbmNlIHx8IDApICogaW52ZXJ0RGlzdGFuY2U7XG4gIHJldHVybiBbbGVmdCwgcmlnaHRdLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPj0gMCA/IHtcbiAgICB4OiBkaXN0YW5jZSxcbiAgICB5OiBza2lkZGluZ1xuICB9IDoge1xuICAgIHg6IHNraWRkaW5nLFxuICAgIHk6IGRpc3RhbmNlXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9mZnNldChfcmVmMikge1xuICB2YXIgc3RhdGUgPSBfcmVmMi5zdGF0ZSxcbiAgICAgIG9wdGlvbnMgPSBfcmVmMi5vcHRpb25zLFxuICAgICAgbmFtZSA9IF9yZWYyLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRvZmZzZXQgPSBvcHRpb25zLm9mZnNldCxcbiAgICAgIG9mZnNldCA9IF9vcHRpb25zJG9mZnNldCA9PT0gdm9pZCAwID8gWzAsIDBdIDogX29wdGlvbnMkb2Zmc2V0O1xuICB2YXIgZGF0YSA9IHBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGlzdGFuY2VBbmRTa2lkZGluZ1RvWFkocGxhY2VtZW50LCBzdGF0ZS5yZWN0cywgb2Zmc2V0KTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHZhciBfZGF0YSRzdGF0ZSRwbGFjZW1lbnQgPSBkYXRhW3N0YXRlLnBsYWNlbWVudF0sXG4gICAgICB4ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50LngsXG4gICAgICB5ID0gX2RhdGEkc3RhdGUkcGxhY2VtZW50Lnk7XG5cbiAgaWYgKHN0YXRlLm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyAhPSBudWxsKSB7XG4gICAgc3RhdGUubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLnggKz0geDtcbiAgICBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSArPSB5O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdvZmZzZXQnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICByZXF1aXJlczogWydwb3BwZXJPZmZzZXRzJ10sXG4gIGZuOiBvZmZzZXRcbn07IiwiaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuLi91dGlscy9jb21wdXRlT2Zmc2V0cy5qc1wiO1xuXG5mdW5jdGlvbiBwb3BwZXJPZmZzZXRzKF9yZWYpIHtcbiAgdmFyIHN0YXRlID0gX3JlZi5zdGF0ZSxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIC8vIE9mZnNldHMgYXJlIHRoZSBhY3R1YWwgcG9zaXRpb24gdGhlIHBvcHBlciBuZWVkcyB0byBoYXZlIHRvIGJlXG4gIC8vIHByb3Blcmx5IHBvc2l0aW9uZWQgbmVhciBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVGhpcyBpcyB0aGUgbW9zdCBiYXNpYyBwbGFjZW1lbnQsIGFuZCB3aWxsIGJlIGFkanVzdGVkIGJ5XG4gIC8vIHRoZSBtb2RpZmllcnMgaW4gdGhlIG5leHQgc3RlcFxuICBzdGF0ZS5tb2RpZmllcnNEYXRhW25hbWVdID0gY29tcHV0ZU9mZnNldHMoe1xuICAgIHJlZmVyZW5jZTogc3RhdGUucmVjdHMucmVmZXJlbmNlLFxuICAgIGVsZW1lbnQ6IHN0YXRlLnJlY3RzLnBvcHBlcixcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHN0YXRlLnBsYWNlbWVudFxuICB9KTtcbn0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJ3BvcHBlck9mZnNldHMnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ3JlYWQnLFxuICBmbjogcG9wcGVyT2Zmc2V0cyxcbiAgZGF0YToge31cbn07IiwiaW1wb3J0IHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCBzdGFydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGdldEJhc2VQbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldEJhc2VQbGFjZW1lbnQuanNcIjtcbmltcG9ydCBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQgZnJvbSBcIi4uL3V0aWxzL2dldE1haW5BeGlzRnJvbVBsYWNlbWVudC5qc1wiO1xuaW1wb3J0IGdldEFsdEF4aXMgZnJvbSBcIi4uL3V0aWxzL2dldEFsdEF4aXMuanNcIjtcbmltcG9ydCB7IHdpdGhpbiwgd2l0aGluTWF4Q2xhbXAgfSBmcm9tIFwiLi4vdXRpbHMvd2l0aGluLmpzXCI7XG5pbXBvcnQgZ2V0TGF5b3V0UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldExheW91dFJlY3QuanNcIjtcbmltcG9ydCBnZXRPZmZzZXRQYXJlbnQgZnJvbSBcIi4uL2RvbS11dGlscy9nZXRPZmZzZXRQYXJlbnQuanNcIjtcbmltcG9ydCBkZXRlY3RPdmVyZmxvdyBmcm9tIFwiLi4vdXRpbHMvZGV0ZWN0T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBnZXRWYXJpYXRpb24gZnJvbSBcIi4uL3V0aWxzL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldEZyZXNoU2lkZU9iamVjdCBmcm9tIFwiLi4vdXRpbHMvZ2V0RnJlc2hTaWRlT2JqZWN0LmpzXCI7XG5pbXBvcnQgeyBtaW4gYXMgbWF0aE1pbiwgbWF4IGFzIG1hdGhNYXggfSBmcm9tIFwiLi4vdXRpbHMvbWF0aC5qc1wiO1xuXG5mdW5jdGlvbiBwcmV2ZW50T3ZlcmZsb3coX3JlZikge1xuICB2YXIgc3RhdGUgPSBfcmVmLnN0YXRlLFxuICAgICAgb3B0aW9ucyA9IF9yZWYub3B0aW9ucyxcbiAgICAgIG5hbWUgPSBfcmVmLm5hbWU7XG4gIHZhciBfb3B0aW9ucyRtYWluQXhpcyA9IG9wdGlvbnMubWFpbkF4aXMsXG4gICAgICBjaGVja01haW5BeGlzID0gX29wdGlvbnMkbWFpbkF4aXMgPT09IHZvaWQgMCA/IHRydWUgOiBfb3B0aW9ucyRtYWluQXhpcyxcbiAgICAgIF9vcHRpb25zJGFsdEF4aXMgPSBvcHRpb25zLmFsdEF4aXMsXG4gICAgICBjaGVja0FsdEF4aXMgPSBfb3B0aW9ucyRhbHRBeGlzID09PSB2b2lkIDAgPyBmYWxzZSA6IF9vcHRpb25zJGFsdEF4aXMsXG4gICAgICBib3VuZGFyeSA9IG9wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBvcHRpb25zLnJvb3RCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIHBhZGRpbmcgPSBvcHRpb25zLnBhZGRpbmcsXG4gICAgICBfb3B0aW9ucyR0ZXRoZXIgPSBvcHRpb25zLnRldGhlcixcbiAgICAgIHRldGhlciA9IF9vcHRpb25zJHRldGhlciA9PT0gdm9pZCAwID8gdHJ1ZSA6IF9vcHRpb25zJHRldGhlcixcbiAgICAgIF9vcHRpb25zJHRldGhlck9mZnNldCA9IG9wdGlvbnMudGV0aGVyT2Zmc2V0LFxuICAgICAgdGV0aGVyT2Zmc2V0ID0gX29wdGlvbnMkdGV0aGVyT2Zmc2V0ID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkdGV0aGVyT2Zmc2V0O1xuICB2YXIgb3ZlcmZsb3cgPSBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwge1xuICAgIGJvdW5kYXJ5OiBib3VuZGFyeSxcbiAgICByb290Qm91bmRhcnk6IHJvb3RCb3VuZGFyeSxcbiAgICBwYWRkaW5nOiBwYWRkaW5nLFxuICAgIGFsdEJvdW5kYXJ5OiBhbHRCb3VuZGFyeVxuICB9KTtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBnZXRCYXNlUGxhY2VtZW50KHN0YXRlLnBsYWNlbWVudCk7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24oc3RhdGUucGxhY2VtZW50KTtcbiAgdmFyIGlzQmFzZVBsYWNlbWVudCA9ICF2YXJpYXRpb247XG4gIHZhciBtYWluQXhpcyA9IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudChiYXNlUGxhY2VtZW50KTtcbiAgdmFyIGFsdEF4aXMgPSBnZXRBbHRBeGlzKG1haW5BeGlzKTtcbiAgdmFyIHBvcHBlck9mZnNldHMgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHM7XG4gIHZhciByZWZlcmVuY2VSZWN0ID0gc3RhdGUucmVjdHMucmVmZXJlbmNlO1xuICB2YXIgcG9wcGVyUmVjdCA9IHN0YXRlLnJlY3RzLnBvcHBlcjtcbiAgdmFyIHRldGhlck9mZnNldFZhbHVlID0gdHlwZW9mIHRldGhlck9mZnNldCA9PT0gJ2Z1bmN0aW9uJyA/IHRldGhlck9mZnNldChPYmplY3QuYXNzaWduKHt9LCBzdGF0ZS5yZWN0cywge1xuICAgIHBsYWNlbWVudDogc3RhdGUucGxhY2VtZW50XG4gIH0pKSA6IHRldGhlck9mZnNldDtcbiAgdmFyIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZSA9IHR5cGVvZiB0ZXRoZXJPZmZzZXRWYWx1ZSA9PT0gJ251bWJlcicgPyB7XG4gICAgbWFpbkF4aXM6IHRldGhlck9mZnNldFZhbHVlLFxuICAgIGFsdEF4aXM6IHRldGhlck9mZnNldFZhbHVlXG4gIH0gOiBPYmplY3QuYXNzaWduKHtcbiAgICBtYWluQXhpczogMCxcbiAgICBhbHRBeGlzOiAwXG4gIH0sIHRldGhlck9mZnNldFZhbHVlKTtcbiAgdmFyIG9mZnNldE1vZGlmaWVyU3RhdGUgPSBzdGF0ZS5tb2RpZmllcnNEYXRhLm9mZnNldCA/IHN0YXRlLm1vZGlmaWVyc0RhdGEub2Zmc2V0W3N0YXRlLnBsYWNlbWVudF0gOiBudWxsO1xuICB2YXIgZGF0YSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcblxuICBpZiAoIXBvcHBlck9mZnNldHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2hlY2tNYWluQXhpcykge1xuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQ7XG5cbiAgICB2YXIgbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3knID8gdG9wIDogbGVmdDtcbiAgICB2YXIgYWx0U2lkZSA9IG1haW5BeGlzID09PSAneScgPyBib3R0b20gOiByaWdodDtcbiAgICB2YXIgbGVuID0gbWFpbkF4aXMgPT09ICd5JyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1ttYWluQXhpc107XG4gICAgdmFyIG1pbiA9IG9mZnNldCArIG92ZXJmbG93W21haW5TaWRlXTtcbiAgICB2YXIgbWF4ID0gb2Zmc2V0IC0gb3ZlcmZsb3dbYWx0U2lkZV07XG4gICAgdmFyIGFkZGl0aXZlID0gdGV0aGVyID8gLXBvcHBlclJlY3RbbGVuXSAvIDIgOiAwO1xuICAgIHZhciBtaW5MZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gcmVmZXJlbmNlUmVjdFtsZW5dIDogcG9wcGVyUmVjdFtsZW5dO1xuICAgIHZhciBtYXhMZW4gPSB2YXJpYXRpb24gPT09IHN0YXJ0ID8gLXBvcHBlclJlY3RbbGVuXSA6IC1yZWZlcmVuY2VSZWN0W2xlbl07IC8vIFdlIG5lZWQgdG8gaW5jbHVkZSB0aGUgYXJyb3cgaW4gdGhlIGNhbGN1bGF0aW9uIHNvIHRoZSBhcnJvdyBkb2Vzbid0IGdvXG4gICAgLy8gb3V0c2lkZSB0aGUgcmVmZXJlbmNlIGJvdW5kc1xuXG4gICAgdmFyIGFycm93RWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzLmFycm93O1xuICAgIHZhciBhcnJvd1JlY3QgPSB0ZXRoZXIgJiYgYXJyb3dFbGVtZW50ID8gZ2V0TGF5b3V0UmVjdChhcnJvd0VsZW1lbnQpIDoge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDBcbiAgICB9O1xuICAgIHZhciBhcnJvd1BhZGRpbmdPYmplY3QgPSBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10gPyBzdGF0ZS5tb2RpZmllcnNEYXRhWydhcnJvdyNwZXJzaXN0ZW50J10ucGFkZGluZyA6IGdldEZyZXNoU2lkZU9iamVjdCgpO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNaW4gPSBhcnJvd1BhZGRpbmdPYmplY3RbbWFpblNpZGVdO1xuICAgIHZhciBhcnJvd1BhZGRpbmdNYXggPSBhcnJvd1BhZGRpbmdPYmplY3RbYWx0U2lkZV07IC8vIElmIHRoZSByZWZlcmVuY2UgbGVuZ3RoIGlzIHNtYWxsZXIgdGhhbiB0aGUgYXJyb3cgbGVuZ3RoLCB3ZSBkb24ndCB3YW50XG4gICAgLy8gdG8gaW5jbHVkZSBpdHMgZnVsbCBzaXplIGluIHRoZSBjYWxjdWxhdGlvbi4gSWYgdGhlIHJlZmVyZW5jZSBpcyBzbWFsbFxuICAgIC8vIGFuZCBuZWFyIHRoZSBlZGdlIG9mIGEgYm91bmRhcnksIHRoZSBwb3BwZXIgY2FuIG92ZXJmbG93IGV2ZW4gaWYgdGhlXG4gICAgLy8gcmVmZXJlbmNlIGlzIG5vdCBvdmVyZmxvd2luZyBhcyB3ZWxsIChlLmcuIHZpcnR1YWwgZWxlbWVudHMgd2l0aCBub1xuICAgIC8vIHdpZHRoIG9yIGhlaWdodClcblxuICAgIHZhciBhcnJvd0xlbiA9IHdpdGhpbigwLCByZWZlcmVuY2VSZWN0W2xlbl0sIGFycm93UmVjdFtsZW5dKTtcbiAgICB2YXIgbWluT2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gcmVmZXJlbmNlUmVjdFtsZW5dIC8gMiAtIGFkZGl0aXZlIC0gYXJyb3dMZW4gLSBhcnJvd1BhZGRpbmdNaW4gLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXMgOiBtaW5MZW4gLSBhcnJvd0xlbiAtIGFycm93UGFkZGluZ01pbiAtIG5vcm1hbGl6ZWRUZXRoZXJPZmZzZXRWYWx1ZS5tYWluQXhpcztcbiAgICB2YXIgbWF4T2Zmc2V0ID0gaXNCYXNlUGxhY2VtZW50ID8gLXJlZmVyZW5jZVJlY3RbbGVuXSAvIDIgKyBhZGRpdGl2ZSArIGFycm93TGVuICsgYXJyb3dQYWRkaW5nTWF4ICsgbm9ybWFsaXplZFRldGhlck9mZnNldFZhbHVlLm1haW5BeGlzIDogbWF4TGVuICsgYXJyb3dMZW4gKyBhcnJvd1BhZGRpbmdNYXggKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUubWFpbkF4aXM7XG4gICAgdmFyIGFycm93T2Zmc2V0UGFyZW50ID0gc3RhdGUuZWxlbWVudHMuYXJyb3cgJiYgZ2V0T2Zmc2V0UGFyZW50KHN0YXRlLmVsZW1lbnRzLmFycm93KTtcbiAgICB2YXIgY2xpZW50T2Zmc2V0ID0gYXJyb3dPZmZzZXRQYXJlbnQgPyBtYWluQXhpcyA9PT0gJ3knID8gYXJyb3dPZmZzZXRQYXJlbnQuY2xpZW50VG9wIHx8IDAgOiBhcnJvd09mZnNldFBhcmVudC5jbGllbnRMZWZ0IHx8IDAgOiAwO1xuICAgIHZhciBvZmZzZXRNb2RpZmllclZhbHVlID0gKF9vZmZzZXRNb2RpZmllclN0YXRlJCA9IG9mZnNldE1vZGlmaWVyU3RhdGUgPT0gbnVsbCA/IHZvaWQgMCA6IG9mZnNldE1vZGlmaWVyU3RhdGVbbWFpbkF4aXNdKSAhPSBudWxsID8gX29mZnNldE1vZGlmaWVyU3RhdGUkIDogMDtcbiAgICB2YXIgdGV0aGVyTWluID0gb2Zmc2V0ICsgbWluT2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZSAtIGNsaWVudE9mZnNldDtcbiAgICB2YXIgdGV0aGVyTWF4ID0gb2Zmc2V0ICsgbWF4T2Zmc2V0IC0gb2Zmc2V0TW9kaWZpZXJWYWx1ZTtcbiAgICB2YXIgcHJldmVudGVkT2Zmc2V0ID0gd2l0aGluKHRldGhlciA/IG1hdGhNaW4obWluLCB0ZXRoZXJNaW4pIDogbWluLCBvZmZzZXQsIHRldGhlciA/IG1hdGhNYXgobWF4LCB0ZXRoZXJNYXgpIDogbWF4KTtcbiAgICBwb3BwZXJPZmZzZXRzW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldDtcbiAgICBkYXRhW21haW5BeGlzXSA9IHByZXZlbnRlZE9mZnNldCAtIG9mZnNldDtcbiAgfVxuXG4gIGlmIChjaGVja0FsdEF4aXMpIHtcbiAgICB2YXIgX29mZnNldE1vZGlmaWVyU3RhdGUkMjtcblxuICAgIHZhciBfbWFpblNpZGUgPSBtYWluQXhpcyA9PT0gJ3gnID8gdG9wIDogbGVmdDtcblxuICAgIHZhciBfYWx0U2lkZSA9IG1haW5BeGlzID09PSAneCcgPyBib3R0b20gOiByaWdodDtcblxuICAgIHZhciBfb2Zmc2V0ID0gcG9wcGVyT2Zmc2V0c1thbHRBeGlzXTtcblxuICAgIHZhciBfbGVuID0gYWx0QXhpcyA9PT0gJ3knID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgdmFyIF9taW4gPSBfb2Zmc2V0ICsgb3ZlcmZsb3dbX21haW5TaWRlXTtcblxuICAgIHZhciBfbWF4ID0gX29mZnNldCAtIG92ZXJmbG93W19hbHRTaWRlXTtcblxuICAgIHZhciBpc09yaWdpblNpZGUgPSBbdG9wLCBsZWZ0XS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIHZhciBfb2Zmc2V0TW9kaWZpZXJWYWx1ZSA9IChfb2Zmc2V0TW9kaWZpZXJTdGF0ZSQyID0gb2Zmc2V0TW9kaWZpZXJTdGF0ZSA9PSBudWxsID8gdm9pZCAwIDogb2Zmc2V0TW9kaWZpZXJTdGF0ZVthbHRBeGlzXSkgIT0gbnVsbCA/IF9vZmZzZXRNb2RpZmllclN0YXRlJDIgOiAwO1xuXG4gICAgdmFyIF90ZXRoZXJNaW4gPSBpc09yaWdpblNpZGUgPyBfbWluIDogX29mZnNldCAtIHJlZmVyZW5jZVJlY3RbX2xlbl0gLSBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgKyBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcztcblxuICAgIHZhciBfdGV0aGVyTWF4ID0gaXNPcmlnaW5TaWRlID8gX29mZnNldCArIHJlZmVyZW5jZVJlY3RbX2xlbl0gKyBwb3BwZXJSZWN0W19sZW5dIC0gX29mZnNldE1vZGlmaWVyVmFsdWUgLSBub3JtYWxpemVkVGV0aGVyT2Zmc2V0VmFsdWUuYWx0QXhpcyA6IF9tYXg7XG5cbiAgICB2YXIgX3ByZXZlbnRlZE9mZnNldCA9IHRldGhlciAmJiBpc09yaWdpblNpZGUgPyB3aXRoaW5NYXhDbGFtcChfdGV0aGVyTWluLCBfb2Zmc2V0LCBfdGV0aGVyTWF4KSA6IHdpdGhpbih0ZXRoZXIgPyBfdGV0aGVyTWluIDogX21pbiwgX29mZnNldCwgdGV0aGVyID8gX3RldGhlck1heCA6IF9tYXgpO1xuXG4gICAgcG9wcGVyT2Zmc2V0c1thbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQ7XG4gICAgZGF0YVthbHRBeGlzXSA9IF9wcmV2ZW50ZWRPZmZzZXQgLSBfb2Zmc2V0O1xuICB9XG5cbiAgc3RhdGUubW9kaWZpZXJzRGF0YVtuYW1lXSA9IGRhdGE7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICdwcmV2ZW50T3ZlcmZsb3cnLFxuICBlbmFibGVkOiB0cnVlLFxuICBwaGFzZTogJ21haW4nLFxuICBmbjogcHJldmVudE92ZXJmbG93LFxuICByZXF1aXJlc0lmRXhpc3RzOiBbJ29mZnNldCddXG59OyIsImltcG9ydCB7IHBvcHBlckdlbmVyYXRvciwgZGV0ZWN0T3ZlcmZsb3cgfSBmcm9tIFwiLi9jcmVhdGVQb3BwZXIuanNcIjtcbmltcG9ydCBldmVudExpc3RlbmVycyBmcm9tIFwiLi9tb2RpZmllcnMvZXZlbnRMaXN0ZW5lcnMuanNcIjtcbmltcG9ydCBwb3BwZXJPZmZzZXRzIGZyb20gXCIuL21vZGlmaWVycy9wb3BwZXJPZmZzZXRzLmpzXCI7XG5pbXBvcnQgY29tcHV0ZVN0eWxlcyBmcm9tIFwiLi9tb2RpZmllcnMvY29tcHV0ZVN0eWxlcy5qc1wiO1xuaW1wb3J0IGFwcGx5U3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9hcHBseVN0eWxlcy5qc1wiO1xudmFyIGRlZmF1bHRNb2RpZmllcnMgPSBbZXZlbnRMaXN0ZW5lcnMsIHBvcHBlck9mZnNldHMsIGNvbXB1dGVTdHlsZXMsIGFwcGx5U3R5bGVzXTtcbnZhciBjcmVhdGVQb3BwZXIgPSAvKiNfX1BVUkVfXyovcG9wcGVyR2VuZXJhdG9yKHtcbiAgZGVmYXVsdE1vZGlmaWVyczogZGVmYXVsdE1vZGlmaWVyc1xufSk7IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tdW51c2VkLW1vZHVsZXNcblxuZXhwb3J0IHsgY3JlYXRlUG9wcGVyLCBwb3BwZXJHZW5lcmF0b3IsIGRlZmF1bHRNb2RpZmllcnMsIGRldGVjdE92ZXJmbG93IH07IiwiaW1wb3J0IHsgcG9wcGVyR2VuZXJhdG9yLCBkZXRlY3RPdmVyZmxvdyB9IGZyb20gXCIuL2NyZWF0ZVBvcHBlci5qc1wiO1xuaW1wb3J0IGV2ZW50TGlzdGVuZXJzIGZyb20gXCIuL21vZGlmaWVycy9ldmVudExpc3RlbmVycy5qc1wiO1xuaW1wb3J0IHBvcHBlck9mZnNldHMgZnJvbSBcIi4vbW9kaWZpZXJzL3BvcHBlck9mZnNldHMuanNcIjtcbmltcG9ydCBjb21wdXRlU3R5bGVzIGZyb20gXCIuL21vZGlmaWVycy9jb21wdXRlU3R5bGVzLmpzXCI7XG5pbXBvcnQgYXBwbHlTdHlsZXMgZnJvbSBcIi4vbW9kaWZpZXJzL2FwcGx5U3R5bGVzLmpzXCI7XG5pbXBvcnQgb2Zmc2V0IGZyb20gXCIuL21vZGlmaWVycy9vZmZzZXQuanNcIjtcbmltcG9ydCBmbGlwIGZyb20gXCIuL21vZGlmaWVycy9mbGlwLmpzXCI7XG5pbXBvcnQgcHJldmVudE92ZXJmbG93IGZyb20gXCIuL21vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cuanNcIjtcbmltcG9ydCBhcnJvdyBmcm9tIFwiLi9tb2RpZmllcnMvYXJyb3cuanNcIjtcbmltcG9ydCBoaWRlIGZyb20gXCIuL21vZGlmaWVycy9oaWRlLmpzXCI7XG52YXIgZGVmYXVsdE1vZGlmaWVycyA9IFtldmVudExpc3RlbmVycywgcG9wcGVyT2Zmc2V0cywgY29tcHV0ZVN0eWxlcywgYXBwbHlTdHlsZXMsIG9mZnNldCwgZmxpcCwgcHJldmVudE92ZXJmbG93LCBhcnJvdywgaGlkZV07XG52YXIgY3JlYXRlUG9wcGVyID0gLyojX19QVVJFX18qL3BvcHBlckdlbmVyYXRvcih7XG4gIGRlZmF1bHRNb2RpZmllcnM6IGRlZmF1bHRNb2RpZmllcnNcbn0pOyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciwgcG9wcGVyR2VuZXJhdG9yLCBkZWZhdWx0TW9kaWZpZXJzLCBkZXRlY3RPdmVyZmxvdyB9OyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLXVudXNlZC1tb2R1bGVzXG5cbmV4cG9ydCB7IGNyZWF0ZVBvcHBlciBhcyBjcmVhdGVQb3BwZXJMaXRlIH0gZnJvbSBcIi4vcG9wcGVyLWxpdGUuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb2RpZmllcnMvaW5kZXguanNcIjsiLCJpbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IHsgdmFyaWF0aW9uUGxhY2VtZW50cywgYmFzZVBsYWNlbWVudHMsIHBsYWNlbWVudHMgYXMgYWxsUGxhY2VtZW50cyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IGRldGVjdE92ZXJmbG93IGZyb20gXCIuL2RldGVjdE92ZXJmbG93LmpzXCI7XG5pbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIGJvdW5kYXJ5ID0gX29wdGlvbnMuYm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIGZsaXBWYXJpYXRpb25zID0gX29wdGlvbnMuZmxpcFZhcmlhdGlvbnMsXG4gICAgICBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPSBfb3B0aW9ucy5hbGxvd2VkQXV0b1BsYWNlbWVudHMsXG4gICAgICBhbGxvd2VkQXV0b1BsYWNlbWVudHMgPSBfb3B0aW9ucyRhbGxvd2VkQXV0b1AgPT09IHZvaWQgMCA/IGFsbFBsYWNlbWVudHMgOiBfb3B0aW9ucyRhbGxvd2VkQXV0b1A7XG4gIHZhciB2YXJpYXRpb24gPSBnZXRWYXJpYXRpb24ocGxhY2VtZW50KTtcbiAgdmFyIHBsYWNlbWVudHMgPSB2YXJpYXRpb24gPyBmbGlwVmFyaWF0aW9ucyA/IHZhcmlhdGlvblBsYWNlbWVudHMgOiB2YXJpYXRpb25QbGFjZW1lbnRzLmZpbHRlcihmdW5jdGlvbiAocGxhY2VtZW50KSB7XG4gICAgcmV0dXJuIGdldFZhcmlhdGlvbihwbGFjZW1lbnQpID09PSB2YXJpYXRpb247XG4gIH0pIDogYmFzZVBsYWNlbWVudHM7XG4gIHZhciBhbGxvd2VkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICByZXR1cm4gYWxsb3dlZEF1dG9QbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KSA+PSAwO1xuICB9KTtcblxuICBpZiAoYWxsb3dlZFBsYWNlbWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxsb3dlZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuICB9IC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdOiBGbG93IHNlZW1zIHRvIGhhdmUgcHJvYmxlbXMgd2l0aCB0d28gYXJyYXkgdW5pb25zLi4uXG5cblxuICB2YXIgb3ZlcmZsb3dzID0gYWxsb3dlZFBsYWNlbWVudHMucmVkdWNlKGZ1bmN0aW9uIChhY2MsIHBsYWNlbWVudCkge1xuICAgIGFjY1twbGFjZW1lbnRdID0gZGV0ZWN0T3ZlcmZsb3coc3RhdGUsIHtcbiAgICAgIHBsYWNlbWVudDogcGxhY2VtZW50LFxuICAgICAgYm91bmRhcnk6IGJvdW5kYXJ5LFxuICAgICAgcm9vdEJvdW5kYXJ5OiByb290Qm91bmRhcnksXG4gICAgICBwYWRkaW5nOiBwYWRkaW5nXG4gICAgfSlbZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpXTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvdmVyZmxvd3MpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gb3ZlcmZsb3dzW2FdIC0gb3ZlcmZsb3dzW2JdO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0QmFzZVBsYWNlbWVudCBmcm9tIFwiLi9nZXRCYXNlUGxhY2VtZW50LmpzXCI7XG5pbXBvcnQgZ2V0VmFyaWF0aW9uIGZyb20gXCIuL2dldFZhcmlhdGlvbi5qc1wiO1xuaW1wb3J0IGdldE1haW5BeGlzRnJvbVBsYWNlbWVudCBmcm9tIFwiLi9nZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQuanNcIjtcbmltcG9ydCB7IHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCwgc3RhcnQsIGVuZCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcHV0ZU9mZnNldHMoX3JlZikge1xuICB2YXIgcmVmZXJlbmNlID0gX3JlZi5yZWZlcmVuY2UsXG4gICAgICBlbGVtZW50ID0gX3JlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50ID0gX3JlZi5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50ID8gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIHZhcmlhdGlvbiA9IHBsYWNlbWVudCA/IGdldFZhcmlhdGlvbihwbGFjZW1lbnQpIDogbnVsbDtcbiAgdmFyIGNvbW1vblggPSByZWZlcmVuY2UueCArIHJlZmVyZW5jZS53aWR0aCAvIDIgLSBlbGVtZW50LndpZHRoIC8gMjtcbiAgdmFyIGNvbW1vblkgPSByZWZlcmVuY2UueSArIHJlZmVyZW5jZS5oZWlnaHQgLyAyIC0gZWxlbWVudC5oZWlnaHQgLyAyO1xuICB2YXIgb2Zmc2V0cztcblxuICBzd2l0Y2ggKGJhc2VQbGFjZW1lbnQpIHtcbiAgICBjYXNlIHRvcDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IGNvbW1vblgsXG4gICAgICAgIHk6IHJlZmVyZW5jZS55IC0gZWxlbWVudC5oZWlnaHRcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgYm90dG9tOlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogY29tbW9uWCxcbiAgICAgICAgeTogcmVmZXJlbmNlLnkgKyByZWZlcmVuY2UuaGVpZ2h0XG4gICAgICB9O1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHJpZ2h0OlxuICAgICAgb2Zmc2V0cyA9IHtcbiAgICAgICAgeDogcmVmZXJlbmNlLnggKyByZWZlcmVuY2Uud2lkdGgsXG4gICAgICAgIHk6IGNvbW1vbllcbiAgICAgIH07XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgbGVmdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54IC0gZWxlbWVudC53aWR0aCxcbiAgICAgICAgeTogY29tbW9uWVxuICAgICAgfTtcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIG9mZnNldHMgPSB7XG4gICAgICAgIHg6IHJlZmVyZW5jZS54LFxuICAgICAgICB5OiByZWZlcmVuY2UueVxuICAgICAgfTtcbiAgfVxuXG4gIHZhciBtYWluQXhpcyA9IGJhc2VQbGFjZW1lbnQgPyBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQoYmFzZVBsYWNlbWVudCkgOiBudWxsO1xuXG4gIGlmIChtYWluQXhpcyAhPSBudWxsKSB7XG4gICAgdmFyIGxlbiA9IG1haW5BeGlzID09PSAneScgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICBzd2l0Y2ggKHZhcmlhdGlvbikge1xuICAgICAgY2FzZSBzdGFydDpcbiAgICAgICAgb2Zmc2V0c1ttYWluQXhpc10gPSBvZmZzZXRzW21haW5BeGlzXSAtIChyZWZlcmVuY2VbbGVuXSAvIDIgLSBlbGVtZW50W2xlbl0gLyAyKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgZW5kOlxuICAgICAgICBvZmZzZXRzW21haW5BeGlzXSA9IG9mZnNldHNbbWFpbkF4aXNdICsgKHJlZmVyZW5jZVtsZW5dIC8gMiAtIGVsZW1lbnRbbGVuXSAvIDIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWJvdW5jZShmbikge1xuICB2YXIgcGVuZGluZztcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXBlbmRpbmcpIHtcbiAgICAgIHBlbmRpbmcgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBwZW5kaW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHJlc29sdmUoZm4oKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBlbmRpbmc7XG4gIH07XG59IiwiaW1wb3J0IGdldENsaXBwaW5nUmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldENsaXBwaW5nUmVjdC5qc1wiO1xuaW1wb3J0IGdldERvY3VtZW50RWxlbWVudCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldERvY3VtZW50RWxlbWVudC5qc1wiO1xuaW1wb3J0IGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmcm9tIFwiLi4vZG9tLXV0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC5qc1wiO1xuaW1wb3J0IGNvbXB1dGVPZmZzZXRzIGZyb20gXCIuL2NvbXB1dGVPZmZzZXRzLmpzXCI7XG5pbXBvcnQgcmVjdFRvQ2xpZW50UmVjdCBmcm9tIFwiLi9yZWN0VG9DbGllbnRSZWN0LmpzXCI7XG5pbXBvcnQgeyBjbGlwcGluZ1BhcmVudHMsIHJlZmVyZW5jZSwgcG9wcGVyLCBib3R0b20sIHRvcCwgcmlnaHQsIGJhc2VQbGFjZW1lbnRzLCB2aWV3cG9ydCB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuaW1wb3J0IHsgaXNFbGVtZW50IH0gZnJvbSBcIi4uL2RvbS11dGlscy9pbnN0YW5jZU9mLmpzXCI7XG5pbXBvcnQgbWVyZ2VQYWRkaW5nT2JqZWN0IGZyb20gXCIuL21lcmdlUGFkZGluZ09iamVjdC5qc1wiO1xuaW1wb3J0IGV4cGFuZFRvSGFzaE1hcCBmcm9tIFwiLi9leHBhbmRUb0hhc2hNYXAuanNcIjsgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby11bnVzZWQtbW9kdWxlc1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXRlY3RPdmVyZmxvdyhzdGF0ZSwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgdmFyIF9vcHRpb25zID0gb3B0aW9ucyxcbiAgICAgIF9vcHRpb25zJHBsYWNlbWVudCA9IF9vcHRpb25zLnBsYWNlbWVudCxcbiAgICAgIHBsYWNlbWVudCA9IF9vcHRpb25zJHBsYWNlbWVudCA9PT0gdm9pZCAwID8gc3RhdGUucGxhY2VtZW50IDogX29wdGlvbnMkcGxhY2VtZW50LFxuICAgICAgX29wdGlvbnMkc3RyYXRlZ3kgPSBfb3B0aW9ucy5zdHJhdGVneSxcbiAgICAgIHN0cmF0ZWd5ID0gX29wdGlvbnMkc3RyYXRlZ3kgPT09IHZvaWQgMCA/IHN0YXRlLnN0cmF0ZWd5IDogX29wdGlvbnMkc3RyYXRlZ3ksXG4gICAgICBfb3B0aW9ucyRib3VuZGFyeSA9IF9vcHRpb25zLmJvdW5kYXJ5LFxuICAgICAgYm91bmRhcnkgPSBfb3B0aW9ucyRib3VuZGFyeSA9PT0gdm9pZCAwID8gY2xpcHBpbmdQYXJlbnRzIDogX29wdGlvbnMkYm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRyb290Qm91bmRhcnkgPSBfb3B0aW9ucy5yb290Qm91bmRhcnksXG4gICAgICByb290Qm91bmRhcnkgPSBfb3B0aW9ucyRyb290Qm91bmRhcnkgPT09IHZvaWQgMCA/IHZpZXdwb3J0IDogX29wdGlvbnMkcm9vdEJvdW5kYXJ5LFxuICAgICAgX29wdGlvbnMkZWxlbWVudENvbnRlID0gX29wdGlvbnMuZWxlbWVudENvbnRleHQsXG4gICAgICBlbGVtZW50Q29udGV4dCA9IF9vcHRpb25zJGVsZW1lbnRDb250ZSA9PT0gdm9pZCAwID8gcG9wcGVyIDogX29wdGlvbnMkZWxlbWVudENvbnRlLFxuICAgICAgX29wdGlvbnMkYWx0Qm91bmRhcnkgPSBfb3B0aW9ucy5hbHRCb3VuZGFyeSxcbiAgICAgIGFsdEJvdW5kYXJ5ID0gX29wdGlvbnMkYWx0Qm91bmRhcnkgPT09IHZvaWQgMCA/IGZhbHNlIDogX29wdGlvbnMkYWx0Qm91bmRhcnksXG4gICAgICBfb3B0aW9ucyRwYWRkaW5nID0gX29wdGlvbnMucGFkZGluZyxcbiAgICAgIHBhZGRpbmcgPSBfb3B0aW9ucyRwYWRkaW5nID09PSB2b2lkIDAgPyAwIDogX29wdGlvbnMkcGFkZGluZztcbiAgdmFyIHBhZGRpbmdPYmplY3QgPSBtZXJnZVBhZGRpbmdPYmplY3QodHlwZW9mIHBhZGRpbmcgIT09ICdudW1iZXInID8gcGFkZGluZyA6IGV4cGFuZFRvSGFzaE1hcChwYWRkaW5nLCBiYXNlUGxhY2VtZW50cykpO1xuICB2YXIgYWx0Q29udGV4dCA9IGVsZW1lbnRDb250ZXh0ID09PSBwb3BwZXIgPyByZWZlcmVuY2UgOiBwb3BwZXI7XG4gIHZhciBwb3BwZXJSZWN0ID0gc3RhdGUucmVjdHMucG9wcGVyO1xuICB2YXIgZWxlbWVudCA9IHN0YXRlLmVsZW1lbnRzW2FsdEJvdW5kYXJ5ID8gYWx0Q29udGV4dCA6IGVsZW1lbnRDb250ZXh0XTtcbiAgdmFyIGNsaXBwaW5nQ2xpZW50UmVjdCA9IGdldENsaXBwaW5nUmVjdChpc0VsZW1lbnQoZWxlbWVudCkgPyBlbGVtZW50IDogZWxlbWVudC5jb250ZXh0RWxlbWVudCB8fCBnZXREb2N1bWVudEVsZW1lbnQoc3RhdGUuZWxlbWVudHMucG9wcGVyKSwgYm91bmRhcnksIHJvb3RCb3VuZGFyeSwgc3RyYXRlZ3kpO1xuICB2YXIgcmVmZXJlbmNlQ2xpZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChzdGF0ZS5lbGVtZW50cy5yZWZlcmVuY2UpO1xuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGNvbXB1dGVPZmZzZXRzKHtcbiAgICByZWZlcmVuY2U6IHJlZmVyZW5jZUNsaWVudFJlY3QsXG4gICAgZWxlbWVudDogcG9wcGVyUmVjdCxcbiAgICBzdHJhdGVneTogJ2Fic29sdXRlJyxcbiAgICBwbGFjZW1lbnQ6IHBsYWNlbWVudFxuICB9KTtcbiAgdmFyIHBvcHBlckNsaWVudFJlY3QgPSByZWN0VG9DbGllbnRSZWN0KE9iamVjdC5hc3NpZ24oe30sIHBvcHBlclJlY3QsIHBvcHBlck9mZnNldHMpKTtcbiAgdmFyIGVsZW1lbnRDbGllbnRSZWN0ID0gZWxlbWVudENvbnRleHQgPT09IHBvcHBlciA/IHBvcHBlckNsaWVudFJlY3QgOiByZWZlcmVuY2VDbGllbnRSZWN0OyAvLyBwb3NpdGl2ZSA9IG92ZXJmbG93aW5nIHRoZSBjbGlwcGluZyByZWN0XG4gIC8vIDAgb3IgbmVnYXRpdmUgPSB3aXRoaW4gdGhlIGNsaXBwaW5nIHJlY3RcblxuICB2YXIgb3ZlcmZsb3dPZmZzZXRzID0ge1xuICAgIHRvcDogY2xpcHBpbmdDbGllbnRSZWN0LnRvcCAtIGVsZW1lbnRDbGllbnRSZWN0LnRvcCArIHBhZGRpbmdPYmplY3QudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudENsaWVudFJlY3QuYm90dG9tIC0gY2xpcHBpbmdDbGllbnRSZWN0LmJvdHRvbSArIHBhZGRpbmdPYmplY3QuYm90dG9tLFxuICAgIGxlZnQ6IGNsaXBwaW5nQ2xpZW50UmVjdC5sZWZ0IC0gZWxlbWVudENsaWVudFJlY3QubGVmdCArIHBhZGRpbmdPYmplY3QubGVmdCxcbiAgICByaWdodDogZWxlbWVudENsaWVudFJlY3QucmlnaHQgLSBjbGlwcGluZ0NsaWVudFJlY3QucmlnaHQgKyBwYWRkaW5nT2JqZWN0LnJpZ2h0XG4gIH07XG4gIHZhciBvZmZzZXREYXRhID0gc3RhdGUubW9kaWZpZXJzRGF0YS5vZmZzZXQ7IC8vIE9mZnNldHMgY2FuIGJlIGFwcGxpZWQgb25seSB0byB0aGUgcG9wcGVyIGVsZW1lbnRcblxuICBpZiAoZWxlbWVudENvbnRleHQgPT09IHBvcHBlciAmJiBvZmZzZXREYXRhKSB7XG4gICAgdmFyIG9mZnNldCA9IG9mZnNldERhdGFbcGxhY2VtZW50XTtcbiAgICBPYmplY3Qua2V5cyhvdmVyZmxvd09mZnNldHMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdmFyIG11bHRpcGx5ID0gW3JpZ2h0LCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gMSA6IC0xO1xuICAgICAgdmFyIGF4aXMgPSBbdG9wLCBib3R0b21dLmluZGV4T2Yoa2V5KSA+PSAwID8gJ3knIDogJ3gnO1xuICAgICAgb3ZlcmZsb3dPZmZzZXRzW2tleV0gKz0gb2Zmc2V0W2F4aXNdICogbXVsdGlwbHk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb3ZlcmZsb3dPZmZzZXRzO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4cGFuZFRvSGFzaE1hcCh2YWx1ZSwga2V5cykge1xuICByZXR1cm4ga2V5cy5yZWR1Y2UoZnVuY3Rpb24gKGhhc2hNYXAsIGtleSkge1xuICAgIGhhc2hNYXBba2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiBoYXNoTWFwO1xuICB9LCB7fSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QWx0QXhpcyhheGlzKSB7XG4gIHJldHVybiBheGlzID09PSAneCcgPyAneScgOiAneCc7XG59IiwiaW1wb3J0IHsgYXV0byB9IGZyb20gXCIuLi9lbnVtcy5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QmFzZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEZyZXNoU2lkZU9iamVjdCgpIHtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IDAsXG4gICAgcmlnaHQ6IDAsXG4gICAgYm90dG9tOiAwLFxuICAgIGxlZnQ6IDBcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRNYWluQXhpc0Zyb21QbGFjZW1lbnQocGxhY2VtZW50KSB7XG4gIHJldHVybiBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgPj0gMCA/ICd4JyA6ICd5Jztcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgbGVmdDogJ3JpZ2h0JyxcbiAgcmlnaHQ6ICdsZWZ0JyxcbiAgYm90dG9tOiAndG9wJyxcbiAgdG9wOiAnYm90dG9tJ1xufTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn0iLCJ2YXIgaGFzaCA9IHtcbiAgc3RhcnQ6ICdlbmQnLFxuICBlbmQ6ICdzdGFydCdcbn07XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvblBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9zdGFydHxlbmQvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VmFyaWF0aW9uKHBsYWNlbWVudCkge1xuICByZXR1cm4gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG59IiwiZXhwb3J0IHZhciBtYXggPSBNYXRoLm1heDtcbmV4cG9ydCB2YXIgbWluID0gTWF0aC5taW47XG5leHBvcnQgdmFyIHJvdW5kID0gTWF0aC5yb3VuZDsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXJnZUJ5TmFtZShtb2RpZmllcnMpIHtcbiAgdmFyIG1lcmdlZCA9IG1vZGlmaWVycy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZCwgY3VycmVudCkge1xuICAgIHZhciBleGlzdGluZyA9IG1lcmdlZFtjdXJyZW50Lm5hbWVdO1xuICAgIG1lcmdlZFtjdXJyZW50Lm5hbWVdID0gZXhpc3RpbmcgPyBPYmplY3QuYXNzaWduKHt9LCBleGlzdGluZywgY3VycmVudCwge1xuICAgICAgb3B0aW9uczogT2JqZWN0LmFzc2lnbih7fSwgZXhpc3Rpbmcub3B0aW9ucywgY3VycmVudC5vcHRpb25zKSxcbiAgICAgIGRhdGE6IE9iamVjdC5hc3NpZ24oe30sIGV4aXN0aW5nLmRhdGEsIGN1cnJlbnQuZGF0YSlcbiAgICB9KSA6IGN1cnJlbnQ7XG4gICAgcmV0dXJuIG1lcmdlZDtcbiAgfSwge30pOyAvLyBJRTExIGRvZXMgbm90IHN1cHBvcnQgT2JqZWN0LnZhbHVlc1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhtZXJnZWQpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIG1lcmdlZFtrZXldO1xuICB9KTtcbn0iLCJpbXBvcnQgZ2V0RnJlc2hTaWRlT2JqZWN0IGZyb20gXCIuL2dldEZyZXNoU2lkZU9iamVjdC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWVyZ2VQYWRkaW5nT2JqZWN0KHBhZGRpbmdPYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGdldEZyZXNoU2lkZU9iamVjdCgpLCBwYWRkaW5nT2JqZWN0KTtcbn0iLCJpbXBvcnQgeyBtb2RpZmllclBoYXNlcyB9IGZyb20gXCIuLi9lbnVtcy5qc1wiOyAvLyBzb3VyY2U6IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ5ODc1MjU1XG5cbmZ1bmN0aW9uIG9yZGVyKG1vZGlmaWVycykge1xuICB2YXIgbWFwID0gbmV3IE1hcCgpO1xuICB2YXIgdmlzaXRlZCA9IG5ldyBTZXQoKTtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBtYXAuc2V0KG1vZGlmaWVyLm5hbWUsIG1vZGlmaWVyKTtcbiAgfSk7IC8vIE9uIHZpc2l0aW5nIG9iamVjdCwgY2hlY2sgZm9yIGl0cyBkZXBlbmRlbmNpZXMgYW5kIHZpc2l0IHRoZW0gcmVjdXJzaXZlbHlcblxuICBmdW5jdGlvbiBzb3J0KG1vZGlmaWVyKSB7XG4gICAgdmlzaXRlZC5hZGQobW9kaWZpZXIubmFtZSk7XG4gICAgdmFyIHJlcXVpcmVzID0gW10uY29uY2F0KG1vZGlmaWVyLnJlcXVpcmVzIHx8IFtdLCBtb2RpZmllci5yZXF1aXJlc0lmRXhpc3RzIHx8IFtdKTtcbiAgICByZXF1aXJlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXApIHtcbiAgICAgIGlmICghdmlzaXRlZC5oYXMoZGVwKSkge1xuICAgICAgICB2YXIgZGVwTW9kaWZpZXIgPSBtYXAuZ2V0KGRlcCk7XG5cbiAgICAgICAgaWYgKGRlcE1vZGlmaWVyKSB7XG4gICAgICAgICAgc29ydChkZXBNb2RpZmllcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXN1bHQucHVzaChtb2RpZmllcik7XG4gIH1cblxuICBtb2RpZmllcnMuZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAoIXZpc2l0ZWQuaGFzKG1vZGlmaWVyLm5hbWUpKSB7XG4gICAgICAvLyBjaGVjayBmb3IgdmlzaXRlZCBvYmplY3RcbiAgICAgIHNvcnQobW9kaWZpZXIpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9yZGVyTW9kaWZpZXJzKG1vZGlmaWVycykge1xuICAvLyBvcmRlciBiYXNlZCBvbiBkZXBlbmRlbmNpZXNcbiAgdmFyIG9yZGVyZWRNb2RpZmllcnMgPSBvcmRlcihtb2RpZmllcnMpOyAvLyBvcmRlciBiYXNlZCBvbiBwaGFzZVxuXG4gIHJldHVybiBtb2RpZmllclBoYXNlcy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcGhhc2UpIHtcbiAgICByZXR1cm4gYWNjLmNvbmNhdChvcmRlcmVkTW9kaWZpZXJzLmZpbHRlcihmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICAgIHJldHVybiBtb2RpZmllci5waGFzZSA9PT0gcGhhc2U7XG4gICAgfSkpO1xuICB9LCBbXSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVjdFRvQ2xpZW50UmVjdChyZWN0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZWN0LCB7XG4gICAgbGVmdDogcmVjdC54LFxuICAgIHRvcDogcmVjdC55LFxuICAgIHJpZ2h0OiByZWN0LnggKyByZWN0LndpZHRoLFxuICAgIGJvdHRvbTogcmVjdC55ICsgcmVjdC5oZWlnaHRcbiAgfSk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VUFTdHJpbmcoKSB7XG4gIHZhciB1YURhdGEgPSBuYXZpZ2F0b3IudXNlckFnZW50RGF0YTtcblxuICBpZiAodWFEYXRhICE9IG51bGwgJiYgdWFEYXRhLmJyYW5kcyAmJiBBcnJheS5pc0FycmF5KHVhRGF0YS5icmFuZHMpKSB7XG4gICAgcmV0dXJuIHVhRGF0YS5icmFuZHMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gaXRlbS5icmFuZCArIFwiL1wiICsgaXRlbS52ZXJzaW9uO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuXG4gIHJldHVybiBuYXZpZ2F0b3IudXNlckFnZW50O1xufSIsImltcG9ydCB7IG1heCBhcyBtYXRoTWF4LCBtaW4gYXMgbWF0aE1pbiB9IGZyb20gXCIuL21hdGguanNcIjtcbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW4obWluLCB2YWx1ZSwgbWF4KSB7XG4gIHJldHVybiBtYXRoTWF4KG1pbiwgbWF0aE1pbih2YWx1ZSwgbWF4KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gd2l0aGluTWF4Q2xhbXAobWluLCB2YWx1ZSwgbWF4KSB7XG4gIHZhciB2ID0gd2l0aGluKG1pbiwgdmFsdWUsIG1heCk7XG4gIHJldHVybiB2ID4gbWF4ID8gbWF4IDogdjtcbn0iLCIvLyBMb2FkZWQgYWZ0ZXIgYXBwLmpzXG5yZXF1aXJlKCcuL2N1c3RvbS5qcycpO1xucmVxdWlyZSgnLi9jdXN0b20vYm9vdHN0cmFwLmpzJyk7XG5yZXF1aXJlKCcuL2N1c3RvbS9jb29raWVzLmpzJyk7XG5yZXF1aXJlKCcuL2N1c3RvbS9lbWJlZC5qcycpO1xucmVxdWlyZSgnLi9jdXN0b20vZm9ybXMuanMnKTtcbnJlcXVpcmUoJy4vY3VzdG9tL2hlYWRlci5qcycpO1xucmVxdWlyZSgnLi9jdXN0b20vbWVudS5qcycpO1xucmVxdWlyZSgnLi9jdXN0b20vc2Nyb2xsLmpzJyk7XG5yZXF1aXJlKCcuL2N1c3RvbS9zbGljay5qcycpO1xucmVxdWlyZSgnLi9oZWxwZXJzL2FuYWx5dGljcy5qcycpO1xucmVxdWlyZSgnLi9wbHVnaW5zL3NoYXJlLXByaWNlLmpzJyk7XG4iLCIvKipcbiAqIFdlJ2xsIGxvYWQgalF1ZXJ5IGFuZCB0aGUgQm9vdHN0cmFwIGpRdWVyeSBwbHVnaW4gd2hpY2ggcHJvdmlkZXMgc3VwcG9ydFxuICogZm9yIEphdmFTY3JpcHQgYmFzZWQgQm9vdHN0cmFwIGZlYXR1cmVzIHN1Y2ggYXMgbW9kYWxzIGFuZCB0YWJzLiBUaGlzXG4gKiBjb2RlIG1heSBiZSBtb2RpZmllZCB0byBmaXQgdGhlIHNwZWNpZmljIG5lZWRzIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gKi9cbmltcG9ydCAnc2xpY2stY2Fyb3VzZWwnO1xuaW1wb3J0ICdAcG9wcGVyanMvY29yZSc7XG5cbnRyeSB7XG5cbiAgICB3aW5kb3cuJCA9IHdpbmRvdy5qUXVlcnkgPSByZXF1aXJlKCdqcXVlcnknKTtcblxuICAgIC8qKlxuICAgICAqIEdldCBCb290c3RyYXBcbiAgICAgKi9cbiAgICB3aW5kb3cuYm9vdHN0cmFwID0gcmVxdWlyZSgnYm9vdHN0cmFwJyk7XG5cbiAgICAvKipcbiAgICAgKiBKUyBDb29raWVcbiAgICAgKi9cbiAgICB3aW5kb3cuQ29va2llcyA9IHJlcXVpcmUoJ2pzLWNvb2tpZScpO1xuXG4gICAgLyoqXG4gICAgICogQ3VzdG9tIFBsdWdpbnMgLyBDb21wb25lbnRzXG4gICAgICovXG4gICAgcmVxdWlyZSgnLi9wbHVnaW5zL2V4aXN0cy5qcycpO1xuXG59IGNhdGNoIChlKSB7XG5cbn1cbiIsIi8vIExvYWRlZCBiZWZvcmUgYXBwLmpzXG5yZXF1aXJlKCcuL2hlbHBlcnMvcG9seWZpbGxzLmpzJyk7XG5yZXF1aXJlKCcuL2hlbHBlcnMvdmFsaWRhdGlvbi5qcycpOyIsIi8qXG4gKiBHZXQgQSBRdWVyeSBWYXJpYWJsZVxuICpcbiAqIFNpbXBsZSB1cmwgc3RyaW5nIHBhcnNpbmcgZnVuY3Rpb24gdG8gZ3JhYlxuICogYSBxdWVyeSB2YXJpYWJsZSBvciByZXR1cm4gZmFsc2UgaWYgbm90IHNldFxuICovXG5DVVZBamF4LmdldFF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbih2YXJpYWJsZSkge1xuICAgIHZhciBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgIHZhciB2YXJzID0gcXVlcnkuc3BsaXQoXCImXCIpO1xuICAgIGZvciAodmFyIGk9MDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhaXIgPSB2YXJzW2ldLnNwbGl0KFwiPVwiKTtcbiAgICAgICAgaWYgKHBhaXJbMF0gPT0gdmFyaWFibGUpIHsgXG4gICAgICAgICAgICByZXR1cm4gcGFpclsxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4oZmFsc2UpO1xufVxuXG5cbi8qXG4gKiBDaGVjayBJZiBBTlkgUXVlcnkgVmFyaWFibGVzXG4gKlxuICogTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmdcbiAqIGVsaXQuIFByb2luIGFsaXF1YW0gY29tbW9kbyBxdWFtIGV0aWFteCBpbXBlcmRpZXQuXG4gKi9cbkNVVkFqYXguaGFzUXVlcnlWYXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHF1ZXJ5ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG4gICAgdmFyIHZhcnMgPSBxdWVyeS5zcGxpdCgnJicpO1xuICAgIHJldHVybiB2YXJzLmxlbmd0aCA+PSAxO1xufVxuXG5cbi8qXG4gKiBSZW1vdmUgQSBRdWVyeSBWYXJpYWJsZVxuICpcbiAqIExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nXG4gKiBlbGl0LiBQcm9pbiBhbGlxdWFtIGNvbW1vZG8gcXVhbSBldGlhbXggaW1wZXJkaWV0LlxuICovXG5DVVZBamF4LnJlbW92ZVF1ZXJ5VmFyaWFibGUgPSBmdW5jdGlvbih2YXJpYWJsZSkge1xuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xufVxuXG5cbi8qXG4gKiBAVE9ET1xuICpcbiAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gKi9cbkNVVkFqYXguZXF1YWxIZWlnaHRzID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgJGVsID0gW10sXG4gICAgICAgIHRhbGxlc3QgPSAwLFxuICAgICAgICBlbHMgPSBqUXVlcnkoZWwpO1xuICAgIGVscy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAkZWwgPSBqUXVlcnkodGhpcyk7XG4gICAgICAgICRlbC5oZWlnaHQoJ2F1dG8nKTtcbiAgICAgICAgdmFyIGN1cnJlbnRIZWlnaHQgPSBqUXVlcnkodGhpcykuaGVpZ2h0KCk7XG4gICAgICAgIGlmIChjdXJyZW50SGVpZ2h0ID4gdGFsbGVzdCkge1xuICAgICAgICAgICAgdGFsbGVzdCA9IGN1cnJlbnRIZWlnaHQ7XG4gICAgICAgIH1cbiAgICB9KTsgXG4gICAgZWxzLmhlaWdodCh0YWxsZXN0KTtcbn07XG5cblxuLypcbiAqIEBUT0RPXG4gKlxuICogQmFjb24gaXBzdW0gZG9sb3IgYW1ldCB0ZW5kZXJsb2luIGNvdyB0b25ndWUsXG4gKiBmaWxldCBtaWdub24ga2llbGJhc2EgYnJpc2tldCBzYWxhbWkgYmlsdG9uZy5cbiAqL1xuQ1VWQWpheC5zY3JvbGxUb0VsID0gZnVuY3Rpb24oZWwsIG9mZiwgY2IpIHtcbiAgICBwb3MgPSBlbCA/ICQoZWwpLm9mZnNldCgpLnRvcCA6IDA7XG4gICAgalF1ZXJ5KCdodG1sLGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiBwb3MgLSAob2ZmID8gb2ZmIDogMClcbiAgICB9LCAxMjAwLCBjYik7XG59O1xuXG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGZpbmQgY2xvc2VzdCBhbmNlc3RvclxuICogKHBvbHlmaWxsIGFzIGNsb3Nlc3QgaXMgbm90IHN1cHBvcnRlZCBieSBJRTExKVxuICogXG4gKiBAcGFyYW0gZWwgRE9NIG5vZGUgdG8gZmluZCB0aGUgYW5jZXN0b3IgZm9yXG4gKiBAcGFyYW0gc2VsZWN0b3IgUXVlcnkgc2VsZWN0b3Igc3RyaW5nXG4gKiBAcmV0dXJuIHtIVE1MRWxlbWVudCB8IHttYXRjaGVzU2VsZWN0b3J9fVxuICovXG5DVVZBamF4LmZpbmRBbmNlc3RvciA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICAgIHdoaWxlICgoZWwgPSBlbC5wYXJlbnRFbGVtZW50KSAmJiAhKChlbC5tYXRjaGVzIHx8IGVsLm1hdGNoZXNTZWxlY3RvcikuY2FsbChlbCwgc2VsZWN0b3IpKSk7XG4gICAgcmV0dXJuIGVsO1xufVxuIiwiLyoqXG4gKiBCb290c3RyYXAgNCBJbml0cyArIEhhbmRsZXJzXG4gKlxuICogQGF1dGhvciBKb2huIFJhbmJ5XG4gKiBAc2VlICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmFuYnlcbiAqL1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cbiAgICAvKlxuICAgICAqIEJvb3RzdHJhcCBQb3B1cCBNb2RhbFxuICAgICAqXG4gICAgICogQmFjb24gaXBzdW0gZG9sb3IgYW1ldCB0ZW5kZXJsb2luIGNvdyB0b25ndWUsXG4gICAgICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gICAgICovXG4gICAgaWYgKCQoJyNwb3B1cC1tb2RhbCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgcG9wdXBNb2RhbCA9IG5ldyBib290c3RyYXAuTW9kYWwoJyNwb3B1cC1tb2RhbCcsIHtcbiAgICAgICAgICBrZXlib2FyZDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIHBvcHVwTW9kYWwuc2hvdygpO1xuICAgIH1cblxuICAgICQoJy5jb2xsYXBzZScpLm9uKCdzaG93bi5icy5jb2xsYXBzZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcGVyc29uID0gJCh0aGlzKS5kYXRhKCdwZXJzb24nKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5zaWJsaW5ncygnLnJvdycpLmZpbmQoJy5wZXJzb24nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICQoJyMnICsgcGVyc29uKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgfSk7XG5cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLypcbiAgICAgKiBAVE9ET1xuICAgICAqXG4gICAgICogQmFjb24gaXBzdW0gZG9sb3IgYW1ldCB0ZW5kZXJsb2luIGNvdyB0b25ndWUsXG4gICAgICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gICAgICovXG4gICAgJCgnaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1lbnF1aXJ5X3R5cGVdJykuY2hhbmdlKGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAkKCcuZm9ybS13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgIH0pO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKlxuICAgICAqIEBUT0RPXG4gICAgICpcbiAgICAgKiBCYWNvbiBpcHN1bSBkb2xvciBhbWV0IHRlbmRlcmxvaW4gY293IHRvbmd1ZSxcbiAgICAgKiBmaWxldCBtaWdub24ga2llbGJhc2EgYnJpc2tldCBzYWxhbWkgYmlsdG9uZy5cbiAgICAgKi9cbiAgICAkKCcuY2xvc2UtbW9kYWwnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuZm9ybS1tZXNzYWdlcycpLnJlbW92ZUNsYXNzKCdzdWNjZXNzIGVycm9yJykuYWRkQ2xhc3MoJ2Qtbm9uZScpLnRleHQoJycpO1xuICAgIH0pO1xuXG4gICAgJCgnLm1vZGFsJykub24oJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5mb3JtLW1lc3NhZ2VzJykucmVtb3ZlQ2xhc3MoJ3N1Y2Nlc3MgZXJyb3InKS5hZGRDbGFzcygnZC1ub25lJykudGV4dCgnJyk7XG4gICAgfSk7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qXG4gICAgICogQFRPRE9cbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgICQoJy5zaG93LW1vcmUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciB0eXBlID0gJCh0aGlzKS5kYXRhKCd0eXBlJyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuZmluZCgnLicgKyB0eXBlICsgJy5kLW5vbmUnKS50b2dnbGVDbGFzcygnZC1ub25lIGQtZmxleCcpO1xuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkLW5vbmUnKTtcbiAgICB9KTtcbn0pO1xuIiwiLypcbiAqIENvb2tpZXMgKyBDb29raWUgTm90aWNlXG4gKlxuICogQGF1dGhvciBKb2huIFJhbmJ5XG4gKiBAc2VlICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmFuYnlcbiAqL1xualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cbiAgICAvKlxuICAgICAqIERpc21pc3NlZCBDb29raWUgTm90aWZpY2F0aW9uXG4gICAgICpcbiAgICAgKiBCYWNvbiBpcHN1bSBkb2xvciBhbWV0IHRlbmRlcmxvaW4gY293IHRvbmd1ZSxcbiAgICAgKiBmaWxldCBtaWdub24ga2llbGJhc2EgYnJpc2tldCBzYWxhbWkgYmlsdG9uZy5cbiAgICAgKi9cbiAgICBpZiAoISBDb29raWVzLmdldCgnZGlzbWlzc2VkLW5vdGlmaWNhdGlvbnMnKSkge1xuICAgICAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2Nvb2tpZScpO1xuICAgICAgICAkKCcjY29va2llLW5vdGljZScpLnNob3coKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qXG4gICAgICogRGlzbWlzc2VkIENvb2tpZSBOb3RpZmljYXRpb25cbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgICQoJy5kaXNtaXNzLW5vdGljZSwgLmJ0bi1jb29raWUnKS5jbGljayhmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBwcmV2ZW50IGp1bXBcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyByZW1vdmUgYm9keSBjbGFzc1xuICAgICAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoJ2Nvb2tpZScpO1xuICAgICAgICAvLyBkaXNtaXNzIG5vdGlmaWNhdGlvblxuICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5jb29raWUtbWVzc2FnZScpLmZhZGVPdXQoJ3Nsb3cnKTtcbiAgICAgICAgLy8gdXBkYXRlIGNvb2tpZVxuICAgICAgICBDb29raWVzLnNldCgnZGlzbWlzc2VkLW5vdGlmaWNhdGlvbnMnLCAxLCB7IGV4cGlyZXM6IDM2NSB9KTtcbiAgICB9KTtcblxufSk7XG4iLCIvKipcbiAqIEVtYmVkIEZ1bmN0aW9ucyArIEhhbmRsZXJzXG4gKlxuICogQGF1dGhvciBKb2huIFJhbmJ5XG4gKiBAc2VlICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9qcmFuYnlcbiAqL1xuKGZ1bmN0aW9uKCQpIHtcbiAgICBcbiAgICAvLyBwb3N0ZXIgZnJhbWUgY2xpY2sgZXZlbnRcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmpzLWVtYmVkLXBvc3RlcicsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgJHBvc3RlciA9ICQodGhpcyk7XG4gICAgICAgIHZhciAkd3JhcHBlciA9ICRwb3N0ZXIuY2xvc2VzdCgnLmpzLWVtYmVkLXJlc3BvbnNpdmUnKTtcbiAgICAgICAgdmlkZW9QbGF5KCR3cmFwcGVyKTtcbiAgICB9KTtcblxuICAgIC8vIHBsYXkgdGhlIHRhcmdldGVkIHZpZGVvIChhbmQgaGlkZSB0aGUgcG9zdGVyIGZyYW1lKVxuICAgIGZ1bmN0aW9uIHZpZGVvUGxheSgkd3JhcHBlcikge1xuICAgICAgICB2YXIgJGlmcmFtZSA9ICR3cmFwcGVyLmZpbmQoJy5qcy1lbWJlZC1yZXNwb25zaXZlLWl0ZW0nKTtcbiAgICAgICAgdmFyIHNyYyA9ICRpZnJhbWUuZGF0YSgnc3JjJyk7XG4gICAgICAgIC8vIGhpZGUgcG9zdGVyXG4gICAgICAgICR3cmFwcGVyLmFkZENsYXNzKCdqcy1lbWJlZC1yZXNwb25zaXZlLWFjdGl2ZScpO1xuICAgICAgICAvLyBhZGQgaWZyYW1lIHNyYyBpbiwgc3RhcnRpbmcgdGhlIHZpZGVvXG4gICAgICAgICRpZnJhbWUuYXR0cignc3JjJywgc3JjKTtcbiAgICB9XG5cbiAgICAvLyBzdG9wIHRoZSB0YXJnZXRlZC9hbGwgdmlkZW9zIChhbmQgcmUtaW5zdGF0ZSB0aGUgcG9zdGVyIGZyYW1lcylcbiAgICBmdW5jdGlvbiB2aWRlb1N0b3AoJHdyYXBwZXIpIHtcbiAgICAgICAgLy8gaWYgd2UncmUgc3RvcHBpbmcgYWxsIHZpZGVvcyBvbiBwYWdlXG4gICAgICAgIGlmICghICR3cmFwcGVyKSB7XG4gICAgICAgICAgICB2YXIgJHdyYXBwZXIgPSAkKCcuanMtZW1iZWQtcmVzcG9uc2l2ZScpO1xuICAgICAgICAgICAgdmFyICRpZnJhbWUgPSAkKCcuanMtZW1iZWQtcmVzcG9uc2l2ZS1pdGVtJyk7XG4gICAgICAgIC8vIGlmIHdlJ3JlIHN0b3BwaW5nIGEgcGFydGljdWxhciB2aWRlb1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyICRpZnJhbWUgPSAkd3JhcHBlci5maW5kKCcuanMtZW1iZWQtcmVzcG9uc2l2ZS1pdGVtJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV2ZWFsIHBvc3RlclxuICAgICAgICAkd3JhcHBlci5yZW1vdmVDbGFzcygnanMtZW1iZWQtcmVzcG9uc2l2ZS1hY3RpdmUnKTtcbiAgICAgICAgLy8gcmVtb3ZlIHlvdXR1YmUgbGluaywgc3RvcHBpbmcgdGhlIHZpZGVvIGZyb20gcGxheWluZyBpbiB0aGUgYmFja2dyb3VuZFxuICAgICAgICAkaWZyYW1lLmF0dHIoJ3NyYycsICcnKTtcbiAgICB9XG59XG4pKGpRdWVyeSk7XG4iLCIvKipcbiAqIEZvcm0gSGFuZGxlcnNcbiAqXG4gKiBAYXV0aG9yIEpvaG4gUmFuYnlcbiAqIEBzZWUgICAgaHR0cHM6Ly9naXRodWIuY29tL2pyYW5ieVxuICovXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblxuICAgIC8qXG4gICAgICogQWxsIEZvcm1zIEN1c3RvbSBCb290c3RyYXAgRmlsZSBJbnB1dCBIZWxwZXJcbiAgICAgKi9cbiAgICAkKCdpbnB1dFt0eXBlPVwiZmlsZVwiXScpLmNoYW5nZShmdW5jdGlvbihlKXtcbiAgICAgICAgdmFyIGFwcHJvdmVkID0gW10sXG4gICAgICAgICAgICBmaWxlcyA9IGUuY3VycmVudFRhcmdldC5maWxlcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGZpbGVzaXplID0gKChmaWxlc1tpXS5zaXplIC8gMTAyNCkgLyAxMDI0KS50b0ZpeGVkKDQpO1xuICAgICAgICAgICAgaWYgKGZpbGVzaXplIDw9IDEpIHtcbiAgICAgICAgICAgICAgICBhcHByb3ZlZC5wdXNoKGZpbGVzW2ldLm5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZmlsZXNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcuZmlsZWxpc3QnKS5odG1sKGFwcHJvdmVkLmpvaW4oJzxicj4nKSk7XG4gICAgfSk7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qXG4gICAgICogVGhlIERhdGVwaWNrZXIgSW5pdCBGb3IgQWxsIEZvcm1zXG4gICAgICovXG4gICAgaWYgKCQoJy5kYXRlcGlja2VyJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuZGF0ZXBpY2tlcicpLmRhdGVwaWNrZXIoe1xuICAgICAgICAgICAgZGF0ZUZvcm1hdCA6IFwiZGQtbW0teXlcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qXG4gICAgICogR2VuZXJpYyBTYXZlIEJ1dHRvbiBIYW5kbGVyXG4gICAgICpcbiAgICAgKiBCYWNvbiBpcHN1bSBkb2xvciBhbWV0IHRlbmRlcmxvaW4gY293IHRvbmd1ZSxcbiAgICAgKiBmaWxldCBtaWdub24ga2llbGJhc2EgYnJpc2tldCBzYWxhbWkgYmlsdG9uZy5cbiAgICAgKi9cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmJ0bi1zZW5kJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmNsb3Nlc3QoJ2Zvcm0nKTtcbiAgICAgICAgdmFyIHNhdmVCdXR0b24gPSBmb3JtLmZpbmQoJy5idG4tc2F2ZScpO1xuICAgICAgICB2YXIgc3Bpbm5lciA9IHNhdmVCdXR0b24uZmluZCgnLmZhLXNwaW5uZXInKTtcblxuICAgICAgICAkKGZvcm0pLnN1Ym1pdChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzKVswXS5jaGVja1ZhbGlkaXR5KCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKlxuICAgICAqIEFqYXggQ29udGFjdCBGb3JtIEhhbmRsZXJcbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgICQoZnVuY3Rpb24oKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZm9ybSAgICAgPSAkKCcjY29udGFjdC1mb3JtJyk7XG4gICAgICAgIHZhciBmb3JtTXNzZyA9IGZvcm0uZmluZCgnLmZvcm0tbWVzc2FnZXMnKTtcbiAgICAgICAgdmFyIHNlbmRCdHRuID0gZm9ybS5maW5kKCcuYnRuLXNlbmQnKTtcbiAgICAgICAgdmFyIHNwaW5uZXIgID0gc2VuZEJ0dG4uZmluZCgnLmZhLXNwaW5uZXInKTtcblxuICAgICAgICAkKGZvcm0pLnN1Ym1pdChmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmdldCgwKS5jaGVja1ZhbGlkaXR5KCkgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIGdyZWNhcHRjaGEucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyZWNhcHRjaGEuZXhlY3V0ZSgnNkxjNDBGb2FBQUFBQUs5YjRpN2hsdlNpb1oySDNXVjdwSU5LLVlVbycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2Fzcl9jb250YWN0X2Zvcm1faGFuZGxlcidcbiAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbih0b2tlbikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISB0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyZWNhcHRjaGEucmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdSZWNhcHRjaGFSZXNwb25zZSA9IGZvcm0uZmluZCgnLmctcmVjYXB0Y2hhLXJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnUmVjYXB0Y2hhUmVzcG9uc2UudmFsKHRva2VuKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gJChmb3JtKS5zZXJpYWxpemUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBDVVZBamF4LmFqYXhfdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdhc3JfY29udGFjdF9mb3JtX2hhbmRsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnZm9ybWRhdGEnOiBmb3JtRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2VuZEJ0dG4pLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc3Bpbm5lcikucmVtb3ZlQ2xhc3MoJ2Qtbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzZW5kQnR0bikucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzcGlubmVyKS5hZGRDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChmb3JtTXNzZykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZSBlcnJvcicpLmFkZENsYXNzKCdzdWNjZXNzJykudGV4dChyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmZvcm0tY29udHJvbCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5yZW1vdmVDbGFzcygnd2FzLXZhbGlkYXRlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNleGFtcGxlTW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNlbmRCdHRuKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHNwaW5uZXIpLmFkZENsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGZvcm1Nc3NnKS5yZW1vdmVDbGFzcygnZC1ub25lIHN1Y2Nlc3MnKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZVRleHQgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZm9ybU1zc2cpLnRleHQoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZm9ybU1zc2cpLnRleHQoJ0FuIGVycm9yIG9jY3VyZWQgYW5kIHlvdXIgbWVzc2FnZSBjb3VsZCBub3QgYmUgc2VudC4gUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKlxuICAgICAqIEFqYXggU2lnbnVwIE1haWxjaGltcCBGb3JtIEhhbmRsZXJcbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgICQoZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgIHZhciBmb3JtICAgICA9ICQoJyNuZXdzbGV0dGVyLXNpZ251cC1mb3JtJyk7XG4gICAgICAgIHZhciBmb3JtTXNzZyA9IGZvcm0uZmluZCgnLmZvcm0tbWVzc2FnZXMnKTtcbiAgICAgICAgdmFyIHNlbmRCdHRuID0gZm9ybS5maW5kKCcuYnRuLXNlbmQnKTtcbiAgICAgICAgdmFyIHNwaW5uZXIgID0gc2VuZEJ0dG4uZmluZCgnLmZhLXNwaW5uZXInKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbignc3VibWl0JywgJyNuZXdzbGV0dGVyLXNpZ251cC1mb3JtJywgZnVuY3Rpb24oZSkge1xuXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5nZXQoMCkuY2hlY2tWYWxpZGl0eSgpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1EYXRhID0gJChmb3JtKS5zZXJpYWxpemUoKTtcblxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBDVVZBamF4LmFqYXhfdXJsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2Fzcl9uZXdzbGV0dGVyX3NpZ251cF9mb3JtX2hhbmRsZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Zvcm1kYXRhJzogZm9ybURhdGFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHNlbmRCdHRuKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJChzcGlubmVyKS5yZW1vdmVDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAkKHNlbmRCdHRuKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgJChzcGlubmVyKS5hZGRDbGFzcygnZC1ub25lJyk7XG4gICAgICAgICAgICAgICAgICAgICQoZm9ybU1zc2cpLnJlbW92ZUNsYXNzKCdkLW5vbmUgZXJyb3InKS5hZGRDbGFzcygnc3VjY2VzcycpLnRleHQocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICAkKCcuZm9ybS1jb250cm9sJykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnI3NpZ251cF90ZXJtcycpLnByb3AoJ2NoZWNrZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcm0ucmVtb3ZlQ2xhc3MoJ3dhcy12YWxpZGF0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNuZXdzbGV0dGVyLXNpZ251cC1tb2RhbCcpLm1vZGFsKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKGZvcm1Nc3NnKS5yZW1vdmVDbGFzcygnZXJyb3Igc3VjY2VzcycpLmFkZENsYXNzKCdkLW5vbmUnKS50ZXh0KCcnKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwMCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmFpbChmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICQoc2VuZEJ0dG4pLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAkKHNwaW5uZXIpLmFkZENsYXNzKCdkLW5vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgJChmb3JtTXNzZykucmVtb3ZlQ2xhc3MoJ2Qtbm9uZSBzdWNjZXNzJykuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlVGV4dCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoZm9ybU1zc2cpLnRleHQoZGF0YS5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgJChmb3JtTXNzZykudGV4dCgnQW4gZXJyb3Igb2NjdXJlZCBhbmQgeW91ciBtZXNzYWdlIGNvdWxkIG5vdCBiZSBzZW50LiBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIEhlYWRlciBIYW5kbGVyc1xuICpcbiAqIEBhdXRob3IgSm9obiBSYW5ieVxuICogQHNlZSAgICBodHRwczovL2dpdGh1Yi5jb20vanJhbmJ5XG4gKi9cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXG4gICAgLypcbiAgICAgKiBAVE9ET1xuICAgICAqL1xuICAgIHZhciBtYWluSGVhZGVyID0gJCgnI3BhZ2UtaGVhZGVyJyksXG4gICAgICAgIGhlYWRlckhlaWdodCA9IG1haW5IZWFkZXIuaGVpZ2h0KCksXG4gICAgICAgIHNjcm9sbGluZyA9IGZhbHNlLFxuICAgICAgICBwcmV2aW91c1RvcCA9IDAsXG4gICAgICAgIGN1cnJlbnRUb3AgPSAwLFxuICAgICAgICBzY3JvbGxEZWx0YSA9IDEwLFxuICAgICAgICBzY3JvbGxPZmZzZXQgPSA5MDtcblxuICAgIC8qXG4gICAgICogQFRPRE9cbiAgICAgKi9cbiAgICAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoISBzY3JvbGxpbmcpIHtcbiAgICAgICAgICAgIHNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICAoISB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSBcbiAgICAgICAgICAgID8gc2V0VGltZW91dChhdXRvSGlkZUhlYWRlciwgMjUwKVxuICAgICAgICAgICAgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYXV0b0hpZGVIZWFkZXIpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG5cbiAgICAvKlxuICAgICAqIEBUT0RPXG4gICAgICovXG4gICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaGVhZGVySGVpZ2h0ID0gbWFpbkhlYWRlci5oZWlnaHQoKTtcbiAgICB9KTtcblxuXG4gICAgLypcbiAgICAgKiBAVE9ET1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIGF1dG9IaWRlSGVhZGVyKCkge1xuICAgICAgICB2YXIgY3VycmVudFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICAgICAgYW5pbWF0ZUxvZ28oY3VycmVudFRvcCk7XG4gICAgICAgIGNoZWNrU2ltcGxlTmF2aWdhdGlvbihjdXJyZW50VG9wKTtcbiAgICAgICAgcHJldmlvdXNUb3AgPSBjdXJyZW50VG9wO1xuICAgICAgICBzY3JvbGxpbmcgPSBmYWxzZTtcbiAgICB9XG5cblxuICAgIC8qXG4gICAgICogQFRPRE9cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbmltYXRlTG9nbyhjdXJyZW50VG9wKSB7XG4gICAgICAgIGlmIChjdXJyZW50VG9wID4gMSkge1xuICAgICAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdzY3JvbGxlZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdzY3JvbGxlZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKlxuICAgICAqIEBUT0RPXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2hlY2tTaW1wbGVOYXZpZ2F0aW9uKGN1cnJlbnRUb3ApIHtcbiAgICAgICAgaWYgKHByZXZpb3VzVG9wIC0gY3VycmVudFRvcCA+IHNjcm9sbERlbHRhKSB7XG4gICAgICAgICAgICBpZiAobWFpbkhlYWRlci5oYXNDbGFzcygnaGFzLXNob3AtbmF2JykpIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sJykucmVtb3ZlQ2xhc3MoJ25hdi1waW5uZWQnKTtcbiAgICAgICAgICAgICAgICBtYWluSGVhZGVyLnJlbW92ZUNsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VG9wIC0gcHJldmlvdXNUb3AgPiBzY3JvbGxEZWx0YSAmJiBjdXJyZW50VG9wID4gc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgICAgICBpZiAobWFpbkhlYWRlci5oYXNDbGFzcygnaGFzLXNob3AtbmF2JykpIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sJykuYWRkQ2xhc3MoJ25hdi1waW5uZWQnKTtcbiAgICAgICAgICAgICAgICBtYWluSGVhZGVyLmFkZENsYXNzKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pOyIsIi8qKlxuICogTWVudSBhbmQgTWF2aWdhdGlvbiBFbGVtZW50IEhhbmRsZXJzLlxuICpcbiAqIEBhdXRob3IgSm9obiBSYW5ieVxuICogQHNlZSAgICBodHRwczovL2dpdGh1Yi5jb20vanJhbmJ5XG4gKi9cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXG4gICAgLypcbiAgICAgKiBNZW51IFRvZ2dsZSBDbGljayBIYW5nbGVyXG4gICAgICpcbiAgICAgKiBCYWNvbiBpcHN1bSBkb2xvciBhbWV0IHRlbmRlcmxvaW4gY293IHRvbmd1ZSxcbiAgICAgKiBmaWxldCBtaWdub24ga2llbGJhc2EgYnJpc2tldCBzYWxhbWkgYmlsdG9uZy5cbiAgICAgKi9cbiAgICAkKCcubWVudS10b2dnbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnYm9keScpLnRvZ2dsZUNsYXNzKCdtZW51LW9wZW4nKTtcbiAgICB9KTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLypcbiAgICAgKiBDYWNoZSBDdXJyZW50IFdpbmRvdyBXaXN0aFxuICAgICAqL1xuICAgIHZhciBjYWNoZWRXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKlxuICAgICAqIFN1YiBNZW51IFRvZ2dsZSBDbGljayBIYW5nbGVyXG4gICAgICpcbiAgICAgKiBCYWNvbiBpcHN1bSBkb2xvciBhbWV0IHRlbmRlcmxvaW4gY293IHRvbmd1ZSxcbiAgICAgKiBmaWxldCBtaWdub24ga2llbGJhc2EgYnJpc2tldCBzYWxhbWkgYmlsdG9uZy5cbiAgICAgKi9cbiAgICAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChjYWNoZWRXaWR0aCA8IDEzNjYpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuID4gYScpLm5vdCh0aGlzKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnc3ViLW1lbnUtb3BlbicpO1xuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcygnc3ViLW1lbnUtb3BlbicpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9ICQod2luZG93KS53aWR0aCgpO1xuICAgICAgICBpZiAobmV3V2lkdGggIT09IGNhY2hlZFdpZHRoKXtcbiAgICAgICAgICAgIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ21lbnUtb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdtZW51LW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykucmVtb3ZlQ2xhc3MoJ3N1Yi1tZW51LW9wZW4nKTtcbiAgICAgICAgICAgIGNhY2hlZFdpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLypcbiAgICAgKiBPZmYgU2lkZWJhciBDbGljayBUbyBDbG9zZSBIYW5kbGluZ1xuICAgICAqXG4gICAgICogQmFjb24gaXBzdW0gZG9sb3IgYW1ldCB0ZW5kZXJsb2luIGNvdyB0b25ndWUsXG4gICAgICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gICAgICovXG4gICAgJChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbihldnQpIHtcbiAgICAgICAgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnb2ZmLWNhbnZhcy1vcGVuJykpIHtcbiAgICAgICAgICAgIHZhciBlbGVtZW50cyA9ICcubWVudSwgLm1lbnUtdG9nZ2xlLCAub2ZmLWNhbnZhcywgLm1lbnUtc29jaWFscywgLm9mZi1jYW52YXMtc2VhcmNoJztcbiAgICAgICAgICAgIGlmICghICQoZWxlbWVudHMpLmlzKGV2dC50YXJnZXQpICYmICQoZWxlbWVudHMpLmhhcyhldnQudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKCcub2ZmLWNhbnZhcycpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdvZmYtY2FudmFzLW9wZW4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufSk7XG4iLCIvKipcbiAqIFNjcm9sbCBGdW5jdGlvbnMgKyBIYW5kbGVyc1xuICpcbiAqIEBhdXRob3IgSm9obiBSYW5ieVxuICogQHNlZSAgICBodHRwczovL2dpdGh1Yi5jb20vanJhbmJ5XG4gKi9cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXG4gICAgLypcbiAgICAgKiBTY3JvbGwgVG8gRWxlbWVudCBCdXR0b24gSGFuZGxlcnNcbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgIGlmICgkKCcuc2Nyb2xsLXRvLXRoZWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5zY3JvbGwtdG8tdGhlZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBDVVZBamF4LnNjcm9sbFRvRWwoaHJlZiwgMCwgbnVsbCk7XG4gICAgICAgICAgICB9KTsgICAgICAgICAgICBcbiAgICAgICAgfSk7ICAgICAgICBcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qXG4gICAgICogU2Nyb2xsIFRvIFRvcFxuICAgICAqXG4gICAgICogU3VwZXIgc2ltcGxlIHNjcm9sbCB0byB0b3AgZnVuY3Rpb25hbGl0eVxuICAgICAqIGZpcmVkIHdoZW4gc2Nyb2xsaW5nIHBhc3QgYSBnaXZlbiBoZWlnaHQuXG4gICAgICovXG4gICAgJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPiAzNDApIHtcbiAgICAgICAgICAgICQoJyNiYWNrLXRvcCcpLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjYmFjay10b3AnKS5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAkKCcjYmFjay10b3AnKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCgnYm9keSwgaHRtbCcpLmFuaW1hdGUoe3Njcm9sbFRvcDogMH0sIDgwMCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn0pO1xuIiwiLyoqXG4gKiBTbGljayBDYXJvdXNlbCBJbml0cyArIEhhbmRsZXNcbiAqXG4gKiBAYXV0aG9yIEpvaG4gUmFuYnlcbiAqIEBzZWUgICAgaHR0cHM6Ly9naXRodWIuY29tL2pyYW5ieVxuICovXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblxuICAgIC8qXG4gICAgICogTGluayBDYXJvdXNlbC5cbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgIGlmICgkKCcubGluay1jYXJvdXNlbCAuY2Fyb3VzZWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5saW5rLWNhcm91c2VsIC5jYXJvdXNlbCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzcGVjU2xpZGVyID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICBzcGVjUGFnaW5nID0gc3BlY1NsaWRlci5wYXJlbnQoKS5maW5kKCcucGFnZXInKTtcblxuICAgICAgICAgICAgdmFyIHNwZWNQcmV2ID0gc3BlY1BhZ2luZy5maW5kKCcucHJldicpLFxuICAgICAgICAgICAgICAgIHNwZWNOZXh0ID0gc3BlY1BhZ2luZy5maW5kKCcubmV4dCcpO1xuXG4gICAgICAgICAgICBzcGVjU2xpZGVyLm9uKCdpbml0JywgZnVuY3Rpb24gKGV2ZW50LCBzbGljaykge1xuICAgICAgICAgICAgICAgIC8vJCgnLnNsaWNrLWN1cnJlbnQnKS5uZXh0KCkuYWRkQ2xhc3MoJ3B1bGwtZG93bicpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHNwZWNTbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiBzcGVjUHJldixcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IHNwZWNOZXh0LFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogc3BlY1BhZ2luZyxcbiAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogMCxcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5OiAwLFxuICAgICAgICAgICAgICAgIHJvd3M6IDAsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMzY2LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXSAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBUZXh0IENhcm91c2VsLlxuICAgICAqXG4gICAgICogQmFjb24gaXBzdW0gZG9sb3IgYW1ldCB0ZW5kZXJsb2luIGNvdyB0b25ndWUsXG4gICAgICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gICAgICovXG4gICAgaWYgKCQoJy50ZXh0LWNhcm91c2VsIC5jYXJvdXNlbCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLnRleHQtY2Fyb3VzZWwgLmNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwZWNTbGlkZXIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHNwZWNQYWdpbmcgPSBzcGVjU2xpZGVyLnBhcmVudCgpLmZpbmQoJy5wYWdlcicpO1xuXG4gICAgICAgICAgICB2YXIgc3BlY1ByZXYgPSBzcGVjUGFnaW5nLmZpbmQoJy5wcmV2JyksXG4gICAgICAgICAgICAgICAgc3BlY05leHQgPSBzcGVjUGFnaW5nLmZpbmQoJy5uZXh0Jyk7XG5cbiAgICAgICAgICAgIHNwZWNTbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiBzcGVjUHJldixcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IHNwZWNOZXh0LFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogc3BlY1BhZ2luZyxcbiAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogMCxcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5OiAwLFxuICAgICAgICAgICAgICAgIHJvd3M6IDAsXG4gICAgICAgICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha3BvaW50OiAxMzY2LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNTc2LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyb3dzOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgXSAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBJbWFnZSBDYXJvdXNlbC5cbiAgICAgKlxuICAgICAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICAgICAqIGZpbGV0IG1pZ25vbiBraWVsYmFzYSBicmlza2V0IHNhbGFtaSBiaWx0b25nLlxuICAgICAqL1xuICAgIGlmICgkKCcuaW1hZ2UtY2Fyb3VzZWwgLmNhcm91c2VsJykubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCcuaW1hZ2UtY2Fyb3VzZWwgLmNhcm91c2VsJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwZWNTbGlkZXIgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgIHNwZWNQYWdpbmcgPSBzcGVjU2xpZGVyLnBhcmVudCgpLmZpbmQoJy5wYWdlcicpO1xuXG4gICAgICAgICAgICB2YXIgc3BlY1ByZXYgPSBzcGVjUGFnaW5nLmZpbmQoJy5wcmV2JyksXG4gICAgICAgICAgICAgICAgc3BlY05leHQgPSBzcGVjUGFnaW5nLmZpbmQoJy5uZXh0Jyk7XG5cbiAgICAgICAgICAgIHNwZWNTbGlkZXIuc2xpY2soe1xuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldkFycm93OiBzcGVjUHJldixcbiAgICAgICAgICAgICAgICBuZXh0QXJyb3c6IHNwZWNOZXh0LFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogc3BlY1BhZ2luZyxcbiAgICAgICAgICAgICAgICBhZGFwdGl2ZUhlaWdodDogMCxcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmlsaXR5OiAwLFxuICAgICAgICAgICAgICAgIHJvd3M6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFF1b3RlIENhcm91c2VsLlxuICAgICAqXG4gICAgICogQmFjb24gaXBzdW0gZG9sb3IgYW1ldCB0ZW5kZXJsb2luIGNvdyB0b25ndWUsXG4gICAgICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gICAgICovXG4gICAgaWYgKCQoJy5xdW90ZS1jYXJvdXNlbCAuY2Fyb3VzZWwnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJy5xdW90ZS1jYXJvdXNlbCAuY2Fyb3VzZWwnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3BlY1NsaWRlciA9ICQodGhpcyksXG4gICAgICAgICAgICAgICAgc3BlY1BhZ2luZyA9IHNwZWNTbGlkZXIucGFyZW50KCkuZmluZCgnLnBhZ2VyJyk7XG5cbiAgICAgICAgICAgIHZhciBzcGVjUHJldiA9IHNwZWNQYWdpbmcuZmluZCgnLnByZXYnKSxcbiAgICAgICAgICAgICAgICBzcGVjTmV4dCA9IHNwZWNQYWdpbmcuZmluZCgnLm5leHQnKTtcblxuICAgICAgICAgICAgc3BlY1NsaWRlci5zbGljayh7XG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6IHNwZWNQcmV2LFxuICAgICAgICAgICAgICAgIG5leHRBcnJvdzogc3BlY05leHQsXG4gICAgICAgICAgICAgICAgYXBwZW5kQXJyb3dzOiBzcGVjUGFnaW5nLFxuICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiAwLFxuICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk6IDAsXG4gICAgICAgICAgICAgICAgcm93czogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pO1xuIiwiLypcbiAqIEdvb2dsZSBUYWcgTWFuYWdlciAmIEFuYWx5dGljcyBIYW5kbGluZ1xuICpcbiAqIEJhY29uIGlwc3VtIGRvbG9yIGFtZXQgdGVuZGVybG9pbiBjb3cgdG9uZ3VlLFxuICogZmlsZXQgbWlnbm9uIGtpZWxiYXNhIGJyaXNrZXQgc2FsYW1pIGJpbHRvbmcuXG4gKi9cbihmdW5jdGlvbigpIHtcblxuICAgIC8vIEFkZCBjbGljayB0cmFja2luZ1xuICAgIHZhciBlbnRpdHlMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lbnRpdHktY2xpY2snKTtcbiAgICBbXS5mb3JFYWNoLmNhbGwoZW50aXR5TGlua3MsIGZ1bmN0aW9uKGVudGl0eUxpbmspIHtcbiAgICAgICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGVudGl0eUxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGV2ZW50TGFiZWwgID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2RhdGEtZ3RhZy1sYWJlbCcpID8gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ3RhZy1sYWJlbCcpIDogJyc7IFxuICAgICAgICAgICAgdmFyIGV2ZW50QWN0aW9uID0gdGhpcy5oYXNBdHRyaWJ1dGUoJ2RhdGEtZ3RhZy1hY3Rpb24nKSA/IHRoaXMuZ2V0QXR0cmlidXRlKCdkYXRhLWd0YWctYWN0aW9uJykgOiAnQ2xpY2snO1xuICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCBldmVudEFjdGlvbiwge1xuICAgICAgICAgICAgICAgICdldmVudF9jYXRlZ29yeSc6ICdHSEUnLFxuICAgICAgICAgICAgICAgICdldmVudF9sYWJlbCc6IGV2ZW50TGFiZWxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7XG4iLCJpZiAoISBBcnJheS5mcm9tKSB7XG4gICAgQXJyYXkuZnJvbSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzeW1ib2xJdGVyYXRvcjtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN5bWJvbEl0ZXJhdG9yID0gU3ltYm9sLml0ZXJhdG9yXG4gICAgICAgICAgICAgICAgPyBTeW1ib2wuaXRlcmF0b3JcbiAgICAgICAgICAgICAgICA6ICdTeW1ib2woU3ltYm9sLml0ZXJhdG9yKSc7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgc3ltYm9sSXRlcmF0b3IgPSAnU3ltYm9sKFN5bWJvbC5pdGVyYXRvciknO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICAgICAgdmFyIGlzQ2FsbGFibGUgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIGZuID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgICAgICAgdG9TdHIuY2FsbChmbikgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSdcbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciB0b0ludGVnZXIgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBudW1iZXIgPSBOdW1iZXIodmFsdWUpO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG51bWJlcikpIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKG51bWJlciA9PT0gMCB8fCAhaXNGaW5pdGUobnVtYmVyKSkgcmV0dXJuIG51bWJlcjtcbiAgICAgICAgICAgIHJldHVybiAobnVtYmVyID4gMCA/IDEgOiAtMSkgKiBNYXRoLmZsb29yKE1hdGguYWJzKG51bWJlcikpO1xuICAgICAgICB9O1xuICAgICAgICB2YXIgbWF4U2FmZUludGVnZXIgPSBNYXRoLnBvdygyLCA1MykgLSAxO1xuICAgICAgICB2YXIgdG9MZW5ndGggPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSB0b0ludGVnZXIodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KGxlbiwgMCksIG1heFNhZmVJbnRlZ2VyKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc2V0R2V0SXRlbUhhbmRsZXIgPSBmdW5jdGlvbiBzZXRHZXRJdGVtSGFuZGxlcihpc0l0ZXJhdG9yLCBpdGVtcykge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXNJdGVyYXRvciAmJiBpdGVtc1tzeW1ib2xJdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRJdGVtKGspIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNJdGVyYXRvciA/IGl0ZXJhdG9yLm5leHQoKSA6IGl0ZW1zW2tdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgZ2V0QXJyYXkgPSBmdW5jdGlvbiBnZXRBcnJheShcbiAgICAgICAgICAgIFQsXG4gICAgICAgICAgICBBLFxuICAgICAgICAgICAgbGVuLFxuICAgICAgICAgICAgZ2V0SXRlbSxcbiAgICAgICAgICAgIGlzSXRlcmF0b3IsXG4gICAgICAgICAgICBtYXBGblxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIDE2LiBMZXQgayBiZSAwLlxuICAgICAgICAgICAgdmFyIGsgPSAwO1xuXG4gICAgICAgICAgICAvLyAxNy4gUmVwZWF0LCB3aGlsZSBrIDwgbGVu4oCmIG9yIHdoaWxlIGl0ZXJhdG9yIGlzIGRvbmUgKGFsc28gc3RlcHMgYSAtIGgpXG4gICAgICAgICAgICB3aGlsZSAoayA8IGxlbiB8fCBpc0l0ZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGspO1xuICAgICAgICAgICAgICAgIHZhciBrVmFsdWUgPSBpc0l0ZXJhdG9yID8gaXRlbS52YWx1ZSA6IGl0ZW07XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNJdGVyYXRvciAmJiBpdGVtLmRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcEZuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBW2tdID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgVCA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBtYXBGbihrVmFsdWUsIGspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbWFwRm4uY2FsbChULCBrVmFsdWUsIGspO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgQVtrXSA9IGtWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrICs9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc0l0ZXJhdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgJ0FycmF5LmZyb206IHByb3ZpZGVkIGFycmF5TGlrZSBvciBpdGVyYXRvciBoYXMgbGVuZ3RoIG1vcmUgdGhlbiAyICoqIDUyIC0gMSdcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBBLmxlbmd0aCA9IGxlbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIEE7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVGhlIGxlbmd0aCBwcm9wZXJ0eSBvZiB0aGUgZnJvbSBtZXRob2QgaXMgMS5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlT3JJdGVyYXRvciAvKiwgbWFwRm4sIHRoaXNBcmcgKi8pIHtcbiAgICAgICAgICAgIC8vIDEuIExldCBDIGJlIHRoZSB0aGlzIHZhbHVlLlxuICAgICAgICAgICAgdmFyIEMgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyAyLiBMZXQgaXRlbXMgYmUgVG9PYmplY3QoYXJyYXlMaWtlT3JJdGVyYXRvcikuXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBPYmplY3QoYXJyYXlMaWtlT3JJdGVyYXRvcik7XG4gICAgICAgICAgICB2YXIgaXNJdGVyYXRvciA9IGlzQ2FsbGFibGUoaXRlbXNbc3ltYm9sSXRlcmF0b3JdKTtcblxuICAgICAgICAgICAgLy8gMy4gUmV0dXJuSWZBYnJ1cHQoaXRlbXMpLlxuICAgICAgICAgICAgaWYgKGFycmF5TGlrZU9ySXRlcmF0b3IgPT0gbnVsbCAmJiAhaXNJdGVyYXRvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdBcnJheS5mcm9tIHJlcXVpcmVzIGFuIGFycmF5LWxpa2Ugb2JqZWN0IG9yIGl0ZXJhdG9yIC0gbm90IG51bGwgb3IgdW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIDQuIElmIG1hcGZuIGlzIHVuZGVmaW5lZCwgdGhlbiBsZXQgbWFwcGluZyBiZSBmYWxzZS5cbiAgICAgICAgICAgIHZhciBtYXBGbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdm9pZCB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgVDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbWFwRm4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gNS4gZWxzZVxuICAgICAgICAgICAgICAgIC8vIDUuIGEgSWYgSXNDYWxsYWJsZShtYXBmbikgaXMgZmFsc2UsIHRocm93IGEgVHlwZUVycm9yIGV4Y2VwdGlvbi5cbiAgICAgICAgICAgICAgICBpZiAoIWlzQ2FsbGFibGUobWFwRm4pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAnQXJyYXkuZnJvbTogd2hlbiBwcm92aWRlZCwgdGhlIHNlY29uZCBhcmd1bWVudCBtdXN0IGJlIGEgZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gNS4gYi4gSWYgdGhpc0FyZyB3YXMgc3VwcGxpZWQsIGxldCBUIGJlIHRoaXNBcmc7IGVsc2UgbGV0IFQgYmUgdW5kZWZpbmVkLlxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICBUID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gMTAuIExldCBsZW5WYWx1ZSBiZSBHZXQoaXRlbXMsIFwibGVuZ3RoXCIpLlxuICAgICAgICAgICAgLy8gMTEuIExldCBsZW4gYmUgVG9MZW5ndGgobGVuVmFsdWUpLlxuICAgICAgICAgICAgdmFyIGxlbiA9IHRvTGVuZ3RoKGl0ZW1zLmxlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIDEzLiBJZiBJc0NvbnN0cnVjdG9yKEMpIGlzIHRydWUsIHRoZW5cbiAgICAgICAgICAgIC8vIDEzLiBhLiBMZXQgQSBiZSB0aGUgcmVzdWx0IG9mIGNhbGxpbmcgdGhlIFtbQ29uc3RydWN0XV0gaW50ZXJuYWwgbWV0aG9kXG4gICAgICAgICAgICAvLyBvZiBDIHdpdGggYW4gYXJndW1lbnQgbGlzdCBjb250YWluaW5nIHRoZSBzaW5nbGUgaXRlbSBsZW4uXG4gICAgICAgICAgICAvLyAxNC4gYS4gRWxzZSwgTGV0IEEgYmUgQXJyYXlDcmVhdGUobGVuKS5cbiAgICAgICAgICAgIHZhciBBID0gaXNDYWxsYWJsZShDKSA/IE9iamVjdChuZXcgQyhsZW4pKSA6IG5ldyBBcnJheShsZW4pO1xuXG4gICAgICAgICAgICByZXR1cm4gZ2V0QXJyYXkoXG4gICAgICAgICAgICAgICAgVCxcbiAgICAgICAgICAgICAgICBBLFxuICAgICAgICAgICAgICAgIGxlbixcbiAgICAgICAgICAgICAgICBzZXRHZXRJdGVtSGFuZGxlcihpc0l0ZXJhdG9yLCBpdGVtcyksXG4gICAgICAgICAgICAgICAgaXNJdGVyYXRvcixcbiAgICAgICAgICAgICAgICBtYXBGblxuICAgICAgICAgICAgKTtcbiAgICAgICAgfTtcbiAgICB9KSgpO1xufVxuIiwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuQXBwbGljYXRpb246ICAgVXRpbGl0eSBGdW5jdGlvblxyXG5BdXRob3I6ICAgICAgICBKb2huIEdhcmRuZXJcclxuXHJcblZlcnNpb246ICAgICAgIFYxLjBcclxuRGF0ZTogICAgICAgICAgMTh0aCBOb3ZlbWJlciAyMDAzXHJcbkRlc2NyaXB0aW9uOiAgIFVzZWQgdG8gY2hlY2sgdGhlIHZhbGlkaXR5IG9mIGEgVUsgcG9zdGNvZGVcclxuXHJcblZlcnNpb246ICAgICAgIFYyLjBcclxuRGF0ZTogICAgICAgICAgOHRoIE1hcmNoIDIwMDVcclxuRGVzY3JpcHRpb246ICAgQkZQTyBwb3N0Y29kZXMgaW1wbGVtZW50ZWQuXHJcblx0XHRcdCAgIFRoZSBydWxlcyBjb25jZXJuaW5nIHdoaWNoIGFscGhhYmV0aWMgY2hhcmFjdGVycyBhcmUgYWxsb3dlZCBpbiB3aGljaCBwYXJ0IG9mIHRoZSBcclxuXHRcdFx0ICAgcG9zdGNvZGUgd2VyZSBtb3JlIHN0cmluZ2VudGx5IGltcGxlbWVudGQuXHJcbiAgXHJcblZlcnNpb246ICAgICAgIFYzLjBcclxuRGF0ZTogICAgICAgICAgOHRoIEF1Z3VzdCAyMDA1XHJcbkRlc2NyaXB0aW9uOiAgIFN1cHBvcnQgZm9yIE92ZXJzZWFzIFRlcnJpdG9yaWVzIGFkZGVkICAgICAgICAgICAgICAgICBcclxuICBcclxuVmVyc2lvbjogICAgICAgVjMuMVxyXG5EYXRlOiAgICAgICAgICAyM3JkIE1hcmNoIDIwMDhcclxuRGVzY3JpcHRpb246ICAgUHJvYmxlbSBjb3JyZWN0ZWQgd2hlcmVieSB2YWxpZCBwb3N0Y29kZSBub3QgcmV0dXJuZWQsIGFuZCAnQkQyMyBEWCcgd2FzIGludmFsaWRseSBcclxuXHRcdFx0ICAgdHJlYXRlZCBhcyAnQkQyIDNEWCcgKHRoYW5rcyBQZXRlciBHcmF2ZXMpICAgICAgICBcclxuICBcclxuVmVyc2lvbjogICAgICAgVjQuMFxyXG5EYXRlOiAgICAgICAgICA3dGggT2N0b2JlciAyMDA5XHJcbkRlc2NyaXB0aW9uOiAgIENoYXJhY3RlciAzIGV4dGVuZGVkIHRvIGFsbG93ICdwbW5ydnh5JyAodGhhbmtzIHRvIEphY28gZGUgR3Jvb3QpICBcclxuXHJcblZlcnNpb246ICAgICAgIFY0LjFcclxuXHRcdFx0ICAgOHRoIFNlcHRlbWJlciAyMDExXHJcblx0XHRcdCAgIFN1cHBvcnQgZm9yIEFuZ3VpbGxhIG92ZXJzZWFzIHRlcnJpdG9yeSBhZGRlZCAgICBcclxuXHRcdFx0ICAgXHJcblZlcnNpb246ICAgICAgIFY1LjBcclxuRGF0ZTogICAgICAgICAgOHRoIE5vdmVtYmVyIDIwMTJcclxuXHRcdFx0ICAgU3BlY2lmaWMgc3VwcG9ydCBhZGRlZCBmb3IgbmV3IEJGUE8gcG9zdGNvZGVzICAgICAgICAgICBcclxuICBcclxuUGFyYW1ldGVyczogICAgdG9DaGVjayAtIHBvc3Rjb2RldG8gYmUgY2hlY2tlZC4gXHJcblxyXG5UaGlzIGZ1bmN0aW9uIGNoZWNrcyB0aGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBmb3IgYSB2YWxpZCBwb3N0Y29kZSBmb3JtYXQuIFRoZSBzcGFjZSBiZXR3ZWVuIHRoZSBcclxuaW53YXJkIHBhcnQgYW5kIHRoZSBvdXR3YXJkIHBhcnQgaXMgb3B0aW9uYWwsIGFsdGhvdWdoIGlzIGluc2VydGVkIGlmIG5vdCB0aGVyZSBhcyBpdCBpcyBwYXJ0IG9mIHRoZSBcclxub2ZmaWNpYWwgcG9zdGNvZGUuXHJcblxyXG5JZiB0aGUgcG9zdGNvZGUgaXMgZm91bmQgdG8gYmUgaW4gYSB2YWxpZCBmb3JtYXQsIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRoZSBwb3N0Y29kZSBwcm9wZXJseSBcclxuZm9ybWF0dGVkIChpbiBjYXBpdGFscyB3aXRoIHRoZSBvdXR3YXJkIGNvZGUgYW5kIHRoZSBpbndhcmQgY29kZSBzZXBhcmF0ZWQgYnkgYSBzcGFjZS4gSWYgdGhlIFxyXG5wb3N0Y29kZSBpcyBkZWVtZWQgdG8gYmUgaW5jb3JyZWN0IGEgdmFsdWUgb2YgZmFsc2UgaXMgcmV0dXJuZWQuXHJcbiAgXHJcbkV4YW1wbGUgY2FsbDpcclxuICBcclxuICBpZiAoY2hlY2tQb3N0Q29kZSAobXlQb3N0Q29kZSkpIHtcclxuXHRhbGVydCAoXCJQb3N0Y29kZSBoYXMgYSB2YWxpZCBmb3JtYXRcIilcclxuICB9IFxyXG4gIGVsc2Uge2FsZXJ0IChcIlBvc3Rjb2RlIGhhcyBpbnZhbGlkIGZvcm1hdFwiKX07XHJcblx0XHRcdFx0XHRcclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxud2luZG93LmNoZWNrUG9zdENvZGUgPSBmdW5jdGlvbiAodG9DaGVjaykge1xyXG5cclxuXHQvLyBQZXJtaXR0ZWQgbGV0dGVycyBkZXBlbmQgdXBvbiB0aGVpciBwb3NpdGlvbiBpbiB0aGUgcG9zdGNvZGUuXHJcblx0dmFyIGFscGhhMSA9IFwiW2FiY2RlZmdoaWprbG1ub3Byc3R1d3l6XVwiOyAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hhcmFjdGVyIDFcclxuXHR2YXIgYWxwaGEyID0gXCJbYWJjZGVmZ2hrbG1ub3BxcnN0dXZ3eHldXCI7ICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGFyYWN0ZXIgMlxyXG5cdHZhciBhbHBoYTMgPSBcIlthYmNkZWZnaGprcG1ucnN0dXZ3eHldXCI7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoYXJhY3RlciAzXHJcblx0dmFyIGFscGhhNCA9IFwiW2FiZWhtbnBydnd4eV1cIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hhcmFjdGVyIDRcclxuXHR2YXIgYWxwaGE1ID0gXCJbYWJkZWZnaGpsbnBxcnN0dXd4eXpdXCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDaGFyYWN0ZXIgNVxyXG5cdHZhciBCRlBPYTUgPSBcIlthYmRlZmdoamxucHFyc3RdXCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJGUE8gYWxwaGE1XHJcblx0dmFyIEJGUE9hNiA9IFwiW2FiZGVmZ2hqbG5wcXJzdHV3enl6XVwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQkZQTyBhbHBoYTZcclxuXHJcblx0Ly8gQXJyYXkgaG9sZHMgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIHRoZSB2YWxpZCBwb3N0Y29kZXNcclxuXHR2YXIgcGNleHAgPSBuZXcgQXJyYXkgKCk7XHJcblxyXG5cdC8vIEJGUE8gcG9zdGNvZGVzXHJcblx0cGNleHAucHVzaCAobmV3IFJlZ0V4cCAoXCJeKGJmMSkoXFxcXHMqKShbMC02XXsxfVwiICsgQkZQT2E1ICsgXCJ7MX1cIiArIEJGUE9hNiArIFwiezF9KSRcIixcImlcIikpO1xyXG5cclxuXHQvLyBFeHByZXNzaW9uIGZvciBwb3N0Y29kZXM6IEFOIE5BQSwgQU5OIE5BQSwgQUFOIE5BQSwgYW5kIEFBTk4gTkFBXHJcblx0cGNleHAucHVzaCAobmV3IFJlZ0V4cCAoXCJeKFwiICsgYWxwaGExICsgXCJ7MX1cIiArIGFscGhhMiArIFwiP1swLTldezEsMn0pKFxcXFxzKikoWzAtOV17MX1cIiArIGFscGhhNSArIFwiezJ9KSRcIixcImlcIikpO1xyXG5cclxuXHQvLyBFeHByZXNzaW9uIGZvciBwb3N0Y29kZXM6IEFOQSBOQUFcclxuXHRwY2V4cC5wdXNoIChuZXcgUmVnRXhwIChcIl4oXCIgKyBhbHBoYTEgKyBcInsxfVswLTldezF9XCIgKyBhbHBoYTMgKyBcInsxfSkoXFxcXHMqKShbMC05XXsxfVwiICsgYWxwaGE1ICsgXCJ7Mn0pJFwiLFwiaVwiKSk7XHJcblxyXG5cdC8vIEV4cHJlc3Npb24gZm9yIHBvc3Rjb2RlczogQUFOQSAgTkFBXHJcblx0cGNleHAucHVzaCAobmV3IFJlZ0V4cCAoXCJeKFwiICsgYWxwaGExICsgXCJ7MX1cIiArIGFscGhhMiArIFwiezF9XCIgKyBcIj9bMC05XXsxfVwiICsgYWxwaGE0ICtcInsxfSkoXFxcXHMqKShbMC05XXsxfVwiICsgYWxwaGE1ICsgXCJ7Mn0pJFwiLFwiaVwiKSk7XHJcblxyXG5cdC8vIEV4Y2VwdGlvbiBmb3IgdGhlIHNwZWNpYWwgcG9zdGNvZGUgR0lSIDBBQVxyXG5cdHBjZXhwLnB1c2ggKC9eKEdJUikoXFxzKikoMEFBKSQvaSk7XHJcblxyXG5cdC8vIFN0YW5kYXJkIEJGUE8gbnVtYmVyc1xyXG5cdHBjZXhwLnB1c2ggKC9eKGJmcG8pKFxccyopKFswLTldezEsNH0pJC9pKTtcclxuXHJcblx0Ly8gYy9vIEJGUE8gbnVtYmVyc1xyXG5cdHBjZXhwLnB1c2ggKC9eKGJmcG8pKFxccyopKGNcXC9vXFxzKlswLTldezEsM30pJC9pKTtcclxuXHJcblx0Ly8gT3ZlcnNlYXMgVGVycml0b3JpZXNcclxuXHRwY2V4cC5wdXNoICgvXihbQS1aXXs0fSkoXFxzKikoMVpaKSQvaSk7ICBcclxuXHJcblx0Ly8gQW5ndWlsbGFcclxuXHRwY2V4cC5wdXNoICgvXihhaS0yNjQwKSQvaSk7XHJcblxyXG5cdC8vIExvYWQgdXAgdGhlIHN0cmluZyB0byBjaGVja1xyXG5cdHZhciBwb3N0Q29kZSA9IHRvQ2hlY2s7XHJcblxyXG5cdC8vIEFzc3VtZSB3ZSdyZSBub3QgZ29pbmcgdG8gZmluZCBhIHZhbGlkIHBvc3Rjb2RlXHJcblx0dmFyIHZhbGlkID0gZmFsc2U7XHJcblxyXG5cdC8vIENoZWNrIHRoZSBzdHJpbmcgYWdhaW5zdCB0aGUgdHlwZXMgb2YgcG9zdCBjb2Rlc1xyXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcGNleHAubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRpZiAocGNleHBbaV0udGVzdChwb3N0Q29kZSkpIHtcclxuXHJcblx0XHRcdC8vIFRoZSBwb3N0IGNvZGUgaXMgdmFsaWQgLSBzcGxpdCB0aGUgcG9zdCBjb2RlIGludG8gY29tcG9uZW50IHBhcnRzXHJcblx0XHRcdHBjZXhwW2ldLmV4ZWMocG9zdENvZGUpO1xyXG5cclxuXHRcdFx0Ly8gQ29weSBpdCBiYWNrIGludG8gdGhlIG9yaWdpbmFsIHN0cmluZywgY29udmVydGluZyBpdCB0byB1cHBlcmNhc2UgYW5kIGluc2VydGluZyBhIHNwYWNlIFxyXG5cdFx0XHQvLyBiZXR3ZWVuIHRoZSBpbndhcmQgYW5kIG91dHdhcmQgY29kZXNcclxuXHRcdFx0cG9zdENvZGUgPSBSZWdFeHAuJDEudG9VcHBlckNhc2UoKSArIFwiIFwiICsgUmVnRXhwLiQzLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5cdFx0XHQvLyBJZiBpdCBpcyBhIEJGUE8gYy9vIHR5cGUgcG9zdGNvZGUsIHRpZHkgdXAgdGhlIFwiYy9vXCIgcGFydFxyXG5cdFx0XHRwb3N0Q29kZSA9IHBvc3RDb2RlLnJlcGxhY2UgKC9DXFwvT1xccyovLFwiYy9vIFwiKTtcclxuXHJcblx0XHRcdC8vIElmIGl0IGlzIHRoZSBBbmd1aWxsYSBvdmVyc2VhcyB0ZXJyaXRvcnkgcG9zdGNvZGUsIHdlIG5lZWQgdG8gdHJlYXQgaXQgc3BlY2lhbGx5XHJcblx0XHRcdGlmICh0b0NoZWNrLnRvVXBwZXJDYXNlKCkgPT0gJ0FJLTI2NDAnKSB7XHJcblx0XHRcdFx0cG9zdENvZGUgPSAnQUktMjY0MCdcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdC8vIExvYWQgbmV3IHBvc3Rjb2RlIGJhY2sgaW50byB0aGUgZm9ybSBlbGVtZW50XHJcblx0XHRcdHZhbGlkID0gdHJ1ZTtcclxuXHJcblx0XHRcdC8vIFJlbWVtYmVyIHRoYXQgd2UgaGF2ZSBmb3VuZCB0aGF0IHRoZSBjb2RlIGlzIHZhbGlkIGFuZCBicmVhayBmcm9tIGxvb3BcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBSZXR1cm4gd2l0aCBlaXRoZXIgdGhlIHJlZm9ybWF0dGVkIHZhbGlkIHBvc3Rjb2RlIG9yIHRoZSBvcmlnaW5hbCBpbnZhbGlkIHBvc3Rjb2RlXHJcblx0aWYgKHZhbGlkKSB7XHJcblx0XHRyZXR1cm4gcG9zdENvZGU7XHJcblx0fVxyXG5cdHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy8gVmFsaWRhdGUgdGhlIGZpZWxkXHJcbndpbmRvdy5maWVsZEhhc0Vycm9yID0gZnVuY3Rpb24gKGZpZWxkKSB7XHJcblxyXG5cdC8vIERvbid0IHZhbGlkYXRlIHN1Ym1pdHMsIGJ1dHRvbnMsIGZpbGUgYW5kIHJlc2V0IGlucHV0cywgYW5kIGRpc2FibGVkIGZpZWxkc1xyXG5cdGlmIChmaWVsZC5kaXNhYmxlZCB8fCBmaWVsZC50eXBlID09PSAnZmlsZScgfHwgZmllbGQudHlwZSA9PT0gJ3Jlc2V0JyB8fCBmaWVsZC50eXBlID09PSAnc3VibWl0JyB8fCBmaWVsZC50eXBlID09PSAnYnV0dG9uJykgcmV0dXJuO1xyXG5cclxuXHQvLyBHZXQgdmFsaWRpdHlcclxuXHR2YXIgdmFsaWRpdHkgPSBmaWVsZC52YWxpZGl0eTtcclxuXHJcblx0dmFyIGVycm9yTWVzc2FnZSA9ICcnO1xyXG5cclxuXHQvLyBJZiB2YWxpZCwgcmV0dXJuIG51bGxcclxuXHRpZiAodmFsaWRpdHkudmFsaWQpXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdC8vIElmIGZpZWxkIGlzIHJlcXVpcmVkIGFuZCBlbXB0eVxyXG5cdGlmICh2YWxpZGl0eS52YWx1ZU1pc3NpbmcpXHJcblx0XHRlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGZpbGwgb3V0IHRoaXMgZmllbGQuJztcclxuXHJcblx0Ly8gSWYgbm90IHRoZSByaWdodCB0eXBlXHJcblx0aWYgKHZhbGlkaXR5LnR5cGVNaXNtYXRjaCkge1xyXG5cclxuXHRcdC8vIEVtYWlsXHJcblx0XHRpZiAoZmllbGQudHlwZSA9PT0gJ2VtYWlsJylcclxuXHRcdFx0ZXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBlbnRlciBhbiBlbWFpbCBhZGRyZXNzLic7XHJcblxyXG5cdFx0Ly8gVVJMXHJcblx0XHRpZiAoZmllbGQudHlwZSA9PT0gJ3VybCcpXHJcblx0XHRcdGVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgYSBVUkwuJztcclxuXHR9XHJcblxyXG5cdC8vIElmIHRvbyBzaG9ydFxyXG5cdGlmICh2YWxpZGl0eS50b29TaG9ydCkgXHJcblx0XHRlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGxlbmd0aGVuIHRoaXMgdGV4dCB0byAnICsgZmllbGQuZ2V0QXR0cmlidXRlKCdtaW5MZW5ndGgnKSArICcgY2hhcmFjdGVycyBvciBtb3JlLiBZb3UgYXJlIGN1cnJlbnRseSB1c2luZyAnICsgZmllbGQudmFsdWUubGVuZ3RoICsgJyBjaGFyYWN0ZXJzLic7XHJcblxyXG5cdC8vIElmIHRvbyBsb25nXHJcblx0aWYgKHZhbGlkaXR5LnRvb0xvbmcpXHJcblx0XHRlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIHNob3J0ZW4gdGhpcyB0ZXh0IHRvIG5vIG1vcmUgdGhhbiAnICsgZmllbGQuZ2V0QXR0cmlidXRlKCdtYXhMZW5ndGgnKSArICcgY2hhcmFjdGVycy4gWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgJyArIGZpZWxkLnZhbHVlLmxlbmd0aCArICcgY2hhcmFjdGVycy4nO1xyXG5cclxuXHQvLyBJZiBudW1iZXIgaW5wdXQgaXNuJ3QgYSBudW1iZXJcclxuXHRpZiAodmFsaWRpdHkuYmFkSW5wdXQpXHJcblx0XHRlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIGEgbnVtYmVyLic7XHJcblxyXG5cdC8vIElmIGEgbnVtYmVyIHZhbHVlIGRvZXNuJ3QgbWF0Y2ggdGhlIHN0ZXAgaW50ZXJ2YWxcclxuXHRpZiAodmFsaWRpdHkuc3RlcE1pc21hdGNoKVxyXG5cdFx0ZXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBzZWxlY3QgYSB2YWxpZCB2YWx1ZS4nO1xyXG5cclxuXHQvLyBJZiBhIG51bWJlciBmaWVsZCBpcyBvdmVyIHRoZSBtYXhcclxuXHRpZiAodmFsaWRpdHkucmFuZ2VPdmVyZmxvdylcclxuXHRcdGVycm9yTWVzc2FnZSA9ICdQbGVhc2Ugc2VsZWN0IGEgdmFsdWUgdGhhdCBpcyBubyBtb3JlIHRoYW4gJyArIGZpZWxkLmdldEF0dHJpYnV0ZSgnbWF4JykgKyAnLic7XHJcblxyXG5cdC8vIElmIGEgbnVtYmVyIGZpZWxkIGlzIGJlbG93IHRoZSBtaW5cclxuXHRpZiAodmFsaWRpdHkucmFuZ2VVbmRlcmZsb3cpXHJcblx0XHRlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIHNlbGVjdCBhIHZhbHVlIHRoYXQgaXMgbm8gbGVzcyB0aGFuICcgKyBmaWVsZC5nZXRBdHRyaWJ1dGUoJ21pbicpICsgJy4nO1xyXG4gIFxyXG5cdCAgLy8gSWYgcGF0dGVybiBkb2Vzbid0IG1hdGNoXHJcblx0aWYgKHZhbGlkaXR5LnBhdHRlcm5NaXNtYXRjaCkge1xyXG5cclxuXHRcdC8vIElmIHBhdHRlcm4gaW5mbyBpcyBpbmNsdWRlZCwgcmV0dXJuIGN1c3RvbSBlcnJvclxyXG5cdFx0aWYgKGZpZWxkLmhhc0F0dHJpYnV0ZSgndGl0bGUnKSlcclxuXHRcdFx0ZXJyb3JNZXNzYWdlID0gZmllbGQuZ2V0QXR0cmlidXRlKCd0aXRsZScpO1xyXG5cclxuXHRcdC8vIE90aGVyd2lzZSwgZ2VuZXJpYyBlcnJvclxyXG5cdFx0ZXJyb3JNZXNzYWdlID0gJ1BsZWFzZSBtYXRjaCB0aGUgcmVxdWVzdGVkIGZvcm1hdC4nO1xyXG5cdH1cclxuXHJcblx0Ly8gSWYgYWxsIGVsc2UgZmFpbHMsIHJldHVybiBhIGdlbmVyaWMgY2F0Y2hhbGwgZXJyb3JcclxuXHRlcnJvck1lc3NhZ2UgPSAnVGhlIHZhbHVlIHlvdSBlbnRlcmVkIGZvciB0aGlzIGZpZWxkIGlzIGludmFsaWQuJztcclxuXHJcblx0cmV0dXJuIHRydWU7XHJcbn07IiwiOyhmdW5jdGlvbiAoJCwgd2luZG93KSB7XHJcblxyXG4gICAgdmFyIGludGVydmFscyA9IHt9O1xyXG4gICAgdmFyIHJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcclxuXHJcbiAgICAgICAgaWYgKGludGVydmFsc1tzZWxlY3Rvcl0pIHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxzW3NlbGVjdG9yXSk7XHJcbiAgICAgICAgICAgIGludGVydmFsc1tzZWxlY3Rvcl0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB2YXIgZm91bmQgPSAnd2FpdFVudGlsRXhpc3RzLmZvdW5kJztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBmdW5jdGlvblxyXG4gICAgICogQHByb3BlcnR5IHtvYmplY3R9IGpRdWVyeSBwbHVnaW4gd2hpY2ggcnVucyBoYW5kbGVyIGZ1bmN0aW9uIG9uY2Ugc3BlY2lmaWVkXHJcbiAgICAgKiAgICAgICAgICAgZWxlbWVudCBpcyBpbnNlcnRlZCBpbnRvIHRoZSBET01cclxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb258c3RyaW5nfSBoYW5kbGVyIFxyXG4gICAgICogICAgICAgICAgICBBIGZ1bmN0aW9uIHRvIGV4ZWN1dGUgYXQgdGhlIHRpbWUgd2hlbiB0aGUgZWxlbWVudCBpcyBpbnNlcnRlZCBvciBcclxuICAgICAqICAgICAgICAgICAgc3RyaW5nIFwicmVtb3ZlXCIgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIHRoZSBnaXZlbiBzZWxlY3RvclxyXG4gICAgICogQHBhcmFtIHtib29sfSBzaG91bGRSdW5IYW5kbGVyT25jZSBcclxuICAgICAqICAgICAgICAgICAgT3B0aW9uYWw6IGlmIHRydWUsIGhhbmRsZXIgaXMgdW5ib3VuZCBhZnRlciBpdHMgZmlyc3QgaW52b2NhdGlvblxyXG4gICAgICogQGV4YW1wbGUgalF1ZXJ5KHNlbGVjdG9yKS53YWl0VW50aWxFeGlzdHMoZnVuY3Rpb24pO1xyXG4gICAgICovXHJcbiAgICAgXHJcbiAgICAkLmZuLndhaXRVbnRpbEV4aXN0cyA9IGZ1bmN0aW9uKGhhbmRsZXIsIHNob3VsZFJ1bkhhbmRsZXJPbmNlLCBpc0NoaWxkKSB7XHJcblxyXG4gICAgICAgIHZhciBzZWxlY3RvciA9IHRoaXMuc2VsZWN0b3I7XHJcbiAgICAgICAgdmFyICR0aGlzID0gJChzZWxlY3Rvcik7XHJcbiAgICAgICAgdmFyICRlbGVtZW50cyA9ICR0aGlzLm5vdChmdW5jdGlvbigpIHsgcmV0dXJuICQodGhpcykuZGF0YShmb3VuZCk7IH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChoYW5kbGVyID09PSAncmVtb3ZlJykge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gSGlqYWNrIGFuZCByZW1vdmUgaW50ZXJ2YWwgaW1tZWRpYXRlbHkgaWYgdGhlIGNvZGUgcmVxdWVzdHNcclxuICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIoc2VsZWN0b3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFJ1biB0aGUgaGFuZGxlciBvbiBhbGwgZm91bmQgZWxlbWVudHMgYW5kIG1hcmsgYXMgZm91bmRcclxuICAgICAgICAgICAgJGVsZW1lbnRzLmVhY2goaGFuZGxlcikuZGF0YShmb3VuZCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoc2hvdWxkUnVuSGFuZGxlck9uY2UgJiYgJHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIEVsZW1lbnQgd2FzIGZvdW5kLCBpbXBseWluZyB0aGUgaGFuZGxlciBhbHJlYWR5IHJhbiBmb3IgYWxsIFxyXG4gICAgICAgICAgICAgICAgLy8gbWF0Y2hlZCBlbGVtZW50c1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlTGlzdGVuZXIoc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCFpc0NoaWxkKSB7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgYSByZWN1cnJpbmcgc2VhcmNoIG9yIGlmIHRoZSB0YXJnZXQgaGFzIG5vdCB5ZXQgYmVlbiBcclxuICAgICAgICAgICAgICAgIC8vIGZvdW5kLCBjcmVhdGUgYW4gaW50ZXJ2YWwgdG8gY29udGludWUgc2VhcmNoaW5nIGZvciB0aGUgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICBpbnRlcnZhbHNbc2VsZWN0b3JdID0gd2luZG93LnNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkdGhpcy53YWl0VW50aWxFeGlzdHMoaGFuZGxlciwgc2hvdWxkUnVuSGFuZGxlck9uY2UsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gJHRoaXM7XHJcbiAgICB9O1xyXG4gXHJcbn0oalF1ZXJ5LCB3aW5kb3cpKTsiLCIvKlxuICogWW91cklSIGxvYWRlciBmb3IgQ2xpbnV2ZWwgUGhhcm1hY2V1dGljYWxzIExpbWl0ZWQgSW52ZXN0b3IgUmVsYXRpb25zXG4gKiAoYykgMjAxNyBJZ3VhbmEyIFB0eS4gTHRkLlxuICpcbiAqIFN0cmljdGx5IGZvciB0aGUgc29sZSB1c2Ugb2YgQ2xpbnV2ZWwgUGhhcm1hY2V1dGljYWxzIExpbWl0ZWQgb24gaXRzIEludmVzdG9yIFJlbGF0aW9ucyB3ZWIgcGFnZXMgb25seVxuICpcbiAqIExhc3QgdXBkYXRlZDogMjAxNy0xMi0yNlQyMzoxMjoyMFpcbiAqL1xuIWZ1bmN0aW9uKGUsYSl7XCJ1c2Ugc3RyaWN0XCI7dmFyIG89KGUuZG9jdW1lbnQsZS5sb2NhdGlvbixlLnlvdXJpclNldHVwKSx0PXt2ZXJzaW9uOlwiMS45LjRcIixzdGFydHVwOntwcm9jZXNzTG9jYXRpb25IYXNoOiEwLGFkZExvYWRlZENTUzohMCxhZGRTdHlsZVNoZWV0OiExLHJlbW92ZUxvYWRpbmdDU1M6ITB9LGF1dG9VcGRhdGU6e2VuYWJsZTohMCxsaWJWZXJzaW9uOlwiMS45LjRcIixsb2FkZXJDaGVja3N1bTpcIjNiZTVjNDcwMzlmYjYwZjgyN2VlZGU2Y2ZmMzk5ZWYyXCJ9LHByZWxvYWQ6e2VuYWJsZTohMCxzeW1ib2xEYXRhOiEwfSx0aGVtZTpcImRlZmF1bHRcIixjb250ZXh0czp7ZGVmYXVsdDp7c3ltYm9sOlwiY3V2LmFzeFwiLGFsbG93ZWRTeW1ib2xzOltcImN1di5hc3hcIl0sY29uc29saWRhdGU6ITAsc3RyZWFtVXBkYXRlczohMX19LGNvbXBvbmVudHM6e2RlZmF1bHRzOntsaXZlbmVzczpcImRlbGF5ZWRcIn0sYW5ub3VuY2VtZW50czp7aW5jbHVkZU90aGVySXNzdWVyczohMSxsaXZlbmVzczpcImxpdmVcIn0scHJpY2VDb21wYXJpc29uQ2hhcnQ6e2NvbXBhcmlzb25TeW1ib2wxOlwieGpvLmFzeFwifX0scmVzb3VyY2VzOntjaGVjazohMX19LHM9W3RdO2lmKHQuYXBwSUQ9LyogdGhpcyBhcHBJRCAoQXBwbGljYXRpb24gSWRlbnRpZmllcikgaXMgc3RyaWN0bHkgZm9yIHRoZSBzb2xlIHVzZSBvZiBDbGludXZlbCBQaGFybWFjZXV0aWNhbHMgTGltaXRlZCAqL1wiZmVlNzdiMWQxYTg3ODYzM1wiLGUueW91cmlyQXV0b1VwZGF0ZSYmdC5hdXRvVXBkYXRlJiZ0LmF1dG9VcGRhdGUuZW5hYmxlKXJldHVybiB2b2lkIGUueW91cmlyQXV0b1VwZGF0ZSh0LmF1dG9VcGRhdGUubG9hZGVyQ2hlY2tzdW0pO28mJnMucHVzaChvKSxlLnlvdXJpclNldHVwPWZ1bmN0aW9uKGUpe2Uocyl9LGUueW91cmlyU2V0dXAuYXBwSUQ9dC5hcHBJRH0odGhpcyk7XG4vKlxuICogeW91cmlyIHYxLjkuNCBsb2FkZXJcbiAqIChjKSAyMDE2IElndWFuYTIgUHR5LiBMdGQuIC0gaHR0cHM6Ly95b3VyaXIuaW5mby9cbiAqIExpY2Vuc2U6IENyZWF0aXZlIENvbW1vbnMgQXR0cmlidXRpb24gTm8gRGVyaXZhdGl2ZXMgMy4wIExpY2Vuc2VcbiAqIChodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1uZC8zLjAvbGVnYWxjb2RlKVxuICovXG4oZnVuY3Rpb24ocm9vdCx1bmRlZmluZWQpeyd1c2Ugc3RyaWN0Jzt2YXIgaD13aW5kb3cueW91cmlyTG9hZGVyPXt9LGs9ZG9jdW1lbnQuaGVhZHx8ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO2smJmwoKTt2YXIgbSxwPW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL21zaWUgKihbMC05XSspL2kpLHE9KG09cD9wWzFdOjApJiYxMD5tO2lmKG0mJjk+bSl0cnl7ZG9jdW1lbnQubmFtZXNwYWNlcy5hZGQoXCJ5b3VyaXItdm1sXCIsXCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOnZtbFwiLFwiI2RlZmF1bHQjVk1MXCIpLGguYWRkVk1MTmFtZVNwYWNlPSExfWNhdGNoKHIpe312YXIgdD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO3QudHlwZT1cInRleHQvamF2YXNjcmlwdFwiO3Quc3JjPVwiaHR0cHM6Ly95b3VyaXIuaW5mby9saWIvMS45LjQveW91cmlyLmpzXCI7dC5hc3luYz0hMDtxfHwodC5jcm9zc09yaWdpbj1cImFub255bW91c1wiLHQuaW50ZWdyaXR5PVwic2hhMjU2LUU1N3pZSFp0cmlabVJiSzk1OXdZYWdKN0IwdGh1Q0NtYXJIOXBHSXVkZzQ9IHNoYTUxMi11WTVXbFVnOTgvcjJiZUMzVzltSUFmU2FMNEdiZnpEUlBSc24xblFPYWV0NWU3RWJvekQvZHNuMHJUNTRIcjVFemhhVzc1VFNoUkRPUFg3TTB1Ykk4UT09XCIpO1xudmFyIHU9ayYmbCgpO2lmKHUpdS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LHUubmV4dFNpYmxpbmcpO2Vsc2UgaWYoaylrLmluc2VydEJlZm9yZSh0LGsuZmlyc3RDaGlsZCk7ZWxzZSBpZihkb2N1bWVudC5ib2R5KWRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodCk7ZWxzZXt2YXIgdj1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTt2JiZ2LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHQsdil9dmFyIHc9XCJodHRwczovL3lvdXJpci5pbmZvL2xpYi8xLjkuNC95b3VyaXJcIisocT9cIi1pZVwiOlwiXCIpK1wiLmNzc1wiLHg9ITA7XG5pZihkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KWRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQodywwKTtlbHNle3ZhciB5PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO3kudHlwZT1cInRleHQvY3NzXCI7eS5yZWw9XCJzdHlsZXNoZWV0XCI7eS5ocmVmPXc7eS5hc3luYz0hMDtxfHwoeS5jcm9zc09yaWdpbj1cImFub255bW91c1wiLHkuaW50ZWdyaXR5PVwic2hhMjU2LWFDb1hLZ2kzNjNIZjJPc1U1Q0xseEQ0UDRGN2xlUTZtaWdmaFJtRER4TDg9IHNoYTUxMi1XaUI3YnVjR082alNDN0g3b3Z5MTJ2WXduQlJzaGxQV0h2UVRNODlrSjRKSWN2TWxXY3VVU28ySTdoN000bTVYNjFrbVpMS0ZPeDlaZUY2bTU1RXp3dz09XCIpO3ZhciB6PWsmJmsuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpWzBdO3o/ei5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh5LHopOms/ay5pbnNlcnRCZWZvcmUoeSxrLmZpcnN0Q2hpbGQpOng9ITF9eCYmKGguYWRkU3R5bGVTaGVldD0hMSk7XG5mdW5jdGlvbiBsKCl7Zm9yKHZhciBkPWsuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIiksYj0wLGU9ZC5sZW5ndGg7YjxlO2IrKyl7dmFyIGM9ZFtiXS5zcmM7aWYoYyYmL3lvdXJpci5pbmZvfHlvdXJpci1sb2FkZXJbLl1qcy8udGVzdChjKSlyZXR1cm4gZFtiXX1yZXR1cm4gbnVsbH07ZnVuY3Rpb24gQihkKXtmdW5jdGlvbiBiKGEsYyl7dmFyIGI9ZC5tYXRjaChuZXcgUmVnRXhwKGErXCIoWy46Ly1dfCQpXCIsYz9cIlwiOlwiaVwiKSk7aWYoYiYmKGJbYi5sZW5ndGgtMV18fFwiLlwiIT09YltiLmxlbmd0aC0zXXx8IUEudGVzdChiW2IubGVuZ3RoLTJdKSkpcmV0dXJuIGJ9ZnVuY3Rpb24gZShhKXt2YXIgYjtmb3IoYj0xO2I8YS5sZW5ndGg7YisrKWYmJmFbYl09PT1mP2FbYl09XCJ7Y29kZX1cIjpnJiZhW2JdPT09Zz9hW2JdPVwie21hcmtldH1cIjpuJiZhW2JdPT09biYmKGFbYl09XCJ7c3ltYm9sfVwiKTtiPWEuaW5kZXg7dmFyIGM9YithWzBdLmxlbmd0aDtkPSgwPGI/ZC5zdWJzdHIoMCxiKTpcIlwiKSthLnNsaWNlKDEpLmpvaW4oXCJcIikrKGM8ZC5sZW5ndGg/ZC5zdWJzdHIoYyk6XCJcIil9ZnVuY3Rpb24gYyhhKXtmPWY/Zi50b0xvd2VyQ2FzZSgpOlwiXCI7Zz1nP2cudG9Mb3dlckNhc2UoKTpcIlwiO249bj9uLnRvTG93ZXJDYXNlKCk6ZiYmZz9mK1wiLlwiK2c6XCJcIjtyZXR1cm57cGF0aDpkLGE6ZyxcbnN5bWJvbDpuLGNvZGU6ZixtYXJrOmF9fXZhciBhLGYsZyxuLEE9L2h0bWw/fHBocHxhc3AvO3JldHVybihhPWIoXCIoWy46Ly1dKShhc3h8bnp4KShbLjovLV0pKFtBLVowLTldezMsNn0pXCIpKT8oZz1hWzJdLGY9YVs0XSxlKGEpLGMoNCkpOihhPWIoXCIoWy46Ly1dKShbQS1aMC05XXszLDZ9KShbLjovLV0pKGFzeHxuengpXCIpKT8oZj1hWzJdLGc9YVs0XSxlKGEpLGMoNCkpOihhPWIoXCIoWy46Ly1dKShbQS1aMC05XXszLDZ9KVwiLCEwKSk/KGY9YVsyXSxlKGEpLGMoMykpOihhPWIoXCIoWy46Ly1dKShhc3h8bnp4KVwiKSk/KGc9YVsyXSxlKGEpLGMoMikpOihhPWIoXCIoWy46Ly1dKShbYS16MC05XXszfSlcIikpPyhmPWFbMl0sZShhKSxjKDEpKTpjKDApfVxuZnVuY3Rpb24gQyhkLGIsZSl7dmFyIGMsYTtlJiZlLm1hcms+Yi5tYXJrPyhjPWUuc3ltYm9sLGE9ZS5jb2RlLGI9ZS5hKTooYz1iLnN5bWJvbCxhPWIuY29kZSxiPWIuYSk7cmV0dXJuIGM/ZC5yZXBsYWNlKC8oc3ltYm9sc1xcLylbXlxcL10rLyxcIiQxXCIrYyk6YT9kLnJlcGxhY2UoLyhzeW1ib2xzXFwvKVteLl0rLyxcIiQxXCIrYSk6Yj9kLnJlcGxhY2UoLyhtYXJrZXRzXFwvKVteXFwvXSsvLFwiJDFcIitiKTpkfTtmdW5jdGlvbiBEKGQsYil7dmFyIGU9MD5kLmluZGV4T2YoXCI/XCIpP1wiP1wiOlwiJlwiLGMsYSxmPVtdO2ZvcihjIGluIGIpYi5oYXNPd25Qcm9wZXJ0eShjKSYmKGE9YltjXSx2b2lkIDAhPT1hJiZudWxsIT09YSYmKGE9ITA9PT1hP1wiMVwiOiExPT09YT9cIjBcIjplbmNvZGVVUklDb21wb25lbnQoYSksZi5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChjKStcIj1cIithKSkpO2Yuc29ydCgpOyhjPWYubGVuZ3RoP2Yuam9pbihcIiZcIik6XCJcIikmJihjPSh2b2lkIDA9PT1lP1wiP1wiOmUpK2MpO3JldHVybiBkK2N9O2g9d2luZG93LnlvdXJpclByZWxvYWQ9e2xvYWRpbmc6ITEscmVxdWVzdHM6W119O3RyeXtcInVuZGVmaW5lZFwiIT09dHlwZW9mIEpTT04mJlwidW5kZWZpbmVkXCIhPT10eXBlb2YgbG9jYWxTdG9yYWdlJiZcInVuZGVmaW5lZFwiIT09dHlwZW9mIFhNTEh0dHBSZXF1ZXN0JiZcIndpdGhDcmVkZW50aWFsc1wiaW4gbmV3IFhNTEh0dHBSZXF1ZXN0JiYoaC5yZXF1ZXN0cz1FKCksaC5sb2FkaW5nPSEwKX1jYXRjaChGKXt9XG5mdW5jdGlvbiBFKCl7dmFyIGQsYixlLGMsYSxmO2E9Qihsb2NhdGlvbi5wYXRobmFtZSk7dHJ5e3dpbmRvdyE9PXdpbmRvdy50b3AmJihmPUIod2luZG93LnRvcC5sb2NhdGlvbi5wYXRobmFtZSkpfWNhdGNoKGcpe31oLnBhdGg9YS5wYXRoO2U9KGU9d2luZG93LnlvdXJpclNldHVwKSYmZS5hcHBJRD9lLmFwcElEOmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwieW91cmlyLWFwcC1pZFwiKTtpZighZSlyZXR1cm5bXTtkPWxvY2FsU3RvcmFnZS5nZXRJdGVtKFwieW91cmlyLVwiKyhlK1wiLXByZWxvYWQtcmVxdWVzdHMtXCIrYS5wYXRoKSk7aWYoIWQpcmV0dXJuW107Yz1KU09OLnBhcnNlKGQpLnJlcXVlc3RzO2lmKCFjfHwhYy5sZW5ndGgpcmV0dXJuW107ZD0wO2ZvcihiPWMubGVuZ3RoO2Q8YjtkKyspRyhjW2RdLGUsYSxmfHx7fSk7cmV0dXJuIGN9XG5mdW5jdGlvbiBHKGQsYixlLGMpe3ZhciBhOyExIT09ZC5tb2RpZnk/KGU9QyhkLnVyaSxlLGMpLGQudXJpPWUpOmU9ZC51cmk7Yj1EKFwiaHR0cHM6Ly95b3VyaXIuaW5mby9hcGkvdjRcIitlK1wiP2FwcElEPVwiK2IsZC5wYXJhbXMpO2E9bmV3IFhNTEh0dHBSZXF1ZXN0O2Eub3BlbihcIkdFVFwiLGIsITApO2EuYXN5bmM9ITA7YS5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtpZig0PT09YS5yZWFkeVN0YXRlKXt2YXIgYj1kLmhvb2s7Yj9iKGQsYSk6ZC54aHI9YX19O2Euc2VuZCgpfTt9KHRoaXMpKTtcblxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sIm5hbWVzIjpbInJlcXVpcmUiLCJ3aW5kb3ciLCIkIiwialF1ZXJ5IiwiYm9vdHN0cmFwIiwiQ29va2llcyIsImUiLCJDVVZBamF4IiwiZ2V0UXVlcnlWYXJpYWJsZSIsInZhcmlhYmxlIiwicXVlcnkiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0cmluZyIsInZhcnMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwYWlyIiwiaGFzUXVlcnlWYXJzIiwicmVtb3ZlUXVlcnlWYXJpYWJsZSIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJwYXRobmFtZSIsImVxdWFsSGVpZ2h0cyIsImVsIiwiJGVsIiwidGFsbGVzdCIsImVscyIsImVhY2giLCJoZWlnaHQiLCJjdXJyZW50SGVpZ2h0Iiwic2Nyb2xsVG9FbCIsIm9mZiIsImNiIiwicG9zIiwib2Zmc2V0IiwidG9wIiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImZpbmRBbmNlc3RvciIsInNlbGVjdG9yIiwicGFyZW50RWxlbWVudCIsIm1hdGNoZXMiLCJtYXRjaGVzU2VsZWN0b3IiLCJjYWxsIiwiZG9jdW1lbnQiLCJyZWFkeSIsInBvcHVwTW9kYWwiLCJNb2RhbCIsImtleWJvYXJkIiwic2hvdyIsIm9uIiwicGVyc29uIiwiZGF0YSIsInBhcmVudCIsInNpYmxpbmdzIiwiZmluZCIsInJlbW92ZUNsYXNzIiwiYWRkQ2xhc3MiLCJjaGFuZ2UiLCJldnQiLCJwcmV2ZW50RGVmYXVsdCIsInRleHQiLCJ0eXBlIiwidG9nZ2xlQ2xhc3MiLCJnZXQiLCJjbGljayIsImNsb3Nlc3QiLCJmYWRlT3V0Iiwic2V0IiwiZXhwaXJlcyIsImV2IiwiJHBvc3RlciIsIiR3cmFwcGVyIiwidmlkZW9QbGF5IiwiJGlmcmFtZSIsInNyYyIsImF0dHIiLCJ2aWRlb1N0b3AiLCJhcHByb3ZlZCIsImZpbGVzIiwiY3VycmVudFRhcmdldCIsImZpbGVzaXplIiwic2l6ZSIsInRvRml4ZWQiLCJwdXNoIiwibmFtZSIsImh0bWwiLCJqb2luIiwiZGF0ZXBpY2tlciIsImRhdGVGb3JtYXQiLCJmb3JtIiwic2F2ZUJ1dHRvbiIsInNwaW5uZXIiLCJzdWJtaXQiLCJjaGVja1ZhbGlkaXR5Iiwic3RvcFByb3BhZ2F0aW9uIiwiZm9ybU1zc2ciLCJzZW5kQnR0biIsImdyZWNhcHRjaGEiLCJleGVjdXRlIiwiYWN0aW9uIiwidGhlbiIsInRva2VuIiwicmVzZXQiLCJnUmVjYXB0Y2hhUmVzcG9uc2UiLCJ2YWwiLCJmb3JtRGF0YSIsInNlcmlhbGl6ZSIsImFqYXgiLCJ1cmwiLCJhamF4X3VybCIsImJlZm9yZVNlbmQiLCJwcm9wIiwiZG9uZSIsInJlc3BvbnNlIiwiY29uc29sZSIsImxvZyIsIm1vZGFsIiwiZmFpbCIsInJlc3BvbnNlVGV4dCIsInNldFRpbWVvdXQiLCJtYWluSGVhZGVyIiwiaGVhZGVySGVpZ2h0Iiwic2Nyb2xsaW5nIiwicHJldmlvdXNUb3AiLCJjdXJyZW50VG9wIiwic2Nyb2xsRGVsdGEiLCJzY3JvbGxPZmZzZXQiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdXRvSGlkZUhlYWRlciIsImFuaW1hdGVMb2dvIiwiY2hlY2tTaW1wbGVOYXZpZ2F0aW9uIiwiaGFzQ2xhc3MiLCJjYWNoZWRXaWR0aCIsIndpZHRoIiwibm90IiwicmVzaXplIiwibmV3V2lkdGgiLCJtb3VzZXVwIiwiZWxlbWVudHMiLCJpcyIsInRhcmdldCIsImhhcyIsImhyZWYiLCJzY3JvbGwiLCJzcGVjU2xpZGVyIiwic3BlY1BhZ2luZyIsInNwZWNQcmV2Iiwic3BlY05leHQiLCJldmVudCIsInNsaWNrIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhcnJvd3MiLCJkb3RzIiwiaW5maW5pdGUiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhcHBlbmRBcnJvd3MiLCJhZGFwdGl2ZUhlaWdodCIsImFjY2Vzc2liaWxpdHkiLCJyb3dzIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsImVudGl0eUxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbnRpdHlMaW5rIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50TGFiZWwiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJldmVudEFjdGlvbiIsImd0YWciLCJBcnJheSIsImZyb20iLCJzeW1ib2xJdGVyYXRvciIsIlN5bWJvbCIsIml0ZXJhdG9yIiwiX3VudXNlZCIsInRvU3RyIiwiT2JqZWN0IiwicHJvdG90eXBlIiwidG9TdHJpbmciLCJpc0NhbGxhYmxlIiwiZm4iLCJ0b0ludGVnZXIiLCJ2YWx1ZSIsIm51bWJlciIsIk51bWJlciIsImlzTmFOIiwiaXNGaW5pdGUiLCJNYXRoIiwiZmxvb3IiLCJhYnMiLCJtYXhTYWZlSW50ZWdlciIsInBvdyIsInRvTGVuZ3RoIiwibGVuIiwibWluIiwibWF4Iiwic2V0R2V0SXRlbUhhbmRsZXIiLCJpc0l0ZXJhdG9yIiwiaXRlbXMiLCJnZXRJdGVtIiwiayIsIm5leHQiLCJnZXRBcnJheSIsIlQiLCJBIiwibWFwRm4iLCJpdGVtIiwia1ZhbHVlIiwiVHlwZUVycm9yIiwiYXJyYXlMaWtlT3JJdGVyYXRvciIsIkMiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJjaGVja1Bvc3RDb2RlIiwidG9DaGVjayIsImFscGhhMSIsImFscGhhMiIsImFscGhhMyIsImFscGhhNCIsImFscGhhNSIsIkJGUE9hNSIsIkJGUE9hNiIsInBjZXhwIiwiUmVnRXhwIiwicG9zdENvZGUiLCJ2YWxpZCIsInRlc3QiLCJleGVjIiwiJDEiLCJ0b1VwcGVyQ2FzZSIsIiQzIiwicmVwbGFjZSIsImZpZWxkSGFzRXJyb3IiLCJmaWVsZCIsImRpc2FibGVkIiwidmFsaWRpdHkiLCJlcnJvck1lc3NhZ2UiLCJ2YWx1ZU1pc3NpbmciLCJ0eXBlTWlzbWF0Y2giLCJ0b29TaG9ydCIsInRvb0xvbmciLCJiYWRJbnB1dCIsInN0ZXBNaXNtYXRjaCIsInJhbmdlT3ZlcmZsb3ciLCJyYW5nZVVuZGVyZmxvdyIsInBhdHRlcm5NaXNtYXRjaCIsImludGVydmFscyIsInJlbW92ZUxpc3RlbmVyIiwiY2xlYXJJbnRlcnZhbCIsImZvdW5kIiwid2FpdFVudGlsRXhpc3RzIiwiaGFuZGxlciIsInNob3VsZFJ1bkhhbmRsZXJPbmNlIiwiaXNDaGlsZCIsIiR0aGlzIiwiJGVsZW1lbnRzIiwic2V0SW50ZXJ2YWwiLCJhIiwibyIsInlvdXJpclNldHVwIiwidCIsInZlcnNpb24iLCJzdGFydHVwIiwicHJvY2Vzc0xvY2F0aW9uSGFzaCIsImFkZExvYWRlZENTUyIsImFkZFN0eWxlU2hlZXQiLCJyZW1vdmVMb2FkaW5nQ1NTIiwiYXV0b1VwZGF0ZSIsImVuYWJsZSIsImxpYlZlcnNpb24iLCJsb2FkZXJDaGVja3N1bSIsInByZWxvYWQiLCJzeW1ib2xEYXRhIiwidGhlbWUiLCJjb250ZXh0cyIsInN5bWJvbCIsImFsbG93ZWRTeW1ib2xzIiwiY29uc29saWRhdGUiLCJzdHJlYW1VcGRhdGVzIiwiY29tcG9uZW50cyIsImRlZmF1bHRzIiwibGl2ZW5lc3MiLCJhbm5vdW5jZW1lbnRzIiwiaW5jbHVkZU90aGVySXNzdWVycyIsInByaWNlQ29tcGFyaXNvbkNoYXJ0IiwiY29tcGFyaXNvblN5bWJvbDEiLCJyZXNvdXJjZXMiLCJjaGVjayIsInMiLCJhcHBJRCIsInlvdXJpckF1dG9VcGRhdGUiLCJyb290IiwiaCIsInlvdXJpckxvYWRlciIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImwiLCJtIiwicCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIm1hdGNoIiwicSIsIm5hbWVzcGFjZXMiLCJhZGQiLCJhZGRWTUxOYW1lU3BhY2UiLCJyIiwiY3JlYXRlRWxlbWVudCIsImFzeW5jIiwiY3Jvc3NPcmlnaW4iLCJpbnRlZ3JpdHkiLCJ1IiwicGFyZW50Tm9kZSIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiZmlyc3RDaGlsZCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInYiLCJ3IiwieCIsImNyZWF0ZVN0eWxlU2hlZXQiLCJ5IiwicmVsIiwieiIsImQiLCJiIiwiYyIsIkIiLCJmIiwiZyIsIm4iLCJpbmRleCIsInN1YnN0ciIsInNsaWNlIiwidG9Mb3dlckNhc2UiLCJwYXRoIiwiY29kZSIsIm1hcmsiLCJEIiwiaW5kZXhPZiIsImhhc093blByb3BlcnR5IiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwic29ydCIsInlvdXJpclByZWxvYWQiLCJsb2FkaW5nIiwicmVxdWVzdHMiLCJKU09OIiwibG9jYWxTdG9yYWdlIiwiWE1MSHR0cFJlcXVlc3QiLCJFIiwiRiIsInBhcnNlIiwiRyIsIm1vZGlmeSIsInVyaSIsInBhcmFtcyIsIm9wZW4iLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwiaG9vayIsInhociIsInNlbmQiXSwic291cmNlUm9vdCI6IiJ9