import generateView from './src/RVcalendar'
    window.onload = function () {
    generateView("#app", function (selectDay) {
        console.log("select,:"+selectDay)
    })}