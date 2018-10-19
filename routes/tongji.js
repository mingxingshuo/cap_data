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
    let doc = await CostModel.find({url: url}).limit(2).sort({createtime: -1})
    res.send({data: doc})
})

async function tongji() {
    let links = await LinkModel.find()
    for (let link of links) {
        let Baidu = await BaiduModel.find({url: link.out_url}).limit(1).sort({createtime: -1})
        let Daishu = await DaishuModel.find({url: link.url}).limit(1).sort({createtime: -1})
        let Cost = await CostModel.find({url: link.url}).limit(2).sort({createtime: -1})
        let cost_total = Cost[0].cost - Cost[1].cost
        let count = (Cost[0].createtime - Cost[1].createtime)/15*60*1000
        let cost = cost_total/count
        let data = {
            url:link.url,
            pv:Baidu[0].pv,
            uv:Baidu[0].uv,
            ip_count:Baidu[0].ip_count,
            count_order:Daishu[0].count_order,
            count_pay:Daishu[0].count_pay,
            money:Daishu[0].money,
            cost:cost,
            platform:link.platform,
            createtime:timestamp_date()
        }
    }
    let doc = await TongjiModel.create(data)
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

module.exports = router;