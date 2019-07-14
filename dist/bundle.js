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

                    var obj = _this5.vdom2rdom(dom, data, dataSingle, data);

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
                    childDomDatakey = undefined;
                }

                var obj = this.vdom2rdom(dom, data, childDomDatakey, this.data);

                return obj;
            }
        }
    }, {
        key: 'vdom2rdom',
        value: function vdom2rdom(dom, data, dataSingle, tdata) {
            console.log("vdom2rdom:" + JSON.stringify(data));
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
                        obj.props[value] = this.handleArrayStyle(data, styles, dataSingle);
                    } else {

                        obj.props[value] = this.handleSingleStyle(data, style, dataSingle);
                    }
                } else {
                    if (RV.isPlaceHolder(dom.props[value])) {
                        console.log('dom.props[value]:' + dom.props[value] + ',RV.getPlaceHolderValue(dom.props[value])):' + RV.isDotOperatorExpression(RV.getPlaceHolderValue(dom.props[value])));
                        if (!RV.isDotOperatorExpression(RV.getPlaceHolderValue(dom.props[value]))) {
                            console.log("rdata:" + tdata[RV.getPlaceHolderValue(dom.props[value])]);
                            obj.props[value] = tdata[RV.getPlaceHolderValue(dom.props[value])];
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
                            obj.children[child] = tdata[RV.getPlaceHolderValue(dom.children[child])];
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

                    obj.children[child] = this.applyTruthfulData(dom.children[child]);
                }
            }
            return obj;
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
            return (/^\w*\.\w*$/.test(content)
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
                if (/^\{\w*|\|\%+\}$/.test(content)) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2FsZW5kYXJEZW1vLmpzIiwid2VicGFjazovLy8uL3NyYy9SVmNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9sdW5hci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwic2VsZWN0RGF0ZSIsImFsZXJ0IiwiZ2VuZXJhdGVWaWV3IiwiQ2FsZW5kYXIiLCJtb250aHMiLCJBcnJheSIsImRheUNvdW50cyIsImRheXMiLCJ0b2RheSIsImdldFRvZGF5IiwieWVhciIsIm1vbnRoIiwibmV3Q2FsIiwiRGF0ZSIsInNlbGVjdERheSIsImRheSIsInN0YXJ0RGF5IiwiZGFpbHkiLCJydiIsInVuZGVmaW5lZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwcm90b3R5cGUiLCJnZXRXZWVrcyIsImdldERheSIsImdldERheUNvdW50cyIsIndlZWtzIiwiaSIsImRheUluV2Vla3MiLCJpZCIsImoiLCJfY2VsbE9iaiIsImNvbnRlbnQiLCJzdHlsZSIsImxhYmxlIiwibHVuYXIiLCJsdW5hckNhbGVuZGFyIiwiZ2V0THVuYXIiLCJsdW5hckluZm8iLCJjYWxlbmRhcmljaXR5Iiwic29sYXJIb2xpZGF5IiwibHVuYXJIb2xpZGF5IiwiY2hpbmFEYXkiLCJjaGluYU1vbnRoIiwicHVzaCIsIl9vYmoiLCJub3ciLCJnZXREYXRlIiwic3ViTW9udGgiLCJjb25zb2xlIiwibG9nIiwiYWRkTW9udGgiLCJzZXRNb250aCIsInNldFllYXIiLCJtb3VzZU92ZXIiLCJlbGVtZW50IiwiY29sb3IiLCJtb3VzZU91dCIsImxhYmVsIiwiZ2V0QXR0cmlidXRlIiwibUNhbGVuZGFyIiwiY2xpY2tEYXkiLCJpbm5lclRleHQiLCJjaGlsZHJlbiIsImVsIiwiY2FsbGJhY2siLCJSViIsImRhdGEiLCJ3ZWVrVGl0bGVzIiwidmFsdWUiLCJkb20iLCJ0YWciLCJwcm9wcyIsImJvcmRlciIsImNlbGxwYWRkaW5nIiwiY2VsbHNwYWNpbmciLCJrZXkiLCJhbGlnbiIsInZhbGlnbiIsImNvbHNwYW4iLCJvbmNsaWNrIiwibmFtZSIsInR5cGUiLCJtYXhsZW5ndGgiLCJzaXplIiwiZm9yIiwiZG9tRGF0YSIsIm9uTW91c2VvdmVyIiwib25Nb3VzZU91dCIsImNoaWxkRG9tRGF0YSIsInRpbWUiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInNldCIsIm52YWx1ZSIsImdldCIsIkx1bmFyQ2FsZW5kYXIiLCJfeWVhckluZm8iLCJfYXN0cm9sb2d5IiwiX2RheUluTW9udGgiLCJfVGlhbkdhbiIsIl9EaVpoaSIsIl9ab2RpYWMiLCJfY2FsZW5kYXJpY2l0eSIsIl9sdW5hckhvbGlkYXkiLCJfc29sYXJIb2xpZGF5IiwiX2NhbGVuZGFyaWNpdHlUYWJsZSIsIl9jaGluZXNlQ2hhciIsIl9jaGluZXNlVGVuQ2hhciIsIl9sdW5hck1vbnRoVGFibGUiLCJzdW0iLCJfbGVhcERheXNJbkx1bmFyWWVhciIsIl9sZWFwTW9udGhJbkx1bmFyWWVhciIsIm1zIiwiZ2FuS2V5IiwiemhpS2V5IiwiY01vbnRoIiwiY0RheSIsImFyciIsIm9mZnNldCIsImluZGV4IiwiX3RhYmxlIiwiX2NhbGVuZGFyaWNpdHlJbmZvIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJ0b1N0cmluZyIsIl9jYWxkYXkiLCJzIiwiTWF0aCIsImZsb29yIiwibHVuYXJIb2xpZGF5U3RyIiwiZm9yRWFjaCIsImxkIiwic3BsaXQiLCJsZHYiLCJsbW9udGhfdiIsImxkYXlfdiIsImxtZCIsInRyaW0iLCJzb2xhckhvbGlkYXlTdHIiLCJzZCIsInNvbGFyIiwic2R2Iiwic21vbnRoX3YiLCJzZGF5X3YiLCJzbWQiLCJmaXJzdENhbGVuZGFyaWNpdHlEYXkiLCJzZWNvbmRDYWxlbmRhcmljaXR5RGF5Iiwibm93U2VsZWN0RGF5Iiwibm93U2VsZWN0TW9udGgiLCJjYWxlbmRhcmljaXR5U3RyIiwic29sYXJZZWFyIiwic29sYXJNb250aCIsInNvbGFyRGF5Iiwibm93U2VsZWN0RGF0ZSIsIm5vd1NlbGVjdFllYXIiLCJVVEMiLCJ0ZW1wWWVhciIsImxlYXAiLCJ0ZW1wIiwiX2x1bmFyWWVhckRheXMiLCJpc1RvZGF5T2JqIiwiaXNUb2RheSIsIm5XZWVrIiwiY1dlZWsiLCJpc0xlYXAiLCJ0ZW1wTW9udGgiLCJfbW9udGhEYXlzIiwic20iLCJnYW5aaGlZZWFyIiwiX2dldEdhblpoaVllYXIiLCJfZmlyc3RDYWxlbmRhcmljaXR5RGF5IiwiX2dldENhbGVuZGFyaWNpdHkiLCJfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSIsImdhblpoaU1vbnRoIiwiX2dldEdhblpoaSIsIl9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkiLCJkYXlDeWNsaWNhbCIsImdhblpoaURheSIsImFzdHJvIiwiX2dldEFzdHJvbG9neSIsInpvZGlhYyIsIl9nZXRab2RpYWMiLCJfZ2V0Q2hpbmFNb250aCIsIl9nZXRDaGluYURheSIsIl9nZXRMdW5hckhvbGlkYXkiLCJfZ2V0U29sYXJIb2xpZGF5IiwiTk9ERV9SRVBMQUNFIiwiQ0hJTERfUkVfT1JERVIiLCJOT0RFX1BST1BTIiwiTk9ERV9DT05URU5UIiwiRWxlbWVudCIsInRhZ05hbWUiLCJFcnJvciIsImNvdW50IiwiY2hpbGQiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wTmFtZSIsIlV0aWwiLCJzZXRBdHRyIiwiY2hpbGRFbCIsInJlbmRlciIsImNyZWF0ZVRleHROb2RlIiwiYXBwZW5kQ2hpbGQiLCJEaWZmIiwib2xkVHJlZSIsIm5ld1RyZWUiLCJwYXRjaGVzIiwiZGZzV2FsayIsIm9sZE5vZGUiLCJuZXdOb2RlIiwiY3VycmVudFBhdGNoIiwiaXNTdHJpbmciLCJwcm9wc1BhdGNoZXMiLCJkaWZmUHJvcHMiLCJpc0lnbm9yZUNoaWxkcmVuIiwiZGlmZkNoaWxkcmVuIiwibm9kZSIsImxlbmd0aCIsIm9sZFByb3BzIiwibmV3UHJvcHMiLCJpc1NhbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm9sZENoaWxkcmVuIiwibmV3Q2hpbGRyZW4iLCJkaWZmTGlzdCIsIkRpZmZMaXN0IiwiZGlmZnMiLCJnZXRSZXN1bHQiLCJtb3ZlcyIsInJlb3JkZXJQYXRjaCIsImxlZnROb2RlIiwiY3VycmVudE5vZGVJbmRleCIsIm5ld0NoaWxkIiwiUGF0Y2giLCJ3YWxrZXIiLCJjdXJyZW50UGF0Y2hlcyIsImxlbiIsImNoaWxkTm9kZXMiLCJhcHBseVBhdGNoZXMiLCJjdXJyZW50UGF0Y2hlIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsInJlb3JkZXJDaGlsZHJlbiIsInNldFByb3BzIiwidGV4dENvbnRlbnQiLCJub2RlVmFsdWUiLCJzdGF0aWNOb2RlTGlzdCIsInRvQXJyYXkiLCJub2RlTWFwcyIsInNub2RlIiwibm9kZVR5cGUiLCJtb3ZlIiwicmVtb3ZlQ2hpbGQiLCJzcGxpY2UiLCJpbnNlcnROb2RlIiwiaXRlbSIsImNsb25lTm9kZSIsImluc2VydEJlZm9yZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNvbWUiLCJsaXN0IiwiYXJyYXkiLCJkaXJlY3Rpb24iLCJ0ZXN0IiwicmVOdW1iZXIiLCJyZU5lTnVtYmVyIiwicmVSZWFsTnVtYmVyMSIsInJlUmVhbE51bWJlcjIiLCJyZU5lUmVhbE51bWJlcjEiLCJyZU5lUmVhbE51bWJlcjIiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJzbGljZSIsInJlbW92ZSIsInJlbW92ZUNvcHlUZW1wTGlzdCIsIm5JdGVtIiwibkl0ZW1LZXkiLCJjSXRlbSIsImNJdGVtS2V5IiwiY05leHRJdGVtS2V5IiwiaW5zZXJ0IiwiayIsIml0ZW1LZXkiLCJvYnNlcnZlIiwib2JqIiwib2JzZXJ2ZU1hcCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJhZGQiLCJuZXdWYWwiLCJjaGFuZ2VkIiwiaW52b2tlIiwidXBkYXRlRnVuY3Rpb25zIiwiU2V0Iiwib2JzZXJ2YWJsZVVwZGF0ZSIsImZ1biIsImNsb25lIiwiZ2V0VHlwZSIsIm8iLCJjYWxsIiwicmVzdWx0Iiwib0NsYXNzIiwiY29weSIsImFyZ3VtZW50cyIsImNhbGxlZSIsImgiLCJkaWZmIiwiZCIsInBhdGNoIiwiTWFwIiwibWFwIiwib3B0aW9uIiwicm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJ2ZSIsImdldFZpcnR1YWxFbGVtZW50IiwiYXBwbHlUcnV0aGZ1bERhdGEiLCJ3IiwidXBkYXRlZG9tIiwibnZlIiwiY2MiLCJ2IiwiYyIsImRhdGFBcnJheSIsImlzRm9yRm9yIiwiZGF0YVNpbmdsZSIsImlzRm9ySW4iLCJjaGlsZERvbURhdGFrZXkiLCJkb21EYXRhS2V5Iiwib2JqcyIsInZkb20ycmRvbSIsInRkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsInByb3AiLCJpbmRleE9mIiwic3R5bGVzIiwiaGFuZGxlQXJyYXlTdHlsZSIsImhhbmRsZVNpbmdsZVN0eWxlIiwiaXNQbGFjZUhvbGRlciIsImlzRG90T3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsImlzT3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uIiwibmV3U3R5bGUiLCJzdHlsZUtleSIsInN0eWxlVmFsdWUiLCJuZXdTdHlsZUFycmF5IiwiZGF0YUtleSIsImV4cHJlc3Npb24iLCJzdGFydEluZGV4IiwiZW5kSW5kZXgiLCJwbGFjZUhvbGRlciIsInJlYWxWYWx1ZSIsInBsYWNlSG9sZGVyVmFsdWUiLCJpc051bWJlciIsInJlcGxhY2UiLCJldmFsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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UyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2FsZW5kYXJEZW1vLmpzXCIpO1xuIiwiaW1wb3J0IGdlbmVyYXRlVmlldyBmcm9tICcuL3NyYy9SVmNhbGVuZGFyJ1xyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2VuZXJhdGVWaWV3KFwiI2FwcFwiLCBmdW5jdGlvbiAoc2VsZWN0RGF0ZSkge1xyXG4gICAgICAgIGFsZXJ0KFwic2VsZWN0RGF0ZSw6XCIrc2VsZWN0RGF0ZSlcclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgUlYgZnJvbSAnLi9ydidcclxuaW1wb3J0IGx1bmFyQ2FsZW5kYXIgZnJvbSAnLi9sdW5hcidcclxuXHJcbi8qKlxyXG4gKiAgXHJcbiAqL1xyXG5mdW5jdGlvbiBDYWxlbmRhcigpIHtcclxuICAgIHRoaXMubW9udGhzID0gbmV3IEFycmF5KFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCIsIFwi5Y2BXCIsIFwi5Y2B5LiAXCIsIFwi5Y2B5LqMXCIpO1xyXG4gICAgdGhpcy5kYXlDb3VudHMgPSBuZXcgQXJyYXkoMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMSk7XHJcbiAgICB0aGlzLmRheXMgPSBuZXcgQXJyYXkoXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIik7XHJcbiAgICB0aGlzLnRvZGF5ID0gdGhpcy5nZXRUb2RheSgpO1xyXG4gICAgdGhpcy55ZWFyID0gdGhpcy50b2RheS55ZWFyO1xyXG4gICAgdGhpcy5tb250aCA9IHRoaXMudG9kYXkubW9udGg7XHJcbiAgICB0aGlzLm5ld0NhbCA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLnNlbGVjdERheSA9IHRoaXMubmV3Q2FsO1xyXG4gICAgdGhpcy5kYXkgPSAtMTtcclxuICAgIHRoaXMuc3RhcnREYXkgPSAwO1xyXG4gICAgdGhpcy5kYWlseSA9IDA7XHJcbiAgICB0aGlzLnJ2ID0gdW5kZWZpbmVkXHJcbiAgICBpZiAoKHRoaXMudG9kYXkueWVhciA9PSB0aGlzLm5ld0NhbC5nZXRGdWxsWWVhcigpKSAmJiAodGhpcy50b2RheS5tb250aCA9PSB0aGlzLm5ld0NhbC5nZXRNb250aCgpKSkge1xyXG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy50b2RheS5kYXk7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldFdlZWtzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5uZXdDYWwgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIDEpO1xyXG4gICAgdGhpcy5kYXkgPSAtMTtcclxuICAgIHRoaXMuc3RhcnREYXkgPSB0aGlzLm5ld0NhbC5nZXREYXkoKTtcclxuICAgIHRoaXMuZGFpbHkgPSAwO1xyXG4gICAgaWYgKCh0aGlzLnRvZGF5LnllYXIgPT0gdGhpcy5uZXdDYWwuZ2V0RnVsbFllYXIoKSkgJiYgKHRoaXMudG9kYXkubW9udGggPT0gdGhpcy5uZXdDYWwuZ2V0TW9udGgoKSkpIHtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMudG9kYXkuZGF5O1xyXG4gICAgfVxyXG4gICAgdmFyIGRheUNvdW50cyA9IHRoaXMuZ2V0RGF5Q291bnRzKHRoaXMubmV3Q2FsLmdldE1vbnRoKCksIHRoaXMubmV3Q2FsLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgdmFyIHdlZWtzID0gW11cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRheUluV2Vla3MgPSBbXVxyXG4gICAgICAgIGRheUluV2Vla3MuaWQgPSBgd2Vla19yb3dfJHtpfWBcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICB2YXIgX2NlbGxPYmogPSB7fVxyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IFwiXCJcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gXCJcIlxyXG4gICAgICAgICAgICB2YXIgbGFibGUgPSBcIlwiXHJcbiAgICAgICAgICAgIHZhciBpZCA9IGB3ZWVrX2RheV8ke2l9JHtqfWBcclxuICAgICAgICAgICAgaWYgKChqID09IHRoaXMuc3RhcnREYXkpICYmICgwID09IHRoaXMuZGFpbHkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF5ID09IHRoaXMuZGFpbHkpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJmb250LXdlaWdodDpib2xkO2NvbG9yOiNGRkZGRkY7YmFja2dyb3VuZC1jb2xvcjojNUNCQTVBO2hlaWdodDoyMHB4O3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJjdXJyZW50XCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChqID09IDYpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojRkYwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6MThweDt3aWR0aDoxMiVcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcInNhdFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6ICNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojRTVFOUYyO3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDoxOHB4O3dpZHRoOjEyJVwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwic3VuXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojMjQzRjY1O2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjtoZWlnaHQ6MjBweDt3aWR0aDoxMSU7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcIm5vcm1hbFwiXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuZGFpbHkgPiAwKSAmJiAodGhpcy5kYWlseSA8PSBkYXlDb3VudHMpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5kYWlseSArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6IzAwMDAwMDtiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O2hlaWdodDoyMHB4O3dpZHRoOiAxMSU7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmlkID0gaWRcclxuICAgICAgICAgICAgX2NlbGxPYmoubGFibGUgPSBsYWJsZVxyXG4gICAgICAgICAgICBfY2VsbE9iai5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIGxldCBsdW5hciA9IGx1bmFyQ2FsZW5kYXIuZ2V0THVuYXIodGhpcy55ZWFyLCB0aGlzLm1vbnRoKzEsIGNvbnRlbnQpXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmlkID0gaWRcclxuICAgICAgICAgICAgX2NlbGxPYmoubGFibGUgPSBsYWJsZVxyXG4gICAgICAgICAgICBfY2VsbE9iai5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIGxldCBsdW5hckluZm8gPSBcIlwiXHJcbiAgICAgICAgICAgIGlmIChsdW5hci5jYWxlbmRhcmljaXR5ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLmNhbGVuZGFyaWNpdHlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobHVuYXIuc29sYXJIb2xpZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5zb2xhckhvbGlkYXlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobHVuYXIubHVuYXJIb2xpZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5sdW5hckhvbGlkYXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGx1bmFyLmNoaW5hRGF5PT09XCLliJ3kuIBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIuY2hpbmFNb250aCBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGx1bmFySW5mbz0gbHVuYXIuY2hpbmFEYXlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjb250ZW50ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgX2NlbGxPYmoubHVuYXJJbmZvID0gbHVuYXJJbmZvXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgX2NlbGxPYmoubHVuYXJJbmZvID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRheUluV2Vla3MucHVzaChfY2VsbE9iailcclxuICAgICAgICB9XHJcbiAgICAgICAgd2Vla3MucHVzaChkYXlJbldlZWtzKVxyXG4gICAgICAgIHdpbmRvdy53ZWVrcyA9IHdlZWtzXHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2Vla3NcclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuZ2V0RGF5Q291bnRzID0gZnVuY3Rpb24gKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICBpZiAoMSA9PSBtb250aCkge1xyXG4gICAgICAgIHJldHVybiAoKDAgPT0geWVhciAlIDQpICYmICgwICE9ICh5ZWFyICUgMTAwKSkpIHx8ICgwID09IHllYXIgJSA0MDApID8gMjkgOiAyOFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXlDb3VudHNbbW9udGhdXHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldFRvZGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9vYmogPSB7fVxyXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBfb2JqLm5vdyA9IG5vd1xyXG4gICAgX29iai55ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBfb2JqLm1vbnRoID0gbm93LmdldE1vbnRoKCk7XHJcbiAgICBfb2JqLmRheSA9IG5vdy5nZXREYXRlKCk7XHJcbiAgICByZXR1cm4gX29ialxyXG59XHJcblxyXG5DYWxlbmRhci5wcm90b3R5cGUuc3ViTW9udGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoKHRoaXMubW9udGggLSAxKSA8IDApIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gMTE7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gdGhpcy55ZWFyIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IHRoaXMubW9udGggLSAxO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXCJtb250aDpcIiArIHRoaXMubW9udGgpXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmFkZE1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCh0aGlzLm1vbnRoICsgMSkgPiAxMSkge1xyXG4gICAgICAgIHRoaXMubW9udGggPSAwO1xyXG4gICAgICAgIHRoaXMueWVhciA9IHRoaXMueWVhciArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9udGggPSB0aGlzLm1vbnRoICsgMTtcclxuICAgIH1cclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuc2V0TW9udGggPSBmdW5jdGlvbiAobW9udGgpIHtcclxuICAgIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xyXG4gICAgICAgIGFsZXJ0KFwi5pyI5Lu95b+F6aG75ZyoMS0xMuS5i+mXtCFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb250aCA9IG1vbnRoXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLnNldFllYXIgPSBmdW5jdGlvbiAoeWVhcikge1xyXG4gICAgdGhpcy55ZWFyID0geWVhclxyXG59XHJcblxyXG5cclxud2luZG93Lm1vdXNlT3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkZGRkZGXCJcclxufVxyXG5cclxud2luZG93Lm1vdXNlT3V0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIHZhciBsYWJlbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsYWJsZScpXHJcbiAgICBpZiAobGFiZWwgPT0gJ3NhdCcgfHwgbGFiZWwgPT0gJ3N1bicpIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkYwMDAwXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiXHJcbiAgICB9XHJcblxyXG59XHJcbmxldCBtQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoKVxyXG53aW5kb3cubUNhbGVuZGFyID0gbUNhbGVuZGFyXHJcbndpbmRvdy5jbGlja0RheSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudC5pbm5lclRleHQgIT0gJycpIHtcclxuICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUobUNhbGVuZGFyLnllYXIsIG1DYWxlbmRhci5tb250aCwgZWxlbWVudC5jaGlsZHJlblswXS5pbm5lclRleHRcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIG1DYWxlbmRhci5zZWxlY3REYXkgPSBkYXlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGVWaWV3KGVsLCBjYWxsYmFjaykge1xyXG5cclxuICAgIHZhciB3ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICBsZXQgcnYgPSBuZXcgUlYoe1xyXG4gICAgICAgIGVsOiBlbCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHllYXI6ICcnICsgbUNhbGVuZGFyLnllYXIsXHJcbiAgICAgICAgICAgIG1vbnRoOiAnJyArIChtQ2FsZW5kYXIubW9udGggKyAxKSxcclxuICAgICAgICAgICAgd2Vla1RpdGxlczogW3tcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXkxXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkuIBcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5MlwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LqMXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTNcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS4iVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXk0XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLlm5tcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5NVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LqUXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgd2Vla3M6IHdlZWtzXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkb206IHtcclxuICAgICAgICAgICAgdGFnOiBcInRhYmxlXCIsXHJcbiAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICBib3JkZXI6IDAsXHJcbiAgICAgICAgICAgICAgICBjZWxscGFkZGluZzogJzAnLFxyXG4gICAgICAgICAgICAgICAgY2VsbHNwYWNpbmc6ICcxJyxcclxuICAgICAgICAgICAgICAgIGlkOiAnY2FsdGFibGUnLFxyXG4gICAgICAgICAgICAgICAga2V5OiAndGFibGUnLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6ICd0ZXh0LWRlY29yYXRpb246bm9uZTt3aWR0aDoyMDA7YmFja2dyb3VuZC1jb2xvcjojRDBEMEVFO2ZvbnQtc2l6ZTo4cHQ7Ym9yZGVyOjBweCBkb3R0ZWQgIzFDNkZGNTsnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcInRoZWFkXCIsXHJcbiAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJ0aGVhZFwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAndHInLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZ246IFwibWlkZGxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBcInRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJ0aXRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2ZvbnQtd2VpZ2h0Om5vcm1hbDtoZWlnaHQ6MjRweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojMzMzMzMzO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0E0QjlENztib3JkZXItdG9wLXdpZHRoOjFweDtib3JkZXItcmlnaHQtd2lkdGg6MXB4O2JvcmRlci1ib3R0b20td2lkdGg6IDFweDsgYm9yZGVyLWxlZnQtd2lkdGg6IDFweDtib3JkZXItYm90dG9tLXN0eWxlOiAxcHg7Ym9yZGVyLXRvcC1jb2xvcjogIzk5OTk5OTtib3JkZXItcmlnaHQtY29sb3I6ICM5OTk5OTk7Ym9yZGVyLWJvdHRvbS1jb2xvcjojOTk5OTk5O2JvcmRlci1sZWZ0LWNvbG9yOiM5OTk5OTk7J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHNwYW46IFwiN1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAndGRUaXRsZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdkaXYnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICd0aXRsZURpdidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IFwibUNhbGVuZGFyLnN1Yk1vbnRoKClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXdlaWdodDpib2xkOyBjb2xvcjojMjQzRjY1O2N1cnNvcjpoYW5kO3RleHQtZGVjb3JhdGlvbjpub25lO21hcmdpbi1yaWdodDoyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInN1YkJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiPFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJpbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwieWVhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBcIjRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXNpemU6IDlwdDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO2JhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7aGVpZ2h0OiAyMHB4O2JvcmRlcjogMXB4IHNvbGlkICM2NjY2NjY7IGNvbG9yOiAjMDAwMDAwO3RleHQtYWxpZ246Y2VudGVyOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IFwiNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJyUjeWVhciMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImlucHV0WWVhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb250aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBcIjJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICclI21vbnRoIyUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2ZvbnQtc2l6ZTogOXB0OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7YmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtoZWlnaHQ6IDIwcHg7Ym9yZGVyOiAxcHggc29saWQgIzY2NjY2NjsgY29sb3I6ICMwMDAwMDA7dGV4dC1hbGlnbjpjZW50ZXI7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpbnB1dE1vbnRoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IFwibUNhbGVuZGFyLmFkZE1vbnRoKClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXdlaWdodDogYm9sZDtjb2xvcjogIzI0M0Y2NTtjdXJzb3I6IGhhbmQ7dGV4dC1kZWNvcmF0aW9uOiBub25lO21hcmdpbi1sZWZ0OjIwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiYWRkQnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCI+XCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdkYXl0cidcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2NvbG9yOiAjRkYwMDAwO3RleHQtZGVjb3JhdGlvbjogbm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiAjQzBEMEU4O3RleHQtYWxpZ246IGNlbnRlcjtoZWlnaHQ6IDIwcHg7d2lkdGg6IDEyJTsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnZGF5U3VuVGl0bGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCLml6VcIl0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2NvbG9yOiMwMDAwMDA7YmFja2dyb3VuZC1jb2xvcjojQzBEMEU4O2hlaWdodDoyMHB4O3dpZHRoOjExJTt0ZXh0LWFsaWduOmNlbnRlcjsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIiUjdi5pZCMlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3I6IFwidiBfaW5fIHdlZWtUaXRsZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiJSN2LnZhbHVlIyVcIl1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICcgY29sb3I6I0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNDMEQwRTg7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OiAyMHB4O3dpZHRoOiAxMiU7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2RheVNhdFRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wi5YWtXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwidGJvZHlcIixcclxuICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbHNwYWNpbmc6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxwYWRkaW5nOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICBpZDogXCJjYWxlbmRhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnIHRleHQtZGVjb3JhdGlvbjogbm9uZTt3aWR0aDogMTcwO2JhY2tncm91bmQtY29sb3I6ICNDMEQwRTg7Zm9udC1zaXplOiA5cHQ7Ym9yZGVyOiAwcHggZG90dGVkICMxQzZGQTU7JyxcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGtleTogXCJ0Ym9keVwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAndHInLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY3Vyc29yOmhhbmQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiJSN3ZWVrLmlkIyVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yOiAnd2VlayBfaW5fIHdlZWtzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9tRGF0YTpcIndlZWtcIlxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiJSN2LmlkIyVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6ICdjbGlja0RheSh0aGlzKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJyUjdi5zdHlsZSMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmxlOiAnJSN2LmxhYmxlIyUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZW92ZXI6ICdtb3VzZU92ZXIodGhpcyk7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ6ICdtb3VzZU91dCh0aGlzKTsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGREb21EYXRhOlwidlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yOiAndiBfaW5fIHdlZWsnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJ7JSN2LmlkIyUrJ19jb250ZW50J31cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTpcIm1hcmdpbi1ibG9jay1zdGFydDogMGVtO21hcmdpbi1ibG9jay1lbmQ6IDBlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiJSN2LmNvbnRlbnQjJVwiXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcInBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInslI3YuaWQjJSsnX2x1bmFySW5mbyd9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTpcIntuZXcgRGF0ZSgpfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOlwibWFyZ2luLWJsb2NrLXN0YXJ0OiAwZW07bWFyZ2luLWJsb2NrLWVuZDogMGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCIlI3YubHVuYXJJbmZvIyVcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LF1cclxuICAgICAgICAgICAgICAgIH0sXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBtb250aCA9IG1DYWxlbmRhclsnbW9udGgnXVxyXG4gICAgbGV0IHllYXIgPSBtQ2FsZW5kYXJbJ3llYXInXVxyXG4gICAgbGV0IHNlbGVjdERheSA9IG1DYWxlbmRhclsnc2VsZWN0RGF5J11cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICdtb250aCcsIHtcclxuXHJcbiAgICAgICAgc2V0KG52YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld01vbnRoOlwiICsgbnZhbHVlKVxyXG4gICAgICAgICAgICBpZiAobW9udGggIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IG52YWx1ZVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS53ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLm1vbnRoID0gKG52YWx1ZSArIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICd5ZWFyJywge1xyXG4gICAgICAgIHNldChudmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld1llYXI6XCIgKyBudmFsdWUpXHJcbiAgICAgICAgICAgICAgICB5ZWFyID0gbnZhbHVlXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLndlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEueWVhciA9IG52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4geWVhclxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1DYWxlbmRhciwgJ3NlbGVjdERheScsIHtcclxuICAgICAgICBzZXQobnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3REYXkgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3REYXkgPSBudmFsdWVcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0RGF5XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImNsYXNzIEx1bmFyQ2FsZW5kYXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHRcclxuICAgICAqIFxyXG4gICAgICog5Yac5Y6GMTkwMC0yMTAw55qE5ram5pyI5L+h5oGv6KGoIFxyXG4gICAg5Y2B5YWt6L+b5Yi25b2i5byPOlxyXG4gICAgMHggeHh4eHggICAgXHJcbiAgICDkuozov5vliLblvaLlvI86XHJcbiAgICB4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHJcbiAgICAyMC0xN1x0MTYtMTJcdDEyLTlcdDgtNVx0ICAgIDQtMVxyXG7CoFxyXG4gICAgMS00OiDooajnpLrlvZPlubTmnInml6Dpl7DlubTvvIzmnInnmoTor53vvIzkuLrpl7DmnIjnmoTmnIjku73vvIzmsqHmnInnmoTor53vvIzkuLow44CCXHJcblxyXG4gICAgNS0xNu+8muS4uumZpOS6humXsOaciOWklueahOato+W4uOaciOS7veaYr+Wkp+aciOi/mOaYr+Wwj+aciO+8jDHkuLozMOWkqe+8jDDkuLoyOeWkqeOAgijms6jmhI/vvJrku44x5pyI5YiwMTLmnIjlr7nlupTnmoTmmK/nrKwxNuS9jeWIsOesrDXkvY3jgIIpXHJcbiAgICAxNy0yMO+8miDooajnpLrpl7DmnIjmmK/lpKfmnIjov5jmmK/lsI/mnIjvvIzku4XlvZPlrZjlnKjpl7DmnIjnmoTmg4XlhrXkuIvmnInmhI/kuYnjgIJcclxuXHJcbiAgICDkuL7kuKrkvovlrZDvvJpcclxuXHJcbiAgICAxOTgw5bm055qE5pWw5o2u5piv77yaIDB4MDk1YjAgMHjku6PooajljYHlha3ov5vliLbvvIzlkI7pnaLnmoTmmK/ljYHlha3ov5vliLbmlbDjgIJcclxuICAgICAgICAgICAgIDEwMDAgMDAwMCAwMDAwIDAwMDAgMDAwMFxyXG4gICAgICAgICAgICAgMDAwMCAwMDAwIDAwMDAgMDAwMCAxMTExXHJcblxyXG4gICAg5LqM6L+b5Yi277yaICAwMDAwwqAxMDAxIDAxMDEgMTAxMSAwMDAwXHJcblxyXG4gICAg6KGo56S6MTk4MOW5tOayoeaciemXsOaciO+8jOS7jjHmnIjliLAxMuaciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEyOeOAgTMwIOOAgTI544CBMzDjgIEyOeOAgTMw44CBIDMw44CBMjnjgIEzMOOAgTMw44CCXHJcblxyXG4gICAgMTk4MuW5tOeahOaVsOaNruaYr++8mjB4MGE5NzRcclxuICAgICAgICAgMTAxMCAgIDEwMDEgMDExMSAwMTAwXHJcbiAgICAwMDAwIDEwMTAgMCAxMDAxIDAxMTEgMDEwMFxyXG5cclxuICAgIOihqOekujE5ODLlubTnmoQ05pyI5Li66Zew5pyI77yM5Y2z5pyJ56ys5LqM5LiqNOaciO+8jOS4lOaYr+mXsOWwj+aciOOAglxyXG5cclxuICAgIOS7jjHmnIjliLAxM+aciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEzMOOAgTI544CBwqAyOSjpl7DmnIgp44CBIDMw44CBMjnjgIEyOeOAgTMw44CBIDI544CBMzDjgIEzMOOAgTMw44CCXHJcblxyXG4gIFxyXG4gICogQEFycmF5IE9mIFByb3BlcnR5XHJcbiAgKiBAcmV0dXJuIEhleCBcclxuICAqL1xyXG4gICAgdGhpcy5feWVhckluZm8gPSBbMHgwNGJkOCwgMHgwNGFlMCwgMHgwYTU3MCwgMHgwNTRkNSwgMHgwZDI2MCwgMHgwZDk1MCwgMHgxNjU1NCwgMHgwNTZhMCwgMHgwOWFkMCwgMHgwNTVkMiwvLzE5MDAtMTkwOVxyXG4gICAgICAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAweDA5NWIwLCAweDE0OTc3LC8vMTkxMC0xOTE5XHJcbiAgICAgIDB4MDQ5NzAsIDB4MGE0YjAsIDB4MGI0YjUsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MWFiNTQsIDB4MDJiNjAsIDB4MDk1NzAsIDB4MDUyZjIsIDB4MDQ5NzAsLy8xOTIwLTE5MjlcclxuICAgICAgMHgwNjU2NiwgMHgwZDRhMCwgMHgwZWE1MCwgMHgwNmU5NSwgMHgwNWFkMCwgMHgwMmI2MCwgMHgxODZlMywgMHgwOTJlMCwgMHgxYzhkNywgMHgwYzk1MCwvLzE5MzAtMTkzOVxyXG4gICAgICAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LC8vMTk0MC0xOTQ5XHJcbiAgICAgIDB4MDZjYTAsIDB4MGI1NTAsIDB4MTUzNTUsIDB4MDRkYTAsIDB4MGE1YjAsIDB4MTQ1NzMsIDB4MDUyYjAsIDB4MGE5YTgsIDB4MGU5NTAsIDB4MDZhYTAsLy8xOTUwLTE5NTlcclxuICAgICAgMHgwYWVhNiwgMHgwYWI1MCwgMHgwNGI2MCwgMHgwYWFlNCwgMHgwYTU3MCwgMHgwNTI2MCwgMHgwZjI2MywgMHgwZDk1MCwgMHgwNWI1NywgMHgwNTZhMCwvLzE5NjAtMTk2OVxyXG4gICAgICAweDA5NmQwLCAweDA0ZGQ1LCAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNmEwLCAweDE5NWE2LC8vMTk3MC0xOTc5XHJcbiAgICAgIDB4MDk1YjAsIDB4MDQ5YjAsIDB4MGE5NzQsIDB4MGE0YjAsIDB4MGIyN2EsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MGFmNDYsIDB4MGFiNjAsIDB4MDk1NzAsLy8xOTgwLTE5ODlcclxuICAgICAgMHgwNGFmNSwgMHgwNDk3MCwgMHgwNjRiMCwgMHgwNzRhMywgMHgwZWE1MCwgMHgwNmI1OCwgMHgwNTVjMCwgMHgwYWI2MCwgMHgwOTZkNSwgMHgwOTJlMCwvLzE5OTAtMTk5OVxyXG4gICAgICAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAweDA5MmQwLCAweDBjYWI1LC8vMjAwMC0yMDA5XHJcbiAgICAgIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGJhYTQsIDB4MGFkNTAsIDB4MDU1ZDksIDB4MDRiYTAsIDB4MGE1YjAsIDB4MTUxNzYsIDB4MDUyYjAsIDB4MGE5MzAsLy8yMDEwLTIwMTlcclxuICAgICAgMHgwNzk1NCwgMHgwNmFhMCwgMHgwYWQ1MCwgMHgwNWI1MiwgMHgwNGI2MCwgMHgwYTZlNiwgMHgwYTRlMCwgMHgwZDI2MCwgMHgwZWE2NSwgMHgwZDUzMCwvLzIwMjAtMjAyOVxyXG4gICAgICAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YWZiLCAweDA0YWQwLCAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LC8vMjAzMC0yMDM5XHJcbiAgICAgIDB4MGI1YTAsIDB4MDU2ZDAsIDB4MDU1YjIsIDB4MDQ5YjAsIDB4MGE1NzcsIDB4MGE0YjAsIDB4MGFhNTAsIDB4MWIyNTUsIDB4MDZkMjAsIDB4MGFkYTAsLy8yMDQwLTIwNDlcclxuICAgICAgMHgxNGI2MywgMHgwOTM3MCwgMHgwNDlmOCwgMHgwNDk3MCwgMHgwNjRiMCwgMHgxNjhhNiwgMHgwZWE1MCwgMHgwNmIyMCwgMHgxYTZjNCwgMHgwYWFlMCwvLzIwNTAtMjA1OVxyXG4gICAgICAweDBhMmUwLCAweDBkMmUzLCAweDBjOTYwLCAweDBkNTU3LCAweDBkNGEwLCAweDBkYTUwLCAweDA1ZDU1LCAweDA1NmEwLCAweDBhNmQwLCAweDA1NWQ0LC8vMjA2MC0yMDY5XHJcbiAgICAgIDB4MDUyZDAsIDB4MGE5YjgsIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGI2YTYsIDB4MGFkNTAsIDB4MDU1YTAsIDB4MGFiYTQsIDB4MGE1YjAsIDB4MDUyYjAsLy8yMDcwLTIwNzlcclxuICAgICAgMHgwYjI3MywgMHgwNjkzMCwgMHgwNzMzNywgMHgwNmFhMCwgMHgwYWQ1MCwgMHgxNGI1NSwgMHgwNGI2MCwgMHgwYTU3MCwgMHgwNTRlNCwgMHgwZDE2MCwvLzIwODAtMjA4OVxyXG4gICAgICAweDBlOTY4LCAweDBkNTIwLCAweDBkYWEwLCAweDE2YWE2LCAweDA1NmQwLCAweDA0YWUwLCAweDBhOWQ0LCAweDBhMmQwLCAweDBkMTUwLCAweDBmMjUyLC8vMjA5MC0yMDk5XHJcbiAgICAgIDB4MGQ1MjBdLy8yMTAwXHJcblxyXG5cclxuICAgIHRoaXMuX2FzdHJvbG9neSA9IFtcIumtlOe+r1wiLCBcIuawtOeTtlwiLCBcIuWPjOmxvFwiLCBcIueZvee+ilwiLCBcIumHkeeJm1wiLCBcIuWPjOWtkFwiLCBcIuW3qOifuVwiLCBcIueLruWtkFwiLCBcIuWkhOWls1wiLCBcIuWkqeenpFwiLCBcIuWkqeidjlwiLCBcIuWwhOaJi1wiLCBcIumtlOe+r1wiXVxyXG4gICAgLyoqXHJcbiAgICAgICog5YWs5Y6G5q+P5Liq5pyI5Lu955qE5aSp5pWw5pmu6YCa6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9kYXlJbk1vbnRoID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlpKnlubLpgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX1RpYW5HYW4gPSBbXCLnlLJcIiwgXCLkuZlcIiwgXCLkuJlcIiwgXCLkuIFcIiwgXCLmiIpcIiwgXCLlt7FcIiwgXCLluppcIiwgXCLovptcIiwgXCLlo6xcIiwgXCLnmbhcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlnLDmlK/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX0RpWmhpID0gW1wi5a2QXCIsIFwi5LiRXCIsIFwi5a+FXCIsIFwi5Y2vXCIsIFwi6L6wXCIsIFwi5bezXCIsIFwi5Y2IXCIsIFwi5pyqXCIsIFwi55SzXCIsIFwi6YWJXCIsIFwi5oiMXCIsIFwi5LqlXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog55Sf6IKW6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9ab2RpYWMgPSBbXCLpvKBcIiwgXCLniZtcIiwgXCLomY5cIiwgXCLlhZRcIiwgXCLpvplcIiwgXCLom4dcIiwgXCLpqaxcIiwgXCLnvopcIiwgXCLnjLRcIiwgXCLpuKFcIiwgXCLni5dcIiwgXCLnjKpcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiAyNOiKguawlOmAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2FsZW5kYXJpY2l0eSA9IFtcIuWwj+WvklwiLCBcIuWkp+WvklwiLCBcIueri+aYpVwiLCBcIumbqOawtFwiLCBcIuaDiuibsFwiLCBcIuaYpeWIhlwiLCBcIua4heaYjlwiLCBcIuiwt+mbqFwiLCBcIueri+Wkj1wiLCBcIuWwj+a7oVwiLCBcIuiKkuenjVwiLCBcIuWkj+iHs1wiLCBcIuWwj+aakVwiLCBcIuWkp+aakVwiLCBcIueri+eni1wiLCBcIuWkhOaakVwiLCBcIueZvemcslwiLCBcIueni+WIhlwiLCBcIuWvkumcslwiLCBcIumcnOmZjVwiLCBcIueri+WGrFwiLCBcIuWwj+mbqlwiLCBcIuWkp+mbqlwiLCBcIuWGrOiHs1wiXVxyXG4gICAgLyoqXHJcbiAgICAgIOWGnOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX2x1bmFySG9saWRheSA9IFtcIjAxMDEg5pil6IqCXCIsIFwiMDExNSDlhYPlrrVcIiwgXCIwNTA1IOerr+WNiFwiLCBcIjA3MDcg5oOF5Lq6XCIsIFwiMDcxNSDkuK3lhYNcIixcclxuICAgICAgXCIwODE1IOS4reeni1wiLCBcIjA5MDkg6YeN6ZizXCIsIFwiMTIwOCDohYrlhatcIiwgXCIxMjI0IOWwj+W5tFwiLCBcIjEyMzAg6Zmk5aSVXCJdXHJcbiAgICAvKlxyXG4gICAgIOWFrOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX3NvbGFySG9saWRheSA9IFtcclxuICAgICAgXCIwMTAxIOWFg+aXplwiLCBcIjAyMTQg5oOF5Lq6XCIsIFwiMDMwOCDlpoflpbNcIiwgXCIwMzEyIOakjeagkVwiLCBcIjAzMTUg5raI6LS56ICF5p2D55uK5pelXCIsIFwiMDQwMSDmhJrkurpcIiwgXCIwNTAxIOWKs+WKqFwiLCBcIjA1MDQg6Z2S5bm0XCIsIC8vXHJcbiAgICAgIFwiMDUxMiDmiqTlo6tcIiwgXCIwNjAxIOWEv+erpVwiLCBcIjA3MDEg5bu65YWaXCIsIFwiMDgwMSDlu7rlhptcIiwgXCIwODA4IOeItuS6slwiLCBcIjA5MTAg5pWZ5biIXCIsIFwiMDkyOCDlrZTlrZDor57ovrBcIiwgLy9cclxuICAgICAgXCIxMDAxIOWbveW6hlwiLCBcIjEwMjQg6IGU5ZCI5Zu95pelXCIsIFwiMTExMiDlrZnkuK3lsbHor57ovrDnuqrlv7VcIiwgXCIxMjIwIOa+s+mXqOWbnuW9kue6quW/tVwiLCBcIjEyMjUg5Zyj6K+eXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogMTkwMC0yMTAw5ZCE5bm05Yac5Y6G55qEMjToioLmsJTml6XmnJ/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NhbGVuZGFyaWNpdHlUYWJsZSA9IFsnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJywgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLFxyXG4gICAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQxOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJywgJzk3YmQwOTgwMWQ5ODA4MmM5NWY4ZTFjZmNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGUxY2ZjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwN2Y1OTViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzkyNzRjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JkMDdmMTQ4N2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJywgJzk3YmNmN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiOTdiZDE5N2MzNmM5MjEwYzkyNzRjOTIwZScsICc5N2JjZjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNzBjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4MzdmMGUzN2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzIzYjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OTk4MDgzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZjA3ZTdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzNjY2NWI2NmFhODk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLFxyXG4gICAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JywgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOS4reaWh+aXpeacn1xyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2hpbmVzZUNoYXIgPSBbXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlhpzljobov5vliLbljZXkvY1cclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NoaW5lc2VUZW5DaGFyID0gW1wi5YidXCIsIFwi5Y2BXCIsIFwi5bu/XCIsIFwi5Y2FXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5pyI5Lu95Yac5Y6G6KGo56S6XHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9sdW5hck1vbnRoVGFibGUgPSBbXCLmraNcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIiwgXCLlhqxcIiwgXCLohYpcIl1cclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm05LiA5pW05bm055qE5oC75aSp5pWwXHJcbiAgICAqL1xyXG4gIF9sdW5hclllYXJEYXlzKHllYXIpIHtcclxuICAgIHZhciBpLCBzdW0gPSAzNDg7XHJcbiAgICBmb3IgKGkgPSAweDgwMDA7IGkgPiAweDg7IGkgPj49IDEpIHsgc3VtICs9ICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiBpKSA/IDEgOiAwOyB9XHJcbiAgICByZXR1cm4gKHN1bSArIHRoaXMuX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTlr7nlupTnmoTpl7DmnIhcclxuICAgICovXHJcbiAgX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpIHtcclxuICAgIHJldHVybiAodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgMHgwMDAwZik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ55bm06Zew5pyI55qE5aSp5pWwIOiLpeivpeW5tOayoeaciemXsOaciOWImei/lOWbnjBcclxuICAgICovXHJcbiAgX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikge1xyXG4gICAgaWYgKHRoaXMuX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpKSB7XHJcbiAgICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmIDB4MTAwMDApID8gMzAgOiAyOSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDApO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm0bW9udGjmnIjvvIjpnZ7pl7DmnIjvvInnmoTmgLvlpKnmlbDvvIxcclxuICAgICovXHJcbiAgX21vbnRoRGF5cyh5ZWFyLCBtb250aCkge1xyXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPCAxKSB7IHJldHVybiAtMSB9Ly/mnIjku73lj4LmlbDku44x6IezMTLvvIzlj4LmlbDplJnor6/ov5Tlm54tMVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiX21vbnRoRGF5czpcIiArICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiAoMHgxMDAwMCA+PiBtb250aCkpKVxyXG5cclxuICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPyAzMCA6IDI5KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWFrOWOhnllYXLlubRtb250aOaciOeahOWkqeaVsFxyXG4gICAgKi9cclxuICBfZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkgeyByZXR1cm4gLTEgfSAvL+iLpeWPguaVsOmUmeivryDov5Tlm54tMVxyXG4gICAgbGV0IG1zID0gbW9udGggLSAxO1xyXG4gICAgaWYgKG1zID09IDEpIHsgLy8y5pyI5Lu955qE6Zew5bmz6KeE5b6L5rWL566X5ZCO56Gu6K6k6L+U5ZueMjjmiJYyOVxyXG4gICAgICByZXR1cm4gKCgoeWVhciAlIDQgPT0gMCkgJiYgKHllYXIgJSAxMDAgIT0gMCkgfHwgKHllYXIgJSA0MDAgPT0gMCkpID8gMjkgOiAyOCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKHRoaXMuX2RheUluTW9udGhbbXNdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWGnOWOhuW5tOS7vei9rOaNouS4uuW5suaUr+e6quW5tFxyXG4gICAgICDlubLmlK/nuqrlubTms5Vcclxu44CA44CAICAgICDlpKnlubLlnLDmlK/ooahcclxu44CA44CAICAgMDEu55Sy5a2QIDAyLuS5meS4kSAwMy7kuJnlr4UgMDQu5LiB5Y2vIDA1LuaIiui+sCAwNi7lt7Hlt7MgMDcu5bqa5Y2IIDA4Lui+m+acqiAwOS7lo6znlLMgMTAu55m46YWJXHJcbuOAgCAgIOOAgCAgIDExLueUsuaIjCAxMi7kuZnkuqUgMTMu5LiZ5a2QIDE0LuS4geS4kSAxNS7miIrlr4UgMTYu5bex5Y2vIDE3LuW6mui+sCAxOC7ovpvlt7MgMTku5aOs5Y2IIDIwLueZuOacqlxyXG7jgIAgICDjgIAgICAyMS7nlLLnlLMgMjIu5LmZ6YWJIDIzLuS4meaIjCAyNC7kuIHkuqUgMjUu5oiK5a2QIDI2LuW3seS4kSAyNy7luprlr4UgMjgu6L6b5Y2vIDI5LuWjrOi+sCAzMC7nmbjlt7Ncclxu44CAICDjgIAgICAgMzEu55Sy5Y2IIDMyLuS5meacqiAzMy7kuJnnlLMgMzQu5LiB6YWJIDM1LuaIiuaIjCAzNi7lt7HkuqUgMzcu5bqa5a2QIDM4Lui+m+S4kSAzOS7ku7vlr4UgNDAu55m45Y2vXHJcbuOAgCAgIOOAgCAgIDQxLueUsui+sCA0Mi7kuZnlt7MgNDMu5LiZ5Y2IIDQ0LuS4geacqiA0NS7miIrnlLMgNDYu5bex6YWJIDQ3LuW6muaIjCA0OC7ovpvkuqUgNDku5aOs5a2QIDUwLueZuOS4kVxyXG7jgIDjgIAgICAgICA1MS7nlLLlr4UgNTIu5LmZ5Y2vIDUzLuS4mei+sCA1NC7kuIHlt7EgNTUu5oiK5Y2IIDU2LuW3seacqiA1Ny7luprnlLMgNTgu6L6b6YWJIDU5LuWjrOaIjCA2MC7nmbjkuqVcclxuICAgICDnlKjpmLPljobnmoTlubTku73pmaTku6U2MOW+l+WIsOeahOW5tOS7veWGjeWHj+WOuzPlsLHmmK/ov5nkuIDlubTlhpzljobnmoTlubLmlK/luo/lj7fmlbDvvIzmn6XlubLmlK/ooajlvpfliLDlubLmlK/lubTnuqrvvIxcclxuICAgICDoi6Xlvpflh7rmnaXnmoTmlbDmja7lsI/kuo7pm7bmiJbogIXnrYnkuo7pm7bliJnliqDkuIo2MOWNs+WPr+OAglxyXG4gICAgIOS4vuS4quS+i+WtkO+8muaxgjIwMTnlubTlubLmlK/vvIwyMDE5w7c2MO+8nTMz5L2ZMznvvIzlubTlubLmlK/luo/lj7fmlbA9MzktMz0zNu+8jFxyXG4gICAgIOaJgOS7peW+l+efpeS7iuW5tOaYr+W3seS6peW5tOOAguW5suaUr+e6quW5tOmDveaYr+S7juavj+W5tOeahOeri+aYpeW8gOWni+eahO+8jOS4jeeuoeeri+aYpeWcqOWJjeS4gOW5tOeahOiFiuaciOi/mOaYr+aWsOS4gOW5tOeahOato+aciO+8jOeri+aYpeW8gOWni+aJjeeul+aWsOeahOS4gOW5tOOAglxyXG4gICAqL1xyXG4gIF9nZXRHYW5aaGlZZWFyKHllYXIpIHtcclxuICAgIHZhciBnYW5LZXkgPSAoeWVhciAtIDMpICUgMTA7XHJcbiAgICB2YXIgemhpS2V5ID0gKHllYXIgLSAzKSAlIDEyO1xyXG4gICAgaWYgKGdhbktleSA9PSAwKSBnYW5LZXkgPSAxMDsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlpKnlubJcclxuICAgIGlmICh6aGlLZXkgPT0gMCkgemhpS2V5ID0gMTI7Ly/lpoLmnpzkvZnmlbDkuLow5YiZ5Li65pyA5ZCO5LiA5Liq5Zyw5pSvXHJcbiAgICByZXR1cm4gdGhpcy5fVGlhbkdhbltnYW5LZXkgLSAxXSArIHRoaXMuX0RpWmhpW3poaUtleSAtIDFdO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFrOWOhuaciOOAgeaXpeWIpOaWreaJgOWxnuaYn+W6p1xyXG4gICAqL1xyXG4gIF9nZXRBc3Ryb2xvZ3koY01vbnRoLCBjRGF5KSB7XHJcbiAgICB2YXIgYXJyID0gWzIwLCAxOSwgMjEsIDIxLCAyMSwgMjIsIDIzLCAyMywgMjMsIDIzLCAyMiwgMjJdO1xyXG4gICAgcmV0dXJuIHRoaXMuX2FzdHJvbG9neVtjTW9udGggLSAoY0RheSA8IGFycltjTW9udGggLSAxXSA/IDEgOiAwKV0gKyBcIuW6p1wiOy8v5bqnXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogXHJcbiAgICDlpKnlubLkuIDlhbHmnInljYHkuKrvvIzliIbliKvmnInnlLLjgIHkuZnjgIHkuJnjgIHkuIHjgIHmiIrjgIHlt7HjgIHluprjgIHovpvjgIHlo6zjgIHnmbjjgILlnLDmlK/kuIDlhbHmnInljYHkuozkuKrvvIzliIbliKvmnInlrZDjgIHkuJHjgIHlr4XjgIHlja/jgIHovrDjgIHlt7PjgIHljYjjgIHmnKrjgIHnlLPjgIHphYnjgIHmiIzjgIHkuqXjgILlubLmlK/ov5jmnInpmLTpmLPkuYvliIbvvIznlLLjgIHkuJnjgIHmiIrjgIHluprjgIHlo6zkuLrpmLPlubLvvIzkuZnjgIHkuIHjgIHlt7HjgIHovpvjgIHnmbjkuLrpmLTlubLjgILlrZDjgIHlr4XjgIHovrDjgIHljYjjgIHnlLPjgIHmiIzkuLrpmLPmlK/vvIzkuJHjgIHlja/jgIHlt7PjgIHmnKrjgIHphYnjgIHkuqXkuLrpmLTmlK/vvIzkuIDkuKrlpKnlubLlkozkuIDkuKrlnLDmlK/nm7jphY3vvIzmjpLliJfotbfmnaXvvIzlpKnlubLlnKjliY3vvIzlnLDmlK/lnKjlkI7vvIzlpKnlubLnlLHnlLLotbfvvIzlnLDmlK/nlLHlrZDotbfvvIzpmLPlubLphY3pmLPmlK/vvIzpmLTlubLphY3pmLTmlK/vvIzlhbHmnInlha3ljYHkuKrnu4TlkIjjgILlj6TkurrlsLHnlKjov5k2MOS4que7hOWQiOW+queOr+i1t+adpee6quW5tO+8jOe6quaciO+8jOe6quaXpe+8jOe6quaXtuOAglxyXG5cclxuICAgIOe6quW5tO+8jOS4reWbveWPpOS6uueUqDYw5Liq57uE5ZCI5L6d5qyh57qq5bm077yM5LiA5bm05LiA5Liq57uE5ZCI77yM77yM5bmy5pSv57qq5bm077yM5LiA5Liq5ZGo5pyf55qE56ys5LiA5bm05Li655Sy5a2Q77yM56ys5LqM5bm05Li65LmZ5LiR77yM5L6d5qyh57G75o6o77yMNjDlubTkuIDkuKrova7lm57vvIzmr4/kuIDkuKrmlrDlubTlvIDlp4vkuo7mraPmnIjliJ3kuIDnmoTmraPlrZDml7bjgIJcclxuXHJcbiAgICDnuqrmnIjvvIzlubLmlK/nuqrmnIjvvIzph4fnlKjmr4/kuKrlnLDmlK/lr7nlupQyNOiKguawlOiHquafkOiKguawlOiHs+S4i+S4gOS4quiKguawlO+8jOS7peS6pOe7k+aXtumXtOWGs+Wumui1t+Wni+eahOS4gOS4quaciOacn+mXtOOAguW5suaUr+e6quaciOaYr+W5suaUr+WOhueahOS4gOmDqOWIhu+8jOS4u+imgeeUqOS6jumjjuawtOacr+acr+etiemihuWfn++8jOi/meS9v+W+l+W5suaUr+WOhuS4gOebtOWcqOWumOaWueWSjOawkemXtOmDvea1geS8oOS4jeihsOOAglxyXG5cclxuICAgIOe6quaXpe+8jOe6quaXpeaYr+W5suaUr+eahOacgOaXqeeUqOazle+8jOS4gOS4quaYvOWknOaYr+S4gOWkqe+8jOeUqDYw5Liq57uE5ZCI5p2l5L6d5qyh57qq5pel77yM5q+U5aaC5LuK5aSp5piv55Sy5a2Q5pel77yM5piO5aSp5bCx5piv5LmZ5LiR5pel77yMNjDlpKnkuIDkuKrlvqrnjq/vvIzmlrDnmoTkuIDlpKnku47mraPlrZDljYjlvIDlp4vvvIzkuK3lm73mmI7noa7lj6/mn6XnmoTlubLmlK/nuqrml6XvvIzmmK/mmKXnp4vpsoHpmpDlhazkuInlubTvvIjlhazlhYPliY03MjDlubTvvInvvIzot53ku4rlt7Lnu4/mnIkyNzAw5aSa5bm05LqG77yM6L+Z5piv6L+E5LuK5Li65q2i5piv5LiW55WM5LiK5pyA5pep55qE6K6w5pel5rOV44CCXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIOS8oOWFpW9mZnNldOWBj+enu+mHj+i/lOWbnuW5suaUryBcclxuICAgICovXHJcbiAgX2dldEdhblpoaShvZmZzZXQpIHtcclxuICAgIHJldHVybiB0aGlzLl9UaWFuR2FuW29mZnNldCAlIDEwXSArIHRoaXMuX0RpWmhpW29mZnNldCAlIDEyXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAg5YWs5Y6GeWVhcuW5tOiOt+W+l+ivpeW5tOesrGluZGV45Liq6IqC5rCU55qE5YWs5Y6G5pel5pyfXHJcbiAgICAqL1xyXG4gIF9nZXRDYWxlbmRhcmljaXR5KHllYXIsIGluZGV4KSB7XHJcbiAgICBpZiAoeWVhciA8IDE5MDAgfHwgeWVhciA+IDIxMDApIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgMSB8fCBpbmRleCA+IDI0KSB7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHZhciBfdGFibGUgPSB0aGlzLl9jYWxlbmRhcmljaXR5VGFibGVbeWVhciAtIDE5MDBdO1xyXG4gICAgdmFyIF9jYWxlbmRhcmljaXR5SW5mbyA9IFtcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDUsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDE1LCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMjAsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyNSwgNSkpLnRvU3RyaW5nKClcclxuICAgIF07XHJcblxyXG4gICAgdmFyIF9jYWxkYXkgPSBbXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cig0LCAyKSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoX2NhbGRheVtpbmRleCAtIDFdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDlhpzljobmsYnor63ooajnpLpcclxuICAgICovXHJcbiAgX2dldENoaW5hTW9udGgobW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkge1xyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJldHVybiBgJHt0aGlzLl9sdW5hck1vbnRoVGFibGVbbW9udGggLSAxXX3mnIhgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAq5Yac5Y6G5pel5pyf5pel6KGo56S6XHJcbiAgICAqL1xyXG4gIF9nZXRDaGluYURheShkYXkpIHtcclxuICAgIGxldCBzO1xyXG4gICAgc3dpdGNoIChkYXkpIHtcclxuICAgICAgY2FzZSAxMDpcclxuICAgICAgICBzID0gJ+WIneWNgSc7IGJyZWFrO1xyXG4gICAgICBjYXNlIDIwOlxyXG4gICAgICAgIHMgPSAn5LqM5Y2BJzsgYnJlYWs7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgcyA9ICfkuInljYEnOyBicmVhaztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBzID0gdGhpcy5fY2hpbmVzZVRlbkNoYXJbTWF0aC5mbG9vcihkYXkgLyAxMCldO1xyXG4gICAgICAgIHMgKz0gdGhpcy5fY2hpbmVzZUNoYXJbZGF5ICUgMTBdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChzKTtcclxuICB9XHJcbiAgLypcclxuICDov5Tlm57lhpzljoboioLml6VcclxuICAqL1xyXG4gIF9nZXRMdW5hckhvbGlkYXkobW9udGgsIGRheSkge1xyXG4gICAgbGV0IGx1bmFySG9saWRheVN0ciA9IFwiXCJcclxuICAgIHRoaXMuX2x1bmFySG9saWRheS5mb3JFYWNoKGx1bmFyID0+IHtcclxuICAgICAgbGV0IGxkID0gbHVuYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgbGR2ID0gbHVuYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgbG1kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBsbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgbGRheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgbG1kID0gbG1vbnRoX3YgKyBsZGF5X3Y7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibG1kOlwiICsgbG1kKVxyXG4gICAgICBpZiAobGQudHJpbSgpID09PSBsbWQudHJpbSgpKSB7XHJcbiAgICAgICAgbHVuYXJIb2xpZGF5U3RyID0gbGR2XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbHVuYXJIb2xpZGF5U3RyXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiDov5Tlm57lr7nlupTml6XmnJ/nmoTlhazljoboioLml6VcclxuICovXHJcbiAgX2dldFNvbGFySG9saWRheShtb250aCwgZGF5KSB7XHJcbiAgICBsZXQgc29sYXJIb2xpZGF5U3RyID0gXCJcIjtcclxuICAgIHRoaXMuX3NvbGFySG9saWRheS5mb3JFYWNoKHNvbGFyID0+IHtcclxuXHJcbiAgICAgIGxldCBzZCA9IHNvbGFyLnNwbGl0KFwiIFwiKVswXTtcclxuICAgICAgbGV0IHNkdiA9IHNvbGFyLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgICAgbGV0IHNtb250aF92ID0gbW9udGggKyBcIlwiO1xyXG4gICAgICBsZXQgc2RheV92ID0gZGF5ICsgXCJcIjtcclxuICAgICAgbGV0IHNtZCA9IFwiXCI7XHJcbiAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICAgICAgc21vbnRoX3YgPSBcIjBcIiArIG1vbnRoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4gICAgICAgIHNkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4gICAgICB9XHJcbiAgICAgIHNtZCA9IHNtb250aF92ICsgc2RheV92O1xyXG4gICAgICBpZiAoc2QudHJpbSgpID09PSBzbWQudHJpbSgpKSB7XHJcbiAgICAgICAgc29sYXJIb2xpZGF5U3RyID0gc2R2O1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHNvbGFySG9saWRheVN0clxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAg6I635Y+W5a+55bqU5bm05Lu955qE55Sf6IKWXHJcbiAgICAqL1xyXG4gIF9nZXRab2RpYWMoeWVhcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX1pvZGlhY1soeWVhciAtIDQpICUgMTJdXHJcbiAgfVxyXG4gIC8qXHJcbiAgKiDojrflj5bml6XmnJ/mmK/lkKbkuLoyNOiKguawlFxyXG4gICAg6aaW5YWI6I635Y+W6IqC5rCU5Li65b2T5pyI55qE56ys5Yeg5aSp77yM5LiO5b2T5YmN5Yy56YWN55qE77yM6L+U5Zue5a+55bqU55qE6IqC5rCUXHJcbiAgKi9cclxuICBfZ2V0THVuYXJEYXlDYWxlbmRhcmljaXR5KGZpcnN0Q2FsZW5kYXJpY2l0eURheSwgc2Vjb25kQ2FsZW5kYXJpY2l0eURheSwgbm93U2VsZWN0RGF5LCBub3dTZWxlY3RNb250aCkge1xyXG4gICAgLy/kvKDlhaXnmoTml6XmnJ/nmoToioLmsJTkuI7lkKZcclxuXHJcbiAgICBsZXQgY2FsZW5kYXJpY2l0eVN0ciA9IFwiXCI7XHJcbiAgICBpZiAoZmlyc3RDYWxlbmRhcmljaXR5RGF5ID09IG5vd1NlbGVjdERheSkge1xyXG5cclxuICAgICAgY2FsZW5kYXJpY2l0eVN0ciA9IHRoaXMuX2NhbGVuZGFyaWNpdHlbbm93U2VsZWN0TW9udGggKiAyIC0gMl07XHJcbiAgICB9XHJcbiAgICBpZiAoc2Vjb25kQ2FsZW5kYXJpY2l0eURheSA9PSBub3dTZWxlY3REYXkpIHtcclxuXHJcbiAgICAgIGNhbGVuZGFyaWNpdHlTdHIgPSB0aGlzLl9jYWxlbmRhcmljaXR5W25vd1NlbGVjdE1vbnRoICogMiAtIDFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhbGVuZGFyaWNpdHlTdHJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDkvKDlhaXpmLPljoblubTmnIjml6Xojrflvpfor6bnu4bnmoTlhazljobjgIHlhpzljoZvYmplY3Tkv6Hmga8gPD0+SlNPTlxyXG4gICAgKiBAcGFyYW0gc29sYXJZZWFyICBzb2xhciB5ZWFyXHJcbiAgICAqIEBwYXJhbSBzb2xhck1vbnRoICBzb2xhciBtb250aFxyXG4gICAgKiBAcGFyYW0gc29sYXJEYXkgIHNvbGFyIGRheVxyXG4gICAgKiBAcmV0dXJuIEpTT04gb2JqZWN0XHJcbiAgICAqL1xyXG4gIGdldEx1bmFyKHNvbGFyWWVhciwgc29sYXJNb250aCwgc29sYXJEYXkpIHsgLy/lj4LmlbDljLrpl7QxOTAwLjEuMzF+MjEwMC4xMi4zMVxyXG4gICAgaWYgKHNvbGFyWWVhciA8IDE5MDAgfHwgc29sYXJZZWFyID4gMjEwMCkgeyByZXR1cm4gLTE7IH0vL+W5tOS7vemZkOWumuOAgeS4iumZkFxyXG4gICAgaWYgKHNvbGFyWWVhciA9PSAxOTAwICYmIHNvbGFyTW9udGggPT0gMSAmJiBzb2xhckRheSA8IDMxKSB7IHJldHVybiAtMTsgfS8v5LiL6ZmQXHJcbiAgICBpZiAoIXNvbGFyWWVhcikgeyAvL+acquS8oOWPgiAg6I635b6X5b2T5aSpXHJcbiAgICAgIHZhciBub3dTZWxlY3REYXRlID0gbmV3IERhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBub3dTZWxlY3REYXRlID0gbmV3IERhdGUoc29sYXJZZWFyLCBwYXJzZUludChzb2xhck1vbnRoKSAtIDEsIHNvbGFyRGF5KVxyXG4gICAgfVxyXG4gICAgdmFyIG5vd1NlbGVjdFllYXIgPSBub3dTZWxlY3REYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICB2YXIgbm93U2VsZWN0TW9udGggPSBub3dTZWxlY3REYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIG5vd1NlbGVjdERheSA9IG5vd1NlbGVjdERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG9mZnNldCA9IChEYXRlLlVUQyhub3dTZWxlY3REYXRlLmdldEZ1bGxZZWFyKCksIG5vd1NlbGVjdERhdGUuZ2V0TW9udGgoKSwgbm93U2VsZWN0RGF0ZS5nZXREYXRlKCkpIC0gRGF0ZS5VVEMoMTkwMCwgMCwgMzEpKSAvIDg2NDAwMDAwO1xyXG4gICAgLy9vZmZzZXTlvZPliY3ml6XmnJ/kuI4xOTkwLjEuMzHnm7jlt67ml6XmnJ/jgIIxOTkwLjEuMzEu5byA5aeL56ys5LiA5Liq5Yac5Y6G5ZGo5pyf5byA5aeLXHJcbiAgICB2YXIgdGVtcFllYXIsIGxlYXAgPSAwLCB0ZW1wID0gMDtcclxuICAgIC8vdGVtcFllYXIg5b2T5YmN5bm05Lu96IezMTk5MOW5tOS+neasoeWHj+WOu+S4remXtOaJgOacieeahOWGnOWOhuW5tOeahOWkqeaVsO+8jOS9meS4i29mZnNldOS4uuW9k+WJjeWGnOWOhuW5tOesrOWkmuWwkeWkqVxyXG4gICAgZm9yICh0ZW1wWWVhciA9IDE5MDA7IHRlbXBZZWFyIDwgMjEwMSAmJiBvZmZzZXQgPiAwOyB0ZW1wWWVhcisrKSB7XHJcbiAgICAgIHRlbXAgPSB0aGlzLl9sdW5hclllYXJEYXlzKHRlbXBZZWFyKTsvL+iuoeeul+W9k+WJjeWGnOWOhuW5tOeahOaAu+WkqeaVsFxyXG4gICAgICBvZmZzZXQgLT0gdGVtcDtcclxuICAgICAgLy9vZmZzZXTkvp3mrKHlh4/ljrvmiYDmnInlhpzljoblubTnmoTmgLvlpKnmlbDlkI5cclxuICAgICAgLy90ZW1wWWVhcuS4uuW9k+WJjeeahOeahOWGnOWOhuW5tOS7vVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgIC8vb2Zmc2V05bCP5LqOMOaXtuWAmeS/ruato1xyXG4gICAgICBvZmZzZXQgKz0gdGVtcDtcclxuICAgICAgdGVtcFllYXItLTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIGlzVG9kYXlPYmogPSBuZXcgRGF0ZSgpOy8v6I635Y+W5b2T5YmN5pel5pyfXHJcbiAgICB2YXIgaXNUb2RheSA9IGZhbHNlO1xyXG4gICAgaWYgKGlzVG9kYXlPYmouZ2V0RnVsbFllYXIoKSA9PSBub3dTZWxlY3RZZWFyICYmIGlzVG9kYXlPYmouZ2V0TW9udGgoKSArIDEgPT0gbm93U2VsZWN0TW9udGggJiYgaXNUb2RheU9iai5nZXREYXRlKCkgPT0gbm93U2VsZWN0RGF5KSB7XHJcbiAgICAgIGlzVG9kYXkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy/mmJ/mnJ/lh6BcclxuICAgIGxldCBuV2VlayA9IG5vd1NlbGVjdERhdGUuZ2V0RGF5KCk7XHJcbiAgICBsZXQgY1dlZWsgPSB0aGlzLl9jaGluZXNlQ2hhcltuV2Vla107XHJcbiAgICBpZiAobldlZWsgPT0gMCkge1xyXG4gICAgICBuV2VlayA9IDc7XHJcbiAgICB9Ly/mlbDlrZfooajnpLrlkajlh6DpobrlupTlpKnmnJ3lkajkuIDlvIDlp4vnmoTmg6/kvotcclxuICAgIC8v5Yac5Y6G5bm0XHJcbiAgICB2YXIgeWVhciA9IHRlbXBZZWFyO1xyXG5cclxuICAgIHZhciBsZWFwID0gdGhpcy5fbGVhcE1vbnRoSW5MdW5hclllYXIodGVtcFllYXIpOyAvL+mXsOWTquS4quaciFxyXG4gICAgdmFyIGlzTGVhcCA9IGZhbHNlO1xyXG5cclxuICAgIC8v5pWI6aqM6Zew5pyIXHJcbiAgICB2YXIgdGVtcE1vbnRoO1xyXG4gICAgZm9yICh0ZW1wTW9udGggPSAxOyB0ZW1wTW9udGggPCAxMyAmJiBvZmZzZXQgPiAwOyB0ZW1wTW9udGgrKykge1xyXG5cclxuICAgICAgaWYgKGxlYXAgPiAwICYmIHRlbXBNb250aCA9PSAobGVhcCArIDEpICYmIGlzTGVhcCA9PSBmYWxzZSkge1xyXG4gICAgICAgIC8v6Zew5pyIXHJcbiAgICAgICAgLS10ZW1wTW9udGg7XHJcbiAgICAgICAgaXNMZWFwID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wID0gdGhpcy5fbGVhcERheXNJbkx1bmFyWWVhcih5ZWFyKTsgLy/orqHnrpflhpzljobpl7DmnIjlpKnmlbBcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAvL+mdnumXsOaciFxyXG4gICAgICAgIHRlbXAgPSB0aGlzLl9tb250aERheXMoeWVhciwgdGVtcE1vbnRoKTsvL+iuoeeul+WGnOWOhuaZrumAmuaciOWkqeaVsFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNMZWFwID09IHRydWUgJiYgdGVtcE1vbnRoID09IChsZWFwICsgMSkpIHtcclxuICAgICAgICAvL+WmguaenOmXsOaciOWOu+aOiemXsOaciOagh+iusFxyXG4gICAgICAgIGlzTGVhcCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG9mZnNldCAtPSB0ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXQgPT0gMCAmJiBsZWFwID4gMCAmJiB0ZW1wTW9udGggPT0gbGVhcCArIDEpXHJcbiAgICAgIGlmIChpc0xlYXApIHtcclxuICAgICAgICBpc0xlYXAgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpc0xlYXAgPSB0cnVlOyAtLXRlbXBNb250aDtcclxuICAgICAgfVxyXG4gICAgaWYgKG9mZnNldCA8IDApIHtcclxuICAgICAgb2Zmc2V0ICs9IHRlbXA7XHJcbiAgICAgIC0tdGVtcE1vbnRoO1xyXG4gICAgfVxyXG4gICAgLy/lhpzljobmnIhcclxuICAgIGNvbnN0IG1vbnRoID0gdGVtcE1vbnRoO1xyXG4gICAgLy/lhpzljobml6VcclxuICAgIGNvbnN0IGRheSA9IG9mZnNldCArIDE7XHJcblxyXG4gICAgLy/lpKnlubLlnLDmlK/lpITnkIZcclxuICAgIHZhciBzbSA9IG5vd1NlbGVjdE1vbnRoIC0gMTtcclxuICAgIHZhciBnYW5aaGlZZWFyID0gdGhpcy5fZ2V0R2FuWmhpWWVhcih5ZWFyKTtcclxuXHJcbiAgICAvL+aciOafseaOqOeul+ihqFxyXG4gICAgLy8xOTAw5bm0MeaciOWwj+WvkuS7peWJjeS4uiDkuJnlrZDmnIgoNjDov5vliLYxMilcclxuICAgIHZhciBfZmlyc3RDYWxlbmRhcmljaXR5RGF5ID0gdGhpcy5fZ2V0Q2FsZW5kYXJpY2l0eShub3dTZWxlY3RZZWFyLCAobm93U2VsZWN0TW9udGggKiAyIC0gMSkpOy8v6L+U5Zue5b2T5pyI44CM6IqC44CN5Li65Yeg5pel5byA5aeLXHJcbiAgICB2YXIgX3NlY29uZENhbGVuZGFyaWNpdHlEYXkgPSB0aGlzLl9nZXRDYWxlbmRhcmljaXR5KG5vd1NlbGVjdFllYXIsIChub3dTZWxlY3RNb250aCAqIDIpKTsvL+i/lOWbnuW9k+aciOOAjOiKguOAjeS4uuWHoOaXpeW8gOWni1xyXG4gICAgY29uc29sZS5sb2coXCJfZmlyc3RDYWxlbmRhcmljaXR5RGF5OlwiICsgX2ZpcnN0Q2FsZW5kYXJpY2l0eURheSArIFwiLF9zZWNvbmRDYWxlbmRhcmljaXR5RGF5OlwiICsgX3NlY29uZENhbGVuZGFyaWNpdHlEYXkpXHJcbiAgICAvL+S+neaNrjEy6IqC5rCU5L+u5q2j5bmy5pSv5pyIXHJcbiAgICBsZXQgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMSk7XHJcbiAgICBpZiAobm93U2VsZWN0RGF5ID49IF9maXJzdENhbGVuZGFyaWNpdHlEYXkpIHtcclxuICAgICAgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMik7XHJcbiAgICB9XHJcbiAgICBsZXQgY2FsZW5kYXJpY2l0eSA9IHRoaXMuX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eShfZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSwgbm93U2VsZWN0RGF5LCBub3dTZWxlY3RNb250aClcclxuXHJcbiAgICAvL+aXpeafseaOqOeul+ihqCDlvZPmnIjkuIDml6XkuI4gMTkwMC8xLzEg55u45beu5aSp5pWwXHJcbiAgICBjb25zdCBkYXlDeWNsaWNhbCA9IERhdGUuVVRDKG5vd1NlbGVjdFllYXIsIHNtLCAxLCAwLCAwLCAwLCAwKSAvIDg2NDAwMDAwICsgMjU1NjcgKyAxMDtcclxuICAgIGNvbnN0IGdhblpoaURheSA9IHRoaXMuX2dldEdhblpoaShkYXlDeWNsaWNhbCArIG5vd1NlbGVjdERheSAtIDEpO1xyXG4gICAgLy/or6Xml6XmnJ/miYDlsZ7nmoTmmJ/luqdcclxuICAgIGNvbnN0IGFzdHJvID0gdGhpcy5fZ2V0QXN0cm9sb2d5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpO1xyXG5cclxuICAgIGNvbnN0IHpvZGlhYyA9IHRoaXMuX2dldFpvZGlhYyh5ZWFyKVxyXG4gICAgY29uc3QgY2hpbmFNb250aCA9IHRoaXMuX2dldENoaW5hTW9udGgobW9udGgpXHJcbiAgICBjb25zdCBjaGluYURheSA9IHRoaXMuX2dldENoaW5hRGF5KGRheSlcclxuICAgIGNvbnN0IGx1bmFySG9saWRheSA9IHRoaXMuX2dldEx1bmFySG9saWRheShtb250aCwgZGF5KVxyXG4gICAgY29uc3Qgc29sYXJIb2xpZGF5ID0gdGhpcy5fZ2V0U29sYXJIb2xpZGF5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpXHJcbiAgICByZXR1cm4geyAnbHVuYXJZZWFyJzogeWVhciwgJ2x1bmFyTW9udGgnOiBtb250aCwgJ2x1bmFyRGF5JzogZGF5LCAnem9kaWFjJzogem9kaWFjLCAnY2hpbmFNb250aCc6IChpc0xlYXAgPyBcIumXsFwiIDogJycpICsgY2hpbmFNb250aCwgJ2NoaW5hRGF5JzogY2hpbmFEYXksICdzb2xhclllYXInOiBub3dTZWxlY3RZZWFyLCAnc29sYXJNb250aCc6IG5vd1NlbGVjdE1vbnRoLCAnc29sYXJEYXknOiBub3dTZWxlY3REYXksICdnYW5aaGlZZWFyJzogZ2FuWmhpWWVhciwgJ2dhblpoaU1vbnRoJzogZ2FuWmhpTW9udGgsICdnYW5aaGlEYXknOiBnYW5aaGlEYXksICdpc1RvZGF5JzogaXNUb2RheSwgJ2lzTGVhcCc6IGlzTGVhcCwgJ25XZWVrJzogbldlZWssICduY1dlZWsnOiBcIuaYn+acn1wiICsgY1dlZWssICdjYWxlbmRhcmljaXR5JzogY2FsZW5kYXJpY2l0eSwgJ2FzdHJvJzogYXN0cm8sIFwibHVuYXJIb2xpZGF5XCI6IGx1bmFySG9saWRheSwgXCJzb2xhckhvbGlkYXlcIjogc29sYXJIb2xpZGF5IH07XHJcbiAgfVxyXG59XHJcbmxldCBsdW5hckNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoKVxyXG5leHBvcnQgZGVmYXVsdCBsdW5hckNhbGVuZGFyXHJcblxyXG5cclxuXHJcbi8vKioqKioqKioqKioqKioqKuWIhuWJsue6v2phdmHniYjmnKwqKioqKioqKioqKioqKiogKi9cclxuLy8gaW1wb3J0IGphdmEudGV4dC5QYXJzZUV4Y2VwdGlvbjtcclxuLy8gaW1wb3J0IGphdmEudGV4dC5TaW1wbGVEYXRlRm9ybWF0O1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkRhdGU7XHJcbi8vIGltcG9ydCBqYXZhLnV0aWwuTG9jYWxlO1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkNhbGVuZGFyO1xyXG5cclxuLy8gY2xhc3MgTHVuYXJDYWxlbmRhciB7XHJcbi8vICAgICBwcml2YXRlIGludCB5ZWFyOyAvLyDlhazljoblubRcclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoOy8vIOWFrOWOhuaciFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5Oy8vIOWFrOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJZZWFyOy8vIOmYtOWOhuW5tFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJNb250aDsvLyDpmLTljobmnIhcclxuLy8gICAgIHByaXZhdGUgaW50IGx1bmFyRGF5Oy8vIOmYtOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbGVhcE1vbnRoID0gMDsgLy8g6Zi05Y6G6Zew55qE5pyIXHJcbi8vICAgICBwcml2YXRlIGludCBkYXlzT2ZNb250aCA9IDA7IC8vIOafkOaciOeahOWkqeaVsFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5T2ZXZWVrID0gMDsgLy8g5YW35L2T5p+Q5LiA5aSp5piv5pif5pyf5YegXHJcblxyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nIGNoaW5lc2VNb250aE51bWJlcltdID0geyBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWNgeS4gFwiLCBcIuWNgeS6jFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBab2RpYWMgPSBuZXcgU3RyaW5nW10geyBcIum8oFwiLCBcIueJm1wiLCBcIuiZjlwiLCBcIuWFlFwiLCBcIum+mVwiLCBcIuibh1wiLCBcIumprFwiLCBcIue+ilwiLCBcIueMtFwiLCBcIum4oVwiLCBcIueLl1wiLCBcIueMqlwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBHYW4gPSBuZXcgU3RyaW5nW10geyBcIueUslwiLCBcIuS5mVwiLCBcIuS4mVwiLCBcIuS4gVwiLCBcIuaIilwiLCBcIuW3sVwiLCBcIuW6mlwiLCBcIui+m1wiLCBcIuWjrFwiLCBcIueZuFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBaaGkgPSBuZXcgU3RyaW5nW10geyBcIuWtkFwiLCBcIuS4kVwiLCBcIuWvhVwiLCBcIuWNr1wiLCBcIui+sFwiLCBcIuW3s1wiLCBcIuWNiFwiLCBcIuacqlwiLCBcIueUs1wiLCBcIumFiVwiLCBcIuaIjFwiLCBcIuS6pVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmcgY2hpbmVzZVRlbkNoYXJbXSA9IHsgXCLliJ1cIiwgXCLljYFcIiwgXCLlu79cIiwgXCLljYVcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gbHVuYXJIb2xpZGF5ID0gbmV3IFN0cmluZ1tdIHsgXCIwMTAxIOaYpeiKglwiLCBcIjAxMTUg5YWD5a61XCIsIFwiMDUwNSDnq6/ljYhcIiwgXCIwNzA3IOaDheS6ulwiLCBcIjA3MTUg5Lit5YWDXCIsXHJcbi8vICAgICAgICAgICAgIFwiMDgxNSDkuK3np4tcIiwgXCIwOTA5IOmHjemYs1wiLCBcIjEyMDgg6IWK5YWrXCIsIFwiMTIyNCDlsI/lubRcIiwgXCIwMTAwIOmZpOWklVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBzb2xhckhvbGlkYXkgPSBuZXcgU3RyaW5nW10geyAvL1xyXG4vLyAgICAgICAgICAgICBcIjAxMDEg5YWD5pemXCIsIFwiMDIxNCDmg4XkurpcIiwgXCIwMzA4IOWmh+Wls1wiLCBcIjAzMTIg5qSN5qCRXCIsIFwiMDMxNSDmtojotLnogIXmnYPnm4rml6VcIiwgXCIwNDAxIOaEmuS6ulwiLCBcIjA1MDEg5Yqz5YqoXCIsIFwiMDUwNCDpnZLlubRcIiwgLy9cclxuLy8gICAgICAgICAgICAgXCIwNTEyIOaKpOWjq1wiLCBcIjA2MDEg5YS/56ulXCIsIFwiMDcwMSDlu7rlhZpcIiwgXCIwODAxIOW7uuWGm1wiLCBcIjA4MDgg54i25LqyXCIsIFwiMDkxMCDmlZnluIhcIiwgXCIwOTI4IOWtlOWtkOivnui+sFwiLCAvL1xyXG4vLyAgICAgICAgICAgICBcIjEwMDEg5Zu95bqGXCIsIFwiMTAwNiDogIHkurpcIiwgXCIxMDI0IOiBlOWQiOWbveaXpVwiLCBcIjExMTIg5a2Z5Lit5bGx6K+e6L6w57qq5b+1XCIsIFwiMTIyMCDmvrPpl6jlm57lvZLnuqrlv7VcIiwgXCIxMjI1IOWco+ivnlwiIH07XHJcbi8vICAgICBwcml2YXRlIHN0YXRpYyBTaW1wbGVEYXRlRm9ybWF0IGNoaW5lc2VEYXRlRm9ybWF0ID0gbmV3IFNpbXBsZURhdGVGb3JtYXQoXCJ5eXl55bm0TU3mnIhkZOaXpVwiLCBMb2NhbGUuQ0hJTkEpO1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgbG9uZ1tdIGx1bmFySW5mbyA9IG5ldyBsb25nW10geyAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YmQ4LCAweDA0YWUwLCAweDBhNTcwLCAweDA1NGQ1LCAweDBkMjYwLCAweDBkOTUwLCAweDE2NTU0LCAweDA1NmEwLCAweDA5YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA1NWQyLCAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NWIwLCAweDE0OTc3LCAweDA0OTcwLCAweDBhNGIwLCAweDBiNGI1LCAweDA2YTUwLCAweDA2ZDQwLCAweDFhYjU0LCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NTcwLCAweDA1MmYyLCAweDA0OTcwLCAweDA2NTY2LCAweDBkNGEwLCAweDBlYTUwLCAweDA2ZTk1LCAweDA1YWQwLCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE4NmUzLCAweDA5MmUwLCAweDFjOGQ3LCAweDBjOTUwLCAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAvL1xyXG4vLyAgICAgICAgICAgICAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LCAweDA2Y2EwLCAweDBiNTUwLCAweDE1MzU1LCAweDA0ZGEwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNWQwLCAweDE0NTczLCAweDA1MmQwLCAweDBhOWE4LCAweDBlOTUwLCAweDA2YWEwLCAweDBhZWE2LCAweDBhYjUwLCAweDA0YjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhYWU0LCAweDBhNTcwLCAweDA1MjYwLCAweDBmMjYzLCAweDBkOTUwLCAweDA1YjU3LCAweDA1NmEwLCAweDA5NmQwLCAweDA0ZGQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNWEwLCAweDE5NWE2LCAweDA5NWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0OWIwLCAweDBhOTc0LCAweDBhNGIwLCAweDBiMjdhLCAweDA2YTUwLCAweDA2ZDQwLCAweDBhZjQ2LCAweDBhYjYwLCAweDA5NTcwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWY1LCAweDA0OTcwLCAweDA2NGIwLCAweDA3NGEzLCAweDBlYTUwLCAweDA2YjU4LCAweDA1NWMwLCAweDBhYjYwLCAweDA5NmQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmUwLCAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmQwLCAweDBjYWI1LCAweDBhOTUwLCAweDBiNGEwLCAweDBiYWE0LCAweDBhZDUwLCAweDA1NWQ5LCAweDA0YmEwLCAweDBhNWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE1MTc2LCAweDA1MmIwLCAweDBhOTMwLCAweDA3OTU0LCAweDA2YWEwLCAweDBhZDUwLCAweDA1YjUyLCAweDA0YjYwLCAweDBhNmU2LCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGUwLCAweDBkMjYwLCAweDBlYTY1LCAweDBkNTMwLCAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YmQ3LCAweDA0YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LCAweDBiNWEwLCAweDA1NmQwLCAweDA1NWIyLCAweDA0OWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNTc3LCAweDBhNGIwLCAweDBhYTUwLCAweDFiMjU1LCAweDA2ZDIwLCAweDBhZGEwIH07XHJcblxyXG4vLyAgICAgcHVibGljIEx1bmFyQ2FsZW5kYXIoaW50IHllYXIsIGludCBtb250aCwgaW50IGRheSkge1xyXG4vLyAgICAgICAgIHRoaXMueWVhciA9IHllYXI7XHJcbi8vICAgICAgICAgdGhpcy5tb250aCA9IG1vbnRoO1xyXG4vLyAgICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4vLyAgICAgICAgIHRoaXMuaW5pdEx1bmFyRGF0ZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcHJpdmF0ZSB2b2lkIGluaXRMdW5hckRhdGUoKXtcclxuLy8gICAgICAgICBTdHJpbmcgbm93YWRheXM7XHJcbi8vICAgICAgICAgRGF0ZSBiYXNlRGF0ZSA9IG51bGw7XHJcbi8vICAgICAgICAgRGF0ZSBub3dhZGF5ID0gbnVsbDtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBiYXNlRGF0ZSA9IGNoaW5lc2VEYXRlRm9ybWF0LnBhcnNlKFwiMTkwMOW5tDHmnIgzMeaXpVwiKTtcclxuLy8gICAgICAgICB9IGNhdGNoIChQYXJzZUV4Y2VwdGlvbiBlKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJpbnRTdGFja1RyYWNlKCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBub3dhZGF5cyA9IHRoaXMueWVhciArIFwi5bm0XCIgKyB0aGlzLm1vbnRoICsgXCLmnIhcIiArIHRoaXMuZGF5ICsgXCLml6VcIjtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBub3dhZGF5ID0gY2hpbmVzZURhdGVGb3JtYXQucGFyc2Uobm93YWRheXMpO1xyXG4vLyAgICAgICAgIH0gY2F0Y2ggKFBhcnNlRXhjZXB0aW9uIGUpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmludFN0YWNrVHJhY2UoKTtcclxuXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvLyDkuI4xOTAw5bm0MeaciDMx5pel55u45beu55qE5aSp5pWwXHJcbi8vICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpICgobm93YWRheS5nZXRUaW1lKCkgLSBiYXNlRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDBMKTtcclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog55Sob2Zmc2V05YeP5Y675q+P5Yac5Y6G5bm055qE5aSp5pWwXHJcbi8vICAgICAgICAgIOiuoeeul+W9k+WkqeaYr+WGnOWOhuesrOWHoOWkqVxyXG4vLyAgICAgICAgICBpWWVhcuacgOe7iOe7k+aenOaYr+WGnOWOhueahOW5tOS7vVxyXG4vLyAgICAgICAgICBvZmZzZXTkuLrlvZPlubTnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBpbnQgaVllYXIsIGRheXNPZlllYXIgPSAwO1xyXG4vLyAgICAgICAgIGZvciAoaVllYXIgPSAxOTAwOyBpWWVhciA8IDIxMDEgJiYgb2Zmc2V0ID4gMDsgaVllYXIrKykge1xyXG4vLyAgICAgICAgICAgICBkYXlzT2ZZZWFyID0gZGF5c0luTHVuYXJZZWFyKGlZZWFyKTtcclxuLy8gICAgICAgICAgICAgb2Zmc2V0IC09IGRheXNPZlllYXI7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZZZWFyO1xyXG4vLyAgICAgICAgICAgICBpWWVhci0tO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgbGVhcE1vbnRoID0gZ2V0TGVhcE1vbnRoKGlZZWFyKTsgLy8g5Yac5Y6G6Zew6YKj5Liq5pyIXHJcbi8vICAgICAgICAgYm9vbGVhbiBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIC8vIOeUqOW9k+W5tOeahOWkqeaVsG9mZnNldCzpgJDkuKrlh4/ljrvmr4/mnIjvvIjlhpzljobvvInnmoTlpKnmlbDvvIzmsYLlh7rlvZPlpKnmmK/mnKzmnIjnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICBpbnQgaU1vbnRoLCBkYXlzT2ZNb250aCA9IDA7XHJcbi8vICAgICAgICAgZm9yIChpTW9udGggPSAxOyBpTW9udGggPCAxMyAmJiBvZmZzZXQgPiAwOyBpTW9udGgrKykge1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IChsZWFwTW9udGggKyAxKSAmJiAhbGVhcCkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8g6Zew5pyIXHJcbi8vICAgICAgICAgICAgICAgICAtLWlNb250aDtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSBsZWFwRGF5SW5MdW5hcih5ZWFyKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IG1vbnRoRGF5c0luTHVuYXIoeWVhciwgaU1vbnRoKTtcclxuXHJcbi8vICAgICAgICAgICAgIG9mZnNldCAtPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLy8g6Kej6Zmk6Zew5pyIXHJcbi8vICAgICAgICAgICAgIGlmIChsZWFwICYmIGlNb250aCA9PSAobGVhcE1vbnRoICsgMSkpXHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvLyBvZmZzZXTkuLow5pe277yM5bm25LiU5Yia5omN6K6h566X55qE5pyI5Lu95piv6Zew5pyI77yM6KaB5qCh5q2jXHJcbi8vICAgICAgICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IGxlYXBNb250aCArIDEpIHtcclxuLy8gICAgICAgICAgICAgaWYgKGxlYXApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLy8gb2Zmc2V05bCP5LqOMOaXtu+8jOS5n+imgeagoeato1xyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgICAvLyDlhpzljoblubTku71cclxuLy8gICAgICAgICBsdW5hclllYXIgPSBpWWVhcjtcclxuLy8gICAgICAgICBsdW5hck1vbnRoID0gaU1vbnRoO1xyXG4vLyAgICAgICAgIGx1bmFyRGF5ID0gb2Zmc2V0ICsgMTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTnmoTmgLvlpKnmlbBcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5bm055qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IGRheXNJbkx1bmFyWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGludCBpLCBzdW0gPSAzNDg7XHJcbi8vICAgICAgICAgZm9yIChpID0gMHg4MDAwOyBpID4gMHg4OyBpID4+PSAxKSB7XHJcbi8vICAgICAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmIGkpICE9IDApXHJcbi8vICAgICAgICAgICAgICAgICBzdW0gKz0gMTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIChzdW0gKyBsZWFwRGF5SW5MdW5hcih5ZWFyKSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lhpzljoYgeWVhcuW5tOmXsOaciOeahOWkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBsZWFwRGF5SW5MdW5hcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGlmIChnZXRMZWFwTW9udGgoeWVhcikgIT0gMCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiAweDEwMDAwKSAhPSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMzA7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMjk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDA7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIOWGnOWOhumXsOmCo+S4quaciFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZ2V0TGVhcE1vbnRoKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIChpbnQpIChsdW5hckluZm9beWVhciAtIDE5MDBdICYgMGIxMTExKTtcclxuLy8gICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Lyg5Zue5Yac5Y6GIHllYXLlubRtb250aOaciOeahOaAu+WkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyICDlubTku71cclxuLy8gICAgICAqIEBwYXJhbSBtb250aCDmnIjku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5pyI5Lu955qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoRGF5c0luTHVuYXIoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPT0gMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDI5O1xyXG4vLyAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDMwO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOeahOeUn+iCllxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVybiDnlJ/ogpZcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Wm9kaWFjWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIHJldHVybiBab2RpYWNbKHllYXIgLSA0KSAlIDEyXTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWvueW6lOW5tOeahOW5suaUr1xyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRHYW5aaGkoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpbnQgbnVtID0geWVhciAtIDE5MDAgKyAzNjtcclxuLy8gICAgICAgICByZXR1cm4gKEdhbltudW0gJSAxMF0gKyBaaGlbbnVtICUgMTJdKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuW9k+WJjeW5tOS7veeahOW5suaUr1xyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFllYXJHYW5aaGkoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldEdhblpoaSh0aGlzLnllYXIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5bm05Lu955qE55Sf6IKWXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50WWVhclpvZGlhYygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0Wm9kaWFjWWVhcih0aGlzLmx1bmFyWWVhcik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Q2hpbmFEYXlTdHJpbmcoaW50IGRheSkge1xyXG5cclxuLy8gICAgICAgICBpbnQgbiA9IGRheSAlIDEwID09IDAgPyA5IDogZGF5ICUgMTAgLSAxO1xyXG4vLyAgICAgICAgIGlmIChkYXkgPiAzMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgICAgICAgaWYgKGRheSA9PSAxMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwi5Yid5Y2BXCI7XHJcbi8vICAgICAgICAgZWxzZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY2hpbmVzZVRlbkNoYXJbZGF5IC8gMTBdICsgY2hpbmVzZU1vbnRoTnVtYmVyW25dO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5Yac5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudEx1bmFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRMdW5hckhvbGlkYXkodGhpcy5sdW5hck1vbnRoLHRoaXMubHVuYXJEYXkpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5YWs5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFNvbGFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRTb2xhckhvbGlkYXkodGhpcy5tb250aCx0aGlzLmRheSk7XHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5a+55bqU6Zi05Y6G55qE5pel5pyfXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldEx1bmFyRGF0ZSgpIHtcclxuLy8gICAgICAgICByZXR1cm4gY2hpbmVzZU1vbnRoTnVtYmVyW2x1bmFyTW9udGggLSAxXSArIFwi5pyIXCIgKyBnZXRDaGluYURheVN0cmluZyhsdW5hckRheSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lr7nlupTml6XmnJ/nmoTlhazljoboioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOWFrOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOWFrOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRTb2xhckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzb2xhckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZCA9IHNvbGFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZHYgPSBzb2xhckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHNtZCA9IHNtb250aF92ICsgc2RheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAoc2QudHJpbSgpLmVxdWFscyhzbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHNkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKioqXHJcbi8vICAgICAgKiDojrflj5bpmLTljoblr7nlupTnmoToioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOmYtOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOmYtOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRMdW5hckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsdW5hckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgLy8g6L+U5Zue5Yac5Y6G6IqC5YGH5pel5ZCN56ewXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZCA9IGx1bmFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZHYgPSBsdW5hckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGxtZCA9IGxtb250aF92ICsgbGRheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAobGQudHJpbSgpLmVxdWFscyhsbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGxkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuLy8gICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuaYr+WQpuS4uumXsOW5tFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgYm9vbGVhbiBpc0xlYXBZZWFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaWYgKHllYXIgJSAxMDAgPT0gMCAmJiB5ZWFyICUgNDAwID09IDApIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfSBlbHNlIGlmICh5ZWFyICUgMTAwICE9IDAgJiYgeWVhciAlIDQgPT0gMCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Yik5pat5YWs5Y6G5a+55bqU5bm05pyI55qE5aSp5pWwXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSBpc0xlYXBZZWFyXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGhcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIGludCBnZXREYXlzT2ZNb250aChib29sZWFuIGlzTGVhcFllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIHN3aXRjaCAobW9udGgpIHtcclxuLy8gICAgICAgICBjYXNlIDE6XHJcbi8vICAgICAgICAgY2FzZSAzOlxyXG4vLyAgICAgICAgIGNhc2UgNTpcclxuLy8gICAgICAgICBjYXNlIDc6XHJcbi8vICAgICAgICAgY2FzZSA4OlxyXG4vLyAgICAgICAgIGNhc2UgMTA6XHJcbi8vICAgICAgICAgY2FzZSAxMjpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMTtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSA0OlxyXG4vLyAgICAgICAgIGNhc2UgNjpcclxuLy8gICAgICAgICBjYXNlIDk6XHJcbi8vICAgICAgICAgY2FzZSAxMTpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMDtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSAyOlxyXG4vLyAgICAgICAgICAgICBpZiAoaXNMZWFwWWVhcikge1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSAyOTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMjg7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBkYXlzT2ZNb250aDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuW5tOaciOaXpeWxnuS6juaYn+acn+WHoFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBpbnQgZ2V0V2Vla2RheU9mTW9udGgoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIENhbGVuZGFyIGNhbCA9IENhbGVuZGFyLmdldEluc3RhbmNlKCk7XHJcbi8vICAgICAgICAgY2FsLnNldCh5ZWFyLCBtb250aCAtIDEsIDEpO1xyXG4vLyAgICAgICAgIGRheU9mV2VlayA9IGNhbC5nZXQoQ2FsZW5kYXIuREFZX09GX1dFRUspIC0gMTtcclxuLy8gICAgICAgICByZXR1cm4gZGF5T2ZXZWVrO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHtcclxuLy8gICAgICAgICBMdW5hckNhbGVuZGFyIGNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoMjAxOSwgOSwgMTMpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEx1bmFyRGF0ZSgpOlwiICsgY2FsZW5kYXIuZ2V0THVuYXJEYXRlKCkpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKTpcIiArIGNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKSk7XHJcbi8vICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKFwiY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpOlwiICsgY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG4iLCJcblxuY29uc3QgTk9ERV9SRVBMQUNFID0gMCAvL25vZGUgcmVwbGFjZSBcbmNvbnN0IENISUxEX1JFX09SREVSID0gMSAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcbmNvbnN0IE5PREVfUFJPUFMgPSAyIC8vcHJvcCBjaGFuZ2UgXG5jb25zdCBOT0RFX0NPTlRFTlQgPSAzIC8vY29udGVudCBjaGFuZ2VcbmNsYXNzIEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIHZpcnR1YWwgZG9tIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Kn0gdGFnICB0aGUgaHRtbCB0YWcgbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcHMgIHRoZSBwcm9wIChrZXnvvIxzdHlsZS4uKVxuICAgICAqIEBwYXJhbSB7Kn0gY2hpbGRyZW4gY2hpbGQgZGF0YVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRhZywgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhZyA9IHRhZ1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge31cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdXG4gICAgICAgIHRoaXMua2V5ID0gcHJvcHMgPyBwcm9wcy5rZXkgOiB1bmRlZmluZWRcbiAgICAgICAgaWYgKCF0aGlzLmtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ30gLi4uIGh0bWwgdGFnIHRoZSBrZXkgaXMgdW5kZWZpbmVkYClcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvdW50ICs9IGNoaWxkLmNvdW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvdW50ID0gY291bnRcbiAgICB9XG4gICAgLyoqXG4gICAgICogdGhlIG1ldGhvZCB1c2UgdG8gdmlydHVhbCBkb20gIHJlbmRlIHRvIHJlYWwgZG9tXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICBVdGlsLnNldEF0dHIoZWwsIHByb3BOYW1lLCBwcm9wc1twcm9wTmFtZV0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWwgPSAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSA/IGNoaWxkLnJlbmRlcigpIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZEVsKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxufVxuXG5jbGFzcyBEaWZmIHtcbiAgICAvKipcbiAgICAgKiBkb20gdHJlZSBkaWZmIGFsZ29yaXRobSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0geyp9IG9sZFRyZWUgdGhlIGRvbSB0cmVlIGZvciBiZWZvcmUgdXBkYXRlIFxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9sZFRyZWUsIG5ld1RyZWUpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcbiAgICAgICAgdGhpcy5wYXRjaGVzID0ge31cbiAgICAgICAgdGhpcy5kZnNXYWxrKG9sZFRyZWUsIG5ld1RyZWUsIHRoaXMuaW5kZXgpXG4gICAgfVxuICAgIGRmc1dhbGsob2xkTm9kZSwgbmV3Tm9kZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaCA9IFtdXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcblxuICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNTdHJpbmcob2xkTm9kZSkgJiYgVXRpbC5pc1N0cmluZyhuZXdOb2RlKSkge1xuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTk9ERV9DT05URU5ULFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xuICAgICAgICAgICAgbGV0IHByb3BzUGF0Y2hlcyA9IHRoaXMuZGlmZlByb3BzKG9sZE5vZGUsIG5ld05vZGUpXG4gICAgICAgICAgICBpZiAocHJvcHNQYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX1BST1BTLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczogcHJvcHNQYXRjaGVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghVXRpbC5pc0lnbm9yZUNoaWxkcmVuKG5ld05vZGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX1JFUExBQ0UsXG4gICAgICAgICAgICAgICAgbm9kZTogbmV3Tm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBhdGNoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxuICAgICAgICB9XG4gICAgfVxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XG5cbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSBvbGROb2RlLnByb3BzXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xuXG4gICAgICAgIGNvbnN0IHByb3BzUGF0Y2hlcyA9IHt9XG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChuZXdQcm9wc1trZXldICE9PSBvbGRQcm9wc1trZXldKSB7XG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV3UHJvcHMpIHtcbiAgICAgICAgICAgIGlmICghb2xkUHJvcHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgcHJvcHNQYXRjaGVzW2tleV0gPSBuZXdQcm9wc1trZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzU2FtZSA/IG51bGwgOiBwcm9wc1BhdGNoZXNcblxuICAgIH1cbiAgICBkaWZmQ2hpbGRyZW4ob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuLCBpbmRleCwgY3VycmVudFBhdGNoKSB7XG4gICAgICAgIGxldCBkaWZmTGlzdCA9IG5ldyBEaWZmTGlzdChvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4pXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXG4gICAgICAgIG5ld0NoaWxkcmVuID0gZGlmZnMuY2hpbGRcbiAgICAgICAgaWYgKGRpZmZzLm1vdmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDSElMRF9SRV9PUkRFUixcbiAgICAgICAgICAgICAgICBtb3ZlczogZGlmZnMubW92ZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHJlb3JkZXJQYXRjaClcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGVmdE5vZGUgPSBudWxsXG4gICAgICAgIGxldCBjdXJyZW50Tm9kZUluZGV4ID0gaW5kZXhcbiAgICAgICAgb2xkQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldXG4gICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ID0gKGxlZnROb2RlICYmIGxlZnROb2RlLmNvdW50KSA/XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIGxlZnROb2RlLmNvdW50ICsgMSA6XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIDFcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgbmV3Q2hpbGQsIGN1cnJlbnROb2RlSW5kZXgpXG4gICAgICAgICAgICBsZWZ0Tm9kZSA9IGNoaWxkXG4gICAgICAgIH0pXG5cblxuICAgIH1cbn1cblxuY2xhc3MgUGF0Y2gge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHBhdGNoZXMpIHtcbiAgICAgICAgbGV0IHdhbGtlciA9IHtcbiAgICAgICAgICAgIGluZGV4OiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcylcbiAgICB9XG4gICAgZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaGVzID0gcGF0Y2hlc1t3YWxrZXIuaW5kZXhdXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkTm9kZXNbaV1cbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXG4gICAgICAgICAgICB0aGlzLmRmc1dhbGsoY2hpbGQsIHdhbGtlciwgcGF0Y2hlcylcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYXRjaGVzKG5vZGUsIGN1cnJlbnRQYXRjaGVzKVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgYXBwbHlQYXRjaGVzKG5vZGUsIGN1cnJlbnRQYXRjaGUpIHtcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudFBhdGNoLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUkVQTEFDRTpcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJDaGlsZHJlbihub2RlLCBjdXJyZW50UGF0Y2gubW92ZXMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BzKG5vZGUsIGN1cnJlbnRQYXRjaC5wcm9wcylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50UGF0Y2guY29udGVudFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlVmFsdWUgPSBjdXJyZW50UGF0Y2guY29udGVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICByZW9yZGVyQ2hpbGRyZW4obm9kZSwgbW92ZXMpIHtcbiAgICAgICAgbGV0IHN0YXRpY05vZGVMaXN0ID0gVXRpbC50b0FycmF5KG5vZGUuY2hpbGROb2RlcylcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cbiAgICAgICAgc3RhdGljTm9kZUxpc3QuZm9yRWFjaCgoc25vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChzbm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlTWFwc1trZXldID0gc25vZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IG1vdmUuaW5kZXhcbiAgICAgICAgICAgIGlmIChtb3ZlLnR5cGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzW2luZGV4XSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zZXJ0Tm9kZSA9IG5vZGVNYXBzW21vdmUuaXRlbS5rZXldID9cbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5pc1N0cmluZyhtb3ZlLml0ZW0pID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobW92ZS5pdGVtKSA6IG1vdmUuaXRlbS5yZW5kZXIoKVxuICAgICAgICAgICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMCwgaW5zZXJ0Tm9kZSlcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgc2V0UHJvcHMobm9kZSwgcHJvcHMpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzW2tleV1cbiAgICAgICAgICAgICAgICBVdGlsLnNldEF0dHIobm9kZSwga2V5LCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5cblxuXG5jbGFzcyBVdGlsIHtcbiAgICBzdGF0aWMgaXNTdHJpbmcoc29tZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHNvbWUgPT09ICdzdHJpbmcnXG4gICAgfVxuICAgIHN0YXRpYyB0b0FycmF5KGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXJyYXkgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2gobGlzdFtpXSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlcbiAgICB9XG4gICAgc3RhdGljIGlzRm9ySW4oZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXG4gICAgfVxuICAgIHN0YXRpYyBpc0ZvckZvckluKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW5fIFxcd3xfaW4qJC8udGVzdChkaXJlY3Rpb24pXG4gICAgfVxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucHJvcHMgJiYgbm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShcImlnbm9yZVwiKVxuICAgIH1cbiAgICBzdGF0aWMgaXNOdW1iZXIodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8v5q2j5pW05pWwXG4gICAgICAgICAgICB2YXIgcmVOdW1iZXIgPSAvXlxcZCskL1xuICAgICAgICAgICAgLy/otJ/mlbTmlbBcbiAgICAgICAgICAgIHZhciByZU5lTnVtYmVyID0gL14tXFxkKyQvXG4gICAgICAgICAgICAvL+ato+WunuaVsFxuICAgICAgICAgICAgdmFyIHJlUmVhbE51bWJlcjEgPSAvXlsxLTldXFxkKlsuXVxcZCskLyAgLy/pnZ7pm7blvIDlpLRcbiAgICAgICAgICAgIHZhciByZVJlYWxOdW1iZXIyID0gL14wWy5dXFxkKyQvIC8v6Zu25byA5aS0XG4gICAgICAgICAgICAvL+i0n+WunuaVsFxuICAgICAgICAgICAgdmFyIHJlTmVSZWFsTnVtYmVyMSA9IC9eLVsxLTldXFxkKlsuXVxcZCskLyAgLy/pnZ7pm7blvIDlpLRcbiAgICAgICAgICAgIHZhciByZU5lUmVhbE51bWJlcjIgPSAvXi0wWy5dXFxkKyQvIC8v6Zu25byA5aS0XG5cbiAgICAgICAgICAgIGlmIChyZU51bWJlci50ZXN0KHZhbHVlKSB8fCByZU5lTnVtYmVyLnRlc3QodmFsdWUpXG4gICAgICAgICAgICAgICAgfHwgcmVSZWFsTnVtYmVyMS50ZXN0KHZhbHVlKSB8fCByZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpXG4gICAgICAgICAgICAgICAgfHwgcmVOZVJlYWxOdW1iZXIxLnRlc3QodmFsdWUpIHx8IHJlTmVSZWFsTnVtYmVyMi50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgc3RhdGljIHNldEF0dHIobm9kZSwga2V5LCB2YWx1ZSkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSAnc3R5bGUnOlxuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IHZhbHVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ3ZhbHVlJzpcbiAgICAgICAgICAgICAgICBsZXQgdGFnTmFtZSA9IG5vZGUudGFnTmFtZSB8fCAnJ1xuICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ2lucHV0JyB8fCB0YWdOYW1lID09PSAndGV4dGFyZWEnKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUudmFsdWUgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5cbmNsYXNzIERpZmZMaXN0IHtcbiAgICAvKipcbiAgICAgKiBkaWZmIGxpc3QgXG4gICAgICogQHBhcmFtIHsqfSBvbGRMaXN0IFxuICAgICAqIEBwYXJhbSB7Kn0gbmV3TGlzdCBcbiAgICAgKiBAcGFyYW0geyp9IGtleSBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvbGRMaXN0LCBuZXdMaXN0KSB7XG4gICAgICAgIGxldCBvbGRMaXN0S2V5SW5kZXggPSB0aGlzLm1ha2VLZXlJbmRleChvbGRMaXN0KS5rZXlJbmRleFxuICAgICAgICBsZXQgbmV3TGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgobmV3TGlzdCkua2V5SW5kZXhcbiAgICAgICAgdGhpcy5tb3ZlT3BlcmF0b3IgPSBbXVxuICAgICAgICB0aGlzLmNoaWxkTGlzdCA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2xkTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG9sZEl0ZW0gPSBvbGRMaXN0W2ldXG4gICAgICAgICAgICBsZXQgb0l0ZW1LZXkgPSB0aGlzLmdldEtleShvbGRJdGVtKVxuICAgICAgICAgICAgaWYgKCFuZXdMaXN0S2V5SW5kZXguaGFzT3duUHJvcGVydHkob0l0ZW1LZXkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZExpc3QucHVzaChudWxsKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkTGlzdC5wdXNoKG5ld0xpc3RbbmV3TGlzdEtleUluZGV4W29JdGVtS2V5XV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZW1wTGlzdCA9IHRoaXMuY2hpbGRMaXN0LnNsaWNlKDApXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgd2hpbGUgKGkgPCB0aGlzLnRlbXBMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKHRoaXMudGVtcExpc3RbaV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGkpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGkrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBpbmRleCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuZXdMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbkl0ZW0gPSBuZXdMaXN0W2ldXG4gICAgICAgICAgICBsZXQgbkl0ZW1LZXkgPSB0aGlzLmdldEtleShuSXRlbSlcbiAgICAgICAgICAgIGxldCBjSXRlbSA9IHRoaXMudGVtcExpc3RbaW5kZXhdXG4gICAgICAgICAgICBsZXQgY0l0ZW1LZXkgPSB0aGlzLmdldEtleShjSXRlbSlcbiAgICAgICAgICAgIGlmIChjSXRlbSkge1xuICAgICAgICAgICAgICAgIGlmIChuSXRlbUtleSAhPSBjSXRlbUtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2xkTGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG5JdGVtS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNOZXh0SXRlbUtleSA9IGdldEtleSh0aGlzLnRlbXBMaXN0W2luZGV4ICsgMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgPT09IGNOZXh0SXRlbUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKGkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVDb3B5VGVtcExpc3QoaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGsgPSB0aGlzLnRlbXBMaXN0Lmxlbmd0aCAtIGluZGV4XG4gICAgICAgIHdoaWxlIChpbmRleCsrIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGstLVxuICAgICAgICAgICAgdGhpcy5yZW1vdmUoayArIG5ld0xpc3QubGVuZ3RoKVxuICAgICAgICB9XG5cblxuICAgIH1cbiAgICBtYWtlS2V5SW5kZXgobGlzdCkge1xuICAgICAgICBsZXQga2V5SW5kZXggPSB7fVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gbGlzdFtpXVxuICAgICAgICAgICAgbGV0IGl0ZW1LZXkgPSB0aGlzLmdldEtleShpdGVtKVxuICAgICAgICAgICAga2V5SW5kZXhbaXRlbUtleV0gPSBpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGtleUluZGV4OiBrZXlJbmRleFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0S2V5KGl0ZW0pIHtcbiAgICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW1bXCJrZXlcIl1cbiAgICB9XG4gICAgcmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KSB7XG4gICAgICAgIHRoaXMudGVtcExpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgICByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5tb3ZlT3BlcmF0b3IucHVzaCh7XG4gICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICB0eXBlOiAwXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaW5zZXJ0KGluZGV4LCBpdGVtKSB7XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgaXRlbTogaXRlbSxcbiAgICAgICAgICAgIHR5cGU6IDFcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRSZXN1bHQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtb3ZlczogdGhpcy5tb3ZlT3BlcmF0b3IsXG4gICAgICAgICAgICBjaGlsZDogdGhpcy5jaGlsZExpc3RcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbmZ1bmN0aW9uIG9ic2VydmUob2JqLCBvYnNlcnZlTWFwLCBjYWxsYmFjaykge1xuXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCBpbnRlcm5hbFZhbHVlID0gb2JqW2tleV1cbiAgICAgICAgbGV0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXG4gICAgICAgIG9ic2VydmVNYXAucHV0KGtleSwgb2JzZXJ2YWJsZSlcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5hZGQoY2FsbGJhY2spXG4gICAgICAgICAgICAgICAgcmV0dXJuIGludGVybmFsVmFsdWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hhbmdlZCA9IGludGVybmFsVmFsdWUgIT09IG5ld1ZhbFxuICAgICAgICAgICAgICAgIGludGVybmFsVmFsdWUgPSBuZXdWYWxcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlLmludm9rZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIG9ialxufVxuXG5cblxuZnVuY3Rpb24gT2JzZXJ2YWJsZSgpIHtcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucyA9IG5ldyBTZXQoKVxufVxuT2JzZXJ2YWJsZS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG9ic2VydmFibGVVcGRhdGUpIHtcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5hZGQob2JzZXJ2YWJsZVVwZGF0ZSlcbn1cbk9ic2VydmFibGUucHJvdG90eXBlLmludm9rZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnVwZGF0ZUZ1bmN0aW9ucy5mb3JFYWNoKGZ1biA9PiBmdW4oKSlcbn1cblxuXG4vKipcbiAqIHRoZSBtZXRob2QgdXNlIHRvIGRlZXAgY2xvbmUgb2JqXG4gKiBAcGFyYW0geyp9IG9iaiBcbiAqL1xuZnVuY3Rpb24gY2xvbmUob2JqKSB7XG4gICAgbGV0IGdldFR5cGUgPSAobykgPT4ge1xuICAgICAgICBpZiAobyA9PT0gbnVsbCkgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICBpZiAobyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSk7XG4gICAgfVxuICAgIGxldCByZXN1bHQsIG9DbGFzcyA9IGdldFR5cGUob2JqKTtcbiAgICBpZiAob0NsYXNzID09PSBcIk9iamVjdFwiKSB7XG4gICAgICAgIHJlc3VsdCA9IHt9O1xuICAgIH0gZWxzZSBpZiAob0NsYXNzID09PSBcIkFycmF5XCIpIHtcbiAgICAgICAgcmVzdWx0ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIGxldCBjb3B5ID0gb2JqW2tleV07XG4gICAgICAgIGlmIChnZXRUeXBlKGNvcHkpID09IFwiT2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXJndW1lbnRzLmNhbGxlZShjb3B5KTtcbiAgICAgICAgfSBlbHNlIGlmIChnZXRUeXBlKGNvcHkpID09IFwiQXJyYXlcIikge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBhcmd1bWVudHMuY2FsbGVlKGNvcHkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBvYmpba2V5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5cbmZ1bmN0aW9uIGgodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcbn1cblxuZnVuY3Rpb24gZGlmZihvbGRUcmVlLCBuZXdUcmVlKSB7XG4gICAgbGV0IGQgPSBuZXcgRGlmZihvbGRUcmVlLCBuZXdUcmVlKVxuICAgIHJldHVybiBkLnBhdGNoZXNcbn1cblxuXG5mdW5jdGlvbiBwYXRjaChub2RlLCBwYXRjaGVzKSB7XG4gICAgcmV0dXJuIG5ldyBQYXRjaChub2RlLCBwYXRjaGVzKVxufVxuLyoqXG4gKiB0aGUgbWFwIG9iamVjdCB1c2UgdG8gc2F2ZSBsaWtpbHkgKGtleSx2YWx1ZSkgZGF0YVxuICovXG5jbGFzcyBNYXAge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IE9iamVjdCgpO1xuICAgIH1cbiAgICBwdXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5tYXApKSB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLm1hcCkgPyB0aGlzLm1hcFtrZXldIDogbnVsbDtcbiAgICB9XG4gICAgcmVtb3ZlKGtleSkge1xuICAgICAgICBpZiAoKGtleSBpbiB0aGlzLm1hcCkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm1hcFtrZXldXG4gICAgICAgICAgICB0aGlzLmxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgICB9XG4gICAgY2xlYXIoKSB7XG4gICAgICAgIGxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IE9iamVjdCgpO1xuICAgIH1cbn1cblxuXG5jbGFzcyBSViB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uKSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGVsLFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIGRvbVxuICAgICAgICB9ID0gb3B0aW9uXG4gICAgICAgIGxldCByb290ID0gVXRpbC5pc1N0cmluZyhlbCkgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKSA6IGVsXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGFcbiAgICAgICAgdGhpcy52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxuICAgICAgICB0aGlzLncgPSB0aGlzLnZlLnJlbmRlcigpXG4gICAgICAgIHJvb3QuYXBwZW5kQ2hpbGQodGhpcy53KVxuICAgICAgICB0aGlzLm9ic2VydmVNYXAgPSBuZXcgTWFwKClcbiAgICAgICAgb2JzZXJ2ZSh0aGlzLmRhdGEsIHRoaXMub2JzZXJ2ZU1hcCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnVwZGF0ZWRvbShkb20pXG5cbiAgICB9XG4gICAgdXBkYXRlZG9tKGRvbSkge1xuICAgICAgICBsZXQgbnZlID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudCh0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbSkpXG4gICAgICAgIHdpbmRvdy5udmUgPSBudmVcbiAgICAgICAgd2luZG93LnZlID0gdGhpcy52ZVxuICAgICAgICBwYXRjaCh0aGlzLncsIGRpZmYodGhpcy52ZSwgbnZlKSlcbiAgICAgICAgdGhpcy52ZSA9IG52ZVxuICAgIH1cbiAgICB3YXRjaChrZXksIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZU1hcC5nZXQoa2V5KS5hZGQoY2FsbGJhY2spXG4gICAgfVxuICAgIGdldFZpcnR1YWxFbGVtZW50KGRvbSkge1xuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbXVxuICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGxldCBjYyA9IGRvbS5jaGlsZHJlbltjaGlsZF1cbiAgICAgICAgICAgIGlmIChjYyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgY2MuZm9yRWFjaChjID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHYgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KGMpXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2godilcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYyBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjYylcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHYpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2MpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaChkb20udGFnLCBkb20ucHJvcHMsIGNoaWxkcmVuKVxuICAgIH1cbiAgICBhcHBseVRydXRoZnVsRGF0YShkb20pIHtcbiAgICAgICAgaWYgKFwiZm9yXCIgaW4gZG9tLnByb3BzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YUFycmF5ID0gW11cbiAgICAgICAgICAgIGxldCBpc0ZvckZvciA9IGZhbHNlXG4gICAgICAgICAgICBsZXQgZGF0YVNpbmdsZVxuXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0ZvckluKSB7XG4gICAgICAgICAgICAgICAgaWYoXCJjaGlsZERvbURhdGFrZXlcIiBpbiBkb20pe1xuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXk9ZG9tLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZT1kb20uY2hpbGREb21EYXRha2V5XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoXCJkb21EYXRhS2V5XCIgaW4gZG9tKXtcbiAgICAgICAgICAgICAgICAgICAgaWYoZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXT09PWRvbS5kb21EYXRhS2V5KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheT1kb20uZGF0YVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gdGhpcy5kYXRhW2RvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV1dXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0aGUgZm9yIGRpcmVjdGl2ZSB1c2UgZXJyb3JcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBvYmpzID0gW11cbiAgICAgICAgICAgIGRhdGFBcnJheS5mb3JFYWNoKGRhdGEgPT4ge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBvYmo9dGhpcy52ZG9tMnJkb20oZG9tLGRhdGEsZGF0YVNpbmdsZSxkYXRhKVxuXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKG9iailcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgcmV0dXJuIG9ianNcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IGRhdGFcbiAgICAgICAgICAgIGxldCBjaGlsZERvbURhdGFrZXlcbiAgICAgICAgICAgIGlmIChcImRhdGFcIiBpbiBkb20pIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gZG9tLmRhdGFcbiAgICAgICAgICAgICAgICBjaGlsZERvbURhdGFrZXkgPSBkb20uY2hpbGREb21EYXRha2V5XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGFcbiAgICAgICAgICAgICAgICBjaGlsZERvbURhdGFrZXk9dW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG9iaj10aGlzLnZkb20ycmRvbShkb20sZGF0YSxjaGlsZERvbURhdGFrZXksdGhpcy5kYXRhKVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqXG4gICAgICAgIH1cbiAgICB9XG4gICAgdmRvbTJyZG9tKGRvbSxkYXRhLGRhdGFTaW5nbGUsdGRhdGEpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInZkb20ycmRvbTpcIitKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICAgICAgbGV0IG9iaiA9IHt9XG4gICAgICAgIG9iai50YWcgPSBkb20udGFnXG4gICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXG4gICAgICAgIG9iai5wcm9wcyA9IHt9XG4gICAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKGRvbS5wcm9wcylcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxuXG4gICAgICAgICAgICAgICAgaWYgKHN0eWxlLmluZGV4T2YoXCIsXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlLnNwbGl0KFwiLFwiKVxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChSVi5pc1BsYWNlSG9sZGVyKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBkb20ucHJvcHNbdmFsdWVdOiR7ZG9tLnByb3BzW3ZhbHVlXX0sUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKSk6JHtSVi5pc0RvdE9wZXJhdG9yRXhwcmVzc2lvbihSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pKX1gKVxuICAgICAgICAgICAgICAgICAgICBpZiAoIVJWLmlzRG90T3BlcmF0b3JFeHByZXNzaW9uKFJWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInJkYXRhOlwiK3RkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSldKVxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLnByb3BzW3ZhbHVlXSldXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pLnNwbGl0KFwiLlwiKVsxXV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUlYuaXNPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gUlYuZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0sIGRhdGEsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGRvbS5jaGlsZHJlbltjaGlsZF0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuaW5kZXhPZihkYXRhU2luZ2xlKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSldXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuc3BsaXQoXCIuXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGRyZW5bY2hpbGRdXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkb20uY2hpbGRyZW5bY2hpbGRdIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcImNoaWxkRG9tRGF0YVwiIGluIGRvbS5wcm9wcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5jaGlsZERvbURhdGFrZXkgPSBkb20ucHJvcHMuY2hpbGREb21EYXRhXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgfWVsc2UgaWYoXCJkb21EYXRhXCIgaW4gZG9tLnByb3BzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZG9tRGF0YUtleSA9IGRvbS5wcm9wcy5kb21EYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhW2NoaWxkXVxuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20uY2hpbGRyZW5bY2hpbGRdKVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9ialxuXG4gICAgfVxuICAgIGhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKSB7XG4gICAgICAgIGxldCBuZXdTdHlsZSA9ICcnXG4gICAgICAgIGlmIChkYXRhU2luZ2xlKSB7XG4gICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihzdHlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuaW5kZXhPZihkYXRhU2luZ2xlKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuc3BsaXQoXCIuXCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gZGF0YVtrZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXG4gICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxuICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoc3R5bGVWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdHlsZVxuICAgIH1cbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xuICAgICAgICBsZXQgbmV3U3R5bGVBcnJheSA9IFwiXCJcbiAgICAgICAgZm9yIChsZXQgc3R5bGUgb2Ygc3R5bGVzKSB7XG5cbiAgICAgICAgICAgIGxldCBuZXdTdHlsZSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICBuZXdTdHlsZUFycmF5ICs9IG5ld1N0eWxlICsgXCI7XCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3R5bGVBcnJheVxuXG4gICAgfVxuICAgIHN0YXRpYyBpc1BsYWNlSG9sZGVyKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmICgvXiUjXFx3Ki5cXHcqIyUkLy50ZXN0KGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNEb3RPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCl7XG4gICAgICAgIHJldHVybiAvXlxcdypcXC5cXHcqJC8udGVzdChjb250ZW50KVxuICAgIH1cbiAgICBzdGF0aWMgZ2V0UGxhY2VIb2xkZXJWYWx1ZShjb250ZW50KSB7XG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDIsIC0yKVxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmmK/lkKbkuLrooajovr7lvI9cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29udGVudCBcbiAgICAgKi9cbiAgICBzdGF0aWMgaXNPcGVyYXRvckV4cHJlc3Npb24oY29udGVudCkge1xuXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBpZiAoL15cXHtcXHcqfFxcfFxcJStcXH0kLy50ZXN0KGNvbnRlbnQpKSB7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBzdGF0aWMgZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQsIGRhdGEsIGRhdGFLZXkpIHtcbiAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoY29udGVudCkpIHtcblxuICAgICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSBjb250ZW50LnNsaWNlKGNvbnRlbnQuaW5kZXhPZihcIntcIikgKyAxLCBjb250ZW50LmluZGV4T2YoXCJ9XCIpKVxuICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSBleHByZXNzaW9uLmluZGV4T2YoXCIlI1wiKVxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikgKyAyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdldE9wZXJhdG9yRXhwcmVzc2lvbixzdGFydEluZGV4OlwiICsgKHN0YXJ0SW5kZXgpICsgXCIsZW5kSW5kZXg6XCIgKyAoZW5kSW5kZXgpICsgXCIsZXhwcmVzczpcIiArIGV4cHJlc3Npb24pXG4gICAgICAgICAgICBpZiAoc3RhcnRJbmRleCAhPSAtMSAmJiBlbmRJbmRleCAhPSAtMSAmJiBzdGFydEluZGV4IDwgZW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGxhY2VIb2xkZXIgPSBleHByZXNzaW9uLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uLHBsYWNlSG9sZGVyOlwiICsgcGxhY2VIb2xkZXIgKyBcIixleHByZXNzOlwiICsgZXhwcmVzc2lvbilcbiAgICAgICAgICAgICAgICBsZXQgcmVhbFZhbHVlXG4gICAgICAgICAgICAgICAgaWYgKHBsYWNlSG9sZGVyLmluZGV4T2YoXCIuXCIpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzBdID09PSBkYXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxhY2VIb2xkZXJWYWx1ZSA9IGRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhbFZhbHVlID0gVXRpbC5pc051bWJlcihwbGFjZUhvbGRlclZhbHVlKSA/IHBsYWNlSG9sZGVyVmFsdWUgOiBgXCIke3BsYWNlSG9sZGVyVmFsdWV9XCJgLy/pgJrov4dwbGFjZUhvbGRlcuWPluecn+WunueahOWAvFxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVhbFZhbHVlICwxLDpcIiArIHJlYWxWYWx1ZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUocGxhY2VIb2xkZXIpXS8v6YCa6L+HcGxhY2VIb2xkZXLlj5bnnJ/lrp7nmoTlgLxcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWFsVmFsdWUgLDIsOlwiICsgcmVhbFZhbHVlKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBleHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJleHByZXNzaW9uLHJlYWxWYWx1ZTpcIiArIGV4cHJlc3Npb24pXG4gICAgICAgICAgICByZXR1cm4gZXZhbChleHByZXNzaW9uKVxuICAgICAgICB9XG5cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSViJdLCJzb3VyY2VSb290IjoiIn0=