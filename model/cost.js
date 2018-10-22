var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var CostSchema = new Schema({
    url:String,
    cost:Number,
    createtime:Number,
    time: {
        type: Number,
        default: Date.now
    }
});

var CostModel = db.model('Cost', CostSchema);
module.exports = CostModel;