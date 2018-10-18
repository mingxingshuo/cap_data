var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url); 

var ConsumeSchema = new Schema({
    platform: Number,          // 0推锐, 1点锐, 2要琪, 3一飞, 4无忧  , 5有盟
    adId: {                    // 广告Id  
        type: Number,
        default: null
    },                           
    adName: {                  // 广告名称
        type: String,
        default: ''
    },            
    deliveryType: {            // 投放平台
        type: String,
        default: ''
    },
    releaseData:  {            // 投放数据
        type: String,
        default: ''
    },
    billingMethod:  {          // 结算方式
        type: String,
        default: ''
    },
    consume: {                 // 投放额、消耗
        type: String,
        default: ''
    },
    bannerConsume: {           // 横幅消耗
        type: String,
        default: ''
    },
    screenConsume: {           // 插屏消耗
        type: String,
        default: ''
    },
    clickConsume: {            // 点击消耗
        type: String,
        default: ''
    },
    showCount: {               // 展示量  PV
        type: String,
        default: ''
    },
    clickCount: {              // 点击数  UV
        type: String,
        default: ''
    },
    clickRate: {               // 点击率
        type: String,
        default: ''
    },
    accounts: {                // 结算数
        type: String,
        default: ''
    },
    delivery: {                // 日投放额
        type: String,
        default: ''
    },
    amount: {                  // 账户余额
        type: String,
        default: ''
    },
    timeStamp: Number,         // 抓取时间
    //createAt: Date.now()       // 创建时间
});

var ConsumeModel = db.model('Consume', ConsumeSchema);
module.exports = ConsumeModel;