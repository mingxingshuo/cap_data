webpackJsonp([1],{"+UAg":function(t,e){},"+skl":function(t,e){},HEfd:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Menu",{attrs:{mode:"horizontal",theme:"light","active-name":t.onRoutes},on:{"on-select":t.selectMenu}},[n("MenuItem",{attrs:{name:"/statistics/index"}},[n("Icon",{attrs:{type:"ios-paper"}}),t._v("\n            平台数据\n        ")],1),t._v(" "),n("MenuItem",{attrs:{name:"/statistics/account"}},[n("Icon",{attrs:{type:"ios-people"}}),t._v("\n            账号管理\n        ")],1),t._v(" "),n("MenuItem",{attrs:{name:"/statistics/recharge"}},[n("Icon",{attrs:{type:"ios-people"}}),t._v("\n            充值统计\n        ")],1)],1),t._v(" "),n("transition",{attrs:{name:"move",mode:"out-in"}},[n("keep-alive",[n("router-view")],1)],1)],1)},staticRenderFns:[]};var o=n("VU/8")({name:"App",data:function(){return{onRoutes:this.$route.path}},methods:{selectMenu:function(t){this.$router.replace({path:t})}}},i,!1,function(t){n("btDX")},null,null).exports,r=n("/ocq"),s={data:function(){var t=this;return{dialogModal:!1,isLoading:!0,indexData:[],indexHeader:[{title:"时间",key:"createtime",width:150,align:"center"},{title:"渠道名称",key:"qudao",width:120,align:"center"},{title:"小说平台&&服务号名称",key:"name",align:"center"},{title:"推广链接",key:"url",width:200,align:"center"},{title:"落地页链接",key:"out_url",align:"center"},{title:"Action",key:"action",width:320,align:"center",render:function(e,n){var a=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"primary",size:"small"},on:{click:function(){a.$router.push({path:"/statistics/updateLink",name:"updateLink",params:{prevLinkForm:n.row}})}}},"修改"),e("Button",{style:{marginRight:"10px"},props:{type:"error",size:"small"},on:{click:function(){a.$axios.get("/link/del",{params:{id:n.row._id}}).then(function(t){a.$Message.info("删除成功"),a.indexData.splice(n.index,1)})}}},"删除"),e("Button",{style:{marginRight:"10px"},props:{type:"warning",size:"small"},on:{click:function(){a.dialogModal=!0,a.costForm.url=n.row.url}}},"输入成本"),e("Button",{props:{type:"primary",size:"small"},on:{click:function(){a.$router.push({path:"/statistics/dataStatistics",name:"dataStatistics",params:{url:n.row.url}})}}},"查看统计数据")])}}],costForm:{},createtime:null}},mounted:function(){this.showIndexData()},methods:{showIndexData:function(){var t=this;this.$axios.get("/link").then(function(e){t.indexData=e.data.data,t.isLoading=!1})},confirmDate:function(){var t=new Date(this.createtime).getTime();this.costForm.createtime=t},submitCost:function(){var t=this;this.$axios.post("/cost/create",this.costForm).then(function(e){t.$Message.info("成本输入成功"),t.costForm={}})},cancel:function(){this.$Message.info("Clicked cancel")}},watch:{}},c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},["Index"==t.$route.name?n("div",{staticClass:"index-page"},[n("Button",{staticClass:"create-btn",attrs:{size:"large",type:"success",shape:"circle",to:"/statistics/index/createLink"}},[t._v("\n            新建统计链接\n            "),n("Icon",{attrs:{type:"ios-arrow-forward"}})],1),t._v(" "),n("Table",{staticClass:"index-table",attrs:{stripe:"",columns:t.indexHeader,data:t.indexData,loading:t.isLoading}}),t._v(" "),n("Modal",{attrs:{title:"输入成本"},on:{"on-ok":t.submitCost,"on-cancel":t.cancel},model:{value:t.dialogModal,callback:function(e){t.dialogModal=e},expression:"dialogModal"}},[n("Form",{attrs:{model:t.costForm,"label-width":100}},[n("FormItem",{attrs:{label:"推广链接"}},[n("Input",{staticStyle:{width:"300px"},attrs:{disabled:""},model:{value:t.costForm.url,callback:function(e){t.$set(t.costForm,"url",e)},expression:"costForm.url"}})],1),t._v(" "),n("FormItem",{attrs:{label:"总成本"}},[n("Input",{staticStyle:{width:"300px","margin-top":"10px"},attrs:{placeholder:"输入成本"},model:{value:t.costForm.cost,callback:function(e){t.$set(t.costForm,"cost",e)},expression:"costForm.cost"}})],1),t._v(" "),n("FormItem",{attrs:{label:"记录成本时间"}},[n("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",placeholder:"选择日期和时间"},on:{"on-ok":t.confirmDate},model:{value:t.createtime,callback:function(e){t.createtime=e},expression:"createtime"}})],1)],1)],1)],1):t._e(),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var l=n("VU/8")(s,c,!1,function(t){n("iwuv")},"data-v-63b194be",null).exports,u={props:{prevLinkForm:Object},data:function(){return{linkForm:{},createtime:new Date,platformList:[]}},mounted:function(){this.showPlatformList(),this.prevLinkForm&&(this.linkForm=this.prevLinkForm,this.platform=this.linkForm.platform.toString(),this.createtime=new Date(this.linkForm.createtime),this.linkForm.id=this.linkForm._id)},methods:{showPlatformList:function(){var t=this;this.$axios.get("/user").then(function(e){t.platformList=e.data.data})},confirmDate:function(){var t=new Date(this.createtime).getTime();this.linkForm.createtime=t},submitLinkForm:function(){this.linkForm.platform=Number(this.platform);var t=new Date(this.createtime).getTime();this.linkForm.createtime=t,this.$emit("submitLinkForm",this.linkForm),this.linkForm={}},cancel:function(){this.linkForm={},this.$router.push("/statistics")}}},m={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"link-common"},[n("Form",{staticClass:"form-cont",attrs:{model:t.linkForm,"label-width":150}},[n("FormItem",{attrs:{label:"创建统计链接的时间"}},[n("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",placeholder:"选择日期和时间"},on:{"on-ok":t.confirmDate},model:{value:t.createtime,callback:function(e){t.createtime=e},expression:"createtime"}})],1),t._v(" "),n("FormItem",{attrs:{label:"小说平台&&服务号名称"}},[n("Select",{attrs:{placeholder:"选择小说平台"},model:{value:t.linkForm.name,callback:function(e){t.$set(t.linkForm,"name",e)},expression:"linkForm.name"}},t._l(t.platformList,function(e){return n("Option",{key:e.name,attrs:{value:e.name}},[t._v(t._s(e.name))])}))],1),t._v(" "),n("FormItem",{attrs:{label:"小说平台的推广链接"}},[n("Input",{attrs:{placeholder:"输入小说平台的推广链接"},model:{value:t.linkForm.url,callback:function(e){t.$set(t.linkForm,"url",e)},expression:"linkForm.url"}})],1),t._v(" "),n("FormItem",{attrs:{label:"微信外的落地页链接"}},[n("Input",{attrs:{placeholder:"输入微信外的落地页链接"},model:{value:t.linkForm.out_url,callback:function(e){t.$set(t.linkForm,"out_url",e)},expression:"linkForm.out_url"}})],1),t._v(" "),n("FormItem",{attrs:{label:"渠道名称"}},[n("Input",{attrs:{placeholder:"输入渠道名称"},model:{value:t.linkForm.qudao,callback:function(e){t.$set(t.linkForm,"qudao",e)},expression:"linkForm.qudao"}})],1),t._v(" "),n("div",{staticClass:"btn-cont"},[n("Button",{attrs:{type:"success"},on:{click:t.submitLinkForm}},[t._v("提交")]),t._v(" "),n("Button",{attrs:{type:"warning"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]};var d=n("VU/8")(u,m,!1,function(t){n("HEfd")},"data-v-06a9980c",null).exports,h={name:"createLink",components:{linkCommon:d},data:function(){return{prevLinkForm:{}}},methods:{createNewLink:function(t){var e=this;this.$axios.post("/link/create",t).then(function(t){e.$Message.info("链接创建成功"),window.location.href="/statistics"})}}},p={render:function(){var t=this.$createElement,e=this._self._c||t;return"createLink"==this.$route.name?e("div",{staticClass:"create-link"},[e("link-common",{on:{submitLinkForm:this.createNewLink}})],1):this._e()},staticRenderFns:[]},f=n("VU/8")(h,p,!1,null,null,null).exports,k=n("mvHQ"),v=n.n(k),g={name:"updateLink",components:{linkCommon:d},data:function(){return{prevLinkForm:{}}},beforeMount:function(){var t=sessionStorage.getItem("form");t||(t=v()(this.$route.params.prevLinkForm),sessionStorage.setItem("form",t)),this.prevLinkForm=JSON.parse(t),console.log(1,this.prevLinkForm)},methods:{editLink:function(t){var e=this;this.$axios.post("/link/update",t).then(function(t){e.$Message.info("链接修改成功"),window.location.href="/statistics"})}},destroyed:function(){sessionStorage.setItem("form","")}},F={render:function(){var t=this.$createElement,e=this._self._c||t;return"updateLink"==this.$route.name?e("div",{staticClass:"update-link"},[e("link-common",{attrs:{prevLinkForm:this.prevLinkForm},on:{submitLinkForm:this.editLink}})],1):this._e()},staticRenderFns:[]},w=n("VU/8")(g,F,!1,null,null,null).exports,_={data:function(){return{isLoading:!0,dataList:[],dataHeader:[{key:"linktime",title:"创建日期",width:100,align:"center"},{key:"qudao",title:"渠道名称",width:90,align:"center"},{key:"fuwuhao",title:"服务号名称",align:"center"},{key:"platform",title:"小说平台",width:90,align:"center",render:function(t,e){var n="";return 0==e.row.platform?n="推锐":1==e.row.platform?n="点锐":2==e.row.platform?n="要琪":3==e.row.platform?n="一飞":4==e.row.platform?n="有盟":5==e.row.platform?n="无忧":6==e.row.platform&&(n="袋鼠"),t("div",{props:{}},n)}},{key:"uv",title:"百度uv",width:90,align:"center"},{key:"yuedu",title:"累计阅读人数",width:90,align:"center"},{key:"count_pay",title:"付款数量",width:90,align:"center"},{key:"pay_rate",title:"付款率",width:90,align:"center"},{key:"today_money",title:"今日充值金额",width:90,align:"center"},{key:"money",title:"累计充值金额",width:90,align:"center"},{key:"today_cost",title:"今日成本",width:90,align:"center"},{key:"cost",title:"总成本",width:90,align:"center"},{key:"today_back",title:"动态回本率",align:"center"},{key:"back",title:"回本率",width:90,align:"center"}]}},mounted:function(){this.showDataList()},methods:{showDataList:function(){var t=this,e=sessionStorage.getItem("url");e||(e=this.$route.params.url,sessionStorage.setItem("url",this.$route.params.url)),this.$axios.get("/tongji",{params:{url:e}}).then(function(e){t.isLoading=!1,t.dataList[0]=e.data.data})}},destroyed:function(){sessionStorage.setItem("url","")}},y={render:function(){var t=this.$createElement,e=this._self._c||t;return"dataStatistics"==this.$route.name?e("div",[e("Button",{staticClass:"back-home",attrs:{type:"warning",size:"large",to:"/statistics"}},[this._v("返回首页")]),this._v(" "),e("Table",{staticClass:"data-table",attrs:{columns:this.dataHeader,data:this.dataList,loading:this.isLoading}})],1):this._e()},staticRenderFns:[]};var b=n("VU/8")(_,y,!1,function(t){n("UG8z")},"data-v-40e78b31",null).exports,x={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"account"},["Account"==this.$route.name?e("div",{staticClass:"account-page"},[e("Button",{staticClass:"create-btn",attrs:{size:"large",type:"success",shape:"circle",to:"/statistics/account/createAccount"}},[this._v("\n            添加新账号\n            "),e("Icon",{attrs:{type:"ios-arrow-forward"}})],1),this._v(" "),e("Table",{staticClass:"account-table",attrs:{stripe:"",columns:this.accountHeader,data:this.accountData}})],1):this._e(),this._v(" "),e("router-view")],1)},staticRenderFns:[]};var $=n("VU/8")({data:function(){var t=this;return{accountData:[],accountHeader:[{key:"name",title:"小说平台&&服务号名称",align:"center"},{key:"username",title:"账号",align:"center"},{key:"password",title:"密码",align:"center"},{title:"Action",align:"center",render:function(e,n){var a=t;return e("div",[e("Button",{style:{marginRight:"10px"},props:{type:"warning",size:"small"},on:{click:function(){a.$axios.get("/user/del",{params:{id:n.row._id}}).then(function(t){a.$Message.info("删除成功"),a.accountData.splice(n.index,1)})}}},"删除")])}}]}},mounted:function(){this.showAccountList()},methods:{showAccountList:function(){var t=this;this.$axios.get("/user").then(function(e){t.accountData=e.data.data})}}},x,!1,function(t){n("+UAg")},"data-v-0e49bf00",null).exports,L={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"account-common"},[n("Form",{staticClass:"form-cont",attrs:{model:t.accountForm,"label-width":150}},[n("FormItem",{attrs:{label:"小说平台&&服务号名称"}},[n("Input",{attrs:{placeholder:"请输入小说平台&&服务号名称"},model:{value:t.accountForm.name,callback:function(e){t.$set(t.accountForm,"name",e)},expression:"accountForm.name"}})],1),t._v(" "),n("FormItem",{attrs:{label:"账号"}},[n("Input",{attrs:{placeholder:"请输入账号"},model:{value:t.accountForm.username,callback:function(e){t.$set(t.accountForm,"username",e)},expression:"accountForm.username"}})],1),t._v(" "),n("FormItem",{attrs:{label:"密码"}},[n("Input",{attrs:{placeholder:"请输入密码"},model:{value:t.accountForm.password,callback:function(e){t.$set(t.accountForm,"password",e)},expression:"accountForm.password"}})],1),t._v(" "),n("div",{staticClass:"btn-cont"},[n("Button",{attrs:{type:"success"},on:{click:t.submitAccountForm}},[t._v("提交")]),t._v(" "),n("Button",{attrs:{type:"warning"},on:{click:t.cancel}},[t._v("取消")])],1)],1)],1)},staticRenderFns:[]};var I={name:"createAccount",components:{accountCommon:n("VU/8")({data:function(){return{accountForm:{}}},methods:{submitAccountForm:function(){this.$emit("submitAccountForm",this.accountForm),this.accountForm={}},cancel:function(){this.accountForm={},this.$router.push("/statistics/account")}}},L,!1,function(t){n("qebd")},"data-v-2f195263",null).exports},methods:{createNewAccount:function(t){var e=this;this.$axios.post("/user/create",t).then(function(t){e.$Message.info("添加账号成功"),window.location.href="/statistics/account"})}}},C={render:function(){var t=this.$createElement,e=this._self._c||t;return"createAccount"==this.$route.name?e("div",{staticClass:"create-account"},[e("account-common",{on:{submitAccountForm:this.createNewAccount}})],1):this._e()},staticRenderFns:[]},D=n("VU/8")(I,C,!1,null,null,null).exports,A={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"recharge"},["Recharge"==this.$route.name?e("div",{staticClass:"recharge-page"},[e("Table",{staticClass:"recharge-table",attrs:{stripe:"",columns:this.rechargeHeader,data:this.rechargeData}})],1):this._e()])},staticRenderFns:[]};var M=n("VU/8")({data:function(){return{rechargeData:[],rechargeHeader:[{key:"name",title:"小说平台&&服务号名称",align:"center"},{key:"createdate",title:"创建时间",align:"center"},{key:"money",title:"总充值",align:"center"},{key:"orders",title:"订单数",align:"center"},{key:"pay_orders",title:"支付数",align:"center"},{key:"pay_rate",title:"支付率",align:"center"}]}},mounted:function(){this.showRechargeList()},methods:{showRechargeList:function(){var t=this;this.$axios.get("/order").then(function(e){t.rechargeData=e.data.data})}}},A,!1,function(t){n("kiCF")},"data-v-75e2356a",null).exports;a.default.use(r.a);var R=new r.a({mode:"history",routes:[{path:"/statistics",redirect:"/statistics/index"},{path:"/statistics/index",name:"Index",component:l,children:[{path:"createLink",name:"createLink",component:f},{path:"updateLink",name:"updateLink",component:w},{path:"dataStatistics",name:"dataStatistics",component:b}]},{path:"/statistics/account",name:"Account",component:$,children:[{path:"createAccount",name:"createAccount",component:D}]},{path:"/statistics/recharge",name:"Recharge",component:M}]}),S=n("BTaQ"),U=n.n(S),B=n("mtWM"),H=n.n(B);n("+skl");a.default.config.productionTip=!1,a.default.prototype.$axios=H.a,a.default.use(U.a),new a.default({el:"#app",router:R,components:{App:o},template:"<App/>"})},UG8z:function(t,e){},btDX:function(t,e){},iwuv:function(t,e){},kiCF:function(t,e){},qebd:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.0789b394883e88659753.js.map