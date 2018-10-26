const schedule = require("node-schedule");
const BaiduModel = require('../model/baidu')
const DaishuModel = require('../model/daishu')
const LinkModel = require('../model/link')
const CostModel = require('../model/cost')
const TongjiModel = require('../model/tongji')

async function tongji(con = {}) {
    let links = await LinkModel.find(con)
    for (let link of links) {
        console.log(link, '--------------link')
        var arr = link.out_url.split('/')
        var baidu_url = arr[arr.length - 2] + '/' + arr[arr.length - 1]
        console.log(baidu_url)
        let Baidu = await BaiduModel.find({url: baidu_url}).limit(1).sort({time: -1})
        let Daishu = await DaishuModel.find({url: link.url}).limit(1).sort({time: -1})
        let zeroDaishu = await DaishuModel.find({url: link.url, time: {$lte: date_zero()}}).limit(1).sort({time: -1})
        console.log(Baidu, '--------------Baidu')
        console.log(Daishu, '--------------Daishu')
        console.log(zeroDaishu, '--------------zeroDaishu')
        let today_money = Daishu[0].money - zeroDaishu[0].money
        let pv = 0
        let uv = 0
        if (Baidu.length) {
            pv = Baidu[0].pv
            uv = Baidu[0].uv
        }
        console.log(today_money, '--------------today_money')
        let Cost = await CostModel.find({url: link.url}).limit(1).sort({createtime: -1})
        // let yesterdayCost = await CostModel.find({
        //     url: link.url,
        //     createtime: {$lt: date_zero()}
        // }).limit(1).sort({createtime: -1})
        // let today_cost = Cost[0].cost || 0
        // if (Cost[0] && Cost[0].cost && yesterdayCost[0] && yesterdayCost[0].cost) {
        //     today_cost = Cost[0].cost - yesterdayCost[0].cost
        // }
        console.log(Cost, '--------------Cost')
        // console.log(yesterdayCost, '--------------yesterday_Cost')
        // console.log(today_cost, '--------------today_cost')

        let count_order = Daishu[0].count_order || 0
        let count_pay = Daishu[0].count_pay || 0
        let pay_rate = '0.00%'
        if (count_pay && count_order) {
            pay_rate = (count_pay / count_order * 100).toFixed(2) + '%'
        }
        let back = '0.00%'
        if (Daishu[0].money && Cost[0].cost) {
            back = (Daishu[0].money / Cost[0].cost * 100).toFixed(2) + '%'
        }
        // let today_back = '0.00%'
        // if (today_money && today_cost) {
        //     today_back = (today_money / today_cost * 100).toFixed(2) + '%'
        // }

        let data = {
            url: link.url,
            out_url: link.out_url,
            pv: pv,
            uv: uv,
            ip_count: Baidu[0].ip_count,
            count_order: count_order,
            count_pay: count_pay,
            pay_rate: pay_rate,
            yuedu: Daishu[0].yuedu || 0,
            money: Daishu[0].money,
            cost: Cost[0].cost,
            back: back,
            today_money: today_money,
            // today_cost: today_cost,
            // today_back: today_back,
            createtime: timestamp_date()
        }
        await TongjiModel.update({
            url: link.url,
            createtime: timestamp_date()
        }, data, {upsert: true})
    }
}

function timestamp_date() {
    var date = new Date()
    var ms = date.getMinutes()
    var set_ms = 15 * parseInt(ms / 15)
    return date.setMinutes(set_ms, 0, 0)
}

function date_zero() {
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today.getTime();
}

function start() {
    var rule = new schedule.RecurrenceRule();
    var times = [3, 8, 13, 18, 23, 28, 33, 38, 43, 48, 53, 58];
    rule.minute = times;
    schedule.scheduleJob(rule, function () {
        console.log('创建统计信息');
        tongji()
    });
}
tongji()
module.exports = {
    start: start,
    tongji: tongji
}
