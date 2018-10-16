const rp = require('request-promise-any')
const async = require('async');
const cheerio = require('cheerio')
var j = rp.jar()
var zlib = require('zlib');

var cookie_string;
var isLogin = false;

(function() {
    setInterval(function() {
        get_data(function(data) {
            var html = data;
            var dataList = filterDataList(html);
            var result = {
                adName: dataList[1],
                showCount: dataList[2],
                clickCount: dataList[3],
                clickRate: dataList[4],
                accounts: dataList[5],
                consume: dataList[6],
                timeStamp: Date.now()
            }
            console.log(result)
        });
    }, 15*60*1000)
})()




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
        var url = 'http://www.dianrui.com/ads/index.php'
        rp({url: url, jar: j})
        .then(function (body) {
          cookie_string = j.getCookieString(url)
          resolve()
        })
        .catch(function (err) { 
            // console.log('11113333222', err)
            reject(err)
        })
    })
}

async function login_byCookie(...func){
    await get_cookie()
    var url = 'http://www.dianrui.com/ajax/ajax.php'
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
            action: 'login',
            username : 'woodxs@qq.com',
            password : '54321',
            remember : null,
            code : 'succ'
        }
    }
    options.headers.Cookie = cookie_string
    var buff = await rp(options)
    cookie_string = j.getCookieString(url)
    body = await asy_zip(buff)
    console.log('------login-----')
    // console.log('body', body)
    isLogin = true;
    console.log('------to do func-------')
    console.log('func', func)
    if(func.length==1){
        func[0]()
    }else if(func.length==2){
        func[0](func[1])  
    }
}
async function get_data(cb){
    console.log('-------get_data func-------\r\n')
    var url = 'http://www.dianrui.com/ads/index.php'
    var options = {  
        url:url,
        method:"get",
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
            'PHPSESSID': 'b0nqre3enqiermohgd4fm92ra2',
            'qweds': 1
        }
    }
    options.headers.Cookie = cookie_string
    var body = await rp(options)

    body = await asy_zip(body)
    //  console.log('--------body--------')
    var data;
    if(isLogin == true){
        isLogin = false
        data = body
        cb(data)
    }else{
        await login_byCookie(arguments.callee,cb)
    }
}
function filterDataList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        var tableList = $('#example');
        // 轮播图数据
        var dataList = [];

        /* 轮播图列表信息遍历 */
        tableList.find('tbody tr td').each(function(item) {
            var that = $(this);
            var dataItem = that.html()
            dataList.push(dataItem)
        });
        return dataList;
    } else {
        console.log('无数据传入！');
    }
}