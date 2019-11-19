/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./calendarDemo.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./calendarDemo.js":
/*!*************************!*\
  !*** ./calendarDemo.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _RVcalendar = __webpack_require__(/*! ./src/RVcalendar */ "./src/RVcalendar.js");

var _RVcalendar2 = _interopRequireDefault(_RVcalendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
    (0, _RVcalendar2.default)("#app", function (selectDay) {
        console.log("select,:" + selectDay);
    });
};

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/diff.js":
/*!**************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/diff.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _diff_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diff_list */ "./node_modules/yhongm_rv.js/src/rv/diff_list.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./node_modules/yhongm_rv.js/src/rv/util.js");
/* harmony import */ var _domState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domState */ "./node_modules/yhongm_rv.js/src/rv/domState.js");



class Diff {
    /**
     * dom tree diff algorithm object constructor
     * @param {*} oldTree the dom tree for before update 
     * @param {*} newTree the dom tree for after update
     */
    constructor(oldTree, newTree) {
        this.index = 0
        this.patches = {}
        this.dfsWalk(oldTree, newTree, this.index)
    }
    dfsWalk(oldNode, newNode, index) {
        let currentPatch = []
        if (newNode == null) {

        } else if (_util__WEBPACK_IMPORTED_MODULE_1__["default"].isString(oldNode) && _util__WEBPACK_IMPORTED_MODULE_1__["default"].isString(newNode)) {
            if (oldNode != newNode) {
                currentPatch.push({
                    type: _domState__WEBPACK_IMPORTED_MODULE_2__["NODE_CONTENT"],
                    content: newNode
                })
            }
        } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
            let propsPatches = this.diffProps(oldNode, newNode)
            if (propsPatches) {
                currentPatch.push({
                    type: _domState__WEBPACK_IMPORTED_MODULE_2__["NODE_PROPS"],
                    props: propsPatches
                })
            }
            if (!_util__WEBPACK_IMPORTED_MODULE_1__["default"].isIgnoreChildren(newNode)) {
                this.diffChildren(oldNode.children, newNode.children, index, currentPatch)
            }
        } else {
            currentPatch.push({
                type:_domState__WEBPACK_IMPORTED_MODULE_2__["NODE_REPLACE"],
                node: newNode
            })
        }
        if (currentPatch.length) {
            this.patches[index] = currentPatch
        }
    }
    diffProps(oldNode, newNode) {

        const oldProps = oldNode.props
        const newProps = newNode.props

        const propsPatches = {}
        let isSame = true;
        for (let key in oldProps) {
            if (newProps[key] !== oldProps[key]) {
                isSame = false
                propsPatches[key] = newProps[key]
            }
        }
        for (let key in newProps) {
            if (!oldProps.hasOwnProperty(key)) {
                isSame = false
                propsPatches[key] = newProps[key]
            }
        }
        return isSame ? null : propsPatches

    }
    diffChildren(oldChildren, newChildren, index, currentPatch) {
        let diffList = new _diff_list__WEBPACK_IMPORTED_MODULE_0__["default"](oldChildren, newChildren)
        let diffs = diffList.getResult()
        newChildren = diffs.child
        if (diffs.moves.length) {
            let reorderPatch = {
                type:_domState__WEBPACK_IMPORTED_MODULE_2__["CHILD_RE_ORDER"],
                moves: diffs.moves
            }
            currentPatch.push(reorderPatch)
        }
        let leftNode = null
        let currentNodeIndex = index
        oldChildren.forEach((child, i) => {
            let newChild = newChildren[i]
            currentNodeIndex = (leftNode && leftNode.count) ?
                currentNodeIndex + leftNode.count + 1 :
                currentNodeIndex + 1
            this.dfsWalk(child, newChild, currentNodeIndex)
            leftNode = child
        })


    }
}
/* harmony default export */ __webpack_exports__["default"] = (Diff);

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/diff_list.js":
/*!*******************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/diff_list.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class DiffList {
    /**
     * diff list 
     * @param {*} oldList 
     * @param {*} newList 
     * @param {*} key 
     */
    constructor(oldList, newList) {
        let oldListKeyIndex = this.makeKeyIndex(oldList).keyIndex
        let newListKeyIndex = this.makeKeyIndex(newList).keyIndex
        this.moveOperator = []
        this.childList = []
        for (let i = 0; i < oldList.length; i++) {
            let oldItem = oldList[i]
            let oItemKey = this.getKey(oldItem)
            if (!newListKeyIndex.hasOwnProperty(oItemKey)) {
                this.childList.push(null)
            } else {
                this.childList.push(newList[newListKeyIndex[oItemKey]])
            }
        }
        this.tempList = this.childList.slice(0)
        let i = 0;
        while (i < this.tempList.length) {
            if (this.tempList[i] === null) {
                this.remove(i)
                this.removeCopyTempList(i)
            } else {
                i++
            }
        }
        let index = 0
        for (let i = 0; i < newList.length; i++) {
            let nItem = newList[i]
            let nItemKey = this.getKey(nItem)
            let cItem = this.tempList[index]
            let cItemKey = this.getKey(cItem)
            if (cItem) {
                if (nItemKey != cItemKey) {
                    if (oldListKeyIndex.hasOwnProperty(nItemKey)) {
                        let cNextItemKey = getKey(this.tempList[index + 1])
                        if (nItemKey === cNextItemKey) {
                            this.remove(i)
                            this.removeCopyTempList(index)
                            index++
                        } else {
                            this.insert(i, nItem)
                        }
                    } else {
                        this.insert(i, nItem)
                    }
                } else {
                    index++
                }
            } else {
                this.insert(i, nItem)
            }
        }
        let k = this.tempList.length - index
        while (index++ < this.tempList.length) {
            k--
            this.remove(k + newList.length)
        }


    }
    makeKeyIndex(list) {
        let keyIndex = {}
        for (let i = 0; i < list.length; i++) {
            let item = list[i]
            let itemKey = this.getKey(item)
            keyIndex[itemKey] = i
        }
        return {
            keyIndex: keyIndex
        }
    }

    getKey(item) {
        if (!item) {
            return undefined
        }
        return item["key"]
    }
    removeCopyTempList(index) {
        this.tempList.splice(index, 1)
    }
    remove(index) {
        this.moveOperator.push({
            index: index,
            type: 0
        })
    }

    insert(index, item) {
        this.moveOperator.push({
            index: index,
            item: item,
            type: 1
        })
    }

    getResult() {
        return {
            moves: this.moveOperator,
            child: this.childList
        }
    }
}
/* harmony default export */ __webpack_exports__["default"] = (DiffList);


/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/domState.js":
/*!******************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/domState.js ***!
  \******************************************************/
/*! exports provided: NODE_REPLACE, CHILD_RE_ORDER, NODE_PROPS, NODE_CONTENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_REPLACE", function() { return NODE_REPLACE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHILD_RE_ORDER", function() { return CHILD_RE_ORDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_PROPS", function() { return NODE_PROPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NODE_CONTENT", function() { return NODE_CONTENT; });
const NODE_REPLACE = 0; //node replace 
const CHILD_RE_ORDER = 1; //child node re order
const NODE_PROPS = 2; //prop change 
const NODE_CONTENT = 3; //content change



/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/element.js":
/*!*****************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/element.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/yhongm_rv.js/src/rv/util.js");

class Element {
    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     */
    constructor(tag, props, children) {
        if (!(this instanceof Element)) {
            return new Element(tagName, props, children)
        }
        this.tag = tag
        this.props = props || {}
        this.children = children || []
        this.key = props ? props.key : undefined
        if (!this.key) {
            throw new Error(`${tag} ... html tag the key is undefined`)
        }
        let count = 0;
        this.children.forEach(child => {
            if (child instanceof Element) {
                count += child.count
            }
            count++
        });
        this.count = count
    }
    /**
     * the method use to virtual dom  rende to real dom
     */
    render() {
        const el = document.createElement(this.tag)
        const props = this.props
        for (const propName in props) {
            _util__WEBPACK_IMPORTED_MODULE_0__["default"].setAttr(el, propName, props[propName])
        }
        this.children.forEach(child => {
            const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el;
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Element);


/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/main.js":
/*!**************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/main.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/yhongm_rv.js/src/rv/util.js");
/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patch */ "./node_modules/yhongm_rv.js/src/rv/patch.js");
/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diff */ "./node_modules/yhongm_rv.js/src/rv/diff.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./element */ "./node_modules/yhongm_rv.js/src/rv/element.js");
/* harmony import */ var _rvParse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./rvParse */ "./node_modules/yhongm_rv.js/src/rv/rvParse.js");
/* harmony import */ var _rvDomUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./rvDomUtil */ "./node_modules/yhongm_rv.js/src/rv/rvDomUtil.js");
/* harmony import */ var _rvComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rvComponent */ "./node_modules/yhongm_rv.js/src/rv/rvComponent.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./map */ "./node_modules/yhongm_rv.js/src/rv/map.js");








class RV {
    constructor(option) {
        const {
            el,
            data,
            template
        } = option
        this.el = el
        this.data = data
        this.template = template
        this.observeMap = new _map__WEBPACK_IMPORTED_MODULE_7__["default"]()
        this.parse = new _rvParse__WEBPACK_IMPORTED_MODULE_4__["default"]()
        this.rvDomUtil = new _rvDomUtil__WEBPACK_IMPORTED_MODULE_5__["default"](this.data)


    }
    use(rvComponentObj) {
        this.parse.useCustomComponent(rvComponentObj)
    }
    /**
     * run rv
     */
    run() {
        let root = _util__WEBPACK_IMPORTED_MODULE_0__["default"].isString(this.el) ? document.querySelector(this.el) : this.el
        let dom = this._getDomTree()

        let rvThat = this
        this.parse.componetMap.forEach(function (componet) {

            observe(componet.data, componet.observeMap, () => {

                dom = rvThat._getDomTree()
                rvThat._updatedom(dom)
            })
            Object.keys(componet.watchObj).forEach((watchFun) => {

                if ((componet.observeMap.hasKey(watchFun))) {
                    componet.observeMap.get(watchFun).add(() => {
                        componet.watchObj[watchFun]()
                        componet.applyTruthFulData()
                    })
                }
            })
            componet.run()

        })

        this.ve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom))
        this.w = this.ve.render()
        root.appendChild(this.w)

        observe(this.data, this.observeMap, () => {
            this._updatedom(dom)
        })
        this._updatedom(dom)
    }
    _getDomTree() {
        try {
            this.parse.parseHtmlTemplate(this.template.trim())

        } catch (e) {
            console.error(`rv parse e:${e}`)
        }
        return this.parse.getHtmlDom()
    }
    _updatedom(dom) {
        let nve = this.rvDomUtil.getVirtualElement(this.rvDomUtil.applyTruthfulData(dom))
        window.nve = nve
        window.ve = this.ve
        patch(this.w, diff(this.ve, nve))
        this.ve = nve
    }
    watch(key, callback) {
        if (this.observeMap.hasKey(key)) {
            this.observeMap.get(key).add(callback)
        }

    }
    /**
     * this static function use to declaration a RV component
     * @param {*} option 
     */
    static component(option) {

        const { name, template, props, data } = option
        let parse = new _rvParse__WEBPACK_IMPORTED_MODULE_4__["default"]()
        parse.parseHtmlTemplate(template.trim())

        let dom = parse.getHtmlDom()

        return new _rvComponent__WEBPACK_IMPORTED_MODULE_6__["default"]({ dom: dom, props: props, name: name, data: data, run: option.run, watch: option.watch })
    }


}


function observe(obj, observeMap, callback) {

    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]
        let observable = new Observable()
        if (internalValue instanceof Object) {
            observe(internalValue, observeMap, callback)
        }
        observeMap.put(key, observable)
        Object.defineProperty(obj, key, {
            get() {
                observable.add(callback)
                return internalValue
            },
            set(newVal) {
                const changed = internalValue !== newVal
                internalValue = newVal
                if (changed) {
                    observable.invoke()
                }
            }
        })
    })
    return obj
}



class Observable {
    constructor() {
        this.updateFunctions = new Set()
    }
    add(observableUpdate) {
        this.updateFunctions.add(observableUpdate)
    }
    invoke() {
        this.updateFunctions.forEach(fun => fun())
    }
}


/**
 * the method use to deep clone obj
 * @param {*} obj 
 */
function clone(obj) {
    let getType = (o) => {
        if (o === null) return "null";
        if (o === undefined) return "undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }
    let result, oClass = getType(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        let copy = obj[key];
        if (getType(copy) == "Object") {
            result[key] = arguments.callee(copy);
        } else if (getType(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}



function h(tagName, props, children) {
    return new _element__WEBPACK_IMPORTED_MODULE_3__["default"](tagName, props, children)
}
function diff(oldTree, newTree) {
    let d = new _diff__WEBPACK_IMPORTED_MODULE_2__["default"](oldTree, newTree)
    return d.patches
}


function patch(node, patches) {
    return new _patch__WEBPACK_IMPORTED_MODULE_1__["default"](node, patches)
}



/* harmony default export */ __webpack_exports__["default"] = (RV);

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/map.js":
/*!*************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/map.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * the map object use to save likily (key,value) data
 */
class Map {
    constructor() {
        this.length = 0;
        this.map = new Object();
    }
    put(key, value) {
        if (!(key in this.map)) {
            this.length++;
        }
        this.map[key] = value;
    }
    get(key) {
        return (key in this.map) ? this.map[key] : null;
    }
    remove(key) {
        if ((key in this.map)) {
            delete this.map[key]
            this.length--;
        }
    }

    hasKey(key) {
        return (key in this.map)
    }
    forEach(callback) {
        Object.keys(this.map).forEach(mapKey => {
            callback(this.map[mapKey])
        })
    }
    size() {
        return this.length;
    }
    clear() {
        length = 0;
        this.map = new Object();
    }
}
/* harmony default export */ __webpack_exports__["default"] = (Map);

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/patch.js":
/*!***************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/patch.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/yhongm_rv.js/src/rv/util.js");
/* harmony import */ var _domState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domState */ "./node_modules/yhongm_rv.js/src/rv/domState.js");


class Patch {
    constructor(node, patches) {
        let walker = {
            index: 0
        }
        this.dfsWalk(node, walker, patches)
    }
    dfsWalk(node, walker, patches) {
        let currentPatches = patches[walker.index]
        let len = node.childNodes ? node.childNodes.length : 0
        for (let i = 0; i < len; i++) {
            let child = node.childNodes[i]
            walker.index++
            this.dfsWalk(child, walker, patches)
        }
        if (currentPatches) {
            this.applyPatches(node, currentPatches)
        }

    }
    applyPatches(node, currentPatche) {
        currentPatche.forEach((currentPatch) => {
            switch (currentPatch.type) {
                case _domState__WEBPACK_IMPORTED_MODULE_1__["NODE_REPLACE"]:
                    let newNode = _util__WEBPACK_IMPORTED_MODULE_0__["default"].isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render()
                    node.parentNode.replaceChild(newNode, node)
                    break
                case _domState__WEBPACK_IMPORTED_MODULE_1__["CHILD_RE_ORDER"]:
                    this.reorderChildren(node, currentPatch.moves)
                    break
                case _domState__WEBPACK_IMPORTED_MODULE_1__["NODE_PROPS"]:
                    this.setProps(node, currentPatch.props)
                    break
                case _domState__WEBPACK_IMPORTED_MODULE_1__["NODE_CONTENT"]:
                    if (node.textContent) {
                        node.textContent = currentPatch.content
                    } else {
                        node.nodeValue = currentPatch.content
                    }
                    break
                default:
                    break

            }
        })
    }
    reorderChildren(node, moves) {
        let staticNodeList = _util__WEBPACK_IMPORTED_MODULE_0__["default"].toArray(node.childNodes)
        let nodeMaps = {}
        staticNodeList.forEach((snode) => {
            if (snode.nodeType === 1) {
                let key = snode.getAttribute('key')
                if (key) {
                    nodeMaps[key] = snode
                }
            }
        })
        moves.forEach((move) => {
            let index = move.index
            if (move.type === 0) {
                if (staticNodeList[index] === node.childNodes[index]) {
                    node.removeChild(node.childNodes[index])
                }
                staticNodeList.splice(index, 1)
            } else if (move.type === 1) {
                let insertNode = nodeMaps[move.item.key] ?
                    nodeMaps(move.item.key).cloneNode(true) :
                    _util__WEBPACK_IMPORTED_MODULE_0__["default"].isString(move.item) ? document.createTextNode(move.item) : move.item.render()
                staticNodeList.splice(index, 0, insertNode)
                node.insertBefore(insertNode, node.childNodes[index] || null)
            }
        })

    }
    setProps(node, props) {
        for (let key in props) {
            if (props[key] === undefined) {
                node.removeAttribute(key)
            } else {
                const value = props[key]
                _util__WEBPACK_IMPORTED_MODULE_0__["default"].setAttr(node, key, value)
            }
        }

    }
}
/* harmony default export */ __webpack_exports__["default"] = (Patch);

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/rvComponent.js":
/*!*********************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/rvComponent.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rvDomUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rvDomUtil */ "./node_modules/yhongm_rv.js/src/rv/rvDomUtil.js");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./node_modules/yhongm_rv.js/src/rv/map.js");


class RvComponent {
    constructor(componentParam) {
        let { dom, props, name, data, run, watch } = componentParam
        this.dom = dom
        this.rdom = this.rdom
        this.props = props
        this.name = name
        this.data = data
        this.componentRun = run
        this.rvDomUtil = new _rvDomUtil__WEBPACK_IMPORTED_MODULE_0__["default"](data)
        this.observeMap = new _map__WEBPACK_IMPORTED_MODULE_1__["default"]()
        console.log(`observeMap:${JSON.stringify(this.observeMap)}`)
        this.watchObj = watch
        this.applyTruthFulData()

    }
    applyTruthFulData() {
        this.rdom = this.rvDomUtil.applyTruthfulData(this.dom)
    }
    run() {
        this.componentRun.call(this)
    }
    getName() {
        return this.name
    }
    apply(props) {

        for (let prop of Object.keys(this.props)) {

            if (props[prop]) {
                this.props[prop] = props[prop]
            }

        }


    }
    childContent(dom, props) {
        for (children of dom.children) {
            if (Util.isString(children)) {
                if (Util.isPlaceHolder(children)) {
                    value = props[Util.getPlaceHolderValue(children)]

                }
            } else {
                this.childContent(children)
            }
        }
    }

    getDom() {
        return this.rdom
    }
    getProp() {
        return this.props
    }

}
/* harmony default export */ __webpack_exports__["default"] = (RvComponent);

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/rvDomUtil.js":
/*!*******************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/rvDomUtil.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/yhongm_rv.js/src/rv/util.js");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "./node_modules/yhongm_rv.js/src/rv/element.js");



/**
 * this class include a set of common function for handle virtual DOM
 * @author yhongm
 */
class RVDomUtil {
    constructor(data) {
        this.data = data
    }

    getVirtualElement(dom) {
        let children = []
        for (let child in dom.children) {
            let cc = dom.children[child]
            if (cc instanceof Array) {
                cc.forEach(c => {
                    let v = this.getVirtualElement(c)
                    children.push(v)
                })
            } else if (cc instanceof Object) {
                let v = this.getVirtualElement(cc)
                children.push(v)
            } else {
                children.push(cc)
            }
        }

        return new _element__WEBPACK_IMPORTED_MODULE_1__["default"](dom.tag, dom.props, children)
    }
    applyTruthfulData(dom) {
        if ("for" in dom.props) {
            let dataArray = []
            let dataSingle

            if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isForIn(dom.props['for'])) {
                if ("childDomDatakey" in dom) {
                    dataArray = dom.data
                    dataSingle = dom.childDomDatakey
                } else if ("domDataKey" in dom) {
                    if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
                        dataArray = dom.data
                    }
                    dataSingle = dom.props['for'].split(" _in_ ")[0]

                }
                else {
                    dataArray = this.data[dom.props['for'].split(" _in_ ")[1]]

                    dataSingle = dom.props['for'].split(" _in_ ")[0]
                }

            } else {
                throw new Error("the for directive use error")
            }
            let objs = []

            dataArray.forEach(data => {

                let obj = this.vdom2rdom(dom, data, dataSingle, data)

                objs.push(obj)
            }

            )
            return objs
        } else {

            let data
            let childDomDatakey
            if ("data" in dom) {
                data = dom.data
                childDomDatakey = dom.childDomDatakey
            } else {
                data = this.data
                childDomDatakey = undefined
            }

            let obj = this.vdom2rdom(dom, data, childDomDatakey, data)

            return obj
        }
    }
    /**
     * virtual dom 2 real data dom
     * @param {*} dom 
     * @param {*} data 
     * @param {*} dataSingle 
     * @param {*} tdata 
     */
    vdom2rdom(dom, data, dataSingle, tdata) {
        let obj = {}
        obj.tag = dom.tag
        obj.children = []
        obj.props = {}
        let props = Object.keys(dom.props)
        for (let prop in props) {
            let value = props[prop]
            if (value === "style") {
                let style = dom.props[value]

                if (style.indexOf(",") > -1) {
                    let styles = style.split(",")
                    obj.props[value] = this.handleArrayStyle(data, styles, dataSingle)
                } else {

                    obj.props[value] = this.handleSingleStyle(data, style, dataSingle)
                }
            }
            else {
                if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isPlaceHolder(dom.props[value])) {
                    if (!_util__WEBPACK_IMPORTED_MODULE_0__["default"].isDotOperatorExpression(_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(dom.props[value]))) {
                        obj.props[value] = tdata[_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(dom.props[value])]
                    } else {
                        obj.props[value] = data[_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(dom.props[value]).split(".")[1]]
                    }
                } else if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isOperatorExpression(dom.props[value])) {

                    obj.props[value] = _util__WEBPACK_IMPORTED_MODULE_0__["default"].getOperatorExpression(dom.props[value], data, dataSingle)
                }
                else {
                    obj.props[value] = dom.props[value]
                }

            }

        }

        for (let child in dom.children) {
            if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isString(dom.children[child])) {
                if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isPlaceHolder(dom.children[child])) {
                    if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                        obj.children[child] = tdata[_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(dom.children[child])]

                    } else {
                        obj.children[child] = data[_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(dom.children[child]).split(".")[1]]
                    }

                }
                else {
                    obj.children[child] = dom.children[child]
                }

            } else {
                if (dom.children[child] instanceof Object) {
                    if ("childDomData" in dom.props) {
                        dom.children[child].childDomDatakey = dom.props.childDomData

                        dom.children[child].data = data
                    } else if ("domData" in dom.props) {
                        dom.children[child].domDataKey = dom.props.domData
                        dom.children[child].data = data[child]
                    }

                    dom.children[child].data = data

                }

                obj.children[child] = this.applyTruthfulData(dom.children[child])

            }
        }
        return obj

    }
    handleSingleStyle(data, style, dataSingle) {
        let newStyle = ''
        if (dataSingle) {
            if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isPlaceHolder(style)) {
                if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    let key = _util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    let styleKey = style.split(":")[0]
                    let styleValue = style.split(":")[1]
                    styleValue = data[_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {

            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (_util__WEBPACK_IMPORTED_MODULE_0__["default"].isPlaceHolder(styleValue)) {
                styleValue = data[_util__WEBPACK_IMPORTED_MODULE_0__["default"].getPlaceHolderValue(styleValue)]
                newStyle = styleKey + ":" + styleValue

            } else {
                newStyle = style

            }
        }
        return newStyle
    }
    handleArrayStyle(data, styles, dataSingle) {
        let newStyleArray = ""
        for (let style of styles) {

            let newStyle = this.handleSingleStyle(data, style, dataSingle)
            newStyleArray += newStyle + ";"
        }
        return newStyleArray

    }
}

/* harmony default export */ __webpack_exports__["default"] = (RVDomUtil);

/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/rvParse.js":
/*!*****************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/rvParse.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map */ "./node_modules/yhongm_rv.js/src/rv/map.js");


/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */
class YhmParse {
  constructor() {
    this.componetMap = new _map__WEBPACK_IMPORTED_MODULE_0__["default"]()
    this.mIndex = 0
    this.mMap = new _map__WEBPACK_IMPORTED_MODULE_0__["default"]()
    this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
    this.mHandler = {
      startELement: function (tagName, prop, content, that) {
        that.mIndex += 1
        if (that.componetMap.hasKey(tagName)) {
          //已经有当前组件的记录，将当前组件插入dom中
          that.componetMap.get(tagName).apply(prop)
          that.mMap.put(that.mIndex, that.componetMap.get(tagName).getDom())

        } else {
          var obj = { tag: tagName, props: prop, children: [], index: that.mIndex, content: content, isClose: false }

          if (content.length > 0) {

            obj.children.push(content.trim())
          }
          that.mMap.put(that.mIndex, obj)
        }

      },
      endElement: function (that) {
        that.mMap.get(that.mIndex).isClose = true
        if (that.mMap.hasKey((that.mIndex - 1))) {
          that.mMap.get(that.mIndex - 1).children.push(that.mMap.get(that.mIndex))
          that.mMap.remove(that.mIndex)
        }
        that.mIndex -= 1
      }


    }

  }
  /**
   * 用于解析自定义组件，按名字索引组件
   * @param {*} rvComponent 
   */
  useCustomComponent(rvComponent) {

    this.componetMap.put(rvComponent.getName(), rvComponent)
  }
  parseHtmlTemplate(html) {
    let startTime = new Date() / 1000
    var index = 0
    while (html) {
      var startTagOpen = html.indexOf('<')
      var startTagClose = html.indexOf('>') || html.indexOf('/>')
      var endTagOpen = html.indexOf('</')
      var endTagClose = html.indexOf('>')
      var startCommentOpen = html.indexOf('<!--')
      var endCommentClose = html.indexOf('-->')
      if (startCommentOpen == 0 && endCommentClose != -1 && endCommentClose > startCommentOpen) {
        index = endCommentClose + 3
        parseComment(html.substring(startCommentOpen + 4, endCommentClose + 3));
        html = html.substring(index)
        continue
      } else if (endTagOpen != -1 && endTagClose != -1 && endTagClose > endTagOpen) {
        index = endTagClose + 1
        _parseEndTag(html.substring(endTagOpen, endTagClose + 1), this)
        html = html.substring(index)
        continue
      } else if (startTagOpen != -1 && startTagClose != -1 && startTagClose > startTagOpen) {
        index = startTagClose + 1
        var content = ""
        if (html.indexOf('<', index) > -1 && html.indexOf('<', index) > startTagClose) {
          // let contentEndIndex = html.indexOf('</', (index + 1))
          content = html.substring(index, html.indexOf('<', index)).trim()
        }
        _parseStartTag(html.substring(startTagOpen, startTagClose + 1), content, this)
        html = html.substring(index)
        continue
      }
    }
    let endTime = new Date() / 1000
    // console.log(`total parse time:${endTime - startTime}`)



    function _parseStartTag(html, content, that) {
      let startTagEndIndex = html.indexOf(' ') != -1 ? html.indexOf(' ') : html.indexOf('/>') == -1 ? html.indexOf('>') : html.indexOf('/>')
      var tagName = html.substring(html.indexOf('<') + 1, startTagEndIndex)
      var prop = {}
      if (html.indexOf(' ') > -1) {
        var props = html.substring(html.indexOf(' ') + 1, html.indexOf('>'))

        var propsResult = props.match(that.mPropRe)
        for (let i = 0; i < propsResult.length; i++) {
          var pr = propsResult[i]

          prop[pr.split("=")[0]] = pr.split("=")[1].match(/(?<=").*?(?=")/)[0]
        }
      }

      if (that.mHandler) {
        if (/(?<=").*?(?=")/.test(content)) {
          content = content.match(/(?<=").*?(?=")/)[0]
        }
        that.mHandler.startELement(tagName, prop, content, that)
      }

    }
    function _parseEndTag(html, that) {
      if (that.mHandler) {
        that.mHandler.endElement(that)
      }
    }
    function parseComment(html) {
      // console.log(`parseComment=${html}`)
    }

  }
  getHtmlDom() {
    return this.mMap.get(1)
  }

}
/* harmony default export */ __webpack_exports__["default"] = (YhmParse);



