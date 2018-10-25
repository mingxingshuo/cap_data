const express = require('express');
const router = express.Router();
const UserModel = require('../model/user');

router.get('/', async(req, res, next) => {
    let doc = await LinkModel.find()
    res.send({data: doc})
})

router.post('/create', async(req, res, next) => {
    let name = req.body.name
    let username = req.body.username
    let password = req.body.password
    let data = {
        name: name,
        username: username,
        password: password
    }
    let doc = await UserModel.create(data)
    if (doc) {
        res.send({success: '创建成功', data: doc})
    } else {
        res.send({err: '创建失败'})
    }
})

router.get('/del', async(req, res, next) => {
    let id = req.query.id
    var doc = await UserModel.findByIdAndRemove(id)
    if (doc) {
        res.send({success: '删除成功', data: doc})
    } else {
        res.send({err: '删除失败'})
    }
})

module.exports = router;