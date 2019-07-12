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
    (0, _RVcalendar2.default)("#app", function (selectDate) {
        alert("selectDate,:" + selectDate);
    });
};

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

var _rv = __webpack_require__(/*! ./rv */ "./src/rv.js");

var _rv2 = _interopRequireDefault(_rv);

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
    console.log("month:" + this.month);
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
    var rv = new _rv2.default({
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
        dom: {
            tag: "table",
            props: {
                border: 0,
                cellpadding: '0',
                cellspacing: '1',
                id: 'caltable',
                key: 'table',
                style: 'text-decoration:none;width:200;background-color:#D0D0EE;font-size:8pt;border:0px dotted #1C6FF5;'
            },
            children: [{
                tag: "thead",
                props: {
                    key: "thead"
                },
                children: [{
                    tag: 'tr',
                    props: {
                        align: "center",
                        valign: "middle",
                        id: "title",
                        key: "title",
                        style: 'font-weight:normal;height:24px;text-align:center;color:#333333;text-decoration:none;background-color:#A4B9D7;border-top-width:1px;border-right-width:1px;border-bottom-width: 1px; border-left-width: 1px;border-bottom-style: 1px;border-top-color: #999999;border-right-color: #999999;border-bottom-color:#999999;border-left-color:#999999;'
                    },
                    children: [{
                        tag: 'td',
                        props: {
                            colspan: "7",
                            key: 'tdTitle'
                        },
                        children: [{
                            tag: 'div',
                            props: {
                                key: 'titleDiv'
                            },
                            children: [{
                                tag: 'button',
                                props: {
                                    onclick: "mCalendar.subMonth()",
                                    style: 'font-weight:bold; color:#243F65;cursor:hand;text-decoration:none;margin-right:20px',
                                    key: "subButton"
                                },
                                children: ["<"]
                            }, {
                                tag: "input",
                                props: {
                                    name: "year",
                                    type: "text",
                                    maxlength: "4",
                                    style: 'font-size: 9pt; text-decoration: none;background-color: #FFFFFF;height: 20px;border: 1px solid #666666; color: #000000;text-align:center;',
                                    size: "4",
                                    value: '%#year#%',
                                    key: "inputYear"
                                },
                                children: [""]
                            }, {
                                tag: "input",
                                props: {
                                    name: "month",
                                    type: "text",
                                    maxlength: "2",
                                    value: '%#month#%',
                                    style: 'font-size: 9pt; text-decoration: none;background-color: #FFFFFF;height: 20px;border: 1px solid #666666; color: #000000;text-align:center;',
                                    size: "2",
                                    key: "inputMonth"
                                },
                                children: [""]
                            }, {
                                tag: 'button',
                                props: {
                                    onclick: "mCalendar.addMonth()",
                                    style: 'font-weight: bold;color: #243F65;cursor: hand;text-decoration: none;margin-left:20px',
                                    key: "addButton"
                                },
                                children: [">"]
                            }]

                        }]
                    }]
                }, {
                    tag: 'tr',
                    props: {
                        key: 'daytr'
                    },
                    children: [{
                        tag: 'td',
                        props: {
                            style: 'color: #FF0000;text-decoration: none;background-color: #C0D0E8;text-align: center;height: 20px;width: 12%;',
                            key: 'daySunTitle'
                        },
                        children: ["日"]
                    }, {
                        tag: 'td',
                        props: {
                            style: 'color:#000000;background-color:#C0D0E8;height:20px;width:11%;text-align:center;',
                            key: "%#v.id#%",
                            for: "v _in_ weekTitles"
                        },
                        children: ["%#v.value#%"]
                    }, {
                        tag: 'td',
                        props: {
                            style: ' color:#FF0000;text-decoration:none;background-color:#C0D0E8;text-align:center;height: 20px;width: 12%;',
                            key: 'daySatTitle'
                        },
                        children: ["六"]
                    }]

                }]
            }, {
                tag: "tbody",
                props: {
                    cellspacing: "0",
                    cellpadding: "0",
                    id: "calendar",
                    style: ' text-decoration: none;width: 170;background-color: #C0D0E8;font-size: 9pt;border: 0px dotted #1C6FA5;',
                    align: "center",
                    border: "1",
                    key: "tbody"
                },
                children: [{
                    tag: 'tr',
                    props: {
                        style: 'cursor:hand',
                        key: "%#week.id#%",
                        for: 'week _in_ weeks',
                        domData: "week"
                    },

                    children: [{
                        tag: 'td',
                        props: {
                            key: "%#v.id#%",
                            onclick: 'clickDay(this)',
                            style: '%#v.style#%',
                            lable: '%#v.lable#%',
                            onMouseover: 'mouseOver(this);',
                            onMouseOut: 'mouseOut(this);',
                            childDomData: "v",
                            for: 'v _in_ week'
                        },

                        children: [{
                            tag: "p",
                            props: {
                                key: "{%#v.id#%+'_content'}",
                                style: "margin-block-start: 0em;margin-block-end: 0em"
                            },
                            children: ["%#v.content#%"]

                        }, {
                            tag: "p",
                            props: {
                                key: "{%#v.id#%+'_lunarInfo'}",
                                time: "{new Date()}",
                                style: "margin-block-start: 0em;margin-block-end: 0em"
                            },
                            children: ["%#v.lunarInfo#%"]

                        }]
                    }]
                }]
            }]
        }
    });

    var month = mCalendar['month'];
    var year = mCalendar['year'];
    var selectDay = mCalendar['selectDay'];
    Object.defineProperty(mCalendar, 'month', {
        set: function set(nvalue) {
            console.log("newMonth:" + nvalue);
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

      console.log("_monthDays:" + (this._yearInfo[year - 1900] & 0x10000 >> month));

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
        console.log("lmd:" + lmd);
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
      console.log("_firstCalendaricityDay:" + _firstCalendaricityDay + ",_secondCalendaricityDay:" + _secondCalendaricityDay);
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

/***/ }),

/***/ "./src/rv.js":
/*!*******************!*\
  !*** ./src/rv.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NODE_REPLACE = 0; //node replace 
var CHILD_RE_ORDER = 1; //child node re order
var NODE_PROPS = 2; //prop change 
var NODE_CONTENT = 3; //content change

var Element = function () {
    /**
     * virtual dom object constructor
     * @param {*} tag  the html tag name
     * @param {*} props  the prop (key，style..)
     * @param {*} children child data
     */
    function Element(tag, props, children) {
        _classCallCheck(this, Element);

        if (!(this instanceof Element)) {
            return new Element(tagName, props, children);
        }
        this.tag = tag;
        this.props = props || {};
        this.children = children || [];
        this.key = props ? props.key : undefined;
        if (!this.key) {
            throw new Error(tag + ' ... html tag the key is undefined');
        }
        var count = 0;
        this.children.forEach(function (child) {
            if (child instanceof Element) {
                count += child.count;
            }
            count++;
        });
        this.count = count;
    }
    /**
     * the method use to virtual dom  rende to real dom
     */


    _createClass(Element, [{
        key: 'render',
        value: function render() {
            var el = document.createElement(this.tag);
            var props = this.props;
            for (var propName in props) {
                Util.setAttr(el, propName, props[propName]);
            }
            this.children.forEach(function (child) {
                var childEl = child instanceof Element ? child.render() : document.createTextNode(child);
                el.appendChild(childEl);
            });
            return el;
        }
    }]);

    return Element;
}();

var Diff = function () {
    /**
     * dom tree diff algorithm object constructor
     * @param {*} oldTree the dom tree for before update 
     * @param {*} newTree the dom tree for after update
     */
    function Diff(oldTree, newTree) {
        _classCallCheck(this, Diff);

        this.index = 0;
        this.patches = {};
        this.dfsWalk(oldTree, newTree, this.index);
    }

    _createClass(Diff, [{
        key: 'dfsWalk',
        value: function dfsWalk(oldNode, newNode, index) {
            var currentPatch = [];
            if (newNode == null) {} else if (Util.isString(oldNode) && Util.isString(newNode)) {
                if (oldNode != newNode) {
                    currentPatch.push({
                        type: NODE_CONTENT,
                        content: newNode
                    });
                }
            } else if (oldNode.tagName === newNode.tagName && oldNode.key == newNode.key) {
                var propsPatches = this.diffProps(oldNode, newNode);
                if (propsPatches) {
                    currentPatch.push({
                        type: NODE_PROPS,
                        props: propsPatches
                    });
                }
                if (!Util.isIgnoreChildren(newNode)) {
                    this.diffChildren(oldNode.children, newNode.children, index, currentPatch);
                }
            } else {
                currentPatch.push({
                    type: NODE_REPLACE,
                    node: newNode
                });
            }
            if (currentPatch.length) {
                this.patches[index] = currentPatch;
            }
        }
    }, {
        key: 'diffProps',
        value: function diffProps(oldNode, newNode) {

            var oldProps = oldNode.props;
            var newProps = newNode.props;

            var propsPatches = {};
            var isSame = true;
            for (var _key in oldProps) {
                if (newProps[_key] !== oldProps[_key]) {
                    isSame = false;
                    propsPatches[_key] = newProps[_key];
                }
            }
            for (var _key2 in newProps) {
                if (!oldProps.hasOwnProperty(_key2)) {
                    isSame = false;
                    propsPatches[_key2] = newProps[_key2];
                }
            }
            return isSame ? null : propsPatches;
        }
    }, {
        key: 'diffChildren',
        value: function diffChildren(oldChildren, newChildren, index, currentPatch) {
            var _this = this;

            var diffList = new DiffList(oldChildren, newChildren);
            var diffs = diffList.getResult();
            newChildren = diffs.child;
            if (diffs.moves.length) {
                var reorderPatch = {
                    type: CHILD_RE_ORDER,
                    moves: diffs.moves
                };
                currentPatch.push(reorderPatch);
            }
            var leftNode = null;
            var currentNodeIndex = index;
            oldChildren.forEach(function (child, i) {
                var newChild = newChildren[i];
                currentNodeIndex = leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
                _this.dfsWalk(child, newChild, currentNodeIndex);
                leftNode = child;
            });
        }
    }]);

    return Diff;
}();

var Patch = function () {
    function Patch(node, patches) {
        _classCallCheck(this, Patch);

        var walker = {
            index: 0
        };
        this.dfsWalk(node, walker, patches);
    }

    _createClass(Patch, [{
        key: 'dfsWalk',
        value: function dfsWalk(node, walker, patches) {
            var currentPatches = patches[walker.index];
            var len = node.childNodes ? node.childNodes.length : 0;
            for (var i = 0; i < len; i++) {
                var child = node.childNodes[i];
                walker.index++;
                this.dfsWalk(child, walker, patches);
            }
            if (currentPatches) {
                this.applyPatches(node, currentPatches);
            }
        }
    }, {
        key: 'applyPatches',
        value: function applyPatches(node, currentPatche) {
            var _this2 = this;

            currentPatche.forEach(function (currentPatch) {
                switch (currentPatch.type) {
                    case NODE_REPLACE:
                        var newNode = Util.isString(currentPatch.node) ? document.createTextNode(currentPatch.node) : currentPatch.node.render();
                        node.parentNode.replaceChild(newNode, node);
                        break;
                    case CHILD_RE_ORDER:
                        _this2.reorderChildren(node, currentPatch.moves);
                        break;
                    case NODE_PROPS:
                        _this2.setProps(node, currentPatch.props);
                        break;
                    case NODE_CONTENT:
                        if (node.textContent) {
                            node.textContent = currentPatch.content;
                        } else {
                            node.nodeValue = currentPatch.content;
                        }
                        break;
                    default:
                        break;

                }
            });
        }
    }, {
        key: 'reorderChildren',
        value: function reorderChildren(node, moves) {
            var staticNodeList = Util.toArray(node.childNodes);
            var nodeMaps = {};
            staticNodeList.forEach(function (snode) {
                if (snode.nodeType === 1) {
                    var _key3 = snode.getAttribute('key');
                    if (_key3) {
                        nodeMaps[_key3] = snode;
                    }
                }
            });
            moves.forEach(function (move) {
                var index = move.index;
                if (move.type === 0) {
                    if (staticNodeList[index] === node.childNodes[index]) {
                        node.removeChild(node.childNodes[index]);
                    }
                    staticNodeList.splice(index, 1);
                } else if (move.type === 1) {
                    var insertNode = nodeMaps[move.item.key] ? nodeMaps(move.item.key).cloneNode(true) : Util.isString(move.item) ? document.createTextNode(move.item) : move.item.render();
                    staticNodeList.splice(index, 0, insertNode);
                    node.insertBefore(insertNode, node.childNodes[index] || null);
                }
            });
        }
    }, {
        key: 'setProps',
        value: function setProps(node, props) {
            for (var _key4 in props) {
                if (props[_key4] === undefined) {
                    node.removeAttribute(_key4);
                } else {
                    var value = props[_key4];
                    Util.setAttr(node, _key4, value);
                }
            }
        }
    }]);

    return Patch;
}();

