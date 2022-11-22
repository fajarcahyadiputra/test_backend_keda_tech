const moment = require('moment');

module.exports = (ratesInDay, ratesInHours, date_in, date_out) => {
    let price_total, total_times;
    var date_in = moment(date_in, 'MM-DD-YYYY HH:mm:SS');
    var date_out = moment(date_out, 'MM-DD-YYYY HH:mm:SS');
    const calculate_in_secounds = date_out.diff(date_in, "seconds");
    const calculate_in_hours = Math.floor(calculate_in_secounds / 3600);

    if (calculate_in_hours >= 24) {
        let count_hours_in_day, price_in_day, price_in_hours;
        const count_day = Math.floor(calculate_in_secounds / 86400);
        const remaning_minute = (calculate_in_secounds % 86400) / 60;
        const remaning_hours = Math.floor(remaning_minute / 60);
        const remaning_minute_in_hours = (remaning_minute % 60);
        if (remaning_minute_in_hours > 1) {
            count_hours_in_day = remaning_hours + 1;
        } else {
            count_hours_in_day = remaning_hours;
        }
        price_in_day = ratesInDay * count_day;
        price_in_hours = ratesInHours * count_hours_in_day;
        price_total = price_in_day + price_in_hours;
        // console.log(remaning_minute);
        total_times = count_hours_in_day + (24 * count_day)
    } else {
        const remaning_minute = (calculate_in_secounds % 3600) / 60;
        //untuk perhitungan jika menit lebih dari satu menit
        if (remaning_minute > 1) {
            total_times = calculate_in_hours + 1;
        } else {
            total_times = calculate_in_hours;
        }
        price_total = ratesInHours * total_times;
        total_times = total_times;
    }

    return { total_times, price_total }
}