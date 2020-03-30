const moment = require('moment');

export default {
    formatTime
}

function formatTime(time) {
    let update = moment(time, "HHmm");
    return update.format("hh:mm a")
}