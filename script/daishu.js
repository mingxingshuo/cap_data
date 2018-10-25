const rp = require('request-promise-any')
const async = require('async');
const cheerio = require('cheerio')
const schedule = require("node-schedule");
const userModel = require('../model/user')
const daishuModel = require('../model/daishu')
const linkModel = require('../model/link')
const orderModel = require('../model/order')
var j = rp.jar()
var cookies = {};

// get_link(0, function (data) {
//     console.log(data)
// })

function get_cookie(username) {
    return new Promise((resolve, reject) => {
        var url = 'https://www.ziread.cn/admin/index/login?url=%2Fadmin%2Findex'
        rp({url: url, jar: j})
            .then(function (body) {
                cookies[username] = j.getCookieString(url)
                var $ = cheerio.load(body)
                var token = $('input[name="__token__"]').attr("value")
                resolve({cookie: cookies[username], token: token})
            })
            .catch(function (err) {
                reject(err)
            })
    })
}

async function login_byCookie(...func) {
    var s_o = await get_cookie(func[1])
    console.log('------get token------\r\n')
    var url = 'https://www.ziread.cn/admin/index/login'
    var options = {
        url: url,
        jar: j,
        method: "POST",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json; charset=utf-8",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
        },
        body: JSON.stringify({
            username: func[1],
            password: func[2],
            __token__: s_o.token,
            keeplogin: 1
        })
    }
    options.headers.Cookie = cookies[func[1]]
    var body = await rp(options)
    cookie_string = j.getCookieString(url)
    if (func.length == 3) {
        func[0](func[1], func[2])
        //0:函数,1:username,2:password
    } else if (func.length == 4) {
        //0:函数,1:username,2:password,3返回
        func[0](func[1], func[2], func[3])
    } else if (func.length == 5) {
        //0:函数,1:username,2:password,3页数4返回
        func[0](func[1], func[2], func[3], func[4])
    }
}
get_data('mingxing',123456,function (data) {
    console.log(data,'-------------data')
})
async function get_data(username, password, cb) {
    console.log('-------get_data func-------\r\n')
    var url = 'https://www.ziread.cn/admin/collect/index?channel_id=0&sort=createdate&order=desc&offset=0&limit=10&_=' + Date.now()
    var options = {
        url: url,
        method: "GET",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
        }//伪造请求头
    };
    options.headers.Cookie = cookies[username]
    var body = await rp(options)
    if (isJSON(body)) {
        let row = JSON.parse(body).rows[0]
        let orders = row.normal_recharge_orders_count + row.vip_recharge_orders_count
        let pay_orders = row.normal_recharge_orders + row.vip_recharge_orders
        let pay_rate = "0.00%"
        if (orders && pay_orders) {
            pay_rate = (pay_orders / orders * 100).toFixed(2) + '%'
        }
        // let link = await LinkModel.find({url: url})
        var doc = {
            name:name,
            createdate: row.createdate,
            money: row.recharge_money, //总充值
            orders: orders, //订单数
            pay_orders: pay_orders, //支付数
            pay_rate: pay_rate
        }
        // await orderModel.create(data)
        cb(doc)
    } else {
        await login_byCookie(arguments.callee, username, password, cb)
    }
}

async function get_link(username, password, offset, cb) {
    console.log('-------get_link func-------\r\n')
    var url = 'https://www.ziread.cn/admin/referral/referral/index?sort=id&order=desc&offset=' + offset + '&limit=10&_=' + Date.now()
    var options = {
        url: url,
        method: "GET",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
        }//伪造请求头
    };
    options.headers.Cookie = cookies[username]
    var body = await rp(options)
    var data;
    var flag = true
    var arr = []
    if (isJSON(body)) {
        data = JSON.parse(body)
        for (let d of data.rows) {
            if (parseInt(Date.now() / 1000) - d.createtime <= 48 * 3600) {
                let total = await get_linkdata(username, password, d.id)
                let savedata = {
                    id: d.id,
                    url: d.short_url,
                    count_order: total.count_order,
                    count_pay: total.count_pay,
                    yuedu: d.uv,
                    money: parseFloat(d.money).toFixed(2),
                    createtime: d.createtime * 1000,
                    time: timestamp_date()
                }
                arr.push(savedata)
            } else if (parseInt(Date.now() / 1000) - d.createtime <= 7 * 24 * 3600) {
                let savedata = {
                    id: d.id,
                    url: d.short_url,
                    count_order: 0,
                    count_pay: 0,
                    yuedu: d.uv,
                    money: parseFloat(d.money).toFixed(2),
                    createtime: d.createtime * 1000,
                    time: timestamp_date()
                }
                arr.push(savedata)
            } else {
                flag = false
                break
            }
        }
        // console.log(arr)
        await daishuModel.create(arr)
        if (flag) {
            get_link(username,password, offset + 10, cb)
        } else {
            cb('end')
        }
    } else {
        await login_byCookie(arguments.callee, username, password, offset, cb)
    }
}

async function get_linkdata(username, password, id) {
    console.log('-------get_linkdata func-------\r\n')
    var url = 'https://www.ziread.cn/admin/orders/index?ids=' + id + 'ref=addtabs&_=' + Date.now()
    var url_pay = 'https://www.ziread.cn/admin/orders/index?ids=' + id + '&ref=addtabs&filter=%7B%22state%22%3A%221%22%7D&op=%7B%22state%22%3A%22%3D%22%7D&_=' + Date.now()
    var options = {
        url: url,
        method: "GET",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
        }//伪造请求头
    };
    options.headers.Cookie = cookies[username]
    var body = await rp(options)

    var options_pay = {
        url: url_pay,
        method: "GET",
        headers: {
            "Accept": "application/json, text/javascript, */*; q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36"
        }//伪造请求头
    };
    options_pay.headers.Cookie = cookie_string
    var body_pay = await rp(options_pay)

    var data;
    var data_pay;
    if (isJSON(body) && isJSON(body_pay)) {
        data = JSON.parse(body)
        data_pay = JSON.parse(body_pay)
        return new Promise((resolve, reject) => {
            resolve({count_order: data.total, count_pay: data_pay.total})
        })
    } else {
        await login_byCookie(arguments.callee, username, password)
    }
}

function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            } else {
                return false;
            }
        } catch (e) {
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
schedule.scheduleJob(rule, async function () {
    console.log('创建袋鼠统计信息');
    let users = await userModel.find()
    async.eachLimit(users, 3, function (user, callback) {
        get_link(user.username, user.password, 0, function (data) {
            console.log(data)
        })
    })
});

var rule1 = new schedule.RecurrenceRule();
var times1 = [1];
rule1.hour = times1;
schedule.scheduleJob(rule1, async function () {
    console.log('袋鼠订单信息');
    let users = await userModel.find()
    async.eachLimit(users, 3, function (user, callback) {
        get_data(user.username, user.password, function (data) {
            console.log(data,'-------------')
        })
    })
});