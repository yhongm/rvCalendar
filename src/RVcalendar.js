import RV from 'yhongm_rv.js'
import lunarCalendar from './lunar'

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
    this.rv = undefined
    if ((this.today.year == this.newCal.getFullYear()) && (this.today.month == this.newCal.getMonth())) {
        this.day = this.today.day;
    }
}
Calendar.prototype.getWeeks = function () {
    this.newCal = new Date(this.year, this.month, 1);
    this.day = -1;
    this.startDay = this.newCal.getDay();
    this.daily = 0;
    if ((this.today.year == this.newCal.getFullYear()) && (this.today.month == this.newCal.getMonth())) {
        this.day = this.today.day;
    }
    var dayCounts = this.getDayCounts(this.newCal.getMonth(), this.newCal.getFullYear());
    var weeks = []
    for (var i = 0; i < 6; i++) {
        var dayInWeeks = []
        dayInWeeks.id = `week_row_${i}`
        for (var j = 0; j < 7; j++) {
            var _cellObj = {}
            var content = ""
            var style = ""
            var lable = ""
            var id = `week_day_${i}${j}`
            if ((j == this.startDay) && (0 == this.daily)) {
                this.daily = 1;
            }

            if (this.day == this.daily) {
                style = "font-weight:bold;color:#FFFFFF;background-color:#5CBA5A;height:20px;text-align:center"
                lable = "current"
            } else if (j == 6) {
                style = "color:#FF0000;text-decoration:none;background-color:#E5E9F2;text-align:center;height:18px;width:12%"
                lable = "sat"
            } else if (j == 0) {
                style = "color: #FF0000;text-decoration:none;background-color:#E5E9F2;text-align:center;height:18px;width:12%"
                lable = "sun"
            } else {
                style = "color:#243F65;background-color:#E5E9F2;height:20px;width:11%;text-align:center"
                lable = "normal"

            }

            if ((this.daily > 0) && (this.daily <= dayCounts)) {
                content = this.daily + "";
                this.daily++;
            } else {
                style = "color:#000000;background-color: #f6f6f6;height:20px;width: 11%;text-align:center"
                content = "";

            }
            _cellObj.content = content
            _cellObj.id = id
            _cellObj.lable = lable
            _cellObj.style = style
            let lunar = lunarCalendar.getLunar(this.year, this.month+1, content)
            _cellObj.content = content
            _cellObj.id = id
            _cellObj.lable = lable
            _cellObj.style = style
            let lunarInfo = ""
            if (lunar.calendaricity != "") {
                lunarInfo = lunar.calendaricity

            } else if (lunar.solarHoliday) {
                lunarInfo = lunar.solarHoliday

            } else if (lunar.lunarHoliday) {
                lunarInfo = lunar.lunarHoliday
            } else {
                if(lunar.chinaDay==="初一"){
                    lunarInfo = lunar.chinaMonth 
                }else{
                    lunarInfo= lunar.chinaDay
                }
                

            }
            if(content != ""){
                _cellObj.lunarInfo = lunarInfo
            }else{
                _cellObj.lunarInfo = ""
            }
           
            dayInWeeks.push(_cellObj)
        }
        weeks.push(dayInWeeks)
        window.weeks = weeks
    }
    return weeks
}
Calendar.prototype.getDayCounts = function (month, year) {
    if (1 == month) {
        return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28
    } else {
        return this.dayCounts[month]
    }
}
Calendar.prototype.getToday = function () {
    var _obj = {}
    var now = new Date();
    _obj.now = now
    _obj.year = now.getFullYear();
    _obj.month = now.getMonth();
    _obj.day = now.getDate();
    return _obj
}

Calendar.prototype.subMonth = function () {
    if ((this.month - 1) < 0) {
        this.month = 11;
        this.year = this.year - 1;
    } else {
        this.month = this.month - 1;
    }
}
Calendar.prototype.addMonth = function () {
    if ((this.month + 1) > 11) {
        this.month = 0;
        this.year = this.year + 1;
    } else {
        this.month = this.month + 1;
    }
}
Calendar.prototype.setMonth = function (month) {
    if (month < 1 || month > 12) {
        alert("月份必须在1-12之间!");
        return;
    }
    this.month = month
}
Calendar.prototype.setYear = function (year) {
    this.year = year
}


window.mouseOver = function (element) {
    element.style.color = "#FFFFFF"
}

window.mouseOut = function (element) {
    var label = element.getAttribute('lable')
    if (label == 'sat' || label == 'sun') {
        element.style.color = "#FF0000"
    } else {
        element.style.color = "#000000"
    }

}
let mCalendar = new Calendar()
window.mCalendar = mCalendar
window.clickDay = function (element) {
    if (element.innerText != '') {
        var day = new Date(mCalendar.year, mCalendar.month, element.children[0].innerText
            )
        mCalendar.selectDay = day
    }
}