/***/ }),

/***/ "./node_modules/yhongm_rv.js/src/rv/util.js":
/*!**************************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv/util.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Util {

    static isString(some) {
        return typeof some === 'string'
    }
    static toArray(list) {
        if (!list) {
            return []
        }
        let array = []
        for (let i = 0; i < list.length; i++) {
            array.push(list[i])
        }
        return array
    }
    static isForIn(direction) {
        return /^\w* _in_ \w*$/.test(direction)
    }
    static isForForIn(direction) {
        return /^\w* _in*$/.test(direction)
    }

    static isForOrForFor(direction) {
        return /^\w* _in_ \w|_in*$/.test(direction)
    }
    static isIgnoreChildren(node) {
        return node.props && node.props.hasOwnProperty("ignore")
    }
    static isNumber(value) {
        if (value === undefined || value === null || value === '') {
            return false
        }

        if (typeof (value) === 'string') {
            //正整数
            var reNumber = /^\d+$/
            //负整数
            var reNeNumber = /^-\d+$/
            //正实数
            var reRealNumber1 = /^[1-9]\d*[.]\d+$/  //非零开头
            var reRealNumber2 = /^0[.]\d+$/ //零开头
            //负实数
            var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/  //非零开头
            var reNeRealNumber2 = /^-0[.]\d+$/ //零开头

            if (reNumber.test(value) || reNeNumber.test(value)
                || reRealNumber1.test(value) || reRealNumber2.test(value)
                || reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
                return true
            }
            else {
                return false
            }
        }
        else if (typeof (value) === 'number') {
            return true
        }
        else {
            return false
        }
    }


    static setAttr(node, key, value) {
        switch (key) {
            case 'style':
                node.style.cssText = value
                break
            case 'value':
                let tagName = node.tagName || ''
                tagName = tagName.toLowerCase()
                if (tagName === 'input' || tagName === 'textarea') {
                    node.value = value
                } else {
                    node.setAttribute(key, value)
                }
                break
            default:
                node.setAttribute(key, value)
                break
        }

    }
    static isPlaceHolder(content) {
        if (content) {
            if (/^%#\w*.\w*#%$/.test(content)) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }
    static isDotOperatorExpression(content) {
        return /^\w*\.\w*$/.test(content)
    }
    static getPlaceHolderValue(content) {
        return content.slice(2, -2)
    }
    /**
     * 是否为表达式
     * @param {String} content 
     */
    static isOperatorExpression(content) {

        if (Util.isString(content)) {
            if (/^\{\w*|\|\%+\}$/.test(content)) {

                return true
            } else {

                return false
            }
        }
        return false
    }
    static getOperatorExpression(content, data, dataKey) {
        if (Util.isString(content)) {

            var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"))
            let startIndex = expression.indexOf("%#")
            let endIndex = expression.indexOf("#%") + 2
            if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                let placeHolder = expression.slice(startIndex, endIndex)
                let realValue
                if (placeHolder.indexOf(".") > 0) {
                    if (Util.getPlaceHolderValue(placeHolder).split(".")[0] === dataKey) {
                        let placeHolderValue = data[Util.getPlaceHolderValue(placeHolder).split(".")[1]]
                        realValue = Util.isNumber(placeHolderValue) ? placeHolderValue : `"${placeHolderValue}"`//通过placeHolder取真实的值

                    }


                } else {
                    realValue = data[Util.getPlaceHolderValue(placeHolder)]//通过placeHolder取真实的值
                }

                expression = expression.replace(placeHolder, realValue)

            }
            return eval(expression)
        }


    }
}

/* harmony default export */ __webpack_exports__["default"] = (Util);

/***/ }),

/***/ "./src/RVcalendar.js":
/*!***************************!*\
  !*** ./src/RVcalendar.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = generateView;

var _yhongm_rv = __webpack_require__(/*! yhongm_rv.js */ "./node_modules/yhongm_rv.js/src/rv/main.js");

var _yhongm_rv2 = _interopRequireDefault(_yhongm_rv);

var _lunar = __webpack_require__(/*! ./lunar */ "./src/lunar.js");

var _lunar2 = _interopRequireDefault(_lunar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  
 */
function Calendar() {
    this.months = new Array("一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二");
    this.dayCounts = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    this.days = new Array("日", "一", "二", "三", "四", "五", "六");
    this.today = this.getToday();
    this.year = this.today.year;
    this.month = this.today.month;
    this.newCal = new Date();
    this.selectDay = this.newCal;
    this.day = -1;
    this.startDay = 0;
    this.daily = 0;
    this.rv = undefined;
    if (this.today.year == this.newCal.getFullYear() && this.today.month == this.newCal.getMonth()) {
        this.day = this.today.day;
    }
}
Calendar.prototype.getWeeks = function () {
    this.newCal = new Date(this.year, this.month, 1);
    this.day = -1;
    this.startDay = this.newCal.getDay();
    this.daily = 0;
    if (this.today.year == this.newCal.getFullYear() && this.today.month == this.newCal.getMonth()) {
        this.day = this.today.day;
    }
    var dayCounts = this.getDayCounts(this.newCal.getMonth(), this.newCal.getFullYear());
    var weeks = [];
    for (var i = 0; i < 6; i++) {
        var dayInWeeks = [];
        dayInWeeks.id = 'week_row_' + i;
        for (var j = 0; j < 7; j++) {
            var _cellObj = {};
            var content = "";
            var style = "";
            var lable = "";
            var id = 'week_day_' + i + j;
            if (j == this.startDay && 0 == this.daily) {
                this.daily = 1;
            }

            if (this.day == this.daily) {
                style = "font-weight:bold;color:#FFFFFF;background-color:#5CBA5A;height:20px;text-align:center";
                lable = "current";
            } else if (j == 6) {
                style = "color:#FF0000;text-decoration:none;background-color:#E5E9F2;text-align:center;height:18px;width:12%";
                lable = "sat";
            } else if (j == 0) {
                style = "color: #FF0000;text-decoration:none;background-color:#E5E9F2;text-align:center;height:18px;width:12%";
                lable = "sun";
            } else {
                style = "color:#243F65;background-color:#E5E9F2;height:20px;width:11%;text-align:center";
                lable = "normal";
            }

            if (this.daily > 0 && this.daily <= dayCounts) {
                content = this.daily + "";
                this.daily++;
            } else {
                style = "color:#000000;background-color: #f6f6f6;height:20px;width: 11%;text-align:center";
                content = "";
            }
            _cellObj.content = content;
            _cellObj.id = id;
            _cellObj.lable = lable;
            _cellObj.style = style;
            var lunar = _lunar2.default.getLunar(this.year, this.month + 1, content);
            _cellObj.content = content;
            _cellObj.id = id;
            _cellObj.lable = lable;
            _cellObj.style = style;
            var lunarInfo = "";
            if (lunar.calendaricity != "") {
                lunarInfo = lunar.calendaricity;
            } else if (lunar.solarHoliday) {
                lunarInfo = lunar.solarHoliday;
            } else if (lunar.lunarHoliday) {
                lunarInfo = lunar.lunarHoliday;
            } else {
                if (lunar.chinaDay === "初一") {
                    lunarInfo = lunar.chinaMonth;
                } else {
                    lunarInfo = lunar.chinaDay;
                }
            }
            if (content != "") {
                _cellObj.lunarInfo = lunarInfo;
            } else {
                _cellObj.lunarInfo = "";
            }

            dayInWeeks.push(_cellObj);
        }
        weeks.push(dayInWeeks);
        window.weeks = weeks;
    }
    return weeks;
};
Calendar.prototype.getDayCounts = function (month, year) {
    if (1 == month) {
        return 0 == year % 4 && 0 != year % 100 || 0 == year % 400 ? 29 : 28;
    } else {
        return this.dayCounts[month];
    }
};
Calendar.prototype.getToday = function () {
    var _obj = {};
    var now = new Date();
    _obj.now = now;
    _obj.year = now.getFullYear();
    _obj.month = now.getMonth();
    _obj.day = now.getDate();
    return _obj;
};

Calendar.prototype.subMonth = function () {
    if (this.month - 1 < 0) {
        this.month = 11;
        this.year = this.year - 1;
    } else {
        this.month = this.month - 1;
    }
};
Calendar.prototype.addMonth = function () {
    if (this.month + 1 > 11) {
        this.month = 0;
        this.year = this.year + 1;
    } else {
        this.month = this.month + 1;
    }
};
Calendar.prototype.setMonth = function (month) {
    if (month < 1 || month > 12) {
        alert("月份必须在1-12之间!");
        return;
    }
    this.month = month;
};
Calendar.prototype.setYear = function (year) {
    this.year = year;
};

window.mouseOver = function (element) {
    element.style.color = "#FFFFFF";
};

window.mouseOut = function (element) {
    var label = element.getAttribute('lable');
    if (label == 'sat' || label == 'sun') {
        element.style.color = "#FF0000";
    } else {
        element.style.color = "#000000";
    }
};
var mCalendar = new Calendar();
window.mCalendar = mCalendar;
window.clickDay = function (element) {
    if (element.innerText != '') {
        var day = new Date(mCalendar.year, mCalendar.month, element.children[0].innerText);
        mCalendar.selectDay = day;
    }
};

function generateView(el, callback) {
    var weeks = mCalendar.getWeeks();
    var rv = new _yhongm_rv2.default({
        el: el,
        data: {
            year: '' + mCalendar.year,
            month: '' + (mCalendar.month + 1),
            weekTitles: [{
                id: "weekkey1",
                value: "一"
            }, {
                id: "weekkey2",
                value: "二"
            }, {
                id: "weekkey3",
                value: "三"
            }, {
                id: "weekkey4",
                value: "四"
            }, {
                id: "weekkey5",
                value: "五"
            }],
            weeks: weeks
        },
        template: '\n              <table border="0" cellpadding="0" cellspacing="1" id="caltable" key="table" style="text-decoration:none;width:200;background-color:#D0D0EE;font-size:8pt;border:0px dotted #1C6FF5;">\n                <thead key="thead">\n                <tr align="center" valign="middle" id="title" key="title" style="font-weight:normal;height:24px;text-align:center;color:#333333;text-decoration:none;background-color:#A4B9D7;border-top-width:1px;border-right-width:1px;border-bottom-width: 1px; border-left-width: 1px;border-bottom-style: 1px;border-top-color: #999999;border-right-color: #999999;border-bottom-color:#999999;border-left-color:#999999;">\n                   <td colspan="7" key="tdTitle">\n                      <div key="titleDiv">\n                          <button key="subButton"  style="font-size:1px; color:#243F65;cursor:hand;text-decoration:none;margin-right:2px" onclick="mCalendar.subMonth()">"\u4E0A\u6708"</button>\n                          <input name="year" type="text"  maxlength="4" size="4"  value="%#year#%" disabled="disabled" key="inputYear"></input>\n                          <input name="month" type="text"  maxlength="2" size="2"  value="%#month#%" disabled="disabled" key="inputMonth"></input>\n                          <button key="addButton"  style="font-size:1px; color:#243F65;cursor:hand;text-decoration:none;margin-left:2px" onclick="mCalendar.addMonth()">"\u4E0B\u6708"</button>\n                      </div>\n                   </td>\n                </tr>\n                <tr key="daytr">\n                  <td style="color: #FF0000;text-decoration: none;background-color: #C0D0E8;text-align: center;height: 20px;width: 12%;" key="daySunTitle">"\u65E5"</td>\n                  <td style="color:#000000;background-color:#C0D0E8;height:20px;width:11%;text-align:center;"  key="%#v.id#%" for="v _in_ weekTitles">"%#v.value#%"</td>\n                  <td style="color: #FF0000;text-decoration: none;background-color: #C0D0E8;text-align: center;height: 20px;width: 12%;" key="daySatTitle">"\u516D"</td>\n                </tr>\n              </thead>\n                <tbody cellspacing="0" cellpadding="0" id="calendar" style="text-decoration: none;width: 170;background-color: #C0D0E8;font-size: 9pt;border: 0px dotted #1C6FA5;"  align="center" border="1" key="tbody">\n                  <tr style="cursor:hand" key="%#week.id#%" for="week _in_ weeks" domData="week">\n                      <td  key="%#v.id#%" onclick="clickDay(this)" style="%#v.style#%" lable="%#v.lable#%" onMouseover="mouseOver(this)" onMouseOut="mouseOut(this)" childDomData="v" for="v _in_ week">\n                          <p key="{%#v.id#%+\'_content\'}" style="margin-block-start: 0em;margin-block-end: 0em">"%#v.content#%"</p>\n                          <p key="{%#v.id#%+\'_lunarInfo\'}" style="margin-block-start: 0em;margin-block-end: 0em" time="{new Date()}">"%#v.lunarInfo#%"</p>\n                      </td>\n                  </tr>\n                </tbody>      \n              </table>\n              '
    });
    rv.run();

    var month = mCalendar['month'];
    var year = mCalendar['year'];
    var selectDay = mCalendar['selectDay'];
    Object.defineProperty(mCalendar, 'month', {
        set: function set(nvalue) {
            if (month != nvalue) {
                month = nvalue;
                rv.data.weeks = mCalendar.getWeeks();
                rv.data.month = nvalue + 1;
            }
        },
        get: function get() {
            return month;
        }
    });
    Object.defineProperty(mCalendar, 'year', {
        set: function set(nvalue) {
            if (year != nvalue) {
                console.log("newYear:" + nvalue);
                year = nvalue;
                rv.data.weeks = mCalendar.getWeeks();
                rv.data.year = nvalue;
            }
        },
        get: function get() {
            return year;
        }
    });
    Object.defineProperty(mCalendar, 'selectDay', {
        set: function set(nvalue) {
            if (selectDay != nvalue) {
                selectDay = nvalue;
                callback(nvalue);
            }
        },
        get: function get() {
            return selectDay;
        }
    });
}

/***/ }),

