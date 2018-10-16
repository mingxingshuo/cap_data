const rp = require('request-promise-any')
const async = require('async');
const cheerio = require('cheerio')
var j = rp.jar()
var zlib = require('zlib');

var cookie_string;

(function() {
    setInterval(function() {
        get_data(function(data){
            let dataTotal = data.data, 
                date = dataTotal.date;
                forDate(date);
                forDate(date);
            let result = {
                total: dataTotal[date[6] + '_Total'],
                bannerConsume: dataTotal.Bn[6],
                screenConsume: dataTotal.Cp[6],
                clickConsume: dataTotal.Dj[6],
                timeStamp: Date.now()
            };
            console.log('result', result)
        })
    }, 15*60*1000)
})()

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
          console.log('j', j)
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
	// console.log(body)
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

