webpackJsonp([2,24,25],{"2aoa":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"adduser",data:function(){return{name:"",username:"",password:"",repassword:"",email:"",phone:"",address:"",type:4,options:[{text:"Nhân viên",value:3},{text:"Người quản lý",value:2},{text:"Quản trị viên",value:1}]}},methods:{close:function(){this.$emit("close")},handleSubmit:function(t){var e=this;t.preventDefault(),this.username.length>6?this.password===this.repassword?(this.$emit("close"),this.$http.post("api/user/adduser",{name:this.name,username:this.username,password:this.password,email:this.email,phone:this.phone,address:this.address,type:this.type},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){e.name="",e.username="",e.password="",e.repassword="",e.email="",e.phone="",e.address="",e.$http.get("api/user/getallusers?page="+e.$route.query.page,{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){return e.$emit("inputData",t.data)})}).catch(function(t){console.error(t.response)})):alert("Mật khẩu phải giống nhau!"):alert("Tên đăng nhập quá ngắn!")}},mounted:function(){}},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"modal"}},[s("div",{staticClass:"modal-mask"},[s("div",{staticClass:"modal-wrapper"},[s("div",{staticClass:"modal-container"},[s("div",[s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(e){return t.$emit("close")}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Họ và Tên")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Tên đăng nhập")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.username,expression:"username"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.username},on:{input:function(e){e.target.composing||(t.username=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Nhập lại mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.repassword,expression:"repassword"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.repassword},on:{input:function(e){e.target.composing||(t.repassword=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Email")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Điện thoại")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Địa chỉ")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Phân quyền")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],staticClass:"form-control",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.type=e.target.multiple?s:s[0]}}},t._l(t.options,function(e){return s("option",{domProps:{value:e.value}},[t._v("\n                  "+t._s(e.text)+"\n                ")])}),0)])]),t._v(" "),s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("Lưu")])])])])])])])},staticRenderFns:[]},o=s("VU/8")(a,i,!1,null,null,null);e.default=o.exports},FP2b:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"EditInvoiceType",data:function(){return{password:"",repassword:"",options:[{text:"Nhân viên",value:3},{text:"Người quản lý",value:2},{text:"Quản trị viên",value:1}],statuss:[{text:"Hoạt động",value:1},{text:"Tạm dừng",value:0}]}},methods:{handleSubmit:function(){var t=this;this.editid.username.length>6?this.password===this.repassword?this.$http.post("api/user/edituser",{name:this.editid.name,username:this.editid.username,password:this.password,email:this.editid.email,phone:this.editid.phone,address:this.editid.address,type:this.editid.type,status:this.editid.status,id:this.editid._id},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){t.$emit("close")}).catch(function(t){console.error(t.response)}):alert("Mật khẩu phải giống nhau!"):alert("Tên đăng nhập quá ngắn!")}},props:["editid"]},i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"modal"}},[s("div",{staticClass:"modal-mask"},[s("div",{staticClass:"modal-wrapper"},[s("div",{staticClass:"modal-container"},[s("div",[s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"ngdialog-close",attrs:{"aria-label":"Dismiss"},on:{click:function(e){return t.$emit("close")}}})]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Họ và Tên")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.name,expression:"editid.name"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.name},on:{input:function(e){e.target.composing||t.$set(t.editid,"name",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Tên đăng nhập")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.username,expression:"editid.username"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.username},on:{input:function(e){e.target.composing||t.$set(t.editid,"username",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Nhập lại mật khẩu")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.repassword,expression:"repassword"}],staticClass:"form-control",attrs:{type:"password"},domProps:{value:t.repassword},on:{input:function(e){e.target.composing||(t.repassword=e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Email")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.email,expression:"editid.email"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.email},on:{input:function(e){e.target.composing||t.$set(t.editid,"email",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Điện thoại")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.phone,expression:"editid.phone"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.phone},on:{input:function(e){e.target.composing||t.$set(t.editid,"phone",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Địa chỉ")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.editid.address,expression:"editid.address"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.editid.address},on:{input:function(e){e.target.composing||t.$set(t.editid,"address",e.target.value)}}})])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Phân quyền")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.editid.type,expression:"editid.type"}],staticClass:"form-control",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.editid,"type",e.target.multiple?s:s[0])}}},t._l(t.options,function(e){return s("option",{domProps:{value:e.value}},[t._v("\n                  "+t._s(e.text)+"\n                ")])}),0)])]),t._v(" "),s("div",{staticClass:"form-group"},[s("label",{staticClass:"col-sm-3 control-label"},[t._v("Trạng thái")]),t._v(" "),s("div",{staticClass:"col-sm-9"},[s("select",{directives:[{name:"model",rawName:"v-model",value:t.editid.status,expression:"editid.status"}],staticClass:"form-control",on:{change:function(e){var s=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.editid,"status",e.target.multiple?s:s[0])}}},t._l(t.statuss,function(e){return s("option",{domProps:{value:e.value}},[t._v("\n                  "+t._s(e.text)+"\n                ")])}),0)])]),t._v(" "),s("div",{staticClass:"panel-body_modal"},[s("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.handleSubmit}},[t._v("Lưu")])])])])])])])},staticRenderFns:[]},o=s("VU/8")(a,i,!1,null,null,null);e.default=o.exports},vBZH:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("2aoa"),i=s("FP2b"),o=s("bzuE").BASE_URL,l={data:function(){return{isModalVisible:!1,isModalEditVisible:!1,schools:[],items:[],totalRows:1,perPage:20,currentPage:Number(this.$route.query.page),editid:""}},components:{adduser:a.default,edituser:i.default},methods:{showModal:function(){this.isModalVisible=!0},showisModalEditVisible:function(t){this.editid=t,this.isModalEditVisible=!0},closeModal:function(){this.isModalVisible=!1},displayUserType:function(t){switch(t){case 1:return"Quản trị viên";case 2:return"Người quản lý";default:return"Nhân viên"}},closeEditModal:function(){this.isModalEditVisible=!1},clickCallback:function(t){var e=this;this.items=this.schools.filter(function(s,a){return(t-1)*e.perPage<=a&&a<t*e.perPage})},updateMessage:function(t){this.items=t},dellItem:function(t,e){var s=this;this.$confirm({message:"Bạn có muốn xóa "+e,button:{yes:"Đồng ý"},callback:function(e){e&&s.$http.post("school/delete",{id:t},{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){s.$http.get(o+"/school/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(t){s.schools=t.data,s.totalRows=t.data.length,s.items=s.schools.filter(function(t,e){return(s.currentPage-1)*s.perPage<=e&&e<s.currentPage*s.perPage})})}).catch(function(t){console.error(t.response)})}})}},created:function(){var t=this;this.$http.get(o+"/school/getall",{headers:{Authorization:"Basic "+localStorage.getItem("token")}}).then(function(e){t.schools=e.data,t.totalRows=e.data.length,void 0===t.$route.query.page&&(t.currentPage=1),t.items=t.schools.filter(function(e,s){return(t.currentPage-1)*t.perPage<=s&&s<t.currentPage*t.perPage})})}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[t._m(0),t._v(" "),s("section",{staticClass:"panel panel-inverse"},[s("div",{staticClass:"row"},[s("div",{staticClass:"panel-body"},[s("button",{staticClass:"btn btn-primary m-r-5 m-b-5",on:{click:t.showModal}},[t._v("\n          Thêm chức danh công việc\n        ")])]),t._v(" "),s("table",{staticClass:"table"},[t._m(1),t._v(" "),s("tbody",t._l(t.items,function(e,a){return s("tr",{key:a},[s("td",[t._v(t._s(20*(t.currentPage-1)+a+1))]),t._v(" "),s("td",[t._v(t._s(e.name))]),t._v(" "),s("td",[s("span",[s("a",{attrs:{href:"#"},on:{click:function(s){return t.showisModalEditVisible(e)}}},[s("i",{staticClass:"fa fa-edit"})])])]),t._v(" "),s("td",[s("a",{attrs:{href:"#"},on:{click:function(s){return t.dellItem(e._id,e.name)}}},[s("i",{staticClass:"fa fa-trash"})])])])}),0)])]),t._v(" "),s("div",{staticClass:"dataTables_paginate paging_simple_numbers",attrs:{id:"example2_paginate"}},[s("paginate",{attrs:{"page-count":Math.ceil(t.totalRows/20),"page-range":3,"margin-pages":2,"click-handler":t.clickCallback,"prev-text":"Prev","next-text":"Next","container-class":"pagination","page-class":"page-item"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1),t._v(" "),s("adduser",{directives:[{name:"show",rawName:"v-show",value:t.isModalVisible,expression:"isModalVisible"}],on:{inputData:t.updateMessage,close:t.closeModal}}),t._v(" "),s("edituser",{directives:[{name:"show",rawName:"v-show",value:t.isModalEditVisible,expression:"isModalEditVisible"}],attrs:{editid:t.editid},on:{close:t.closeEditModal}})],1),t._v(" "),s("vue-confirm-dialog")],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"content-header"},[e("h1",[this._v("Quản lý chức danh công việc")]),this._v(" "),e("ol",{staticClass:"breadcrumb"},[e("li",[e("a",[e("i",{staticClass:"fa fa-dashboard"}),this._v("Trang chủ")])]),this._v(" "),e("li",[e("a",[this._v("Danh sách chức danh công việc")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",{attrs:{width:"25px"}},[this._v("STT")]),this._v(" "),e("th",[this._v("Tên chức danh công việc")]),this._v(" "),e("th",{staticClass:"functionicon",attrs:{width:"15px"}}),this._v(" "),e("th",{staticClass:"functionicon",attrs:{width:"15px"}})])])}]},r=s("VU/8")(l,n,!1,null,null,null);e.default=r.exports}});
//# sourceMappingURL=2.346a96303f01bf58a338.js.map