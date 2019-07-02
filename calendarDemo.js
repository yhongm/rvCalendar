import generateView from './src/RVcalendar'
window.onload = function () {
    generateView("#app", function (selectDate) {
        alert("selectDate,:"+selectDate)
    })
}