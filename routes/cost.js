var express = require('express');
var router = express.Router();
var CostModel = require('../model/cost');

router.post('/create', async(req, res, next) => {
    let url = req.body.url
    let cost = req.body.cost
    let createtime = req.body.createtime
    let data = {
        url: url,
        cost: cost,
        createtime: createtime
    }
    let doc = await CostModel.create(data)
    if (doc) {
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

module.exports = router;