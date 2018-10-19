var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var TongjiSchema = new Schema({
	url:String,
    out_url:String,
    qudao:String, //渠道名
    fuwuhao:String, //服务号名
    pv:Number,  //pv数量
    uv:Number, //uv数量
    ip_count:Number,  //ip数量
    count_order:Number,  //订单数量
    count_pay:Number, //付款数量
    money:Number, //金额
    cost:Number, //成本
    back:Number, //回本率
    platform:Number,
    createtime:Number //创建时间
});

var TongjiModel = db.model('Tongji', TongjiSchema);
module.exports = TongjiModel;