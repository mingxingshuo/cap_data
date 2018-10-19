var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var LinkSchema = new Schema({
	url:String,
    out_url:String,
    qudao:String,
    fuwuhao:String,
    platform:Number,
    createtime:String, //创建时间
    time:Number
});

var LinkModel = db.model('Link', LinkSchema);
module.exports = LinkModel;