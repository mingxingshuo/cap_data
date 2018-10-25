var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var OrderSchema = new Schema({
    username:String, //用户名
    name:String, //名称
    createdate:String, //创建时间
    money:Number, //总充值
    orders: Number, //订单数
    pay_orders: Number, //支付数
    pay_rate: Number //支付率
});

var OrderModel = db.model('Order', OrderSchema);
module.exports = OrderModel;