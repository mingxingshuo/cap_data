var express = require('express');
var router = express.Router();
var ConsumeModel = require('../model/consume');

router.get('/', async(req, res, next) => {
    var docs = await ConsumeModel.find();
    for (var i = 0; i < docs.length; i++) {
        let createtime = new Date(docs[i].timeStamp)
        var o = {
            "Y": createtime.getFullYear(),
            "M": (createtime.getMonth() + 1) >= 10 ? String(createtime.getMonth() + 1) : '0' + (createtime.getMonth() + 1),
            "D": createtime.getDate() >= 10 ? String(createtime.getDate()) : '0' + createtime.getDate(),
            "h": createtime.getHours() > 10 ? createtime.getHours() : '0' + createtime.getHours(),
            "m": createtime.getMinutes() > 10 ? createtime.getMinutes() : '0' + createtime.getMinutes(),
            "s": createtime.getSeconds() > 10 ? createtime.getSeconds() : '0' + createtime.getSeconds()
        }
        let format = o.Y + "-" + o.M + "-" + o.D + " " + o.h + ":" + o.m + ":" + o.s
        docs[i].time = format
    }
    res.send({data: docs})
// })

module.exports = router;