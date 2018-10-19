var express = require('express');
var router = express.Router();
const schedule = require("node-schedule");
const TongjiModel = require('../model/tongji')
const BaiduModel = require('../model/baidu')
const DaishuModel = require('../model/daishu')
const LinkModel = require('../model/link')

router.get('/', async(req, res, next) => {
    let url = req.query.url
    let doc = await CostModel.find({url: url}).limit(2).sort({createtime: 1})
    res.send({data: doc})
})

async function tongji() {
    let links = await LinkModel.find()
    for(let link of links){
        let baidu = await BaiduModel.find({url: url}).limit(1).sort({createtime: 1})
        let daishu = await DaishuModel.find({url: url}).limit(1).sort({createtime: 1})

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