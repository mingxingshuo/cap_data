var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var UserSchema = new Schema({
    name:String,
	username:String,
    password:String
});

var UserModel = db.model('User', UserSchema);
module.exports = UserModel;