export default function generateView(el, callback) {
    var weeks = mCalendar.getWeeks()
    let rv = new RV({
        el: el,
        data: {
            year: '' + mCalendar.year,
            month: '' + (mCalendar.month + 1),
            weekTitles: [{
                id: "weekkey1",
                value: "一"
            },
            {
                id: "weekkey2",
                value: "二"
            },
            {
                id: "weekkey3",
                value: "三"
            },
            {
                id: "weekkey4",
                value: "四"
            },
            {
                id: "weekkey5",
                value: "五"
            },
            ],
            weeks: weeks
        },
        template:`
              <table border="0" cellpadding="0" cellspacing="1" id="caltable" key="table" style="text-decoration:none;width:200;background-color:#D0D0EE;font-size:8pt;border:0px dotted #1C6FF5;">
                <thead key="thead">
                <tr align="center" valign="middle" id="title" key="title" style="font-weight:normal;height:24px;text-align:center;color:#333333;text-decoration:none;background-color:#A4B9D7;border-top-width:1px;border-right-width:1px;border-bottom-width: 1px; border-left-width: 1px;border-bottom-style: 1px;border-top-color: #999999;border-right-color: #999999;border-bottom-color:#999999;border-left-color:#999999;">
                   <td colspan="7" key="tdTitle">
                      <div key="titleDiv">
                          <button key="subButton"  style="font-size:1px; color:#243F65;cursor:hand;text-decoration:none;margin-right:2px" onclick="mCalendar.subMonth()">"上月"</button>
                          <input name="year" type="text"  maxlength="4" size="4"  value="%#year#%" disabled="disabled" key="inputYear"></input>
                          <input name="month" type="text"  maxlength="2" size="2"  value="%#month#%" disabled="disabled" key="inputMonth"></input>
                          <button key="addButton"  style="font-size:1px; color:#243F65;cursor:hand;text-decoration:none;margin-left:2px" onclick="mCalendar.addMonth()">"下月"</button>
                      </div>
                   </td>
                </tr>
                <tr key="daytr">
                  <td style="color: #FF0000;text-decoration: none;background-color: #C0D0E8;text-align: center;height: 20px;width: 12%;" key="daySunTitle">"日"</td>
                  <td style="color:#000000;background-color:#C0D0E8;height:20px;width:11%;text-align:center;"  key="%#v.id#%" for="v _in_ weekTitles">"%#v.value#%"</td>
                  <td style="color: #FF0000;text-decoration: none;background-color: #C0D0E8;text-align: center;height: 20px;width: 12%;" key="daySatTitle">"六"</td>
                </tr>
              </thead>
                <tbody cellspacing="0" cellpadding="0" id="calendar" style="text-decoration: none;width: 170;background-color: #C0D0E8;font-size: 9pt;border: 0px dotted #1C6FA5;"  align="center" border="1" key="tbody">
                  <tr style="cursor:hand" key="%#week.id#%" for="week _in_ weeks" domData="week">
                      <td  key="%#v.id#%" onclick="clickDay(this)" style="%#v.style#%" lable="%#v.lable#%" onMouseover="mouseOver(this)" onMouseOut="mouseOut(this)" childDomData="v" for="v _in_ week">
                          <p key="{%#v.id#%+'_content'}" style="margin-block-start: 0em;margin-block-end: 0em">"%#v.content#%"</p>
                          <p key="{%#v.id#%+'_lunarInfo'}" style="margin-block-start: 0em;margin-block-end: 0em" time="{new Date()}">"%#v.lunarInfo#%"</p>
                      </td>
                  </tr>
                </tbody>      
              </table>
              `
    })
    rv.run()
    
    let month = mCalendar['month']
    let year = mCalendar['year']
    let selectDay = mCalendar['selectDay']
    Object.defineProperty(mCalendar, 'month', {

        set(nvalue) {
            if (month != nvalue) {
                month = nvalue
                rv.data.weeks = mCalendar.getWeeks()
                rv.data.month = (nvalue + 1)
            }
        },
        get() {
            return month
        }
    })
    Object.defineProperty(mCalendar, 'year', {
        set(nvalue) {
            if (year != nvalue) {
                console.log("newYear:" + nvalue)
                year = nvalue
                rv.data.weeks = mCalendar.getWeeks()
                rv.data.year = nvalue
            }
        },

        get() {
            return year
        }

    })
    Object.defineProperty(mCalendar, 'selectDay', {
        set(nvalue) {
            if (selectDay != nvalue) {
                selectDay = nvalue
                callback(nvalue)
            }
        },
        get() {
            return selectDay
        }
    })
}