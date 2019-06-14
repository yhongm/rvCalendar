# 一个简单的响应式日历组件，rv.js写成
[rv.js](https://github.com/yhongm.rv.js)
# 使用方法



```javascript
    import generateView from 'RVcalendar'
    window.onload = function () {
    generateView("#app", function (selectDay) {
        console.log("select,:"+selectDay)
    })
}
```

