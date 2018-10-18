const rp = require('request-promise-any')
const async = require('async');
const cheerio = require('cheerio')
const schedule = require("node-schedule");
const consumeModel = require('../model/consume')
var j = rp.jar()
var zlib = require('zlib');

var cookie_string;

function forDate(date) {
    for (var i = 0; i < date.length; i++) {
        var reg = new RegExp("-");
        var a = date[i].replace(reg,"");
        date[i] = a
    }
}

function asy_zip(buffer){
	return new Promise((resolve, reject) => {
		zlib.gunzip(buffer, function(err, decoded) {
			console.log(err)
	        resolve(decoded.toString());
	    })
    })
}

function get_cookie(){
	return new Promise((resolve, reject) => {
		var url = 'https://www.tuirui.com/'
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
	console.log('------post login------\r\n')
	var url = 'https://www.tuirui.com/login.php'
	var options = {  
		url:url, 
		jar: j,
		method:"POST",
		encoding : null,
		headers: {  
			"Accept":"application/json, text/javascript, */*; q=0.01",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "en-US,en;q=0.5",
		    "Connection": "keep-alive", 
		    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
		    "X-Requested-With": "XMLHttpRequest",
		    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
		},
		form: {
			username : '480203648@qq.com',
			password : '123456',
			act : 'login',
	        keeplogin : 0
	    }
	}
	options.headers.Cookie = cookie_string
	var body = await rp(options)
	cookie_string = j.getCookieString(url)
	body = await asy_zip(body)
	console.log('------login-----')
	// console.log('body1111', body)

	console.log('------to do func-------')
	if(func.length==1){
		func[0]()
	}else if(func.length==2){
		func[0](func[1])
	}
}

async function get_data(cb){
	console.log('-------get_data func-------\r\n')
	var url = 'https://www.tuirui.com/Ader/index.php'
	var options = {  
		url:url,
		method:"POST",
		encoding : null,
		headers: {  
			"Accept":"application/json, text/javascript, */*; q=0.01",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
		    "Connection": "keep-alive", 
		    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8", 
		    "X-Requested-With": "XMLHttpRequest",
		    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
		},
		form: {
			"act":"getChargeData",
			"adId" : 0
		}
	};
	options.headers.Cookie = cookie_string
	var body = await rp(options)
	body = await asy_zip(body)
	console.log('--------body--------')
	var data ;
	if(isJSON(body)){
		data = JSON.parse(body)
		cb(data)
	}else{
		await login_byCookie(arguments.callee,cb)
	}
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
        	var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }
        } catch(e) {
            return false;
        }
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
    console.log('更新推锐统计信息');
    get_data(function(data){
        let dataTotal = data.data, 
            date = dataTotal.date;
            forDate(date);
            forDate(date);
        var len = date.length-1;
        var dataList = [];
        let result = {
            platform: 0,
            consume: dataTotal.Bn[len] + dataTotal.Cp[len] + dataTotal.Dj[len],
            bannerConsume: dataTotal.Bn[len],
            screenConsume: dataTotal.Cp[len],
            clickConsume: dataTotal.Dj[len],
            timeStamp: timestamp_date()
        };
        dataList.push(result)
        consumeModel.create(dataList)
    })
});
