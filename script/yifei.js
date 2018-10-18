const rp = require('request-promise-any')
const async = require('async');
const cheerio = require('cheerio')
const schedule = require("node-schedule");
const consumeModel = require('../model/consume')
var j = rp.jar()
var zlib = require('zlib');

var cookie_string;
var isLogin = false;

function asy_zip(buffer){
    return new Promise((resolve, reject) => {
        zlib.gunzip(buffer, function(err, decoded) {
            // console.log('err', err)
            resolve(decoded.toString());
        })
    })
}

function get_cookie(){
    return new Promise((resolve, reject) => {
        var url = 'http://www.1fei.com/userads/AdvertiserIndex.php'
        rp({url: url, jar: j})
        .then(function (body) {
          cookie_string = j.getCookieString(url)
          resolve()
        })
        .catch(function (err) { 
            reject(err)
        })
    })
}

async function login_byCookie(...func){
    await get_cookie()
    var url = 'http://www.1fei.com/login.php?username=480203648@qq.com&password=123456'
    var options = {  
        url:url, 
        jar: j,
        method:"get",
        encoding : null,
        headers: {  
            "Accept":"application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive", 
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
        }
    }
    options.headers.Cookie = cookie_string
    var buff = await rp(options)
    cookie_string = j.getCookieString(url)
    body = await asy_zip(buff)
    console.log('------login-----')
    isLogin = true;
    console.log('------to do func-------')
    if(func.length==1){
        func[0]()
    }else if(func.length==2){
        func[0](func[1])  
    }
}
async function get_data(cb){
    console.log('-------get_data func-------\r\n')
    var url = 'http://www.1fei.com/userads/AdvertiserIndex.php'
    var options = {  
        url:url,
        method:"get",
        encoding : null,
        headers: {  
            "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive", 
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", 
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
        }
    }
    options.headers.Cookie = cookie_string
    var body = await rp(options)
    body = await asy_zip(body)
    console.log('--------body--------')
    if(isLogin == true){
        isLogin = false
        cb(body)
    }else{
        await login_byCookie(arguments.callee,cb)
    }
}
function filterDataList(html) {
    if (html) {
        var $ = cheerio.load(html);
        var tableList = $('#index_balance');
        var dataList = [];
        tableList.find('ul li').each(function(item) {
            var that = $(this);
            dataList.push({
                platform: 3,
                adId: that.find('span').eq(0).text(),
                adName: that.find('span').eq(1).text(),
                deliveryType: that.find('span').eq(2).text(),
                releaseData:  that.find('span').eq(3).text(),
                billingMethod:  that.find('span').eq(4).text(),
                delivery:  that.find('span').eq(5).text(),
                consume:  that.find('span').eq(6).text(),
                clickRate:  that.find('span').eq(7).text(),
                timeStamp: timestamp_date()
            });
        });
        return dataList;
    } else {
        console.log('无数据传入！');
    }
}

function timestamp_date() {
    var date = new Date()
    var ms = date.getMinutes()
    var set_ms = 15 * parseInt(ms / 15)
    return date.setMinutes(set_ms, 0, 0)
}

var rule = new schedule.RecurrenceRule();
var times = [0, 15, 30, 45];
rule.minute = times;
schedule.scheduleJob(rule, function () {
    console.log('更新一飞统计信息');
    get_data(function(data) {
        var dataList = filterDataList(data);
        consumeModel.create(dataList)
    });
});
