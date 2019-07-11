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
                        for_for: 'week _in_ weeks'
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

                            for: 'v _in'
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

            console.log("applyTruthfulData,dom.keys:" + Object.keys(dom) + ",childDomData:" + ("childDomData" in dom));
            if ("for" in dom.props || "for_for" in dom.props) {
                var dataArray = [];
                var isForFor = false;
                var dataSingle = void 0;
                if (dom.props['for']) {
                    //add for direction
                    if (Util.isForOrForFor(dom.props['for'])) {
                        if (dom.forData) {
                            if (Util.isForIn(dom.props['for'])) {
                                throw new Error("plase use _in direction");
                            }
                            dataArray = dom.forData;
                            dataSingle = dom.props['for'].split(" _in")[0];
                        } else {
                            if (Util.isForForIn(dom.props['for'])) {
                                throw new Error("plase use _in_ direction");
                            }
                            dataArray = this.data[dom.props['for'].split(" _in_ ")[1]];
                            dataSingle = dom.props['for'].split(" _in_ ")[0];
                        }
                    }
                } else if (dom.props['for_for']) {
                    //add for_for direction
                    if (Util.isForOrForFor(dom.props['for_for'])) {
                        if (Util.isForForIn(dom.props['for_for'])) {
                            throw new Error("plase use _in_ direction");
                        }
                        isForFor = true;
                        dataArray = this.data[dom.props['for_for'].split(" _in_ ")[1]];
                        dataSingle = dom.props['for_for'].split(" _in_ ")[0];
                    } else {}
                } else {
                    throw new Error("the for direction use error");
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
                                if (RV.getPlaceHolderValue(dom.props[value]).indexOf(dataSingle) == -1) {
                                    obj.props[value] = _this5.data[RV.getPlaceHolderValue(dom.props[value])];
                                } else {
                                    obj.props[value] = data[RV.getPlaceHolderValue(dom.props[value]).split(".")[1]];
                                }
                            } else if (RV.isOperatorExpression(dom.props[value])) {

                                obj.props[value] = RV.getOperatorExpression(dom.props[value], data);
                            } else {
                                obj.props[value] = dom.props[value];
                            }
                        }
                    }

                    for (var child in dom.children) {
                        if (Util.isString(dom.children[child])) {
                            console.log("childString,child:" + dom.children[child]);

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
                            if (isForFor) {
                                dom.children[child].forData = data;
                            } else {
                                if (dom.children[child] instanceof Object) {
                                    dom.children[child].data = data;
                                }
                            }
                            obj.children[child] = _this5.applyTruthfulData(dom.children[child]);
                        }
                    }

                    objs.push(obj);
                });
                return objs;
            } else {

                var data = void 0;
                if ("data" in dom) {
                    data = dom.data;
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

                            obj.props[value] = RV.getOperatorExpression(dom.props[value], data);
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
                if (content.startsWith("%#") && content.endsWith("#%")) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
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
                if (content.indexOf("{") != -1 && content.indexOf("}") != -1) {

                    return true;
                } else {

                    return false;
                }
            }
            return false;
        }
    }, {
        key: 'getOperatorExpression',
        value: function getOperatorExpression(content, data) {
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
                        var placeHolderValue = data[RV.getPlaceHolderValue(placeHolder).split(".")[1]];
                        realValue = Util.isNumber(placeHolderValue) ? placeHolderValue : '"' + placeHolderValue + '"'; //通过placeHolder取真实的值


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2FsZW5kYXJEZW1vLmpzIiwid2VicGFjazovLy8uL3NyYy9SVmNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9sdW5hci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwic2VsZWN0RGF0ZSIsImFsZXJ0IiwiZ2VuZXJhdGVWaWV3IiwiQ2FsZW5kYXIiLCJtb250aHMiLCJBcnJheSIsImRheUNvdW50cyIsImRheXMiLCJ0b2RheSIsImdldFRvZGF5IiwieWVhciIsIm1vbnRoIiwibmV3Q2FsIiwiRGF0ZSIsInNlbGVjdERheSIsImRheSIsInN0YXJ0RGF5IiwiZGFpbHkiLCJydiIsInVuZGVmaW5lZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwcm90b3R5cGUiLCJnZXRXZWVrcyIsImdldERheSIsImdldERheUNvdW50cyIsIndlZWtzIiwiaSIsImRheUluV2Vla3MiLCJpZCIsImoiLCJfY2VsbE9iaiIsImNvbnRlbnQiLCJzdHlsZSIsImxhYmxlIiwibHVuYXIiLCJsdW5hckNhbGVuZGFyIiwiZ2V0THVuYXIiLCJsdW5hckluZm8iLCJjYWxlbmRhcmljaXR5Iiwic29sYXJIb2xpZGF5IiwibHVuYXJIb2xpZGF5IiwiY2hpbmFEYXkiLCJjaGluYU1vbnRoIiwicHVzaCIsIl9vYmoiLCJub3ciLCJnZXREYXRlIiwic3ViTW9udGgiLCJjb25zb2xlIiwibG9nIiwiYWRkTW9udGgiLCJzZXRNb250aCIsInNldFllYXIiLCJtb3VzZU92ZXIiLCJlbGVtZW50IiwiY29sb3IiLCJtb3VzZU91dCIsImxhYmVsIiwiZ2V0QXR0cmlidXRlIiwibUNhbGVuZGFyIiwiY2xpY2tEYXkiLCJpbm5lclRleHQiLCJjaGlsZHJlbiIsImVsIiwiY2FsbGJhY2siLCJSViIsImRhdGEiLCJ3ZWVrVGl0bGVzIiwidmFsdWUiLCJkb20iLCJ0YWciLCJwcm9wcyIsImJvcmRlciIsImNlbGxwYWRkaW5nIiwiY2VsbHNwYWNpbmciLCJrZXkiLCJhbGlnbiIsInZhbGlnbiIsImNvbHNwYW4iLCJvbmNsaWNrIiwibmFtZSIsInR5cGUiLCJtYXhsZW5ndGgiLCJzaXplIiwiZm9yIiwiZm9yX2ZvciIsIm9uTW91c2VvdmVyIiwib25Nb3VzZU91dCIsImNoaWxkRG9tRGF0YSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwibnZhbHVlIiwiZ2V0IiwiTHVuYXJDYWxlbmRhciIsIl95ZWFySW5mbyIsIl9hc3Ryb2xvZ3kiLCJfZGF5SW5Nb250aCIsIl9UaWFuR2FuIiwiX0RpWmhpIiwiX1pvZGlhYyIsIl9jYWxlbmRhcmljaXR5IiwiX2x1bmFySG9saWRheSIsIl9zb2xhckhvbGlkYXkiLCJfY2FsZW5kYXJpY2l0eVRhYmxlIiwiX2NoaW5lc2VDaGFyIiwiX2NoaW5lc2VUZW5DaGFyIiwiX2x1bmFyTW9udGhUYWJsZSIsInN1bSIsIl9sZWFwRGF5c0luTHVuYXJZZWFyIiwiX2xlYXBNb250aEluTHVuYXJZZWFyIiwibXMiLCJnYW5LZXkiLCJ6aGlLZXkiLCJjTW9udGgiLCJjRGF5IiwiYXJyIiwib2Zmc2V0IiwiaW5kZXgiLCJfdGFibGUiLCJfY2FsZW5kYXJpY2l0eUluZm8iLCJwYXJzZUludCIsInN1YnN0ciIsInRvU3RyaW5nIiwiX2NhbGRheSIsInMiLCJNYXRoIiwiZmxvb3IiLCJsdW5hckhvbGlkYXlTdHIiLCJmb3JFYWNoIiwibGQiLCJzcGxpdCIsImxkdiIsImxtb250aF92IiwibGRheV92IiwibG1kIiwidHJpbSIsInNvbGFySG9saWRheVN0ciIsInNkIiwic29sYXIiLCJzZHYiLCJzbW9udGhfdiIsInNkYXlfdiIsInNtZCIsImZpcnN0Q2FsZW5kYXJpY2l0eURheSIsInNlY29uZENhbGVuZGFyaWNpdHlEYXkiLCJub3dTZWxlY3REYXkiLCJub3dTZWxlY3RNb250aCIsImNhbGVuZGFyaWNpdHlTdHIiLCJzb2xhclllYXIiLCJzb2xhck1vbnRoIiwic29sYXJEYXkiLCJub3dTZWxlY3REYXRlIiwibm93U2VsZWN0WWVhciIsIlVUQyIsInRlbXBZZWFyIiwibGVhcCIsInRlbXAiLCJfbHVuYXJZZWFyRGF5cyIsImlzVG9kYXlPYmoiLCJpc1RvZGF5IiwibldlZWsiLCJjV2VlayIsImlzTGVhcCIsInRlbXBNb250aCIsIl9tb250aERheXMiLCJzbSIsImdhblpoaVllYXIiLCJfZ2V0R2FuWmhpWWVhciIsIl9maXJzdENhbGVuZGFyaWNpdHlEYXkiLCJfZ2V0Q2FsZW5kYXJpY2l0eSIsIl9zZWNvbmRDYWxlbmRhcmljaXR5RGF5IiwiZ2FuWmhpTW9udGgiLCJfZ2V0R2FuWmhpIiwiX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eSIsImRheUN5Y2xpY2FsIiwiZ2FuWmhpRGF5IiwiYXN0cm8iLCJfZ2V0QXN0cm9sb2d5Iiwiem9kaWFjIiwiX2dldFpvZGlhYyIsIl9nZXRDaGluYU1vbnRoIiwiX2dldENoaW5hRGF5IiwiX2dldEx1bmFySG9saWRheSIsIl9nZXRTb2xhckhvbGlkYXkiLCJOT0RFX1JFUExBQ0UiLCJDSElMRF9SRV9PUkRFUiIsIk5PREVfUFJPUFMiLCJOT0RFX0NPTlRFTlQiLCJFbGVtZW50IiwidGFnTmFtZSIsIkVycm9yIiwiY291bnQiLCJjaGlsZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInByb3BOYW1lIiwiVXRpbCIsInNldEF0dHIiLCJjaGlsZEVsIiwicmVuZGVyIiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsIkRpZmYiLCJvbGRUcmVlIiwibmV3VHJlZSIsInBhdGNoZXMiLCJkZnNXYWxrIiwib2xkTm9kZSIsIm5ld05vZGUiLCJjdXJyZW50UGF0Y2giLCJpc1N0cmluZyIsInByb3BzUGF0Y2hlcyIsImRpZmZQcm9wcyIsImlzSWdub3JlQ2hpbGRyZW4iLCJkaWZmQ2hpbGRyZW4iLCJub2RlIiwibGVuZ3RoIiwib2xkUHJvcHMiLCJuZXdQcm9wcyIsImlzU2FtZSIsImhhc093blByb3BlcnR5Iiwib2xkQ2hpbGRyZW4iLCJuZXdDaGlsZHJlbiIsImRpZmZMaXN0IiwiRGlmZkxpc3QiLCJkaWZmcyIsImdldFJlc3VsdCIsIm1vdmVzIiwicmVvcmRlclBhdGNoIiwibGVmdE5vZGUiLCJjdXJyZW50Tm9kZUluZGV4IiwibmV3Q2hpbGQiLCJQYXRjaCIsIndhbGtlciIsImN1cnJlbnRQYXRjaGVzIiwibGVuIiwiY2hpbGROb2RlcyIsImFwcGx5UGF0Y2hlcyIsImN1cnJlbnRQYXRjaGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwicmVvcmRlckNoaWxkcmVuIiwic2V0UHJvcHMiLCJ0ZXh0Q29udGVudCIsIm5vZGVWYWx1ZSIsInN0YXRpY05vZGVMaXN0IiwidG9BcnJheSIsIm5vZGVNYXBzIiwic25vZGUiLCJub2RlVHlwZSIsIm1vdmUiLCJyZW1vdmVDaGlsZCIsInNwbGljZSIsImluc2VydE5vZGUiLCJpdGVtIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQXR0cmlidXRlIiwic29tZSIsImxpc3QiLCJhcnJheSIsImRpcmVjdGlvbiIsInRlc3QiLCJyZU51bWJlciIsInJlTmVOdW1iZXIiLCJyZVJlYWxOdW1iZXIxIiwicmVSZWFsTnVtYmVyMiIsInJlTmVSZWFsTnVtYmVyMSIsInJlTmVSZWFsTnVtYmVyMiIsImNzc1RleHQiLCJ0b0xvd2VyQ2FzZSIsInNldEF0dHJpYnV0ZSIsIm9sZExpc3QiLCJuZXdMaXN0Iiwib2xkTGlzdEtleUluZGV4IiwibWFrZUtleUluZGV4Iiwia2V5SW5kZXgiLCJuZXdMaXN0S2V5SW5kZXgiLCJtb3ZlT3BlcmF0b3IiLCJjaGlsZExpc3QiLCJvbGRJdGVtIiwib0l0ZW1LZXkiLCJnZXRLZXkiLCJ0ZW1wTGlzdCIsInNsaWNlIiwicmVtb3ZlIiwicmVtb3ZlQ29weVRlbXBMaXN0Iiwibkl0ZW0iLCJuSXRlbUtleSIsImNJdGVtIiwiY0l0ZW1LZXkiLCJjTmV4dEl0ZW1LZXkiLCJpbnNlcnQiLCJrIiwiaXRlbUtleSIsIm9ic2VydmUiLCJvYmoiLCJvYnNlcnZlTWFwIiwia2V5cyIsImludGVybmFsVmFsdWUiLCJvYnNlcnZhYmxlIiwiT2JzZXJ2YWJsZSIsInB1dCIsImFkZCIsIm5ld1ZhbCIsImNoYW5nZWQiLCJpbnZva2UiLCJ1cGRhdGVGdW5jdGlvbnMiLCJTZXQiLCJvYnNlcnZhYmxlVXBkYXRlIiwiZnVuIiwiY2xvbmUiLCJnZXRUeXBlIiwibyIsImNhbGwiLCJyZXN1bHQiLCJvQ2xhc3MiLCJjb3B5IiwiYXJndW1lbnRzIiwiY2FsbGVlIiwiaCIsImRpZmYiLCJkIiwicGF0Y2giLCJNYXAiLCJtYXAiLCJvcHRpb24iLCJyb290IiwicXVlcnlTZWxlY3RvciIsInZlIiwiZ2V0VmlydHVhbEVsZW1lbnQiLCJhcHBseVRydXRoZnVsRGF0YSIsInciLCJ1cGRhdGVkb20iLCJudmUiLCJjYyIsInYiLCJjIiwiZGF0YUFycmF5IiwiaXNGb3JGb3IiLCJkYXRhU2luZ2xlIiwiaXNGb3JPckZvckZvciIsImZvckRhdGEiLCJpc0ZvckluIiwiaXNGb3JGb3JJbiIsIm9ianMiLCJwcm9wIiwiaW5kZXhPZiIsInN0eWxlcyIsImhhbmRsZUFycmF5U3R5bGUiLCJoYW5kbGVTaW5nbGVTdHlsZSIsImlzUGxhY2VIb2xkZXIiLCJnZXRQbGFjZUhvbGRlclZhbHVlIiwiaXNPcGVyYXRvckV4cHJlc3Npb24iLCJnZXRPcGVyYXRvckV4cHJlc3Npb24iLCJuZXdTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsIm5ld1N0eWxlQXJyYXkiLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiLCJleHByZXNzaW9uIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwicGxhY2VIb2xkZXIiLCJyZWFsVmFsdWUiLCJwbGFjZUhvbGRlclZhbHVlIiwiaXNOdW1iZXIiLCJyZXBsYWNlIiwiZXZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5N0JBLElBQU1zSixlQUFlLENBQXJCLEMsQ0FBdUI7QUFDdkIsSUFBTUMsaUJBQWlCLENBQXZCLEMsQ0FBeUI7QUFDekIsSUFBTUMsYUFBYSxDQUFuQixDLENBQXFCO0FBQ3JCLElBQU1DLGVBQWUsQ0FBckIsQyxDQUF1Qjs7SUFDakJDLE87QUFDRjs7Ozs7O0FBTUEscUJBQVl2SCxHQUFaLEVBQWlCQyxLQUFqQixFQUF3QlQsUUFBeEIsRUFBa0M7QUFBQTs7QUFDOUIsWUFBSSxFQUFFLGdCQUFnQitILE9BQWxCLENBQUosRUFBZ0M7QUFDNUIsbUJBQU8sSUFBSUEsT0FBSixDQUFZQyxPQUFaLEVBQXFCdkgsS0FBckIsRUFBNEJULFFBQTVCLENBQVA7QUFDSDtBQUNELGFBQUtRLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsU0FBUyxFQUF0QjtBQUNBLGFBQUtULFFBQUwsR0FBZ0JBLFlBQVksRUFBNUI7QUFDQSxhQUFLYSxHQUFMLEdBQVdKLFFBQVFBLE1BQU1JLEdBQWQsR0FBb0J6RCxTQUEvQjtBQUNBLFlBQUksQ0FBQyxLQUFLeUQsR0FBVixFQUFlO0FBQ1gsa0JBQU0sSUFBSW9ILEtBQUosQ0FBYXpILEdBQWIsd0NBQU47QUFDSDtBQUNELFlBQUkwSCxRQUFRLENBQVo7QUFDQSxhQUFLbEksUUFBTCxDQUFjbUUsT0FBZCxDQUFzQixpQkFBUztBQUMzQixnQkFBSWdFLGlCQUFpQkosT0FBckIsRUFBOEI7QUFDMUJHLHlCQUFTQyxNQUFNRCxLQUFmO0FBQ0g7QUFDREE7QUFDSCxTQUxEO0FBTUEsYUFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7QUFDRDs7Ozs7OztpQ0FHUztBQUNMLGdCQUFNakksS0FBS21JLFNBQVNDLGFBQVQsQ0FBdUIsS0FBSzdILEdBQTVCLENBQVg7QUFDQSxnQkFBTUMsUUFBUSxLQUFLQSxLQUFuQjtBQUNBLGlCQUFLLElBQU02SCxRQUFYLElBQXVCN0gsS0FBdkIsRUFBOEI7QUFDMUI4SCxxQkFBS0MsT0FBTCxDQUFhdkksRUFBYixFQUFpQnFJLFFBQWpCLEVBQTJCN0gsTUFBTTZILFFBQU4sQ0FBM0I7QUFDSDtBQUNELGlCQUFLdEksUUFBTCxDQUFjbUUsT0FBZCxDQUFzQixpQkFBUztBQUMzQixvQkFBTXNFLFVBQVdOLGlCQUFpQkosT0FBbEIsR0FBNkJJLE1BQU1PLE1BQU4sRUFBN0IsR0FBOENOLFNBQVNPLGNBQVQsQ0FBd0JSLEtBQXhCLENBQTlEO0FBQ0FsSSxtQkFBRzJJLFdBQUgsQ0FBZUgsT0FBZjtBQUNILGFBSEQ7QUFJQSxtQkFBT3hJLEVBQVA7QUFDSDs7Ozs7O0lBR0M0SSxJO0FBQ0Y7Ozs7O0FBS0Esa0JBQVlDLE9BQVosRUFBcUJDLE9BQXJCLEVBQThCO0FBQUE7O0FBQzFCLGFBQUt2RixLQUFMLEdBQWEsQ0FBYjtBQUNBLGFBQUt3RixPQUFMLEdBQWUsRUFBZjtBQUNBLGFBQUtDLE9BQUwsQ0FBYUgsT0FBYixFQUFzQkMsT0FBdEIsRUFBK0IsS0FBS3ZGLEtBQXBDO0FBQ0g7Ozs7Z0NBQ08wRixPLEVBQVNDLE8sRUFBUzNGLEssRUFBTztBQUM3QixnQkFBSTRGLGVBQWUsRUFBbkI7QUFDQSxnQkFBSUQsV0FBVyxJQUFmLEVBQXFCLENBRXBCLENBRkQsTUFFTyxJQUFJWixLQUFLYyxRQUFMLENBQWNILE9BQWQsS0FBMEJYLEtBQUtjLFFBQUwsQ0FBY0YsT0FBZCxDQUE5QixFQUFzRDtBQUN6RCxvQkFBSUQsV0FBV0MsT0FBZixFQUF3QjtBQUNwQkMsaUNBQWF2SyxJQUFiLENBQWtCO0FBQ2RzQyw4QkFBTTJHLFlBRFE7QUFFZDdKLGlDQUFTa0w7QUFGSyxxQkFBbEI7QUFJSDtBQUNKLGFBUE0sTUFPQSxJQUFJRCxRQUFRbEIsT0FBUixLQUFvQm1CLFFBQVFuQixPQUE1QixJQUF1Q2tCLFFBQVFySSxHQUFSLElBQWVzSSxRQUFRdEksR0FBbEUsRUFBdUU7QUFDMUUsb0JBQUl5SSxlQUFlLEtBQUtDLFNBQUwsQ0FBZUwsT0FBZixFQUF3QkMsT0FBeEIsQ0FBbkI7QUFDQSxvQkFBSUcsWUFBSixFQUFrQjtBQUNkRixpQ0FBYXZLLElBQWIsQ0FBa0I7QUFDZHNDLDhCQUFNMEcsVUFEUTtBQUVkcEgsK0JBQU82STtBQUZPLHFCQUFsQjtBQUlIO0FBQ0Qsb0JBQUksQ0FBQ2YsS0FBS2lCLGdCQUFMLENBQXNCTCxPQUF0QixDQUFMLEVBQXFDO0FBQ2pDLHlCQUFLTSxZQUFMLENBQWtCUCxRQUFRbEosUUFBMUIsRUFBb0NtSixRQUFRbkosUUFBNUMsRUFBc0R3RCxLQUF0RCxFQUE2RDRGLFlBQTdEO0FBQ0g7QUFDSixhQVhNLE1BV0E7QUFDSEEsNkJBQWF2SyxJQUFiLENBQWtCO0FBQ2RzQywwQkFBTXdHLFlBRFE7QUFFZCtCLDBCQUFNUDtBQUZRLGlCQUFsQjtBQUlIO0FBQ0QsZ0JBQUlDLGFBQWFPLE1BQWpCLEVBQXlCO0FBQ3JCLHFCQUFLWCxPQUFMLENBQWF4RixLQUFiLElBQXNCNEYsWUFBdEI7QUFDSDtBQUNKOzs7a0NBQ1NGLE8sRUFBU0MsTyxFQUFTOztBQUV4QixnQkFBTVMsV0FBV1YsUUFBUXpJLEtBQXpCO0FBQ0EsZ0JBQU1vSixXQUFXVixRQUFRMUksS0FBekI7O0FBRUEsZ0JBQU02SSxlQUFlLEVBQXJCO0FBQ0EsZ0JBQUlRLFNBQVMsSUFBYjtBQUNBLGlCQUFLLElBQUlqSixJQUFULElBQWdCK0ksUUFBaEIsRUFBMEI7QUFDdEIsb0JBQUlDLFNBQVNoSixJQUFULE1BQWtCK0ksU0FBUy9JLElBQVQsQ0FBdEIsRUFBcUM7QUFDakNpSiw2QkFBUyxLQUFUO0FBQ0FSLGlDQUFhekksSUFBYixJQUFvQmdKLFNBQVNoSixJQUFULENBQXBCO0FBQ0g7QUFDSjtBQUNELGlCQUFLLElBQUlBLEtBQVQsSUFBZ0JnSixRQUFoQixFQUEwQjtBQUN0QixvQkFBSSxDQUFDRCxTQUFTRyxjQUFULENBQXdCbEosS0FBeEIsQ0FBTCxFQUFtQztBQUMvQmlKLDZCQUFTLEtBQVQ7QUFDQVIsaUNBQWF6SSxLQUFiLElBQW9CZ0osU0FBU2hKLEtBQVQsQ0FBcEI7QUFDSDtBQUNKO0FBQ0QsbUJBQU9pSixTQUFTLElBQVQsR0FBZ0JSLFlBQXZCO0FBRUg7OztxQ0FDWVUsVyxFQUFhQyxXLEVBQWF6RyxLLEVBQU80RixZLEVBQWM7QUFBQTs7QUFDeEQsZ0JBQUljLFdBQVcsSUFBSUMsUUFBSixDQUFhSCxXQUFiLEVBQTBCQyxXQUExQixDQUFmO0FBQ0EsZ0JBQUlHLFFBQVFGLFNBQVNHLFNBQVQsRUFBWjtBQUNBSiwwQkFBY0csTUFBTWpDLEtBQXBCO0FBQ0EsZ0JBQUlpQyxNQUFNRSxLQUFOLENBQVlYLE1BQWhCLEVBQXdCO0FBQ3BCLG9CQUFJWSxlQUFlO0FBQ2ZwSiwwQkFBTXlHLGNBRFM7QUFFZjBDLDJCQUFPRixNQUFNRTtBQUZFLGlCQUFuQjtBQUlBbEIsNkJBQWF2SyxJQUFiLENBQWtCMEwsWUFBbEI7QUFDSDtBQUNELGdCQUFJQyxXQUFXLElBQWY7QUFDQSxnQkFBSUMsbUJBQW1CakgsS0FBdkI7QUFDQXdHLHdCQUFZN0YsT0FBWixDQUFvQixVQUFDZ0UsS0FBRCxFQUFRdkssQ0FBUixFQUFjO0FBQzlCLG9CQUFJOE0sV0FBV1QsWUFBWXJNLENBQVosQ0FBZjtBQUNBNk0sbUNBQW9CRCxZQUFZQSxTQUFTdEMsS0FBdEIsR0FDZnVDLG1CQUFtQkQsU0FBU3RDLEtBQTVCLEdBQW9DLENBRHJCLEdBRWZ1QyxtQkFBbUIsQ0FGdkI7QUFHQSxzQkFBS3hCLE9BQUwsQ0FBYWQsS0FBYixFQUFvQnVDLFFBQXBCLEVBQThCRCxnQkFBOUI7QUFDQUQsMkJBQVdyQyxLQUFYO0FBQ0gsYUFQRDtBQVVIOzs7Ozs7SUFHQ3dDLEs7QUFDRixtQkFBWWpCLElBQVosRUFBa0JWLE9BQWxCLEVBQTJCO0FBQUE7O0FBQ3ZCLFlBQUk0QixTQUFTO0FBQ1RwSCxtQkFBTztBQURFLFNBQWI7QUFHQSxhQUFLeUYsT0FBTCxDQUFhUyxJQUFiLEVBQW1Ca0IsTUFBbkIsRUFBMkI1QixPQUEzQjtBQUNIOzs7O2dDQUNPVSxJLEVBQU1rQixNLEVBQVE1QixPLEVBQVM7QUFDM0IsZ0JBQUk2QixpQkFBaUI3QixRQUFRNEIsT0FBT3BILEtBQWYsQ0FBckI7QUFDQSxnQkFBSXNILE1BQU1wQixLQUFLcUIsVUFBTCxHQUFrQnJCLEtBQUtxQixVQUFMLENBQWdCcEIsTUFBbEMsR0FBMkMsQ0FBckQ7QUFDQSxpQkFBSyxJQUFJL0wsSUFBSSxDQUFiLEVBQWdCQSxJQUFJa04sR0FBcEIsRUFBeUJsTixHQUF6QixFQUE4QjtBQUMxQixvQkFBSXVLLFFBQVF1QixLQUFLcUIsVUFBTCxDQUFnQm5OLENBQWhCLENBQVo7QUFDQWdOLHVCQUFPcEgsS0FBUDtBQUNBLHFCQUFLeUYsT0FBTCxDQUFhZCxLQUFiLEVBQW9CeUMsTUFBcEIsRUFBNEI1QixPQUE1QjtBQUNIO0FBQ0QsZ0JBQUk2QixjQUFKLEVBQW9CO0FBQ2hCLHFCQUFLRyxZQUFMLENBQWtCdEIsSUFBbEIsRUFBd0JtQixjQUF4QjtBQUNIO0FBRUo7OztxQ0FDWW5CLEksRUFBTXVCLGEsRUFBZTtBQUFBOztBQUM5QkEsMEJBQWM5RyxPQUFkLENBQXNCLFVBQUNpRixZQUFELEVBQWtCO0FBQ3BDLHdCQUFRQSxhQUFhakksSUFBckI7QUFDSSx5QkFBS3dHLFlBQUw7QUFDSSw0QkFBSXdCLFVBQVVaLEtBQUtjLFFBQUwsQ0FBY0QsYUFBYU0sSUFBM0IsSUFBbUN0QixTQUFTTyxjQUFULENBQXdCUyxhQUFhTSxJQUFyQyxDQUFuQyxHQUFnRk4sYUFBYU0sSUFBYixDQUFrQmhCLE1BQWxCLEVBQTlGO0FBQ0FnQiw2QkFBS3dCLFVBQUwsQ0FBZ0JDLFlBQWhCLENBQTZCaEMsT0FBN0IsRUFBc0NPLElBQXRDO0FBQ0E7QUFDSix5QkFBSzlCLGNBQUw7QUFDSSwrQkFBS3dELGVBQUwsQ0FBcUIxQixJQUFyQixFQUEyQk4sYUFBYWtCLEtBQXhDO0FBQ0E7QUFDSix5QkFBS3pDLFVBQUw7QUFDSSwrQkFBS3dELFFBQUwsQ0FBYzNCLElBQWQsRUFBb0JOLGFBQWEzSSxLQUFqQztBQUNBO0FBQ0oseUJBQUtxSCxZQUFMO0FBQ0ksNEJBQUk0QixLQUFLNEIsV0FBVCxFQUFzQjtBQUNsQjVCLGlDQUFLNEIsV0FBTCxHQUFtQmxDLGFBQWFuTCxPQUFoQztBQUNILHlCQUZELE1BRU87QUFDSHlMLGlDQUFLNkIsU0FBTCxHQUFpQm5DLGFBQWFuTCxPQUE5QjtBQUNIO0FBQ0Q7QUFDSjtBQUNJOztBQW5CUjtBQXNCSCxhQXZCRDtBQXdCSDs7O3dDQUNleUwsSSxFQUFNWSxLLEVBQU87QUFDekIsZ0JBQUlrQixpQkFBaUJqRCxLQUFLa0QsT0FBTCxDQUFhL0IsS0FBS3FCLFVBQWxCLENBQXJCO0FBQ0EsZ0JBQUlXLFdBQVcsRUFBZjtBQUNBRiwyQkFBZXJILE9BQWYsQ0FBdUIsVUFBQ3dILEtBQUQsRUFBVztBQUM5QixvQkFBSUEsTUFBTUMsUUFBTixLQUFtQixDQUF2QixFQUEwQjtBQUN0Qix3QkFBSS9LLFFBQU04SyxNQUFNL0wsWUFBTixDQUFtQixLQUFuQixDQUFWO0FBQ0Esd0JBQUlpQixLQUFKLEVBQVM7QUFDTDZLLGlDQUFTN0ssS0FBVCxJQUFnQjhLLEtBQWhCO0FBQ0g7QUFDSjtBQUNKLGFBUEQ7QUFRQXJCLGtCQUFNbkcsT0FBTixDQUFjLFVBQUMwSCxJQUFELEVBQVU7QUFDcEIsb0JBQUlySSxRQUFRcUksS0FBS3JJLEtBQWpCO0FBQ0Esb0JBQUlxSSxLQUFLMUssSUFBTCxLQUFjLENBQWxCLEVBQXFCO0FBQ2pCLHdCQUFJcUssZUFBZWhJLEtBQWYsTUFBMEJrRyxLQUFLcUIsVUFBTCxDQUFnQnZILEtBQWhCLENBQTlCLEVBQXNEO0FBQ2xEa0csNkJBQUtvQyxXQUFMLENBQWlCcEMsS0FBS3FCLFVBQUwsQ0FBZ0J2SCxLQUFoQixDQUFqQjtBQUNIO0FBQ0RnSSxtQ0FBZU8sTUFBZixDQUFzQnZJLEtBQXRCLEVBQTZCLENBQTdCO0FBQ0gsaUJBTEQsTUFLTyxJQUFJcUksS0FBSzFLLElBQUwsS0FBYyxDQUFsQixFQUFxQjtBQUN4Qix3QkFBSTZLLGFBQWFOLFNBQVNHLEtBQUtJLElBQUwsQ0FBVXBMLEdBQW5CLElBQ2I2SyxTQUFTRyxLQUFLSSxJQUFMLENBQVVwTCxHQUFuQixFQUF3QnFMLFNBQXhCLENBQWtDLElBQWxDLENBRGEsR0FFYjNELEtBQUtjLFFBQUwsQ0FBY3dDLEtBQUtJLElBQW5CLElBQTJCN0QsU0FBU08sY0FBVCxDQUF3QmtELEtBQUtJLElBQTdCLENBQTNCLEdBQWdFSixLQUFLSSxJQUFMLENBQVV2RCxNQUFWLEVBRnBFO0FBR0E4QyxtQ0FBZU8sTUFBZixDQUFzQnZJLEtBQXRCLEVBQTZCLENBQTdCLEVBQWdDd0ksVUFBaEM7QUFDQXRDLHlCQUFLeUMsWUFBTCxDQUFrQkgsVUFBbEIsRUFBOEJ0QyxLQUFLcUIsVUFBTCxDQUFnQnZILEtBQWhCLEtBQTBCLElBQXhEO0FBQ0g7QUFDSixhQWREO0FBZ0JIOzs7aUNBQ1FrRyxJLEVBQU1qSixLLEVBQU87QUFDbEIsaUJBQUssSUFBSUksS0FBVCxJQUFnQkosS0FBaEIsRUFBdUI7QUFDbkIsb0JBQUlBLE1BQU1JLEtBQU4sTUFBZXpELFNBQW5CLEVBQThCO0FBQzFCc00seUJBQUswQyxlQUFMLENBQXFCdkwsS0FBckI7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQU1QLFFBQVFHLE1BQU1JLEtBQU4sQ0FBZDtBQUNBMEgseUJBQUtDLE9BQUwsQ0FBYWtCLElBQWIsRUFBbUI3SSxLQUFuQixFQUF3QlAsS0FBeEI7QUFDSDtBQUNKO0FBRUo7Ozs7OztJQU1DaUksSTs7Ozs7OztpQ0FDYzhELEksRUFBTTtBQUNsQixtQkFBTyxPQUFPQSxJQUFQLEtBQWdCLFFBQXZCO0FBQ0g7OztnQ0FDY0MsSSxFQUFNO0FBQ2pCLGdCQUFJLENBQUNBLElBQUwsRUFBVztBQUNQLHVCQUFPLEVBQVA7QUFDSDtBQUNELGdCQUFJQyxRQUFRLEVBQVo7QUFDQSxpQkFBSyxJQUFJM08sSUFBSSxDQUFiLEVBQWdCQSxJQUFJME8sS0FBSzNDLE1BQXpCLEVBQWlDL0wsR0FBakMsRUFBc0M7QUFDbEMyTyxzQkFBTTFOLElBQU4sQ0FBV3lOLEtBQUsxTyxDQUFMLENBQVg7QUFDSDtBQUNELG1CQUFPMk8sS0FBUDtBQUNIOzs7Z0NBQ2NDLFMsRUFBVztBQUN0QixtQkFBTyxrQkFBaUJDLElBQWpCLENBQXNCRCxTQUF0QjtBQUFQO0FBQ0g7OzttQ0FDaUJBLFMsRUFBVztBQUN6QixtQkFBTyxjQUFhQyxJQUFiLENBQWtCRCxTQUFsQjtBQUFQO0FBQ0g7OztzQ0FFb0JBLFMsRUFBVztBQUM1QixtQkFBTyxzQkFBcUJDLElBQXJCLENBQTBCRCxTQUExQjtBQUFQO0FBQ0g7Ozt5Q0FDdUI5QyxJLEVBQU07QUFDMUIsbUJBQU9BLEtBQUtqSixLQUFMLElBQWNpSixLQUFLakosS0FBTCxDQUFXc0osY0FBWCxDQUEwQixRQUExQixDQUFyQjtBQUNIOzs7aUNBQ2dCekosSyxFQUFPO0FBQ3RCLGdCQUFJQSxVQUFVbEQsU0FBVixJQUF1QmtELFVBQVUsSUFBakMsSUFBeUNBLFVBQVUsRUFBdkQsRUFBMkQ7QUFDekQsdUJBQU8sS0FBUDtBQUNEOztBQUVELGdCQUFJLE9BQU9BLEtBQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDOUI7QUFDQSxvQkFBSW9NLFdBQVcsT0FBZjtBQUNBO0FBQ0Esb0JBQUlDLGFBQWEsUUFBakI7QUFDQTtBQUNBLG9CQUFJQyxnQkFBZ0Isa0JBQXBCLENBTjhCLENBTVU7QUFDeEMsb0JBQUlDLGdCQUFnQixXQUFwQixDQVA4QixDQU9FO0FBQ2hDO0FBQ0Esb0JBQUlDLGtCQUFrQixtQkFBdEIsQ0FUOEIsQ0FTYTtBQUMzQyxvQkFBSUMsa0JBQWtCLFlBQXRCLENBVjhCLENBVUs7O0FBRW5DLG9CQUFJTCxTQUFTRCxJQUFULENBQWNuTSxLQUFkLEtBQXdCcU0sV0FBV0YsSUFBWCxDQUFnQm5NLEtBQWhCLENBQXhCLElBQ0RzTSxjQUFjSCxJQUFkLENBQW1Cbk0sS0FBbkIsQ0FEQyxJQUM0QnVNLGNBQWNKLElBQWQsQ0FBbUJuTSxLQUFuQixDQUQ1QixJQUVEd00sZ0JBQWdCTCxJQUFoQixDQUFxQm5NLEtBQXJCLENBRkMsSUFFNkJ5TSxnQkFBZ0JOLElBQWhCLENBQXFCbk0sS0FBckIsQ0FGakMsRUFFOEQ7QUFDNUQsMkJBQU8sSUFBUDtBQUNELGlCQUpELE1BS0s7QUFDSCwyQkFBTyxLQUFQO0FBQ0Q7QUFDRixhQXBCRCxNQXFCSyxJQUFJLE9BQU9BLEtBQVAsS0FBa0IsUUFBdEIsRUFBZ0M7QUFDbkMsdUJBQU8sSUFBUDtBQUNELGFBRkksTUFHQTtBQUNILHVCQUFPLEtBQVA7QUFDRDtBQUNGOzs7Z0NBR2NvSixJLEVBQU03SSxHLEVBQUtQLEssRUFBTztBQUM3QixvQkFBUU8sR0FBUjtBQUNJLHFCQUFLLE9BQUw7QUFDSTZJLHlCQUFLeEwsS0FBTCxDQUFXOE8sT0FBWCxHQUFxQjFNLEtBQXJCO0FBQ0E7QUFDSixxQkFBSyxPQUFMO0FBQ0ksd0JBQUkwSCxXQUFVMEIsS0FBSzFCLE9BQUwsSUFBZ0IsRUFBOUI7QUFDQUEsK0JBQVVBLFNBQVFpRixXQUFSLEVBQVY7QUFDQSx3QkFBSWpGLGFBQVksT0FBWixJQUF1QkEsYUFBWSxVQUF2QyxFQUFtRDtBQUMvQzBCLDZCQUFLcEosS0FBTCxHQUFhQSxLQUFiO0FBQ0gscUJBRkQsTUFFTztBQUNIb0osNkJBQUt3RCxZQUFMLENBQWtCck0sR0FBbEIsRUFBdUJQLEtBQXZCO0FBQ0g7QUFDRDtBQUNKO0FBQ0lvSix5QkFBS3dELFlBQUwsQ0FBa0JyTSxHQUFsQixFQUF1QlAsS0FBdkI7QUFDQTtBQWZSO0FBa0JIOzs7Ozs7SUFJQzZKLFE7QUFDRjs7Ozs7O0FBTUEsc0JBQVlnRCxPQUFaLEVBQXFCQyxPQUFyQixFQUE4QjtBQUFBOztBQUMxQixZQUFJQyxrQkFBa0IsS0FBS0MsWUFBTCxDQUFrQkgsT0FBbEIsRUFBMkJJLFFBQWpEO0FBQ0EsWUFBSUMsa0JBQWtCLEtBQUtGLFlBQUwsQ0FBa0JGLE9BQWxCLEVBQTJCRyxRQUFqRDtBQUNBLGFBQUtFLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxhQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBSyxJQUFJOVAsS0FBSSxDQUFiLEVBQWdCQSxLQUFJdVAsUUFBUXhELE1BQTVCLEVBQW9DL0wsSUFBcEMsRUFBeUM7QUFDckMsZ0JBQUkrUCxVQUFVUixRQUFRdlAsRUFBUixDQUFkO0FBQ0EsZ0JBQUlnUSxXQUFXLEtBQUtDLE1BQUwsQ0FBWUYsT0FBWixDQUFmO0FBQ0EsZ0JBQUksQ0FBQ0gsZ0JBQWdCekQsY0FBaEIsQ0FBK0I2RCxRQUEvQixDQUFMLEVBQStDO0FBQzNDLHFCQUFLRixTQUFMLENBQWU3TyxJQUFmLENBQW9CLElBQXBCO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUs2TyxTQUFMLENBQWU3TyxJQUFmLENBQW9CdU8sUUFBUUksZ0JBQWdCSSxRQUFoQixDQUFSLENBQXBCO0FBQ0g7QUFDSjtBQUNELGFBQUtFLFFBQUwsR0FBZ0IsS0FBS0osU0FBTCxDQUFlSyxLQUFmLENBQXFCLENBQXJCLENBQWhCO0FBQ0EsWUFBSW5RLElBQUksQ0FBUjtBQUNBLGVBQU9BLElBQUksS0FBS2tRLFFBQUwsQ0FBY25FLE1BQXpCLEVBQWlDO0FBQzdCLGdCQUFJLEtBQUttRSxRQUFMLENBQWNsUSxDQUFkLE1BQXFCLElBQXpCLEVBQStCO0FBQzNCLHFCQUFLb1EsTUFBTCxDQUFZcFEsQ0FBWjtBQUNBLHFCQUFLcVEsa0JBQUwsQ0FBd0JyUSxDQUF4QjtBQUNILGFBSEQsTUFHTztBQUNIQTtBQUNIO0FBQ0o7QUFDRCxZQUFJNEYsUUFBUSxDQUFaO0FBQ0EsYUFBSyxJQUFJNUYsTUFBSSxDQUFiLEVBQWdCQSxNQUFJd1AsUUFBUXpELE1BQTVCLEVBQW9DL0wsS0FBcEMsRUFBeUM7QUFDckMsZ0JBQUlzUSxRQUFRZCxRQUFReFAsR0FBUixDQUFaO0FBQ0EsZ0JBQUl1USxXQUFXLEtBQUtOLE1BQUwsQ0FBWUssS0FBWixDQUFmO0FBQ0EsZ0JBQUlFLFFBQVEsS0FBS04sUUFBTCxDQUFjdEssS0FBZCxDQUFaO0FBQ0EsZ0JBQUk2SyxXQUFXLEtBQUtSLE1BQUwsQ0FBWU8sS0FBWixDQUFmO0FBQ0EsZ0JBQUlBLEtBQUosRUFBVztBQUNQLG9CQUFJRCxZQUFZRSxRQUFoQixFQUEwQjtBQUN0Qix3QkFBSWhCLGdCQUFnQnRELGNBQWhCLENBQStCb0UsUUFBL0IsQ0FBSixFQUE4QztBQUMxQyw0QkFBSUcsZUFBZVQsT0FBTyxLQUFLQyxRQUFMLENBQWN0SyxRQUFRLENBQXRCLENBQVAsQ0FBbkI7QUFDQSw0QkFBSTJLLGFBQWFHLFlBQWpCLEVBQStCO0FBQzNCLGlDQUFLTixNQUFMLENBQVlwUSxHQUFaO0FBQ0EsaUNBQUtxUSxrQkFBTCxDQUF3QnpLLEtBQXhCO0FBQ0FBO0FBQ0gseUJBSkQsTUFJTztBQUNILGlDQUFLK0ssTUFBTCxDQUFZM1EsR0FBWixFQUFlc1EsS0FBZjtBQUNIO0FBQ0oscUJBVEQsTUFTTztBQUNILDZCQUFLSyxNQUFMLENBQVkzUSxHQUFaLEVBQWVzUSxLQUFmO0FBQ0g7QUFDSixpQkFiRCxNQWFPO0FBQ0gxSztBQUNIO0FBQ0osYUFqQkQsTUFpQk87QUFDSCxxQkFBSytLLE1BQUwsQ0FBWTNRLEdBQVosRUFBZXNRLEtBQWY7QUFDSDtBQUNKO0FBQ0QsWUFBSU0sSUFBSSxLQUFLVixRQUFMLENBQWNuRSxNQUFkLEdBQXVCbkcsS0FBL0I7QUFDQSxlQUFPQSxVQUFVLEtBQUtzSyxRQUFMLENBQWNuRSxNQUEvQixFQUF1QztBQUNuQzZFO0FBQ0EsaUJBQUtSLE1BQUwsQ0FBWVEsSUFBSXBCLFFBQVF6RCxNQUF4QjtBQUNIO0FBR0o7Ozs7cUNBQ1kyQyxJLEVBQU07QUFDZixnQkFBSWlCLFdBQVcsRUFBZjtBQUNBLGlCQUFLLElBQUkzUCxNQUFJLENBQWIsRUFBZ0JBLE1BQUkwTyxLQUFLM0MsTUFBekIsRUFBaUMvTCxLQUFqQyxFQUFzQztBQUNsQyxvQkFBSXFPLE9BQU9LLEtBQUsxTyxHQUFMLENBQVg7QUFDQSxvQkFBSTZRLFVBQVUsS0FBS1osTUFBTCxDQUFZNUIsSUFBWixDQUFkO0FBQ0FzQix5QkFBU2tCLE9BQVQsSUFBb0I3USxHQUFwQjtBQUNIO0FBQ0QsbUJBQU87QUFDSDJQLDBCQUFVQTtBQURQLGFBQVA7QUFHSDs7OytCQUVNdEIsSSxFQUFNO0FBQ1QsZ0JBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1AsdUJBQU83TyxTQUFQO0FBQ0g7QUFDRCxtQkFBTzZPLEtBQUssS0FBTCxDQUFQO0FBQ0g7OzsyQ0FDa0J6SSxLLEVBQU87QUFDdEIsaUJBQUtzSyxRQUFMLENBQWMvQixNQUFkLENBQXFCdkksS0FBckIsRUFBNEIsQ0FBNUI7QUFDSDs7OytCQUNNQSxLLEVBQU87QUFDVixpQkFBS2lLLFlBQUwsQ0FBa0I1TyxJQUFsQixDQUF1QjtBQUNuQjJFLHVCQUFPQSxLQURZO0FBRW5CckMsc0JBQU07QUFGYSxhQUF2QjtBQUlIOzs7K0JBRU1xQyxLLEVBQU95SSxJLEVBQU07QUFDaEIsaUJBQUt3QixZQUFMLENBQWtCNU8sSUFBbEIsQ0FBdUI7QUFDbkIyRSx1QkFBT0EsS0FEWTtBQUVuQnlJLHNCQUFNQSxJQUZhO0FBR25COUssc0JBQU07QUFIYSxhQUF2QjtBQUtIOzs7b0NBRVc7QUFDUixtQkFBTztBQUNIbUosdUJBQU8sS0FBS21ELFlBRFQ7QUFFSHRGLHVCQUFPLEtBQUt1RjtBQUZULGFBQVA7QUFJSDs7Ozs7O0FBS0wsU0FBU2dCLE9BQVQsQ0FBaUJDLEdBQWpCLEVBQXNCQyxVQUF0QixFQUFrQzFPLFFBQWxDLEVBQTRDOztBQUV4Q3lCLFdBQU9rTixJQUFQLENBQVlGLEdBQVosRUFBaUJ4SyxPQUFqQixDQUF5QixlQUFPO0FBQzVCLFlBQUkySyxnQkFBZ0JILElBQUk5TixHQUFKLENBQXBCO0FBQ0EsWUFBSWtPLGFBQWEsSUFBSUMsVUFBSixFQUFqQjtBQUNBSixtQkFBV0ssR0FBWCxDQUFlcE8sR0FBZixFQUFvQmtPLFVBQXBCO0FBQ0FwTixlQUFPQyxjQUFQLENBQXNCK00sR0FBdEIsRUFBMkI5TixHQUEzQixFQUFnQztBQUM1QmtCLGVBRDRCLGlCQUN0QjtBQUNGZ04sMkJBQVdHLEdBQVgsQ0FBZWhQLFFBQWY7QUFDQSx1QkFBTzRPLGFBQVA7QUFDSCxhQUoyQjtBQUs1QmpOLGVBTDRCLGVBS3hCc04sTUFMd0IsRUFLaEI7QUFDUixvQkFBTUMsVUFBVU4sa0JBQWtCSyxNQUFsQztBQUNBTCxnQ0FBZ0JLLE1BQWhCO0FBQ0Esb0JBQUlDLE9BQUosRUFBYTtBQUNUTCwrQkFBV00sTUFBWDtBQUNIO0FBQ0o7QUFYMkIsU0FBaEM7QUFhSCxLQWpCRDtBQWtCQSxXQUFPVixHQUFQO0FBQ0g7O0FBSUQsU0FBU0ssVUFBVCxHQUFzQjtBQUNsQixTQUFLTSxlQUFMLEdBQXVCLElBQUlDLEdBQUosRUFBdkI7QUFDSDtBQUNEUCxXQUFXelIsU0FBWCxDQUFxQjJSLEdBQXJCLEdBQTJCLFVBQVVNLGdCQUFWLEVBQTRCO0FBQ25ELFNBQUtGLGVBQUwsQ0FBcUJKLEdBQXJCLENBQXlCTSxnQkFBekI7QUFDSCxDQUZEO0FBR0FSLFdBQVd6UixTQUFYLENBQXFCOFIsTUFBckIsR0FBOEIsWUFBWTtBQUN0QyxTQUFLQyxlQUFMLENBQXFCbkwsT0FBckIsQ0FBNkI7QUFBQSxlQUFPc0wsS0FBUDtBQUFBLEtBQTdCO0FBQ0gsQ0FGRDs7QUFLQTs7OztBQUlBLFNBQVNDLEtBQVQsQ0FBZWYsR0FBZixFQUFvQjtBQUNoQixRQUFJZ0IsVUFBVSxTQUFWQSxPQUFVLENBQUNDLENBQUQsRUFBTztBQUNqQixZQUFJQSxNQUFNLElBQVYsRUFBZ0IsT0FBTyxNQUFQO0FBQ2hCLFlBQUlBLE1BQU14UyxTQUFWLEVBQXFCLE9BQU8sV0FBUDtBQUNyQixlQUFPdUUsT0FBT3BFLFNBQVAsQ0FBaUJzRyxRQUFqQixDQUEwQmdNLElBQTFCLENBQStCRCxDQUEvQixFQUFrQzdCLEtBQWxDLENBQXdDLENBQXhDLEVBQTJDLENBQUMsQ0FBNUMsQ0FBUDtBQUNILEtBSkQ7QUFLQSxRQUFJK0IsZUFBSjtBQUFBLFFBQVlDLFNBQVNKLFFBQVFoQixHQUFSLENBQXJCO0FBQ0EsUUFBSW9CLFdBQVcsUUFBZixFQUF5QjtBQUNyQkQsaUJBQVMsRUFBVDtBQUNILEtBRkQsTUFFTyxJQUFJQyxXQUFXLE9BQWYsRUFBd0I7QUFDM0JELGlCQUFTLEVBQVQ7QUFDSCxLQUZNLE1BRUE7QUFDSCxlQUFPbkIsR0FBUDtBQUNIO0FBQ0QsU0FBSzlOLEdBQUwsSUFBWThOLEdBQVosRUFBaUI7QUFDYixZQUFJcUIsT0FBT3JCLElBQUk5TixHQUFKLENBQVg7QUFDQSxZQUFJOE8sUUFBUUssSUFBUixLQUFpQixRQUFyQixFQUErQjtBQUMzQkYsbUJBQU9qUCxHQUFQLElBQWNvUCxVQUFVQyxNQUFWLENBQWlCRixJQUFqQixDQUFkO0FBQ0gsU0FGRCxNQUVPLElBQUlMLFFBQVFLLElBQVIsS0FBaUIsT0FBckIsRUFBOEI7QUFDakNGLG1CQUFPalAsR0FBUCxJQUFjb1AsVUFBVUMsTUFBVixDQUFpQkYsSUFBakIsQ0FBZDtBQUNILFNBRk0sTUFFQTtBQUNIRixtQkFBT2pQLEdBQVAsSUFBYzhOLElBQUk5TixHQUFKLENBQWQ7QUFDSDtBQUNKO0FBQ0QsV0FBT2lQLE1BQVA7QUFDSDs7QUFHRCxTQUFTSyxDQUFULENBQVduSSxPQUFYLEVBQW9CdkgsS0FBcEIsRUFBMkJULFFBQTNCLEVBQXFDO0FBQ2pDLFdBQU8sSUFBSStILE9BQUosQ0FBWUMsT0FBWixFQUFxQnZILEtBQXJCLEVBQTRCVCxRQUE1QixDQUFQO0FBQ0g7O0FBRUQsU0FBU29RLElBQVQsQ0FBY3RILE9BQWQsRUFBdUJDLE9BQXZCLEVBQWdDO0FBQzVCLFFBQUlzSCxJQUFJLElBQUl4SCxJQUFKLENBQVNDLE9BQVQsRUFBa0JDLE9BQWxCLENBQVI7QUFDQSxXQUFPc0gsRUFBRXJILE9BQVQ7QUFDSDs7QUFHRCxTQUFTc0gsS0FBVCxDQUFlNUcsSUFBZixFQUFxQlYsT0FBckIsRUFBOEI7QUFDMUIsV0FBTyxJQUFJMkIsS0FBSixDQUFVakIsSUFBVixFQUFnQlYsT0FBaEIsQ0FBUDtBQUNIO0FBQ0Q7Ozs7SUFHTXVILEc7QUFDRixtQkFBYztBQUFBOztBQUNWLGFBQUs1RyxNQUFMLEdBQWMsQ0FBZDtBQUNBLGFBQUs2RyxHQUFMLEdBQVcsSUFBSTdPLE1BQUosRUFBWDtBQUNIOzs7OzRCQUNHZCxHLEVBQUtQLEssRUFBTztBQUNaLGdCQUFJLEVBQUVPLE9BQU8sS0FBSzJQLEdBQWQsQ0FBSixFQUF3QjtBQUNwQixxQkFBSzdHLE1BQUw7QUFDSDtBQUNELGlCQUFLNkcsR0FBTCxDQUFTM1AsR0FBVCxJQUFnQlAsS0FBaEI7QUFDSDs7OzRCQUNHTyxHLEVBQUs7QUFDTCxtQkFBUUEsT0FBTyxLQUFLMlAsR0FBYixHQUFvQixLQUFLQSxHQUFMLENBQVMzUCxHQUFULENBQXBCLEdBQW9DLElBQTNDO0FBQ0g7OzsrQkFDTUEsRyxFQUFLO0FBQ1IsZ0JBQUtBLE9BQU8sS0FBSzJQLEdBQWpCLEVBQXVCO0FBQ25CLHVCQUFPLEtBQUtBLEdBQUwsQ0FBUzNQLEdBQVQsQ0FBUDtBQUNBLHFCQUFLOEksTUFBTDtBQUNIO0FBQ0o7OzsrQkFDTTtBQUNILG1CQUFPLEtBQUtBLE1BQVo7QUFDSDs7O2dDQUNPO0FBQ0pBLHFCQUFTLENBQVQ7QUFDQSxpQkFBSzZHLEdBQUwsR0FBVyxJQUFJN08sTUFBSixFQUFYO0FBQ0g7Ozs7OztJQUlDeEIsRTtBQUNGLGdCQUFZc1EsTUFBWixFQUFvQjtBQUFBOztBQUFBOztBQUFBLFlBRVp4USxFQUZZLEdBS1p3USxNQUxZLENBRVp4USxFQUZZO0FBQUEsWUFHWkcsSUFIWSxHQUtacVEsTUFMWSxDQUdaclEsSUFIWTtBQUFBLFlBSVpHLEdBSlksR0FLWmtRLE1BTFksQ0FJWmxRLEdBSlk7O0FBTWhCLFlBQUltUSxPQUFPbkksS0FBS2MsUUFBTCxDQUFjcEosRUFBZCxJQUFvQm1JLFNBQVN1SSxhQUFULENBQXVCMVEsRUFBdkIsQ0FBcEIsR0FBaURBLEVBQTVEO0FBQ0EsYUFBS0csSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS3dRLEVBQUwsR0FBVSxLQUFLQyxpQkFBTCxDQUF1QixLQUFLQyxpQkFBTCxDQUF1QnZRLEdBQXZCLENBQXZCLENBQVY7QUFDQSxhQUFLd1EsQ0FBTCxHQUFTLEtBQUtILEVBQUwsQ0FBUWxJLE1BQVIsRUFBVDtBQUNBZ0ksYUFBSzlILFdBQUwsQ0FBaUIsS0FBS21JLENBQXRCO0FBQ0EsYUFBS25DLFVBQUwsR0FBa0IsSUFBSTJCLEdBQUosRUFBbEI7QUFDQTdCLGdCQUFRLEtBQUt0TyxJQUFiLEVBQW1CLEtBQUt3TyxVQUF4QixFQUFvQyxZQUFNO0FBQ3RDLG1CQUFLb0MsU0FBTCxDQUFlelEsR0FBZjtBQUNILFNBRkQ7QUFHQSxhQUFLeVEsU0FBTCxDQUFlelEsR0FBZjtBQUVIOzs7O2tDQUNTQSxHLEVBQUs7QUFDWCxnQkFBSTBRLE1BQU0sS0FBS0osaUJBQUwsQ0FBdUIsS0FBS0MsaUJBQUwsQ0FBdUJ2USxHQUF2QixDQUF2QixDQUFWO0FBQ0F4RSxtQkFBT2tWLEdBQVAsR0FBYUEsR0FBYjtBQUNBbFYsbUJBQU82VSxFQUFQLEdBQVksS0FBS0EsRUFBakI7QUFDQU4sa0JBQU0sS0FBS1MsQ0FBWCxFQUFjWCxLQUFLLEtBQUtRLEVBQVYsRUFBY0ssR0FBZCxDQUFkO0FBQ0EsaUJBQUtMLEVBQUwsR0FBVUssR0FBVjtBQUNIOzs7OEJBQ0twUSxHLEVBQUtYLFEsRUFBVTtBQUNqQixpQkFBSzBPLFVBQUwsQ0FBZ0I3TSxHQUFoQixDQUFvQmxCLEdBQXBCLEVBQXlCcU8sR0FBekIsQ0FBNkJoUCxRQUE3QjtBQUNIOzs7MENBQ2lCSyxHLEVBQUs7QUFBQTs7QUFDbkIsZ0JBQUlQLFdBQVcsRUFBZjtBQUNBLGlCQUFLLElBQUltSSxLQUFULElBQWtCNUgsSUFBSVAsUUFBdEIsRUFBZ0M7QUFDNUIsb0JBQUlrUixLQUFLM1EsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUFUO0FBQ0Esb0JBQUkrSSxjQUFjNVUsS0FBbEIsRUFBeUI7QUFDckI0VSx1QkFBRy9NLE9BQUgsQ0FBVyxhQUFLO0FBQ1osNEJBQUlnTixJQUFJLE9BQUtOLGlCQUFMLENBQXVCTyxDQUF2QixDQUFSO0FBQ0FwUixpQ0FBU25CLElBQVQsQ0FBY3NTLENBQWQ7QUFDSCxxQkFIRDtBQUlILGlCQUxELE1BS08sSUFBSUQsY0FBY3ZQLE1BQWxCLEVBQTBCO0FBQzdCLHdCQUFJd1AsSUFBSSxLQUFLTixpQkFBTCxDQUF1QkssRUFBdkIsQ0FBUjtBQUNBbFIsNkJBQVNuQixJQUFULENBQWNzUyxDQUFkO0FBQ0gsaUJBSE0sTUFHQTtBQUNIblIsNkJBQVNuQixJQUFULENBQWNxUyxFQUFkO0FBQ0g7QUFDSjs7QUFFRCxtQkFBT2YsRUFBRTVQLElBQUlDLEdBQU4sRUFBV0QsSUFBSUUsS0FBZixFQUFzQlQsUUFBdEIsQ0FBUDtBQUNIOzs7MENBQ2lCTyxHLEVBQUs7QUFBQTs7QUFDbkJyQixvQkFBUUMsR0FBUixDQUFZLGdDQUFnQ3dDLE9BQU9rTixJQUFQLENBQVl0TyxHQUFaLENBQWhDLEdBQW1ELGdCQUFuRCxJQUF1RSxrQkFBa0JBLEdBQXpGLENBQVo7QUFDQSxnQkFBSSxTQUFTQSxJQUFJRSxLQUFiLElBQXNCLGFBQWFGLElBQUlFLEtBQTNDLEVBQWtEO0FBQzlDLG9CQUFJNFEsWUFBWSxFQUFoQjtBQUNBLG9CQUFJQyxXQUFXLEtBQWY7QUFDQSxvQkFBSUMsbUJBQUo7QUFDQSxvQkFBSWhSLElBQUlFLEtBQUosQ0FBVSxLQUFWLENBQUosRUFBc0I7QUFBRTtBQUNwQix3QkFBSThILEtBQUtpSixhQUFMLENBQW1CalIsSUFBSUUsS0FBSixDQUFVLEtBQVYsQ0FBbkIsQ0FBSixFQUEwQztBQUN0Qyw0QkFBSUYsSUFBSWtSLE9BQVIsRUFBaUI7QUFDYixnQ0FBSWxKLEtBQUttSixPQUFMLENBQWFuUixJQUFJRSxLQUFKLENBQVUsS0FBVixDQUFiLENBQUosRUFBb0M7QUFDaEMsc0NBQU0sSUFBSXdILEtBQUosQ0FBVSx5QkFBVixDQUFOO0FBQ0g7QUFDRG9KLHdDQUFZOVEsSUFBSWtSLE9BQWhCO0FBQ0FGLHlDQUFhaFIsSUFBSUUsS0FBSixDQUFVLEtBQVYsRUFBaUI0RCxLQUFqQixDQUF1QixNQUF2QixFQUErQixDQUEvQixDQUFiO0FBQ0gseUJBTkQsTUFNTztBQUNILGdDQUFJa0UsS0FBS29KLFVBQUwsQ0FBZ0JwUixJQUFJRSxLQUFKLENBQVUsS0FBVixDQUFoQixDQUFKLEVBQXVDO0FBQ25DLHNDQUFNLElBQUl3SCxLQUFKLENBQVUsMEJBQVYsQ0FBTjtBQUNIO0FBQ0RvSix3Q0FBWSxLQUFLalIsSUFBTCxDQUFVRyxJQUFJRSxLQUFKLENBQVUsS0FBVixFQUFpQjRELEtBQWpCLENBQXVCLFFBQXZCLEVBQWlDLENBQWpDLENBQVYsQ0FBWjtBQUNBa04seUNBQWFoUixJQUFJRSxLQUFKLENBQVUsS0FBVixFQUFpQjRELEtBQWpCLENBQXVCLFFBQXZCLEVBQWlDLENBQWpDLENBQWI7QUFFSDtBQUNKO0FBQ0osaUJBakJELE1BaUJPLElBQUk5RCxJQUFJRSxLQUFKLENBQVUsU0FBVixDQUFKLEVBQTBCO0FBQUU7QUFDL0Isd0JBQUk4SCxLQUFLaUosYUFBTCxDQUFtQmpSLElBQUlFLEtBQUosQ0FBVSxTQUFWLENBQW5CLENBQUosRUFBOEM7QUFDMUMsNEJBQUk4SCxLQUFLb0osVUFBTCxDQUFnQnBSLElBQUlFLEtBQUosQ0FBVSxTQUFWLENBQWhCLENBQUosRUFBMkM7QUFDdkMsa0NBQU0sSUFBSXdILEtBQUosQ0FBVSwwQkFBVixDQUFOO0FBQ0g7QUFDRHFKLG1DQUFXLElBQVg7QUFDQUQsb0NBQVksS0FBS2pSLElBQUwsQ0FBVUcsSUFBSUUsS0FBSixDQUFVLFNBQVYsRUFBcUI0RCxLQUFyQixDQUEyQixRQUEzQixFQUFxQyxDQUFyQyxDQUFWLENBQVo7QUFDQWtOLHFDQUFhaFIsSUFBSUUsS0FBSixDQUFVLFNBQVYsRUFBcUI0RCxLQUFyQixDQUEyQixRQUEzQixFQUFxQyxDQUFyQyxDQUFiO0FBRUgscUJBUkQsTUFRTyxDQUFHO0FBQ2IsaUJBVk0sTUFVQTtBQUNILDBCQUFNLElBQUk0RCxLQUFKLENBQVUsNkJBQVYsQ0FBTjtBQUNIO0FBQ0Qsb0JBQUkySixPQUFPLEVBQVg7QUFDQVAsMEJBQVVsTixPQUFWLENBQWtCLGdCQUFRO0FBQ3RCLHdCQUFJd0ssTUFBTSxFQUFWO0FBQ0FBLHdCQUFJbk8sR0FBSixHQUFVRCxJQUFJQyxHQUFkO0FBQ0FtTyx3QkFBSTNPLFFBQUosR0FBZSxFQUFmO0FBQ0EyTyx3QkFBSWxPLEtBQUosR0FBWSxFQUFaO0FBQ0Esd0JBQUlBLFFBQVFrQixPQUFPa04sSUFBUCxDQUFZdE8sSUFBSUUsS0FBaEIsQ0FBWjtBQUNBLHlCQUFLLElBQUlvUixJQUFULElBQWlCcFIsS0FBakIsRUFBd0I7QUFDcEIsNEJBQUlILFFBQVFHLE1BQU1vUixJQUFOLENBQVo7QUFDQSw0QkFBSXZSLFVBQVUsT0FBZCxFQUF1QjtBQUNuQixnQ0FBSXBDLFFBQVFxQyxJQUFJRSxLQUFKLENBQVVILEtBQVYsQ0FBWjtBQUNBLGdDQUFJcEMsTUFBTTRULE9BQU4sQ0FBYyxHQUFkLElBQXFCLENBQUMsQ0FBMUIsRUFBNkI7QUFDekIsb0NBQUlDLFNBQVM3VCxNQUFNbUcsS0FBTixDQUFZLEdBQVosQ0FBYjtBQUNBc0ssb0NBQUlsTyxLQUFKLENBQVVILEtBQVYsSUFBbUIsT0FBSzBSLGdCQUFMLENBQXNCNVIsSUFBdEIsRUFBNEIyUixNQUE1QixFQUFvQ1IsVUFBcEMsQ0FBbkI7QUFDSCw2QkFIRCxNQUdPOztBQUVINUMsb0NBQUlsTyxLQUFKLENBQVVILEtBQVYsSUFBbUIsT0FBSzJSLGlCQUFMLENBQXVCN1IsSUFBdkIsRUFBNkJsQyxLQUE3QixFQUFvQ3FULFVBQXBDLENBQW5CO0FBQ0g7QUFDSix5QkFURCxNQVdLO0FBQ0QsZ0NBQUlwUixHQUFHK1IsYUFBSCxDQUFpQjNSLElBQUlFLEtBQUosQ0FBVUgsS0FBVixDQUFqQixDQUFKLEVBQXdDO0FBQ3BDLG9DQUFJSCxHQUFHZ1MsbUJBQUgsQ0FBdUI1UixJQUFJRSxLQUFKLENBQVVILEtBQVYsQ0FBdkIsRUFBeUN3UixPQUF6QyxDQUFpRFAsVUFBakQsS0FBZ0UsQ0FBQyxDQUFyRSxFQUF3RTtBQUNwRTVDLHdDQUFJbE8sS0FBSixDQUFVSCxLQUFWLElBQW1CLE9BQUtGLElBQUwsQ0FBVUQsR0FBR2dTLG1CQUFILENBQXVCNVIsSUFBSUUsS0FBSixDQUFVSCxLQUFWLENBQXZCLENBQVYsQ0FBbkI7QUFDSCxpQ0FGRCxNQUVPO0FBQ0hxTyx3Q0FBSWxPLEtBQUosQ0FBVUgsS0FBVixJQUFtQkYsS0FBS0QsR0FBR2dTLG1CQUFILENBQXVCNVIsSUFBSUUsS0FBSixDQUFVSCxLQUFWLENBQXZCLEVBQXlDK0QsS0FBekMsQ0FBK0MsR0FBL0MsRUFBb0QsQ0FBcEQsQ0FBTCxDQUFuQjtBQUVIO0FBQ0osNkJBUEQsTUFPTyxJQUFJbEUsR0FBR2lTLG9CQUFILENBQXdCN1IsSUFBSUUsS0FBSixDQUFVSCxLQUFWLENBQXhCLENBQUosRUFBK0M7O0FBRWxEcU8sb0NBQUlsTyxLQUFKLENBQVVILEtBQVYsSUFBbUJILEdBQUdrUyxxQkFBSCxDQUF5QjlSLElBQUlFLEtBQUosQ0FBVUgsS0FBVixDQUF6QixFQUEwQ0YsSUFBMUMsQ0FBbkI7QUFDSCw2QkFITSxNQUlGO0FBQ0R1TyxvQ0FBSWxPLEtBQUosQ0FBVUgsS0FBVixJQUFtQkMsSUFBSUUsS0FBSixDQUFVSCxLQUFWLENBQW5CO0FBQ0g7QUFDSjtBQUVKOztBQUdELHlCQUFLLElBQUk2SCxLQUFULElBQWtCNUgsSUFBSVAsUUFBdEIsRUFBZ0M7QUFDNUIsNEJBQUl1SSxLQUFLYyxRQUFMLENBQWM5SSxJQUFJUCxRQUFKLENBQWFtSSxLQUFiLENBQWQsQ0FBSixFQUF3QztBQUNwQ2pKLG9DQUFRQyxHQUFSLENBQVksdUJBQXFCb0IsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUFqQzs7QUFFQSxnQ0FBSWhJLEdBQUcrUixhQUFILENBQWlCM1IsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUFqQixDQUFKLEVBQTJDO0FBQ3ZDLG9DQUFJaEksR0FBR2dTLG1CQUFILENBQXVCNVIsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUF2QixFQUE0QzJKLE9BQTVDLENBQW9EUCxVQUFwRCxLQUFtRSxDQUFDLENBQXhFLEVBQTJFO0FBQ3ZFNUMsd0NBQUkzTyxRQUFKLENBQWFtSSxLQUFiLElBQXNCLE9BQUsvSCxJQUFMLENBQVVELEdBQUdnUyxtQkFBSCxDQUF1QjVSLElBQUlQLFFBQUosQ0FBYW1JLEtBQWIsQ0FBdkIsQ0FBVixDQUF0QjtBQUVILGlDQUhELE1BR087QUFDSHdHLHdDQUFJM08sUUFBSixDQUFhbUksS0FBYixJQUFzQi9ILEtBQUtELEdBQUdnUyxtQkFBSCxDQUF1QjVSLElBQUlQLFFBQUosQ0FBYW1JLEtBQWIsQ0FBdkIsRUFBNEM5RCxLQUE1QyxDQUFrRCxHQUFsRCxFQUF1RCxDQUF2RCxDQUFMLENBQXRCO0FBQ0g7QUFFSiw2QkFSRCxNQVVLOztBQUVEc0ssb0NBQUkzTyxRQUFKLENBQWFtSSxLQUFiLElBQXNCNUgsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUF0QjtBQUNIO0FBR0oseUJBbkJELE1BbUJPO0FBQ0gsZ0NBQUltSixRQUFKLEVBQWM7QUFDVi9RLG9DQUFJUCxRQUFKLENBQWFtSSxLQUFiLEVBQW9Cc0osT0FBcEIsR0FBOEJyUixJQUE5QjtBQUNILDZCQUZELE1BS0s7QUFDRCxvQ0FBSUcsSUFBSVAsUUFBSixDQUFhbUksS0FBYixhQUErQnhHLE1BQW5DLEVBQTJDO0FBQ3ZDcEIsd0NBQUlQLFFBQUosQ0FBYW1JLEtBQWIsRUFBb0IvSCxJQUFwQixHQUEyQkEsSUFBM0I7QUFDSDtBQUVKO0FBQ0R1TyxnQ0FBSTNPLFFBQUosQ0FBYW1JLEtBQWIsSUFBc0IsT0FBSzJJLGlCQUFMLENBQXVCdlEsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUF2QixDQUF0QjtBQUNIO0FBQ0o7O0FBR0R5Six5QkFBSy9TLElBQUwsQ0FBVThQLEdBQVY7QUFDSCxpQkE3RUQ7QUFnRkEsdUJBQU9pRCxJQUFQO0FBQ0gsYUFwSEQsTUFvSE87O0FBRUgsb0JBQUl4UixhQUFKO0FBQ0Esb0JBQUcsVUFBVUcsR0FBYixFQUFpQjtBQUNiSCwyQkFBS0csSUFBSUgsSUFBVDtBQUNILGlCQUZELE1BRUs7QUFDREEsMkJBQUssS0FBS0EsSUFBVjtBQUNIO0FBQ0Qsb0JBQUl1TyxNQUFNLEVBQVY7QUFDQUEsb0JBQUluTyxHQUFKLEdBQVVELElBQUlDLEdBQWQ7QUFDQW1PLG9CQUFJM08sUUFBSixHQUFlLEVBQWY7QUFDQTJPLG9CQUFJbE8sS0FBSixHQUFZLEVBQVo7QUFDQSxvQkFBSUEsUUFBUWtCLE9BQU9rTixJQUFQLENBQVl0TyxJQUFJRSxLQUFoQixDQUFaO0FBQ0EscUJBQUssSUFBSW9SLElBQVQsSUFBaUJwUixLQUFqQixFQUF3QjtBQUNwQix3QkFBSUgsUUFBUUcsTUFBTW9SLElBQU4sQ0FBWjtBQUNBLHdCQUFJdlIsVUFBVSxPQUFkLEVBQXVCO0FBQ25CLDRCQUFJcEMsUUFBUXFDLElBQUlFLEtBQUosQ0FBVUgsS0FBVixDQUFaO0FBQ0EsNEJBQUlwQyxNQUFNNFQsT0FBTixDQUFjLEdBQWQsSUFBcUIsQ0FBQyxDQUExQixFQUE2QjtBQUN6QixnQ0FBSUMsU0FBUzdULE1BQU1tRyxLQUFOLENBQVksR0FBWixDQUFiO0FBQ0FzSyxnQ0FBSWxPLEtBQUosQ0FBVUgsS0FBVixJQUFtQixLQUFLMFIsZ0JBQUwsQ0FBc0I1UixJQUF0QixFQUE0QjJSLE1BQTVCLEVBQW9DM1UsU0FBcEMsQ0FBbkI7QUFDSCx5QkFIRCxNQUdPOztBQUVIdVIsZ0NBQUlsTyxLQUFKLENBQVVILEtBQVYsSUFBbUIsS0FBSzJSLGlCQUFMLENBQXVCN1IsSUFBdkIsRUFBNkJsQyxLQUE3QixFQUFvQ2QsU0FBcEMsQ0FBbkI7QUFDSDtBQUNKLHFCQVRELE1BVUs7O0FBRUQsNEJBQUkrQyxHQUFHK1IsYUFBSCxDQUFpQjNSLElBQUlFLEtBQUosQ0FBVUgsS0FBVixDQUFqQixDQUFKLEVBQXdDO0FBQ3BDcU8sZ0NBQUlsTyxLQUFKLENBQVVILEtBQVYsSUFBbUIsS0FBS0YsSUFBTCxDQUFVRCxHQUFHZ1MsbUJBQUgsQ0FBdUI1UixJQUFJRSxLQUFKLENBQVVILEtBQVYsQ0FBdkIsQ0FBVixDQUFuQjtBQUNILHlCQUZELE1BR0ssSUFBSUgsR0FBR2lTLG9CQUFILENBQXdCN1IsSUFBSUUsS0FBSixDQUFVSCxLQUFWLENBQXhCLENBQUosRUFBK0M7O0FBRWhEcU8sZ0NBQUlsTyxLQUFKLENBQVVILEtBQVYsSUFBbUJILEdBQUdrUyxxQkFBSCxDQUF5QjlSLElBQUlFLEtBQUosQ0FBVUgsS0FBVixDQUF6QixFQUEwQ0YsSUFBMUMsQ0FBbkI7QUFDSCx5QkFISSxNQUlBO0FBQ0R1TyxnQ0FBSWxPLEtBQUosQ0FBVUgsS0FBVixJQUFtQkMsSUFBSUUsS0FBSixDQUFVSCxLQUFWLENBQW5CO0FBQ0g7QUFFSjtBQUVKOztBQUVELHFCQUFLLElBQUk2SCxLQUFULElBQWtCNUgsSUFBSVAsUUFBdEIsRUFBZ0M7QUFDNUIsd0JBQUl1SSxLQUFLYyxRQUFMLENBQWM5SSxJQUFJUCxRQUFKLENBQWFtSSxLQUFiLENBQWQsQ0FBSixFQUF3QztBQUNwQyw0QkFBSWhJLEdBQUcrUixhQUFILENBQWlCM1IsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUFqQixDQUFKLEVBQTJDO0FBQ3ZDLGdDQUFJN0gsU0FBTUgsR0FBR2dTLG1CQUFILENBQXVCNVIsSUFBSVAsUUFBSixDQUFhbUksS0FBYixDQUF2QixDQUFWOztBQUVBLGdDQUFHN0gsT0FBTXdSLE9BQU4sQ0FBYyxHQUFkLElBQW1CLENBQXRCLEVBQXdCO0FBQ3BCbkQsb0NBQUkzTyxRQUFKLENBQWFtSSxLQUFiLElBQXNCL0gsS0FBS0UsT0FBTStELEtBQU4sQ0FBWSxHQUFaLEVBQWlCLENBQWpCLENBQUwsQ0FBdEI7QUFFSCw2QkFIRCxNQUdLO0FBQ0RzSyxvQ0FBSTNPLFFBQUosQ0FBYW1JLEtBQWIsSUFBc0IvSCxLQUFLRSxNQUFMLENBQXRCO0FBQ0g7QUFFSix5QkFWRCxNQVVLO0FBQ0RxTyxnQ0FBSTNPLFFBQUosQ0FBYW1JLEtBQWIsSUFBb0I1SCxJQUFJUCxRQUFKLENBQWFtSSxLQUFiLENBQXBCO0FBQ0g7QUFFSixxQkFmRCxNQWVPOztBQUVId0csNEJBQUkzTyxRQUFKLENBQWFtSSxLQUFiLElBQXNCLEtBQUsySSxpQkFBTCxDQUF1QnZRLElBQUlQLFFBQUosQ0FBYW1JLEtBQWIsQ0FBdkIsQ0FBdEI7QUFFSDtBQUNKOztBQUVELHVCQUFPd0csR0FBUDtBQUNIO0FBQ0o7OzswQ0FDaUJ2TyxJLEVBQU1sQyxLLEVBQU9xVCxVLEVBQVk7QUFDdkMsZ0JBQUllLFdBQVcsRUFBZjtBQUNBLGdCQUFJZixVQUFKLEVBQWdCO0FBQ1osb0JBQUlwUixHQUFHK1IsYUFBSCxDQUFpQmhVLEtBQWpCLENBQUosRUFBNkI7QUFDekIsd0JBQUlpQyxHQUFHZ1MsbUJBQUgsQ0FBdUJqVSxLQUF2QixFQUE4QjRULE9BQTlCLENBQXNDUCxVQUF0QyxLQUFxRCxDQUFDLENBQTFELEVBQTZEO0FBQ3pELDRCQUFJMVEsUUFBTVYsR0FBR2dTLG1CQUFILENBQXVCalUsS0FBdkIsRUFBOEJtRyxLQUE5QixDQUFvQyxHQUFwQyxFQUF5QyxDQUF6QyxDQUFWO0FBQ0FpTyxtQ0FBV2xTLEtBQUtTLEtBQUwsQ0FBWDtBQUNILHFCQUhELE1BR087QUFDSCw0QkFBSTBSLFdBQVdyVSxNQUFNbUcsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBZjtBQUNBLDRCQUFJbU8sYUFBYXRVLE1BQU1tRyxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFqQjtBQUNBbU8scUNBQWFwUyxLQUFLRCxHQUFHZ1MsbUJBQUgsQ0FBdUJLLFVBQXZCLENBQUwsQ0FBYjtBQUNBRixtQ0FBV0MsV0FBVyxHQUFYLEdBQWlCQyxVQUE1QjtBQUNIO0FBQ0osaUJBVkQsTUFVTztBQUNIRiwrQkFBV3BVLEtBQVg7QUFDSDtBQUNKLGFBZEQsTUFjTzs7QUFFSCxvQkFBSXFVLFlBQVdyVSxNQUFNbUcsS0FBTixDQUFZLEdBQVosRUFBaUIsQ0FBakIsQ0FBZjtBQUNBLG9CQUFJbU8sY0FBYXRVLE1BQU1tRyxLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFqQjtBQUNBLG9CQUFJbEUsR0FBRytSLGFBQUgsQ0FBaUJNLFdBQWpCLENBQUosRUFBa0M7O0FBRTlCQSxrQ0FBYXBTLEtBQUtELEdBQUdnUyxtQkFBSCxDQUF1QkssV0FBdkIsQ0FBTCxDQUFiO0FBQ0FGLCtCQUFXQyxZQUFXLEdBQVgsR0FBaUJDLFdBQTVCO0FBRUgsaUJBTEQsTUFLTztBQUNIRiwrQkFBV3BVLEtBQVg7QUFFSDtBQUNKO0FBQ0QsbUJBQU9vVSxRQUFQO0FBQ0g7Ozt5Q0FDZ0JsUyxJLEVBQU0yUixNLEVBQVFSLFUsRUFBWTtBQUN2QyxnQkFBSWtCLGdCQUFnQixFQUFwQjtBQUR1QztBQUFBO0FBQUE7O0FBQUE7QUFFdkMscUNBQWtCVixNQUFsQiw4SEFBMEI7QUFBQSx3QkFBakI3VCxLQUFpQjs7O0FBRXRCLHdCQUFJb1UsV0FBVyxLQUFLTCxpQkFBTCxDQUF1QjdSLElBQXZCLEVBQTZCbEMsS0FBN0IsRUFBb0NxVCxVQUFwQyxDQUFmO0FBQ0FrQixxQ0FBaUJILFdBQVcsR0FBNUI7QUFDSDtBQU5zQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU92QyxtQkFBT0csYUFBUDtBQUVIOzs7c0NBQ29CeFUsTyxFQUFTO0FBQzFCLGdCQUFJQSxPQUFKLEVBQWE7QUFDVCxvQkFBSUEsUUFBUXlVLFVBQVIsQ0FBbUIsSUFBbkIsS0FBNEJ6VSxRQUFRMFUsUUFBUixDQUFpQixJQUFqQixDQUFoQyxFQUF3RDtBQUNwRCwyQkFBTyxJQUFQO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPLEtBQVA7QUFDSDtBQUNKLGFBTkQsTUFNTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKOzs7NENBRTBCMVUsTyxFQUFTO0FBQ2hDLG1CQUFPQSxRQUFROFAsS0FBUixDQUFjLENBQWQsRUFBaUIsQ0FBQyxDQUFsQixDQUFQO0FBQ0g7QUFDRDs7Ozs7Ozs2Q0FJNEI5UCxPLEVBQVM7O0FBRWpDLGdCQUFJc0ssS0FBS2MsUUFBTCxDQUFjcEwsT0FBZCxDQUFKLEVBQTRCO0FBQ3hCLG9CQUFJQSxRQUFRNlQsT0FBUixDQUFnQixHQUFoQixLQUF3QixDQUFDLENBQXpCLElBQThCN1QsUUFBUTZULE9BQVIsQ0FBZ0IsR0FBaEIsS0FBd0IsQ0FBQyxDQUEzRCxFQUE4RDs7QUFFMUQsMkJBQU8sSUFBUDtBQUNILGlCQUhELE1BR087O0FBRUgsMkJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBTyxLQUFQO0FBQ0g7Ozs4Q0FDNEI3VCxPLEVBQVNtQyxJLEVBQU07QUFDeEMsZ0JBQUltSSxLQUFLYyxRQUFMLENBQWNwTCxPQUFkLENBQUosRUFBNEI7O0FBRXhCLG9CQUFJMlUsYUFBYTNVLFFBQVE4UCxLQUFSLENBQWM5UCxRQUFRNlQsT0FBUixDQUFnQixHQUFoQixJQUF1QixDQUFyQyxFQUF3QzdULFFBQVE2VCxPQUFSLENBQWdCLEdBQWhCLENBQXhDLENBQWpCO0FBQ0Esb0JBQUllLGFBQWFELFdBQVdkLE9BQVgsQ0FBbUIsSUFBbkIsQ0FBakI7QUFDQSxvQkFBSWdCLFdBQVdGLFdBQVdkLE9BQVgsQ0FBbUIsSUFBbkIsSUFBeUIsQ0FBeEM7QUFDQTVTLHdCQUFRQyxHQUFSLENBQVksc0NBQXFDMFQsVUFBckMsR0FBaUQsWUFBakQsR0FBK0RDLFFBQS9ELEdBQXlFLFdBQXpFLEdBQXFGRixVQUFqRztBQUNBLG9CQUFJQyxjQUFjLENBQUMsQ0FBZixJQUFvQkMsWUFBWSxDQUFDLENBQWpDLElBQXNDRCxhQUFhQyxRQUF2RCxFQUFpRTtBQUM3RCx3QkFBSUMsY0FBY0gsV0FBVzdFLEtBQVgsQ0FBaUI4RSxVQUFqQixFQUE2QkMsUUFBN0IsQ0FBbEI7QUFDQTVULDRCQUFRQyxHQUFSLENBQVksdUNBQXFDNFQsV0FBckMsR0FBaUQsV0FBakQsR0FBNkRILFVBQXpFO0FBQ0Esd0JBQUlJLGtCQUFKO0FBQ0Esd0JBQUdELFlBQVlqQixPQUFaLENBQW9CLEdBQXBCLElBQXlCLENBQTVCLEVBQThCO0FBQzFCLDRCQUFJbUIsbUJBQWlCN1MsS0FBS0QsR0FBR2dTLG1CQUFILENBQXVCWSxXQUF2QixFQUFvQzFPLEtBQXBDLENBQTBDLEdBQTFDLEVBQStDLENBQS9DLENBQUwsQ0FBckI7QUFDQTJPLG9DQUFVekssS0FBSzJLLFFBQUwsQ0FBY0QsZ0JBQWQsSUFBZ0NBLGdCQUFoQyxTQUFxREEsZ0JBQXJELE1BQVYsQ0FGMEIsQ0FFd0Q7OztBQUdsRi9ULGdDQUFRQyxHQUFSLENBQVksbUJBQWlCNlQsU0FBN0I7QUFDSCxxQkFORCxNQU1LO0FBQ0FBLG9DQUFZNVMsS0FBS0QsR0FBR2dTLG1CQUFILENBQXVCWSxXQUF2QixDQUFMLENBQVosQ0FEQSxDQUNxRDtBQUNyRDdULGdDQUFRQyxHQUFSLENBQVksbUJBQWlCNlQsU0FBN0I7QUFDSjs7QUFFREosaUNBQVdBLFdBQVdPLE9BQVgsQ0FBbUJKLFdBQW5CLEVBQWdDQyxTQUFoQyxDQUFYO0FBRUg7QUFDRDlULHdCQUFRQyxHQUFSLENBQVksMEJBQXdCeVQsVUFBcEM7QUFDQSx1QkFBT1EsS0FBS1IsVUFBTCxDQUFQO0FBQ0g7QUFHSjs7Ozs7O2tCQUlVelMsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2NhbGVuZGFyRGVtby5qc1wiKTtcbiIsImltcG9ydCBnZW5lcmF0ZVZpZXcgZnJvbSAnLi9zcmMvUlZjYWxlbmRhcidcclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGdlbmVyYXRlVmlldyhcIiNhcHBcIiwgZnVuY3Rpb24gKHNlbGVjdERhdGUpIHtcclxuICAgICAgICBhbGVydChcInNlbGVjdERhdGUsOlwiK3NlbGVjdERhdGUpXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IFJWIGZyb20gJy4vcnYnXHJcbmltcG9ydCBsdW5hckNhbGVuZGFyIGZyb20gJy4vbHVuYXInXHJcblxyXG4vKipcclxuICogIFxyXG4gKi9cclxuZnVuY3Rpb24gQ2FsZW5kYXIoKSB7XHJcbiAgICB0aGlzLm1vbnRocyA9IG5ldyBBcnJheShcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWNgeS4gFwiLCBcIuWNgeS6jFwiKTtcclxuICAgIHRoaXMuZGF5Q291bnRzID0gbmV3IEFycmF5KDMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzEpO1xyXG4gICAgdGhpcy5kYXlzID0gbmV3IEFycmF5KFwi5pelXCIsIFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIpO1xyXG4gICAgdGhpcy50b2RheSA9IHRoaXMuZ2V0VG9kYXkoKTtcclxuICAgIHRoaXMueWVhciA9IHRoaXMudG9kYXkueWVhcjtcclxuICAgIHRoaXMubW9udGggPSB0aGlzLnRvZGF5Lm1vbnRoO1xyXG4gICAgdGhpcy5uZXdDYWwgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy5zZWxlY3REYXkgPSB0aGlzLm5ld0NhbDtcclxuICAgIHRoaXMuZGF5ID0gLTE7XHJcbiAgICB0aGlzLnN0YXJ0RGF5ID0gMDtcclxuICAgIHRoaXMuZGFpbHkgPSAwO1xyXG4gICAgdGhpcy5ydiA9IHVuZGVmaW5lZFxyXG4gICAgaWYgKCh0aGlzLnRvZGF5LnllYXIgPT0gdGhpcy5uZXdDYWwuZ2V0RnVsbFllYXIoKSkgJiYgKHRoaXMudG9kYXkubW9udGggPT0gdGhpcy5uZXdDYWwuZ2V0TW9udGgoKSkpIHtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMudG9kYXkuZGF5O1xyXG4gICAgfVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5nZXRXZWVrcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMubmV3Q2FsID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAxKTtcclxuICAgIHRoaXMuZGF5ID0gLTE7XHJcbiAgICB0aGlzLnN0YXJ0RGF5ID0gdGhpcy5uZXdDYWwuZ2V0RGF5KCk7XHJcbiAgICB0aGlzLmRhaWx5ID0gMDtcclxuICAgIGlmICgodGhpcy50b2RheS55ZWFyID09IHRoaXMubmV3Q2FsLmdldEZ1bGxZZWFyKCkpICYmICh0aGlzLnRvZGF5Lm1vbnRoID09IHRoaXMubmV3Q2FsLmdldE1vbnRoKCkpKSB7XHJcbiAgICAgICAgdGhpcy5kYXkgPSB0aGlzLnRvZGF5LmRheTtcclxuICAgIH1cclxuICAgIHZhciBkYXlDb3VudHMgPSB0aGlzLmdldERheUNvdW50cyh0aGlzLm5ld0NhbC5nZXRNb250aCgpLCB0aGlzLm5ld0NhbC5nZXRGdWxsWWVhcigpKTtcclxuICAgIHZhciB3ZWVrcyA9IFtdXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgIHZhciBkYXlJbldlZWtzID0gW11cclxuICAgICAgICBkYXlJbldlZWtzLmlkID0gYHdlZWtfcm93XyR7aX1gXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA3OyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIF9jZWxsT2JqID0ge31cclxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IFwiXCJcclxuICAgICAgICAgICAgdmFyIGxhYmxlID0gXCJcIlxyXG4gICAgICAgICAgICB2YXIgaWQgPSBgd2Vla19kYXlfJHtpfSR7an1gXHJcbiAgICAgICAgICAgIGlmICgoaiA9PSB0aGlzLnN0YXJ0RGF5KSAmJiAoMCA9PSB0aGlzLmRhaWx5KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYWlseSA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRheSA9PSB0aGlzLmRhaWx5KSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiZm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjojRkZGRkZGO2JhY2tncm91bmQtY29sb3I6IzVDQkE1QTtoZWlnaHQ6MjBweDt0ZXh0LWFsaWduOmNlbnRlclwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwiY3VycmVudFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PSA2KSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6I0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNFNUU5RjI7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjE4cHg7d2lkdGg6MTIlXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJzYXRcIlxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGogPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImNvbG9yOiAjRkYwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6MThweDt3aWR0aDoxMiVcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcInN1blwiXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6IzI0M0Y2NTtiYWNrZ3JvdW5kLWNvbG9yOiNFNUU5RjI7aGVpZ2h0OjIwcHg7d2lkdGg6MTElO3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJub3JtYWxcIlxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKCh0aGlzLmRhaWx5ID4gMCkgJiYgKHRoaXMuZGFpbHkgPD0gZGF5Q291bnRzKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IHRoaXMuZGFpbHkgKyBcIlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYWlseSsrO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R5bGUgPSBcImNvbG9yOiMwMDAwMDA7YmFja2dyb3VuZC1jb2xvcjogI2Y2ZjZmNjtoZWlnaHQ6MjBweDt3aWR0aDogMTElO3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfY2VsbE9iai5jb250ZW50ID0gY29udGVudFxyXG4gICAgICAgICAgICBfY2VsbE9iai5pZCA9IGlkXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmxhYmxlID0gbGFibGVcclxuICAgICAgICAgICAgX2NlbGxPYmouc3R5bGUgPSBzdHlsZVxyXG4gICAgICAgICAgICBsZXQgbHVuYXIgPSBsdW5hckNhbGVuZGFyLmdldEx1bmFyKHRoaXMueWVhciwgdGhpcy5tb250aCsxLCBjb250ZW50KVxyXG4gICAgICAgICAgICBfY2VsbE9iai5jb250ZW50ID0gY29udGVudFxyXG4gICAgICAgICAgICBfY2VsbE9iai5pZCA9IGlkXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmxhYmxlID0gbGFibGVcclxuICAgICAgICAgICAgX2NlbGxPYmouc3R5bGUgPSBzdHlsZVxyXG4gICAgICAgICAgICBsZXQgbHVuYXJJbmZvID0gXCJcIlxyXG4gICAgICAgICAgICBpZiAobHVuYXIuY2FsZW5kYXJpY2l0eSAhPSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5jYWxlbmRhcmljaXR5XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGx1bmFyLnNvbGFySG9saWRheSkge1xyXG4gICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIuc29sYXJIb2xpZGF5XHJcblxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGx1bmFyLmx1bmFySG9saWRheSkge1xyXG4gICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIubHVuYXJIb2xpZGF5XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZihsdW5hci5jaGluYURheT09PVwi5Yid5LiAXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLmNoaW5hTW9udGggXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBsdW5hckluZm89IGx1bmFyLmNoaW5hRGF5XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY29udGVudCAhPSBcIlwiKXtcclxuICAgICAgICAgICAgICAgIF9jZWxsT2JqLmx1bmFySW5mbyA9IGx1bmFySW5mb1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIF9jZWxsT2JqLmx1bmFySW5mbyA9IFwiXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBkYXlJbldlZWtzLnB1c2goX2NlbGxPYmopXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlZWtzLnB1c2goZGF5SW5XZWVrcylcclxuICAgICAgICB3aW5kb3cud2Vla3MgPSB3ZWVrc1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHdlZWtzXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldERheUNvdW50cyA9IGZ1bmN0aW9uIChtb250aCwgeWVhcikge1xyXG4gICAgaWYgKDEgPT0gbW9udGgpIHtcclxuICAgICAgICByZXR1cm4gKCgwID09IHllYXIgJSA0KSAmJiAoMCAhPSAoeWVhciAlIDEwMCkpKSB8fCAoMCA9PSB5ZWFyICUgNDAwKSA/IDI5IDogMjhcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF5Q291bnRzW21vbnRoXVxyXG4gICAgfVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5nZXRUb2RheSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfb2JqID0ge31cclxuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgX29iai5ub3cgPSBub3dcclxuICAgIF9vYmoueWVhciA9IG5vdy5nZXRGdWxsWWVhcigpO1xyXG4gICAgX29iai5tb250aCA9IG5vdy5nZXRNb250aCgpO1xyXG4gICAgX29iai5kYXkgPSBub3cuZ2V0RGF0ZSgpO1xyXG4gICAgcmV0dXJuIF9vYmpcclxufVxyXG5cclxuQ2FsZW5kYXIucHJvdG90eXBlLnN1Yk1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCh0aGlzLm1vbnRoIC0gMSkgPCAwKSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IDExO1xyXG4gICAgICAgIHRoaXMueWVhciA9IHRoaXMueWVhciAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9udGggPSB0aGlzLm1vbnRoIC0gMTtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwibW9udGg6XCIgKyB0aGlzLm1vbnRoKVxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5hZGRNb250aCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgodGhpcy5tb250aCArIDEpID4gMTEpIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gMDtcclxuICAgICAgICB0aGlzLnllYXIgPSB0aGlzLnllYXIgKyAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gdGhpcy5tb250aCArIDE7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLnNldE1vbnRoID0gZnVuY3Rpb24gKG1vbnRoKSB7XHJcbiAgICBpZiAobW9udGggPCAxIHx8IG1vbnRoID4gMTIpIHtcclxuICAgICAgICBhbGVydChcIuaciOS7veW/hemhu+WcqDEtMTLkuYvpl7QhXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMubW9udGggPSBtb250aFxyXG59XHJcbkNhbGVuZGFyLnByb3RvdHlwZS5zZXRZZWFyID0gZnVuY3Rpb24gKHllYXIpIHtcclxuICAgIHRoaXMueWVhciA9IHllYXJcclxufVxyXG5cclxuXHJcbndpbmRvdy5tb3VzZU92ZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGRkZGRlwiXHJcbn1cclxuXHJcbndpbmRvdy5tb3VzZU91dCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICB2YXIgbGFiZWwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbGFibGUnKVxyXG4gICAgaWYgKGxhYmVsID09ICdzYXQnIHx8IGxhYmVsID09ICdzdW4nKSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiI0ZGMDAwMFwiXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBcIiMwMDAwMDBcIlxyXG4gICAgfVxyXG5cclxufVxyXG5sZXQgbUNhbGVuZGFyID0gbmV3IENhbGVuZGFyKClcclxud2luZG93Lm1DYWxlbmRhciA9IG1DYWxlbmRhclxyXG53aW5kb3cuY2xpY2tEYXkgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQuaW5uZXJUZXh0ICE9ICcnKSB7XHJcbiAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKG1DYWxlbmRhci55ZWFyLCBtQ2FsZW5kYXIubW9udGgsIGVsZW1lbnQuY2hpbGRyZW5bMF0uaW5uZXJUZXh0XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICBtQ2FsZW5kYXIuc2VsZWN0RGF5ID0gZGF5XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlVmlldyhlbCwgY2FsbGJhY2spIHtcclxuXHJcbiAgICB2YXIgd2Vla3MgPSBtQ2FsZW5kYXIuZ2V0V2Vla3MoKVxyXG4gICAgbGV0IHJ2ID0gbmV3IFJWKHtcclxuICAgICAgICBlbDogZWwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICB5ZWFyOiAnJyArIG1DYWxlbmRhci55ZWFyLFxyXG4gICAgICAgICAgICBtb250aDogJycgKyAobUNhbGVuZGFyLm1vbnRoICsgMSksXHJcbiAgICAgICAgICAgIHdlZWtUaXRsZXM6IFt7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5MVwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LiAXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTJcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS6jFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXkzXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkuIlcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5NFwiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5ZubXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTVcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS6lFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIHdlZWtzOiB3ZWVrc1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZG9tOiB7XHJcbiAgICAgICAgICAgIHRhZzogXCJ0YWJsZVwiLFxyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgYm9yZGVyOiAwLFxyXG4gICAgICAgICAgICAgICAgY2VsbHBhZGRpbmc6ICcwJyxcclxuICAgICAgICAgICAgICAgIGNlbGxzcGFjaW5nOiAnMScsXHJcbiAgICAgICAgICAgICAgICBpZDogJ2NhbHRhYmxlJyxcclxuICAgICAgICAgICAgICAgIGtleTogJ3RhYmxlJyxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiAndGV4dC1kZWNvcmF0aW9uOm5vbmU7d2lkdGg6MjAwO2JhY2tncm91bmQtY29sb3I6I0QwRDBFRTtmb250LXNpemU6OHB0O2JvcmRlcjowcHggZG90dGVkICMxQzZGRjU7J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgIHRhZzogXCJ0aGVhZFwiLFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGhlYWRcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWduOiBcIm1pZGRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogXCJ0aXRsZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGl0bGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXdlaWdodDpub3JtYWw7aGVpZ2h0OjI0cHg7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzMzMzMzMzt0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNBNEI5RDc7Ym9yZGVyLXRvcC13aWR0aDoxcHg7Ym9yZGVyLXJpZ2h0LXdpZHRoOjFweDtib3JkZXItYm90dG9tLXdpZHRoOiAxcHg7IGJvcmRlci1sZWZ0LXdpZHRoOiAxcHg7Ym9yZGVyLWJvdHRvbS1zdHlsZTogMXB4O2JvcmRlci10b3AtY29sb3I6ICM5OTk5OTk7Ym9yZGVyLXJpZ2h0LWNvbG9yOiAjOTk5OTk5O2JvcmRlci1ib3R0b20tY29sb3I6Izk5OTk5OTtib3JkZXItbGVmdC1jb2xvcjojOTk5OTk5OydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzcGFuOiBcIjdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RkVGl0bGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnZGl2JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAndGl0bGVEaXYnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBcIm1DYWxlbmRhci5zdWJNb250aCgpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC13ZWlnaHQ6Ym9sZDsgY29sb3I6IzI0M0Y2NTtjdXJzb3I6aGFuZDt0ZXh0LWRlY29yYXRpb246bm9uZTttYXJnaW4tcmlnaHQ6MjBweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJzdWJCdXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIjxcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwiaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInllYXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aDogXCI0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC1zaXplOiA5cHQ7IHRleHQtZGVjb3JhdGlvbjogbm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGRkZGO2hlaWdodDogMjBweDtib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2OyBjb2xvcjogIzAwMDAwMDt0ZXh0LWFsaWduOmNlbnRlcjsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaXplOiBcIjRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICclI3llYXIjJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpbnB1dFllYXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIlwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJpbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibW9udGhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGxlbmd0aDogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnJSNtb250aCMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXNpemU6IDlwdDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO2JhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7aGVpZ2h0OiAyMHB4O2JvcmRlcjogMXB4IHNvbGlkICM2NjY2NjY7IGNvbG9yOiAjMDAwMDAwO3RleHQtYWxpZ246Y2VudGVyOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IFwiMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiaW5wdXRNb250aFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAnYnV0dG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBcIm1DYWxlbmRhci5hZGRNb250aCgpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC13ZWlnaHQ6IGJvbGQ7Y29sb3I6ICMyNDNGNjU7Y3Vyc29yOiBoYW5kO3RleHQtZGVjb3JhdGlvbjogbm9uZTttYXJnaW4tbGVmdDoyMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImFkZEJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiPlwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICB0YWc6ICd0cicsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnZGF5dHInXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb2xvcjogI0ZGMDAwMDt0ZXh0LWRlY29yYXRpb246IG5vbmU7YmFja2dyb3VuZC1jb2xvcjogI0MwRDBFODt0ZXh0LWFsaWduOiBjZW50ZXI7aGVpZ2h0OiAyMHB4O3dpZHRoOiAxMiU7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2RheVN1blRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wi5pelXCJdLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjb2xvcjojMDAwMDAwO2JhY2tncm91bmQtY29sb3I6I0MwRDBFODtoZWlnaHQ6MjBweDt3aWR0aDoxMSU7dGV4dC1hbGlnbjpjZW50ZXI7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCIlI3YuaWQjJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yOiBcInYgX2luXyB3ZWVrVGl0bGVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIiUjdi52YWx1ZSMlXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnIGNvbG9yOiNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojQzBEMEU4O3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDogMjBweDt3aWR0aDogMTIlOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdkYXlTYXRUaXRsZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIuWFrVwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGFnOiBcInRib2R5XCIsXHJcbiAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNlbGxzcGFjaW5nOiBcIjBcIixcclxuICAgICAgICAgICAgICAgICAgICBjZWxscGFkZGluZzogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiY2FsZW5kYXJcIixcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogJyB0ZXh0LWRlY29yYXRpb246IG5vbmU7d2lkdGg6IDE3MDtiYWNrZ3JvdW5kLWNvbG9yOiAjQzBEMEU4O2ZvbnQtc2l6ZTogOXB0O2JvcmRlcjogMHB4IGRvdHRlZCAjMUM2RkE1OycsXHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFcIixcclxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwidGJvZHlcIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgIHRhZzogJ3RyJyxcclxuICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2N1cnNvcjpoYW5kJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIiUjd2Vlay5pZCMlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcl9mb3I6ICd3ZWVrIF9pbl8gd2Vla3MnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCIlI3YuaWQjJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljazogJ2NsaWNrRGF5KHRoaXMpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnJSN2LnN0eWxlIyUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFibGU6ICclI3YubGFibGUjJScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlb3ZlcjogJ21vdXNlT3Zlcih0aGlzKTsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZU91dDogJ21vdXNlT3V0KHRoaXMpOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZERvbURhdGE6XCJ2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcjogJ3YgX2luJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwicFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwieyUjdi5pZCMlKydfY29udGVudCd9XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6XCJtYXJnaW4tYmxvY2stc3RhcnQ6IDBlbTttYXJnaW4tYmxvY2stZW5kOiAwZW1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIiUjdi5jb250ZW50IyVcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJ7JSN2LmlkIyUrJ19sdW5hckluZm8nfVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOlwibWFyZ2luLWJsb2NrLXN0YXJ0OiAwZW07bWFyZ2luLWJsb2NrLWVuZDogMGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCIlI3YubHVuYXJJbmZvIyVcIl1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LF1cclxuICAgICAgICAgICAgICAgIH0sXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIGxldCBtb250aCA9IG1DYWxlbmRhclsnbW9udGgnXVxyXG4gICAgbGV0IHllYXIgPSBtQ2FsZW5kYXJbJ3llYXInXVxyXG4gICAgbGV0IHNlbGVjdERheSA9IG1DYWxlbmRhclsnc2VsZWN0RGF5J11cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICdtb250aCcsIHtcclxuXHJcbiAgICAgICAgc2V0KG52YWx1ZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld01vbnRoOlwiICsgbnZhbHVlKVxyXG4gICAgICAgICAgICBpZiAobW9udGggIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBtb250aCA9IG52YWx1ZVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS53ZWVrcyA9IG1DYWxlbmRhci5nZXRXZWVrcygpXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLm1vbnRoID0gKG52YWx1ZSArIDEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG1vbnRoXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtQ2FsZW5kYXIsICd5ZWFyJywge1xyXG4gICAgICAgIHNldChudmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHllYXIgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ld1llYXI6XCIgKyBudmFsdWUpXHJcbiAgICAgICAgICAgICAgICB5ZWFyID0gbnZhbHVlXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLndlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEueWVhciA9IG52YWx1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4geWVhclxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1DYWxlbmRhciwgJ3NlbGVjdERheScsIHtcclxuICAgICAgICBzZXQobnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3REYXkgIT0gbnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3REYXkgPSBudmFsdWVcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZWN0RGF5XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsImNsYXNzIEx1bmFyQ2FsZW5kYXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLyoqXHRcclxuICAgICAqIFxyXG4gICAgICog5Yac5Y6GMTkwMC0yMTAw55qE5ram5pyI5L+h5oGv6KGoIFxyXG4gICAg5Y2B5YWt6L+b5Yi25b2i5byPOlxyXG4gICAgMHggeHh4eHggICAgXHJcbiAgICDkuozov5vliLblvaLlvI86XHJcbiAgICB4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHR4eHh4XHJcbiAgICAyMC0xN1x0MTYtMTJcdDEyLTlcdDgtNVx0ICAgIDQtMVxyXG7CoFxyXG4gICAgMS00OiDooajnpLrlvZPlubTmnInml6Dpl7DlubTvvIzmnInnmoTor53vvIzkuLrpl7DmnIjnmoTmnIjku73vvIzmsqHmnInnmoTor53vvIzkuLow44CCXHJcblxyXG4gICAgNS0xNu+8muS4uumZpOS6humXsOaciOWklueahOato+W4uOaciOS7veaYr+Wkp+aciOi/mOaYr+Wwj+aciO+8jDHkuLozMOWkqe+8jDDkuLoyOeWkqeOAgijms6jmhI/vvJrku44x5pyI5YiwMTLmnIjlr7nlupTnmoTmmK/nrKwxNuS9jeWIsOesrDXkvY3jgIIpXHJcbiAgICAxNy0yMO+8miDooajnpLrpl7DmnIjmmK/lpKfmnIjov5jmmK/lsI/mnIjvvIzku4XlvZPlrZjlnKjpl7DmnIjnmoTmg4XlhrXkuIvmnInmhI/kuYnjgIJcclxuXHJcbiAgICDkuL7kuKrkvovlrZDvvJpcclxuXHJcbiAgICAxOTgw5bm055qE5pWw5o2u5piv77yaIDB4MDk1YjAgMHjku6PooajljYHlha3ov5vliLbvvIzlkI7pnaLnmoTmmK/ljYHlha3ov5vliLbmlbDjgIJcclxuICAgICAgICAgICAgIDEwMDAgMDAwMCAwMDAwIDAwMDAgMDAwMFxyXG4gICAgICAgICAgICAgMDAwMCAwMDAwIDAwMDAgMDAwMCAxMTExXHJcblxyXG4gICAg5LqM6L+b5Yi277yaICAwMDAwwqAxMDAxIDAxMDEgMTAxMSAwMDAwXHJcblxyXG4gICAg6KGo56S6MTk4MOW5tOayoeaciemXsOaciO+8jOS7jjHmnIjliLAxMuaciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEyOeOAgTMwIOOAgTI544CBMzDjgIEyOeOAgTMw44CBIDMw44CBMjnjgIEzMOOAgTMw44CCXHJcblxyXG4gICAgMTk4MuW5tOeahOaVsOaNruaYr++8mjB4MGE5NzRcclxuICAgICAgICAgMTAxMCAgIDEwMDEgMDExMSAwMTAwXHJcbiAgICAwMDAwIDEwMTAgMCAxMDAxIDAxMTEgMDEwMFxyXG5cclxuICAgIOihqOekujE5ODLlubTnmoQ05pyI5Li66Zew5pyI77yM5Y2z5pyJ56ys5LqM5LiqNOaciO+8jOS4lOaYr+mXsOWwj+aciOOAglxyXG5cclxuICAgIOS7jjHmnIjliLAxM+aciOeahOWkqeaVsOS+neasoeS4uu+8mjMw44CBMjnjgIEzMOOAgTI544CBwqAyOSjpl7DmnIgp44CBIDMw44CBMjnjgIEyOeOAgTMw44CBIDI544CBMzDjgIEzMOOAgTMw44CCXHJcblxyXG4gIFxyXG4gICogQEFycmF5IE9mIFByb3BlcnR5XHJcbiAgKiBAcmV0dXJuIEhleCBcclxuICAqL1xyXG4gICAgdGhpcy5feWVhckluZm8gPSBbMHgwNGJkOCwgMHgwNGFlMCwgMHgwYTU3MCwgMHgwNTRkNSwgMHgwZDI2MCwgMHgwZDk1MCwgMHgxNjU1NCwgMHgwNTZhMCwgMHgwOWFkMCwgMHgwNTVkMiwvLzE5MDAtMTkwOVxyXG4gICAgICAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAweDA5NWIwLCAweDE0OTc3LC8vMTkxMC0xOTE5XHJcbiAgICAgIDB4MDQ5NzAsIDB4MGE0YjAsIDB4MGI0YjUsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MWFiNTQsIDB4MDJiNjAsIDB4MDk1NzAsIDB4MDUyZjIsIDB4MDQ5NzAsLy8xOTIwLTE5MjlcclxuICAgICAgMHgwNjU2NiwgMHgwZDRhMCwgMHgwZWE1MCwgMHgwNmU5NSwgMHgwNWFkMCwgMHgwMmI2MCwgMHgxODZlMywgMHgwOTJlMCwgMHgxYzhkNywgMHgwYzk1MCwvLzE5MzAtMTkzOVxyXG4gICAgICAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LC8vMTk0MC0xOTQ5XHJcbiAgICAgIDB4MDZjYTAsIDB4MGI1NTAsIDB4MTUzNTUsIDB4MDRkYTAsIDB4MGE1YjAsIDB4MTQ1NzMsIDB4MDUyYjAsIDB4MGE5YTgsIDB4MGU5NTAsIDB4MDZhYTAsLy8xOTUwLTE5NTlcclxuICAgICAgMHgwYWVhNiwgMHgwYWI1MCwgMHgwNGI2MCwgMHgwYWFlNCwgMHgwYTU3MCwgMHgwNTI2MCwgMHgwZjI2MywgMHgwZDk1MCwgMHgwNWI1NywgMHgwNTZhMCwvLzE5NjAtMTk2OVxyXG4gICAgICAweDA5NmQwLCAweDA0ZGQ1LCAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNmEwLCAweDE5NWE2LC8vMTk3MC0xOTc5XHJcbiAgICAgIDB4MDk1YjAsIDB4MDQ5YjAsIDB4MGE5NzQsIDB4MGE0YjAsIDB4MGIyN2EsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MGFmNDYsIDB4MGFiNjAsIDB4MDk1NzAsLy8xOTgwLTE5ODlcclxuICAgICAgMHgwNGFmNSwgMHgwNDk3MCwgMHgwNjRiMCwgMHgwNzRhMywgMHgwZWE1MCwgMHgwNmI1OCwgMHgwNTVjMCwgMHgwYWI2MCwgMHgwOTZkNSwgMHgwOTJlMCwvLzE5OTAtMTk5OVxyXG4gICAgICAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAweDA5MmQwLCAweDBjYWI1LC8vMjAwMC0yMDA5XHJcbiAgICAgIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGJhYTQsIDB4MGFkNTAsIDB4MDU1ZDksIDB4MDRiYTAsIDB4MGE1YjAsIDB4MTUxNzYsIDB4MDUyYjAsIDB4MGE5MzAsLy8yMDEwLTIwMTlcclxuICAgICAgMHgwNzk1NCwgMHgwNmFhMCwgMHgwYWQ1MCwgMHgwNWI1MiwgMHgwNGI2MCwgMHgwYTZlNiwgMHgwYTRlMCwgMHgwZDI2MCwgMHgwZWE2NSwgMHgwZDUzMCwvLzIwMjAtMjAyOVxyXG4gICAgICAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YWZiLCAweDA0YWQwLCAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LC8vMjAzMC0yMDM5XHJcbiAgICAgIDB4MGI1YTAsIDB4MDU2ZDAsIDB4MDU1YjIsIDB4MDQ5YjAsIDB4MGE1NzcsIDB4MGE0YjAsIDB4MGFhNTAsIDB4MWIyNTUsIDB4MDZkMjAsIDB4MGFkYTAsLy8yMDQwLTIwNDlcclxuICAgICAgMHgxNGI2MywgMHgwOTM3MCwgMHgwNDlmOCwgMHgwNDk3MCwgMHgwNjRiMCwgMHgxNjhhNiwgMHgwZWE1MCwgMHgwNmIyMCwgMHgxYTZjNCwgMHgwYWFlMCwvLzIwNTAtMjA1OVxyXG4gICAgICAweDBhMmUwLCAweDBkMmUzLCAweDBjOTYwLCAweDBkNTU3LCAweDBkNGEwLCAweDBkYTUwLCAweDA1ZDU1LCAweDA1NmEwLCAweDBhNmQwLCAweDA1NWQ0LC8vMjA2MC0yMDY5XHJcbiAgICAgIDB4MDUyZDAsIDB4MGE5YjgsIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGI2YTYsIDB4MGFkNTAsIDB4MDU1YTAsIDB4MGFiYTQsIDB4MGE1YjAsIDB4MDUyYjAsLy8yMDcwLTIwNzlcclxuICAgICAgMHgwYjI3MywgMHgwNjkzMCwgMHgwNzMzNywgMHgwNmFhMCwgMHgwYWQ1MCwgMHgxNGI1NSwgMHgwNGI2MCwgMHgwYTU3MCwgMHgwNTRlNCwgMHgwZDE2MCwvLzIwODAtMjA4OVxyXG4gICAgICAweDBlOTY4LCAweDBkNTIwLCAweDBkYWEwLCAweDE2YWE2LCAweDA1NmQwLCAweDA0YWUwLCAweDBhOWQ0LCAweDBhMmQwLCAweDBkMTUwLCAweDBmMjUyLC8vMjA5MC0yMDk5XHJcbiAgICAgIDB4MGQ1MjBdLy8yMTAwXHJcblxyXG5cclxuICAgIHRoaXMuX2FzdHJvbG9neSA9IFtcIumtlOe+r1wiLCBcIuawtOeTtlwiLCBcIuWPjOmxvFwiLCBcIueZvee+ilwiLCBcIumHkeeJm1wiLCBcIuWPjOWtkFwiLCBcIuW3qOifuVwiLCBcIueLruWtkFwiLCBcIuWkhOWls1wiLCBcIuWkqeenpFwiLCBcIuWkqeidjlwiLCBcIuWwhOaJi1wiLCBcIumtlOe+r1wiXVxyXG4gICAgLyoqXHJcbiAgICAgICog5YWs5Y6G5q+P5Liq5pyI5Lu955qE5aSp5pWw5pmu6YCa6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9kYXlJbk1vbnRoID0gWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlpKnlubLpgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX1RpYW5HYW4gPSBbXCLnlLJcIiwgXCLkuZlcIiwgXCLkuJlcIiwgXCLkuIFcIiwgXCLmiIpcIiwgXCLlt7FcIiwgXCLluppcIiwgXCLovptcIiwgXCLlo6xcIiwgXCLnmbhcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlpKnlubLlnLDmlK/kuYvlnLDmlK/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX0RpWmhpID0gW1wi5a2QXCIsIFwi5LiRXCIsIFwi5a+FXCIsIFwi5Y2vXCIsIFwi6L6wXCIsIFwi5bezXCIsIFwi5Y2IXCIsIFwi5pyqXCIsIFwi55SzXCIsIFwi6YWJXCIsIFwi5oiMXCIsIFwi5LqlXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog55Sf6IKW6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9ab2RpYWMgPSBbXCLpvKBcIiwgXCLniZtcIiwgXCLomY5cIiwgXCLlhZRcIiwgXCLpvplcIiwgXCLom4dcIiwgXCLpqaxcIiwgXCLnvopcIiwgXCLnjLRcIiwgXCLpuKFcIiwgXCLni5dcIiwgXCLnjKpcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiAyNOiKguawlOmAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2FsZW5kYXJpY2l0eSA9IFtcIuWwj+WvklwiLCBcIuWkp+WvklwiLCBcIueri+aYpVwiLCBcIumbqOawtFwiLCBcIuaDiuibsFwiLCBcIuaYpeWIhlwiLCBcIua4heaYjlwiLCBcIuiwt+mbqFwiLCBcIueri+Wkj1wiLCBcIuWwj+a7oVwiLCBcIuiKkuenjVwiLCBcIuWkj+iHs1wiLCBcIuWwj+aakVwiLCBcIuWkp+aakVwiLCBcIueri+eni1wiLCBcIuWkhOaakVwiLCBcIueZvemcslwiLCBcIueni+WIhlwiLCBcIuWvkumcslwiLCBcIumcnOmZjVwiLCBcIueri+WGrFwiLCBcIuWwj+mbqlwiLCBcIuWkp+mbqlwiLCBcIuWGrOiHs1wiXVxyXG4gICAgLyoqXHJcbiAgICAgIOWGnOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX2x1bmFySG9saWRheSA9IFtcIjAxMDEg5pil6IqCXCIsIFwiMDExNSDlhYPlrrVcIiwgXCIwNTA1IOerr+WNiFwiLCBcIjA3MDcg5oOF5Lq6XCIsIFwiMDcxNSDkuK3lhYNcIixcclxuICAgICAgXCIwODE1IOS4reeni1wiLCBcIjA5MDkg6YeN6ZizXCIsIFwiMTIwOCDohYrlhatcIiwgXCIxMjI0IOWwj+W5tFwiLCBcIjEyMzAg6Zmk5aSVXCJdXHJcbiAgICAvKlxyXG4gICAgIOWFrOWOhuiKguaXpVxyXG4gICAgKi9cclxuICAgIHRoaXMuX3NvbGFySG9saWRheSA9IFtcclxuICAgICAgXCIwMTAxIOWFg+aXplwiLCBcIjAyMTQg5oOF5Lq6XCIsIFwiMDMwOCDlpoflpbNcIiwgXCIwMzEyIOakjeagkVwiLCBcIjAzMTUg5raI6LS56ICF5p2D55uK5pelXCIsIFwiMDQwMSDmhJrkurpcIiwgXCIwNTAxIOWKs+WKqFwiLCBcIjA1MDQg6Z2S5bm0XCIsIC8vXHJcbiAgICAgIFwiMDUxMiDmiqTlo6tcIiwgXCIwNjAxIOWEv+erpVwiLCBcIjA3MDEg5bu65YWaXCIsIFwiMDgwMSDlu7rlhptcIiwgXCIwODA4IOeItuS6slwiLCBcIjA5MTAg5pWZ5biIXCIsIFwiMDkyOCDlrZTlrZDor57ovrBcIiwgLy9cclxuICAgICAgXCIxMDAxIOWbveW6hlwiLCBcIjEwMjQg6IGU5ZCI5Zu95pelXCIsIFwiMTExMiDlrZnkuK3lsbHor57ovrDnuqrlv7VcIiwgXCIxMjIwIOa+s+mXqOWbnuW9kue6quW/tVwiLCBcIjEyMjUg5Zyj6K+eXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICogMTkwMC0yMTAw5ZCE5bm05Yac5Y6G55qEMjToioLmsJTml6XmnJ/pgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NhbGVuZGFyaWNpdHlUYWJsZSA9IFsnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJywgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLFxyXG4gICAgICAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQxOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJywgJzk3YmQwOTgwMWQ5ODA4MmM5NWY4ZTFjZmNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwODJjOTVmOGUxY2ZjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsICc5N2JkMDk3YmQwN2Y1OTViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDE5ODAxZWM5MjEwYzkyNzRjOTIwZScsICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLFxyXG4gICAgICAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JkMDdmMTQ4N2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsICc5N2JjZjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLFxyXG4gICAgICAnOTdiY2Y3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJywgJzk3YmNmN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiOTdiZDE5N2MzNmM5MjEwYzkyNzRjOTIwZScsICc5N2JjZjdmMGU0N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkyMGUnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNzBjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLFxyXG4gICAgICAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsICc5Nzc4MzdmMGUzN2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2Y1MzA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjEwYzhkYzInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMzdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLFxyXG4gICAgICAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OWIwNzIzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzIzYjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDcyM2IwNmJkJywgJzdmMDdlN2YwZTM3ZjE0OTk4MDgzYjA3ODdiMDcyMScsICc3ZjBlMjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLFxyXG4gICAgICAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsICc3ZjA3ZTdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzNjY2NWI2NmFhODk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNzIxJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsICc3ZjBlMzY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLFxyXG4gICAgICAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLFxyXG4gICAgICAnN2YwZTM2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JywgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLFxyXG4gICAgICAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsICc2NjVmNjdmMGUzN2YxNDg5ODAxZWIwNzIyOTdjMzUnLFxyXG4gICAgICAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOS4reaWh+aXpeacn1xyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2hpbmVzZUNoYXIgPSBbXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDlhpzljobov5vliLbljZXkvY1cclxuICAgICAgKi9cclxuICAgIHRoaXMuX2NoaW5lc2VUZW5DaGFyID0gW1wi5YidXCIsIFwi5Y2BXCIsIFwi5bu/XCIsIFwi5Y2FXCJdXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5pyI5Lu95Yac5Y6G6KGo56S6XHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9sdW5hck1vbnRoVGFibGUgPSBbXCLmraNcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIiwgXCLkuINcIiwgXCLlhatcIiwgXCLkuZ1cIiwgXCLljYFcIiwgXCLlhqxcIiwgXCLohYpcIl1cclxuXHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm05LiA5pW05bm055qE5oC75aSp5pWwXHJcbiAgICAqL1xyXG4gIF9sdW5hclllYXJEYXlzKHllYXIpIHtcclxuICAgIHZhciBpLCBzdW0gPSAzNDg7XHJcbiAgICBmb3IgKGkgPSAweDgwMDA7IGkgPiAweDg7IGkgPj49IDEpIHsgc3VtICs9ICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiBpKSA/IDEgOiAwOyB9XHJcbiAgICByZXR1cm4gKHN1bSArIHRoaXMuX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTlr7nlupTnmoTpl7DmnIhcclxuICAgICovXHJcbiAgX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpIHtcclxuICAgIHJldHVybiAodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgMHgwMDAwZik7XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ55bm06Zew5pyI55qE5aSp5pWwIOiLpeivpeW5tOayoeaciemXsOaciOWImei/lOWbnjBcclxuICAgICovXHJcbiAgX2xlYXBEYXlzSW5MdW5hclllYXIoeWVhcikge1xyXG4gICAgaWYgKHRoaXMuX2xlYXBNb250aEluTHVuYXJZZWFyKHllYXIpKSB7XHJcbiAgICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmIDB4MTAwMDApID8gMzAgOiAyOSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKDApO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm0bW9udGjmnIjvvIjpnZ7pl7DmnIjvvInnmoTmgLvlpKnmlbDvvIxcclxuICAgICovXHJcbiAgX21vbnRoRGF5cyh5ZWFyLCBtb250aCkge1xyXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPCAxKSB7IHJldHVybiAtMSB9Ly/mnIjku73lj4LmlbDku44x6IezMTLvvIzlj4LmlbDplJnor6/ov5Tlm54tMVxyXG5cclxuICAgIGNvbnNvbGUubG9nKFwiX21vbnRoRGF5czpcIiArICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiAoMHgxMDAwMCA+PiBtb250aCkpKVxyXG5cclxuICAgIHJldHVybiAoKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPyAzMCA6IDI5KTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWFrOWOhnllYXLlubRtb250aOaciOeahOWkqeaVsFxyXG4gICAgKi9cclxuICBfZ2V0RGF5c0luTW9udGgoeWVhciwgbW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkgeyByZXR1cm4gLTEgfSAvL+iLpeWPguaVsOmUmeivryDov5Tlm54tMVxyXG4gICAgbGV0IG1zID0gbW9udGggLSAxO1xyXG4gICAgaWYgKG1zID09IDEpIHsgLy8y5pyI5Lu955qE6Zew5bmz6KeE5b6L5rWL566X5ZCO56Gu6K6k6L+U5ZueMjjmiJYyOVxyXG4gICAgICByZXR1cm4gKCgoeWVhciAlIDQgPT0gMCkgJiYgKHllYXIgJSAxMDAgIT0gMCkgfHwgKHllYXIgJSA0MDAgPT0gMCkpID8gMjkgOiAyOCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gKHRoaXMuX2RheUluTW9udGhbbXNdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWGnOWOhuW5tOS7vei9rOaNouS4uuW5suaUr+e6quW5tFxyXG4gICAgICDlubLmlK/nuqrlubTms5Vcclxu44CA44CAICAgICDlpKnlubLlnLDmlK/ooahcclxu44CA44CAICAgMDEu55Sy5a2QIDAyLuS5meS4kSAwMy7kuJnlr4UgMDQu5LiB5Y2vIDA1LuaIiui+sCAwNi7lt7Hlt7MgMDcu5bqa5Y2IIDA4Lui+m+acqiAwOS7lo6znlLMgMTAu55m46YWJXHJcbuOAgCAgIOOAgCAgIDExLueUsuaIjCAxMi7kuZnkuqUgMTMu5LiZ5a2QIDE0LuS4geS4kSAxNS7miIrlr4UgMTYu5bex5Y2vIDE3LuW6mui+sCAxOC7ovpvlt7MgMTku5aOs5Y2IIDIwLueZuOacqlxyXG7jgIAgICDjgIAgICAyMS7nlLLnlLMgMjIu5LmZ6YWJIDIzLuS4meaIjCAyNC7kuIHkuqUgMjUu5oiK5a2QIDI2LuW3seS4kSAyNy7luprlr4UgMjgu6L6b5Y2vIDI5LuWjrOi+sCAzMC7nmbjlt7Ncclxu44CAICDjgIAgICAgMzEu55Sy5Y2IIDMyLuS5meacqiAzMy7kuJnnlLMgMzQu5LiB6YWJIDM1LuaIiuaIjCAzNi7lt7HkuqUgMzcu5bqa5a2QIDM4Lui+m+S4kSAzOS7ku7vlr4UgNDAu55m45Y2vXHJcbuOAgCAgIOOAgCAgIDQxLueUsui+sCA0Mi7kuZnlt7MgNDMu5LiZ5Y2IIDQ0LuS4geacqiA0NS7miIrnlLMgNDYu5bex6YWJIDQ3LuW6muaIjCA0OC7ovpvkuqUgNDku5aOs5a2QIDUwLueZuOS4kVxyXG7jgIDjgIAgICAgICA1MS7nlLLlr4UgNTIu5LmZ5Y2vIDUzLuS4mei+sCA1NC7kuIHlt7EgNTUu5oiK5Y2IIDU2LuW3seacqiA1Ny7luprnlLMgNTgu6L6b6YWJIDU5LuWjrOaIjCA2MC7nmbjkuqVcclxuICAgICDnlKjpmLPljobnmoTlubTku73pmaTku6U2MOW+l+WIsOeahOW5tOS7veWGjeWHj+WOuzPlsLHmmK/ov5nkuIDlubTlhpzljobnmoTlubLmlK/luo/lj7fmlbDvvIzmn6XlubLmlK/ooajlvpfliLDlubLmlK/lubTnuqrvvIxcclxuICAgICDoi6Xlvpflh7rmnaXnmoTmlbDmja7lsI/kuo7pm7bmiJbogIXnrYnkuo7pm7bliJnliqDkuIo2MOWNs+WPr+OAglxyXG4gICAgIOS4vuS4quS+i+WtkO+8muaxgjIwMTnlubTlubLmlK/vvIwyMDE5w7c2MO+8nTMz5L2ZMznvvIzlubTlubLmlK/luo/lj7fmlbA9MzktMz0zNu+8jFxyXG4gICAgIOaJgOS7peW+l+efpeS7iuW5tOaYr+W3seS6peW5tOOAguW5suaUr+e6quW5tOmDveaYr+S7juavj+W5tOeahOeri+aYpeW8gOWni+eahO+8jOS4jeeuoeeri+aYpeWcqOWJjeS4gOW5tOeahOiFiuaciOi/mOaYr+aWsOS4gOW5tOeahOato+aciO+8jOeri+aYpeW8gOWni+aJjeeul+aWsOeahOS4gOW5tOOAglxyXG4gICAqL1xyXG4gIF9nZXRHYW5aaGlZZWFyKHllYXIpIHtcclxuICAgIHZhciBnYW5LZXkgPSAoeWVhciAtIDMpICUgMTA7XHJcbiAgICB2YXIgemhpS2V5ID0gKHllYXIgLSAzKSAlIDEyO1xyXG4gICAgaWYgKGdhbktleSA9PSAwKSBnYW5LZXkgPSAxMDsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlpKnlubJcclxuICAgIGlmICh6aGlLZXkgPT0gMCkgemhpS2V5ID0gMTI7Ly/lpoLmnpzkvZnmlbDkuLow5YiZ5Li65pyA5ZCO5LiA5Liq5Zyw5pSvXHJcbiAgICByZXR1cm4gdGhpcy5fVGlhbkdhbltnYW5LZXkgLSAxXSArIHRoaXMuX0RpWmhpW3poaUtleSAtIDFdO1xyXG5cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWFrOWOhuaciOOAgeaXpeWIpOaWreaJgOWxnuaYn+W6p1xyXG4gICAqL1xyXG4gIF9nZXRBc3Ryb2xvZ3koY01vbnRoLCBjRGF5KSB7XHJcbiAgICB2YXIgYXJyID0gWzIwLCAxOSwgMjEsIDIxLCAyMSwgMjIsIDIzLCAyMywgMjMsIDIzLCAyMiwgMjJdO1xyXG4gICAgcmV0dXJuIHRoaXMuX2FzdHJvbG9neVtjTW9udGggLSAoY0RheSA8IGFycltjTW9udGggLSAxXSA/IDEgOiAwKV0gKyBcIuW6p1wiOy8v5bqnXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICogXHJcbiAgICDlpKnlubLkuIDlhbHmnInljYHkuKrvvIzliIbliKvmnInnlLLjgIHkuZnjgIHkuJnjgIHkuIHjgIHmiIrjgIHlt7HjgIHluprjgIHovpvjgIHlo6zjgIHnmbjjgILlnLDmlK/kuIDlhbHmnInljYHkuozkuKrvvIzliIbliKvmnInlrZDjgIHkuJHjgIHlr4XjgIHlja/jgIHovrDjgIHlt7PjgIHljYjjgIHmnKrjgIHnlLPjgIHphYnjgIHmiIzjgIHkuqXjgILlubLmlK/ov5jmnInpmLTpmLPkuYvliIbvvIznlLLjgIHkuJnjgIHmiIrjgIHluprjgIHlo6zkuLrpmLPlubLvvIzkuZnjgIHkuIHjgIHlt7HjgIHovpvjgIHnmbjkuLrpmLTlubLjgILlrZDjgIHlr4XjgIHovrDjgIHljYjjgIHnlLPjgIHmiIzkuLrpmLPmlK/vvIzkuJHjgIHlja/jgIHlt7PjgIHmnKrjgIHphYnjgIHkuqXkuLrpmLTmlK/vvIzkuIDkuKrlpKnlubLlkozkuIDkuKrlnLDmlK/nm7jphY3vvIzmjpLliJfotbfmnaXvvIzlpKnlubLlnKjliY3vvIzlnLDmlK/lnKjlkI7vvIzlpKnlubLnlLHnlLLotbfvvIzlnLDmlK/nlLHlrZDotbfvvIzpmLPlubLphY3pmLPmlK/vvIzpmLTlubLphY3pmLTmlK/vvIzlhbHmnInlha3ljYHkuKrnu4TlkIjjgILlj6TkurrlsLHnlKjov5k2MOS4que7hOWQiOW+queOr+i1t+adpee6quW5tO+8jOe6quaciO+8jOe6quaXpe+8jOe6quaXtuOAglxyXG5cclxuICAgIOe6quW5tO+8jOS4reWbveWPpOS6uueUqDYw5Liq57uE5ZCI5L6d5qyh57qq5bm077yM5LiA5bm05LiA5Liq57uE5ZCI77yM77yM5bmy5pSv57qq5bm077yM5LiA5Liq5ZGo5pyf55qE56ys5LiA5bm05Li655Sy5a2Q77yM56ys5LqM5bm05Li65LmZ5LiR77yM5L6d5qyh57G75o6o77yMNjDlubTkuIDkuKrova7lm57vvIzmr4/kuIDkuKrmlrDlubTlvIDlp4vkuo7mraPmnIjliJ3kuIDnmoTmraPlrZDml7bjgIJcclxuXHJcbiAgICDnuqrmnIjvvIzlubLmlK/nuqrmnIjvvIzph4fnlKjmr4/kuKrlnLDmlK/lr7nlupQyNOiKguawlOiHquafkOiKguawlOiHs+S4i+S4gOS4quiKguawlO+8jOS7peS6pOe7k+aXtumXtOWGs+Wumui1t+Wni+eahOS4gOS4quaciOacn+mXtOOAguW5suaUr+e6quaciOaYr+W5suaUr+WOhueahOS4gOmDqOWIhu+8jOS4u+imgeeUqOS6jumjjuawtOacr+acr+etiemihuWfn++8jOi/meS9v+W+l+W5suaUr+WOhuS4gOebtOWcqOWumOaWueWSjOawkemXtOmDvea1geS8oOS4jeihsOOAglxyXG5cclxuICAgIOe6quaXpe+8jOe6quaXpeaYr+W5suaUr+eahOacgOaXqeeUqOazle+8jOS4gOS4quaYvOWknOaYr+S4gOWkqe+8jOeUqDYw5Liq57uE5ZCI5p2l5L6d5qyh57qq5pel77yM5q+U5aaC5LuK5aSp5piv55Sy5a2Q5pel77yM5piO5aSp5bCx5piv5LmZ5LiR5pel77yMNjDlpKnkuIDkuKrlvqrnjq/vvIzmlrDnmoTkuIDlpKnku47mraPlrZDljYjlvIDlp4vvvIzkuK3lm73mmI7noa7lj6/mn6XnmoTlubLmlK/nuqrml6XvvIzmmK/mmKXnp4vpsoHpmpDlhazkuInlubTvvIjlhazlhYPliY03MjDlubTvvInvvIzot53ku4rlt7Lnu4/mnIkyNzAw5aSa5bm05LqG77yM6L+Z5piv6L+E5LuK5Li65q2i5piv5LiW55WM5LiK5pyA5pep55qE6K6w5pel5rOV44CCXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIOS8oOWFpW9mZnNldOWBj+enu+mHj+i/lOWbnuW5suaUryBcclxuICAgICovXHJcbiAgX2dldEdhblpoaShvZmZzZXQpIHtcclxuICAgIHJldHVybiB0aGlzLl9UaWFuR2FuW29mZnNldCAlIDEwXSArIHRoaXMuX0RpWmhpW29mZnNldCAlIDEyXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAg5YWs5Y6GeWVhcuW5tOiOt+W+l+ivpeW5tOesrGluZGV45Liq6IqC5rCU55qE5YWs5Y6G5pel5pyfXHJcbiAgICAqL1xyXG4gIF9nZXRDYWxlbmRhcmljaXR5KHllYXIsIGluZGV4KSB7XHJcbiAgICBpZiAoeWVhciA8IDE5MDAgfHwgeWVhciA+IDIxMDApIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4IDwgMSB8fCBpbmRleCA+IDI0KSB7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH1cclxuICAgIHZhciBfdGFibGUgPSB0aGlzLl9jYWxlbmRhcmljaXR5VGFibGVbeWVhciAtIDE5MDBdO1xyXG4gICAgdmFyIF9jYWxlbmRhcmljaXR5SW5mbyA9IFtcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDUsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigxMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDE1LCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMjAsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyNSwgNSkpLnRvU3RyaW5nKClcclxuICAgIF07XHJcblxyXG4gICAgdmFyIF9jYWxkYXkgPSBbXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1swXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMV0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzJdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1szXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNF0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzVdLnN1YnN0cig0LCAyKSxcclxuICAgIF07XHJcbiAgICByZXR1cm4gcGFyc2VJbnQoX2NhbGRheVtpbmRleCAtIDFdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDlhpzljobmsYnor63ooajnpLpcclxuICAgICovXHJcbiAgX2dldENoaW5hTW9udGgobW9udGgpIHtcclxuICAgIGlmIChtb250aCA+IDEyIHx8IG1vbnRoIDwgMSkge1xyXG4gICAgICByZXR1cm4gLTFcclxuICAgIH1cclxuICAgIHJldHVybiBgJHt0aGlzLl9sdW5hck1vbnRoVGFibGVbbW9udGggLSAxXX3mnIhgO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAq5Yac5Y6G5pel5pyf5pel6KGo56S6XHJcbiAgICAqL1xyXG4gIF9nZXRDaGluYURheShkYXkpIHtcclxuICAgIGxldCBzO1xyXG4gICAgc3dpdGNoIChkYXkpIHtcclxuICAgICAgY2FzZSAxMDpcclxuICAgICAgICBzID0gJ+WIneWNgSc7IGJyZWFrO1xyXG4gICAgICBjYXNlIDIwOlxyXG4gICAgICAgIHMgPSAn5LqM5Y2BJzsgYnJlYWs7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMzA6XHJcbiAgICAgICAgcyA9ICfkuInljYEnOyBicmVhaztcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBzID0gdGhpcy5fY2hpbmVzZVRlbkNoYXJbTWF0aC5mbG9vcihkYXkgLyAxMCldO1xyXG4gICAgICAgIHMgKz0gdGhpcy5fY2hpbmVzZUNoYXJbZGF5ICUgMTBdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIChzKTtcclxuICB9XHJcbiAgLypcclxuICDov5Tlm57lhpzljoboioLml6VcclxuICAqL1xyXG4gIF9nZXRMdW5hckhvbGlkYXkobW9udGgsIGRheSkge1xyXG4gICAgbGV0IGx1bmFySG9saWRheVN0ciA9IFwiXCJcclxuICAgIHRoaXMuX2x1bmFySG9saWRheS5mb3JFYWNoKGx1bmFyID0+IHtcclxuICAgICAgbGV0IGxkID0gbHVuYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgbGR2ID0gbHVuYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgbG1kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBsbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgbGRheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgbG1kID0gbG1vbnRoX3YgKyBsZGF5X3Y7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwibG1kOlwiICsgbG1kKVxyXG4gICAgICBpZiAobGQudHJpbSgpID09PSBsbWQudHJpbSgpKSB7XHJcbiAgICAgICAgbHVuYXJIb2xpZGF5U3RyID0gbGR2XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbHVuYXJIb2xpZGF5U3RyXHJcbiAgfVxyXG4gIC8qKlxyXG4gKiDov5Tlm57lr7nlupTml6XmnJ/nmoTlhazljoboioLml6VcclxuICovXHJcbiAgX2dldFNvbGFySG9saWRheShtb250aCwgZGF5KSB7XHJcbiAgICBsZXQgc29sYXJIb2xpZGF5U3RyID0gXCJcIjtcclxuICAgIHRoaXMuX3NvbGFySG9saWRheS5mb3JFYWNoKHNvbGFyID0+IHtcclxuXHJcbiAgICAgIGxldCBzZCA9IHNvbGFyLnNwbGl0KFwiIFwiKVswXTtcclxuICAgICAgbGV0IHNkdiA9IHNvbGFyLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgICAgbGV0IHNtb250aF92ID0gbW9udGggKyBcIlwiO1xyXG4gICAgICBsZXQgc2RheV92ID0gZGF5ICsgXCJcIjtcclxuICAgICAgbGV0IHNtZCA9IFwiXCI7XHJcbiAgICAgIGlmIChtb250aCA8IDEwKSB7XHJcbiAgICAgICAgc21vbnRoX3YgPSBcIjBcIiArIG1vbnRoO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4gICAgICAgIHNkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4gICAgICB9XHJcbiAgICAgIHNtZCA9IHNtb250aF92ICsgc2RheV92O1xyXG4gICAgICBpZiAoc2QudHJpbSgpID09PSBzbWQudHJpbSgpKSB7XHJcbiAgICAgICAgc29sYXJIb2xpZGF5U3RyID0gc2R2O1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHNvbGFySG9saWRheVN0clxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAg6I635Y+W5a+55bqU5bm05Lu955qE55Sf6IKWXHJcbiAgICAqL1xyXG4gIF9nZXRab2RpYWMoeWVhcikge1xyXG4gICAgcmV0dXJuIHRoaXMuX1pvZGlhY1soeWVhciAtIDQpICUgMTJdXHJcbiAgfVxyXG4gIC8qXHJcbiAgKiDojrflj5bml6XmnJ/mmK/lkKbkuLoyNOiKguawlFxyXG4gICAg6aaW5YWI6I635Y+W6IqC5rCU5Li65b2T5pyI55qE56ys5Yeg5aSp77yM5LiO5b2T5YmN5Yy56YWN55qE77yM6L+U5Zue5a+55bqU55qE6IqC5rCUXHJcbiAgKi9cclxuICBfZ2V0THVuYXJEYXlDYWxlbmRhcmljaXR5KGZpcnN0Q2FsZW5kYXJpY2l0eURheSwgc2Vjb25kQ2FsZW5kYXJpY2l0eURheSwgbm93U2VsZWN0RGF5LCBub3dTZWxlY3RNb250aCkge1xyXG4gICAgLy/kvKDlhaXnmoTml6XmnJ/nmoToioLmsJTkuI7lkKZcclxuXHJcbiAgICBsZXQgY2FsZW5kYXJpY2l0eVN0ciA9IFwiXCI7XHJcbiAgICBpZiAoZmlyc3RDYWxlbmRhcmljaXR5RGF5ID09IG5vd1NlbGVjdERheSkge1xyXG5cclxuICAgICAgY2FsZW5kYXJpY2l0eVN0ciA9IHRoaXMuX2NhbGVuZGFyaWNpdHlbbm93U2VsZWN0TW9udGggKiAyIC0gMl07XHJcbiAgICB9XHJcbiAgICBpZiAoc2Vjb25kQ2FsZW5kYXJpY2l0eURheSA9PSBub3dTZWxlY3REYXkpIHtcclxuXHJcbiAgICAgIGNhbGVuZGFyaWNpdHlTdHIgPSB0aGlzLl9jYWxlbmRhcmljaXR5W25vd1NlbGVjdE1vbnRoICogMiAtIDFdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhbGVuZGFyaWNpdHlTdHJcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiDkvKDlhaXpmLPljoblubTmnIjml6Xojrflvpfor6bnu4bnmoTlhazljobjgIHlhpzljoZvYmplY3Tkv6Hmga8gPD0+SlNPTlxyXG4gICAgKiBAcGFyYW0gc29sYXJZZWFyICBzb2xhciB5ZWFyXHJcbiAgICAqIEBwYXJhbSBzb2xhck1vbnRoICBzb2xhciBtb250aFxyXG4gICAgKiBAcGFyYW0gc29sYXJEYXkgIHNvbGFyIGRheVxyXG4gICAgKiBAcmV0dXJuIEpTT04gb2JqZWN0XHJcbiAgICAqL1xyXG4gIGdldEx1bmFyKHNvbGFyWWVhciwgc29sYXJNb250aCwgc29sYXJEYXkpIHsgLy/lj4LmlbDljLrpl7QxOTAwLjEuMzF+MjEwMC4xMi4zMVxyXG4gICAgaWYgKHNvbGFyWWVhciA8IDE5MDAgfHwgc29sYXJZZWFyID4gMjEwMCkgeyByZXR1cm4gLTE7IH0vL+W5tOS7vemZkOWumuOAgeS4iumZkFxyXG4gICAgaWYgKHNvbGFyWWVhciA9PSAxOTAwICYmIHNvbGFyTW9udGggPT0gMSAmJiBzb2xhckRheSA8IDMxKSB7IHJldHVybiAtMTsgfS8v5LiL6ZmQXHJcbiAgICBpZiAoIXNvbGFyWWVhcikgeyAvL+acquS8oOWPgiAg6I635b6X5b2T5aSpXHJcbiAgICAgIHZhciBub3dTZWxlY3REYXRlID0gbmV3IERhdGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhciBub3dTZWxlY3REYXRlID0gbmV3IERhdGUoc29sYXJZZWFyLCBwYXJzZUludChzb2xhck1vbnRoKSAtIDEsIHNvbGFyRGF5KVxyXG4gICAgfVxyXG4gICAgdmFyIG5vd1NlbGVjdFllYXIgPSBub3dTZWxlY3REYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICB2YXIgbm93U2VsZWN0TW9udGggPSBub3dTZWxlY3REYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgdmFyIG5vd1NlbGVjdERheSA9IG5vd1NlbGVjdERhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgdmFyIG9mZnNldCA9IChEYXRlLlVUQyhub3dTZWxlY3REYXRlLmdldEZ1bGxZZWFyKCksIG5vd1NlbGVjdERhdGUuZ2V0TW9udGgoKSwgbm93U2VsZWN0RGF0ZS5nZXREYXRlKCkpIC0gRGF0ZS5VVEMoMTkwMCwgMCwgMzEpKSAvIDg2NDAwMDAwO1xyXG4gICAgLy9vZmZzZXTlvZPliY3ml6XmnJ/kuI4xOTkwLjEuMzHnm7jlt67ml6XmnJ/jgIIxOTkwLjEuMzEu5byA5aeL56ys5LiA5Liq5Yac5Y6G5ZGo5pyf5byA5aeLXHJcbiAgICB2YXIgdGVtcFllYXIsIGxlYXAgPSAwLCB0ZW1wID0gMDtcclxuICAgIC8vdGVtcFllYXIg5b2T5YmN5bm05Lu96IezMTk5MOW5tOS+neasoeWHj+WOu+S4remXtOaJgOacieeahOWGnOWOhuW5tOeahOWkqeaVsO+8jOS9meS4i29mZnNldOS4uuW9k+WJjeWGnOWOhuW5tOesrOWkmuWwkeWkqVxyXG4gICAgZm9yICh0ZW1wWWVhciA9IDE5MDA7IHRlbXBZZWFyIDwgMjEwMSAmJiBvZmZzZXQgPiAwOyB0ZW1wWWVhcisrKSB7XHJcbiAgICAgIHRlbXAgPSB0aGlzLl9sdW5hclllYXJEYXlzKHRlbXBZZWFyKTsvL+iuoeeul+W9k+WJjeWGnOWOhuW5tOeahOaAu+WkqeaVsFxyXG4gICAgICBvZmZzZXQgLT0gdGVtcDtcclxuICAgICAgLy9vZmZzZXTkvp3mrKHlh4/ljrvmiYDmnInlhpzljoblubTnmoTmgLvlpKnmlbDlkI5cclxuICAgICAgLy90ZW1wWWVhcuS4uuW9k+WJjeeahOeahOWGnOWOhuW5tOS7vVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgIC8vb2Zmc2V05bCP5LqOMOaXtuWAmeS/ruato1xyXG4gICAgICBvZmZzZXQgKz0gdGVtcDtcclxuICAgICAgdGVtcFllYXItLTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgdmFyIGlzVG9kYXlPYmogPSBuZXcgRGF0ZSgpOy8v6I635Y+W5b2T5YmN5pel5pyfXHJcbiAgICB2YXIgaXNUb2RheSA9IGZhbHNlO1xyXG4gICAgaWYgKGlzVG9kYXlPYmouZ2V0RnVsbFllYXIoKSA9PSBub3dTZWxlY3RZZWFyICYmIGlzVG9kYXlPYmouZ2V0TW9udGgoKSArIDEgPT0gbm93U2VsZWN0TW9udGggJiYgaXNUb2RheU9iai5nZXREYXRlKCkgPT0gbm93U2VsZWN0RGF5KSB7XHJcbiAgICAgIGlzVG9kYXkgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgLy/mmJ/mnJ/lh6BcclxuICAgIGxldCBuV2VlayA9IG5vd1NlbGVjdERhdGUuZ2V0RGF5KCk7XHJcbiAgICBsZXQgY1dlZWsgPSB0aGlzLl9jaGluZXNlQ2hhcltuV2Vla107XHJcbiAgICBpZiAobldlZWsgPT0gMCkge1xyXG4gICAgICBuV2VlayA9IDc7XHJcbiAgICB9Ly/mlbDlrZfooajnpLrlkajlh6DpobrlupTlpKnmnJ3lkajkuIDlvIDlp4vnmoTmg6/kvotcclxuICAgIC8v5Yac5Y6G5bm0XHJcbiAgICB2YXIgeWVhciA9IHRlbXBZZWFyO1xyXG5cclxuICAgIHZhciBsZWFwID0gdGhpcy5fbGVhcE1vbnRoSW5MdW5hclllYXIodGVtcFllYXIpOyAvL+mXsOWTquS4quaciFxyXG4gICAgdmFyIGlzTGVhcCA9IGZhbHNlO1xyXG5cclxuICAgIC8v5pWI6aqM6Zew5pyIXHJcbiAgICB2YXIgdGVtcE1vbnRoO1xyXG4gICAgZm9yICh0ZW1wTW9udGggPSAxOyB0ZW1wTW9udGggPCAxMyAmJiBvZmZzZXQgPiAwOyB0ZW1wTW9udGgrKykge1xyXG5cclxuICAgICAgaWYgKGxlYXAgPiAwICYmIHRlbXBNb250aCA9PSAobGVhcCArIDEpICYmIGlzTGVhcCA9PSBmYWxzZSkge1xyXG4gICAgICAgIC8v6Zew5pyIXHJcbiAgICAgICAgLS10ZW1wTW9udGg7XHJcbiAgICAgICAgaXNMZWFwID0gdHJ1ZTtcclxuICAgICAgICB0ZW1wID0gdGhpcy5fbGVhcERheXNJbkx1bmFyWWVhcih5ZWFyKTsgLy/orqHnrpflhpzljobpl7DmnIjlpKnmlbBcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAvL+mdnumXsOaciFxyXG4gICAgICAgIHRlbXAgPSB0aGlzLl9tb250aERheXMoeWVhciwgdGVtcE1vbnRoKTsvL+iuoeeul+WGnOWOhuaZrumAmuaciOWkqeaVsFxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNMZWFwID09IHRydWUgJiYgdGVtcE1vbnRoID09IChsZWFwICsgMSkpIHtcclxuICAgICAgICAvL+WmguaenOmXsOaciOWOu+aOiemXsOaciOagh+iusFxyXG4gICAgICAgIGlzTGVhcCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIG9mZnNldCAtPSB0ZW1wO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvZmZzZXQgPT0gMCAmJiBsZWFwID4gMCAmJiB0ZW1wTW9udGggPT0gbGVhcCArIDEpXHJcbiAgICAgIGlmIChpc0xlYXApIHtcclxuICAgICAgICBpc0xlYXAgPSBmYWxzZTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpc0xlYXAgPSB0cnVlOyAtLXRlbXBNb250aDtcclxuICAgICAgfVxyXG4gICAgaWYgKG9mZnNldCA8IDApIHtcclxuICAgICAgb2Zmc2V0ICs9IHRlbXA7XHJcbiAgICAgIC0tdGVtcE1vbnRoO1xyXG4gICAgfVxyXG4gICAgLy/lhpzljobmnIhcclxuICAgIGNvbnN0IG1vbnRoID0gdGVtcE1vbnRoO1xyXG4gICAgLy/lhpzljobml6VcclxuICAgIGNvbnN0IGRheSA9IG9mZnNldCArIDE7XHJcblxyXG4gICAgLy/lpKnlubLlnLDmlK/lpITnkIZcclxuICAgIHZhciBzbSA9IG5vd1NlbGVjdE1vbnRoIC0gMTtcclxuICAgIHZhciBnYW5aaGlZZWFyID0gdGhpcy5fZ2V0R2FuWmhpWWVhcih5ZWFyKTtcclxuXHJcbiAgICAvL+aciOafseaOqOeul+ihqFxyXG4gICAgLy8xOTAw5bm0MeaciOWwj+WvkuS7peWJjeS4uiDkuJnlrZDmnIgoNjDov5vliLYxMilcclxuICAgIHZhciBfZmlyc3RDYWxlbmRhcmljaXR5RGF5ID0gdGhpcy5fZ2V0Q2FsZW5kYXJpY2l0eShub3dTZWxlY3RZZWFyLCAobm93U2VsZWN0TW9udGggKiAyIC0gMSkpOy8v6L+U5Zue5b2T5pyI44CM6IqC44CN5Li65Yeg5pel5byA5aeLXHJcbiAgICB2YXIgX3NlY29uZENhbGVuZGFyaWNpdHlEYXkgPSB0aGlzLl9nZXRDYWxlbmRhcmljaXR5KG5vd1NlbGVjdFllYXIsIChub3dTZWxlY3RNb250aCAqIDIpKTsvL+i/lOWbnuW9k+aciOOAjOiKguOAjeS4uuWHoOaXpeW8gOWni1xyXG4gICAgY29uc29sZS5sb2coXCJfZmlyc3RDYWxlbmRhcmljaXR5RGF5OlwiICsgX2ZpcnN0Q2FsZW5kYXJpY2l0eURheSArIFwiLF9zZWNvbmRDYWxlbmRhcmljaXR5RGF5OlwiICsgX3NlY29uZENhbGVuZGFyaWNpdHlEYXkpXHJcbiAgICAvL+S+neaNrjEy6IqC5rCU5L+u5q2j5bmy5pSv5pyIXHJcbiAgICBsZXQgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMSk7XHJcbiAgICBpZiAobm93U2VsZWN0RGF5ID49IF9maXJzdENhbGVuZGFyaWNpdHlEYXkpIHtcclxuICAgICAgZ2FuWmhpTW9udGggPSB0aGlzLl9nZXRHYW5aaGkoKG5vd1NlbGVjdFllYXIgLSAxOTAwKSAqIDEyICsgbm93U2VsZWN0TW9udGggKyAxMik7XHJcbiAgICB9XHJcbiAgICBsZXQgY2FsZW5kYXJpY2l0eSA9IHRoaXMuX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eShfZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSwgbm93U2VsZWN0RGF5LCBub3dTZWxlY3RNb250aClcclxuXHJcbiAgICAvL+aXpeafseaOqOeul+ihqCDlvZPmnIjkuIDml6XkuI4gMTkwMC8xLzEg55u45beu5aSp5pWwXHJcbiAgICBjb25zdCBkYXlDeWNsaWNhbCA9IERhdGUuVVRDKG5vd1NlbGVjdFllYXIsIHNtLCAxLCAwLCAwLCAwLCAwKSAvIDg2NDAwMDAwICsgMjU1NjcgKyAxMDtcclxuICAgIGNvbnN0IGdhblpoaURheSA9IHRoaXMuX2dldEdhblpoaShkYXlDeWNsaWNhbCArIG5vd1NlbGVjdERheSAtIDEpO1xyXG4gICAgLy/or6Xml6XmnJ/miYDlsZ7nmoTmmJ/luqdcclxuICAgIGNvbnN0IGFzdHJvID0gdGhpcy5fZ2V0QXN0cm9sb2d5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpO1xyXG5cclxuICAgIGNvbnN0IHpvZGlhYyA9IHRoaXMuX2dldFpvZGlhYyh5ZWFyKVxyXG4gICAgY29uc3QgY2hpbmFNb250aCA9IHRoaXMuX2dldENoaW5hTW9udGgobW9udGgpXHJcbiAgICBjb25zdCBjaGluYURheSA9IHRoaXMuX2dldENoaW5hRGF5KGRheSlcclxuICAgIGNvbnN0IGx1bmFySG9saWRheSA9IHRoaXMuX2dldEx1bmFySG9saWRheShtb250aCwgZGF5KVxyXG4gICAgY29uc3Qgc29sYXJIb2xpZGF5ID0gdGhpcy5fZ2V0U29sYXJIb2xpZGF5KG5vd1NlbGVjdE1vbnRoLCBub3dTZWxlY3REYXkpXHJcbiAgICByZXR1cm4geyAnbHVuYXJZZWFyJzogeWVhciwgJ2x1bmFyTW9udGgnOiBtb250aCwgJ2x1bmFyRGF5JzogZGF5LCAnem9kaWFjJzogem9kaWFjLCAnY2hpbmFNb250aCc6IChpc0xlYXAgPyBcIumXsFwiIDogJycpICsgY2hpbmFNb250aCwgJ2NoaW5hRGF5JzogY2hpbmFEYXksICdzb2xhclllYXInOiBub3dTZWxlY3RZZWFyLCAnc29sYXJNb250aCc6IG5vd1NlbGVjdE1vbnRoLCAnc29sYXJEYXknOiBub3dTZWxlY3REYXksICdnYW5aaGlZZWFyJzogZ2FuWmhpWWVhciwgJ2dhblpoaU1vbnRoJzogZ2FuWmhpTW9udGgsICdnYW5aaGlEYXknOiBnYW5aaGlEYXksICdpc1RvZGF5JzogaXNUb2RheSwgJ2lzTGVhcCc6IGlzTGVhcCwgJ25XZWVrJzogbldlZWssICduY1dlZWsnOiBcIuaYn+acn1wiICsgY1dlZWssICdjYWxlbmRhcmljaXR5JzogY2FsZW5kYXJpY2l0eSwgJ2FzdHJvJzogYXN0cm8sIFwibHVuYXJIb2xpZGF5XCI6IGx1bmFySG9saWRheSwgXCJzb2xhckhvbGlkYXlcIjogc29sYXJIb2xpZGF5IH07XHJcbiAgfVxyXG59XHJcbmxldCBsdW5hckNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoKVxyXG5leHBvcnQgZGVmYXVsdCBsdW5hckNhbGVuZGFyXHJcblxyXG5cclxuXHJcbi8vKioqKioqKioqKioqKioqKuWIhuWJsue6v2phdmHniYjmnKwqKioqKioqKioqKioqKiogKi9cclxuLy8gaW1wb3J0IGphdmEudGV4dC5QYXJzZUV4Y2VwdGlvbjtcclxuLy8gaW1wb3J0IGphdmEudGV4dC5TaW1wbGVEYXRlRm9ybWF0O1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkRhdGU7XHJcbi8vIGltcG9ydCBqYXZhLnV0aWwuTG9jYWxlO1xyXG4vLyBpbXBvcnQgamF2YS51dGlsLkNhbGVuZGFyO1xyXG5cclxuLy8gY2xhc3MgTHVuYXJDYWxlbmRhciB7XHJcbi8vICAgICBwcml2YXRlIGludCB5ZWFyOyAvLyDlhazljoblubRcclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoOy8vIOWFrOWOhuaciFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5Oy8vIOWFrOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJZZWFyOy8vIOmYtOWOhuW5tFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJNb250aDsvLyDpmLTljobmnIhcclxuLy8gICAgIHByaXZhdGUgaW50IGx1bmFyRGF5Oy8vIOmYtOWOhuaXpVxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbGVhcE1vbnRoID0gMDsgLy8g6Zi05Y6G6Zew55qE5pyIXHJcbi8vICAgICBwcml2YXRlIGludCBkYXlzT2ZNb250aCA9IDA7IC8vIOafkOaciOeahOWkqeaVsFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5T2ZXZWVrID0gMDsgLy8g5YW35L2T5p+Q5LiA5aSp5piv5pif5pyf5YegXHJcblxyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nIGNoaW5lc2VNb250aE51bWJlcltdID0geyBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWNgeS4gFwiLCBcIuWNgeS6jFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBab2RpYWMgPSBuZXcgU3RyaW5nW10geyBcIum8oFwiLCBcIueJm1wiLCBcIuiZjlwiLCBcIuWFlFwiLCBcIum+mVwiLCBcIuibh1wiLCBcIumprFwiLCBcIue+ilwiLCBcIueMtFwiLCBcIum4oVwiLCBcIueLl1wiLCBcIueMqlwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBHYW4gPSBuZXcgU3RyaW5nW10geyBcIueUslwiLCBcIuS5mVwiLCBcIuS4mVwiLCBcIuS4gVwiLCBcIuaIilwiLCBcIuW3sVwiLCBcIuW6mlwiLCBcIui+m1wiLCBcIuWjrFwiLCBcIueZuFwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBaaGkgPSBuZXcgU3RyaW5nW10geyBcIuWtkFwiLCBcIuS4kVwiLCBcIuWvhVwiLCBcIuWNr1wiLCBcIui+sFwiLCBcIuW3s1wiLCBcIuWNiFwiLCBcIuacqlwiLCBcIueUs1wiLCBcIumFiVwiLCBcIuaIjFwiLCBcIuS6pVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmcgY2hpbmVzZVRlbkNoYXJbXSA9IHsgXCLliJ1cIiwgXCLljYFcIiwgXCLlu79cIiwgXCLljYVcIiB9O1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgU3RyaW5nW10gbHVuYXJIb2xpZGF5ID0gbmV3IFN0cmluZ1tdIHsgXCIwMTAxIOaYpeiKglwiLCBcIjAxMTUg5YWD5a61XCIsIFwiMDUwNSDnq6/ljYhcIiwgXCIwNzA3IOaDheS6ulwiLCBcIjA3MTUg5Lit5YWDXCIsXHJcbi8vICAgICAgICAgICAgIFwiMDgxNSDkuK3np4tcIiwgXCIwOTA5IOmHjemYs1wiLCBcIjEyMDgg6IWK5YWrXCIsIFwiMTIyNCDlsI/lubRcIiwgXCIwMTAwIOmZpOWklVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBzb2xhckhvbGlkYXkgPSBuZXcgU3RyaW5nW10geyAvL1xyXG4vLyAgICAgICAgICAgICBcIjAxMDEg5YWD5pemXCIsIFwiMDIxNCDmg4XkurpcIiwgXCIwMzA4IOWmh+Wls1wiLCBcIjAzMTIg5qSN5qCRXCIsIFwiMDMxNSDmtojotLnogIXmnYPnm4rml6VcIiwgXCIwNDAxIOaEmuS6ulwiLCBcIjA1MDEg5Yqz5YqoXCIsIFwiMDUwNCDpnZLlubRcIiwgLy9cclxuLy8gICAgICAgICAgICAgXCIwNTEyIOaKpOWjq1wiLCBcIjA2MDEg5YS/56ulXCIsIFwiMDcwMSDlu7rlhZpcIiwgXCIwODAxIOW7uuWGm1wiLCBcIjA4MDgg54i25LqyXCIsIFwiMDkxMCDmlZnluIhcIiwgXCIwOTI4IOWtlOWtkOivnui+sFwiLCAvL1xyXG4vLyAgICAgICAgICAgICBcIjEwMDEg5Zu95bqGXCIsIFwiMTAwNiDogIHkurpcIiwgXCIxMDI0IOiBlOWQiOWbveaXpVwiLCBcIjExMTIg5a2Z5Lit5bGx6K+e6L6w57qq5b+1XCIsIFwiMTIyMCDmvrPpl6jlm57lvZLnuqrlv7VcIiwgXCIxMjI1IOWco+ivnlwiIH07XHJcbi8vICAgICBwcml2YXRlIHN0YXRpYyBTaW1wbGVEYXRlRm9ybWF0IGNoaW5lc2VEYXRlRm9ybWF0ID0gbmV3IFNpbXBsZURhdGVGb3JtYXQoXCJ5eXl55bm0TU3mnIhkZOaXpVwiLCBMb2NhbGUuQ0hJTkEpO1xyXG4vLyAgICAgcHJpdmF0ZSBmaW5hbCBzdGF0aWMgbG9uZ1tdIGx1bmFySW5mbyA9IG5ldyBsb25nW10geyAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YmQ4LCAweDA0YWUwLCAweDBhNTcwLCAweDA1NGQ1LCAweDBkMjYwLCAweDBkOTUwLCAweDE2NTU0LCAweDA1NmEwLCAweDA5YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA1NWQyLCAweDA0YWUwLCAweDBhNWI2LCAweDBhNGQwLCAweDBkMjUwLCAweDFkMjU1LCAweDBiNTQwLCAweDBkNmEwLCAweDBhZGEyLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NWIwLCAweDE0OTc3LCAweDA0OTcwLCAweDBhNGIwLCAweDBiNGI1LCAweDA2YTUwLCAweDA2ZDQwLCAweDFhYjU0LCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5NTcwLCAweDA1MmYyLCAweDA0OTcwLCAweDA2NTY2LCAweDBkNGEwLCAweDBlYTUwLCAweDA2ZTk1LCAweDA1YWQwLCAweDAyYjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE4NmUzLCAweDA5MmUwLCAweDFjOGQ3LCAweDBjOTUwLCAweDBkNGEwLCAweDFkOGE2LCAweDBiNTUwLCAweDA1NmEwLCAweDFhNWI0LCAvL1xyXG4vLyAgICAgICAgICAgICAweDAyNWQwLCAweDA5MmQwLCAweDBkMmIyLCAweDBhOTUwLCAweDBiNTU3LCAweDA2Y2EwLCAweDBiNTUwLCAweDE1MzU1LCAweDA0ZGEwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNWQwLCAweDE0NTczLCAweDA1MmQwLCAweDBhOWE4LCAweDBlOTUwLCAweDA2YWEwLCAweDBhZWE2LCAweDBhYjUwLCAweDA0YjYwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhYWU0LCAweDBhNTcwLCAweDA1MjYwLCAweDBmMjYzLCAweDBkOTUwLCAweDA1YjU3LCAweDA1NmEwLCAweDA5NmQwLCAweDA0ZGQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWQwLCAweDBhNGQwLCAweDBkNGQ0LCAweDBkMjUwLCAweDBkNTU4LCAweDBiNTQwLCAweDBiNWEwLCAweDE5NWE2LCAweDA5NWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0OWIwLCAweDBhOTc0LCAweDBhNGIwLCAweDBiMjdhLCAweDA2YTUwLCAweDA2ZDQwLCAweDBhZjQ2LCAweDBhYjYwLCAweDA5NTcwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA0YWY1LCAweDA0OTcwLCAweDA2NGIwLCAweDA3NGEzLCAweDBlYTUwLCAweDA2YjU4LCAweDA1NWMwLCAweDBhYjYwLCAweDA5NmQ1LCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmUwLCAweDBjOTYwLCAweDBkOTU0LCAweDBkNGEwLCAweDBkYTUwLCAweDA3NTUyLCAweDA1NmEwLCAweDBhYmI3LCAweDAyNWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDA5MmQwLCAweDBjYWI1LCAweDBhOTUwLCAweDBiNGEwLCAweDBiYWE0LCAweDBhZDUwLCAweDA1NWQ5LCAweDA0YmEwLCAweDBhNWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDE1MTc2LCAweDA1MmIwLCAweDBhOTMwLCAweDA3OTU0LCAweDA2YWEwLCAweDBhZDUwLCAweDA1YjUyLCAweDA0YjYwLCAweDBhNmU2LCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGUwLCAweDBkMjYwLCAweDBlYTY1LCAweDBkNTMwLCAweDA1YWEwLCAweDA3NmEzLCAweDA5NmQwLCAweDA0YmQ3LCAweDA0YWQwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNGQwLCAweDFkMGI2LCAweDBkMjUwLCAweDBkNTIwLCAweDBkZDQ1LCAweDBiNWEwLCAweDA1NmQwLCAweDA1NWIyLCAweDA0OWIwLCAvL1xyXG4vLyAgICAgICAgICAgICAweDBhNTc3LCAweDBhNGIwLCAweDBhYTUwLCAweDFiMjU1LCAweDA2ZDIwLCAweDBhZGEwIH07XHJcblxyXG4vLyAgICAgcHVibGljIEx1bmFyQ2FsZW5kYXIoaW50IHllYXIsIGludCBtb250aCwgaW50IGRheSkge1xyXG4vLyAgICAgICAgIHRoaXMueWVhciA9IHllYXI7XHJcbi8vICAgICAgICAgdGhpcy5tb250aCA9IG1vbnRoO1xyXG4vLyAgICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4vLyAgICAgICAgIHRoaXMuaW5pdEx1bmFyRGF0ZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgcHJpdmF0ZSB2b2lkIGluaXRMdW5hckRhdGUoKXtcclxuLy8gICAgICAgICBTdHJpbmcgbm93YWRheXM7XHJcbi8vICAgICAgICAgRGF0ZSBiYXNlRGF0ZSA9IG51bGw7XHJcbi8vICAgICAgICAgRGF0ZSBub3dhZGF5ID0gbnVsbDtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBiYXNlRGF0ZSA9IGNoaW5lc2VEYXRlRm9ybWF0LnBhcnNlKFwiMTkwMOW5tDHmnIgzMeaXpVwiKTtcclxuLy8gICAgICAgICB9IGNhdGNoIChQYXJzZUV4Y2VwdGlvbiBlKSB7XHJcbi8vICAgICAgICAgICAgIGUucHJpbnRTdGFja1RyYWNlKCk7XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBub3dhZGF5cyA9IHRoaXMueWVhciArIFwi5bm0XCIgKyB0aGlzLm1vbnRoICsgXCLmnIhcIiArIHRoaXMuZGF5ICsgXCLml6VcIjtcclxuLy8gICAgICAgICB0cnkge1xyXG4vLyAgICAgICAgICAgICBub3dhZGF5ID0gY2hpbmVzZURhdGVGb3JtYXQucGFyc2Uobm93YWRheXMpO1xyXG4vLyAgICAgICAgIH0gY2F0Y2ggKFBhcnNlRXhjZXB0aW9uIGUpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmludFN0YWNrVHJhY2UoKTtcclxuXHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICAvLyDkuI4xOTAw5bm0MeaciDMx5pel55u45beu55qE5aSp5pWwXHJcbi8vICAgICAgICAgaW50IG9mZnNldCA9IChpbnQpICgobm93YWRheS5nZXRUaW1lKCkgLSBiYXNlRGF0ZS5nZXRUaW1lKCkpIC8gODY0MDAwMDBMKTtcclxuXHJcbi8vICAgICAgICAgLyoqXHJcbi8vICAgICAgICAgICog55Sob2Zmc2V05YeP5Y675q+P5Yac5Y6G5bm055qE5aSp5pWwXHJcbi8vICAgICAgICAgIOiuoeeul+W9k+WkqeaYr+WGnOWOhuesrOWHoOWkqVxyXG4vLyAgICAgICAgICBpWWVhcuacgOe7iOe7k+aenOaYr+WGnOWOhueahOW5tOS7vVxyXG4vLyAgICAgICAgICBvZmZzZXTkuLrlvZPlubTnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICAgKi9cclxuLy8gICAgICAgICBpbnQgaVllYXIsIGRheXNPZlllYXIgPSAwO1xyXG4vLyAgICAgICAgIGZvciAoaVllYXIgPSAxOTAwOyBpWWVhciA8IDIxMDEgJiYgb2Zmc2V0ID4gMDsgaVllYXIrKykge1xyXG4vLyAgICAgICAgICAgICBkYXlzT2ZZZWFyID0gZGF5c0luTHVuYXJZZWFyKGlZZWFyKTtcclxuLy8gICAgICAgICAgICAgb2Zmc2V0IC09IGRheXNPZlllYXI7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZZZWFyO1xyXG4vLyAgICAgICAgICAgICBpWWVhci0tO1xyXG4vLyAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgbGVhcE1vbnRoID0gZ2V0TGVhcE1vbnRoKGlZZWFyKTsgLy8g5Yac5Y6G6Zew6YKj5Liq5pyIXHJcbi8vICAgICAgICAgYm9vbGVhbiBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIC8vIOeUqOW9k+W5tOeahOWkqeaVsG9mZnNldCzpgJDkuKrlh4/ljrvmr4/mnIjvvIjlhpzljobvvInnmoTlpKnmlbDvvIzmsYLlh7rlvZPlpKnmmK/mnKzmnIjnmoTnrKzlh6DlpKlcclxuLy8gICAgICAgICBpbnQgaU1vbnRoLCBkYXlzT2ZNb250aCA9IDA7XHJcbi8vICAgICAgICAgZm9yIChpTW9udGggPSAxOyBpTW9udGggPCAxMyAmJiBvZmZzZXQgPiAwOyBpTW9udGgrKykge1xyXG5cclxuLy8gICAgICAgICAgICAgaWYgKGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IChsZWFwTW9udGggKyAxKSAmJiAhbGVhcCkge1xyXG4vLyAgICAgICAgICAgICAgICAgLy8g6Zew5pyIXHJcbi8vICAgICAgICAgICAgICAgICAtLWlNb250aDtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSBsZWFwRGF5SW5MdW5hcih5ZWFyKTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlXHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IG1vbnRoRGF5c0luTHVuYXIoeWVhciwgaU1vbnRoKTtcclxuXHJcbi8vICAgICAgICAgICAgIG9mZnNldCAtPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLy8g6Kej6Zmk6Zew5pyIXHJcbi8vICAgICAgICAgICAgIGlmIChsZWFwICYmIGlNb250aCA9PSAobGVhcE1vbnRoICsgMSkpXHJcbi8vICAgICAgICAgICAgICAgICBsZWFwID0gZmFsc2U7XHJcblxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvLyBvZmZzZXTkuLow5pe277yM5bm25LiU5Yia5omN6K6h566X55qE5pyI5Lu95piv6Zew5pyI77yM6KaB5qCh5q2jXHJcbi8vICAgICAgICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXBNb250aCA+IDAgJiYgaU1vbnRoID09IGxlYXBNb250aCArIDEpIHtcclxuLy8gICAgICAgICAgICAgaWYgKGxlYXApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSBmYWxzZTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgLy8gb2Zmc2V05bCP5LqOMOaXtu+8jOS5n+imgeagoeato1xyXG4vLyAgICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XHJcbi8vICAgICAgICAgICAgIG9mZnNldCArPSBkYXlzT2ZNb250aDtcclxuLy8gICAgICAgICAgICAgLS1pTW9udGg7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgICAvLyDlhpzljoblubTku71cclxuLy8gICAgICAgICBsdW5hclllYXIgPSBpWWVhcjtcclxuLy8gICAgICAgICBsdW5hck1vbnRoID0gaU1vbnRoO1xyXG4vLyAgICAgICAgIGx1bmFyRGF5ID0gb2Zmc2V0ICsgMTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTnmoTmgLvlpKnmlbBcclxuLy8gICAgICAqXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5bm055qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IGRheXNJbkx1bmFyWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGludCBpLCBzdW0gPSAzNDg7XHJcbi8vICAgICAgICAgZm9yIChpID0gMHg4MDAwOyBpID4gMHg4OyBpID4+PSAxKSB7XHJcbi8vICAgICAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmIGkpICE9IDApXHJcbi8vICAgICAgICAgICAgICAgICBzdW0gKz0gMTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIChzdW0gKyBsZWFwRGF5SW5MdW5hcih5ZWFyKSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lhpzljoYgeWVhcuW5tOmXsOaciOeahOWkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBsZWFwRGF5SW5MdW5hcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGlmIChnZXRMZWFwTW9udGgoeWVhcikgIT0gMCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiAweDEwMDAwKSAhPSAwKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMzA7XHJcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gMjk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDA7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIOWGnOWOhumXsOmCo+S4quaciFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhciDlubTku71cclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZ2V0TGVhcE1vbnRoKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIChpbnQpIChsdW5hckluZm9beWVhciAtIDE5MDBdICYgMGIxMTExKTtcclxuLy8gICAgIH1cclxuXHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Lyg5Zue5Yac5Y6GIHllYXLlubRtb250aOaciOeahOaAu+WkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyICDlubTku71cclxuLy8gICAgICAqIEBwYXJhbSBtb250aCDmnIjku71cclxuLy8gICAgICAqIEByZXR1cm4g6K+l5pyI5Lu955qE5oC75aSp5pWwXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IG1vbnRoRGF5c0luTHVuYXIoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkgPT0gMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDI5O1xyXG4vLyAgICAgICAgIGVsc2VcclxuLy8gICAgICAgICAgICAgcmV0dXJuIDMwO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOeahOeUn+iCllxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVybiDnlJ/ogpZcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Wm9kaWFjWWVhcihpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIHJldHVybiBab2RpYWNbKHllYXIgLSA0KSAlIDEyXTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWvueW6lOW5tOeahOW5suaUr1xyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRHYW5aaGkoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpbnQgbnVtID0geWVhciAtIDE5MDAgKyAzNjtcclxuLy8gICAgICAgICByZXR1cm4gKEdhbltudW0gJSAxMF0gKyBaaGlbbnVtICUgMTJdKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuW9k+WJjeW5tOS7veeahOW5suaUr1xyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFllYXJHYW5aaGkoKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldEdhblpoaSh0aGlzLnllYXIpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5bm05Lu955qE55Sf6IKWXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50WWVhclpvZGlhYygpIHtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0Wm9kaWFjWWVhcih0aGlzLmx1bmFyWWVhcik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0Q2hpbmFEYXlTdHJpbmcoaW50IGRheSkge1xyXG5cclxuLy8gICAgICAgICBpbnQgbiA9IGRheSAlIDEwID09IDAgPyA5IDogZGF5ICUgMTAgLSAxO1xyXG4vLyAgICAgICAgIGlmIChkYXkgPiAzMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbi8vICAgICAgICAgaWYgKGRheSA9PSAxMClcclxuLy8gICAgICAgICAgICAgcmV0dXJuIFwi5Yid5Y2BXCI7XHJcbi8vICAgICAgICAgZWxzZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gY2hpbmVzZVRlbkNoYXJbZGF5IC8gMTBdICsgY2hpbmVzZU1vbnRoTnVtYmVyW25dO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5Yac5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudEx1bmFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRMdW5hckhvbGlkYXkodGhpcy5sdW5hck1vbnRoLHRoaXMubHVuYXJEYXkpO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6I635Y+W5b2T5YmN5pel5pyf5YWs5Y6G6IqC5pelXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBTdHJpbmcgZ2V0Q3VycmVudFNvbGFySG9saWRheSgpe1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRTb2xhckhvbGlkYXkodGhpcy5tb250aCx0aGlzLmRheSk7XHJcbi8vICAgICB9XHJcblxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5a+55bqU6Zi05Y6G55qE5pel5pyfXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldEx1bmFyRGF0ZSgpIHtcclxuLy8gICAgICAgICByZXR1cm4gY2hpbmVzZU1vbnRoTnVtYmVyW2x1bmFyTW9udGggLSAxXSArIFwi5pyIXCIgKyBnZXRDaGluYURheVN0cmluZyhsdW5hckRheSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lr7nlupTml6XmnJ/nmoTlhazljoboioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOWFrOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOWFrOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRTb2xhckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBzb2xhckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZCA9IHNvbGFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZHYgPSBzb2xhckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgc21kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIHNkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHNtZCA9IHNtb250aF92ICsgc2RheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAoc2QudHJpbSgpLmVxdWFscyhzbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIHNkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKioqXHJcbi8vICAgICAgKiDojrflj5bpmLTljoblr7nlupTnmoToioLlgYfml6VcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOmYtOWOhuaciFxyXG4vLyAgICAgICogQHBhcmFtIGRheSAgIOmYtOWOhuaXpVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRMdW5hckhvbGlkYXkoaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBsdW5hckhvbGlkYXkubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgICAgICAgICAgLy8g6L+U5Zue5Yac5Y6G6IqC5YGH5pel5ZCN56ewXHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZCA9IGx1bmFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMF07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZHYgPSBsdW5hckhvbGlkYXlbaV0uc3BsaXQoXCIgXCIpWzFdO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4vLyAgICAgICAgICAgICBTdHJpbmcgbG1kID0gXCJcIjtcclxuLy8gICAgICAgICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBpZiAoZGF5IDwgMTApIHtcclxuLy8gICAgICAgICAgICAgICAgIGxkYXlfdiA9IFwiMFwiICsgZGF5O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGxtZCA9IGxtb250aF92ICsgbGRheV92O1xyXG4vLyAgICAgICAgICAgICBpZiAobGQudHJpbSgpLmVxdWFscyhsbWQudHJpbSgpKSkge1xyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGxkdjtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgIH1cclxuLy8gICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuaYr+WQpuS4uumXsOW5tFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgYm9vbGVhbiBpc0xlYXBZZWFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaWYgKHllYXIgJSAxMDAgPT0gMCAmJiB5ZWFyICUgNDAwID09IDApIHtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbi8vICAgICAgICAgfSBlbHNlIGlmICh5ZWFyICUgMTAwICE9IDAgJiYgeWVhciAlIDQgPT0gMCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Yik5pat5YWs5Y6G5a+55bqU5bm05pyI55qE5aSp5pWwXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSBpc0xlYXBZZWFyXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGhcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIGludCBnZXREYXlzT2ZNb250aChib29sZWFuIGlzTGVhcFllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIHN3aXRjaCAobW9udGgpIHtcclxuLy8gICAgICAgICBjYXNlIDE6XHJcbi8vICAgICAgICAgY2FzZSAzOlxyXG4vLyAgICAgICAgIGNhc2UgNTpcclxuLy8gICAgICAgICBjYXNlIDc6XHJcbi8vICAgICAgICAgY2FzZSA4OlxyXG4vLyAgICAgICAgIGNhc2UgMTA6XHJcbi8vICAgICAgICAgY2FzZSAxMjpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMTtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSA0OlxyXG4vLyAgICAgICAgIGNhc2UgNjpcclxuLy8gICAgICAgICBjYXNlIDk6XHJcbi8vICAgICAgICAgY2FzZSAxMTpcclxuLy8gICAgICAgICAgICAgZGF5c09mTW9udGggPSAzMDtcclxuLy8gICAgICAgICAgICAgYnJlYWs7XHJcbi8vICAgICAgICAgY2FzZSAyOlxyXG4vLyAgICAgICAgICAgICBpZiAoaXNMZWFwWWVhcikge1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSAyOTtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gMjg7XHJcbi8vICAgICAgICAgICAgIH1cclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBkYXlzT2ZNb250aDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOWIpOaWreWFrOWOhuW5tOaciOaXpeWxnuS6juaYn+acn+WHoFxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0geWVhclxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBpbnQgZ2V0V2Vla2RheU9mTW9udGgoaW50IHllYXIsIGludCBtb250aCkge1xyXG4vLyAgICAgICAgIENhbGVuZGFyIGNhbCA9IENhbGVuZGFyLmdldEluc3RhbmNlKCk7XHJcbi8vICAgICAgICAgY2FsLnNldCh5ZWFyLCBtb250aCAtIDEsIDEpO1xyXG4vLyAgICAgICAgIGRheU9mV2VlayA9IGNhbC5nZXQoQ2FsZW5kYXIuREFZX09GX1dFRUspIC0gMTtcclxuLy8gICAgICAgICByZXR1cm4gZGF5T2ZXZWVrO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHtcclxuLy8gICAgICAgICBMdW5hckNhbGVuZGFyIGNhbGVuZGFyID0gbmV3IEx1bmFyQ2FsZW5kYXIoMjAxOSwgOSwgMTMpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEx1bmFyRGF0ZSgpOlwiICsgY2FsZW5kYXIuZ2V0THVuYXJEYXRlKCkpO1xyXG4vLyAgICAgICAgIFN5c3RlbS5vdXQucHJpbnRsbihcImNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKTpcIiArIGNhbGVuZGFyLmdldEN1cnJlbnRMdW5hckhvbGlkYXkoKSk7XHJcbi8vICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKFwiY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpOlwiICsgY2FsZW5kYXIuZ2V0Q3VycmVudFNvbGFySG9saWRheSgpKTtcclxuLy8gICAgIH1cclxuLy8gfVxyXG4iLCJcblxuY29uc3QgTk9ERV9SRVBMQUNFID0gMCAvL25vZGUgcmVwbGFjZSBcbmNvbnN0IENISUxEX1JFX09SREVSID0gMSAvL2NoaWxkIG5vZGUgcmUgb3JkZXJcbmNvbnN0IE5PREVfUFJPUFMgPSAyIC8vcHJvcCBjaGFuZ2UgXG5jb25zdCBOT0RFX0NPTlRFTlQgPSAzIC8vY29udGVudCBjaGFuZ2VcbmNsYXNzIEVsZW1lbnQge1xuICAgIC8qKlxuICAgICAqIHZpcnR1YWwgZG9tIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Kn0gdGFnICB0aGUgaHRtbCB0YWcgbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gcHJvcHMgIHRoZSBwcm9wIChrZXnvvIxzdHlsZS4uKVxuICAgICAqIEBwYXJhbSB7Kn0gY2hpbGRyZW4gY2hpbGQgZGF0YVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHRhZywgcHJvcHMsIGNoaWxkcmVuKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbilcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhZyA9IHRhZ1xuICAgICAgICB0aGlzLnByb3BzID0gcHJvcHMgfHwge31cbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIHx8IFtdXG4gICAgICAgIHRoaXMua2V5ID0gcHJvcHMgPyBwcm9wcy5rZXkgOiB1bmRlZmluZWRcbiAgICAgICAgaWYgKCF0aGlzLmtleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RhZ30gLi4uIGh0bWwgdGFnIHRoZSBrZXkgaXMgdW5kZWZpbmVkYClcbiAgICAgICAgfVxuICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGNvdW50ICs9IGNoaWxkLmNvdW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3VudCsrXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvdW50ID0gY291bnRcbiAgICB9XG4gICAgLyoqXG4gICAgICogdGhlIG1ldGhvZCB1c2UgdG8gdmlydHVhbCBkb20gIHJlbmRlIHRvIHJlYWwgZG9tXG4gICAgICovXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpcy50YWcpXG4gICAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xuICAgICAgICBmb3IgKGNvbnN0IHByb3BOYW1lIGluIHByb3BzKSB7XG4gICAgICAgICAgICBVdGlsLnNldEF0dHIoZWwsIHByb3BOYW1lLCBwcm9wc1twcm9wTmFtZV0pXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWwgPSAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSA/IGNoaWxkLnJlbmRlcigpIDogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2hpbGQpXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChjaGlsZEVsKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZWw7XG4gICAgfVxufVxuXG5jbGFzcyBEaWZmIHtcbiAgICAvKipcbiAgICAgKiBkb20gdHJlZSBkaWZmIGFsZ29yaXRobSBvYmplY3QgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0geyp9IG9sZFRyZWUgdGhlIGRvbSB0cmVlIGZvciBiZWZvcmUgdXBkYXRlIFxuICAgICAqIEBwYXJhbSB7Kn0gbmV3VHJlZSB0aGUgZG9tIHRyZWUgZm9yIGFmdGVyIHVwZGF0ZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9sZFRyZWUsIG5ld1RyZWUpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IDBcbiAgICAgICAgdGhpcy5wYXRjaGVzID0ge31cbiAgICAgICAgdGhpcy5kZnNXYWxrKG9sZFRyZWUsIG5ld1RyZWUsIHRoaXMuaW5kZXgpXG4gICAgfVxuICAgIGRmc1dhbGsob2xkTm9kZSwgbmV3Tm9kZSwgaW5kZXgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaCA9IFtdXG4gICAgICAgIGlmIChuZXdOb2RlID09IG51bGwpIHtcblxuICAgICAgICB9IGVsc2UgaWYgKFV0aWwuaXNTdHJpbmcob2xkTm9kZSkgJiYgVXRpbC5pc1N0cmluZyhuZXdOb2RlKSkge1xuICAgICAgICAgICAgaWYgKG9sZE5vZGUgIT0gbmV3Tm9kZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTk9ERV9DT05URU5ULFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBuZXdOb2RlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvbGROb2RlLnRhZ05hbWUgPT09IG5ld05vZGUudGFnTmFtZSAmJiBvbGROb2RlLmtleSA9PSBuZXdOb2RlLmtleSkge1xuICAgICAgICAgICAgbGV0IHByb3BzUGF0Y2hlcyA9IHRoaXMuZGlmZlByb3BzKG9sZE5vZGUsIG5ld05vZGUpXG4gICAgICAgICAgICBpZiAocHJvcHNQYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX1BST1BTLFxuICAgICAgICAgICAgICAgICAgICBwcm9wczogcHJvcHNQYXRjaGVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghVXRpbC5pc0lnbm9yZUNoaWxkcmVuKG5ld05vZGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kaWZmQ2hpbGRyZW4ob2xkTm9kZS5jaGlsZHJlbiwgbmV3Tm9kZS5jaGlsZHJlbiwgaW5kZXgsIGN1cnJlbnRQYXRjaClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX1JFUExBQ0UsXG4gICAgICAgICAgICAgICAgbm9kZTogbmV3Tm9kZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBhdGNoLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wYXRjaGVzW2luZGV4XSA9IGN1cnJlbnRQYXRjaFxuICAgICAgICB9XG4gICAgfVxuICAgIGRpZmZQcm9wcyhvbGROb2RlLCBuZXdOb2RlKSB7XG5cbiAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSBvbGROb2RlLnByb3BzXG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Tm9kZS5wcm9wc1xuXG4gICAgICAgIGNvbnN0IHByb3BzUGF0Y2hlcyA9IHt9XG4gICAgICAgIGxldCBpc1NhbWUgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChuZXdQcm9wc1trZXldICE9PSBvbGRQcm9wc1trZXldKSB7XG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gbmV3UHJvcHMpIHtcbiAgICAgICAgICAgIGlmICghb2xkUHJvcHMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlzU2FtZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgcHJvcHNQYXRjaGVzW2tleV0gPSBuZXdQcm9wc1trZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzU2FtZSA/IG51bGwgOiBwcm9wc1BhdGNoZXNcblxuICAgIH1cbiAgICBkaWZmQ2hpbGRyZW4ob2xkQ2hpbGRyZW4sIG5ld0NoaWxkcmVuLCBpbmRleCwgY3VycmVudFBhdGNoKSB7XG4gICAgICAgIGxldCBkaWZmTGlzdCA9IG5ldyBEaWZmTGlzdChvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4pXG4gICAgICAgIGxldCBkaWZmcyA9IGRpZmZMaXN0LmdldFJlc3VsdCgpXG4gICAgICAgIG5ld0NoaWxkcmVuID0gZGlmZnMuY2hpbGRcbiAgICAgICAgaWYgKGRpZmZzLm1vdmVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHJlb3JkZXJQYXRjaCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBDSElMRF9SRV9PUkRFUixcbiAgICAgICAgICAgICAgICBtb3ZlczogZGlmZnMubW92ZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN1cnJlbnRQYXRjaC5wdXNoKHJlb3JkZXJQYXRjaClcbiAgICAgICAgfVxuICAgICAgICBsZXQgbGVmdE5vZGUgPSBudWxsXG4gICAgICAgIGxldCBjdXJyZW50Tm9kZUluZGV4ID0gaW5kZXhcbiAgICAgICAgb2xkQ2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCBuZXdDaGlsZCA9IG5ld0NoaWxkcmVuW2ldXG4gICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ID0gKGxlZnROb2RlICYmIGxlZnROb2RlLmNvdW50KSA/XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIGxlZnROb2RlLmNvdW50ICsgMSA6XG4gICAgICAgICAgICAgICAgY3VycmVudE5vZGVJbmRleCArIDFcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgbmV3Q2hpbGQsIGN1cnJlbnROb2RlSW5kZXgpXG4gICAgICAgICAgICBsZWZ0Tm9kZSA9IGNoaWxkXG4gICAgICAgIH0pXG5cblxuICAgIH1cbn1cblxuY2xhc3MgUGF0Y2gge1xuICAgIGNvbnN0cnVjdG9yKG5vZGUsIHBhdGNoZXMpIHtcbiAgICAgICAgbGV0IHdhbGtlciA9IHtcbiAgICAgICAgICAgIGluZGV4OiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcylcbiAgICB9XG4gICAgZGZzV2Fsayhub2RlLCB3YWxrZXIsIHBhdGNoZXMpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRQYXRjaGVzID0gcGF0Y2hlc1t3YWxrZXIuaW5kZXhdXG4gICAgICAgIGxldCBsZW4gPSBub2RlLmNoaWxkTm9kZXMgPyBub2RlLmNoaWxkTm9kZXMubGVuZ3RoIDogMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkTm9kZXNbaV1cbiAgICAgICAgICAgIHdhbGtlci5pbmRleCsrXG4gICAgICAgICAgICB0aGlzLmRmc1dhbGsoY2hpbGQsIHdhbGtlciwgcGF0Y2hlcylcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBhdGNoZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlQYXRjaGVzKG5vZGUsIGN1cnJlbnRQYXRjaGVzKVxuICAgICAgICB9XG5cbiAgICB9XG4gICAgYXBwbHlQYXRjaGVzKG5vZGUsIGN1cnJlbnRQYXRjaGUpIHtcbiAgICAgICAgY3VycmVudFBhdGNoZS5mb3JFYWNoKChjdXJyZW50UGF0Y2gpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoY3VycmVudFBhdGNoLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUkVQTEFDRTpcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld05vZGUgPSBVdGlsLmlzU3RyaW5nKGN1cnJlbnRQYXRjaC5ub2RlKSA/IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGN1cnJlbnRQYXRjaC5ub2RlKSA6IGN1cnJlbnRQYXRjaC5ub2RlLnJlbmRlcigpXG4gICAgICAgICAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgbm9kZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIENISUxEX1JFX09SREVSOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJDaGlsZHJlbihub2RlLCBjdXJyZW50UGF0Y2gubW92ZXMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBOT0RFX1BST1BTOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BzKG5vZGUsIGN1cnJlbnRQYXRjaC5wcm9wcylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfQ09OVEVOVDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSBjdXJyZW50UGF0Y2guY29udGVudFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5ub2RlVmFsdWUgPSBjdXJyZW50UGF0Y2guY29udGVudFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICByZW9yZGVyQ2hpbGRyZW4obm9kZSwgbW92ZXMpIHtcbiAgICAgICAgbGV0IHN0YXRpY05vZGVMaXN0ID0gVXRpbC50b0FycmF5KG5vZGUuY2hpbGROb2RlcylcbiAgICAgICAgbGV0IG5vZGVNYXBzID0ge31cbiAgICAgICAgc3RhdGljTm9kZUxpc3QuZm9yRWFjaCgoc25vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChzbm9kZS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBrZXkgPSBzbm9kZS5nZXRBdHRyaWJ1dGUoJ2tleScpXG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBub2RlTWFwc1trZXldID0gc25vZGVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIG1vdmVzLmZvckVhY2goKG1vdmUpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IG1vdmUuaW5kZXhcbiAgICAgICAgICAgIGlmIChtb3ZlLnR5cGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGljTm9kZUxpc3RbaW5kZXhdID09PSBub2RlLmNoaWxkTm9kZXNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5jaGlsZE5vZGVzW2luZGV4XSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAxKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3ZlLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5zZXJ0Tm9kZSA9IG5vZGVNYXBzW21vdmUuaXRlbS5rZXldID9cbiAgICAgICAgICAgICAgICAgICAgbm9kZU1hcHMobW92ZS5pdGVtLmtleSkuY2xvbmVOb2RlKHRydWUpIDpcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5pc1N0cmluZyhtb3ZlLml0ZW0pID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobW92ZS5pdGVtKSA6IG1vdmUuaXRlbS5yZW5kZXIoKVxuICAgICAgICAgICAgICAgIHN0YXRpY05vZGVMaXN0LnNwbGljZShpbmRleCwgMCwgaW5zZXJ0Tm9kZSlcbiAgICAgICAgICAgICAgICBub2RlLmluc2VydEJlZm9yZShpbnNlcnROb2RlLCBub2RlLmNoaWxkTm9kZXNbaW5kZXhdIHx8IG51bGwpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgc2V0UHJvcHMobm9kZSwgcHJvcHMpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHByb3BzKSB7XG4gICAgICAgICAgICBpZiAocHJvcHNba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IHByb3BzW2tleV1cbiAgICAgICAgICAgICAgICBVdGlsLnNldEF0dHIobm9kZSwga2V5LCB2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxufVxuXG5cblxuXG5jbGFzcyBVdGlsIHtcbiAgICBzdGF0aWMgaXNTdHJpbmcoc29tZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHNvbWUgPT09ICdzdHJpbmcnXG4gICAgfVxuICAgIHN0YXRpYyB0b0FycmF5KGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KSB7XG4gICAgICAgICAgICByZXR1cm4gW11cbiAgICAgICAgfVxuICAgICAgICBsZXQgYXJyYXkgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2gobGlzdFtpXSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJyYXlcbiAgICB9XG4gICAgc3RhdGljIGlzRm9ySW4oZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiAvXlxcdyogX2luXyBcXHcqJC8udGVzdChkaXJlY3Rpb24pXG4gICAgfVxuICAgIHN0YXRpYyBpc0ZvckZvckluKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gL15cXHcqIF9pbiokLy50ZXN0KGRpcmVjdGlvbilcbiAgICB9XG5cbiAgICBzdGF0aWMgaXNGb3JPckZvckZvcihkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW5fIFxcd3xfaW4qJC8udGVzdChkaXJlY3Rpb24pXG4gICAgfVxuICAgIHN0YXRpYyBpc0lnbm9yZUNoaWxkcmVuKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUucHJvcHMgJiYgbm9kZS5wcm9wcy5oYXNPd25Qcm9wZXJ0eShcImlnbm9yZVwiKVxuICAgIH1cbiAgICBzdGF0aWMgaXNOdW1iZXIgKHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YodmFsdWUpID09PSAnc3RyaW5nJykge1xuICAgICAgICAvL+ato+aVtOaVsFxuICAgICAgICB2YXIgcmVOdW1iZXIgPSAvXlxcZCskL1xuICAgICAgICAvL+i0n+aVtOaVsFxuICAgICAgICB2YXIgcmVOZU51bWJlciA9IC9eLVxcZCskL1xuICAgICAgICAvL+ato+WunuaVsFxuICAgICAgICB2YXIgcmVSZWFsTnVtYmVyMSA9IC9eWzEtOV1cXGQqWy5dXFxkKyQvICAvL+mdnumbtuW8gOWktFxuICAgICAgICB2YXIgcmVSZWFsTnVtYmVyMiA9IC9eMFsuXVxcZCskLyAvL+mbtuW8gOWktFxuICAgICAgICAvL+i0n+WunuaVsFxuICAgICAgICB2YXIgcmVOZVJlYWxOdW1iZXIxID0gL14tWzEtOV1cXGQqWy5dXFxkKyQvICAvL+mdnumbtuW8gOWktFxuICAgICAgICB2YXIgcmVOZVJlYWxOdW1iZXIyID0gL14tMFsuXVxcZCskLyAvL+mbtuW8gOWktFxuXG4gICAgICAgIGlmIChyZU51bWJlci50ZXN0KHZhbHVlKSB8fCByZU5lTnVtYmVyLnRlc3QodmFsdWUpIFxuICAgICAgICB8fCByZVJlYWxOdW1iZXIxLnRlc3QodmFsdWUpIHx8IHJlUmVhbE51bWJlcjIudGVzdCh2YWx1ZSlcbiAgICAgICAgfHwgcmVOZVJlYWxOdW1iZXIxLnRlc3QodmFsdWUpfHwgcmVOZVJlYWxOdW1iZXIyLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAodHlwZW9mKHZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcbiAgICAgICAgICAgICAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcgfHwgdGFnTmFtZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuXG5jbGFzcyBEaWZmTGlzdCB7XG4gICAgLyoqXG4gICAgICogZGlmZiBsaXN0IFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkTGlzdCBcbiAgICAgKiBAcGFyYW0geyp9IG5ld0xpc3QgXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2xkTGlzdCwgbmV3TGlzdCkge1xuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcbiAgICAgICAgbGV0IG5ld0xpc3RLZXlJbmRleCA9IHRoaXMubWFrZUtleUluZGV4KG5ld0xpc3QpLmtleUluZGV4XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yID0gW11cbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvbGRJdGVtID0gb2xkTGlzdFtpXVxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcbiAgICAgICAgICAgIGlmICghbmV3TGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG9JdGVtS2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobnVsbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZExpc3QucHVzaChuZXdMaXN0W25ld0xpc3RLZXlJbmRleFtvSXRlbUtleV1dKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVtcExpc3QgPSB0aGlzLmNoaWxkTGlzdC5zbGljZSgwKVxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBMaXN0W2ldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5JdGVtID0gbmV3TGlzdFtpXVxuICAgICAgICAgICAgbGV0IG5JdGVtS2V5ID0gdGhpcy5nZXRLZXkobkl0ZW0pXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxuICAgICAgICAgICAgbGV0IGNJdGVtS2V5ID0gdGhpcy5nZXRLZXkoY0l0ZW0pXG4gICAgICAgICAgICBpZiAoY0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZExpc3RLZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShuSXRlbUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjTmV4dEl0ZW1LZXkgPSBnZXRLZXkodGhpcy50ZW1wTGlzdFtpbmRleCArIDFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBrID0gdGhpcy50ZW1wTGlzdC5sZW5ndGggLSBpbmRleFxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBrLS1cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGsgKyBuZXdMaXN0Lmxlbmd0aClcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgbWFrZUtleUluZGV4KGxpc3QpIHtcbiAgICAgICAgbGV0IGtleUluZGV4ID0ge31cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGxldCBpdGVtS2V5ID0gdGhpcy5nZXRLZXkoaXRlbSlcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleShpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtW1wia2V5XCJdXG4gICAgfVxuICAgIHJlbW92ZUNvcHlUZW1wTGlzdChpbmRleCkge1xuICAgICAgICB0aGlzLnRlbXBMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdHlwZTogMFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGluc2VydChpbmRleCwgaXRlbSkge1xuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICB0eXBlOiAxXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0UmVzdWx0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxuICAgICAgICAgICAgY2hpbGQ6IHRoaXMuY2hpbGRMaXN0XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBvYnNlcnZlKG9iaiwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spIHtcblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJuYWxWYWx1ZSA9IG9ialtrZXldXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxuICAgICAgICBvYnNlcnZlTWFwLnB1dChrZXksIG9ic2VydmFibGUpXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUuYWRkKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpbnRlcm5hbFZhbHVlICE9PSBuZXdWYWxcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFZhbHVlID0gbmV3VmFsXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5pbnZva2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBvYmpcbn1cblxuXG5cbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMgPSBuZXcgU2V0KClcbn1cbk9ic2VydmFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlVXBkYXRlKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMuYWRkKG9ic2VydmFibGVVcGRhdGUpXG59XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMuZm9yRWFjaChmdW4gPT4gZnVuKCkpXG59XG5cblxuLyoqXG4gKiB0aGUgbWV0aG9kIHVzZSB0byBkZWVwIGNsb25lIG9ialxuICogQHBhcmFtIHsqfSBvYmogXG4gKi9cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGxldCBnZXRUeXBlID0gKG8pID0+IHtcbiAgICAgICAgaWYgKG8gPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgaWYgKG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0LCBvQ2xhc3MgPSBnZXRUeXBlKG9iaik7XG4gICAgaWYgKG9DbGFzcyA9PT0gXCJPYmplY3RcIikge1xuICAgICAgICByZXN1bHQgPSB7fTtcbiAgICB9IGVsc2UgaWYgKG9DbGFzcyA9PT0gXCJBcnJheVwiKSB7XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICBsZXQgY29weSA9IG9ialtrZXldO1xuICAgICAgICBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIk9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIkFycmF5XCIpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXJndW1lbnRzLmNhbGxlZShjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBoKHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXG59XG5cbmZ1bmN0aW9uIGRpZmYob2xkVHJlZSwgbmV3VHJlZSkge1xuICAgIGxldCBkID0gbmV3IERpZmYob2xkVHJlZSwgbmV3VHJlZSlcbiAgICByZXR1cm4gZC5wYXRjaGVzXG59XG5cblxuZnVuY3Rpb24gcGF0Y2gobm9kZSwgcGF0Y2hlcykge1xuICAgIHJldHVybiBuZXcgUGF0Y2gobm9kZSwgcGF0Y2hlcylcbn1cbi8qKlxuICogdGhlIG1hcCBvYmplY3QgdXNlIHRvIHNhdmUgbGlraWx5IChrZXksdmFsdWUpIGRhdGFcbiAqL1xuY2xhc3MgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcbiAgICB9XG4gICAgcHV0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMubWFwKSkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApID8gdGhpcy5tYXBba2V5XSA6IG51bGw7XG4gICAgfVxuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgaWYgKChrZXkgaW4gdGhpcy5tYXApKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XVxuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcbiAgICB9XG59XG5cblxuY2xhc3MgUlYge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbikge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlbCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBkb21cbiAgICAgICAgfSA9IG9wdGlvblxuICAgICAgICBsZXQgcm9vdCA9IFV0aWwuaXNTdHJpbmcoZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbFxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgICAgIHRoaXMudmUgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSlcbiAgICAgICAgdGhpcy53ID0gdGhpcy52ZS5yZW5kZXIoKVxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudylcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwID0gbmV3IE1hcCgpXG4gICAgICAgIG9ic2VydmUodGhpcy5kYXRhLCB0aGlzLm9ic2VydmVNYXAsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZG9tKGRvbSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxuXG4gICAgfVxuICAgIHVwZGF0ZWRvbShkb20pIHtcbiAgICAgICAgbGV0IG52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxuICAgICAgICB3aW5kb3cubnZlID0gbnZlXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcbiAgICAgICAgcGF0Y2godGhpcy53LCBkaWZmKHRoaXMudmUsIG52ZSkpXG4gICAgICAgIHRoaXMudmUgPSBudmVcbiAgICB9XG4gICAgd2F0Y2goa2V5LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9ic2VydmVNYXAuZ2V0KGtleSkuYWRkKGNhbGxiYWNrKVxuICAgIH1cbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW11cbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXG4gICAgICAgICAgICBpZiAoY2MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNjLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHYpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQoY2MpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNjKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGgoZG9tLnRhZywgZG9tLnByb3BzLCBjaGlsZHJlbilcbiAgICB9XG4gICAgYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbHlUcnV0aGZ1bERhdGEsZG9tLmtleXM6XCIgKyBPYmplY3Qua2V5cyhkb20pICsgXCIsY2hpbGREb21EYXRhOlwiICsgKFwiY2hpbGREb21EYXRhXCIgaW4gZG9tKSlcbiAgICAgICAgaWYgKFwiZm9yXCIgaW4gZG9tLnByb3BzIHx8IFwiZm9yX2ZvclwiIGluIGRvbS5wcm9wcykge1xuICAgICAgICAgICAgbGV0IGRhdGFBcnJheSA9IFtdXG4gICAgICAgICAgICBsZXQgaXNGb3JGb3IgPSBmYWxzZVxuICAgICAgICAgICAgbGV0IGRhdGFTaW5nbGVcbiAgICAgICAgICAgIGlmIChkb20ucHJvcHNbJ2ZvciddKSB7IC8vYWRkIGZvciBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0Zvck9yRm9yRm9yKGRvbS5wcm9wc1snZm9yJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20uZm9yRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JJbihkb20ucHJvcHNbJ2ZvciddKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBsYXNlIHVzZSBfaW4gZGlyZWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkb20uZm9yRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0ZvckZvckluKGRvbS5wcm9wc1snZm9yJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGxhc2UgdXNlIF9pbl8gZGlyZWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSB0aGlzLmRhdGFbZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChkb20ucHJvcHNbJ2Zvcl9mb3InXSkgeyAvL2FkZCBmb3JfZm9yIGRpcmVjdGlvblxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzRm9yT3JGb3JGb3IoZG9tLnByb3BzWydmb3JfZm9yJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzRm9yRm9ySW4oZG9tLnByb3BzWydmb3JfZm9yJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwbGFzZSB1c2UgX2luXyBkaXJlY3Rpb25cIilcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc0ZvckZvciA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5ID0gdGhpcy5kYXRhW2RvbS5wcm9wc1snZm9yX2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICBkYXRhU2luZ2xlID0gZG9tLnByb3BzWydmb3JfZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMF1cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRoZSBmb3IgZGlyZWN0aW9uIHVzZSBlcnJvclwiKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9ianMgPSBbXVxuICAgICAgICAgICAgZGF0YUFycmF5LmZvckVhY2goZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHt9XG4gICAgICAgICAgICAgICAgb2JqLnRhZyA9IGRvbS50YWdcbiAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW4gPSBbXVxuICAgICAgICAgICAgICAgIG9iai5wcm9wcyA9IHt9XG4gICAgICAgICAgICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXMoZG9tLnByb3BzKVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcInN0eWxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IGRvbS5wcm9wc1t2YWx1ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlcyA9IHN0eWxlLnNwbGl0KFwiLFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZUFycmF5U3R5bGUoZGF0YSwgc3R5bGVzLCBkYXRhU2luZ2xlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoZG9tLnByb3BzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKS5pbmRleE9mKGRhdGFTaW5nbGUpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pLnNwbGl0KFwiLlwiKVsxXV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUlYuaXNPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IFJWLmdldE9wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdLGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hpbGRTdHJpbmcsY2hpbGQ6XCIrZG9tLmNoaWxkcmVuW2NoaWxkXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKS5pbmRleE9mKGRhdGFTaW5nbGUpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuc3BsaXQoXCIuXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGRyZW5bY2hpbGRdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRm9yRm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmNoaWxkcmVuW2NoaWxkXS5mb3JEYXRhID0gZGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb20uY2hpbGRyZW5bY2hpbGRdIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZGF0YSA9IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbS5jaGlsZHJlbltjaGlsZF0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgIG9ianMucHVzaChvYmopXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHJldHVybiBvYmpzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZGF0YVxuICAgICAgICAgICAgaWYoXCJkYXRhXCIgaW4gZG9tKXtcbiAgICAgICAgICAgICAgICBkYXRhPWRvbS5kYXRhXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhPXRoaXMuZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xuICAgICAgICAgICAgb2JqLmNoaWxkcmVuID0gW11cbiAgICAgICAgICAgIG9iai5wcm9wcyA9IHt9XG4gICAgICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBkb20ucHJvcHNbdmFsdWVdXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVzID0gc3R5bGUuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihkb20ucHJvcHNbdmFsdWVdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFJWLmlzT3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IFJWLmdldE9wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdLGRhdGEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZT1SVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlLmluZGV4T2YoXCIuXCIpPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW3ZhbHVlLnNwbGl0KCcuJylbMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdPWRvbS5jaGlsZHJlbltjaGlsZF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSB0aGlzLmFwcGx5VHJ1dGhmdWxEYXRhKGRvbS5jaGlsZHJlbltjaGlsZF0pXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIG9ialxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKSB7XG4gICAgICAgIGxldCBuZXdTdHlsZSA9ICcnXG4gICAgICAgIGlmIChkYXRhU2luZ2xlKSB7XG4gICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihzdHlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuaW5kZXhPZihkYXRhU2luZ2xlKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuc3BsaXQoXCIuXCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gZGF0YVtrZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXG4gICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxuICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoc3R5bGVWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdHlsZVxuICAgIH1cbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xuICAgICAgICBsZXQgbmV3U3R5bGVBcnJheSA9IFwiXCJcbiAgICAgICAgZm9yIChsZXQgc3R5bGUgb2Ygc3R5bGVzKSB7XG5cbiAgICAgICAgICAgIGxldCBuZXdTdHlsZSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICBuZXdTdHlsZUFycmF5ICs9IG5ld1N0eWxlICsgXCI7XCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3R5bGVBcnJheVxuXG4gICAgfVxuICAgIHN0YXRpYyBpc1BsYWNlSG9sZGVyKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN0YXJ0c1dpdGgoXCIlI1wiKSAmJiBjb250ZW50LmVuZHNXaXRoKFwiIyVcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xuICAgICAgICByZXR1cm4gY29udGVudC5zbGljZSgyLCAtMilcbiAgICB9XG4gICAgLyoqXG4gICAgICog5piv5ZCm5Li66KGo6L6+5byPXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRlbnQgXG4gICAgICovXG4gICAgc3RhdGljIGlzT3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQpIHtcbiAgICAgIFxuICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhjb250ZW50KSkge1xuICAgICAgICAgICAgaWYgKGNvbnRlbnQuaW5kZXhPZihcIntcIikgIT0gLTEgJiYgY29udGVudC5pbmRleE9mKFwifVwiKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgc3RhdGljIGdldE9wZXJhdG9yRXhwcmVzc2lvbihjb250ZW50LCBkYXRhKSB7XG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSBjb250ZW50LnNsaWNlKGNvbnRlbnQuaW5kZXhPZihcIntcIikgKyAxLCBjb250ZW50LmluZGV4T2YoXCJ9XCIpKVxuICAgICAgICAgICAgbGV0IHN0YXJ0SW5kZXggPSBleHByZXNzaW9uLmluZGV4T2YoXCIlI1wiKVxuICAgICAgICAgICAgbGV0IGVuZEluZGV4ID0gZXhwcmVzc2lvbi5pbmRleE9mKFwiIyVcIikrMlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXRPcGVyYXRvckV4cHJlc3Npb24sc3RhcnRJbmRleDpcIisoc3RhcnRJbmRleCkrXCIsZW5kSW5kZXg6XCIrKGVuZEluZGV4KStcIixleHByZXNzOlwiK2V4cHJlc3Npb24pXG4gICAgICAgICAgICBpZiAoc3RhcnRJbmRleCAhPSAtMSAmJiBlbmRJbmRleCAhPSAtMSAmJiBzdGFydEluZGV4IDwgZW5kSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGxhY2VIb2xkZXIgPSBleHByZXNzaW9uLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uLHBsYWNlSG9sZGVyOlwiK3BsYWNlSG9sZGVyK1wiLGV4cHJlc3M6XCIrZXhwcmVzc2lvbilcbiAgICAgICAgICAgICAgICBsZXQgcmVhbFZhbHVlXG4gICAgICAgICAgICAgICAgaWYocGxhY2VIb2xkZXIuaW5kZXhPZihcIi5cIik+MCl7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGFjZUhvbGRlclZhbHVlPWRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShwbGFjZUhvbGRlcikuc3BsaXQoXCIuXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWU9VXRpbC5pc051bWJlcihwbGFjZUhvbGRlclZhbHVlKT9wbGFjZUhvbGRlclZhbHVlOmBcIiR7cGxhY2VIb2xkZXJWYWx1ZX1cImAvL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XG5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVhbFZhbHVlICwxLDpcIityZWFsVmFsdWUpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICByZWFsVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUocGxhY2VIb2xkZXIpXS8v6YCa6L+HcGxhY2VIb2xkZXLlj5bnnJ/lrp7nmoTlgLxcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVhbFZhbHVlICwyLDpcIityZWFsVmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbj1leHByZXNzaW9uLnJlcGxhY2UocGxhY2VIb2xkZXIsIHJlYWxWYWx1ZSlcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJleHByZXNzaW9uLHJlYWxWYWx1ZTpcIitleHByZXNzaW9uKVxuICAgICAgICAgICAgcmV0dXJuIGV2YWwoZXhwcmVzc2lvbilcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUlYiXSwic291cmNlUm9vdCI6IiJ9