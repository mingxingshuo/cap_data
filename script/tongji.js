const schedule = require("node-schedule");
const BaiduModel = require('../model/baidu')
const DaishuModel = require('../model/daishu')
const LinkModel = require('../model/link')
const CostModel = require('../model/cost')
const TongjiModel = require('../model/tongji')

async function tongji() {
    let arr = []
    let links = await LinkModel.find()
    for (let link of links) {
        console.log(link, '--------------link')
        let Baidu = await BaiduModel.find({url: link.out_url}).limit(1).sort({time: -1})
        let Daishu = await DaishuModel.find({url: link.url}).limit(1).sort({time: -1})
        let zeroDaishu = await DaishuModel.find({url: link.url, time: date_zero()})
        let today_money = Daishu[0].money - zeroDaishu[0].money
        console.log(Baidu, '--------------Baidu')
        console.log(Daishu, '--------------Daishu')
        console.log(zeroDaishu, '--------------zeroDaishu')
        console.log(today_money, '--------------today_money')
        let Cost = await CostModel.find({url: link.url}).limit(1).sort({createtime: -1})
        let yesterdayCost = await CostModel.find({
            url: link.url,
            createtime: {$lt: date_zero()}
        }).limit(1).sort({createtime: -1})
        let today_cost = 0
        if (yesterdayCost) {
            today_cost = Cost[0].cost - yesterdayCost[0].cost
        } else {
            today_cost = Cost[0].cost
        }
        console.log(Cost, '--------------Cost')
        console.log(yesterdayCost, '--------------yesterday_Cost')
        console.log(today_cost, '--------------today_cost')

        let count_order = Daishu[0].count_order || 0
        let count_pay = Daishu[0].count_pay || 0
        let pay_rate = '0'
        if (count_pay) {
            pay_rate = (count_pay / count_order * 100).toFixed(2) + '%'
        }
        let back = '0'
        if (Cost[0].cost) {
            back = (Daishu[0].money / Cost[0].cost * 100).toFixed(2) + '%'
        }
        let today_back = '0'
        if (today_cost) {
            today_back = (today_money / today_cost * 100).toFixed(2) + '%'
        }

        let data = {
            url: link.url,
            out_url: link.out_url,
            qudao: link.qudao,
            fuwuhao: link.fuwuhao,
            pv: Baidu[0].pv,
            uv: Baidu[0].uv,
            ip_count: Baidu[0].ip_count,
            count_order: count_order,
            count_pay: count_pay,
            pay_rate: pay_rate,
            yuedu: Daishu[0].yuedu || 0,
            money: Daishu[0].money,
            cost: Cost[0].cost,
            back: back,
            today_money: today_money,
            today_cost: today_cost,
            today_back: today_back,
            platform: link.platform,
            createtime: timestamp_date()
        }
        arr.push(data)
        // console.log(arr, '----------------')
    }
    await TongjiModel.create(arr)
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

var rule = new schedule.RecurrenceRule();
var times = [0, 15, 30, 45];
rule.minute = times;
schedule.scheduleJob(rule, function () {
    console.log('创建统计信息');
    tongji()
});
// tongji()
