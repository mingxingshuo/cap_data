var express = require('express');
var router = express.Router();
var LinkModel = require('../model/link');

router.get('/', async(req, res, next) => {
    let doc = await LinkModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    let url = req.body.url
    let out_url = req.body.out_url
    let platform = req.body.platform
    let data = {
        url: url,
        out_url: out_url,
        platform: platform,
        createtime: timestamp_date()
    }
    let doc = await LinkModel.create(data)
    if (doc) {
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

router.post('/update', async(req, res, next) => {
    let id = req.body.id
    let url = req.body.url
    let out_url = req.body.out_url
    let platform = req.body.platform
    let data = {
        url: url,
        out_url: out_url,
        platform: platform,
        createtime: timestamp_date()
    }
    let doc = await LinkModel.findByIdAndUpdate(id, data)
    if (doc) {
        res.send({success: '修改成功', data: doc})
    } else {
        res.send({err: '修改失败'})
    }
})

router.get('/del', async(req, res, next) => {
    let id = req.query.id
    var doc = await LinkModel.findByIdAndRemove(id)
    if (doc) {
        res.send({success: '删除成功', data: doc})
    } else {
        res.send({err: '删除失败'})
    }
})

function timestamp_date() {
    var date = new Date()
    var ms = date.getMinutes()
    var set_ms = 15 * parseInt(ms / 15)
    return date.setMinutes(set_ms, 0, 0)
}

module.exports = router;