var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var BookSchema = new Schema({
	id:Number,
	url:String,
    count:String,
    count_pay:String,
    money:String,
    createtime:String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' }
});

var BookModel = db.model('Book', BookSchema);
module.exports = BookModel;