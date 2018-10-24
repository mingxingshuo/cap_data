const express = require('express');
const router = express.Router();
const CostModel = require('../model/cost');
var tongji = require('../script/tongji');

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
        tongji.tongji()
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

module.exports = router;