var Util = function () {
    function Util() {
        _classCallCheck(this, Util);
    }

    _createClass(Util, null, [{
        key: 'isString',
        value: function isString(some) {
            return typeof some === 'string';
        }
    }, {
        key: 'toArray',
        value: function toArray(list) {
            if (!list) {
                return [];
            }
            var array = [];
            for (var i = 0; i < list.length; i++) {
                array.push(list[i]);
            }
            return array;
        }
    }, {
        key: 'isForIn',
        value: function isForIn(direction) {
            return (/^\w* _in_ \w*$/.test(direction)
            );
        }
    }, {
        key: 'isForForIn',
        value: function isForForIn(direction) {
            return (/^\w* _in*$/.test(direction)
            );
        }
    }, {
        key: 'isForOrForFor',
        value: function isForOrForFor(direction) {
            return (/^\w* _in_ \w|_in*$/.test(direction)
            );
        }
    }, {
        key: 'isIgnoreChildren',
        value: function isIgnoreChildren(node) {
            return node.props && node.props.hasOwnProperty("ignore");
        }
    }, {
        key: 'isNumber',
        value: function isNumber(value) {
            if (value === undefined || value === null || value === '') {
                return false;
            }

            if (typeof value === 'string') {
                //正整数
                var reNumber = /^\d+$/;
                //负整数
                var reNeNumber = /^-\d+$/;
                //正实数
                var reRealNumber1 = /^[1-9]\d*[.]\d+$/; //非零开头
                var reRealNumber2 = /^0[.]\d+$/; //零开头
                //负实数
                var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/; //非零开头
                var reNeRealNumber2 = /^-0[.]\d+$/; //零开头

                if (reNumber.test(value) || reNeNumber.test(value) || reRealNumber1.test(value) || reRealNumber2.test(value) || reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
                    return true;
                } else {
                    return false;
                }
            } else if (typeof value === 'number') {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: 'setAttr',
        value: function setAttr(node, key, value) {
            switch (key) {
                case 'style':
                    node.style.cssText = value;
                    break;
                case 'value':
                    var _tagName = node.tagName || '';
                    _tagName = _tagName.toLowerCase();
                    if (_tagName === 'input' || _tagName === 'textarea') {
                        node.value = value;
                    } else {
                        node.setAttribute(key, value);
                    }
                    break;
                default:
                    node.setAttribute(key, value);
                    break;
            }
        }
    }]);

    return Util;
}();

var DiffList = function () {
    /**
     * diff list 
     * @param {*} oldList 
     * @param {*} newList 
     * @param {*} key 
     */
    function DiffList(oldList, newList) {
        _classCallCheck(this, DiffList);

        var oldListKeyIndex = this.makeKeyIndex(oldList).keyIndex;
        var newListKeyIndex = this.makeKeyIndex(newList).keyIndex;
        this.moveOperator = [];
        this.childList = [];
        for (var _i = 0; _i < oldList.length; _i++) {
            var oldItem = oldList[_i];
            var oItemKey = this.getKey(oldItem);
            if (!newListKeyIndex.hasOwnProperty(oItemKey)) {
                this.childList.push(null);
            } else {
                this.childList.push(newList[newListKeyIndex[oItemKey]]);
            }
        }
        this.tempList = this.childList.slice(0);
        var i = 0;
        while (i < this.tempList.length) {
            if (this.tempList[i] === null) {
                this.remove(i);
                this.removeCopyTempList(i);
            } else {
                i++;
            }
        }
        var index = 0;
        for (var _i2 = 0; _i2 < newList.length; _i2++) {
            var nItem = newList[_i2];
            var nItemKey = this.getKey(nItem);
            var cItem = this.tempList[index];
            var cItemKey = this.getKey(cItem);
            if (cItem) {
                if (nItemKey != cItemKey) {
                    if (oldListKeyIndex.hasOwnProperty(nItemKey)) {
                        var cNextItemKey = getKey(this.tempList[index + 1]);
                        if (nItemKey === cNextItemKey) {
                            this.remove(_i2);
                            this.removeCopyTempList(index);
                            index++;
                        } else {
                            this.insert(_i2, nItem);
                        }
                    } else {
                        this.insert(_i2, nItem);
                    }
                } else {
                    index++;
                }
            } else {
                this.insert(_i2, nItem);
            }
        }
        var k = this.tempList.length - index;
        while (index++ < this.tempList.length) {
            k--;
            this.remove(k + newList.length);
        }
    }

    _createClass(DiffList, [{
        key: 'makeKeyIndex',
        value: function makeKeyIndex(list) {
            var keyIndex = {};
            for (var _i3 = 0; _i3 < list.length; _i3++) {
                var item = list[_i3];
                var itemKey = this.getKey(item);
                keyIndex[itemKey] = _i3;
            }
            return {
                keyIndex: keyIndex
            };
        }
    }, {
        key: 'getKey',
        value: function getKey(item) {
            if (!item) {
                return undefined;
            }
            return item["key"];
        }
    }, {
        key: 'removeCopyTempList',
        value: function removeCopyTempList(index) {
            this.tempList.splice(index, 1);
        }
    }, {
        key: 'remove',
        value: function remove(index) {
            this.moveOperator.push({
                index: index,
                type: 0
            });
        }
    }, {
        key: 'insert',
        value: function insert(index, item) {
            this.moveOperator.push({
                index: index,
                item: item,
                type: 1
            });
        }
    }, {
        key: 'getResult',
        value: function getResult() {
            return {
                moves: this.moveOperator,
                child: this.childList
            };
        }
    }]);

    return DiffList;
}();

function observe(obj, observeMap, callback) {

    Object.keys(obj).forEach(function (key) {
        var internalValue = obj[key];
        var observable = new Observable();
        observeMap.put(key, observable);
        Object.defineProperty(obj, key, {
            get: function get() {
                observable.add(callback);
                return internalValue;
            },
            set: function set(newVal) {
                var changed = internalValue !== newVal;
                internalValue = newVal;
                if (changed) {
                    observable.invoke();
                }
            }
        });
    });
    return obj;
}

function Observable() {
    this.updateFunctions = new Set();
}
Observable.prototype.add = function (observableUpdate) {
    this.updateFunctions.add(observableUpdate);
};
Observable.prototype.invoke = function () {
    this.updateFunctions.forEach(function (fun) {
        return fun();
    });
};

/**
 * the method use to deep clone obj
 * @param {*} obj 
 */
function clone(obj) {
    var getType = function getType(o) {
        if (o === null) return "null";
        if (o === undefined) return "undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    };
    var result = void 0,
        oClass = getType(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (key in obj) {
        var copy = obj[key];
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
    return new Element(tagName, props, children);
}

function diff(oldTree, newTree) {
    var d = new Diff(oldTree, newTree);
    return d.patches;
}

function patch(node, patches) {
    return new Patch(node, patches);
}
/**
 * the map object use to save likily (key,value) data
 */

var Map = function () {
    function Map() {
        _classCallCheck(this, Map);

        this.length = 0;
        this.map = new Object();
    }

    _createClass(Map, [{
        key: 'put',
        value: function put(key, value) {
            if (!(key in this.map)) {
                this.length++;
            }
            this.map[key] = value;
        }
    }, {
        key: 'get',
        value: function get(key) {
            return key in this.map ? this.map[key] : null;
        }
    }, {
        key: 'remove',
        value: function remove(key) {
            if (key in this.map) {
                delete this.map[key];
                this.length--;
            }
        }
    }, {
        key: 'size',
        value: function size() {
            return this.length;
        }
    }, {
        key: 'clear',
        value: function clear() {
            length = 0;
            this.map = new Object();
        }
    }]);

    return Map;
}();

var RV = function () {
    function RV(option) {
        var _this3 = this;

        _classCallCheck(this, RV);

        var el = option.el,
            data = option.data,
            dom = option.dom;

        var root = Util.isString(el) ? document.querySelector(el) : el;
        this.data = data;
        this.ve = this.getVirtualElement(this.applyTruthfulData(dom));
        this.w = this.ve.render();
        root.appendChild(this.w);
        this.observeMap = new Map();
        observe(this.data, this.observeMap, function () {
            _this3.updatedom(dom);
        });
        this.updatedom(dom);
    }

    _createClass(RV, [{
        key: 'updatedom',
        value: function updatedom(dom) {
            var nve = this.getVirtualElement(this.applyTruthfulData(dom));
            window.nve = nve;
            window.ve = this.ve;
            patch(this.w, diff(this.ve, nve));
            this.ve = nve;
        }
    }, {
        key: 'watch',
        value: function watch(key, callback) {
            this.observeMap.get(key).add(callback);
        }
    }, {
        key: 'getVirtualElement',
        value: function getVirtualElement(dom) {
            var _this4 = this;

            var children = [];
            for (var child in dom.children) {
                var cc = dom.children[child];
                if (cc instanceof Array) {
                    cc.forEach(function (c) {
                        var v = _this4.getVirtualElement(c);
                        children.push(v);
                    });
                } else if (cc instanceof Object) {
                    var v = this.getVirtualElement(cc);
                    children.push(v);
                } else {
                    children.push(cc);
                }
            }

            return h(dom.tag, dom.props, children);
        }
    }, {
        key: 'applyTruthfulData',
        value: function applyTruthfulData(dom) {
            var _this5 = this;

            if ("for" in dom.props) {
                var dataArray = [];
                var isForFor = false;
                var dataSingle = void 0;

                if (Util.isForIn) {
                    if ("childDomDatakey" in dom) {
                        dataArray = dom.data;
                        dataSingle = dom.childDomDatakey;
                    } else if ("domDataKey" in dom) {
                        if (dom.props['for'].split(" _in_ ")[1] === dom.domDataKey) {
                            dataArray = dom.data;
                        }
                        dataSingle = dom.props['for'].split(" _in_ ")[0];
                    } else {
                        dataArray = this.data[dom.props['for'].split(" _in_ ")[1]];
                        dataSingle = dom.props['for'].split(" _in_ ")[0];
                    }
                } else {
                    throw new Error("the for directive use error");
                }
                var objs = [];
                dataArray.forEach(function (data) {
                    var obj = {};
                    obj.tag = dom.tag;
                    obj.children = [];
                    obj.props = {};
                    var props = Object.keys(dom.props);
                    for (var prop in props) {
                        var value = props[prop];
                        if (value === "style") {
                            var style = dom.props[value];
                            if (style.indexOf(",") > -1) {
                                var styles = style.split(",");
                                obj.props[value] = _this5.handleArrayStyle(data, styles, dataSingle);
                            } else {

                                obj.props[value] = _this5.handleSingleStyle(data, style, dataSingle);
                            }
                        } else {
                            if (RV.isPlaceHolder(dom.props[value])) {
                                if (!RV.isDotOperatorExpression(RV.getPlaceHolderValue(dom.props[value]))) {
                                    obj.props[value] = _this5.data[RV.getPlaceHolderValue(dom.props[value])];
                                } else {
                                    obj.props[value] = data[RV.getPlaceHolderValue(dom.props[value]).split(".")[1]];
                                }
                            } else if (RV.isOperatorExpression(dom.props[value])) {

                                obj.props[value] = RV.getOperatorExpression(dom.props[value], data, dataSingle);
                            } else {
                                obj.props[value] = dom.props[value];
                            }
                        }
                    }

                    for (var child in dom.children) {
                        if (Util.isString(dom.children[child])) {
                            if (RV.isPlaceHolder(dom.children[child])) {
                                if (RV.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                                    obj.children[child] = _this5.data[RV.getPlaceHolderValue(dom.children[child])];
                                } else {
                                    obj.children[child] = data[RV.getPlaceHolderValue(dom.children[child]).split(".")[1]];
                                }
                            } else {
                                obj.children[child] = dom.children[child];
                            }
                        } else {
                            if (dom.children[child] instanceof Object) {
                                if ("childDomData" in dom.props) {
                                    dom.children[child].childDomDatakey = dom.props.childDomData;

                                    dom.children[child].data = data;
                                } else if ("domData" in dom.props) {
                                    dom.children[child].domDataKey = dom.props.domData;
                                    dom.children[child].data = data[child];
                                }

                                dom.children[child].data = data;
                            }
                            obj.children[child] = _this5.applyTruthfulData(dom.children[child]);
                        }
                    }

                    objs.push(obj);
                });
                return objs;
            } else {

                var data = void 0;
                var childDomDatakey = void 0;
                if ("data" in dom) {
                    data = dom.data;
                    childDomDatakey = dom.childDomDatakey;
                } else {
                    data = this.data;
                }
                var obj = {};
                obj.tag = dom.tag;
                obj.children = [];
                obj.props = {};
                var props = Object.keys(dom.props);
                for (var prop in props) {
                    var value = props[prop];
                    if (value === "style") {
                        var style = dom.props[value];
                        if (style.indexOf(",") > -1) {
                            var styles = style.split(",");
                            obj.props[value] = this.handleArrayStyle(data, styles, undefined);
                        } else {

                            obj.props[value] = this.handleSingleStyle(data, style, undefined);
                        }
                    } else {

                        if (RV.isPlaceHolder(dom.props[value])) {
                            obj.props[value] = this.data[RV.getPlaceHolderValue(dom.props[value])];
                        } else if (RV.isOperatorExpression(dom.props[value])) {

                            obj.props[value] = RV.getOperatorExpression(dom.props[value], data, childDomDatakey);
                        } else {
                            obj.props[value] = dom.props[value];
                        }
                    }
                }

                for (var child in dom.children) {
                    if (Util.isString(dom.children[child])) {
                        if (RV.isPlaceHolder(dom.children[child])) {
                            var _value = RV.getPlaceHolderValue(dom.children[child]);

                            if (_value.indexOf(".") > 0) {
                                obj.children[child] = data[_value.split('.')[1]];
                            } else {
                                obj.children[child] = data[_value];
                            }
                        } else {
                            obj.children[child] = dom.children[child];
                        }
                    } else {

                        obj.children[child] = this.applyTruthfulData(dom.children[child]);
                    }
                }

                return obj;
            }
        }
    }, {
        key: 'handleSingleStyle',
        value: function handleSingleStyle(data, style, dataSingle) {
            var newStyle = '';
            if (dataSingle) {
                if (RV.isPlaceHolder(style)) {
                    if (RV.getPlaceHolderValue(style).indexOf(dataSingle) != -1) {
                        var _key5 = RV.getPlaceHolderValue(style).split(".")[1];
                        newStyle = data[_key5];
                    } else {
                        var styleKey = style.split(":")[0];
                        var styleValue = style.split(":")[1];
                        styleValue = data[RV.getPlaceHolderValue(styleValue)];
                        newStyle = styleKey + ":" + styleValue;
                    }
                } else {
                    newStyle = style;
                }
            } else {

                var _styleKey = style.split(":")[0];
                var _styleValue = style.split(":")[1];
                if (RV.isPlaceHolder(_styleValue)) {

                    _styleValue = data[RV.getPlaceHolderValue(_styleValue)];
                    newStyle = _styleKey + ":" + _styleValue;
                } else {
                    newStyle = style;
                }
            }
            return newStyle;
        }
    }, {
        key: 'handleArrayStyle',
        value: function handleArrayStyle(data, styles, dataSingle) {
            var newStyleArray = "";
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = styles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var style = _step.value;


                    var newStyle = this.handleSingleStyle(data, style, dataSingle);
                    newStyleArray += newStyle + ";";
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return newStyleArray;
        }
    }], [{
        key: 'isPlaceHolder',
        value: function isPlaceHolder(content) {
            if (content) {
                if (/^%#\w*.\w*#%$/.test(content)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }, {
        key: 'isDotOperatorExpression',
        value: function isDotOperatorExpression(content) {
            return (/^\w*.\w*$/.test(content)
            );
        }
    }, {
        key: 'getPlaceHolderValue',
        value: function getPlaceHolderValue(content) {
            return content.slice(2, -2);
        }
        /**
         * 是否为表达式
         * @param {String} content 
         */

    }, {
        key: 'isOperatorExpression',
        value: function isOperatorExpression(content) {

            if (Util.isString(content)) {
                if (/^{\w*}$/.test(content)) {

                    return true;
                } else {

                    return false;
                }
            }
            return false;
        }
    }, {
        key: 'getOperatorExpression',
        value: function getOperatorExpression(content, data, dataKey) {
            if (Util.isString(content)) {

                var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"));
                var startIndex = expression.indexOf("%#");
                var endIndex = expression.indexOf("#%") + 2;
                console.log("getOperatorExpression,startIndex:" + startIndex + ",endIndex:" + endIndex + ",express:" + expression);
                if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                    var placeHolder = expression.slice(startIndex, endIndex);
                    console.log("getOperatorExpression,placeHolder:" + placeHolder + ",express:" + expression);
                    var realValue = void 0;
                    if (placeHolder.indexOf(".") > 0) {
                        if (RV.getPlaceHolderValue(placeHolder).split(".")[0] === dataKey) {
                            var placeHolderValue = data[RV.getPlaceHolderValue(placeHolder).split(".")[1]];
                            realValue = Util.isNumber(placeHolderValue) ? placeHolderValue : '"' + placeHolderValue + '"'; //通过placeHolder取真实的值
                        }

                        console.log("realValue ,1,:" + realValue);
                    } else {
                        realValue = data[RV.getPlaceHolderValue(placeHolder)]; //通过placeHolder取真实的值
                        console.log("realValue ,2,:" + realValue);
                    }

                    expression = expression.replace(placeHolder, realValue);
                }
                console.log("expression,realValue:" + expression);
                return eval(expression);
            }
        }
    }]);

    return RV;
}();

exports.default = RV;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2FsZW5kYXJEZW1vLmpzIiwid2VicGFjazovLy8uL3NyYy9SVmNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9sdW5hci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwic2VsZWN0RGF0ZSIsImFsZXJ0IiwiZ2VuZXJhdGVWaWV3IiwiQ2FsZW5kYXIiLCJtb250aHMiLCJBcnJheSIsImRheUNvdW50cyIsImRheXMiLCJ0b2RheSIsImdldFRvZGF5IiwieWVhciIsIm1vbnRoIiwibmV3Q2FsIiwiRGF0ZSIsInNlbGVjdERheSIsImRheSIsInN0YXJ0RGF5IiwiZGFpbHkiLCJydiIsInVuZGVmaW5lZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwcm90b3R5cGUiLCJnZXRXZWVrcyIsImdldERheSIsImdldERheUNvdW50cyIsIndlZWtzIiwiaSIsImRheUluV2Vla3MiLCJpZCIsImoiLCJfY2VsbE9iaiIsImNvbnRlbnQiLCJzdHlsZSIsImxhYmxlIiwibHVuYXIiLCJsdW5hckNhbGVuZGFyIiwiZ2V0THVuYXIiLCJsdW5hckluZm8iLCJjYWxlbmRhcmljaXR5Iiwic29sYXJIb2xpZGF5IiwibHVuYXJIb2xpZGF5IiwiY2hpbmFEYXkiLCJjaGluYU1vbnRoIiwicHVzaCIsIl9vYmoiLCJub3ciLCJnZXREYXRlIiwic3ViTW9udGgiLCJjb25zb2xlIiwibG9nIiwiYWRkTW9udGgiLCJzZXRNb250aCIsInNldFllYXIiLCJtb3VzZU92ZXIiLCJlbGVtZW50IiwiY29sb3IiLCJtb3VzZU91dCIsImxhYmVsIiwiZ2V0QXR0cmlidXRlIiwibUNhbGVuZGFyIiwiY2xpY2tEYXkiLCJpbm5lclRleHQiLCJjaGlsZHJlbiIsImVsIiwiY2FsbGJhY2siLCJSViIsImRhdGEiLCJ3ZWVrVGl0bGVzIiwidmFsdWUiLCJkb20iLCJ0YWciLCJwcm9wcyIsImJvcmRlciIsImNlbGxwYWRkaW5nIiwiY2VsbHNwYWNpbmciLCJrZXkiLCJhbGlnbiIsInZhbGlnbiIsImNvbHNwYW4iLCJvbmNsaWNrIiwibmFtZSIsInR5cGUiLCJtYXhsZW5ndGgiLCJzaXplIiwiZm9yIiwiZG9tRGF0YSIsIm9uTW91c2VvdmVyIiwib25Nb3VzZU91dCIsImNoaWxkRG9tRGF0YSIsInRpbWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInNldCIsIm52YWx1ZSIsImdldCIsIkx1bmFyQ2FsZW5kYXIiLCJfeWVhckluZm8iLCJfYXN0cm9sb2d5IiwiX2RheUluTW9udGgiLCJfVGlhbkdhbiIsIl9EaVpoaSIsIl9ab2RpYWMiLCJfY2FsZW5kYXJpY2l0eSIsIl9sdW5hckhvbGlkYXkiLCJfc29sYXJIb2xpZGF5IiwiX2NhbGVuZGFyaWNpdHlUYWJsZSIsIl9jaGluZXNlQ2hhciIsIl9jaGluZXNlVGVuQ2hhciIsIl9sdW5hck1vbnRoVGFibGUiLCJzdW0iLCJfbGVhcERheXNJbkx1bmFyWWVhciIsIl9sZWFwTW9udGhJbkx1bmFyWWVhciIsIm1zIiwiZ2FuS2V5IiwiemhpS2V5IiwiY01vbnRoIiwiY0RheSIsImFyciIsIm9mZnNldCIsImluZGV4IiwiX3RhYmxlIiwiX2NhbGVuZGFyaWNpdHlJbmZvIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1N0cmluZyIsIl9jYWxkYXkiLCJzIiwiTWF0aCIsImZsb29yIiwibHVuYXJIb2xpZGF5U3RyIiwiZm9yRWFjaCIsImxkIiwic3BsaXQiLCJsZHYiLCJsbW9udGhfdiIsImxkYXlfdiIsImxtZCIsInRyaW0iLCJzb2xhckhvbGlkYXlTdHIiLCJzZCIsInNvbGFyIiwic2R2Iiwic21vbnRoX3YiLCJzZGF5X3YiLCJzbWQiLCJmaXJzdENhbGVuZGFyaWNpdHlEYXkiLCJzZWNvbmRDYWxlbmRhcmljaXR5RGF5Iiwibm93U2VsZWN0RGF5Iiwibm93U2VsZWN0TW9udGgiLCJjYWxlbmRhcmljaXR5U3RyIiwic29sYXJZZWFyIiwic29sYXJNb250aCIsInNvbGFyRGF5Iiwibm93U2VsZWN0RGF0ZSIsIm5vd1NlbGVjdFllYXIiLCJVVEMiLCJ0ZW1wWWVhciIsImxlYXAiLCJ0ZW1wIiwiX2x1bmFyWWVhckRheXMiLCJpc1RvZGF5T2JqIiwiaXNUb2RheSIsIm5XZWVrIiwiY1dlZWsiLCJpc0xlYXAiLCJ0ZW1wTW9udGgiLCJfbW9udGhEYXlzIiwic20iLCJnYW5aaGlZZWFyIiwiX2dldEdhblpoaVllYXIiLCJfZmlyc3RDYWxlbmRhcmljaXR5RGF5IiwiX2dldENhbGVuZGFyaWNpdHkiLCJfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSIsImdhblpoaU1vbnRoIiwiX2dldEdhblpoaSIsIl9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkiLCJkYXlDeWNsaWNhbCIsImdhblpoaURheSIsImFzdHJvIiwiX2dldEFzdHJvbG9neSIsInpvZGlhYyIsIl9nZXRab2RpYWMiLCJfZ2V0Q2hpbmFNb250aCIsIl9nZXRDaGluYURheSIsIl9nZXRMdW5hckhvbGlkYXkiLCJfZ2V0U29sYXJIb2xpZGF5IiwiTk9ERV9SRVBMQUNFIiwiQ0hJTERfUkVfT1JERVIiLCJOT0RFX1BST1BTIiwiTk9ERV9DT05URU5UIiwiRWxlbWVudCIsInRhZ05hbWUiLCJFcnJvciIsImNvdW50IiwiY2hpbGQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wTmFtZSIsIlV0aWwiLCJzZXRBdHRyIiwiY2hpbGRFbCIsInJlbmRlciIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJEaWZmIiwib2xkVHJlZSIsIm5ld1RyZWUiLCJwYXRjaGVzIiwiZGZzV2FsayIsIm9sZE5vZGUiLCJuZXdOb2RlIiwiY3VycmVudFBhdGNoIiwiaXNTdHJpbmciLCJwcm9wc1BhdGNoZXMiLCJkaWZmUHJvcHMiLCJpc0lnbm9yZUNoaWxkcmVuIiwiZGlmZkNoaWxkcmVuIiwibm9kZSIsImxlbmd0aCIsIm9sZFByb3BzIiwibmV3UHJvcHMiLCJpc1NhbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm9sZENoaWxkcmVuIiwibmV3Q2hpbGRyZW4iLCJkaWZmTGlzdCIsIkRpZmZMaXN0IiwiZGlmZnMiLCJnZXRSZXN1bHQiLCJtb3ZlcyIsInJlb3JkZXJQYXRjaCIsImxlZnROb2RlIiwiY3VycmVudE5vZGVJbmRleCIsIm5ld0NoaWxkIiwiUGF0Y2giLCJ3YWxrZXIiLCJjdXJyZW50UGF0Y2hlcyIsImxlbiIsImNoaWxkTm9kZXMiLCJhcHBseVBhdGNoZXMiLCJjdXJyZW50UGF0Y2hlIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsInJlb3JkZXJDaGlsZHJlbiIsInNldFByb3BzIiwidGV4dENvbnRlbnQiLCJub2RlVmFsdWUiLCJzdGF0aWNOb2RlTGlzdCIsInRvQXJyYXkiLCJub2RlTWFwcyIsInNub2RlIiwibm9kZVR5cGUiLCJtb3ZlIiwicmVtb3ZlQ2hpbGQiLCJzcGxpY2UiLCJpbnNlcnROb2RlIiwiaXRlbSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNvbWUiLCJsaXN0IiwiYXJyYXkiLCJkaXJlY3Rpb24iLCJ0ZXN0IiwicmVOdW1iZXIiLCJyZU5lTnVtYmVyIiwicmVSZWFsTnVtYmVyMSIsInJlUmVhbE51bWJlcjIiLCJyZU5lUmVhbE51bWJlcjEiLCJyZU5lUmVhbE51bWJlcjIiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJzbGljZSIsInJlbW92ZSIsInJlbW92ZUNvcHlUZW1wTGlzdCIsIm5JdGVtIiwibkl0ZW1LZXkiLCJjSXRlbSIsImNJdGVtS2V5IiwiY05leHRJdGVtS2V5IiwiaW5zZXJ0IiwiayIsIml0ZW1LZXkiLCJvYnNlcnZlIiwib2JqIiwib2JzZXJ2ZU1hcCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJhZGQiLCJuZXdWYWwiLCJjaGFuZ2VkIiwiaW52b2tlIiwidXBkYXRlRnVuY3Rpb25zIiwiU2V0Iiwib2JzZXJ2YWJsZVVwZGF0ZSIsImZ1biIsImNsb25lIiwiZ2V0VHlwZSIsIm8iLCJjYWxsIiwicmVzdWx0Iiwib0NsYXNzIiwiY29weSIsImFyZ3VtZW50cyIsImNhbGxlZSIsImgiLCJkaWZmIiwiZCIsInBhdGNoIiwiTWFwIiwibWFwIiwib3B0aW9uIiwicm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJ2ZSIsImdldFZpcnR1YWxFbGVtZW50IiwiYXBwbHlUcnV0aGZ1bERhdGEiLCJ3IiwidXBkYXRlZG9tIiwibnZlIiwiY2MiLCJ2IiwiYyIsImRhdGFBcnJheSIsImlzRm9yRm9yIiwiZGF0YVNpbmdsZSIsImlzRm9ySW4iLCJjaGlsZERvbURhdGFrZXkiLCJkb21EYXRhS2V5Iiwib2JqcyIsInByb3AiLCJpbmRleE9mIiwic3R5bGVzIiwiaGFuZGxlQXJyYXlTdHlsZSIsImhhbmRsZVNpbmdsZVN0eWxlIiwiaXNQbGFjZUhvbGRlciIsImlzRG90T3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsImlzT3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uIiwibmV3U3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJuZXdTdHlsZUFycmF5IiwiZGF0YUtleSIsImV4cHJlc3Npb24iLCJzdGFydEluZGV4IiwiZW5kSW5kZXgiLCJwbGFjZUhvbGRlciIsInJlYWxWYWx1ZSIsInBsYWNlSG9sZGVyVmFsdWUiLCJpc051bWJlciIsInJlcGxhY2UiLCJldmFsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztB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QWxDLFNBQXlEQSxnQkFBekQsTUFBWixDQUYrRCxDQUV5QjtBQUUzRjs7QUFHRC9ULGdDQUFRQyxHQUFSLENBQVksbUJBQW1CNlQsU0FBL0I7QUFDSCxxQkFURCxNQVNPO0FBQ0hBLG9DQUFZNVMsS0FBS0QsR0FBR2lTLG1CQUFILENBQXVCVyxXQUF2QixDQUFMLENBQVosQ0FERyxDQUNrRDtBQUNyRDdULGdDQUFRQyxHQUFSLENBQVksbUJBQW1CNlQsU0FBL0I7QUFDSDs7QUFFREosaUNBQWFBLFdBQVdPLE9BQVgsQ0FBbUJKLFdBQW5CLEVBQWdDQyxTQUFoQyxDQUFiO0FBRUg7QUFDRDlULHdCQUFRQyxHQUFSLENBQVksMEJBQTBCeVQsVUFBdEM7QUFDQSx1QkFBT1EsS0FBS1IsVUFBTCxDQUFQO0FBQ0g7QUFHSjs7Ozs7O2tCQUlVelMsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2NhbGVuZGFyRGVtby5qc1wiKTtcbiIsImltcG9ydCBnZW5lcmF0ZVZpZXcgZnJvbSAnLi9zcmMvUlZjYWxlbmRhcidcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdlbmVyYXRlVmlldyhcIiNhcHBcIiwgZnVuY3Rpb24gKHNlbGVjdERhdGUpIHtcclxuICAgICAgICBhbGVydChcInNlbGVjdERhdGUsOlwiK3NlbGVjdERhdGUpXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IFJWIGZyb20gJy4vcnYnXHJcbmltcG9ydCBsdW5hckNhbGVuZGFyIGZyb20gJy4vbHVuYXInXHJcblxyXG4vKipcclxuICogIFxyXG4gKi9cclxuZnVuY3Rpb24gQ2FsZW5kYXIoKSB7XHJcbiAgICB0aGlzLm1vbnRocyA9IG5ldyBBcnJheShcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWNgeS4gFwiLCBcIuWNgeS6jFwiKTtcclxuICAgIHRoaXMuZGF5Q291bnRzID0gbmV3IEFycmF5KDMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzEpO1xyXG4gICAgdGhpcy5kYXlzID0gbmV3IEFycmF5KFwi5pelXCIsIFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIpO1xyXG4gICAgdGhpcy50b2RheSA9IHRoaXMuZ2V0VG9kYXkoKTtcclxuICAgIHRoaXMueWVhciA9IHRoaXMudG9kYXkueWVhcjtcclxuICAgIHRoaXMubW9udGggPSB0aGlzLnRvZGF5Lm1vbnRoO1xyXG4gICAgdGhpcy5uZXdDYWwgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy5zZWxlY3REYXkgPSB0aGlzLm5ld0NhbDtcclxuICAgIHRoaXMuZGF5ID0gLTE7XHJcbiAgICB0aGlzLnN0YXJ0RGF5ID0gMDtcclxuICAgIHRoaXMuZGFpbHkgPSAwO1xyXG4gICAgdGhpcy5ydiA9IHVuZGVmaW5lZFxyXG4gICAgaWYgKCh0aGlzLnRvZGF5LnllYXIgPT0gdGhpcy5uZXdDYWwuZ2V0RnVsbFllYXIoKSkgJiYgKHRoaXMudG9kYXkubW9udGggPT0gdGhpcy5uZXdDYWwuZ2V0TW9udGgoKSkpIHtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMudG9kYXkuZGF5O1xyXG4gICAgfVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5nZXRXZWVrcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubmV3Q2FsID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAxKTtcclxuICAgIHRoaXMuZGF5ID0gLTE7XHJcbiAgICB0aGlzLnN0YXJ0RGF5ID0gdGhpcy5uZXdDYWwuZ2V0RGF5KCk7XHJcbiAgICB0aGlzLmRhaWx5ID0gMDtcclxuICAgIGlmICgodGhpcy50b2RheS55ZWFyID09IHRoaXMubmV3Q2FsLmdldEZ1bGxZZWFyKCkpICYmICh0aGlzLnRvZGF5Lm1vbnRoID09IHRoaXMubmV3Q2FsLmdldE1vbnRoKCkpKSB7XHJcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLnRvZGF5LmRheTtcclxuICAgIH1cclxuICAgIHZhciBkYXlDb3VudHMgPSB0aGlzLmdldERheUNvdW50cyh0aGlzLm5ld0NhbC5nZXRNb250aCgpLCB0aGlzLm5ld0NhbC5nZXRGdWxsWWVhcigpKTtcclxuICAgIHZhciB3ZWVrcyA9IFtdXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIHZhciBkYXlJbldlZWtzID0gW11cclxuICAgICAgICBkYXlJbldlZWtzLmlkID0gYHdlZWtfcm93XyR7aX1gXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIF9jZWxsT2JqID0ge31cclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IFwiXCJcclxuICAgICAgICAgICAgdmFyIGxhYmxlID0gXCJcIlxyXG4gICAgICAgICAgICB2YXIgaWQgPSBgd2Vla19kYXlfJHtpfSR7an1gXHJcbiAgICAgICAgICAgIGlmICgoaiA9PSB0aGlzLnN0YXJ0RGF5KSAmJiAoMCA9PSB0aGlzLmRhaWx5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYWlseSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRheSA9PSB0aGlzLmRhaWx5KSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiZm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjojRkZGRkZGO2JhY2tncm91bmQtY29sb3I6IzVDQkE1QTtoZWlnaHQ6MjBweDt0ZXh0LWFsaWduOmNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwiY3VycmVudFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6I0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNFNUU5RjI7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjE4cHg7d2lkdGg6MTIlXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJzYXRcIlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGogPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImNvbG9yOiAjRkYwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6MThweDt3aWR0aDoxMiVcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcInN1blwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6IzI0M0Y2NTtiYWNrZ3JvdW5kLWNvbG9yOiNFNUU5RjI7aGVpZ2h0OjIwcHg7d2lkdGg6MTElO3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJub3JtYWxcIlxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLmRhaWx5ID4gMCkgJiYgKHRoaXMuZGFpbHkgPD0gZGF5Q291bnRzKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuZGFpbHkgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYWlseSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImNvbG9yOiMwMDAwMDA7YmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtoZWlnaHQ6MjBweDt3aWR0aDogMTElO3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfY2VsbE9iai5jb250ZW50ID0gY29udGVudFxyXG4gICAgICAgICAgICBfY2VsbE9iai5pZCA9IGlkXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmxhYmxlID0gbGFibGVcclxuICAgICAgICAgICAgX2NlbGxPYmouc3R5bGUgPSBzdHlsZVxyXG4gICAgICAgICAgICBsZXQgbHVuYXIgPSBsdW5hckNhbGVuZGFyLmdldEx1bmFyKHRoaXMueWVhciwgdGhpcy5tb250aCsxLCBjb250ZW50KVxyXG4gICAgICAgICAgICBfY2VsbE9iai5jb250ZW50ID0gY29udGVudFxyXG4gICAgICAgICAgICBfY2VsbE9iai5pZCA9IGlkXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmxhYmxlID0gbGFibGVcclxuICAgICAgICAgICAgX2NlbGxPYmouc3R5bGUgPSBzdHlsZVxyXG4gICAgICAgICAgICBsZXQgbHVuYXJJbmZvID0gXCJcIlxyXG4gICAgICAgICAgICBpZiAobHVuYXIuY2FsZW5kYXJpY2l0eSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5jYWxlbmRhcmljaXR5XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGx1bmFyLnNvbGFySG9saWRheSkge1xyXG4gICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIuc29sYXJIb2xpZGF5XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGx1bmFyLmx1bmFySG9saWRheSkge1xyXG4gICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIubHVuYXJIb2xpZGF5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihsdW5hci5jaGluYURheT09PVwi5Yid5LiAXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLmNoaW5hTW9udGggXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsdW5hckluZm89IGx1bmFyLmNoaW5hRGF5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY29udGVudCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIF9jZWxsT2JqLmx1bmFySW5mbyA9IGx1bmFySW5mb1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIF9jZWxsT2JqLmx1bmFySW5mbyA9IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXlJbldlZWtzLnB1c2goX2NlbGxPYmopXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlZWtzLnB1c2goZGF5SW5XZWVrcylcclxuICAgICAgICB3aW5kb3cud2Vla3MgPSB3ZWVrc1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdlZWtzXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldERheUNvdW50cyA9IGZ1bmN0aW9uIChtb250aCwgeWVhcikge1xyXG4gICAgaWYgKDEgPT0gbW9udGgpIHtcclxuICAgICAgICByZXR1cm4gKCgwID09IHllYXIgJSA0KSAmJiAoMCAhPSAoeWVhciAlIDEwMCkpKSB8fCAoMCA9PSB5ZWFyICUgNDAwKSA/IDI5IDogMjhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5Q291bnRzW21vbnRoXVxyXG4gICAgfVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5nZXRUb2RheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfb2JqID0ge31cclxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgX29iai5ub3cgPSBub3dcclxuICAgIF9vYmoueWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xyXG4gICAgX29iai5tb250aCA9IG5vdy5nZXRNb250aCgpO1xyXG4gICAgX29iai5kYXkgPSBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgcmV0dXJuIF9vYmpcclxufVxyXG5cclxuQ2FsZW5kYXIucHJvdG90eXBlLnN1Yk1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCh0aGlzLm1vbnRoIC0gMSkgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IDExO1xyXG4gICAgICAgIHRoaXMueWVhciA9IHRoaXMueWVhciAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9udGggPSB0aGlzLm1vbnRoIC0gMTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwibW9udGg6XCIgKyB0aGlzLm1vbnRoKVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5hZGRNb250aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgodGhpcy5tb250aCArIDEpID4gMTEpIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gMDtcclxuICAgICAgICB0aGlzLnllYXIgPSB0aGlzLnllYXIgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gdGhpcy5tb250aCArIDE7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLnNldE1vbnRoID0gZnVuY3Rpb24gKG1vbnRoKSB7XHJcbiAgICBpZiAobW9udGggPCAxIHx8IG1vbnRoID4gMTIpIHtcclxuICAgICAgICBhbGVydChcIuaciOS7veW/hemhu+WcqDEtMTLkuYvpl7QhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubW9udGggPSBtb250aFxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5zZXRZZWFyID0gZnVuY3Rpb24gKHllYXIpIHtcclxuICAgIHRoaXMueWVhciA9IHllYXJcclxufVxyXG5cclxuXHJcbndpbmRvdy5tb3VzZU92ZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGRkZGRlwiXHJcbn1cclxuXHJcbndpbmRvdy5tb3VzZU91dCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICB2YXIgbGFiZWwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFibGUnKVxyXG4gICAgaWYgKGxhYmVsID09ICdzYXQnIHx8IGxhYmVsID09ICdzdW4nKSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGMDAwMFwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIlxyXG4gICAgfVxyXG5cclxufVxyXG5sZXQgbUNhbGVuZGFyID0gbmV3IENhbGVuZGFyKClcclxud2luZG93Lm1DYWxlbmRhciA9IG1DYWxlbmRhclxyXG53aW5kb3cuY2xpY2tEYXkgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQuaW5uZXJUZXh0ICE9ICcnKSB7XHJcbiAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKG1DYWxlbmRhci55ZWFyLCBtQ2FsZW5kYXIubW9udGgsIGVsZW1lbnQuY2hpbGRyZW5bMF0uaW5uZXJUZXh0XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBtQ2FsZW5kYXIuc2VsZWN0RGF5ID0gZGF5XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlVmlldyhlbCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICB2YXIgd2Vla3MgPSBtQ2FsZW5kYXIuZ2V0V2Vla3MoKVxyXG4gICAgbGV0IHJ2ID0gbmV3IFJWKHtcclxuICAgICAgICBlbDogZWwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB5ZWFyOiAnJyArIG1DYWxlbmRhci55ZWFyLFxyXG4gICAgICAgICAgICBtb250aDogJycgKyAobUNhbGVuZGFyLm1vbnRoICsgMSksXHJcbiAgICAgICAgICAgIHdlZWtUaXRsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5MVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LiAXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTJcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS6jFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXkzXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkuIlcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5NFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5ZubXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTVcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS6lFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHdlZWtzOiB3ZWVrc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgIHRhZzogXCJ0YWJsZVwiLFxyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgY2VsbHBhZGRpbmc6ICcwJyxcclxuICAgICAgICAgICAgICAgIGNlbGxzcGFjaW5nOiAnMScsXHJcbiAgICAgICAgICAgICAgICBpZDogJ2NhbHRhYmxlJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ3RhYmxlJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAndGV4dC1kZWNvcmF0aW9uOm5vbmU7d2lkdGg6MjAwO2JhY2tncm91bmQtY29sb3I6I0QwRDBFRTtmb250LXNpemU6OHB0O2JvcmRlcjowcHggZG90dGVkICMxQzZGRjU7J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgIHRhZzogXCJ0aGVhZFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGhlYWRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWduOiBcIm1pZGRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aXRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGl0bGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXdlaWdodDpub3JtYWw7aGVpZ2h0OjI0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzMzMzMzMzt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNBNEI5RDc7Ym9yZGVyLXRvcC13aWR0aDoxcHg7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweDtib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7IGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7Ym9yZGVyLWJvdHRvbS1zdHlsZTogMXB4O2JvcmRlci10b3AtY29sb3I6ICM5OTk5OTk7Ym9yZGVyLXJpZ2h0LWNvbG9yOiAjOTk5OTk5O2JvcmRlci1ib3R0b20tY29sb3I6Izk5OTk5OTtib3JkZXItbGVmdC1jb2xvcjojOTk5OTk5OydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzcGFuOiBcIjdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RkVGl0bGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAndGl0bGVEaXYnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBcIm1DYWxlbmRhci5zdWJNb250aCgpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC13ZWlnaHQ6Ym9sZDsgY29sb3I6IzI0M0Y2NTtjdXJzb3I6aGFuZDt0ZXh0LWRlY29yYXRpb246bm9uZTttYXJnaW4tcmlnaHQ6MjBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJzdWJCdXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIjxcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwiaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInllYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aDogXCI0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC1zaXplOiA5cHQ7IHRleHQtZGVjb3JhdGlvbjogbm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO2hlaWdodDogMjBweDtib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2OyBjb2xvcjogIzAwMDAwMDt0ZXh0LWFsaWduOmNlbnRlcjsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBcIjRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICclI3llYXIjJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpbnB1dFllYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIlwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJpbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9udGhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aDogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJSNtb250aCMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXNpemU6IDlwdDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO2JhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7aGVpZ2h0OiAyMHB4O2JvcmRlcjogMXB4IHNvbGlkICM2NjY2NjY7IGNvbG9yOiAjMDAwMDAwO3RleHQtYWxpZ246Y2VudGVyOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaW5wdXRNb250aFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBcIm1DYWxlbmRhci5hZGRNb250aCgpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC13ZWlnaHQ6IGJvbGQ7Y29sb3I6ICMyNDNGNjU7Y3Vyc29yOiBoYW5kO3RleHQtZGVjb3JhdGlvbjogbm9uZTttYXJnaW4tbGVmdDoyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImFkZEJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiPlwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWc6ICd0cicsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnZGF5dHInXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb2xvcjogI0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246IG5vbmU7YmFja2dyb3VuZC1jb2xvcjogI0MwRDBFODt0ZXh0LWFsaWduOiBjZW50ZXI7aGVpZ2h0OiAyMHB4O3dpZHRoOiAxMiU7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2RheVN1blRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wi5pelXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb2xvcjojMDAwMDAwO2JhY2tncm91bmQtY29sb3I6I0MwRDBFODtoZWlnaHQ6MjBweDt3aWR0aDoxMSU7dGV4dC1hbGlnbjpjZW50ZXI7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCIlI3YuaWQjJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yOiBcInYgX2luXyB3ZWVrVGl0bGVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIiUjdi52YWx1ZSMlXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnIGNvbG9yOiNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojQzBEMEU4O3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDogMjBweDt3aWR0aDogMTIlOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdkYXlTYXRUaXRsZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIuWFrVwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcInRib2R5XCIsXHJcbiAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxzcGFjaW5nOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxscGFkZGluZzogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY2FsZW5kYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJyB0ZXh0LWRlY29yYXRpb246IG5vbmU7d2lkdGg6IDE3MDtiYWNrZ3JvdW5kLWNvbG9yOiAjQzBEMEU4O2ZvbnQtc2l6ZTogOXB0O2JvcmRlcjogMHB4IGRvdHRlZCAjMUM2RkE1OycsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGJvZHlcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnNvcjpoYW5kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIiUjd2Vlay5pZCMlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcjogJ3dlZWsgX2luXyB3ZWVrcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbURhdGE6XCJ3ZWVrXCJcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIiUjdi5pZCMlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiAnY2xpY2tEYXkodGhpcyknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICclI3Yuc3R5bGUjJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJsZTogJyUjdi5sYWJsZSMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VvdmVyOiAnbW91c2VPdmVyKHRoaXMpOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlT3V0OiAnbW91c2VPdXQodGhpcyk7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRG9tRGF0YTpcInZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcjogJ3YgX2luXyB3ZWVrJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwicFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwieyUjdi5pZCMlKydfY29udGVudCd9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6XCJtYXJnaW4tYmxvY2stc3RhcnQ6IDBlbTttYXJnaW4tYmxvY2stZW5kOiAwZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIiUjdi5jb250ZW50IyVcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJ7JSN2LmlkIyUrJ19sdW5hckluZm8nfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6XCJ7bmV3IERhdGUoKX1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTpcIm1hcmdpbi1ibG9jay1zdGFydDogMGVtO21hcmdpbi1ibG9jay1lbmQ6IDBlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiJSN2Lmx1bmFySW5mbyMlXCJdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxdXHJcbiAgICAgICAgICAgICAgICB9LF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICBsZXQgbW9udGggPSBtQ2FsZW5kYXJbJ21vbnRoJ11cclxuICAgIGxldCB5ZWFyID0gbUNhbGVuZGFyWyd5ZWFyJ11cclxuICAgIGxldCBzZWxlY3REYXkgPSBtQ2FsZW5kYXJbJ3NlbGVjdERheSddXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobUNhbGVuZGFyLCAnbW9udGgnLCB7XHJcblxyXG4gICAgICAgIHNldChudmFsdWUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXdNb250aDpcIiArIG52YWx1ZSlcclxuICAgICAgICAgICAgaWYgKG1vbnRoICE9IG52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbW9udGggPSBudmFsdWVcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEud2Vla3MgPSBtQ2FsZW5kYXIuZ2V0V2Vla3MoKVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS5tb250aCA9IChudmFsdWUgKyAxKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtb250aFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobUNhbGVuZGFyLCAneWVhcicsIHtcclxuICAgICAgICBzZXQobnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICh5ZWFyICE9IG52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJuZXdZZWFyOlwiICsgbnZhbHVlKVxyXG4gICAgICAgICAgICAgICAgeWVhciA9IG52YWx1ZVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS53ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLnllYXIgPSBudmFsdWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHllYXJcclxuICAgICAgICB9XHJcblxyXG4gICAgfSlcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICdzZWxlY3REYXknLCB7XHJcbiAgICAgICAgc2V0KG52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0RGF5ICE9IG52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0RGF5ID0gbnZhbHVlXHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudmFsdWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGVjdERheVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCJjbGFzcyBMdW5hckNhbGVuZGFyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8qKlx0XHJcbiAgICAgKiBcclxuICAgICAqIOWGnOWOhjE5MDAtMjEwMOeahOa2puaciOS/oeaBr+ihqCBcclxuICAgIOWNgeWFrei/m+WItuW9ouW8jzpcclxuICAgIDB4IHh4eHh4ICAgIFxyXG4gICAg5LqM6L+b5Yi25b2i5byPOlxyXG4gICAgeHh4eFx0eHh4eFx0eHh4eFx0eHh4eFx0eHh4eFxyXG4gICAgMjAtMTdcdDE2LTEyXHQxMi05XHQ4LTVcdCAgICA0LTFcclxuwqBcclxuICAgIDEtNDog6KGo56S65b2T5bm05pyJ5peg6Zew5bm077yM5pyJ55qE6K+d77yM5Li66Zew5pyI55qE5pyI5Lu977yM5rKh5pyJ55qE6K+d77yM5Li6MOOAglxyXG5cclxuICAgIDUtMTbvvJrkuLrpmaTkuobpl7DmnIjlpJbnmoTmraPluLjmnIjku73mmK/lpKfmnIjov5jmmK/lsI/mnIjvvIwx5Li6MzDlpKnvvIww5Li6MjnlpKnjgIIo5rOo5oSP77ya5LuOMeaciOWIsDEy5pyI5a+55bqU55qE5piv56ysMTbkvY3liLDnrKw15L2N44CCKVxyXG4gICAgMTctMjDvvJog6KGo56S66Zew5pyI5piv5aSn5pyI6L+Y5piv5bCP5pyI77yM5LuF5b2T5a2Y5Zyo6Zew5pyI55qE5oOF5Ya15LiL5pyJ5oSP5LmJ44CCXHJcblxyXG4gICAg5Li+5Liq5L6L5a2Q77yaXHJcblxyXG4gICAgMTk4MOW5tOeahOaVsOaNruaYr++8miAweDA5NWIwIDB45Luj6KGo5Y2B5YWt6L+b5Yi277yM5ZCO6Z2i55qE5piv5Y2B5YWt6L+b5Yi25pWw44CCXHJcbiAgICAgICAgICAgICAxMDAwIDAwMDAgMDAwMCAwMDAwIDAwMDBcclxuICAgICAgICAgICAgIDAwMDAgMDAwMCAwMDAwIDAwMDAgMTExMVxyXG5cclxuICAgIOS6jOi/m+WItu+8miAgMDAwMMKgMTAwMSAwMTAxIDEwMTEgMDAwMFxyXG5cclxuICAgIOihqOekujE5ODDlubTmsqHmnInpl7DmnIjvvIzku44x5pyI5YiwMTLmnIjnmoTlpKnmlbDkvp3mrKHkuLrvvJozMOOAgTI544CBMjnjgIEzMCDjgIEyOeOAgTMw44CBMjnjgIEzMOOAgSAzMOOAgTI544CBMzDjgIEzMOOAglxyXG5cclxuICAgIDE5ODLlubTnmoTmlbDmja7mmK/vvJoweDBhOTc0XHJcbiAgICAgICAgIDEwMTAgICAxMDAxIDAxMTEgMDEwMFxyXG4gICAgMDAwMCAxMDEwIDAgMTAwMSAwMTExIDAxMDBcclxuXHJcbiAgICDooajnpLoxOTgy5bm055qENOaciOS4uumXsOaciO+8jOWNs+acieesrOS6jOS4qjTmnIjvvIzkuJTmmK/pl7DlsI/mnIjjgIJcclxuXHJcbiAgICDku44x5pyI5YiwMTPmnIjnmoTlpKnmlbDkvp3mrKHkuLrvvJozMOOAgTI544CBMzDjgIEyOeOAgcKgMjko6Zew5pyIKeOAgSAzMOOAgTI544CBMjnjgIEzMOOAgSAyOeOAgTMw44CBMzDjgIEzMOOAglxyXG5cclxuICBcclxuICAqIEBBcnJheSBPZiBQcm9wZXJ0eVxyXG4gICogQHJldHVybiBIZXggXHJcbiAgKi9cclxuICAgIHRoaXMuX3llYXJJbmZvID0gWzB4MDRiZDgsIDB4MDRhZTAsIDB4MGE1NzAsIDB4MDU0ZDUsIDB4MGQyNjAsIDB4MGQ5NTAsIDB4MTY1NTQsIDB4MDU2YTAsIDB4MDlhZDAsIDB4MDU1ZDIsLy8xOTAwLTE5MDlcclxuICAgICAgMHgwNGFlMCwgMHgwYTViNiwgMHgwYTRkMCwgMHgwZDI1MCwgMHgxZDI1NSwgMHgwYjU0MCwgMHgwZDZhMCwgMHgwYWRhMiwgMHgwOTViMCwgMHgxNDk3NywvLzE5MTAtMTkxOVxyXG4gICAgICAweDA0OTcwLCAweDBhNGIwLCAweDBiNGI1LCAweDA2YTUwLCAweDA2ZDQwLCAweDFhYjU0LCAweDAyYjYwLCAweDA5NTcwLCAweDA1MmYyLCAweDA0OTcwLC8vMTkyMC0xOTI5XHJcbiAgICAgIDB4MDY1NjYsIDB4MGQ0YTAsIDB4MGVhNTAsIDB4MDZlOTUsIDB4MDVhZDAsIDB4MDJiNjAsIDB4MTg2ZTMsIDB4MDkyZTAsIDB4MWM4ZDcsIDB4MGM5NTAsLy8xOTMwLTE5MzlcclxuICAgICAgMHgwZDRhMCwgMHgxZDhhNiwgMHgwYjU1MCwgMHgwNTZhMCwgMHgxYTViNCwgMHgwMjVkMCwgMHgwOTJkMCwgMHgwZDJiMiwgMHgwYTk1MCwgMHgwYjU1NywvLzE5NDAtMTk0OVxyXG4gICAgICAweDA2Y2EwLCAweDBiNTUwLCAweDE1MzU1LCAweDA0ZGEwLCAweDBhNWIwLCAweDE0NTczLCAweDA1MmIwLCAweDBhOWE4LCAweDBlOTUwLCAweDA2YWEwLC8vMTk1MC0xOTU5XHJcbiAgICAgIDB4MGFlYTYsIDB4MGFiNTAsIDB4MDRiNjAsIDB4MGFhZTQsIDB4MGE1NzAsIDB4MDUyNjAsIDB4MGYyNjMsIDB4MGQ5NTAsIDB4MDViNTcsIDB4MDU2YTAsLy8xOTYwLTE5NjlcclxuICAgICAgMHgwOTZkMCwgMHgwNGRkNSwgMHgwNGFkMCwgMHgwYTRkMCwgMHgwZDRkNCwgMHgwZDI1MCwgMHgwZDU1OCwgMHgwYjU0MCwgMHgwYjZhMCwgMHgxOTVhNiwvLzE5NzAtMTk3OVxyXG4gICAgICAweDA5NWIwLCAweDA0OWIwLCAweDBhOTc0LCAweDBhNGIwLCAweDBiMjdhLCAweDA2YTUwLCAweDA2ZDQwLCAweDBhZjQ2LCAweDBhYjYwLCAweDA5NTcwLC8vMTk4MC0xOTg5XHJcbiAgICAgIDB4MDRhZjUsIDB4MDQ5NzAsIDB4MDY0YjAsIDB4MDc0YTMsIDB4MGVhNTAsIDB4MDZiNTgsIDB4MDU1YzAsIDB4MGFiNjAsIDB4MDk2ZDUsIDB4MDkyZTAsLy8xOTkwLTE5OTlcclxuICAgICAgMHgwYzk2MCwgMHgwZDk1NCwgMHgwZDRhMCwgMHgwZGE1MCwgMHgwNzU1MiwgMHgwNTZhMCwgMHgwYWJiNywgMHgwMjVkMCwgMHgwOTJkMCwgMHgwY2FiNSwvLzIwMDAtMjAwOVxyXG4gICAgICAweDBhOTUwLCAweDBiNGEwLCAweDBiYWE0LCAweDBhZDUwLCAweDA1NWQ5LCAweDA0YmEwLCAweDBhNWIwLCAweDE1MTc2LCAweDA1MmIwLCAweDBhOTMwLC8vMjAxMC0yMDE5XHJcbiAgICAgIDB4MDc5NTQsIDB4MDZhYTAsIDB4MGFkNTAsIDB4MDViNTIsIDB4MDRiNjAsIDB4MGE2ZTYsIDB4MGE0ZTAsIDB4MGQyNjAsIDB4MGVhNjUsIDB4MGQ1MzAsLy8yMDIwLTIwMjlcclxuICAgICAgMHgwNWFhMCwgMHgwNzZhMywgMHgwOTZkMCwgMHgwNGFmYiwgMHgwNGFkMCwgMHgwYTRkMCwgMHgxZDBiNiwgMHgwZDI1MCwgMHgwZDUyMCwgMHgwZGQ0NSwvLzIwMzAtMjAzOVxyXG4gICAgICAweDBiNWEwLCAweDA1NmQwLCAweDA1NWIyLCAweDA0OWIwLCAweDBhNTc3LCAweDBhNGIwLCAweDBhYTUwLCAweDFiMjU1LCAweDA2ZDIwLCAweDBhZGEwLC8vMjA0MC0yMDQ5XHJcbiAgICAgIDB4MTRiNjMsIDB4MDkzNzAsIDB4MDQ5ZjgsIDB4MDQ5NzAsIDB4MDY0YjAsIDB4MTY4YTYsIDB4MGVhNTAsIDB4MDZiMjAsIDB4MWE2YzQsIDB4MGFhZTAsLy8yMDUwLTIwNTlcclxuICAgICAgMHgwYTJlMCwgMHgwZDJlMywgMHgwYzk2MCwgMHgwZDU1NywgMHgwZDRhMCwgMHgwZGE1MCwgMHgwNWQ1NSwgMHgwNTZhMCwgMHgwYTZkMCwgMHgwNTVkNCwvLzIwNjAtMjA2OVxyXG4gICAgICAweDA1MmQwLCAweDBhOWI4LCAweDBhOTUwLCAweDBiNGEwLCAweDBiNmE2LCAweDBhZDUwLCAweDA1NWEwLCAweDBhYmE0LCAweDBhNWIwLCAweDA1MmIwLC8vMjA3MC0yMDc5XHJcbiAgICAgIDB4MGIyNzMsIDB4MDY5MzAsIDB4MDczMzcsIDB4MDZhYTAsIDB4MGFkNTAsIDB4MTRiNTUsIDB4MDRiNjAsIDB4MGE1NzAsIDB4MDU0ZTQsIDB4MGQxNjAsLy8yMDgwLTIwODlcclxuICAgICAgMHgwZTk2OCwgMHgwZDUyMCwgMHgwZGFhMCwgMHgxNmFhNiwgMHgwNTZkMCwgMHgwNGFlMCwgMHgwYTlkNCwgMHgwYTJkMCwgMHgwZDE1MCwgMHgwZjI1MiwvLzIwOTAtMjA5OVxyXG4gICAgICAweDBkNTIwXS8vMjEwMFxyXG5cclxuXHJcbiAgICB0aGlzLl9hc3Ryb2xvZ3kgPSBbXCLprZTnvq9cIiwgXCLmsLTnk7ZcIiwgXCLlj4zpsbxcIiwgXCLnmb3nvopcIiwgXCLph5HniZtcIiwgXCLlj4zlrZBcIiwgXCLlt6jon7lcIiwgXCLni67lrZBcIiwgXCLlpITlpbNcIiwgXCLlpKnnp6RcIiwgXCLlpKnonY5cIiwgXCLlsITmiYtcIiwgXCLprZTnvq9cIl1cclxuICAgIC8qKlxyXG4gICAgICAqIOWFrOWOhuavj+S4quaciOS7veeahOWkqeaVsOaZrumAmuihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fZGF5SW5Nb250aCA9IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5aSp5bmy5Zyw5pSv5LmL5aSp5bmy6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9UaWFuR2FuID0gW1wi55SyXCIsIFwi5LmZXCIsIFwi5LiZXCIsIFwi5LiBXCIsIFwi5oiKXCIsIFwi5bexXCIsIFwi5bqaXCIsIFwi6L6bXCIsIFwi5aOsXCIsIFwi55m4XCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5aSp5bmy5Zyw5pSv5LmL5Zyw5pSv6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9EaVpoaSA9IFtcIuWtkFwiLCBcIuS4kVwiLCBcIuWvhVwiLCBcIuWNr1wiLCBcIui+sFwiLCBcIuW3s1wiLCBcIuWNiFwiLCBcIuacqlwiLCBcIueUs1wiLCBcIumFiVwiLCBcIuaIjFwiLCBcIuS6pVwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOeUn+iClumAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fWm9kaWFjID0gW1wi6bygXCIsIFwi54mbXCIsIFwi6JmOXCIsIFwi5YWUXCIsIFwi6b6ZXCIsIFwi6JuHXCIsIFwi6amsXCIsIFwi576KXCIsIFwi54y0XCIsIFwi6bihXCIsIFwi54uXXCIsIFwi54yqXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogMjToioLmsJTpgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NhbGVuZGFyaWNpdHkgPSBbXCLlsI/lr5JcIiwgXCLlpKflr5JcIiwgXCLnq4vmmKVcIiwgXCLpm6jmsLRcIiwgXCLmg4rom7BcIiwgXCLmmKXliIZcIiwgXCLmuIXmmI5cIiwgXCLosLfpm6hcIiwgXCLnq4vlpI9cIiwgXCLlsI/mu6FcIiwgXCLoipLnp41cIiwgXCLlpI/oh7NcIiwgXCLlsI/mmpFcIiwgXCLlpKfmmpFcIiwgXCLnq4vnp4tcIiwgXCLlpITmmpFcIiwgXCLnmb3pnLJcIiwgXCLnp4vliIZcIiwgXCLlr5LpnLJcIiwgXCLpnJzpmY1cIiwgXCLnq4vlhqxcIiwgXCLlsI/pm6pcIiwgXCLlpKfpm6pcIiwgXCLlhqzoh7NcIl1cclxuICAgIC8qKlxyXG4gICAgICDlhpzljoboioLml6VcclxuICAgICovXHJcbiAgICB0aGlzLl9sdW5hckhvbGlkYXkgPSBbXCIwMTAxIOaYpeiKglwiLCBcIjAxMTUg5YWD5a61XCIsIFwiMDUwNSDnq6/ljYhcIiwgXCIwNzA3IOaDheS6ulwiLCBcIjA3MTUg5Lit5YWDXCIsXHJcbiAgICAgIFwiMDgxNSDkuK3np4tcIiwgXCIwOTA5IOmHjemYs1wiLCBcIjEyMDgg6IWK5YWrXCIsIFwiMTIyNCDlsI/lubRcIiwgXCIxMjMwIOmZpOWklVwiXVxyXG4gICAgLypcclxuICAgICDlhazljoboioLml6VcclxuICAgICovXHJcbiAgICB0aGlzLl9zb2xhckhvbGlkYXkgPSBbXHJcbiAgICAgIFwiMDEwMSDlhYPml6ZcIiwgXCIwMjE0IOaDheS6ulwiLCBcIjAzMDgg5aaH5aWzXCIsIFwiMDMxMiDmpI3moJFcIiwgXCIwMzE1IOa2iOi0ueiAheadg+ebiuaXpVwiLCBcIjA0MDEg5oSa5Lq6XCIsIFwiMDUwMSDlirPliqhcIiwgXCIwNTA0IOmdkuW5tFwiLCAvL1xyXG4gICAgICBcIjA1MTIg5oqk5aOrXCIsIFwiMDYwMSDlhL/nq6VcIiwgXCIwNzAxIOW7uuWFmlwiLCBcIjA4MDEg5bu65YabXCIsIFwiMDgwOCDniLbkurJcIiwgXCIwOTEwIOaVmeW4iFwiLCBcIjA5Mjgg5a2U5a2Q6K+e6L6wXCIsIC8vXHJcbiAgICAgIFwiMTAwMSDlm73luoZcIiwgXCIxMDI0IOiBlOWQiOWbveaXpVwiLCBcIjExMTIg5a2Z5Lit5bGx6K+e6L6w57qq5b+1XCIsIFwiMTIyMCDmvrPpl6jlm57lvZLnuqrlv7VcIiwgXCIxMjI1IOWco+ivnlwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIDE5MDAtMjEwMOWQhOW5tOWGnOWOhueahDI06IqC5rCU5pel5pyf6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9jYWxlbmRhcmljaXR5VGFibGUgPSBbJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJyxcclxuICAgICAgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcclxuICAgICAgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLCAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJyxcclxuICAgICAgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5Nzc4Mzk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcclxuICAgICAgJzk3YmQwOTgwMWQ5ODA4MmM5NWY4ZTFjZmNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMTk3YzM2YzkyMTBjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZScsICc5N2JkMDk4MDFkOTgwODJjOTVmOGUxY2ZjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhlMWNmY2M5MjBmJyxcclxuICAgICAgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcclxuICAgICAgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcclxuICAgICAgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcclxuICAgICAgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA5N2JkMDdmNTk1YjBiNmZjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQxOTgwMWVjOTIxMGM5Mjc0YzkyMGUnLCAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJyxcclxuICAgICAgJzk3YmQwN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiZDA3ZjE0ODdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcclxuICAgICAgJzk3YmNmN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJyxcclxuICAgICAgJzk3YmNmN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzkyNzRjOTIwZScsICc5N2JjZjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOTFhYScsICc5N2I2Yjk3YmQxOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLCAnOTdiY2Y3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MjBlJyxcclxuICAgICAgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjcwYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcclxuICAgICAgJzdmMGUyN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcclxuICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJyxcclxuICAgICAgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOTFhYScsICc5N2I2YjdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM3ZjBlMzdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJyxcclxuICAgICAgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMTBjOGRjMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcclxuICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcclxuICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJyxcclxuICAgICAgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3MjNiMDZiZCcsICc3ZjA3ZTdmMGUzN2YxNDliMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcclxuICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcclxuICAgICAgJzdmMGUzN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JyxcclxuICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJyxcclxuICAgICAgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JyxcclxuICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3MjNiMDZiZCcsICc3ZjA3ZTdmMGUzN2YxNDk5ODA4M2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJyxcclxuICAgICAgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLCAnN2YwN2U3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzY2NjViNjZhYTg5ODAxZTk4MDgyOTdjMzUnLCAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JyxcclxuICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JyxcclxuICAgICAgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJyxcclxuICAgICAgJzdmMGUzNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJyxcclxuICAgICAgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLCAnNjY1ZjY3ZjBlMzdmMTQ4OTgwMWViMDcyMjk3YzM1JyxcclxuICAgICAgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJ11cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDkuK3mlofml6XmnJ9cclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NoaW5lc2VDaGFyID0gW1wi5pelXCIsIFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCIsIFwi5Y2BXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5Yac5Y6G6L+b5Yi25Y2V5L2NXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9jaGluZXNlVGVuQ2hhciA9IFtcIuWInVwiLCBcIuWNgVwiLCBcIuW7v1wiLCBcIuWNhVwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOaciOS7veWGnOWOhuihqOekulxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fbHVuYXJNb250aFRhYmxlID0gW1wi5q2jXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCIsIFwi5Y2BXCIsIFwi5YasXCIsIFwi6IWKXCJdXHJcblxyXG4gIH1cclxuICAvKipcclxuICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOS4gOaVtOW5tOeahOaAu+WkqeaVsFxyXG4gICAgKi9cclxuICBfbHVuYXJZZWFyRGF5cyh5ZWFyKSB7XHJcbiAgICB2YXIgaSwgc3VtID0gMzQ4O1xyXG4gICAgZm9yIChpID0gMHg4MDAwOyBpID4gMHg4OyBpID4+PSAxKSB7IHN1bSArPSAodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgaSkgPyAxIDogMDsgfVxyXG4gICAgcmV0dXJuIChzdW0gKyB0aGlzLl9sZWFwRGF5c0luTHVuYXJZZWFyKHllYXIpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm05a+55bqU55qE6Zew5pyIXHJcbiAgICAqL1xyXG4gIF9sZWFwTW9udGhJbkx1bmFyWWVhcih5ZWFyKSB7XHJcbiAgICByZXR1cm4gKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmIDB4MDAwMGYpO1xyXG4gIH1cclxuICAvKipcclxuICAgICog6L+U5Zue5Yac5Y6GeeW5tOmXsOaciOeahOWkqeaVsCDoi6Xor6XlubTmsqHmnInpl7DmnIjliJnov5Tlm54wXHJcbiAgICAqL1xyXG4gIF9sZWFwRGF5c0luTHVuYXJZZWFyKHllYXIpIHtcclxuICAgIGlmICh0aGlzLl9sZWFwTW9udGhJbkx1bmFyWWVhcih5ZWFyKSkge1xyXG4gICAgICByZXR1cm4gKCh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiAweDEwMDAwKSA/IDMwIDogMjkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICgwKTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tG1vbnRo5pyI77yI6Z2e6Zew5pyI77yJ55qE5oC75aSp5pWw77yMXHJcbiAgICAqL1xyXG4gIF9tb250aERheXMoeWVhciwgbW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkgeyByZXR1cm4gLTEgfS8v5pyI5Lu95Y+C5pWw5LuOMeiHszEy77yM5Y+C5pWw6ZSZ6K+v6L+U5ZueLTFcclxuXHJcbiAgICBjb25zb2xlLmxvZyhcIl9tb250aERheXM6XCIgKyAodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgKDB4MTAwMDAgPj4gbW9udGgpKSlcclxuXHJcbiAgICByZXR1cm4gKCh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiAoMHgxMDAwMCA+PiBtb250aCkpID8gMzAgOiAyOSk7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhazljoZ5ZWFy5bm0bW9udGjmnIjnmoTlpKnmlbBcclxuICAgICovXHJcbiAgX2dldERheXNJbk1vbnRoKHllYXIsIG1vbnRoKSB7XHJcbiAgICBpZiAobW9udGggPiAxMiB8fCBtb250aCA8IDEpIHsgcmV0dXJuIC0xIH0gLy/oi6Xlj4LmlbDplJnor68g6L+U5ZueLTFcclxuICAgIGxldCBtcyA9IG1vbnRoIC0gMTtcclxuICAgIGlmIChtcyA9PSAxKSB7IC8vMuaciOS7veeahOmXsOW5s+inhOW+i+a1i+eul+WQjuehruiupOi/lOWbnjI45oiWMjlcclxuICAgICAgcmV0dXJuICgoKHllYXIgJSA0ID09IDApICYmICh5ZWFyICUgMTAwICE9IDApIHx8ICh5ZWFyICUgNDAwID09IDApKSA/IDI5IDogMjgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICh0aGlzLl9kYXlJbk1vbnRoW21zXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlhpzljoblubTku73ovazmjaLkuLrlubLmlK/nuqrlubRcclxuICAgICAg5bmy5pSv57qq5bm05rOVXHJcbuOAgOOAgCAgICAg5aSp5bmy5Zyw5pSv6KGoXHJcbuOAgOOAgCAgIDAxLueUsuWtkCAwMi7kuZnkuJEgMDMu5LiZ5a+FIDA0LuS4geWNryAwNS7miIrovrAgMDYu5bex5bezIDA3LuW6muWNiCAwOC7ovpvmnKogMDku5aOs55SzIDEwLueZuOmFiVxyXG7jgIAgICDjgIAgICAxMS7nlLLmiIwgMTIu5LmZ5LqlIDEzLuS4meWtkCAxNC7kuIHkuJEgMTUu5oiK5a+FIDE2LuW3seWNryAxNy7luprovrAgMTgu6L6b5bezIDE5LuWjrOWNiCAyMC7nmbjmnKpcclxu44CAICAg44CAICAgMjEu55Sy55SzIDIyLuS5memFiSAyMy7kuJnmiIwgMjQu5LiB5LqlIDI1LuaIiuWtkCAyNi7lt7HkuJEgMjcu5bqa5a+FIDI4Lui+m+WNryAyOS7lo6zovrAgMzAu55m45bezXHJcbuOAgCAg44CAICAgIDMxLueUsuWNiCAzMi7kuZnmnKogMzMu5LiZ55SzIDM0LuS4gemFiSAzNS7miIrmiIwgMzYu5bex5LqlIDM3LuW6muWtkCAzOC7ovpvkuJEgMzku5Lu75a+FIDQwLueZuOWNr1xyXG7jgIAgICDjgIAgICA0MS7nlLLovrAgNDIu5LmZ5bezIDQzLuS4meWNiCA0NC7kuIHmnKogNDUu5oiK55SzIDQ2LuW3semFiSA0Ny7luprmiIwgNDgu6L6b5LqlIDQ5LuWjrOWtkCA1MC7nmbjkuJFcclxu44CA44CAICAgICAgNTEu55Sy5a+FIDUyLuS5meWNryA1My7kuJnovrAgNTQu5LiB5bexIDU1LuaIiuWNiCA1Ni7lt7HmnKogNTcu5bqa55SzIDU4Lui+m+mFiSA1OS7lo6zmiIwgNjAu55m45LqlXHJcbiAgICAg55So6Ziz5Y6G55qE5bm05Lu96Zmk5LulNjDlvpfliLDnmoTlubTku73lho3lh4/ljrsz5bCx5piv6L+Z5LiA5bm05Yac5Y6G55qE5bmy5pSv5bqP5Y+35pWw77yM5p+l5bmy5pSv6KGo5b6X5Yiw5bmy5pSv5bm057qq77yMXHJcbiAgICAg6Iul5b6X5Ye65p2l55qE5pWw5o2u5bCP5LqO6Zu25oiW6ICF562J5LqO6Zu25YiZ5Yqg5LiKNjDljbPlj6/jgIJcclxuICAgICDkuL7kuKrkvovlrZDvvJrmsYIyMDE55bm05bmy5pSv77yMMjAxOcO3NjDvvJ0zM+S9mTM577yM5bm05bmy5pSv5bqP5Y+35pWwPTM5LTM9MzbvvIxcclxuICAgICDmiYDku6Xlvpfnn6Xku4rlubTmmK/lt7HkuqXlubTjgILlubLmlK/nuqrlubTpg73mmK/ku47mr4/lubTnmoTnq4vmmKXlvIDlp4vnmoTvvIzkuI3nrqHnq4vmmKXlnKjliY3kuIDlubTnmoTohYrmnIjov5jmmK/mlrDkuIDlubTnmoTmraPmnIjvvIznq4vmmKXlvIDlp4vmiY3nrpfmlrDnmoTkuIDlubTjgIJcclxuICAgKi9cclxuICBfZ2V0R2FuWmhpWWVhcih5ZWFyKSB7XHJcbiAgICB2YXIgZ2FuS2V5ID0gKHllYXIgLSAzKSAlIDEwO1xyXG4gICAgdmFyIHpoaUtleSA9ICh5ZWFyIC0gMykgJSAxMjtcclxuICAgIGlmIChnYW5LZXkgPT0gMCkgZ2FuS2V5ID0gMTA7Ly/lpoLmnpzkvZnmlbDkuLow5YiZ5Li65pyA5ZCO5LiA5Liq5aSp5bmyXHJcbiAgICBpZiAoemhpS2V5ID09IDApIHpoaUtleSA9IDEyOy8v5aaC5p6c5L2Z5pWw5Li6MOWImeS4uuacgOWQjuS4gOS4quWcsOaUr1xyXG4gICAgcmV0dXJuIHRoaXMuX1RpYW5HYW5bZ2FuS2V5IC0gMV0gKyB0aGlzLl9EaVpoaVt6aGlLZXkgLSAxXTtcclxuXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlhazljobmnIjjgIHml6XliKTmlq3miYDlsZ7mmJ/luqdcclxuICAgKi9cclxuICBfZ2V0QXN0cm9sb2d5KGNNb250aCwgY0RheSkge1xyXG4gICAgdmFyIGFyciA9IFsyMCwgMTksIDIxLCAyMSwgMjEsIDIyLCAyMywgMjMsIDIzLCAyMywgMjIsIDIyXTtcclxuICAgIHJldHVybiB0aGlzLl9hc3Ryb2xvZ3lbY01vbnRoIC0gKGNEYXkgPCBhcnJbY01vbnRoIC0gMV0gPyAxIDogMCldICsgXCLluqdcIjsvL+W6p1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIFxyXG4gICAg5aSp5bmy5LiA5YWx5pyJ5Y2B5Liq77yM5YiG5Yir5pyJ55Sy44CB5LmZ44CB5LiZ44CB5LiB44CB5oiK44CB5bex44CB5bqa44CB6L6b44CB5aOs44CB55m444CC5Zyw5pSv5LiA5YWx5pyJ5Y2B5LqM5Liq77yM5YiG5Yir5pyJ5a2Q44CB5LiR44CB5a+F44CB5Y2v44CB6L6w44CB5bez44CB5Y2I44CB5pyq44CB55Sz44CB6YWJ44CB5oiM44CB5Lql44CC5bmy5pSv6L+Y5pyJ6Zi06Ziz5LmL5YiG77yM55Sy44CB5LiZ44CB5oiK44CB5bqa44CB5aOs5Li66Ziz5bmy77yM5LmZ44CB5LiB44CB5bex44CB6L6b44CB55m45Li66Zi05bmy44CC5a2Q44CB5a+F44CB6L6w44CB5Y2I44CB55Sz44CB5oiM5Li66Ziz5pSv77yM5LiR44CB5Y2v44CB5bez44CB5pyq44CB6YWJ44CB5Lql5Li66Zi05pSv77yM5LiA5Liq5aSp5bmy5ZKM5LiA5Liq5Zyw5pSv55u46YWN77yM5o6S5YiX6LW35p2l77yM5aSp5bmy5Zyo5YmN77yM5Zyw5pSv5Zyo5ZCO77yM5aSp5bmy55Sx55Sy6LW377yM5Zyw5pSv55Sx5a2Q6LW377yM6Ziz5bmy6YWN6Ziz5pSv77yM6Zi05bmy6YWN6Zi05pSv77yM5YWx5pyJ5YWt5Y2B5Liq57uE5ZCI44CC5Y+k5Lq65bCx55So6L+ZNjDkuKrnu4TlkIjlvqrnjq/otbfmnaXnuqrlubTvvIznuqrmnIjvvIznuqrml6XvvIznuqrml7bjgIJcclxuXHJcbiAgICDnuqrlubTvvIzkuK3lm73lj6TkurrnlKg2MOS4que7hOWQiOS+neasoee6quW5tO+8jOS4gOW5tOS4gOS4que7hOWQiO+8jO+8jOW5suaUr+e6quW5tO+8jOS4gOS4quWRqOacn+eahOesrOS4gOW5tOS4uueUsuWtkO+8jOesrOS6jOW5tOS4uuS5meS4ke+8jOS+neasoeexu+aOqO+8jDYw5bm05LiA5Liq6L2u5Zue77yM5q+P5LiA5Liq5paw5bm05byA5aeL5LqO5q2j5pyI5Yid5LiA55qE5q2j5a2Q5pe244CCXHJcblxyXG4gICAg57qq5pyI77yM5bmy5pSv57qq5pyI77yM6YeH55So5q+P5Liq5Zyw5pSv5a+55bqUMjToioLmsJToh6rmn5DoioLmsJToh7PkuIvkuIDkuKroioLmsJTvvIzku6XkuqTnu5Pml7bpl7TlhrPlrprotbflp4vnmoTkuIDkuKrmnIjmnJ/pl7TjgILlubLmlK/nuqrmnIjmmK/lubLmlK/ljobnmoTkuIDpg6jliIbvvIzkuLvopoHnlKjkuo7po47msLTmnK/mnK/nrYnpoobln5/vvIzov5nkvb/lvpflubLmlK/ljobkuIDnm7TlnKjlrpjmlrnlkozmsJHpl7Tpg73mtYHkvKDkuI3oobDjgIJcclxuXHJcbiAgICDnuqrml6XvvIznuqrml6XmmK/lubLmlK/nmoTmnIDml6nnlKjms5XvvIzkuIDkuKrmmLzlpJzmmK/kuIDlpKnvvIznlKg2MOS4que7hOWQiOadpeS+neasoee6quaXpe+8jOavlOWmguS7iuWkqeaYr+eUsuWtkOaXpe+8jOaYjuWkqeWwseaYr+S5meS4keaXpe+8jDYw5aSp5LiA5Liq5b6q546v77yM5paw55qE5LiA5aSp5LuO5q2j5a2Q5Y2I5byA5aeL77yM5Lit5Zu95piO56Gu5Y+v5p+l55qE5bmy5pSv57qq5pel77yM5piv5pil56eL6bKB6ZqQ5YWs5LiJ5bm077yI5YWs5YWD5YmNNzIw5bm077yJ77yM6Led5LuK5bey57uP5pyJMjcwMOWkmuW5tOS6hu+8jOi/meaYr+i/hOS7iuS4uuatouaYr+S4lueVjOS4iuacgOaXqeeahOiusOaXpeazleOAglxyXG4gICAgICAgIFxyXG4gICAgXHJcbiAgICDkvKDlhaVvZmZzZXTlgY/np7vph4/ov5Tlm57lubLmlK8gXHJcbiAgICAqL1xyXG4gIF9nZXRHYW5aaGkob2Zmc2V0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5fVGlhbkdhbltvZmZzZXQgJSAxMF0gKyB0aGlzLl9EaVpoaVtvZmZzZXQgJSAxMl07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgIOWFrOWOhnllYXLlubTojrflvpfor6XlubTnrKxpbmRleOS4quiKguawlOeahOWFrOWOhuaXpeacn1xyXG4gICAgKi9cclxuICBfZ2V0Q2FsZW5kYXJpY2l0eSh5ZWFyLCBpbmRleCkge1xyXG4gICAgaWYgKHllYXIgPCAxOTAwIHx8IHllYXIgPiAyMTAwKSB7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIGlmIChpbmRleCA8IDEgfHwgaW5kZXggPiAyNCkge1xyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICB2YXIgX3RhYmxlID0gdGhpcy5fY2FsZW5kYXJpY2l0eVRhYmxlW3llYXIgLSAxOTAwXTtcclxuICAgIHZhciBfY2FsZW5kYXJpY2l0eUluZm8gPSBbXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDAsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cig1LCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMTAsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxNSwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDIwLCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMjUsIDUpKS50b1N0cmluZygpXHJcbiAgICBdO1xyXG5cclxuICAgIHZhciBfY2FsZGF5ID0gW1xyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMF0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMF0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMF0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMF0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzFdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzFdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzFdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzFdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1syXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1syXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1syXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1syXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bM10uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bM10uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bM10uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bM10uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzRdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzRdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzRdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzRdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s1XS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s1XS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s1XS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s1XS5zdWJzdHIoNCwgMiksXHJcbiAgICBdO1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KF9jYWxkYXlbaW5kZXggLSAxXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog5Yac5Y6G5rGJ6K+t6KGo56S6XHJcbiAgICAqL1xyXG4gIF9nZXRDaGluYU1vbnRoKG1vbnRoKSB7XHJcbiAgICBpZiAobW9udGggPiAxMiB8fCBtb250aCA8IDEpIHtcclxuICAgICAgcmV0dXJuIC0xXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYCR7dGhpcy5fbHVuYXJNb250aFRhYmxlW21vbnRoIC0gMV195pyIYDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKuWGnOWOhuaXpeacn+aXpeihqOekulxyXG4gICAgKi9cclxuICBfZ2V0Q2hpbmFEYXkoZGF5KSB7XHJcbiAgICBsZXQgcztcclxuICAgIHN3aXRjaCAoZGF5KSB7XHJcbiAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgcyA9ICfliJ3ljYEnOyBicmVhaztcclxuICAgICAgY2FzZSAyMDpcclxuICAgICAgICBzID0gJ+S6jOWNgSc7IGJyZWFrO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDMwOlxyXG4gICAgICAgIHMgPSAn5LiJ5Y2BJzsgYnJlYWs7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcyA9IHRoaXMuX2NoaW5lc2VUZW5DaGFyW01hdGguZmxvb3IoZGF5IC8gMTApXTtcclxuICAgICAgICBzICs9IHRoaXMuX2NoaW5lc2VDaGFyW2RheSAlIDEwXTtcclxuICAgIH1cclxuICAgIHJldHVybiAocyk7XHJcbiAgfVxyXG4gIC8qXHJcbiAg6L+U5Zue5Yac5Y6G6IqC5pelXHJcbiAgKi9cclxuICBfZ2V0THVuYXJIb2xpZGF5KG1vbnRoLCBkYXkpIHtcclxuICAgIGxldCBsdW5hckhvbGlkYXlTdHIgPSBcIlwiXHJcbiAgICB0aGlzLl9sdW5hckhvbGlkYXkuZm9yRWFjaChsdW5hciA9PiB7XHJcbiAgICAgIGxldCBsZCA9IGx1bmFyLnNwbGl0KFwiIFwiKVswXTtcclxuICAgICAgbGV0IGxkdiA9IGx1bmFyLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgICAgbGV0IGxtb250aF92ID0gbW9udGggKyBcIlwiO1xyXG4gICAgICBsZXQgbGRheV92ID0gZGF5ICsgXCJcIjtcclxuICAgICAgbGV0IGxtZCA9IFwiXCI7XHJcbiAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICAgICAgbG1vbnRoX3YgPSBcIjBcIiArIG1vbnRoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4gICAgICAgIGxkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4gICAgICB9XHJcbiAgICAgIGxtZCA9IGxtb250aF92ICsgbGRheV92O1xyXG4gICAgICBjb25zb2xlLmxvZyhcImxtZDpcIiArIGxtZClcclxuICAgICAgaWYgKGxkLnRyaW0oKSA9PT0gbG1kLnRyaW0oKSkge1xyXG4gICAgICAgIGx1bmFySG9saWRheVN0ciA9IGxkdlxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGx1bmFySG9saWRheVN0clxyXG4gIH1cclxuICAvKipcclxuICog6L+U5Zue5a+55bqU5pel5pyf55qE5YWs5Y6G6IqC5pelXHJcbiAqL1xyXG4gIF9nZXRTb2xhckhvbGlkYXkobW9udGgsIGRheSkge1xyXG4gICAgbGV0IHNvbGFySG9saWRheVN0ciA9IFwiXCI7XHJcbiAgICB0aGlzLl9zb2xhckhvbGlkYXkuZm9yRWFjaChzb2xhciA9PiB7XHJcblxyXG4gICAgICBsZXQgc2QgPSBzb2xhci5zcGxpdChcIiBcIilbMF07XHJcbiAgICAgIGxldCBzZHYgPSBzb2xhci5zcGxpdChcIiBcIilbMV07XHJcbiAgICAgIGxldCBzbW9udGhfdiA9IG1vbnRoICsgXCJcIjtcclxuICAgICAgbGV0IHNkYXlfdiA9IGRheSArIFwiXCI7XHJcbiAgICAgIGxldCBzbWQgPSBcIlwiO1xyXG4gICAgICBpZiAobW9udGggPCAxMCkge1xyXG4gICAgICAgIHNtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF5IDwgMTApIHtcclxuICAgICAgICBzZGF5X3YgPSBcIjBcIiArIGRheTtcclxuICAgICAgfVxyXG4gICAgICBzbWQgPSBzbW9udGhfdiArIHNkYXlfdjtcclxuICAgICAgaWYgKHNkLnRyaW0oKSA9PT0gc21kLnRyaW0oKSkge1xyXG4gICAgICAgIHNvbGFySG9saWRheVN0ciA9IHNkdjtcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBzb2xhckhvbGlkYXlTdHJcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgIOiOt+WPluWvueW6lOW5tOS7veeahOeUn+iCllxyXG4gICAgKi9cclxuICBfZ2V0Wm9kaWFjKHllYXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9ab2RpYWNbKHllYXIgLSA0KSAlIDEyXVxyXG4gIH1cclxuICAvKlxyXG4gICog6I635Y+W5pel5pyf5piv5ZCm5Li6MjToioLmsJRcclxuICAgIOmmluWFiOiOt+WPluiKguawlOS4uuW9k+aciOeahOesrOWHoOWkqe+8jOS4juW9k+WJjeWMuemFjeeahO+8jOi/lOWbnuWvueW6lOeahOiKguawlFxyXG4gICovXHJcbiAgX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eShmaXJzdENhbGVuZGFyaWNpdHlEYXksIHNlY29uZENhbGVuZGFyaWNpdHlEYXksIG5vd1NlbGVjdERheSwgbm93U2VsZWN0TW9udGgpIHtcclxuICAgIC8v5Lyg5YWl55qE5pel5pyf55qE6IqC5rCU5LiO5ZCmXHJcblxyXG4gICAgbGV0IGNhbGVuZGFyaWNpdHlTdHIgPSBcIlwiO1xyXG4gICAgaWYgKGZpcnN0Q2FsZW5kYXJpY2l0eURheSA9PSBub3dTZWxlY3REYXkpIHtcclxuXHJcbiAgICAgIGNhbGVuZGFyaWNpdHlTdHIgPSB0aGlzLl9jYWxlbmRhcmljaXR5W25vd1NlbGVjdE1vbnRoICogMiAtIDJdO1xyXG4gICAgfVxyXG4gICAgaWYgKHNlY29uZENhbGVuZGFyaWNpdHlEYXkgPT0gbm93U2VsZWN0RGF5KSB7XHJcblxyXG4gICAgICBjYWxlbmRhcmljaXR5U3RyID0gdGhpcy5fY2FsZW5kYXJpY2l0eVtub3dTZWxlY3RNb250aCAqIDIgLSAxXTtcclxuICAgIH1cclxuICAgIHJldHVybiBjYWxlbmRhcmljaXR5U3RyXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog5Lyg5YWl6Ziz5Y6G5bm05pyI5pel6I635b6X6K+m57uG55qE5YWs5Y6G44CB5Yac5Y6Gb2JqZWN05L+h5oGvIDw9PkpTT05cclxuICAgICogQHBhcmFtIHNvbGFyWWVhciAgc29sYXIgeWVhclxyXG4gICAgKiBAcGFyYW0gc29sYXJNb250aCAgc29sYXIgbW9udGhcclxuICAgICogQHBhcmFtIHNvbGFyRGF5ICBzb2xhciBkYXlcclxuICAgICogQHJldHVybiBKU09OIG9iamVjdFxyXG4gICAgKi9cclxuICBnZXRMdW5hcihzb2xhclllYXIsIHNvbGFyTW9udGgsIHNvbGFyRGF5KSB7IC8v5Y+C5pWw5Yy66Ze0MTkwMC4xLjMxfjIxMDAuMTIuMzFcclxuICAgIGlmIChzb2xhclllYXIgPCAxOTAwIHx8IHNvbGFyWWVhciA+IDIxMDApIHsgcmV0dXJuIC0xOyB9Ly/lubTku73pmZDlrprjgIHkuIrpmZBcclxuICAgIGlmIChzb2xhclllYXIgPT0gMTkwMCAmJiBzb2xhck1vbnRoID09IDEgJiYgc29sYXJEYXkgPCAzMSkgeyByZXR1cm4gLTE7IH0vL+S4i+mZkFxyXG4gICAgaWYgKCFzb2xhclllYXIpIHsgLy/mnKrkvKDlj4IgIOiOt+W+l+W9k+WkqVxyXG4gICAgICB2YXIgbm93U2VsZWN0RGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2YXIgbm93U2VsZWN0RGF0ZSA9IG5ldyBEYXRlKHNvbGFyWWVhciwgcGFyc2VJbnQoc29sYXJNb250aCkgLSAxLCBzb2xhckRheSlcclxuICAgIH1cclxuICAgIHZhciBub3dTZWxlY3RZZWFyID0gbm93U2VsZWN0RGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgdmFyIG5vd1NlbGVjdE1vbnRoID0gbm93U2VsZWN0RGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgIHZhciBub3dTZWxlY3REYXkgPSBub3dTZWxlY3REYXRlLmdldERhdGUoKTtcclxuICAgIHZhciBvZmZzZXQgPSAoRGF0ZS5VVEMobm93U2VsZWN0RGF0ZS5nZXRGdWxsWWVhcigpLCBub3dTZWxlY3REYXRlLmdldE1vbnRoKCksIG5vd1NlbGVjdERhdGUuZ2V0RGF0ZSgpKSAtIERhdGUuVVRDKDE5MDAsIDAsIDMxKSkgLyA4NjQwMDAwMDtcclxuICAgIC8vb2Zmc2V05b2T5YmN5pel5pyf5LiOMTk5MC4xLjMx55u45beu5pel5pyf44CCMTk5MC4xLjMxLuW8gOWni+esrOS4gOS4quWGnOWOhuWRqOacn+W8gOWni1xyXG4gICAgdmFyIHRlbXBZZWFyLCBsZWFwID0gMCwgdGVtcCA9IDA7XHJcbiAgICAvL3RlbXBZZWFyIOW9k+WJjeW5tOS7veiHszE5OTDlubTkvp3mrKHlh4/ljrvkuK3pl7TmiYDmnInnmoTlhpzljoblubTnmoTlpKnmlbDvvIzkvZnkuItvZmZzZXTkuLrlvZPliY3lhpzljoblubTnrKzlpJrlsJHlpKlcclxuICAgIGZvciAodGVtcFllYXIgPSAxOTAwOyB0ZW1wWWVhciA8IDIxMDEgJiYgb2Zmc2V0ID4gMDsgdGVtcFllYXIrKykge1xyXG4gICAgICB0ZW1wID0gdGhpcy5fbHVuYXJZZWFyRGF5cyh0ZW1wWWVhcik7Ly/orqHnrpflvZPliY3lhpzljoblubTnmoTmgLvlpKnmlbBcclxuICAgICAgb2Zmc2V0IC09IHRlbXA7XHJcbiAgICAgIC8vb2Zmc2V05L6d5qyh5YeP5Y675omA5pyJ5Yac5Y6G5bm055qE5oC75aSp5pWw5ZCOXHJcbiAgICAgIC8vdGVtcFllYXLkuLrlvZPliY3nmoTnmoTlhpzljoblubTku71cclxuICAgIH1cclxuXHJcbiAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4gICAgICAvL29mZnNldOWwj+S6jjDml7blgJnkv67mraNcclxuICAgICAgb2Zmc2V0ICs9IHRlbXA7XHJcbiAgICAgIHRlbXBZZWFyLS07XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHZhciBpc1RvZGF5T2JqID0gbmV3IERhdGUoKTsvL+iOt+WPluW9k+WJjeaXpeacn1xyXG4gICAgdmFyIGlzVG9kYXkgPSBmYWxzZTtcclxuICAgIGlmIChpc1RvZGF5T2JqLmdldEZ1bGxZZWFyKCkgPT0gbm93U2VsZWN0WWVhciAmJiBpc1RvZGF5T2JqLmdldE1vbnRoKCkgKyAxID09IG5vd1NlbGVjdE1vbnRoICYmIGlzVG9kYXlPYmouZ2V0RGF0ZSgpID09IG5vd1NlbGVjdERheSkge1xyXG4gICAgICBpc1RvZGF5ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8v5pif5pyf5YegXHJcbiAgICBsZXQgbldlZWsgPSBub3dTZWxlY3REYXRlLmdldERheSgpO1xyXG4gICAgbGV0IGNXZWVrID0gdGhpcy5fY2hpbmVzZUNoYXJbbldlZWtdO1xyXG4gICAgaWYgKG5XZWVrID09IDApIHtcclxuICAgICAgbldlZWsgPSA3O1xyXG4gICAgfS8v5pWw5a2X6KGo56S65ZGo5Yeg6aG65bqU5aSp5pyd5ZGo5LiA5byA5aeL55qE5oOv5L6LXHJcbiAgICAvL+WGnOWOhuW5tFxyXG4gICAgdmFyIHllYXIgPSB0ZW1wWWVhcjtcclxuXHJcbiAgICB2YXIgbGVhcCA9IHRoaXMuX2xlYXBNb250aEluTHVuYXJZZWFyKHRlbXBZZWFyKTsgLy/pl7Dlk6rkuKrmnIhcclxuICAgIHZhciBpc0xlYXAgPSBmYWxzZTtcclxuXHJcbiAgICAvL+aViOmqjOmXsOaciFxyXG4gICAgdmFyIHRlbXBNb250aDtcclxuICAgIGZvciAodGVtcE1vbnRoID0gMTsgdGVtcE1vbnRoIDwgMTMgJiYgb2Zmc2V0ID4gMDsgdGVtcE1vbnRoKyspIHtcclxuXHJcbiAgICAgIGlmIChsZWFwID4gMCAmJiB0ZW1wTW9udGggPT0gKGxlYXAgKyAxKSAmJiBpc0xlYXAgPT0gZmFsc2UpIHtcclxuICAgICAgICAvL+mXsOaciFxyXG4gICAgICAgIC0tdGVtcE1vbnRoO1xyXG4gICAgICAgIGlzTGVhcCA9IHRydWU7XHJcbiAgICAgICAgdGVtcCA9IHRoaXMuX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcik7IC8v6K6h566X5Yac5Y6G6Zew5pyI5aSp5pWwXHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgLy/pnZ7pl7DmnIhcclxuICAgICAgICB0ZW1wID0gdGhpcy5fbW9udGhEYXlzKHllYXIsIHRlbXBNb250aCk7Ly/orqHnrpflhpzljobmma7pgJrmnIjlpKnmlbBcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzTGVhcCA9PSB0cnVlICYmIHRlbXBNb250aCA9PSAobGVhcCArIDEpKSB7XHJcbiAgICAgICAgLy/lpoLmnpzpl7DmnIjljrvmjonpl7DmnIjmoIforrBcclxuICAgICAgICBpc0xlYXAgPSBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgICBvZmZzZXQgLT0gdGVtcDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob2Zmc2V0ID09IDAgJiYgbGVhcCA+IDAgJiYgdGVtcE1vbnRoID09IGxlYXAgKyAxKVxyXG4gICAgICBpZiAoaXNMZWFwKSB7XHJcbiAgICAgICAgaXNMZWFwID0gZmFsc2U7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXNMZWFwID0gdHJ1ZTsgLS10ZW1wTW9udGg7XHJcbiAgICAgIH1cclxuICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgIG9mZnNldCArPSB0ZW1wO1xyXG4gICAgICAtLXRlbXBNb250aDtcclxuICAgIH1cclxuICAgIC8v5Yac5Y6G5pyIXHJcbiAgICBjb25zdCBtb250aCA9IHRlbXBNb250aDtcclxuICAgIC8v5Yac5Y6G5pelXHJcbiAgICBjb25zdCBkYXkgPSBvZmZzZXQgKyAxO1xyXG5cclxuICAgIC8v5aSp5bmy5Zyw5pSv5aSE55CGXHJcbiAgICB2YXIgc20gPSBub3dTZWxlY3RNb250aCAtIDE7XHJcbiAgICB2YXIgZ2FuWmhpWWVhciA9IHRoaXMuX2dldEdhblpoaVllYXIoeWVhcik7XHJcblxyXG4gICAgLy/mnIjmn7HmjqjnrpfooahcclxuICAgIC8vMTkwMOW5tDHmnIjlsI/lr5Lku6XliY3kuLog5LiZ5a2Q5pyIKDYw6L+b5Yi2MTIpXHJcbiAgICB2YXIgX2ZpcnN0Q2FsZW5kYXJpY2l0eURheSA9IHRoaXMuX2dldENhbGVuZGFyaWNpdHkobm93U2VsZWN0WWVhciwgKG5vd1NlbGVjdE1vbnRoICogMiAtIDEpKTsvL+i/lOWbnuW9k+aciOOAjOiKguOAjeS4uuWHoOaXpeW8gOWni1xyXG4gICAgdmFyIF9zZWNvbmRDYWxlbmRhcmljaXR5RGF5ID0gdGhpcy5fZ2V0Q2FsZW5kYXJpY2l0eShub3dTZWxlY3RZZWFyLCAobm93U2VsZWN0TW9udGggKiAyKSk7Ly/ov5Tlm57lvZPmnIjjgIzoioLjgI3kuLrlh6Dml6XlvIDlp4tcclxuICAgIGNvbnNvbGUubG9nKFwiX2ZpcnN0Q2FsZW5kYXJpY2l0eURheTpcIiArIF9maXJzdENhbGVuZGFyaWNpdHlEYXkgKyBcIixfc2Vjb25kQ2FsZW5kYXJpY2l0eURheTpcIiArIF9zZWNvbmRDYWxlbmRhcmljaXR5RGF5KVxyXG4gICAgLy/kvp3mja4xMuiKguawlOS/ruato+W5suaUr+aciFxyXG4gICAgbGV0IGdhblpoaU1vbnRoID0gdGhpcy5fZ2V0R2FuWmhpKChub3dTZWxlY3RZZWFyIC0gMTkwMCkgKiAxMiArIG5vd1NlbGVjdE1vbnRoICsgMTEpO1xyXG4gICAgaWYgKG5vd1NlbGVjdERheSA+PSBfZmlyc3RDYWxlbmRhcmljaXR5RGF5KSB7XHJcbiAgICAgIGdhblpoaU1vbnRoID0gdGhpcy5fZ2V0R2FuWmhpKChub3dTZWxlY3RZZWFyIC0gMTkwMCkgKiAxMiArIG5vd1NlbGVjdE1vbnRoICsgMTIpO1xyXG4gICAgfVxyXG4gICAgbGV0IGNhbGVuZGFyaWNpdHkgPSB0aGlzLl9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkoX2ZpcnN0Q2FsZW5kYXJpY2l0eURheSwgX3NlY29uZENhbGVuZGFyaWNpdHlEYXksIG5vd1NlbGVjdERheSwgbm93U2VsZWN0TW9udGgpXHJcblxyXG4gICAgLy/ml6Xmn7Hmjqjnrpfooagg5b2T5pyI5LiA5pel5LiOIDE5MDAvMS8xIOebuOW3ruWkqeaVsFxyXG4gICAgY29uc3QgZGF5Q3ljbGljYWwgPSBEYXRlLlVUQyhub3dTZWxlY3RZZWFyLCBzbSwgMSwgMCwgMCwgMCwgMCkgLyA4NjQwMDAwMCArIDI1NTY3ICsgMTA7XHJcbiAgICBjb25zdCBnYW5aaGlEYXkgPSB0aGlzLl9nZXRHYW5aaGkoZGF5Q3ljbGljYWwgKyBub3dTZWxlY3REYXkgLSAxKTtcclxuICAgIC8v6K+l5pel5pyf5omA5bGe55qE5pif5bqnXHJcbiAgICBjb25zdCBhc3RybyA9IHRoaXMuX2dldEFzdHJvbG9neShub3dTZWxlY3RNb250aCwgbm93U2VsZWN0RGF5KTtcclxuXHJcbiAgICBjb25zdCB6b2RpYWMgPSB0aGlzLl9nZXRab2RpYWMoeWVhcilcclxuICAgIGNvbnN0IGNoaW5hTW9udGggPSB0aGlzLl9nZXRDaGluYU1vbnRoKG1vbnRoKVxyXG4gICAgY29uc3QgY2hpbmFEYXkgPSB0aGlzLl9nZXRDaGluYURheShkYXkpXHJcbiAgICBjb25zdCBsdW5hckhvbGlkYXkgPSB0aGlzLl9nZXRMdW5hckhvbGlkYXkobW9udGgsIGRheSlcclxuICAgIGNvbnN0IHNvbGFySG9saWRheSA9IHRoaXMuX2dldFNvbGFySG9saWRheShub3dTZWxlY3RNb250aCwgbm93U2VsZWN0RGF5KVxyXG4gICAgcmV0dXJuIHsgJ2x1bmFyWWVhcic6IHllYXIsICdsdW5hck1vbnRoJzogbW9udGgsICdsdW5hckRheSc6IGRheSwgJ3pvZGlhYyc6IHpvZGlhYywgJ2NoaW5hTW9udGgnOiAoaXNMZWFwID8gXCLpl7BcIiA6ICcnKSArIGNoaW5hTW9udGgsICdjaGluYURheSc6IGNoaW5hRGF5LCAnc29sYXJZZWFyJzogbm93U2VsZWN0WWVhciwgJ3NvbGFyTW9udGgnOiBub3dTZWxlY3RNb250aCwgJ3NvbGFyRGF5Jzogbm93U2VsZWN0RGF5LCAnZ2FuWmhpWWVhcic6IGdhblpoaVllYXIsICdnYW5aaGlNb250aCc6IGdhblpoaU1vbnRoLCAnZ2FuWmhpRGF5JzogZ2FuWmhpRGF5LCAnaXNUb2RheSc6IGlzVG9kYXksICdpc0xlYXAnOiBpc0xlYXAsICduV2Vlayc6IG5XZWVrLCAnbmNXZWVrJzogXCLmmJ/mnJ9cIiArIGNXZWVrLCAnY2FsZW5kYXJpY2l0eSc6IGNhbGVuZGFyaWNpdHksICdhc3Rybyc6IGFzdHJvLCBcImx1bmFySG9saWRheVwiOiBsdW5hckhvbGlkYXksIFwic29sYXJIb2xpZGF5XCI6IHNvbGFySG9saWRheSB9O1xyXG4gIH1cclxufVxyXG5sZXQgbHVuYXJDYWxlbmRhciA9IG5ldyBMdW5hckNhbGVuZGFyKClcclxuZXhwb3J0IGRlZmF1bHQgbHVuYXJDYWxlbmRhclxyXG5cclxuXHJcblxyXG4vLyoqKioqKioqKioqKioqKirliIblibLnur9qYXZh54mI5pysKioqKioqKioqKioqKioqICovXHJcbi8vIGltcG9ydCBqYXZhLnRleHQuUGFyc2VFeGNlcHRpb247XHJcbi8vIGltcG9ydCBqYXZhLnRleHQuU2ltcGxlRGF0ZUZvcm1hdDtcclxuLy8gaW1wb3J0IGphdmEudXRpbC5EYXRlO1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkxvY2FsZTtcclxuLy8gaW1wb3J0IGphdmEudXRpbC5DYWxlbmRhcjtcclxuXHJcbi8vIGNsYXNzIEx1bmFyQ2FsZW5kYXIge1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgeWVhcjsgLy8g5YWs5Y6G5bm0XHJcbi8vICAgICBwcml2YXRlIGludCBtb250aDsvLyDlhazljobmnIhcclxuLy8gICAgIHByaXZhdGUgaW50IGRheTsvLyDlhazljobml6VcclxuLy8gICAgIHByaXZhdGUgaW50IGx1bmFyWWVhcjsvLyDpmLTljoblubRcclxuLy8gICAgIHByaXZhdGUgaW50IGx1bmFyTW9udGg7Ly8g6Zi05Y6G5pyIXHJcbi8vICAgICBwcml2YXRlIGludCBsdW5hckRheTsvLyDpmLTljobml6VcclxuLy8gICAgIHByaXZhdGUgaW50IGxlYXBNb250aCA9IDA7IC8vIOmYtOWOhumXsOeahOaciFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5c09mTW9udGggPSAwOyAvLyDmn5DmnIjnmoTlpKnmlbBcclxuLy8gICAgIHByaXZhdGUgaW50IGRheU9mV2VlayA9IDA7IC8vIOWFt+S9k+afkOS4gOWkqeaYr+aYn+acn+WHoFxyXG5cclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZyBjaGluZXNlTW9udGhOdW1iZXJbXSA9IHsgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIiwgXCLljYHkuIBcIiwgXCLljYHkuoxcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gWm9kaWFjID0gbmV3IFN0cmluZ1tdIHsgXCLpvKBcIiwgXCLniZtcIiwgXCLomY5cIiwgXCLlhZRcIiwgXCLpvplcIiwgXCLom4dcIiwgXCLpqaxcIiwgXCLnvopcIiwgXCLnjLRcIiwgXCLpuKFcIiwgXCLni5dcIiwgXCLnjKpcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gR2FuID0gbmV3IFN0cmluZ1tdIHsgXCLnlLJcIiwgXCLkuZlcIiwgXCLkuJlcIiwgXCLkuIFcIiwgXCLmiIpcIiwgXCLlt7FcIiwgXCLluppcIiwgXCLovptcIiwgXCLlo6xcIiwgXCLnmbhcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gWmhpID0gbmV3IFN0cmluZ1tdIHsgXCLlrZBcIiwgXCLkuJFcIiwgXCLlr4VcIiwgXCLlja9cIiwgXCLovrBcIiwgXCLlt7NcIiwgXCLljYhcIiwgXCLmnKpcIiwgXCLnlLNcIiwgXCLphYlcIiwgXCLmiIxcIiwgXCLkuqVcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nIGNoaW5lc2VUZW5DaGFyW10gPSB7IFwi5YidXCIsIFwi5Y2BXCIsIFwi5bu/XCIsIFwi5Y2FXCIgfTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZ1tdIGx1bmFySG9saWRheSA9IG5ldyBTdHJpbmdbXSB7IFwiMDEwMSDmmKXoioJcIiwgXCIwMTE1IOWFg+WutVwiLCBcIjA1MDUg56uv5Y2IXCIsIFwiMDcwNyDmg4XkurpcIiwgXCIwNzE1IOS4reWFg1wiLFxyXG4vLyAgICAgICAgICAgICBcIjA4MTUg5Lit56eLXCIsIFwiMDkwOSDph43pmLNcIiwgXCIxMjA4IOiFiuWFq1wiLCBcIjEyMjQg5bCP5bm0XCIsIFwiMDEwMCDpmaTlpJVcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gc29sYXJIb2xpZGF5ID0gbmV3IFN0cmluZ1tdIHsgLy9cclxuLy8gICAgICAgICAgICAgXCIwMTAxIOWFg+aXplwiLCBcIjAyMTQg5oOF5Lq6XCIsIFwiMDMwOCDlpoflpbNcIiwgXCIwMzEyIOakjeagkVwiLCBcIjAzMTUg5raI6LS56ICF5p2D55uK5pelXCIsIFwiMDQwMSDmhJrkurpcIiwgXCIwNTAxIOWKs+WKqFwiLCBcIjA1MDQg6Z2S5bm0XCIsIC8vXHJcbi8vICAgICAgICAgICAgIFwiMDUxMiDmiqTlo6tcIiwgXCIwNjAxIOWEv+erpVwiLCBcIjA3MDEg5bu65YWaXCIsIFwiMDgwMSDlu7rlhptcIiwgXCIwODA4IOeItuS6slwiLCBcIjA5MTAg5pWZ5biIXCIsIFwiMDkyOCDlrZTlrZDor57ovrBcIiwgLy9cclxuLy8gICAgICAgICAgICAgXCIxMDAxIOWbveW6hlwiLCBcIjEwMDYg6ICB5Lq6XCIsIFwiMTAyNCDogZTlkIjlm73ml6VcIiwgXCIxMTEyIOWtmeS4reWxseivnui+sOe6quW/tVwiLCBcIjEyMjAg5r6z6Zeo5Zue5b2S57qq5b+1XCIsIFwiMTIyNSDlnKPor55cIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBzdGF0aWMgU2ltcGxlRGF0ZUZvcm1hdCBjaGluZXNlRGF0ZUZvcm1hdCA9IG5ldyBTaW1wbGVEYXRlRm9ybWF0KFwieXl5eeW5tE1N5pyIZGTml6VcIiwgTG9jYWxlLkNISU5BKTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIGxvbmdbXSBsdW5hckluZm8gPSBuZXcgbG9uZ1tdIHsgLy9cclxuLy8gICAgICAgICAgICAgMHgwNGJkOCwgMHgwNGFlMCwgMHgwYTU3MCwgMHgwNTRkNSwgMHgwZDI2MCwgMHgwZDk1MCwgMHgxNjU1NCwgMHgwNTZhMCwgMHgwOWFkMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwNTVkMiwgMHgwNGFlMCwgMHgwYTViNiwgMHgwYTRkMCwgMHgwZDI1MCwgMHgxZDI1NSwgMHgwYjU0MCwgMHgwZDZhMCwgMHgwYWRhMiwgLy9cclxuLy8gICAgICAgICAgICAgMHgwOTViMCwgMHgxNDk3NywgMHgwNDk3MCwgMHgwYTRiMCwgMHgwYjRiNSwgMHgwNmE1MCwgMHgwNmQ0MCwgMHgxYWI1NCwgMHgwMmI2MCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwOTU3MCwgMHgwNTJmMiwgMHgwNDk3MCwgMHgwNjU2NiwgMHgwZDRhMCwgMHgwZWE1MCwgMHgwNmU5NSwgMHgwNWFkMCwgMHgwMmI2MCwgLy9cclxuLy8gICAgICAgICAgICAgMHgxODZlMywgMHgwOTJlMCwgMHgxYzhkNywgMHgwYzk1MCwgMHgwZDRhMCwgMHgxZDhhNiwgMHgwYjU1MCwgMHgwNTZhMCwgMHgxYTViNCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwMjVkMCwgMHgwOTJkMCwgMHgwZDJiMiwgMHgwYTk1MCwgMHgwYjU1NywgMHgwNmNhMCwgMHgwYjU1MCwgMHgxNTM1NSwgMHgwNGRhMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwYTVkMCwgMHgxNDU3MywgMHgwNTJkMCwgMHgwYTlhOCwgMHgwZTk1MCwgMHgwNmFhMCwgMHgwYWVhNiwgMHgwYWI1MCwgMHgwNGI2MCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwYWFlNCwgMHgwYTU3MCwgMHgwNTI2MCwgMHgwZjI2MywgMHgwZDk1MCwgMHgwNWI1NywgMHgwNTZhMCwgMHgwOTZkMCwgMHgwNGRkNSwgLy9cclxuLy8gICAgICAgICAgICAgMHgwNGFkMCwgMHgwYTRkMCwgMHgwZDRkNCwgMHgwZDI1MCwgMHgwZDU1OCwgMHgwYjU0MCwgMHgwYjVhMCwgMHgxOTVhNiwgMHgwOTViMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwNDliMCwgMHgwYTk3NCwgMHgwYTRiMCwgMHgwYjI3YSwgMHgwNmE1MCwgMHgwNmQ0MCwgMHgwYWY0NiwgMHgwYWI2MCwgMHgwOTU3MCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwNGFmNSwgMHgwNDk3MCwgMHgwNjRiMCwgMHgwNzRhMywgMHgwZWE1MCwgMHgwNmI1OCwgMHgwNTVjMCwgMHgwYWI2MCwgMHgwOTZkNSwgLy9cclxuLy8gICAgICAgICAgICAgMHgwOTJlMCwgMHgwYzk2MCwgMHgwZDk1NCwgMHgwZDRhMCwgMHgwZGE1MCwgMHgwNzU1MiwgMHgwNTZhMCwgMHgwYWJiNywgMHgwMjVkMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwOTJkMCwgMHgwY2FiNSwgMHgwYTk1MCwgMHgwYjRhMCwgMHgwYmFhNCwgMHgwYWQ1MCwgMHgwNTVkOSwgMHgwNGJhMCwgMHgwYTViMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgxNTE3NiwgMHgwNTJiMCwgMHgwYTkzMCwgMHgwNzk1NCwgMHgwNmFhMCwgMHgwYWQ1MCwgMHgwNWI1MiwgMHgwNGI2MCwgMHgwYTZlNiwgLy9cclxuLy8gICAgICAgICAgICAgMHgwYTRlMCwgMHgwZDI2MCwgMHgwZWE2NSwgMHgwZDUzMCwgMHgwNWFhMCwgMHgwNzZhMywgMHgwOTZkMCwgMHgwNGJkNywgMHgwNGFkMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwYTRkMCwgMHgxZDBiNiwgMHgwZDI1MCwgMHgwZDUyMCwgMHgwZGQ0NSwgMHgwYjVhMCwgMHgwNTZkMCwgMHgwNTViMiwgMHgwNDliMCwgLy9cclxuLy8gICAgICAgICAgICAgMHgwYTU3NywgMHgwYTRiMCwgMHgwYWE1MCwgMHgxYjI1NSwgMHgwNmQyMCwgMHgwYWRhMCB9O1xyXG5cclxuLy8gICAgIHB1YmxpYyBMdW5hckNhbGVuZGFyKGludCB5ZWFyLCBpbnQgbW9udGgsIGludCBkYXkpIHtcclxuLy8gICAgICAgICB0aGlzLnllYXIgPSB5ZWFyO1xyXG4vLyAgICAgICAgIHRoaXMubW9udGggPSBtb250aDtcclxuLy8gICAgICAgICB0aGlzLmRheSA9IGRheTtcclxuLy8gICAgICAgICB0aGlzLmluaXRMdW5hckRhdGUoKTtcclxuLy8gICAgIH1cclxuLy8gICAgIHByaXZhdGUgdm9pZCBpbml0THVuYXJEYXRlKCl7XHJcbi8vICAgICAgICAgU3RyaW5nIG5vd2FkYXlzO1xyXG4vLyAgICAgICAgIERhdGUgYmFzZURhdGUgPSBudWxsO1xyXG4vLyAgICAgICAgIERhdGUgbm93YWRheSA9IG51bGw7XHJcbi8vICAgICAgICAgdHJ5IHtcclxuLy8gICAgICAgICAgICAgYmFzZURhdGUgPSBjaGluZXNlRGF0ZUZvcm1hdC5wYXJzZShcIjE5MDDlubQx5pyIMzHml6VcIik7XHJcbi8vICAgICAgICAgfSBjYXRjaCAoUGFyc2VFeGNlcHRpb24gZSkge1xyXG4vLyAgICAgICAgICAgICBlLnByaW50U3RhY2tUcmFjZSgpO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgbm93YWRheXMgPSB0aGlzLnllYXIgKyBcIuW5tFwiICsgdGhpcy5tb250aCArIFwi5pyIXCIgKyB0aGlzLmRheSArIFwi5pelXCI7XHJcbi8vICAgICAgICAgdHJ5IHtcclxuLy8gICAgICAgICAgICAgbm93YWRheSA9IGNoaW5lc2VEYXRlRm9ybWF0LnBhcnNlKG5vd2FkYXlzKTtcclxuLy8gICAgICAgICB9IGNhdGNoIChQYXJzZUV4Y2VwdGlvbiBlKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJpbnRTdGFja1RyYWNlKCk7XHJcblxyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgLy8g5LiOMTkwMOW5tDHmnIgzMeaXpeebuOW3rueahOWkqeaVsFxyXG4vLyAgICAgICAgIGludCBvZmZzZXQgPSAoaW50KSAoKG5vd2FkYXkuZ2V0VGltZSgpIC0gYmFzZURhdGUuZ2V0VGltZSgpKSAvIDg2NDAwMDAwTCk7XHJcblxyXG4vLyAgICAgICAgIC8qKlxyXG4vLyAgICAgICAgICAqIOeUqG9mZnNldOWHj+WOu+avj+WGnOWOhuW5tOeahOWkqeaVsFxyXG4vLyAgICAgICAgICDorqHnrpflvZPlpKnmmK/lhpzljobnrKzlh6DlpKlcclxuLy8gICAgICAgICAgaVllYXLmnIDnu4jnu5PmnpzmmK/lhpzljobnmoTlubTku71cclxuLy8gICAgICAgICAgb2Zmc2V05Li65b2T5bm055qE56ys5Yeg5aSpXHJcbi8vICAgICAgICAgICovXHJcbi8vICAgICAgICAgaW50IGlZZWFyLCBkYXlzT2ZZZWFyID0gMDtcclxuLy8gICAgICAgICBmb3IgKGlZZWFyID0gMTkwMDsgaVllYXIgPCAyMTAxICYmIG9mZnNldCA+IDA7IGlZZWFyKyspIHtcclxuLy8gICAgICAgICAgICAgZGF5c09mWWVhciA9IGRheXNJbkx1bmFyWWVhcihpWWVhcik7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCAtPSBkYXlzT2ZZZWFyO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4vLyAgICAgICAgICAgICBvZmZzZXQgKz0gZGF5c09mWWVhcjtcclxuLy8gICAgICAgICAgICAgaVllYXItLTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIGxlYXBNb250aCA9IGdldExlYXBNb250aChpWWVhcik7IC8vIOWGnOWOhumXsOmCo+S4quaciFxyXG4vLyAgICAgICAgIGJvb2xlYW4gbGVhcCA9IGZhbHNlO1xyXG5cclxuLy8gICAgICAgICAvLyDnlKjlvZPlubTnmoTlpKnmlbBvZmZzZXQs6YCQ5Liq5YeP5Y675q+P5pyI77yI5Yac5Y6G77yJ55qE5aSp5pWw77yM5rGC5Ye65b2T5aSp5piv5pys5pyI55qE56ys5Yeg5aSpXHJcbi8vICAgICAgICAgaW50IGlNb250aCwgZGF5c09mTW9udGggPSAwO1xyXG4vLyAgICAgICAgIGZvciAoaU1vbnRoID0gMTsgaU1vbnRoIDwgMTMgJiYgb2Zmc2V0ID4gMDsgaU1vbnRoKyspIHtcclxuXHJcbi8vICAgICAgICAgICAgIGlmIChsZWFwTW9udGggPiAwICYmIGlNb250aCA9PSAobGVhcE1vbnRoICsgMSkgJiYgIWxlYXApIHtcclxuLy8gICAgICAgICAgICAgICAgIC8vIOmXsOaciFxyXG4vLyAgICAgICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gbGVhcERheUluTHVuYXIoeWVhcik7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZVxyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSBtb250aERheXNJbkx1bmFyKHllYXIsIGlNb250aCk7XHJcblxyXG4vLyAgICAgICAgICAgICBvZmZzZXQgLT0gZGF5c09mTW9udGg7XHJcbi8vICAgICAgICAgICAgIC8vIOino+mZpOmXsOaciFxyXG4vLyAgICAgICAgICAgICBpZiAobGVhcCAmJiBpTW9udGggPT0gKGxlYXBNb250aCArIDEpKVxyXG4vLyAgICAgICAgICAgICAgICAgbGVhcCA9IGZhbHNlO1xyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLy8gb2Zmc2V05Li6MOaXtu+8jOW5tuS4lOWImuaJjeiuoeeul+eahOaciOS7veaYr+mXsOaciO+8jOimgeagoeato1xyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPT0gMCAmJiBsZWFwTW9udGggPiAwICYmIGlNb250aCA9PSBsZWFwTW9udGggKyAxKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChsZWFwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gZmFsc2U7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICAgIC0taU1vbnRoO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIC8vIG9mZnNldOWwj+S6jjDml7bvvIzkuZ/opoHmoKHmraNcclxuLy8gICAgICAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4vLyAgICAgICAgICAgICBvZmZzZXQgKz0gZGF5c09mTW9udGg7XHJcbi8vICAgICAgICAgICAgIC0taU1vbnRoO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAgLy8g5Yac5Y6G5bm05Lu9XHJcbi8vICAgICAgICAgbHVuYXJZZWFyID0gaVllYXI7XHJcbi8vICAgICAgICAgbHVuYXJNb250aCA9IGlNb250aDtcclxuLy8gICAgICAgICBsdW5hckRheSA9IG9mZnNldCArIDE7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm055qE5oC75aSp5pWwXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIHllYXIg5bm05Lu9XHJcbi8vICAgICAgKiBAcmV0dXJuIOivpeW5tOeahOaAu+WkqeaVsFxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBkYXlzSW5MdW5hclllYXIoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpbnQgaSwgc3VtID0gMzQ4O1xyXG4vLyAgICAgICAgIGZvciAoaSA9IDB4ODAwMDsgaSA+IDB4ODsgaSA+Pj0gMSkge1xyXG4vLyAgICAgICAgICAgICBpZiAoKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiBpKSAhPSAwKVxyXG4vLyAgICAgICAgICAgICAgICAgc3VtICs9IDE7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiAoc3VtICsgbGVhcERheUluTHVuYXIoeWVhcikpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5Yac5Y6GIHllYXLlubTpl7DmnIjnmoTlpKnmlbBcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbGVhcERheUluTHVuYXIoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpZiAoZ2V0TGVhcE1vbnRoKHllYXIpICE9IDApIHtcclxuLy8gICAgICAgICAgICAgaWYgKChsdW5hckluZm9beWVhciAtIDE5MDBdICYgMHgxMDAwMCkgIT0gMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIDMwO1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIDI5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiAwO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiDlhpzljobpl7DpgqPkuKrmnIhcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIHllYXIg5bm05Lu9XHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IGdldExlYXBNb250aChpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIHJldHVybiAoaW50KSAobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmIDBiMTExMSk7XHJcbi8vICAgICB9XHJcblxyXG5cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOS8oOWbnuWGnOWOhiB5ZWFy5bm0bW9udGjmnIjnmoTmgLvlpKnmlbBcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciAg5bm05Lu9XHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGgg5pyI5Lu9XHJcbi8vICAgICAgKiBAcmV0dXJuIOivpeaciOS7veeahOaAu+WkqeaVsFxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBtb250aERheXNJbkx1bmFyKGludCB5ZWFyLCBpbnQgbW9udGgpIHtcclxuLy8gICAgICAgICBpZiAoKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiAoMHgxMDAwMCA+PiBtb250aCkpID09IDApXHJcbi8vICAgICAgICAgICAgIHJldHVybiAyOTtcclxuLy8gICAgICAgICBlbHNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiAzMDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTnmoTnlJ/ogpZcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm4g55Sf6IKWXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldFpvZGlhY1llYXIoaW50IHllYXIpIHtcclxuLy8gICAgICAgICByZXR1cm4gWm9kaWFjWyh5ZWFyIC0gNCkgJSAxMl07XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lr7nlupTlubTnmoTlubLmlK9cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0R2FuWmhpKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaW50IG51bSA9IHllYXIgLSAxOTAwICsgMzY7XHJcbi8vICAgICAgICAgcmV0dXJuIChHYW5bbnVtICUgMTBdICsgWmhpW251bSAlIDEyXSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lvZPliY3lubTku73nmoTlubLmlK9cclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgU3RyaW5nIGdldEN1cnJlbnRZZWFyR2FuWmhpKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRHYW5aaGkodGhpcy55ZWFyKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOiOt+WPluW9k+WJjeW5tOS7veeahOeUn+iCllxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFllYXJab2RpYWMoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldFpvZGlhY1llYXIodGhpcy5sdW5hclllYXIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldENoaW5hRGF5U3RyaW5nKGludCBkYXkpIHtcclxuXHJcbi8vICAgICAgICAgaW50IG4gPSBkYXkgJSAxMCA9PSAwID8gOSA6IGRheSAlIDEwIC0gMTtcclxuLy8gICAgICAgICBpZiAoZGF5ID4gMzApXHJcbi8vICAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4vLyAgICAgICAgIGlmIChkYXkgPT0gMTApXHJcbi8vICAgICAgICAgICAgIHJldHVybiBcIuWIneWNgVwiO1xyXG4vLyAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIGNoaW5lc2VUZW5DaGFyW2RheSAvIDEwXSArIGNoaW5lc2VNb250aE51bWJlcltuXTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOiOt+WPluW9k+WJjeaXpeacn+WGnOWOhuiKguaXpVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgU3RyaW5nIGdldEN1cnJlbnRMdW5hckhvbGlkYXkoKXtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0THVuYXJIb2xpZGF5KHRoaXMubHVuYXJNb250aCx0aGlzLmx1bmFyRGF5KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOiOt+WPluW9k+WJjeaXpeacn+WFrOWOhuiKguaXpVxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgU3RyaW5nIGdldEN1cnJlbnRTb2xhckhvbGlkYXkoKXtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0U29sYXJIb2xpZGF5KHRoaXMubW9udGgsdGhpcy5kYXkpO1xyXG4vLyAgICAgfVxyXG5cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWvueW6lOmYtOWOhueahOaXpeacn1xyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRMdW5hckRhdGUoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGNoaW5lc2VNb250aE51bWJlcltsdW5hck1vbnRoIC0gMV0gKyBcIuaciFwiICsgZ2V0Q2hpbmFEYXlTdHJpbmcobHVuYXJEYXkpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5a+55bqU5pel5pyf55qE5YWs5Y6G6IqC5YGH5pelXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSBtb250aCDlhazljobmnIhcclxuLy8gICAgICAqIEBwYXJhbSBkYXkgICDlhazljobml6VcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0U29sYXJIb2xpZGF5KGludCBtb250aCwgaW50IGRheSkge1xyXG4vLyAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgc29sYXJIb2xpZGF5Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc2QgPSBzb2xhckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzBdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc2R2ID0gc29sYXJIb2xpZGF5W2ldLnNwbGl0KFwiIFwiKVsxXTtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIHNtb250aF92ID0gbW9udGggKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc2RheV92ID0gZGF5ICsgXCJcIjtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIHNtZCA9IFwiXCI7XHJcbi8vICAgICAgICAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBzbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBzZGF5X3YgPSBcIjBcIiArIGRheTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBzbWQgPSBzbW9udGhfdiArIHNkYXlfdjtcclxuLy8gICAgICAgICAgICAgaWYgKHNkLnRyaW0oKS5lcXVhbHMoc21kLnRyaW0oKSkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBzZHY7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqKlxyXG4vLyAgICAgICog6I635Y+W6Zi05Y6G5a+55bqU55qE6IqC5YGH5pelXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSBtb250aCDpmLTljobmnIhcclxuLy8gICAgICAqIEBwYXJhbSBkYXkgICDpmLTljobml6VcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0THVuYXJIb2xpZGF5KGludCBtb250aCwgaW50IGRheSkge1xyXG4vLyAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgbHVuYXJIb2xpZGF5Lmxlbmd0aDsgaSsrKSB7XHJcbi8vICAgICAgICAgICAgIC8vIOi/lOWbnuWGnOWOhuiKguWBh+aXpeWQjeensFxyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbGQgPSBsdW5hckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzBdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbGR2ID0gbHVuYXJIb2xpZGF5W2ldLnNwbGl0KFwiIFwiKVsxXTtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIGxtb250aF92ID0gbW9udGggKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbGRheV92ID0gZGF5ICsgXCJcIjtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIGxtZCA9IFwiXCI7XHJcbi8vICAgICAgICAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBsbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbi8vICAgICAgICAgICAgICAgICBsZGF5X3YgPSBcIjBcIiArIGRheTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBsbWQgPSBsbW9udGhfdiArIGxkYXlfdjtcclxuLy8gICAgICAgICAgICAgaWYgKGxkLnRyaW0oKS5lcXVhbHMobG1kLnRyaW0oKSkpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBsZHY7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgICB9XHJcbi8vICAgICAgLyoqXHJcbi8vICAgICAgKiDliKTmlq3lhazljobmmK/lkKbkuLrpl7DlubRcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIHllYXJcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIGJvb2xlYW4gaXNMZWFwWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGlmICh5ZWFyICUgMTAwID09IDAgJiYgeWVhciAlIDQwMCA9PSAwKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgIH0gZWxzZSBpZiAoeWVhciAlIDEwMCAhPSAwICYmIHllYXIgJSA0ID09IDApIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuWvueW6lOW5tOaciOeahOWkqeaVsFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0gaXNMZWFwWWVhclxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBpbnQgZ2V0RGF5c09mTW9udGgoYm9vbGVhbiBpc0xlYXBZZWFyLCBpbnQgbW9udGgpIHtcclxuLy8gICAgICAgICBzd2l0Y2ggKG1vbnRoKSB7XHJcbi8vICAgICAgICAgY2FzZSAxOlxyXG4vLyAgICAgICAgIGNhc2UgMzpcclxuLy8gICAgICAgICBjYXNlIDU6XHJcbi8vICAgICAgICAgY2FzZSA3OlxyXG4vLyAgICAgICAgIGNhc2UgODpcclxuLy8gICAgICAgICBjYXNlIDEwOlxyXG4vLyAgICAgICAgIGNhc2UgMTI6XHJcbi8vICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMzE7XHJcbi8vICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgIGNhc2UgNDpcclxuLy8gICAgICAgICBjYXNlIDY6XHJcbi8vICAgICAgICAgY2FzZSA5OlxyXG4vLyAgICAgICAgIGNhc2UgMTE6XHJcbi8vICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMzA7XHJcbi8vICAgICAgICAgICAgIGJyZWFrO1xyXG4vLyAgICAgICAgIGNhc2UgMjpcclxuLy8gICAgICAgICAgICAgaWYgKGlzTGVhcFllYXIpIHtcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMjk7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IDI4O1xyXG4vLyAgICAgICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gZGF5c09mTW9udGg7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDliKTmlq3lhazljoblubTmnIjml6XlsZ7kuo7mmJ/mnJ/lh6BcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIHllYXJcclxuLy8gICAgICAqIEBwYXJhbSBtb250aFxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgaW50IGdldFdlZWtkYXlPZk1vbnRoKGludCB5ZWFyLCBpbnQgbW9udGgpIHtcclxuLy8gICAgICAgICBDYWxlbmRhciBjYWwgPSBDYWxlbmRhci5nZXRJbnN0YW5jZSgpO1xyXG4vLyAgICAgICAgIGNhbC5zZXQoeWVhciwgbW9udGggLSAxLCAxKTtcclxuLy8gICAgICAgICBkYXlPZldlZWsgPSBjYWwuZ2V0KENhbGVuZGFyLkRBWV9PRl9XRUVLKSAtIDE7XHJcbi8vICAgICAgICAgcmV0dXJuIGRheU9mV2VlaztcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwdWJsaWMgc3RhdGljIHZvaWQgbWFpbihTdHJpbmdbXSBhcmdzKSB7XHJcbi8vICAgICAgICAgTHVuYXJDYWxlbmRhciBjYWxlbmRhciA9IG5ldyBMdW5hckNhbGVuZGFyKDIwMTksIDksIDEzKTtcclxuLy8gICAgICAgICBTeXN0ZW0ub3V0LnByaW50bG4oXCJjYWxlbmRhci5nZXRMdW5hckRhdGUoKTpcIiArIGNhbGVuZGFyLmdldEx1bmFyRGF0ZSgpKTtcclxuLy8gICAgICAgICBTeXN0ZW0ub3V0LnByaW50bG4oXCJjYWxlbmRhci5nZXRDdXJyZW50THVuYXJIb2xpZGF5KCk6XCIgKyBjYWxlbmRhci5nZXRDdXJyZW50THVuYXJIb2xpZGF5KCkpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEN1cnJlbnRTb2xhckhvbGlkYXkoKTpcIiArIGNhbGVuZGFyLmdldEN1cnJlbnRTb2xhckhvbGlkYXkoKSk7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuIiwiXG5cbmNvbnN0IE5PREVfUkVQTEFDRSA9IDAgLy9ub2RlIHJlcGxhY2UgXG5jb25zdCBDSElMRF9SRV9PUkRFUiA9IDEgLy9jaGlsZCBub2RlIHJlIG9yZGVyXG5jb25zdCBOT0RFX1BST1BTID0gMiAvL3Byb3AgY2hhbmdlIFxuY29uc3QgTk9ERV9DT05URU5UID0gMyAvL2NvbnRlbnQgY2hhbmdlXG5jbGFzcyBFbGVtZW50IHtcbiAgICAvKipcbiAgICAgKiB2aXJ0dWFsIGRvbSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0geyp9IHRhZyAgdGhlIGh0bWwgdGFnIG5hbWVcbiAgICAgKiBAcGFyYW0geyp9IHByb3BzICB0aGUgcHJvcCAoa2V577yMc3R5bGUuLilcbiAgICAgKiBAcGFyYW0geyp9IGNoaWxkcmVuIGNoaWxkIGRhdGFcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0YWcsIHByb3BzLCBjaGlsZHJlbikge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRWxlbWVudCkpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YWcgPSB0YWdcbiAgICAgICAgdGhpcy5wcm9wcyA9IHByb3BzIHx8IHt9XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbiB8fCBbXVxuICAgICAgICB0aGlzLmtleSA9IHByb3BzID8gcHJvcHMua2V5IDogdW5kZWZpbmVkXG4gICAgICAgIGlmICghdGhpcy5rZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0YWd9IC4uLiBodG1sIHRhZyB0aGUga2V5IGlzIHVuZGVmaW5lZGApXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBjb3VudCArPSBjaGlsZC5jb3VudFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnQrK1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb3VudCA9IGNvdW50XG4gICAgfVxuICAgIC8qKlxuICAgICAqIHRoZSBtZXRob2QgdXNlIHRvIHZpcnR1YWwgZG9tICByZW5kZSB0byByZWFsIGRvbVxuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRoaXMudGFnKVxuICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcbiAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBwcm9wcykge1xuICAgICAgICAgICAgVXRpbC5zZXRBdHRyKGVsLCBwcm9wTmFtZSwgcHJvcHNbcHJvcE5hbWVdKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZEVsID0gKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkgPyBjaGlsZC5yZW5kZXIoKSA6IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNoaWxkKVxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoY2hpbGRFbClcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgIH1cbn1cblxuY2xhc3MgRGlmZiB7XG4gICAgLyoqXG4gICAgICogZG9tIHRyZWUgZGlmZiBhbGdvcml0aG0gb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHsqfSBvbGRUcmVlIHRoZSBkb20gdHJlZSBmb3IgYmVmb3JlIHVwZGF0ZSBcbiAgICAgKiBAcGFyYW0geyp9IG5ld1RyZWUgdGhlIGRvbSB0cmVlIGZvciBhZnRlciB1cGRhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvbGRUcmVlLCBuZXdUcmVlKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSAwXG4gICAgICAgIHRoaXMucGF0Y2hlcyA9IHt9XG4gICAgICAgIHRoaXMuZGZzV2FsayhvbGRUcmVlLCBuZXdUcmVlLCB0aGlzLmluZGV4KVxuICAgIH1cbiAgICBkZnNXYWxrKG9sZE5vZGUsIG5ld05vZGUsIGluZGV4KSB7XG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2ggPSBbXVxuICAgICAgICBpZiAobmV3Tm9kZSA9PSBudWxsKSB7XG5cbiAgICAgICAgfSBlbHNlIGlmIChVdGlsLmlzU3RyaW5nKG9sZE5vZGUpICYmIFV0aWwuaXNTdHJpbmcobmV3Tm9kZSkpIHtcbiAgICAgICAgICAgIGlmIChvbGROb2RlICE9IG5ld05vZGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfQ09OVEVOVCxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogbmV3Tm9kZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob2xkTm9kZS50YWdOYW1lID09PSBuZXdOb2RlLnRhZ05hbWUgJiYgb2xkTm9kZS5rZXkgPT0gbmV3Tm9kZS5rZXkpIHtcbiAgICAgICAgICAgIGxldCBwcm9wc1BhdGNoZXMgPSB0aGlzLmRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKVxuICAgICAgICAgICAgaWYgKHByb3BzUGF0Y2hlcykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTk9ERV9QUk9QUyxcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHByb3BzUGF0Y2hlc1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIVV0aWwuaXNJZ25vcmVDaGlsZHJlbihuZXdOb2RlKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGlmZkNoaWxkcmVuKG9sZE5vZGUuY2hpbGRyZW4sIG5ld05vZGUuY2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTk9ERV9SRVBMQUNFLFxuICAgICAgICAgICAgICAgIG5vZGU6IG5ld05vZGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucGF0Y2hlc1tpbmRleF0gPSBjdXJyZW50UGF0Y2hcbiAgICAgICAgfVxuICAgIH1cbiAgICBkaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSkge1xuXG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkTm9kZS5wcm9wc1xuICAgICAgICBjb25zdCBuZXdQcm9wcyA9IG5ld05vZGUucHJvcHNcblxuICAgICAgICBjb25zdCBwcm9wc1BhdGNoZXMgPSB7fVxuICAgICAgICBsZXQgaXNTYW1lID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIG9sZFByb3BzKSB7XG4gICAgICAgICAgICBpZiAobmV3UHJvcHNba2V5XSAhPT0gb2xkUHJvcHNba2V5XSkge1xuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgcHJvcHNQYXRjaGVzW2tleV0gPSBuZXdQcm9wc1trZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChsZXQga2V5IGluIG5ld1Byb3BzKSB7XG4gICAgICAgICAgICBpZiAoIW9sZFByb3BzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpc1NhbWUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1NhbWUgPyBudWxsIDogcHJvcHNQYXRjaGVzXG5cbiAgICB9XG4gICAgZGlmZkNoaWxkcmVuKG9sZENoaWxkcmVuLCBuZXdDaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaCkge1xuICAgICAgICBsZXQgZGlmZkxpc3QgPSBuZXcgRGlmZkxpc3Qob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuKVxuICAgICAgICBsZXQgZGlmZnMgPSBkaWZmTGlzdC5nZXRSZXN1bHQoKVxuICAgICAgICBuZXdDaGlsZHJlbiA9IGRpZmZzLmNoaWxkXG4gICAgICAgIGlmIChkaWZmcy5tb3Zlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxldCByZW9yZGVyUGF0Y2ggPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogQ0hJTERfUkVfT1JERVIsXG4gICAgICAgICAgICAgICAgbW92ZXM6IGRpZmZzLm1vdmVzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaChyZW9yZGVyUGF0Y2gpXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGxlZnROb2RlID0gbnVsbFxuICAgICAgICBsZXQgY3VycmVudE5vZGVJbmRleCA9IGluZGV4XG4gICAgICAgIG9sZENoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgbmV3Q2hpbGQgPSBuZXdDaGlsZHJlbltpXVxuICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCA9IChsZWZ0Tm9kZSAmJiBsZWZ0Tm9kZS5jb3VudCkgP1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyBsZWZ0Tm9kZS5jb3VudCArIDEgOlxuICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggKyAxXG4gICAgICAgICAgICB0aGlzLmRmc1dhbGsoY2hpbGQsIG5ld0NoaWxkLCBjdXJyZW50Tm9kZUluZGV4KVxuICAgICAgICAgICAgbGVmdE5vZGUgPSBjaGlsZFxuICAgICAgICB9KVxuXG5cbiAgICB9XG59XG5cbmNsYXNzIFBhdGNoIHtcbiAgICBjb25zdHJ1Y3Rvcihub2RlLCBwYXRjaGVzKSB7XG4gICAgICAgIGxldCB3YWxrZXIgPSB7XG4gICAgICAgICAgICBpbmRleDogMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpXG4gICAgfVxuICAgIGRmc1dhbGsobm9kZSwgd2Fsa2VyLCBwYXRjaGVzKSB7XG4gICAgICAgIGxldCBjdXJyZW50UGF0Y2hlcyA9IHBhdGNoZXNbd2Fsa2VyLmluZGV4XVxuICAgICAgICBsZXQgbGVuID0gbm9kZS5jaGlsZE5vZGVzID8gbm9kZS5jaGlsZE5vZGVzLmxlbmd0aCA6IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gbm9kZS5jaGlsZE5vZGVzW2ldXG4gICAgICAgICAgICB3YWxrZXIuaW5kZXgrK1xuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCB3YWxrZXIsIHBhdGNoZXMpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRQYXRjaGVzKSB7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlcylcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIGFwcGx5UGF0Y2hlcyhub2RlLCBjdXJyZW50UGF0Y2hlKSB7XG4gICAgICAgIGN1cnJlbnRQYXRjaGUuZm9yRWFjaCgoY3VycmVudFBhdGNoKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGN1cnJlbnRQYXRjaC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1JFUExBQ0U6XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdOb2RlID0gVXRpbC5pc1N0cmluZyhjdXJyZW50UGF0Y2gubm9kZSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjdXJyZW50UGF0Y2gubm9kZSkgOiBjdXJyZW50UGF0Y2gubm9kZS5yZW5kZXIoKVxuICAgICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIG5vZGUpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBDSElMRF9SRV9PUkRFUjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVyQ2hpbGRyZW4obm9kZSwgY3VycmVudFBhdGNoLm1vdmVzKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgTk9ERV9QUk9QUzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQcm9wcyhub2RlLCBjdXJyZW50UGF0Y2gucHJvcHMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX0NPTlRFTlQ6XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnRleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnRleHRDb250ZW50ID0gY3VycmVudFBhdGNoLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUubm9kZVZhbHVlID0gY3VycmVudFBhdGNoLmNvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmVvcmRlckNoaWxkcmVuKG5vZGUsIG1vdmVzKSB7XG4gICAgICAgIGxldCBzdGF0aWNOb2RlTGlzdCA9IFV0aWwudG9BcnJheShub2RlLmNoaWxkTm9kZXMpXG4gICAgICAgIGxldCBub2RlTWFwcyA9IHt9XG4gICAgICAgIHN0YXRpY05vZGVMaXN0LmZvckVhY2goKHNub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAoc25vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gc25vZGUuZ2V0QXR0cmlidXRlKCdrZXknKVxuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHNba2V5XSA9IHNub2RlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBtb3Zlcy5mb3JFYWNoKChtb3ZlKSA9PiB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBtb3ZlLmluZGV4XG4gICAgICAgICAgICBpZiAobW92ZS50eXBlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRpY05vZGVMaXN0W2luZGV4XSA9PT0gbm9kZS5jaGlsZE5vZGVzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW92ZS50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluc2VydE5vZGUgPSBub2RlTWFwc1ttb3ZlLml0ZW0ua2V5XSA/XG4gICAgICAgICAgICAgICAgICAgIG5vZGVNYXBzKG1vdmUuaXRlbS5rZXkpLmNsb25lTm9kZSh0cnVlKSA6XG4gICAgICAgICAgICAgICAgICAgIFV0aWwuaXNTdHJpbmcobW92ZS5pdGVtKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1vdmUuaXRlbSkgOiBtb3ZlLml0ZW0ucmVuZGVyKClcbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDAsIGluc2VydE5vZGUpXG4gICAgICAgICAgICAgICAgbm9kZS5pbnNlcnRCZWZvcmUoaW5zZXJ0Tm9kZSwgbm9kZS5jaGlsZE5vZGVzW2luZGV4XSB8fCBudWxsKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIHNldFByb3BzKG5vZGUsIHByb3BzKSB7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBwcm9wcykge1xuICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGtleSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBwcm9wc1trZXldXG4gICAgICAgICAgICAgICAgVXRpbC5zZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuXG5cblxuY2xhc3MgVXRpbCB7XG4gICAgc3RhdGljIGlzU3RyaW5nKHNvbWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBzb21lID09PSAnc3RyaW5nJ1xuICAgIH1cbiAgICBzdGF0aWMgdG9BcnJheShsaXN0KSB7XG4gICAgICAgIGlmICghbGlzdCkge1xuICAgICAgICAgICAgcmV0dXJuIFtdXG4gICAgICAgIH1cbiAgICAgICAgbGV0IGFycmF5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGxpc3RbaV0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5XG4gICAgfVxuICAgIHN0YXRpYyBpc0ZvckluKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3KiQvLnRlc3QoZGlyZWN0aW9uKVxuICAgIH1cbiAgICBzdGF0aWMgaXNGb3JGb3JJbihkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW4qJC8udGVzdChkaXJlY3Rpb24pXG4gICAgfVxuXG4gICAgc3RhdGljIGlzRm9yT3JGb3JGb3IoZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHd8X2luKiQvLnRlc3QoZGlyZWN0aW9uKVxuICAgIH1cbiAgICBzdGF0aWMgaXNJZ25vcmVDaGlsZHJlbihub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLnByb3BzICYmIG5vZGUucHJvcHMuaGFzT3duUHJvcGVydHkoXCJpZ25vcmVcIilcbiAgICB9XG4gICAgc3RhdGljIGlzTnVtYmVyKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvL+ato+aVtOaVsFxuICAgICAgICAgICAgdmFyIHJlTnVtYmVyID0gL15cXGQrJC9cbiAgICAgICAgICAgIC8v6LSf5pW05pWwXG4gICAgICAgICAgICB2YXIgcmVOZU51bWJlciA9IC9eLVxcZCskL1xuICAgICAgICAgICAgLy/mraPlrp7mlbBcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIxID0gL15bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XG4gICAgICAgICAgICB2YXIgcmVSZWFsTnVtYmVyMiA9IC9eMFsuXVxcZCskLyAvL+mbtuW8gOWktFxuICAgICAgICAgICAgLy/otJ/lrp7mlbBcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjEgPSAvXi1bMS05XVxcZCpbLl1cXGQrJC8gIC8v6Z2e6Zu25byA5aS0XG4gICAgICAgICAgICB2YXIgcmVOZVJlYWxOdW1iZXIyID0gL14tMFsuXVxcZCskLyAvL+mbtuW8gOWktFxuXG4gICAgICAgICAgICBpZiAocmVOdW1iZXIudGVzdCh2YWx1ZSkgfHwgcmVOZU51bWJlci50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgIHx8IHJlUmVhbE51bWJlcjEudGVzdCh2YWx1ZSkgfHwgcmVSZWFsTnVtYmVyMi50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgIHx8IHJlTmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZU5lUmVhbE51bWJlcjIudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mICh2YWx1ZSkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcbiAgICAgICAgICAgICAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcgfHwgdGFnTmFtZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuXG5jbGFzcyBEaWZmTGlzdCB7XG4gICAgLyoqXG4gICAgICogZGlmZiBsaXN0IFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkTGlzdCBcbiAgICAgKiBAcGFyYW0geyp9IG5ld0xpc3QgXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2xkTGlzdCwgbmV3TGlzdCkge1xuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcbiAgICAgICAgbGV0IG5ld0xpc3RLZXlJbmRleCA9IHRoaXMubWFrZUtleUluZGV4KG5ld0xpc3QpLmtleUluZGV4XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yID0gW11cbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvbGRJdGVtID0gb2xkTGlzdFtpXVxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcbiAgICAgICAgICAgIGlmICghbmV3TGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG9JdGVtS2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobnVsbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZExpc3QucHVzaChuZXdMaXN0W25ld0xpc3RLZXlJbmRleFtvSXRlbUtleV1dKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVtcExpc3QgPSB0aGlzLmNoaWxkTGlzdC5zbGljZSgwKVxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBMaXN0W2ldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5JdGVtID0gbmV3TGlzdFtpXVxuICAgICAgICAgICAgbGV0IG5JdGVtS2V5ID0gdGhpcy5nZXRLZXkobkl0ZW0pXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxuICAgICAgICAgICAgbGV0IGNJdGVtS2V5ID0gdGhpcy5nZXRLZXkoY0l0ZW0pXG4gICAgICAgICAgICBpZiAoY0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZExpc3RLZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShuSXRlbUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjTmV4dEl0ZW1LZXkgPSBnZXRLZXkodGhpcy50ZW1wTGlzdFtpbmRleCArIDFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBrID0gdGhpcy50ZW1wTGlzdC5sZW5ndGggLSBpbmRleFxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBrLS1cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGsgKyBuZXdMaXN0Lmxlbmd0aClcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgbWFrZUtleUluZGV4KGxpc3QpIHtcbiAgICAgICAgbGV0IGtleUluZGV4ID0ge31cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGxldCBpdGVtS2V5ID0gdGhpcy5nZXRLZXkoaXRlbSlcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleShpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtW1wia2V5XCJdXG4gICAgfVxuICAgIHJlbW92ZUNvcHlUZW1wTGlzdChpbmRleCkge1xuICAgICAgICB0aGlzLnRlbXBMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdHlwZTogMFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGluc2VydChpbmRleCwgaXRlbSkge1xuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICB0eXBlOiAxXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0UmVzdWx0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxuICAgICAgICAgICAgY2hpbGQ6IHRoaXMuY2hpbGRMaXN0XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBvYnNlcnZlKG9iaiwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spIHtcblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJuYWxWYWx1ZSA9IG9ialtrZXldXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxuICAgICAgICBvYnNlcnZlTWFwLnB1dChrZXksIG9ic2VydmFibGUpXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUuYWRkKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpbnRlcm5hbFZhbHVlICE9PSBuZXdWYWxcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFZhbHVlID0gbmV3VmFsXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5pbnZva2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBvYmpcbn1cblxuXG5cbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMgPSBuZXcgU2V0KClcbn1cbk9ic2VydmFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlVXBkYXRlKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMuYWRkKG9ic2VydmFibGVVcGRhdGUpXG59XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMuZm9yRWFjaChmdW4gPT4gZnVuKCkpXG59XG5cblxuLyoqXG4gKiB0aGUgbWV0aG9kIHVzZSB0byBkZWVwIGNsb25lIG9ialxuICogQHBhcmFtIHsqfSBvYmogXG4gKi9cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGxldCBnZXRUeXBlID0gKG8pID0+IHtcbiAgICAgICAgaWYgKG8gPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgaWYgKG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0LCBvQ2xhc3MgPSBnZXRUeXBlKG9iaik7XG4gICAgaWYgKG9DbGFzcyA9PT0gXCJPYmplY3RcIikge1xuICAgICAgICByZXN1bHQgPSB7fTtcbiAgICB9IGVsc2UgaWYgKG9DbGFzcyA9PT0gXCJBcnJheVwiKSB7XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICBsZXQgY29weSA9IG9ialtrZXldO1xuICAgICAgICBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIk9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIkFycmF5XCIpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXJndW1lbnRzLmNhbGxlZShjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBoKHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXG59XG5cbmZ1bmN0aW9uIGRpZmYob2xkVHJlZSwgbmV3VHJlZSkge1xuICAgIGxldCBkID0gbmV3IERpZmYob2xkVHJlZSwgbmV3VHJlZSlcbiAgICByZXR1cm4gZC5wYXRjaGVzXG59XG5cblxuZnVuY3Rpb24gcGF0Y2gobm9kZSwgcGF0Y2hlcykge1xuICAgIHJldHVybiBuZXcgUGF0Y2gobm9kZSwgcGF0Y2hlcylcbn1cbi8qKlxuICogdGhlIG1hcCBvYmplY3QgdXNlIHRvIHNhdmUgbGlraWx5IChrZXksdmFsdWUpIGRhdGFcbiAqL1xuY2xhc3MgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcbiAgICB9XG4gICAgcHV0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMubWFwKSkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApID8gdGhpcy5tYXBba2V5XSA6IG51bGw7XG4gICAgfVxuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgaWYgKChrZXkgaW4gdGhpcy5tYXApKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XVxuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcbiAgICB9XG59XG5cblxuY2xhc3MgUlYge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbikge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlbCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBkb21cbiAgICAgICAgfSA9IG9wdGlvblxuICAgICAgICBsZXQgcm9vdCA9IFV0aWwuaXNTdHJpbmcoZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbFxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgICAgIHRoaXMudmUgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSlcbiAgICAgICAgdGhpcy53ID0gdGhpcy52ZS5yZW5kZXIoKVxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudylcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwID0gbmV3IE1hcCgpXG4gICAgICAgIG9ic2VydmUodGhpcy5kYXRhLCB0aGlzLm9ic2VydmVNYXAsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZG9tKGRvbSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxuXG4gICAgfVxuICAgIHVwZGF0ZWRvbShkb20pIHtcbiAgICAgICAgbGV0IG52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxuICAgICAgICB3aW5kb3cubnZlID0gbnZlXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcbiAgICAgICAgcGF0Y2godGhpcy53LCBkaWZmKHRoaXMudmUsIG52ZSkpXG4gICAgICAgIHRoaXMudmUgPSBudmVcbiAgICB9XG4gICAgd2F0Y2goa2V5LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9ic2VydmVNYXAuZ2V0KGtleSkuYWRkKGNhbGxiYWNrKVxuICAgIH1cbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW11cbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXG4gICAgICAgICAgICBpZiAoY2MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNjLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHYpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQoY2MpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNjKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGgoZG9tLnRhZywgZG9tLnByb3BzLCBjaGlsZHJlbilcbiAgICB9XG4gICAgYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSB7XG4gICAgICAgIGlmIChcImZvclwiIGluIGRvbS5wcm9wcykge1xuICAgICAgICAgICAgbGV0IGRhdGFBcnJheSA9IFtdXG4gICAgICAgICAgICBsZXQgaXNGb3JGb3IgPSBmYWxzZVxuICAgICAgICAgICAgbGV0IGRhdGFTaW5nbGVcblxuICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JJbikge1xuICAgICAgICAgICAgICAgIGlmKFwiY2hpbGREb21EYXRha2V5XCIgaW4gZG9tKXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5PWRvbS5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGU9ZG9tLmNoaWxkRG9tRGF0YWtleVxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKFwiZG9tRGF0YUtleVwiIGluIGRvbSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV09PT1kb20uZG9tRGF0YUtleSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXk9ZG9tLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVswXVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheSA9IHRoaXMuZGF0YVtkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVswXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlIGZvciBkaXJlY3RpdmUgdXNlIGVycm9yXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdXG4gICAgICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge31cbiAgICAgICAgICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xuICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXG4gICAgICAgICAgICAgICAgb2JqLnByb3BzID0ge31cbiAgICAgICAgICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwcm9wc1twcm9wXVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLmluZGV4T2YoXCIsXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVzID0gc3R5bGUuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlQXJyYXlTdHlsZShkYXRhLCBzdHlsZXMsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChSVi5pc1BsYWNlSG9sZGVyKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFSVi5pc0RvdE9wZXJhdG9yRXhwcmVzc2lvbihSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5kYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKS5zcGxpdChcIi5cIilbMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChSVi5pc09wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdKSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IFJWLmdldE9wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdLCBkYXRhLCBkYXRhU2luZ2xlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRvbS5wcm9wc1t2YWx1ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChSVi5pc1BsYWNlSG9sZGVyKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFJWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuaW5kZXhPZihkYXRhU2luZ2xlKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGhpcy5kYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSldXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pLnNwbGl0KFwiLlwiKVsxXV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGRyZW5bY2hpbGRdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvbS5jaGlsZHJlbltjaGlsZF0gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjaGlsZERvbURhdGFcIiBpbiBkb20ucHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5jaGlsZERvbURhdGFrZXkgPSBkb20ucHJvcHMuY2hpbGREb21EYXRhXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5kYXRhID0gZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNlIGlmKFwiZG9tRGF0YVwiIGluIGRvbS5wcm9wcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZG9tRGF0YUtleSA9IGRvbS5wcm9wcy5kb21EYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFbY2hpbGRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tLmNoaWxkcmVuW2NoaWxkXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKG9iailcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIG9ianNcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IGRhdGFcbiAgICAgICAgICAgIGxldCBjaGlsZERvbURhdGFrZXlcbiAgICAgICAgICAgIGlmIChcImRhdGFcIiBpbiBkb20pIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZG9tLmRhdGFcbiAgICAgICAgICAgICAgICBjaGlsZERvbURhdGFrZXkgPSBkb20uY2hpbGREb21EYXRha2V5XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBvYmogPSB7fVxuICAgICAgICAgICAgb2JqLnRhZyA9IGRvbS50YWdcbiAgICAgICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXG4gICAgICAgICAgICBvYmoucHJvcHMgPSB7fVxuICAgICAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZG9tLnByb3BzKVxuICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZSA9IHByb3BzW3Byb3BdXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGUuaW5kZXhPZihcIixcIikgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlLnNwbGl0KFwiLFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlQXJyYXlTdHlsZShkYXRhLCBzdHlsZXMsIHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihkb20ucHJvcHNbdmFsdWVdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFJWLmlzT3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBSVi5nZXRPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSwgZGF0YSwgY2hpbGREb21EYXRha2V5KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IGRvbS5wcm9wc1t2YWx1ZV1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIGluIGRvbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChSVi5pc1BsYWNlSG9sZGVyKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKFwiLlwiKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZGF0YVt2YWx1ZS5zcGxpdCgnLicpWzFdXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZG9tLmNoaWxkcmVuW2NoaWxkXVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbS5jaGlsZHJlbltjaGlsZF0pXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvYmpcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgZGF0YVNpbmdsZSkge1xuICAgICAgICBsZXQgbmV3U3R5bGUgPSAnJ1xuICAgICAgICBpZiAoZGF0YVNpbmdsZSkge1xuICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKFJWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLmluZGV4T2YoZGF0YVNpbmdsZSkgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleSA9IFJWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGUpLnNwbGl0KFwiLlwiKVsxXVxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IGRhdGFba2V5XVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZUtleSA9IHN0eWxlLnNwbGl0KFwiOlwiKVswXVxuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxuICAgICAgICAgICAgICAgICAgICBzdHlsZVZhbHVlID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxuICAgICAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlS2V5ICsgXCI6XCIgKyBzdHlsZVZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxldCBzdHlsZUtleSA9IHN0eWxlLnNwbGl0KFwiOlwiKVswXVxuICAgICAgICAgICAgbGV0IHN0eWxlVmFsdWUgPSBzdHlsZS5zcGxpdChcIjpcIilbMV1cbiAgICAgICAgICAgIGlmIChSVi5pc1BsYWNlSG9sZGVyKHN0eWxlVmFsdWUpKSB7XG5cbiAgICAgICAgICAgICAgICBzdHlsZVZhbHVlID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKHN0eWxlVmFsdWUpXVxuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdTdHlsZSA9IHN0eWxlXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3R5bGVcbiAgICB9XG4gICAgaGFuZGxlQXJyYXlTdHlsZShkYXRhLCBzdHlsZXMsIGRhdGFTaW5nbGUpIHtcbiAgICAgICAgbGV0IG5ld1N0eWxlQXJyYXkgPSBcIlwiXG4gICAgICAgIGZvciAobGV0IHN0eWxlIG9mIHN0eWxlcykge1xuXG4gICAgICAgICAgICBsZXQgbmV3U3R5bGUgPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxuICAgICAgICAgICAgbmV3U3R5bGVBcnJheSArPSBuZXdTdHlsZSArIFwiO1wiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld1N0eWxlQXJyYXlcblxuICAgIH1cbiAgICBzdGF0aWMgaXNQbGFjZUhvbGRlcihjb250ZW50KSB7XG4gICAgICAgIGlmIChjb250ZW50KSB7XG4gICAgICAgICAgICBpZiAoL14lI1xcdyouXFx3KiMlJC8udGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGlzRG90T3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQpe1xuICAgICAgICByZXR1cm4gL15cXHcqLlxcdyokLy50ZXN0KGNvbnRlbnQpXG4gICAgfVxuICAgIHN0YXRpYyBnZXRQbGFjZUhvbGRlclZhbHVlKGNvbnRlbnQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuc2xpY2UoMiwgLTIpXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOaYr+WQpuS4uuihqOi+vuW8j1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZW50IFxuICAgICAqL1xuICAgIHN0YXRpYyBpc09wZXJhdG9yRXhwcmVzc2lvbihjb250ZW50KSB7XG5cbiAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoY29udGVudCkpIHtcbiAgICAgICAgICAgIGlmICgvXntcXHcqfSQvLnRlc3QoY29udGVudCkpIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHN0YXRpYyBnZXRPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCwgZGF0YSwgZGF0YUtleSkge1xuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xuXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXG4gICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IGV4cHJlc3Npb24uaW5kZXhPZihcIiUjXCIpXG4gICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBleHByZXNzaW9uLmluZGV4T2YoXCIjJVwiKSArIDJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uLHN0YXJ0SW5kZXg6XCIgKyAoc3RhcnRJbmRleCkgKyBcIixlbmRJbmRleDpcIiArIChlbmRJbmRleCkgKyBcIixleHByZXNzOlwiICsgZXhwcmVzc2lvbilcbiAgICAgICAgICAgIGlmIChzdGFydEluZGV4ICE9IC0xICYmIGVuZEluZGV4ICE9IC0xICYmIHN0YXJ0SW5kZXggPCBlbmRJbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBwbGFjZUhvbGRlciA9IGV4cHJlc3Npb24uc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRPcGVyYXRvckV4cHJlc3Npb24scGxhY2VIb2xkZXI6XCIgKyBwbGFjZUhvbGRlciArIFwiLGV4cHJlc3M6XCIgKyBleHByZXNzaW9uKVxuICAgICAgICAgICAgICAgIGxldCByZWFsVmFsdWVcbiAgICAgICAgICAgICAgICBpZiAocGxhY2VIb2xkZXIuaW5kZXhPZihcIi5cIikgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChSVi5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMF0gPT09IGRhdGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZUhvbGRlclZhbHVlID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKHBsYWNlSG9sZGVyKS5zcGxpdChcIi5cIilbMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBVdGlsLmlzTnVtYmVyKHBsYWNlSG9sZGVyVmFsdWUpID8gcGxhY2VIb2xkZXJWYWx1ZSA6IGBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWFsVmFsdWUgLDEsOlwiICsgcmVhbFZhbHVlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWxWYWx1ZSA9IGRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcildLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlYWxWYWx1ZSAsMiw6XCIgKyByZWFsVmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IGV4cHJlc3Npb24ucmVwbGFjZShwbGFjZUhvbGRlciwgcmVhbFZhbHVlKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4cHJlc3Npb24scmVhbFZhbHVlOlwiICsgZXhwcmVzc2lvbilcbiAgICAgICAgICAgIHJldHVybiBldmFsKGV4cHJlc3Npb24pXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJWIl0sInNvdXJjZVJvb3QiOiIifQ==