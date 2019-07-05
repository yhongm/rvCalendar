

class RV {
    constructor(option) {
        const {
            el,
            data,
            dom
        } = option
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
        if ("for" in dom.props || "for_for" in dom.props) {
            let dataArray = []
            let isForFor = false
            let dataSingle
            if (dom.props['for']) { //add for direction
                if (Util.isForOrForFor(dom.props['for'])) {
                    if (dom.forData) {
                        if (Util.isForIn(dom.props['for'])) {
                            throw new Error("plase use _in direction")
                        }
                        dataArray = dom.forData
                        dataSingle = dom.props['for'].split(" _in")[0]
                        
                    } else {
                        if (Util.isForForIn(dom.props['for'])) {
                            throw new Error("plase use _in_ direction")
                        }
                        dataArray = this.data[dom.props['for'].split(" _in_ ")[1]]
                        dataSingle = dom.props['for'].split(" _in_ ")[0]
                       
                    }
                }
            } else if (dom.props['for_for']) { //add for_for direction
                if (Util.isForOrForFor(dom.props['for_for'])) {
                    if (Util.isForForIn(dom.props['for_for'])) {
                        throw new Error("plase use _in_ direction")
                    }
                    isForFor = true
                    dataArray = this.data[dom.props['for_for'].split(" _in_ ")[1]]
                    dataSingle = dom.props['for_for'].split(" _in_ ")[0]
                   
                } else { }
            } else {
                throw new Error("the for direction use error")
            }
            let objs = []
            dataArray.forEach(data => {
                let obj = {}
                obj.tag = dom.tag
                obj.children = []
                obj.props = {}
                for (let child in dom.children) {
                    if (Util.isString(dom.children[child])) {
                        if (RV.isPlaceHolder(dom.children[child])) {
                            if (RV.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                                obj.children[child] = this.data[RV.getPlaceHolderValue(dom.children[child])]
                            } else {
                                obj.children[child] = data[RV.getPlaceHolderValue(dom.children[child]).split(".")[1]]
                            }
                        } else {
                            obj.children[child] = dom.children[child]
                        }
                    } else {
                        if (isForFor) {
                            dom.children[child].forData = data
                        } else {
                            if (dom.children[child] instanceof Object) {
                                dom.children[child].data = data
                            }

                        }
                        obj.children[child] = this.applyTruthfulData(dom.children[child])
                    }
                }

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
                    } else if (value === "childDomData") {
                        let childDomDataKey=dom.props[value]
                        Object.defineProperty(obj,"childDomData",{value:this.data})
                    }

                    else {
                        if (RV.isPlaceHolder(dom.props[value])) {
                            if (RV.getPlaceHolderValue(dom.props[value]).indexOf(dataSingle) == -1) {
                                obj.props[value] = this.data[RV.getPlaceHolderValue(dom.props[value])]
                            } else {
                                obj.props[value] = data[RV.getPlaceHolderValue(dom.props[value]).split(".")[1]]

                            }
                        } else if (RV.isOperatorExpression(dom.props[value])) {
                            console.log("operaterExpress:" + RV.getOperatorExpression(dom.props[value]))
                            obj.props[value] = RV.getOperatorExpression(dom.props[value])
                        }
                        else {
                            obj.props[value] = dom.props[value]
                        }
                    }

                }
                objs.push(obj)
            }

            )
            return objs
        } else {
            let obj = {}
            obj.tag = dom.tag
            obj.children = []
            obj.props = {}
            for (let child in dom.children) {
                if (Util.isString(dom.children[child])) {
                    if (RV.isPlaceHolder(dom.children[child])) {
                        obj.children[child] = this.data[RV.getPlaceHolderValue(dom.children[child])]
                    } else if ("childDomData" in Object.keys(obj)) {
                        let dataSingle=Object.keys(obj.childDomData)[0]
                        value=obj.childDomData[dataSingle]
                        console.log("childDomData,value:"+value)
                        obj.children[child]=obj.props.childDomData[RV.getPlaceHolderValue(dom.children[child])]
                    }
                    else {

                        obj.children[child] = dom.children[child]
                    }
                } else {
                    obj.children[child] = this.applyTruthfulData(dom.children[child])

                }
            }

            let props = Object.keys(dom.props)
            for (let prop in props) {
                let value = props[prop]
                if (value === "style") {
                    let style = dom.props[value]
                    if (style.indexOf(",") > -1) {
                        let styles = style.split(",")
                        obj.props[value] = this.handleArrayStyle(this.data, styles, undefined)
                    } else {

                        obj.props[value] = this.handleSingleStyle(this.data, style, undefined)
                    }
                } else if (value === "childDomData") {
                    let childDomDataKey=dom.props[value]
                    Object.defineProperty(obj,"childDomData",{value:this.data})
                }
                else {

                    if (RV.isPlaceHolder(dom.props[value])) {
                        obj.props[value] = this.data[RV.getPlaceHolderValue(dom.props[value])]
                    }
                    else if (RV.isOperatorExpression(dom.props[value])) {
                        console.log("operaterExpress:" + RV.getOperatorExpression(dom.props[value]))
                        obj.props[value] = RV.getOperatorExpression(dom.props[value])
                    }
                    else {
                        obj.props[value] = dom.props[value]
                    }

                }

            }

            return obj
        }
    }
    handleSingleStyle(data, style, dataSingle) {
        let newStyle = ''
        if (dataSingle) {
            if (RV.isPlaceHolder(style)) {
                if (RV.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                    let key = RV.getPlaceHolderValue(style).split(".")[1]
                    newStyle = data[key]
                } else {
                    let styleKey = style.split(":")[0]
                    let styleValue = style.split(":")[1]
                    styleValue = data[RV.getPlaceHolderValue(styleValue)]
                    newStyle = styleKey + ":" + styleValue
                }
            } else {
                newStyle = style
            }
        } else {

            let styleKey = style.split(":")[0]
            let styleValue = style.split(":")[1]
            if (RV.isPlaceHolder(styleValue)) {

                styleValue = data[RV.getPlaceHolderValue(styleValue)]
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
    static isPlaceHolder(content) {
        if (content) {
            if (content.startsWith("%#") && content.endsWith("#%")) {
                return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    static getPlaceHolderValue(content) {
        return content.slice(2, -2)
    }
    /**
     * 是否为表达式
     * @param {String} content 
     */
    static isOperatorExpression(content) {
        console.log("isOperatorExpression:" + typeof content + ",content:" + content)
        if (Util.isString(content)) {
            if (content.indexOf("{") != -1 && content.indexOf("}") != -1) {
                console.log("isOperator true")
                return true
            } else {
                console.log("isOperator false")
                return false
            }
        }
        return false
    }
    static getOperatorExpression(content, data) {
        if (Util.isString(content)) {
            console.log(`getOperatorExpression,content:${content}`)
            var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"))
            let startIndex = expression.indexOf("%#")
            let endIndex = expression.indexOf("#%")
            console.log("content:" + content + ",expression:" + expression)
            if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                let placeHolder = expression.slice(startIndex, endIndex)
                let realValue = data[placeHolder]//通过placeHolder取真实的值
                expression.replace(placeHolder, realValue)
            }
            console.log("eval expression,eval:" + eval(expression))
            return eval(expression)
        }


    }

}


function observe(obj, observeMap, callback) {

    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]
        let observable = new Observable()
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
    size() {
        return this.length;
    }
    clear() {
        length = 0;
        this.map = new Object();
    }
}


export default RV