var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var DaishuSchema = new Schema({
	id:Number,
	url:String,
    count_order:Number,  //订单数量
    count_pay:Number, //付款数量
    money:Number,  //付款金额
    createtime:Number, //创建时间
    time:Number //统计时间
});

var DaishuModel = db.model('Daishu', DaishuSchema);
module.exports = DaishuModel;