const express = require('express');
const router = express.Router();
const TongjiModel = require('../model/tongji')

router.get('/', async(req, res, next) => {
    let url = req.query.url
    let doc = await TongjiModel.find({url: url}).limit(1).sort({createtime: -1})
    res.send({data: doc})
})

module.exports = router;