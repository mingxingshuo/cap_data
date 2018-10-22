var express = require('express');
var router = express.Router();
const schedule = require("node-schedule");
const BaiduModel = require('../model/baidu')
const DaishuModel = require('../model/daishu')
const LinkModel = require('../model/link')
const CostModel = require('../model/cost')
const TongjiModel = require('../model/tongji')

router.get('/', async(req, res, next) => {
    let url = req.query.url
    let doc = await TongjiModel.find({url: url}).limit(1).sort({createtime: -1})
    res.send({data: doc})
})

async function tongji() {
    let arr = []
    let links = await LinkModel.find()
    for (let link of links) {
        console.log(link, '--------------link')
        let Baidu = await BaiduModel.find({url: link.out_url}).limit(1).sort({time: -1})
        let Daishu = await DaishuModel.find({url: link.url}).limit(1).sort({time: -1})
        console.log(Baidu, '--------------Baidu')
        console.log(Daishu, '--------------Daishu')
        let Cost = await CostModel.find({url: link.url}).limit(1).sort({time: -1})
        console.log(Cost[0], '--------------Cost')
        // let Cost = await CostModel.find({url: link.url}).limit(2).sort({createAt: -1})
        // console.log(Cost,'--------------Cost')
        // console.log((Cost[0].createtime - Cost[1].createtime),'---------------')
        // let cost_total = Cost[0].cost - Cost[1].cost
        // let count = (Cost[0].createtime - Cost[1].createtime)/(15*60*1000)
        // let cost = (cost_total/count).toFixed(2)
        // console.log(count,cost,'--------------cost')
        let data = {
            url: link.url,
            out_url: link.out_url,
            qudao: link.qudao,
            fuwuhao: link.fuwuhao,
            pv: Baidu[0].pv,
            uv: Baidu[0].uv,
            ip_count: Baidu[0].ip_count,
            count_order: Daishu[0].count_order || 0,
            count_pay: Daishu[0].count_pay || 0,
            yuedu: Daishu[0].yuedu || 0,
            money: Daishu[0].money,
            cost: Cost[0].cost,
            back: (Daishu[0].money / Cost[0].cost).toFixed(2),
            platform: link.platform,
            createtime: timestamp_date()
        }
        arr.push(data)
    }
    await TongjiModel.create(arr)
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
    console.log('创建统计信息');
    tongji()
});
// tongji()

module.exports = router;