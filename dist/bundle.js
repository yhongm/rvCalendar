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
                style = "font-weight:bold;color:#000000;background-color:#FFFFFF;height:20px;text-align:center";
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
        var day = new Date(mCalendar.year, mCalendar.month, element.innerText);
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
                                    style: 'font-weight:bold; color:#243F65;cursor:hand;text-decoration:none;',
                                    key: "subButton"
                                },
                                children: ["<"]
                            }, {
                                tag: "input",
                                props: {
                                    name: "year",
                                    type: "text",
                                    maxlength: "4",
                                    style: 'font-size: 9pt; text-decoration: none;background-color: #FFFFFF;height: 20px;border: 1px solid #666666; color: #000000;',
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
                                    style: 'font-size: 9pt; text-decoration: none;background-color: #FFFFFF;height: 20px;border: 1px solid #666666; color: #000000;',
                                    size: "2",
                                    key: "inputMonth"
                                },
                                children: [""]
                            }, {
                                tag: 'button',
                                props: {
                                    onclick: "mCalendar.addMonth()",
                                    style: 'font-weight: bold;color: #243F65;cursor: hand;text-decoration: none;',
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
                        // children: ["%#v.content#%"]
                        children: [{
                            tag: "p",
                            props: {
                                key: "{new Date()/100}"
                            },
                            children: ["%#v.content#%"]

                        }, {
                            tag: "p",
                            props: {
                                key: "{new Date()/100}"
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
                            console.log("for in forfor dataSingle:" + dataSingle);
                        } else {
                            if (Util.isForForIn(dom.props['for'])) {
                                throw new Error("plase use _in_ direction");
                            }
                            dataArray = this.data[dom.props['for'].split(" _in_ ")[1]];
                            dataSingle = dom.props['for'].split(" _in_ ")[0];
                            console.log("for  dataSingle:" + dataSingle);
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
                        console.log("for_for  dataSingle:" + dataSingle);
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
                        } else if (value === "childDomData") {

                            // dom.children.forEach(childDom => {
                            //     Object.defineProperty(childDom, "childDomData", { value: data })
                            // })

                            Object.defineProperty(obj, "domData", { value: data });
                            console.log("childDomData:obj:" + ("domData" in obj));
                        } else {
                            if (RV.isPlaceHolder(dom.props[value])) {
                                if (RV.getPlaceHolderValue(dom.props[value]).indexOf(dataSingle) == -1) {
                                    obj.props[value] = _this5.data[RV.getPlaceHolderValue(dom.props[value])];
                                } else {
                                    obj.props[value] = data[RV.getPlaceHolderValue(dom.props[value]).split(".")[1]];
                                }
                            } else if (RV.isOperatorExpression(dom.props[value])) {
                                console.log("operaterExpress:" + RV.getOperatorExpression(dom.props[value]));
                                obj.props[value] = RV.getOperatorExpression(dom.props[value]);
                            } else {
                                obj.props[value] = dom.props[value];
                            }
                        }
                    }

                    for (var child in dom.children) {
                        if ("domData" in obj) {
                            console.log("111111111111111111,,,childDomData,value:" + obj.domData);
                            // obj.children[child] = dom.childDomData[RV.getPlaceHolderValue(dom.children[child])]
                        }
                        if (Util.isString(dom.children[child])) {

                            if (RV.isPlaceHolder(dom.children[child])) {
                                if (RV.getPlaceHolderValue(dom.children[child]).indexOf(dataSingle) == -1) {
                                    obj.children[child] = _this5.data[RV.getPlaceHolderValue(dom.children[child])];
                                    // console.log("dom.keys:" + JSON.stringify(Object.keys(dom)))
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
                console.log("else,domData:" + ("data" in dom));
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
                    } else if (value === "childDomData") {
                        // dom.children.forEach(childDom => {
                        //     Object.defineProperty(childDom, "childDomData", { value: this.data })
                        // })
                        // Object.defineProperty(dom, "domData", { value: this.data })


                    } else {

                        if (RV.isPlaceHolder(dom.props[value])) {
                            obj.props[value] = this.data[RV.getPlaceHolderValue(dom.props[value])];
                        } else if (RV.isOperatorExpression(dom.props[value])) {
                            console.log("operaterExpress:" + RV.getOperatorExpression(dom.props[value]));
                            obj.props[value] = RV.getOperatorExpression(dom.props[value]);
                        } else {
                            obj.props[value] = dom.props[value];
                        }
                    }
                }

                for (var child in dom.children) {
                    if (Util.isString(dom.children[child])) {
                        if (RV.isPlaceHolder(dom.children[child])) {
                            var _value = RV.getPlaceHolderValue(dom.children[child]);
                            console.log("else,value:" + _value + ",data:" + JSON.stringify(data));
                            if (_value.indexOf(".") > 0) {
                                obj.children[child] = data[_value.split('.')[1]];
                                console.log("else,value:" + _value + ",data:" + JSON.stringify(data) + ",...:" + obj.children[child]);
                            } else {
                                obj.children[child] = data[_value];
                            }
                        }
                        console.log("obj.children:" + JSON.stringify(obj.children));
                        // if ("domData" in dom) {
                        //     // let dataSingle=Object.keys(dom.childDomData)[0]
                        //     // console.log("childDomData dataSingle:"+dataSingle)
                        //     // value=dom.childDomData[dataSingle]
                        //     // console.log("childDomData,value:"+value)
                        //     console.log("childDomData,keys:,value:" + dom.domData)
                        //     // obj.children[child] = dom.childDomData[RV.getPlaceHolderValue(dom.children[child])]
                        // }
                        // else {

                        //     obj.children[child] = dom.children[child]
                        // }
                    } else {

                        obj.children[child] = this.applyTruthfulData(dom.children[child]);
                    }
                }
                console.log("obj.children,2:" + JSON.stringify(obj.children));
                console.log("childDomData,obj,js:" + JSON.stringify(obj));
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
            console.log("isOperatorExpression:" + (typeof content === 'undefined' ? 'undefined' : _typeof(content)) + ",content:" + content);
            if (Util.isString(content)) {
                if (content.indexOf("{") != -1 && content.indexOf("}") != -1) {
                    console.log("isOperator true");
                    return true;
                } else {
                    console.log("isOperator false");
                    return false;
                }
            }
            return false;
        }
    }, {
        key: 'getOperatorExpression',
        value: function getOperatorExpression(content, data) {
            if (Util.isString(content)) {
                console.log('getOperatorExpression,content:' + content);
                var expression = content.slice(content.indexOf("{") + 1, content.indexOf("}"));
                var startIndex = expression.indexOf("%#");
                var endIndex = expression.indexOf("#%");
                console.log("content:" + content + ",expression:" + expression);
                if (startIndex != -1 && endIndex != -1 && startIndex < endIndex) {
                    var placeHolder = expression.slice(startIndex, endIndex);
                    var realValue = data[placeHolder]; //通过placeHolder取真实的值
                    expression.replace(placeHolder, realValue);
                }
                console.log("eval expression,eval:" + eval(expression));
                return eval(expression);
            }
        }
    }]);

    return RV;
}();

