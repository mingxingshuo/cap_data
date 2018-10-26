const express = require('express');
const router = express.Router();
const TongjiModel = require('../model/tongji')
const LinkModel = require('../model/link')

router.get('/', async(req, res, next) => {
    let url = req.query.url
    let link = await LinkModel.find({url: url})
    console.log(link,'--------------link')
    let qudao = link[0].qudao || ""
    let name = link[0].name || ""
    let linktime = link[0].createtime || ""
    let tongji = await TongjiModel.find({url: url}).limit(1).sort({createtime: -1})
    let obj = tongji[0].toObject()
    obj.qudao = qudao
    obj.name = name
    obj.linktime = linktime
    res.send({data: obj})
})

module.exports = router;