const express = require('express');
const router = express.Router();
const LinkModel = require('../model/link');

router.get('/', async(req, res, next) => {
    let doc = await LinkModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    let url = req.body.url
    let out_url = req.body.out_url
    let qudao = req.body.qudao
    let name = req.body.name
    let createtime = new Date(req.body.createtime)
    var o = {
        "Y": createtime.getFullYear(),
        "M": (createtime.getMonth() + 1) >= 10 ? String(createtime.getMonth() + 1) : '0' + (createtime.getMonth() + 1),
        "D": createtime.getDate() >= 10 ? String(createtime.getDate()) : '0' + createtime.getDate(),
        "h": createtime.getHours() > 10 ? createtime.getHours() : '0' + createtime.getHours(),
        "m": createtime.getMinutes() > 10 ? createtime.getMinutes() : '0' + createtime.getMinutes(),
        "s": createtime.getSeconds() > 10 ? createtime.getSeconds() : '0' + createtime.getSeconds()
    }
    let format = o.Y + "-" + o.M + "-" + o.D + " " + o.h + ":" + o.m + ":" + o.s
    let data = {
        url: url,
        out_url: out_url,
        qudao:qudao,
        name: name,
        createtime: format,
        time: timestamp_date()
    }
    // console.log(data)
    let doc = await LinkModel.create(data)
    // console.log('doc', doc)
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
    let qudao = req.body.qudao
    let name = req.body.name
    let createtime = new Date(req.body.createtime)
    var o = {
        "Y": createtime.getFullYear(),
        "M": (createtime.getMonth() + 1) >= 10 ? String(createtime.getMonth() + 1) : '0' + (createtime.getMonth() + 1),
        "D": createtime.getDate() >= 10 ? String(createtime.getDate()) : '0' + createtime.getDate(),
        "h": createtime.getHours() > 10 ? createtime.getHours() : '0' + createtime.getHours(),
        "m": createtime.getMinutes() > 10 ? createtime.getMinutes() : '0' + createtime.getMinutes(),
        "s": createtime.getSeconds() > 10 ? createtime.getSeconds() : '0' + createtime.getSeconds()
    }
    let format = o.Y + "-" + o.M + "-" + o.D + " " + o.h + ":" + o.m + ":" + o.s
    let data = {
        url: url,
        out_url: out_url,
        qudao:qudao,
        name:name,
        createtime: format,
        time: timestamp_date()
    }
    let doc = await LinkModel.findByIdAndUpdate(id,data)
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