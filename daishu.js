const rp = require('request-promise-any')
const async = require('async');
const cheerio = require('cheerio')
var j = rp.jar()
var cookie_string;


get_data(function(data){
	console.log(data)
})


function get_cookie(){
	return new Promise((resolve, reject) => {
		var url = 'https://www.ziread.cn/admin/index/login?url=%2Fadmin%2Findex'
		rp({url: url, jar: j})
		.then(function (body) {
		  cookie_string = j.getCookieString(url)
		  var $ = cheerio.load(body)
		  var token = $('input[name="__token__"]').attr("value")
		  resolve({cookie:cookie_string,token:token})
		})
		.catch(function (err) { 
			reject(err)
	    })
	})
}

async function login_byCookie(...func){
	var s_o = await get_cookie()
	console.log('------get token------\r\n')
	var url = 'https://www.ziread.cn/admin/index/login'
	var options = {  
		url:url, 
		jar: j,
		method:"POST",
		headers: {  
			"Accept":"application/json, text/javascript, */*; q=0.01",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
		    "Connection": "keep-alive", 
		    "Content-Type": "application/json; charset=utf-8", 
		    "X-Requested-With": "XMLHttpRequest",
		    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
		},
		body: JSON.stringify({
			username : 'mingxing',
			password : '123456',
	        __token__ : s_o.token,
	        keeplogin : 1
	    })
	}
	options.headers.Cookie = cookie_string
	var body = await rp(options)
	cookie_string = j.getCookieString(url)
	console.log('------to do func-------')
	if(func.length==1){
		func[0]()
	}else if(func.length==2){
		func[0](func[1])
	}
}

async function get_data(cb){
	console.log('-------get_data func-------\r\n')
	var url = 'https://www.ziread.cn/admin/collect/index?channel_id=0&sort=createdate&order=desc&offset=0&limit=10&_=1537862367315'
	var options = {  
		url:url,
		method:"GET",
		headers: {  
			"Accept":"application/json, text/javascript, */*; q=0.01",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
		    "Connection": "keep-alive", 
		    "Content-Type": "application/json", 
		    "X-Requested-With": "XMLHttpRequest",
		    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"  
		}//伪造请求头  
	};
	options.headers.Cookie = cookie_string
	var body = await rp(options)
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

