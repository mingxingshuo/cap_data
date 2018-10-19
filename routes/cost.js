var express = require('express');
var router = express.Router();
var CostModel = require('../model/cost');

router.post('/create', async(req, res, next) => {
    let url = req.body.url
    let cost = req.body.cost || 0
    let data = {
        url: url,
        cost: cost,
        createtime: timestamp_date()
    }
    let doc = await CostModel.create(data)
    if (doc) {
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

function timestamp_date() {
    var date = new Date()
    var ms = date.getMinutes()
    var set_ms = 15 * parseInt(ms / 15)
    return date.setMinutes(set_ms, 0, 0)
}

module.exports = router;