const schedule = require("node-schedule");
const consumeModel = require('../model/consume')
const http = require('http')
let d = new Date()
let date = formatDate(d)
function get_data() {
    let url = 'http://union.ads8.com/api/mobile/api/interface/action?token=V2RXYl59DmZfblVoBmNcbQAqUFFTZQ41V3MGPFxiWDIBcAA7VDtWM1liVG5WZAELWndWdgBkVXMHCgQzVWYBZANgUzMFZ1hqBGQBcQRpBWdXcVdpXmYOP186VXQGYlx4AD1QfFNwDglXZgYxXHtYOQEkACI=&date=' + date
    http.get(url, res => {
        var rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                console.log(parsedData.data);
                let dataList = [], result= {};
                for (var i = 0; i < parsedData.data.advert_list.length; i++) {
                    let that = parsedData.data.advert_list[i]
                    result = {
                        platform: 5,
                        amount: parsedData.data.account_amount,
                        adId: that.id,
                        showCount: that.count_pv,
                        clickCount: that.count_click,
                        consume: that.amount_advert,
                        timeStamp: timestamp_date()
                    }
                    dataList.push(result)
                }
                consumeModel.create(result)
            } catch (e) {
                console.error(e.message);
            }
        });
    })
}


function formatDate(now) { 
    var year=now.getFullYear(); 
    var month=now.getMonth()+1; 
    if(month < 10) {
        month = '0' + month
    }
    var day=now.getDate(); 
    return year+"-"+month+"-"+day;
} 
function timestamp_date() {
    var date = new Date()
    var ms = date.getMinutes()
    var set_ms = 15 * parseInt(ms / 15)
    return date.setMinutes(set_ms, 0, 0)
}

var rule = new schedule.RecurrenceRule();
var times = [0, 15, 30, 45];
rule.minute = times;
schedule.scheduleJob(rule, function () {
    console.log('更新无忧统计信息');
    get_data()
});