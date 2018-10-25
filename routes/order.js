const express = require('express');
const router = express.Router();
const OrderModel = require('../model/order');

router.get('/', async(req, res, next) => {
    let doc = await OrderModel.find()
    res.send({data: doc})
})


module.exports = router;