webpackJsonp([1],{"2gyP":function(e,t){},"7y55":function(e,t){},NHnr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("7+uW"),n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("el-menu",{attrs:{"default-active":e.onRoutes,mode:"horizontal","background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},on:{select:e.handleSelect}},[e._l(e.navlist,function(t){return[a("el-menu-item",{key:t.index,attrs:{index:t.index}},[a("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(t.title))])])]})],2),e._v(" "),a("div",{staticClass:"content"},[a("transition",{attrs:{name:"move",mode:"out-in"}},[a("keep-alive",[a("router-view")],1)],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")({name:"App",data:function(){return{navlist:[{index:"/statistics",title:"小说平台统计"},{index:"/statistics/consume",title:"小说消耗统计"}],onRoutes:"/statistics"}},methods:{handleSelect:function(e,t){this.$router.replace({path:e})}}},n,!1,function(e){a("dSsO")},null,null).exports,i=a("/ocq"),s=a("mtWM"),o=a.n(s),c={props:{dataList:Array},data:function(){return{}},methods:{close:function(){this.$emit("changeState")}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"data-page"},[a("el-button",{staticClass:"close fl",attrs:{type:"warning"},on:{click:e.close}},[e._v("关闭页面")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList,border:""}},[a("el-table-column",{attrs:{"align-header":"center",width:"180",align:"center",prop:"url",label:"推广链接"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"qudao",label:"渠道名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"platform",label:"小说平台",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"fuwuhao",label:"服务号名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"uv",label:"百度uv",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"yuedu",label:"累计阅读人数",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"count_order",label:"订单数量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"count_pay",label:"付款数量",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"today_money",label:"今日充值金额",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"money",label:"累计充值金额",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"pay_rate",label:"付款率",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"today_cost",label:"今日成本",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"cost",label:"成本",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"today_back",label:"动态回本率",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"back",label:"回本率",width:"100"}})],1)],1)},staticRenderFns:[]};var d={components:{dataPage:a("VU/8")(c,u,!1,function(e){a("2gyP")},"data-v-7d659b15",null).exports},data:function(){return{statisticsLinks:[],linkForm:{},payForm:{},createLink:!1,createPay:!1,dataShow:!1,options:[{value:6,label:"袋鼠"}],dataList:[{qudao:"11212"}]}},mounted:function(){this.linksShow()},methods:{linksShow:function(){var e=this;o()({url:"/link",method:"get"}).then(function(t){e.statisticsLinks=t.data.data})},addLink:function(){this.createLink=!0},editPay:function(e){this.createPay=!0,this.payForm.url=e.url},viewData:function(e){var t=this;o()({url:"/tongji",method:"get",params:{url:e.url}}).then(function(e){t.dataList=e.data.data,t.dataShow=!0})},deleteLink:function(e,t){var a=this;o()({url:"/link/del",method:"get",params:{id:e._id}}).then(function(e){e.data.success&&(a.$message({type:"success",message:e.data.success}),a.statisticsLinks.splice(t,1))})},submitLinkForm:function(){var e=this;o()({url:"/link/create",method:"post",data:this.linkForm}).then(function(t){console.log(t.data),t.data.success&&(e.$message({type:"success",message:t.data.success}),e.linkForm={},e.statisticsLinks.push(t.data.data),e.createLink=!1)})},cancelLinkForm:function(){this.linkForm={},this.createLink=!1},changeLinkDate:function(){var e=new Date(this.linkForm.createtime).getTime();this.linkForm.createtime=e},changePayDate:function(){var e=new Date(this.payForm.createtime).getTime();this.payForm.createtime=e},submitPayForm:function(){var e=this,t=this.timestamp_date(this.payForm.createtime);this.payForm.createtime=t,o()({url:"/cost/create",method:"post",data:this.payForm}).then(function(t){t.data.success&&(e.$message({type:"success",message:t.data.data}),e.payForm={},e.createPay=!1)})},cancelPayForm:function(){this.payForm={},this.createPay=!1},timestamp_date:function(e){var t=new Date(e),a=t.getMinutes(),l=15*parseInt(a/15);return t.setMinutes(l,0,0)},changeState:function(){this.dataShow=!1}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"index-page"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.createLink&&!e.createPay&&!e.dataShow,expression:"!createLink && !createPay && !dataShow"}],staticClass:"links"},[a("el-button",{staticClass:"create-link fr",attrs:{type:"success"},on:{click:e.addLink}},[e._v("新建统计链接")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.statisticsLinks,border:""}},[a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"createtime",label:"日期",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"qudao",label:"渠道名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"fuwuhao",label:"服务号名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"platform",label:"小说平台",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(0==t.row.platform?"推锐":1==t.row.platform?"点锐":2==t.row.platform?"要琪":3==t.row.platform?"一飞":4==t.row.platform?"无忧":5==t.row.platform?"有盟":"袋鼠")+"\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"url",label:"推广链接"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",prop:"out_url",label:"落地页链接"}}),e._v(" "),a("el-table-column",{attrs:{"align-header":"center",align:"center",label:"操作",width:"300"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(a){e.editPay(t.row)}}},[e._v("输入成本")]),e._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){e.viewData(t.row)}}},[e._v("查看统计数据")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(a){e.deleteLink(t.row,t.$index)}}},[e._v("删除")])]}}])})],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.createLink,expression:"createLink"}],staticClass:"create-page"},[a("el-form",{attrs:{model:e.linkForm,"label-width":"160px",size:"small"}},[a("el-form-item",{attrs:{label:"创建统计链接的时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},on:{change:e.changeLinkDate},model:{value:e.linkForm.createtime,callback:function(t){e.$set(e.linkForm,"createtime",t)},expression:"linkForm.createtime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"选择小说平台"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.linkForm.platform,callback:function(t){e.$set(e.linkForm,"platform",t)},expression:"linkForm.platform"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"小说平台的推广链接"}},[a("el-input",{staticClass:"inputtxt",model:{value:e.linkForm.url,callback:function(t){e.$set(e.linkForm,"url",t)},expression:"linkForm.url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"微信外的落地页链接"}},[a("el-input",{staticClass:"inputtxt",model:{value:e.linkForm.out_url,callback:function(t){e.$set(e.linkForm,"out_url",t)},expression:"linkForm.out_url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"渠道名称"}},[a("el-input",{staticClass:"inputtxt",model:{value:e.linkForm.qudao,callback:function(t){e.$set(e.linkForm,"qudao",t)},expression:"linkForm.qudao"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"服务号名称"}},[a("el-input",{staticClass:"inputtxt",model:{value:e.linkForm.fuwuhao,callback:function(t){e.$set(e.linkForm,"fuwuhao",t)},expression:"linkForm.fuwuhao"}})],1)],1),e._v(" "),a("div",{staticClass:"btn-container"},[a("el-button",{attrs:{type:"success"},on:{click:e.submitLinkForm}},[e._v("提交")]),e._v(" "),a("el-button",{attrs:{type:"info"},on:{click:e.cancelLinkForm}},[e._v("取消")])],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.createPay,expression:"createPay"}],staticClass:"pay-page create-page"},[a("el-form",{attrs:{model:e.payForm,"label-width":"160px",size:"small"}},[a("el-form-item",{attrs:{label:"推广链接(不用填)"}},[a("el-input",{staticClass:"inputtxt",attrs:{disabled:""},model:{value:e.payForm.url,callback:function(t){e.$set(e.payForm,"url",t)},expression:"payForm.url"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"总成本"}},[a("el-input",{staticClass:"inputtxt",model:{value:e.payForm.cost,callback:function(t){e.$set(e.payForm,"cost",t)},expression:"payForm.cost"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"记录成本时间"}},[a("el-date-picker",{attrs:{type:"datetime",placeholder:"选择日期时间"},on:{change:e.changePayDate},model:{value:e.payForm.createtime,callback:function(t){e.$set(e.payForm,"createtime",t)},expression:"payForm.createtime"}})],1)],1),e._v(" "),a("div",{staticClass:"btn-container"},[a("el-button",{attrs:{type:"success"},on:{click:e.submitPayForm}},[e._v("提交")]),e._v(" "),a("el-button",{attrs:{type:"info"},on:{click:e.cancelPayForm}},[e._v("取消")])],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.dataShow,expression:"dataShow"}],staticClass:"data-page"},[a("data-page",{attrs:{dataList:e.dataList},on:{changeState:e.changeState}})],1)])},staticRenderFns:[]};var p=a("VU/8")(d,m,!1,function(e){a("7y55")},"data-v-bc7f98a8",null).exports,h={data:function(){return{platform:0,dataList:[],tuirui:[],dianrui:[],yaoqi:[],yifei:[],youmeng:[],wuyou:[]}},mounted:function(){this.getData()},methods:{getData:function(){var e=this;o()({url:"/consume",method:"get"}).then(function(t){for(var a=t.data.data,l=0;l<a.length;l++){var n=a[l];switch(n.platform){case 0:e.tuirui.push(n);break;case 1:e.dianrui.push(n);break;case 2:e.yaoqi.push(n);break;case 3:e.yifei.push(n);break;case 4:e.youmeng.push(n);break;case 5:e.wuyou.push(n)}}})},changePlatform:function(){switch(this.platform){case 0:this.dataList=this.tuirui;break;case 1:this.dataList=this.dianrui;break;case 2:this.dataList=this.yaoqi;break;case 3:this.dataList=this.yifei;break;case 4:this.dataList=this.youmeng;break;case 5:this.dataList=this.wuyou}}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"consume-page"},[a("el-radio-group",{on:{change:e.changePlatform},model:{value:e.platform,callback:function(t){e.platform=t},expression:"platform"}},[a("el-radio",{attrs:{label:0}},[e._v("推锐")]),e._v(" "),a("el-radio",{attrs:{label:1}},[e._v("点锐")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("要琪")]),e._v(" "),a("el-radio",{attrs:{label:3}},[e._v("一飞")]),e._v(" "),a("el-radio",{attrs:{label:4}},[e._v("有盟")]),e._v(" "),a("el-radio",{attrs:{label:5}},[e._v("无忧")])],1),e._v(" "),a("el-table",{staticStyle:{width:"100%","margin-top":"30px"},attrs:{border:"",data:e.dataList}},[a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"time",label:"时间",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"adId",label:"广告Id"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"adName",label:"广告名称",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"deliveryType",label:"投放平台"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"releaseData",label:"投放数据"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"billingMethod",label:"结算方式"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"consume",label:"消耗",width:"100"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"bannerConsume",label:"横幅消耗"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"screenConsume",label:"插屏消耗"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"clickConsume",label:"点击消耗"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"showCount",label:"PV"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"clickCount",label:"UV"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"clickRate",label:"点击率"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"accounts",label:"结算数"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"delivery",label:"日投放额"}}),e._v(" "),a("el-table-column",{attrs:{"header-align":"center",align:"center",prop:"amount",label:"账户余额"}})],1)],1)},staticRenderFns:[]},b=a("VU/8")(h,v,!1,null,null,null).exports;l.default.use(i.a);var g=new i.a({mode:"history",routes:[{path:"/statistics",component:p,meta:{title:"小说平台数据"}},{path:"/statistics/consume",component:b,meta:{title:"小说消耗数据"}}]}),f=a("zL8q"),_=a.n(f);a("tvR6");l.default.config.productionTip=!1,l.default.use(_.a),new l.default({el:"#app",router:g,components:{Home:r},template:"<Home/>"})},dSsO:function(e,t){},tvR6:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.b27caabdb1468f024846.js.map