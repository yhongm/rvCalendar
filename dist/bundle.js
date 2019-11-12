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

/***/ "./node_modules/yhongm_rv.js/src/rv.js":
/*!*********************************************!*\
  !*** ./node_modules/yhongm_rv.js/src/rv.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);



const NODE_REPLACE = 0 //node replace 
const CHILD_RE_ORDER = 1 //child node re order
const NODE_PROPS = 2 //prop change 
const NODE_CONTENT = 3 //content change
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
            Util.setAttr(el, propName, props[propName])
        }
        this.children.forEach(child => {
            const childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })
        return el;
    }
}

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

        } else if (Util.isString(oldNode) && Util.isString(newNode)) {
            if (oldNode != newNode) {
                currentPatch.push({
                    type: NODE_CONTENT,
                    content: newNode
                })
            }
        } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
            let propsPatches = this.diffProps(oldNode, newNode)
            if (propsPatches) {
                currentPatch.push({
                    type: NODE_PROPS,
                    props: propsPatches
                })
            }
            if (!Util.isIgnoreChildren(newNode)) {
                this.diffChildren(oldNode.children, newNode.children, index, currentPatch)
            }
        } else {
            currentPatch.push({
                type: NODE_REPLACE,
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
        let diffList = new DiffList(oldChildren, newChildren)
        let diffs = diffList.getResult()
        newChildren = diffs.child
        if (diffs.moves.length) {
            let reorderPatch = {
                type: CHILD_RE_ORDER,
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
                case NODE_REPLACE:
                    let newNode = Util.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render()
                    node.parentNode.replaceChild(newNode, node)
                    break
                case CHILD_RE_ORDER:
                    this.reorderChildren(node, currentPatch.moves)
                    break
                case NODE_PROPS:
                    this.setProps(node, currentPatch.props)
                    break
                case NODE_CONTENT:
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
        let staticNodeList = Util.toArray(node.childNodes)
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
                    Util.isString(move.item) ? document.createTextNode(move.item) : move.item.render()
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
                Util.setAttr(node, key, value)
            }
        }

    }
}




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



function Observable() {
    this.updateFunctions = new Set()
}
Observable.prototype.add = function (observableUpdate) {
    this.updateFunctions.add(observableUpdate)
}
Observable.prototype.invoke = function () {
    this.updateFunctions.forEach(fun => fun())
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
    return new Element(tagName, props, children)
}

function diff(oldTree, newTree) {
    let d = new Diff(oldTree, newTree)
    return d.patches
}


function patch(node, patches) {
    return new Patch(node, patches)
}





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
    size() {
        return this.length;
    }
    clear() {
        length = 0;
        this.map = new Object();
    }
}
/**
 * this class is parse html template to virtual dom tree
 * @author yhongm
 */
