
var rp = require('request-promise-any');

async function get_sites(){
	var url = 'https://api.baidu.com/json/tongji/v1/ReportService/getSiteList'
	var options = {  
		url:url, 
		method:"POST",
		body:JSON.stringify({"header": {
					"account_type": 1,
			        "password": "0309Cong",
			        "token": "8db71199d2ec84df3996a16738628ba8",
			        "username": "zhangzicong6"
				}})
	}
	var body = await rp(options)
	console.log(body)
}

async function get_data(){
	var url = 'https://api.baidu.com/json/tongji/v1/ReportService/getData'
	var options = {  
		url:url, 
		method:"POST",
		body:JSON.stringify({
				"header": {
					"account_type": 1,
			        "password": "0309Cong",
			        "token": "8db71199d2ec84df3996a16738628ba8",
			        "username": "zhangzicong6"},
			    "body":{
			    	"siteId": "12664529",
        			"method": "source/all/a", 
        			"start_date": "20181016",
        			"end_date": "20181016",
        			"gran":"day",
        			"metrics": "pv_count,visitor_count,ip_count" 
			    }
			})
	}
	var body = await rp(options)
	console.log(body)
}

get_sites();

function timestamp_date() {
	var date = new Date()
	var ms = date.getMinutes()
	var set_ms = 15*parseInt(ms/15)
	return date.setMinutes(set_ms,0,0)
}