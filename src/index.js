import generateView from './RTcalendar'
window.onload = function () {
    generateView("#app", function (selectDay) {
        console.log("select,:"+selectDay)
    })
}