var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var TongjiSchema = new Schema({
	url:String,
    out_url:String,
    qudao:String, //渠道名
    name:String,//平台+服务号
    pv:Number,  //pv数量
    uv:Number, //uv数量
    ip_count:Number,  //ip数量
    count_order:Number,  //订单数量
    count_pay:Number, //付款数量
    pay_rate:String, //付款率
    yuedu:Number,
    money:Number, //充值金额
    cost:Number, //成本
    back:String, //回本率
    today_money:Number, //今日充值
    today_cost:Number, //今日成本
    today_back:String, //动态回本率
    linktime: String,
    createtime:Number //创建时间
});

var TongjiModel = db.model('Tongji', TongjiSchema);
module.exports = TongjiModel;