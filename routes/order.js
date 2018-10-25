const express = require('express');
const router = express.Router();
const OrderModel = require('../model/order');

router.get('/', async(req, res, next) => {
    let date = new Date(Date.now()-24*3600*1000).Format("yyyyMMdd")
    let doc = await OrderModel.find({createdate:date})
    res.send({data: doc})
})


module.exports = router;