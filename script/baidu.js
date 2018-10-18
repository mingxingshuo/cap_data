var rp = require('request-promise-any');
const schedule = require("node-schedule");
const baiduModel = require('../model/baidu')

async function get_sites() {
    var url = 'https://api.baidu.com/json/tongji/v1/ReportService/getSiteList'
    var options = {
        url: url,
        method: "POST",
        body: JSON.stringify({
            "header": {
                "account_type": 1,
                "password": "0309Cong",
                "token": "8db71199d2ec84df3996a16738628ba8",
                "username": "zhangzicong6"
            }
        })
    }
    var body = await rp(options)
    let data = JSON.parse(body).body.data[0].list[0]
    await baiduModel.create({
        id: data.site_id,
        status: 0,
        url:data.domain,
        createtime:new Date(data.create_time).getTime(),
        time: timestamp_date()
    })
    for (let d of data.sub_dir_list) {
        let id = d.sub_dir_id
        let name = d.name
        let createtime = new Date(d.create_time).getTime()
        get_data(id,name,createtime)
    }
}

async function get_data(id,name,createtime) {
    var arr = []
    var date = new Date()
    var o = {
        "Y": date.getFullYear(),
        "M": (date.getMonth() + 1) >= 10 ? String(date.getMonth() + 1) : '0' + (date.getMonth() + 1),
        "D": date.getDate() >= 10 ? String(date.getDate()) : '0' + date.getDate()
    }
    var d = o.Y + o.M + o.D
    var url = 'https://api.baidu.com/json/tongji/v1/ReportService/getData'
    var options = {
        url: url,
        method: "POST",
        body: JSON.stringify({
            "header": {
                "account_type": 1,
                "password": "0309Cong",
                "token": "8db71199d2ec84df3996a16738628ba8",
                "username": "zhangzicong6"
            },
            "body": {
                "siteId": id,
                "method": "source/all/a",
                "start_date": d,
                "end_date": d,
                "gran": "day",
                "metrics": "pv_count,visitor_count,ip_count"
            }
        })
    }
    var body = await rp(options)
    for (let data of JSON.parse(body).body.data) {
        let savedata = {
            id: id,
            url:name,
            status: 1,
            pv: parseInt(data.result.sum[0][0]) || 0,
            uv: parseInt(data.result.sum[0][1]) || 0,
            ip_count: parseInt(data.result.sum[0][2]) || 0,
            createtime:createtime,
            time: timestamp_date()
        }
        arr.push(savedata)
    }
    await baiduModel.create(arr)
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
    console.log('创建百度统计信息');
    get_sites();
});