class YhmParse {
    constructor() {
        this.mIndex = 0
        this.mMap = new Map()
        this.mPropRe = /([^=\s]+)(\s*=\s*((\"([^"]*)\")|(\'([^']*)\')|[^>\s]+))?/gm
        this.mHandler = {
            startELement: function (tagName, prop, content, that) {
                that.mIndex += 1
                var obj = { tag: tagName, props: prop, children: [], index: that.mIndex, content: content, isClose: false }

                if (content.length > 0) {

                    obj.children.push(content.trim())
                }
                that.mMap.put(that.mIndex, obj)
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
        console.log(`total parse time:${endTime - startTime}`)



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

class RV {
    constructor(option) {
        try {
            const {
                el,
                data,
                template
            } = option
            let parse = new YhmParse()
            parse.parseHtmlTemplate(template.trim())

            let dom = parse.getHtmlDom()
            let root = Util.isString(el) ? document.querySelector(el) : el
            this.data = data
            this.ve = this.getVirtualElement(this.applyTruthfulData(dom))
            this.w = this.ve.render()
            root.appendChild(this.w)
            this.observeMap = new Map()
            observe(this.data, this.observeMap, () => {
                this.updatedom(dom)
            })
            this.updatedom(dom)
        } catch (e) {
            console.error(`rv e:${e}`)
        }


    }
    updatedom(dom) {
        let nve = this.getVirtualElement(this.applyTruthfulData(dom))
        window.nve = nve
        window.ve = this.ve
        patch(this.w, diff(this.ve, nve))
        this.ve = nve
    }
    watch(key, callback) {
        this.observeMap.get(key).add(callback)
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

        return h(dom.tag, dom.props, children)
    }
    applyTruthfulData(dom) {
        if ("for" in dom.props) {
            let dataArray = []
            let dataSingle

            if (Util.isForIn(dom.props['for'])) {
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

            let obj = this.vdom2rdom(dom, data, childDomDatakey, this.data)

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
                if (Util.isPlaceHolder(dom.props[value])) {
                    if (!Util.isDotOperatorExpression(Util.getPlaceHolderValue(dom.props[value]))) {
                        obj.props[value] = tdata[Util.getPlaceHolderValue(dom.props[value])]
                    } else {
                        obj.props[value] = data[Util.getPlaceHolderValue(dom.props[value]).split(".")[1]]
                    }
                } else if (Util.isOperatorExpression(dom.props[value])) {

                    obj.props[value] = Util.getOperatorExpression(dom.props[value], data, dataSingle)
                }
                else {
                    obj.props[value] = dom.props[value]
                }

            }

        }

        for (let child in dom.children) {
            if (Util.isString(dom.children[child])) {
                if (Util.isPlaceHolder(dom.children[child])) {
                    if (Util.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                        obj.children[child] = tdata[Util.getPlaceHolderValue(dom.children[child])]

                    } else {
                        obj.children[child] = data[Util.getPlaceHolderValue(dom.children[child]).split(".")[1]]
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
            if (Util.isPlaceHolder(style)) {
                if (Util.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    let key = Util.getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    let styleKey = style.split(":")[0]
                    let styleValue = style.split(":")[1]
                    styleValue = data[Util.getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {

            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (Util.isPlaceHolder(styleValue)) {

                styleValue = data[Util.getPlaceHolderValue(styleValue)]
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

/* harmony default export */ __webpack_exports__["default"] = (RV);

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

var _yhongm_rv = __webpack_require__(/*! yhongm_rv.js */ "./node_modules/yhongm_rv.js/src/rv.js");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2FsZW5kYXJEZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95aG9uZ21fcnYuanMvc3JjL3J2LmpzIiwid2VicGFjazovLy8uL3NyYy9SVmNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9sdW5hci5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJvbmxvYWQiLCJzZWxlY3REYXkiLCJjb25zb2xlIiwibG9nIiwiZ2VuZXJhdGVWaWV3IiwiQ2FsZW5kYXIiLCJtb250aHMiLCJBcnJheSIsImRheUNvdW50cyIsImRheXMiLCJ0b2RheSIsImdldFRvZGF5IiwieWVhciIsIm1vbnRoIiwibmV3Q2FsIiwiRGF0ZSIsImRheSIsInN0YXJ0RGF5IiwiZGFpbHkiLCJydiIsInVuZGVmaW5lZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwcm90b3R5cGUiLCJnZXRXZWVrcyIsImdldERheSIsImdldERheUNvdW50cyIsIndlZWtzIiwiaSIsImRheUluV2Vla3MiLCJpZCIsImoiLCJfY2VsbE9iaiIsImNvbnRlbnQiLCJzdHlsZSIsImxhYmxlIiwibHVuYXIiLCJsdW5hckNhbGVuZGFyIiwiZ2V0THVuYXIiLCJsdW5hckluZm8iLCJjYWxlbmRhcmljaXR5Iiwic29sYXJIb2xpZGF5IiwibHVuYXJIb2xpZGF5IiwiY2hpbmFEYXkiLCJjaGluYU1vbnRoIiwicHVzaCIsIl9vYmoiLCJub3ciLCJnZXREYXRlIiwic3ViTW9udGgiLCJhZGRNb250aCIsInNldE1vbnRoIiwiYWxlcnQiLCJzZXRZZWFyIiwibW91c2VPdmVyIiwiZWxlbWVudCIsImNvbG9yIiwibW91c2VPdXQiLCJsYWJlbCIsImdldEF0dHJpYnV0ZSIsIm1DYWxlbmRhciIsImNsaWNrRGF5IiwiaW5uZXJUZXh0IiwiY2hpbGRyZW4iLCJlbCIsImNhbGxiYWNrIiwiUlYiLCJkYXRhIiwid2Vla1RpdGxlcyIsInZhbHVlIiwidGVtcGxhdGUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInNldCIsIm52YWx1ZSIsImdldCIsIkx1bmFyQ2FsZW5kYXIiLCJfeWVhckluZm8iLCJfYXN0cm9sb2d5IiwiX2RheUluTW9udGgiLCJfVGlhbkdhbiIsIl9EaVpoaSIsIl9ab2RpYWMiLCJfY2FsZW5kYXJpY2l0eSIsIl9sdW5hckhvbGlkYXkiLCJfc29sYXJIb2xpZGF5IiwiX2NhbGVuZGFyaWNpdHlUYWJsZSIsIl9jaGluZXNlQ2hhciIsIl9jaGluZXNlVGVuQ2hhciIsIl9sdW5hck1vbnRoVGFibGUiLCJzdW0iLCJfbGVhcERheXNJbkx1bmFyWWVhciIsIl9sZWFwTW9udGhJbkx1bmFyWWVhciIsIm1zIiwiZ2FuS2V5IiwiemhpS2V5IiwiY01vbnRoIiwiY0RheSIsImFyciIsIm9mZnNldCIsImluZGV4IiwiX3RhYmxlIiwiX2NhbGVuZGFyaWNpdHlJbmZvIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1N0cmluZyIsIl9jYWxkYXkiLCJzIiwiTWF0aCIsImZsb29yIiwibHVuYXJIb2xpZGF5U3RyIiwiZm9yRWFjaCIsImxkIiwic3BsaXQiLCJsZHYiLCJsbW9udGhfdiIsImxkYXlfdiIsImxtZCIsInRyaW0iLCJzb2xhckhvbGlkYXlTdHIiLCJzZCIsInNvbGFyIiwic2R2Iiwic21vbnRoX3YiLCJzZGF5X3YiLCJzbWQiLCJmaXJzdENhbGVuZGFyaWNpdHlEYXkiLCJzZWNvbmRDYWxlbmRhcmljaXR5RGF5Iiwibm93U2VsZWN0RGF5Iiwibm93U2VsZWN0TW9udGgiLCJjYWxlbmRhcmljaXR5U3RyIiwic29sYXJZZWFyIiwic29sYXJNb250aCIsInNvbGFyRGF5Iiwibm93U2VsZWN0RGF0ZSIsIm5vd1NlbGVjdFllYXIiLCJVVEMiLCJ0ZW1wWWVhciIsImxlYXAiLCJ0ZW1wIiwiX2x1bmFyWWVhckRheXMiLCJpc1RvZGF5T2JqIiwiaXNUb2RheSIsIm5XZWVrIiwiY1dlZWsiLCJpc0xlYXAiLCJ0ZW1wTW9udGgiLCJfbW9udGhEYXlzIiwic20iLCJnYW5aaGlZZWFyIiwiX2dldEdhblpoaVllYXIiLCJfZmlyc3RDYWxlbmRhcmljaXR5RGF5IiwiX2dldENhbGVuZGFyaWNpdHkiLCJfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSIsImdhblpoaU1vbnRoIiwiX2dldEdhblpoaSIsIl9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkiLCJkYXlDeWNsaWNhbCIsImdhblpoaURheSIsImFzdHJvIiwiX2dldEFzdHJvbG9neSIsInpvZGlhYyIsIl9nZXRab2RpYWMiLCJfZ2V0Q2hpbmFNb250aCIsIl9nZXRDaGluYURheSIsIl9nZXRMdW5hckhvbGlkYXkiLCJfZ2V0U29sYXJIb2xpZGF5Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7Ozs7OztBQUNJQSxPQUFPQyxNQUFQLEdBQWdCLFlBQVk7QUFDNUIsOEJBQWEsTUFBYixFQUFxQixVQUFVQyxTQUFWLEVBQXFCO0FBQ3RDQyxnQkFBUUMsR0FBUixDQUFZLGFBQVdGLFNBQXZCO0FBQ0gsS0FGRDtBQUVHLENBSEgsQzs7Ozs7Ozs7Ozs7Ozs7OztBQ0VKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxFQUFFO0FBQ2pCLGVBQWUsRUFBRTtBQUNqQixlQUFlLEVBQUU7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEVBQUU7QUFDakIsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7OztBQUdUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0IsV0FBVzs7QUFFL0I7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZEQUE2RCwwQkFBMEI7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RixpQkFBaUI7O0FBRTlHOzs7QUFHQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsRUFBRTtBQUNqQixlQUFlLEVBQUU7QUFDakIsZUFBZSxFQUFFO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixvQkFBb0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsV0FBVyxFQUFFO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEkiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9jYWxlbmRhckRlbW8uanNcIik7XG4iLCJpbXBvcnQgZ2VuZXJhdGVWaWV3IGZyb20gJy4vc3JjL1JWY2FsZW5kYXInXHJcbiAgICB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2VuZXJhdGVWaWV3KFwiI2FwcFwiLCBmdW5jdGlvbiAoc2VsZWN0RGF5KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzZWxlY3QsOlwiK3NlbGVjdERheSlcclxuICAgIH0pfSIsIlxyXG5cclxuXHJcbmNvbnN0IE5PREVfUkVQTEFDRSA9IDAgLy9ub2RlIHJlcGxhY2UgXHJcbmNvbnN0IENISUxEX1JFX09SREVSID0gMSAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcclxuY29uc3QgTk9ERV9QUk9QUyA9IDIgLy9wcm9wIGNoYW5nZSBcclxuY29uc3QgTk9ERV9DT05URU5UID0gMyAvL2NvbnRlbnQgY2hhbmdlXHJcbmNsYXNzIEVsZW1lbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiB2aXJ0dWFsIGRvbSBvYmplY3QgY29uc3RydWN0b3JcclxuICAgICAqIEBwYXJhbSB7Kn0gdGFnICB0aGUgaHRtbCB0YWcgbmFtZVxyXG4gICAgICogQHBhcmFtIHsqfSBwcm9wcyAgdGhlIHByb3AgKGtlee+8jHN0eWxlLi4pXHJcbiAgICAgKiBAcGFyYW0geyp9IGNoaWxkcmVuIGNoaWxkIGRhdGFcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWcgPSB0YWdcclxuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge31cclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4gfHwgW11cclxuICAgICAgICB0aGlzLmtleSA9IHByb3BzID8gcHJvcHMua2V5IDogdW5kZWZpbmVkXHJcbiAgICAgICAgaWYgKCF0aGlzLmtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfSAuLi4gaHRtbCB0YWcgdGhlIGtleSBpcyB1bmRlZmluZWRgKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IGNoaWxkLmNvdW50XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY291bnQrK1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudFxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiB0aGUgbWV0aG9kIHVzZSB0byB2aXJ0dWFsIGRvbSAgcmVuZGUgdG8gcmVhbCBkb21cclxuICAgICAqL1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcclxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcclxuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIFV0aWwuc2V0QXR0cihlbCwgcHJvcE5hbWUsIHByb3BzW3Byb3BOYW1lXSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY2hpbGRFbCA9IChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpID8gY2hpbGQucmVuZGVyKCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZClcclxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBlbDtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGlmZiB7XHJcbiAgICAvKipcclxuICAgICAqIGRvbSB0cmVlIGRpZmYgYWxnb3JpdGhtIG9iamVjdCBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRUcmVlIHRoZSBkb20gdHJlZSBmb3IgYmVmb3JlIHVwZGF0ZSBcclxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvbGRUcmVlLCBuZXdUcmVlKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcclxuICAgICAgICB0aGlzLnBhdGNoZXMgPSB7fVxyXG4gICAgICAgIHRoaXMuZGZzV2FsayhvbGRUcmVlLCBuZXdUcmVlLCB0aGlzLmluZGV4KVxyXG4gICAgfVxyXG4gICAgZGZzV2FsayhvbGROb2RlLCBuZXdOb2RlLCBpbmRleCkge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2ggPSBbXVxyXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzU3RyaW5nKG9sZE5vZGUpICYmIFV0aWwuaXNTdHJpbmcobmV3Tm9kZSkpIHtcclxuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfQ09OVEVOVCxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xyXG4gICAgICAgICAgICBsZXQgcHJvcHNQYXRjaGVzID0gdGhpcy5kaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSlcclxuICAgICAgICAgICAgaWYgKHByb3BzUGF0Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUFJPUFMsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzUGF0Y2hlc1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNJZ25vcmVDaGlsZHJlbihuZXdOb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUkVQTEFDRSxcclxuICAgICAgICAgICAgICAgIG5vZGU6IG5ld05vZGVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkTm9kZS5wcm9wc1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xyXG5cclxuICAgICAgICBjb25zdCBwcm9wc1BhdGNoZXMgPSB7fVxyXG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvbGRQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAobmV3UHJvcHNba2V5XSAhPT0gb2xkUHJvcHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdQcm9wcykge1xyXG4gICAgICAgICAgICBpZiAoIW9sZFByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNTYW1lID8gbnVsbCA6IHByb3BzUGF0Y2hlc1xyXG5cclxuICAgIH1cclxuICAgIGRpZmZDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpIHtcclxuICAgICAgICBsZXQgZGlmZkxpc3QgPSBuZXcgRGlmZkxpc3Qob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKVxyXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXHJcbiAgICAgICAgbmV3Q2hpbGRyZW4gPSBkaWZmcy5jaGlsZFxyXG4gICAgICAgIGlmIChkaWZmcy5tb3Zlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IENISUxEX1JFX09SREVSLFxyXG4gICAgICAgICAgICAgICAgbW92ZXM6IGRpZmZzLm1vdmVzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2gocmVvcmRlclBhdGNoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbGVmdE5vZGUgPSBudWxsXHJcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlSW5kZXggPSBpbmRleFxyXG4gICAgICAgIG9sZENoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldXHJcbiAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggPSAobGVmdE5vZGUgJiYgbGVmdE5vZGUuY291bnQpID9cclxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyBsZWZ0Tm9kZS5jb3VudCArIDEgOlxyXG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIDFcclxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCBuZXdDaGlsZCwgY3VycmVudE5vZGVJbmRleClcclxuICAgICAgICAgICAgbGVmdE5vZGUgPSBjaGlsZFxyXG4gICAgICAgIH0pXHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgUGF0Y2gge1xyXG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCB3YWxrZXIgPSB7XHJcbiAgICAgICAgICAgIGluZGV4OiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpXHJcbiAgICB9XHJcbiAgICBkZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcykge1xyXG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XVxyXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW2ldXHJcbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXHJcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgd2Fsa2VyLCBwYXRjaGVzKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5hcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZXMpXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlKSB7XHJcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGF0Y2gudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1JFUExBQ0U6XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckNoaWxkcmVuKG5vZGUsIGN1cnJlbnRQYXRjaC5tb3ZlcylcclxuICAgICAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMobm9kZSwgY3VycmVudFBhdGNoLnByb3BzKVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gY3VycmVudFBhdGNoLmNvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IGN1cnJlbnRQYXRjaC5jb250ZW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBtb3Zlcykge1xyXG4gICAgICAgIGxldCBzdGF0aWNOb2RlTGlzdCA9IFV0aWwudG9BcnJheShub2RlLmNoaWxkTm9kZXMpXHJcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cclxuICAgICAgICBzdGF0aWNOb2RlTGlzdC5mb3JFYWNoKChzbm9kZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc25vZGUubm9kZVR5cGUgPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHNba2V5XSA9IHNub2RlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcclxuICAgICAgICAgICAgbGV0IGluZGV4ID0gbW92ZS5pbmRleFxyXG4gICAgICAgICAgICBpZiAobW92ZS50eXBlID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUudHlwZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluc2VydE5vZGUgPSBub2RlTWFwc1ttb3ZlLml0ZW0ua2V5XSA/XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmlzU3RyaW5nKG1vdmUuaXRlbSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pIDogbW92ZS5pdGVtLnJlbmRlcigpXHJcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGluc2VydE5vZGUpXHJcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIHNldFByb3BzKG5vZGUsIHByb3BzKSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNba2V5XVxyXG4gICAgICAgICAgICAgICAgVXRpbC5zZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5jbGFzcyBVdGlsIHtcclxuICAgIHN0YXRpYyBpc1N0cmluZyhzb21lKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzb21lID09PSAnc3RyaW5nJ1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xyXG4gICAgICAgIGlmICghbGlzdCkge1xyXG4gICAgICAgICAgICByZXR1cm4gW11cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFycmF5ID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgYXJyYXkucHVzaChsaXN0W2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXlcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0ZvckluKGRpcmVjdGlvbikge1xyXG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNGb3JGb3JJbihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3fF9pbiokLy50ZXN0KGRpcmVjdGlvbilcclxuICAgIH1cclxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcclxuICAgICAgICByZXR1cm4gbm9kZS5wcm9wcyAmJiBub2RlLnByb3BzLmhhc093blByb3BlcnR5KFwiaWdub3JlXCIpXHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIC8v5q2j5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU51bWJlciA9IC9eXFxkKyQvXHJcbiAgICAgICAgICAgIC8v6LSf5pW05pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lTnVtYmVyID0gL14tXFxkKyQvXHJcbiAgICAgICAgICAgIC8v5q2j5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIxID0gL15bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIyID0gL14wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcbiAgICAgICAgICAgIC8v6LSf5a6e5pWwXHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjEgPSAvXi1bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XHJcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjIgPSAvXi0wWy5dXFxkKyQvIC8v6Zu25byA5aS0XHJcblxyXG4gICAgICAgICAgICBpZiAocmVOdW1iZXIudGVzdCh2YWx1ZSkgfHwgcmVOZU51bWJlci50ZXN0KHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgfHwgcmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpXHJcbiAgICAgICAgICAgICAgICB8fCByZU5lUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVOZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdzdHlsZSc6XHJcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAndmFsdWUnOlxyXG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcclxuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcclxuICAgICAgICAgICAgICAgIGlmICh0YWdOYW1lID09PSAnaW5wdXQnIHx8IHRhZ05hbWUgPT09ICd0ZXh0YXJlYScpIHtcclxuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWx1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgc3RhdGljIGlzUGxhY2VIb2xkZXIoY29udGVudCkge1xyXG4gICAgICAgIGlmIChjb250ZW50KSB7XHJcbiAgICAgICAgICAgIGlmICgvXiUjXFx3Ki5cXHcqIyUkLy50ZXN0KGNvbnRlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiAvXlxcdypcXC5cXHcqJC8udGVzdChjb250ZW50KVxyXG4gICAgfVxyXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDIsIC0yKVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbkuLrooajovr7lvI9cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaXNPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xyXG5cclxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xyXG4gICAgICAgICAgICBpZiAoL15cXHtcXHcqfFxcfFxcJStcXH0kLy50ZXN0KGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCwgZGF0YSwgZGF0YUtleSkge1xyXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXHJcbiAgICAgICAgICAgIGxldCBzdGFydEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiJSNcIilcclxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikgKyAyXHJcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9IC0xICYmIGVuZEluZGV4ICE9IC0xICYmIHN0YXJ0SW5kZXggPCBlbmRJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gZXhwcmVzc2lvbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcclxuICAgICAgICAgICAgICAgIGxldCByZWFsVmFsdWVcclxuICAgICAgICAgICAgICAgIGlmIChwbGFjZUhvbGRlci5pbmRleE9mKFwiLlwiKSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMF0gPT09IGRhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBVdGlsLmlzTnVtYmVyKHBsYWNlSG9sZGVyVmFsdWUpID8gcGxhY2VIb2xkZXJWYWx1ZSA6IGBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcildLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGV2YWwoZXhwcmVzc2lvbilcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNsYXNzIERpZmZMaXN0IHtcclxuICAgIC8qKlxyXG4gICAgICogZGlmZiBsaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBvbGRMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBuZXdMaXN0IFxyXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG9sZExpc3QsIG5ld0xpc3QpIHtcclxuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcclxuICAgICAgICBsZXQgbmV3TGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgobmV3TGlzdCkua2V5SW5kZXhcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvciA9IFtdXHJcbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb2xkSXRlbSA9IG9sZExpc3RbaV1cclxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcclxuICAgICAgICAgICAgaWYgKCFuZXdMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkob0l0ZW1LZXkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG51bGwpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG5ld0xpc3RbbmV3TGlzdEtleUluZGV4W29JdGVtS2V5XV0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdCA9IHRoaXMuY2hpbGRMaXN0LnNsaWNlKDApXHJcbiAgICAgICAgbGV0IGkgPSAwO1xyXG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudGVtcExpc3RbaV0gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaSsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbkl0ZW0gPSBuZXdMaXN0W2ldXHJcbiAgICAgICAgICAgIGxldCBuSXRlbUtleSA9IHRoaXMuZ2V0S2V5KG5JdGVtKVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxyXG4gICAgICAgICAgICBsZXQgY0l0ZW1LZXkgPSB0aGlzLmdldEtleShjSXRlbSlcclxuICAgICAgICAgICAgaWYgKGNJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkTGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG5JdGVtS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY05leHRJdGVtS2V5ID0gZ2V0S2V5KHRoaXMudGVtcExpc3RbaW5kZXggKyAxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgayA9IHRoaXMudGVtcExpc3QubGVuZ3RoIC0gaW5kZXhcclxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGstLVxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShrICsgbmV3TGlzdC5sZW5ndGgpXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBtYWtlS2V5SW5kZXgobGlzdCkge1xyXG4gICAgICAgIGxldCBrZXlJbmRleCA9IHt9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXVxyXG4gICAgICAgICAgICBsZXQgaXRlbUtleSA9IHRoaXMuZ2V0S2V5KGl0ZW0pXHJcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0S2V5KGl0ZW0pIHtcclxuICAgICAgICBpZiAoIWl0ZW0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXRlbVtcImtleVwiXVxyXG4gICAgfVxyXG4gICAgcmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KSB7XHJcbiAgICAgICAgdGhpcy50ZW1wTGlzdC5zcGxpY2UoaW5kZXgsIDEpXHJcbiAgICB9XHJcbiAgICByZW1vdmUoaW5kZXgpIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICB0eXBlOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpbnNlcnQoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcclxuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgICAgICBpdGVtOiBpdGVtLFxyXG4gICAgICAgICAgICB0eXBlOiAxXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBnZXRSZXN1bHQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxyXG4gICAgICAgICAgICBjaGlsZDogdGhpcy5jaGlsZExpc3RcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gb2JzZXJ2ZShvYmosIG9ic2VydmVNYXAsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgbGV0IGludGVybmFsVmFsdWUgPSBvYmpba2V5XVxyXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxyXG4gICAgICAgIGlmIChpbnRlcm5hbFZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIG9ic2VydmUoaW50ZXJuYWxWYWx1ZSwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ic2VydmVNYXAucHV0KGtleSwgb2JzZXJ2YWJsZSlcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW50ZXJuYWxWYWx1ZVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQobmV3VmFsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFuZ2VkID0gaW50ZXJuYWxWYWx1ZSAhPT0gbmV3VmFsXHJcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFZhbHVlID0gbmV3VmFsXHJcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUuaW52b2tlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG9ialxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucyA9IG5ldyBTZXQoKVxyXG59XHJcbk9ic2VydmFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlVXBkYXRlKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5hZGQob2JzZXJ2YWJsZVVwZGF0ZSlcclxufVxyXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5mb3JFYWNoKGZ1biA9PiBmdW4oKSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiB0aGUgbWV0aG9kIHVzZSB0byBkZWVwIGNsb25lIG9ialxyXG4gKiBAcGFyYW0geyp9IG9iaiBcclxuICovXHJcbmZ1bmN0aW9uIGNsb25lKG9iaikge1xyXG4gICAgbGV0IGdldFR5cGUgPSAobykgPT4ge1xyXG4gICAgICAgIGlmIChvID09PSBudWxsKSByZXR1cm4gXCJudWxsXCI7XHJcbiAgICAgICAgaWYgKG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XHJcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XHJcbiAgICB9XHJcbiAgICBsZXQgcmVzdWx0LCBvQ2xhc3MgPSBnZXRUeXBlKG9iaik7XHJcbiAgICBpZiAob0NsYXNzID09PSBcIk9iamVjdFwiKSB7XHJcbiAgICAgICAgcmVzdWx0ID0ge307XHJcbiAgICB9IGVsc2UgaWYgKG9DbGFzcyA9PT0gXCJBcnJheVwiKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gW107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICBsZXQgY29weSA9IG9ialtrZXldO1xyXG4gICAgICAgIGlmIChnZXRUeXBlKGNvcHkpID09IFwiT2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIkFycmF5XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGgodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKVxyXG59XHJcblxyXG5mdW5jdGlvbiBkaWZmKG9sZFRyZWUsIG5ld1RyZWUpIHtcclxuICAgIGxldCBkID0gbmV3IERpZmYob2xkVHJlZSwgbmV3VHJlZSlcclxuICAgIHJldHVybiBkLnBhdGNoZXNcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHBhdGNoKG5vZGUsIHBhdGNoZXMpIHtcclxuICAgIHJldHVybiBuZXcgUGF0Y2gobm9kZSwgcGF0Y2hlcylcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8qKlxyXG4gICAgICogdGhlIG1hcCBvYmplY3QgdXNlIHRvIHNhdmUgbGlraWx5IChrZXksdmFsdWUpIGRhdGFcclxuICAgICAqL1xyXG5jbGFzcyBNYXAge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE9iamVjdCgpO1xyXG4gICAgfVxyXG4gICAgcHV0KGtleSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5tYXApKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldChrZXkpIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcCkgPyB0aGlzLm1hcFtrZXldIDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbW92ZShrZXkpIHtcclxuICAgICAgICBpZiAoKGtleSBpbiB0aGlzLm1hcCkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubWFwW2tleV1cclxuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBoYXNLZXkoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApXHJcbiAgICB9XHJcbiAgICBzaXplKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGxlbmd0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiAqIHRoaXMgY2xhc3MgaXMgcGFyc2UgaHRtbCB0ZW1wbGF0ZSB0byB2aXJ0dWFsIGRvbSB0cmVlXHJcbiAqIEBhdXRob3IgeWhvbmdtXHJcbiAqL1xyXG5jbGFzcyBZaG1QYXJzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLm1JbmRleCA9IDBcclxuICAgICAgICB0aGlzLm1NYXAgPSBuZXcgTWFwKClcclxuICAgICAgICB0aGlzLm1Qcm9wUmUgPSAvKFtePVxcc10rKShcXHMqPVxccyooKFxcXCIoW15cIl0qKVxcXCIpfChcXCcoW14nXSopXFwnKXxbXj5cXHNdKykpPy9nbVxyXG4gICAgICAgIHRoaXMubUhhbmRsZXIgPSB7XHJcbiAgICAgICAgICAgIHN0YXJ0RUxlbWVudDogZnVuY3Rpb24gKHRhZ05hbWUsIHByb3AsIGNvbnRlbnQsIHRoYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubUluZGV4ICs9IDFcclxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7IHRhZzogdGFnTmFtZSwgcHJvcHM6IHByb3AsIGNoaWxkcmVuOiBbXSwgaW5kZXg6IHRoYXQubUluZGV4LCBjb250ZW50OiBjb250ZW50LCBpc0Nsb3NlOiBmYWxzZSB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW4ucHVzaChjb250ZW50LnRyaW0oKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoYXQubU1hcC5wdXQodGhhdC5tSW5kZXgsIG9iailcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW5kRWxlbWVudDogZnVuY3Rpb24gKHRoYXQpIHtcclxuICAgICAgICAgICAgICAgIHRoYXQubU1hcC5nZXQodGhhdC5tSW5kZXgpLmlzQ2xvc2UgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICBpZiAodGhhdC5tTWFwLmhhc0tleSgodGhhdC5tSW5kZXggLSAxKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4IC0gMSkuY2hpbGRyZW4ucHVzaCh0aGF0Lm1NYXAuZ2V0KHRoYXQubUluZGV4KSlcclxuICAgICAgICAgICAgICAgICAgICB0aGF0Lm1NYXAucmVtb3ZlKHRoYXQubUluZGV4KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhhdC5tSW5kZXggLT0gMVxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcGFyc2VIdG1sVGVtcGxhdGUoaHRtbCkge1xyXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpIC8gMTAwMFxyXG4gICAgICAgIHZhciBpbmRleCA9IDBcclxuICAgICAgICB3aGlsZSAoaHRtbCkge1xyXG4gICAgICAgICAgICB2YXIgc3RhcnRUYWdPcGVuID0gaHRtbC5pbmRleE9mKCc8JylcclxuICAgICAgICAgICAgdmFyIHN0YXJ0VGFnQ2xvc2UgPSBodG1sLmluZGV4T2YoJz4nKSB8fCBodG1sLmluZGV4T2YoJy8+JylcclxuICAgICAgICAgICAgdmFyIGVuZFRhZ09wZW4gPSBodG1sLmluZGV4T2YoJzwvJylcclxuICAgICAgICAgICAgdmFyIGVuZFRhZ0Nsb3NlID0gaHRtbC5pbmRleE9mKCc+JylcclxuICAgICAgICAgICAgdmFyIHN0YXJ0Q29tbWVudE9wZW4gPSBodG1sLmluZGV4T2YoJzwhLS0nKVxyXG4gICAgICAgICAgICB2YXIgZW5kQ29tbWVudENsb3NlID0gaHRtbC5pbmRleE9mKCctLT4nKVxyXG4gICAgICAgICAgICBpZiAoc3RhcnRDb21tZW50T3BlbiA9PSAwICYmIGVuZENvbW1lbnRDbG9zZSAhPSAtMSAmJiBlbmRDb21tZW50Q2xvc2UgPiBzdGFydENvbW1lbnRPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGVuZENvbW1lbnRDbG9zZSArIDNcclxuICAgICAgICAgICAgICAgIHBhcnNlQ29tbWVudChodG1sLnN1YnN0cmluZyhzdGFydENvbW1lbnRPcGVuICsgNCwgZW5kQ29tbWVudENsb3NlICsgMykpO1xyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChlbmRUYWdPcGVuICE9IC0xICYmIGVuZFRhZ0Nsb3NlICE9IC0xICYmIGVuZFRhZ0Nsb3NlID4gZW5kVGFnT3Blbikge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBlbmRUYWdDbG9zZSArIDFcclxuICAgICAgICAgICAgICAgIF9wYXJzZUVuZFRhZyhodG1sLnN1YnN0cmluZyhlbmRUYWdPcGVuLCBlbmRUYWdDbG9zZSArIDEpLCB0aGlzKVxyXG4gICAgICAgICAgICAgICAgaHRtbCA9IGh0bWwuc3Vic3RyaW5nKGluZGV4KVxyXG4gICAgICAgICAgICAgICAgY29udGludWVcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydFRhZ09wZW4gIT0gLTEgJiYgc3RhcnRUYWdDbG9zZSAhPSAtMSAmJiBzdGFydFRhZ0Nsb3NlID4gc3RhcnRUYWdPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IHN0YXJ0VGFnQ2xvc2UgKyAxXHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IFwiXCJcclxuICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzwnLCBpbmRleCkgPiAtMSAmJiBodG1sLmluZGV4T2YoJzwnLCBpbmRleCkgPiBzdGFydFRhZ0Nsb3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGNvbnRlbnRFbmRJbmRleCA9IGh0bWwuaW5kZXhPZignPC8nLCAoaW5kZXggKyAxKSlcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gaHRtbC5zdWJzdHJpbmcoaW5kZXgsIGh0bWwuaW5kZXhPZignPCcsIGluZGV4KSkudHJpbSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfcGFyc2VTdGFydFRhZyhodG1sLnN1YnN0cmluZyhzdGFydFRhZ09wZW4sIHN0YXJ0VGFnQ2xvc2UgKyAxKSwgY29udGVudCwgdGhpcylcclxuICAgICAgICAgICAgICAgIGh0bWwgPSBodG1sLnN1YnN0cmluZyhpbmRleClcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpIC8gMTAwMFxyXG4gICAgICAgIGNvbnNvbGUubG9nKGB0b3RhbCBwYXJzZSB0aW1lOiR7ZW5kVGltZSAtIHN0YXJ0VGltZX1gKVxyXG5cclxuXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9wYXJzZVN0YXJ0VGFnKGh0bWwsIGNvbnRlbnQsIHRoYXQpIHtcclxuICAgICAgICAgICAgbGV0IHN0YXJ0VGFnRW5kSW5kZXggPSBodG1sLmluZGV4T2YoJyAnKSAhPSAtMSA/IGh0bWwuaW5kZXhPZignICcpIDogaHRtbC5pbmRleE9mKCcvPicpID09IC0xID8gaHRtbC5pbmRleE9mKCc+JykgOiBodG1sLmluZGV4T2YoJy8+JylcclxuICAgICAgICAgICAgdmFyIHRhZ05hbWUgPSBodG1sLnN1YnN0cmluZyhodG1sLmluZGV4T2YoJzwnKSArIDEsIHN0YXJ0VGFnRW5kSW5kZXgpXHJcbiAgICAgICAgICAgIHZhciBwcm9wID0ge31cclxuICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignICcpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwcm9wcyA9IGh0bWwuc3Vic3RyaW5nKGh0bWwuaW5kZXhPZignICcpICsgMSwgaHRtbC5pbmRleE9mKCc+JykpXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHByb3BzUmVzdWx0ID0gcHJvcHMubWF0Y2godGhhdC5tUHJvcFJlKVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wc1Jlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwciA9IHByb3BzUmVzdWx0W2ldXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BbcHIuc3BsaXQoXCI9XCIpWzBdXSA9IHByLnNwbGl0KFwiPVwiKVsxXS5tYXRjaCgvKD88PVwiKS4qPyg/PVwiKS8pWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGF0Lm1IYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoLyg/PD1cIikuKj8oPz1cIikvLnRlc3QoY29udGVudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50ID0gY29udGVudC5tYXRjaCgvKD88PVwiKS4qPyg/PVwiKS8pWzBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1IYW5kbGVyLnN0YXJ0RUxlbWVudCh0YWdOYW1lLCBwcm9wLCBjb250ZW50LCB0aGF0KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBfcGFyc2VFbmRUYWcoaHRtbCwgdGhhdCkge1xyXG4gICAgICAgICAgICBpZiAodGhhdC5tSGFuZGxlcikge1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tSGFuZGxlci5lbmRFbGVtZW50KHRoYXQpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VDb21tZW50KGh0bWwpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYHBhcnNlQ29tbWVudD0ke2h0bWx9YClcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgZ2V0SHRtbERvbSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tTWFwLmdldCgxKVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuY2xhc3MgUlYge1xyXG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3Qge1xyXG4gICAgICAgICAgICAgICAgZWwsXHJcbiAgICAgICAgICAgICAgICBkYXRhLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVcclxuICAgICAgICAgICAgfSA9IG9wdGlvblxyXG4gICAgICAgICAgICBsZXQgcGFyc2UgPSBuZXcgWWhtUGFyc2UoKVxyXG4gICAgICAgICAgICBwYXJzZS5wYXJzZUh0bWxUZW1wbGF0ZSh0ZW1wbGF0ZS50cmltKCkpXHJcblxyXG4gICAgICAgICAgICBsZXQgZG9tID0gcGFyc2UuZ2V0SHRtbERvbSgpXHJcbiAgICAgICAgICAgIGxldCByb290ID0gVXRpbC5pc1N0cmluZyhlbCkgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSA6IGVsXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcclxuICAgICAgICAgICAgdGhpcy52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxyXG4gICAgICAgICAgICB0aGlzLncgPSB0aGlzLnZlLnJlbmRlcigpXHJcbiAgICAgICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy53KVxyXG4gICAgICAgICAgICB0aGlzLm9ic2VydmVNYXAgPSBuZXcgTWFwKClcclxuICAgICAgICAgICAgb2JzZXJ2ZSh0aGlzLmRhdGEsIHRoaXMub2JzZXJ2ZU1hcCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWRvbShkb20pXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBydiBlOiR7ZX1gKVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfVxyXG4gICAgdXBkYXRlZG9tKGRvbSkge1xyXG4gICAgICAgIGxldCBudmUgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSlcclxuICAgICAgICB3aW5kb3cubnZlID0gbnZlXHJcbiAgICAgICAgd2luZG93LnZlID0gdGhpcy52ZVxyXG4gICAgICAgIHBhdGNoKHRoaXMudywgZGlmZih0aGlzLnZlLCBudmUpKVxyXG4gICAgICAgIHRoaXMudmUgPSBudmVcclxuICAgIH1cclxuICAgIHdhdGNoKGtleSwgY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLm9ic2VydmVNYXAuZ2V0KGtleSkuYWRkKGNhbGxiYWNrKVxyXG4gICAgfVxyXG4gICAgZ2V0VmlydHVhbEVsZW1lbnQoZG9tKSB7XHJcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW11cclxuICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgbGV0IGNjID0gZG9tLmNoaWxkcmVuW2NoaWxkXVxyXG4gICAgICAgICAgICBpZiAoY2MgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICAgICAgY2MuZm9yRWFjaChjID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQoYylcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHYpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNjIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQoY2MpXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHYpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNjKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gaChkb20udGFnLCBkb20ucHJvcHMsIGNoaWxkcmVuKVxyXG4gICAgfVxyXG4gICAgYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSB7XHJcbiAgICAgICAgaWYgKFwiZm9yXCIgaW4gZG9tLnByb3BzKSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRhQXJyYXkgPSBbXVxyXG4gICAgICAgICAgICBsZXQgZGF0YVNpbmdsZVxyXG5cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JJbihkb20ucHJvcHNbJ2ZvciddKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFwiY2hpbGREb21EYXRha2V5XCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLmNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcImRvbURhdGFLZXlcIiBpbiBkb20pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXSA9PT0gZG9tLmRvbURhdGFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSB0aGlzLmRhdGFbZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgZm9yIGRpcmVjdGl2ZSB1c2UgZXJyb3JcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdXHJcblxyXG4gICAgICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBkYXRhU2luZ2xlLCBkYXRhKVxyXG5cclxuICAgICAgICAgICAgICAgIG9ianMucHVzaChvYmopXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgcmV0dXJuIG9ianNcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFcclxuICAgICAgICAgICAgbGV0IGNoaWxkRG9tRGF0YWtleVxyXG4gICAgICAgICAgICBpZiAoXCJkYXRhXCIgaW4gZG9tKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhID0gZG9tLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IGRvbS5jaGlsZERvbURhdGFrZXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFcclxuICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YWtleSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgb2JqID0gdGhpcy52ZG9tMnJkb20oZG9tLCBkYXRhLCBjaGlsZERvbURhdGFrZXksIHRoaXMuZGF0YSlcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBvYmpcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIHZpcnR1YWwgZG9tIDIgcmVhbCBkYXRhIGRvbVxyXG4gICAgICogQHBhcmFtIHsqfSBkb20gXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGEgXHJcbiAgICAgKiBAcGFyYW0geyp9IGRhdGFTaW5nbGUgXHJcbiAgICAgKiBAcGFyYW0geyp9IHRkYXRhIFxyXG4gICAgICovXHJcbiAgICB2ZG9tMnJkb20oZG9tLCBkYXRhLCBkYXRhU2luZ2xlLCB0ZGF0YSkge1xyXG4gICAgICAgIGxldCBvYmogPSB7fVxyXG4gICAgICAgIG9iai50YWcgPSBkb20udGFnXHJcbiAgICAgICAgb2JqLmNoaWxkcmVuID0gW11cclxuICAgICAgICBvYmoucHJvcHMgPSB7fVxyXG4gICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGRvbS5wcm9wcylcclxuICAgICAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHByb3BzW3Byb3BdXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJzdHlsZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBkb20ucHJvcHNbdmFsdWVdXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmluZGV4T2YoXCIsXCIpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVzID0gc3R5bGUuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlQXJyYXlTdHlsZShkYXRhLCBzdHlsZXMsIGRhdGFTaW5nbGUpXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzUGxhY2VIb2xkZXIoZG9tLnByb3BzW3ZhbHVlXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIVV0aWwuaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pXVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKS5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzT3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBVdGlsLmdldE9wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdLCBkYXRhLCBkYXRhU2luZ2xlKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRvbS5wcm9wc1t2YWx1ZV1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzUGxhY2VIb2xkZXIoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pLmluZGV4T2YoZGF0YVNpbmdsZSkgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRkYXRhW1V0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKV1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IGRvbS5jaGlsZHJlbltjaGlsZF1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9tLmNoaWxkcmVuW2NoaWxkXSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChcImNoaWxkRG9tRGF0YVwiIGluIGRvbS5wcm9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmNoaWxkRG9tRGF0YWtleSA9IGRvbS5wcm9wcy5jaGlsZERvbURhdGFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFwiZG9tRGF0YVwiIGluIGRvbS5wcm9wcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRvbURhdGFLZXkgPSBkb20ucHJvcHMuZG9tRGF0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhW2NoaWxkXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20uY2hpbGRyZW5bY2hpbGRdKVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2JqXHJcblxyXG4gICAgfVxyXG4gICAgaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpIHtcclxuICAgICAgICBsZXQgbmV3U3R5bGUgPSAnJ1xyXG4gICAgICAgIGlmIChkYXRhU2luZ2xlKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzUGxhY2VIb2xkZXIoc3R5bGUpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlKS5pbmRleE9mKGRhdGFTaW5nbGUpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IFV0aWwuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuc3BsaXQoXCIuXCIpWzFdXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBkYXRhW2tleV1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlVmFsdWUgPSBzdHlsZS5zcGxpdChcIjpcIilbMV1cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZVZhbHVlID0gZGF0YVtVdGlsLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdHlsZUtleSA9IHN0eWxlLnNwbGl0KFwiOlwiKVswXVxyXG4gICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1BsYWNlSG9sZGVyKHN0eWxlVmFsdWUpKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3R5bGVWYWx1ZSA9IGRhdGFbVXRpbC5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxyXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlXHJcbiAgICB9XHJcbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xyXG4gICAgICAgIGxldCBuZXdTdHlsZUFycmF5ID0gXCJcIlxyXG4gICAgICAgIGZvciAobGV0IHN0eWxlIG9mIHN0eWxlcykge1xyXG5cclxuICAgICAgICAgICAgbGV0IG5ld1N0eWxlID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSlcclxuICAgICAgICAgICAgbmV3U3R5bGVBcnJheSArPSBuZXdTdHlsZSArIFwiO1wiXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdTdHlsZUFycmF5XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJWIiwiaW1wb3J0IFJWIGZyb20gJ3lob25nbV9ydi5qcydcclxuaW1wb3J0IGx1bmFyQ2FsZW5kYXIgZnJvbSAnLi9sdW5hcidcclxuXHJcbi8qKlxyXG4gKiAgXHJcbiAqL1xyXG5mdW5jdGlvbiBDYWxlbmRhcigpIHtcclxuICAgIHRoaXMubW9udGhzID0gbmV3IEFycmF5KFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCIsIFwi5Y2BXCIsIFwi5Y2B5LiAXCIsIFwi5Y2B5LqMXCIpO1xyXG4gICAgdGhpcy5kYXlDb3VudHMgPSBuZXcgQXJyYXkoMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMSk7XHJcbiAgICB0aGlzLmRheXMgPSBuZXcgQXJyYXkoXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIik7XHJcbiAgICB0aGlzLnRvZGF5ID0gdGhpcy5nZXRUb2RheSgpO1xyXG4gICAgdGhpcy55ZWFyID0gdGhpcy50b2RheS55ZWFyO1xyXG4gICAgdGhpcy5tb250aCA9IHRoaXMudG9kYXkubW9udGg7XHJcbiAgICB0aGlzLm5ld0NhbCA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLnNlbGVjdERheSA9IHRoaXMubmV3Q2FsO1xyXG4gICAgdGhpcy5kYXkgPSAtMTtcclxuICAgIHRoaXMuc3RhcnREYXkgPSAwO1xyXG4gICAgdGhpcy5kYWlseSA9IDA7XHJcbiAgICB0aGlzLnJ2ID0gdW5kZWZpbmVkXHJcbiAgICBpZiAoKHRoaXMudG9kYXkueWVhciA9PSB0aGlzLm5ld0NhbC5nZXRGdWxsWWVhcigpKSAmJiAodGhpcy50b2RheS5tb250aCA9PSB0aGlzLm5ld0NhbC5nZXRNb250aCgpKSkge1xyXG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy50b2RheS5kYXk7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldFdlZWtzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5uZXdDYWwgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIDEpO1xyXG4gICAgdGhpcy5kYXkgPSAtMTtcclxuICAgIHRoaXMuc3RhcnREYXkgPSB0aGlzLm5ld0NhbC5nZXREYXkoKTtcclxuICAgIHRoaXMuZGFpbHkgPSAwO1xyXG4gICAgaWYgKCh0aGlzLnRvZGF5LnllYXIgPT0gdGhpcy5uZXdDYWwuZ2V0RnVsbFllYXIoKSkgJiYgKHRoaXMudG9kYXkubW9udGggPT0gdGhpcy5uZXdDYWwuZ2V0TW9udGgoKSkpIHtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMudG9kYXkuZGF5O1xyXG4gICAgfVxyXG4gICAgdmFyIGRheUNvdW50cyA9IHRoaXMuZ2V0RGF5Q291bnRzKHRoaXMubmV3Q2FsLmdldE1vbnRoKCksIHRoaXMubmV3Q2FsLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgdmFyIHdlZWtzID0gW11cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRheUluV2Vla3MgPSBbXVxyXG4gICAgICAgIGRheUluV2Vla3MuaWQgPSBgd2Vla19yb3dfJHtpfWBcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICB2YXIgX2NlbGxPYmogPSB7fVxyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IFwiXCJcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gXCJcIlxyXG4gICAgICAgICAgICB2YXIgbGFibGUgPSBcIlwiXHJcbiAgICAgICAgICAgIHZhciBpZCA9IGB3ZWVrX2RheV8ke2l9JHtqfWBcclxuICAgICAgICAgICAgaWYgKChqID09IHRoaXMuc3RhcnREYXkpICYmICgwID09IHRoaXMuZGFpbHkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF5ID09IHRoaXMuZGFpbHkpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJmb250LXdlaWdodDpib2xkO2NvbG9yOiNGRkZGRkY7YmFja2dyb3VuZC1jb2xvcjojNUNCQTVBO2hlaWdodDoyMHB4O3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJjdXJyZW50XCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChqID09IDYpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojRkYwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6MThweDt3aWR0aDoxMiVcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcInNhdFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6ICNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojRTVFOUYyO3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDoxOHB4O3dpZHRoOjEyJVwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwic3VuXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojMjQzRjY1O2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjtoZWlnaHQ6MjBweDt3aWR0aDoxMSU7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcIm5vcm1hbFwiXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuZGFpbHkgPiAwKSAmJiAodGhpcy5kYWlseSA8PSBkYXlDb3VudHMpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5kYWlseSArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6IzAwMDAwMDtiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O2hlaWdodDoyMHB4O3dpZHRoOiAxMSU7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmlkID0gaWRcclxuICAgICAgICAgICAgX2NlbGxPYmoubGFibGUgPSBsYWJsZVxyXG4gICAgICAgICAgICBfY2VsbE9iai5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIGxldCBsdW5hciA9IGx1bmFyQ2FsZW5kYXIuZ2V0THVuYXIodGhpcy55ZWFyLCB0aGlzLm1vbnRoKzEsIGNvbnRlbnQpXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmlkID0gaWRcclxuICAgICAgICAgICAgX2NlbGxPYmoubGFibGUgPSBsYWJsZVxyXG4gICAgICAgICAgICBfY2VsbE9iai5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIGxldCBsdW5hckluZm8gPSBcIlwiXHJcbiAgICAgICAgICAgIGlmIChsdW5hci5jYWxlbmRhcmljaXR5ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLmNhbGVuZGFyaWNpdHlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobHVuYXIuc29sYXJIb2xpZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5zb2xhckhvbGlkYXlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobHVuYXIubHVuYXJIb2xpZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5sdW5hckhvbGlkYXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGx1bmFyLmNoaW5hRGF5PT09XCLliJ3kuIBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIuY2hpbmFNb250aCBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGx1bmFySW5mbz0gbHVuYXIuY2hpbmFEYXlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjb250ZW50ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgX2NlbGxPYmoubHVuYXJJbmZvID0gbHVuYXJJbmZvXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgX2NlbGxPYmoubHVuYXJJbmZvID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRheUluV2Vla3MucHVzaChfY2VsbE9iailcclxuICAgICAgICB9XHJcbiAgICAgICAgd2Vla3MucHVzaChkYXlJbldlZWtzKVxyXG4gICAgICAgIHdpbmRvdy53ZWVrcyA9IHdlZWtzXHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2Vla3NcclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuZ2V0RGF5Q291bnRzID0gZnVuY3Rpb24gKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICBpZiAoMSA9PSBtb250aCkge1xyXG4gICAgICAgIHJldHVybiAoKDAgPT0geWVhciAlIDQpICYmICgwICE9ICh5ZWFyICUgMTAwKSkpIHx8ICgwID09IHllYXIgJSA0MDApID8gMjkgOiAyOFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXlDb3VudHNbbW9udGhdXHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldFRvZGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9vYmogPSB7fVxyXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBfb2JqLm5vdyA9IG5vd1xyXG4gICAgX29iai55ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBfb2JqLm1vbnRoID0gbm93LmdldE1vbnRoKCk7XHJcbiAgICBfb2JqLmRheSA9IG5vdy5nZXREYXRlKCk7XHJcbiAgICByZXR1cm4gX29ialxyXG59XHJcblxyXG5DYWxlbmRhci5wcm90b3R5cGUuc3ViTW9udGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoKHRoaXMubW9udGggLSAxKSA8IDApIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gMTE7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gdGhpcy55ZWFyIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IHRoaXMubW9udGggLSAxO1xyXG4gICAgfVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5hZGRNb250aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgodGhpcy5tb250aCArIDEpID4gMTEpIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gMDtcclxuICAgICAgICB0aGlzLnllYXIgPSB0aGlzLnllYXIgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gdGhpcy5tb250aCArIDE7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLnNldE1vbnRoID0gZnVuY3Rpb24gKG1vbnRoKSB7XHJcbiAgICBpZiAobW9udGggPCAxIHx8IG1vbnRoID4gMTIpIHtcclxuICAgICAgICBhbGVydChcIuaciOS7veW/hemhu+WcqDEtMTLkuYvpl7QhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubW9udGggPSBtb250aFxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5zZXRZZWFyID0gZnVuY3Rpb24gKHllYXIpIHtcclxuICAgIHRoaXMueWVhciA9IHllYXJcclxufVxyXG5cclxuXHJcbndpbmRvdy5tb3VzZU92ZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGRkZGRlwiXHJcbn1cclxuXHJcbndpbmRvdy5tb3VzZU91dCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICB2YXIgbGFiZWwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFibGUnKVxyXG4gICAgaWYgKGxhYmVsID09ICdzYXQnIHx8IGxhYmVsID09ICdzdW4nKSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGMDAwMFwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIlxyXG4gICAgfVxyXG5cclxufVxyXG5sZXQgbUNhbGVuZGFyID0gbmV3IENhbGVuZGFyKClcclxud2luZG93Lm1DYWxlbmRhciA9IG1DYWxlbmRhclxyXG53aW5kb3cuY2xpY2tEYXkgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQuaW5uZXJUZXh0ICE9ICcnKSB7XHJcbiAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKG1DYWxlbmRhci55ZWFyLCBtQ2FsZW5kYXIubW9udGgsIGVsZW1lbnQuY2hpbGRyZW5bMF0uaW5uZXJUZXh0XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBtQ2FsZW5kYXIuc2VsZWN0RGF5ID0gZGF5XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlVmlldyhlbCwgY2FsbGJhY2spIHtcclxuICAgIHZhciB3ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICBsZXQgcnYgPSBuZXcgUlYoe1xyXG4gICAgICAgIGVsOiBlbCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHllYXI6ICcnICsgbUNhbGVuZGFyLnllYXIsXHJcbiAgICAgICAgICAgIG1vbnRoOiAnJyArIChtQ2FsZW5kYXIubW9udGggKyAxKSxcclxuICAgICAgICAgICAgd2Vla1RpdGxlczogW3tcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXkxXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkuIBcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5MlwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LqMXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTNcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS4iVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXk0XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLlm5tcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5NVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LqUXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2Vla3M6IHdlZWtzXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZW1wbGF0ZTpgXHJcbiAgICAgICAgICAgICAgPHRhYmxlIGJvcmRlcj1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBjZWxsc3BhY2luZz1cIjFcIiBpZD1cImNhbHRhYmxlXCIga2V5PVwidGFibGVcIiBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjpub25lO3dpZHRoOjIwMDtiYWNrZ3JvdW5kLWNvbG9yOiNEMEQwRUU7Zm9udC1zaXplOjhwdDtib3JkZXI6MHB4IGRvdHRlZCAjMUM2RkY1O1wiPlxyXG4gICAgICAgICAgICAgICAgPHRoZWFkIGtleT1cInRoZWFkXCI+XHJcbiAgICAgICAgICAgICAgICA8dHIgYWxpZ249XCJjZW50ZXJcIiB2YWxpZ249XCJtaWRkbGVcIiBpZD1cInRpdGxlXCIga2V5PVwidGl0bGVcIiBzdHlsZT1cImZvbnQtd2VpZ2h0Om5vcm1hbDtoZWlnaHQ6MjRweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojMzMzMzMzO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0E0QjlENztib3JkZXItdG9wLXdpZHRoOjFweDtib3JkZXItcmlnaHQtd2lkdGg6MXB4O2JvcmRlci1ib3R0b20td2lkdGg6IDFweDsgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtib3JkZXItYm90dG9tLXN0eWxlOiAxcHg7Ym9yZGVyLXRvcC1jb2xvcjogIzk5OTk5OTtib3JkZXItcmlnaHQtY29sb3I6ICM5OTk5OTk7Ym9yZGVyLWJvdHRvbS1jb2xvcjojOTk5OTk5O2JvcmRlci1sZWZ0LWNvbG9yOiM5OTk5OTk7XCI+XHJcbiAgICAgICAgICAgICAgICAgICA8dGQgY29sc3Bhbj1cIjdcIiBrZXk9XCJ0ZFRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT1cInRpdGxlRGl2XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9XCJzdWJCdXR0b25cIiAgc3R5bGU9XCJmb250LXNpemU6MXB4OyBjb2xvcjojMjQzRjY1O2N1cnNvcjpoYW5kO3RleHQtZGVjb3JhdGlvbjpub25lO21hcmdpbi1yaWdodDoycHhcIiBvbmNsaWNrPVwibUNhbGVuZGFyLnN1Yk1vbnRoKClcIj5cIuS4iuaciFwiPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IG5hbWU9XCJ5ZWFyXCIgdHlwZT1cInRleHRcIiAgbWF4bGVuZ3RoPVwiNFwiIHNpemU9XCI0XCIgIHZhbHVlPVwiJSN5ZWFyIyVcIiBkaXNhYmxlZD1cImRpc2FibGVkXCIga2V5PVwiaW5wdXRZZWFyXCI+PC9pbnB1dD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgbmFtZT1cIm1vbnRoXCIgdHlwZT1cInRleHRcIiAgbWF4bGVuZ3RoPVwiMlwiIHNpemU9XCIyXCIgIHZhbHVlPVwiJSNtb250aCMlXCIgZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGtleT1cImlucHV0TW9udGhcIj48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PVwiYWRkQnV0dG9uXCIgIHN0eWxlPVwiZm9udC1zaXplOjFweDsgY29sb3I6IzI0M0Y2NTtjdXJzb3I6aGFuZDt0ZXh0LWRlY29yYXRpb246bm9uZTttYXJnaW4tbGVmdDoycHhcIiBvbmNsaWNrPVwibUNhbGVuZGFyLmFkZE1vbnRoKClcIj5cIuS4i+aciFwiPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPHRyIGtleT1cImRheXRyXCI+XHJcbiAgICAgICAgICAgICAgICAgIDx0ZCBzdHlsZT1cImNvbG9yOiAjRkYwMDAwO3RleHQtZGVjb3JhdGlvbjogbm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiAjQzBEMEU4O3RleHQtYWxpZ246IGNlbnRlcjtoZWlnaHQ6IDIwcHg7d2lkdGg6IDEyJTtcIiBrZXk9XCJkYXlTdW5UaXRsZVwiPlwi5pelXCI8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJjb2xvcjojMDAwMDAwO2JhY2tncm91bmQtY29sb3I6I0MwRDBFODtoZWlnaHQ6MjBweDt3aWR0aDoxMSU7dGV4dC1hbGlnbjpjZW50ZXI7XCIgIGtleT1cIiUjdi5pZCMlXCIgZm9yPVwidiBfaW5fIHdlZWtUaXRsZXNcIj5cIiUjdi52YWx1ZSMlXCI8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9XCJjb2xvcjogI0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246IG5vbmU7YmFja2dyb3VuZC1jb2xvcjogI0MwRDBFODt0ZXh0LWFsaWduOiBjZW50ZXI7aGVpZ2h0OiAyMHB4O3dpZHRoOiAxMiU7XCIga2V5PVwiZGF5U2F0VGl0bGVcIj5cIuWFrVwiPC90ZD5cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0Ym9keSBjZWxsc3BhY2luZz1cIjBcIiBjZWxscGFkZGluZz1cIjBcIiBpZD1cImNhbGVuZGFyXCIgc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246IG5vbmU7d2lkdGg6IDE3MDtiYWNrZ3JvdW5kLWNvbG9yOiAjQzBEMEU4O2ZvbnQtc2l6ZTogOXB0O2JvcmRlcjogMHB4IGRvdHRlZCAjMUM2RkE1O1wiICBhbGlnbj1cImNlbnRlclwiIGJvcmRlcj1cIjFcIiBrZXk9XCJ0Ym9keVwiPlxyXG4gICAgICAgICAgICAgICAgICA8dHIgc3R5bGU9XCJjdXJzb3I6aGFuZFwiIGtleT1cIiUjd2Vlay5pZCMlXCIgZm9yPVwid2VlayBfaW5fIHdlZWtzXCIgZG9tRGF0YT1cIndlZWtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCAga2V5PVwiJSN2LmlkIyVcIiBvbmNsaWNrPVwiY2xpY2tEYXkodGhpcylcIiBzdHlsZT1cIiUjdi5zdHlsZSMlXCIgbGFibGU9XCIlI3YubGFibGUjJVwiIG9uTW91c2VvdmVyPVwibW91c2VPdmVyKHRoaXMpXCIgb25Nb3VzZU91dD1cIm1vdXNlT3V0KHRoaXMpXCIgY2hpbGREb21EYXRhPVwidlwiIGZvcj1cInYgX2luXyB3ZWVrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAga2V5PVwieyUjdi5pZCMlKydfY29udGVudCd9XCIgc3R5bGU9XCJtYXJnaW4tYmxvY2stc3RhcnQ6IDBlbTttYXJnaW4tYmxvY2stZW5kOiAwZW1cIj5cIiUjdi5jb250ZW50IyVcIjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBrZXk9XCJ7JSN2LmlkIyUrJ19sdW5hckluZm8nfVwiIHN0eWxlPVwibWFyZ2luLWJsb2NrLXN0YXJ0OiAwZW07bWFyZ2luLWJsb2NrLWVuZDogMGVtXCIgdGltZT1cIntuZXcgRGF0ZSgpfVwiPlwiJSN2Lmx1bmFySW5mbyMlXCI8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90Ym9keT4gICAgICBcclxuICAgICAgICAgICAgICA8L3RhYmxlPlxyXG4gICAgICAgICAgICAgIGBcclxuICAgIH0pXHJcbiAgICBcclxuICAgIGxldCBtb250aCA9IG1DYWxlbmRhclsnbW9udGgnXVxyXG4gICAgbGV0IHllYXIgPSBtQ2FsZW5kYXJbJ3llYXInXVxyXG4gICAgbGV0IHNlbGVjdERheSA9IG1DYWxlbmRhclsnc2VsZWN0RGF5J11cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICdtb250aCcsIHtcclxuXHJcbiAgICAgICAgc2V0KG52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAobW9udGggIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IG52YWx1ZVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS53ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLm1vbnRoID0gKG52YWx1ZSArIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICd5ZWFyJywge1xyXG4gICAgICAgIHNldChudmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld1llYXI6XCIgKyBudmFsdWUpXHJcbiAgICAgICAgICAgICAgICB5ZWFyID0gbnZhbHVlXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLndlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEueWVhciA9IG52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4geWVhclxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1DYWxlbmRhciwgJ3NlbGVjdERheScsIHtcclxuICAgICAgICBzZXQobnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3REYXkgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3REYXkgPSBudmFsdWVcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0RGF5XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImNsYXNzIEx1bmFyQ2FsZW5kYXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHRcclxuICAgICAqIFxyXG4gICAgICog5Yac5Y6GMTkwMC0yMTAw55qE5ram5pyI5L+h5oGv6KGoIFxyXG4gICAg5Y2B5YWt6L+b5Yi25b2i5byPOlxyXG4gICAgMHggeHh4eHggICAgXHJcbiAgICDkuozov5vliLblvaLlvI86XHJcbiAgICB4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHJcbiAgICAyMC0xN1x0MTYtMTJcdDEyLTlcdDgtNVx0ICAgIDQtMVxyXG7CoFxyXG4gICAgMS00OiDooajnpLrlvZPlubTmnInml6Dpl7DlubTvvIzmnInnmoTor53vvIzkuLrpl7DmnIjnmoTmnIjku73vvIzmsqHmnInnmoTor53vvIzkuLow44CCXHJcblxyXG4gICAgNS0xNu+8muS4uumZpOS6humXsOaciOWklueahOato+W4uOaciOS7veaYr+Wkp+aciOi/mOaYr+Wwj+aciO+8jDHkuLozMOWkqe+8jDDkuLoyOeWkqeOAgijms6jmhI/vvJrku44x5pyI5YiwMTLmnIjlr7nlupTnmoTmmK/nrKwxNuS9jeWIsOesrDXkvY3jgIIpXHJcbiAgICAxNy0yMO+8miDooajnpLrpl7DmnIjmmK/lpKfmnIjov5jmmK/lsI/mnIjvvIzku4XlvZPlrZjlnKjpl7DmnIjnmoTmg4XlhrXkuIvmnInmhI/kuYnjgIJcclxuXHJcbiAgICDkuL7kuKrkvovlrZDvvJpcclxuXHJcbiAgICAxOTgw5bm055qE5pWw5o2u5piv77yaIDB4MDk1YjAgMHjku6PooajljYHlha3ov5vliLbvvIzlkI7pnaLnmoTmmK/ljYHlha3ov5vliLbmlbDjgIJcclxuICAgICAgICAgICAgIDEwMDAgMDAwMCAwMDAwIDAwMDAgMDAwMFxyXG4gICAgICAgICAgICAgMDAwMCAwMDAwIDAwMDAgMDAwMCAxMTExXHJcblxyXG4gICAg5LqM6L+b5Yi277yaICAwMDAwwqAxMDAxIDAxMDEgMTAxMSAwMDAwXHJcblxyXG4gICAg6KGo56S6MTk4MOW5tOayoeaciemXsOaciO+8jOS7jjHmnIjliLAxMuaciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEyOeOAgTMwIOOAgTI544CBMzDjgIEyOeOAgTMw44CBIDMw44CBMjnjgIEzMOOAgTMw44CCXHJcblxyXG4gICAgMTk4MuW5tOeahOaVsOaNruaYr++8mjB4MGE5NzRcclxuICAgICAgICAgMTAxMCAgIDEwMDEgMDExMSAwMTAwXHJcbiAgICAwMDAwIDEwMTAgMCAxMDAxIDAxMTEgMDEwMFxyXG5cclxuICAgIOihqOekujE5ODLlubTnmoQ05pyI5Li66Zew5pyI77yM5Y2z5pyJ56ys5LqM5LiqNOaciO+8jOS4lOaYr+mXsOWwj+aciOOAglxyXG5cclxuICAgIOS7jjHmnIjliLAxM+aciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEzMOOAgTI544CBwqAyOSjpl7DmnIgp44CBIDMw44CBMjnjgIEyOeOAgTMw44CBIDI544CBMzDjgIEzMOOAgTMw44CCXHJcblxyXG4gIFxyXG4gICogQEFycmF5IE9mIFByb3BlcnR5XHJcbiAgKiBAcmV0dXJuIEhleCBcclxuICAqL1xyXG4gICAgdGhpcy5feWVhckluZm8gPSBbMHgwNGJkOCwgMHgwNGFlMCwgMHgwYTU3MCwgMHgwNTRkNSwgMHgwZDI2MCwgMHgwZDk1MCwgMHgxNjU1NCwgMHgwNTZhMCwgMHgwOWFkMCwgMHgwNTVkMiwvLzE5MDAtMTkwOVxyXG4gICAgICAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAweDA5NWIwLCAweDE0OTc3LC8vMTkxMC0xOTE5XHJcbiAgICAgIDB4MDQ5NzAsIDB4MGE0YjAsIDB4MGI0YjUsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MWFiNTQsIDB4MDJiNjAsIDB4MDk1NzAsIDB4MDUyZjIsIDB4MDQ5NzAsLy8xOTIwLTE5MjlcclxuICAgICAgMHgwNjU2NiwgMHgwZDRhMCwgMHgwZWE1MCwgMHgwNmU5NSwgMHgwNWFkMCwgMHgwMmI2MCwgMHgxODZlMywgMHgwOTJlMCwgMHgxYzhkNywgMHgwYzk1MCwvLzE5MzAtMTkzOVxyXG4gICAgICAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LC8vMTk0MC0xOTQ5XHJcbiAgICAgIDB4MDZjYTAsIDB4MGI1NTAsIDB4MTUzNTUsIDB4MDRkYTAsIDB4MGE1YjAsIDB4MTQ1NzMsIDB4MDUyYjAsIDB4MGE5YTgsIDB4MGU5NTAsIDB4MDZhYTAsLy8xOTUwLTE5NTlcclxuICAgICAgMHgwYWVhNiwgMHgwYWI1MCwgMHgwNGI2MCwgMHgwYWFlNCwgMHgwYTU3MCwgMHgwNTI2MCwgMHgwZjI2MywgMHgwZDk1MCwgMHgwNWI1NywgMHgwNTZhMCwvLzE5NjAtMTk2OVxyXG4gICAgICAweDA5NmQwLCAweDA0ZGQ1LCAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNmEwLCAweDE5NWE2LC8vMTk3MC0xOTc5XHJcbiAgICAgIDB4MDk1YjAsIDB4MDQ5YjAsIDB4MGE5NzQsIDB4MGE0YjAsIDB4MGIyN2EsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MGFmNDYsIDB4MGFiNjAsIDB4MDk1NzAsLy8xOTgwLTE5ODlcclxuICAgICAgMHgwNGFmNSwgMHgwNDk3MCwgMHgwNjRiMCwgMHgwNzRhMywgMHgwZWE1MCwgMHgwNmI1OCwgMHgwNTVjMCwgMHgwYWI2MCwgMHgwOTZkNSwgMHgwOTJlMCwvLzE5OTAtMTk5OVxyXG4gICAgICAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAweDA5MmQwLCAweDBjYWI1LC8vMjAwMC0yMDA5XHJcbiAgICAgIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGJhYTQsIDB4MGFkNTAsIDB4MDU1ZDksIDB4MDRiYTAsIDB4MGE1YjAsIDB4MTUxNzYsIDB4MDUyYjAsIDB4MGE5MzAsLy8yMDEwLTIwMTlcclxuICAgICAgMHgwNzk1NCwgMHgwNmFhMCwgMHgwYWQ1MCwgMHgwNWI1MiwgMHgwNGI2MCwgMHgwYTZlNiwgMHgwYTRlMCwgMHgwZDI2MCwgMHgwZWE2NSwgMHgwZDUzMCwvLzIwMjAtMjAyOVxyXG4gICAgICAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YWZiLCAweDA0YWQwLCAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LC8vMjAzMC0yMDM5XHJcbiAgICAgIDB4MGI1YTAsIDB4MDU2ZDAsIDB4MDU1YjIsIDB4MDQ5YjAsIDB4MGE1NzcsIDB4MGE0YjAsIDB4MGFhNTAsIDB4MWIyNTUsIDB4MDZkMjAsIDB4MGFkYTAsLy8yMDQwLTIwNDlcclxuICAgICAgMHgxNGI2MywgMHgwOTM3MCwgMHgwNDlmOCwgMHgwNDk3MCwgMHgwNjRiMCwgMHgxNjhhNiwgMHgwZWE1MCwgMHgwNmIyMCwgMHgxYTZjNCwgMHgwYWFlMCwvLzIwNTAtMjA1OVxyXG4gICAgICAweDBhMmUwLCAweDBkMmUzLCAweDBjOTYwLCAweDBkNTU3LCAweDBkNGEwLCAweDBkYTUwLCAweDA1ZDU1LCAweDA1NmEwLCAweDBhNmQwLCAweDA1NWQ0LC8vMjA2MC0yMDY5XHJcbiAgICAgIDB4MDUyZDAsIDB4MGE5YjgsIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGI2YTYsIDB4MGFkNTAsIDB4MDU1YTAsIDB4MGFiYTQsIDB4MGE1YjAsIDB4MDUyYjAsLy8yMDcwLTIwNzlcclxuICAgICAgMHgwYjI3MywgMHgwNjkzMCwgMHgwNzMzNywgMHgwNmFhMCwgMHgwYWQ1MCwgMHgxNGI1NSwgMHgwNGI2MCwgMHgwYTU3MCwgMHgwNTRlNCwgMHgwZDE2MCwvLzIwODAtMjA4OVxyXG4gICAgICAweDBlOTY4LCAweDBkNTIwLCAweDBkYWEwLCAweDE2YWE2LCAweDA1NmQwLCAweDA0YWUwLCAweDBhOWQ0LCAweDBhMmQwLCAweDBkMTUwLCAweDBmMjUyLC8vMjA5MC0yMDk5XHJcbiAgICAgIDB4MGQ1MjBdLy8yMTAwXHJcblxyXG5cclxuICAgIHRoaXMuX2FzdHJvbG9neSA9IFtcIumtlOe+r1wiLCBcIuawtOeTtlwiLCBcIuWPjOmxvFwiLCBcIueZvee+ilwiLCBcIumHkeeJm1wiLCBcIuWPjOWtkFwiLCBcIuW3qOifuVwiLCBcIueLruWtkFwiLCBcIuWkhOWls1wiLCBcIuWkqeenpFwiLCBcIuWkqeidjlwiLCBcIuWwhOaJi1wiLCBcIumtlOe+r1wiXVxyXG4gICAgLyoqXHJcbiAgICAgICog5YWs5Y6G5q+P5Liq5pyI5Lu955qE5aSp5pWw5pmu6YCa6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9kYXlJbk1vbnRoID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlpKnlubLpgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX1RpYW5HYW4gPSBbXCLnlLJcIiwgXCLkuZlcIiwgXCLkuJlcIiwgXCLkuIFcIiwgXCLmiIpcIiwgXCLlt7FcIiwgXCLluppcIiwgXCLovptcIiwgXCLlo6xcIiwgXCLnmbhcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlnLDmlK/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX0RpWmhpID0gW1wi5a2QXCIsIFwi5LiRXCIsIFwi5a+FXCIsIFwi5Y2vXCIsIFwi6L6wXCIsIFwi5bezXCIsIFwi5Y2IXCIsIFwi5pyqXCIsIFwi55SzXCIsIFwi6YWJXCIsIFwi5oiMXCIsIFwi5LqlXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog55Sf6IKW6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9ab2RpYWMgPSBbXCLpvKBcIiwgXCLniZtcIiwgXCLomY5cIiwgXCLlhZRcIiwgXCLpvplcIiwgXCLom4dcIiwgXCLpqaxcIiwgXCLnvopcIiwgXCLnjLRcIiwgXCLpuKFcIiwgXCLni5dcIiwgXCLnjKpcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiAyNOiKguawlOmAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2FsZW5kYXJpY2l0eSA9IFtcIuWwj+WvklwiLCBcIuWkp+WvklwiLCBcIueri+aYpVwiLCBcIumbqOawtFwiLCBcIuaDiuibsFwiLCBcIuaYpeWIhlwiLCBcIua4heaYjlwiLCBcIuiwt+mbqFwiLCBcIueri+Wkj1wiLCBcIuWwj+a7oVwiLCBcIuiKkuenjVwiLCBcIuWkj+iHs1wiLCBcIuWwj+aakVwiLCBcIuWkp+aakVwiLCBcIueri+eni1wiLCBcIuWkhOaakVwiLCBcIueZvemcslwiLCBcIueni+WIhlwiLCBcIuWvkumcslwiLCBcIumcnOmZjVwiLCBcIueri+WGrFwiLCBcIuWwj+mbqlwiLCBcIuWkp+mbqlwiLCBcIuWGrOiHs1wiXVxyXG4gICAgLyoqXHJcbiAgICAgIOWGnOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX2x1bmFySG9saWRheSA9IFtcIjAxMDEg5pil6IqCXCIsIFwiMDExNSDlhYPlrrVcIiwgXCIwNTA1IOerr+WNiFwiLCBcIjA3MDcg5oOF5Lq6XCIsIFwiMDcxNSDkuK3lhYNcIixcclxuICAgICAgXCIwODE1IOS4reeni1wiLCBcIjA5MDkg6YeN6ZizXCIsIFwiMTIwOCDohYrlhatcIiwgXCIxMjI0IOWwj+W5tFwiLCBcIjEyMzAg6Zmk5aSVXCJdXHJcbiAgICAvKlxyXG4gICAgIOWFrOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX3NvbGFySG9saWRheSA9IFtcclxuICAgICAgXCIwMTAxIOWFg+aXplwiLCBcIjAyMTQg5oOF5Lq6XCIsIFwiMDMwOCDlpoflpbNcIiwgXCIwMzEyIOakjeagkVwiLCBcIjAzMTUg5raI6LS56ICF5p2D55uK5pelXCIsIFwiMDQwMSDmhJrkurpcIiwgXCIwNTAxIOWKs+WKqFwiLCBcIjA1MDQg6Z2S5bm0XCIsIC8vXHJcbiAgICAgIFwiMDUxMiDmiqTlo6tcIiwgXCIwNjAxIOWEv+erpVwiLCBcIjA3MDEg5bu65YWaXCIsIFwiMDgwMSDlu7rlhptcIiwgXCIwODA4IOeItuS6slwiLCBcIjA5MTAg5pWZ5biIXCIsIFwiMDkyOCDlrZTlrZDor57ovrBcIiwgLy9cclxuICAgICAgXCIxMDAxIOWbveW6hlwiLCBcIjEwMjQg6IGU5ZCI5Zu95pelXCIsIFwiMTExMiDlrZnkuK3lsbHor57ovrDnuqrlv7VcIiwgXCIxMjIwIOa+s+mXqOWbnuW9kue6quW/tVwiLCBcIjEyMjUg5Zyj6K+eXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogMTkwMC0yMTAw5ZCE5bm05Yac5Y6G55qEMjToioLmsJTml6XmnJ/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NhbGVuZGFyaWNpdHlUYWJsZSA9IFsnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJywgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLFxyXG4gICAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQxOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJywgJzk3YmQwOTgwMWQ5ODA4MmM5NWY4ZTFjZmNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGUxY2ZjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwN2Y1OTViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzkyNzRjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JkMDdmMTQ4N2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJywgJzk3YmNmN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiOTdiZDE5N2MzNmM5MjEwYzkyNzRjOTIwZScsICc5N2JjZjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNzBjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4MzdmMGUzN2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzIzYjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OTk4MDgzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZjA3ZTdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzNjY2NWI2NmFhODk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLFxyXG4gICAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JywgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOS4reaWh+aXpeacn1xyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2hpbmVzZUNoYXIgPSBbXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlhpzljobov5vliLbljZXkvY1cclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NoaW5lc2VUZW5DaGFyID0gW1wi5YidXCIsIFwi5Y2BXCIsIFwi5bu/XCIsIFwi5Y2FXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5pyI5Lu95Yac5Y6G6KGo56S6XHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9sdW5hck1vbnRoVGFibGUgPSBbXCLmraNcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIiwgXCLlhqxcIiwgXCLohYpcIl1cclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm05LiA5pW05bm055qE5oC75aSp5pWwXHJcbiAgICAqL1xyXG4gIF9sdW5hclllYXJEYXlzKHllYXIpIHtcclxuICAgIHZhciBpLCBzdW0gPSAzNDg7XHJcbiAgICBmb3IgKGkgPSAweDgwMDA7IGkgPiAweDg7IGkgPj49IDEpIHsgc3VtICs9ICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiBpKSA/IDEgOiAwOyB9XHJcbiAgICByZXR1cm4gKHN1bSArIHRoaXMuX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTlr7nlupTnmoTpl7DmnIhcclxuICAgICovXHJcbiAgX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpIHtcclxuICAgIHJldHVybiAodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgMHgwMDAwZik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ55bm06Zew5pyI55qE5aSp5pWwIOiLpeivpeW5tOayoeaciemXsOaciOWImei/lOWbnjBcclxuICAgICovXHJcbiAgX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikge1xyXG4gICAgaWYgKHRoaXMuX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpKSB7XHJcbiAgICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmIDB4MTAwMDApID8gMzAgOiAyOSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDApO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm0bW9udGjmnIjvvIjpnZ7pl7DmnIjvvInnmoTmgLvlpKnmlbDvvIxcclxuICAgICovXHJcbiAgX21vbnRoRGF5cyh5ZWFyLCBtb250aCkge1xyXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPCAxKSB7IHJldHVybiAtMSB9Ly/mnIjku73lj4LmlbDku44x6IezMTLvvIzlj4LmlbDplJnor6/ov5Tlm54tMVxyXG5cclxuICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPyAzMCA6IDI5KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWFrOWOhnllYXLlubRtb250aOaciOeahOWkqeaVsFxyXG4gICAgKi9cclxuICBfZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkgeyByZXR1cm4gLTEgfSAvL+iLpeWPguaVsOmUmeivryDov5Tlm54tMVxyXG4gICAgbGV0IG1zID0gbW9udGggLSAxO1xyXG4gICAgaWYgKG1zID09IDEpIHsgLy8y5pyI5Lu955qE6Zew5bmz6KeE5b6L5rWL566X5ZCO56Gu6K6k6L+U5ZueMjjmiJYyOVxyXG4gICAgICByZXR1cm4gKCgoeWVhciAlIDQgPT0gMCkgJiYgKHllYXIgJSAxMDAgIT0gMCkgfHwgKHllYXIgJSA0MDAgPT0gMCkpID8gMjkgOiAyOCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKHRoaXMuX2RheUluTW9udGhbbXNdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWGnOWOhuW5tOS7vei9rOaNouS4uuW5suaUr+e6quW5tFxyXG4gICAgICDlubLmlK/nuqrlubTms5Vcclxu44CA44CAICAgICDlpKnlubLlnLDmlK/ooahcclxu44CA44CAICAgMDEu55Sy5a2QIDAyLuS5meS4kSAwMy7kuJnlr4UgMDQu5LiB5Y2vIDA1LuaIiui+sCAwNi7lt7Hlt7MgMDcu5bqa5Y2IIDA4Lui+m+acqiAwOS7lo6znlLMgMTAu55m46YWJXHJcbuOAgCAgIOOAgCAgIDExLueUsuaIjCAxMi7kuZnkuqUgMTMu5LiZ5a2QIDE0LuS4geS4kSAxNS7miIrlr4UgMTYu5bex5Y2vIDE3LuW6mui+sCAxOC7ovpvlt7MgMTku5aOs5Y2IIDIwLueZuOacqlxyXG7jgIAgICDjgIAgICAyMS7nlLLnlLMgMjIu5LmZ6YWJIDIzLuS4meaIjCAyNC7kuIHkuqUgMjUu5oiK5a2QIDI2LuW3seS4kSAyNy7luprlr4UgMjgu6L6b5Y2vIDI5LuWjrOi+sCAzMC7nmbjlt7Ncclxu44CAICDjgIAgICAgMzEu55Sy5Y2IIDMyLuS5meacqiAzMy7kuJnnlLMgMzQu5LiB6YWJIDM1LuaIiuaIjCAzNi7lt7HkuqUgMzcu5bqa5a2QIDM4Lui+m+S4kSAzOS7ku7vlr4UgNDAu55m45Y2vXHJcbuOAgCAgIOOAgCAgIDQxLueUsui+sCA0Mi7kuZnlt7MgNDMu5LiZ5Y2IIDQ0LuS4geacqiA0NS7miIrnlLMgNDYu5bex6YWJIDQ3LuW6muaIjCA0OC7ovpvkuqUgNDku5aOs5a2QIDUwLueZuOS4kVxyXG7jgIDjgIAgICAgICA1MS7nlLLlr4UgNTIu5LmZ5Y2vIDUzLuS4mei+sCA1NC7kuIHlt7EgNTUu5oiK5Y2IIDU2LuW3seacqiA1Ny7luprnlLMgNTgu6L6b6YWJIDU5LuWjrOaIjCA2MC7nmbjkuqVcclxuICAgICDnlKjpmLPljobnmoTlubTku73pmaTku6U2MOW+l+WIsOeahOW5tOS7veWGjeWHj+WOuzPlsLHmmK/ov5nkuIDlubTlhpzljobnmoTlubLmlK/luo/lj7fmlbDvvIzmn6XlubLmlK/ooajlvpfliLDlubLmlK/lubTnuqrvvIxcclxuICAgICDoi6Xlvpflh7rmnaXnmoTmlbDmja7lsI/kuo7pm7bmiJbogIXnrYnkuo7pm7bliJnliqDkuIo2MOWNs+WPr+OAglxyXG4gICAgIOS4vuS4quS+i+WtkO+8muaxgjIwMTnlubTlubLmlK/vvIwyMDE5w7c2MO+8nTMz5L2ZMznvvIzlubTlubLmlK/luo/lj7fmlbA9MzktMz0zNu+8jFxyXG4gICAgIOaJgOS7peW+l+efpeS7iuW5tOaYr+W3seS6peW5tOOAguW5suaUr+e6quW5tOmDveaYr+S7juavj+W5tOeahOeri+aYpeW8gOWni+eahO+8jOS4jeeuoeeri+aYpeWcqOWJjeS4gOW5tOeahOiFiuaciOi/mOaYr+aWsOS4gOW5tOeahOato+aciO+8jOeri+aYpeW8gOWni+aJjeeul+aWsOeahOS4gOW5tOOAglxyXG4gICAqL1xyXG4gIF9nZXRHYW5aaGlZZWFyKHllYXIpIHtcclxuICAgIHZhciBnYW5LZXkgPSAoeWVhciAtIDMpICUgMTA7XHJcbiAgICB2YXIgemhpS2V5ID0gKHllYXIgLSAzKSAlIDEyO1xyXG4gICAgaWYgKGdhbktleSA9PSAwKSBnYW5LZXkgPSAxMDsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlpKnlubJcclxuICAgIGlmICh6aGlLZXkgPT0gMCkgemhpS2V5ID0gMTI7Ly/lpoLmnpzkvZnmlbDkuLow5YiZ5Li65pyA5ZCO5LiA5Liq5Zyw5pSvXHJcbiAgICByZXR1cm4gdGhpcy5fVGlhbkdhbltnYW5LZXkgLSAxXSArIHRoaXMuX0RpWmhpW3poaUtleSAtIDFdO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFrOWOhuaciOOAgeaXpeWIpOaWreaJgOWxnuaYn+W6p1xyXG4gICAqL1xyXG4gIF9nZXRBc3Ryb2xvZ3koY01vbnRoLCBjRGF5KSB7XHJcbiAgICB2YXIgYXJyID0gWzIwLCAxOSwgMjEsIDIxLCAyMSwgMjIsIDIzLCAyMywgMjMsIDIzLCAyMiwgMjJdO1xyXG4gICAgcmV0dXJuIHRoaXMuX2FzdHJvbG9neVtjTW9udGggLSAoY0RheSA8IGFycltjTW9udGggLSAxXSA/IDEgOiAwKV0gKyBcIuW6p1wiOy8v5bqnXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogXHJcbiAgICDlpKnlubLkuIDlhbHmnInljYHkuKrvvIzliIbliKvmnInnlLLjgIHkuZnjgIHkuJnjgIHkuIHjgIHmiIrjgIHlt7HjgIHluprjgIHovpvjgIHlo6zjgIHnmbjjgILlnLDmlK/kuIDlhbHmnInljYHkuozkuKrvvIzliIbliKvmnInlrZDjgIHkuJHjgIHlr4XjgIHlja/jgIHovrDjgIHlt7PjgIHljYjjgIHmnKrjgIHnlLPjgIHphYnjgIHmiIzjgIHkuqXjgILlubLmlK/ov5jmnInpmLTpmLPkuYvliIbvvIznlLLjgIHkuJnjgIHmiIrjgIHluprjgIHlo6zkuLrpmLPlubLvvIzkuZnjgIHkuIHjgIHlt7HjgIHovpvjgIHnmbjkuLrpmLTlubLjgILlrZDjgIHlr4XjgIHovrDjgIHljYjjgIHnlLPjgIHmiIzkuLrpmLPmlK/vvIzkuJHjgIHlja/jgIHlt7PjgIHmnKrjgIHphYnjgIHkuqXkuLrpmLTmlK/vvIzkuIDkuKrlpKnlubLlkozkuIDkuKrlnLDmlK/nm7jphY3vvIzmjpLliJfotbfmnaXvvIzlpKnlubLlnKjliY3vvIzlnLDmlK/lnKjlkI7vvIzlpKnlubLnlLHnlLLotbfvvIzlnLDmlK/nlLHlrZDotbfvvIzpmLPlubLphY3pmLPmlK/vvIzpmLTlubLphY3pmLTmlK/vvIzlhbHmnInlha3ljYHkuKrnu4TlkIjjgILlj6TkurrlsLHnlKjov5k2MOS4que7hOWQiOW+queOr+i1t+adpee6quW5tO+8jOe6quaciO+8jOe6quaXpe+8jOe6quaXtuOAglxyXG5cclxuICAgIOe6quW5tO+8jOS4reWbveWPpOS6uueUqDYw5Liq57uE5ZCI5L6d5qyh57qq5bm077yM5LiA5bm05LiA5Liq57uE5ZCI77yM77yM5bmy5pSv57qq5bm077yM5LiA5Liq5ZGo5pyf55qE56ys5LiA5bm05Li655Sy5a2Q77yM56ys5LqM5bm05Li65LmZ5LiR77yM5L6d5qyh57G75o6o77yMNjDlubTkuIDkuKrova7lm57vvIzmr4/kuIDkuKrmlrDlubTlvIDlp4vkuo7mraPmnIjliJ3kuIDnmoTmraPlrZDml7bjgIJcclxuXHJcbiAgICDnuqrmnIjvvIzlubLmlK/nuqrmnIjvvIzph4fnlKjmr4/kuKrlnLDmlK/lr7nlupQyNOiKguawlOiHquafkOiKguawlOiHs+S4i+S4gOS4quiKguawlO+8jOS7peS6pOe7k+aXtumXtOWGs+Wumui1t+Wni+eahOS4gOS4quaciOacn+mXtOOAguW5suaUr+e6quaciOaYr+W5suaUr+WOhueahOS4gOmDqOWIhu+8jOS4u+imgeeUqOS6jumjjuawtOacr+acr+etiemihuWfn++8jOi/meS9v+W+l+W5suaUr+WOhuS4gOebtOWcqOWumOaWueWSjOawkemXtOmDvea1geS8oOS4jeihsOOAglxyXG5cclxuICAgIOe6quaXpe+8jOe6quaXpeaYr+W5suaUr+eahOacgOaXqeeUqOazle+8jOS4gOS4quaYvOWknOaYr+S4gOWkqe+8jOeUqDYw5Liq57uE5ZCI5p2l5L6d5qyh57qq5pel77yM5q+U5aaC5LuK5aSp5piv55Sy5a2Q5pel77yM5piO5aSp5bCx5piv5LmZ5LiR5pel77yMNjDlpKnkuIDkuKrlvqrnjq/vvIzmlrDnmoTkuIDlpKnku47mraPlrZDljYjlvIDlp4vvvIzkuK3lm73mmI7noa7lj6/mn6XnmoTlubLmlK/nuqrml6XvvIzmmK/mmKXnp4vpsoHpmpDlhazkuInlubTvvIjlhazlhYPliY03MjDlubTvvInvvIzot53ku4rlt7Lnu4/mnIkyNzAw5aSa5bm05LqG77yM6L+Z5piv6L+E5LuK5Li65q2i5piv5LiW55WM5LiK5pyA5pep55qE6K6w5pel5rOV44CCXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIOS8oOWFpW9mZnNldOWBj+enu+mHj+i/lOWbnuW5suaUryBcclxuICAgICovXHJcbiAgX2dldEdhblpoaShvZmZzZXQpIHtcclxuICAgIHJldHVybiB0aGlzLl9UaWFuR2FuW29mZnNldCAlIDEwXSArIHRoaXMuX0RpWmhpW29mZnNldCAlIDEyXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAg5YWs5Y6GeWVhcuW5tOiOt+W+l+ivpeW5tOesrGluZGV45Liq6IqC5rCU55qE5YWs5Y6G5pel5pyfXHJcbiAgICAqL1xyXG4gIF9nZXRDYWxlbmRhcmljaXR5KHllYXIsIGluZGV4KSB7XHJcbiAgICBpZiAoeWVhciA8IDE5MDAgfHwgeWVhciA+IDIxMDApIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgMSB8fCBpbmRleCA+IDI0KSB7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHZhciBfdGFibGUgPSB0aGlzLl9jYWxlbmRhcmljaXR5VGFibGVbeWVhciAtIDE5MDBdO1xyXG4gICAgdmFyIF9jYWxlbmRhcmljaXR5SW5mbyA9IFtcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDUsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDE1LCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMjAsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyNSwgNSkpLnRvU3RyaW5nKClcclxuICAgIF07XHJcblxyXG4gICAgdmFyIF9jYWxkYXkgPSBbXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cig0LCAyKSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoX2NhbGRheVtpbmRleCAtIDFdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDlhpzljobmsYnor63ooajnpLpcclxuICAgICovXHJcbiAgX2dldENoaW5hTW9udGgobW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkge1xyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJldHVybiBgJHt0aGlzLl9sdW5hck1vbnRoVGFibGVbbW9udGggLSAxXX3mnIhgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAq5Yac5Y6G5pel5pyf5pel6KGo56S6XHJcbiAgICAqL1xyXG4gIF9nZXRDaGluYURheShkYXkpIHtcclxuICAgIGxldCBzO1xyXG4gICAgc3dpdGNoIChkYXkpIHtcclxuICAgICAgY2FzZSAxMDpcclxuICAgICAgICBzID0gJ+WIneWNgSc7IGJyZWFrO1xyXG4gICAgICBjYXNlIDIwOlxyXG4gICAgICAgIHMgPSAn5LqM5Y2BJzsgYnJlYWs7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgcyA9ICfkuInljYEnOyBicmVhaztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBzID0gdGhpcy5fY2hpbmVzZVRlbkNoYXJbTWF0aC5mbG9vcihkYXkgLyAxMCldO1xyXG4gICAgICAgIHMgKz0gdGhpcy5fY2hpbmVzZUNoYXJbZGF5ICUgMTBdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChzKTtcclxuICB9XHJcbiAgLypcclxuICDov5Tlm57lhpzljoboioLml6VcclxuICAqL1xyXG4gIF9nZXRMdW5hckhvbGlkYXkobW9udGgsIGRheSkge1xyXG4gICAgbGV0IGx1bmFySG9saWRheVN0ciA9IFwiXCJcclxuICAgIHRoaXMuX2x1bmFySG9saWRheS5mb3JFYWNoKGx1bmFyID0+IHtcclxuICAgICAgbGV0IGxkID0gbHVuYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgbGR2ID0gbHVuYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgbG1kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBsbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgbGRheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgbG1kID0gbG1vbnRoX3YgKyBsZGF5X3Y7XHJcbiAgICAgIGlmIChsZC50cmltKCkgPT09IGxtZC50cmltKCkpIHtcclxuICAgICAgICBsdW5hckhvbGlkYXlTdHIgPSBsZHZcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBsdW5hckhvbGlkYXlTdHJcclxuICB9XHJcbiAgLyoqXHJcbiAqIOi/lOWbnuWvueW6lOaXpeacn+eahOWFrOWOhuiKguaXpVxyXG4gKi9cclxuICBfZ2V0U29sYXJIb2xpZGF5KG1vbnRoLCBkYXkpIHtcclxuICAgIGxldCBzb2xhckhvbGlkYXlTdHIgPSBcIlwiO1xyXG4gICAgdGhpcy5fc29sYXJIb2xpZGF5LmZvckVhY2goc29sYXIgPT4ge1xyXG5cclxuICAgICAgbGV0IHNkID0gc29sYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgc2R2ID0gc29sYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgc21kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBzbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgc2RheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgc21kID0gc21vbnRoX3YgKyBzZGF5X3Y7XHJcbiAgICAgIGlmIChzZC50cmltKCkgPT09IHNtZC50cmltKCkpIHtcclxuICAgICAgICBzb2xhckhvbGlkYXlTdHIgPSBzZHY7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gc29sYXJIb2xpZGF5U3RyXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICDojrflj5blr7nlupTlubTku73nmoTnlJ/ogpZcclxuICAgICovXHJcbiAgX2dldFpvZGlhYyh5ZWFyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fWm9kaWFjWyh5ZWFyIC0gNCkgJSAxMl1cclxuICB9XHJcbiAgLypcclxuICAqIOiOt+WPluaXpeacn+aYr+WQpuS4ujI06IqC5rCUXHJcbiAgICDpppblhYjojrflj5boioLmsJTkuLrlvZPmnIjnmoTnrKzlh6DlpKnvvIzkuI7lvZPliY3ljLnphY3nmoTvvIzov5Tlm57lr7nlupTnmoToioLmsJRcclxuICAqL1xyXG4gIF9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkoZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBzZWNvbmRDYWxlbmRhcmljaXR5RGF5LCBub3dTZWxlY3REYXksIG5vd1NlbGVjdE1vbnRoKSB7XHJcbiAgICAvL+S8oOWFpeeahOaXpeacn+eahOiKguawlOS4juWQplxyXG5cclxuICAgIGxldCBjYWxlbmRhcmljaXR5U3RyID0gXCJcIjtcclxuICAgIGlmIChmaXJzdENhbGVuZGFyaWNpdHlEYXkgPT0gbm93U2VsZWN0RGF5KSB7XHJcblxyXG4gICAgICBjYWxlbmRhcmljaXR5U3RyID0gdGhpcy5fY2FsZW5kYXJpY2l0eVtub3dTZWxlY3RNb250aCAqIDIgLSAyXTtcclxuICAgIH1cclxuICAgIGlmIChzZWNvbmRDYWxlbmRhcmljaXR5RGF5ID09IG5vd1NlbGVjdERheSkge1xyXG5cclxuICAgICAgY2FsZW5kYXJpY2l0eVN0ciA9IHRoaXMuX2NhbGVuZGFyaWNpdHlbbm93U2VsZWN0TW9udGggKiAyIC0gMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2FsZW5kYXJpY2l0eVN0clxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOS8oOWFpemYs+WOhuW5tOaciOaXpeiOt+W+l+ivpue7hueahOWFrOWOhuOAgeWGnOWOhm9iamVjdOS/oeaBryA8PT5KU09OXHJcbiAgICAqIEBwYXJhbSBzb2xhclllYXIgIHNvbGFyIHllYXJcclxuICAgICogQHBhcmFtIHNvbGFyTW9udGggIHNvbGFyIG1vbnRoXHJcbiAgICAqIEBwYXJhbSBzb2xhckRheSAgc29sYXIgZGF5XHJcbiAgICAqIEByZXR1cm4gSlNPTiBvYmplY3RcclxuICAgICovXHJcbiAgZ2V0THVuYXIoc29sYXJZZWFyLCBzb2xhck1vbnRoLCBzb2xhckRheSkgeyAvL+WPguaVsOWMuumXtDE5MDAuMS4zMX4yMTAwLjEyLjMxXHJcbiAgICBpZiAoc29sYXJZZWFyIDwgMTkwMCB8fCBzb2xhclllYXIgPiAyMTAwKSB7IHJldHVybiAtMTsgfS8v5bm05Lu96ZmQ5a6a44CB5LiK6ZmQXHJcbiAgICBpZiAoc29sYXJZZWFyID09IDE5MDAgJiYgc29sYXJNb250aCA9PSAxICYmIHNvbGFyRGF5IDwgMzEpIHsgcmV0dXJuIC0xOyB9Ly/kuIvpmZBcclxuICAgIGlmICghc29sYXJZZWFyKSB7IC8v5pyq5Lyg5Y+CICDojrflvpflvZPlpKlcclxuICAgICAgdmFyIG5vd1NlbGVjdERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIG5vd1NlbGVjdERhdGUgPSBuZXcgRGF0ZShzb2xhclllYXIsIHBhcnNlSW50KHNvbGFyTW9udGgpIC0gMSwgc29sYXJEYXkpXHJcbiAgICB9XHJcbiAgICB2YXIgbm93U2VsZWN0WWVhciA9IG5vd1NlbGVjdERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHZhciBub3dTZWxlY3RNb250aCA9IG5vd1NlbGVjdERhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgbm93U2VsZWN0RGF5ID0gbm93U2VsZWN0RGF0ZS5nZXREYXRlKCk7XHJcbiAgICB2YXIgb2Zmc2V0ID0gKERhdGUuVVRDKG5vd1NlbGVjdERhdGUuZ2V0RnVsbFllYXIoKSwgbm93U2VsZWN0RGF0ZS5nZXRNb250aCgpLCBub3dTZWxlY3REYXRlLmdldERhdGUoKSkgLSBEYXRlLlVUQygxOTAwLCAwLCAzMSkpIC8gODY0MDAwMDA7XHJcbiAgICAvL29mZnNldOW9k+WJjeaXpeacn+S4jjE5OTAuMS4zMeebuOW3ruaXpeacn+OAgjE5OTAuMS4zMS7lvIDlp4vnrKzkuIDkuKrlhpzljoblkajmnJ/lvIDlp4tcclxuICAgIHZhciB0ZW1wWWVhciwgbGVhcCA9IDAsIHRlbXAgPSAwO1xyXG4gICAgLy90ZW1wWWVhciDlvZPliY3lubTku73oh7MxOTkw5bm05L6d5qyh5YeP5Y675Lit6Ze05omA5pyJ55qE5Yac5Y6G5bm055qE5aSp5pWw77yM5L2Z5LiLb2Zmc2V05Li65b2T5YmN5Yac5Y6G5bm056ys5aSa5bCR5aSpXHJcbiAgICBmb3IgKHRlbXBZZWFyID0gMTkwMDsgdGVtcFllYXIgPCAyMTAxICYmIG9mZnNldCA+IDA7IHRlbXBZZWFyKyspIHtcclxuICAgICAgdGVtcCA9IHRoaXMuX2x1bmFyWWVhckRheXModGVtcFllYXIpOy8v6K6h566X5b2T5YmN5Yac5Y6G5bm055qE5oC75aSp5pWwXHJcbiAgICAgIG9mZnNldCAtPSB0ZW1wO1xyXG4gICAgICAvL29mZnNldOS+neasoeWHj+WOu+aJgOacieWGnOWOhuW5tOeahOaAu+WkqeaVsOWQjlxyXG4gICAgICAvL3RlbXBZZWFy5Li65b2T5YmN55qE55qE5Yac5Y6G5bm05Lu9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA8IDApIHtcclxuICAgICAgLy9vZmZzZXTlsI/kuo4w5pe25YCZ5L+u5q2jXHJcbiAgICAgIG9mZnNldCArPSB0ZW1wO1xyXG4gICAgICB0ZW1wWWVhci0tO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgaXNUb2RheU9iaiA9IG5ldyBEYXRlKCk7Ly/ojrflj5blvZPliY3ml6XmnJ9cclxuICAgIHZhciBpc1RvZGF5ID0gZmFsc2U7XHJcbiAgICBpZiAoaXNUb2RheU9iai5nZXRGdWxsWWVhcigpID09IG5vd1NlbGVjdFllYXIgJiYgaXNUb2RheU9iai5nZXRNb250aCgpICsgMSA9PSBub3dTZWxlY3RNb250aCAmJiBpc1RvZGF5T2JqLmdldERhdGUoKSA9PSBub3dTZWxlY3REYXkpIHtcclxuICAgICAgaXNUb2RheSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvL+aYn+acn+WHoFxyXG4gICAgbGV0IG5XZWVrID0gbm93U2VsZWN0RGF0ZS5nZXREYXkoKTtcclxuICAgIGxldCBjV2VlayA9IHRoaXMuX2NoaW5lc2VDaGFyW25XZWVrXTtcclxuICAgIGlmIChuV2VlayA9PSAwKSB7XHJcbiAgICAgIG5XZWVrID0gNztcclxuICAgIH0vL+aVsOWtl+ihqOekuuWRqOWHoOmhuuW6lOWkqeacneWRqOS4gOW8gOWni+eahOaDr+S+i1xyXG4gICAgLy/lhpzljoblubRcclxuICAgIHZhciB5ZWFyID0gdGVtcFllYXI7XHJcblxyXG4gICAgdmFyIGxlYXAgPSB0aGlzLl9sZWFwTW9udGhJbkx1bmFyWWVhcih0ZW1wWWVhcik7IC8v6Zew5ZOq5Liq5pyIXHJcbiAgICB2YXIgaXNMZWFwID0gZmFsc2U7XHJcblxyXG4gICAgLy/mlYjpqozpl7DmnIhcclxuICAgIHZhciB0ZW1wTW9udGg7XHJcbiAgICBmb3IgKHRlbXBNb250aCA9IDE7IHRlbXBNb250aCA8IDEzICYmIG9mZnNldCA+IDA7IHRlbXBNb250aCsrKSB7XHJcblxyXG4gICAgICBpZiAobGVhcCA+IDAgJiYgdGVtcE1vbnRoID09IChsZWFwICsgMSkgJiYgaXNMZWFwID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy/pl7DmnIhcclxuICAgICAgICAtLXRlbXBNb250aDtcclxuICAgICAgICBpc0xlYXAgPSB0cnVlO1xyXG4gICAgICAgIHRlbXAgPSB0aGlzLl9sZWFwRGF5c0luTHVuYXJZZWFyKHllYXIpOyAvL+iuoeeul+WGnOWOhumXsOaciOWkqeaVsFxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8v6Z2e6Zew5pyIXHJcbiAgICAgICAgdGVtcCA9IHRoaXMuX21vbnRoRGF5cyh5ZWFyLCB0ZW1wTW9udGgpOy8v6K6h566X5Yac5Y6G5pmu6YCa5pyI5aSp5pWwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0xlYXAgPT0gdHJ1ZSAmJiB0ZW1wTW9udGggPT0gKGxlYXAgKyAxKSkge1xyXG4gICAgICAgIC8v5aaC5p6c6Zew5pyI5Y675o6J6Zew5pyI5qCH6K6wXHJcbiAgICAgICAgaXNMZWFwID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgb2Zmc2V0IC09IHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXAgPiAwICYmIHRlbXBNb250aCA9PSBsZWFwICsgMSlcclxuICAgICAgaWYgKGlzTGVhcCkge1xyXG4gICAgICAgIGlzTGVhcCA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlzTGVhcCA9IHRydWU7IC0tdGVtcE1vbnRoO1xyXG4gICAgICB9XHJcbiAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4gICAgICBvZmZzZXQgKz0gdGVtcDtcclxuICAgICAgLS10ZW1wTW9udGg7XHJcbiAgICB9XHJcbiAgICAvL+WGnOWOhuaciFxyXG4gICAgY29uc3QgbW9udGggPSB0ZW1wTW9udGg7XHJcbiAgICAvL+WGnOWOhuaXpVxyXG4gICAgY29uc3QgZGF5ID0gb2Zmc2V0ICsgMTtcclxuXHJcbiAgICAvL+WkqeW5suWcsOaUr+WkhOeQhlxyXG4gICAgdmFyIHNtID0gbm93U2VsZWN0TW9udGggLSAxO1xyXG4gICAgdmFyIGdhblpoaVllYXIgPSB0aGlzLl9nZXRHYW5aaGlZZWFyKHllYXIpO1xyXG5cclxuICAgIC8v5pyI5p+x5o6o566X6KGoXHJcbiAgICAvLzE5MDDlubQx5pyI5bCP5a+S5Lul5YmN5Li6IOS4meWtkOaciCg2MOi/m+WItjEyKVxyXG4gICAgdmFyIF9maXJzdENhbGVuZGFyaWNpdHlEYXkgPSB0aGlzLl9nZXRDYWxlbmRhcmljaXR5KG5vd1NlbGVjdFllYXIsIChub3dTZWxlY3RNb250aCAqIDIgLSAxKSk7Ly/ov5Tlm57lvZPmnIjjgIzoioLjgI3kuLrlh6Dml6XlvIDlp4tcclxuICAgIHZhciBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSA9IHRoaXMuX2dldENhbGVuZGFyaWNpdHkobm93U2VsZWN0WWVhciwgKG5vd1NlbGVjdE1vbnRoICogMikpOy8v6L+U5Zue5b2T5pyI44CM6IqC44CN5Li65Yeg5pel5byA5aeLXHJcbiAgICAvL+S+neaNrjEy6IqC5rCU5L+u5q2j5bmy5pSv5pyIXHJcbiAgICBsZXQgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMSk7XHJcbiAgICBpZiAobm93U2VsZWN0RGF5ID49IF9maXJzdENhbGVuZGFyaWNpdHlEYXkpIHtcclxuICAgICAgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMik7XHJcbiAgICB9XHJcbiAgICBsZXQgY2FsZW5kYXJpY2l0eSA9IHRoaXMuX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eShfZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSwgbm93U2VsZWN0RGF5LCBub3dTZWxlY3RNb250aClcclxuXHJcbiAgICAvL+aXpeafseaOqOeul+ihqCDlvZPmnIjkuIDml6XkuI4gMTkwMC8xLzEg55u45beu5aSp5pWwXHJcbiAgICBjb25zdCBkYXlDeWNsaWNhbCA9IERhdGUuVVRDKG5vd1NlbGVjdFllYXIsIHNtLCAxLCAwLCAwLCAwLCAwKSAvIDg2NDAwMDAwICsgMjU1NjcgKyAxMDtcclxuICAgIGNvbnN0IGdhblpoaURheSA9IHRoaXMuX2dldEdhblpoaShkYXlDeWNsaWNhbCArIG5vd1NlbGVjdERheSAtIDEpO1xyXG4gICAgLy/or6Xml6XmnJ/miYDlsZ7nmoTmmJ/luqdcclxuICAgIGNvbnN0IGFzdHJvID0gdGhpcy5fZ2V0QXN0cm9sb2d5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpO1xyXG5cclxuICAgIGNvbnN0IHpvZGlhYyA9IHRoaXMuX2dldFpvZGlhYyh5ZWFyKVxyXG4gICAgY29uc3QgY2hpbmFNb250aCA9IHRoaXMuX2dldENoaW5hTW9udGgobW9udGgpXHJcbiAgICBjb25zdCBjaGluYURheSA9IHRoaXMuX2dldENoaW5hRGF5KGRheSlcclxuICAgIGNvbnN0IGx1bmFySG9saWRheSA9IHRoaXMuX2dldEx1bmFySG9saWRheShtb250aCwgZGF5KVxyXG4gICAgY29uc3Qgc29sYXJIb2xpZGF5ID0gdGhpcy5fZ2V0U29sYXJIb2xpZGF5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpXHJcbiAgICByZXR1cm4geyAnbHVuYXJZZWFyJzogeWVhciwgJ2x1bmFyTW9udGgnOiBtb250aCwgJ2x1bmFyRGF5JzogZGF5LCAnem9kaWFjJzogem9kaWFjLCAnY2hpbmFNb250aCc6IChpc0xlYXAgPyBcIumXsFwiIDogJycpICsgY2hpbmFNb250aCwgJ2NoaW5hRGF5JzogY2hpbmFEYXksICdzb2xhclllYXInOiBub3dTZWxlY3RZZWFyLCAnc29sYXJNb250aCc6IG5vd1NlbGVjdE1vbnRoLCAnc29sYXJEYXknOiBub3dTZWxlY3REYXksICdnYW5aaGlZZWFyJzogZ2FuWmhpWWVhciwgJ2dhblpoaU1vbnRoJzogZ2FuWmhpTW9udGgsICdnYW5aaGlEYXknOiBnYW5aaGlEYXksICdpc1RvZGF5JzogaXNUb2RheSwgJ2lzTGVhcCc6IGlzTGVhcCwgJ25XZWVrJzogbldlZWssICduY1dlZWsnOiBcIuaYn+acn1wiICsgY1dlZWssICdjYWxlbmRhcmljaXR5JzogY2FsZW5kYXJpY2l0eSwgJ2FzdHJvJzogYXN0cm8sIFwibHVuYXJIb2xpZGF5XCI6IGx1bmFySG9saWRheSwgXCJzb2xhckhvbGlkYXlcIjogc29sYXJIb2xpZGF5IH07XHJcbiAgfVxyXG59XHJcbmxldCBsdW5hckNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoKVxyXG5leHBvcnQgZGVmYXVsdCBsdW5hckNhbGVuZGFyXHJcblxyXG5cclxuXHJcbi8vKioqKioqKioqKioqKioqKuWIhuWJsue6v2phdmHniYjmnKwqKioqKioqKioqKioqKiogKi9cclxuLy8gaW1wb3J0IGphdmEudGV4dC5QYXJzZUV4Y2VwdGlvbjtcclxuLy8gaW1wb3J0IGphdmEudGV4dC5TaW1wbGVEYXRlRm9ybWF0O1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkRhdGU7XHJcbi8vIGltcG9ydCBqYXZhLnV0aWwuTG9jYWxlO1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkNhbGVuZGFyO1xyXG5cclxuLy8gY2xhc3MgTHVuYXJDYWxlbmRhciB7XHJcbi8vICAgICBwcml2YXRlIGludCB5ZWFyOyAvLyDlhazljoblubRcclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoOy8vIOWFrOWOhuaciFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5Oy8vIOWFrOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJZZWFyOy8vIOmYtOWOhuW5tFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJNb250aDsvLyDpmLTljobmnIhcclxuLy8gICAgIHByaXZhdGUgaW50IGx1bmFyRGF5Oy8vIOmYtOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbGVhcE1vbnRoID0gMDsgLy8g6Zi05Y6G6Zew55qE5pyIXHJcbi8vICAgICBwcml2YXRlIGludCBkYXlzT2ZNb250aCA9IDA7IC8vIOafkOaciOeahOWkqeaVsFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5T2ZXZWVrID0gMDsgLy8g5YW35L2T5p+Q5LiA5aSp5piv5pif5pyf5YegXHJcblxyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nIGNoaW5lc2VNb250aE51bWJlcltdID0geyBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWNgeS4gFwiLCBcIuWNgeS6jFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBab2RpYWMgPSBuZXcgU3RyaW5nW10geyBcIum8oFwiLCBcIueJm1wiLCBcIuiZjlwiLCBcIuWFlFwiLCBcIum+mVwiLCBcIuibh1wiLCBcIumprFwiLCBcIue+ilwiLCBcIueMtFwiLCBcIum4oVwiLCBcIueLl1wiLCBcIueMqlwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBHYW4gPSBuZXcgU3RyaW5nW10geyBcIueUslwiLCBcIuS5mVwiLCBcIuS4mVwiLCBcIuS4gVwiLCBcIuaIilwiLCBcIuW3sVwiLCBcIuW6mlwiLCBcIui+m1wiLCBcIuWjrFwiLCBcIueZuFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBaaGkgPSBuZXcgU3RyaW5nW10geyBcIuWtkFwiLCBcIuS4kVwiLCBcIuWvhVwiLCBcIuWNr1wiLCBcIui+sFwiLCBcIuW3s1wiLCBcIuWNiFwiLCBcIuacqlwiLCBcIueUs1wiLCBcIumFiVwiLCBcIuaIjFwiLCBcIuS6pVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmcgY2hpbmVzZVRlbkNoYXJbXSA9IHsgXCLliJ1cIiwgXCLljYFcIiwgXCLlu79cIiwgXCLljYVcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gbHVuYXJIb2xpZGF5ID0gbmV3IFN0cmluZ1tdIHsgXCIwMTAxIOaYpeiKglwiLCBcIjAxMTUg5YWD5a61XCIsIFwiMDUwNSDnq6/ljYhcIiwgXCIwNzA3IOaDheS6ulwiLCBcIjA3MTUg5Lit5YWDXCIsXHJcbi8vICAgICAgICAgICAgIFwiMDgxNSDkuK3np4tcIiwgXCIwOTA5IOmHjemYs1wiLCBcIjEyMDgg6IWK5YWrXCIsIFwiMTIyNCDlsI/lubRcIiwgXCIwMTAwIOmZpOWklVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBzb2xhckhvbGlkYXkgPSBuZXcgU3RyaW5nW10geyAvL1xyXG4vLyAgICAgICAgICAgICBcIjAxMDEg5YWD5pemXCIsIFwiMDIxNCDmg4XkurpcIiwgXCIwMzA4IOWmh+Wls1wiLCBcIjAzMTIg5qSN5qCRXCIsIFwiMDMxNSDmtojotLnogIXmnYPnm4rml6VcIiwgXCIwNDAxIOaEmuS6ulwiLCBcIjA1MDEg5Yqz5YqoXCIsIFwiMDUwNCDpnZLlubRcIiwgLy9cclxuLy8gICAgICAgICAgICAgXCIwNTEyIOaKpOWjq1wiLCBcIjA2MDEg5YS/56ulXCIsIFwiMDcwMSDlu7rlhZpcIiwgXCIwODAxIOW7uuWGm1wiLCBcIjA4MDgg54i25LqyXCIsIFwiMDkxMCDmlZnluIhcIiwgXCIwOTI4IOWtlOWtkOivnui+sFwiLCAvL1xyXG4vLyAgICAgICAgICAgICBcIjEwMDEg5Zu95bqGXCIsIFwiMTAwNiDogIHkurpcIiwgXCIxMDI0IOiBlOWQiOWbveaXpVwiLCBcIjExMTIg5a2Z5Lit5bGx6K+e6L6w57qq5b+1XCIsIFwiMTIyMCDmvrPpl6jlm57lvZLnuqrlv7VcIiwgXCIxMjI1IOWco+ivnlwiIH07XHJcbi8vICAgICBwcml2YXRlIHN0YXRpYyBTaW1wbGVEYXRlRm9ybWF0IGNoaW5lc2VEYXRlRm9ybWF0ID0gbmV3IFNpbXBsZURhdGVGb3JtYXQoXCJ5eXl55bm0TU3mnIhkZOaXpVwiLCBMb2NhbGUuQ0hJTkEpO1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgbG9uZ1tdIGx1bmFySW5mbyA9IG5ldyBsb25nW10geyAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YmQ4LCAweDA0YWUwLCAweDBhNTcwLCAweDA1NGQ1LCAweDBkMjYwLCAweDBkOTUwLCAweDE2NTU0LCAweDA1NmEwLCAweDA5YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA1NWQyLCAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NWIwLCAweDE0OTc3LCAweDA0OTcwLCAweDBhNGIwLCAweDBiNGI1LCAweDA2YTUwLCAweDA2ZDQwLCAweDFhYjU0LCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NTcwLCAweDA1MmYyLCAweDA0OTcwLCAweDA2NTY2LCAweDBkNGEwLCAweDBlYTUwLCAweDA2ZTk1LCAweDA1YWQwLCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE4NmUzLCAweDA5MmUwLCAweDFjOGQ3LCAweDBjOTUwLCAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAvL1xyXG4vLyAgICAgICAgICAgICAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LCAweDA2Y2EwLCAweDBiNTUwLCAweDE1MzU1LCAweDA0ZGEwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNWQwLCAweDE0NTczLCAweDA1MmQwLCAweDBhOWE4LCAweDBlOTUwLCAweDA2YWEwLCAweDBhZWE2LCAweDBhYjUwLCAweDA0YjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhYWU0LCAweDBhNTcwLCAweDA1MjYwLCAweDBmMjYzLCAweDBkOTUwLCAweDA1YjU3LCAweDA1NmEwLCAweDA5NmQwLCAweDA0ZGQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNWEwLCAweDE5NWE2LCAweDA5NWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0OWIwLCAweDBhOTc0LCAweDBhNGIwLCAweDBiMjdhLCAweDA2YTUwLCAweDA2ZDQwLCAweDBhZjQ2LCAweDBhYjYwLCAweDA5NTcwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWY1LCAweDA0OTcwLCAweDA2NGIwLCAweDA3NGEzLCAweDBlYTUwLCAweDA2YjU4LCAweDA1NWMwLCAweDBhYjYwLCAweDA5NmQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmUwLCAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmQwLCAweDBjYWI1LCAweDBhOTUwLCAweDBiNGEwLCAweDBiYWE0LCAweDBhZDUwLCAweDA1NWQ5LCAweDA0YmEwLCAweDBhNWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE1MTc2LCAweDA1MmIwLCAweDBhOTMwLCAweDA3OTU0LCAweDA2YWEwLCAweDBhZDUwLCAweDA1YjUyLCAweDA0YjYwLCAweDBhNmU2LCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGUwLCAweDBkMjYwLCAweDBlYTY1LCAweDBkNTMwLCAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YmQ3LCAweDA0YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LCAweDBiNWEwLCAweDA1NmQwLCAweDA1NWIyLCAweDA0OWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNTc3LCAweDBhNGIwLCAweDBhYTUwLCAweDFiMjU1LCAweDA2ZDIwLCAweDBhZGEwIH07XHJcblxyXG4vLyAgICAgcHVibGljIEx1bmFyQ2FsZW5kYXIoaW50IHllYXIsIGludCBtb250aCwgaW50IGRheSkge1xyXG4vLyAgICAgICAgIHRoaXMueWVhciA9IHllYXI7XHJcbi8vICAgICAgICAgdGhpcy5tb250aCA9IG1vbnRoO1xyXG4vLyAgICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4vLyAgICAgICAgIHRoaXMuaW5pdEx1bmFyRGF0ZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcHJpdmF0ZSB2b2lkIGluaXRMdW5hckRhdGUoKXtcclxuLy8gICAgICAgICBTdHJpbmcgbm93YWRheXM7XHJcbi8vICAgICAgICAgRGF0ZSBiYXNlRGF0ZSA9IG51bGw7XHJcbi8vICAgICAgICAgRGF0ZSBub3dhZGF5ID0gbnVsbDtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBiYXNlRGF0ZSA9IGNoaW5lc2VEYXRlRm9ybWF0LnBhcnNlKFwiMTkwMOW5tDHmnIgzMeaXpVwiKTtcclxuLy8gICAgICAgICB9IGNhdGNoIChQYXJzZUV4Y2VwdGlvbiBlKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJpbnRTdGFja1RyYWNlKCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBub3dhZGF5cyA9IHRoaXMueWVhciArIFwi5bm0XCIgKyB0aGlzLm1vbnRoICsgXCLmnIhcIiArIHRoaXMuZGF5ICsgXCLml6VcIjtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBub3dhZGF5ID0gY2hpbmVzZURhdGVGb3JtYXQucGFyc2Uobm93YWRheXMpO1xyXG4vLyAgICAgICAgIH0gY2F0Y2ggKFBhcnNlRXhjZXB0aW9uIGUpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmludFN0YWNrVHJhY2UoKTtcclxuXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvLyDkuI4xOTAw5bm0MeaciDMx5pel55u45beu55qE5aSp5pWwXHJcbi8vICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpICgobm93YWRheS5nZXRUaW1lKCkgLSBiYXNlRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDBMKTtcclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog55Sob2Zmc2V05YeP5Y675q+P5Yac5Y6G5bm055qE5aSp5pWwXHJcbi8vICAgICAgICAgIOiuoeeul+W9k+WkqeaYr+WGnOWOhuesrOWHoOWkqVxyXG4vLyAgICAgICAgICBpWWVhcuacgOe7iOe7k+aenOaYr+WGnOWOhueahOW5tOS7vVxyXG4vLyAgICAgICAgICBvZmZzZXTkuLrlvZPlubTnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBpbnQgaVllYXIsIGRheXNPZlllYXIgPSAwO1xyXG4vLyAgICAgICAgIGZvciAoaVllYXIgPSAxOTAwOyBpWWVhciA8IDIxMDEgJiYgb2Zmc2V0ID4gMDsgaVllYXIrKykge1xyXG4vLyAgICAgICAgICAgICBkYXlzT2ZZZWFyID0gZGF5c0luTHVuYXJZZWFyKGlZZWFyKTtcclxuLy8gICAgICAgICAgICAgb2Zmc2V0IC09IGRheXNPZlllYXI7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZZZWFyO1xyXG4vLyAgICAgICAgICAgICBpWWVhci0tO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgbGVhcE1vbnRoID0gZ2V0TGVhcE1vbnRoKGlZZWFyKTsgLy8g5Yac5Y6G6Zew6YKj5Liq5pyIXHJcbi8vICAgICAgICAgYm9vbGVhbiBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIC8vIOeUqOW9k+W5tOeahOWkqeaVsG9mZnNldCzpgJDkuKrlh4/ljrvmr4/mnIjvvIjlhpzljobvvInnmoTlpKnmlbDvvIzmsYLlh7rlvZPlpKnmmK/mnKzmnIjnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICBpbnQgaU1vbnRoLCBkYXlzT2ZNb250aCA9IDA7XHJcbi8vICAgICAgICAgZm9yIChpTW9udGggPSAxOyBpTW9udGggPCAxMyAmJiBvZmZzZXQgPiAwOyBpTW9udGgrKykge1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IChsZWFwTW9udGggKyAxKSAmJiAhbGVhcCkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8g6Zew5pyIXHJcbi8vICAgICAgICAgICAgICAgICAtLWlNb250aDtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSBsZWFwRGF5SW5MdW5hcih5ZWFyKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IG1vbnRoRGF5c0luTHVuYXIoeWVhciwgaU1vbnRoKTtcclxuXHJcbi8vICAgICAgICAgICAgIG9mZnNldCAtPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLy8g6Kej6Zmk6Zew5pyIXHJcbi8vICAgICAgICAgICAgIGlmIChsZWFwICYmIGlNb250aCA9PSAobGVhcE1vbnRoICsgMSkpXHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvLyBvZmZzZXTkuLow5pe277yM5bm25LiU5Yia5omN6K6h566X55qE5pyI5Lu95piv6Zew5pyI77yM6KaB5qCh5q2jXHJcbi8vICAgICAgICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IGxlYXBNb250aCArIDEpIHtcclxuLy8gICAgICAgICAgICAgaWYgKGxlYXApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLy8gb2Zmc2V05bCP5LqOMOaXtu+8jOS5n+imgeagoeato1xyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgICAvLyDlhpzljoblubTku71cclxuLy8gICAgICAgICBsdW5hclllYXIgPSBpWWVhcjtcclxuLy8gICAgICAgICBsdW5hck1vbnRoID0gaU1vbnRoO1xyXG4vLyAgICAgICAgIGx1bmFyRGF5ID0gb2Zmc2V0ICsgMTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTnmoTmgLvlpKnmlbBcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5bm055qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IGRheXNJbkx1bmFyWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGludCBpLCBzdW0gPSAzNDg7XHJcbi8vICAgICAgICAgZm9yIChpID0gMHg4MDAwOyBpID4gMHg4OyBpID4+PSAxKSB7XHJcbi8vICAgICAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmIGkpICE9IDApXHJcbi8vICAgICAgICAgICAgICAgICBzdW0gKz0gMTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIChzdW0gKyBsZWFwRGF5SW5MdW5hcih5ZWFyKSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lhpzljoYgeWVhcuW5tOmXsOaciOeahOWkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBsZWFwRGF5SW5MdW5hcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGlmIChnZXRMZWFwTW9udGgoeWVhcikgIT0gMCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiAweDEwMDAwKSAhPSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMzA7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMjk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDA7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIOWGnOWOhumXsOmCo+S4quaciFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZ2V0TGVhcE1vbnRoKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIChpbnQpIChsdW5hckluZm9beWVhciAtIDE5MDBdICYgMGIxMTExKTtcclxuLy8gICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Lyg5Zue5Yac5Y6GIHllYXLlubRtb250aOaciOeahOaAu+WkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyICDlubTku71cclxuLy8gICAgICAqIEBwYXJhbSBtb250aCDmnIjku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5pyI5Lu955qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoRGF5c0luTHVuYXIoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPT0gMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDI5O1xyXG4vLyAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDMwO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOeahOeUn+iCllxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVybiDnlJ/ogpZcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Wm9kaWFjWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIHJldHVybiBab2RpYWNbKHllYXIgLSA0KSAlIDEyXTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWvueW6lOW5tOeahOW5suaUr1xyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRHYW5aaGkoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpbnQgbnVtID0geWVhciAtIDE5MDAgKyAzNjtcclxuLy8gICAgICAgICByZXR1cm4gKEdhbltudW0gJSAxMF0gKyBaaGlbbnVtICUgMTJdKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuW9k+WJjeW5tOS7veeahOW5suaUr1xyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFllYXJHYW5aaGkoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldEdhblpoaSh0aGlzLnllYXIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5bm05Lu955qE55Sf6IKWXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50WWVhclpvZGlhYygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0Wm9kaWFjWWVhcih0aGlzLmx1bmFyWWVhcik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Q2hpbmFEYXlTdHJpbmcoaW50IGRheSkge1xyXG5cclxuLy8gICAgICAgICBpbnQgbiA9IGRheSAlIDEwID09IDAgPyA5IDogZGF5ICUgMTAgLSAxO1xyXG4vLyAgICAgICAgIGlmIChkYXkgPiAzMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgICAgICAgaWYgKGRheSA9PSAxMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwi5Yid5Y2BXCI7XHJcbi8vICAgICAgICAgZWxzZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY2hpbmVzZVRlbkNoYXJbZGF5IC8gMTBdICsgY2hpbmVzZU1vbnRoTnVtYmVyW25dO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5Yac5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudEx1bmFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRMdW5hckhvbGlkYXkodGhpcy5sdW5hck1vbnRoLHRoaXMubHVuYXJEYXkpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5YWs5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFNvbGFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRTb2xhckhvbGlkYXkodGhpcy5tb250aCx0aGlzLmRheSk7XHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5a+55bqU6Zi05Y6G55qE5pel5pyfXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldEx1bmFyRGF0ZSgpIHtcclxuLy8gICAgICAgICByZXR1cm4gY2hpbmVzZU1vbnRoTnVtYmVyW2x1bmFyTW9udGggLSAxXSArIFwi5pyIXCIgKyBnZXRDaGluYURheVN0cmluZyhsdW5hckRheSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lr7nlupTml6XmnJ/nmoTlhazljoboioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOWFrOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOWFrOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRTb2xhckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzb2xhckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZCA9IHNvbGFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZHYgPSBzb2xhckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHNtZCA9IHNtb250aF92ICsgc2RheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAoc2QudHJpbSgpLmVxdWFscyhzbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHNkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKioqXHJcbi8vICAgICAgKiDojrflj5bpmLTljoblr7nlupTnmoToioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOmYtOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOmYtOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRMdW5hckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsdW5hckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgLy8g6L+U5Zue5Yac5Y6G6IqC5YGH5pel5ZCN56ewXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZCA9IGx1bmFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZHYgPSBsdW5hckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGxtZCA9IGxtb250aF92ICsgbGRheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAobGQudHJpbSgpLmVxdWFscyhsbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGxkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuLy8gICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuaYr+WQpuS4uumXsOW5tFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgYm9vbGVhbiBpc0xlYXBZZWFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaWYgKHllYXIgJSAxMDAgPT0gMCAmJiB5ZWFyICUgNDAwID09IDApIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfSBlbHNlIGlmICh5ZWFyICUgMTAwICE9IDAgJiYgeWVhciAlIDQgPT0gMCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Yik5pat5YWs5Y6G5a+55bqU5bm05pyI55qE5aSp5pWwXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSBpc0xlYXBZZWFyXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGhcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIGludCBnZXREYXlzT2ZNb250aChib29sZWFuIGlzTGVhcFllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIHN3aXRjaCAobW9udGgpIHtcclxuLy8gICAgICAgICBjYXNlIDE6XHJcbi8vICAgICAgICAgY2FzZSAzOlxyXG4vLyAgICAgICAgIGNhc2UgNTpcclxuLy8gICAgICAgICBjYXNlIDc6XHJcbi8vICAgICAgICAgY2FzZSA4OlxyXG4vLyAgICAgICAgIGNhc2UgMTA6XHJcbi8vICAgICAgICAgY2FzZSAxMjpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMTtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSA0OlxyXG4vLyAgICAgICAgIGNhc2UgNjpcclxuLy8gICAgICAgICBjYXNlIDk6XHJcbi8vICAgICAgICAgY2FzZSAxMTpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMDtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSAyOlxyXG4vLyAgICAgICAgICAgICBpZiAoaXNMZWFwWWVhcikge1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSAyOTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMjg7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBkYXlzT2ZNb250aDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuW5tOaciOaXpeWxnuS6juaYn+acn+WHoFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBpbnQgZ2V0V2Vla2RheU9mTW9udGgoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIENhbGVuZGFyIGNhbCA9IENhbGVuZGFyLmdldEluc3RhbmNlKCk7XHJcbi8vICAgICAgICAgY2FsLnNldCh5ZWFyLCBtb250aCAtIDEsIDEpO1xyXG4vLyAgICAgICAgIGRheU9mV2VlayA9IGNhbC5nZXQoQ2FsZW5kYXIuREFZX09GX1dFRUspIC0gMTtcclxuLy8gICAgICAgICByZXR1cm4gZGF5T2ZXZWVrO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHtcclxuLy8gICAgICAgICBMdW5hckNhbGVuZGFyIGNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoMjAxOSwgOSwgMTMpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEx1bmFyRGF0ZSgpOlwiICsgY2FsZW5kYXIuZ2V0THVuYXJEYXRlKCkpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKTpcIiArIGNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKSk7XHJcbi8vICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKFwiY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpOlwiICsgY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG4iXSwic291cmNlUm9vdCI6IiJ9