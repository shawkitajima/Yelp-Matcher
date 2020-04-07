const moment = require('moment');

export default {
    formatTime,
    formatDate,
}

function formatTime(time) {
    let update = moment(time, "HHmm");
    return update.format("h:mma")
}

// 2020-03-05 04:51:09
function formatDate(date) {
    let update = moment(date, "YYYY-MM-DD HH:mm:ss");
    return update.format("M/D/YYYY")
}