exports.default = RV;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY2FsZW5kYXJEZW1vLmpzIiwid2VicGFjazovLy8uL3NyYy9SVmNhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3NyYy9sdW5hci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcnYuanMiXSwibmFtZXMiOlsid2luZG93Iiwib25sb2FkIiwic2VsZWN0RGF0ZSIsImFsZXJ0IiwiZ2VuZXJhdGVWaWV3IiwiQ2FsZW5kYXIiLCJtb250aHMiLCJBcnJheSIsImRheUNvdW50cyIsImRheXMiLCJ0b2RheSIsImdldFRvZGF5IiwieWVhciIsIm1vbnRoIiwibmV3Q2FsIiwiRGF0ZSIsInNlbGVjdERheSIsImRheSIsInN0YXJ0RGF5IiwiZGFpbHkiLCJydiIsInVuZGVmaW5lZCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJwcm90b3R5cGUiLCJnZXRXZWVrcyIsImdldERheSIsImdldERheUNvdW50cyIsIndlZWtzIiwiaSIsImRheUluV2Vla3MiLCJpZCIsImoiLCJfY2VsbE9iaiIsImNvbnRlbnQiLCJzdHlsZSIsImxhYmxlIiwibHVuYXIiLCJsdW5hckNhbGVuZGFyIiwiZ2V0THVuYXIiLCJsdW5hckluZm8iLCJjYWxlbmRhcmljaXR5Iiwic29sYXJIb2xpZGF5IiwibHVuYXJIb2xpZGF5IiwiY2hpbmFEYXkiLCJjaGluYU1vbnRoIiwicHVzaCIsIl9vYmoiLCJub3ciLCJnZXREYXRlIiwic3ViTW9udGgiLCJjb25zb2xlIiwibG9nIiwiYWRkTW9udGgiLCJzZXRNb250aCIsInNldFllYXIiLCJtb3VzZU92ZXIiLCJlbGVtZW50IiwiY29sb3IiLCJtb3VzZU91dCIsImxhYmVsIiwiZ2V0QXR0cmlidXRlIiwibUNhbGVuZGFyIiwiY2xpY2tEYXkiLCJpbm5lclRleHQiLCJlbCIsImNhbGxiYWNrIiwiUlYiLCJkYXRhIiwid2Vla1RpdGxlcyIsInZhbHVlIiwiZG9tIiwidGFnIiwicHJvcHMiLCJib3JkZXIiLCJjZWxscGFkZGluZyIsImNlbGxzcGFjaW5nIiwia2V5IiwiY2hpbGRyZW4iLCJhbGlnbiIsInZhbGlnbiIsImNvbHNwYW4iLCJvbmNsaWNrIiwibmFtZSIsInR5cGUiLCJtYXhsZW5ndGgiLCJzaXplIiwiZm9yIiwiZm9yX2ZvciIsIm9uTW91c2VvdmVyIiwib25Nb3VzZU91dCIsImNoaWxkRG9tRGF0YSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5Iiwic2V0IiwibnZhbHVlIiwiZ2V0IiwiTHVuYXJDYWxlbmRhciIsIl95ZWFySW5mbyIsIl9hc3Ryb2xvZ3kiLCJfZGF5SW5Nb250aCIsIl9UaWFuR2FuIiwiX0RpWmhpIiwiX1pvZGlhYyIsIl9jYWxlbmRhcmljaXR5IiwiX2x1bmFySG9saWRheSIsIl9zb2xhckhvbGlkYXkiLCJfY2FsZW5kYXJpY2l0eVRhYmxlIiwiX2NoaW5lc2VDaGFyIiwiX2NoaW5lc2VUZW5DaGFyIiwiX2x1bmFyTW9udGhUYWJsZSIsInN1bSIsIl9sZWFwRGF5c0luTHVuYXJZZWFyIiwiX2xlYXBNb250aEluTHVuYXJZZWFyIiwibXMiLCJnYW5LZXkiLCJ6aGlLZXkiLCJjTW9udGgiLCJjRGF5IiwiYXJyIiwib2Zmc2V0IiwiaW5kZXgiLCJfdGFibGUiLCJfY2FsZW5kYXJpY2l0eUluZm8iLCJwYXJzZUludCIsInN1YnN0ciIsInRvU3RyaW5nIiwiX2NhbGRheSIsInMiLCJNYXRoIiwiZmxvb3IiLCJsdW5hckhvbGlkYXlTdHIiLCJmb3JFYWNoIiwibGQiLCJzcGxpdCIsImxkdiIsImxtb250aF92IiwibGRheV92IiwibG1kIiwidHJpbSIsInNvbGFySG9saWRheVN0ciIsInNkIiwic29sYXIiLCJzZHYiLCJzbW9udGhfdiIsInNkYXlfdiIsInNtZCIsImZpcnN0Q2FsZW5kYXJpY2l0eURheSIsInNlY29uZENhbGVuZGFyaWNpdHlEYXkiLCJub3dTZWxlY3REYXkiLCJub3dTZWxlY3RNb250aCIsImNhbGVuZGFyaWNpdHlTdHIiLCJzb2xhclllYXIiLCJzb2xhck1vbnRoIiwic29sYXJEYXkiLCJub3dTZWxlY3REYXRlIiwibm93U2VsZWN0WWVhciIsIlVUQyIsInRlbXBZZWFyIiwibGVhcCIsInRlbXAiLCJfbHVuYXJZZWFyRGF5cyIsImlzVG9kYXlPYmoiLCJpc1RvZGF5IiwibldlZWsiLCJjV2VlayIsImlzTGVhcCIsInRlbXBNb250aCIsIl9tb250aERheXMiLCJzbSIsImdhblpoaVllYXIiLCJfZ2V0R2FuWmhpWWVhciIsIl9maXJzdENhbGVuZGFyaWNpdHlEYXkiLCJfZ2V0Q2FsZW5kYXJpY2l0eSIsIl9zZWNvbmRDYWxlbmRhcmljaXR5RGF5IiwiZ2FuWmhpTW9udGgiLCJfZ2V0R2FuWmhpIiwiX2dldEx1bmFyRGF5Q2FsZW5kYXJpY2l0eSIsImRheUN5Y2xpY2FsIiwiZ2FuWmhpRGF5IiwiYXN0cm8iLCJfZ2V0QXN0cm9sb2d5Iiwiem9kaWFjIiwiX2dldFpvZGlhYyIsIl9nZXRDaGluYU1vbnRoIiwiX2dldENoaW5hRGF5IiwiX2dldEx1bmFySG9saWRheSIsIl9nZXRTb2xhckhvbGlkYXkiLCJOT0RFX1JFUExBQ0UiLCJDSElMRF9SRV9PUkRFUiIsIk5PREVfUFJPUFMiLCJOT0RFX0NPTlRFTlQiLCJFbGVtZW50IiwidGFnTmFtZSIsIkVycm9yIiwiY291bnQiLCJjaGlsZCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInByb3BOYW1lIiwiVXRpbCIsInNldEF0dHIiLCJjaGlsZEVsIiwicmVuZGVyIiwiY3JlYXRlVGV4dE5vZGUiLCJhcHBlbmRDaGlsZCIsIkRpZmYiLCJvbGRUcmVlIiwibmV3VHJlZSIsInBhdGNoZXMiLCJkZnNXYWxrIiwib2xkTm9kZSIsIm5ld05vZGUiLCJjdXJyZW50UGF0Y2giLCJpc1N0cmluZyIsInByb3BzUGF0Y2hlcyIsImRpZmZQcm9wcyIsImlzSWdub3JlQ2hpbGRyZW4iLCJkaWZmQ2hpbGRyZW4iLCJub2RlIiwibGVuZ3RoIiwib2xkUHJvcHMiLCJuZXdQcm9wcyIsImlzU2FtZSIsImhhc093blByb3BlcnR5Iiwib2xkQ2hpbGRyZW4iLCJuZXdDaGlsZHJlbiIsImRpZmZMaXN0IiwiRGlmZkxpc3QiLCJkaWZmcyIsImdldFJlc3VsdCIsIm1vdmVzIiwicmVvcmRlclBhdGNoIiwibGVmdE5vZGUiLCJjdXJyZW50Tm9kZUluZGV4IiwibmV3Q2hpbGQiLCJQYXRjaCIsIndhbGtlciIsImN1cnJlbnRQYXRjaGVzIiwibGVuIiwiY2hpbGROb2RlcyIsImFwcGx5UGF0Y2hlcyIsImN1cnJlbnRQYXRjaGUiLCJwYXJlbnROb2RlIiwicmVwbGFjZUNoaWxkIiwicmVvcmRlckNoaWxkcmVuIiwic2V0UHJvcHMiLCJ0ZXh0Q29udGVudCIsIm5vZGVWYWx1ZSIsInN0YXRpY05vZGVMaXN0IiwidG9BcnJheSIsIm5vZGVNYXBzIiwic25vZGUiLCJub2RlVHlwZSIsIm1vdmUiLCJyZW1vdmVDaGlsZCIsInNwbGljZSIsImluc2VydE5vZGUiLCJpdGVtIiwiY2xvbmVOb2RlIiwiaW5zZXJ0QmVmb3JlIiwicmVtb3ZlQXR0cmlidXRlIiwic29tZSIsImxpc3QiLCJhcnJheSIsImRpcmVjdGlvbiIsInRlc3QiLCJjc3NUZXh0IiwidG9Mb3dlckNhc2UiLCJzZXRBdHRyaWJ1dGUiLCJvbGRMaXN0IiwibmV3TGlzdCIsIm9sZExpc3RLZXlJbmRleCIsIm1ha2VLZXlJbmRleCIsImtleUluZGV4IiwibmV3TGlzdEtleUluZGV4IiwibW92ZU9wZXJhdG9yIiwiY2hpbGRMaXN0Iiwib2xkSXRlbSIsIm9JdGVtS2V5IiwiZ2V0S2V5IiwidGVtcExpc3QiLCJzbGljZSIsInJlbW92ZSIsInJlbW92ZUNvcHlUZW1wTGlzdCIsIm5JdGVtIiwibkl0ZW1LZXkiLCJjSXRlbSIsImNJdGVtS2V5IiwiY05leHRJdGVtS2V5IiwiaW5zZXJ0IiwiayIsIml0ZW1LZXkiLCJvYnNlcnZlIiwib2JqIiwib2JzZXJ2ZU1hcCIsImtleXMiLCJpbnRlcm5hbFZhbHVlIiwib2JzZXJ2YWJsZSIsIk9ic2VydmFibGUiLCJwdXQiLCJhZGQiLCJuZXdWYWwiLCJjaGFuZ2VkIiwiaW52b2tlIiwidXBkYXRlRnVuY3Rpb25zIiwiU2V0Iiwib2JzZXJ2YWJsZVVwZGF0ZSIsImZ1biIsImNsb25lIiwiZ2V0VHlwZSIsIm8iLCJjYWxsIiwicmVzdWx0Iiwib0NsYXNzIiwiY29weSIsImFyZ3VtZW50cyIsImNhbGxlZSIsImgiLCJkaWZmIiwiZCIsInBhdGNoIiwiTWFwIiwibWFwIiwib3B0aW9uIiwicm9vdCIsInF1ZXJ5U2VsZWN0b3IiLCJ2ZSIsImdldFZpcnR1YWxFbGVtZW50IiwiYXBwbHlUcnV0aGZ1bERhdGEiLCJ3IiwidXBkYXRlZG9tIiwibnZlIiwiY2MiLCJ2IiwiYyIsImRhdGFBcnJheSIsImlzRm9yRm9yIiwiZGF0YVNpbmdsZSIsImlzRm9yT3JGb3JGb3IiLCJmb3JEYXRhIiwiaXNGb3JJbiIsImlzRm9yRm9ySW4iLCJvYmpzIiwicHJvcCIsImluZGV4T2YiLCJzdHlsZXMiLCJoYW5kbGVBcnJheVN0eWxlIiwiaGFuZGxlU2luZ2xlU3R5bGUiLCJpc1BsYWNlSG9sZGVyIiwiZ2V0UGxhY2VIb2xkZXJWYWx1ZSIsImlzT3BlcmF0b3JFeHByZXNzaW9uIiwiZ2V0T3BlcmF0b3JFeHByZXNzaW9uIiwiZG9tRGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJuZXdTdHlsZSIsInN0eWxlS2V5Iiwic3R5bGVWYWx1ZSIsIm5ld1N0eWxlQXJyYXkiLCJzdGFydHNXaXRoIiwiZW5kc1dpdGgiLCJleHByZXNzaW9uIiwic3RhcnRJbmRleCIsImVuZEluZGV4IiwicGxhY2VIb2xkZXIiLCJyZWFsVmFsdWUiLCJyZXBsYWNlIiwiZXZhbCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFn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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LENBQW1CLElBQW5CLENBQWY7QUFDQXRTLHdCQUFRQyxHQUFSLENBQVksYUFBYWxCLE9BQWIsR0FBdUIsY0FBdkIsR0FBd0N3VSxVQUFwRDtBQUNBLG9CQUFJQyxjQUFjLENBQUMsQ0FBZixJQUFvQkMsWUFBWSxDQUFDLENBQWpDLElBQXNDRCxhQUFhQyxRQUF2RCxFQUFpRTtBQUM3RCx3QkFBSUMsY0FBY0gsV0FBV2hGLEtBQVgsQ0FBaUJpRixVQUFqQixFQUE2QkMsUUFBN0IsQ0FBbEI7QUFDQSx3QkFBSUUsWUFBWTFTLEtBQUt5UyxXQUFMLENBQWhCLENBRjZELENBRTVCO0FBQ2pDSCwrQkFBV0ssT0FBWCxDQUFtQkYsV0FBbkIsRUFBZ0NDLFNBQWhDO0FBQ0g7QUFDRDNULHdCQUFRQyxHQUFSLENBQVksMEJBQTBCNFQsS0FBS04sVUFBTCxDQUF0QztBQUNBLHVCQUFPTSxLQUFLTixVQUFMLENBQVA7QUFDSDtBQUdKOzs7Ozs7a0JBSVV2UyxFIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vY2FsZW5kYXJEZW1vLmpzXCIpO1xuIiwiaW1wb3J0IGdlbmVyYXRlVmlldyBmcm9tICcuL3NyYy9SVmNhbGVuZGFyJ1xyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZ2VuZXJhdGVWaWV3KFwiI2FwcFwiLCBmdW5jdGlvbiAoc2VsZWN0RGF0ZSkge1xyXG4gICAgICAgIGFsZXJ0KFwic2VsZWN0RGF0ZSw6XCIrc2VsZWN0RGF0ZSlcclxuICAgIH0pXHJcbn0iLCJpbXBvcnQgUlYgZnJvbSAnLi9ydidcclxuaW1wb3J0IGx1bmFyQ2FsZW5kYXIgZnJvbSAnLi9sdW5hcidcclxuXHJcbi8qKlxyXG4gKiAgXHJcbiAqL1xyXG5mdW5jdGlvbiBDYWxlbmRhcigpIHtcclxuICAgIHRoaXMubW9udGhzID0gbmV3IEFycmF5KFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCIsIFwi5Y2BXCIsIFwi5Y2B5LiAXCIsIFwi5Y2B5LqMXCIpO1xyXG4gICAgdGhpcy5kYXlDb3VudHMgPSBuZXcgQXJyYXkoMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMSk7XHJcbiAgICB0aGlzLmRheXMgPSBuZXcgQXJyYXkoXCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIik7XHJcbiAgICB0aGlzLnRvZGF5ID0gdGhpcy5nZXRUb2RheSgpO1xyXG4gICAgdGhpcy55ZWFyID0gdGhpcy50b2RheS55ZWFyO1xyXG4gICAgdGhpcy5tb250aCA9IHRoaXMudG9kYXkubW9udGg7XHJcbiAgICB0aGlzLm5ld0NhbCA9IG5ldyBEYXRlKCk7XHJcbiAgICB0aGlzLnNlbGVjdERheSA9IHRoaXMubmV3Q2FsO1xyXG4gICAgdGhpcy5kYXkgPSAtMTtcclxuICAgIHRoaXMuc3RhcnREYXkgPSAwO1xyXG4gICAgdGhpcy5kYWlseSA9IDA7XHJcbiAgICB0aGlzLnJ2ID0gdW5kZWZpbmVkXHJcbiAgICBpZiAoKHRoaXMudG9kYXkueWVhciA9PSB0aGlzLm5ld0NhbC5nZXRGdWxsWWVhcigpKSAmJiAodGhpcy50b2RheS5tb250aCA9PSB0aGlzLm5ld0NhbC5nZXRNb250aCgpKSkge1xyXG4gICAgICAgIHRoaXMuZGF5ID0gdGhpcy50b2RheS5kYXk7XHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldFdlZWtzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5uZXdDYWwgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIDEpO1xyXG4gICAgdGhpcy5kYXkgPSAtMTtcclxuICAgIHRoaXMuc3RhcnREYXkgPSB0aGlzLm5ld0NhbC5nZXREYXkoKTtcclxuICAgIHRoaXMuZGFpbHkgPSAwO1xyXG4gICAgaWYgKCh0aGlzLnRvZGF5LnllYXIgPT0gdGhpcy5uZXdDYWwuZ2V0RnVsbFllYXIoKSkgJiYgKHRoaXMudG9kYXkubW9udGggPT0gdGhpcy5uZXdDYWwuZ2V0TW9udGgoKSkpIHtcclxuICAgICAgICB0aGlzLmRheSA9IHRoaXMudG9kYXkuZGF5O1xyXG4gICAgfVxyXG4gICAgdmFyIGRheUNvdW50cyA9IHRoaXMuZ2V0RGF5Q291bnRzKHRoaXMubmV3Q2FsLmdldE1vbnRoKCksIHRoaXMubmV3Q2FsLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgdmFyIHdlZWtzID0gW11cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNjsgaSsrKSB7XHJcbiAgICAgICAgdmFyIGRheUluV2Vla3MgPSBbXVxyXG4gICAgICAgIGRheUluV2Vla3MuaWQgPSBgd2Vla19yb3dfJHtpfWBcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDc7IGorKykge1xyXG4gICAgICAgICAgICB2YXIgX2NlbGxPYmogPSB7fVxyXG4gICAgICAgICAgICB2YXIgY29udGVudCA9IFwiXCJcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0gXCJcIlxyXG4gICAgICAgICAgICB2YXIgbGFibGUgPSBcIlwiXHJcbiAgICAgICAgICAgIHZhciBpZCA9IGB3ZWVrX2RheV8ke2l9JHtqfWBcclxuICAgICAgICAgICAgaWYgKChqID09IHRoaXMuc3RhcnREYXkpICYmICgwID09IHRoaXMuZGFpbHkpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF5ID09IHRoaXMuZGFpbHkpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJmb250LXdlaWdodDpib2xkO2NvbG9yOiMwMDAwMDA7YmFja2dyb3VuZC1jb2xvcjojRkZGRkZGO2hlaWdodDoyMHB4O3RleHQtYWxpZ246Y2VudGVyXCJcclxuICAgICAgICAgICAgICAgIGxhYmxlID0gXCJjdXJyZW50XCJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChqID09IDYpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojRkYwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6MThweDt3aWR0aDoxMiVcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcInNhdFwiXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6ICNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojRTVFOUYyO3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDoxOHB4O3dpZHRoOjEyJVwiXHJcbiAgICAgICAgICAgICAgICBsYWJsZSA9IFwic3VuXCJcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gXCJjb2xvcjojMjQzRjY1O2JhY2tncm91bmQtY29sb3I6I0U1RTlGMjtoZWlnaHQ6MjBweDt3aWR0aDoxMSU7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgbGFibGUgPSBcIm5vcm1hbFwiXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoKHRoaXMuZGFpbHkgPiAwKSAmJiAodGhpcy5kYWlseSA8PSBkYXlDb3VudHMpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gdGhpcy5kYWlseSArIFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhaWx5Kys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IFwiY29sb3I6IzAwMDAwMDtiYWNrZ3JvdW5kLWNvbG9yOiAjZjZmNmY2O2hlaWdodDoyMHB4O3dpZHRoOiAxMSU7dGV4dC1hbGlnbjpjZW50ZXJcIlxyXG4gICAgICAgICAgICAgICAgY29udGVudCA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmlkID0gaWRcclxuICAgICAgICAgICAgX2NlbGxPYmoubGFibGUgPSBsYWJsZVxyXG4gICAgICAgICAgICBfY2VsbE9iai5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIGxldCBsdW5hciA9IGx1bmFyQ2FsZW5kYXIuZ2V0THVuYXIodGhpcy55ZWFyLCB0aGlzLm1vbnRoKzEsIGNvbnRlbnQpXHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmNvbnRlbnQgPSBjb250ZW50XHJcbiAgICAgICAgICAgIF9jZWxsT2JqLmlkID0gaWRcclxuICAgICAgICAgICAgX2NlbGxPYmoubGFibGUgPSBsYWJsZVxyXG4gICAgICAgICAgICBfY2VsbE9iai5zdHlsZSA9IHN0eWxlXHJcbiAgICAgICAgICAgIGxldCBsdW5hckluZm8gPSBcIlwiXHJcbiAgICAgICAgICAgIGlmIChsdW5hci5jYWxlbmRhcmljaXR5ICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIGx1bmFySW5mbyA9IGx1bmFyLmNhbGVuZGFyaWNpdHlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobHVuYXIuc29sYXJIb2xpZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5zb2xhckhvbGlkYXlcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobHVuYXIubHVuYXJIb2xpZGF5KSB7XHJcbiAgICAgICAgICAgICAgICBsdW5hckluZm8gPSBsdW5hci5sdW5hckhvbGlkYXlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmKGx1bmFyLmNoaW5hRGF5PT09XCLliJ3kuIBcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgbHVuYXJJbmZvID0gbHVuYXIuY2hpbmFNb250aCBcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGx1bmFySW5mbz0gbHVuYXIuY2hpbmFEYXlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihjb250ZW50ICE9IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgX2NlbGxPYmoubHVuYXJJbmZvID0gbHVuYXJJbmZvXHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgX2NlbGxPYmoubHVuYXJJbmZvID0gXCJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGRheUluV2Vla3MucHVzaChfY2VsbE9iailcclxuICAgICAgICB9XHJcbiAgICAgICAgd2Vla3MucHVzaChkYXlJbldlZWtzKVxyXG4gICAgICAgIHdpbmRvdy53ZWVrcyA9IHdlZWtzXHJcbiAgICB9XHJcbiAgICByZXR1cm4gd2Vla3NcclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuZ2V0RGF5Q291bnRzID0gZnVuY3Rpb24gKG1vbnRoLCB5ZWFyKSB7XHJcbiAgICBpZiAoMSA9PSBtb250aCkge1xyXG4gICAgICAgIHJldHVybiAoKDAgPT0geWVhciAlIDQpICYmICgwICE9ICh5ZWFyICUgMTAwKSkpIHx8ICgwID09IHllYXIgJSA0MDApID8gMjkgOiAyOFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXlDb3VudHNbbW9udGhdXHJcbiAgICB9XHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmdldFRvZGF5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF9vYmogPSB7fVxyXG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICBfb2JqLm5vdyA9IG5vd1xyXG4gICAgX29iai55ZWFyID0gbm93LmdldEZ1bGxZZWFyKCk7XHJcbiAgICBfb2JqLm1vbnRoID0gbm93LmdldE1vbnRoKCk7XHJcbiAgICBfb2JqLmRheSA9IG5vdy5nZXREYXRlKCk7XHJcbiAgICByZXR1cm4gX29ialxyXG59XHJcblxyXG5DYWxlbmRhci5wcm90b3R5cGUuc3ViTW9udGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoKHRoaXMubW9udGggLSAxKSA8IDApIHtcclxuICAgICAgICB0aGlzLm1vbnRoID0gMTE7XHJcbiAgICAgICAgdGhpcy55ZWFyID0gdGhpcy55ZWFyIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5tb250aCA9IHRoaXMubW9udGggLSAxO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coXCJtb250aDpcIiArIHRoaXMubW9udGgpXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLmFkZE1vbnRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCh0aGlzLm1vbnRoICsgMSkgPiAxMSkge1xyXG4gICAgICAgIHRoaXMubW9udGggPSAwO1xyXG4gICAgICAgIHRoaXMueWVhciA9IHRoaXMueWVhciArIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubW9udGggPSB0aGlzLm1vbnRoICsgMTtcclxuICAgIH1cclxufVxyXG5DYWxlbmRhci5wcm90b3R5cGUuc2V0TW9udGggPSBmdW5jdGlvbiAobW9udGgpIHtcclxuICAgIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMikge1xyXG4gICAgICAgIGFsZXJ0KFwi5pyI5Lu95b+F6aG75ZyoMS0xMuS5i+mXtCFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb250aCA9IG1vbnRoXHJcbn1cclxuQ2FsZW5kYXIucHJvdG90eXBlLnNldFllYXIgPSBmdW5jdGlvbiAoeWVhcikge1xyXG4gICAgdGhpcy55ZWFyID0geWVhclxyXG59XHJcblxyXG5cclxud2luZG93Lm1vdXNlT3ZlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkZGRkZGXCJcclxufVxyXG5cclxud2luZG93Lm1vdXNlT3V0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIHZhciBsYWJlbCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsYWJsZScpXHJcbiAgICBpZiAobGFiZWwgPT0gJ3NhdCcgfHwgbGFiZWwgPT0gJ3N1bicpIHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCIjRkYwMDAwXCJcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IFwiIzAwMDAwMFwiXHJcbiAgICB9XHJcblxyXG59XHJcbmxldCBtQ2FsZW5kYXIgPSBuZXcgQ2FsZW5kYXIoKVxyXG53aW5kb3cubUNhbGVuZGFyID0gbUNhbGVuZGFyXHJcbndpbmRvdy5jbGlja0RheSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBpZiAoZWxlbWVudC5pbm5lclRleHQgIT0gJycpIHtcclxuICAgICAgICB2YXIgZGF5ID0gbmV3IERhdGUobUNhbGVuZGFyLnllYXIsIG1DYWxlbmRhci5tb250aCwgZWxlbWVudC5pbm5lclRleHQpXHJcbiAgICAgICAgbUNhbGVuZGFyLnNlbGVjdERheSA9IGRheVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZVZpZXcoZWwsIGNhbGxiYWNrKSB7XHJcblxyXG4gICAgdmFyIHdlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgIGxldCBydiA9IG5ldyBSVih7XHJcbiAgICAgICAgZWw6IGVsLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgeWVhcjogJycgKyBtQ2FsZW5kYXIueWVhcixcclxuICAgICAgICAgICAgbW9udGg6ICcnICsgKG1DYWxlbmRhci5tb250aCArIDEpLFxyXG4gICAgICAgICAgICB3ZWVrVGl0bGVzOiBbe1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTFcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuS4gFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXkyXCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkuoxcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogXCJ3ZWVra2V5M1wiLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IFwi5LiJXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IFwid2Vla2tleTRcIixcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBcIuWbm1wiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiBcIndlZWtrZXk1XCIsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogXCLkupRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICB3ZWVrczogd2Vla3NcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRvbToge1xyXG4gICAgICAgICAgICB0YWc6IFwidGFibGVcIixcclxuICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgIGJvcmRlcjogMCxcclxuICAgICAgICAgICAgICAgIGNlbGxwYWRkaW5nOiAnMCcsXHJcbiAgICAgICAgICAgICAgICBjZWxsc3BhY2luZzogJzEnLFxyXG4gICAgICAgICAgICAgICAgaWQ6ICdjYWx0YWJsZScsXHJcbiAgICAgICAgICAgICAgICBrZXk6ICd0YWJsZScsXHJcbiAgICAgICAgICAgICAgICBzdHlsZTogJ3RleHQtZGVjb3JhdGlvbjpub25lO3dpZHRoOjIwMDtiYWNrZ3JvdW5kLWNvbG9yOiNEMEQwRUU7Zm9udC1zaXplOjhwdDtib3JkZXI6MHB4IGRvdHRlZCAjMUM2RkY1OydcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICB0YWc6IFwidGhlYWRcIixcclxuICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcInRoZWFkXCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICB0YWc6ICd0cicsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ246IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlnbjogXCJtaWRkbGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IFwidGl0bGVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnZm9udC13ZWlnaHQ6bm9ybWFsO2hlaWdodDoyNHB4O3RleHQtYWxpZ246Y2VudGVyO2NvbG9yOiMzMzMzMzM7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojQTRCOUQ3O2JvcmRlci10b3Atd2lkdGg6MXB4O2JvcmRlci1yaWdodC13aWR0aDoxcHg7Ym9yZGVyLWJvdHRvbS13aWR0aDogMXB4OyBib3JkZXItbGVmdC13aWR0aDogMXB4O2JvcmRlci1ib3R0b20tc3R5bGU6IDFweDtib3JkZXItdG9wLWNvbG9yOiAjOTk5OTk5O2JvcmRlci1yaWdodC1jb2xvcjogIzk5OTk5OTtib3JkZXItYm90dG9tLWNvbG9yOiM5OTk5OTk7Ym9yZGVyLWxlZnQtY29sb3I6Izk5OTk5OTsnXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiAndGQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sc3BhbjogXCI3XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICd0ZFRpdGxlJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2RpdicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ3RpdGxlRGl2J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jbGljazogXCJtQ2FsZW5kYXIuc3ViTW9udGgoKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2ZvbnQtd2VpZ2h0OmJvbGQ7IGNvbG9yOiMyNDNGNjU7Y3Vyc29yOmhhbmQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcInN1YkJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiPFwiXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogXCJpbnB1dFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwieWVhclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBcIjRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXNpemU6IDlwdDsgdGV4dC1kZWNvcmF0aW9uOiBub25lO2JhY2tncm91bmQtY29sb3I6ICNGRkZGRkY7aGVpZ2h0OiAyMHB4O2JvcmRlcjogMXB4IHNvbGlkICM2NjY2NjY7IGNvbG9yOiAjMDAwMDAwOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IFwiNFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJyUjeWVhciMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcImlucHV0WWVhclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiXCJdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcImlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJtb250aFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4bGVuZ3RoOiBcIjJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICclI21vbnRoIyUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2ZvbnQtc2l6ZTogOXB0OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7YmFja2dyb3VuZC1jb2xvcjogI0ZGRkZGRjtoZWlnaHQ6IDIwcHg7Ym9yZGVyOiAxcHggc29saWQgIzY2NjY2NjsgY29sb3I6ICMwMDAwMDA7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogXCIyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJpbnB1dE1vbnRoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCJcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICdidXR0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IFwibUNhbGVuZGFyLmFkZE1vbnRoKClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdmb250LXdlaWdodDogYm9sZDtjb2xvcjogIzI0M0Y2NTtjdXJzb3I6IGhhbmQ7dGV4dC1kZWNvcmF0aW9uOiBub25lOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCJhZGRCdXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIj5cIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGFnOiAndHInLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogJ2RheXRyJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY29sb3I6ICNGRjAwMDA7dGV4dC1kZWNvcmF0aW9uOiBub25lO2JhY2tncm91bmQtY29sb3I6ICNDMEQwRTg7dGV4dC1hbGlnbjogY2VudGVyO2hlaWdodDogMjBweDt3aWR0aDogMTIlOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICdkYXlTdW5UaXRsZSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIuaXpVwiXSxcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZzogJ3RkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnY29sb3I6IzAwMDAwMDtiYWNrZ3JvdW5kLWNvbG9yOiNDMEQwRTg7aGVpZ2h0OjIwcHg7d2lkdGg6MTElO3RleHQtYWxpZ246Y2VudGVyOycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiJSN2LmlkIyVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcjogXCJ2IF9pbl8gd2Vla1RpdGxlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCIlI3YudmFsdWUjJVwiXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJyBjb2xvcjojRkYwMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6I0MwRDBFODt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6IDIwcHg7d2lkdGg6IDEyJTsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiAnZGF5U2F0VGl0bGUnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXCLlha1cIl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG5cclxuICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRhZzogXCJ0Ym9keVwiLFxyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjZWxsc3BhY2luZzogXCIwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbHBhZGRpbmc6IFwiMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImNhbGVuZGFyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICcgdGV4dC1kZWNvcmF0aW9uOiBub25lO3dpZHRoOiAxNzA7YmFja2dyb3VuZC1jb2xvcjogI0MwRDBFODtmb250LXNpemU6IDlwdDtib3JkZXI6IDBweCBkb3R0ZWQgIzFDNkZBNTsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcInRib2R5XCJcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgICAgICAgICAgICB0YWc6ICd0cicsXHJcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6ICdjdXJzb3I6aGFuZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogXCIlI3dlZWsuaWQjJVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JfZm9yOiAnd2VlayBfaW5fIHdlZWtzJ1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YWc6ICd0ZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwiJSN2LmlkIyVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6ICdjbGlja0RheSh0aGlzKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJyUjdi5zdHlsZSMlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmxlOiAnJSN2LmxhYmxlIyUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZW92ZXI6ICdtb3VzZU92ZXIodGhpcyk7JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VPdXQ6ICdtb3VzZU91dCh0aGlzKTsnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGREb21EYXRhOlwidlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3I6ICd2IF9pbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hpbGRyZW46IFtcIiUjdi5jb250ZW50IyVcIl1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWc6IFwicFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk6IFwie25ldyBEYXRlKCkvMTAwfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1wiJSN2LmNvbnRlbnQjJVwiXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFnOiBcInBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBcIntuZXcgRGF0ZSgpLzEwMH1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcIiUjdi5sdW5hckluZm8jJVwiXVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXVxyXG4gICAgICAgICAgICAgICAgfSxdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgbGV0IG1vbnRoID0gbUNhbGVuZGFyWydtb250aCddXHJcbiAgICBsZXQgeWVhciA9IG1DYWxlbmRhclsneWVhciddXHJcbiAgICBsZXQgc2VsZWN0RGF5ID0gbUNhbGVuZGFyWydzZWxlY3REYXknXVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1DYWxlbmRhciwgJ21vbnRoJywge1xyXG5cclxuICAgICAgICBzZXQobnZhbHVlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3TW9udGg6XCIgKyBudmFsdWUpXHJcbiAgICAgICAgICAgIGlmIChtb250aCAhPSBudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG1vbnRoID0gbnZhbHVlXHJcbiAgICAgICAgICAgICAgICBydi5kYXRhLndlZWtzID0gbUNhbGVuZGFyLmdldFdlZWtzKClcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEubW9udGggPSAobnZhbHVlICsgMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbW9udGhcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1DYWxlbmRhciwgJ3llYXInLCB7XHJcbiAgICAgICAgc2V0KG52YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoeWVhciAhPSBudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3WWVhcjpcIiArIG52YWx1ZSlcclxuICAgICAgICAgICAgICAgIHllYXIgPSBudmFsdWVcclxuICAgICAgICAgICAgICAgIHJ2LmRhdGEud2Vla3MgPSBtQ2FsZW5kYXIuZ2V0V2Vla3MoKVxyXG4gICAgICAgICAgICAgICAgcnYuZGF0YS55ZWFyID0gbnZhbHVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFyXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobUNhbGVuZGFyLCAnc2VsZWN0RGF5Jywge1xyXG4gICAgICAgIHNldChudmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdERheSAhPSBudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdERheSA9IG52YWx1ZVxyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnZhbHVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXQoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxlY3REYXlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59IiwiY2xhc3MgTHVuYXJDYWxlbmRhciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvKipcdFxyXG4gICAgICogXHJcbiAgICAgKiDlhpzljoYxOTAwLTIxMDDnmoTmtqbmnIjkv6Hmga/ooaggXHJcbiAgICDljYHlha3ov5vliLblvaLlvI86XHJcbiAgICAweCB4eHh4eCAgICBcclxuICAgIOS6jOi/m+WItuW9ouW8jzpcclxuICAgIHh4eHhcdHh4eHhcdHh4eHhcdHh4eHhcdHh4eHhcclxuICAgIDIwLTE3XHQxNi0xMlx0MTItOVx0OC01XHQgICAgNC0xXHJcbsKgXHJcbiAgICAxLTQ6IOihqOekuuW9k+W5tOacieaXoOmXsOW5tO+8jOacieeahOivne+8jOS4uumXsOaciOeahOaciOS7ve+8jOayoeacieeahOivne+8jOS4ujDjgIJcclxuXHJcbiAgICA1LTE277ya5Li66Zmk5LqG6Zew5pyI5aSW55qE5q2j5bi45pyI5Lu95piv5aSn5pyI6L+Y5piv5bCP5pyI77yMMeS4ujMw5aSp77yMMOS4ujI55aSp44CCKOazqOaEj++8muS7jjHmnIjliLAxMuaciOWvueW6lOeahOaYr+esrDE25L2N5Yiw56ysNeS9jeOAgilcclxuICAgIDE3LTIw77yaIOihqOekuumXsOaciOaYr+Wkp+aciOi/mOaYr+Wwj+aciO+8jOS7heW9k+WtmOWcqOmXsOaciOeahOaDheWGteS4i+acieaEj+S5ieOAglxyXG5cclxuICAgIOS4vuS4quS+i+WtkO+8mlxyXG5cclxuICAgIDE5ODDlubTnmoTmlbDmja7mmK/vvJogMHgwOTViMCAweOS7o+ihqOWNgeWFrei/m+WItu+8jOWQjumdoueahOaYr+WNgeWFrei/m+WItuaVsOOAglxyXG4gICAgICAgICAgICAgMTAwMCAwMDAwIDAwMDAgMDAwMCAwMDAwXHJcbiAgICAgICAgICAgICAwMDAwIDAwMDAgMDAwMCAwMDAwIDExMTFcclxuXHJcbiAgICDkuozov5vliLbvvJogIDAwMDDCoDEwMDEgMDEwMSAxMDExIDAwMDBcclxuXHJcbiAgICDooajnpLoxOTgw5bm05rKh5pyJ6Zew5pyI77yM5LuOMeaciOWIsDEy5pyI55qE5aSp5pWw5L6d5qyh5Li677yaMzDjgIEyOeOAgTI544CBMzAg44CBMjnjgIEzMOOAgTI544CBMzDjgIEgMzDjgIEyOeOAgTMw44CBMzDjgIJcclxuXHJcbiAgICAxOTgy5bm055qE5pWw5o2u5piv77yaMHgwYTk3NFxyXG4gICAgICAgICAxMDEwICAgMTAwMSAwMTExIDAxMDBcclxuICAgIDAwMDAgMTAxMCAwIDEwMDEgMDExMSAwMTAwXHJcblxyXG4gICAg6KGo56S6MTk4MuW5tOeahDTmnIjkuLrpl7DmnIjvvIzljbPmnInnrKzkuozkuKo05pyI77yM5LiU5piv6Zew5bCP5pyI44CCXHJcblxyXG4gICAg5LuOMeaciOWIsDEz5pyI55qE5aSp5pWw5L6d5qyh5Li677yaMzDjgIEyOeOAgTMw44CBMjnjgIHCoDI5KOmXsOaciCnjgIEgMzDjgIEyOeOAgTI544CBMzDjgIEgMjnjgIEzMOOAgTMw44CBMzDjgIJcclxuXHJcbiAgXHJcbiAgKiBAQXJyYXkgT2YgUHJvcGVydHlcclxuICAqIEByZXR1cm4gSGV4IFxyXG4gICovXHJcbiAgICB0aGlzLl95ZWFySW5mbyA9IFsweDA0YmQ4LCAweDA0YWUwLCAweDBhNTcwLCAweDA1NGQ1LCAweDBkMjYwLCAweDBkOTUwLCAweDE2NTU0LCAweDA1NmEwLCAweDA5YWQwLCAweDA1NWQyLC8vMTkwMC0xOTA5XHJcbiAgICAgIDB4MDRhZTAsIDB4MGE1YjYsIDB4MGE0ZDAsIDB4MGQyNTAsIDB4MWQyNTUsIDB4MGI1NDAsIDB4MGQ2YTAsIDB4MGFkYTIsIDB4MDk1YjAsIDB4MTQ5NzcsLy8xOTEwLTE5MTlcclxuICAgICAgMHgwNDk3MCwgMHgwYTRiMCwgMHgwYjRiNSwgMHgwNmE1MCwgMHgwNmQ0MCwgMHgxYWI1NCwgMHgwMmI2MCwgMHgwOTU3MCwgMHgwNTJmMiwgMHgwNDk3MCwvLzE5MjAtMTkyOVxyXG4gICAgICAweDA2NTY2LCAweDBkNGEwLCAweDBlYTUwLCAweDA2ZTk1LCAweDA1YWQwLCAweDAyYjYwLCAweDE4NmUzLCAweDA5MmUwLCAweDFjOGQ3LCAweDBjOTUwLC8vMTkzMC0xOTM5XHJcbiAgICAgIDB4MGQ0YTAsIDB4MWQ4YTYsIDB4MGI1NTAsIDB4MDU2YTAsIDB4MWE1YjQsIDB4MDI1ZDAsIDB4MDkyZDAsIDB4MGQyYjIsIDB4MGE5NTAsIDB4MGI1NTcsLy8xOTQwLTE5NDlcclxuICAgICAgMHgwNmNhMCwgMHgwYjU1MCwgMHgxNTM1NSwgMHgwNGRhMCwgMHgwYTViMCwgMHgxNDU3MywgMHgwNTJiMCwgMHgwYTlhOCwgMHgwZTk1MCwgMHgwNmFhMCwvLzE5NTAtMTk1OVxyXG4gICAgICAweDBhZWE2LCAweDBhYjUwLCAweDA0YjYwLCAweDBhYWU0LCAweDBhNTcwLCAweDA1MjYwLCAweDBmMjYzLCAweDBkOTUwLCAweDA1YjU3LCAweDA1NmEwLC8vMTk2MC0xOTY5XHJcbiAgICAgIDB4MDk2ZDAsIDB4MDRkZDUsIDB4MDRhZDAsIDB4MGE0ZDAsIDB4MGQ0ZDQsIDB4MGQyNTAsIDB4MGQ1NTgsIDB4MGI1NDAsIDB4MGI2YTAsIDB4MTk1YTYsLy8xOTcwLTE5NzlcclxuICAgICAgMHgwOTViMCwgMHgwNDliMCwgMHgwYTk3NCwgMHgwYTRiMCwgMHgwYjI3YSwgMHgwNmE1MCwgMHgwNmQ0MCwgMHgwYWY0NiwgMHgwYWI2MCwgMHgwOTU3MCwvLzE5ODAtMTk4OVxyXG4gICAgICAweDA0YWY1LCAweDA0OTcwLCAweDA2NGIwLCAweDA3NGEzLCAweDBlYTUwLCAweDA2YjU4LCAweDA1NWMwLCAweDBhYjYwLCAweDA5NmQ1LCAweDA5MmUwLC8vMTk5MC0xOTk5XHJcbiAgICAgIDB4MGM5NjAsIDB4MGQ5NTQsIDB4MGQ0YTAsIDB4MGRhNTAsIDB4MDc1NTIsIDB4MDU2YTAsIDB4MGFiYjcsIDB4MDI1ZDAsIDB4MDkyZDAsIDB4MGNhYjUsLy8yMDAwLTIwMDlcclxuICAgICAgMHgwYTk1MCwgMHgwYjRhMCwgMHgwYmFhNCwgMHgwYWQ1MCwgMHgwNTVkOSwgMHgwNGJhMCwgMHgwYTViMCwgMHgxNTE3NiwgMHgwNTJiMCwgMHgwYTkzMCwvLzIwMTAtMjAxOVxyXG4gICAgICAweDA3OTU0LCAweDA2YWEwLCAweDBhZDUwLCAweDA1YjUyLCAweDA0YjYwLCAweDBhNmU2LCAweDBhNGUwLCAweDBkMjYwLCAweDBlYTY1LCAweDBkNTMwLC8vMjAyMC0yMDI5XHJcbiAgICAgIDB4MDVhYTAsIDB4MDc2YTMsIDB4MDk2ZDAsIDB4MDRhZmIsIDB4MDRhZDAsIDB4MGE0ZDAsIDB4MWQwYjYsIDB4MGQyNTAsIDB4MGQ1MjAsIDB4MGRkNDUsLy8yMDMwLTIwMzlcclxuICAgICAgMHgwYjVhMCwgMHgwNTZkMCwgMHgwNTViMiwgMHgwNDliMCwgMHgwYTU3NywgMHgwYTRiMCwgMHgwYWE1MCwgMHgxYjI1NSwgMHgwNmQyMCwgMHgwYWRhMCwvLzIwNDAtMjA0OVxyXG4gICAgICAweDE0YjYzLCAweDA5MzcwLCAweDA0OWY4LCAweDA0OTcwLCAweDA2NGIwLCAweDE2OGE2LCAweDBlYTUwLCAweDA2YjIwLCAweDFhNmM0LCAweDBhYWUwLC8vMjA1MC0yMDU5XHJcbiAgICAgIDB4MGEyZTAsIDB4MGQyZTMsIDB4MGM5NjAsIDB4MGQ1NTcsIDB4MGQ0YTAsIDB4MGRhNTAsIDB4MDVkNTUsIDB4MDU2YTAsIDB4MGE2ZDAsIDB4MDU1ZDQsLy8yMDYwLTIwNjlcclxuICAgICAgMHgwNTJkMCwgMHgwYTliOCwgMHgwYTk1MCwgMHgwYjRhMCwgMHgwYjZhNiwgMHgwYWQ1MCwgMHgwNTVhMCwgMHgwYWJhNCwgMHgwYTViMCwgMHgwNTJiMCwvLzIwNzAtMjA3OVxyXG4gICAgICAweDBiMjczLCAweDA2OTMwLCAweDA3MzM3LCAweDA2YWEwLCAweDBhZDUwLCAweDE0YjU1LCAweDA0YjYwLCAweDBhNTcwLCAweDA1NGU0LCAweDBkMTYwLC8vMjA4MC0yMDg5XHJcbiAgICAgIDB4MGU5NjgsIDB4MGQ1MjAsIDB4MGRhYTAsIDB4MTZhYTYsIDB4MDU2ZDAsIDB4MDRhZTAsIDB4MGE5ZDQsIDB4MGEyZDAsIDB4MGQxNTAsIDB4MGYyNTIsLy8yMDkwLTIwOTlcclxuICAgICAgMHgwZDUyMF0vLzIxMDBcclxuXHJcblxyXG4gICAgdGhpcy5fYXN0cm9sb2d5ID0gW1wi6a2U576vXCIsIFwi5rC055O2XCIsIFwi5Y+M6bG8XCIsIFwi55m9576KXCIsIFwi6YeR54mbXCIsIFwi5Y+M5a2QXCIsIFwi5beo6J+5XCIsIFwi54uu5a2QXCIsIFwi5aSE5aWzXCIsIFwi5aSp56ekXCIsIFwi5aSp6J2OXCIsIFwi5bCE5omLXCIsIFwi6a2U576vXCJdXHJcbiAgICAvKipcclxuICAgICAgKiDlhazljobmr4/kuKrmnIjku73nmoTlpKnmlbDmma7pgJrooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2RheUluTW9udGggPSBbMzEsIDI4LCAzMSwgMzAsIDMxLCAzMCwgMzEsIDMxLCAzMCwgMzEsIDMwLCAzMV1cclxuXHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOWkqeW5suWcsOaUr+S5i+WkqeW5sumAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fVGlhbkdhbiA9IFtcIueUslwiLCBcIuS5mVwiLCBcIuS4mVwiLCBcIuS4gVwiLCBcIuaIilwiLCBcIuW3sVwiLCBcIuW6mlwiLCBcIui+m1wiLCBcIuWjrFwiLCBcIueZuFwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOWkqeW5suWcsOaUr+S5i+WcsOaUr+mAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fRGlaaGkgPSBbXCLlrZBcIiwgXCLkuJFcIiwgXCLlr4VcIiwgXCLlja9cIiwgXCLovrBcIiwgXCLlt7NcIiwgXCLljYhcIiwgXCLmnKpcIiwgXCLnlLNcIiwgXCLphYlcIiwgXCLmiIxcIiwgXCLkuqVcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDnlJ/ogpbpgJ/mn6XooahcclxuICAgICAgKi9cclxuICAgIHRoaXMuX1pvZGlhYyA9IFtcIum8oFwiLCBcIueJm1wiLCBcIuiZjlwiLCBcIuWFlFwiLCBcIum+mVwiLCBcIuibh1wiLCBcIumprFwiLCBcIue+ilwiLCBcIueMtFwiLCBcIum4oVwiLCBcIueLl1wiLCBcIueMqlwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIDI06IqC5rCU6YCf5p+l6KGoXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9jYWxlbmRhcmljaXR5ID0gW1wi5bCP5a+SXCIsIFwi5aSn5a+SXCIsIFwi56uL5pilXCIsIFwi6Zuo5rC0XCIsIFwi5oOK6JuwXCIsIFwi5pil5YiGXCIsIFwi5riF5piOXCIsIFwi6LC36ZuoXCIsIFwi56uL5aSPXCIsIFwi5bCP5ruhXCIsIFwi6IqS56eNXCIsIFwi5aSP6IezXCIsIFwi5bCP5pqRXCIsIFwi5aSn5pqRXCIsIFwi56uL56eLXCIsIFwi5aSE5pqRXCIsIFwi55m96ZyyXCIsIFwi56eL5YiGXCIsIFwi5a+S6ZyyXCIsIFwi6Zyc6ZmNXCIsIFwi56uL5YasXCIsIFwi5bCP6ZuqXCIsIFwi5aSn6ZuqXCIsIFwi5Yas6IezXCJdXHJcbiAgICAvKipcclxuICAgICAg5Yac5Y6G6IqC5pelXHJcbiAgICAqL1xyXG4gICAgdGhpcy5fbHVuYXJIb2xpZGF5ID0gW1wiMDEwMSDmmKXoioJcIiwgXCIwMTE1IOWFg+WutVwiLCBcIjA1MDUg56uv5Y2IXCIsIFwiMDcwNyDmg4XkurpcIiwgXCIwNzE1IOS4reWFg1wiLFxyXG4gICAgICBcIjA4MTUg5Lit56eLXCIsIFwiMDkwOSDph43pmLNcIiwgXCIxMjA4IOiFiuWFq1wiLCBcIjEyMjQg5bCP5bm0XCIsIFwiMTIzMCDpmaTlpJVcIl1cclxuICAgIC8qXHJcbiAgICAg5YWs5Y6G6IqC5pelXHJcbiAgICAqL1xyXG4gICAgdGhpcy5fc29sYXJIb2xpZGF5ID0gW1xyXG4gICAgICBcIjAxMDEg5YWD5pemXCIsIFwiMDIxNCDmg4XkurpcIiwgXCIwMzA4IOWmh+Wls1wiLCBcIjAzMTIg5qSN5qCRXCIsIFwiMDMxNSDmtojotLnogIXmnYPnm4rml6VcIiwgXCIwNDAxIOaEmuS6ulwiLCBcIjA1MDEg5Yqz5YqoXCIsIFwiMDUwNCDpnZLlubRcIiwgLy9cclxuICAgICAgXCIwNTEyIOaKpOWjq1wiLCBcIjA2MDEg5YS/56ulXCIsIFwiMDcwMSDlu7rlhZpcIiwgXCIwODAxIOW7uuWGm1wiLCBcIjA4MDgg54i25LqyXCIsIFwiMDkxMCDmlZnluIhcIiwgXCIwOTI4IOWtlOWtkOivnui+sFwiLCAvL1xyXG4gICAgICBcIjEwMDEg5Zu95bqGXCIsIFwiMTAyNCDogZTlkIjlm73ml6VcIiwgXCIxMTEyIOWtmeS4reWxseivnui+sOe6quW/tVwiLCBcIjEyMjAg5r6z6Zeo5Zue5b2S57qq5b+1XCIsIFwiMTIyNSDlnKPor55cIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiAxOTAwLTIxMDDlkITlubTlhpzljobnmoQyNOiKguawlOaXpeacn+mAn+afpeihqFxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2FsZW5kYXJpY2l0eVRhYmxlID0gWyc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODA4MmM5NWY4Yzk2NWNjOTIwZicsXHJcbiAgICAgICc5N2JkMGIwNmJkYjA3MjJjOTY1Y2UxY2ZjYzkyMGYnLCAnYjAyNzA5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsXHJcbiAgICAgICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDBiMDZiZGIwNzIyYzk2NWNlMWNmY2M5MjBmJywgJ2IwMjcwOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwYjA2YmRiMDcyMmM5NjVjZTFjZmNjOTIwZicsXHJcbiAgICAgICdiMDI3MDk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTc3ODM5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZicsXHJcbiAgICAgICc5N2JkMDk4MDFkOTgwODJjOTVmOGUxY2ZjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDE5N2MzNmM5MjEwYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGUnLCAnOTdiZDA5ODAxZDk4MDgyYzk1ZjhlMWNmY2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzk1ZjhjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODA4MmM5NWY4ZTFjZmNjOTIwZicsXHJcbiAgICAgICc5N2JkMDk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YzkyMTBjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsXHJcbiAgICAgICc5N2JjZjk3YzM1OTgwODJjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDgyYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmOTdjMzU5ODAxZWM5NWY4Yzk2NWNjOTIwZicsXHJcbiAgICAgICc5N2JkMDk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsXHJcbiAgICAgICc5N2JjZjk3YzM1OTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y5N2MzNTk4MDFlYzk1ZjhjOTY1Y2M5MjBmJywgJzk3YmQwOTdiZDA3ZjU5NWIwYjZmYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMTk4MDFlYzkyMTBjOTI3NGM5MjBlJywgJzk3YjZiOTdiZDE5ODAxZWM5NWY4Yzk2NWNjOTIwZicsXHJcbiAgICAgICc5N2JkMDdmNTMwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTIwZScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTVmOGM5NjVjYzkyMGYnLCAnOTdiZDA3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZjOTIxMGM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmQwN2YxNDg3ZjU5NWIwYjBiYzkyMGZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsXHJcbiAgICAgICc5N2JjZjdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5NjVjYzkyMGUnLCAnOTdiY2Y3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI5N2JkMTk4MDFlYzkyMTBjOTY1Y2M5MjBlJywgJzk3YmNmN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiOTdiZDE5ODAxZWM5MjEwYzk2NWNjOTIwZScsXHJcbiAgICAgICc5N2JjZjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2Yjk3YmQxOTgwMWVjOTIxMGM5Mjc0YzkyMGUnLCAnOTdiY2Y3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzkxYWEnLCAnOTdiNmI5N2JkMTk3YzM2YzkyMTBjOTI3NGM5MjBlJywgJzk3YmNmN2YwZTQ3ZjUzMWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzOTdiZDA5N2MzNmM5MjEwYzkyNzRjOTIwZScsXHJcbiAgICAgICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNmIwYjZmYzkyMTBjOGRjMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI3MGM5Mjc0YzkxYWEnLCAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUzN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsXHJcbiAgICAgICc3ZjBlMjdmMTQ4N2Y1OTViMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5Mjc0YzkxYWEnLCAnOTdiNmI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTI3NGM5MWFhJywgJzk3YjZiN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsXHJcbiAgICAgICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzOTdiZDA5N2MzNmIwYjZmYzkyNzRjOTFhYScsXHJcbiAgICAgICc5N2I2YjdmMGU0N2Y1MzFiMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4Mzk3YmQwOTdjMzZiMGI2ZmM5MjEwYzkxYWEnLCAnOTdiNmI3ZjBlNDdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM5N2JkMDk3YzM2YjBiNmZjOTIxMGM4ZGMyJywgJzk3NzgzN2YwZTM3ZjE0OWIwNzIzYjA3ODdiMDcyMScsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjUzMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMTBjOGRjMicsXHJcbiAgICAgICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUzN2YxNDg3ZjU5NWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwOTdjMzViMGI2ZmM5MjEwYzhkYzInLCAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsXHJcbiAgICAgICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDk3YzM1YjBiNmZjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA5N2MzNWIwYjZmYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsXHJcbiAgICAgICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM5N2JkMDdmNTk1YjBiMGJjOTIwZmIwNzIyJywgJzk3NzgzN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzOTdiZDA3ZjU5NWIwYjBiYzkyMGZiMDcyMicsXHJcbiAgICAgICc5Nzc4MzdmMGUzN2YxNDk5ODA4MmIwNzIzYjA2YmQnLCAnN2YwN2U3ZjBlMzdmMTQ5YjA3MjNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzk3YmQwN2Y1OTViMGIwYmM5MjBmYjA3MjInLCAnOTc3ODM3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM3ZjE0ODdmNTk1YjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsXHJcbiAgICAgICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsXHJcbiAgICAgICc3ZjBlMzdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI3ZjE0ODdmNTMxYjBiMGJiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM3ZjE0ODk4MDgyYjA3MjI5N2MzNScsXHJcbiAgICAgICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjE0OWIwNzIzYjA3ODdiMDcyMScsXHJcbiAgICAgICc3ZjBlMjdmMTQ4N2Y1MzFiMGIwYmIwYjZmYjA3MjInLCAnN2YwZTM3ZjBlMzY2YWE4OTgwMWViMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3MjNiMDZiZCcsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2YxNDliMDcyM2IwNzg3YjA3MjEnLCAnN2YwZTI3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzN2YwZTM2NmFhODk4MDFlYjA3MjI5N2MzNScsXHJcbiAgICAgICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzIzYjA2YmQnLCAnN2YwN2U3ZjBlMzdmMTQ5OTgwODNiMDc4N2IwNzIxJywgJzdmMGUyN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMicsXHJcbiAgICAgICc3ZjBlMzdmMGUzNjZhYTg5ODAxZWIwNzIyOTdjMzUnLCAnN2VjOTY3ZjBlMzdmMTQ4OTgwODJiMDcyM2IwMmQ1JywgJzdmMDdlN2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDcyMScsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjInLCAnN2YwZTM2NjY1YjY2YWE4OTgwMWU5ODA4Mjk3YzM1JywgJzY2NWY2N2YwZTM3ZjE0ODk4MDgyYjA3MjNiMDJkNScsXHJcbiAgICAgICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA3MjEnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIyJywgJzdmMGUzNjY2NWI2NmE0NDk4MDFlOTgwODI5N2MzNScsXHJcbiAgICAgICc2NjVmNjdmMGUzN2YxNDg5ODA4MmIwNzIzYjAyZDUnLCAnN2VjOTY3ZjBlMzdmMTQ5OTgwODJiMDc4N2IwNmJkJywgJzdmMDdlN2YwZTQ3ZjUzMWIwNzIzYjBiNmZiMDcyMScsXHJcbiAgICAgICc3ZjBlMzY2NjViNjZhNDQ5ODAxZTk4MDgyOTdjMzUnLCAnNjY1ZjY3ZjBlMzdmMTQ4OTgwODJiMDcyMjk3YzM1JywgJzdlYzk2N2YwZTM3ZjE0OTk4MDgyYjA3ODdiMDZiZCcsXHJcbiAgICAgICc3ZjA3ZTdmMGU0N2Y1MzFiMDcyM2IwYjZmYjA3MjEnLCAnN2YwZTI2NjY1YjY2YTQ0OTgwMWU5ODA4Mjk3YzM1JywgJzY2NWY2N2YwZTM3ZjE0ODk4MDFlYjA3MjI5N2MzNScsXHJcbiAgICAgICc3ZWM5NjdmMGUzN2YxNDk5ODA4MmIwNzg3YjA2YmQnLCAnN2YwN2U3ZjBlNDdmNTMxYjA3MjNiMGI2ZmIwNzIxJywgJzdmMGUyN2YxNDg3ZjUzMWIwYjBiYjBiNmZiMDcyMiddXHJcblxyXG4gICAgLyoqXHJcbiAgICAgICog5Lit5paH5pel5pyfXHJcbiAgICAgICovXHJcbiAgICB0aGlzLl9jaGluZXNlQ2hhciA9IFtcIuaXpVwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiXVxyXG5cclxuICAgIC8qKlxyXG4gICAgICAqIOWGnOWOhui/m+WItuWNleS9jVxyXG4gICAgICAqL1xyXG4gICAgdGhpcy5fY2hpbmVzZVRlbkNoYXIgPSBbXCLliJ1cIiwgXCLljYFcIiwgXCLlu79cIiwgXCLljYVcIl1cclxuXHJcbiAgICAvKipcclxuICAgICAgKiDmnIjku73lhpzljobooajnpLpcclxuICAgICAgKi9cclxuICAgIHRoaXMuX2x1bmFyTW9udGhUYWJsZSA9IFtcIuato1wiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiLCBcIuS4g1wiLCBcIuWFq1wiLCBcIuS5nVwiLCBcIuWNgVwiLCBcIuWGrFwiLCBcIuiFilwiXVxyXG5cclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnllYXLlubTkuIDmlbTlubTnmoTmgLvlpKnmlbBcclxuICAgICovXHJcbiAgX2x1bmFyWWVhckRheXMoeWVhcikge1xyXG4gICAgdmFyIGksIHN1bSA9IDM0ODtcclxuICAgIGZvciAoaSA9IDB4ODAwMDsgaSA+IDB4ODsgaSA+Pj0gMSkgeyBzdW0gKz0gKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmIGkpID8gMSA6IDA7IH1cclxuICAgIHJldHVybiAoc3VtICsgdGhpcy5fbGVhcERheXNJbkx1bmFyWWVhcih5ZWFyKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOWvueW6lOeahOmXsOaciFxyXG4gICAgKi9cclxuICBfbGVhcE1vbnRoSW5MdW5hclllYXIoeWVhcikge1xyXG4gICAgcmV0dXJuICh0aGlzLl95ZWFySW5mb1t5ZWFyIC0gMTkwMF0gJiAweDAwMDBmKTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnnlubTpl7DmnIjnmoTlpKnmlbAg6Iul6K+l5bm05rKh5pyJ6Zew5pyI5YiZ6L+U5ZueMFxyXG4gICAgKi9cclxuICBfbGVhcERheXNJbkx1bmFyWWVhcih5ZWFyKSB7XHJcbiAgICBpZiAodGhpcy5fbGVhcE1vbnRoSW5MdW5hclllYXIoeWVhcikpIHtcclxuICAgICAgcmV0dXJuICgodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgMHgxMDAwMCkgPyAzMCA6IDI5KTtcclxuICAgIH1cclxuICAgIHJldHVybiAoMCk7XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOi/lOWbnuWGnOWOhnllYXLlubRtb250aOaciO+8iOmdnumXsOaciO+8ieeahOaAu+WkqeaVsO+8jFxyXG4gICAgKi9cclxuICBfbW9udGhEYXlzKHllYXIsIG1vbnRoKSB7XHJcbiAgICBpZiAobW9udGggPiAxMiB8fCBtb250aCA8IDEpIHsgcmV0dXJuIC0xIH0vL+aciOS7veWPguaVsOS7jjHoh7MxMu+8jOWPguaVsOmUmeivr+i/lOWbni0xXHJcblxyXG4gICAgY29uc29sZS5sb2coXCJfbW9udGhEYXlzOlwiICsgKHRoaXMuX3llYXJJbmZvW3llYXIgLSAxOTAwXSAmICgweDEwMDAwID4+IG1vbnRoKSkpXHJcblxyXG4gICAgcmV0dXJuICgodGhpcy5feWVhckluZm9beWVhciAtIDE5MDBdICYgKDB4MTAwMDAgPj4gbW9udGgpKSA/IDMwIDogMjkpO1xyXG4gIH1cclxuICAvKipcclxuICAgICog6L+U5Zue5YWs5Y6GeWVhcuW5tG1vbnRo5pyI55qE5aSp5pWwXHJcbiAgICAqL1xyXG4gIF9nZXREYXlzSW5Nb250aCh5ZWFyLCBtb250aCkge1xyXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPCAxKSB7IHJldHVybiAtMSB9IC8v6Iul5Y+C5pWw6ZSZ6K+vIOi/lOWbni0xXHJcbiAgICBsZXQgbXMgPSBtb250aCAtIDE7XHJcbiAgICBpZiAobXMgPT0gMSkgeyAvLzLmnIjku73nmoTpl7DlubPop4TlvovmtYvnrpflkI7noa7orqTov5Tlm54yOOaIljI5XHJcbiAgICAgIHJldHVybiAoKCh5ZWFyICUgNCA9PSAwKSAmJiAoeWVhciAlIDEwMCAhPSAwKSB8fCAoeWVhciAlIDQwMCA9PSAwKSkgPyAyOSA6IDI4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5fZGF5SW5Nb250aFttc10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5Yac5Y6G5bm05Lu96L2s5o2i5Li65bmy5pSv57qq5bm0XHJcbiAgICAgIOW5suaUr+e6quW5tOazlVxyXG7jgIDjgIAgICAgIOWkqeW5suWcsOaUr+ihqFxyXG7jgIDjgIAgICAwMS7nlLLlrZAgMDIu5LmZ5LiRIDAzLuS4meWvhSAwNC7kuIHlja8gMDUu5oiK6L6wIDA2LuW3seW3syAwNy7luprljYggMDgu6L6b5pyqIDA5LuWjrOeUsyAxMC7nmbjphYlcclxu44CAICAg44CAICAgMTEu55Sy5oiMIDEyLuS5meS6pSAxMy7kuJnlrZAgMTQu5LiB5LiRIDE1LuaIiuWvhSAxNi7lt7Hlja8gMTcu5bqa6L6wIDE4Lui+m+W3syAxOS7lo6zljYggMjAu55m45pyqXHJcbuOAgCAgIOOAgCAgIDIxLueUsueUsyAyMi7kuZnphYkgMjMu5LiZ5oiMIDI0LuS4geS6pSAyNS7miIrlrZAgMjYu5bex5LiRIDI3LuW6muWvhSAyOC7ovpvlja8gMjku5aOs6L6wIDMwLueZuOW3s1xyXG7jgIAgIOOAgCAgICAzMS7nlLLljYggMzIu5LmZ5pyqIDMzLuS4meeUsyAzNC7kuIHphYkgMzUu5oiK5oiMIDM2LuW3seS6pSAzNy7luprlrZAgMzgu6L6b5LiRIDM5LuS7u+WvhSA0MC7nmbjlja9cclxu44CAICAg44CAICAgNDEu55Sy6L6wIDQyLuS5meW3syA0My7kuJnljYggNDQu5LiB5pyqIDQ1LuaIiueUsyA0Ni7lt7HphYkgNDcu5bqa5oiMIDQ4Lui+m+S6pSA0OS7lo6zlrZAgNTAu55m45LiRXHJcbuOAgOOAgCAgICAgIDUxLueUsuWvhSA1Mi7kuZnlja8gNTMu5LiZ6L6wIDU0LuS4geW3sSA1NS7miIrljYggNTYu5bex5pyqIDU3LuW6mueUsyA1OC7ovpvphYkgNTku5aOs5oiMIDYwLueZuOS6pVxyXG4gICAgIOeUqOmYs+WOhueahOW5tOS7vemZpOS7pTYw5b6X5Yiw55qE5bm05Lu95YaN5YeP5Y67M+WwseaYr+i/meS4gOW5tOWGnOWOhueahOW5suaUr+W6j+WPt+aVsO+8jOafpeW5suaUr+ihqOW+l+WIsOW5suaUr+W5tOe6qu+8jFxyXG4gICAgIOiLpeW+l+WHuuadpeeahOaVsOaNruWwj+S6jumbtuaIluiAheetieS6jumbtuWImeWKoOS4ijYw5Y2z5Y+v44CCXHJcbiAgICAg5Li+5Liq5L6L5a2Q77ya5rGCMjAxOeW5tOW5suaUr++8jDIwMTnDtzYw77ydMzPkvZkzOe+8jOW5tOW5suaUr+W6j+WPt+aVsD0zOS0zPTM277yMXHJcbiAgICAg5omA5Lul5b6X55+l5LuK5bm05piv5bex5Lql5bm044CC5bmy5pSv57qq5bm06YO95piv5LuO5q+P5bm055qE56uL5pil5byA5aeL55qE77yM5LiN566h56uL5pil5Zyo5YmN5LiA5bm055qE6IWK5pyI6L+Y5piv5paw5LiA5bm055qE5q2j5pyI77yM56uL5pil5byA5aeL5omN566X5paw55qE5LiA5bm044CCXHJcbiAgICovXHJcbiAgX2dldEdhblpoaVllYXIoeWVhcikge1xyXG4gICAgdmFyIGdhbktleSA9ICh5ZWFyIC0gMykgJSAxMDtcclxuICAgIHZhciB6aGlLZXkgPSAoeWVhciAtIDMpICUgMTI7XHJcbiAgICBpZiAoZ2FuS2V5ID09IDApIGdhbktleSA9IDEwOy8v5aaC5p6c5L2Z5pWw5Li6MOWImeS4uuacgOWQjuS4gOS4quWkqeW5slxyXG4gICAgaWYgKHpoaUtleSA9PSAwKSB6aGlLZXkgPSAxMjsvL+WmguaenOS9meaVsOS4ujDliJnkuLrmnIDlkI7kuIDkuKrlnLDmlK9cclxuICAgIHJldHVybiB0aGlzLl9UaWFuR2FuW2dhbktleSAtIDFdICsgdGhpcy5fRGlaaGlbemhpS2V5IC0gMV07XHJcblxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5YWs5Y6G5pyI44CB5pel5Yik5pat5omA5bGe5pif5bqnXHJcbiAgICovXHJcbiAgX2dldEFzdHJvbG9neShjTW9udGgsIGNEYXkpIHtcclxuICAgIHZhciBhcnIgPSBbMjAsIDE5LCAyMSwgMjEsIDIxLCAyMiwgMjMsIDIzLCAyMywgMjMsIDIyLCAyMl07XHJcbiAgICByZXR1cm4gdGhpcy5fYXN0cm9sb2d5W2NNb250aCAtIChjRGF5IDwgYXJyW2NNb250aCAtIDFdID8gMSA6IDApXSArIFwi5bqnXCI7Ly/luqdcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAgKiBcclxuICAgIOWkqeW5suS4gOWFseacieWNgeS4qu+8jOWIhuWIq+acieeUsuOAgeS5meOAgeS4meOAgeS4geOAgeaIiuOAgeW3seOAgeW6muOAgei+m+OAgeWjrOOAgeeZuOOAguWcsOaUr+S4gOWFseacieWNgeS6jOS4qu+8jOWIhuWIq+acieWtkOOAgeS4keOAgeWvheOAgeWNr+OAgei+sOOAgeW3s+OAgeWNiOOAgeacquOAgeeUs+OAgemFieOAgeaIjOOAgeS6peOAguW5suaUr+i/mOaciemYtOmYs+S5i+WIhu+8jOeUsuOAgeS4meOAgeaIiuOAgeW6muOAgeWjrOS4uumYs+W5su+8jOS5meOAgeS4geOAgeW3seOAgei+m+OAgeeZuOS4uumYtOW5suOAguWtkOOAgeWvheOAgei+sOOAgeWNiOOAgeeUs+OAgeaIjOS4uumYs+aUr++8jOS4keOAgeWNr+OAgeW3s+OAgeacquOAgemFieOAgeS6peS4uumYtOaUr++8jOS4gOS4quWkqeW5suWSjOS4gOS4quWcsOaUr+ebuOmFje+8jOaOkuWIl+i1t+adpe+8jOWkqeW5suWcqOWJje+8jOWcsOaUr+WcqOWQju+8jOWkqeW5sueUseeUsui1t++8jOWcsOaUr+eUseWtkOi1t++8jOmYs+W5sumFjemYs+aUr++8jOmYtOW5sumFjemYtOaUr++8jOWFseacieWFreWNgeS4que7hOWQiOOAguWPpOS6uuWwseeUqOi/mTYw5Liq57uE5ZCI5b6q546v6LW35p2l57qq5bm077yM57qq5pyI77yM57qq5pel77yM57qq5pe244CCXHJcblxyXG4gICAg57qq5bm077yM5Lit5Zu95Y+k5Lq655SoNjDkuKrnu4TlkIjkvp3mrKHnuqrlubTvvIzkuIDlubTkuIDkuKrnu4TlkIjvvIzvvIzlubLmlK/nuqrlubTvvIzkuIDkuKrlkajmnJ/nmoTnrKzkuIDlubTkuLrnlLLlrZDvvIznrKzkuozlubTkuLrkuZnkuJHvvIzkvp3mrKHnsbvmjqjvvIw2MOW5tOS4gOS4qui9ruWbnu+8jOavj+S4gOS4quaWsOW5tOW8gOWni+S6juato+aciOWIneS4gOeahOato+WtkOaXtuOAglxyXG5cclxuICAgIOe6quaciO+8jOW5suaUr+e6quaciO+8jOmHh+eUqOavj+S4quWcsOaUr+WvueW6lDI06IqC5rCU6Ieq5p+Q6IqC5rCU6Iez5LiL5LiA5Liq6IqC5rCU77yM5Lul5Lqk57uT5pe26Ze05Yaz5a6a6LW35aeL55qE5LiA5Liq5pyI5pyf6Ze044CC5bmy5pSv57qq5pyI5piv5bmy5pSv5Y6G55qE5LiA6YOo5YiG77yM5Li76KaB55So5LqO6aOO5rC05pyv5pyv562J6aKG5Z+f77yM6L+Z5L2/5b6X5bmy5pSv5Y6G5LiA55u05Zyo5a6Y5pa55ZKM5rCR6Ze06YO95rWB5Lyg5LiN6KGw44CCXHJcblxyXG4gICAg57qq5pel77yM57qq5pel5piv5bmy5pSv55qE5pyA5pep55So5rOV77yM5LiA5Liq5pi85aSc5piv5LiA5aSp77yM55SoNjDkuKrnu4TlkIjmnaXkvp3mrKHnuqrml6XvvIzmr5TlpoLku4rlpKnmmK/nlLLlrZDml6XvvIzmmI7lpKnlsLHmmK/kuZnkuJHml6XvvIw2MOWkqeS4gOS4quW+queOr++8jOaWsOeahOS4gOWkqeS7juato+WtkOWNiOW8gOWni++8jOS4reWbveaYjuehruWPr+afpeeahOW5suaUr+e6quaXpe+8jOaYr+aYpeeni+mygemakOWFrOS4ieW5tO+8iOWFrOWFg+WJjTcyMOW5tO+8ie+8jOi3neS7iuW3sue7j+aciTI3MDDlpJrlubTkuobvvIzov5nmmK/ov4Tku4rkuLrmraLmmK/kuJbnlYzkuIrmnIDml6nnmoTorrDml6Xms5XjgIJcclxuICAgICAgICBcclxuICAgIFxyXG4gICAg5Lyg5YWlb2Zmc2V05YGP56e76YeP6L+U5Zue5bmy5pSvIFxyXG4gICAgKi9cclxuICBfZ2V0R2FuWmhpKG9mZnNldCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX1RpYW5HYW5bb2Zmc2V0ICUgMTBdICsgdGhpcy5fRGlaaGlbb2Zmc2V0ICUgMTJdO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICDlhazljoZ5ZWFy5bm06I635b6X6K+l5bm056ysaW5kZXjkuKroioLmsJTnmoTlhazljobml6XmnJ9cclxuICAgICovXHJcbiAgX2dldENhbGVuZGFyaWNpdHkoeWVhciwgaW5kZXgpIHtcclxuICAgIGlmICh5ZWFyIDwgMTkwMCB8fCB5ZWFyID4gMjEwMCkge1xyXG4gICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPCAxIHx8IGluZGV4ID4gMjQpIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgdmFyIF90YWJsZSA9IHRoaXMuX2NhbGVuZGFyaWNpdHlUYWJsZVt5ZWFyIC0gMTkwMF07XHJcbiAgICB2YXIgX2NhbGVuZGFyaWNpdHlJbmZvID0gW1xyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigwLCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoNSwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDEwLCA1KSkudG9TdHJpbmcoKSxcclxuICAgICAgcGFyc2VJbnQoJzB4JyArIF90YWJsZS5zdWJzdHIoMTUsIDUpKS50b1N0cmluZygpLFxyXG4gICAgICBwYXJzZUludCgnMHgnICsgX3RhYmxlLnN1YnN0cigyMCwgNSkpLnRvU3RyaW5nKCksXHJcbiAgICAgIHBhcnNlSW50KCcweCcgKyBfdGFibGUuc3Vic3RyKDI1LCA1KSkudG9TdHJpbmcoKVxyXG4gICAgXTtcclxuXHJcbiAgICB2YXIgX2NhbGRheSA9IFtcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzBdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzBdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzBdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzBdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1sxXS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1sxXS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1sxXS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1sxXS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMl0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMl0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMl0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bMl0uc3Vic3RyKDQsIDIpLFxyXG5cclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzNdLnN1YnN0cigwLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzNdLnN1YnN0cigxLCAyKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzNdLnN1YnN0cigzLCAxKSxcclxuICAgICAgX2NhbGVuZGFyaWNpdHlJbmZvWzNdLnN1YnN0cig0LCAyKSxcclxuXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s0XS5zdWJzdHIoMCwgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s0XS5zdWJzdHIoMSwgMiksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s0XS5zdWJzdHIoMywgMSksXHJcbiAgICAgIF9jYWxlbmRhcmljaXR5SW5mb1s0XS5zdWJzdHIoNCwgMiksXHJcblxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNV0uc3Vic3RyKDAsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNV0uc3Vic3RyKDEsIDIpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNV0uc3Vic3RyKDMsIDEpLFxyXG4gICAgICBfY2FsZW5kYXJpY2l0eUluZm9bNV0uc3Vic3RyKDQsIDIpLFxyXG4gICAgXTtcclxuICAgIHJldHVybiBwYXJzZUludChfY2FsZGF5W2luZGV4IC0gMV0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOWGnOWOhuaxieivreihqOekulxyXG4gICAgKi9cclxuICBfZ2V0Q2hpbmFNb250aChtb250aCkge1xyXG4gICAgaWYgKG1vbnRoID4gMTIgfHwgbW9udGggPCAxKSB7XHJcbiAgICAgIHJldHVybiAtMVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGAke3RoaXMuX2x1bmFyTW9udGhUYWJsZVttb250aCAtIDFdfeaciGA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgICrlhpzljobml6XmnJ/ml6XooajnpLpcclxuICAgICovXHJcbiAgX2dldENoaW5hRGF5KGRheSkge1xyXG4gICAgbGV0IHM7XHJcbiAgICBzd2l0Y2ggKGRheSkge1xyXG4gICAgICBjYXNlIDEwOlxyXG4gICAgICAgIHMgPSAn5Yid5Y2BJzsgYnJlYWs7XHJcbiAgICAgIGNhc2UgMjA6XHJcbiAgICAgICAgcyA9ICfkuozljYEnOyBicmVhaztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAzMDpcclxuICAgICAgICBzID0gJ+S4ieWNgSc7IGJyZWFrO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHMgPSB0aGlzLl9jaGluZXNlVGVuQ2hhcltNYXRoLmZsb29yKGRheSAvIDEwKV07XHJcbiAgICAgICAgcyArPSB0aGlzLl9jaGluZXNlQ2hhcltkYXkgJSAxMF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gKHMpO1xyXG4gIH1cclxuICAvKlxyXG4gIOi/lOWbnuWGnOWOhuiKguaXpVxyXG4gICovXHJcbiAgX2dldEx1bmFySG9saWRheShtb250aCwgZGF5KSB7XHJcbiAgICBsZXQgbHVuYXJIb2xpZGF5U3RyID0gXCJcIlxyXG4gICAgdGhpcy5fbHVuYXJIb2xpZGF5LmZvckVhY2gobHVuYXIgPT4ge1xyXG4gICAgICBsZXQgbGQgPSBsdW5hci5zcGxpdChcIiBcIilbMF07XHJcbiAgICAgIGxldCBsZHYgPSBsdW5hci5zcGxpdChcIiBcIilbMV07XHJcbiAgICAgIGxldCBsbW9udGhfdiA9IG1vbnRoICsgXCJcIjtcclxuICAgICAgbGV0IGxkYXlfdiA9IGRheSArIFwiXCI7XHJcbiAgICAgIGxldCBsbWQgPSBcIlwiO1xyXG4gICAgICBpZiAobW9udGggPCAxMCkge1xyXG4gICAgICAgIGxtb250aF92ID0gXCIwXCIgKyBtb250aDtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZGF5IDwgMTApIHtcclxuICAgICAgICBsZGF5X3YgPSBcIjBcIiArIGRheTtcclxuICAgICAgfVxyXG4gICAgICBsbWQgPSBsbW9udGhfdiArIGxkYXlfdjtcclxuICAgICAgY29uc29sZS5sb2coXCJsbWQ6XCIgKyBsbWQpXHJcbiAgICAgIGlmIChsZC50cmltKCkgPT09IGxtZC50cmltKCkpIHtcclxuICAgICAgICBsdW5hckhvbGlkYXlTdHIgPSBsZHZcclxuICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBsdW5hckhvbGlkYXlTdHJcclxuICB9XHJcbiAgLyoqXHJcbiAqIOi/lOWbnuWvueW6lOaXpeacn+eahOWFrOWOhuiKguaXpVxyXG4gKi9cclxuICBfZ2V0U29sYXJIb2xpZGF5KG1vbnRoLCBkYXkpIHtcclxuICAgIGxldCBzb2xhckhvbGlkYXlTdHIgPSBcIlwiO1xyXG4gICAgdGhpcy5fc29sYXJIb2xpZGF5LmZvckVhY2goc29sYXIgPT4ge1xyXG5cclxuICAgICAgbGV0IHNkID0gc29sYXIuc3BsaXQoXCIgXCIpWzBdO1xyXG4gICAgICBsZXQgc2R2ID0gc29sYXIuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICBsZXQgc21vbnRoX3YgPSBtb250aCArIFwiXCI7XHJcbiAgICAgIGxldCBzZGF5X3YgPSBkYXkgKyBcIlwiO1xyXG4gICAgICBsZXQgc21kID0gXCJcIjtcclxuICAgICAgaWYgKG1vbnRoIDwgMTApIHtcclxuICAgICAgICBzbW9udGhfdiA9IFwiMFwiICsgbW9udGg7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGRheSA8IDEwKSB7XHJcbiAgICAgICAgc2RheV92ID0gXCIwXCIgKyBkYXk7XHJcbiAgICAgIH1cclxuICAgICAgc21kID0gc21vbnRoX3YgKyBzZGF5X3Y7XHJcbiAgICAgIGlmIChzZC50cmltKCkgPT09IHNtZC50cmltKCkpIHtcclxuICAgICAgICBzb2xhckhvbGlkYXlTdHIgPSBzZHY7XHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gc29sYXJIb2xpZGF5U3RyXHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICDojrflj5blr7nlupTlubTku73nmoTnlJ/ogpZcclxuICAgICovXHJcbiAgX2dldFpvZGlhYyh5ZWFyKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fWm9kaWFjWyh5ZWFyIC0gNCkgJSAxMl1cclxuICB9XHJcbiAgLypcclxuICAqIOiOt+WPluaXpeacn+aYr+WQpuS4ujI06IqC5rCUXHJcbiAgICDpppblhYjojrflj5boioLmsJTkuLrlvZPmnIjnmoTnrKzlh6DlpKnvvIzkuI7lvZPliY3ljLnphY3nmoTvvIzov5Tlm57lr7nlupTnmoToioLmsJRcclxuICAqL1xyXG4gIF9nZXRMdW5hckRheUNhbGVuZGFyaWNpdHkoZmlyc3RDYWxlbmRhcmljaXR5RGF5LCBzZWNvbmRDYWxlbmRhcmljaXR5RGF5LCBub3dTZWxlY3REYXksIG5vd1NlbGVjdE1vbnRoKSB7XHJcbiAgICAvL+S8oOWFpeeahOaXpeacn+eahOiKguawlOS4juWQplxyXG5cclxuICAgIGxldCBjYWxlbmRhcmljaXR5U3RyID0gXCJcIjtcclxuICAgIGlmIChmaXJzdENhbGVuZGFyaWNpdHlEYXkgPT0gbm93U2VsZWN0RGF5KSB7XHJcblxyXG4gICAgICBjYWxlbmRhcmljaXR5U3RyID0gdGhpcy5fY2FsZW5kYXJpY2l0eVtub3dTZWxlY3RNb250aCAqIDIgLSAyXTtcclxuICAgIH1cclxuICAgIGlmIChzZWNvbmRDYWxlbmRhcmljaXR5RGF5ID09IG5vd1NlbGVjdERheSkge1xyXG5cclxuICAgICAgY2FsZW5kYXJpY2l0eVN0ciA9IHRoaXMuX2NhbGVuZGFyaWNpdHlbbm93U2VsZWN0TW9udGggKiAyIC0gMV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2FsZW5kYXJpY2l0eVN0clxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICAqIOS8oOWFpemYs+WOhuW5tOaciOaXpeiOt+W+l+ivpue7hueahOWFrOWOhuOAgeWGnOWOhm9iamVjdOS/oeaBryA8PT5KU09OXHJcbiAgICAqIEBwYXJhbSBzb2xhclllYXIgIHNvbGFyIHllYXJcclxuICAgICogQHBhcmFtIHNvbGFyTW9udGggIHNvbGFyIG1vbnRoXHJcbiAgICAqIEBwYXJhbSBzb2xhckRheSAgc29sYXIgZGF5XHJcbiAgICAqIEByZXR1cm4gSlNPTiBvYmplY3RcclxuICAgICovXHJcbiAgZ2V0THVuYXIoc29sYXJZZWFyLCBzb2xhck1vbnRoLCBzb2xhckRheSkgeyAvL+WPguaVsOWMuumXtDE5MDAuMS4zMX4yMTAwLjEyLjMxXHJcbiAgICBpZiAoc29sYXJZZWFyIDwgMTkwMCB8fCBzb2xhclllYXIgPiAyMTAwKSB7IHJldHVybiAtMTsgfS8v5bm05Lu96ZmQ5a6a44CB5LiK6ZmQXHJcbiAgICBpZiAoc29sYXJZZWFyID09IDE5MDAgJiYgc29sYXJNb250aCA9PSAxICYmIHNvbGFyRGF5IDwgMzEpIHsgcmV0dXJuIC0xOyB9Ly/kuIvpmZBcclxuICAgIGlmICghc29sYXJZZWFyKSB7IC8v5pyq5Lyg5Y+CICDojrflvpflvZPlpKlcclxuICAgICAgdmFyIG5vd1NlbGVjdERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFyIG5vd1NlbGVjdERhdGUgPSBuZXcgRGF0ZShzb2xhclllYXIsIHBhcnNlSW50KHNvbGFyTW9udGgpIC0gMSwgc29sYXJEYXkpXHJcbiAgICB9XHJcbiAgICB2YXIgbm93U2VsZWN0WWVhciA9IG5vd1NlbGVjdERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgIHZhciBub3dTZWxlY3RNb250aCA9IG5vd1NlbGVjdERhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICB2YXIgbm93U2VsZWN0RGF5ID0gbm93U2VsZWN0RGF0ZS5nZXREYXRlKCk7XHJcbiAgICB2YXIgb2Zmc2V0ID0gKERhdGUuVVRDKG5vd1NlbGVjdERhdGUuZ2V0RnVsbFllYXIoKSwgbm93U2VsZWN0RGF0ZS5nZXRNb250aCgpLCBub3dTZWxlY3REYXRlLmdldERhdGUoKSkgLSBEYXRlLlVUQygxOTAwLCAwLCAzMSkpIC8gODY0MDAwMDA7XHJcbiAgICAvL29mZnNldOW9k+WJjeaXpeacn+S4jjE5OTAuMS4zMeebuOW3ruaXpeacn+OAgjE5OTAuMS4zMS7lvIDlp4vnrKzkuIDkuKrlhpzljoblkajmnJ/lvIDlp4tcclxuICAgIHZhciB0ZW1wWWVhciwgbGVhcCA9IDAsIHRlbXAgPSAwO1xyXG4gICAgLy90ZW1wWWVhciDlvZPliY3lubTku73oh7MxOTkw5bm05L6d5qyh5YeP5Y675Lit6Ze05omA5pyJ55qE5Yac5Y6G5bm055qE5aSp5pWw77yM5L2Z5LiLb2Zmc2V05Li65b2T5YmN5Yac5Y6G5bm056ys5aSa5bCR5aSpXHJcbiAgICBmb3IgKHRlbXBZZWFyID0gMTkwMDsgdGVtcFllYXIgPCAyMTAxICYmIG9mZnNldCA+IDA7IHRlbXBZZWFyKyspIHtcclxuICAgICAgdGVtcCA9IHRoaXMuX2x1bmFyWWVhckRheXModGVtcFllYXIpOy8v6K6h566X5b2T5YmN5Yac5Y6G5bm055qE5oC75aSp5pWwXHJcbiAgICAgIG9mZnNldCAtPSB0ZW1wO1xyXG4gICAgICAvL29mZnNldOS+neasoeWHj+WOu+aJgOacieWGnOWOhuW5tOeahOaAu+WkqeaVsOWQjlxyXG4gICAgICAvL3RlbXBZZWFy5Li65b2T5YmN55qE55qE5Yac5Y6G5bm05Lu9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA8IDApIHtcclxuICAgICAgLy9vZmZzZXTlsI/kuo4w5pe25YCZ5L+u5q2jXHJcbiAgICAgIG9mZnNldCArPSB0ZW1wO1xyXG4gICAgICB0ZW1wWWVhci0tO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB2YXIgaXNUb2RheU9iaiA9IG5ldyBEYXRlKCk7Ly/ojrflj5blvZPliY3ml6XmnJ9cclxuICAgIHZhciBpc1RvZGF5ID0gZmFsc2U7XHJcbiAgICBpZiAoaXNUb2RheU9iai5nZXRGdWxsWWVhcigpID09IG5vd1NlbGVjdFllYXIgJiYgaXNUb2RheU9iai5nZXRNb250aCgpICsgMSA9PSBub3dTZWxlY3RNb250aCAmJiBpc1RvZGF5T2JqLmdldERhdGUoKSA9PSBub3dTZWxlY3REYXkpIHtcclxuICAgICAgaXNUb2RheSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICAvL+aYn+acn+WHoFxyXG4gICAgbGV0IG5XZWVrID0gbm93U2VsZWN0RGF0ZS5nZXREYXkoKTtcclxuICAgIGxldCBjV2VlayA9IHRoaXMuX2NoaW5lc2VDaGFyW25XZWVrXTtcclxuICAgIGlmIChuV2VlayA9PSAwKSB7XHJcbiAgICAgIG5XZWVrID0gNztcclxuICAgIH0vL+aVsOWtl+ihqOekuuWRqOWHoOmhuuW6lOWkqeacneWRqOS4gOW8gOWni+eahOaDr+S+i1xyXG4gICAgLy/lhpzljoblubRcclxuICAgIHZhciB5ZWFyID0gdGVtcFllYXI7XHJcblxyXG4gICAgdmFyIGxlYXAgPSB0aGlzLl9sZWFwTW9udGhJbkx1bmFyWWVhcih0ZW1wWWVhcik7IC8v6Zew5ZOq5Liq5pyIXHJcbiAgICB2YXIgaXNMZWFwID0gZmFsc2U7XHJcblxyXG4gICAgLy/mlYjpqozpl7DmnIhcclxuICAgIHZhciB0ZW1wTW9udGg7XHJcbiAgICBmb3IgKHRlbXBNb250aCA9IDE7IHRlbXBNb250aCA8IDEzICYmIG9mZnNldCA+IDA7IHRlbXBNb250aCsrKSB7XHJcblxyXG4gICAgICBpZiAobGVhcCA+IDAgJiYgdGVtcE1vbnRoID09IChsZWFwICsgMSkgJiYgaXNMZWFwID09IGZhbHNlKSB7XHJcbiAgICAgICAgLy/pl7DmnIhcclxuICAgICAgICAtLXRlbXBNb250aDtcclxuICAgICAgICBpc0xlYXAgPSB0cnVlO1xyXG4gICAgICAgIHRlbXAgPSB0aGlzLl9sZWFwRGF5c0luTHVuYXJZZWFyKHllYXIpOyAvL+iuoeeul+WGnOWOhumXsOaciOWkqeaVsFxyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIC8v6Z2e6Zew5pyIXHJcbiAgICAgICAgdGVtcCA9IHRoaXMuX21vbnRoRGF5cyh5ZWFyLCB0ZW1wTW9udGgpOy8v6K6h566X5Yac5Y6G5pmu6YCa5pyI5aSp5pWwXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0xlYXAgPT0gdHJ1ZSAmJiB0ZW1wTW9udGggPT0gKGxlYXAgKyAxKSkge1xyXG4gICAgICAgIC8v5aaC5p6c6Zew5pyI5Y675o6J6Zew5pyI5qCH6K6wXHJcbiAgICAgICAgaXNMZWFwID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgb2Zmc2V0IC09IHRlbXA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCA9PSAwICYmIGxlYXAgPiAwICYmIHRlbXBNb250aCA9PSBsZWFwICsgMSlcclxuICAgICAgaWYgKGlzTGVhcCkge1xyXG4gICAgICAgIGlzTGVhcCA9IGZhbHNlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlzTGVhcCA9IHRydWU7IC0tdGVtcE1vbnRoO1xyXG4gICAgICB9XHJcbiAgICBpZiAob2Zmc2V0IDwgMCkge1xyXG4gICAgICBvZmZzZXQgKz0gdGVtcDtcclxuICAgICAgLS10ZW1wTW9udGg7XHJcbiAgICB9XHJcbiAgICAvL+WGnOWOhuaciFxyXG4gICAgY29uc3QgbW9udGggPSB0ZW1wTW9udGg7XHJcbiAgICAvL+WGnOWOhuaXpVxyXG4gICAgY29uc3QgZGF5ID0gb2Zmc2V0ICsgMTtcclxuXHJcbiAgICAvL+WkqeW5suWcsOaUr+WkhOeQhlxyXG4gICAgdmFyIHNtID0gbm93U2VsZWN0TW9udGggLSAxO1xyXG4gICAgdmFyIGdhblpoaVllYXIgPSB0aGlzLl9nZXRHYW5aaGlZZWFyKHllYXIpO1xyXG5cclxuICAgIC8v5pyI5p+x5o6o566X6KGoXHJcbiAgICAvLzE5MDDlubQx5pyI5bCP5a+S5Lul5YmN5Li6IOS4meWtkOaciCg2MOi/m+WItjEyKVxyXG4gICAgdmFyIF9maXJzdENhbGVuZGFyaWNpdHlEYXkgPSB0aGlzLl9nZXRDYWxlbmRhcmljaXR5KG5vd1NlbGVjdFllYXIsIChub3dTZWxlY3RNb250aCAqIDIgLSAxKSk7Ly/ov5Tlm57lvZPmnIjjgIzoioLjgI3kuLrlh6Dml6XlvIDlp4tcclxuICAgIHZhciBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSA9IHRoaXMuX2dldENhbGVuZGFyaWNpdHkobm93U2VsZWN0WWVhciwgKG5vd1NlbGVjdE1vbnRoICogMikpOy8v6L+U5Zue5b2T5pyI44CM6IqC44CN5Li65Yeg5pel5byA5aeLXHJcbiAgICBjb25zb2xlLmxvZyhcIl9maXJzdENhbGVuZGFyaWNpdHlEYXk6XCIgKyBfZmlyc3RDYWxlbmRhcmljaXR5RGF5ICsgXCIsX3NlY29uZENhbGVuZGFyaWNpdHlEYXk6XCIgKyBfc2Vjb25kQ2FsZW5kYXJpY2l0eURheSlcclxuICAgIC8v5L6d5o2uMTLoioLmsJTkv67mraPlubLmlK/mnIhcclxuICAgIGxldCBnYW5aaGlNb250aCA9IHRoaXMuX2dldEdhblpoaSgobm93U2VsZWN0WWVhciAtIDE5MDApICogMTIgKyBub3dTZWxlY3RNb250aCArIDExKTtcclxuICAgIGlmIChub3dTZWxlY3REYXkgPj0gX2ZpcnN0Q2FsZW5kYXJpY2l0eURheSkge1xyXG4gICAgICBnYW5aaGlNb250aCA9IHRoaXMuX2dldEdhblpoaSgobm93U2VsZWN0WWVhciAtIDE5MDApICogMTIgKyBub3dTZWxlY3RNb250aCArIDEyKTtcclxuICAgIH1cclxuICAgIGxldCBjYWxlbmRhcmljaXR5ID0gdGhpcy5fZ2V0THVuYXJEYXlDYWxlbmRhcmljaXR5KF9maXJzdENhbGVuZGFyaWNpdHlEYXksIF9zZWNvbmRDYWxlbmRhcmljaXR5RGF5LCBub3dTZWxlY3REYXksIG5vd1NlbGVjdE1vbnRoKVxyXG5cclxuICAgIC8v5pel5p+x5o6o566X6KGoIOW9k+aciOS4gOaXpeS4jiAxOTAwLzEvMSDnm7jlt67lpKnmlbBcclxuICAgIGNvbnN0IGRheUN5Y2xpY2FsID0gRGF0ZS5VVEMobm93U2VsZWN0WWVhciwgc20sIDEsIDAsIDAsIDAsIDApIC8gODY0MDAwMDAgKyAyNTU2NyArIDEwO1xyXG4gICAgY29uc3QgZ2FuWmhpRGF5ID0gdGhpcy5fZ2V0R2FuWmhpKGRheUN5Y2xpY2FsICsgbm93U2VsZWN0RGF5IC0gMSk7XHJcbiAgICAvL+ivpeaXpeacn+aJgOWxnueahOaYn+W6p1xyXG4gICAgY29uc3QgYXN0cm8gPSB0aGlzLl9nZXRBc3Ryb2xvZ3kobm93U2VsZWN0TW9udGgsIG5vd1NlbGVjdERheSk7XHJcblxyXG4gICAgY29uc3Qgem9kaWFjID0gdGhpcy5fZ2V0Wm9kaWFjKHllYXIpXHJcbiAgICBjb25zdCBjaGluYU1vbnRoID0gdGhpcy5fZ2V0Q2hpbmFNb250aChtb250aClcclxuICAgIGNvbnN0IGNoaW5hRGF5ID0gdGhpcy5fZ2V0Q2hpbmFEYXkoZGF5KVxyXG4gICAgY29uc3QgbHVuYXJIb2xpZGF5ID0gdGhpcy5fZ2V0THVuYXJIb2xpZGF5KG1vbnRoLCBkYXkpXHJcbiAgICBjb25zdCBzb2xhckhvbGlkYXkgPSB0aGlzLl9nZXRTb2xhckhvbGlkYXkobm93U2VsZWN0TW9udGgsIG5vd1NlbGVjdERheSlcclxuICAgIHJldHVybiB7ICdsdW5hclllYXInOiB5ZWFyLCAnbHVuYXJNb250aCc6IG1vbnRoLCAnbHVuYXJEYXknOiBkYXksICd6b2RpYWMnOiB6b2RpYWMsICdjaGluYU1vbnRoJzogKGlzTGVhcCA/IFwi6ZewXCIgOiAnJykgKyBjaGluYU1vbnRoLCAnY2hpbmFEYXknOiBjaGluYURheSwgJ3NvbGFyWWVhcic6IG5vd1NlbGVjdFllYXIsICdzb2xhck1vbnRoJzogbm93U2VsZWN0TW9udGgsICdzb2xhckRheSc6IG5vd1NlbGVjdERheSwgJ2dhblpoaVllYXInOiBnYW5aaGlZZWFyLCAnZ2FuWmhpTW9udGgnOiBnYW5aaGlNb250aCwgJ2dhblpoaURheSc6IGdhblpoaURheSwgJ2lzVG9kYXknOiBpc1RvZGF5LCAnaXNMZWFwJzogaXNMZWFwLCAnbldlZWsnOiBuV2VlaywgJ25jV2Vlayc6IFwi5pif5pyfXCIgKyBjV2VlaywgJ2NhbGVuZGFyaWNpdHknOiBjYWxlbmRhcmljaXR5LCAnYXN0cm8nOiBhc3RybywgXCJsdW5hckhvbGlkYXlcIjogbHVuYXJIb2xpZGF5LCBcInNvbGFySG9saWRheVwiOiBzb2xhckhvbGlkYXkgfTtcclxuICB9XHJcbn1cclxubGV0IGx1bmFyQ2FsZW5kYXIgPSBuZXcgTHVuYXJDYWxlbmRhcigpXHJcbmV4cG9ydCBkZWZhdWx0IGx1bmFyQ2FsZW5kYXJcclxuXHJcblxyXG5cclxuLy8qKioqKioqKioqKioqKioq5YiG5Ymy57q/amF2YeeJiOacrCoqKioqKioqKioqKioqKiAqL1xyXG4vLyBpbXBvcnQgamF2YS50ZXh0LlBhcnNlRXhjZXB0aW9uO1xyXG4vLyBpbXBvcnQgamF2YS50ZXh0LlNpbXBsZURhdGVGb3JtYXQ7XHJcbi8vIGltcG9ydCBqYXZhLnV0aWwuRGF0ZTtcclxuLy8gaW1wb3J0IGphdmEudXRpbC5Mb2NhbGU7XHJcbi8vIGltcG9ydCBqYXZhLnV0aWwuQ2FsZW5kYXI7XHJcblxyXG4vLyBjbGFzcyBMdW5hckNhbGVuZGFyIHtcclxuLy8gICAgIHByaXZhdGUgaW50IHllYXI7IC8vIOWFrOWOhuW5tFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbW9udGg7Ly8g5YWs5Y6G5pyIXHJcbi8vICAgICBwcml2YXRlIGludCBkYXk7Ly8g5YWs5Y6G5pelXHJcbi8vICAgICBwcml2YXRlIGludCBsdW5hclllYXI7Ly8g6Zi05Y6G5bm0XHJcbi8vICAgICBwcml2YXRlIGludCBsdW5hck1vbnRoOy8vIOmYtOWOhuaciFxyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbHVuYXJEYXk7Ly8g6Zi05Y6G5pelXHJcbi8vICAgICBwcml2YXRlIGludCBsZWFwTW9udGggPSAwOyAvLyDpmLTljobpl7DnmoTmnIhcclxuLy8gICAgIHByaXZhdGUgaW50IGRheXNPZk1vbnRoID0gMDsgLy8g5p+Q5pyI55qE5aSp5pWwXHJcbi8vICAgICBwcml2YXRlIGludCBkYXlPZldlZWsgPSAwOyAvLyDlhbfkvZPmn5DkuIDlpKnmmK/mmJ/mnJ/lh6BcclxuXHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmcgY2hpbmVzZU1vbnRoTnVtYmVyW10gPSB7IFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCIsIFwi5LiDXCIsIFwi5YWrXCIsIFwi5LmdXCIsIFwi5Y2BXCIsIFwi5Y2B5LiAXCIsIFwi5Y2B5LqMXCIgfTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZ1tdIFpvZGlhYyA9IG5ldyBTdHJpbmdbXSB7IFwi6bygXCIsIFwi54mbXCIsIFwi6JmOXCIsIFwi5YWUXCIsIFwi6b6ZXCIsIFwi6JuHXCIsIFwi6amsXCIsIFwi576KXCIsIFwi54y0XCIsIFwi6bihXCIsIFwi54uXXCIsIFwi54yqXCIgfTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZ1tdIEdhbiA9IG5ldyBTdHJpbmdbXSB7IFwi55SyXCIsIFwi5LmZXCIsIFwi5LiZXCIsIFwi5LiBXCIsIFwi5oiKXCIsIFwi5bexXCIsIFwi5bqaXCIsIFwi6L6bXCIsIFwi5aOsXCIsIFwi55m4XCIgfTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZ1tdIFpoaSA9IG5ldyBTdHJpbmdbXSB7IFwi5a2QXCIsIFwi5LiRXCIsIFwi5a+FXCIsIFwi5Y2vXCIsIFwi6L6wXCIsIFwi5bezXCIsIFwi5Y2IXCIsIFwi5pyqXCIsIFwi55SzXCIsIFwi6YWJXCIsIFwi5oiMXCIsIFwi5LqlXCIgfTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZyBjaGluZXNlVGVuQ2hhcltdID0geyBcIuWInVwiLCBcIuWNgVwiLCBcIuW7v1wiLCBcIuWNhVwiIH07XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBTdHJpbmdbXSBsdW5hckhvbGlkYXkgPSBuZXcgU3RyaW5nW10geyBcIjAxMDEg5pil6IqCXCIsIFwiMDExNSDlhYPlrrVcIiwgXCIwNTA1IOerr+WNiFwiLCBcIjA3MDcg5oOF5Lq6XCIsIFwiMDcxNSDkuK3lhYNcIixcclxuLy8gICAgICAgICAgICAgXCIwODE1IOS4reeni1wiLCBcIjA5MDkg6YeN6ZizXCIsIFwiMTIwOCDohYrlhatcIiwgXCIxMjI0IOWwj+W5tFwiLCBcIjAxMDAg6Zmk5aSVXCIgfTtcclxuLy8gICAgIHByaXZhdGUgZmluYWwgc3RhdGljIFN0cmluZ1tdIHNvbGFySG9saWRheSA9IG5ldyBTdHJpbmdbXSB7IC8vXHJcbi8vICAgICAgICAgICAgIFwiMDEwMSDlhYPml6ZcIiwgXCIwMjE0IOaDheS6ulwiLCBcIjAzMDgg5aaH5aWzXCIsIFwiMDMxMiDmpI3moJFcIiwgXCIwMzE1IOa2iOi0ueiAheadg+ebiuaXpVwiLCBcIjA0MDEg5oSa5Lq6XCIsIFwiMDUwMSDlirPliqhcIiwgXCIwNTA0IOmdkuW5tFwiLCAvL1xyXG4vLyAgICAgICAgICAgICBcIjA1MTIg5oqk5aOrXCIsIFwiMDYwMSDlhL/nq6VcIiwgXCIwNzAxIOW7uuWFmlwiLCBcIjA4MDEg5bu65YabXCIsIFwiMDgwOCDniLbkurJcIiwgXCIwOTEwIOaVmeW4iFwiLCBcIjA5Mjgg5a2U5a2Q6K+e6L6wXCIsIC8vXHJcbi8vICAgICAgICAgICAgIFwiMTAwMSDlm73luoZcIiwgXCIxMDA2IOiAgeS6ulwiLCBcIjEwMjQg6IGU5ZCI5Zu95pelXCIsIFwiMTExMiDlrZnkuK3lsbHor57ovrDnuqrlv7VcIiwgXCIxMjIwIOa+s+mXqOWbnuW9kue6quW/tVwiLCBcIjEyMjUg5Zyj6K+eXCIgfTtcclxuLy8gICAgIHByaXZhdGUgc3RhdGljIFNpbXBsZURhdGVGb3JtYXQgY2hpbmVzZURhdGVGb3JtYXQgPSBuZXcgU2ltcGxlRGF0ZUZvcm1hdChcInl5eXnlubRNTeaciGRk5pelXCIsIExvY2FsZS5DSElOQSk7XHJcbi8vICAgICBwcml2YXRlIGZpbmFsIHN0YXRpYyBsb25nW10gbHVuYXJJbmZvID0gbmV3IGxvbmdbXSB7IC8vXHJcbi8vICAgICAgICAgICAgIDB4MDRiZDgsIDB4MDRhZTAsIDB4MGE1NzAsIDB4MDU0ZDUsIDB4MGQyNjAsIDB4MGQ5NTAsIDB4MTY1NTQsIDB4MDU2YTAsIDB4MDlhZDAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDU1ZDIsIDB4MDRhZTAsIDB4MGE1YjYsIDB4MGE0ZDAsIDB4MGQyNTAsIDB4MWQyNTUsIDB4MGI1NDAsIDB4MGQ2YTAsIDB4MGFkYTIsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDk1YjAsIDB4MTQ5NzcsIDB4MDQ5NzAsIDB4MGE0YjAsIDB4MGI0YjUsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MWFiNTQsIDB4MDJiNjAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDk1NzAsIDB4MDUyZjIsIDB4MDQ5NzAsIDB4MDY1NjYsIDB4MGQ0YTAsIDB4MGVhNTAsIDB4MDZlOTUsIDB4MDVhZDAsIDB4MDJiNjAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MTg2ZTMsIDB4MDkyZTAsIDB4MWM4ZDcsIDB4MGM5NTAsIDB4MGQ0YTAsIDB4MWQ4YTYsIDB4MGI1NTAsIDB4MDU2YTAsIDB4MWE1YjQsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDI1ZDAsIDB4MDkyZDAsIDB4MGQyYjIsIDB4MGE5NTAsIDB4MGI1NTcsIDB4MDZjYTAsIDB4MGI1NTAsIDB4MTUzNTUsIDB4MDRkYTAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MGE1ZDAsIDB4MTQ1NzMsIDB4MDUyZDAsIDB4MGE5YTgsIDB4MGU5NTAsIDB4MDZhYTAsIDB4MGFlYTYsIDB4MGFiNTAsIDB4MDRiNjAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MGFhZTQsIDB4MGE1NzAsIDB4MDUyNjAsIDB4MGYyNjMsIDB4MGQ5NTAsIDB4MDViNTcsIDB4MDU2YTAsIDB4MDk2ZDAsIDB4MDRkZDUsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDRhZDAsIDB4MGE0ZDAsIDB4MGQ0ZDQsIDB4MGQyNTAsIDB4MGQ1NTgsIDB4MGI1NDAsIDB4MGI1YTAsIDB4MTk1YTYsIDB4MDk1YjAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDQ5YjAsIDB4MGE5NzQsIDB4MGE0YjAsIDB4MGIyN2EsIDB4MDZhNTAsIDB4MDZkNDAsIDB4MGFmNDYsIDB4MGFiNjAsIDB4MDk1NzAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDRhZjUsIDB4MDQ5NzAsIDB4MDY0YjAsIDB4MDc0YTMsIDB4MGVhNTAsIDB4MDZiNTgsIDB4MDU1YzAsIDB4MGFiNjAsIDB4MDk2ZDUsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDkyZTAsIDB4MGM5NjAsIDB4MGQ5NTQsIDB4MGQ0YTAsIDB4MGRhNTAsIDB4MDc1NTIsIDB4MDU2YTAsIDB4MGFiYjcsIDB4MDI1ZDAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MDkyZDAsIDB4MGNhYjUsIDB4MGE5NTAsIDB4MGI0YTAsIDB4MGJhYTQsIDB4MGFkNTAsIDB4MDU1ZDksIDB4MDRiYTAsIDB4MGE1YjAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MTUxNzYsIDB4MDUyYjAsIDB4MGE5MzAsIDB4MDc5NTQsIDB4MDZhYTAsIDB4MGFkNTAsIDB4MDViNTIsIDB4MDRiNjAsIDB4MGE2ZTYsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MGE0ZTAsIDB4MGQyNjAsIDB4MGVhNjUsIDB4MGQ1MzAsIDB4MDVhYTAsIDB4MDc2YTMsIDB4MDk2ZDAsIDB4MDRiZDcsIDB4MDRhZDAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MGE0ZDAsIDB4MWQwYjYsIDB4MGQyNTAsIDB4MGQ1MjAsIDB4MGRkNDUsIDB4MGI1YTAsIDB4MDU2ZDAsIDB4MDU1YjIsIDB4MDQ5YjAsIC8vXHJcbi8vICAgICAgICAgICAgIDB4MGE1NzcsIDB4MGE0YjAsIDB4MGFhNTAsIDB4MWIyNTUsIDB4MDZkMjAsIDB4MGFkYTAgfTtcclxuXHJcbi8vICAgICBwdWJsaWMgTHVuYXJDYWxlbmRhcihpbnQgeWVhciwgaW50IG1vbnRoLCBpbnQgZGF5KSB7XHJcbi8vICAgICAgICAgdGhpcy55ZWFyID0geWVhcjtcclxuLy8gICAgICAgICB0aGlzLm1vbnRoID0gbW9udGg7XHJcbi8vICAgICAgICAgdGhpcy5kYXkgPSBkYXk7XHJcbi8vICAgICAgICAgdGhpcy5pbml0THVuYXJEYXRlKCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBwcml2YXRlIHZvaWQgaW5pdEx1bmFyRGF0ZSgpe1xyXG4vLyAgICAgICAgIFN0cmluZyBub3dhZGF5cztcclxuLy8gICAgICAgICBEYXRlIGJhc2VEYXRlID0gbnVsbDtcclxuLy8gICAgICAgICBEYXRlIG5vd2FkYXkgPSBudWxsO1xyXG4vLyAgICAgICAgIHRyeSB7XHJcbi8vICAgICAgICAgICAgIGJhc2VEYXRlID0gY2hpbmVzZURhdGVGb3JtYXQucGFyc2UoXCIxOTAw5bm0MeaciDMx5pelXCIpO1xyXG4vLyAgICAgICAgIH0gY2F0Y2ggKFBhcnNlRXhjZXB0aW9uIGUpIHtcclxuLy8gICAgICAgICAgICAgZS5wcmludFN0YWNrVHJhY2UoKTtcclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIG5vd2FkYXlzID0gdGhpcy55ZWFyICsgXCLlubRcIiArIHRoaXMubW9udGggKyBcIuaciFwiICsgdGhpcy5kYXkgKyBcIuaXpVwiO1xyXG4vLyAgICAgICAgIHRyeSB7XHJcbi8vICAgICAgICAgICAgIG5vd2FkYXkgPSBjaGluZXNlRGF0ZUZvcm1hdC5wYXJzZShub3dhZGF5cyk7XHJcbi8vICAgICAgICAgfSBjYXRjaCAoUGFyc2VFeGNlcHRpb24gZSkge1xyXG4vLyAgICAgICAgICAgICBlLnByaW50U3RhY2tUcmFjZSgpO1xyXG5cclxuLy8gICAgICAgICB9XHJcblxyXG4vLyAgICAgICAgIC8vIOS4jjE5MDDlubQx5pyIMzHml6Xnm7jlt67nmoTlpKnmlbBcclxuLy8gICAgICAgICBpbnQgb2Zmc2V0ID0gKGludCkgKChub3dhZGF5LmdldFRpbWUoKSAtIGJhc2VEYXRlLmdldFRpbWUoKSkgLyA4NjQwMDAwMEwpO1xyXG5cclxuLy8gICAgICAgICAvKipcclxuLy8gICAgICAgICAgKiDnlKhvZmZzZXTlh4/ljrvmr4/lhpzljoblubTnmoTlpKnmlbBcclxuLy8gICAgICAgICAg6K6h566X5b2T5aSp5piv5Yac5Y6G56ys5Yeg5aSpXHJcbi8vICAgICAgICAgIGlZZWFy5pyA57uI57uT5p6c5piv5Yac5Y6G55qE5bm05Lu9XHJcbi8vICAgICAgICAgIG9mZnNldOS4uuW9k+W5tOeahOesrOWHoOWkqVxyXG4vLyAgICAgICAgICAqL1xyXG4vLyAgICAgICAgIGludCBpWWVhciwgZGF5c09mWWVhciA9IDA7XHJcbi8vICAgICAgICAgZm9yIChpWWVhciA9IDE5MDA7IGlZZWFyIDwgMjEwMSAmJiBvZmZzZXQgPiAwOyBpWWVhcisrKSB7XHJcbi8vICAgICAgICAgICAgIGRheXNPZlllYXIgPSBkYXlzSW5MdW5hclllYXIoaVllYXIpO1xyXG4vLyAgICAgICAgICAgICBvZmZzZXQgLT0gZGF5c09mWWVhcjtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcclxuLy8gICAgICAgICAgICAgb2Zmc2V0ICs9IGRheXNPZlllYXI7XHJcbi8vICAgICAgICAgICAgIGlZZWFyLS07XHJcbi8vICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICBsZWFwTW9udGggPSBnZXRMZWFwTW9udGgoaVllYXIpOyAvLyDlhpzljobpl7DpgqPkuKrmnIhcclxuLy8gICAgICAgICBib29sZWFuIGxlYXAgPSBmYWxzZTtcclxuXHJcbi8vICAgICAgICAgLy8g55So5b2T5bm055qE5aSp5pWwb2Zmc2V0LOmAkOS4quWHj+WOu+avj+aciO+8iOWGnOWOhu+8ieeahOWkqeaVsO+8jOaxguWHuuW9k+WkqeaYr+acrOaciOeahOesrOWHoOWkqVxyXG4vLyAgICAgICAgIGludCBpTW9udGgsIGRheXNPZk1vbnRoID0gMDtcclxuLy8gICAgICAgICBmb3IgKGlNb250aCA9IDE7IGlNb250aCA8IDEzICYmIG9mZnNldCA+IDA7IGlNb250aCsrKSB7XHJcblxyXG4vLyAgICAgICAgICAgICBpZiAobGVhcE1vbnRoID4gMCAmJiBpTW9udGggPT0gKGxlYXBNb250aCArIDEpICYmICFsZWFwKSB7XHJcbi8vICAgICAgICAgICAgICAgICAvLyDpl7DmnIhcclxuLy8gICAgICAgICAgICAgICAgIC0taU1vbnRoO1xyXG4vLyAgICAgICAgICAgICAgICAgbGVhcCA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IGxlYXBEYXlJbkx1bmFyKHllYXIpO1xyXG4vLyAgICAgICAgICAgICB9IGVsc2VcclxuLy8gICAgICAgICAgICAgICAgIGRheXNPZk1vbnRoID0gbW9udGhEYXlzSW5MdW5hcih5ZWFyLCBpTW9udGgpO1xyXG5cclxuLy8gICAgICAgICAgICAgb2Zmc2V0IC09IGRheXNPZk1vbnRoO1xyXG4vLyAgICAgICAgICAgICAvLyDop6PpmaTpl7DmnIhcclxuLy8gICAgICAgICAgICAgaWYgKGxlYXAgJiYgaU1vbnRoID09IChsZWFwTW9udGggKyAxKSlcclxuLy8gICAgICAgICAgICAgICAgIGxlYXAgPSBmYWxzZTtcclxuXHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIC8vIG9mZnNldOS4ujDml7bvvIzlubbkuJTliJrmiY3orqHnrpfnmoTmnIjku73mmK/pl7DmnIjvvIzopoHmoKHmraNcclxuLy8gICAgICAgICBpZiAob2Zmc2V0ID09IDAgJiYgbGVhcE1vbnRoID4gMCAmJiBpTW9udGggPT0gbGVhcE1vbnRoICsgMSkge1xyXG4vLyAgICAgICAgICAgICBpZiAobGVhcCkge1xyXG4vLyAgICAgICAgICAgICAgICAgbGVhcCA9IGZhbHNlO1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgbGVhcCA9IHRydWU7XHJcbi8vICAgICAgICAgICAgICAgICAtLWlNb250aDtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICAvLyBvZmZzZXTlsI/kuo4w5pe277yM5Lmf6KaB5qCh5q2jXHJcbi8vICAgICAgICAgaWYgKG9mZnNldCA8IDApIHtcclxuLy8gICAgICAgICAgICAgb2Zmc2V0ICs9IGRheXNPZk1vbnRoO1xyXG4vLyAgICAgICAgICAgICAtLWlNb250aDtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgIC8vIOWGnOWOhuW5tOS7vVxyXG4vLyAgICAgICAgIGx1bmFyWWVhciA9IGlZZWFyO1xyXG4vLyAgICAgICAgIGx1bmFyTW9udGggPSBpTW9udGg7XHJcbi8vICAgICAgICAgbHVuYXJEYXkgPSBvZmZzZXQgKyAxO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5Yac5Y6GeWVhcuW5tOeahOaAu+WkqeaVsFxyXG4vLyAgICAgICpcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVybiDor6XlubTnmoTmgLvlpKnmlbBcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgZGF5c0luTHVuYXJZZWFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaW50IGksIHN1bSA9IDM0ODtcclxuLy8gICAgICAgICBmb3IgKGkgPSAweDgwMDA7IGkgPiAweDg7IGkgPj49IDEpIHtcclxuLy8gICAgICAgICAgICAgaWYgKChsdW5hckluZm9beWVhciAtIDE5MDBdICYgaSkgIT0gMClcclxuLy8gICAgICAgICAgICAgICAgIHN1bSArPSAxO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gKHN1bSArIGxlYXBEYXlJbkx1bmFyKHllYXIpKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWGnOWOhiB5ZWFy5bm06Zew5pyI55qE5aSp5pWwXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIHllYXIg5bm05Lu9XHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgaW50IGxlYXBEYXlJbkx1bmFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgaWYgKGdldExlYXBNb250aCh5ZWFyKSAhPSAwKSB7XHJcbi8vICAgICAgICAgICAgIGlmICgobHVuYXJJbmZvW3llYXIgLSAxOTAwXSAmIDB4MTAwMDApICE9IDApIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiAzMDtcclxuLy8gICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiAyOTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH0gZWxzZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gMDtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICog5Yac5Y6G6Zew6YKj5Liq5pyIXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyIOW5tOS7vVxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIGludCBnZXRMZWFwTW9udGgoaW50IHllYXIpIHtcclxuLy8gICAgICAgICByZXR1cm4gKGludCkgKGx1bmFySW5mb1t5ZWFyIC0gMTkwMF0gJiAwYjExMTEpO1xyXG4vLyAgICAgfVxyXG5cclxuXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDkvKDlm57lhpzljoYgeWVhcuW5tG1vbnRo5pyI55qE5oC75aSp5pWwXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIHllYXIgIOW5tOS7vVxyXG4vLyAgICAgICogQHBhcmFtIG1vbnRoIOaciOS7vVxyXG4vLyAgICAgICogQHJldHVybiDor6XmnIjku73nmoTmgLvlpKnmlbBcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBpbnQgbW9udGhEYXlzSW5MdW5hcihpbnQgeWVhciwgaW50IG1vbnRoKSB7XHJcbi8vICAgICAgICAgaWYgKChsdW5hckluZm9beWVhciAtIDE5MDBdICYgKDB4MTAwMDAgPj4gbW9udGgpKSA9PSAwKVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gMjk7XHJcbi8vICAgICAgICAgZWxzZVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gMzA7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lhpzljoZ5ZWFy5bm055qE55Sf6IKWXHJcbi8vICAgICAgKlxyXG4vLyAgICAgICogQHBhcmFtIHllYXIg5bm05Lu9XHJcbi8vICAgICAgKiBAcmV0dXJuIOeUn+iCllxyXG4vLyAgICAgICovXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRab2RpYWNZZWFyKGludCB5ZWFyKSB7XHJcbi8vICAgICAgICAgcmV0dXJuIFpvZGlhY1soeWVhciAtIDQpICUgMTJdO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5a+55bqU5bm055qE5bmy5pSvXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldEdhblpoaShpbnQgeWVhcikge1xyXG4vLyAgICAgICAgIGludCBudW0gPSB5ZWFyIC0gMTkwMCArIDM2O1xyXG4vLyAgICAgICAgIHJldHVybiAoR2FuW251bSAlIDEwXSArIFpoaVtudW0gJSAxMl0pO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog6L+U5Zue5b2T5YmN5bm05Lu955qE5bmy5pSvXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50WWVhckdhblpoaSgpIHtcclxuLy8gICAgICAgICByZXR1cm4gZ2V0R2FuWmhpKHRoaXMueWVhcik7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDojrflj5blvZPliY3lubTku73nmoTnlJ/ogpZcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgU3RyaW5nIGdldEN1cnJlbnRZZWFyWm9kaWFjKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBnZXRab2RpYWNZZWFyKHRoaXMubHVuYXJZZWFyKTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICBwcml2YXRlIFN0cmluZyBnZXRDaGluYURheVN0cmluZyhpbnQgZGF5KSB7XHJcblxyXG4vLyAgICAgICAgIGludCBuID0gZGF5ICUgMTAgPT0gMCA/IDkgOiBkYXkgJSAxMCAtIDE7XHJcbi8vICAgICAgICAgaWYgKGRheSA+IDMwKVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuLy8gICAgICAgICBpZiAoZGF5ID09IDEwKVxyXG4vLyAgICAgICAgICAgICByZXR1cm4gXCLliJ3ljYFcIjtcclxuLy8gICAgICAgICBlbHNlXHJcbi8vICAgICAgICAgICAgIHJldHVybiBjaGluZXNlVGVuQ2hhcltkYXkgLyAxMF0gKyBjaGluZXNlTW9udGhOdW1iZXJbbl07XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDojrflj5blvZPliY3ml6XmnJ/lhpzljoboioLml6VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50THVuYXJIb2xpZGF5KCl7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldEx1bmFySG9saWRheSh0aGlzLmx1bmFyTW9udGgsdGhpcy5sdW5hckRheSk7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDojrflj5blvZPliY3ml6XmnJ/lhazljoboioLml6VcclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIFN0cmluZyBnZXRDdXJyZW50U29sYXJIb2xpZGF5KCl7XHJcbi8vICAgICAgICAgcmV0dXJuIGdldFNvbGFySG9saWRheSh0aGlzLm1vbnRoLHRoaXMuZGF5KTtcclxuLy8gICAgIH1cclxuXHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDov5Tlm57lr7nlupTpmLTljobnmoTml6XmnJ9cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHJpdmF0ZSBTdHJpbmcgZ2V0THVuYXJEYXRlKCkge1xyXG4vLyAgICAgICAgIHJldHVybiBjaGluZXNlTW9udGhOdW1iZXJbbHVuYXJNb250aCAtIDFdICsgXCLmnIhcIiArIGdldENoaW5hRGF5U3RyaW5nKGx1bmFyRGF5KTtcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICAvKipcclxuLy8gICAgICAqIOi/lOWbnuWvueW6lOaXpeacn+eahOWFrOWOhuiKguWBh+aXpVxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGgg5YWs5Y6G5pyIXHJcbi8vICAgICAgKiBAcGFyYW0gZGF5ICAg5YWs5Y6G5pelXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldFNvbGFySG9saWRheShpbnQgbW9udGgsIGludCBkYXkpIHtcclxuLy8gICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IHNvbGFySG9saWRheS5sZW5ndGg7IGkrKykge1xyXG5cclxuLy8gICAgICAgICAgICAgU3RyaW5nIHNkID0gc29sYXJIb2xpZGF5W2ldLnNwbGl0KFwiIFwiKVswXTtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIHNkdiA9IHNvbGFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMV07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzbW9udGhfdiA9IG1vbnRoICsgXCJcIjtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIHNkYXlfdiA9IGRheSArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBzbWQgPSBcIlwiO1xyXG4vLyAgICAgICAgICAgICBpZiAobW9udGggPCAxMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgc21vbnRoX3YgPSBcIjBcIiArIG1vbnRoO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgc2RheV92ID0gXCIwXCIgKyBkYXk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgc21kID0gc21vbnRoX3YgKyBzZGF5X3Y7XHJcbi8vICAgICAgICAgICAgIGlmIChzZC50cmltKCkuZXF1YWxzKHNtZC50cmltKCkpKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gc2R2O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBcIlwiO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKipcclxuLy8gICAgICAqIOiOt+WPlumYtOWOhuWvueW6lOeahOiKguWBh+aXpVxyXG4vLyAgICAgICogXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGgg6Zi05Y6G5pyIXHJcbi8vICAgICAgKiBAcGFyYW0gZGF5ICAg6Zi05Y6G5pelXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHByaXZhdGUgU3RyaW5nIGdldEx1bmFySG9saWRheShpbnQgbW9udGgsIGludCBkYXkpIHtcclxuLy8gICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGx1bmFySG9saWRheS5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgICAgICAgICAvLyDov5Tlm57lhpzljoboioLlgYfml6XlkI3np7BcclxuLy8gICAgICAgICAgICAgU3RyaW5nIGxkID0gbHVuYXJIb2xpZGF5W2ldLnNwbGl0KFwiIFwiKVswXTtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIGxkdiA9IGx1bmFySG9saWRheVtpXS5zcGxpdChcIiBcIilbMV07XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsbW9udGhfdiA9IG1vbnRoICsgXCJcIjtcclxuLy8gICAgICAgICAgICAgU3RyaW5nIGxkYXlfdiA9IGRheSArIFwiXCI7XHJcbi8vICAgICAgICAgICAgIFN0cmluZyBsbWQgPSBcIlwiO1xyXG4vLyAgICAgICAgICAgICBpZiAobW9udGggPCAxMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgbG1vbnRoX3YgPSBcIjBcIiArIG1vbnRoO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIGlmIChkYXkgPCAxMCkge1xyXG4vLyAgICAgICAgICAgICAgICAgbGRheV92ID0gXCIwXCIgKyBkYXk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgbG1kID0gbG1vbnRoX3YgKyBsZGF5X3Y7XHJcbi8vICAgICAgICAgICAgIGlmIChsZC50cmltKCkuZXF1YWxzKGxtZC50cmltKCkpKSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbGR2O1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJldHVybiBcIlwiO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgIC8qKlxyXG4vLyAgICAgICog5Yik5pat5YWs5Y6G5piv5ZCm5Li66Zew5bm0XHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyXHJcbi8vICAgICAgKiBAcmV0dXJuXHJcbi8vICAgICAgKi9cclxuLy8gICAgIHB1YmxpYyBib29sZWFuIGlzTGVhcFllYXIoaW50IHllYXIpIHtcclxuLy8gICAgICAgICBpZiAoeWVhciAlIDEwMCA9PSAwICYmIHllYXIgJSA0MDAgPT0gMCkge1xyXG4vLyAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuLy8gICAgICAgICB9IGVsc2UgaWYgKHllYXIgJSAxMDAgIT0gMCAmJiB5ZWFyICUgNCA9PSAwKSB7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgLyoqXHJcbi8vICAgICAgKiDliKTmlq3lhazljoblr7nlupTlubTmnIjnmoTlpKnmlbBcclxuLy8gICAgICAqIFxyXG4vLyAgICAgICogQHBhcmFtIGlzTGVhcFllYXJcclxuLy8gICAgICAqIEBwYXJhbSBtb250aFxyXG4vLyAgICAgICogQHJldHVyblxyXG4vLyAgICAgICovXHJcbi8vICAgICBwdWJsaWMgaW50IGdldERheXNPZk1vbnRoKGJvb2xlYW4gaXNMZWFwWWVhciwgaW50IG1vbnRoKSB7XHJcbi8vICAgICAgICAgc3dpdGNoIChtb250aCkge1xyXG4vLyAgICAgICAgIGNhc2UgMTpcclxuLy8gICAgICAgICBjYXNlIDM6XHJcbi8vICAgICAgICAgY2FzZSA1OlxyXG4vLyAgICAgICAgIGNhc2UgNzpcclxuLy8gICAgICAgICBjYXNlIDg6XHJcbi8vICAgICAgICAgY2FzZSAxMDpcclxuLy8gICAgICAgICBjYXNlIDEyOlxyXG4vLyAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IDMxO1xyXG4vLyAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICBjYXNlIDQ6XHJcbi8vICAgICAgICAgY2FzZSA2OlxyXG4vLyAgICAgICAgIGNhc2UgOTpcclxuLy8gICAgICAgICBjYXNlIDExOlxyXG4vLyAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IDMwO1xyXG4vLyAgICAgICAgICAgICBicmVhaztcclxuLy8gICAgICAgICBjYXNlIDI6XHJcbi8vICAgICAgICAgICAgIGlmIChpc0xlYXBZZWFyKSB7XHJcbi8vICAgICAgICAgICAgICAgICBkYXlzT2ZNb250aCA9IDI5O1xyXG4vLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgZGF5c09mTW9udGggPSAyODtcclxuLy8gICAgICAgICAgICAgfVxyXG5cclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgcmV0dXJuIGRheXNPZk1vbnRoO1xyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIC8qKlxyXG4vLyAgICAgICog5Yik5pat5YWs5Y6G5bm05pyI5pel5bGe5LqO5pif5pyf5YegXHJcbi8vICAgICAgKiBcclxuLy8gICAgICAqIEBwYXJhbSB5ZWFyXHJcbi8vICAgICAgKiBAcGFyYW0gbW9udGhcclxuLy8gICAgICAqIEByZXR1cm5cclxuLy8gICAgICAqL1xyXG4vLyAgICAgcHVibGljIGludCBnZXRXZWVrZGF5T2ZNb250aChpbnQgeWVhciwgaW50IG1vbnRoKSB7XHJcbi8vICAgICAgICAgQ2FsZW5kYXIgY2FsID0gQ2FsZW5kYXIuZ2V0SW5zdGFuY2UoKTtcclxuLy8gICAgICAgICBjYWwuc2V0KHllYXIsIG1vbnRoIC0gMSwgMSk7XHJcbi8vICAgICAgICAgZGF5T2ZXZWVrID0gY2FsLmdldChDYWxlbmRhci5EQVlfT0ZfV0VFSykgLSAxO1xyXG4vLyAgICAgICAgIHJldHVybiBkYXlPZldlZWs7XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcHVibGljIHN0YXRpYyB2b2lkIG1haW4oU3RyaW5nW10gYXJncykge1xyXG4vLyAgICAgICAgIEx1bmFyQ2FsZW5kYXIgY2FsZW5kYXIgPSBuZXcgTHVuYXJDYWxlbmRhcigyMDE5LCA5LCAxMyk7XHJcbi8vICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKFwiY2FsZW5kYXIuZ2V0THVuYXJEYXRlKCk6XCIgKyBjYWxlbmRhci5nZXRMdW5hckRhdGUoKSk7XHJcbi8vICAgICAgICAgU3lzdGVtLm91dC5wcmludGxuKFwiY2FsZW5kYXIuZ2V0Q3VycmVudEx1bmFySG9saWRheSgpOlwiICsgY2FsZW5kYXIuZ2V0Q3VycmVudEx1bmFySG9saWRheSgpKTtcclxuLy8gICAgICAgICBTeXN0ZW0ub3V0LnByaW50bG4oXCJjYWxlbmRhci5nZXRDdXJyZW50U29sYXJIb2xpZGF5KCk6XCIgKyBjYWxlbmRhci5nZXRDdXJyZW50U29sYXJIb2xpZGF5KCkpO1xyXG4vLyAgICAgfVxyXG4vLyB9XHJcbiIsIlxuXG5jb25zdCBOT0RFX1JFUExBQ0UgPSAwIC8vbm9kZSByZXBsYWNlIFxuY29uc3QgQ0hJTERfUkVfT1JERVIgPSAxIC8vY2hpbGQgbm9kZSByZSBvcmRlclxuY29uc3QgTk9ERV9QUk9QUyA9IDIgLy9wcm9wIGNoYW5nZSBcbmNvbnN0IE5PREVfQ09OVEVOVCA9IDMgLy9jb250ZW50IGNoYW5nZVxuY2xhc3MgRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICogdmlydHVhbCBkb20gb2JqZWN0IGNvbnN0cnVjdG9yXG4gICAgICogQHBhcmFtIHsqfSB0YWcgIHRoZSBodG1sIHRhZyBuYW1lXG4gICAgICogQHBhcmFtIHsqfSBwcm9wcyAgdGhlIHByb3AgKGtlee+8jHN0eWxlLi4pXG4gICAgICogQHBhcmFtIHsqfSBjaGlsZHJlbiBjaGlsZCBkYXRhXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQodGFnTmFtZSwgcHJvcHMsIGNoaWxkcmVuKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGFnID0gdGFnXG4gICAgICAgIHRoaXMucHJvcHMgPSBwcm9wcyB8fCB7fVxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gY2hpbGRyZW4gfHwgW11cbiAgICAgICAgdGhpcy5rZXkgPSBwcm9wcyA/IHByb3BzLmtleSA6IHVuZGVmaW5lZFxuICAgICAgICBpZiAoIXRoaXMua2V5KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7dGFnfSAuLi4gaHRtbCB0YWcgdGhlIGtleSBpcyB1bmRlZmluZWRgKVxuICAgICAgICB9XG4gICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgY291bnQgKz0gY2hpbGQuY291bnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY291bnQgPSBjb3VudFxuICAgIH1cbiAgICAvKipcbiAgICAgKiB0aGUgbWV0aG9kIHVzZSB0byB2aXJ0dWFsIGRvbSAgcmVuZGUgdG8gcmVhbCBkb21cbiAgICAgKi9cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcbiAgICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXG4gICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIFV0aWwuc2V0QXR0cihlbCwgcHJvcE5hbWUsIHByb3BzW3Byb3BOYW1lXSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbCA9IChjaGlsZCBpbnN0YW5jZW9mIEVsZW1lbnQpID8gY2hpbGQucmVuZGVyKCkgOiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjaGlsZClcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGNoaWxkRWwpXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG59XG5cbmNsYXNzIERpZmYge1xuICAgIC8qKlxuICAgICAqIGRvbSB0cmVlIGRpZmYgYWxnb3JpdGhtIG9iamVjdCBjb25zdHJ1Y3RvclxuICAgICAqIEBwYXJhbSB7Kn0gb2xkVHJlZSB0aGUgZG9tIHRyZWUgZm9yIGJlZm9yZSB1cGRhdGUgXG4gICAgICogQHBhcmFtIHsqfSBuZXdUcmVlIHRoZSBkb20gdHJlZSBmb3IgYWZ0ZXIgdXBkYXRlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2xkVHJlZSwgbmV3VHJlZSkge1xuICAgICAgICB0aGlzLmluZGV4ID0gMFxuICAgICAgICB0aGlzLnBhdGNoZXMgPSB7fVxuICAgICAgICB0aGlzLmRmc1dhbGsob2xkVHJlZSwgbmV3VHJlZSwgdGhpcy5pbmRleClcbiAgICB9XG4gICAgZGZzV2FsayhvbGROb2RlLCBuZXdOb2RlLCBpbmRleCkge1xuICAgICAgICBsZXQgY3VycmVudFBhdGNoID0gW11cbiAgICAgICAgaWYgKG5ld05vZGUgPT0gbnVsbCkge1xuXG4gICAgICAgIH0gZWxzZSBpZiAoVXRpbC5pc1N0cmluZyhvbGROb2RlKSAmJiBVdGlsLmlzU3RyaW5nKG5ld05vZGUpKSB7XG4gICAgICAgICAgICBpZiAob2xkTm9kZSAhPSBuZXdOb2RlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBOT0RFX0NPTlRFTlQsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IG5ld05vZGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9sZE5vZGUudGFnTmFtZSA9PT0gbmV3Tm9kZS50YWdOYW1lICYmIG9sZE5vZGUua2V5ID09IG5ld05vZGUua2V5KSB7XG4gICAgICAgICAgICBsZXQgcHJvcHNQYXRjaGVzID0gdGhpcy5kaWZmUHJvcHMob2xkTm9kZSwgbmV3Tm9kZSlcbiAgICAgICAgICAgIGlmIChwcm9wc1BhdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0Y2gucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUFJPUFMsXG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiBwcm9wc1BhdGNoZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFVdGlsLmlzSWdub3JlQ2hpbGRyZW4obmV3Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpZmZDaGlsZHJlbihvbGROb2RlLmNoaWxkcmVuLCBuZXdOb2RlLmNoaWxkcmVuLCBpbmRleCwgY3VycmVudFBhdGNoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IE5PREVfUkVQTEFDRSxcbiAgICAgICAgICAgICAgICBub2RlOiBuZXdOb2RlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50UGF0Y2gubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGNoZXNbaW5kZXhdID0gY3VycmVudFBhdGNoXG4gICAgICAgIH1cbiAgICB9XG4gICAgZGlmZlByb3BzKG9sZE5vZGUsIG5ld05vZGUpIHtcblxuICAgICAgICBjb25zdCBvbGRQcm9wcyA9IG9sZE5vZGUucHJvcHNcbiAgICAgICAgY29uc3QgbmV3UHJvcHMgPSBuZXdOb2RlLnByb3BzXG5cbiAgICAgICAgY29uc3QgcHJvcHNQYXRjaGVzID0ge31cbiAgICAgICAgbGV0IGlzU2FtZSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvbGRQcm9wcykge1xuICAgICAgICAgICAgaWYgKG5ld1Byb3BzW2tleV0gIT09IG9sZFByb3BzW2tleV0pIHtcbiAgICAgICAgICAgICAgICBpc1NhbWUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIHByb3BzUGF0Y2hlc1trZXldID0gbmV3UHJvcHNba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBuZXdQcm9wcykge1xuICAgICAgICAgICAgaWYgKCFvbGRQcm9wcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaXNTYW1lID0gZmFsc2VcbiAgICAgICAgICAgICAgICBwcm9wc1BhdGNoZXNba2V5XSA9IG5ld1Byb3BzW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNTYW1lID8gbnVsbCA6IHByb3BzUGF0Y2hlc1xuXG4gICAgfVxuICAgIGRpZmZDaGlsZHJlbihvbGRDaGlsZHJlbiwgbmV3Q2hpbGRyZW4sIGluZGV4LCBjdXJyZW50UGF0Y2gpIHtcbiAgICAgICAgbGV0IGRpZmZMaXN0ID0gbmV3IERpZmZMaXN0KG9sZENoaWxkcmVuLCBuZXdDaGlsZHJlbilcbiAgICAgICAgbGV0IGRpZmZzID0gZGlmZkxpc3QuZ2V0UmVzdWx0KClcbiAgICAgICAgbmV3Q2hpbGRyZW4gPSBkaWZmcy5jaGlsZFxuICAgICAgICBpZiAoZGlmZnMubW92ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgcmVvcmRlclBhdGNoID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IENISUxEX1JFX09SREVSLFxuICAgICAgICAgICAgICAgIG1vdmVzOiBkaWZmcy5tb3Zlc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3VycmVudFBhdGNoLnB1c2gocmVvcmRlclBhdGNoKVxuICAgICAgICB9XG4gICAgICAgIGxldCBsZWZ0Tm9kZSA9IG51bGxcbiAgICAgICAgbGV0IGN1cnJlbnROb2RlSW5kZXggPSBpbmRleFxuICAgICAgICBvbGRDaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IG5ld0NoaWxkID0gbmV3Q2hpbGRyZW5baV1cbiAgICAgICAgICAgIGN1cnJlbnROb2RlSW5kZXggPSAobGVmdE5vZGUgJiYgbGVmdE5vZGUuY291bnQpID9cbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ICsgbGVmdE5vZGUuY291bnQgKyAxIDpcbiAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZUluZGV4ICsgMVxuICAgICAgICAgICAgdGhpcy5kZnNXYWxrKGNoaWxkLCBuZXdDaGlsZCwgY3VycmVudE5vZGVJbmRleClcbiAgICAgICAgICAgIGxlZnROb2RlID0gY2hpbGRcbiAgICAgICAgfSlcblxuXG4gICAgfVxufVxuXG5jbGFzcyBQYXRjaCB7XG4gICAgY29uc3RydWN0b3Iobm9kZSwgcGF0Y2hlcykge1xuICAgICAgICBsZXQgd2Fsa2VyID0ge1xuICAgICAgICAgICAgaW5kZXg6IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRmc1dhbGsobm9kZSwgd2Fsa2VyLCBwYXRjaGVzKVxuICAgIH1cbiAgICBkZnNXYWxrKG5vZGUsIHdhbGtlciwgcGF0Y2hlcykge1xuICAgICAgICBsZXQgY3VycmVudFBhdGNoZXMgPSBwYXRjaGVzW3dhbGtlci5pbmRleF1cbiAgICAgICAgbGV0IGxlbiA9IG5vZGUuY2hpbGROb2RlcyA/IG5vZGUuY2hpbGROb2Rlcy5sZW5ndGggOiAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IG5vZGUuY2hpbGROb2Rlc1tpXVxuICAgICAgICAgICAgd2Fsa2VyLmluZGV4KytcbiAgICAgICAgICAgIHRoaXMuZGZzV2FsayhjaGlsZCwgd2Fsa2VyLCBwYXRjaGVzKVxuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50UGF0Y2hlcykge1xuICAgICAgICAgICAgdGhpcy5hcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZXMpXG4gICAgICAgIH1cblxuICAgIH1cbiAgICBhcHBseVBhdGNoZXMobm9kZSwgY3VycmVudFBhdGNoZSkge1xuICAgICAgICBjdXJyZW50UGF0Y2hlLmZvckVhY2goKGN1cnJlbnRQYXRjaCkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChjdXJyZW50UGF0Y2gudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgTk9ERV9SRVBMQUNFOlxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3Tm9kZSA9IFV0aWwuaXNTdHJpbmcoY3VycmVudFBhdGNoLm5vZGUpID8gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3VycmVudFBhdGNoLm5vZGUpIDogY3VycmVudFBhdGNoLm5vZGUucmVuZGVyKClcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCBub2RlKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgQ0hJTERfUkVfT1JERVI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVvcmRlckNoaWxkcmVuKG5vZGUsIGN1cnJlbnRQYXRjaC5tb3ZlcylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBjYXNlIE5PREVfUFJPUFM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcHMobm9kZSwgY3VycmVudFBhdGNoLnByb3BzKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgTk9ERV9DT05URU5UOlxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IGN1cnJlbnRQYXRjaC5jb250ZW50XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLm5vZGVWYWx1ZSA9IGN1cnJlbnRQYXRjaC5jb250ZW50XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlb3JkZXJDaGlsZHJlbihub2RlLCBtb3Zlcykge1xuICAgICAgICBsZXQgc3RhdGljTm9kZUxpc3QgPSBVdGlsLnRvQXJyYXkobm9kZS5jaGlsZE5vZGVzKVxuICAgICAgICBsZXQgbm9kZU1hcHMgPSB7fVxuICAgICAgICBzdGF0aWNOb2RlTGlzdC5mb3JFYWNoKChzbm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHNub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IHNub2RlLmdldEF0dHJpYnV0ZSgna2V5JylcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVNYXBzW2tleV0gPSBzbm9kZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgbW92ZXMuZm9yRWFjaCgobW92ZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gbW92ZS5pbmRleFxuICAgICAgICAgICAgaWYgKG1vdmUudHlwZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0aWNOb2RlTGlzdFtpbmRleF0gPT09IG5vZGUuY2hpbGROb2Rlc1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmNoaWxkTm9kZXNbaW5kZXhdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGF0aWNOb2RlTGlzdC5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdmUudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBpbnNlcnROb2RlID0gbm9kZU1hcHNbbW92ZS5pdGVtLmtleV0gP1xuICAgICAgICAgICAgICAgICAgICBub2RlTWFwcyhtb3ZlLml0ZW0ua2V5KS5jbG9uZU5vZGUodHJ1ZSkgOlxuICAgICAgICAgICAgICAgICAgICBVdGlsLmlzU3RyaW5nKG1vdmUuaXRlbSkgPyBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtb3ZlLml0ZW0pIDogbW92ZS5pdGVtLnJlbmRlcigpXG4gICAgICAgICAgICAgICAgc3RhdGljTm9kZUxpc3Quc3BsaWNlKGluZGV4LCAwLCBpbnNlcnROb2RlKVxuICAgICAgICAgICAgICAgIG5vZGUuaW5zZXJ0QmVmb3JlKGluc2VydE5vZGUsIG5vZGUuY2hpbGROb2Rlc1tpbmRleF0gfHwgbnVsbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cbiAgICBzZXRQcm9wcyhub2RlLCBwcm9wcykge1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgIGlmIChwcm9wc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShrZXkpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcHJvcHNba2V5XVxuICAgICAgICAgICAgICAgIFV0aWwuc2V0QXR0cihub2RlLCBrZXksIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG59XG5cblxuXG5cbmNsYXNzIFV0aWwge1xuICAgIHN0YXRpYyBpc1N0cmluZyhzb21lKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygc29tZSA9PT0gJ3N0cmluZydcbiAgICB9XG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xuICAgICAgICBpZiAoIWxpc3QpIHtcbiAgICAgICAgICAgIHJldHVybiBbXVxuICAgICAgICB9XG4gICAgICAgIGxldCBhcnJheSA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJyYXkucHVzaChsaXN0W2ldKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhcnJheVxuICAgIH1cbiAgICBzdGF0aWMgaXNGb3JJbihkaXJlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIC9eXFx3KiBfaW5fIFxcdyokLy50ZXN0KGRpcmVjdGlvbilcbiAgICB9XG4gICAgc3RhdGljIGlzRm9yRm9ySW4oZGlyZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiAvXlxcdyogX2luKiQvLnRlc3QoZGlyZWN0aW9uKVxuICAgIH1cblxuICAgIHN0YXRpYyBpc0Zvck9yRm9yRm9yKGRpcmVjdGlvbikge1xuICAgICAgICByZXR1cm4gL15cXHcqIF9pbl8gXFx3fF9pbiokLy50ZXN0KGRpcmVjdGlvbilcbiAgICB9XG4gICAgc3RhdGljIGlzSWdub3JlQ2hpbGRyZW4obm9kZSkge1xuICAgICAgICByZXR1cm4gbm9kZS5wcm9wcyAmJiBub2RlLnByb3BzLmhhc093blByb3BlcnR5KFwiaWdub3JlXCIpXG4gICAgfVxuICAgIHN0YXRpYyBzZXRBdHRyKG5vZGUsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ3N0eWxlJzpcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLmNzc1RleHQgPSB2YWx1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd2YWx1ZSc6XG4gICAgICAgICAgICAgICAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWUgfHwgJydcbiAgICAgICAgICAgICAgICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdpbnB1dCcgfHwgdGFnTmFtZSA9PT0gJ3RleHRhcmVhJykge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnZhbHVlID0gdmFsdWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZShrZXksIHZhbHVlKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgIH1cbn1cblxuXG5jbGFzcyBEaWZmTGlzdCB7XG4gICAgLyoqXG4gICAgICogZGlmZiBsaXN0IFxuICAgICAqIEBwYXJhbSB7Kn0gb2xkTGlzdCBcbiAgICAgKiBAcGFyYW0geyp9IG5ld0xpc3QgXG4gICAgICogQHBhcmFtIHsqfSBrZXkgXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob2xkTGlzdCwgbmV3TGlzdCkge1xuICAgICAgICBsZXQgb2xkTGlzdEtleUluZGV4ID0gdGhpcy5tYWtlS2V5SW5kZXgob2xkTGlzdCkua2V5SW5kZXhcbiAgICAgICAgbGV0IG5ld0xpc3RLZXlJbmRleCA9IHRoaXMubWFrZUtleUluZGV4KG5ld0xpc3QpLmtleUluZGV4XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yID0gW11cbiAgICAgICAgdGhpcy5jaGlsZExpc3QgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9sZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBvbGRJdGVtID0gb2xkTGlzdFtpXVxuICAgICAgICAgICAgbGV0IG9JdGVtS2V5ID0gdGhpcy5nZXRLZXkob2xkSXRlbSlcbiAgICAgICAgICAgIGlmICghbmV3TGlzdEtleUluZGV4Lmhhc093blByb3BlcnR5KG9JdGVtS2V5KSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRMaXN0LnB1c2gobnVsbClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZExpc3QucHVzaChuZXdMaXN0W25ld0xpc3RLZXlJbmRleFtvSXRlbUtleV1dKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVtcExpc3QgPSB0aGlzLmNoaWxkTGlzdC5zbGljZSgwKVxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgdGhpcy50ZW1wTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRlbXBMaXN0W2ldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoaSlcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUNvcHlUZW1wTGlzdChpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpKytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IG5JdGVtID0gbmV3TGlzdFtpXVxuICAgICAgICAgICAgbGV0IG5JdGVtS2V5ID0gdGhpcy5nZXRLZXkobkl0ZW0pXG4gICAgICAgICAgICBsZXQgY0l0ZW0gPSB0aGlzLnRlbXBMaXN0W2luZGV4XVxuICAgICAgICAgICAgbGV0IGNJdGVtS2V5ID0gdGhpcy5nZXRLZXkoY0l0ZW0pXG4gICAgICAgICAgICBpZiAoY0l0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAobkl0ZW1LZXkgIT0gY0l0ZW1LZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZExpc3RLZXlJbmRleC5oYXNPd25Qcm9wZXJ0eShuSXRlbUtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjTmV4dEl0ZW1LZXkgPSBnZXRLZXkodGhpcy50ZW1wTGlzdFtpbmRleCArIDFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5JdGVtS2V5ID09PSBjTmV4dEl0ZW1LZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQ29weVRlbXBMaXN0KGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnNlcnQoaSwgbkl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydChpLCBuSXRlbSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0KGksIG5JdGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBrID0gdGhpcy50ZW1wTGlzdC5sZW5ndGggLSBpbmRleFxuICAgICAgICB3aGlsZSAoaW5kZXgrKyA8IHRoaXMudGVtcExpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICBrLS1cbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGsgKyBuZXdMaXN0Lmxlbmd0aClcbiAgICAgICAgfVxuXG5cbiAgICB9XG4gICAgbWFrZUtleUluZGV4KGxpc3QpIHtcbiAgICAgICAgbGV0IGtleUluZGV4ID0ge31cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaXRlbSA9IGxpc3RbaV1cbiAgICAgICAgICAgIGxldCBpdGVtS2V5ID0gdGhpcy5nZXRLZXkoaXRlbSlcbiAgICAgICAgICAgIGtleUluZGV4W2l0ZW1LZXldID0gaVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBrZXlJbmRleDoga2V5SW5kZXhcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleShpdGVtKSB7XG4gICAgICAgIGlmICghaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpdGVtW1wia2V5XCJdXG4gICAgfVxuICAgIHJlbW92ZUNvcHlUZW1wTGlzdChpbmRleCkge1xuICAgICAgICB0aGlzLnRlbXBMaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gICAgcmVtb3ZlKGluZGV4KSB7XG4gICAgICAgIHRoaXMubW92ZU9wZXJhdG9yLnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgdHlwZTogMFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGluc2VydChpbmRleCwgaXRlbSkge1xuICAgICAgICB0aGlzLm1vdmVPcGVyYXRvci5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICAgICAgICB0eXBlOiAxXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZ2V0UmVzdWx0KCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbW92ZXM6IHRoaXMubW92ZU9wZXJhdG9yLFxuICAgICAgICAgICAgY2hpbGQ6IHRoaXMuY2hpbGRMaXN0XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG5mdW5jdGlvbiBvYnNlcnZlKG9iaiwgb2JzZXJ2ZU1hcCwgY2FsbGJhY2spIHtcblxuICAgIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgaW50ZXJuYWxWYWx1ZSA9IG9ialtrZXldXG4gICAgICAgIGxldCBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxuICAgICAgICBvYnNlcnZlTWFwLnB1dChrZXksIG9ic2VydmFibGUpXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUuYWRkKGNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIHJldHVybiBpbnRlcm5hbFZhbHVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBpbnRlcm5hbFZhbHVlICE9PSBuZXdWYWxcbiAgICAgICAgICAgICAgICBpbnRlcm5hbFZhbHVlID0gbmV3VmFsXG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZS5pbnZva2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBvYmpcbn1cblxuXG5cbmZ1bmN0aW9uIE9ic2VydmFibGUoKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMgPSBuZXcgU2V0KClcbn1cbk9ic2VydmFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChvYnNlcnZhYmxlVXBkYXRlKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMuYWRkKG9ic2VydmFibGVVcGRhdGUpXG59XG5PYnNlcnZhYmxlLnByb3RvdHlwZS5pbnZva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVGdW5jdGlvbnMuZm9yRWFjaChmdW4gPT4gZnVuKCkpXG59XG5cblxuLyoqXG4gKiB0aGUgbWV0aG9kIHVzZSB0byBkZWVwIGNsb25lIG9ialxuICogQHBhcmFtIHsqfSBvYmogXG4gKi9cbmZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgIGxldCBnZXRUeXBlID0gKG8pID0+IHtcbiAgICAgICAgaWYgKG8gPT09IG51bGwpIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgaWYgKG8gPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0LCBvQ2xhc3MgPSBnZXRUeXBlKG9iaik7XG4gICAgaWYgKG9DbGFzcyA9PT0gXCJPYmplY3RcIikge1xuICAgICAgICByZXN1bHQgPSB7fTtcbiAgICB9IGVsc2UgaWYgKG9DbGFzcyA9PT0gXCJBcnJheVwiKSB7XG4gICAgICAgIHJlc3VsdCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICBsZXQgY29weSA9IG9ialtrZXldO1xuICAgICAgICBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIk9iamVjdFwiKSB7XG4gICAgICAgICAgICByZXN1bHRba2V5XSA9IGFyZ3VtZW50cy5jYWxsZWUoY29weSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2V0VHlwZShjb3B5KSA9PSBcIkFycmF5XCIpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gYXJndW1lbnRzLmNhbGxlZShjb3B5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gb2JqW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuXG5mdW5jdGlvbiBoKHRhZ05hbWUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHJldHVybiBuZXcgRWxlbWVudCh0YWdOYW1lLCBwcm9wcywgY2hpbGRyZW4pXG59XG5cbmZ1bmN0aW9uIGRpZmYob2xkVHJlZSwgbmV3VHJlZSkge1xuICAgIGxldCBkID0gbmV3IERpZmYob2xkVHJlZSwgbmV3VHJlZSlcbiAgICByZXR1cm4gZC5wYXRjaGVzXG59XG5cblxuZnVuY3Rpb24gcGF0Y2gobm9kZSwgcGF0Y2hlcykge1xuICAgIHJldHVybiBuZXcgUGF0Y2gobm9kZSwgcGF0Y2hlcylcbn1cbi8qKlxuICogdGhlIG1hcCBvYmplY3QgdXNlIHRvIHNhdmUgbGlraWx5IChrZXksdmFsdWUpIGRhdGFcbiAqL1xuY2xhc3MgTWFwIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcbiAgICB9XG4gICAgcHV0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMubWFwKSkge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGgrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcFtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIChrZXkgaW4gdGhpcy5tYXApID8gdGhpcy5tYXBba2V5XSA6IG51bGw7XG4gICAgfVxuICAgIHJlbW92ZShrZXkpIHtcbiAgICAgICAgaWYgKChrZXkgaW4gdGhpcy5tYXApKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5tYXBba2V5XVxuICAgICAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfVxuICAgIGNsZWFyKCkge1xuICAgICAgICBsZW5ndGggPSAwO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBPYmplY3QoKTtcbiAgICB9XG59XG5cblxuY2xhc3MgUlYge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbikge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBlbCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBkb21cbiAgICAgICAgfSA9IG9wdGlvblxuICAgICAgICBsZXQgcm9vdCA9IFV0aWwuaXNTdHJpbmcoZWwpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCkgOiBlbFxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhXG4gICAgICAgIHRoaXMudmUgPSB0aGlzLmdldFZpcnR1YWxFbGVtZW50KHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSlcbiAgICAgICAgdGhpcy53ID0gdGhpcy52ZS5yZW5kZXIoKVxuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMudylcbiAgICAgICAgdGhpcy5vYnNlcnZlTWFwID0gbmV3IE1hcCgpXG4gICAgICAgIG9ic2VydmUodGhpcy5kYXRhLCB0aGlzLm9ic2VydmVNYXAsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZG9tKGRvbSlcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy51cGRhdGVkb20oZG9tKVxuXG4gICAgfVxuICAgIHVwZGF0ZWRvbShkb20pIHtcbiAgICAgICAgbGV0IG52ZSA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQodGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20pKVxuICAgICAgICB3aW5kb3cubnZlID0gbnZlXG4gICAgICAgIHdpbmRvdy52ZSA9IHRoaXMudmVcbiAgICAgICAgcGF0Y2godGhpcy53LCBkaWZmKHRoaXMudmUsIG52ZSkpXG4gICAgICAgIHRoaXMudmUgPSBudmVcbiAgICB9XG4gICAgd2F0Y2goa2V5LCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLm9ic2VydmVNYXAuZ2V0KGtleSkuYWRkKGNhbGxiYWNrKVxuICAgIH1cbiAgICBnZXRWaXJ0dWFsRWxlbWVudChkb20pIHtcbiAgICAgICAgbGV0IGNoaWxkcmVuID0gW11cbiAgICAgICAgZm9yIChsZXQgY2hpbGQgaW4gZG9tLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBsZXQgY2MgPSBkb20uY2hpbGRyZW5bY2hpbGRdXG4gICAgICAgICAgICBpZiAoY2MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgIGNjLmZvckVhY2goYyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2ID0gdGhpcy5nZXRWaXJ0dWFsRWxlbWVudChjKVxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKHYpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY2MgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuZ2V0VmlydHVhbEVsZW1lbnQoY2MpXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaCh2KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNjKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGgoZG9tLnRhZywgZG9tLnByb3BzLCBjaGlsZHJlbilcbiAgICB9XG4gICAgYXBwbHlUcnV0aGZ1bERhdGEoZG9tKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbHlUcnV0aGZ1bERhdGEsZG9tLmtleXM6XCIgKyBPYmplY3Qua2V5cyhkb20pICsgXCIsY2hpbGREb21EYXRhOlwiICsgKFwiY2hpbGREb21EYXRhXCIgaW4gZG9tKSlcbiAgICAgICAgaWYgKFwiZm9yXCIgaW4gZG9tLnByb3BzIHx8IFwiZm9yX2ZvclwiIGluIGRvbS5wcm9wcykge1xuICAgICAgICAgICAgbGV0IGRhdGFBcnJheSA9IFtdXG4gICAgICAgICAgICBsZXQgaXNGb3JGb3IgPSBmYWxzZVxuICAgICAgICAgICAgbGV0IGRhdGFTaW5nbGVcbiAgICAgICAgICAgIGlmIChkb20ucHJvcHNbJ2ZvciddKSB7IC8vYWRkIGZvciBkaXJlY3Rpb25cbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0Zvck9yRm9yRm9yKGRvbS5wcm9wc1snZm9yJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20uZm9yRGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JJbihkb20ucHJvcHNbJ2ZvciddKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBsYXNlIHVzZSBfaW4gZGlyZWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSBkb20uZm9yRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNpbmdsZSA9IGRvbS5wcm9wc1snZm9yJ10uc3BsaXQoXCIgX2luXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvciBpbiBmb3Jmb3IgZGF0YVNpbmdsZTpcIiArIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0ZvckZvckluKGRvbS5wcm9wc1snZm9yJ10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGxhc2UgdXNlIF9pbl8gZGlyZWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSB0aGlzLmRhdGFbZG9tLnByb3BzWydmb3InXS5zcGxpdChcIiBfaW5fIFwiKVsxXV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2ZvciddLnNwbGl0KFwiIF9pbl8gXCIpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvciAgZGF0YVNpbmdsZTpcIiArIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRvbS5wcm9wc1snZm9yX2ZvciddKSB7IC8vYWRkIGZvcl9mb3IgZGlyZWN0aW9uXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JPckZvckZvcihkb20ucHJvcHNbJ2Zvcl9mb3InXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNGb3JGb3JJbihkb20ucHJvcHNbJ2Zvcl9mb3InXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBsYXNlIHVzZSBfaW5fIGRpcmVjdGlvblwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzRm9yRm9yID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkgPSB0aGlzLmRhdGFbZG9tLnByb3BzWydmb3JfZm9yJ10uc3BsaXQoXCIgX2luXyBcIilbMV1dXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTaW5nbGUgPSBkb20ucHJvcHNbJ2Zvcl9mb3InXS5zcGxpdChcIiBfaW5fIFwiKVswXVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZvcl9mb3IgIGRhdGFTaW5nbGU6XCIgKyBkYXRhU2luZ2xlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7IH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidGhlIGZvciBkaXJlY3Rpb24gdXNlIGVycm9yXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgb2JqcyA9IFtdXG4gICAgICAgICAgICBkYXRhQXJyYXkuZm9yRWFjaChkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb2JqID0ge31cbiAgICAgICAgICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xuICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbiA9IFtdXG4gICAgICAgICAgICAgICAgb2JqLnByb3BzID0ge31cbiAgICAgICAgICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUgPSBwcm9wc1twcm9wXVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlLmluZGV4T2YoXCIsXCIpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVzID0gc3R5bGUuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlQXJyYXlTdHlsZShkYXRhLCBzdHlsZXMsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiY2hpbGREb21EYXRhXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9tLmNoaWxkcmVuLmZvckVhY2goY2hpbGREb20gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZERvbSwgXCJjaGlsZERvbURhdGFcIiwgeyB2YWx1ZTogZGF0YSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgXCJkb21EYXRhXCIsIHsgdmFsdWU6IGRhdGEgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hpbGREb21EYXRhOm9iajpcIisoXCJkb21EYXRhXCIgaW4gb2JqKSlcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoZG9tLnByb3BzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKS5pbmRleE9mKGRhdGFTaW5nbGUpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSB0aGlzLmRhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20ucHJvcHNbdmFsdWVdKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pLnNwbGl0KFwiLlwiKVsxXV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoUlYuaXNPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGVyRXhwcmVzczpcIiArIFJWLmdldE9wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gUlYuZ2V0T3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gZG9tLnByb3BzW3ZhbHVlXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFwiZG9tRGF0YVwiIGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIxMTExMTExMTExMTExMTExMTEsLCxjaGlsZERvbURhdGEsdmFsdWU6XCIgKyBvYmouZG9tRGF0YSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkb20uY2hpbGREb21EYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSldXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcoZG9tLmNoaWxkcmVuW2NoaWxkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pLmluZGV4T2YoZGF0YVNpbmdsZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRoaXMuZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5jaGlsZHJlbltjaGlsZF0pXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRvbS5rZXlzOlwiICsgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoZG9tKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSkuc3BsaXQoXCIuXCIpWzFdXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZG9tLmNoaWxkcmVuW2NoaWxkXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZvckZvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5jaGlsZHJlbltjaGlsZF0uZm9yRGF0YSA9IGRhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9tLmNoaWxkcmVuW2NoaWxkXSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb20uY2hpbGRyZW5bY2hpbGRdLmRhdGEgPSBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gdGhpcy5hcHBseVRydXRoZnVsRGF0YShkb20uY2hpbGRyZW5bY2hpbGRdKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgICAgICBvYmpzLnB1c2gob2JqKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICApXG4gICAgICAgICAgICByZXR1cm4gb2Jqc1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbHNlLGRvbURhdGE6XCIrKFwiZGF0YVwiIGluIGRvbSkpXG4gICAgICAgICAgICBsZXQgZGF0YVxuICAgICAgICAgICAgaWYoXCJkYXRhXCIgaW4gZG9tKXtcbiAgICAgICAgICAgICAgICBkYXRhPWRvbS5kYXRhXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkYXRhPXRoaXMuZGF0YVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IG9iaiA9IHt9XG4gICAgICAgICAgICBvYmoudGFnID0gZG9tLnRhZ1xuICAgICAgICAgICAgb2JqLmNoaWxkcmVuID0gW11cbiAgICAgICAgICAgIG9iai5wcm9wcyA9IHt9XG4gICAgICAgICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyhkb20ucHJvcHMpXG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlID0gcHJvcHNbcHJvcF1cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwic3R5bGVcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBkb20ucHJvcHNbdmFsdWVdXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHlsZS5pbmRleE9mKFwiLFwiKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3R5bGVzID0gc3R5bGUuc3BsaXQoXCIsXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvcHNbdmFsdWVdID0gdGhpcy5oYW5kbGVTaW5nbGVTdHlsZShkYXRhLCBzdHlsZSwgdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJjaGlsZERvbURhdGFcIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBkb20uY2hpbGRyZW4uZm9yRWFjaChjaGlsZERvbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hpbGREb20sIFwiY2hpbGREb21EYXRhXCIsIHsgdmFsdWU6IHRoaXMuZGF0YSB9KVxuICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAvLyBPYmplY3QuZGVmaW5lUHJvcGVydHkoZG9tLCBcImRvbURhdGFcIiwgeyB2YWx1ZTogdGhpcy5kYXRhIH0pXG5cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihkb20ucHJvcHNbdmFsdWVdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLnByb3BzW3ZhbHVlXSA9IHRoaXMuZGF0YVtSVi5nZXRQbGFjZUhvbGRlclZhbHVlKGRvbS5wcm9wc1t2YWx1ZV0pXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKFJWLmlzT3BlcmF0b3JFeHByZXNzaW9uKGRvbS5wcm9wc1t2YWx1ZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm9wZXJhdGVyRXhwcmVzczpcIiArIFJWLmdldE9wZXJhdG9yRXhwcmVzc2lvbihkb20ucHJvcHNbdmFsdWVdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBSVi5nZXRPcGVyYXRvckV4cHJlc3Npb24oZG9tLnByb3BzW3ZhbHVlXSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5wcm9wc1t2YWx1ZV0gPSBkb20ucHJvcHNbdmFsdWVdXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKGxldCBjaGlsZCBpbiBkb20uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihkb20uY2hpbGRyZW5bY2hpbGRdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlPVJWLmdldFBsYWNlSG9sZGVyVmFsdWUoZG9tLmNoaWxkcmVuW2NoaWxkXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImVsc2UsdmFsdWU6XCIrdmFsdWUrXCIsZGF0YTpcIitKU09OLnN0cmluZ2lmeShkYXRhKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlLmluZGV4T2YoXCIuXCIpPjApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5jaGlsZHJlbltjaGlsZF0gPSBkYXRhW3ZhbHVlLnNwbGl0KCcuJylbMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJlbHNlLHZhbHVlOlwiK3ZhbHVlK1wiLGRhdGE6XCIrSlNPTi5zdHJpbmdpZnkoZGF0YSkrXCIsLi4uOlwiK29iai5jaGlsZHJlbltjaGlsZF0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouY2hpbGRyZW5bY2hpbGRdID0gZGF0YVt2YWx1ZV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJvYmouY2hpbGRyZW46XCIgKyBKU09OLnN0cmluZ2lmeShvYmouY2hpbGRyZW4pKVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoXCJkb21EYXRhXCIgaW4gZG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAvLyBsZXQgZGF0YVNpbmdsZT1PYmplY3Qua2V5cyhkb20uY2hpbGREb21EYXRhKVswXVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJjaGlsZERvbURhdGEgZGF0YVNpbmdsZTpcIitkYXRhU2luZ2xlKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gdmFsdWU9ZG9tLmNoaWxkRG9tRGF0YVtkYXRhU2luZ2xlXVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coXCJjaGlsZERvbURhdGEsdmFsdWU6XCIrdmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcImNoaWxkRG9tRGF0YSxrZXlzOix2YWx1ZTpcIiArIGRvbS5kb21EYXRhKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gb2JqLmNoaWxkcmVuW2NoaWxkXSA9IGRvbS5jaGlsZERvbURhdGFbUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShkb20uY2hpbGRyZW5bY2hpbGRdKV1cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IGRvbS5jaGlsZHJlbltjaGlsZF1cbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgb2JqLmNoaWxkcmVuW2NoaWxkXSA9IHRoaXMuYXBwbHlUcnV0aGZ1bERhdGEoZG9tLmNoaWxkcmVuW2NoaWxkXSlcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib2JqLmNoaWxkcmVuLDI6XCIgKyBKU09OLnN0cmluZ2lmeShvYmouY2hpbGRyZW4pKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGlsZERvbURhdGEsb2JqLGpzOlwiICsoSlNPTi5zdHJpbmdpZnkob2JqKSkgKVxuICAgICAgICAgICAgcmV0dXJuIG9ialxuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVNpbmdsZVN0eWxlKGRhdGEsIHN0eWxlLCBkYXRhU2luZ2xlKSB7XG4gICAgICAgIGxldCBuZXdTdHlsZSA9ICcnXG4gICAgICAgIGlmIChkYXRhU2luZ2xlKSB7XG4gICAgICAgICAgICBpZiAoUlYuaXNQbGFjZUhvbGRlcihzdHlsZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuaW5kZXhPZihkYXRhU2luZ2xlKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5ID0gUlYuZ2V0UGxhY2VIb2xkZXJWYWx1ZShzdHlsZSkuc3BsaXQoXCIuXCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gZGF0YVtrZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVZhbHVlID0gc3R5bGUuc3BsaXQoXCI6XCIpWzFdXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXG4gICAgICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVLZXkgKyBcIjpcIiArIHN0eWxlVmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGV0IHN0eWxlS2V5ID0gc3R5bGUuc3BsaXQoXCI6XCIpWzBdXG4gICAgICAgICAgICBsZXQgc3R5bGVWYWx1ZSA9IHN0eWxlLnNwbGl0KFwiOlwiKVsxXVxuICAgICAgICAgICAgaWYgKFJWLmlzUGxhY2VIb2xkZXIoc3R5bGVWYWx1ZSkpIHtcblxuICAgICAgICAgICAgICAgIHN0eWxlVmFsdWUgPSBkYXRhW1JWLmdldFBsYWNlSG9sZGVyVmFsdWUoc3R5bGVWYWx1ZSldXG4gICAgICAgICAgICAgICAgbmV3U3R5bGUgPSBzdHlsZUtleSArIFwiOlwiICsgc3R5bGVWYWx1ZVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1N0eWxlID0gc3R5bGVcblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdTdHlsZVxuICAgIH1cbiAgICBoYW5kbGVBcnJheVN0eWxlKGRhdGEsIHN0eWxlcywgZGF0YVNpbmdsZSkge1xuICAgICAgICBsZXQgbmV3U3R5bGVBcnJheSA9IFwiXCJcbiAgICAgICAgZm9yIChsZXQgc3R5bGUgb2Ygc3R5bGVzKSB7XG5cbiAgICAgICAgICAgIGxldCBuZXdTdHlsZSA9IHRoaXMuaGFuZGxlU2luZ2xlU3R5bGUoZGF0YSwgc3R5bGUsIGRhdGFTaW5nbGUpXG4gICAgICAgICAgICBuZXdTdHlsZUFycmF5ICs9IG5ld1N0eWxlICsgXCI7XCJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3U3R5bGVBcnJheVxuXG4gICAgfVxuICAgIHN0YXRpYyBpc1BsYWNlSG9sZGVyKGNvbnRlbnQpIHtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAgIGlmIChjb250ZW50LnN0YXJ0c1dpdGgoXCIlI1wiKSAmJiBjb250ZW50LmVuZHNXaXRoKFwiIyVcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFBsYWNlSG9sZGVyVmFsdWUoY29udGVudCkge1xuICAgICAgICByZXR1cm4gY29udGVudC5zbGljZSgyLCAtMilcbiAgICB9XG4gICAgLyoqXG4gICAgICog5piv5ZCm5Li66KGo6L6+5byPXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGNvbnRlbnQgXG4gICAgICovXG4gICAgc3RhdGljIGlzT3BlcmF0b3JFeHByZXNzaW9uKGNvbnRlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpc09wZXJhdG9yRXhwcmVzc2lvbjpcIiArIHR5cGVvZiBjb250ZW50ICsgXCIsY29udGVudDpcIiArIGNvbnRlbnQpXG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudC5pbmRleE9mKFwie1wiKSAhPSAtMSAmJiBjb250ZW50LmluZGV4T2YoXCJ9XCIpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJpc09wZXJhdG9yIHRydWVcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzT3BlcmF0b3IgZmFsc2VcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgc3RhdGljIGdldE9wZXJhdG9yRXhwcmVzc2lvbihjb250ZW50LCBkYXRhKSB7XG4gICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZ2V0T3BlcmF0b3JFeHByZXNzaW9uLGNvbnRlbnQ6JHtjb250ZW50fWApXG4gICAgICAgICAgICB2YXIgZXhwcmVzc2lvbiA9IGNvbnRlbnQuc2xpY2UoY29udGVudC5pbmRleE9mKFwie1wiKSArIDEsIGNvbnRlbnQuaW5kZXhPZihcIn1cIikpXG4gICAgICAgICAgICBsZXQgc3RhcnRJbmRleCA9IGV4cHJlc3Npb24uaW5kZXhPZihcIiUjXCIpXG4gICAgICAgICAgICBsZXQgZW5kSW5kZXggPSBleHByZXNzaW9uLmluZGV4T2YoXCIjJVwiKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb250ZW50OlwiICsgY29udGVudCArIFwiLGV4cHJlc3Npb246XCIgKyBleHByZXNzaW9uKVxuICAgICAgICAgICAgaWYgKHN0YXJ0SW5kZXggIT0gLTEgJiYgZW5kSW5kZXggIT0gLTEgJiYgc3RhcnRJbmRleCA8IGVuZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBsYWNlSG9sZGVyID0gZXhwcmVzc2lvbi5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleClcbiAgICAgICAgICAgICAgICBsZXQgcmVhbFZhbHVlID0gZGF0YVtwbGFjZUhvbGRlcl0vL+mAmui/h3BsYWNlSG9sZGVy5Y+W55yf5a6e55qE5YC8XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbi5yZXBsYWNlKHBsYWNlSG9sZGVyLCByZWFsVmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImV2YWwgZXhwcmVzc2lvbixldmFsOlwiICsgZXZhbChleHByZXNzaW9uKSlcbiAgICAgICAgICAgIHJldHVybiBldmFsKGV4cHJlc3Npb24pXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJWIl0sInNvdXJjZVJvb3QiOiIifQ==