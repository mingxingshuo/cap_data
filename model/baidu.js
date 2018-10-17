var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var BaiduSchema = new Schema({
	id:Number,
    status:Number,//0一级1二级
	url:String,
    pv:Number,  //pv数量
    uv:Number, //uv数量
    ip_count:Number,  //ip数量
    createtime:Number, //创建时间
    time:Number //记录时间
});

var BaiduModel = db.model('Baidu', BaiduSchema);
module.exports = BaiduModel;