/***/ "./src/lunar.js":
/*!**********************!*\
  !*** ./src/lunar.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LunarCalendar = function () {
  function LunarCalendar() {
    _classCallCheck(this, LunarCalendar);

    /**	
     * 
     * 农历1900-2100的润月信息表 
    十六进制形式:
    0x xxxxx    
    二进制形式:
    xxxx	xxxx	xxxx	xxxx	xxxx
    20-17	16-12	12-9	8-5	    4-1
       1-4: 表示当年有无闰年，有的话，为闰月的月份，没有的话，为0。
      5-16：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。(注意：从1月到12月对应的是第16位到第5位。)
    17-20： 表示闰月是大月还是小月，仅当存在闰月的情况下有意义。
      举个例子：
      1980年的数据是： 0x095b0 0x代表十六进制，后面的是十六进制数。
             1000 0000 0000 0000 0000
             0000 0000 0000 0000 1111
      二进制：  0000 1001 0101 1011 0000
      表示1980年没有闰月，从1月到12月的天数依次为：30、29、29、30 、29、30、29、30、 30、29、30、30。
      1982年的数据是：0x0a974
         1010   1001 0111 0100
    0000 1010 0 1001 0111 0100
      表示1982年的4月为闰月，即有第二个4月，且是闰小月。
      从1月到13月的天数依次为：30、29、30、29、 29(闰月)、 30、29、29、30、 29、30、30、30。
    
    * @Array Of Property
    * @return Hex 
    */
    this._yearInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, //1900-1909
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, //1910-1919
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, //1920-1929
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, //1930-1939
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, //1940-1949
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, //1950-1959
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, //1960-1969
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, //1970-1979
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //1980-1989
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, //1990-1999
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, //2000-2009
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, //2010-2019
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, //2020-2029
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, //2030-2039
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, //2040-2049
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, //2050-2059
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, //2060-2069
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, //2070-2079
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, //2080-2089
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, //2090-2099
    0x0d520]; //2100


    this._astrology = ["魔羯", "水瓶", "双鱼", "白羊", "金牛", "双子", "巨蟹", "狮子", "处女", "天秤", "天蝎", "射手", "魔羯"];
    /**
      * 公历每个月份的天数普通表
      */
    this._dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /**
      * 天干地支之天干速查表
      */
    this._TianGan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

    /**
      * 天干地支之地支速查表
      */
    this._DiZhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    /**
      * 生肖速查表
      */
    this._Zodiac = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];

    /**
      * 24节气速查表
      */
    this._calendaricity = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
    /**
      农历节日
    */
    this._lunarHoliday = ["0101 春节", "0115 元宵", "0505 端午", "0707 情人", "0715 中元", "0815 中秋", "0909 重阳", "1208 腊八", "1224 小年", "1230 除夕"];
    /*
     公历节日
    */
    this._solarHoliday = ["0101 元旦", "0214 情人", "0308 妇女", "0312 植树", "0315 消费者权益日", "0401 愚人", "0501 劳动", "0504 青年", //
    "0512 护士", "0601 儿童", "0701 建党", "0801 建军", "0808 父亲", "0910 教师", "0928 孔子诞辰", //
    "1001 国庆", "1024 联合国日", "1112 孙中山诞辰纪念", "1220 澳门回归纪念", "1225 圣诞"];

    /**
      * 1900-2100各年农历的24节气日期速查表
      */
    this._calendaricityTable = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e', '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722'];

    /**
      * 中文日期
      */
    this._chineseChar = ["日", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

    /**
      * 农历进制单位
      */
    this._chineseTenChar = ["初", "十", "廿", "卅"];

    /**
      * 月份农历表示
      */
    this._lunarMonthTable = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
  }
  /**
    * 返回农历year年一整年的总天数
    */


  _createClass(LunarCalendar, [{
    key: "_lunarYearDays",
    value: function _lunarYearDays(year) {
      var i,
          sum = 348;
      for (i = 0x8000; i > 0x8; i >>= 1) {
        sum += this._yearInfo[year - 1900] & i ? 1 : 0;
      }
      return sum + this._leapDaysInLunarYear(year);
    }

    /**
      * 返回农历year年对应的闰月
      */

  }, {
    key: "_leapMonthInLunarYear",
    value: function _leapMonthInLunarYear(year) {
      return this._yearInfo[year - 1900] & 0x0000f;
    }
    /**
      * 返回农历y年闰月的天数 若该年没有闰月则返回0
      */

  }, {
    key: "_leapDaysInLunarYear",
    value: function _leapDaysInLunarYear(year) {
      if (this._leapMonthInLunarYear(year)) {
        return this._yearInfo[year - 1900] & 0x10000 ? 30 : 29;
      }
      return 0;
    }

    /**
      * 返回农历year年month月（非闰月）的总天数，
      */

  }, {
    key: "_monthDays",
    value: function _monthDays(year, month) {
      if (month > 12 || month < 1) {
        return -1;
      } //月份参数从1至12，参数错误返回-1

      return this._yearInfo[year - 1900] & 0x10000 >> month ? 30 : 29;
    }
    /**
      * 返回公历year年month月的天数
      */

  }, {
    key: "_getDaysInMonth",
    value: function _getDaysInMonth(year, month) {
      if (month > 12 || month < 1) {
        return -1;
      } //若参数错误 返回-1
      var ms = month - 1;
      if (ms == 1) {
        //2月份的闰平规律测算后确认返回28或29
        return year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? 29 : 28;
      } else {
        return this._dayInMonth[ms];
      }
    }

    /**
     * 农历年份转换为干支纪年
        干支纪年法
         天干地支表
       01.甲子 02.乙丑 03.丙寅 04.丁卯 05.戊辰 06.己巳 07.庚午 08.辛未 09.壬申 10.癸酉
      　   11.甲戌 12.乙亥 13.丙子 14.丁丑 15.戊寅 16.己卯 17.庚辰 18.辛巳 19.壬午 20.癸未
      　   21.甲申 22.乙酉 23.丙戌 24.丁亥 25.戊子 26.己丑 27.庚寅 28.辛卯 29.壬辰 30.癸巳
     　    31.甲午 32.乙未 33.丙申 34.丁酉 35.戊戌 36.己亥 37.庚子 38.辛丑 39.任寅 40.癸卯
      　   41.甲辰 42.乙巳 43.丙午 44.丁未 45.戊申 46.己酉 47.庚戌 48.辛亥 49.壬子 50.癸丑
          51.甲寅 52.乙卯 53.丙辰 54.丁己 55.戊午 56.己未 57.庚申 58.辛酉 59.壬戌 60.癸亥
       用阳历的年份除以60得到的年份再减去3就是这一年农历的干支序号数，查干支表得到干支年纪，
       若得出来的数据小于零或者等于零则加上60即可。
       举个例子：求2019年干支，2019÷60＝33余39，年干支序号数=39-3=36，
       所以得知今年是己亥年。干支纪年都是从每年的立春开始的，不管立春在前一年的腊月还是新一年的正月，立春开始才算新的一年。
     */

  }, {
    key: "_getGanZhiYear",
    value: function _getGanZhiYear(year) {
      var ganKey = (year - 3) % 10;
      var zhiKey = (year - 3) % 12;
      if (ganKey == 0) ganKey = 10; //如果余数为0则为最后一个天干
      if (zhiKey == 0) zhiKey = 12; //如果余数为0则为最后一个地支
      return this._TianGan[ganKey - 1] + this._DiZhi[zhiKey - 1];
    }

    /**
     * 公历月、日判断所属星座
     */

  }, {
    key: "_getAstrology",
    value: function _getAstrology(cMonth, cDay) {
      var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
      return this._astrology[cMonth - (cDay < arr[cMonth - 1] ? 1 : 0)] + "座"; //座
    }

    /**
      * 
      天干一共有十个，分别有甲、乙、丙、丁、戊、己、庚、辛、壬、癸。地支一共有十二个，分别有子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。干支还有阴阳之分，甲、丙、戊、庚、壬为阳干，乙、丁、己、辛、癸为阴干。子、寅、辰、午、申、戌为阳支，丑、卯、巳、未、酉、亥为阴支，一个天干和一个地支相配，排列起来，天干在前，地支在后，天干由甲起，地支由子起，阳干配阳支，阴干配阴支，共有六十个组合。古人就用这60个组合循环起来纪年，纪月，纪日，纪时。
        纪年，中国古人用60个组合依次纪年，一年一个组合，，干支纪年，一个周期的第一年为甲子，第二年为乙丑，依次类推，60年一个轮回，每一个新年开始于正月初一的正子时。
        纪月，干支纪月，采用每个地支对应24节气自某节气至下一个节气，以交结时间决定起始的一个月期间。干支纪月是干支历的一部分，主要用于风水术术等领域，这使得干支历一直在官方和民间都流传不衰。
        纪日，纪日是干支的最早用法，一个昼夜是一天，用60个组合来依次纪日，比如今天是甲子日，明天就是乙丑日，60天一个循环，新的一天从正子午开始，中国明确可查的干支纪日，是春秋鲁隐公三年（公元前720年），距今已经有2700多年了，这是迄今为止是世界上最早的记日法。
          
      
      传入offset偏移量返回干支 
      */

  }, {
    key: "_getGanZhi",
    value: function _getGanZhi(offset) {
      return this._TianGan[offset % 10] + this._DiZhi[offset % 12];
    }

    /**
      公历year年获得该年第index个节气的公历日期
      */

  }, {
    key: "_getCalendaricity",
    value: function _getCalendaricity(year, index) {
      if (year < 1900 || year > 2100) {
        return -1;
      }
      if (index < 1 || index > 24) {
        return -1;
      }
      var _table = this._calendaricityTable[year - 1900];
      var _calendaricityInfo = [parseInt('0x' + _table.substr(0, 5)).toString(), parseInt('0x' + _table.substr(5, 5)).toString(), parseInt('0x' + _table.substr(10, 5)).toString(), parseInt('0x' + _table.substr(15, 5)).toString(), parseInt('0x' + _table.substr(20, 5)).toString(), parseInt('0x' + _table.substr(25, 5)).toString()];

      var _calday = [_calendaricityInfo[0].substr(0, 1), _calendaricityInfo[0].substr(1, 2), _calendaricityInfo[0].substr(3, 1), _calendaricityInfo[0].substr(4, 2), _calendaricityInfo[1].substr(0, 1), _calendaricityInfo[1].substr(1, 2), _calendaricityInfo[1].substr(3, 1), _calendaricityInfo[1].substr(4, 2), _calendaricityInfo[2].substr(0, 1), _calendaricityInfo[2].substr(1, 2), _calendaricityInfo[2].substr(3, 1), _calendaricityInfo[2].substr(4, 2), _calendaricityInfo[3].substr(0, 1), _calendaricityInfo[3].substr(1, 2), _calendaricityInfo[3].substr(3, 1), _calendaricityInfo[3].substr(4, 2), _calendaricityInfo[4].substr(0, 1), _calendaricityInfo[4].substr(1, 2), _calendaricityInfo[4].substr(3, 1), _calendaricityInfo[4].substr(4, 2), _calendaricityInfo[5].substr(0, 1), _calendaricityInfo[5].substr(1, 2), _calendaricityInfo[5].substr(3, 1), _calendaricityInfo[5].substr(4, 2)];
      return parseInt(_calday[index - 1]);
    }

    /**
      * 农历汉语表示
      */

  }, {
    key: "_getChinaMonth",
    value: function _getChinaMonth(month) {
      if (month > 12 || month < 1) {
        return -1;
      }
      return this._lunarMonthTable[month - 1] + "\u6708";
    }

    /**
      *农历日期日表示
      */

  }, {
    key: "_getChinaDay",
    value: function _getChinaDay(day) {
      var s = void 0;
      switch (day) {
        case 10:
          s = '初十';break;
        case 20:
          s = '二十';break;
          break;
        case 30:
          s = '三十';break;
          break;
        default:
          s = this._chineseTenChar[Math.floor(day / 10)];
          s += this._chineseChar[day % 10];
      }
      return s;
    }
    /*
    返回农历节日
    */

  }, {
    key: "_getLunarHoliday",
    value: function _getLunarHoliday(month, day) {
      var lunarHolidayStr = "";
      this._lunarHoliday.forEach(function (lunar) {
        var ld = lunar.split(" ")[0];
        var ldv = lunar.split(" ")[1];
        var lmonth_v = month + "";
        var lday_v = day + "";
        var lmd = "";
        if (month < 10) {
          lmonth_v = "0" + month;
        }
        if (day < 10) {
          lday_v = "0" + day;
        }
        lmd = lmonth_v + lday_v;
        if (ld.trim() === lmd.trim()) {
          lunarHolidayStr = ldv;
        }
      });
      return lunarHolidayStr;
    }
    /**
    * 返回对应日期的公历节日
    */

  }, {
    key: "_getSolarHoliday",
    value: function _getSolarHoliday(month, day) {
      var solarHolidayStr = "";
      this._solarHoliday.forEach(function (solar) {

        var sd = solar.split(" ")[0];
        var sdv = solar.split(" ")[1];
        var smonth_v = month + "";
        var sday_v = day + "";
        var smd = "";
        if (month < 10) {
          smonth_v = "0" + month;
        }
        if (day < 10) {
          sday_v = "0" + day;
        }
        smd = smonth_v + sday_v;
        if (sd.trim() === smd.trim()) {
          solarHolidayStr = sdv;
        }
      });
      return solarHolidayStr;
    }

    /**
      获取对应年份的生肖
      */

  }, {
    key: "_getZodiac",
    value: function _getZodiac(year) {
      return this._Zodiac[(year - 4) % 12];
    }
    /*
    * 获取日期是否为24节气
      首先获取节气为当月的第几天，与当前匹配的，返回对应的节气
    */

  }, {
    key: "_getLunarDayCalendaricity",
    value: function _getLunarDayCalendaricity(firstCalendaricityDay, secondCalendaricityDay, nowSelectDay, nowSelectMonth) {
      //传入的日期的节气与否

      var calendaricityStr = "";
      if (firstCalendaricityDay == nowSelectDay) {

        calendaricityStr = this._calendaricity[nowSelectMonth * 2 - 2];
      }
      if (secondCalendaricityDay == nowSelectDay) {

        calendaricityStr = this._calendaricity[nowSelectMonth * 2 - 1];
      }
      return calendaricityStr;
    }

    /**
      * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
      * @param solarYear  solar year
      * @param solarMonth  solar month
      * @param solarDay  solar day
      * @return JSON object
      */

  }, {
    key: "getLunar",
    value: function getLunar(solarYear, solarMonth, solarDay) {
      //参数区间1900.1.31~2100.12.31
      if (solarYear < 1900 || solarYear > 2100) {
        return -1;
      } //年份限定、上限
      if (solarYear == 1900 && solarMonth == 1 && solarDay < 31) {
        return -1;
      } //下限
      if (!solarYear) {
        //未传参  获得当天
        var nowSelectDate = new Date();
      } else {
        var nowSelectDate = new Date(solarYear, parseInt(solarMonth) - 1, solarDay);
      }
      var nowSelectYear = nowSelectDate.getFullYear();
      var nowSelectMonth = nowSelectDate.getMonth() + 1;
      var nowSelectDay = nowSelectDate.getDate();
      var offset = (Date.UTC(nowSelectDate.getFullYear(), nowSelectDate.getMonth(), nowSelectDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000;
      //offset当前日期与1990.1.31相差日期。1990.1.31.开始第一个农历周期开始
      var tempYear,
          leap = 0,
          temp = 0;
      //tempYear 当前年份至1990年依次减去中间所有的农历年的天数，余下offset为当前农历年第多少天
      for (tempYear = 1900; tempYear < 2101 && offset > 0; tempYear++) {
        temp = this._lunarYearDays(tempYear); //计算当前农历年的总天数
        offset -= temp;
        //offset依次减去所有农历年的总天数后
        //tempYear为当前的的农历年份
      }

      if (offset < 0) {
        //offset小于0时候修正
        offset += temp;
        tempYear--;
      }

      var isTodayObj = new Date(); //获取当前日期
      var isToday = false;
      if (isTodayObj.getFullYear() == nowSelectYear && isTodayObj.getMonth() + 1 == nowSelectMonth && isTodayObj.getDate() == nowSelectDay) {
        isToday = true;
      }
      //星期几
      var nWeek = nowSelectDate.getDay();
      var cWeek = this._chineseChar[nWeek];
      if (nWeek == 0) {
        nWeek = 7;
      } //数字表示周几顺应天朝周一开始的惯例
      //农历年
      var year = tempYear;

      var leap = this._leapMonthInLunarYear(tempYear); //闰哪个月
      var isLeap = false;

      //效验闰月
      var tempMonth;
      for (tempMonth = 1; tempMonth < 13 && offset > 0; tempMonth++) {

        if (leap > 0 && tempMonth == leap + 1 && isLeap == false) {
          //闰月
          --tempMonth;
          isLeap = true;
          temp = this._leapDaysInLunarYear(year); //计算农历闰月天数
        } else {
          //非闰月
          temp = this._monthDays(year, tempMonth); //计算农历普通月天数
        }

        if (isLeap == true && tempMonth == leap + 1) {
          //如果闰月去掉闰月标记
          isLeap = false;
        }
        offset -= temp;
      }

      if (offset == 0 && leap > 0 && tempMonth == leap + 1) if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;--tempMonth;
      }
      if (offset < 0) {
        offset += temp;
        --tempMonth;
      }
      //农历月
      var month = tempMonth;
      //农历日
      var day = offset + 1;

      //天干地支处理
      var sm = nowSelectMonth - 1;
      var ganZhiYear = this._getGanZhiYear(year);

      //月柱推算表
      //1900年1月小寒以前为 丙子月(60进制12)
      var _firstCalendaricityDay = this._getCalendaricity(nowSelectYear, nowSelectMonth * 2 - 1); //返回当月「节」为几日开始
      var _secondCalendaricityDay = this._getCalendaricity(nowSelectYear, nowSelectMonth * 2); //返回当月「节」为几日开始
      //依据12节气修正干支月
      var ganZhiMonth = this._getGanZhi((nowSelectYear - 1900) * 12 + nowSelectMonth + 11);
      if (nowSelectDay >= _firstCalendaricityDay) {
        ganZhiMonth = this._getGanZhi((nowSelectYear - 1900) * 12 + nowSelectMonth + 12);
      }
      var calendaricity = this._getLunarDayCalendaricity(_firstCalendaricityDay, _secondCalendaricityDay, nowSelectDay, nowSelectMonth);

      //日柱推算表 当月一日与 1900/1/1 相差天数
      var dayCyclical = Date.UTC(nowSelectYear, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10;
      var ganZhiDay = this._getGanZhi(dayCyclical + nowSelectDay - 1);
      //该日期所属的星座
      var astro = this._getAstrology(nowSelectMonth, nowSelectDay);

      var zodiac = this._getZodiac(year);
      var chinaMonth = this._getChinaMonth(month);
      var chinaDay = this._getChinaDay(day);
      var lunarHoliday = this._getLunarHoliday(month, day);
      var solarHoliday = this._getSolarHoliday(nowSelectMonth, nowSelectDay);
      return { 'lunarYear': year, 'lunarMonth': month, 'lunarDay': day, 'zodiac': zodiac, 'chinaMonth': (isLeap ? "闰" : '') + chinaMonth, 'chinaDay': chinaDay, 'solarYear': nowSelectYear, 'solarMonth': nowSelectMonth, 'solarDay': nowSelectDay, 'ganZhiYear': ganZhiYear, 'ganZhiMonth': ganZhiMonth, 'ganZhiDay': ganZhiDay, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': "星期" + cWeek, 'calendaricity': calendaricity, 'astro': astro, "lunarHoliday": lunarHoliday, "solarHoliday": solarHoliday };
    }
  }]);

  return LunarCalendar;
}();

var lunarCalendar = new LunarCalendar();
exports.default = lunarCalendar;

//****************分割线java版本*************** */
// import java.text.ParseException;
// import java.text.SimpleDateFormat;
// import java.util.Date;
// import java.util.Locale;
// import java.util.Calendar;

// class LunarCalendar {
//     private int year; // 公历年
//     private int month;// 公历月
//     private int day;// 公历日
//     private int lunarYear;// 阴历年
//     private int lunarMonth;// 阴历月
//     private int lunarDay;// 阴历日
//     private int leapMonth = 0; // 阴历闰的月
//     private int daysOfMonth = 0; // 某月的天数
//     private int dayOfWeek = 0; // 具体某一天是星期几

//     private final static String chineseMonthNumber[] = { "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二" };
//     private final static String[] Zodiac = new String[] { "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪" };
//     private final static String[] Gan = new String[] { "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸" };
//     private final static String[] Zhi = new String[] { "子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥" };
//     private final static String chineseTenChar[] = { "初", "十", "廿", "卅" };
//     private final static String[] lunarHoliday = new String[] { "0101 春节", "0115 元宵", "0505 端午", "0707 情人", "0715 中元",
//             "0815 中秋", "0909 重阳", "1208 腊八", "1224 小年", "0100 除夕" };
//     private final static String[] solarHoliday = new String[] { //
//             "0101 元旦", "0214 情人", "0308 妇女", "0312 植树", "0315 消费者权益日", "0401 愚人", "0501 劳动", "0504 青年", //
//             "0512 护士", "0601 儿童", "0701 建党", "0801 建军", "0808 父亲", "0910 教师", "0928 孔子诞辰", //
//             "1001 国庆", "1006 老人", "1024 联合国日", "1112 孙中山诞辰纪念", "1220 澳门回归纪念", "1225 圣诞" };
//     private static SimpleDateFormat chineseDateFormat = new SimpleDateFormat("yyyy年MM月dd日", Locale.CHINA);
//     private final static long[] lunarInfo = new long[] { //
//             0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, //
//             0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, //
//             0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, //
//             0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, //
//             0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, //
//             0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, //
//             0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, //
//             0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, //
//             0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, //
//             0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, //
//             0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, //
//             0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, //
//             0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, //
//             0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, //
//             0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, //
//             0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, //
//             0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0 };

//     public LunarCalendar(int year, int month, int day) {
//         this.year = year;
//         this.month = month;
//         this.day = day;
//         this.initLunarDate();
//     }
//     private void initLunarDate(){
//         String nowadays;
//         Date baseDate = null;
//         Date nowaday = null;
//         try {
//             baseDate = chineseDateFormat.parse("1900年1月31日");
//         } catch (ParseException e) {
//             e.printStackTrace();
//         }

//         nowadays = this.year + "年" + this.month + "月" + this.day + "日";
//         try {
//             nowaday = chineseDateFormat.parse(nowadays);
//         } catch (ParseException e) {
//             e.printStackTrace();

//         }

//         // 与1900年1月31日相差的天数
//         int offset = (int) ((nowaday.getTime() - baseDate.getTime()) / 86400000L);

//         /**
//          * 用offset减去每农历年的天数
//          计算当天是农历第几天
//          iYear最终结果是农历的年份
//          offset为当年的第几天
//          */
//         int iYear, daysOfYear = 0;
//         for (iYear = 1900; iYear < 2101 && offset > 0; iYear++) {
//             daysOfYear = daysInLunarYear(iYear);
//             offset -= daysOfYear;
//         }
//         if (offset < 0) {
//             offset += daysOfYear;
//             iYear--;
//         }

//         leapMonth = getLeapMonth(iYear); // 农历闰那个月
//         boolean leap = false;

//         // 用当年的天数offset,逐个减去每月（农历）的天数，求出当天是本月的第几天
//         int iMonth, daysOfMonth = 0;
//         for (iMonth = 1; iMonth < 13 && offset > 0; iMonth++) {

//             if (leapMonth > 0 && iMonth == (leapMonth + 1) && !leap) {
//                 // 闰月
//                 --iMonth;
//                 leap = true;
//                 daysOfMonth = leapDayInLunar(year);
//             } else
//                 daysOfMonth = monthDaysInLunar(year, iMonth);

//             offset -= daysOfMonth;
//             // 解除闰月
//             if (leap && iMonth == (leapMonth + 1))
//                 leap = false;

//         }
//         // offset为0时，并且刚才计算的月份是闰月，要校正
//         if (offset == 0 && leapMonth > 0 && iMonth == leapMonth + 1) {
//             if (leap) {
//                 leap = false;
//             } else {
//                 leap = true;
//                 --iMonth;
//             }
//         }
//         // offset小于0时，也要校正
//         if (offset < 0) {
//             offset += daysOfMonth;
//             --iMonth;
//         }
//          // 农历年份
//         lunarYear = iYear;
//         lunarMonth = iMonth;
//         lunarDay = offset + 1;
//     }

//     /**
//      * 返回农历year年的总天数
//      *
//      * @param year 年份
//      * @return 该年的总天数
//      */
//     private int daysInLunarYear(int year) {
//         int i, sum = 348;
//         for (i = 0x8000; i > 0x8; i >>= 1) {
//             if ((lunarInfo[year - 1900] & i) != 0)
//                 sum += 1;
//         }
//         return (sum + leapDayInLunar(year));
//     }

//     /**
//      * 返回农历 year年闰月的天数
//      *
//      * @param year 年份
//      * @return
//      */
//     private int leapDayInLunar(int year) {
//         if (getLeapMonth(year) != 0) {
//             if ((lunarInfo[year - 1900] & 0x10000) != 0) {
//                 return 30;
//             } else {
//                 return 29;
//             }
//         } else
//             return 0;
//     }

//     /**
//      * 
//      * 农历闰那个月
//      * 
//      * @param year 年份
//      * @return
//      */
//     private int getLeapMonth(int year) {
//         return (int) (lunarInfo[year - 1900] & 0b1111);
//     }


//     /**
//      * 传回农历 year年month月的总天数
//      *
//      * @param year  年份
//      * @param month 月份
//      * @return 该月份的总天数
//      */
//     private int monthDaysInLunar(int year, int month) {
//         if ((lunarInfo[year - 1900] & (0x10000 >> month)) == 0)
//             return 29;
//         else
//             return 30;
//     }

//     /**
//      * 返回农历year年的生肖
//      *
//      * @param year 年份
//      * @return 生肖
//      */
//     private String getZodiacYear(int year) {
//         return Zodiac[(year - 4) % 12];
//     }

//     /**
//      * 返回对应年的干支
//      */
//     private String getGanZhi(int year) {
//         int num = year - 1900 + 36;
//         return (Gan[num % 10] + Zhi[num % 12]);
//     }

//     /**
//      * 返回当前年份的干支
//      * 
//      * @return
//      */
//     public String getCurrentYearGanZhi() {
//         return getGanZhi(this.year);
//     }

//     /**
//      * 获取当前年份的生肖
//      * 
//      * @return
//      */
//     public String getCurrentYearZodiac() {
//         return getZodiacYear(this.lunarYear);
//     }

//     private String getChinaDayString(int day) {

//         int n = day % 10 == 0 ? 9 : day % 10 - 1;
//         if (day > 30)
//             return "";
//         if (day == 10)
//             return "初十";
//         else
//             return chineseTenChar[day / 10] + chineseMonthNumber[n];
//     }

//     /**
//      * 获取当前日期农历节日
//      */
//     public String getCurrentLunarHoliday(){
//         return getLunarHoliday(this.lunarMonth,this.lunarDay);
//     }

//     /**
//      * 获取当前日期公历节日
//      */
//     public String getCurrentSolarHoliday(){
//         return getSolarHoliday(this.month,this.day);
//     }


//     /**
//      * 返回对应阴历的日期
//      */
//     private String getLunarDate() {
//         return chineseMonthNumber[lunarMonth - 1] + "月" + getChinaDayString(lunarDay);
//     }

//     /**
//      * 返回对应日期的公历节假日
//      * 
//      * @param month 公历月
//      * @param day   公历日
//      * @return
//      */
//     private String getSolarHoliday(int month, int day) {
//         for (int i = 0; i < solarHoliday.length; i++) {

//             String sd = solarHoliday[i].split(" ")[0];
//             String sdv = solarHoliday[i].split(" ")[1];
//             String smonth_v = month + "";
//             String sday_v = day + "";
//             String smd = "";
//             if (month < 10) {
//                 smonth_v = "0" + month;
//             }
//             if (day < 10) {
//                 sday_v = "0" + day;
//             }
//             smd = smonth_v + sday_v;
//             if (sd.trim().equals(smd.trim())) {
//                 return sdv;
//             }
//         }
//         return "";
//     }

//     /***
//      * 获取阴历对应的节假日
//      * 
//      * @param month 阴历月
//      * @param day   阴历日
//      * @return
//      */
//     private String getLunarHoliday(int month, int day) {
//         for (int i = 0; i < lunarHoliday.length; i++) {
//             // 返回农历节假日名称
//             String ld = lunarHoliday[i].split(" ")[0];
//             String ldv = lunarHoliday[i].split(" ")[1];
//             String lmonth_v = month + "";
//             String lday_v = day + "";
//             String lmd = "";
//             if (month < 10) {
//                 lmonth_v = "0" + month;
//             }
//             if (day < 10) {
//                 lday_v = "0" + day;
//             }
//             lmd = lmonth_v + lday_v;
//             if (ld.trim().equals(lmd.trim())) {
//                 return ldv;
//             }
//         }
//         return "";
//     }
//      /**
//      * 判断公历是否为闰年
//      * 
//      * @param year
//      * @return
//      */
//     public boolean isLeapYear(int year) {
//         if (year % 100 == 0 && year % 400 == 0) {
//             return true;
//         } else if (year % 100 != 0 && year % 4 == 0) {
//             return true;
//         }
//         return false;
//     }

//     /**
//      * 判断公历对应年月的天数
//      * 
//      * @param isLeapYear
//      * @param month
//      * @return
//      */
//     public int getDaysOfMonth(boolean isLeapYear, int month) {
//         switch (month) {
//         case 1:
//         case 3:
//         case 5:
//         case 7:
//         case 8:
//         case 10:
//         case 12:
//             daysOfMonth = 31;
//             break;
//         case 4:
//         case 6:
//         case 9:
//         case 11:
//             daysOfMonth = 30;
//             break;
//         case 2:
//             if (isLeapYear) {
//                 daysOfMonth = 29;
//             } else {
//                 daysOfMonth = 28;
//             }

//         }
//         return daysOfMonth;
//     }

//     /**
//      * 判断公历年月日属于星期几
//      * 
//      * @param year
//      * @param month
//      * @return
//      */
//     public int getWeekdayOfMonth(int year, int month) {
//         Calendar cal = Calendar.getInstance();
//         cal.set(year, month - 1, 1);
//         dayOfWeek = cal.get(Calendar.DAY_OF_WEEK) - 1;
//         return dayOfWeek;
//     }

//     public static void main(String[] args) {
//         LunarCalendar calendar = new LunarCalendar(2019, 9, 13);
//         System.out.println("calendar.getLunarDate():" + calendar.getLunarDate());
//         System.out.println("calendar.getCurrentLunarHoliday():" + calendar.getCurrentLunarHoliday());
//         System.out.println("calendar.getCurrentSolarHoliday():" + calendar.getCurrentSolarHoliday());
//     }
// }

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2FsZW5kYXJEZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95aG9uZ21fcnYuanMvc3JjL3J2L2RpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lob25nbV9ydi5qcy9zcmMvcnYvZGlmZl9saXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95aG9uZ21fcnYuanMvc3JjL3J2L2RvbVN0YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95aG9uZ21fcnYuanMvc3JjL3J2L2VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lob25nbV9ydi5qcy9zcmMvcnYvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMveWhvbmdtX3J2LmpzL3NyYy9ydi9tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lob25nbV9ydi5qcy9zcmMvcnYvcGF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lob25nbV9ydi5qcy9zcmMvcnYvcnZDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lob25nbV9ydi5qcy9zcmMvcnYvcnZEb21VdGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95aG9uZ21fcnYuanMvc3JjL3J2L3J2UGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3lob25nbV9ydi5qcy9zcmMvcnYvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUlZjYWxlbmRhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbHVuYXIuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwic2VsZWN0RGF5IiwiY29uc29sZSIsImxvZyIsImdlbmVyYXRlVmlldyIsIkNhbGVuZGFyIiwibW9udGhzIiwiQXJyYXkiLCJkYXlDb3VudHMiLCJkYXlzIiwidG9kYXkiLCJnZXRUb2RheSIsInllYXIiLCJtb250aCIsIm5ld0NhbCIsIkRhdGUiLCJkYXkiLCJzdGFydERheSIsImRhaWx5IiwicnYiLCJ1bmRlZmluZWQiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwicHJvdG90eXBlIiwiZ2V0V2Vla3MiLCJnZXREYXkiLCJnZXREYXlDb3VudHMiLCJ3ZWVrcyIsImkiLCJkYXlJbldlZWtzIiwiaWQiLCJqIiwiX2NlbGxPYmoiLCJjb250ZW50Iiwic3R5bGUiLCJsYWJsZSIsImx1bmFyIiwibHVuYXJDYWxlbmRhciIsImdldEx1bmFyIiwibHVuYXJJbmZvIiwiY2FsZW5kYXJpY2l0eSIsInNvbGFySG9saWRheSIsImx1bmFySG9saWRheSIsImNoaW5hRGF5IiwiY2hpbmFNb250aCIsInB1c2giLCJfb2JqIiwibm93IiwiZ2V0RGF0ZSIsInN1Yk1vbnRoIiwiYWRkTW9udGgiLCJzZXRNb250aCIsImFsZXJ0Iiwic2V0WWVhciIsIm1vdXNlT3ZlciIsImVsZW1lbnQiLCJjb2xvciIsIm1vdXNlT3V0IiwibGFiZWwiLCJnZXRBdHRyaWJ1dGUiLCJtQ2FsZW5kYXIiLCJjbGlja0RheSIsImlubmVyVGV4dCIsImNoaWxkcmVuIiwiZWwiLCJjYWxsYmFjayIsIlJWIiwiZGF0YSIsIndlZWtUaXRsZXMiLCJ2YWx1ZSIsInRlbXBsYXRlIiwicnVuIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJzZXQiLCJudmFsdWUiLCJnZXQiLCJMdW5hckNhbGVuZGFyIiwiX3llYXJJbmZvIiwiX2FzdHJvbG9neSIsIl9kYXlJbk1vbnRoIiwiX1RpYW5HYW4iLCJfRGlaaGkiLCJfWm9kaWFjIiwiX2NhbGVuZGFyaWNpdHkiLCJfbHVuYXJIb2xpZGF5IiwiX3NvbGFySG9saWRheSIsIl9jYWxlbmRhcmljaXR5VGFibGUiLCJfY2hpbmVzZUNoYXIiLCJfY2hpbmVzZVRlbkNoYXIiLCJfbHVuYXJNb250aFRhYmxlIiwic3VtIiwiX2xlYXBEYXlzSW5MdW5hclllYXIiLCJfbGVhcE1vbnRoSW5MdW5hclllYXIiLCJtcyIsImdhbktleSIsInpoaUtleSIsImNNb250aCIsImNEYXkiLCJhcnIiLCJvZmZzZXQiLCJpbmRleCIsIl90YWJsZSIsIl9jYWxlbmRhcmljaXR5SW5mbyIsInBhcnNlSW50Iiwic3Vic3RyIiwidG9TdHJpbmciLCJfY2FsZGF5IiwicyIsIk1hdGgiLCJmbG9vciIsImx1bmFySG9saWRheVN0ciIsImZvckVhY2giLCJsZCIsInNwbGl0IiwibGR2IiwibG1vbnRoX3YiLCJsZGF5X3YiLCJsbWQiLCJ0cmltIiwic29sYXJIb2xpZGF5U3RyIiwic2QiLCJzb2xhciIsInNkdiIsInNtb250aF92Iiwic2RheV92Iiwic21kIiwiZmlyc3RDYWxlbmRhcmljaXR5RGF5Iiwic2Vjb25kQ2FsZW5kYXJpY2l0eURheSIsIm5vd1NlbGVjdERheSIsIm5vd1NlbGVjdE1vbnRoIiwiY2FsZW5kYXJpY2l0eVN0ciIsInNvbGFyWWVhciIsInNvbGFyTW9udGgiLCJzb2xhckRheSIsIm5vd1NlbGVjdERhdGUiLCJub3dTZWxlY3RZZWFyIiwiVVRDIiwidGVtcFllYXIiLCJsZWFwIiwidGVtcCIsIl9sdW5hclllYXJEYXlzIiwiaXNUb2RheU9iaiIsImlzVG9kYXkiLCJuV2VlayIsImNXZWVrIiwiaXNMZWFwIiwidGVtcE1vbnRoIiwiX21vbnRoRGF5cyIsInNtIiwiZ2FuWmhpWWVhciIsIl9nZXRHYW5aaGlZZWFyIiwiX2ZpcnN0Q2FsZW5kYXJpY2l0eURheSIsIl9nZXRDYWxlbmRhcmljaXR5IiwiX3NlY29uZENhbGVuZGFyaWNpdHlEYXkiLCJnYW5aaGlNb250aCIsIl9nZXRHYW5aaGkiLCJfZ2V0THVuYXJEYXlDYWxlbmRhcmljaXR5IiwiZGF5Q3ljbGljYWwiLCJnYW5aaGlEYXkiLCJhc3RybyIsIl9nZXRBc3Ryb2xvZ3kiLCJ6b2RpYWMiLCJfZ2V0Wm9kaWFjIiwiX2dldENoaW5hTW9udGgiLCJfZ2V0Q2hpbmFEYXkiLCJfZ2V0THVuYXJIb2xpZGF5IiwiX2dldFNv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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jYWxlbmRhckRlbW8uanNcIik7XG4iLCJpbXBvcnQgZ2VuZXJhdGVWaWV3IGZyb20gJy4vc3JjL1JWY2FsZW5kYXInXHJcbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2VuZXJhdGVWaWV3KFwiI2FwcFwiLCBmdW5jdGlvbiAoc2VsZWN0RGF5KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3QsOlwiK3NlbGVjdERheSlcclxuICAgIH0pfSIsImltcG9ydCBEaWZmTGlzdCBmcm9tIFwiLi9kaWZmX2xpc3RcIlxyXG5pbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlsXCJcclxuaW1wb3J0IHtOT0RFX1JFUExBQ0UsQ0hJTERfUkVfT1JERVIsTk9ERV9QUk9QUyxOT0RFX0NPTlRFTlR9IGZyb20gXCIuL2RvbVN0YXRlXCJcclxuY2xhc3MgRGlmZiB7XHJcbiAgICAvKipcclxuICAgICAqIGRvbSB0cmVlIGRpZmYgYWxnb3JpdGhtIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRUcmVlIHRoZSBkb20gdHJlZSBmb3IgYmVmb3JlIHVwZGF0ZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvbGRUcmVlLCBuZXdUcmVlKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcclxuICAgICAgICB0aGlzLnBhdGNoZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZGZzV2FsayhvbGRUcmVlLCBuZXdUcmVlLCB0aGlzLmluZGV4KVxyXG4gICAgfVxyXG4gICAgZGZzV2FsayhvbGROb2RlLCBuZXdOb2RlLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2ggPSBbXVxyXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzU3RyaW5nKG9sZE5vZGUpICYmIFV0aWwuaXNTdHJpbmcobmV3Tm9kZSkpIHtcclxuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfQ09OVEVOVCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvcHNQYXRjaGVzID0gdGhpcy5kaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSlcclxuICAgICAgICAgICAgaWYgKHByb3BzUGF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUFJPUFMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzUGF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNJZ25vcmVDaGlsZHJlbihuZXdOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6Tk9ERV9SRVBMQUNFLFxyXG4gICAgICAgICAgICAgICAgbm9kZTogbmV3Tm9kZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhdGNoZXNbaW5kZXhdID0gY3VycmVudFBhdGNoXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlmZlByb3BzKG9sZE5vZGUsIG5ld05vZGUpIHtcclxuXHJcbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSBvbGROb2RlLnByb3BzXHJcbiAgICAgICAgY29uc3QgbmV3UHJvcHMgPSBuZXdOb2RlLnByb3BzXHJcblxyXG4gICAgICAgIGNvbnN0IHByb3BzUGF0Y2hlcyA9IHt9XHJcbiAgICAgICAgbGV0IGlzU2FtZSA9IHRydWU7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9sZFByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChuZXdQcm9wc1trZXldICE9PSBvbGRQcm9wc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICBpc1NhbWUgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgcHJvcHNQYXRjaGVzW2tleV0gPSBuZXdQcm9wc1trZXldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ld1Byb3BzKSB7XHJcbiAgICAgICAgICAgIGlmICghb2xkUHJvcHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpc1NhbWUgPyBudWxsIDogcHJvcHNQYXRjaGVzXHJcblxyXG4gICAgfVxyXG4gICAgZGlmZkNoaWxkcmVuKG9sZENoaWxkcmVuLCBuZXdDaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaCkge1xyXG4gICAgICAgIGxldCBkaWZmTGlzdCA9IG5ldyBEaWZmTGlzdChvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4pXHJcbiAgICAgICAgbGV0IGRpZmZzID0gZGlmZkxpc3QuZ2V0UmVzdWx0KClcclxuICAgICAgICBuZXdDaGlsZHJlbiA9IGRpZmZzLmNoaWxkXHJcbiAgICAgICAgaWYgKGRpZmZzLm1vdmVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBsZXQgcmVvcmRlclBhdGNoID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTpDSElMRF9SRV9PUkRFUixcclxuICAgICAgICAgICAgICAgIG1vdmVzOiBkaWZmcy5tb3Zlc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHJlb3JkZXJQYXRjaClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxlZnROb2RlID0gbnVsbFxyXG4gICAgICAgIGxldCBjdXJyZW50Tm9kZUluZGV4ID0gaW5kZXhcclxuICAgICAgICBvbGRDaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXVxyXG4gICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ID0gKGxlZnROb2RlICYmIGxlZnROb2RlLmNvdW50KSA/XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ICsgbGVmdE5vZGUuY291bnQgKyAxIDpcclxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyAxXHJcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgbmV3Q2hpbGQsIGN1cnJlbnROb2RlSW5kZXgpXHJcbiAgICAgICAgICAgIGxlZnROb2RlID0gY2hpbGRcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGlmZjsiLCJjbGFzcyBEaWZmTGlzdCB7XHJcbiAgICAvKipcclxuICAgICAqIGRpZmYgbGlzdCBcclxuICAgICAqIEBwYXJhbSB7Kn0gb2xkTGlzdCBcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3TGlzdCBcclxuICAgICAqIEBwYXJhbSB7Kn0ga2V5IFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvbGRMaXN0LCBuZXdMaXN0KSB7XHJcbiAgICAgICAgbGV0IG9sZExpc3RLZXlJbmRleCA9IHRoaXMubWFrZUtleUluZGV4KG9sZExpc3QpLmtleUluZGV4XHJcbiAgICAgICAgbGV0IG5ld0xpc3RLZXlJbmRleCA9IHRoaXMubWFrZUtleUluZGV4KG5ld0xpc3QpLmtleUluZGV4XHJcbiAgICAgICAgdGhpcy5tb3ZlT3BlcmF0b3IgPSBbXVxyXG4gICAgICAgIHRoaXMuY2hpbGRMaXN0ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9sZEl0ZW0gPSBvbGRMaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBvSXRlbUtleSA9IHRoaXMuZ2V0S2V5KG9sZEl0ZW0pXHJcbiAgICAgICAgICAgIGlmICghbmV3TGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG9JdGVtS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZExpc3QucHVzaChudWxsKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZExpc3QucHVzaChuZXdMaXN0W25ld0xpc3RLZXlJbmRleFtvSXRlbUtleV1dKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGVtcExpc3QgPSB0aGlzLmNoaWxkTGlzdC5zbGljZSgwKVxyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICB3aGlsZSAoaSA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBMaXN0W2ldID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb3B5VGVtcExpc3QoaSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGkrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpbmRleCA9IDBcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5ld0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG5JdGVtID0gbmV3TGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgbkl0ZW1LZXkgPSB0aGlzLmdldEtleShuSXRlbSlcclxuICAgICAgICAgICAgbGV0IGNJdGVtID0gdGhpcy50ZW1wTGlzdFtpbmRleF1cclxuICAgICAgICAgICAgbGV0IGNJdGVtS2V5ID0gdGhpcy5nZXRLZXkoY0l0ZW0pXHJcbiAgICAgICAgICAgIGlmIChjSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ICE9IGNJdGVtS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZExpc3RLZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShuSXRlbUtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNOZXh0SXRlbUtleSA9IGdldEtleSh0aGlzLnRlbXBMaXN0W2luZGV4ICsgMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuSXRlbUtleSA9PT0gY05leHRJdGVtS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb3B5VGVtcExpc3QoaW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGsgPSB0aGlzLnRlbXBMaXN0Lmxlbmd0aCAtIGluZGV4XHJcbiAgICAgICAgd2hpbGUgKGluZGV4KysgPCB0aGlzLnRlbXBMaXN0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBrLS1cclxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoayArIG5ld0xpc3QubGVuZ3RoKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgbWFrZUtleUluZGV4KGxpc3QpIHtcclxuICAgICAgICBsZXQga2V5SW5kZXggPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IGxpc3RbaV1cclxuICAgICAgICAgICAgbGV0IGl0ZW1LZXkgPSB0aGlzLmdldEtleShpdGVtKVxyXG4gICAgICAgICAgICBrZXlJbmRleFtpdGVtS2V5XSA9IGlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga2V5SW5kZXg6IGtleUluZGV4XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEtleShpdGVtKSB7XHJcbiAgICAgICAgaWYgKCFpdGVtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bXCJrZXlcIl1cclxuICAgIH1cclxuICAgIHJlbW92ZUNvcHlUZW1wTGlzdChpbmRleCkge1xyXG4gICAgICAgIHRoaXMudGVtcExpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlKGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlT3BlcmF0b3IucHVzaCh7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgdHlwZTogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaW5zZXJ0KGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5tb3ZlT3BlcmF0b3IucHVzaCh7XHJcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcclxuICAgICAgICAgICAgaXRlbTogaXRlbSxcclxuICAgICAgICAgICAgdHlwZTogMVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVzdWx0KCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1vdmVzOiB0aGlzLm1vdmVPcGVyYXRvcixcclxuICAgICAgICAgICAgY2hpbGQ6IHRoaXMuY2hpbGRMaXN0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERpZmZMaXN0O1xyXG4iLCJjb25zdCBOT0RFX1JFUExBQ0UgPSAwOyAvL25vZGUgcmVwbGFjZSBcclxuY29uc3QgQ0hJTERfUkVfT1JERVIgPSAxOyAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcclxuY29uc3QgTk9ERV9QUk9QUyA9IDI7IC8vcHJvcCBjaGFuZ2UgXHJcbmNvbnN0IE5PREVfQ09OVEVOVCA9IDM7IC8vY29udGVudCBjaGFuZ2VcclxuZXhwb3J0IHtcclxuICAgIE5PREVfUkVQTEFDRSxDSElMRF9SRV9PUkRFUixOT0RFX1BST1BTLE5PREVfQ09OVEVOVFxyXG59XHJcbiIsImltcG9ydCBVdGlsIGZyb20gXCIuL3V0aWxcIlxyXG5jbGFzcyBFbGVtZW50IHtcclxuICAgIC8qKlxyXG4gICAgICogdmlydHVhbCBkb20gb2JqZWN0IGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0geyp9IHRhZyAgdGhlIGh0bWwgdGFnIG5hbWVcclxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcHMgIHRoZSBwcm9wIChrZXnvvIxzdHlsZS4uKVxyXG4gICAgICogQHBhcmFtIHsqfSBjaGlsZHJlbiBjaGlsZCBkYXRhXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHRhZywgcHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGFnID0gdGFnXHJcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHt9XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdXHJcbiAgICAgICAgdGhpcy5rZXkgPSBwcm9wcyA/IHByb3BzLmtleSA6IHVuZGVmaW5lZFxyXG4gICAgICAgIGlmICghdGhpcy5rZXkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ30gLi4uIGh0bWwgdGFnIHRoZSBrZXkgaXMgdW5kZWZpbmVkYClcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG4gICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSBjaGlsZC5jb3VudFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50KytcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmNvdW50ID0gY291bnRcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogdGhlIG1ldGhvZCB1c2UgdG8gdmlydHVhbCBkb20gIHJlbmRlIHRvIHJlYWwgZG9tXHJcbiAgICAgKi9cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpXHJcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXHJcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICBVdGlsLnNldEF0dHIoZWwsIHByb3BOYW1lLCBwcm9wc1twcm9wTmFtZV0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWwgPSAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSA/IGNoaWxkLnJlbmRlcigpIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpXHJcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGNoaWxkRWwpXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gZWw7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRWxlbWVudDtcclxuIiwiaW1wb3J0IFV0aWwgZnJvbSBcIi4vdXRpbFwiXHJcbmltcG9ydCBQYXRjaCBmcm9tIFwiLi9wYXRjaFwiXHJcbmltcG9ydCBEaWZmIGZyb20gXCIuL2RpZmZcIlxyXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50XCJcclxuaW1wb3J0IFlobVBhcnNlIGZyb20gXCIuL3J2UGFyc2VcIlxyXG5pbXBvcnQgUlZEb21VdGlsIGZyb20gXCIuL3J2RG9tVXRpbFwiXHJcbmltcG9ydCBSdkNvbXBvbmVudCBmcm9tIFwiLi9ydkNvbXBvbmVudFwiXHJcbmltcG9ydCBNYXAgZnJvbSBcIi4vbWFwXCJcclxuY2xhc3MgUlYge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICBlbCxcclxuICAgICAgICAgICAgZGF0YSxcclxuICAgICAgICAgICAgdGVtcGxhdGVcclxuICAgICAgICB9ID0gb3B0aW9uXHJcbiAgICAgICAgdGhpcy5lbCA9IGVsXHJcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YVxyXG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZVxyXG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcCA9IG5ldyBNYXAoKVxyXG4gICAgICAgIHRoaXMucGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIHRoaXMucnZEb21VdGlsID0gbmV3IFJWRG9tVXRpbCh0aGlzLmRhdGEpXHJcblxyXG5cclxuICAgIH1cclxuICAgIHVzZShydkNvbXBvbmVudE9iaikge1xyXG4gICAgICAgIHRoaXMucGFyc2UudXNlQ3VzdG9tQ29tcG9uZW50KHJ2Q29tcG9uZW50T2JqKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBydW4gcnZcclxuICAgICAqL1xyXG4gICAgcnVuKCkge1xyXG4gICAgICAgIGxldCByb290ID0gVXRpbC5pc1N0cmluZyh0aGlzLmVsKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbCkgOiB0aGlzLmVsXHJcbiAgICAgICAgbGV0IGRvbSA9IHRoaXMuX2dldERvbVRyZWUoKVxyXG5cclxuICAgICAgICBsZXQgcnZUaGF0ID0gdGhpc1xyXG4gICAgICAgIHRoaXMucGFyc2UuY29tcG9uZXRNYXAuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9uZXQpIHtcclxuXHJcbiAgICAgICAgICAgIG9ic2VydmUoY29tcG9uZXQuZGF0YSwgY29tcG9uZXQub2JzZXJ2ZU1hcCwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGRvbSA9IHJ2VGhhdC5fZ2V0RG9tVHJlZSgpXHJcbiAgICAgICAgICAgICAgICBydlRoYXQuX3VwZGF0ZWRvbShkb20pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKGNvbXBvbmV0LndhdGNoT2JqKS5mb3JFYWNoKCh3YXRjaEZ1bikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICgoY29tcG9uZXQub2JzZXJ2ZU1hcC5oYXNLZXkod2F0Y2hGdW4pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbXBvbmV0Lm9ic2VydmVNYXAuZ2V0KHdhdGNoRnVuKS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25ldC53YXRjaE9ialt3YXRjaEZ1bl0oKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wb25ldC5hcHBseVRydXRoRnVsRGF0YSgpXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29tcG9uZXQucnVuKClcclxuXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdGhpcy52ZSA9IHRoaXMucnZEb21VdGlsLmdldFZpcnR1YWxFbGVtZW50KHRoaXMucnZEb21VdGlsLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgdGhpcy53ID0gdGhpcy52ZS5yZW5kZXIoKVxyXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy53KVxyXG5cclxuICAgICAgICBvYnNlcnZlKHRoaXMuZGF0YSwgdGhpcy5vYnNlcnZlTWFwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZWRvbShkb20pXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLl91cGRhdGVkb20oZG9tKVxyXG4gICAgfVxyXG4gICAgX2dldERvbVRyZWUoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5wYXJzZS5wYXJzZUh0bWxUZW1wbGF0ZSh0aGlzLnRlbXBsYXRlLnRyaW0oKSlcclxuXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBydiBwYXJzZSBlOiR7ZX1gKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZS5nZXRIdG1sRG9tKClcclxuICAgIH1cclxuICAgIF91cGRhdGVkb20oZG9tKSB7XHJcbiAgICAgICAgbGV0IG52ZSA9IHRoaXMucnZEb21VdGlsLmdldFZpcnR1YWxFbGVtZW50KHRoaXMucnZEb21VdGlsLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXHJcbiAgICAgICAgd2luZG93Lm52ZSA9IG52ZVxyXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcclxuICAgICAgICBwYXRjaCh0aGlzLncsIGRpZmYodGhpcy52ZSwgbnZlKSlcclxuICAgICAgICB0aGlzLnZlID0gbnZlXHJcbiAgICB9XHJcbiAgICB3YXRjaChrZXksIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub2JzZXJ2ZU1hcC5oYXNLZXkoa2V5KSkge1xyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNYXAuZ2V0KGtleSkuYWRkKGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHRoaXMgc3RhdGljIGZ1bmN0aW9uIHVzZSB0byBkZWNsYXJhdGlvbiBhIFJWIGNvbXBvbmVudFxyXG4gICAgICogQHBhcmFtIHsqfSBvcHRpb24gXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjb21wb25lbnQob3B0aW9uKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHsgbmFtZSwgdGVtcGxhdGUsIHByb3BzLCBkYXRhIH0gPSBvcHRpb25cclxuICAgICAgICBsZXQgcGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgIHBhcnNlLnBhcnNlSHRtbFRlbXBsYXRlKHRlbXBsYXRlLnRyaW0oKSlcclxuXHJcbiAgICAgICAgbGV0IGRvbSA9IHBhcnNlLmdldEh0bWxEb20oKVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFJ2Q29tcG9uZW50KHsgZG9tOiBkb20sIHByb3BzOiBwcm9wcywgbmFtZTogbmFtZSwgZGF0YTogZGF0YSwgcnVuOiBvcHRpb24ucnVuLCB3YXRjaDogb3B0aW9uLndhdGNoIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG9ic2VydmUob2JqLCBvYnNlcnZlTWFwLCBjYWxsYmFjaykge1xyXG5cclxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgIGxldCBpbnRlcm5hbFZhbHVlID0gb2JqW2tleV1cclxuICAgICAgICBsZXQgb2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKClcclxuICAgICAgICBpZiAoaW50ZXJuYWxWYWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICBvYnNlcnZlKGludGVybmFsVmFsdWUsIG9ic2VydmVNYXAsIGNhbGxiYWNrKVxyXG4gICAgICAgIH1cclxuICAgICAgICBvYnNlcnZlTWFwLnB1dChrZXksIG9ic2VydmFibGUpXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XHJcbiAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmFibGUuYWRkKGNhbGxiYWNrKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsVmFsdWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0KG5ld1ZhbCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlZCA9IGludGVybmFsVmFsdWUgIT09IG5ld1ZhbFxyXG4gICAgICAgICAgICAgICAgaW50ZXJuYWxWYWx1ZSA9IG5ld1ZhbFxyXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmludm9rZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSlcclxuICAgIHJldHVybiBvYmpcclxufVxyXG5cclxuXHJcblxyXG5jbGFzcyBPYnNlcnZhYmxlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zID0gbmV3IFNldCgpXHJcbiAgICB9XHJcbiAgICBhZGQob2JzZXJ2YWJsZVVwZGF0ZSkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zLmFkZChvYnNlcnZhYmxlVXBkYXRlKVxyXG4gICAgfVxyXG4gICAgaW52b2tlKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlRnVuY3Rpb25zLmZvckVhY2goZnVuID0+IGZ1bigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIHRoZSBtZXRob2QgdXNlIHRvIGRlZXAgY2xvbmUgb2JqXHJcbiAqIEBwYXJhbSB7Kn0gb2JqIFxyXG4gKi9cclxuZnVuY3Rpb24gY2xvbmUob2JqKSB7XHJcbiAgICBsZXQgZ2V0VHlwZSA9IChvKSA9PiB7XHJcbiAgICAgICAgaWYgKG8gPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcclxuICAgICAgICBpZiAobyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJ1bmRlZmluZWRcIjtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKTtcclxuICAgIH1cclxuICAgIGxldCByZXN1bHQsIG9DbGFzcyA9IGdldFR5cGUob2JqKTtcclxuICAgIGlmIChvQ2xhc3MgPT09IFwiT2JqZWN0XCIpIHtcclxuICAgICAgICByZXN1bHQgPSB7fTtcclxuICAgIH0gZWxzZSBpZiAob0NsYXNzID09PSBcIkFycmF5XCIpIHtcclxuICAgICAgICByZXN1bHQgPSBbXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgIGxldCBjb3B5ID0gb2JqW2tleV07XHJcbiAgICAgICAgaWYgKGdldFR5cGUoY29weSkgPT0gXCJPYmplY3RcIikge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChnZXRUeXBlKGNvcHkpID09IFwiQXJyYXlcIikge1xyXG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBvYmpba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGgodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKVxyXG59XHJcbmZ1bmN0aW9uIGRpZmYob2xkVHJlZSwgbmV3VHJlZSkge1xyXG4gICAgbGV0IGQgPSBuZXcgRGlmZihvbGRUcmVlLCBuZXdUcmVlKVxyXG4gICAgcmV0dXJuIGQucGF0Y2hlc1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcGF0Y2gobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgcmV0dXJuIG5ldyBQYXRjaChub2RlLCBwYXRjaGVzKVxyXG59XHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJWIiwiLyoqXHJcbiAqIHRoZSBtYXAgb2JqZWN0IHVzZSB0byBzYXZlIGxpa2lseSAoa2V5LHZhbHVlKSBkYXRhXHJcbiAqL1xyXG5jbGFzcyBNYXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE9iamVjdCgpO1xyXG4gICAgfVxyXG4gICAgcHV0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5tYXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldChrZXkpIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcCkgPyB0aGlzLm1hcFtrZXldIDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbW92ZShrZXkpIHtcclxuICAgICAgICBpZiAoKGtleSBpbiB0aGlzLm1hcCkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWFwW2tleV1cclxuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFzS2V5KGtleSkge1xyXG4gICAgICAgIHJldHVybiAoa2V5IGluIHRoaXMubWFwKVxyXG4gICAgfVxyXG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMubWFwKS5mb3JFYWNoKG1hcEtleSA9PiB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubWFwW21hcEtleV0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHNpemUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgbGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBNYXAiLCJpbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQge05PREVfUkVQTEFDRSxDSElMRF9SRV9PUkRFUixOT0RFX1BST1BTLE5PREVfQ09OVEVOVH0gZnJvbSBcIi4vZG9tU3RhdGVcIlxyXG5jbGFzcyBQYXRjaCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBwYXRjaGVzKSB7XHJcbiAgICAgICAgbGV0IHdhbGtlciA9IHtcclxuICAgICAgICAgICAgaW5kZXg6IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcylcclxuICAgIH1cclxuICAgIGRmc1dhbGsobm9kZSwgd2Fsa2VyLCBwYXRjaGVzKSB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaGVzID0gcGF0Y2hlc1t3YWxrZXIuaW5kZXhdXHJcbiAgICAgICAgbGV0IGxlbiA9IG5vZGUuY2hpbGROb2RlcyA/IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggOiAwXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkTm9kZXNbaV1cclxuICAgICAgICAgICAgd2Fsa2VyLmluZGV4KytcclxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjdXJyZW50UGF0Y2hlcykge1xyXG4gICAgICAgICAgICB0aGlzLmFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlcylcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgYXBwbHlQYXRjaGVzKG5vZGUsIGN1cnJlbnRQYXRjaGUpIHtcclxuICAgICAgICBjdXJyZW50UGF0Y2hlLmZvckVhY2goKGN1cnJlbnRQYXRjaCkgPT4ge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRQYXRjaC50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUkVQTEFDRTpcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IFV0aWwuaXNTdHJpbmcoY3VycmVudFBhdGNoLm5vZGUpID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3VycmVudFBhdGNoLm5vZGUpIDogY3VycmVudFBhdGNoLm5vZGUucmVuZGVyKClcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIG5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ0hJTERfUkVfT1JERVI6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyQ2hpbGRyZW4obm9kZSwgY3VycmVudFBhdGNoLm1vdmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUFJPUFM6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wcyhub2RlLCBjdXJyZW50UGF0Y2gucHJvcHMpXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgTk9ERV9DT05URU5UOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50UGF0Y2guY29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgcmVvcmRlckNoaWxkcmVuKG5vZGUsIG1vdmVzKSB7XHJcbiAgICAgICAgbGV0IHN0YXRpY05vZGVMaXN0ID0gVXRpbC50b0FycmF5KG5vZGUuY2hpbGROb2RlcylcclxuICAgICAgICBsZXQgbm9kZU1hcHMgPSB7fVxyXG4gICAgICAgIHN0YXRpY05vZGVMaXN0LmZvckVhY2goKHNub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzbm9kZS5ub2RlVHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IHNub2RlLmdldEF0dHJpYnV0ZSgna2V5JylcclxuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlTWFwc1trZXldID0gc25vZGVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgbW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBtb3ZlLmluZGV4XHJcbiAgICAgICAgICAgIGlmIChtb3ZlLnR5cGUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0aWNOb2RlTGlzdFtpbmRleF0gPT09IG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZS50eXBlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaW5zZXJ0Tm9kZSA9IG5vZGVNYXBzW21vdmUuaXRlbS5rZXldID9cclxuICAgICAgICAgICAgICAgICAgICBub2RlTWFwcyhtb3ZlLml0ZW0ua2V5KS5jbG9uZU5vZGUodHJ1ZSkgOlxyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuaXNTdHJpbmcobW92ZS5pdGVtKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1vdmUuaXRlbSkgOiBtb3ZlLml0ZW0ucmVuZGVyKClcclxuICAgICAgICAgICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMCwgaW5zZXJ0Tm9kZSlcclxuICAgICAgICAgICAgICAgIG5vZGUuaW5zZXJ0QmVmb3JlKGluc2VydE5vZGUsIG5vZGUuY2hpbGROb2Rlc1tpbmRleF0gfHwgbnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG4gICAgc2V0UHJvcHMobm9kZSwgcHJvcHMpIHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wc1trZXldXHJcbiAgICAgICAgICAgICAgICBVdGlsLnNldEF0dHIobm9kZSwga2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUGF0Y2g7IiwiaW1wb3J0IFJWRG9tVXRpbCBmcm9tIFwiLi9ydkRvbVV0aWxcIlxyXG5pbXBvcnQgTWFwIGZyb20gXCIuL21hcFwiXHJcbmNsYXNzIFJ2Q29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbXBvbmVudFBhcmFtKSB7XHJcbiAgICAgICAgbGV0IHsgZG9tLCBwcm9wcywgbmFtZSwgZGF0YSwgcnVuLCB3YXRjaCB9ID0gY29tcG9uZW50UGFyYW1cclxuICAgICAgICB0aGlzLmRvbSA9IGRvbVxyXG4gICAgICAgIHRoaXMucmRvbSA9IHRoaXMucmRvbVxyXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wc1xyXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWVcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgdGhpcy5jb21wb25lbnRSdW4gPSBydW5cclxuICAgICAgICB0aGlzLnJ2RG9tVXRpbCA9IG5ldyBSVkRvbVV0aWwoZGF0YSlcclxuICAgICAgICB0aGlzLm9ic2VydmVNYXAgPSBuZXcgTWFwKClcclxuICAgICAgICBjb25zb2xlLmxvZyhgb2JzZXJ2ZU1hcDoke0pTT04uc3RyaW5naWZ5KHRoaXMub2JzZXJ2ZU1hcCl9YClcclxuICAgICAgICB0aGlzLndhdGNoT2JqID0gd2F0Y2hcclxuICAgICAgICB0aGlzLmFwcGx5VHJ1dGhGdWxEYXRhKClcclxuXHJcbiAgICB9XHJcbiAgICBhcHBseVRydXRoRnVsRGF0YSgpIHtcclxuICAgICAgICB0aGlzLnJkb20gPSB0aGlzLnJ2RG9tVXRpbC5hcHBseVRydXRoZnVsRGF0YSh0aGlzLmRvbSlcclxuICAgIH1cclxuICAgIHJ1bigpIHtcclxuICAgICAgICB0aGlzLmNvbXBvbmVudFJ1bi5jYWxsKHRoaXMpXHJcbiAgICB9XHJcbiAgICBnZXROYW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5hbWVcclxuICAgIH1cclxuICAgIGFwcGx5KHByb3BzKSB7XHJcblxyXG4gICAgICAgIGZvciAobGV0IHByb3Agb2YgT2JqZWN0LmtleXModGhpcy5wcm9wcykpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9wc1twcm9wXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wc1twcm9wXSA9IHByb3BzW3Byb3BdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBjaGlsZENvbnRlbnQoZG9tLCBwcm9wcykge1xyXG4gICAgICAgIGZvciAoY2hpbGRyZW4gb2YgZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNoaWxkcmVuKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihjaGlsZHJlbikpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHByb3BzW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShjaGlsZHJlbildXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZENvbnRlbnQoY2hpbGRyZW4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RG9tKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJkb21cclxuICAgIH1cclxuICAgIGdldFByb3AoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHNcclxuICAgIH1cclxuXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUnZDb21wb25lbnQiLCJpbXBvcnQgVXRpbCBmcm9tIFwiLi91dGlsXCJcclxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudFwiXHJcblxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpbmNsdWRlIGEgc2V0IG9mIGNvbW1vbiBmdW5jdGlvbiBmb3IgaGFuZGxlIHZpcnR1YWwgRE9NXHJcbiAqIEBhdXRob3IgeWhvbmdtXHJcbiAqL1xyXG5jbGFzcyBSVkRvbVV0aWwge1xyXG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xyXG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgIGlmIChjYyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBjYy5mb3JFYWNoKGMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjYylcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2MpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRWxlbWVudChkb20udGFnLCBkb20ucHJvcHMsIGNoaWxkcmVuKVxyXG4gICAgfVxyXG4gICAgYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSB7XHJcbiAgICAgICAgaWYgKFwiZm9yXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXVxyXG4gICAgICAgICAgICBsZXQgZGF0YVNpbmdsZVxyXG5cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JJbihkb20ucHJvcHNbJ2ZvciddKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFwiY2hpbGREb21EYXRha2V5XCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLmNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvbURhdGFLZXlcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXSA9PT0gZG9tLmRvbURhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSB0aGlzLmRhdGFbZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgZm9yIGRpcmVjdGl2ZSB1c2UgZXJyb3JcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdXHJcblxyXG4gICAgICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBkYXRhU2luZ2xlLCBkYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgIG9ianMucHVzaChvYmopXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIG9ianNcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFcclxuICAgICAgICAgICAgbGV0IGNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICBpZiAoXCJkYXRhXCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IGRvbS5jaGlsZERvbURhdGFrZXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBjaGlsZERvbURhdGFrZXksIGRhdGEpXHJcblxyXG4gICAgICAgICAgICByZXR1cm4gb2JqXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSAyIHJlYWwgZGF0YSBkb21cclxuICAgICAqIEBwYXJhbSB7Kn0gZG9tIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhIFxyXG4gICAgICogQHBhcmFtIHsqfSBkYXRhU2luZ2xlIFxyXG4gICAgICogQHBhcmFtIHsqfSB0ZGF0YSBcclxuICAgICAqL1xyXG4gICAgdmRvbTJyZG9tKGRvbSwgZGF0YSwgZGF0YVNpbmdsZSwgdGRhdGEpIHtcclxuICAgICAgICBsZXQgb2JqID0ge31cclxuICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xyXG4gICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXHJcbiAgICAgICAgb2JqLnByb3BzID0ge31cclxuICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXHJcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBwcm9wc1twcm9wXVxyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlLnNwbGl0KFwiLFwiKVxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFVdGlsLmlzRG90T3BlcmF0b3JFeHByZXNzaW9uKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKV1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoVXRpbC5pc09wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gVXRpbC5nZXRPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSwgZGF0YSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBkb20ucHJvcHNbdmFsdWVdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5pbmRleE9mKGRhdGFTaW5nbGUpID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0ZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGRyZW5bY2hpbGRdXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvbS5jaGlsZHJlbltjaGlsZF0gaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoXCJjaGlsZERvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5jaGlsZERvbURhdGFrZXkgPSBkb20ucHJvcHMuY2hpbGREb21EYXRhXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kb21EYXRhS2V5ID0gZG9tLnByb3BzLmRvbURhdGFcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVtjaGlsZF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tLmNoaWxkcmVuW2NoaWxkXSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9ialxyXG5cclxuICAgIH1cclxuICAgIGhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgbGV0IG5ld1N0eWxlID0gJydcclxuICAgICAgICBpZiAoZGF0YVNpbmdsZSkge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKHN0eWxlKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuaW5kZXhPZihkYXRhU2luZ2xlKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkgPSBVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLnNwbGl0KFwiLlwiKVsxXVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gZGF0YVtrZXldXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUtleSA9IHN0eWxlLnNwbGl0KFwiOlwiKVswXVxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3R5bGVLZXkgPSBzdHlsZS5zcGxpdChcIjpcIilbMF1cclxuICAgICAgICAgICAgbGV0IHN0eWxlVmFsdWUgPSBzdHlsZS5zcGxpdChcIjpcIilbMV1cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNQbGFjZUhvbGRlcihzdHlsZVZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlXHJcbiAgICB9XHJcbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZUFycmF5ID0gXCJcIlxyXG4gICAgICAgIGZvciAobGV0IHN0eWxlIG9mIHN0eWxlcykge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1N0eWxlID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgbmV3U3R5bGVBcnJheSArPSBuZXdTdHlsZSArIFwiO1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdTdHlsZUFycmF5XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSVkRvbVV0aWwiLCJpbXBvcnQgTWFwIGZyb20gXCIuL21hcFwiXHJcblxyXG4vKipcclxuICogdGhpcyBjbGFzcyBpcyBwYXJzZSBodG1sIHRlbXBsYXRlIHRvIHZpcnR1YWwgZG9tIHRyZWVcclxuICogQGF1dGhvciB5aG9uZ21cclxuICovXHJcbmNsYXNzIFlobVBhcnNlIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY29tcG9uZXRNYXAgPSBuZXcgTWFwKClcclxuICAgIHRoaXMubUluZGV4ID0gMFxyXG4gICAgdGhpcy5tTWFwID0gbmV3IE1hcCgpXHJcbiAgICB0aGlzLm1Qcm9wUmUgPSAvKFtePVxcc10rKShcXHMqPVxccyooKFxcXCIoW15cIl0qKVxcXCIpfChcXCcoW14nXSopXFwnKXxbXj5cXHNdKykpPy9nbVxyXG4gICAgdGhpcy5tSGFuZGxlciA9IHtcclxuICAgICAgc3RhcnRFTGVtZW50OiBmdW5jdGlvbiAodGFnTmFtZSwgcHJvcCwgY29udGVudCwgdGhhdCkge1xyXG4gICAgICAgIHRoYXQubUluZGV4ICs9IDFcclxuICAgICAgICBpZiAodGhhdC5jb21wb25ldE1hcC5oYXNLZXkodGFnTmFtZSkpIHtcclxuICAgICAgICAgIC8v5bey57uP5pyJ5b2T5YmN57uE5Lu255qE6K6w5b2V77yM5bCG5b2T5YmN57uE5Lu25o+S5YWlZG9t5LitXHJcbiAgICAgICAgICB0aGF0LmNvbXBvbmV0TWFwLmdldCh0YWdOYW1lKS5hcHBseShwcm9wKVxyXG4gICAgICAgICAgdGhhdC5tTWFwLnB1dCh0aGF0Lm1JbmRleCwgdGhhdC5jb21wb25ldE1hcC5nZXQodGFnTmFtZSkuZ2V0RG9tKCkpXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgb2JqID0geyB0YWc6IHRhZ05hbWUsIHByb3BzOiBwcm9wLCBjaGlsZHJlbjogW10sIGluZGV4OiB0aGF0Lm1JbmRleCwgY29udGVudDogY29udGVudCwgaXNDbG9zZTogZmFsc2UgfVxyXG5cclxuICAgICAgICAgIGlmIChjb250ZW50Lmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIG9iai5jaGlsZHJlbi5wdXNoKGNvbnRlbnQudHJpbSgpKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhhdC5tTWFwLnB1dCh0aGF0Lm1JbmRleCwgb2JqKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0sXHJcbiAgICAgIGVuZEVsZW1lbnQ6IGZ1bmN0aW9uICh0aGF0KSB7XHJcbiAgICAgICAgdGhhdC5tTWFwLmdldCh0aGF0Lm1JbmRleCkuaXNDbG9zZSA9IHRydWVcclxuICAgICAgICBpZiAodGhhdC5tTWFwLmhhc0tleSgodGhhdC5tSW5kZXggLSAxKSkpIHtcclxuICAgICAgICAgIHRoYXQubU1hcC5nZXQodGhhdC5tSW5kZXggLSAxKS5jaGlsZHJlbi5wdXNoKHRoYXQubU1hcC5nZXQodGhhdC5tSW5kZXgpKVxyXG4gICAgICAgICAgdGhhdC5tTWFwLnJlbW92ZSh0aGF0Lm1JbmRleClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5tSW5kZXggLT0gMVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOeUqOS6juino+aekOiHquWumuS5iee7hOS7tu+8jOaMieWQjeWtl+e0ouW8lee7hOS7tlxyXG4gICAqIEBwYXJhbSB7Kn0gcnZDb21wb25lbnQgXHJcbiAgICovXHJcbiAgdXNlQ3VzdG9tQ29tcG9uZW50KHJ2Q29tcG9uZW50KSB7XHJcblxyXG4gICAgdGhpcy5jb21wb25ldE1hcC5wdXQocnZDb21wb25lbnQuZ2V0TmFtZSgpLCBydkNvbXBvbmVudClcclxuICB9XHJcbiAgcGFyc2VIdG1sVGVtcGxhdGUoaHRtbCkge1xyXG4gICAgbGV0IHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkgLyAxMDAwXHJcbiAgICB2YXIgaW5kZXggPSAwXHJcbiAgICB3aGlsZSAoaHRtbCkge1xyXG4gICAgICB2YXIgc3RhcnRUYWdPcGVuID0gaHRtbC5pbmRleE9mKCc8JylcclxuICAgICAgdmFyIHN0YXJ0VGFnQ2xvc2UgPSBodG1sLmluZGV4T2YoJz4nKSB8fCBodG1sLmluZGV4T2YoJy8+JylcclxuICAgICAgdmFyIGVuZFRhZ09wZW4gPSBodG1sLmluZGV4T2YoJzwvJylcclxuICAgICAgdmFyIGVuZFRhZ0Nsb3NlID0gaHRtbC5pbmRleE9mKCc+JylcclxuICAgICAgdmFyIHN0YXJ0Q29tbWVudE9wZW4gPSBodG1sLmluZGV4T2YoJzwhLS0nKVxyXG4gICAgICB2YXIgZW5kQ29tbWVudENsb3NlID0gaHRtbC5pbmRleE9mKCctLT4nKVxyXG4gICAgICBpZiAoc3RhcnRDb21tZW50T3BlbiA9PSAwICYmIGVuZENvbW1lbnRDbG9zZSAhPSAtMSAmJiBlbmRDb21tZW50Q2xvc2UgPiBzdGFydENvbW1lbnRPcGVuKSB7XHJcbiAgICAgICAgaW5kZXggPSBlbmRDb21tZW50Q2xvc2UgKyAzXHJcbiAgICAgICAgcGFyc2VDb21tZW50KGh0bWwuc3Vic3RyaW5nKHN0YXJ0Q29tbWVudE9wZW4gKyA0LCBlbmRDb21tZW50Q2xvc2UgKyAzKSk7XHJcbiAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH0gZWxzZSBpZiAoZW5kVGFnT3BlbiAhPSAtMSAmJiBlbmRUYWdDbG9zZSAhPSAtMSAmJiBlbmRUYWdDbG9zZSA+IGVuZFRhZ09wZW4pIHtcclxuICAgICAgICBpbmRleCA9IGVuZFRhZ0Nsb3NlICsgMVxyXG4gICAgICAgIF9wYXJzZUVuZFRhZyhodG1sLnN1YnN0cmluZyhlbmRUYWdPcGVuLCBlbmRUYWdDbG9zZSArIDEpLCB0aGlzKVxyXG4gICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICBjb250aW51ZVxyXG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0VGFnT3BlbiAhPSAtMSAmJiBzdGFydFRhZ0Nsb3NlICE9IC0xICYmIHN0YXJ0VGFnQ2xvc2UgPiBzdGFydFRhZ09wZW4pIHtcclxuICAgICAgICBpbmRleCA9IHN0YXJ0VGFnQ2xvc2UgKyAxXHJcbiAgICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiXHJcbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSA+IC0xICYmIGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSA+IHN0YXJ0VGFnQ2xvc2UpIHtcclxuICAgICAgICAgIC8vIGxldCBjb250ZW50RW5kSW5kZXggPSBodG1sLmluZGV4T2YoJzwvJywgKGluZGV4ICsgMSkpXHJcbiAgICAgICAgICBjb250ZW50ID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgsIGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSkudHJpbSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9wYXJzZVN0YXJ0VGFnKGh0bWwuc3Vic3RyaW5nKHN0YXJ0VGFnT3Blbiwgc3RhcnRUYWdDbG9zZSArIDEpLCBjb250ZW50LCB0aGlzKVxyXG4gICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICBjb250aW51ZVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgZW5kVGltZSA9IG5ldyBEYXRlKCkgLyAxMDAwXHJcbiAgICAvLyBjb25zb2xlLmxvZyhgdG90YWwgcGFyc2UgdGltZToke2VuZFRpbWUgLSBzdGFydFRpbWV9YClcclxuXHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIF9wYXJzZVN0YXJ0VGFnKGh0bWwsIGNvbnRlbnQsIHRoYXQpIHtcclxuICAgICAgbGV0IHN0YXJ0VGFnRW5kSW5kZXggPSBodG1sLmluZGV4T2YoJyAnKSAhPSAtMSA/IGh0bWwuaW5kZXhPZignICcpIDogaHRtbC5pbmRleE9mKCcvPicpID09IC0xID8gaHRtbC5pbmRleE9mKCc+JykgOiBodG1sLmluZGV4T2YoJy8+JylcclxuICAgICAgdmFyIHRhZ05hbWUgPSBodG1sLnN1YnN0cmluZyhodG1sLmluZGV4T2YoJzwnKSArIDEsIHN0YXJ0VGFnRW5kSW5kZXgpXHJcbiAgICAgIHZhciBwcm9wID0ge31cclxuICAgICAgaWYgKGh0bWwuaW5kZXhPZignICcpID4gLTEpIHtcclxuICAgICAgICB2YXIgcHJvcHMgPSBodG1sLnN1YnN0cmluZyhodG1sLmluZGV4T2YoJyAnKSArIDEsIGh0bWwuaW5kZXhPZignPicpKVxyXG5cclxuICAgICAgICB2YXIgcHJvcHNSZXN1bHQgPSBwcm9wcy5tYXRjaCh0aGF0Lm1Qcm9wUmUpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1Jlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHByID0gcHJvcHNSZXN1bHRbaV1cclxuXHJcbiAgICAgICAgICBwcm9wW3ByLnNwbGl0KFwiPVwiKVswXV0gPSBwci5zcGxpdChcIj1cIilbMV0ubWF0Y2goLyg/PD1cIikuKj8oPz1cIikvKVswXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoYXQubUhhbmRsZXIpIHtcclxuICAgICAgICBpZiAoLyg/PD1cIikuKj8oPz1cIikvLnRlc3QoY29udGVudCkpIHtcclxuICAgICAgICAgIGNvbnRlbnQgPSBjb250ZW50Lm1hdGNoKC8oPzw9XCIpLio/KD89XCIpLylbMF1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhhdC5tSGFuZGxlci5zdGFydEVMZW1lbnQodGFnTmFtZSwgcHJvcCwgY29udGVudCwgdGhhdClcclxuICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIF9wYXJzZUVuZFRhZyhodG1sLCB0aGF0KSB7XHJcbiAgICAgIGlmICh0aGF0Lm1IYW5kbGVyKSB7XHJcbiAgICAgICAgdGhhdC5tSGFuZGxlci5lbmRFbGVtZW50KHRoYXQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlQ29tbWVudChodG1sKSB7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKGBwYXJzZUNvbW1lbnQ9JHtodG1sfWApXHJcbiAgICB9XHJcblxyXG4gIH1cclxuICBnZXRIdG1sRG9tKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubU1hcC5nZXQoMSlcclxuICB9XHJcblxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFlobVBhcnNlXHJcblxyXG4iLCJjbGFzcyBVdGlsIHtcclxuXHJcbiAgICBzdGF0aWMgaXNTdHJpbmcoc29tZSkge1xyXG4gICAgICAgIHJldHVybiB0eXBlb2Ygc29tZSA9PT0gJ3N0cmluZydcclxuICAgIH1cclxuICAgIHN0YXRpYyB0b0FycmF5KGxpc3QpIHtcclxuICAgICAgICBpZiAoIWxpc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhcnJheSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFycmF5LnB1c2gobGlzdFtpXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNGb3JJbihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3KiQvLnRlc3QoZGlyZWN0aW9uKVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzRm9yRm9ySW4oZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW4qJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGlzRm9yT3JGb3JGb3IoZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW5fIFxcd3xfaW4qJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNJZ25vcmVDaGlsZHJlbihub2RlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUucHJvcHMgJiYgbm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShcImlnbm9yZVwiKVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUpID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAvL+ato+aVtOaVsFxyXG4gICAgICAgICAgICB2YXIgcmVOdW1iZXIgPSAvXlxcZCskL1xyXG4gICAgICAgICAgICAvL+i0n+aVtOaVsFxyXG4gICAgICAgICAgICB2YXIgcmVOZU51bWJlciA9IC9eLVxcZCskL1xyXG4gICAgICAgICAgICAvL+ato+WunuaVsFxyXG4gICAgICAgICAgICB2YXIgcmVSZWFsTnVtYmVyMSA9IC9eWzEtOV1cXGQqWy5dXFxkKyQvICAvL+mdnumbtuW8gOWktFxyXG4gICAgICAgICAgICB2YXIgcmVSZWFsTnVtYmVyMiA9IC9eMFsuXVxcZCskLyAvL+mbtuW8gOWktFxyXG4gICAgICAgICAgICAvL+i0n+WunuaVsFxyXG4gICAgICAgICAgICB2YXIgcmVOZVJlYWxOdW1iZXIxID0gL14tWzEtOV1cXGQqWy5dXFxkKyQvICAvL+mdnumbtuW8gOWktFxyXG4gICAgICAgICAgICB2YXIgcmVOZVJlYWxOdW1iZXIyID0gL14tMFsuXVxcZCskLyAvL+mbtuW8gOWktFxyXG5cclxuICAgICAgICAgICAgaWYgKHJlTnVtYmVyLnRlc3QodmFsdWUpIHx8IHJlTmVOdW1iZXIudGVzdCh2YWx1ZSlcclxuICAgICAgICAgICAgICAgIHx8IHJlUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVSZWFsTnVtYmVyMi50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfHwgcmVOZVJlYWxOdW1iZXIxLnRlc3QodmFsdWUpIHx8IHJlTmVSZWFsTnVtYmVyMi50ZXN0KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiAodmFsdWUpID09PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzdGF0aWMgc2V0QXR0cihub2RlLCBrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnc3R5bGUnOlxyXG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS5jc3NUZXh0ID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3ZhbHVlJzpcclxuICAgICAgICAgICAgICAgIGxldCB0YWdOYW1lID0gbm9kZS50YWdOYW1lIHx8ICcnXHJcbiAgICAgICAgICAgICAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpXHJcbiAgICAgICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0JyB8fCB0YWdOYW1lID09PSAndGV4dGFyZWEnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS52YWx1ZSA9IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHN0YXRpYyBpc1BsYWNlSG9sZGVyKGNvbnRlbnQpIHtcclxuICAgICAgICBpZiAoY29udGVudCkge1xyXG4gICAgICAgICAgICBpZiAoL14lI1xcdyouXFx3KiMlJC8udGVzdChjb250ZW50KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzRG90T3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqXFwuXFx3KiQvLnRlc3QoY29udGVudClcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRQbGFjZUhvbGRlclZhbHVlKGNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm4gY29udGVudC5zbGljZSgyLCAtMilcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Li66KGo6L6+5byPXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudCBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzT3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoY29udGVudCkpIHtcclxuICAgICAgICAgICAgaWYgKC9eXFx7XFx3KnxcXHxcXCUrXFx9JC8udGVzdChjb250ZW50KSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQsIGRhdGEsIGRhdGFLZXkpIHtcclxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSBjb250ZW50LnNsaWNlKGNvbnRlbnQuaW5kZXhPZihcIntcIikgKyAxLCBjb250ZW50LmluZGV4T2YoXCJ9XCIpKVxyXG4gICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IGV4cHJlc3Npb24uaW5kZXhPZihcIiUjXCIpXHJcbiAgICAgICAgICAgIGxldCBlbmRJbmRleCA9IGV4cHJlc3Npb24uaW5kZXhPZihcIiMlXCIpICsgMlxyXG4gICAgICAgICAgICBpZiAoc3RhcnRJbmRleCAhPSAtMSAmJiBlbmRJbmRleCAhPSAtMSAmJiBzdGFydEluZGV4IDwgZW5kSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbGFjZUhvbGRlciA9IGV4cHJlc3Npb24uc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpXHJcbiAgICAgICAgICAgICAgICBsZXQgcmVhbFZhbHVlXHJcbiAgICAgICAgICAgICAgICBpZiAocGxhY2VIb2xkZXIuaW5kZXhPZihcIi5cIikgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzBdID09PSBkYXRhS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZUhvbGRlclZhbHVlID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUocGxhY2VIb2xkZXIpLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhbFZhbHVlID0gVXRpbC5pc051bWJlcihwbGFjZUhvbGRlclZhbHVlKSA/IHBsYWNlSG9sZGVyVmFsdWUgOiBgXCIke3BsYWNlSG9sZGVyVmFsdWV9XCJgLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhbFZhbHVlID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUocGxhY2VIb2xkZXIpXS8v6YCa6L+HcGxhY2VIb2xkZXLlj5bnnJ/lrp7nmoTlgLxcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBleHByZXNzaW9uID0gZXhwcmVzc2lvbi5yZXBsYWNlKHBsYWNlSG9sZGVyLCByZWFsVmFsdWUpXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBldmFsKGV4cHJlc3Npb24pXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFV0aWwiLCJpbXBvcnQgUlYgZnJvbSAneWhvbmdtX3J2LmpzJ1xyXG5pbXBvcnQgbHVuYXJDYWxlbmRhciBmcm9tICcuL2x1bmFyJ1xyXG5cclxuLyoqXHJcbiAqICBcclxuICovXHJcbmZ1bmN0aW9uIENhbGVuZGFyKCkge1xyXG4gICAgdGhpcy5tb250aHMgPSBuZXcgQXJyYXkoXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIiwgXCLljYHkuIBcIiwgXCLljYHkuoxcIik7XHJcbiAgICB0aGlzLmRheUNvdW50cyA9IG5ldyBBcnJheSgzMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxKTtcclxuICAgIHRoaXMuZGF5cyA9IG5ldyBBcnJheShcIuaXpVwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiKTtcclxuICAgIHRoaXMudG9kYXkgPSB0aGlzLmdldFRvZGF5KCk7XHJcbiAgICB0aGlzLnllYXIgPSB0aGlzLnRvZGF5LnllYXI7XHJcbiAgICB0aGlzLm1vbnRoID0gdGhpcy50b2RheS5tb250aDtcclxuICAgIHRoaXMubmV3Q2FsID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMuc2VsZWN0RGF5ID0gdGhpcy5uZXdDYWw7XHJcbiAgICB0aGlzLmRheSA9IC0xO1xyXG4gICAgdGhpcy5zdGFydERheSA9IDA7XHJcbiAgICB0aGlzLmRhaWx5ID0gMDtcclxuICAgIHRoaXMucnYgPSB1bmRlZmluZWRcclxuICAgIGlmICgodGhpcy50b2RheS55ZWFyID09IHRoaXMubmV3Q2FsLmdldEZ1bGxZZWFyKCkpICYmICh0aGlzLnRvZGF5Lm1vbnRoID09IHRoaXMubmV3Q2FsLmdldE1vbnRoKCkpKSB7XHJcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLnRvZGF5LmRheTtcclxuICAgIH1cclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuZ2V0V2Vla3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm5ld0NhbCA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCwgMSk7XHJcbiAgICB0aGlzLmRheSA9IC0xO1xyXG4gICAgdGhpcy5zdGFydERheSA9IHRoaXMubmV3Q2FsLmdldERheSgpO1xyXG4gICAgdGhpcy5kYWlseSA9IDA7XHJcbiAgICBpZiAoKHRoaXMudG9kYXkueWVhciA9PSB0aGlzLm5ld0NhbC5nZXRGdWxsWWVhcigpKSAmJiAodGhpcy50b2RheS5tb250aCA9PSB0aGlzLm5ld0NhbC5nZXRNb250aCgpKSkge1xyXG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy50b2RheS5kYXk7XHJcbiAgICB9XHJcbiAgICB2YXIgZGF5Q291bnRzID0gdGhpcy5nZXREYXlDb3VudHModGhpcy5uZXdDYWwuZ2V0TW9udGgoKSwgdGhpcy5uZXdDYWwuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICB2YXIgd2Vla3MgPSBbXVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA2OyBpKyspIHtcclxuICAgICAgICB2YXIgZGF5SW5XZWVrcyA9IFtdXHJcbiAgICAgICAgZGF5SW5XZWVrcy5pZCA9IGB3ZWVrX3Jvd18ke2l9YFxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgNzsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciBfY2VsbE9iaiA9IHt9XHJcbiAgICAgICAgICAgIHZhciBjb250ZW50ID0gXCJcIlxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBcIlwiXHJcbiAgICAgICAgICAgIHZhciBsYWJsZSA9IFwiXCJcclxuICAgICAgICAgICAgdmFyIGlkID0gYHdlZWtfZGF5XyR7aX0ke2p9YFxyXG4gICAgICAgICAgICBpZiAoKGogPT0gdGhpcy5zdGFydERheSkgJiYgKDAgPT0gdGhpcy5kYWlseSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFpbHkgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXkgPT0gdGhpcy5kYWlseSkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImZvbnQtd2VpZ2h0OmJvbGQ7Y29sb3I6I0ZGRkZGRjtiYWNrZ3JvdW5kLWNvbG9yOiM1Q0JBNUE7aGVpZ2h0OjIwcHg7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcImN1cnJlbnRcIlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGogPT0gNikge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImNvbG9yOiNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojRTVFOUYyO3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDoxOHB4O3dpZHRoOjEyJVwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwic2F0XCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChqID09IDApIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjogI0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNFNUU5RjI7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjE4cHg7d2lkdGg6MTIlXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJzdW5cIlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImNvbG9yOiMyNDNGNjU7YmFja2dyb3VuZC1jb2xvcjojRTVFOUYyO2hlaWdodDoyMHB4O3dpZHRoOjExJTt0ZXh0LWFsaWduOmNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwibm9ybWFsXCJcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICgodGhpcy5kYWlseSA+IDApICYmICh0aGlzLmRhaWx5IDw9IGRheUNvdW50cykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLmRhaWx5ICsgXCJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGFpbHkrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojMDAwMDAwO2JhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7aGVpZ2h0OjIwcHg7d2lkdGg6IDExJTt0ZXh0LWFsaWduOmNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2NlbGxPYmouY29udGVudCA9IGNvbnRlbnRcclxuICAgICAgICAgICAgX2NlbGxPYmouaWQgPSBpZFxyXG4gICAgICAgICAgICBfY2VsbE9iai5sYWJsZSA9IGxhYmxlXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLnN0eWxlID0gc3R5bGVcclxuICAgICAgICAgICAgbGV0IGx1bmFyID0gbHVuYXJDYWxlbmRhci5nZXRMdW5hcih0aGlzLnllYXIsIHRoaXMubW9udGgrMSwgY29udGVudClcclxuICAgICAgICAgICAgX2NlbGxPYmouY29udGVudCA9IGNvbnRlbnRcclxuICAgICAgICAgICAgX2NlbGxPYmouaWQgPSBpZFxyXG4gICAgICAgICAgICBfY2VsbE9iai5sYWJsZSA9IGxhYmxlXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLnN0eWxlID0gc3R5bGVcclxuICAgICAgICAgICAgbGV0IGx1bmFySW5mbyA9IFwiXCJcclxuICAgICAgICAgICAgaWYgKGx1bmFyLmNhbGVuZGFyaWNpdHkgIT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIuY2FsZW5kYXJpY2l0eVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsdW5hci5zb2xhckhvbGlkYXkpIHtcclxuICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLnNvbGFySG9saWRheVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChsdW5hci5sdW5hckhvbGlkYXkpIHtcclxuICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLmx1bmFySG9saWRheVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYobHVuYXIuY2hpbmFEYXk9PT1cIuWIneS4gFwiKXtcclxuICAgICAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5jaGluYU1vbnRoIFxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbHVuYXJJbmZvPSBsdW5hci5jaGluYURheVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNvbnRlbnQgIT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBfY2VsbE9iai5sdW5hckluZm8gPSBsdW5hckluZm9cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBfY2VsbE9iai5sdW5hckluZm8gPSBcIlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgZGF5SW5XZWVrcy5wdXNoKF9jZWxsT2JqKVxyXG4gICAgICAgIH1cclxuICAgICAgICB3ZWVrcy5wdXNoKGRheUluV2Vla3MpXHJcbiAgICAgICAgd2luZG93LndlZWtzID0gd2Vla3NcclxuICAgIH1cclxuICAgIHJldHVybiB3ZWVrc1xyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5nZXREYXlDb3VudHMgPSBmdW5jdGlvbiAobW9udGgsIHllYXIpIHtcclxuICAgIGlmICgxID09IG1vbnRoKSB7XHJcbiAgICAgICAgcmV0dXJuICgoMCA9PSB5ZWFyICUgNCkgJiYgKDAgIT0gKHllYXIgJSAxMDApKSkgfHwgKDAgPT0geWVhciAlIDQwMCkgPyAyOSA6IDI4XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRheUNvdW50c1ttb250aF1cclxuICAgIH1cclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuZ2V0VG9kYXkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX29iaiA9IHt9XHJcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKTtcclxuICAgIF9vYmoubm93ID0gbm93XHJcbiAgICBfb2JqLnllYXIgPSBub3cuZ2V0RnVsbFllYXIoKTtcclxuICAgIF9vYmoubW9udGggPSBub3cuZ2V0TW9udGgoKTtcclxuICAgIF9vYmouZGF5ID0gbm93LmdldERhdGUoKTtcclxuICAgIHJldHVybiBfb2JqXHJcbn1cclxuXHJcbkNhbGVuZGFyLnByb3RvdHlwZS5zdWJNb250aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgodGhpcy5tb250aCAtIDEpIDwgMCkge1xyXG4gICAgICAgIHRoaXMubW9udGggPSAxMTtcclxuICAgICAgICB0aGlzLnllYXIgPSB0aGlzLnllYXIgLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gdGhpcy5tb250aCAtIDE7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmFkZE1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCh0aGlzLm1vbnRoICsgMSkgPiAxMSkge1xyXG4gICAgICAgIHRoaXMubW9udGggPSAwO1xyXG4gICAgICAgIHRoaXMueWVhciA9IHRoaXMueWVhciArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9udGggPSB0aGlzLm1vbnRoICsgMTtcclxuICAgIH1cclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuc2V0TW9udGggPSBmdW5jdGlvbiAobW9udGgpIHtcclxuICAgIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xyXG4gICAgICAgIGFsZXJ0KFwi5pyI5Lu95b+F6aG75ZyoMS0xMuS5i+mXtCFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb250aCA9IG1vbnRoXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLnNldFllYXIgPSBmdW5jdGlvbiAoeWVhcikge1xyXG4gICAgdGhpcy55ZWFyID0geWVhclxyXG59XHJcblxyXG5cclxud2luZG93Lm1vdXNlT3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkZGRkZGXCJcclxufVxyXG5cclxud2luZG93Lm1vdXNlT3V0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIHZhciBsYWJlbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsYWJsZScpXHJcbiAgICBpZiAobGFiZWwgPT0gJ3NhdCcgfHwgbGFiZWwgPT0gJ3N1bicpIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkYwMDAwXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiXHJcbiAgICB9XHJcblxyXG59XHJcbmxldCBtQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoKVxyXG53aW5kb3cubUNhbGVuZGFyID0gbUNhbGVuZGFyXHJcbndpbmRvdy5jbGlja0RheSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudC5pbm5lclRleHQgIT0gJycpIHtcclxuICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUobUNhbGVuZGFyLnllYXIsIG1DYWxlbmRhci5tb250aCwgZWxlbWVudC5jaGlsZHJlblswXS5pbm5lclRleHRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIG1DYWxlbmRhci5zZWxlY3REYXkgPSBkYXlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVWaWV3KGVsLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHdlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgIGxldCBydiA9IG5ldyBSVih7XHJcbiAgICAgICAgZWw6IGVsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgeWVhcjogJycgKyBtQ2FsZW5kYXIueWVhcixcclxuICAgICAgICAgICAgbW9udGg6ICcnICsgKG1DYWxlbmRhci5tb250aCArIDEpLFxyXG4gICAgICAgICAgICB3ZWVrVGl0bGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTFcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS4gFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXkyXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkuoxcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5M1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LiJXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuWbm1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXk1XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkupRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB3ZWVrczogd2Vla3NcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRlbXBsYXRlOmBcclxuICAgICAgICAgICAgICA8dGFibGUgYm9yZGVyPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGNlbGxzcGFjaW5nPVwiMVwiIGlkPVwiY2FsdGFibGVcIiBrZXk9XCJ0YWJsZVwiIHN0eWxlPVwidGV4dC1kZWNvcmF0aW9uOm5vbmU7d2lkdGg6MjAwO2JhY2tncm91bmQtY29sb3I6I0QwRDBFRTtmb250LXNpemU6OHB0O2JvcmRlcjowcHggZG90dGVkICMxQzZGRjU7XCI+XHJcbiAgICAgICAgICAgICAgICA8dGhlYWQga2V5PVwidGhlYWRcIj5cclxuICAgICAgICAgICAgICAgIDx0ciBhbGlnbj1cImNlbnRlclwiIHZhbGlnbj1cIm1pZGRsZVwiIGlkPVwidGl0bGVcIiBrZXk9XCJ0aXRsZVwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6bm9ybWFsO2hlaWdodDoyNHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiMzMzMzMzM7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojQTRCOUQ3O2JvcmRlci10b3Atd2lkdGg6MXB4O2JvcmRlci1yaWdodC13aWR0aDoxcHg7Ym9yZGVyLWJvdHRvbS13aWR0aDogMXB4OyBib3JkZXItbGVmdC13aWR0aDogMXB4O2JvcmRlci1ib3R0b20tc3R5bGU6IDFweDtib3JkZXItdG9wLWNvbG9yOiAjOTk5OTk5O2JvcmRlci1yaWdodC1jb2xvcjogIzk5OTk5OTtib3JkZXItYm90dG9tLWNvbG9yOiM5OTk5OTk7Ym9yZGVyLWxlZnQtY29sb3I6Izk5OTk5OTtcIj5cclxuICAgICAgICAgICAgICAgICAgIDx0ZCBjb2xzcGFuPVwiN1wiIGtleT1cInRkVGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PVwidGl0bGVEaXZcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGtleT1cInN1YkJ1dHRvblwiICBzdHlsZT1cImZvbnQtc2l6ZToxcHg7IGNvbG9yOiMyNDNGNjU7Y3Vyc29yOmhhbmQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7bWFyZ2luLXJpZ2h0OjJweFwiIG9uY2xpY2s9XCJtQ2FsZW5kYXIuc3ViTW9udGgoKVwiPlwi5LiK5pyIXCI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cInllYXJcIiB0eXBlPVwidGV4dFwiICBtYXhsZW5ndGg9XCI0XCIgc2l6ZT1cIjRcIiAgdmFsdWU9XCIlI3llYXIjJVwiIGRpc2FibGVkPVwiZGlzYWJsZWRcIiBrZXk9XCJpbnB1dFllYXJcIj48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwibW9udGhcIiB0eXBlPVwidGV4dFwiICBtYXhsZW5ndGg9XCIyXCIgc2l6ZT1cIjJcIiAgdmFsdWU9XCIlI21vbnRoIyVcIiBkaXNhYmxlZD1cImRpc2FibGVkXCIga2V5PVwiaW5wdXRNb250aFwiPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9XCJhZGRCdXR0b25cIiAgc3R5bGU9XCJmb250LXNpemU6MXB4OyBjb2xvcjojMjQzRjY1O2N1cnNvcjpoYW5kO3RleHQtZGVjb3JhdGlvbjpub25lO21hcmdpbi1sZWZ0OjJweFwiIG9uY2xpY2s9XCJtQ2FsZW5kYXIuYWRkTW9udGgoKVwiPlwi5LiL5pyIXCI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8dHIga2V5PVwiZGF5dHJcIj5cclxuICAgICAgICAgICAgICAgICAgPHRkIHN0eWxlPVwiY29sb3I6ICNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOiBub25lO2JhY2tncm91bmQtY29sb3I6ICNDMEQwRTg7dGV4dC1hbGlnbjogY2VudGVyO2hlaWdodDogMjBweDt3aWR0aDogMTIlO1wiIGtleT1cImRheVN1blRpdGxlXCI+XCLml6VcIjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cImNvbG9yOiMwMDAwMDA7YmFja2dyb3VuZC1jb2xvcjojQzBEMEU4O2hlaWdodDoyMHB4O3dpZHRoOjExJTt0ZXh0LWFsaWduOmNlbnRlcjtcIiAga2V5PVwiJSN2LmlkIyVcIiBmb3I9XCJ2IF9pbl8gd2Vla1RpdGxlc1wiPlwiJSN2LnZhbHVlIyVcIjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cImNvbG9yOiAjRkYwMDAwO3RleHQtZGVjb3JhdGlvbjogbm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiAjQzBEMEU4O3RleHQtYWxpZ246IGNlbnRlcjtoZWlnaHQ6IDIwcHg7d2lkdGg6IDEyJTtcIiBrZXk9XCJkYXlTYXRUaXRsZVwiPlwi5YWtXCI8L3RkPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgPHRib2R5IGNlbGxzcGFjaW5nPVwiMFwiIGNlbGxwYWRkaW5nPVwiMFwiIGlkPVwiY2FsZW5kYXJcIiBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjogbm9uZTt3aWR0aDogMTcwO2JhY2tncm91bmQtY29sb3I6ICNDMEQwRTg7Zm9udC1zaXplOiA5cHQ7Ym9yZGVyOiAwcHggZG90dGVkICMxQzZGQTU7XCIgIGFsaWduPVwiY2VudGVyXCIgYm9yZGVyPVwiMVwiIGtleT1cInRib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDx0ciBzdHlsZT1cImN1cnNvcjpoYW5kXCIga2V5PVwiJSN3ZWVrLmlkIyVcIiBmb3I9XCJ3ZWVrIF9pbl8gd2Vla3NcIiBkb21EYXRhPVwid2Vla1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHRkICBrZXk9XCIlI3YuaWQjJVwiIG9uY2xpY2s9XCJjbGlja0RheSh0aGlzKVwiIHN0eWxlPVwiJSN2LnN0eWxlIyVcIiBsYWJsZT1cIiUjdi5sYWJsZSMlXCIgb25Nb3VzZW92ZXI9XCJtb3VzZU92ZXIodGhpcylcIiBvbk1vdXNlT3V0PVwibW91c2VPdXQodGhpcylcIiBjaGlsZERvbURhdGE9XCJ2XCIgZm9yPVwidiBfaW5fIHdlZWtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBrZXk9XCJ7JSN2LmlkIyUrJ19jb250ZW50J31cIiBzdHlsZT1cIm1hcmdpbi1ibG9jay1zdGFydDogMGVtO21hcmdpbi1ibG9jay1lbmQ6IDBlbVwiPlwiJSN2LmNvbnRlbnQjJVwiPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT1cInslI3YuaWQjJSsnX2x1bmFySW5mbyd9XCIgc3R5bGU9XCJtYXJnaW4tYmxvY2stc3RhcnQ6IDBlbTttYXJnaW4tYmxvY2stZW5kOiAwZW1cIiB0aW1lPVwie25ldyBEYXRlKCl9XCI+XCIlI3YubHVuYXJJbmZvIyVcIjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICA8L3Rib2R5PiAgICAgIFxyXG4gICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgYFxyXG4gICAgfSlcclxuICAgIHJ2LnJ1bigpXHJcbiAgICBcclxuICAgIGxldCBtb250aCA9IG1DYWxlbmRhclsnbW9udGgnXVxyXG4gICAgbGV0IHllYXIgPSBtQ2FsZW5kYXJbJ3llYXInXVxyXG4gICAgbGV0IHNlbGVjdERheSA9IG1DYWxlbmRhclsnc2VsZWN0RGF5J11cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICdtb250aCcsIHtcclxuXHJcbiAgICAgICAgc2V0KG52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobW9udGggIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IG52YWx1ZVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS53ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLm1vbnRoID0gKG52YWx1ZSArIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICd5ZWFyJywge1xyXG4gICAgICAgIHNldChudmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld1llYXI6XCIgKyBudmFsdWUpXHJcbiAgICAgICAgICAgICAgICB5ZWFyID0gbnZhbHVlXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLndlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEueWVhciA9IG52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4geWVhclxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1DYWxlbmRhciwgJ3NlbGVjdERheScsIHtcclxuICAgICAgICBzZXQobnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3REYXkgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3REYXkgPSBudmFsdWVcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0RGF5XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImNsYXNzIEx1bmFyQ2FsZW5kYXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHRcclxuICAgICAqIFxyXG4gICAgICog5Yac5Y6GMTkwMC0yMTAw55qE5ram5pyI5L+h5oGv6KGoIFxyXG4gICAg5Y2B5YWt6L+b5Yi25b2i5byPOlxyXG4gICAgMHggeHh4eHggICAgXHJcbiAgICDkuozov5vliLblvaLlvI86XHJcbiAgICB4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHJcbiAgICAyMC0xN1x0MTYtMTJcdDEyLTlcdDgtNVx0ICAgIDQtMVxyXG7CoFxyXG4gICAgMS00OiDooajnpLrlvZPlubTmnInml6Dpl7DlubTvvIzmnInnmoTor53vvIzkuLrpl7DmnIjnmoTmnIjku73vvIzmsqHmnInnmoTor53vvIzkuLow44CCXHJcblxyXG4gICAgNS0xNu+8muS4uumZpOS6humXsOaciOWklueahOato+W4uOaciOS7veaYr+Wkp+aciOi/mOaYr+Wwj+aciO+8jDHkuLozMOWkqe+8jDDkuLoyOeWkqeOAgijms6jmhI/vvJrku44x5pyI5YiwMTLmnIjlr7nlupTnmoTmmK/nrKwxNuS9jeWIsOesrDXkvY3jgIIpXHJcbiAgICAxNy0yMO+8miDooajnpLrpl7DmnIjmmK/lpKfmnIjov5jmmK/lsI/mnIjvvIzku4XlvZPlrZjlnKjpl7DmnIjnmoTmg4XlhrXkuIvmnInmhI/kuYnjgIJcclxuXHJcbiAgICDkuL7kuKrkvovlrZDvvJpcclxuXHJcbiAgICAxOTgw5bm055qE5pWw5o2u5piv77yaIDB4MDk1YjAgMHjku6PooajljYHlha3ov5vliLbvvIzlkI7pnaLnmoTmmK/ljYHlha3ov5vliLbmlbDjgIJcclxuICAgICAgICAgICAgIDEwMDAgMDAwMCAwMDAwIDAwMDAgMDAwMFxyXG4gICAgICAgICAgICAgMDAwMCAwMDAwIDAwMDAgMDAwMCAxMTExXHJcblxyXG4gICAg5LqM6L+b5Yi277yaICAwMDAwwqAxMDAxIDAxMDEgMTAxMSAwMDAwXHJcblxyXG4gICAg6KGo56S6MTk4MOW5tOayoeaciemXsOaciO+8jOS7jjHmnIjliLAxMuaciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEyOeOAgTMwIOOAgTI544CBMzDjgIEyOeOAgTMw44CBIDMw44CBMjnjgIEzMOOAgTMw44CCXHJcblxyXG4gICAgMTk4MuW5tOeahOaVsOaNruaYr++8mjB4MGE5NzRcclxuICAgICAgICAgMTAxMCAgIDEwMDEgMDExMSAwMTAwXHJcbiAgICAwMDAwIDEwMTAgMCAxMDAxIDAxMTEgMDEwMFxyXG5cclxuICAgIOihqOekujE5ODLlubTnmoQ05pyI5Li66Zew5pyI77yM5Y2z5pyJ56ys5LqM5LiqNOaciO+8jOS4lOaYr+mXsOWwj+aciOOAglxyXG5cclxuICAgIOS7jjHmnIjliLAxM+aciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEzMOOAgTI544CBwqAyOSjpl7DmnIgp44CBIDMw44CBMjnjgIEyOeOAgTMw44CBIDI544CBMzDjgIEzMOOAgTMw44CCXHJcblxyXG4gIFxyXG4gICogQEFycmF5IE9mIFByb3BlcnR5XHJcbiAgKiBAcmV0dXJuIEhleCBcclxuICAqL1xyXG4gICAgdGhpcy5feWVhckluZm8gPSBbMHgwNGJkOCwgMHgwNGFlMCwgMHgwYTU3MCwgMHgwNTRkNSwgMHgwZDI2MCwgMHgwZDk1MCwgMHgxNjU1NCwgMHgwNTZhMCwgMHgwOWFkMCwgMHgwNTVkMiwvLzE5MDAtMTkwOVxyXG4gICAgICAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAweDA5NWIwLCAweDE0OTc3LC8vMTkxMC0xOTE5XHJcbiAgICAgIDB4MDQ5NzAsIDB4MGE0YjAsIDB4MGI0YjUsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MWFiNTQsIDB4MDJiNjAsIDB4MDk1NzAsIDB4MDUyZjIsIDB4MDQ5NzAsLy8xOTIwLTE5MjlcclxuICAgICAgMHgwNjU2NiwgMHgwZDRhMCwgMHgwZWE1MCwgMHgwNmU5NSwgMHgwNWFkMCwgMHgwMmI2MCwgMHgxODZlMywgMHgwOTJlMCwgMHgxYzhkNywgMHgwYzk1MCwvLzE5MzAtMTkzOVxyXG4gICAgICAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LC8vMTk0MC0xOTQ5XHJcbiAgICAgIDB4MDZjYTAsIDB4MGI1NTAsIDB4MTUzNTUsIDB4MDRkYTAsIDB4MGE1YjAsIDB4MTQ1NzMsIDB4MDUyYjAsIDB4MGE5YTgsIDB4MGU5NTAsIDB4MDZhYTAsLy8xOTUwLTE5NTlcclxuICAgICAgMHgwYWVhNiwgMHgwYWI1MCwgMHgwNGI2MCwgMHgwYWFlNCwgMHgwYTU3MCwgMHgwNTI2MCwgMHgwZjI2MywgMHgwZDk1MCwgMHgwNWI1NywgMHgwNTZhMCwvLzE5NjAtMTk2OVxyXG4gICAgICAweDA5NmQwLCAweDA0ZGQ1LCAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNmEwLCAweDE5NWE2LC8vMTk3MC0xOTc5XHJcbiAgICAgIDB4MDk1YjAsIDB4MDQ5YjAsIDB4MGE5NzQsIDB4MGE0YjAsIDB4MGIyN2EsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MGFmNDYsIDB4MGFiNjAsIDB4MDk1NzAsLy8xOTgwLTE5ODlcclxuICAgICAgMHgwNGFmNSwgMHgwNDk3MCwgMHgwNjRiMCwgMHgwNzRhMywgMHgwZWE1MCwgMHgwNmI1OCwgMHgwNTVjMCwgMHgwYWI2MCwgMHgwOTZkNSwgMHgwOTJlMCwvLzE5OTAtMTk5OVxyXG4gICAgICAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAweDA5MmQwLCAweDBjYWI1LC8vMjAwMC0yMDA5XHJcbiAgICAgIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGJhYTQsIDB4MGFkNTAsIDB4MDU1ZDksIDB4MDRiYTAsIDB4MGE1YjAsIDB4MTUxNzYsIDB4MDUyYjAsIDB4MGE5MzAsLy8yMDEwLTIwMTlcclxuICAgICAgMHgwNzk1NCwgMHgwNmFhMCwgMHgwYWQ1MCwgMHgwNWI1MiwgMHgwNGI2MCwgMHgwYTZlNiwgMHgwYTRlMCwgMHgwZDI2MCwgMHgwZWE2NSwgMHgwZDUzMCwvLzIwMjAtMjAyOVxyXG4gICAgICAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YWZiLCAweDA0YWQwLCAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LC8vMjAzMC0yMDM5XHJcbiAgICAgIDB4MGI1YTAsIDB4MDU2ZDAsIDB4MDU1YjIsIDB4MDQ5YjAsIDB4MGE1NzcsIDB4MGE0YjAsIDB4MGFhNTAsIDB4MWIyNTUsIDB4MDZkMjAsIDB4MGFkYTAsLy8yMDQwLTIwNDlcclxuICAgICAgMHgxNGI2MywgMHgwOTM3MCwgMHgwNDlmOCwgMHgwNDk3MCwgMHgwNjRiMCwgMHgxNjhhNiwgMHgwZWE1MCwgMHgwNmIyMCwgMHgxYTZjNCwgMHgwYWFlMCwvLzIwNTAtMjA1OVxyXG4gICAgICAweDBhMmUwLCAweDBkMmUzLCAweDBjOTYwLCAweDBkNTU3LCAweDBkNGEwLCAweDBkYTUwLCAweDA1ZDU1LCAweDA1NmEwLCAweDBhNmQwLCAweDA1NWQ0LC8vMjA2MC0yMDY5XHJcbiAgICAgIDB4MDUyZDAsIDB4MGE5YjgsIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGI2YTYsIDB4MGFkNTAsIDB4MDU1YTAsIDB4MGFiYTQsIDB4MGE1YjAsIDB4MDUyYjAsLy8yMDcwLTIwNzlcclxuICAgICAgMHgwYjI3MywgMHgwNjkzMCwgMHgwNzMzNywgMHgwNmFhMCwgMHgwYWQ1MCwgMHgxNGI1NSwgMHgwNGI2MCwgMHgwYTU3MCwgMHgwNTRlNCwgMHgwZDE2MCwvLzIwODAtMjA4OVxyXG4gICAgICAweDBlOTY4LCAweDBkNTIwLCAweDBkYWEwLCAweDE2YWE2LCAweDA1NmQwLCAweDA0YWUwLCAweDBhOWQ0LCAweDBhMmQwLCAweDBkMTUwLCAweDBmMjUyLC8vMjA5MC0yMDk5XHJcbiAgICAgIDB4MGQ1MjBdLy8yMTAwXHJcblxyXG5cclxuICAgIHRoaXMuX2FzdHJvbG9neSA9IFtcIumtlOe+r1wiLCBcIuawtOeTtlwiLCBcIuWPjOmxvFwiLCBcIueZvee+ilwiLCBcIumHkeeJm1wiLCBcIuWPjOWtkFwiLCBcIuW3qOifuVwiLCBcIueLruWtkFwiLCBcIuWkhOWls1wiLCBcIuWkqeenpFwiLCBcIuWkqeidjlwiLCBcIuWwhOaJi1wiLCBcIumtlOe+r1wiXVxyXG4gICAgLyoqXHJcbiAgICAgICog5YWs5Y6G5q+P5Liq5pyI5Lu955qE5aSp5pWw5pmu6YCa6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9kYXlJbk1vbnRoID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlpKnlubLpgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX1RpYW5HYW4gPSBbXCLnlLJcIiwgXCLkuZlcIiwgXCLkuJlcIiwgXCLkuIFcIiwgXCLmiIpcIiwgXCLlt7FcIiwgXCLluppcIiwgXCLovptcIiwgXCLlo6xcIiwgXCLnmbhcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlnLDmlK/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX0RpWmhpID0gW1wi5a2QXCIsIFwi5LiRXCIsIFwi5a+FXCIsIFwi5Y2vXCIsIFwi6L6wXCIsIFwi5bezXCIsIFwi5Y2IXCIsIFwi5pyqXCIsIFwi55SzXCIsIFwi6YWJXCIsIFwi5oiMXCIsIFwi5LqlXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog55Sf6IKW6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9ab2RpYWMgPSBbXCLpvKBcIiwgXCLniZtcIiwgXCLomY5cIiwgXCLlhZRcIiwgXCLpvplcIiwgXCLom4dcIiwgXCLpqaxcIiwgXCLnvopcIiwgXCLnjLRcIiwgXCLpuKFcIiwgXCLni5dcIiwgXCLnjKpcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiAyNOiKguawlOmAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2FsZW5kYXJpY2l0eSA9IFtcIuWwj+WvklwiLCBcIuWkp+WvklwiLCBcIueri+aYpVwiLCBcIumbqOawtFwiLCBcIuaDiuibsFwiLCBcIuaYpeWIhlwiLCBcIua4heaYjlwiLCBcIuiwt+mbqFwiLCBcIueri+Wkj1wiLCBcIuWwj+a7oVwiLCBcIuiKkuenjVwiLCBcIuWkj+iHs1wiLCBcIuWwj+aakVwiLCBcIuWkp+aakVwiLCBcIueri+eni1wiLCBcIuWkhOaakVwiLCBcIueZvemcslwiLCBcIueni+WIhlwiLCBcIuWvkumcslwiLCBcIumcnOmZjVwiLCBcIueri+WGrFwiLCBcIuWwj+mbqlwiLCBcIuWkp+mbqlwiLCBcIuWGrOiHs1wiXVxyXG4gICAgLyoqXHJcbiAgICAgIOWGnOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX2x1bmFySG9saWRheSA9IFtcIjAxMDEg5pil6IqCXCIsIFwiMDExNSDlhYPlrrVcIiwgXCIwNTA1IOerr+WNiFwiLCBcIjA3MDcg5oOF5Lq6XCIsIFwiMDcxNSDkuK3lhYNcIixcclxuICAgICAgXCIwODE1IOS4reeni1wiLCBcIjA5MDkg6YeN6ZizXCIsIFwiMTIwOCDohYrlhatcIiwgXCIxMjI0IOWwj+W5tFwiLCBcIjEyMzAg6Zmk5aSVXCJdXHJcbiAgICAvKlxyXG4gICAgIOWFrOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX3NvbGFySG9saWRheSA9IFtcclxuICAgICAgXCIwMTAxIOWFg+aXplwiLCBcIjAyMTQg5oOF5Lq6XCIsIFwiMDMwOCDlpoflpbNcIiwgXCIwMzEyIOakjeagkVwiLCBcIjAzMTUg5raI6LS56ICF5p2D55uK5pelXCIsIFwiMDQwMSDmhJrkurpcIiwgXCIwNTAxIOWKs+WKqFwiLCBcIjA1MDQg6Z2S5bm0XCIsIC8vXHJcbiAgICAgIFwiMDUxMiDmiqTlo6tcIiwgXCIwNjAxIOWEv+erpVwiLCBcIjA3MDEg5bu65YWaXCIsIFwiMDgwMSDlu7rlhptcIiwgXCIwODA4IOeItuS6slwiLCBcIjA5MTAg5pWZ5biIXCIsIFwiMDkyOCDlrZTlrZDor57ovrBcIiwgLy9cclxuICAgICAgXCIxMDAxIOWbveW6hlwiLCBcIjEwMjQg6IGU5ZCI5Zu95pelXCIsIFwiMTExMiDlrZnkuK3lsbHor57ovrDnuqrlv7VcIiwgXCIxMjIwIOa+s+mXqOWbnuW9kue6quW/tVwiLCBcIjEyMjUg5Zyj6K+eXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogMTkwMC0yMTAw5ZCE5bm05Yac5Y6G55qEMjToioLmsJTml6XmnJ/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NhbGVuZGFyaWNpdHlUYWJsZSA9IFsnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJywgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLFxyXG4gICAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQxOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJywgJzk3YmQwOTgwMWQ5ODA4MmM5NWY4ZTFjZmNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGUxY2ZjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwN2Y1OTViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzkyNzRjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JkMDdmMTQ4N2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJywgJzk3YmNmN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiOTdiZDE5N2MzNmM5MjEwYzkyNzRjOTIwZScsICc5N2JjZjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNzBjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4MzdmMGUzN2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzIzYjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OTk4MDgzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZjA3ZTdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzNjY2NWI2NmFhODk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLFxyXG4gICAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JywgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOS4reaWh+aXpeacn1xyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2hpbmVzZUNoYXIgPSBbXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlhpzljobov5vliLbljZXkvY1cclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NoaW5lc2VUZW5DaGFyID0gW1wi5YidXCIsIFwi5Y2BXCIsIFwi5bu/XCIsIFwi5Y2FXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5pyI5Lu95Yac5Y6G6KGo56S6XHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9sdW5hck1vbnRoVGFibGUgPSBbXCLmraNcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIiwgXCLlhqxcIiwgXCLohYpcIl1cclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm05LiA5pW05bm055qE5oC75aSp5pWwXHJcbiAgICAqL1xyXG4gIF9sdW5hclllYXJEYXlzKHllYXIpIHtcclxuICAgIHZhciBpLCBzdW0gPSAzNDg7XHJcbiAgICBmb3IgKGkgPSAweDgwMDA7IGkgPiAweDg7IGkgPj49IDEpIHsgc3VtICs9ICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiBpKSA/IDEgOiAwOyB9XHJcbiAgICByZXR1cm4gKHN1bSArIHRoaXMuX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTlr7nlupTnmoTpl7DmnIhcclxuICAgICovXHJcbiAgX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpIHtcclxuICAgIHJldHVybiAodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgMHgwMDAwZik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ55bm06Zew5pyI55qE5aSp5pWwIOiLpeivpeW5tOayoeaciemXsOaciOWImei/lOWbnjBcclxuICAgICovXHJcbiAgX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikge1xyXG4gICAgaWYgKHRoaXMuX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpKSB7XHJcbiAgICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmIDB4MTAwMDApID8gMzAgOiAyOSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDApO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm0bW9udGjmnIjvvIjpnZ7pl7DmnIjvvInnmoTmgLvlpKnmlbDvvIxcclxuICAgICovXHJcbiAgX21vbnRoRGF5cyh5ZWFyLCBtb250aCkge1xyXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPCAxKSB7IHJldHVybiAtMSB9Ly/mnIjku73lj4LmlbDku44x6IezMTLvvIzlj4LmlbDplJnor6/ov5Tlm54tMVxyXG5cclxuICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPyAzMCA6IDI5KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWFrOWOhnllYXLlubRtb250aOaciOeahOWkqeaVsFxyXG4gICAgKi9cclxuICBfZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkgeyByZXR1cm4gLTEgfSAvL+iLpeWPguaVsOmUmeivryDov5Tlm54tMVxyXG4gICAgbGV0IG1zID0gbW9udGggLSAxO1xyXG4gICAgaWYgKG1zID09IDEpIHsgLy8y5pyI5Lu955qE6Zew5bmz6KeE5b6L5rWL566X5ZCO56Gu6K6k6L+U5ZueMjjmiJYyOVxyXG4gICAgICByZXR1cm4gKCgoeWVhciAlIDQgPT0gMCkgJiYgKHllYXIgJSAxMDAgIT0gMCkgfHwgKHllYXIgJSA0MDAgPT0gMCkpID8gMjkgOiAyOCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKHRoaXMuX2RheUluTW9udGhbbXNdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWGnOWOhuW5tOS7vei9rOaNouS4uuW5suaUr+e6quW5tFxyXG4gICAgICDlubLmlK/nuqrlubTms5Vcclxu44CA44CAICAgICDlpKnlubLlnLDmlK/ooahcclxu44CA44CAICAgMDEu55Sy5a2QIDAyLuS5meS4kSAwMy7kuJnlr4UgMDQu5LiB5Y2vIDA1LuaIiui+sCAwNi7lt7Hlt7MgMDcu5bqa5Y2IIDA4Lui+m+acqiAwOS7lo6znlLMgMTAu55m46YWJXHJcbuOAgCAgIOOAgCAgIDExLueUsuaIjCAxMi7kuZnkuqUgMTMu5LiZ5a2QIDE0LuS4geS4kSAxNS7miIrlr4UgMTYu5bex5Y2vIDE3LuW6mui+sCAxOC7ovpvlt7MgMTku5aOs5Y2IIDIwLueZuOacqlxyXG7jgIAgICDjgIAgICAyMS7nlLLnlLMgMjIu5LmZ6YWJIDIzLuS4meaIjCAyNC7kuIHkuqUgMjUu5oiK5a2QIDI2LuW3seS4kSAyNy7luprlr4UgMjgu6L6b5Y2vIDI5LuWjrOi+sCAzMC7nmbjlt7Ncclxu44CAICDjgIAgICAgMzEu55Sy5Y2IIDMyLuS5meacqiAzMy7kuJnnlLMgMzQu5LiB6YWJIDM1LuaIiuaIjCAzNi7lt7HkuqUgMzcu5bqa5a2QIDM4Lui+m+S4kSAzOS7ku7vlr4UgNDAu55m45Y2vXHJcbuOAgCAgIOOAgCAgIDQxLueUsui+sCA0Mi7kuZnlt7MgNDMu5LiZ5Y2IIDQ0LuS4geacqiA0NS7miIrnlLMgNDYu5bex6YWJIDQ3LuW6muaIjCA0OC7ovpvkuqUgNDku5aOs5a2QIDUwLueZuOS4kVxyXG7jgIDjgIAgICAgICA1MS7nlLLlr4UgNTIu5LmZ5Y2vIDUzLuS4mei+sCA1NC7kuIHlt7EgNTUu5oiK5Y2IIDU2LuW3seacqiA1Ny7luprnlLMgNTgu6L6b6YWJIDU5LuWjrOaIjCA2MC7nmbjkuqVcclxuICAgICDnlKjpmLPljobnmoTlubTku73pmaTku6U2MOW+l+WIsOeahOW5tOS7veWGjeWHj+WOuzPlsLHmmK/ov5nkuIDlubTlhpzljobnmoTlubLmlK/luo/lj7fmlbDvvIzmn6XlubLmlK/ooajlvpfliLDlubLmlK/lubTnuqrvvIxcclxuICAgICDoi6Xlvpflh7rmnaXnmoTmlbDmja7lsI/kuo7pm7bmiJbogIXnrYnkuo7pm7bliJnliqDkuIo2MOWNs+WPr+OAglxyXG4gICAgIOS4vuS4quS+i+WtkO+8muaxgjIwMTnlubTlubLmlK/vvIwyMDE5w7c2MO+8nTMz5L2ZMznvvIzlubTlubLmlK/luo/lj7fmlbA9MzktMz0zNu+8jFxyXG4gICAgIOaJgOS7peW+l+efpeS7iuW5tOaYr+W3seS6peW5tOOAguW5suaUr+e6quW5tOmDveaYr+S7juavj+W5tOeahOeri+aYpeW8gOWni+eahO+8jOS4jeeuoeeri+aYpeWcqOWJjeS4gOW5tOeahOiFiuaciOi/mOaYr+aWsOS4gOW5tOeahOato+aciO+8jOeri+aYpeW8gOWni+aJjeeul+aWsOeahOS4gOW5tOOAglxyXG4gICAqL1xyXG4gIF9nZXRHYW5aaGlZZWFyKHllYXIpIHtcclxuICAgIHZhciBnYW5LZXkgPSAoeWVhciAtIDMpICUgMTA7XHJcbiAgICB2YXIgemhpS2V5ID0gKHllYXIgLSAzKSAlIDEyO1xyXG4gICAgaWYgKGdhbktleSA9PSAwKSBnYW5LZXkgPSAxMDsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlpKnlubJcclxuICAgIGlmICh6aGlLZXkgPT0gMCkgemhpS2V5ID0gMTI7Ly/lpoLmnpzkvZnmlbDkuLow5YiZ5Li65pyA5ZCO5LiA5Liq5Zyw5pSvXHJcbiAgICByZXR1cm4gdGhpcy5fVGlhbkdhbltnYW5LZXkgLSAxXSArIHRoaXMuX0RpWmhpW3poaUtleSAtIDFdO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFrOWOhuaciOOAgeaXpeWIpOaWreaJgOWxnuaYn+W6p1xyXG4gICAqL1xyXG4gIF9nZXRBc3Ryb2xvZ3koY01vbnRoLCBjRGF5KSB7XHJcbiAgICB2YXIgYXJyID0gWzIwLCAxOSwgMjEsIDIxLCAyMSwgMjIsIDIzLCAyMywgMjMsIDIzLCAyMiwgMjJdO1xyXG4gICAgcmV0dXJuIHRoaXMuX2FzdHJvbG9neVtjTW9udGggLSAoY0RheSA8IGFycltjTW9udGggLSAxXSA/IDEgOiAwKV0gKyBcIuW6p1wiOy8v5bqnXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogXHJcbiAgICDlpKnlubLkuIDlhbHmnInljYHkuKrvvIzliIbliKvmnInnlLLjgIHkuZnjgIHkuJnjgIHkuIHjgIHmiIrjgIHlt7HjgIHluprjgIHovpvjgIHlo6zjgIHnmbjjgILlnLDmlK/kuIDlhbHmnInljYHkuozkuKrvvIzliIbliKvmnInlrZDjgIHkuJHjgIHlr4XjgIHlja/jgIHovrDjgIHlt7PjgIHljYjjgIHmnKrjgIHnlLPjgIHphYnjgIHmiIzjgIHkuqXjgILlubLmlK/ov5jmnInpmLTpmLPkuYvliIbvvIznlLLjgIHkuJnjgIHmiIrjgIHluprjgIHlo6zkuLrpmLPlubLvvIzkuZnjgIHkuIHjgIHlt7HjgIHovpvjgIHnmbjkuLrpmLTlubLjgILlrZDjgIHlr4XjgIHovrDjgIHljYjjgIHnlLPjgIHmiIzkuLrpmLPmlK/vvIzkuJHjgIHlja/jgIHlt7PjgIHmnKrjgIHphYnjgIHkuqXkuLrpmLTmlK/vvIzkuIDkuKrlpKnlubLlkozkuIDkuKrlnLDmlK/nm7jphY3vvIzmjpLliJfotbfmnaXvvIzlpKnlubLlnKjliY3vvIzlnLDmlK/lnKjlkI7vvIzlpKnlubLnlLHnlLLotbfvvIzlnLDmlK/nlLHlrZDotbfvvIzpmLPlubLphY3pmLPmlK/vvIzpmLTlubLphY3pmLTmlK/vvIzlhbHmnInlha3ljYHkuKrnu4TlkIjjgILlj6TkurrlsLHnlKjov5k2MOS4que7hOWQiOW+queOr+i1t+adpee6quW5tO+8jOe6quaciO+8jOe6quaXpe+8jOe6quaXtuOAglxyXG5cclxuICAgIOe6quW5tO+8jOS4reWbveWPpOS6uueUqDYw5Liq57uE5ZCI5L6d5qyh57qq5bm077yM5LiA5bm05LiA5Liq57uE5ZCI77yM77yM5bmy5pSv57qq5bm077yM5LiA5Liq5ZGo5pyf55qE56ys5LiA5bm05Li655Sy5a2Q77yM56ys5LqM5bm05Li65LmZ5LiR77yM5L6d5qyh57G75o6o77yMNjDlubTkuIDkuKrova7lm57vvIzmr4/kuIDkuKrmlrDlubTlvIDlp4vkuo7mraPmnIjliJ3kuIDnmoTmraPlrZDml7bjgIJcclxuXHJcbiAgICDnuqrmnIjvvIzlubLmlK/nuqrmnIjvvIzph4fnlKjmr4/kuKrlnLDmlK/lr7nlupQyNOiKguawlOiHquafkOiKguawlOiHs+S4i+S4gOS4quiKguawlO+8jOS7peS6pOe7k+aXtumXtOWGs+Wumui1t+Wni+eahOS4gOS4quaciOacn+mXtOOAguW5suaUr+e6quaciOaYr+W5suaUr+WOhueahOS4gOmDqOWIhu+8jOS4u+imgeeUqOS6jumjjuawtOacr+acr+etiemihuWfn++8jOi/meS9v+W+l+W5suaUr+WOhuS4gOebtOWcqOWumOaWueWSjOawkemXtOmDvea1geS8oOS4jeihsOOAglxyXG5cclxuICAgIOe6quaXpe+8jOe6quaXpeaYr+W5suaUr+eahOacgOaXqeeUqOazle+8jOS4gOS4quaYvOWknOaYr+S4gOWkqe+8jOeUqDYw5Liq57uE5ZCI5p2l5L6d5qyh57qq5pel77yM5q+U5aaC5LuK5aSp5piv55Sy5a2Q5pel77yM5piO5aSp5bCx5piv5LmZ5LiR5pel77yMNjDlpKnkuIDkuKrlvqrnjq/vvIzmlrDnmoTkuIDlpKnku47mraPlrZDljYjlvIDlp4vvvIzkuK3lm73mmI7noa7lj6/mn6XnmoTlubLmlK/nuqrml6XvvIzmmK/mmKXnp4vpsoHpmpDlhazkuInlubTvvIjlhazlhYPliY03MjDlubTvvInvvIzot53ku4rlt7Lnu4/mnIkyNzAw5aSa5bm05LqG77yM6L+Z5piv6L+E5LuK5Li65q2i5piv5LiW55WM5LiK5pyA5pep55qE6K6w5pel5rOV44CCXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIOS8oOWFpW9mZnNldOWBj+enu+mHj+i/lOWbnuW5suaUryBcclxuICAgICovXHJcbiAgX2dldEdhblpoaShvZmZzZXQpIHtcclxuICAgIHJldHVybiB0aGlzLl9UaWFuR2FuW29mZnNldCAlIDEwXSArIHRoaXMuX0RpWmhpW29mZnNldCAlIDEyXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAg5YWs5Y6GeWVhcuW5tOiOt+W+l+ivpeW5tOesrGluZGV45Liq6IqC5rCU55qE5YWs5Y6G5pel5pyfXHJcbiAgICAqL1xyXG4gIF9nZXRDYWxlbmRhcmljaXR5KHllYXIsIGluZGV4KSB7XHJcbiAgICBpZiAoeWVhciA8IDE5MDAgfHwgeWVhciA+IDIxMDApIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgMSB8fCBpbmRleCA+IDI0KSB7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHZhciBfdGFibGUgPSB0aGlzLl9jYWxlbmRhcmljaXR5VGFibGVbeWVhciAtIDE5MDBdO1xyXG4gICAgdmFyIF9jYWxlbmRhcmljaXR5SW5mbyA9IFtcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDUsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDE1LCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMjAsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyNSwgNSkpLnRvU3RyaW5nKClcclxuICAgIF07XHJcblxyXG4gICAgdmFyIF9jYWxkYXkgPSBbXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cig0LCAyKSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoX2NhbGRheVtpbmRleCAtIDFdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDlhpzljobmsYnor63ooajnpLpcclxuICAgICovXHJcbiAgX2dldENoaW5hTW9udGgobW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkge1xyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJldHVybiBgJHt0aGlzLl9sdW5hck1vbnRoVGFibGVbbW9udGggLSAxXX3mnIhgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAq5Yac5Y6G5pel5pyf5pel6KGo56S6XHJcbiAgICAqL1xyXG4gIF9nZXRDaGluYURheShkYXkpIHtcclxuICAgIGxldCBzO1xyXG4gICAgc3dpdGNoIChkYXkpIHtcclxuICAgICAgY2FzZSAxMDpcclxuICAgICAgICBzID0gJ+WIneWNgSc7IGJyZWFrO1xyXG4gICAgICBjYXNlIDIwOlxyXG4gICAgICAgIHMgPSAn5LqM5Y2BJzsgYnJlYWs7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgcyA9ICfkuInljYEnOyBicmVhaztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBzID0gdGhpcy5fY2hpbmVzZVRlbkNoYXJbTWF0aC5mbG9vcihkYXkgLyAxMCldO1xyXG4gICAgICAgIHMgKz0gdGhpcy5fY2hpbmVzZUNoYXJbZGF5ICUgMTBdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChzKTtcclxuICB9XHJcbiAgLypcclxuICDov5Tlm57lhpzljoboioLml6VcclxuICAqL1xyXG4gIF9nZXRMdW5hckhvbGlkYXkobW9udGgsIGRheSkge1xyXG4gICAgbGV0IGx1bmFySG9saWRheVN0ciA9IFwiXCJcclxuICAgIHRoaXMuX2x1bmFySG9saWRheS5mb3JFYWNoKGx1bmFyID0+IHtcclxuICAgICAgbGV0IGxkID0gbHVuYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgbGR2ID0gbHVuYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgbG1kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBsbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgbGRheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgbG1kID0gbG1vbnRoX3YgKyBsZGF5X3Y7XHJcbiAgICAgIGlmIChsZC50cmltKCkgPT09IGxtZC50cmltKCkpIHtcclxuICAgICAgICBsdW5hckhvbGlkYXlTdHIgPSBsZHZcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBsdW5hckhvbGlkYXlTdHJcclxuICB9XHJcbiAgLyoqXHJcbiAqIOi/lOWbnuWvueW6lOaXpeacn+eahOWFrOWOhuiKguaXpVxyXG4gKi9cclxuICBfZ2V0U29sYXJIb2xpZGF5KG1vbnRoLCBkYXkpIHtcclxuICAgIGxldCBzb2xhckhvbGlkYXlTdHIgPSBcIlwiO1xyXG4gICAgdGhpcy5fc29sYXJIb2xpZGF5LmZvckVhY2goc29sYXIgPT4ge1xyXG5cclxuICAgICAgbGV0IHNkID0gc29sYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgc2R2ID0gc29sYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgc21kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBzbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgc2RheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgc21kID0gc21vbnRoX3YgKyBzZGF5X3Y7XHJcbiAgICAgIGlmIChzZC50cmltKCkgPT09IHNtZC50cmltKCkpIHtcclxuICAgICAgICBzb2xhckhvbGlkYXlTdHIgPSBzZHY7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gc29sYXJIb2xpZGF5U3RyXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICDojrflj5blr7nlupTlubTku73nmoTnlJ/ogpZcclxuICAgICovXHJcbiAgX2dldFpvZGlhYyh5ZWFyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fWm9kaWFjWyh5ZWFyIC0gNCkgJSAxMl1cclxuICB9XHJcbiAgLypcclxuICAqIOiOt+WPluaXpeacn+aYr+WQpuS4ujI06IqC5rCUXHJcbiAgICDpppblhYjojrflj5boioLmsJTkuLrlvZPmnIjnmoTnrKzlh6DlpKnvvIzkuI7lvZPliY3ljLnphY3nmoTvvIzov5Tlm57lr7nlupTnmoToioLmsJRcclxuICAqL1xyXG4gIF9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkoZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBzZWNvbmRDYWxlbmRhcmljaXR5RGF5LCBub3dTZWxlY3REYXksIG5vd1NlbGVjdE1vbnRoKSB7XHJcbiAgICAvL+S8oOWFpeeahOaXpeacn+eahOiKguawlOS4juWQplxyXG5cclxuICAgIGxldCBjYWxlbmRhcmljaXR5U3RyID0gXCJcIjtcclxuICAgIGlmIChmaXJzdENhbGVuZGFyaWNpdHlEYXkgPT0gbm93U2VsZWN0RGF5KSB7XHJcblxyXG4gICAgICBjYWxlbmRhcmljaXR5U3RyID0gdGhpcy5fY2FsZW5kYXJpY2l0eVtub3dTZWxlY3RNb250aCAqIDIgLSAyXTtcclxuICAgIH1cclxuICAgIGlmIChzZWNvbmRDYWxlbmRhcmljaXR5RGF5ID09IG5vd1NlbGVjdERheSkge1xyXG5cclxuICAgICAgY2FsZW5kYXJpY2l0eVN0ciA9IHRoaXMuX2NhbGVuZGFyaWNpdHlbbm93U2VsZWN0TW9udGggKiAyIC0gMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2FsZW5kYXJpY2l0eVN0clxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOS8oOWFpemYs+WOhuW5tOaciOaXpeiOt+W+l+ivpue7hueahOWFrOWOhuOAgeWGnOWOhm9iamVjdOS/oeaBryA8PT5KU09OXHJcbiAgICAqIEBwYXJhbSBzb2xhclllYXIgIHNvbGFyIHllYXJcclxuICAgICogQHBhcmFtIHNvbGFyTW9udGggIHNvbGFyIG1vbnRoXHJcbiAgICAqIEBwYXJhbSBzb2xhckRheSAgc29sYXIgZGF5XHJcbiAgICAqIEByZXR1cm4gSlNPTiBvYmplY3RcclxuICAgICovXHJcbiAgZ2V0THVuYXIoc29sYXJZZWFyLCBzb2xhck1vbnRoLCBzb2xhckRheSkgeyAvL+WPguaVsOWMuumXtDE5MDAuMS4zMX4yMTAwLjEyLjMxXHJcbiAgICBpZiAoc29sYXJZZWFyIDwgMTkwMCB8fCBzb2xhclllYXIgPiAyMTAwKSB7IHJldHVybiAtMTsgfS8v5bm05Lu96ZmQ5a6a44CB5LiK6ZmQXHJcbiAgICBpZiAoc29sYXJZZWFyID09IDE5MDAgJiYgc29sYXJNb250aCA9PSAxICYmIHNvbGFyRGF5IDwgMzEpIHsgcmV0dXJuIC0xOyB9Ly/kuIvpmZBcclxuICAgIGlmICghc29sYXJZZWFyKSB7IC8v5pyq5Lyg5Y+CICDojrflvpflvZPlpKlcclxuICAgICAgdmFyIG5vd1NlbGVjdERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIG5vd1NlbGVjdERhdGUgPSBuZXcgRGF0ZShzb2xhclllYXIsIHBhcnNlSW50KHNvbGFyTW9udGgpIC0gMSwgc29sYXJEYXkpXHJcbiAgICB9XHJcbiAgICB2YXIgbm93U2VsZWN0WWVhciA9IG5vd1NlbGVjdERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHZhciBub3dTZWxlY3RNb250aCA9IG5vd1NlbGVjdERhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgbm93U2VsZWN0RGF5ID0gbm93U2VsZWN0RGF0ZS5nZXREYXRlKCk7XHJcbiAgICB2YXIgb2Zmc2V0ID0gKERhdGUuVVRDKG5vd1NlbGVjdERhdGUuZ2V0RnVsbFllYXIoKSwgbm93U2VsZWN0RGF0ZS5nZXRNb250aCgpLCBub3dTZWxlY3REYXRlLmdldERhdGUoKSkgLSBEYXRlLlVUQygxOTAwLCAwLCAzMSkpIC8gODY0MDAwMDA7XHJcbiAgICAvL29mZnNldOW9k+WJjeaXpeacn+S4jjE5OTAuMS4zMeebuOW3ruaXpeacn+OAgjE5OTAuMS4zMS7lvIDlp4vnrKzkuIDkuKrlhpzljoblkajmnJ/lvIDlp4tcclxuICAgIHZhciB0ZW1wWWVhciwgbGVhcCA9IDAsIHRlbXAgPSAwO1xyXG4gICAgLy90ZW1wWWVhciDlvZPliY3lubTku73oh7MxOTkw5bm05L6d5qyh5YeP5Y675Lit6Ze05omA5pyJ55qE5Yac5Y6G5bm055qE5aSp5pWw77yM5L2Z5LiLb2Zmc2V05Li65b2T5YmN5Yac5Y6G5bm056ys5aSa5bCR5aSpXHJcbiAgICBmb3IgKHRlbXBZZWFyID0gMTkwMDsgdGVtcFllYXIgPCAyMTAxICYmIG9mZnNldCA+IDA7IHRlbXBZZWFyKyspIHtcclxuICAgICAgdGVtcCA9IHRoaXMuX2x1bmFyWWVhckRheXModGVtcFllYXIpOy8v6K6h566X5b2T5YmN5Yac5Y6G5bm055qE5oC75aSp5pWwXHJcbiAgICAgIG9mZnNldCAtPSB0ZW1wO1xyXG4gICAgICAvL29mZnNldOS+neasoeWHj+WOu+aJgOacieWGnOWOhuW5tOeahOaAu+WkqeaVsOWQjlxyXG4gICAgICAvL3RlbXBZZWFy5Li65b2T5YmN55qE55qE5Yac5Y6G5bm05Lu9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA8IDApIHtcclxuICAgICAgLy9vZmZzZXTlsI/kuo4w5pe25YCZ5L+u5q2jXHJcbiAgICAgIG9mZnNldCArPSB0ZW1wO1xyXG4gICAgICB0ZW1wWWVhci0tO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgaXNUb2RheU9iaiA9IG5ldyBEYXRlKCk7Ly/ojrflj5blvZPliY3ml6XmnJ9cclxuICAgIHZhciBpc1RvZGF5ID0gZmFsc2U7XHJcbiAgICBpZiAoaXNUb2RheU9iai5nZXRGdWxsWWVhcigpID09IG5vd1NlbGVjdFllYXIgJiYgaXNUb2RheU9iai5nZXRNb250aCgpICsgMSA9PSBub3dTZWxlY3RNb250aCAmJiBpc1RvZGF5T2JqLmdldERhdGUoKSA9PSBub3dTZWxlY3REYXkpIHtcclxuICAgICAgaXNUb2RheSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvL+aYn+acn+WHoFxyXG4gICAgbGV0IG5XZWVrID0gbm93U2VsZWN0RGF0ZS5nZXREYXkoKTtcclxuICAgIGxldCBjV2VlayA9IHRoaXMuX2NoaW5lc2VDaGFyW25XZWVrXTtcclxuICAgIGlmIChuV2VlayA9PSAwKSB7XHJcbiAgICAgIG5XZWVrID0gNztcclxuICAgIH0vL+aVsOWtl+ihqOekuuWRqOWHoOmhuuW6lOWkqeacneWRqOS4gOW8gOWni+eahOaDr+S+i1xyXG4gICAgLy/lhpzljoblubRcclxuICAgIHZhciB5ZWFyID0gdGVtcFllYXI7XHJcblxyXG4gICAgdmFyIGxlYXAgPSB0aGlzLl9sZWFwTW9udGhJbkx1bmFyWWVhcih0ZW1wWWVhcik7IC8v6Zew5ZOq5Liq5pyIXHJcbiAgICB2YXIgaXNMZWFwID0gZmFsc2U7XHJcblxyXG4gICAgLy/mlYjpqozpl7DmnIhcclxuICAgIHZhciB0ZW1wTW9udGg7XHJcbiAgICBmb3IgKHRlbXBNb250aCA9IDE7IHRlbXBNb250aCA8IDEzICYmIG9mZnNldCA+IDA7IHRlbXBNb250aCsrKSB7XHJcblxyXG4gICAgICBpZiAobGVhcCA+IDAgJiYgdGVtcE1vbnRoID09IChsZWFwICsgMSkgJiYgaXNMZWFwID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy/pl7DmnIhcclxuICAgICAgICAtLXRlbXBNb250aDtcclxuICAgICAgICBpc0xlYXAgPSB0cnVlO1xyXG4gICAgICAgIHRlbXAgPSB0aGlzLl9sZWFwRGF5c0luTHVuYXJZZWFyKHllYXIpOyAvL+iuoeeul+WGnOWOhumXsOaciOWkqeaVsFxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8v6Z2e6Zew5pyIXHJcbiAgICAgICAgdGVtcCA9IHRoaXMuX21vbnRoRGF5cyh5ZWFyLCB0ZW1wTW9udGgpOy8v6K6h566X5Yac5Y6G5pmu6YCa5pyI5aSp5pWwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0xlYXAgPT0gdHJ1ZSAmJiB0ZW1wTW9udGggPT0gKGxlYXAgKyAxKSkge1xyXG4gICAgICAgIC8v5aaC5p6c6Zew5pyI5Y675o6J6Zew5pyI5qCH6K6wXHJcbiAgICAgICAgaXNMZWFwID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgb2Zmc2V0IC09IHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXAgPiAwICYmIHRlbXBNb250aCA9PSBsZWFwICsgMSlcclxuICAgICAgaWYgKGlzTGVhcCkge1xyXG4gICAgICAgIGlzTGVhcCA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlzTGVhcCA9IHRydWU7IC0tdGVtcE1vbnRoO1xyXG4gICAgICB9XHJcbiAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4gICAgICBvZmZzZXQgKz0gdGVtcDtcclxuICAgICAgLS10ZW1wTW9udGg7XHJcbiAgICB9XHJcbiAgICAvL+WGnOWOhuaciFxyXG4gICAgY29uc3QgbW9udGggPSB0ZW1wTW9udGg7XHJcbiAgICAvL+WGnOWOhuaXpVxyXG4gICAgY29uc3QgZGF5ID0gb2Zmc2V0ICsgMTtcclxuXHJcbiAgICAvL+WkqeW5suWcsOaUr+WkhOeQhlxyXG4gICAgdmFyIHNtID0gbm93U2VsZWN0TW9udGggLSAxO1xyXG4gICAgdmFyIGdhblpoaVllYXIgPSB0aGlzLl9nZXRHYW5aaGlZZWFyKHllYXIpO1xyXG5cclxuICAgIC8v5pyI5p+x5o6o566X6KGoXHJcbiAgICAvLzE5MDDlubQx5pyI5bCP5a+S5Lul5YmN5Li6IOS4meWtkOaciCg2MOi/m+WItjEyKVxyXG4gICAgdmFyIF9maXJzdENhbGVuZGFyaWNpdHlEYXkgPSB0aGlzLl9nZXRDYWxlbmRhcmljaXR5KG5vd1NlbGVjdFllYXIsIChub3dTZWxlY3RNb250aCAqIDIgLSAxKSk7Ly/ov5Tlm57lvZPmnIjjgIzoioLjgI3kuLrlh6Dml6XlvIDlp4tcclxuICAgIHZhciBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSA9IHRoaXMuX2dldENhbGVuZGFyaWNpdHkobm93U2VsZWN0WWVhciwgKG5vd1NlbGVjdE1vbnRoICogMikpOy8v6L+U5Zue5b2T5pyI44CM6IqC44CN5Li65Yeg5pel5byA5aeLXHJcbiAgICAvL+S+neaNrjEy6IqC5rCU5L+u5q2j5bmy5pSv5pyIXHJcbiAgICBsZXQgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMSk7XHJcbiAgICBpZiAobm93U2VsZWN0RGF5ID49IF9maXJzdENhbGVuZGFyaWNpdHlEYXkpIHtcclxuICAgICAgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMik7XHJcbiAgICB9XHJcbiAgICBsZXQgY2FsZW5kYXJpY2l0eSA9IHRoaXMuX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eShfZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSwgbm93U2VsZWN0RGF5LCBub3dTZWxlY3RNb250aClcclxuXHJcbiAgICAvL+aXpeafseaOqOeul+ihqCDlvZPmnIjkuIDml6XkuI4gMTkwMC8xLzEg55u45beu5aSp5pWwXHJcbiAgICBjb25zdCBkYXlDeWNsaWNhbCA9IERhdGUuVVRDKG5vd1NlbGVjdFllYXIsIHNtLCAxLCAwLCAwLCAwLCAwKSAvIDg2NDAwMDAwICsgMjU1NjcgKyAxMDtcclxuICAgIGNvbnN0IGdhblpoaURheSA9IHRoaXMuX2dldEdhblpoaShkYXlDeWNsaWNhbCArIG5vd1NlbGVjdERheSAtIDEpO1xyXG4gICAgLy/or6Xml6XmnJ/miYDlsZ7nmoTmmJ/luqdcclxuICAgIGNvbnN0IGFzdHJvID0gdGhpcy5fZ2V0QXN0cm9sb2d5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpO1xyXG5cclxuICAgIGNvbnN0IHpvZGlhYyA9IHRoaXMuX2dldFpvZGlhYyh5ZWFyKVxyXG4gICAgY29uc3QgY2hpbmFNb250aCA9IHRoaXMuX2dldENoaW5hTW9udGgobW9udGgpXHJcbiAgICBjb25zdCBjaGluYURheSA9IHRoaXMuX2dldENoaW5hRGF5KGRheSlcclxuICAgIGNvbnN0IGx1bmFySG9saWRheSA9IHRoaXMuX2dldEx1bmFySG9saWRheShtb250aCwgZGF5KVxyXG4gICAgY29uc3Qgc29sYXJIb2xpZGF5ID0gdGhpcy5fZ2V0U29sYXJIb2xpZGF5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpXHJcbiAgICByZXR1cm4geyAnbHVuYXJZZWFyJzogeWVhciwgJ2x1bmFyTW9udGgnOiBtb250aCwgJ2x1bmFyRGF5JzogZGF5LCAnem9kaWFjJzogem9kaWFjLCAnY2hpbmFNb250aCc6IChpc0xlYXAgPyBcIumXsFwiIDogJycpICsgY2hpbmFNb250aCwgJ2NoaW5hRGF5JzogY2hpbmFEYXksICdzb2xhclllYXInOiBub3dTZWxlY3RZZWFyLCAnc29sYXJNb250aCc6IG5vd1NlbGVjdE1vbnRoLCAnc29sYXJEYXknOiBub3dTZWxlY3REYXksICdnYW5aaGlZZWFyJzogZ2FuWmhpWWVhciwgJ2dhblpoaU1vbnRoJzogZ2FuWmhpTW9udGgsICdnYW5aaGlEYXknOiBnYW5aaGlEYXksICdpc1RvZGF5JzogaXNUb2RheSwgJ2lzTGVhcCc6IGlzTGVhcCwgJ25XZWVrJzogbldlZWssICduY1dlZWsnOiBcIuaYn+acn1wiICsgY1dlZWssICdjYWxlbmRhcmljaXR5JzogY2FsZW5kYXJpY2l0eSwgJ2FzdHJvJzogYXN0cm8sIFwibHVuYXJIb2xpZGF5XCI6IGx1bmFySG9saWRheSwgXCJzb2xhckhvbGlkYXlcIjogc29sYXJIb2xpZGF5IH07XHJcbiAgfVxyXG59XHJcbmxldCBsdW5hckNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoKVxyXG5leHBvcnQgZGVmYXVsdCBsdW5hckNhbGVuZGFyXHJcblxyXG5cclxuXHJcbi8vKioqKioqKioqKioqKioqKuWIhuWJsue6v2phdmHniYjmnKwqKioqKioqKioqKioqKiogKi9cclxuLy8gaW1wb3J0IGphdmEudGV4dC5QYXJzZUV4Y2VwdGlvbjtcclxuLy8gaW1wb3J0IGphdmEudGV4dC5TaW1wbGVEYXRlRm9ybWF0O1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkRhdGU7XHJcbi8vIGltcG9ydCBqYXZhLnV0aWwuTG9jYWxlO1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkNhbGVuZGFyO1xyXG5cclxuLy8gY2xhc3MgTHVuYXJDYWxlbmRhciB7XHJcbi8vICAgICBwcml2YXRlIGludCB5ZWFyOyAvLyDlhazljoblubRcclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoOy8vIOWFrOWOhuaciFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5Oy8vIOWFrOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJZZWFyOy8vIOmYtOWOhuW5tFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJNb250aDsvLyDpmLTljobmnIhcclxuLy8gICAgIHByaXZhdGUgaW50IGx1bmFyRGF5Oy8vIOmYtOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbGVhcE1vbnRoID0gMDsgLy8g6Zi05Y6G6Zew55qE5pyIXHJcbi8vICAgICBwcml2YXRlIGludCBkYXlzT2ZNb250aCA9IDA7IC8vIOafkOaciOeahOWkqeaVsFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5T2ZXZWVrID0gMDsgLy8g5YW35L2T5p+Q5LiA5aSp5piv5pif5pyf5YegXHJcblxyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nIGNoaW5lc2VNb250aE51bWJlcltdID0geyBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWNgeS4gFwiLCBcIuWNgeS6jFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBab2RpYWMgPSBuZXcgU3RyaW5nW10geyBcIum8oFwiLCBcIueJm1wiLCBcIuiZjlwiLCBcIuWFlFwiLCBcIum+mVwiLCBcIuibh1wiLCBcIumprFwiLCBcIue+ilwiLCBcIueMtFwiLCBcIum4oVwiLCBcIueLl1wiLCBcIueMqlwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBHYW4gPSBuZXcgU3RyaW5nW10geyBcIueUslwiLCBcIuS5mVwiLCBcIuS4mVwiLCBcIuS4gVwiLCBcIuaIilwiLCBcIuW3sVwiLCBcIuW6mlwiLCBcIui+m1wiLCBcIuWjrFwiLCBcIueZuFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBaaGkgPSBuZXcgU3RyaW5nW10geyBcIuWtkFwiLCBcIuS4kVwiLCBcIuWvhVwiLCBcIuWNr1wiLCBcIui+sFwiLCBcIuW3s1wiLCBcIuWNiFwiLCBcIuacqlwiLCBcIueUs1wiLCBcIumFiVwiLCBcIuaIjFwiLCBcIuS6pVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmcgY2hpbmVzZVRlbkNoYXJbXSA9IHsgXCLliJ1cIiwgXCLljYFcIiwgXCLlu79cIiwgXCLljYVcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gbHVuYXJIb2xpZGF5ID0gbmV3IFN0cmluZ1tdIHsgXCIwMTAxIOaYpeiKglwiLCBcIjAxMTUg5YWD5a61XCIsIFwiMDUwNSDnq6/ljYhcIiwgXCIwNzA3IOaDheS6ulwiLCBcIjA3MTUg5Lit5YWDXCIsXHJcbi8vICAgICAgICAgICAgIFwiMDgxNSDkuK3np4tcIiwgXCIwOTA5IOmHjemYs1wiLCBcIjEyMDgg6IWK5YWrXCIsIFwiMTIyNCDlsI/lubRcIiwgXCIwMTAwIOmZpOWklVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBzb2xhckhvbGlkYXkgPSBuZXcgU3RyaW5nW10geyAvL1xyXG4vLyAgICAgICAgICAgICBcIjAxMDEg5YWD5pemXCIsIFwiMDIxNCDmg4XkurpcIiwgXCIwMzA4IOWmh+Wls1wiLCBcIjAzMTIg5qSN5qCRXCIsIFwiMDMxNSDmtojotLnogIXmnYPnm4rml6VcIiwgXCIwNDAxIOaEmuS6ulwiLCBcIjA1MDEg5Yqz5YqoXCIsIFwiMDUwNCDpnZLlubRcIiwgLy9cclxuLy8gICAgICAgICAgICAgXCIwNTEyIOaKpOWjq1wiLCBcIjA2MDEg5YS/56ulXCIsIFwiMDcwMSDlu7rlhZpcIiwgXCIwODAxIOW7uuWGm1wiLCBcIjA4MDgg54i25LqyXCIsIFwiMDkxMCDmlZnluIhcIiwgXCIwOTI4IOWtlOWtkOivnui+sFwiLCAvL1xyXG4vLyAgICAgICAgICAgICBcIjEwMDEg5Zu95bqGXCIsIFwiMTAwNiDogIHkurpcIiwgXCIxMDI0IOiBlOWQiOWbveaXpVwiLCBcIjExMTIg5a2Z5Lit5bGx6K+e6L6w57qq5b+1XCIsIFwiMTIyMCDmvrPpl6jlm57lvZLnuqrlv7VcIiwgXCIxMjI1IOWco+ivnlwiIH07XHJcbi8vICAgICBwcml2YXRlIHN0YXRpYyBTaW1wbGVEYXRlRm9ybWF0IGNoaW5lc2VEYXRlRm9ybWF0ID0gbmV3IFNpbXBsZURhdGVGb3JtYXQoXCJ5eXl55bm0TU3mnIhkZOaXpVwiLCBMb2NhbGUuQ0hJTkEpO1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgbG9uZ1tdIGx1bmFySW5mbyA9IG5ldyBsb25nW10geyAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YmQ4LCAweDA0YWUwLCAweDBhNTcwLCAweDA1NGQ1LCAweDBkMjYwLCAweDBkOTUwLCAweDE2NTU0LCAweDA1NmEwLCAweDA5YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA1NWQyLCAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NWIwLCAweDE0OTc3LCAweDA0OTcwLCAweDBhNGIwLCAweDBiNGI1LCAweDA2YTUwLCAweDA2ZDQwLCAweDFhYjU0LCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NTcwLCAweDA1MmYyLCAweDA0OTcwLCAweDA2NTY2LCAweDBkNGEwLCAweDBlYTUwLCAweDA2ZTk1LCAweDA1YWQwLCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE4NmUzLCAweDA5MmUwLCAweDFjOGQ3LCAweDBjOTUwLCAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAvL1xyXG4vLyAgICAgICAgICAgICAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LCAweDA2Y2EwLCAweDBiNTUwLCAweDE1MzU1LCAweDA0ZGEwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNWQwLCAweDE0NTczLCAweDA1MmQwLCAweDBhOWE4LCAweDBlOTUwLCAweDA2YWEwLCAweDBhZWE2LCAweDBhYjUwLCAweDA0YjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhYWU0LCAweDBhNTcwLCAweDA1MjYwLCAweDBmMjYzLCAweDBkOTUwLCAweDA1YjU3LCAweDA1NmEwLCAweDA5NmQwLCAweDA0ZGQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNWEwLCAweDE5NWE2LCAweDA5NWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0OWIwLCAweDBhOTc0LCAweDBhNGIwLCAweDBiMjdhLCAweDA2YTUwLCAweDA2ZDQwLCAweDBhZjQ2LCAweDBhYjYwLCAweDA5NTcwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWY1LCAweDA0OTcwLCAweDA2NGIwLCAweDA3NGEzLCAweDBlYTUwLCAweDA2YjU4LCAweDA1NWMwLCAweDBhYjYwLCAweDA5NmQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmUwLCAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmQwLCAweDBjYWI1LCAweDBhOTUwLCAweDBiNGEwLCAweDBiYWE0LCAweDBhZDUwLCAweDA1NWQ5LCAweDA0YmEwLCAweDBhNWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE1MTc2LCAweDA1MmIwLCAweDBhOTMwLCAweDA3OTU0LCAweDA2YWEwLCAweDBhZDUwLCAweDA1YjUyLCAweDA0YjYwLCAweDBhNmU2LCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGUwLCAweDBkMjYwLCAweDBlYTY1LCAweDBkNTMwLCAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YmQ3LCAweDA0YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LCAweDBiNWEwLCAweDA1NmQwLCAweDA1NWIyLCAweDA0OWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNTc3LCAweDBhNGIwLCAweDBhYTUwLCAweDFiMjU1LCAweDA2ZDIwLCAweDBhZGEwIH07XHJcblxyXG4vLyAgICAgcHVibGljIEx1bmFyQ2FsZW5kYXIoaW50IHllYXIsIGludCBtb250aCwgaW50IGRheSkge1xyXG4vLyAgICAgICAgIHRoaXMueWVhciA9IHllYXI7XHJcbi8vICAgICAgICAgdGhpcy5tb250aCA9IG1vbnRoO1xyXG4vLyAgICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4vLyAgICAgICAgIHRoaXMuaW5pdEx1bmFyRGF0ZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcHJpdmF0ZSB2b2lkIGluaXRMdW5hckRhdGUoKXtcclxuLy8gICAgICAgICBTdHJpbmcgbm93YWRheXM7XHJcbi8vICAgICAgICAgRGF0ZSBiYXNlRGF0ZSA9IG51bGw7XHJcbi8vICAgICAgICAgRGF0ZSBub3dhZGF5ID0gbnVsbDtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBiYXNlRGF0ZSA9IGNoaW5lc2VEYXRlRm9ybWF0LnBhcnNlKFwiMTkwMOW5tDHmnIgzMeaXpVwiKTtcclxuLy8gICAgICAgICB9IGNhdGNoIChQYXJzZUV4Y2VwdGlvbiBlKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJpbnRTdGFja1RyYWNlKCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBub3dhZGF5cyA9IHRoaXMueWVhciArIFwi5bm0XCIgKyB0aGlzLm1vbnRoICsgXCLmnIhcIiArIHRoaXMuZGF5ICsgXCLml6VcIjtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBub3dhZGF5ID0gY2hpbmVzZURhdGVGb3JtYXQucGFyc2Uobm93YWRheXMpO1xyXG4vLyAgICAgICAgIH0gY2F0Y2ggKFBhcnNlRXhjZXB0aW9uIGUpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmludFN0YWNrVHJhY2UoKTtcclxuXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvLyDkuI4xOTAw5bm0MeaciDMx5pel55u45beu55qE5aSp5pWwXHJcbi8vICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpICgobm93YWRheS5nZXRUaW1lKCkgLSBiYXNlRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDBMKTtcclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog55Sob2Zmc2V05YeP5Y675q+P5Yac5Y6G5bm055qE5aSp5pWwXHJcbi8vICAgICAgICAgIOiuoeeul+W9k+WkqeaYr+WGnOWOhuesrOWHoOWkqVxyXG4vLyAgICAgICAgICBpWWVhcuacgOe7iOe7k+aenOaYr+WGnOWOhueahOW5tOS7vVxyXG4vLyAgICAgICAgICBvZmZzZXTkuLrlvZPlubTnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBpbnQgaVllYXIsIGRheXNPZlllYXIgPSAwO1xyXG4vLyAgICAgICAgIGZvciAoaVllYXIgPSAxOTAwOyBpWWVhciA8IDIxMDEgJiYgb2Zmc2V0ID4gMDsgaVllYXIrKykge1xyXG4vLyAgICAgICAgICAgICBkYXlzT2ZZZWFyID0gZGF5c0luTHVuYXJZZWFyKGlZZWFyKTtcclxuLy8gICAgICAgICAgICAgb2Zmc2V0IC09IGRheXNPZlllYXI7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZZZWFyO1xyXG4vLyAgICAgICAgICAgICBpWWVhci0tO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgbGVhcE1vbnRoID0gZ2V0TGVhcE1vbnRoKGlZZWFyKTsgLy8g5Yac5Y6G6Zew6YKj5Liq5pyIXHJcbi8vICAgICAgICAgYm9vbGVhbiBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIC8vIOeUqOW9k+W5tOeahOWkqeaVsG9mZnNldCzpgJDkuKrlh4/ljrvmr4/mnIjvvIjlhpzljobvvInnmoTlpKnmlbDvvIzmsYLlh7rlvZPlpKnmmK/mnKzmnIjnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICBpbnQgaU1vbnRoLCBkYXlzT2ZNb250aCA9IDA7XHJcbi8vICAgICAgICAgZm9yIChpTW9udGggPSAxOyBpTW9udGggPCAxMyAmJiBvZmZzZXQgPiAwOyBpTW9udGgrKykge1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IChsZWFwTW9udGggKyAxKSAmJiAhbGVhcCkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8g6Zew5pyIXHJcbi8vICAgICAgICAgICAgICAgICAtLWlNb250aDtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSBsZWFwRGF5SW5MdW5hcih5ZWFyKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IG1vbnRoRGF5c0luTHVuYXIoeWVhciwgaU1vbnRoKTtcclxuXHJcbi8vICAgICAgICAgICAgIG9mZnNldCAtPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLy8g6Kej6Zmk6Zew5pyIXHJcbi8vICAgICAgICAgICAgIGlmIChsZWFwICYmIGlNb250aCA9PSAobGVhcE1vbnRoICsgMSkpXHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvLyBvZmZzZXTkuLow5pe277yM5bm25LiU5Yia5omN6K6h566X55qE5pyI5Lu95piv6Zew5pyI77yM6KaB5qCh5q2jXHJcbi8vICAgICAgICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IGxlYXBNb250aCArIDEpIHtcclxuLy8gICAgICAgICAgICAgaWYgKGxlYXApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLy8gb2Zmc2V05bCP5LqOMOaXtu+8jOS5n+imgeagoeato1xyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgICAvLyDlhpzljoblubTku71cclxuLy8gICAgICAgICBsdW5hclllYXIgPSBpWWVhcjtcclxuLy8gICAgICAgICBsdW5hck1vbnRoID0gaU1vbnRoO1xyXG4vLyAgICAgICAgIGx1bmFyRGF5ID0gb2Zmc2V0ICsgMTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTnmoTmgLvlpKnmlbBcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5bm055qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IGRheXNJbkx1bmFyWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGludCBpLCBzdW0gPSAzNDg7XHJcbi8vICAgICAgICAgZm9yIChpID0gMHg4MDAwOyBpID4gMHg4OyBpID4+PSAxKSB7XHJcbi8vICAgICAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmIGkpICE9IDApXHJcbi8vICAgICAgICAgICAgICAgICBzdW0gKz0gMTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIChzdW0gKyBsZWFwRGF5SW5MdW5hcih5ZWFyKSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lhpzljoYgeWVhcuW5tOmXsOaciOeahOWkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBsZWFwRGF5SW5MdW5hcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGlmIChnZXRMZWFwTW9udGgoeWVhcikgIT0gMCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiAweDEwMDAwKSAhPSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMzA7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMjk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDA7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIOWGnOWOhumXsOmCo+S4quaciFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZ2V0TGVhcE1vbnRoKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIChpbnQpIChsdW5hckluZm9beWVhciAtIDE5MDBdICYgMGIxMTExKTtcclxuLy8gICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Lyg5Zue5Yac5Y6GIHllYXLlubRtb250aOaciOeahOaAu+WkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyICDlubTku71cclxuLy8gICAgICAqIEBwYXJhbSBtb250aCDmnIjku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5pyI5Lu955qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoRGF5c0luTHVuYXIoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPT0gMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDI5O1xyXG4vLyAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDMwO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOeahOeUn+iCllxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVybiDnlJ/ogpZcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Wm9kaWFjWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIHJldHVybiBab2RpYWNbKHllYXIgLSA0KSAlIDEyXTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWvueW6lOW5tOeahOW5suaUr1xyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRHYW5aaGkoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpbnQgbnVtID0geWVhciAtIDE5MDAgKyAzNjtcclxuLy8gICAgICAgICByZXR1cm4gKEdhbltudW0gJSAxMF0gKyBaaGlbbnVtICUgMTJdKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuW9k+WJjeW5tOS7veeahOW5suaUr1xyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFllYXJHYW5aaGkoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldEdhblpoaSh0aGlzLnllYXIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5bm05Lu955qE55Sf6IKWXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50WWVhclpvZGlhYygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0Wm9kaWFjWWVhcih0aGlzLmx1bmFyWWVhcik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Q2hpbmFEYXlTdHJpbmcoaW50IGRheSkge1xyXG5cclxuLy8gICAgICAgICBpbnQgbiA9IGRheSAlIDEwID09IDAgPyA5IDogZGF5ICUgMTAgLSAxO1xyXG4vLyAgICAgICAgIGlmIChkYXkgPiAzMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgICAgICAgaWYgKGRheSA9PSAxMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwi5Yid5Y2BXCI7XHJcbi8vICAgICAgICAgZWxzZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY2hpbmVzZVRlbkNoYXJbZGF5IC8gMTBdICsgY2hpbmVzZU1vbnRoTnVtYmVyW25dO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5Yac5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudEx1bmFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRMdW5hckhvbGlkYXkodGhpcy5sdW5hck1vbnRoLHRoaXMubHVuYXJEYXkpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5YWs5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFNvbGFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRTb2xhckhvbGlkYXkodGhpcy5tb250aCx0aGlzLmRheSk7XHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5a+55bqU6Zi05Y6G55qE5pel5pyfXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldEx1bmFyRGF0ZSgpIHtcclxuLy8gICAgICAgICByZXR1cm4gY2hpbmVzZU1vbnRoTnVtYmVyW2x1bmFyTW9udGggLSAxXSArIFwi5pyIXCIgKyBnZXRDaGluYURheVN0cmluZyhsdW5hckRheSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lr7nlupTml6XmnJ/nmoTlhazljoboioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOWFrOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOWFrOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRTb2xhckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzb2xhckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZCA9IHNvbGFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZHYgPSBzb2xhckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHNtZCA9IHNtb250aF92ICsgc2RheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAoc2QudHJpbSgpLmVxdWFscyhzbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHNkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKioqXHJcbi8vICAgICAgKiDojrflj5bpmLTljoblr7nlupTnmoToioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOmYtOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOmYtOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRMdW5hckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsdW5hckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgLy8g6L+U5Zue5Yac5Y6G6IqC5YGH5pel5ZCN56ewXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZCA9IGx1bmFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZHYgPSBsdW5hckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGxtZCA9IGxtb250aF92ICsgbGRheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAobGQudHJpbSgpLmVxdWFscyhsbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGxkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuLy8gICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuaYr+WQpuS4uumXsOW5tFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgYm9vbGVhbiBpc0xlYXBZZWFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaWYgKHllYXIgJSAxMDAgPT0gMCAmJiB5ZWFyICUgNDAwID09IDApIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfSBlbHNlIGlmICh5ZWFyICUgMTAwICE9IDAgJiYgeWVhciAlIDQgPT0gMCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Yik5pat5YWs5Y6G5a+55bqU5bm05pyI55qE5aSp5pWwXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSBpc0xlYXBZZWFyXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGhcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIGludCBnZXREYXlzT2ZNb250aChib29sZWFuIGlzTGVhcFllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIHN3aXRjaCAobW9udGgpIHtcclxuLy8gICAgICAgICBjYXNlIDE6XHJcbi8vICAgICAgICAgY2FzZSAzOlxyXG4vLyAgICAgICAgIGNhc2UgNTpcclxuLy8gICAgICAgICBjYXNlIDc6XHJcbi8vICAgICAgICAgY2FzZSA4OlxyXG4vLyAgICAgICAgIGNhc2UgMTA6XHJcbi8vICAgICAgICAgY2FzZSAxMjpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMTtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSA0OlxyXG4vLyAgICAgICAgIGNhc2UgNjpcclxuLy8gICAgICAgICBjYXNlIDk6XHJcbi8vICAgICAgICAgY2FzZSAxMTpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMDtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSAyOlxyXG4vLyAgICAgICAgICAgICBpZiAoaXNMZWFwWWVhcikge1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSAyOTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMjg7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBkYXlzT2ZNb250aDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuW5tOaciOaXpeWxnuS6juaYn+acn+WHoFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBpbnQgZ2V0V2Vla2RheU9mTW9udGgoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIENhbGVuZGFyIGNhbCA9IENhbGVuZGFyLmdldEluc3RhbmNlKCk7XHJcbi8vICAgICAgICAgY2FsLnNldCh5ZWFyLCBtb250aCAtIDEsIDEpO1xyXG4vLyAgICAgICAgIGRheU9mV2VlayA9IGNhbC5nZXQoQ2FsZW5kYXIuREFZX09GX1dFRUspIC0gMTtcclxuLy8gICAgICAgICByZXR1cm4gZGF5T2ZXZWVrO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHtcclxuLy8gICAgICAgICBMdW5hckNhbGVuZGFyIGNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoMjAxOSwgOSwgMTMpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEx1bmFyRGF0ZSgpOlwiICsgY2FsZW5kYXIuZ2V0THVuYXJEYXRlKCkpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKTpcIiArIGNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKSk7XHJcbi8vICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKFwiY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpOlwiICsgY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9